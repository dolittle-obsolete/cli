/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';
import listBoilerplates from './listBoilerplates';

class List extends Command {
    /**
     * Creates an instance of {Check}.
     * @memberof Installed
     */
    constructor() {
        super('list', 'Lists the boilerplates in use by the tooling', 'dolittle boilerplates list', group);
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
        await listBoilerplates(context.outputter, context.managers.boilerplatesManager);
    }
}

export default new List();