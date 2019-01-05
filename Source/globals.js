/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {logger, dependenciesManager, folders, applicationsManager, boundedContextsManager, artifactsManager, dolittleConfig} from '@dolittle/tooling.common';
import { Inquirer } from './Inquirer';
import { CommandManager } from './CommandManager';

/**
 * Common globals object
 */
class globals {
    #commandManager;
    #inquirer;
    /**
     * Perform initialization
     */
    constructor() {
        this.#inquirer = new Inquirer(dependenciesManager, logger);
        this.#commandManager = new CommandManager(folders, applicationsManager, boundedContextsManager, artifactsManager, dependenciesManager, this.#inquirer, logger, dolittleConfig)
    }
    /**
     * Gets the {InquirerManager
     * @returns {InquirerManager}}
     */
    get inquirerManager() {
        return this.#inquirer;
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