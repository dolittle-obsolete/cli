#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import global from './global';

const USAGE = 'dolittle add command [name] [namespace]';
args
    .example(USAGE, "Creates a command with a given name and namespace in the current folder");
 
args.parse(process.argv, {value: global.usagePrefix + USAGE, name: 'dolittle add command'});

if( !args.sub.length || args.sub.length < 2 ) args.showHelp();

global.artifactsManager.createCommand(args.sub[0], args.sub[1]);