#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import globals from './globals';

const artifactType = 'command';
const commandName = 'command';
const description = 'Creates a command';
const cwd = process.cwd();

globals.commandManager.handleAddArtifact(args, commandName, artifactType, description, cwd);