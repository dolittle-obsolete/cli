/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from './Command';

export class HelpCommand extends Command{
    constructor() {
        super('help', 'Displays help information', 
            'usage: \n\t$ dolittle help\n\t$ dolittle --help\n\t$ dolittle -h\n\t$ dolittle <any command> [help, --help, -h]');
    }
}

export default new HelpCommand();