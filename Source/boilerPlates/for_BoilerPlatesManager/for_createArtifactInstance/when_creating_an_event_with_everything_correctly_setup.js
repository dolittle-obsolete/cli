/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {a_system_for_event_artifact } from './given/a_system_for_event_artifact';

describe('when_creating_an_event_with_everything_correctly_setup', () => {
    let context = new a_system_for_event_artifact();
    const path = require('path');
    (beforeEach => {
        context.boilerPlatesManager.createArtifactInstance(context.eventArtifactTemplate, context.destination, context.context);
    })();

    it('should call the filesystem to get artifact template files with the correct arguments', 
        () => context.folders.getArtifactTemplateFilesRecursivelyIn.should.be.calledWith(context.eventArtifactTemplate.location, context.eventArtifactTemplate.template.includedFiles)); 
    it('should call the filesystem to read from the correct path', () => context.fileSystem.readFileSync.should.be.calledWith(path.join(context.templateLocation, context.includedFiles[0])));
});