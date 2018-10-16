/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BoundedContextManager } from '../../BoundedContextManager';
export class a_bounded_context_manager {
    constructor() {
        this.boilerPlatesManager = {};
        this.applicationManager = {};
        this.folders = {};
        this.fileSystem = {};
        
        this.boundedContextManager = new BoundedContextManager(this.boilerPlatesManager, this.applicationManager, this.folders, this.fileSystem, logger);
    }
}