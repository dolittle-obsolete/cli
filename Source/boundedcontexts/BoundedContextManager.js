/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BoilerPlatesManager } from '../boilerPlates/BoilerPlatesManager';
import { Guid } from '../Guid';
import { ApplicationManager } from '../applications/ApplicationManager';
import { Logger } from 'winston';
import path from 'path';
import fs from 'fs';

const _boilerPlatesManager = new WeakMap();
const _applicationManager = new WeakMap();
const _folders = new WeakMap();
const _fileSystem = new WeakMap();


/**
 * Represents the manager for bounded contexts
 */
export class BoundedContextManager {

    /**
     * Initializes a new instance of {BoundedContextManager}
     * @param {BoilerPlatesManager} boilerPlatesManager 
     * @param {ApplicationManager} applicationManager
     * @param {Folders} folders
     * @param {fs} fileSystem
     * @param {Logger} logger
     */
    constructor(boilerPlatesManager, applicationManager, folders, fileSystem, logger) {
        _boilerPlatesManager.set(this, boilerPlatesManager);
        _applicationManager.set(this, applicationManager);
        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        this._logger = logger;
    }

    /**
     * 
     * @param {*} name 
     */
    create(name) {
        this._logger.info(`Creating bounded context with name '${name}'`);
        if( !_applicationManager.get(this).hasApplication() ) {
            this._logger.error(`Missing application - use 'dolittle create application [name]' for a new application`);
            return;
        }

        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByLanguageAndType("csharp", "boundedContext")[0];
        let destination = path.join(process.cwd(),name);
        _folders.get(this).makeFolderIfNotExists(destination);
        let context = {
            id: Guid.create(),
            name: name
        };
        _boilerPlatesManager.get(this).createInstance(boilerPlate, destination, context);
    }
}