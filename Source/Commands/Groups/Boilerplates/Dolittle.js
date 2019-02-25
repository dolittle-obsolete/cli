/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import dolittleBoilerplates from '../../../Actions/fetchDolittleBoilerplates';
import { CliContext } from '../../../CliContext';

class Dolittle extends Command {
    /**
     * Creates an instance of {Dolittle}.
     * @memberof Dolittle
     */
    constructor() {
        super('dolittle', 'Lists dolittle\'s boilerplates found on npm', 'usage: dolittle boilerplates dolittle', group);
    }
    /**
     * @inheritdoc
     * @param {ParserResult} parserResult
     * @param {CliContext} context
     */
    async action(parserResult, context) {
        let boilerplates = await dolittleBoilerplates(context.managers.boilerplatesManager, context.outputter);
        
        boilerplates.map(_ => `${_.name}@${_.version}`).forEach(_ => context.outputter.print(_));
    }
}

export default new Dolittle();