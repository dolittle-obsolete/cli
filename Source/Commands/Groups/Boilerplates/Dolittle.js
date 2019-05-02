/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import { CliContext } from '../../../CliContext';
import { ParserResult } from '../../../ParserResult';
import { askToDownloadOrUpdateBoilerplates } from '../../../Actions/Boilerplates/downloadOrUpdateBoilerplates';
import dolittleBoilerplates from '../../../Actions/Boilerplates/fetchDolittleBoilerplates';
import requireInternet from '../../../Util/requireInternet';
import installedBoilerplates from '../../../Actions/Boilerplates/installedBoilerplates';
import { isCompatibleUpgrade, isGreaterVersion } from '../../../Util/packageVersion';

class Dolittle extends Command {
    /**
     * Creates an instance of {Dolittle}.
     * @memberof Dolittle
     */
    constructor() {
        super('dolittle', 'Lists dolittle\'s boilerplates found on npm', 'dolittle boilerplates dolittle', group);
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
        let boilerplates = await dolittleBoilerplates(context.managers.boilerplatesManager, context.outputter);
        let localBoilerplates = await installedBoilerplates(context.outputter, context.managers.boilerplatesManager, context.filesystem);
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
export default new Dolittle();