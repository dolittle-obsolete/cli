/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { CommandGroup } from '../CommandGroup';
import { Command } from '../../Command';
import checkCommand from './Check';
import dolittleCommand from './Dolittle';
import installedCommand from './Installed';
import listCommand from './List';
import onlineCommand from './Online';
import initCommand from './Init';

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
        super(commands, group, 
            'Group of the commands related to boilerplates.',
            `dolittle ${group} <sub-command>`
        );
    }
}

export default new Boilerplates([checkCommand, dolittleCommand, installedCommand, listCommand, onlineCommand, initCommand]);