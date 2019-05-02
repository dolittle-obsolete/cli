/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import {boilerplatesConfig, projectConfig, getManagers, dolittleConfig, folders} from '@dolittle/tooling.common'
import { CommandManager } from './Commands/CommandManager';
import { Inquirer } from './Inquirer';
import { CliContext } from './CliContext';
import { ProjectConfig } from '@dolittle/tooling.common/dist/configuration/ProjectConfig';
import { BoilerplatesConfig } from '@dolittle/tooling.common/dist/configuration/BoilerplatesConfig';
import { BoilerplatesManager } from '@dolittle/tooling.common/dist/boilerplates/BoilerplatesManager';
import { ApplicationsManager } from '@dolittle/tooling.common/dist/applications/ApplicationsManager';
import { ArtifactsManager } from '@dolittle/tooling.common/dist/artifacts/ArtifactsManager';
import { BoundedContextsManager } from '@dolittle/tooling.common/dist/boundedContexts/BoundedContextsManager';
import { DependenciesManager } from '@dolittle/tooling.common/dist/dependencies/DependenciesManager';
import {getFileDirPath} from '@dolittle/tooling.common/dist/helpers';
import outputter from './Outputter';
import updateNotifier from 'update-notifier';
import { CommandsConfig } from './Configurations/CommandsConfig';

const pkg = require('../package.json');
const notifier = updateNotifier(
    {
        pkg, 
        updateCheckInterval: 1000 * 60 * 60 * 24, // A day

    }
);
/**
 * Initializes the CLI program
 *
 * @class Globals
 */
class Globals {
    isInitialized = false;
    
    #_projectConfig;
    #_boilerplatesConfig;

    #_inquirer;
    #_commandManager;

    #_boilerplatesManager;
    #_applicationsManager;
    #_artifactsManager;
    #_boundedContextsManager;
    #_dependenciesManager;

    #_cliContext;
    #_commandsConfig = new CommandsConfig(getFileDirPath(boilerplatesConfig.path));

    /**
     * Creates an instance of {Globals}.
     * @memberof Globals
     */
    constructor () {
        this.#_installHandlers();
        this.#_projectConfig = projectConfig;
        this.#_boilerplatesConfig = boilerplatesConfig;
        notifier.notify({isGlobal: true, message: 'There seems to be a new version of the CLI. Run \'dolittle check\' to check and update'});
    }
    /**
     * Gets the commands configuration object
     *
     * @readonly
     * @memberof Globals
     */
    get commandsConfig() {
        return this.#_commandsConfig;
    }
    /**
     * Gets the project configuration object
     *
     * @type {ProjectConfig}
     * @readonly
     * @memberof Globals
     */
    get projectConfig() {
        return this.#_projectConfig;
    }
    /**
     * Gets the boilerplates configuration object
     *
     * @type {BoilerplatesConfig}
     * @readonly
     * @memberof Globals
     */
    get boilerplatesConfig() {
        return this.#_boilerplatesConfig;
    }
    /**
     *
     * @type {BoilerplatesManager}
     * @readonly
     * @memberof Globals
     */
    get boilerplatesManager() {
        if (!this.#_boilerplatesManager) this.init();
        return this.#_boilerplatesManager;
    }
    /**
     *
     * @type {ApplicationsManager}
     * @readonly
     * @memberof Globals
     */
    get applicationsManager() {
        if (!this.#_applicationsManager) this.init();
        return this.#_applicationsManager;
    }
    /**
     *
     * @type {ArtifactsManager}
     * @readonly
     * @memberof Globals
     */
    get artifactsManager() {
        if (!this.#_artifactsManager) this.init();
        return this.#_artifactsManager;
    }
    /**
     *
     * @type {BoundedContextsManager}
     * @readonly
     * @memberof Globals
     */
    get boundedContextsManager() {
        if (!this.#_boundedContextsManager) this.init();
        return this.#_boundedContextsManager;
    }
    /**
     *
     * @type {DependenciesManager}
     * @readonly
     * @memberof Globals
     */
    get dependenciesManager() {
        if (!this.#_dependenciesManager) this.init();
        return this.#_dependenciesManager;
    }
    /**
     * Gets the Inquirer system 
     * @type {Inquirer}
     * @readonly
     * @memberof Globals
     */
    get inquirer() {
        if (!this.#_inquirer) this.init();
        return this.#_inquirer;
    }
    /**
     * Gets the Command Manager 
     * @type {CommandManager}
     * @readonly
     * @memberof Globals
     */
    get commandManager() {
        if (!this.#_commandManager) this.init();
        return this.#_commandManager;
    }
    /**
     * Gets the CLI Context 
     * @type {CliContext}
     * @readonly
     * @memberof Globals
     */
    get cliContext() {
        if (!this.#_cliContext) this.init();
        return this.#_cliContext;
    }

    init() {
        if (this.isInitialized) return;

        let spinner = outputter.spinner('Starting up tooling CLI').start();
        const managers = getManagers();
        this.#_boilerplatesManager = managers.boilerplatesManager;
        this.#_applicationsManager = managers.applicationsManager;
        this.#_artifactsManager = managers.artifactsManager;
        this.#_boundedContextsManager = managers.boundedContextsManager;
        this.#_dependenciesManager = managers.dependenciesManager;
        
        this.#_inquirer = new Inquirer(this.#_dependenciesManager);
        this.#_commandManager = new CommandManager(managers.boilerplatesManager, managers.applicationsManager, managers.boundedContextsManager, managers.artifactsManager, managers.dependenciesManager);
        this.#_cliContext = new CliContext(process.cwd(), outputter, dolittleConfig, this.#_projectConfig, this.#_boilerplatesConfig, this.#_commandsConfig,
            {
                boilerplatesManager: managers.boilerplatesManager,
                applicationsManager: managers.applicationsManager,
                boundedContextsManager: managers.boundedContextsManager,
                artifactsManager: managers.artifactsManager,
                dependenciesManager: managers.dependenciesManager,
                commandManager: this.#_commandManager
            }, this.#_inquirer, require('fs'), folders);
        
        spinner.stop();
    }
    
    #_installHandlers() {
        process.on('unhandledRejection', (reason, _) => {
            outputter.error(reason);
            process.exit(1);
        });
    }
    
}

export default new Globals();