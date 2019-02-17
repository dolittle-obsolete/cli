/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CommandGroup } from './CommandGroup';
import { Command } from '../Command';

/**
 * The Boilerplates {CommandGroup}
 *
 * @export
 * @class Boilerplates
 * @extends {CommandGroup}
 */
export class Boilerplates extends CommandGroup {
    /**
     * Creates an instance of {Boilerlates}.
     * @param {Command[]} commands
     * @memberof Boilerplates
     */
    constructor(commands) {
        const group = 'boilerplates';
        const help = 'Group of the commands related to boilerplates.';
        const usage = `usage:
${commands.map( cmd => `\t$ dolittle ${group} ${cmd.name}`).join('\n')}`;
        
        super(group, help, usage);
    }
}
