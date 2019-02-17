#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import globals from './globals';

const artifactType = 'readModel';
const commandName = 'readmodel';
const description = 'Creates a read model';
const cwd = process.cwd();

globals.commandManager.handleAddArtifact(args, commandName, artifactType, description, cwd);
