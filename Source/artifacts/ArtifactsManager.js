/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Folders } from '../Folders';
import { Logger } from 'winston';
import { BoilerPlatesManager} from '../boilerPlates/BoilerPlatesManager';
import { InquirerManager } from './InquirerManager';
import fs from 'fs';

const _boilerPlatesManager = new WeakMap();
const _folders = new WeakMap();
const _fileSystem = new WeakMap();
const _inquirerManager = new WeakMap();


/**
 * Represents a manager for artifacts
 */
export class ArtifactsManager {
    /**
     * Initializes a new instance of {ApplicationManager}
     * @param {InquirerManager} inquirerManager
     * @param {BoilerPlatesManager} boilerPlatesManager
     * @param {Folders} folders 
     * @param {fs} fileSystem
     * @param {Logger} logger
     */
    constructor(inquirerManager, boilerPlatesManager, folders, fileSystem, logger) {
        _inquirerManager.set(this, inquirerManager);
        _boilerPlatesManager.set(this, boilerPlatesManager);
        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        this._logger = logger;
    }

    /**
     * Create a command
     * @param {string} name 
     * @param {string} namespace 
     */
    createCommand(name, namespace) {
        this._logger.info(`Creating command with name '${name}' and namespace '${namespace}'`);

        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
        let context = {
            name: name,
            namespace: namespace
        };
        let destination = process.cwd();
        
        _boilerPlatesManager.get(this).createArtifactInstance('command', 'csharp', boilerPlate, destination, context);
    }
    /**
     * Create an event
     * @param {string} name 
     * @param {string} namespace 
     */
    createEvent(name, namespace) {
        this._logger.info(`Creating event with name '${name}' and namespace '${namespace}'`);

        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
        let context = {
            name: name,
            namespace: namespace
        };
        let destination = process.cwd();
        
        _boilerPlatesManager.get(this).createArtifactInstance('event', 'csharp', boilerPlate, destination, context);
    }
    /**
     * Create a read model
     * @param {string} name 
     * @param {string} namespace 
     */
    createReadModel(name, namespace) {
        this._logger.info(`Creating read model with name '${name}' and namespace '${namespace}'`);

        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
        let context = {
            name: name,
            namespace: namespace
        };
        let destination = process.cwd();
        
        _boilerPlatesManager.get(this).createArtifactInstance('readModel', 'csharp', boilerPlate, destination, context);
    }
    /**
     * Create an aggregate root
     * @param {string} name 
     * @param {string} namespace 
     */
    createAggregateRoot(name, namespace) {
        this._logger.info(`Creating aggregate root with name '${name}' and namespace '${namespace}'`);

        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
        let context = {
            name: name,
            namespace: namespace
        };
        let destination = process.cwd();
        
        _boilerPlatesManager.get(this).createArtifactInstance('aggregateRoot', 'csharp', boilerPlate, destination, context);
    }
    /**
     * Create a query
     * @param {string} language
     */
    createQuery(language) {

        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
        let destination = process.cwd();

        _inquirerManager.get(this).promptForQuery(language)
            .then(context => {
                this._logger.info(`Creating query with name '${context.name}'`)
                _boilerPlatesManager.get(this).createArtifactInstance('query', language, boilerPlate, destination, context);  
            });
    }
    /**
     * Create a query for a specific read model
     * @param {string} language
     */
    createQueryFor(language) {
        
        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
        let destination = process.cwd();
        _inquirerManager.get(this).promptForQueryfor(language)
            .then(context => {
                this._logger.info(`Creating query for '${context.readModel}' with name '${context.name}'`);
                _boilerPlatesManager.get(this).createArtifactInstance('queryFor', language, boilerPlate, destination, context);  
            });
    }
}