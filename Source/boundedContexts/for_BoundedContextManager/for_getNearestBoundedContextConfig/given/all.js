/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { a_bounded_context_manager } from '../../given/a_bounded_context_manager';
import path from 'path';
import { BoundedContextManager } from '../../../BoundedContextManager';


export class all extends a_bounded_context_manager {
    constructor() {
        super();
        this.boundedContextJson = 
        `
        {
            "application": "f13c38b9-424a-20ea-d7b1-57626fbed7e4",
            "boundedContext": "8111438c-810f-680e-b08d-24b4fa4f08a9",
            "boundedContextName": "BC",
            "backend": {
              "language": "csharp"
            }
          }
        `;
        this.boundedContextPath = path.join('path', 'to', 'boundedcontext');
        this.folders = {
            getNearestFileSearchingUpwards: sinon.stub().returns(this.boundedContextPath)
        };
        this.fileSystem = {
            readFileSync: 
        };
        this.context = {
            name: 'TheBoundedContext',
            destination: path.join('path','to','application')
        };
        this.boundedContextManager = new BoundedContextManager(this.boilerPlatesManager, this.applicationManager, this.folders, this.fileSystem, logger);


    }
}