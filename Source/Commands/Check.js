/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from './Command';
import { CliContext } from '../CliContext';
import { ParserResult } from '../ParserResult';
import outputLatestVersion from '../Actions/outputLatestVersion';
import requireInternet from '../Util/requireInternet';

const pkg = require('../../package.json');

class Check extends Command {
    constructor() {
        super('check', 'Checks the Dolittle CLI version', 
            'dolittle check', undefined);
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
        await requireInternet(context.outputter);
        await outputLatestVersion(pkg.name, pkg.version, context.outputter);
    }
}

export default new Check();