/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {all_artifact_templates } from './given/all_artifact_templates';

describe('when creating command with known language', () => {
    let context = new all_artifact_templates();
    let bindingContext = {
        name: 'name',
        namespace: 'namespace'
    }
    let result = 1;
    (beforeEach => {
        context.folders.getArtifactTemplateFilesRecursivelyIn = sinon.stub();
        context.boilerPlatesManager.createArtifactInstance('command', 'csharp', 
            context.boilerPlate, context.destination, bindingContext);
    })();

    it('should call folders.getArtifactTemplateFilesRecursivelyIn with the right arguments', () => 
        context.boilerPlatesManager.folders.getArtifactTemplateFilesRecursivelyIn.should.be.calledWith(
            '/somewhere/on/disk/csharp/command/',
            context.templates[1].includedFiles
        )
    );
    it('should what', () => result.should.equal(1));
});