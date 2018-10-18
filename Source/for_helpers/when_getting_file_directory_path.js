/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { getFileDirPath } from '../helpers';
describe('when getting file directory path', () => {
    const path = require('path');
    const filePathDir = path.join('some', 'folder', 'to');
    const filePath = path.join(filePathDir, 'file.something');
    let result = '';
    (beforeEach => {
        result = getFileDirPath(filePath);
    })();
    it('should get the file path directory', () => result.should.equal(filePathDir));
});