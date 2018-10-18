/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { validateArgsNameInput } from '../helpers';
describe('when validating name argument containing spaces', () => {
    const name = 'The Something';
    
    it('should throw an exception', () => expect(() => validateArgsNameInput(name)).to.throw());
});