#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import {applicationsManager, boundedContextsManager, logger} from '@dolittle/tooling.common';
import globals from './globals';
import { showHelpIfNeeded, contextFromArgs, usagePrefix, createUsageArgumentText, getBoundedContextsArgumentDependencies, requireApplication} from './helpers';

const destinationPath = process.cwd();
let application = requireApplication(applicationsManager, destinationPath, logger);
if (application === null) process.exit(1);

let dependencies = getBoundedContextsArgumentDependencies(boundedContextsManager, 'csharp'); // Language is hard coded, for now

const USAGE = 'dolittle create boundedcontext ' + createUsageArgumentText(dependencies);
args
    .example(USAGE, 'Creates a bounded context with a given name');
    
args.parse(process.argv, {value: usagePrefix + USAGE, name: 'dolittle create boundedcontext'});

showHelpIfNeeded(args, dependencies.length);

globals.commandManager.createBoundedContext(contextFromArgs(args.sub, dependencies), application, destinationPath);



