#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import global from './global';

const USAGE = 'dolittle add eventprocessor [name]';
args
    .example(USAGE, "Creates an event processor in the current folder");
 
args.parse(process.argv, {value: global.usagePrefix + USAGE, name: 'dolittle add eventprocessor'});

if (! args.sub.length || args.sub.length < 1) args.showHelp();

let context = {
    artifactName: args.sub[0], 
    artifactType: 'eventProcessor',
    destination: process.cwd()
};

global.artifactsManager.createArtifact(context);

// let flags = {name: args.sub[0]}; 
// global.artifactsManager.createEventProcessor(flags);