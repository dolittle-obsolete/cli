/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import {boilerplatesConfig, projectConfig, getManagers} from '@dolittle/tooling.common'
import { CommandManager } from './Commands/CommandManager';
import { Inquirer } from './Inquirer';
import { CliContext } from './CliContext';
import outputter from './Outputter';

/**
 * Initializes the CLI program
 *
 * @class Globals
 */
class Globals {
    isInitialized = false;
    
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
    get applicationsManager() {
        if (!this.#applicationsManager) this.init();
        return this.#applicationsManager;
    }
    get artifactsManager() {
        if (!this.#artifactsManager) this.init();
        return this.#artifactsManager;
    }
    get boundedContextsManager() {
        if (!this.#boundedContextsManager) this.init();
        return this.#boundedContextsManager;
    }
    get dependenciesManager() {
        if (!this.#dependenciesManager) this.init();
        return this.#dependenciesManager;
    }
    get inquirer() {
        if (!this.#inquirer) this.init();
        return this.#inquirer;
    }
    get commandManager() {
        if (!this.#commandManager) this.init();
        return this.#commandManager;
    }
    get cliContext() {
        if (!this.#cliContext) this.init();
        return this.#cliContext;
    }

    init() {
        if (this.isInitialized) return;

        let spinner = outputter.spinner('Starting up tooling CLI').start();
        const managers = getManagers();
        this.#boilerplatesManager = managers.boilerplatesManager;
        this.#applicationsManager = managers.applicationsManager;
        this.#artifactsManager = managers.artifactsManager;
        this.#boundedContextsManager = managers.boundedContextsManager;
        this.#dependenciesManager = managers.dependenciesManager;

        this.#inquirer = new Inquirer(this.#dependenciesManager);
        this.#commandManager = new CommandManager(managers.boilerplatesManager, managers.applicationsManager, managers.boundedContextsManager, managers.artifactsManager, managers.dependenciesManager);
        this.#cliContext = new CliContext(outputter, this.#projectConfig, 
            {
                boilerplatesManager: managers.boilerplatesManager,
                applicationsManager: managers.applicationsManager,
                boundedContextsManager: managers.boundedContextsManager,
                artifactsManager: managers.artifactsManager,
                dependenciesManager: managers.dependenciesManager,
                commandManager: this.#commandManager
            }, this.#inquirer, require('fs'));
        
        spinner.stop();
    }
    
    #installHandlers() {
        process.on('unhandledRejection', (reason, _) => {
            outputter.error(reason);
            process.exit(1);
        });
    }
    
}

export default new Globals();