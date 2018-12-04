/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {determineDestination} from '../../../../helpers';
import { path_with_one_feature } from './given/path_with_one_feature';
import { path_with_multiple_features } from './given/path_with_multiple_features';

const path = require('path');

describe('when creating artifact with multiple features from a path with one feature', () => {
    let context = null;
    let result = '';
    let featureSegments = 'feature2.feature3';
    (beforeEach => {
        context = new path_with_one_feature();
        result = determineDestination(context.area, context.language, `${featureSegments}.${context.name}`, context.cwd, context.boundedContextPath, context.dolittleConfig);
    })();
    it('Should determine the correct destination', () => result.destination.should.equal(path.join(context.boundedContextRoot, context.dolittleConfig[context.language][context.area], context.featureSegments.split('.').join(path.sep), featureSegments.split('.').join(path.sep))));
});

describe('when creating artifact with multiple features from a path with multiple features', () => {
    let context = null;
    let result = '';
    let featureSegments = 'feature3.feature4';
    (beforeEach => {
        context = new path_with_multiple_features();
        result = determineDestination(context.area, context.language, `${featureSegments}.${context.name}`, context.cwd, context.boundedContextPath, context.dolittleConfig);
    })();
    it('Should determine the correct destination', () => result.destination.should.equal(path.join(context.boundedContextRoot, context.dolittleConfig[context.language][context.area], context.featureSegments.split('.').join(path.sep), featureSegments.split('.').join(path.sep))));
});