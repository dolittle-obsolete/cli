/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import semver from 'semver';
import path from 'path';
import { Outputter } from '../../Outputter';
import { BoilerplatesManager } from '@dolittle/tooling.common';

/**
 * Checks the version of the installed boilerplates
 *
 * @export
 * @param {Outputter} outputter
 * @param {BoilerplatesManager} boilerplatesManager
 * @param {import('fs')} filesystem
 */
export default async function checkBoilerplates(outputter, boilerplatesManager, filesystem) {
    let spinner = outputter.spinner('Checking versions:\n').start();
    let paths = boilerplatesManager.installedBoilerplatePaths;
    let locallyInstalled = [];
    paths.map(filePath => JSON.parse(filesystem.readFileSync(path.join(filePath, 'package.json'), {encoding: 'utf8'})))
        .forEach(pkg => {
            locallyInstalled.push({name: pkg.name, version: pkg.version});    
        });

    new Promise(async (resolve) => {
        let outOfDatePackages = [];
        for (let pkg of locallyInstalled) {
            spinner.text = `Checking ${pkg.name}`;
            await boilerplatesManager.latestCompatibleBoilerplate(pkg.name)
                .then(packageJson => {
                    let latestVersion = packageJson.version;
                    if (semver.gt(latestVersion, pkg.version)) {
                        outOfDatePackages.push({name: pkg.name, version: pkg.version, latest: latestVersion});
                        spinner.warn(`${pkg.name}@${pkg.version} ==> ${latestVersion}`);
                        spinner = outputter.spinner().start();
                    }
                }).catch(_ => spinner.fail(`Failed to fetch ${pkg.name}`));
        }
        resolve(outOfDatePackages);

    }).then(outOfDatePackages => {
        if (outOfDatePackages.length > 0) {
            spinner.warn(`There are ${outOfDatePackages.length} out-of-date packages:\n`);
        } 
        else spinner.succeed('All boilerplates are up-to-date');
    });
}