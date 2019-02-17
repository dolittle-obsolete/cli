/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {logger, dependenciesManager, folders, applicationsManager, boundedContextsManager, boilerPlatesManager, artifactsManager, dolittleConfig} from '@dolittle/tooling.common';
import { Inquirer } from '../Inquirer';
import { CommandManager } from '../Commands/CommandManager';
import { handleUncaughtException } from './helpers';
import updateNotifier from 'update-notifier';

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
        process.on('unhandledRejection', (reason) => {
            handleUncaughtException(reason, logger);
            process.exit(1);
        });
        process.on('uncaughtException', err => {
            handleUncaughtException(err, logger);
            process.exit(1);
        });
        
        this.#inquirer = new Inquirer(dependenciesManager, logger);
        this.#commandManager = new CommandManager(folders, applicationsManager, boundedContextsManager, artifactsManager, dependenciesManager, this.#inquirer, logger, dolittleConfig);
        this.notifyUpdate();

        boilerPlatesManager.init();
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

    notifyUpdate() {
        updateNotifier({pkg: require('../package.json'), }).notify({isGlobal: true});
    }
}

export default new globals();