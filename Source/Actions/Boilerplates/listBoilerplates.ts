/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { IBoilerplateManagers } from '@dolittle/tooling.common.boilerplates';
import { Outputter } from '../../Outputter';


/**
 * Lists the boilerplates used by the tooling
 *
 * @export
 * @param {Outputter} outputter
 * @param {BoilerplatesManager} boilerplatesManager
 * 
 */
export default async function listBoilerplates(outputter: Outputter, boilerplateManagers: IBoilerplateManagers) {
    let spinner = outputter.spinner('Listing boilerplates in use:\n').start();
    try {
        let boilerplates = boilerplateManagers.boilerplates;
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
        else spinner.warn(`There are no boilerplates in use.
Do you have any installed? Use 'dolittle boilerplates init' to initialize the boilerplates system

Use 'dolittle boilerplates online' to discover what's available on npm.
Or use 'dolittle boilerplates dolittle' to discover boilerplates that the Dolittle teams has made available on npm`);

    } catch(error) {
        spinner.fail(`An error occured: ${error.message? error.message : error}`);
        throw error;
    }
}