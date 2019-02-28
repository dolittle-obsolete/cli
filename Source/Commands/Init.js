/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from './Command';
import { CliContext } from '../CliContext';
import { ParserResult } from '../ParserResult';

class Init extends Command {
    constructor() {
        super('init', 'Initializes the Dolittle CLI', 
            'dolittle init [-n | --namespace] [-c | --coreLanguage]', undefined, '');
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
        let projectConfigObj = context.projectConfig.store;
        
    }
}

export default new Init();