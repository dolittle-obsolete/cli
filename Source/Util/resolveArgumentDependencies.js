/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Dependency } from '@dolittle/tooling.common/dist/dependencies/Dependency';

/**
* Resolves dependencies from the argument list and returns the context object. Assumes that the arguments are given in the same order as the dependencies
* @param {string[]} args
* @param {Dependency[]} argumentDependencies Argument dependencies
* @param {*} context
* @returns {*}
*/
export default function resolveArgumentDependencies(args, argumentDependencies, context) {
    if (args.length !== argumentDependencies.length) throw new Error('Args does not match dependencies');
    argumentDependencies.forEach((dep, i) => {
        context[dep.name] = args[i];        
    });
    return context;
}