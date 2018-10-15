#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import global from './global';

const USAGE = 'dolittle create boundedcontext [name]';
args
    .example(USAGE, 'Creates a bounded context with a given name');
    
args.parse(process.argv, {value: global.usagePrefix + USAGE, name: 'dolittle create boundedcontext'});

if( !args.sub.length ) args.showHelp();


global.validateArgsNameInput(args.sub[0]);
let context = {
    name: args.sub[0],
    destination: process.cwd()
};

global.boundedContextManager.create(context);