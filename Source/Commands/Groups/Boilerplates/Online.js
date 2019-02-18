/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import { ParserResult } from '../../../ParserResult';

class Online extends Command{
    /**
     * Creates an instance of {Online}.
     * @memberof Online
     */
    constructor() {
        super('online', 'Lists boilerplates found on npm based on keywords', 'usage: dolittle boilerplates online', group);
    }
    /**
     * @inheritdoc
     * @param {ParserResult} parserResult
     * @param {} context
     */
    async action(parserResult, context) {
        
    }
}

export default new Online();