/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { all_supported_boiler_plates } from './given/all_supported_boiler_plates';

describe('when asking for application for csharp boiler plates', () => {
    let context = new all_supported_boiler_plates();
    let result = null;
    let expected = [
        context.boilerPlates[0]
    ];

    (beforeEach => {
        result = context.boilerPlatesManager.boilerPlatesByLanguageAndType('csharp','application');
    })();

    it("should return exact number of boiler plates", () => result.length.should.equal(1));
    it("should return the expected boiler plates", () => result.forEach((_, index) => _.should.deep.include(expected[index])));
});