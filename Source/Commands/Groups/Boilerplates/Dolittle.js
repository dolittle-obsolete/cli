/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import dolittleBoilerplates from '../../../Actions/Boilerplates/fetchDolittleBoilerplates';
import { CliContext } from '../../../CliContext';
import { ParserResult } from '../../../ParserResult';
import { askToDownloadOrUpdateBoilerplates } from '../../../Actions/Boilerplates/downloadOrUpdateBoilerplates';
import requireInternet from '../../../Util/requireInternet';

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
        boilerplates.map(_ => `${_.name}@${_.version}`).forEach(_ => context.outputter.print(_));
        askToDownloadOrUpdateBoilerplates(boilerplates, context.managers.boilerplatesManager, context.outputter);    
        
    }
    
}
export default new Dolittle();