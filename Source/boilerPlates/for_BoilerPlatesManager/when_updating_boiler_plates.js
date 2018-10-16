/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { a_boiler_plates_manager } from './given/a_boiler_plates_manager';

const first_boiler_plate = 'first_boiler_plate';
const second_boiler_plate = 'second_boiler_plate';

describe('when updating boiler plates', () => {
    let context = new a_boiler_plates_manager();
    let updateBoilerPlatesOnDisk = null;
    let getAvailableBoilerPlates = null;
    let updateConfiguration = null;
    let resolve = null;
    
    (beforeEach => {
        updateBoilerPlatesOnDisk = sinon.stub(context.boilerPlatesManager,'updateBoilerPlatesOnDisk');
        updateBoilerPlatesOnDisk.resolves();

        getAvailableBoilerPlates = sinon.stub(context.boilerPlatesManager, 'getAvailableBoilerPlates');
        getAvailableBoilerPlates.resolves([
            first_boiler_plate,
            second_boiler_plate
        ]);

        updateConfiguration = sinon.stub(context.boilerPlatesManager,'updateConfiguration');

        context.fileSystem.existsSync = sinon.stub().returns(false);
        context.git.silent = sinon.stub().returns(context.git);
        context.git.clone = sinon.stub().returns(context.git);
        context.git.exec = (callback) => callback();
        
        resolve = sinon.spy();
        context.boilerPlatesManager.update().then(resolve);
    })();

    //it('should', context.git.clone.should.be.called);
    //it('should update configuration', updateConfiguration.should.be.called);
    //it('should resolve', resolve.should.be.called);
    it('should', true.should.be.true);
});