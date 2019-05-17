/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { askToDownloadOrUpdateBoilerplates } from '@dolittle/tooling.common.boilerplates';
import checkBoilerplates from '../../../Actions/Boilerplates/checkBoilerplates';
import { CliContext } from '../../../CliContext';
import { ParserResult } from '../../../ParserResult';
import { Command } from '../../Command';
import { requireInternet } from '@dolittle/tooling.common.utilities';

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
        let spinner = context.outputter.spinner().start();
        await requireInternet((data: string) => spinner.text = data, (data: string) => spinner.warn(data));
        spinner.stop();
        let outOfDatePacakges: any = await checkBoilerplates(context.outputter, context.boilerplateDiscoverers, context.onlineBoilerplateDiscoverer, context.fileSystem);
        askToDownloadOrUpdateBoilerplates(outOfDatePacakges, context.boilerplateDiscoverers, context.dependencyResolvers, undefined, (data: string) => context.outputter.warn(data));    
    }
}