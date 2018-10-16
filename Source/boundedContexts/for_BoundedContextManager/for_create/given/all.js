/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { a_bounded_context_manager } from '../../given/a_bounded_context_manager';
import { Application } from '../../../../applications/Application';
import { BoilerPlate } from '../../../../boilerPlates/BoilerPlate';
import path from 'path';

const boilerPlates = [
    new BoilerPlate('csharp', 'Bounded Context Boilerplate', 'The Description', 'boundedContext')
];
export class all extends a_bounded_context_manager {
    constructor() {
        super();
        this.applicationId = '4ae234f0-82ff-454d-aab1-db87edf4d8a9';
        this.applicationName = 'App';
        this.application = new Application(this.applicationId, this.applicationName);
        this.boilerPlates = boilerPlates;

        this.context = {
            name: 'TheBoundedContext',
            destination: path.join('path','to','application')
        };
        

    }
}