/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_bounded_context_json_with_nothing } from './given/a_bounded_context_json_with_nothing';
import { BoundedContext } from '../BoundedContext';

describe('when parsing a bounded context json with everything', () => {
    let context = new a_bounded_context_json_with_nothing();
    /**
     * @type {BoundedContext}
     */
    let result = null;
    let boundedContextObj = JSON.parse(context.boundedContextJson);


    (beforeEach => {
        result = new BoundedContext(boundedContextObj.application, boundedContextObj.boundedContext, boundedContextObj.boundedContextName, boundedContextObj.backend, boundedContextObj.interaction);
    })();
    it('should create a bounded context without an application id', () => expect(result.application).to.be.undefined);
    it('should create a bounded context without a bounded context id', () => expect(result.boundedContext).to.be.undefined);
    it('should create a bounded context without a bounded context name', () => expect(result.boundedContextName).to.be.undefined);
    it('should create a bounded context without a backend', () => expect(result.backend).to.be.undefined);
    it('should create a bounded context without an interaction layer array', () => expect(result.interaction).to.be.undefined);
    
});