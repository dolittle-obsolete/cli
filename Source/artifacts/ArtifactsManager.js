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
    createCommand(language) {
        
        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
        let destination = process.cwd();
        _inquirerManager.get(this).promptForCommand(language)
            .then(context => {
                this._logger.info(`Creating command with name '${context.name}' and namespace '${context.namespace}'`);
                _boilerPlatesManager.get(this).createArtifactInstance('command', language, boilerPlate, destination, context);  
            });
    }
    /**
     * Create an event
     * @param {string} name 
     * @param {string} namespace 
     */
    createEvent(language) {
        
        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
        let destination = process.cwd();
        _inquirerManager.get(this).promptForEvent(language)
            .then(context => {
                this._logger.info(`Creating event with name '${context.name}' and namespace '${context.namespace}'`);
                _boilerPlatesManager.get(this).createArtifactInstance('event', language, boilerPlate, destination, context);  
            });
    }
    /**
     * Create a read model
     * @param {string} name 
     * @param {string} namespace 
     */
    createReadModel(language) {

        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
        let destination = process.cwd();
        _inquirerManager.get(this).promptForReadModel(language)
            .then(context => {
                this._logger.info(`Creating read model with name '${context.name}' and namespace '${context.namespace}'`);
                _boilerPlatesManager.get(this).createArtifactInstance('readModel', language, boilerPlate, destination, context);  
            });
    }
    /**
     * Create an aggregate root
     * @param {string} name 
     * @param {string} namespace 
     */
    createAggregateRoot(language) {

        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
        let destination = process.cwd();
        _inquirerManager.get(this).promptForAggregateRoot(language)
            .then(context => {
                this._logger.info(`Creating aggregate root with name '${context.name}' and namespace '${context.namespace}'`);
                _boilerPlatesManager.get(this).createArtifactInstance('aggregateRoot', language, boilerPlate, destination, context);  
            });
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