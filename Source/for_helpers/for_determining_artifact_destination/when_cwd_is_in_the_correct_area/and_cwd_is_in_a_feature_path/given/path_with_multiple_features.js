import {all_dependencies} from '../../../given/all_dependencies';
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export class path_with_multiple_features extends all_dependencies {
    constructor() {
        super();
        this.featureSegments = 'feature1.feature2';
        this.cwd = require('path').join(this.boundedContextRoot, `${this.dolittleConfig[this.language][this.area]}`, ...this.featureSegments.split('.'));
    }
}