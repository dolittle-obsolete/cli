/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {Application, ApplicationsManager, ArtifactsManager, BoundedContext, BoundedContextsManager, Dependency} from '@dolittle/tooling.common';
import Outputter from '../Outputter';
/**
 * The usage prefix used in commands info
 * @returns {string} the usage prefix
 */
export const usagePrefix = '\n\t ';

export function handleUncaughtException(error, logger) {
    Outputter.error(error, 'Please register your issue with the error message and stacktrace on our issues page: https://github.com/dolittle-tools/cli/issues');
}

/**
 * Gets the application from the given folder and logs error if not found
 *
 * @export
 * @param {ApplicationsManager} applicationsManager
 * @param {string} folder The folder where the application configuration should be
 * @param {import('winston').Logger} logger
 * @returns {Application | null}
 */
export function requireApplication(applicationsManager, folder, logger) {
    let application = applicationsManager.getApplicationFrom(folder);
    if (application === undefined || application === null) {
        Outputter.error(new Error('Could not discover the application configuration'));
        return null;
    }
    return application;
}
/**
 * Gets the bounded context from the given folder and logs error if not found
 *
 * @export
 * @param {BoundedContextsManager} boundedContextsManager
 * @param {string} folder The folder where the bounded context configuration should be searched from
 * @param {import('winston').Logger} logger
 * @returns {BoundedContext | null}
 */
export function requireBoundedContext(boundedContextsManager, folder, logger) {
    
    let boundedContext = boundedContextsManager.getNearestBoundedContextConfig(folder);
    if (!boundedContext) {
        Outputter.error(new Error('Could not discover the bounded context configuration'));
        return null;
    }
    return boundedContext;
}

/**
 * Gets the artifact template for given artifacttype with language and logs error if not found
 *
 * @export
 * @param {ArtifactsManager} artifactsManager
 * @param {string} language
 * @param {string} artifactType
 */
export function requireArtifactTemplate(artifactsManager, language, artifactType, logger) {
    let artifactTemplate = artifactsManager.getArtifactTemplate(language, artifactType);
    if (!artifactTemplate) {
        Outputter.error(new Error(`Could not discover the artifact template configuration for artifacttype '${artifactType}' with language '${language}'`));
        return null;
    }
    return artifactTemplate;
}
/**
 * Show command help if needed
 *
 * @export
 * @param {import('args')} args
 * @param {int} numDependencies
 */
export function showHelpIfNeeded(args, numDependencies) {
    if (numDependencies > 0 && (! args.sub.length || args.sub.length !== numDependencies)) args.showHelp();
}
/**
 * Creates a context object from the argument list and the dependencies. Assumes that the arguments are given in the same order as the dependencies
 *
 * @export
 * @param {string[]} args
 * @param {Dependency[]} dependencies
 */
export function contextFromArgs(args, dependencies) {
    if (args.length !== dependencies.length) throw new Error('Args does not match dependencies');
    let context = {};
    dependencies.forEach((dep, i) => {
        context[dep.name] = args[i];        
    });
    return context;
}   
/**
 * Creates a part of the usage text that describes the command argument inputs 
 *
 * @export
 * @param {Dependency[]} argumentDependecies
 * @returns {string}
 */
export function createUsageArgumentText(argumentDependecies) {
    return argumentDependecies.map(_ => {
        return _.description === undefined || _.description === '' ? 
            `[${_.name}]`
            : `[${_.name} - ${_.description}]`;
    }).join(' ');
}
/**
 * Creates the USAGE text for 'dolittle add <artifact>' commands
 *
 * @export
 * @param {Dependency[]} argumentDependencies
 * @param {string} artifactType
 * @returns
 */
export function createUsageTextForArtifact(argumentDependencies, artifactType) {
    return `dolittle add ${artifactType} ${createUsageArgumentText(argumentDependencies)}` ;
}

/**
 * Validate the name argument
 * @param {string} name 
 */
export function validateArgsNameInput(name) {
    const path = require('path');
    if (name.includes(' ')) {
        throw 'Argument parsing error. Name contained spaces';
    }
    if (name.includes('-')) {
        throw 'Argument parsing error. Name contained dashes (-)';
    }
    if (name !== path.basename(name)) {
        throw 'Argument parsing error. Invalid name';
    }
    if (/^\.*?$/.test(name)) {
        throw 'Argument parsing error. Invalid name';
    }
}
/**
 * Gets all dependencies
 *
 * @export
 * @param {ApplicationsManager} applicationsManager
 * @param {string} [language='any']
 * @returns {{argument: Dependency[], rest: Dependency[]}}
 */
export function getApplicationArgumentDependencies(applicationsManager, language = 'any') {
    let obj = {argument: [], rest: []};
    applicationsManager.getDependencies(language).forEach(_ => {
        if (_.userInputType !== undefined && _.userInputType === 'argument') obj.argument.push(_);
        else obj.rest.push(_);
    });
    return obj;
}
/**
 * Gets all dependencies
 *
 * @export
 * @param {BoundedContextsManager} boundedContextsManager
 * @param {string} [language='any']
 * @returns {{argument: Dependency[], rest: Dependency[]}}
 */
export function getBoundedContextsArgumentDependencies(boundedContextsManager, language = 'any') {
    let obj = {argument: [], rest: []};
    boundedContextsManager.getDependencies(language).forEach(_ => {
        if (_.userInputType !== undefined && _.userInputType === 'argument') obj.argument.push(_);
        else obj.rest.push(_);
    });
    return obj;
}

/**
 * Gets all dependencies
 *
 * @export
 * @param {ArtifactsManager} artifactsManager
 * @param {string} artifactType
 * @param {BoundedContext} boundedContext
 * @returns {{argument: Dependency[], rest: Dependency[]}}
 */
export function getArtifactArgumentDependencies(artifactsManager, artifactType, boundedContext) {
    let obj = {argument: [], rest: []};
    artifactsManager.getDependencies(artifactType, boundedContext.core.language).forEach(_ => {
        if (_.userInputType !== undefined && _.userInputType === 'argument') obj.argument.push(_);
        else obj.rest.push(_);
    });
    return obj;
}
