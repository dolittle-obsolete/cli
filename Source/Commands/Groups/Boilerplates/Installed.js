/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';
import installedBoilerplates from './installedBoilerplates';

class Installed extends Command {
    
    /**
     * Creates an instance of {Online}.
     * @memberof Installed
     */
    constructor() {
        super('installed', 'Lists installed boilerplates', 'dolittle boilerplates installed', group);
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
        let boilerplates = await installedBoilerplates(context.outputter, context.managers.boilerplatesManager, context.filesystem);
        boilerplates.forEach(_ => context.outputter.print(_.packageJson.name));
    }
}

export default new Installed();