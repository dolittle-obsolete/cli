/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Outputter } from '../../../Outputter';
import { BoilerplatesManager } from '@dolittle/tooling.common';


/**
 * Lists the boilerplates used by the tooling
 *
 * @export
 * @param {Outputter} outputter
 * @param {BoilerplatesManager} boilerplatesManager
 * 
 */
export default async function listBoilerplates(outputter, boilerplatesManager) {
    let spinner = outputter.spinner('Boilerplates in use:\n').start();

    let boilerplates = boilerplatesManager.boilerplates;
    let numBoilerplates = boilerplates.length;
    if (numBoilerplates > 0) {
        spinner.succeed(`There are ${numBoilerplates} in use`);
        boilerplates.forEach(boilerplate => {
            outputter.print(
                `${boilerplate.name}: 
Type: ${boilerplate.type}
Language: ${boilerplate.language}
Description: ${boilerplate.description}
`);
        });
    }
    else spinner.warn('There are no boilerplates in use.\nDo you have any installed? use \'dolittle boilerplates discover\'\nUse \'dolittle boilerplates online\' to discover what\'s available on npm');

}