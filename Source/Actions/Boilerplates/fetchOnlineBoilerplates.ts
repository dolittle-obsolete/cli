/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanFindOnlineBoilerplatePackages } from '@dolittle/tooling.common.boilerplates';
import { Outputter } from '../../Outputter';
import requireInternet from '../../Util/requireInternet';

/**
 * Fetches the online dolittle boilerplates from npmjs
 *
 * @param {ICanFindOnlineBoilerplatePackages} onlineBoilerplatesDiscoverer
 * @param {Outputter} outputter
 * @param {string[]} [keywords=[]]
 * @param {number} [limit=250]
 * @returns
 */
export default async function fetchOnlineBoilerplates(onlineBoilerplatesDiscoverer: ICanFindOnlineBoilerplatePackages, outputter: Outputter, keywords: string[] = [], limit: number = 250) {
    await requireInternet(outputter);
    let spinner = outputter.spinner('Getting boilerplates (this might take a while, depending on your internet connection): ').start();
    let boilerplates = await onlineBoilerplatesDiscoverer.discoverLatestOnlineBoilerplates(keywords, limit)
        .then(boilerplates => {
            spinner.succeed(`Found ${boilerplates.length} boilerplates`);
            return boilerplates;
        }).catch(error => {
            spinner.fail(`An error occured: ${error.message? error.message : error}`);
            throw error;
        });
    return boilerplates;
}