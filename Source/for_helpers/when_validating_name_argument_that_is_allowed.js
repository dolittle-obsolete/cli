/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { validateArgsNameInput } from '../helpers';
describe('when validating name argument that is allowed', () => {
    const name = 'TheSomething';
    
    it('should not throw an exception', () => expect( () => validateArgsNameInput(name)).to.not.throw());
});