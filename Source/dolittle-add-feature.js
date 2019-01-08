#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import globals from './globals';
import {logger, boundedContextsManager, helpers, folders, dolittleConfig} from '@dolittle/tooling.common';
import { usagePrefix, requireBoundedContext } from './helpers';

const USAGE = 'dolittle add feature feature[.subfeature[.subfeature]*]';
args
    .command('application', 'An application')
    .command('boundedcontext', 'A bounded context');
    
args.parse(process.argv, {value: usagePrefix + USAGE, name: `dolittle add feature [Feature - '.' separated feature path for convenience]`});

if( !args.sub.length || args.sub.length > 1) args.showHelp();

const cwd = process.cwd();
let boundedContext = requireBoundedContext(boundedContextsManager, cwd, logger); 
if (!boundedContext) process.exit(1);

helpers.areas.forEach(area => folders.makeFolderIfNotExists(helpers.determineDestination(area, 'csharp', args.sub[0], cwd, boundedContext.path, dolittleConfig)));

