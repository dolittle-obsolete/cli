/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Folders } from '../Folders';
import { Logger } from 'winston';
import { BoilerPlatesManager} from '../boilerPlates/BoilerPlatesManager';
import { InquirerManager } from './InquirerManager';
import fs from 'fs';
import global from '../global';
import { BoilerPlate } from '../boilerPlates/BoilerPlate';

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
     * Searches the file directories for the bounded-context.json configuration file recursively by going upwards in the hierarchy
     * @return {any} bounded context configuration object
     */
    _getNearestBoundedContextConfig() {
        let boundedContextConfigPath = global.getNearestBoundedContextConfig();
    
        if (boundedContextConfigPath === "") {
            this._logger.error('bounded-context.json was not found. Cannot create artifacts. Run dolittle create boundedcontext to create a new bounded context from scratch');
            process.exit(1);
        }
        
        this._logger.info(`Using bounded-context.json at path '${boundedContextConfigPath}'`);

        let boundedContext = JSON.parse(_fileSystem.get(this).readFileSync(boundedContextConfigPath, 'utf8'));
        this._validateBoundedContext(boundedContext);
        return boundedContext;
    }
    /**
     * Validates the fields of the parsed bounded-context.json object 
     * @param {any} boundedContext 
     */
    _validateBoundedContext(boundedContext) {
        if (boundedContext.language === undefined || boundedContext.language === null || boundedContext.language === '') {
            this._logger.error('The bounded-context.json configuration is missing "language"');
            process.exit(1);
        }
    }
    /**
     * Retrieves the boilerplate.json configuration for artifacts with the given language
     * @param {string} language 
     * @return {BoilerPlate} The Boilerplate with of the given language
     */
    _getArtifactsBoilerPlateByLanguage(language) {
        const type = 'artifacts';

        let boilerPlates = _boilerPlatesManager.get(this).boilerPlatesByLanguageAndType(language, type);
        if (boilerPlates === null || boilerPlates.length === 0) {
            this._logger.error(`Could not find a boilerplate.json configuration for language: ${language} and type: ${type}`)
            process.exit(1);
        }
        if (boilerPlates.length > 1) {
            this._logger.error(`Found more than one boilerplate.json configuration for language: ${language} and type: ${type}`)
            process.exit(1);
        }
        return boilerPlates[0];
    }
    /**
     * Create a command
     * @param {any} flags 
     */
    createCommand(flags) {

        let boundedContextConfig = this._getNearestBoundedContextConfig();
        flags.language = boundedContextConfig.language;
        let boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
        let destination = process.cwd();
        _inquirerManager.get(this).promptForCommand(flags)
            .then(context => {
                this._logger.info(`Creating command with name '${context.name}' and namespace '${context.namespace}'`);
                _boilerPlatesManager.get(this).createArtifactInstance('command', flags.language, boilerPlate, destination, context);  
            });
    }
    /**
     * Create an event
     * @param {any} flags
     */
    createEvent(flags) {
        
        let boundedContextConfig = this._getNearestBoundedContextConfig();
        flags.language = boundedContextConfig.language;
        let boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
        let destination = process.cwd();

        _inquirerManager.get(this).promptForEvent(flags)
            .then(context => {
                this._logger.info(`Creating event with name '${context.name}' and namespace '${context.namespace}'`);
                _boilerPlatesManager.get(this).createArtifactInstance('event', flags.language, boilerPlate, destination, context);  
            });
    }
    /**
     * Create an event processor
     * @param {any} flags
     */
    createEventProcessor(flags) {
        
        let boundedContextConfig = this._getNearestBoundedContextConfig();
        flags.language = boundedContextConfig.language;
        let boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
        let destination = process.cwd();

        _inquirerManager.get(this).promptForEventProcessor(flags)
            .then(context => {
                this._logger.info(`Creating event with name '${context.name}' and namespace '${context.namespace}'`);
                _boilerPlatesManager.get(this).createArtifactInstance('eventProcessor', flags.language, boilerPlate, destination, context);  
            });
    }
    /**
     * Create a read model
     * @param {any} flags
     */
    createReadModel(flags) {

        let boundedContextConfig = this._getNearestBoundedContextConfig();
        flags.language = boundedContextConfig.language;
        let boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
        let destination = process.cwd();

        _inquirerManager.get(this).promptForReadModel(flags)
            .then(context => {
                this._logger.info(`Creating read model with name '${context.name}' and namespace '${context.namespace}'`);
                _boilerPlatesManager.get(this).createArtifactInstance('readModel', flags.language, boilerPlate, destination, context);  
            });
    }
    /**
     * Create an aggregate root
     * @param {any} flags
     */
    createAggregateRoot(flags) {

        let boundedContextConfig = this._getNearestBoundedContextConfig();
        flags.language = boundedContextConfig.language;
        let boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
        let destination = process.cwd();

        _inquirerManager.get(this).promptForAggregateRoot(flags)
            .then(context => {
                this._logger.info(`Creating aggregate root with name '${context.name}' and namespace '${context.namespace}'`);
                _boilerPlatesManager.get(this).createArtifactInstance('aggregateRoot', flags.language, boilerPlate, destination, context);  
            });
    }
    /**
     * Create a query
     * @param {any} flags
     */
    createQuery(flags) {

        let boundedContextConfig = this._getNearestBoundedContextConfig();
        flags.language = boundedContextConfig.language;
        let boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
        let destination = process.cwd();

        _inquirerManager.get(this).promptForQuery(flags)
            .then(context => {
                this._logger.info(`Creating query with name '${context.name}'`)
                _boilerPlatesManager.get(this).createArtifactInstance('query', flags.language, boilerPlate, destination, context);  
            });
    }
    /**
     * Create a query for a specific read model
     * @param {any} flags
     */
    createQueryFor(flags) {

        let boundedContextConfig = this._getNearestBoundedContextConfig();
        flags.language = boundedContextConfig.language;
        let boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
        let destination = process.cwd();

        _inquirerManager.get(this).promptForQueryfor(flags)
            .then(context => {
                this._logger.info(`Creating query for '${context.readModel}' with name '${context.name}'`);
                _boilerPlatesManager.get(this).createArtifactInstance('queryFor', flags.language, boilerPlate, destination, context);  
            });
    }
}