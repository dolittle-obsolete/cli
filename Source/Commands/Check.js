/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from './Command';
import { CliContext } from '../CliContext';
import { ParserResult } from '../ParserResult';
import { getLatestVersion, isCompatibleUpgrade, isGreaterVersion } from '../Util/packageVersion';
import { Outputter } from '../Outputter';
import spawn from 'cross-spawn';
import inquirer from 'inquirer';
import requireInternet from '../Util/requireInternet';
import chalk from 'chalk';

const pkg = require('../../package.json');
const description = `Checks the Dolittle CLI by comparing the version of the CLI tool with the version tagged with 'latest' on NPM.
The version text is color coded:
    ${chalk.red('Red')}:    There is a major/breaking change update to the CLI.
    ${chalk.yellow('Yellow')}: There is a compatible upgrade to the CLI.
    ${chalk.green('Green')}:  The version of the CLI is greater or equal to the version tagged with 'latest' on NPM.
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
        
        if (compatibleUpgrade || majorUpgrade) {
            const update = await this.#askWhetherToUpdate(majorUpgrade);
            if (update)
                spawn('npm', ['i', '-g', `${pkgName}@${latestVersion}`], {cwd: process.cwd(), stdio: 'inherit'});
        }
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
    /**
     * Asks the user whether or not the update the tooling
     * @param {boolean} majorUpgrade Whether there is a major upgrade or not
     */
    async #askWhetherToUpdate(majorUpgrade) {
        let answers = await inquirer.prompt([
            {
                type: 'confirm', default: false, name: 'update', 
                message: `There is a ${majorUpgrade? 'major update' : 'minor update'} to the CLI. Do you wish to update to latest?`
            }
        ]);
        return answers['update'];
    }
}

export default new Check();