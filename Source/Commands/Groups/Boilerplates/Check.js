/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';
import checkBoilerplates from './checkBoilerplates';

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
        await checkBoilerplates(context.outputter, context.managers.boilerplatesManager, context.filesystem);
    }
}

export default new Check();