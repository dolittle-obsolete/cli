#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import args from 'args';
import { usagePrefix } from './helpers';
import globals from './globals.js';
import request from 'request';
import cTable from 'console.table';
import dateformat from 'dateformat';

const USAGE = 'dolittle edge show locations';
args.example(USAGE, 'Shows all available locations and details');

args.parse(process.argv, { value: usagePrefix + USAGE, name: 'dolittle edge show locations' });

request(`${globals.edgeAPI}/api/Locations/List`, (error, response, body) => {
    let result = JSON.parse(body);
    let formatted = [];
    result.forEach(location => {
        formatted.push({
            'Id': location.id,
            'Name': location.name,
            'Nodes': `${location.connectedNodes}/${location.totalNodes}`,
            'Last Seen': dateformat(location.lastSeen, 'yyyy-mm-dd HH:MM:ss')
        });
    });

    console.table(formatted);
});