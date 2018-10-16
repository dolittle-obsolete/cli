#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import globals from './globals';

const USAGE = 'dolittle add event [name]';
args
    .example(USAGE, 'Creates an event in the current folder');
 
args.parse(process.argv, {value: globals.usagePrefix + USAGE, name: 'dolittle add event'});

if (! args.sub.length || args.sub.length < 1) args.showHelp();

globals.validateArgsNameInput(args.sub[0]);
let context = {
    artifactName: args.sub[0], 
    artifactType: 'event',
    destination: process.cwd()
};

globals.artifactsManager.createArtifact(context);

// let flags = {name: args.sub[0]}; 
// globals.artifactsManager.createEvent(flags);