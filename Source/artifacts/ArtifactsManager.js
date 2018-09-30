/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Folders } from '../Folders';
import { Logger } from 'winston';
import { BoilerPlatesManager} from '../boilerPlates/BoilerPlatesManager';
import { InquirerManager } from './InquirerManager';
import fs from 'fs-extra';
import global from '../global';
import { BoilerPlate } from '../boilerPlates/BoilerPlate';
import { BoundedContext } from '../boundedContexts/BoundedContext';

const _boilerPlatesManager = new WeakMap();
const _boundedContextManager = new WeakMap();
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
     * @param {boundedContextManager} boundedContextManager
     * @param {Folders} folders 
     * @param {fs} fileSystem
     * @param {Logger} logger
     */
    constructor(inquirerManager, boilerPlatesManager, boundedContextManager, folders, fileSystem, logger) {
        _inquirerManager.set(this, inquirerManager);
        _boilerPlatesManager.set(this, boilerPlatesManager);
        _boundedContextManager.set(this, boundedContextManager);
        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        this._logger = logger;
        
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
        if ( !(boundedContext.backend && boundedContext.backend.language && boundedContext.backend.language !== '')) {
            this._logger.error('The bounded-context.json configuration is missing "language"');
            throw "Bounded Context configuration missing language";
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
            throw "Could not find boilerplate for given language and type";
        }
        if (boilerPlates.length > 1) {
            this._logger.error(`Found more than one boilerplate.json configuration for language: ${language} and type: ${type}`)
            throw "Found multiple boilerplates";
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
            const lastPathSeparatorMatch = _.match(/(\\|\/)/);
            const lastIndex = _.lastIndexOf(lastPathSeparatorMatch[lastPathSeparatorMatch.length-1]);
            const template = {
                'template': JSON.parse(_fileSystem.get(this).readFileSync(_, 'utf8')),
                'location': _.substring(0, lastIndex+1)
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
     * @param {{artifactName: string, destination: string, artifactType: string}} context 
     */
    createArtifact(context) {
        let boundedContextConfig = this._getNearestBoundedContextConfig(context.destination);
        let language = boundedContextConfig.backend.language;
        let boilerPlate = this._getArtifactsBoilerPlateByLanguage(language);
        let artifactTemplate = this._getArtifactTemplateByBoilerplate(boilerPlate, context.artifactType);

        _inquirerManager.get(this).promptUser(context.artifactName, context.destination, boilerPlate, artifactTemplate.template)
            .then(templateContext => {
                this._logger.info(`Creating an artifact of type '${context.artifactType}' with name '${context.artifactName}' and language '${language}'`);
                _boilerPlatesManager.get(this).createArtifactInstance(artifactTemplate, context.destination, templateContext);
            });
    }
}