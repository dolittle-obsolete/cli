/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {ApplicationsManager, ArtifactsManager, BoundedContext, BoundedContextsManager, Dependency} from '@dolittle/tooling.common';
/**
 * The usage prefix used in commands info
 * @returns {string} the usage prefix
 */
export const usagePrefix = '\n\t ';

/**
 * Show command help if needed
 *
 * @export
 * @param {import('args')} args
 * @param {*} numDependencies
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
 * Gets all userinput dependencies with 'type': "argument" for applications
 *
 * @export
 * @param {ApplicationsManager} applicationsManager
 * @param {string} [language='any']
 * @returns {Dependency[]}
 */
export function getApplicationArgumentDependencies(applicationsManager, language = 'any') {
    return applicationsManager.getDependencies(language).filter(_ => _.userInputType !== undefined && _.userInputType === 'argument');
}
/**
 * Gets all userinput dependencies with 'type': "argument" for bounded contexts
 *
 * @export
 * @param {BoundedContextsManager} boundedContextsManager
 * @param {string} [language='any']
 * @returns {Dependency[]}
 */
export function getBoundedContextsArgumentDependencies(boundedContextsManager, language = 'any') {
    return boundedContextsManager.getDependencies(language).filter(_ => _.userInputType !== undefined && _.userInputType === 'argument');
}

/**
 * Gets all userinput dependencies with 'type': "argument" for artifacts
 *
 * @export
 * @param {ArtifactsManager} artifactsManager
 * @param {string} artifactType
 * @param {BoundedContext} boundedContext
 * @returns {Dependency[]}
 */
export function getArtifactArgumentDependencies(artifactsManager, artifactType, boundedContext) {
    return artifactsManager.getDependencies(artifactType, boundedContext.core.language).filter(_ => _.userInputType !== undefined && _.userInputType === 'argument');
}