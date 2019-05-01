/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import {BoilerplatesManager} from '@dolittle/tooling.common';
import { Outputter } from '../../Outputter';
import requireInternet from '../../Util/requireInternet';

/**
 * Fetches the online dolittle boilerplates from npmjs
 *
 * @param {BoilerplatesManager} boilerplatesManager
 * @param {Outputter} outputter
 * @returns {Promise<{name: string, version: string}[]>}
 */
async function dolittleBoilerplates(boilerplatesManager, outputter) {
    await requireInternet(outputter);
    let spinner = outputter.spinner('Getting dolittle boilerplates (this might take a while, depending on your internet connection): ').start();
    let boilerplates = await boilerplatesManager.discoverOnlineDolittleBoilerplates()
        .then(boilerplates => {
            spinner.succeed(`Found ${boilerplates.length} dolittle boilerplates`);
            return boilerplates;
        }).catch(error => {
            spinner.fail(`An error occured ${error.message? error.message : error}`);
            throw error;
        });
    return boilerplates;
}

export default dolittleBoilerplates;