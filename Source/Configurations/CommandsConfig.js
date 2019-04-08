/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CliConfig } from './CliConfig';

export class CommandsConfig extends CliConfig {
    /**
     * Creates an instance of {CommandsConfig}.
     * @param {string} configFolder The path of the dolittle configuration folder
     * @memberof CliConfig
     */
    constructor(configFolder) {
        super('commands', configFolder, {create: {}, add: {}});
    }
}