/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanFindOnlineBoilerplatePackages, IBoilerplateDiscoverers } from '@dolittle/tooling.common.boilerplates';
import * as FsExtra from 'fs-extra';
import semver from 'semver';
import path from 'path';
import { Outputter } from '../../Outputter';
import requireInternet from '../../Util/requireInternet';

export type OutOfDatePackage = {
    name: string, version: string, latest: string
}
/**
 * Checks the version of the installed boilerplates
 *
 * @export
 * @param {Outputter} outputter
 * @param {ICanDiscoverBoilerplates} localBoilerplatesDiscovere
 * @param {ICanFindOnlineBoilerplatePackages} onlineBoilerplatesDiscoverer
 * @param {typeof FsExtra} fileSystem
 * @returns
 */
export default async function checkBoilerplates(outputter: Outputter, boilerplateDiscoverers: IBoilerplateDiscoverers, onlineBoilerplatesDiscoverer: ICanFindOnlineBoilerplatePackages,
    fileSystem: typeof FsExtra) {
    await requireInternet(outputter);
    let spinner = outputter.spinner('Checking versions:\n').start();
    let paths = boilerplateDiscoverers.boilerplatePaths;
    if (paths.length < 1) {
        spinner.warn('No boilerplates installed');
        return [];
    }
    let locallyInstalled: {name: string, version: string}[] = [];
    paths.map(filePath => fileSystem.readJsonSync(path.join(filePath, 'package.json'), {encoding: 'utf8'}))
        .forEach(pkg => {
            locallyInstalled.push({name: pkg.name, version: pkg.version});    
        });

    return new Promise(async (resolve) => {
        let outOfDatePackages: OutOfDatePackage[] = [];
        for (let pkg of locallyInstalled) {
            spinner.text = `Checking ${pkg.name}`;
            await onlineBoilerplatesDiscoverer.latestCompatibleBoilerplate(pkg.name)
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
        if ((<any[]>outOfDatePackages).length > 0) {
            spinner.warn(`There are ${(<any[]>outOfDatePackages).length} out-of-date packages:\n`);
        } 
        else spinner.succeed('All boilerplates are up-to-date');
        return outOfDatePackages;
    });
}