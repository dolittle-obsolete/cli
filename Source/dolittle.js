#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import {configManager, boilerPlatesManager, logger} from '@dolittle/tooling.common';
import globals from './globals.js';

// * First run - configure default bounded-context language. Store in config file in ~/.dolittle
// * 

let pkg = require('../package.json');
console.log(`Dolittle CLI v${pkg.version}\n`);
args
    .command('update', 'Update dolittle', () => {
        logger.info('$ dolittle update serves another purpose now. It has not been implemented yet...');
    })
    .command('cluster', 'Work with cluster hosting Dolittle')
    .command('create', 'Create something from one of the boilerplates')
    .command('add', 'Adds an Artifact to the Bounded Context')
    .command('edge', 'Work with edge deployments')
    .command('run', 'Runs a Bounded Context')
    .command('deploy', 'Deploy a Bounded Context')
    .command('veracity', 'Veracity specific operations');

args.parse(process.argv);    
let showHelpIfNeeded = () => {
    if( !args.sub.length ) args.showHelp();
};
showHelpIfNeeded();