#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';

args
    .command('info', 'Show information about the currently connected cluster')
    .command('add', 'Add a cluster to the configuration')
    .command('remove', 'Remove a cluster from the configuration')
    .command('use', 'Set what cluster to use as current');
    
args.parse(process.argv);

if( !args.sub.length ) args.showHelp();