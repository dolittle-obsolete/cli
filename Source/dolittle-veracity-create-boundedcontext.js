#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import globals from './globals';
import { usagePrefix, validateArgsNameInput} from './helpers';
import path from 'path';
import { Guid }from './Guid';

const USAGE = 'dolittle veracity create boundedcontext [name]';
args
    .example(USAGE, 'Creates a bounded context with a given name');
    
args.parse(process.argv, {value: usagePrefix + USAGE, name: 'dolittle veracity create boundedcontext'});

if( !args.sub.length ) args.showHelp();

validateArgsNameInput(args.sub[0]);
let context = {
    name: 'something', //args.sub[0],
    destination: process.cwd()
};

let application = globals.applicationManager.getApplicationFrom(context.destination);

if( application === null ) {
    globals.logger.error('Missing application - use \'dolittle create application [name]\' for a new application');
} else {
    globals.boundedContextManager.create(context);
    let boilerPlate = globals.boilerPlatesManager.boilerPlatesByLanguageAndType('csharp', 'boundedContext-adornment')[0];
    let boundedContextPath = path.join(context.destination, context.name);
    globals.folders.makeFolderIfNotExists(boundedContextPath);
    let templateContext = {
        id: Guid.create(),
        name: context.name,
        applicationId: application.id
    };
    globals.boilerPlatesManager.createInstance(boilerPlate, boundedContextPath, templateContext);
}
