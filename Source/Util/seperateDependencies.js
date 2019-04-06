/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Dependency } from '@dolittle/tooling.common/dist/dependencies/Dependency';

/**
* 
* @param {Dependency[]} dependencies
* @returns {{argument: Dependency[], nonPrompt: Dependency[], prompt: Dependency[]}}
*/
export default function seperateDependencies(dependencies) {
    let deps = {argument: [], nonPrompt: [], prompt: []};
    dependencies.forEach(_ => {
        if (_.userInputType !== undefined && _.userInputType === 'argument') deps.argument.push(_);
        else if (_.type === 'discover' && !_.userInputType) deps.nonPrompt.push(_);
        else deps.prompt.push(_);
    });
    return deps;
}