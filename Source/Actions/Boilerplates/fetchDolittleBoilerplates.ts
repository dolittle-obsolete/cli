/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanFindOnlineBoilerplatePackages, fetchDolittleBoilerplates as _fetchDolittleBoilerplates } from '@dolittle/tooling.common.boilerplates';
import { Outputter } from '../../Outputter';


/**
 * Fetches the online dolittle boilerplates from npmjs
 *
 * @param {ICanFindOnlineBoilerplatePackages} onlineBoilerplatesDiscoverer
 * @param {Outputter} outputter
 * @returns
 */
export default async function fetchDolittleBoilerplates(onlineBoilerplatesDiscoverer: ICanFindOnlineBoilerplatePackages, outputter: Outputter) {

    let spinner = outputter.spinner().start();
    let boilerplates = await _fetchDolittleBoilerplates(onlineBoilerplatesDiscoverer,
        (data: string) => spinner.text = data,
        (data: string) => spinner.fail(data));
    if (spinner.isSpinning) spinner.succeed();
    return boilerplates;
}