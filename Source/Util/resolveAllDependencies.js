/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Dependency } from '@dolittle/tooling.common/dist/dependencies/Dependency';
import resolveArgumentDependencies from './resolveArgumentDependencies';
import resolveNonPromptDependencies from './resolveNonPromptDependencies';
import resolvePromptDependencies from './resolvePromptDependencies';
import { Boilerplate } from '@dolittle/tooling.common/dist/boilerplates/Boilerplate';
import { DependenciesManager } from '@dolittle/tooling.common/dist/dependencies/DependenciesManager';
import { Inquirer } from '../Inquirer';

/**
* Resolves argument, non-prompt and prompt dependencies
* @param {DependenciesManager} dependenciesManager
* @param {Inquirer} inquirer
* @param {Boilerplate} boilerplate
* @param {string} destinationPath
* @param {string[]} args
* @param {{argument: Dependency[], nonPrompt: Dependency[], prompt: Dependency[]}} dependencies THe seperated dependencies
*/
export default async function resolveAllDependencies(dependenciesManager, inquirer, boilerplate, destinationPath,  args, dependencies) {
    let boilerplateContext = resolveArgumentDependencies(args, dependencies.argument, {});
    boilerplateContext = resolveNonPromptDependencies(dependenciesManager, dependencies.nonPrompt, destinationPath, boilerplate.language, boilerplateContext);
    boilerplateContext = await resolvePromptDependencies(inquirer, dependencies.prompt, destinationPath, boilerplate.language, boilerplateContext);
    
    return boilerplateContext;
    
}