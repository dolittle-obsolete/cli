#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import { usagePrefix } from './helpers';
import globals from './globals.js';

const USAGE = 'dolittle veracity [command] [args]';
args
    .command('create', 'Create something from one of the boilerplates');
    
args.parse(process.argv, {value: usagePrefix + USAGE, name: 'dolittle veracity create'});

if( !args.sub.length ) args.showHelp();