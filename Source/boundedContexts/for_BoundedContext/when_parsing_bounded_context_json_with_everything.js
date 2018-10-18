/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_bounded_context_json_with_everything } from './given/a_bounded_context_json_with_everything';
import { BoundedContext } from '../BoundedContext';

describe('when parsing a bounded context json with everything', () => {
    let context = new a_bounded_context_json_with_everything();
    /**
     * @type {BoundedContext}
     */
    let result = null;
    let boundedContextObj = JSON.parse(context.boundedContextJson);


    (beforeEach => {
        result = new BoundedContext(boundedContextObj.application, boundedContextObj.boundedContext, boundedContextObj.boundedContextName, boundedContextObj.backend, boundedContextObj.interaction);
    })();
    it('should create a bounded context with the correct application id', () => result.application.should.equal(context.application));
    it('should create a bounded context with the correct bounded context id', () => result.boundedContext.should.equal(context.boundedContext));
    it('should create a bounded context with the correct bounded context name', () => result.boundedContextName.should.equal(context.boundedContextName));
    it('should create a bounded context with the correct backend language', () => result.backend.language.should.equal(context.backendLanguage));
    it('should create a bounded context without an interaction layer array', () => expect(result.interaction).to.be.undefined);
    
});