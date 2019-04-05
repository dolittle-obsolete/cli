/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';
import checkBoilerplates from '../../../Actions/Boilerplates/checkBoilerplates';
import { askToDownloadOrUpdateBoilerplates } from '../../../Actions/Boilerplates/downloadOrUpdateBoilerplates';

class Check extends Command {
    /**
     * Creates an instance of {Check}.
     * @memberof Installed
     */
    constructor() {
        super('check', 'Lists installed boilerplates that are out of date', 'dolittle boilerplates check', group);
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
        let outOfDatePacakges = await checkBoilerplates(context.outputter, context.managers.boilerplatesManager, context.filesystem);
        askToDownloadOrUpdateBoilerplates(outOfDatePacakges, context.managers.boilerplatesManager, context.outputter);    
    }
}

export default new Check();