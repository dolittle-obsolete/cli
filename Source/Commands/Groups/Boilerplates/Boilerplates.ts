/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../../Command';
import { CommandGroup } from '../CommandGroup';
import checkCommand from './Check';
import dolittleCommand from './Dolittle';
import initCommand from './Init';
import installedCommand from './Installed';
import listCommand from './List';
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
    constructor(commands: Command[]) {
        super(commands, group, 
            'Commands related to boilerplates.',
            `dolittle ${group} <command>`
        );
    }
}

export default new Boilerplates([checkCommand, dolittleCommand, installedCommand, listCommand, onlineCommand, initCommand]);