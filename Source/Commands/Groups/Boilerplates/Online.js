/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { group } from './Boilerplates';
import { ParserResult } from '../../../ParserResult';
import { CliContext } from '../../../CliContext';
import onlineBoilerplates from '../../../Actions/Boilerplates/fetchOnlineBoilerplates';
import { askToDownloadOrUpdateBoilerplates } from '../../../Actions/Boilerplates/downloadOrUpdateBoilerplates';
import requireInternet from '../../../Util/requireInternet';

class Online extends Command {
    /**
     * Creates an instance of {Online}.
     * @memberof Online
     */
    constructor() {
        super('online', 'Lists boilerplates found on npm', 'dolittle boilerplates online [keywords...] [-l | --limit]', group, 
            [
                '\tkeywords: Additional keywords used in the npmjs search',
                '\t-l | --limit: The maximum limit of fetched npm packages. Cannot exceed 250 or be lower that 0'
            ].join('\n'));
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
        let keywords = [parserResult.firstArg, ...parserResult.restArgs, ...parserResult.extraArgs];
        let limit = parserResult.extraOpts['l']? parserResult.extraOpts['l'] : parserResult.extraOpts['limit'];

        let boilerplates = await onlineBoilerplates(context.managers.boilerplatesManager, context.outputter, keywords, limit? limit : 250);
        boilerplates.map(_ => `${_.name}@${_.version}`).forEach(_ => context.outputter.print(_));
        
        askToDownloadOrUpdateBoilerplates(boilerplates, context.managers.boilerplatesManager, context.outputter);    
    }
}

export default new Online();