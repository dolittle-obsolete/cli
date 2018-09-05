/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Folders } from '../Folders';
import { Logger } from 'winston';
import { ConfigManager } from '../configuration/ConfigManager';

const _folders = new WeakMap();
const _configManager = new WeakMap();


/**
 * Represents a manager for applications
 */
export class ApplicationManager {

    /**
     * Initializes a new instance of {ApplicationManager}
     * @param {Folders} folders 
     * @param {ConfigManager} configManager
     * @param {Logger} logger
     */
    constructor(folders, configManager, logger) {
        _folders.set(this, folders);
        _configManager.set(this, configManager);
        this._logger = logger;
    }

    /**
     * Create an application
     * @param {string} name 
     */
    create(name) {
        this._logger.info(`Creating application with name '${name}'`);
        

    }
}