/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { all_supported_boiler_plates } from './given/all_supported_boiler_plates';

describe('when getting available boiler plates', () => {
    let context = new all_supported_boiler_plates();
    let result = null;
    let items = [{ name: 'first' }, { name: 'second' }, { name: 'third' }];

    (beforeEach => {
        context.httpWrapper.getJson = sinon.stub().returns({
            then: (callback) => {
                callback(JSON.stringify(items));
            }
        });
        context.boilerPlatesManager.getAvailableBoilerPlates().then(r => result = r);
    })();

    it('should return expected urls', () => result.should.have.all.members([items[0].name, items[1].name, items[2].name]));
});