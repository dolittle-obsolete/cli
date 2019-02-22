/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../../bin/CliContext';

class Installed extends Command {
    /**
     * Creates an instance of {Online}.
     * @memberof Installed
     */
    constructor() {
        super('installed', 'Lists installed boilerplates', 'usage: dolittle boilerplates installed', group);
    }
    /**
     * @inheritdoc
     * @param {ParserResult} parserResult
     * @param {CliContext} context
     */
    async action(parserResult, context) {
        
    }
}

export default new Installed();