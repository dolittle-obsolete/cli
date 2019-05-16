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
 * @returns
 */
export default async function fetchDolittleBoilerplates(onlineBoilerplatesDiscoverer: ICanFindOnlineBoilerplatePackages, outputter: Outputter) {
    await requireInternet(outputter);
    let spinner = outputter.spinner('Getting dolittle boilerplates (this might take a while, depending on your internet connection): ').start();
    let boilerplates = await onlineBoilerplatesDiscoverer.discoverLatestOnlineDolittleBoilerplates()
        .then(boilerplates => {
            spinner.succeed(`Found ${boilerplates.length} dolittle boilerplates`);
            return boilerplates;
        }).catch(error => {
            spinner.fail(`An error occured ${error.message? error.message : error}`);
            throw error;
        });
    return boilerplates;
}