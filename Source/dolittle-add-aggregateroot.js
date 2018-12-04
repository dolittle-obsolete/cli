#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import globals from './globals';
import { usagePrefix, validateArgsNameInput } from './helpers';

const USAGE = 'dolittle add aggregateroot [name]';

args
    .example(USAGE, 'Creates an aggregate root in the current folder');

args.parse(process.argv, {value: usagePrefix + USAGE, name: 'dolittle add aggregateroot'});

if (! args.sub.length || args.sub.length < 1) args.showHelp();

validateArgsNameInput(args.sub[0]);
let context = {
    artifactName: args.sub[0], 
    artifactType: 'aggregateRoot',
    area: 'domain'
};

globals.artifactsManager.createArtifact(context);
