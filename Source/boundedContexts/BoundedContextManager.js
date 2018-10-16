/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable no-unused-vars */
import { BoilerPlatesManager } from '../boilerPlates/BoilerPlatesManager';
import { Guid }from '../Guid';
import { ApplicationManager } from '../applications/ApplicationManager';
import {Logger} from 'winston';
import path from 'path';
import fs from 'fs-extra';
import { BoundedContext } from './BoundedContext';
import { Folders } from '../Folders';
/* eslint-enable no-unused-vars */

/**
 * @type {WeakMap<BoundedContextManager, BoilerPlatesManager>}
 */
const _boilerPlatesManager = new WeakMap();
/**
 * @type {WeakMap<BoundedContextManager, ApplicationManager>}
 */
const _applicationManager = new WeakMap();
/**
 * @type {WeakMap<BoundedContextManager, Folders>}
 */
const _folders = new WeakMap();
/**
 * @type {WeakMap<BoundedContextManager, fs>}
 */
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
     * @param {{name: string, destination: string}} context of the bounded context 
     */
    create(context) {
        this._logger.info(`Creating bounded context with name '${context.name}'`);

        let application = _applicationManager.get(this).getApplicationFrom(context.destination);

        if( application === null ) {
            this._logger.error('Missing application - use \'dolittle create application [name]\' for a new application');
            return;
        }

        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByLanguageAndType('csharp', 'boundedContext')[0];
        
        let boundedContextPath = path.join(context.destination, context.name);
        
        _folders.get(this).makeFolderIfNotExists(boundedContextPath);
        let templateContext = {
            id: Guid.create(),
            name: context.name,
            applicationId: application.id
        };
        _boilerPlatesManager.get(this).createInstance(boilerPlate, boundedContextPath, templateContext);
    }
    /**
     * Searches the file hierarchy for bounded-context.json and returns the BoundedContext
     * @param {string} startPath to search from
     * @returns {BoundedContext} the bounded context
     */
    getNearestBoundedContextConfig(startPath) {
        const boundedContextConfigPath = this.getNearestBoundedContextPath(startPath);
        if (boundedContextConfigPath === '') {
            this._logger.error(`${BOUNDED_CONTEXT_FILE_NAME} was not found. Cannot create artifacts. Run dolittle create boundedcontext to create a new bounded context from scratch`);
            throw 'Bounded context configuration not found';
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
        let reg =  new RegExp('\\b'+BOUNDED_CONTEXT_FILE_NAME+'\\b');
        return _folders.get(this).getNearestFileSearchingUpwards(startPath, reg);
    }
}