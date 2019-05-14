import { Outputter } from '../../Outputter';
import { IBoilerplateDiscoverers } from '@dolittle/tooling.common.boilerplates';

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * Initializes the boilerplates system in the common tooling
 * @param {Outputter} outputter
 */
export default async function initBoilerplates(outputter: Outputter, boilerplateDiscoverers: IBoilerplateDiscoverers) {
    let spinner = outputter.spinner('Initializing boilerplates system').start();
    try {
        boilerplateDiscoverers.discover();
        spinner.succeed('Boilerplates system initialized');
    } catch (error) {
        spinner.fail(`An error occured: ${error.message? error.message : error}`);
        throw error;
    }
    
}