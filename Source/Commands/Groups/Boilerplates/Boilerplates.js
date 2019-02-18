/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CommandGroup } from '../CommandGroup';
import { Command } from '../../Command';
import dolittleCommand from './Dolittle';
import onlineCommand from './Online';

export const group = 'boilerplates';
/**
 * The Boilerplates {CommandGroup}
 *
 * @export
 * @class Boilerplates
 * @extends {CommandGroup}
 */
class Boilerplates extends CommandGroup {
    /**
     * Creates an instance of {Boilerlates}.
     * @param {Command[]} commands
     * @memberof Boilerplates
     */
    constructor(commands) {
        const help = 'Group of the commands related to boilerplates.';
        const usage = `usage:
${commands.map( cmd => `\t$ dolittle ${group} ${cmd.name}`).join('\n')}`;
        
        super(commands, group, help, usage);
    }
}

export default new Boilerplates([dolittleCommand, onlineCommand])