/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';

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
    async action(parserResult: ParserResult, context: CliContext) {
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        await listBoilerplates(context.outputter, context.managers.boilerplatesManager).catch((error: Error) => {
            context.outputter.warn('An error occured while getting the used boilerplates.\nError message:');
            context.outputter.error(error);
            context.outputter.warn('There problem might be that you haven\'t initialized the tooling');
        });
    }
}

export default new List();