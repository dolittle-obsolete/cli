/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BoundedContext } from '../../../../boundedContexts/BoundedContext';
import { an_artifacts_manager } from '../../given/an_artifacts_manager';
import { Core } from '../../../../boundedContexts/Core';
import { ArtifactsManager } from '../../../ArtifactsManager';

export class a_system_that_returns_a_valid_bounded_context_configuration extends an_artifacts_manager {
    constructor() {
        super();
        this.application = 'e29795b6-b501-4d6f-b93c-4c25bab6969d';
        this.boundedContext = 'cde734bc-927f-4feb-a431-02abfc59de79';
        this.boundedContextName = 'BC';
        this.boundedContextCoreLanguage = 'csharp'
        this.boundedContextCore = new Core(this.boundedContextCoreLanguage);
        this.boundedContextManager = {
            getNearestBoundedContextConfig: sinon.stub().returns(
                new BoundedContext(this.application, this.boundedContext, this.boundedContextName, this.boundedContextCore)
            )
        };
        
        this.artifactsManager = new ArtifactsManager(this.inquirerManager, this.boilerPlatesManager, this.boundedContextManager, this.folders, this.fileSystem, logger);

    }
}