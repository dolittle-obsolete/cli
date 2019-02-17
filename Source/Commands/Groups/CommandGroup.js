
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Command} from '../Command';

export const commandGroups = [
    'add',
    'boilerplates',
    'cluster',
    'create'
];
export default class CommandGroup extends Command {
    
    /**
     * Creates an instance of {CommandGroup}.
     * @param {string} group
     * @param {string} help
     * @param {string} usage
     * @memberof Command
     */
    constructor(group, help, usage) {
        super(undefined, group, undefined, undefined, help, usage);
        this.description = `${group} is a command group`;
    }
}