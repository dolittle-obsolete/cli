/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from '../Command';
import { CommandGroup } from './CommandGroup';
import { CliContext } from '../../CliContext';
import { ParserResult } from '../../ParserResult';

/**
 * Represents a group of commands which must be discovered
 *
 * @export
 * @class DiscoverableCommands
 */
export class DiscoverableGroup extends CommandGroup {
    /**
     * Creates an instance of {DiscoverableGroup}.
     * @param {string} group The command group these commands will belong to
     * @memberof DiscoverableCommands
     */
    constructor(group, description, usage, help, shortDescription) {
        super([], group, description, usage, help, shortDescription);
    }
    /**
     * Discovers the commands
     * @returns {Command[]} The discovered commands
     * @memberof DiscoverableCommands
     */
    async discover() {
        throw new Error('Should not be implemented in the base class');
    }
}
