/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ApplicationManager } from '../../ApplicationManager';

export class an_application_manager {
    constructor() {

        this.applicationFileName = 'application.json';
        this.boilerPlatesManager = {};
        this.configManager = {};
        this.folders = {};
        this.fileSystem = {};

        this.applicationManager = new ApplicationManager(this.boilerPlatesManager, this.configManager, this.folders, this.fileSystem, logger);
    }
}