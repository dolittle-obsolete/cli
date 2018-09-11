/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BoilerPlatesManager } from '../../BoilerPlatesManager';

export class a_boiler_plates_manager {


    constructor() {
        this.configManager = {
            centralFolderLocation: ''

        };
        this.httpWrapper = {};
        this.git = {};
        this.folders = {
            makeFolderIfNotExists: sinon.stub()
        };
        this.fileSystem = {
            existsSync: sinon.stub()
        };
        this.logger = {
            warn: sinon.stub()
        };

        this.boilerPlatesManager = new BoilerPlatesManager(
            this.configManager,
            this.httpWrapper,
            this.git,
            this.folders,
            this.fileSystem,
            this.logger
        );
    }
}