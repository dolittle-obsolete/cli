/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { requireInternet, isCompatibleUpgrade, isGreaterVersion } from '@dolittle/tooling.common.utilities';
import dolittleBoilerplates from '../../..//Actions/Boilerplates/fetchDolittleBoilerplates';
import installedBoilerplates from '../../../Actions/Boilerplates/listInstalledBoilerplates';
import { CliContext } from '../../../CliContext';
import { ParserResult } from '../../../ParserResult';
import { Command } from '../../Command';
import { askToDownloadOrUpdateBoilerplates } from '@dolittle/tooling.common.boilerplates';

export class Dolittle extends Command {
    /**
     * Creates an instance of {Dolittle}.
     * @memberof Dolittle
     */
    constructor() {
        super('dolittle', 'Lists dolittle\'s boilerplates found on npm', 'dolittle boilerplates dolittle', 'boilerplates');
    }

    async action(parserResult: ParserResult, context: CliContext) {
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        let spinner = context.outputter.spinner().start();
        await requireInternet((data: string) => spinner.text = data, (data: string) => spinner.warn(data));
        spinner.stop();
        let boilerplates = await dolittleBoilerplates(context.onlineBoilerplateDiscoverer, context.outputter);
        let localBoilerplates = await installedBoilerplates(context.outputter, context.boilerplateDiscoverers, context.fileSystem);
        let newAvailableBoilerplates = boilerplates.filter(boilerplate => !localBoilerplates.map(_ => _.packageJson.name).includes(boilerplate.name));
        let upgradeableBoilerplates = boilerplates.filter(boilerplate => localBoilerplates.map(_ => _.packageJson.name).includes(boilerplate.name))
            .map(boilerplate => {
                let localBoilerplate = localBoilerplates.find(_ => _.packageJson.name === boilerplate.name);
                if (localBoilerplate) {
                    return {name: boilerplate.name, version:boilerplate.version, localVersion: localBoilerplate.packageJson.version};
                }
                return undefined;
            })
            .filter(_ => (_ && isCompatibleUpgrade(_.localVersion, _.version)) || (_ && isGreaterVersion(_.localVersion, _.version)));
        
        context.outputter.warn(`Found ${newAvailableBoilerplates.length} new boilerplates`);
        context.outputter.print(newAvailableBoilerplates.map(_ => `${_.name} v${_.version}`).join('\t\n'));
        
        context.outputter.warn(`Found ${upgradeableBoilerplates.length} upgradeble boilerplates`);
        context.outputter.print(upgradeableBoilerplates.map((_: any) => `${_.name} v${_.localVersion} --> v${_.version}`).join('\t\n'));
            
        let boilerplatesToDownload = newAvailableBoilerplates.concat(<any>upgradeableBoilerplates);
        await askToDownloadOrUpdateBoilerplates(boilerplatesToDownload, context.boilerplateDiscoverers, context.dependencyResolvers);    
    }
    
}