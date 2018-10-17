/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ApplicationManager } from '../../../ApplicationManager';
import { an_application_manager } from '../../given/an_application_manager';

export class a_system_that_doest_not_have_an_application extends an_application_manager {
    constructor() {
        super();
        this.fileSystem = {
            existsSync: sinon.stub().returns(false)
        };
        this.applicationManager = new ApplicationManager(this.boilerPlatesManager, this.configManager, this.folders, this.fileSystem, logger);
        this.folder = 'some folder';
    }
}