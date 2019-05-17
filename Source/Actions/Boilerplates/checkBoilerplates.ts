/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ICanFindOnlineBoilerplatePackages, IBoilerplateDiscoverers, checkBoilerplates as _checkBoilerplates, OutOfDatePackage } from '@dolittle/tooling.common.boilerplates';
import * as FsExtra from 'fs-extra';
import { Outputter } from '../../Outputter';

/**
 * Checks the version of the installed boilerplates
 *
 * @export
 * @param {Outputter} outputter
 * @param {ICanDiscoverBoilerplates} localBoilerplatesDiscovere
 * @param {ICanFindOnlineBoilerplatePackages} onlineBoilerplatesDiscoverer
 * @param {typeof FsExtra} fileSystem
 * @returns
 */
export default async function checkBoilerplates(outputter: Outputter, boilerplateDiscoverers: IBoilerplateDiscoverers, onlineBoilerplatesDiscoverer: ICanFindOnlineBoilerplatePackages,
    fileSystem: typeof FsExtra) {

    let spinner = outputter.spinner().start();
    let outOfDatePackages = <OutOfDatePackage[]>(await _checkBoilerplates(boilerplateDiscoverers, onlineBoilerplatesDiscoverer, fileSystem, 
        (data: string) => spinner.text = data,
        (data: string) => spinner.warn(data),
        (data: string) => {
            spinner.warn(data);
            spinner = outputter.spinner().start();
        })); 
    if (outOfDatePackages.length > 0 && spinner.isSpinning) spinner.warn(`There are ${outOfDatePackages.length} out-of-date packages.`)     
    else if (spinner.isSpinning) spinner.succeed('All boilerplates are up-to-date')
    return outOfDatePackages;
}