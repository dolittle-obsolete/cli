#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import globals from './globals';
import {boilerPlatesManager} from '@dolittle/tooling.common';
import semver from 'semver';
import { usagePrefix } from './helpers';

const USAGE = 'dolittle boilerplates check';
args
    .example(USAGE, 'Checks for out-of-date boilerplates installed on the system');
args.parse(process.argv, {value: usagePrefix + USAGE, name: 'dolittle boilerplates check'});

console.log('Checking versions:\n');
let paths = boilerPlatesManager.installedBoilerplatePaths;
let locallyInstalled = [];
paths.map(path => JSON.parse(require('fs').readFileSync(require('path').join(path, 'package.json'), {encoding: 'utf8'})))
    .forEach(pkg => {
        locallyInstalled.push({name: pkg.name, version: pkg.version});    
    });

boilerPlatesManager.getLatestBoilerplateVersion(...locallyInstalled.map(pkg => pkg.name))
    .then(latestVersions => {
        let anyOutOfDate = false;
        locallyInstalled.forEach((pkg, i) => {
            if (semver.gt(latestVersions[i], pkg.version)) {
                locallyInstalled[i].outOfDate = true;
                anyOutOfDate = true;
            }
        });

        if (anyOutOfDate) {
            let outOfDatePackages = locallyInstalled.map((pkg, i) => new Object({outOfDate: pkg.outOfDate, name: pkg.name, version: pkg.version, latest: latestVersions[i]})).filter(pkg => pkg.outOfDate);
            console.log(`There are ${outOfDatePackages.length} out-of-date packages:`);
            outOfDatePackages.forEach(pkg => console.log(`${pkg.name}: ${pkg.version} ==> ${pkg.latest}`));
            console.log();
            console.log('Update all packages with');
            console.log(`$ npm i -g ${outOfDatePackages.map(_ => _.name).join(' ')}`);
        } 
        else console.log('All boilerplates are up-to-date');
    });

