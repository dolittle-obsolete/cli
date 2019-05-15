/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { askToDownloadOrUpdateBoilerplates } from '../../../Actions/Boilerplates/downloadOrUpdateBoilerplates';
import onlineBoilerplates from '../../../Actions/Boilerplates/fetchOnlineBoilerplates';
import installedBoilerplates from '../../../Actions/Boilerplates/installedBoilerplates';
import { CliContext } from '../../../CliContext';
import { ParserResult } from '../../../ParserResult';
import { isCompatibleUpgrade, isGreaterVersion } from '../../../Util/packageVersion';
import requireInternet from '../../../Util/requireInternet';
import { Command } from '../../Command';
import { group } from './Boilerplates';

class Online extends Command {
    /**
     * Creates an instance of {Online}.
     * @memberof Online
     */
    constructor() {
        super('online', 'Lists boilerplates found on npm', 'dolittle boilerplates online [<keywords>...] [-l | --limit]', group, 
            [
                '\tkeywords: Additional keywords used in the npmjs search',
                '\t-l | --limit: The maximum limit of fetched npm packages. Cannot exceed 250 or be lower that 0'
            ].join('\n'));
    }

    /**
     * @inheritdoc
     * @param {ParserResult} parserResult
     * @param {CliContext} context
     */
    async action(parserResult: ParserResult, context: CliContext) {
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        await requireInternet(context.outputter);
        let keywords = parserResult.getCommandArgs();
        let limit = parserResult.extraOpts['l']? parserResult.extraOpts['l'] : parserResult.extraOpts['limit'];

        let boilerplates = await onlineBoilerplates(context.onlineBoilerplateDiscoverer, context.outputter, keywords, limit? limit : 250);
        let localBoilerplates = await installedBoilerplates(context.outputter, context.boilerplateDiscoverers, context.fileSystem);
        let newAvailableBoilerplates = boilerplates.filter(boilerplate => !localBoilerplates.map(_ => _.packageJson.name).includes(boilerplate.name));
        let upgradeableBoilerplates = boilerplates.filter(boilerplate => localBoilerplates.map(_ => _.packageJson.name).includes(boilerplate.name))
            .map(boilerplate => {
                let localBoilerplate = localBoilerplates.find(_ => _.packageJson.name === boilerplate.name);
                if (localBoilerplate) {
                    return {name: boilerplate.name, version:boilerplate.version, localVersion: localBoilerplate.packageJson.version};
                } 
                return undefined
            })
            .filter(_ => (_ && isCompatibleUpgrade(_.localVersion, _.version)) || (_ && isGreaterVersion(_.localVersion, _.version)));

        
        context.outputter.warn(`Found ${newAvailableBoilerplates.length} new boilerplates`);
        context.outputter.print(newAvailableBoilerplates.map(_ => `${_.name} v${_.version}`).join('\t\n'));
        
        context.outputter.warn(`Found ${upgradeableBoilerplates.length} upgradeble boilerplates`);
        context.outputter.print(upgradeableBoilerplates.map((_: any) => `${_.name} v${_.localVersion} --> v${_.version}`).join('\t\n'));
        
        let boilerplatesToDownload = newAvailableBoilerplates.concat(<any>upgradeableBoilerplates);
        await askToDownloadOrUpdateBoilerplates(boilerplatesToDownload, context.boilerplateDiscoverers, context.outputter);  
    }
}

export default new Online();