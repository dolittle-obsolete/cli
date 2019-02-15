#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import globals from './globals';
import {boilerPlatesManager} from '@dolittle/tooling.common';
import { usagePrefix } from './helpers';

const USAGE = 'dolittle boilerplates online [...keywords - Additional keywords used in search] --limit [Total number of packages to fetch]';
args.option('limit', 'The limit of how many online packages should be fetched', 250);
args.example('dolittle boilerplates online boundedContext --limit 2', 'Test');

let flags = args.parse(process.argv, { value: usagePrefix + USAGE, name: 'dolittle boilerplates online' });   
console.log('Online boilerplates:');
boilerPlatesManager.discoverOnlineBoilerplates(args.sub, flags.limit)
    .then(packageNamesAndDescription => {
        console.log(`Found ${packageNamesAndDescription.length} boilerplates\n`);
        packageNamesAndDescription.forEach(nameAndDesc => {
            console.log(`${nameAndDesc.name}:\nDescription: ${nameAndDesc.description}\nLink: https://npmjs.com/package/${nameAndDesc.name}\nInstall: npm i -g ${nameAndDesc.name}\n`);
        });
        console.log('Install and update all:');
        console.log(`$ npm i -g ${packageNamesAndDescription.map(_ => _.name).join(' ')}`);
    });
