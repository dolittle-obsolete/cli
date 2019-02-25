/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Outputter } from '../Outputter';
import { getLatestVersion, isGreaterVersion, isCompatibleUpgrade } from '../Util/packageVersion';
import chalk from 'chalk';

/**
 * Outputs the latest version of a package through the outputter.
 * 
 * Latest version is based on what is tagged with 'latest' on npmjs.com
 * 
 * Green color indicates latest version. 
 * Yellow color indicates that there is a minor or patch upgrade
 * Red color indicates that there is a major upgrade
 *
 * @param {string} pkgName The name of the package
 * @param {string} currentVersion The current version of the package in SemVer format
 * @param {Outputter} outputter
 */
async function outputLatestVersion(pkgName, currentVersion, outputter) {
    const latest = await getLatestVersion(pkgName);
    let versionText = `v${currentVersion}`;
    
    if (isCompatibleUpgrade(latest, currentVersion)) versionText = chalk.yellow(versionText);
    else if (isGreaterVersion(latest, currentVersion)) versionText = chalk.red(versionText);
    else versionText = chalk.green(versionText);
    
    outputter.print(`${pkgName} ${versionText}\n\t${pkgName}@${currentVersion} --> ${pkgName}@${latest}`);
}

export default outputLatestVersion;