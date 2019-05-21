#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import { usagePrefix } from './helpers';
import globals from './globals.js';

const USAGE = 'dolittle edge get [command] [options]';
args
    .command('location', 'Get status from specific location');
    //.command('locations', 'Get status from all locations')
    //.command('nodes', 'Get status from nodes at a specific location')
    //.command('modules', 'Get status from modules running on a specific node at a specific location');
    
args.parse(process.argv, {value: usagePrefix + USAGE, name: 'dolittle edge get'});

if( !args.sub.length ) args.showHelp();