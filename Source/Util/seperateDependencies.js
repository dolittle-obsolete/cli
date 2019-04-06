/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Dependency } from '@dolittle/tooling.common/dist/dependencies/Dependency';

/**
* Gets the dependencies seperated by argument and others
* @param {Dependency[]} dependencies
* @returns {{argument: Dependency[], rest: Dependency[]}
*/
export default function seperateDependencies(dependencies) {
    let obj = {argument: [], rest: []};
    dependencies.forEach(_ => {
        if (_.userInputType !== undefined && _.userInputType === 'argument') obj.argument.push(_);
        else obj.rest.push(_);
    });
    return obj;

}