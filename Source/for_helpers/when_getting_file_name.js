/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { getFileName } from '../helpers';
describe('when getting file name', () => {
    const path = require('path');
    const name = 'file';
    const filePath = path.join('some', 'folder', 'to', name +'.something');
    let result = '';
    (beforeEach => {
        result = getFileName(filePath);
    })();
    it('should get the file name without the extension', () => result.should.equal(name));
});