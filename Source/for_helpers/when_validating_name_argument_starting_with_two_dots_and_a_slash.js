/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { validateArgsNameInput } from '../helpers';
describe('when validating name argument starting with two dots and a slash', () => {
    const name = '../TheSomething';
    
    it('should throw an exception', () => expect(() => validateArgsNameInput(name)).to.throw());
});