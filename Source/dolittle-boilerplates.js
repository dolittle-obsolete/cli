#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import globals from './globals';

args
    .command('list', 'Lists the boilerplates in use by the tooling')
    .command('installed', 'Lists the globally installed boilerplates found')
    .command('discover', 'Discovers boilerplates and adds them to the local configuration used by the tool')
    .command('online', 'Lists boilerplates found on npm based on keywords')
    .command('dolittle', 'Lists dolittle boilerlpates found on npm under a dolittle user');
    
args.parse(process.argv);

if( !args.sub.length ) args.showHelp();