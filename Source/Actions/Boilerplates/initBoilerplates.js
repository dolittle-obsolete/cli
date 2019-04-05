import { Outputter } from "../../Outputter";
import { BoilerplatesManager } from "@dolittle/tooling.common/dist/boilerplates/BoilerplatesManager";

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * Initializes the boilerplates system in the common tooling
 * @param {Outputter} outputter
 * @param {BoilerplatesManager} boilerplatesManager 
 */
export default async function initBoilerplates(outputter, boilerplatesManager) {
    let spinner = outputter.spinner('Initializing boilerplates system').start();
    try {
        boilerplatesManager.discoverInstalledBoilerplates();
        spinner.succeed('Boilerplates system initialized');
    } catch (error) {
        spinner.fail(`An error occured: ${error.message? error.message : error}`);
        throw error;
    }
    
}