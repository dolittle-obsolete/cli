/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_system_for_finding_for_an_application_boilerplate } from './given/a_system_for_finding_an_application_boilerplate';

describe('when creating an application', () => {
    let context = new a_system_for_finding_for_an_application_boilerplate();

    (beforeEach => {
        context.applicationManager.create(context.context);
    })();
    it('should call boilerPlateByType with application', () => context.boilerPlatesManager.boilerPlatesByType.should.be.calledWith('application'));
    it('should call createInstance with the boilerplate and the destination', context.boilerPlatesManager.createInstance.should.be.calledWith(context.boilerPlates[0], context.context.destination));
    
});