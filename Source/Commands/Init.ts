/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CliContext } from '../CliContext';
import { ParserResult } from '../ParserResult';
import { Command } from './Command';

const description = `<To be implemented> Initializes the Dolittle CLI by choosing a deafult core language and a default namespace.

'dolittle init' should also be used to set new defaults`;
const help = [
    '\t--namespace: <To be implemented>',
    '\t--coreLanguage: The default core language'

].join('\n');
export class Init extends Command {
    constructor() {
        super('init', description, 
            'dolittle init [-n | --namespace] [-c | --coreLanguage]', undefined, help, 'Initializes the Dolittle CLI');
    }
    
    async action(parserResult: ParserResult, context: CliContext) {
        if (parserResult.help) {
            context.outputter.print(this.helpDocs);
            return;
        }
        let projectConfigObj = context.projectConfig.store;
        
    }
}