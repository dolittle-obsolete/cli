/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import initBoilerplates from '../../../Actions/Boilerplates/initBoilerplatesSystem';
import { CliContext } from '../../../CliContext';
import { ParserResult } from '../../../ParserResult';
import { Command } from '../../Command';

export class Init extends Command {
    /**
     * Creates an instance of {Check}.
     * @memberof Installed
     */
    constructor() {
        super('init', 'Initializes the boilerplates system', 'dolittle boilerplates init', 'boilerplates');
    }

    async action(parserResult: ParserResult, context: CliContext) {
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        await initBoilerplates(context.outputter, context.boilerplateDiscoverers);
    }
}