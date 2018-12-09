import { all_dependencies } from '../../given/all_dependencies';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export class path_with_no_feature extends all_dependencies {
    constructor() {
        super();
        this.cwd = require('path').join(this.boundedContextRoot, 'OtherArea');
    }
}