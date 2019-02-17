
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Command} from '../Command';

/**
 * Base class for {CommandGroup} commands
 *
 * @export
 * @class CommandGroup
 * @extends {Command}
 */
export class CommandGroup extends Command {
    
    /**
     * Creates an instance of {CommandGroup}.
     * @param {string} group
     * @param {string} help
     * @param {string} usage
     * @memberof Command
     */
    constructor(group, help, usage) {
        super(group, `${group} is a command group grouping together common commands`,
            usage, group, help);
        
    }
}