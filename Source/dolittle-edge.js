#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import { usagePrefix } from './helpers';
import globals from './globals.js';

args
    .command('show', 'Show information')
    .command('get', 'Get details');
    
args.parse(process.argv);

if( !args.sub.length ) args.showHelp();