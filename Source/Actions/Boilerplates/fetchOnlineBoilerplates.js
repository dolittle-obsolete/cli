/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import {BoilerplatesManager} from '@dolittle/tooling.common';
import { Outputter } from '../../Outputter';

/**
 * Fetches the online dolittle boilerplates from npmjs
 *
 * @param {BoilerplatesManager} boilerplatesManager
 * @param {Outputter} outputter
 * @returns {Promise<>}
 */
async function onlineBoilerplates(boilerplatesManager, outputter, keywords = [], limit = 250) {
    let spinner = outputter.spinner('Getting boilerplates (this might take a while, depending on your internet connection): ').start();
    let boilerplates = await boilerplatesManager.discoverOnlineBoilerplates(keywords, limit)
        .then(boilerplates => {
            spinner.succeed(`Found ${boilerplates.length} boilerplates`);
            return boilerplates;
        }).catch(error => {
            spinner.fail(`An error occured: ${error.message? error.message : error}`);
            throw error;
        });
    return boilerplates;
}

export default onlineBoilerplates;