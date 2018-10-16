#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import globals from './globals';

const USAGE = 'dolittle create application [name]';
args
    .example(USAGE, 'Creates an application with a given name');
    
args.parse(process.argv, {value: globals.usagePrefix + USAGE, name: 'dolittle create application'});

if( !args.sub.length ) args.showHelp();

globals.validateArgsNameInput(args.sub[0]);
globals.applicationManager.create(args.sub[0]);