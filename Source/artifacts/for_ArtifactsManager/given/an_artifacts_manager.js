/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ArtifactsManager } from '../../ArtifactsManager';

export class an_artifacts_manager {
    constructor() {
        this.inquirerManager = {
            promptUser: sinon.stub().returns({
                then: sinon.stub()
            })
        };
        this.boilerPlatesManager = {
            createArtifactInstance: sinon.stub()
        };
        this.boundedContextManager = {};
        this.folders = {};
        this.fileSystem = {};
        
        this.artifactsManager = new ArtifactsManager(this.inquirerManager, this.boilerPlatesManager, this.boundedContextManager, this.folders, this.fileSystem, logger);

    }
}