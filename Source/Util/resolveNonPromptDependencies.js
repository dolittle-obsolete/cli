/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Dependency } from '@dolittle/tooling.common/dist/dependencies/Dependency';
import { DependenciesManager } from '@dolittle/tooling.common/dist/dependencies/DependenciesManager';


/**
* Resolves all dependencies that shouldn't be prompted, adds the resolved value to the context and returns the context object
* @param {DependenciesManager} dependenciesManager
* @param {Dependency[]} dependencies
* @param {string} destinationPath
* @param {string} language
* @param {*} context
* @returns {*}
*/
export default function resolveNonPromptDependencies(dependenciesManager, dependencies, destinationPath, language, context) {
    dependencies.filter(_ => _.type === 'discover' && !_.userInputType).forEach(dep => context[dep.name] = dependenciesManager.discover(dep, destinationPath, language));
    return context;
}