/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { a_bounded_context_manager } from '../../given/a_bounded_context_manager';
import { BoilerPlate } from '../../../../boilerPlates/BoilerPlate';
import path from 'path';

export class all extends a_bounded_context_manager {
    constructor() {
        super();
        this.folders = {
            getNearestFileSearchingUpwards: sinon.stub().returns('')
        };
        this.context = {
            name: 'TheBoundedContext',
            destination: path.join('path','to','application')
        };
        

    }
}