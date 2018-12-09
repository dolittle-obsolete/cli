import { a_standard_dolittle_config } from './a_standard_dolittle_config';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export class all_dependencies extends a_standard_dolittle_config {
    constructor() {
        super();
        this.area = 'domain';
        this.language = 'language';
        this.name = 'artifact';
        this.boundedContextPath = require('path').join('some', 'path', 'to', 'boundedcontext-root', 'bounded-context.json');
        this.boundedContextRoot = require('path').dirname(this.boundedContextPath);
    }
}