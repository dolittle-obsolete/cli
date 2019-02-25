
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
     * The list commands belonging to this group
     *
     * @type {Command[]}
     * @memberof CommandGroup
     */
    commands = [];
    /**
     * Creates an instance of {CommandGroup}.
     * @param {Command[]} commands
     * @param {string} group
     * @param {string} help
     * @param {string} usage
     * @memberof Command
     */
    constructor(commands, group, help, usage) {
        super(group, `${group} is a command group grouping together common commands`,
            usage, group, help);

        this.commands = commands;
        
    }
    /**
     * Generates and gets the whole 'help' text for a {CommandGroup}
     *
     * @readonly
     * @memberof CommandGroup
     */
    get commandGroupHelpDocs() {
        let res = [];
        if (this.usage) res.push(`usage: ${this.usage}`);
        if (this.commands.length > 0) res.push('', 'Sub Commands:', this.commands.map(cmd => `\t${cmd.name} - ${cmd.shortDescription}`).join('\n'));
        if (this.description) res.push('', this.description);
        if (this.help) res.push('', this.help);
        
        return res.join('\n');
    }

}