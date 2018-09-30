/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Folders } from '../Folders';
import { Logger } from 'winston';
import { BoilerPlatesManager} from '../boilerPlates/BoilerPlatesManager';
import { ConfigManager } from '../configuration/ConfigManager';
import { Guid } from '../Guid';
import path from 'path';

const applicationFilename = "application.json";

const _boilerPlatesManager = new WeakMap();
const _configManager = new WeakMap();
const _folders = new WeakMap();
const _fileSystem = new WeakMap();


/**
 * Represents a manager for applications
 */
export class ApplicationManager {

    /**
     * Initializes a new instance of {ApplicationManager}
     * @param {BoilerPlatesManager} boilerPlatesManager
     * @param {ConfigManager} configManager
     * @param {Folders} folders 
     * @param {fs} fileSystem
     * @param {Logger} logger
     */
    constructor(boilerPlatesManager, configManager, folders, fileSystem, logger) {
        _boilerPlatesManager.set(this, boilerPlatesManager);
        _configManager.set(this, configManager);
        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        this._logger = logger;
    }

    /**
     * Create an application
     * @param {string} name 
     */
    create(name) {
        this._logger.info(`Creating application with name '${name}'`);

        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType("application")[0];
        let context = {
            id: Guid.create(),
            name: name
        };
        let destination = process.cwd();
        
        _boilerPlatesManager.get(this).createInstance(boilerPlate, destination, context);
    }

    /**
     * Check if an application has been setup in the given folder.
     * @param {string} folder path
     * @returns {boolean} whether or not the application configuration is set up
     */
    hasApplication(folder) {
        return _fileSystem.get(this).existsSync(path.join(folder,applicationFilename));
    }
}