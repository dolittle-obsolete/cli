#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import globals from './globals';
import { usagePrefix, validateArgsNameInput } from './helpers';

const USAGE = 'dolittle add command [name]';
args
    .example(USAGE, 'Creates a command in the current folder');
 
args.option('path', 'Override the destination path of the artifact');

let flags = args.parse(process.argv, {value: usagePrefix + USAGE, name: 'dolittle add command'});

if (! args.sub.length || args.sub.length < 1) args.showHelp();

validateArgsNameInput(args.sub[0]);
let context = {
    artifactName: args.sub[0], 
    artifactType: 'command',
    area: 'domain',
    path: flags.path
};

globals.artifactsManager.createArtifact(context);
