/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';

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

        let boilerplates = await onlineBoilerplates(context.managers.boilerplatesManager, context.outputter, keywords, limit? limit : 250);
        let localBoilerplates = await installedBoilerplates(context.outputter, context.managers.boilerplatesManager, context.fileSystem);
        let newAvailableBoilerplates = boilerplates.filter(boilerplate => !localBoilerplates.map(_ => _.packageJson.name).includes(boilerplate.name));
        let upgradeableBoilerplates = boilerplates.filter(boilerplate => localBoilerplates.map(_ => _.packageJson.name).includes(boilerplate.name))
            .map(boilerplate => new Object({name: boilerplate.name, version:boilerplate.version, localVersion: localBoilerplates.find(_ => _.packageJson.name === boilerplate.name).packageJson.version}))
            .filter(_ => isCompatibleUpgrade(_.localVersion, _.version) || isGreaterVersion(_.localVersion, _.version));
        
        context.outputter.warn(`Found ${newAvailableBoilerplates.length} new boilerplates`);
        context.outputter.print(newAvailableBoilerplates.map(_ => `${_.name} v${_.version}`).join('\t\n'));
        
        context.outputter.warn(`Found ${upgradeableBoilerplates.length} upgradeble boilerplates`);
        context.outputter.print(upgradeableBoilerplates.map(_ => `${_.name} v${_.localVersion} --> v${_.version}`).join('\t\n'));
        
        let boilerplatesToDownload = newAvailableBoilerplates.concat(upgradeableBoilerplates);
        await askToDownloadOrUpdateBoilerplates(boilerplatesToDownload, context.managers.boilerplatesManager, context.outputter);  
    }
}

export default new Online();