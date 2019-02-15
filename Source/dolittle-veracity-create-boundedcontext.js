#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import { usagePrefix, requireApplication, getBoundedContextsArgumentDependencies, showHelpIfNeeded, contextFromArgs } from './helpers';
import {logger, applicationsManager, boundedContextsManager, boilerPlatesManager, Guid} from '@dolittle/tooling.common';
import path from 'path';
import { spawn, exec } from 'child_process';
import glob from 'glob';
import fs from 'fs';
import globals from './globals';

const USAGE = 'dolittle veracity create boundedcontext [name]';
args
    .example(USAGE, 'Creates a bounded context with a given name');

args.parse(process.argv, { value: usagePrefix + USAGE, name: 'dolittle veracity create boundedcontext' });

const destinationPath = process.cwd();
run(destinationPath);

async function run(destinationPath) {
    let application = requireApplication(applicationsManager, destinationPath, logger);
    if (application === null) {
        logger.error('Missing application - use \'dolittle create application [name]\' for a new application');
        process.exit(1);
    }

    let dependencies = getBoundedContextsArgumentDependencies(boundedContextsManager, 'csharp'); // Language is hard coded, for now

    showHelpIfNeeded(args, dependencies.argument.length);

    let context = contextFromArgs(args.sub, dependencies.argument);

    if (! (await globals.commandManager.createBoundedContext(context, application, dependencies.rest, destinationPath))) {
        logger.error('Failed to create bounded context');
        process.exit(1);
    }
    //TODO: Cannot index by 0 anymore when there are more adornments
    let adornmentBoilerPlate = boilerPlatesManager.boilerPlatesByLanguageAndType('csharp', 'boundedContext-adornment')[0];
    if (!adornmentBoilerPlate) {
        logger.error('Failed to find bounded context adornment');
        process.exit(1);
    }
    const boundedContextFolder = path.join(destinationPath, context.name);
    let templateContext = {
        id: Guid.create(),
        name: context.name,
        applicationId: application.id
    };
    boilerPlatesManager.createInstance(adornmentBoilerPlate, boundedContextFolder, templateContext);

    process.chdir(context.name);

    let addPackage = (reference, version, done) => {
        let dotnetAddPackage = exec(`dotnet add package ${reference} -v ${version}`, {
            cwd: 'Core'
        });
        dotnetAddPackage.stdout.on('data', (data) => process.stdout.write(data.toString()));
        dotnetAddPackage.stderr.on('data', (data) => process.stderr.write(data.toString()));
        dotnetAddPackage.on('exit', () => {
            done();
        });
    };

    glob('./Core/*.csproj', (err, matches) => {
        if (matches.length) {
            logger.info('.NET Core project found - restoring packages');

            addPackage('Veracity.Authentication.OpenIDConnect.Core','1.0.0', () => {
                addPackage('Microsoft.AspNetCore.All','2.1.4', () => {
                    let dotnet = spawn('dotnet', ['restore'], {
                        cwd: 'Core'
                    });
                    dotnet.stdout.on('data', (data) => process.stdout.write(data.toString()));
                    dotnet.stderr.on('data', (data) => process.stderr.write(data.toString()));
                });
            });
        }
    });

    let packageJsonFile = path.join(process.cwd(), 'Web', 'package.js');
    if (fs.existsSync(packageJsonFile)) {
        logger.info('Web found - restoring packages');

        let npmInstall = spawn('npm', ['install'], {
            cwd: './Web'
        });

        npmInstall.stdout.on('data', (data) => process.stdout.write(data.toString()));
        npmInstall.stderr.on('data', (data) => process.stderr.write(data.toString()));
    }
}


