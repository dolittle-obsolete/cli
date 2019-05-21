#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import { usagePrefix } from './helpers';
import globals from './globals.js';

const USAGE = 'dolittle edge show [command] [options]';
args
    .command('locations', 'Show all locations');
    //.command('nodes', 'Show nodes at a specific location');
    
    args.parse(process.argv, {value: usagePrefix + USAGE, name: 'dolittle edge show'});

if( !args.sub.length ) args.showHelp();