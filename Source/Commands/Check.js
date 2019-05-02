/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from './Command';
import { CliContext } from '../CliContext';
import { ParserResult } from '../ParserResult';
import requireInternet from '../Util/requireInternet';
import { getLatestVersion, isCompatibleUpgrade, isGreaterVersion } from '../Util/packageVersion';
import chalk from 'chalk';
import { Outputter } from '../Outputter';

const pkg = require('../../package.json');
const description = `Checks the Dolittle CLI by comparing the version of the CLI tool with the version tagged with 'latest' on NPM.
The version text is color coded:
    Red:    There is a major/breaking change update to the CLI.
    Yellow: There is a compatible upgrade to the CLI.
    Green:  The version of the CLI is greater or equal to the version tagged with 'latest' on NPM.
`;
class Check extends Command {
    constructor() {
        super('check', description, 
            'dolittle check', undefined, undefined, 'Checks the Dolittle CLI version');
    }
    /**
     * @inheritdoc
     * @param {ParserResult} parserResult
     * @param {CliContext} context
     */
    async action(parserResult, context) {
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        await requireInternet(context.outputter);
        const currentVersion = pkg.version;
        const pkgName = pkg.name;
        const latestVersion = await getLatestVersion(pkg.name, context.outputter);
        const sameVersion = currentVersion === latestVersion;
        const compatibleUpgrade = isCompatibleUpgrade(latestVersion, currentVersion);
        const majorUpgrade = isGreaterVersion(latestVersion, currentVersion);
        this.output(context.outputter, pkgName, currentVersion, latestVersion, sameVersion, compatibleUpgrade, majorUpgrade);

    }
    /**
     *
     *
     * @param {Outputter} outputter
     * @param {string} pkgName The name of the package
     * @param {string} currentVersion The current version of the package
     * @param {string} latestVersion The latest version of the package
     * @param {boolean} [sameVersion] Whether or not the package is the latest version
     * @param {boolean} [compatibleUpgrade] Whether or not there is a minor or patch upgrade of the package
     * @param {boolean} [majorUpgrade] Whether or not there is a major breaking change upgrade of the package
     * @memberof Check
     */
    output(outputter, pkgName, currentVersion, latestVersion, sameVersion, compatibleUpgrade, majorUpgrade) {
        if (sameVersion === undefined) sameVersion = currentVersion === latestVersion;
        if (compatibleUpgrade === undefined) compatibleUpgrade = isCompatibleUpgrade(latestVersion, currentVersion);
        if (majorUpgrade === undefined) majorUpgrade = isGreaterVersion(latestVersion, currentVersion);
        
        const latestVersionText = chalk.green(latestVersion);
        let versionText = `v${currentVersion}`;
    
        if (compatibleUpgrade)
            versionText = chalk.yellow(versionText);
        
        else if (majorUpgrade)
            versionText = chalk.red(versionText);

        else
            versionText = chalk.green(versionText);
        
        if (sameVersion)
            outputter.print(`${pkgName} ${versionText} - You're using the version tagged with 'latest'`);
        else
            outputter.print(`${pkgName} ${versionText} --> ${latestVersionText}`);
    }
}

export default new Check();