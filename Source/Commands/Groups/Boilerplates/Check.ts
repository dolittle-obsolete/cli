/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import checkBoilerplates from '../../../Actions/Boilerplates/checkBoilerplates';
import askToDownloadOrUpdateBoilerplates from '../../../Actions/Boilerplates/askToDownloadOrUpdateBoilerplates';
import { CliContext } from '../../../CliContext';
import { ParserResult } from '../../../ParserResult';
import requireInternet from '../../../Util/requireInternet';
import { Command } from '../../Command';

const description = `Checks whether you have boilerplates that are out of date.

Lists installed boilerplates that are out of date with the latest version.

Asks whether to download the latest boilerplates or not.
`;
export class Check extends Command {
    /**
     * Creates an instance of {Check}.
     * @memberof Installed
     */
    constructor() {
        super('check', description, 'dolittle boilerplates check', 'boilerplates', '', 'Checks whether you have boilerplates that are out of date', );
    }

    async action(parserResult: ParserResult, context: CliContext) {
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        await requireInternet(context.outputter);
        let outOfDatePacakges: any = await checkBoilerplates(context.outputter, context.boilerplateDiscoverers, context.onlineBoilerplateDiscoverer, context.fileSystem);
        askToDownloadOrUpdateBoilerplates(outOfDatePacakges, context.boilerplateDiscoverers, context.outputter);    
    }
}