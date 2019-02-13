#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import globals from './globals';
import {boilerPlatesManager} from '@dolittle/tooling.common';
import { usagePrefix } from './helpers';

console.log('Online Dolittle boilerplates:');
boilerPlatesManager.discoverOnlineDolittleBoilerplates()
    .then(packages => {
        console.log(`Found ${packages.length} boilerplates\n`);
        packages.forEach(pkg => {
            console.log(`${pkg.name}:\nDescription: ${pkg.description}\nLink: https://npmjs.com/package/${pkg.name}\nInstall: npm i -g ${pkg.name}\n`);
        });
    });
