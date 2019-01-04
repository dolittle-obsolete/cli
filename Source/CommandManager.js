/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Application, BoundedContext, ArtifactTemplate, helpers } from '@dolittle/tooling.common';
import {  determineDestination, requireBoundedContext, contextFromArgs, getArtifactArgumentDependencies, createUsageTextForArtifact, showHelpIfNeeded, requireArtifactTemplate } from './helpers';
import { usagePrefix } from '../bin/helpers';

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
     * @param {import('args')} args
     * @param {string} commandName The actual command name. 'dolittle add <commandName>'
     * @param {string} artifactType The artifactType
     * @param {string} description The args description text
     * @param {string} cwd The current working directory
     * @memberof CommandManager
     */
    handleAddArtifact(args, commandName, artifactType, description, cwd) {
        let boundedContext = requireBoundedContext(this.#boundedContextsManager, cwd, this.#logger);
        if (!boundedContext) process.exit(1);
        
        let artifactTemplate = requireArtifactTemplate(this.#artifactsManager, 'csharp', artifactType, this.#logger); // Hard coded language, for now
        if (!artifactTemplate) process.exit(1);
        
        let dependencies = getArtifactArgumentDependencies(this.#artifactsManager, artifactType, boundedContext);
        const USAGE = createUsageTextForArtifact(dependencies, artifactType);

        args
            .example(USAGE, description);
        args.parse(process.argv, {value: usagePrefix + USAGE, name: `dolittle add ${commandName}`});

        showHelpIfNeeded(args, dependencies.length);

        
        let context = contextFromArgs(args.sub, dependencies);

        // Lets assume context has 'name' and determine the destintation folder based upon a '.' seperated name and the dolittlerc configuration
        /**
         * @type {{destination: string, name: string}} The destination path and the actual name of the artifact
         */
        let destinationAndName = helpers.determineDestination(artifactTemplate.area, artifactTemplate.language, context['name'], cwd, boundedContext.path, this.#dolittleConfig);
        context['name'] = destinationAndName.name;
        this.addArtifact(context, artifactTemplate, destinationAndName.destination);
    }

    /**
     * Adds an artifact based on the given context
     *
     * @param {any} context
     * @param {ArtifactTemplate} artifactTemplate
     * @param {string} destinationFolder
     * @memberof CommandManager
     */
    addArtifact(context, artifactTemplate, destinationFolder) {
        this.#logger.info(`Creating artifact with artifacttype '${artifactTemplate.type}', language '${artifactTemplate.language}', name '${context['name']} and destination folder '${destinationFolder}'`);
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
        return this.#applicationsManager.createApplication(context, destinationPath);
    }
    /**
     * Handles the 'dolittle create boundedcontext' command
     *
     * @param {any} context CLI arguments given in context of the dependencies
     * @param {Application} application
     * @param {string} destinationPath The path where the application should be created
     * @memberof CommandManager
     */
    createBoundedContext(context, application, destinationPath) {
        this.#logger.info(`Creating bounded context`);
        context['applicationId'] = application.id; // Hard coded, for now
        return this.#boundedContextsManager.createBoundedContext(context, 'csharp', destinationPath); // Language is hardcoded, for now
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