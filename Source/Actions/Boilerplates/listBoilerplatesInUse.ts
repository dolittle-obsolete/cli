/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { IBoilerplateManagers, listBoilerplatesInUse as _listBoilerplatesInUse } from '@dolittle/tooling.common.boilerplates';
import { Outputter } from '../../Outputter';


/**
 * Lists the boilerplates used by the tooling
 *
 * @export
 * @param {Outputter} outputter
 * @param {BoilerplatesManager} boilerplatesManager
 * 
 */
export default async function listBoilerplatesInUse(outputter: Outputter, boilerplateManagers: IBoilerplateManagers) {

    let spinner = outputter.spinner().start();
    await _listBoilerplatesInUse(boilerplateManagers, 
        (data: string) => spinner.text = data,
        (data: string) => spinner.succeed(data),
        (data: string) => outputter.print(data),
        (data: string) => spinner.warn(data),
        (data: string) => spinner.fail(data)
    );
    if (spinner.isSpinning) spinner.succeed();
    
}