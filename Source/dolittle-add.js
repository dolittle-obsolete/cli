#!/usr/bin/env node
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';

const USAGE = 'dolittle add [command] [args]';
args
    .command('command', 'A command')
    .command('commandhandler', 'A command handler')
    .command('event', 'An event')
    .command('eventprocessor', 'An event processor')
    .command('readmodel', 'A read model')
    .command('aggregateroot', 'An aggregate root')
    .command('query', 'A query')
    .command('queryfor', 'A query for a specific read model');

    
args.parse(process.argv, {value: global.usagePrefix + USAGE, name: 'dolittle add'});

if( !args.sub.length ) args.showHelp();
