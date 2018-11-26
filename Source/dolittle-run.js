#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import globals from './globals';
import { spawn, exec } from 'child_process';
import Docker from 'dockerode';
import fs from 'fs';
import path from 'path';
import glob from 'glob';

if (!fs.existsSync('./bounded-context.json')) {
    globals.logger.error('Missing "bounded-context.json" file - run "dolittle run" from a folder that holds this file');
} else {
    const dolittleMongoLabel = 'dolittle-mongo';

    let docker = new Docker({ socketPath: '/var/run/docker.sock' });
    let isMongoRunning = false;
    docker.listContainers((err, containers) => {
        if( err ) {
            globals.logger.error(err)
            return;
        }

        if( containers != null ) {
            containers.forEach(container => {
                if (container.Labels.hasOwnProperty(dolittleMongoLabel)) {
                    globals.logger.info('Mongo is already running');
                    isMongoRunning = true;
                }
            });
        }

        if (!isMongoRunning) {
            globals.logger.info('Starting a MongoDB Docker Container');

            docker.run('mongo', [], [process.stdout, process.stderr], {
                Labels: {
                    'dolittle-mongo': 'true'
                },
                Tty: false,
                Attachstdin: false,
                AttachStdout: false,
                AttachStderr: true,
                ExposedPorts: {
                    '27017/tcp': {}
                }
            }, (err, data, container) => {
                //globals.logger.info(data.StatusCode);
            });
        }
    });

    let dotnetWatch = () => {
        globals.logger.info('Starting .NET watcher');
        let dotnet = spawn('dotnet', ['watch','run'], {
            cwd: 'Core'
        });
        dotnet.stdout.on('data', (data) => console.log(data.toString()));
        dotnet.stderr.on('data', (data) => console.log(data.toString()));
    };

    let webpackWatch = () => {
        globals.logger.info('Starting webpack watcher');
        let isWindows = process.platform == 'win32';
        let webpackPath = isWindows?path.join(process.env.APPDATA,'npm','webpack.cmd'):'webpack';

        let webpack = spawn(webpackPath, [
            '--config', webpackFile,
            '--mode', 'development',
            '--watch',
            '--hot'], {
            cwd: './Web'
        });

        webpack.stdout.on('data', (data) => console.log(data.toString()));
        webpack.stderr.on('data', (data) => console.log(data.toString()));
    };

    glob('./Core/*.csproj', (err, matches) => {
        if (matches.length) {
            globals.logger.info('.NET Core project found');

            let projectJson = path.join('Core','obj','project.assets.json');

            if( !fs.existsSync(projectJson)) {
                globals.logger.info('.NET Restore has not ran yet - running it');
                let dotnetRestore = exec('dotnet restore', {
                    cwd: 'Core'
                });
                dotnetRestore.stdout.on('data', (data) => console.log(data.toString()));
                dotnetRestore.stderr.on('data', (data) => console.log(data.toString()));
                dotnetRestore.on('exit', () => dotnetWatch());
            } else {
                dotnetWatch();
            }
        } 
    });

    let webpackFile = path.join(process.cwd(),'Web','webpack.config.js');
    if( fs.existsSync(webpackFile)) {
        globals.logger.info('Web project found');

        let nodeModules = path.join(process.cwd(),'Web','node_modules');
        if( !fs.existsSync(nodeModules)) {
            let npmInstall = exec('npm install', { cwd: './Web' });
            npmInstall.stdout.on('data', (data) => console.log(data.toString()));
            npmInstall.stderr.on('data', (data) => console.log(data.toString()));
            npmInstall.on('exit', () => webpackWatch());
        } else {
            webpackWatch();
        }

        
        
    }
}
