/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CommandGroup } from './CommandGroup';
import { Command } from '../Command';

/**
 * The Create {CommandGroup}
 *
 * @export
 * @class Create
 * @extends {CommandGroup}
 */
export class Create extends CommandGroup {
    /**
     * Creates an instance of {Create}.
     * @param {Command[]} commands
     * @memberof Create
     */
    constructor(commands) {
        const group = 'create';
        const help = 'Creation of the big dolittle structures like applications and bounded contexts, based on boilerplates.';
        const usage = `usage:
${commands.map( cmd => `\t$ dolittle ${group} ${cmd.name}`).join('\n')}`;
        
        super(group, help, usage);
    }
}
