/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Dependency } from '@dolittle/tooling.common/dist/dependencies/Dependency';
import { Inquirer } from '../Inquirer';


/**
* Resolves all dependencies that should be prompted, adds the resolved values to the context and returns the context object
* @param {Inquirer} inquirer
* @param {Dependency[]} promptDependencies
* @param {string} destinationPath
* @param {string} language
* @param {*} context
* @returns {*}
*/
export default async function resolvePromptDependencies(inquirer, promptDependencies, destinationPath, language, context) {
    context = await inquirer.promptUser(context, promptDependencies, destinationPath, language);
    
    return context;
}