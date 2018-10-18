/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_system_that_reads_an_application_json } from './given/a_system_that_reads_an_application_json';

describe('when_getting_application_from_a_folder_that_has_an_application_configuration', () => {
    let context = new a_system_that_reads_an_application_json();
    const path = require('path');
    let resultApplication = null;
    (beforeEach => {
        resultApplication = context.applicationManager.getApplicationFrom(context.folder);
    })();
    it('should check if the correct file exists', () => context.fileSystem.existsSync.should.be.calledWith(path.join(context.folder, context.applicationFileName)));
    it('should read application file from the correct path', () => context.fileSystem.readFileSync.should.be.calledWith(path.join(context.folder, context.applicationFileName)));
    it('should get an application', () => expect(resultApplication).to.not.be.null);
    it('should get application with correct application id', () => resultApplication.id.should.equal(context.applicationId));
    it('should get application with correct application name', () => resultApplication.name.should.equal(context.applicationName));
    
    
});