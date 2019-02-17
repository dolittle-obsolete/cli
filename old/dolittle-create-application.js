#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import { usagePrefix, createUsageArgumentText, getApplicationArgumentDependencies, showHelpIfNeeded, contextFromArgs } from './helpers';
import {applicationsManager} from '@dolittle/tooling.common';
import globals from './globals';
import Outputter from '../Outputter';

let dependencies = [];
try {
    dependencies = getApplicationArgumentDependencies(applicationsManager, 'any');
} catch(error) {
    Outputter.error(error, 'It seems like you might be missing some boilerplates.\nUse \'dolittle boilerplates online\' to see what\'s available');
    process.exit(0);
}
const USAGE = 'dolittle create application ' + createUsageArgumentText(dependencies.argument);
args
    .example(USAGE, 'Creates an application with a given name');
    
args.parse(process.argv, {value: usagePrefix + USAGE, name: 'dolittle create application'});

showHelpIfNeeded(args, dependencies.argument.length);

const destinationPath = process.cwd();
globals.commandManager.createApplication(contextFromArgs(args.sub, dependencies.argument), dependencies.rest, destinationPath);