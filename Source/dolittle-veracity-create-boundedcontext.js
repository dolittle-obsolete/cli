#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import globals from './globals';
import { usagePrefix, validateArgsNameInput } from './helpers';
import path from 'path';
import { Guid } from './Guid';
import { spawn, exec } from 'child_process';
import glob from 'glob';
import fs from 'fs';

const USAGE = 'dolittle veracity create boundedcontext [name]';
args
    .example(USAGE, 'Creates a bounded context with a given name');

args.parse(process.argv, { value: usagePrefix + USAGE, name: 'dolittle veracity create boundedcontext' });

if (!args.sub.length) args.showHelp();

validateArgsNameInput(args.sub[0]);
let context = {
    name: args.sub[0],
    destination: process.cwd()
};

let application = globals.applicationManager.getApplicationFrom(context.destination);

if (application === null) {
    globals.logger.error('Missing application - use \'dolittle create application [name]\' for a new application');
} else {
    globals.boundedContextManager.create(context);
    let boilerPlate = globals.boilerPlatesManager.boilerPlatesByLanguageAndType('csharp', 'boundedContext-adornment')[0];
    let boundedContextPath = path.join(context.destination, context.name);
    globals.folders.makeFolderIfNotExists(boundedContextPath);
    let templateContext = {
        id: Guid.create(),
        name: context.name,
        applicationId: application.id
    };
    globals.boilerPlatesManager.createInstance(boilerPlate, boundedContextPath, templateContext);

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
            globals.logger.info('.NET Core project found - restoring packages');

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
        globals.logger.info('Web found - restoring packages');

        let npmInstall = spawn('npm', ['install'], {
            cwd: './Web'
        });

        npmInstall.stdout.on('data', (data) => process.stdout.write(data.toString()));
        npmInstall.stderr.on('data', (data) => process.stderr.write(data.toString()));
    }
}
