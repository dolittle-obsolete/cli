/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {InquirerManager} from './artifacts/InquirerManager';
import { BoundedContext } from '@dolittle/tooling.common';
import {  determineDestination } from './helpers';

/**
 * Represents a manager for artifacts
 */
export class CommandManager {
    #applicationsManager;
    #boundedContextsManager;
    #artifactsManager;
    #inquirerManager;
    #logger;
    #dolittleConfig;
    constructor(applicationsManager, boundedContextsManager, artifactsManager, inquirerManager, logger, dolittleConfig) {
        this.#applicationsManager = applicationsManager;
        this.#boundedContextsManager = boundedContextsManager;
        this.#artifactsManager = artifactsManager;
        this.#inquirerManager = inquirerManager;
        this.#logger = logger;
        this.#dolittleConfig = dolittleConfig;
     
    }
    /**
     * Handles an 'dolittle add <artifact>' command
     * @param {any} context CLI arguments given in context of the dependencies
     * @param {BoundedContext} boundedContext
     * @memberof CommandManager
     */
    handleAddArtifact(context, boundedContext) {
        this.#logger.info(`Handling artifact. args: ${args}. Bounded Context Language: ${boundedContext.core.language}`);
    }
    /**
     * Handles the 'dolittle create application' command
     *
     * @param {any} context CLI arguments given in context of the dependencies
     * @param {string} destinationPath The path where the application should be created
     * @memberof CommandManager
     */
    createApplication(context, destinationPath) {
        this.#logger.info(`Creating application`);
        this.#applicationsManager.createApplication(context, destinationPath);
    }
    /**
     * Creates an artifact of the given type at the given destination with the given name 
     * @param {} context 
     * @param {BoundedContext} boundedContext
     * @param {Dpendency[]} dependencies
     * @param {string} artifactType
     * @param {string} dir
     */
    createArtifact(context, boundedContext, dependencies, artifactType, dir) {
        let boilerplate = common.artifacts.boilerPlateByLanguage(boundedContext.core.language);
        let artifactTemplate = common.artifacts.templateByBoilerplate(boilerplate, artifactType);
        let destination = determineDestination(artifactTemplate.area, boundedContext.core.language, context.name, dir, 
            boundedContext.path, _dolittleConfig.get(this));

        _inquirerManager.get(this).promptUser(context, dependencies, destination, boilerplate)
            .then(templateContext => {
                common.artifacts.createArtifact(templateContext, artifactType, boundedContext.core.language, destination);
            });
    }
}