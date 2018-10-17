/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ApplicationManager } from '../../../ApplicationManager';
import { an_application_manager } from '../../given/an_application_manager';

export class a_system_that_reads_an_application_json extends an_application_manager {
    constructor() {
        super();
        this.applicationId = 'eb6edb77-0dbc-4f1e-91d9-3edaef4fc2f2';
        this.applicationName = 'TheApplicationName';
        this.applicationJson = 
        `
            {
                "id": "${this.applicationId}",
                "name": "${this.applicationName}"
            }
        `;
        this.fileSystem = {
            readFileSync: sinon.stub().returns(this.applicationJson),
            existsSync: sinon.stub().returns(true)
        };
        this.applicationManager = new ApplicationManager(this.boilerPlatesManager, this.configManager, this.folders, this.fileSystem, logger);
        this.folder = 'some folder';
    }
}