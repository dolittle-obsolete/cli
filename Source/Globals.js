/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CommandManager } from './Commands/CommandManager';
import { Inquirer } from './Inquirer';
import {boilerplatesConfig, projectConfig, getManagers} from '@dolittle/tooling.common'
class Globals {
    #projectConfig;
    #boilerplatesConfig;
    #inquirer;
    #commandManager;

    #boilerplatesManager;
    #applicationsManager;
    #artifactsManager;
    #boundedContextsManager;
    #dependenciesManager;

    #cliContext;

    /**
     * Creates an instance of {Globals}.
     * @memberof Globals
     */
    constructor () {
        this.#installHandlers();
        this.#projectConfig = projectConfig;
        this.#boilerplatesConfig = boilerplatesConfig;

        // this.#inquirer = new Inquirer();
        // this.#commandManager = new CommandManager();
    }

    get inquirer() {
        return this.#inquirer;
    }
    get commandManager() {
        return this.#commandManager;
    }
    get projectConfig() {
        return this.#projectConfig;
    }
    get boilerplatesConfig() {
        return this.#boilerplatesConfig;
    }
    get boilerplatesManager() {
        if (!this.#boilerplatesManager) this.init();
        return this.#boilerplatesManager;
    }

    init() {
        const managers = getManagers();
        this.#boilerplatesManager = managers.boilerplatesManager;
        
    }
    
    #installHandlers() {
        process.on('unhandledRejection', (reason, _) => {
            console.error('Unhandled rejection:', reason.stack)
        });
    }
    
}

export default new Globals();