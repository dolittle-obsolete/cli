/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import Conf from 'conf';
import path from 'path';

/**
 * Represents a config file that's used as a cache storage for the cli. 
 *
 * @export
 * @class CliConfig
 * @extends {Conf}
 */
export class CliConfig extends Conf {
    /**
     * Creates an instance of {CliConfig}.
     * @param {string} configName The name of the configuration. Becomes the filename
     * @param {string} configFolder The path of the dolittle configuration folder
     * @param {{[key: string]: any}} defaultObj
     * @memberof CliConfig
     */
    constructor(configName: string, configFolder: string, defaultObj: {[key: string]: any}) {
        super({
            projectName: '.cli', 
            configName,
            cwd: path.join(configFolder, '.cli'),
            defaults: defaultObj,
            projectSuffix: ''
        });
    }
}