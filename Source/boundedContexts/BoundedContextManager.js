/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BoilerPlatesManager } from '../boilerPlates/BoilerPlatesManager';
import { Guid } from '../Guid';
import { ApplicationManager } from '../applications/ApplicationManager';
import { Logger } from 'winston';
import path from 'path';
import fs from 'fs-extra';
import { BoundedContext } from './BoundedContext';
import global from '../global';

const _boilerPlatesManager = new WeakMap();
const _applicationManager = new WeakMap();
const _folders = new WeakMap();
const _fileSystem = new WeakMap();

const BOUNDED_CONTEXT_FILE_NAME = 'bounded-context.json';
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
     * Creates a complete bounded context from boilerplate
     * @param {string} name of the bounded context 
     */
    create(name) {
        this._logger.info(`Creating bounded context with name '${name}'`);
        if( !_applicationManager.get(this).hasApplication() ) {
            this._logger.error(`Missing application - use 'dolittle create application [name]' for a new application`);
            return;
        }

        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByLanguageAndType("csharp", "boundedContext")[0];
        let destination = path.join(process.cwd(), name);
        _folders.get(this).makeFolderIfNotExists(destination);
        let context = {
            id: Guid.create(),
            name: name
        };
        _boilerPlatesManager.get(this).createInstance(boilerPlate, destination, context);
    }
    /**
     * Searches the file hierarchy for bounded-context.json and returns the BoundedContext
     * @param {string} startPath to search from
     * @returns {BoundedContext} the bounded context
     */
    getNearestBoundedContextConfig(startPath) {
        const boundedContextConfigPath = this.getNearestBoundedContextPath(startPath);
        if (boundedContextConfigPath === "") {
            this._logger.error(`${BOUNDED_CONTEXT_FILE_NAME} was not found. Cannot create artifacts. Run dolittle create boundedcontext to create a new bounded context from scratch`);
            throw "Bounded context configuration not found"
        }
        this._logger.info(`Found bounded context configuration at path '${boundedContextConfigPath}'`);

        let boundedContextObj = JSON.parse(_fileSystem.get(this).readFileSync(boundedContextConfigPath, 'utf8'));
        let boundedContext = new BoundedContext(boundedContextObj.application, boundedContextObj.boundedContext, boundedContextObj.boundedContextName,
            boundedContextObj.backend, boundedContextObj.interaction);
        
        return boundedContext;
    }
    /**
     * Searches the file hierarchy for bounded-context.json and returns the path of the file
     * @param {string} startPath to search from
     * @returns {string} the path of the bounded context or '' if it was not found
     */
    getNearestBoundedContextPath(startPath) {
        let reg =  new RegExp("\\b"+BOUNDED_CONTEXT_FILE_NAME+"\\b");
        return _folders.get(this).getNearestFileSearchingUpwards(startPath, reg);
    }
}