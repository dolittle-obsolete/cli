/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';
const description = `Checks whether you have boilerplates that are out of date.

Lists installed boilerplates that are out of date with the latest version.

Asks whether to download the latest boilerplates or not.
`;
class Check extends Command {
    /**
     * Creates an instance of {Check}.
     * @memberof Installed
     */
    constructor() {
        super('check', description, 'dolittle boilerplates check', group, '', 'Checks whether you have boilerplates that are out of date', );
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
        await requireInternet(context.outputter);
        let outOfDatePacakges = await checkBoilerplates(context.outputter, context.managers.boilerplatesManager, context.fileSystem);
        askToDownloadOrUpdateBoilerplates(outOfDatePacakges, context.managers.boilerplatesManager, context.outputter);    
    }
}

export default new Check();