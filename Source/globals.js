/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {logger, dependencyManager, applicationsManager, boundedContextsManager, artifactsManager, dolittleConfig} from '@dolittle/tooling.common';
import { InquirerManager } from './artifacts/InquirerManager';
import { CommandManager } from './CommandManager';

/**
 * Common globals object
 */
class globals {
    #commandManager;
    #inquirerManager;
    /**
     * Perform initialization
     */
    constructor() {
        this.#inquirerManager = new InquirerManager(dependencyManager, logger);
        this.#commandManager = new CommandManager(applicationsManager, boundedContextsManager, artifactsManager, this.#inquirerManager, logger, dolittleConfig)
    }
    /**
     * Gets the {InquirerManager
     * @returns {InquirerManager}}
     */
    get inquirerManager() {
        return this.#inquirerManager;
    }
    /**
     * Gets the {CommandManager}
     * @returns {CommandManager}
     */
    get commandManager() {
        return this.#commandManager;
    }
}

export default new globals();