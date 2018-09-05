#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import global from '../global';

args
    .example("dolittle create application [name]", "Creates an application with a given name")
    ;
    
const flags = args.parse(process.argv);

if( args.sub.length != 1 ) args.showHelp();

global.applicationManager.create(args.sub[0]);