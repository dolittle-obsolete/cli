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
    #folders;
    #applicationsManager;
    #boundedContextsManager;
    #artifactsManager;
    #dependenciesManager;
    #inquirer;
    #logger;
    #dolittleConfig;

    constructor(folders, applicationsManager, boundedContextsManager, artifactsManager, dependenciesManager, inquirer, logger, dolittleConfig) {
        
        this.#folders = folders;
        this.#applicationsManager = applicationsManager;
        this.#boundedContextsManager = boundedContextsManager;
        this.#artifactsManager = artifactsManager;
        this.#dependenciesManager = dependenciesManager;
        this.#inquirer = inquirer;
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
        const USAGE = createUsageTextForArtifact(dependencies.argument, artifactType);

        args
            .example(USAGE, description);
        args.parse(process.argv, {value: usagePrefix + USAGE, name: `dolittle add ${commandName}`});

        showHelpIfNeeded(args, dependencies.argument.length);

        
        let context = contextFromArgs(args.sub, dependencies.argument);

        // Lets assume context has 'name' and determine the destintation folder based upon a '.' seperated name and the dolittlerc configuration
        /**
         * @type {{destination: string, name: string}} The destination path and the actual name of the artifact
         */
        let destinationAndName = helpers.determineDestination(artifactTemplate.area, artifactTemplate.language, context['name'], cwd, boundedContext.path, this.#dolittleConfig);
        context['name'] = destinationAndName.name;
        this.addArtifact(context, artifactTemplate, dependencies.rest, destinationAndName.destination);
    }

    /**
     * Adds an artifact based on the given context
     *
     * @param {any} context
     * @param {ArtifactTemplate} artifactTemplate
     * @param {Dependency[]} dependencies
     * @param {string} destinationFolder
     * @memberof CommandManager
     */
    addArtifact(context, artifactTemplate, dependencies, destinationFolder) {
        this.#logger.info(`Creating artifact with artifacttype '${artifactTemplate.type}', language '${artifactTemplate.language}', name '${context['name']} and destination folder '${destinationFolder}'`);
        this.#folders.makeFolderIfNotExists(destinationFolder);
        context = this.#resolveNonPrompDependencies(dependencies, destinationFolder, artifactTemplate.language, context);
        this.#inquirer.promptUser(context, dependencies, destinationFolder, artifactTemplate.language)
            .then(templateContext => {
                this.#artifactsManager.createArtifact(templateContext, artifactTemplate.language, artifactTemplate, destinationFolder);
            });
    }
    /**
     * Handles the 'dolittle create application' command
     *
     * @param {any} context CLI arguments given in context of the dependencies
     * @param {any} dependencies 
     * @param {string} destinationFolder The folder where the application should be created
     * @memberof CommandManager
     */
    createApplication(context, dependencies, destinationFolder) {
        this.#logger.info(`Creating application`);

        context = this.#resolveNonPrompDependencies(dependencies, destinationFolder, 'any', context);
        return this.#applicationsManager.createApplication(context, destinationFolder);
    }
    /**
     * Handles the 'dolittle create boundedcontext' command
     *
     * @param {any} context CLI arguments given in context of the dependencies
     * @param {Application} application
     * @param {Dependency[]} dependencies
     * @param {string} destinationFolder The path where the application should be created
     * @memberof CommandManager
     */
    createBoundedContext(context, application, dependencies, destinationFolder) {
        this.#logger.info(`Creating bounded context`);
        context['applicationId'] = application.id; // Hard coded, for now
        context = this.#resolveNonPrompDependencies(dependencies, destinationFolder, 'csharp', context);
        return this.#boundedContextsManager.createBoundedContext(context, 'csharp', destinationFolder); // Language is hardcoded, for now
    }
    
    /**
     * Resolves all dependencies that shouldn't be prompted, adds the resolved value to the context and returns the context object
     * @param {Dependency[]} dependencies
     * @param {string} destinationPath
     * @param {string} language
     * @param {any} context
     * @returns {any}
     */
    #resolveNonPrompDependencies(dependencies, destinationPath, language, context) {
        dependencies.filter(_ => _.type === 'discover' && !_.userInputType).forEach(dep => context[dep.name] = this.#dependenciesManager.discover(dep, destinationPath, language));
        return context;
    }
}