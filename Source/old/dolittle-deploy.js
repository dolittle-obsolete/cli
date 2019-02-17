#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { spawn, exec } from 'child_process';
import fs from 'fs';
import globals from './globals.js';
import Outputter from '../Outputter.js';

let root = 'k8s';
if( !fs.existsSync(root)) {
    Outputter.print('Artifacts for deployment is missing');
} else {
    Outputter.print('Deploying Bounded Context');
    fs.readdir(root, (err, files) => {
        files.forEach(file => {
            file = file.toLowerCase();
            if( file.endsWith('.yml')) {
                
                let ps = spawn('kubectl', [
                    'apply',
                    '-f',
                    file
                ], {
                    cwd: root
                });
                ps.stdout.on('data', (data) => process.stdout.write(data.toString()));
                ps.stderr.on('data', (data) => process.stderr.write(data.toString()));
            }
        });
    
    });
}