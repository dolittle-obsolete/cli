/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CommandGroup } from './CommandGroup';
import { Command } from '../Command';


/**
 * The Add {CommandGroup}
 *
 * @export
 * @class Add
 * @extends {CommandGroup}
 */
export class Add extends CommandGroup {
    /**
     * Creates an instance of Add.
     * @param {Command[]} commands
     * @memberof Add
     */
    constructor(commands) {
        const group = 'add';
        const help = 'Creates and adds a dolittle artifact to the currenent dolittle project.';
        const usage = `usage:
${commands.map( cmd => `\t$ dolittle ${group} ${cmd.name}`).join('\n')}`;
        
        super(group, help, usage);
    }
}
