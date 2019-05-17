/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanFindOnlineBoilerplatePackages, fetchOnlineBoilerplates as _fetchOnlineBoilerplates } from '@dolittle/tooling.common.boilerplates';
import { Outputter } from '../../Outputter';

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
    let spinner = outputter.spinner().start();
    let boilerplates = await _fetchOnlineBoilerplates(onlineBoilerplatesDiscoverer, keywords, limit,
        (data: string) => spinner.text = data,
        (data: string) => spinner.fail(data));
    if (spinner.isSpinning) spinner.succeed();
    return boilerplates;
}