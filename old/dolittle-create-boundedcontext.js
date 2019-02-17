#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import {applicationsManager, boundedContextsManager, logger} from '@dolittle/tooling.common';
import globals from './globals';
import { showHelpIfNeeded, contextFromArgs, usagePrefix, createUsageArgumentText, getBoundedContextsArgumentDependencies, requireApplication} from './helpers';
import Outputter from '../Outputter';

const destinationPath = process.cwd();
let application = requireApplication(applicationsManager, destinationPath, logger);
if (application === null) process.exit(1);

let dependencies = [];
try {
    dependencies = getBoundedContextsArgumentDependencies(boundedContextsManager, 'csharp'); // Language is hard coded, for now
} catch(error) {
    Outputter.error(error, 'It seems like you might be missing some boilerplates.\nUse \'dolittle boilerplates online\' to see what\'s available');
    process.exit(0);
}

const USAGE = 'dolittle create boundedcontext ' + createUsageArgumentText(dependencies.argument);
args
    .example(USAGE, 'Creates a bounded context with a given name');
    
args.parse(process.argv, {value: usagePrefix + USAGE, name: 'dolittle create boundedcontext'});

showHelpIfNeeded(args, dependencies.argument.length);

globals.commandManager.createBoundedContext(contextFromArgs(args.sub, dependencies.argument), application, dependencies.rest, destinationPath);



