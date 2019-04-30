/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import latestVersion from 'latest-version';
import semver from 'semver';
import outputter from '../Outputter';

/**
 * Gets the latest version of a package from npmjs.com
 *
 * @export
 * @param {string} pkgName The name of the package
 * @returns The latest version
 */
export async function getLatestVersion(pkgName) {
    let spinner = outputter.spinner(`Getting latest version of ${pkgName}`).start();
    let version = await latestVersion(pkgName)
        .catch( error => {
            spinner.fail(`Failed to get the latest version of ${pkgName}. ${error.message? error.message : error}`);
            throw error;
        });
    spinner.stop(`Got latest version of ${pkgName}`);
    return version;
} 
/**
 * Checks whether or not the 'to' version is greater than 'from' 
 *
 * @export
 * @param {string} to
 * @param {string} from
 * @returns Whether to is a greater version than from
 */
export function isGreaterVersion(to, from) {
    return semver.gt(to, from);
}
/**
 * Checks whether the upgrade 'to' 'from' is a compatible upgrade, meaning that both versions have the same major version number but 'to' is an upgrade in minor or patch compared to 'from'
 *
 * @export
 * @param {string} to
 * @param {string} from
 * @returns
 */
export function isCompatibleUpgrade(to, from) {
    return semver.major(to) === semver.major(from) && semver.gt(to, from);
}