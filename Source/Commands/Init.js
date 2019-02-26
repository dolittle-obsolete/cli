/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from './Command';

class Init extends Command{
    constructor() {
        super('init', 'Initializes the Dolittle CLI', 
            'dolittle init', undefined, '', 'Sets up the environment for the CLI' );
    }
}

export default new Init();