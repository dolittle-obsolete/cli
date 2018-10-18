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
        this.application = '9825572e-ea61-4ee4-86b8-dbc3f46919f6';
        this.boundedContext = '61e6035e-2a63-465c-a149-4f2ac6824dac';
        this.boundedContextName = 'BC';
        this.boundedContextBackendLanguage = 'csharp';
        this.boundedContextJson = 
        `
        {
            "application": "${this.application}",
            "boundedContext": "${this.boundedContext}",
            "boundedContextName": "${this.boundedContextName}",
            "backend": {
              "language": "${this.boundedContextBackendLanguage}"
            }
          }
        `;
        this.boundedContextPath = path.join('path', 'to', 'boundedcontext');
        this.folders = {
            getNearestFileSearchingUpwards: sinon.stub().returns(this.boundedContextPath)
        };
        this.fileSystem = {
            readFileSync: sinon.stub().returns(this.boundedContextJson)
        };
        this.startPath = path.join('path','to','application');
        
        this.boundedContextManager = new BoundedContextManager(this.boilerPlatesManager, this.applicationManager, this.folders, this.fileSystem, logger);


    }
}