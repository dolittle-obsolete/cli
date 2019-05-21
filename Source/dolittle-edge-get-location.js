#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import { usagePrefix } from './helpers';
import globals from './globals.js';
import request from 'request';
import dateformat from 'dateformat';
import cTable from 'console.table';


const USAGE = 'dolittle edge get location [name]';
args.example(USAGE, 'Gets location status');
    
args.parse(process.argv, {value: usagePrefix + USAGE, name: 'dolittle edge get location [name]'});

if( !args.sub.length || args.sub.length > 1) args.showHelp();

request(`${globals.edgeAPI}/api/Locations/${args.sub[0]}`, (error, response, body) => {
    let result = JSON.parse(body);

    result.nodes.forEach(node => {
        let lastUpdated = Date.parse(node.lastUpdated);
        let prettyDateTime = dateformat(lastUpdated, 'yyyy-mm-dd HH:MM:ss');
        console.log(`State for node: ${node.name} @ ${prettyDateTime}\n`);
        
        let states = [];
        let state = {};
        for( let key in node.state ) {
            state[key] = `${parseInt(node.state[key])}%`;
        }
        states.push(state);

        console.table(states);
    });

});