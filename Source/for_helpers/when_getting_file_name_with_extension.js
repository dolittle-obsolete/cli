/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { getFileNameAndExtension } from '../helpers';
describe('when getting file name and extension', () => {
    const path = require('path');
    const nameAndExtension = 'file.something';
    const filePath = path.join('some', 'folder', 'to', nameAndExtension);
    let result = '';
    (beforeEach => {
        result = getFileNameAndExtension(filePath);
    })();
    it('should get the file name with the extension', () => result.should.equal(nameAndExtension));
});