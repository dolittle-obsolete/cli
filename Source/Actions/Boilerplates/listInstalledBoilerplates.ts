/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { IBoilerplateDiscoverers,  listInstalledBoilerplates as _listInstalledBoilerplates} from '@dolittle/tooling.common.boilerplates';
import * as FsExtra from 'fs-extra';
import path from 'path';
import { Outputter } from '../../Outputter';

/**
 * Finds and gets the boilerplates installed on the local machine
 *
 * @export
 * @param {Outputter} outputter
 * @param {ICanDiscoverBoilerplates} localBoilerplatesDiscoverer
 * @param {typeof FsExtra} filesystem
 * @returns A list of the boilerplate and package configurations for each boilerplate
 */
export default async function listInstalledBoilerplates(outputter: Outputter, boilerplateDiscoverers: IBoilerplateDiscoverers, filesystem: typeof FsExtra)  {
    let spinner = outputter.spinner().start();
    let boilerplates = await _listInstalledBoilerplates(boilerplateDiscoverers, filesystem, 
        (data: string) => spinner.text = data,
        (data: string) => spinner.warn(data),
        (data: string) => spinner.fail(data)
    );
    if (boilerplates.length > 0 && spinner.isSpinning) spinner.succeed();
    return boilerplates;
}