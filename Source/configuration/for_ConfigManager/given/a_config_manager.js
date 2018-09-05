/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { all_dependencies } from './all_dependencies';
import { ConfigManager } from '../../ConfigManager';

export class a_config_manager extends all_dependencies {
    constructor() {
        super();
        
        this.configManager = new ConfigManager(this.fs, this.configParser);
    }
}