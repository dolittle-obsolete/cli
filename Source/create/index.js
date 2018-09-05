#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';

// Dynamically get all boilerplates by language


args
    .command('application', 'A bounded context')
    .command('boundedcontext', 'A bounded context')
    ;
    
const flags = args.parse(process.argv);

if( args.sub.length == 0 ) args.showHelp();