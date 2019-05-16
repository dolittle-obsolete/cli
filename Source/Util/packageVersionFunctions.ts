/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import latestVersion from 'latest-version';
import semver from 'semver';
import { Outputter } from '../Outputter';
import requireInternet from './requireInternet';

/**
 * Gets the latest version of a package from npmjs.com
 *
 * @export
 * @param {string} pkgName The name of the package
 * @param {Outputter} [outputter] The optional outputter. If given this function creates a spinner
 * @returns The latest version
 */
export async function getLatestVersion(pkgName: string, outputter: Outputter) {
    await requireInternet(outputter);
    let spinner = outputter? outputter.spinner().start(`Getting latest version of ${pkgName}`) : undefined;
    try {
        const version = await latestVersion(pkgName);
        if (spinner) spinner.stop();
        return version;
    } catch (error) {
        if (spinner) spinner.fail(`Failed to get the latest version of ${pkgName}. Error: ${error.message? error.message : error}`);
        throw error;
    }
} 
/**
 * Checks whether or not the 'to' version is greater than 'from' 
 *
 * @export
 * @param {string} to
 * @param {string} from
 * @returns Whether to is a greater version than from
 */
export function isGreaterVersion(to: string, from: string) {
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
export function isCompatibleUpgrade(to: string, from: string) {
    return semver.major(to) === semver.major(from) && semver.gt(to, from);
}