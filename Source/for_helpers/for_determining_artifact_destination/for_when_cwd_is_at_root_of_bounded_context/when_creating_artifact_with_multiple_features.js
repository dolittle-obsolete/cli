/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {determineDestination} from '../../../helpers';
import { all_dependencies } from '../given/all_dependencies';
describe('when creating artifact with multiple features', () => {
    const path = require('path');
    let context = null;
    let result = '';
    let featureSegments = 'feature1.feature2';
    (beforeEach => {
        context = new all_dependencies();
        result = determineDestination(context.area, context.language, `${featureSegments}.${context.name}`, context.boundedContextPath, context.boundedContextPath, context.dolittleConfig);
    })();
    it('Should determine the correct destination', () => result.destination.should.equal(path.join(context.boundedContextRoot, context.dolittleConfig[context.language][context.area], featureSegments.split('.').join(path.sep))));
});