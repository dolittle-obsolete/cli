#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import global from './global';

args
    .example("dolittle create event [name] [namespace]", "Creates an event with a given name and namespace in the current folder");
 
args.parse(process.argv);

if( !args.sub.length || args.sub.length < 2 ) args.showHelp();

global.artifactsManager.createEvent(args.sub[0], args.sub[1]);