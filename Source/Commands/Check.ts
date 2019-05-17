/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { requireInternet, getLatestVersionFromNpm, isCompatibleUpgrade, isGreaterVersion } from '@dolittle/tooling.common.utilities';
import chalk from 'chalk';
import spawn from 'cross-spawn';
import inquirer from 'inquirer';
import { CliContext } from '../CliContext';
import { Outputter } from '../Outputter';
import { ParserResult } from '../ParserResult';
import { Command } from './Command';

const pkg = require('../../package.json');
const description = `Checks the Dolittle CLI by comparing the version of the CLI tool with the version tagged with 'latest' on NPM.
The version text is color coded:
    ${chalk.red('Red')}:    There is a major/breaking change update to the CLI.
    ${chalk.yellow('Yellow')}: There is a compatible upgrade to the CLI.
    ${chalk.green('Green')}:  The version of the CLI is greater or equal to the version tagged with 'latest' on NPM.

If there is an update to the CLI you will get to choose whether to download the latest one from NPM.
`;
export class Check extends Command {
    constructor() {
        super('check', description, 
            'dolittle check', undefined, undefined, 'Checks the Dolittle CLI version');
    }

    async action(parserResult: ParserResult, context: CliContext) {
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        let spinner = context.outputter.spinner().start();
        await requireInternet((data: string) => spinner.text = data, (data: string) => spinner.warn(data));
        spinner.stop();
        const currentVersion = pkg.version;
        const pkgName = pkg.name;
        spinner = context.outputter.spinner().start();
        const latestVersion = await getLatestVersionFromNpm(pkg.name, (data: string) => spinner.text = data, (data: string) => spinner.fail(data));
        if (spinner.isSpinning) spinner.stop();
        
        const sameVersion = currentVersion === latestVersion;
        const compatibleUpgrade = isCompatibleUpgrade(latestVersion, currentVersion);
        const majorUpgrade = isGreaterVersion(latestVersion, currentVersion);
        this.output(context.outputter, pkgName, currentVersion, latestVersion, sameVersion, compatibleUpgrade, majorUpgrade);
        
        if (compatibleUpgrade || majorUpgrade) {
            const update = await this.askWhetherToUpdate(majorUpgrade);
            if (update)
                spawn('npm', ['i', '-g', `${pkgName}@${latestVersion}`], {cwd: process.cwd(), stdio: 'inherit'});
        }
    }
    private output(outputter: Outputter, pkgName: string, currentVersion: string, latestVersion: string, sameVersion?: boolean, compatibleUpgrade?: boolean, majorUpgrade?: boolean) {
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
    private async askWhetherToUpdate(majorUpgrade: boolean) {
        let answers: {update: boolean} = await inquirer.prompt([
            {
                type: 'confirm', default: false, name: 'update', 
                message: `There is a ${majorUpgrade? 'major update' : 'minor update'} to the CLI. Do you wish to update to latest?`
            }
        ]);
        return answers['update'];
    }
}
