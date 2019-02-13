#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import args from 'args';
import globals from './globals';
import {boilerPlatesManager} from '@dolittle/tooling.common';
import semver from 'semver';

console.log('Checking versions:\n');
let paths = boilerPlatesManager.installedBoilerplatePaths;
let locallyInstalled = [];
paths.map(path => JSON.parse(require('fs').readFileSync(require('path').join(path, 'package.json'), {encoding: 'utf8'})))
    .forEach(pkg => {
        locallyInstalled.push({name: pkg.name, version: pkg.version});    
    });

boilerPlatesManager.getLatestBoilerplateVersion(...locallyInstalled.map(pkg => pkg.name))
    .then(latestVersions => {
        locallyInstalled.forEach((pkg, i) => {
            if (semver.gt(latestVersions[i], pkg.version)) {
                console.log(`${pkg.name} is outdated.\n\t$ npm i -g ${pkg.name}`);
            }
        });
    });

