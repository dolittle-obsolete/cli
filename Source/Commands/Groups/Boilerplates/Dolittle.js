/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import dolittleBoilerplates from '../../../Actions/Boilerplates/fetchDolittleBoilerplates';
import { CliContext } from '../../../CliContext';
import { ParserResult } from '../../../ParserResult';
import initBoilerplates from '../../../Actions/Boilerplates/initBoilerplates';
import { askToDownloadOrUpdateBoilerplates } from '../../../Actions/Boilerplates/downloadOrUpdateBoilerplates';

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
        let boilerplates = await dolittleBoilerplates(context.managers.boilerplatesManager, context.outputter);
        
        boilerplates.map(_ => `${_.name}@${_.version}`).forEach(_ => context.outputter.print(_));
        askToDownloadOrUpdateBoilerplates(boilerplates);    
        
    }
    
}
export default new Dolittle();