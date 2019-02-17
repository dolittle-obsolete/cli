#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import globals from './globals';
import {boilerPlatesManager} from '@dolittle/tooling.common';
import { usagePrefix } from './helpers';
import Outputter from '../Outputter';

let spinner = Outputter.spinner(('Online Dolittle boilerplates:')).start();
boilerPlatesManager.discoverOnlineDolittleBoilerplates()
    .then(packages => {
        spinner.succeed(`Found ${packages.length} boilerplates\n`);
        packages.forEach(pkg => {
            Outputter.print(`${pkg.name}:\nDescription: ${pkg.description}\nLink: https://npmjs.com/package/${pkg.name}\nInstall: npm i -g ${pkg.name}\n`);
        });
        Outputter.print('Install and update all:');
        Outputter.print(`$ npm i -g ${packages.map(_ => _.name).join(' ')}`);
    }).catch(error => spinner.fail(`An error occured while fetching boilerplates.\n${error.stackTrace}`));
