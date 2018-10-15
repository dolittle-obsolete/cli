#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import global from './global';

const USAGE = 'dolittle create application [name]';
args
    .example(USAGE, 'Creates an application with a given name');
    
args.parse(process.argv, {value: global.usagePrefix + USAGE, name: 'dolittle create application'});

if( !args.sub.length ) args.showHelp();

global.validateArgsNameInput(args.sub[0]);
global.applicationManager.create(args.sub[0]);