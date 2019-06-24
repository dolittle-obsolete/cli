/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { PromptDependency, IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { requireInternet, getLatestVersionFromNpm, isCompatibleUpgrade, isGreaterVersion, downloadPackagesFromNpmSync, DownloadPackageInfo } from '@dolittle/tooling.common.packages';
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';
import chalk from 'chalk';
import { Outputter } from '../Outputter';
import { BusyIndicator } from '../BusyIndicator';
import { WrappedCommand } from './WrappedCommand';
import hasHelpOption from '../Util/hasHelpOption';

const pkg = require('../../package.json');

const description = `Checks the Dolittle CLI by comparing the version of the CLI tool with the version tagged with 'latest' on NPM.
The version text is color coded:
    ${chalk.red('Red')}:    There is a major/breaking change update to the CLI.
    ${chalk.yellow('Yellow')}: There is a compatible upgrade to the CLI.
    ${chalk.green('Green')}:  The version of the CLI is greater or equal to the version tagged with 'latest' on NPM.

If there is an update to the CLI you will get to choose whether to download the latest one from NPM.
`;
export class Check extends WrappedCommand {

    constructor() {
        super('check', description, 
            'dolittle check', undefined, undefined, 'Checks the Dolittle CLI version');
    }

    async action(dependencyResolvers: IDependencyResolvers, currentWorkingDirectory: string, coreLanguage: string, commandArguments: string[], commandOptions: Map<string, string>, namespace?: string, 
                outputter: ICanOutputMessages = new Outputter(), busyIndicator: IBusyIndicator = new BusyIndicator()) {
        if (hasHelpOption(commandOptions)) {
            outputter.print(this.helpDocs);
            return;
        }
        await requireInternet(busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop()
        const currentVersion = pkg.version;
        const pkgName = pkg.name;
        const latestVersion = await getLatestVersionFromNpm(pkg.name, busyIndicator);
        if (busyIndicator.isBusy) busyIndicator.stop();
        
        const sameVersion = currentVersion === latestVersion;
        const compatibleUpgrade = isCompatibleUpgrade(latestVersion, currentVersion);
        const majorUpgrade = isGreaterVersion(latestVersion, currentVersion);
        this.output(outputter, pkgName, currentVersion, latestVersion, sameVersion, compatibleUpgrade, majorUpgrade);
        
        if (compatibleUpgrade || majorUpgrade) {
            const update = await this.askWhetherToUpdate(dependencyResolvers, majorUpgrade);
            let downloadPackageInfo: DownloadPackageInfo = {name: pkgName, version: latestVersion};
            if (update) {
                downloadPackagesFromNpmSync([downloadPackageInfo], busyIndicator);
                if (busyIndicator.isBusy) busyIndicator.stop();
            }
        }
    }

    getAllDependencies(currentWorkingDirectory: string, coreLanguage: string, commandArguments?: string[], commandOptions?: Map<string, string>, namespace?: string) {
        return this.dependencies;
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

    private async askWhetherToUpdate(dependencyResolvers: IDependencyResolvers, majorUpgrade: boolean) {
        let dep = new PromptDependency(
            'update',
            'Whether to update CLI or not',
            'confirm',
            `There is a ${majorUpgrade? 'major update' : 'minor update'} to the CLI. Do you wish to update to latest?`);
        let answers: {update: boolean} = await dependencyResolvers.resolve({}, [dep]);
        return answers.update;
    }
}
