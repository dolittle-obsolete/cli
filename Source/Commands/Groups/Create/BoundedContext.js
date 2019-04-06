/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Create';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';

class BoundedContext extends Command {
    /**
     * Creates an instance of {BoundedContext}.
     * @memberof Installed
     */
    constructor() {
        super('boundedcontext', 'Scaffolds a dolittle bounded context', 'dolittle create boundedcontext', group);
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
    }
}

export default new BoundedContext();