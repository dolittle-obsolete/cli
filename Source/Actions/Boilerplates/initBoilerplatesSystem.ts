import { IBoilerplateDiscoverers, initBoilerplatesSystem as _initBoilerplatesSystem } from '@dolittle/tooling.common.boilerplates';
import { Outputter } from '../../Outputter';

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * Initializes the boilerplates system in the common tooling
 * @param {Outputter} outputter
 */
export default async function initBoilerplatesSystem(outputter: Outputter, boilerplateDiscoverers: IBoilerplateDiscoverers) {
    let spinner = outputter.spinner().start();
    await _initBoilerplatesSystem(boilerplateDiscoverers, 
        (data: string) => spinner.text = data,
        (data: string) => spinner.fail(data)
    );
    if (spinner.isSpinning) spinner.succeed();
    
}