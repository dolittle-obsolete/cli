/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Outputter } from '../../Outputter';
import { BoilerplatesManager } from '@dolittle/tooling.common';
import semver from 'semver';
import path from 'path';
import requireInternet from '../../Util/requireInternet';

/**
 * Checks the version of the installed boilerplates
 *
 * @export
 * @param {Outputter} outputter
 * @param {BoilerplatesManager} boilerplatesManager
 * @param {import('fs')} filesystem
 * @returns {Promise<{name: string, version: string, latest: string}[]>} Returns a Promise containing a list of out-of-date packages with current version and the latest compatible version
 */
export default async function checkBoilerplates(outputter, boilerplatesManager, filesystem) {
    await requireInternet(outputter);
    let spinner = outputter.spinner('Checking versions:\n').start();
    let paths = boilerplatesManager.installedBoilerplatePaths;
    let locallyInstalled = [];
    paths.map(filePath => JSON.parse(filesystem.readFileSync(path.join(filePath, 'package.json'), {encoding: 'utf8'})))
        .forEach(pkg => {
            locallyInstalled.push({name: pkg.name, version: pkg.version});    
        });

    return new Promise(async (resolve) => {
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
        return outOfDatePackages;
    });
}