/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import installedBoilerplates from '../../../Actions/Boilerplates/listInstalledBoilerplates';
import { CliContext } from '../../../CliContext';
import { ParserResult } from '../../../ParserResult';
import { Command } from '../../Command';

export class Installed extends Command {
    
    /**
     * Creates an instance of {Online}.
     * @memberof Installed
     */
    constructor() {
        super('installed', 'Lists installed boilerplates', 'dolittle boilerplates installed', 'boilerplates');
    }

    async action(parserResult: ParserResult, context: CliContext) {
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        let boilerplates = await installedBoilerplates(context.outputter, context.boilerplateDiscoverers, context.fileSystem)
            .catch((error: Error) => {
                context.outputter.warn('An error occured while getting the installed boilerplates.\nError message:');
                context.outputter.error(error);
                context.outputter.warn('The problem might be that you haven\'t initialized the tooling');
                return [];
            });
        boilerplates.forEach(_ => context.outputter.print(_.packageJson.name));
    }
}