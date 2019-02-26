/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import {BoilerplatesManager} from '@dolittle/tooling.common';
import { Outputter } from '../../../Outputter';

/**
 * Fetches the online dolittle boilerplates from npmjs
 *
 * @param {BoilerplatesManager} boilerplatesManager
 * @param {Outputter} outputter
 * @returns {Promise<>}
 */
async function dolittleBoilerplates(boilerplatesManager, outputter) {
    let spinner = outputter.spinner('Getting dolittle boilerplates (this might take a while, depending on your internet connection): ').start();
    let boilerplates = await boilerplatesManager.discoverOnlineDolittleBoilerplates()
        .then(boilerplates => {
            spinner.succeed(`Fetched ${boilerplates.length} dolittle boilerplates`);
            return boilerplates;
        }).catch(error => {
            spinner.fail(error);
            throw error;
        });
    return boilerplates;
}

export default dolittleBoilerplates;