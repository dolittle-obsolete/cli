#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import globals from './globals';

const USAGE = 'dolittle create [command] [args]';
args
    .command('application', 'An application')
    .command('boundedcontext', 'A bounded context');
    
args.parse(process.argv, {value: globals.usagePrefix + USAGE, name: 'dolittle create'});

if( !args.sub.length ) args.showHelp();