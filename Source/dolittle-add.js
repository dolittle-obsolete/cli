#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import { usagePrefix } from './helpers';
import globals from './globals.js';

const USAGE = 'dolittle add [command]';
args
    .command('command', 'A command')
    .command('commandhandler', 'A command handler')
    .command('concept', 'A concept')
    .command('intconcept', 'A concept as int')
    .command('guidconcept', 'A concept as Guid')
    .command('stringconcept', 'A concept as string')
    .command('event', 'An event')
    .command('eventprocessor', 'An event processor')
    .command('readmodel', 'A read model')
    .command('aggregateroot', 'An aggregate root')
    .command('query', 'A query')
    .command('queryfor', 'A query for a specific read model')
    .command('feature', 'Adds features accross concerns');

    
args.parse(process.argv, {value: usagePrefix + USAGE, name: 'dolittle add'});

if( !args.sub.length ) args.showHelp();
