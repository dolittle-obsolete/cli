/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BoundedContextManager } from '../../../BoundedContextManager';
import { all } from './all';
export class a_system_with_one_bounded_context_boilerplate_for_csharp_and_an_application extends all {
    constructor() {
        super();
        this.boilerPlatesManager = {
            boilerPlatesByLanguageAndType: sinon.stub().returns(this.boilerPlates),
            createInstance: sinon.stub()
        };
        this.applicationManager = {
            getApplicationFrom: sinon.stub().returns(this.application)

        };
        this.folders = {
            makeFolderIfNotExists: sinon.stub()
        };
        this.fileSystem = {};
        
        this.boundedContextManager = new BoundedContextManager(this.boilerPlatesManager, this.applicationManager, this.folders, this.fileSystem, logger);
    }
}