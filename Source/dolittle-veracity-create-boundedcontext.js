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
import outputter from './outputter';

const USAGE = 'dolittle veracity create boundedcontext [name]';
args
    .example(USAGE, 'Creates a bounded context with a given name');

args.parse(process.argv, { value: usagePrefix + USAGE, name: 'dolittle veracity create boundedcontext' });

const destinationPath = process.cwd();
run(destinationPath);

async function run(destinationPath) {
    let application = requireApplication(applicationsManager, destinationPath, logger);
    if (application === null) {
        outputter.error('Missing application - use \'dolittle create application [name]\' for a new application');
        process.exit(1);
    }

    let dependencies = [];
    try {
        dependencies = getBoundedContextsArgumentDependencies(boundedContextsManager, 'csharp'); // Language is hard coded, for now
    } catch(error) {
        outputter.error(error, 'It seems like you might be missing some boilerplates.\nUse \'dolittle boilerplates online\' to see what\'s available');
        process.exit(0);
    }

    showHelpIfNeeded(args, dependencies.argument.length);

    let context = contextFromArgs(args.sub, dependencies.argument);

    if (! (await globals.commandManager.createBoundedContext(context, application, dependencies.rest, destinationPath))) {
        outputter.error('Failed to create bounded context');
        process.exit(1);
    }
    //TODO: Cannot index by 0 anymore when there are more adornments
    let adornmentBoilerPlates = boilerPlatesManager.boilerPlatesByLanguageAndType('csharp', 'boundedContext-adornment')[0];
    if (!adornmentBoilerPlates || adornmentBoilerPlates.length < 1) {
        outputter.error('Failed to find bounded context adornment.\nUse \'dolittle boilerplates online\' to see what\'s available');
        process.exit(1);
    }
    const boundedContextFolder = path.join(destinationPath, context.name);
    let templateContext = {
        id: Guid.create(),
        name: context.name,
        applicationId: application.id
    };
    boilerPlatesManager.createInstance(adornmentBoilerPlates[0], boundedContextFolder, templateContext);

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
            outputter.print('.NET Core project found - restoring packages');

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
        outputter.print('Web found - restoring packages');

        let npmInstall = spawn('npm', ['install'], {
            cwd: './Web'
        });

        npmInstall.stdout.on('data', (data) => process.stdout.write(data.toString()));
        npmInstall.stderr.on('data', (data) => process.stderr.write(data.toString()));
    }
}


