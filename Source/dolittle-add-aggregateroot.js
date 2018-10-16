#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import globals from './globals';

const USAGE = 'dolittle add aggregateroot [name]';

args
    .example(USAGE, 'Creates an aggregate root in the current folder');

args.parse(process.argv, {value: globals.usagePrefix + USAGE, name: 'dolittle add aggregateroot'});

if (! args.sub.length || args.sub.length < 1) args.showHelp();

globals.validateArgsNameInput(args.sub[0]);
let context = {
    artifactName: args.sub[0], 
    artifactType: 'aggregateRoot',
    destination: process.cwd()
};

globals.artifactsManager.createArtifact(context);

// let context = {name: args.sub[0], destination: process.cwd()}; 
// globals.artifactsManager.createAggregateRoot(context);