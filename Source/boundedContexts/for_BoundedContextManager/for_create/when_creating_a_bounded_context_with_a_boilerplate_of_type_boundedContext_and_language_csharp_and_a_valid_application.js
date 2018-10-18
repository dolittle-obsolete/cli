/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_system_with_one_bounded_context_boilerplate_for_csharp_and_an_application } from './given/a_system_with_one_bounded_context_boilerplate_for_csharp_and_an_application';

describe('when_creating_a_bounded_context_with_a_boilerplate_of_type_boundedContext_and_language_csharp_and_a_valid_application', () => {
    let context = new a_system_with_one_bounded_context_boilerplate_for_csharp_and_an_application();
    const path = require('path');


    (beforeEach => {
        context.boundedContextManager.create(context.context);
    })();
    it('should call applicationManager.getApplicationFrom with the correct destination', () => context.applicationManager.getApplicationFrom.should.be.calledWith(context.context.destination));
    it('should call boilerPlatesManager.boilerPlatesByLanguageAndType with csharp and boundedContext', () => context.boilerPlatesManager.boilerPlatesByLanguageAndType.should.be.calledWith('csharp', 'boundedContext'));
    it('should call folders.makeFolderIfNotExists with the correct path', () => context.folders.makeFolderIfNotExists.should.be.calledWith(path.join(context.context.destination, context.context.name)));
    it('should call boilerPlatesManager.createInstance with the boilerplate, correct path and templatecontext', () => context.boilerPlatesManager.createInstance.should.be.calledWith(context.boilerPlates[0], path.join(context.context.destination, context.context.name)));
});