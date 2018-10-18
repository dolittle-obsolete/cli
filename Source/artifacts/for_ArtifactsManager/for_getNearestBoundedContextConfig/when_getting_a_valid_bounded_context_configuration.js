/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_system_that_returns_a_valid_bounded_context_configuration } from './given/a_system_that_returns_a_valid_bounded_context_configuration';
import { BoundedContext } from '../../../boundedContexts/BoundedContext';
describe('when getting a valid bounded context configuration', () => {
    let context = new a_system_that_returns_a_valid_bounded_context_configuration();
    let boundedContext = new BoundedContext();
    (beforeEach => {
        boundedContext = context.artifactsManager._getNearestBoundedContextConfig('somePath');
    })();
    it('should return a bounded context configuration', () => expect(boundedContext).to.not.be.null);
    it('should get a bounded context with the correct application', () => boundedContext.application.should.equal(context.application));
    it('should get a bounded context with the correct bounded context id', () => boundedContext.boundedContext.should.equal(context.boundedContext));
    it('should get a bounded context with the correct bounded context name', () => boundedContext.boundedContextName.should.equal(context.boundedContextName));
    it('should get a bounded context with the correct backend', () => boundedContext.backend.should.equal(context.boundedContextBackend));
    it('should get a bounded context with the correct interaction', () => expect(boundedContext.interaction).to.be.undefined);
});