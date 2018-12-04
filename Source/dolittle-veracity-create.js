#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import { usagePrefix } from './helpers';

const USAGE = 'dolittle veracity create [command] [args]';
args
    .command('boundedcontext', 'A bounded context');
    
args.parse(process.argv, {value: usagePrefix + USAGE, name: 'dolittle veracity create'});

if( !args.sub.length ) args.showHelp();