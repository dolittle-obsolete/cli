/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { CommandContext, IFailedCommandOutputter } from '@dolittle/tooling.common.commands';
import { PromptDependency, IDependencyResolvers, confirmUserInputType } from '@dolittle/tooling.common.dependencies';
import { requireInternet, isCompatibleUpgrade, isGreaterVersion, DownloadPackageInfo, IConnectionChecker, ICanFindLatestVersionOfPackage, ICanDownloadPackages, ILatestCompatiblePackageFinder } from '@dolittle/tooling.common.packages';
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';
import chalk from 'chalk';
import { Command, ParserResult, FailedCommandOutputter } from '../internal';

const pkg = require('../../package.json');

const description = `Checks the Dolittle CLI by comparing the version of the CLI tool with the version tagged with 'latest' on NPM.
The version text is color coded:
    ${chalk.red('Red')}:    There is a major/breaking change update to the CLI.
    ${chalk.yellow('Yellow')}: There is a compatible upgrade to the CLI.
    ${chalk.green('Green')}:  The version of the CLI is greater or equal to the version tagged with 'latest' on NPM.

If there is an update to the CLI you will get to choose whether to download the latest one from NPM.
`;
export class Check extends Command {

    constructor(private _latestPackageVersionFinder: ICanFindLatestVersionOfPackage, private _latestCompatiblePackageFinder: ILatestCompatiblePackageFinder,
        private _packageDownloader: ICanDownloadPackages, private _connectionChecker: IConnectionChecker, private _toolingPackage: any) {
        super('check', description,
            'dolittle check', undefined, undefined, 'Checks the Dolittle CLI version');
    }

    async trigger(parserResult: ParserResult, commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        if (parserResult.help) {
            outputter.print(this.getHelpDoc());
            return;
        }
        await this.action(commandContext, dependencyResolvers, new FailedCommandOutputter(this, outputter), outputter, busyIndicator);

    }

    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        await requireInternet(this._connectionChecker, busyIndicator);

        const majorUpgrade = await this.checkCLI(dependencyResolvers, outputter);
        if (!majorUpgrade) await this.checkToolingPlatform(dependencyResolvers, outputter);
    }

    private async checkCLI(dependencyResolvers: IDependencyResolvers, outputter: ICanOutputMessages) {
        const currentVersion = pkg.version;
        const pkgName = pkg.name;
        const latestVersion = await this._latestPackageVersionFinder.find(pkg.name);

        const sameVersion = currentVersion === latestVersion;
        const compatibleUpgrade = isCompatibleUpgrade(latestVersion, currentVersion);
        const majorUpgrade = isGreaterVersion(latestVersion, currentVersion);
        this.output(outputter, pkgName, currentVersion, latestVersion, sameVersion, compatibleUpgrade, majorUpgrade);

        let performedMajorUpdate = false;

        if (compatibleUpgrade || majorUpgrade) {
            const update = await this.askWhetherToUpdate('CLI', dependencyResolvers);
            if (update) {
                const downloadPackageInfo: DownloadPackageInfo = {name: pkgName, version: latestVersion};
                this._packageDownloader.downloadSync([downloadPackageInfo]);
                if (majorUpgrade) performedMajorUpdate = true;
            }
        }
        return performedMajorUpdate;
    }

    private async checkToolingPlatform(dependencyResolvers: IDependencyResolvers, outputter: ICanOutputMessages) {
        const latestCompatibleVersion = (await this._latestCompatiblePackageFinder.find('@dolittle/tooling.common'))?.version!;
        this.output(outputter, 'Tooling Platform', this._toolingPackage.version, latestCompatibleVersion);
        const shouldUpdate = isGreaterVersion(latestCompatibleVersion, this._toolingPackage.version);
        if (shouldUpdate) {
            const update = await this.askWhetherToUpdate('Tooling Platform', dependencyResolvers);
            if (update) this.updateToolingPlatform(latestCompatibleVersion);
        }
    }

    private updateToolingPlatform(latestCompatibleVersion: string) {
        this._packageDownloader.downloadSync([
            '@dolittle/tooling.common',
            '@dolittle/tooling.common.boilerplates',
            '@dolittle/tooling.common.commands',
            '@dolittle/tooling.common.configurations',
            '@dolittle/tooling.common.dependencies',
            '@dolittle/tooling.common.files',
            '@dolittle/tooling.common.logging',
            '@dolittle/tooling.common.login',
            '@dolittle/tooling.common.packages',
            '@dolittle/tooling.common.plugins',
            '@dolittle/tooling.common.utilities',
            ].map(_ => {
                return {
                    name: _,
                    version: latestCompatibleVersion
                } as DownloadPackageInfo;
            }));
    }

    private output(outputter: ICanOutputMessages, pkgName: string, currentVersion: string, latestVersion: string, sameVersion?: boolean, compatibleUpgrade?: boolean, majorUpgrade?: boolean) {
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
            outputter.print(`${pkgName} ${versionText} - You're using the latest compatible version`);
        else
            outputter.print(`${pkgName} ${versionText} --> ${latestVersionText}`);
    }

    private async askWhetherToUpdate(whatToDownload: string, dependencyResolvers: IDependencyResolvers) {
        const dep = new PromptDependency(
            'update',
            'Whether to update or not',
            [],
            confirmUserInputType,
            `There is a new version of the ${whatToDownload}. Do you wish to update to latest?`);
        const answers: {update: boolean} = await dependencyResolvers.resolve({}, [dep]);
        return answers.update;
    }
}
