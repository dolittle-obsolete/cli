/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_system_that_doest_not_have_an_application} from './given/a_system_that_doest_not_have_an_application';

describe('when creating an application', () => {
    let context = new a_system_that_doest_not_have_an_application();
    const path = require('path');
    let resultApplication = null;
    (beforeEach => {
        resultApplication = context.applicationManager.getApplicationFrom(context.folder);
    })();
    it('should check if the correct file exists', () => context.fileSystem.existsSync.should.be.calledWith(path.join(context.folder, context.applicationFileName)));
    it('should not get an application', () => expect(resultApplication).to.be.null);
   
    
});