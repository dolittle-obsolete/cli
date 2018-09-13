/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { a_boiler_plates_manager } from './given/a_boiler_plates_manager';

const first_location = '/first/location';
const second_location = '/second/location';

describe('when updating boiler plates on disk', () => {
    let context = new a_boiler_plates_manager();
    let resolved = null;
    let locations_pulled = {
        first_location: false,
        second_location: false
    };

    (beforeEach => {
        resolved = sinon.spy();
        context.folders.getFoldersIn = sinon.stub().returns([
            first_location,
            second_location
        ]);

        context.git.forFolder = function (folder) {
            return {
                pull: () => {
                    locations_pulled[folder] = true;
                    
                    return {
                        exec: function (callback) {
                            callback();
                        }
                    }
                }
            };
        };

        context.boilerPlatesManager.updateBoilerPlatesOnDisk().then(resolved);
    })();

    it('should git pull the first location', () => locations_pulled[first_location].should.be.true);
    it('should git pull the second location', () => locations_pulled[second_location].should.be.true);
    it('should resolve when all is pulled', () => resolved.should.be.called);
});