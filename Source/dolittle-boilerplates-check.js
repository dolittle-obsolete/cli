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
import outputter from './outputter';

let spinner = outputter.spinner('Checking versions:\n').start();
let paths = boilerPlatesManager.installedBoilerplatePaths;
let locallyInstalled = [];
paths.map(path => JSON.parse(require('fs').readFileSync(require('path').join(path, 'package.json'), {encoding: 'utf8'})))
    .forEach(pkg => {
        locallyInstalled.push({name: pkg.name, version: pkg.version});    
    });

new Promise(async (resolve) => {
    let outOfDatePackages = [];
    for (let pkg of locallyInstalled) {
        spinner.text = `Checking ${pkg.name}`;
        await boilerPlatesManager.getLatestBoilerplateVersion(pkg.name)
            .then(latestVersions => {
                let latestVersion = latestVersions[0];
                if (semver.gt(latestVersion, pkg.version)) {
                    outOfDatePackages.push({name: pkg.name, version: pkg.version, latest: latestVersion});
                    spinner.warn(`${pkg.name}: ${pkg.version} ==> ${latestVersion} `);
                    spinner = outputter.spinner().start();
                }
            }).catch(_ => spinner.fail(`Failed to fetch ${pkg.name}`));
    }
    resolve(outOfDatePackages);

}).then(outOfDatePackages => {
    if (outOfDatePackages.length > 0) {
        spinner.warn(`There are ${outOfDatePackages.length} out-of-date packages:\n`);
        outputter.warn('Update all packages with');
        outputter.warn(`$ npm i -g ${outOfDatePackages.map(_ => _.name).join(' ')}`);
    } 
    else spinner.succeed('All boilerplates are up-to-date');
});

