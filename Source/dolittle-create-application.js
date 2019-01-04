#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import { usagePrefix, createUsageArgumentText, getApplicationArgumentDependencies, showHelpIfNeeded, contextFromArgs } from './helpers';
import {applicationsManager} from '@dolittle/tooling.common';
import globals from './globals';

let dependencies = getApplicationArgumentDependencies(applicationsManager, 'any');
const USAGE = 'dolittle create application ' + createUsageArgumentText(dependencies);
args
    .example(USAGE, 'Creates an application with a given name');
    
args.parse(process.argv, {value: usagePrefix + USAGE, name: 'dolittle create application'});

showHelpIfNeeded(args, dependencies.length);

const destinationPath = process.cwd();
globals.commandManager.createApplication(contextFromArgs(args.sub, dependencies), dependencies, destinationPath);