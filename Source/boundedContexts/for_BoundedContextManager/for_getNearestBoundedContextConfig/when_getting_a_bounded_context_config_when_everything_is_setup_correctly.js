/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { all } from './given/all';
import { equal } from "assert";
import { BoundedContext } from '../../BoundedContext';

describe('when getting a bounded context config when everything is setup correctly', () => {
    let context = new all();
    /**
     * @type{BoundedContext}
     */
    let result = null;

    (beforeEach => {
        result = context.boundedContextManager.getNearestBoundedContextConfig(context.startPath);
    })();
    it('should get a bounded context', () => expect(result).to.not.be.null);
    it('should ask the filesystem of the nearest file searching upwards with the correct arguments', 
        () => context.folders.getNearestFileSearchingUpwards.should.be.calledWith(context.startPath));
    it('should read file from the correct path: ', () => context.fileSystem.readFileSync.should.be.calledWith(context.boundedContextPath));
    it('should get a bounded context configuration with the correct application', () => result.application.should.equal(context.application));
    it('should get a bounded context configuration with the correct boundedContext', () => result.boundedContext.should.equal(context.boundedContext));
    it('should get a bounded context configuration with the correct boundedContextName', () => result.boundedContextName.should.equal(context.boundedContextName));
    it('should get a bounded context configuration with the correct backend language', () => result.backend.language.should.equal(context.boundedContextBackendLanguage));
});
