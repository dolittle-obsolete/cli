/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable no-unused-vars */
import {Folders} from '../Folders';
import {Logger} from 'winston';
import {BoilerPlatesManager} from '../boilerPlates/BoilerPlatesManager';
import {InquirerManager} from './InquirerManager';
import fs from 'fs-extra';
import {BoilerPlate} from '../boilerPlates/BoilerPlate';
import {BoundedContext} from '../boundedContexts/BoundedContext';
import {BoundedContextManager} from '../boundedContexts/BoundedContextManager';
import { getFileDirPath, determineDestination } from '../helpers';
/* eslint-enable no-unused-vars */

/**
 * @type {WeakMap<ArtifactsManager, BoilerPlatesManager>}
 */
const _boilerPlatesManager = new WeakMap();
/**
 * @type {WeakMap<ArtifactsManager, BoundedContextManager>}
 */
const _boundedContextManager = new WeakMap();
/**
 * @type {WeakMap<ArtifactsManager, Folders>}
 */
const _folders = new WeakMap();
/**
 * @type {WeakMap<ArtifactsManager, fs>}
 */
const _fileSystem = new WeakMap();
/**
 * @type {WeakMap<ArtifactsManager, InquirerManager>}
 */
const _inquirerManager = new WeakMap();

const _dolittleConfig = new WeakMap();

/**
 * Represents a manager for artifacts
 */
export class ArtifactsManager {
    /**
     * Initializes a new instance of {ApplicationManager}
     * @param {InquirerManager} inquirerManager
     * @param {BoilerPlatesManager} boilerPlatesManager
     * @param {boundedContextManager} boundedContextManager
     * @param {Folders} folders 
     * @param {fs} fileSystem
     * @param {Logger} logger
     */
    constructor(inquirerManager, boilerPlatesManager, boundedContextManager, folders, fileSystem, logger, dolittleConfig) {
        _inquirerManager.set(this, inquirerManager);
        _boilerPlatesManager.set(this, boilerPlatesManager);
        _boundedContextManager.set(this, boundedContextManager);
        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        this._logger = logger;
        _dolittleConfig.set(this, dolittleConfig);
        
    }
    /**
     * Searches the file directories for the bounded-context.json configuration file recursively by going upwards in the hierarchy
     * @param {string} startPath Where to start looking for the bounded context
     * @return {BoundedContext} bounded context configuration object
     */
    _getNearestBoundedContextConfig(startPath) {
        let boundedContext = _boundedContextManager.get(this).getNearestBoundedContextConfig(startPath);

        this._validateBoundedContext(boundedContext);
        return boundedContext;
    }
    /**
     * Validates the fields of the parsed bounded-context.json object 
     * @param {BoundedContext} boundedContext 
     */
    _validateBoundedContext(boundedContext) {
        if ( !(boundedContext.core && boundedContext.core.language && boundedContext.core.language !== '')) {
            this._logger.error('The bounded-context.json configuration is missing "language"');
            throw 'Bounded Context configuration missing language';
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
            this._logger.error(`Could not find a boilerplate.json configuration for language: ${language} and type: ${type}`);
            throw 'Could not find boilerplate for given language and type';
        }
        if (boilerPlates.length > 1) {
            this._logger.error(`Found more than one boilerplate.json configuration for language: ${language} and type: ${type}`);
            throw 'Found multiple boilerplates';
        }
        return boilerPlates[0];
    }
    /**
     * Gets the artifact template alongside with the location of where it was found based on the language and type of the artifact
     * @param {BoilerPlate} boilerPlate 
     * @param {string} artifactType
     * @returns {{template: any, location: string}}
     */
    _getArtifactTemplateByBoilerplate(boilerPlate, artifactType)
    {
        let templateFiles = _folders.get(this).searchRecursive(boilerPlate.location, 'template.json');
        let templatesAndLocation = [];
        templateFiles.forEach(_ => {
            let location = getFileDirPath(_);
            const template = {
                template: JSON.parse(_fileSystem.get(this).readFileSync(_, 'utf8')),
                location: location
            };
            templatesAndLocation.push(template);
        });
        const artifactTemplate = templatesAndLocation.filter(template => template.template.type == artifactType && template.template.language == boilerPlate.language)[0];
        
        if (artifactTemplate === undefined || artifactTemplate === null) 
            throw 'Artifact template not found';

        return artifactTemplate;
    }
    /**
     * Creates an artifact of the given type at the given destination with the given name 
     * @param {{artifactName: string, artifactType: string, area: string}} context 
     */
    createArtifact(context) {
        let cwd = process.cwd();
        let boundedContextConfig = this._getNearestBoundedContextConfig(cwd);
        let language = boundedContextConfig.core.language;
        let boilerPlate = this._getArtifactsBoilerPlateByLanguage(language);
        let artifactTemplate = this._getArtifactTemplateByBoilerplate(boilerPlate, context.artifactType);

        let destinationResult = determineDestination(context.area, language, context.artifactName, cwd, _boundedContextManager.get(this).getNearestBoundedContextPath(cwd), _dolittleConfig.get(this));
        let destination = destinationResult.destination;
        let artifactName = destinationResult.name;
        _fileSystem.get(this).ensureDirSync(destination);
        _inquirerManager.get(this).promptUser(artifactName, destination, boilerPlate, artifactTemplate.template)
            .then(templateContext => {
                this._logger.info(`Creating an artifact of type '${context.artifactType}' with name '${artifactName}' and language '${language}'`);
                _boilerPlatesManager.get(this).createArtifactInstance(artifactTemplate, destination, templateContext);
            });
    }
}