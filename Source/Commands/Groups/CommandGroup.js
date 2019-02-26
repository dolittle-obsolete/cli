
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Command} from '../Command';
import { CliContext } from '../../CliContext';
import { ParserResult } from '../../ParserResult';
import chalk from 'chalk';

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
    constructor(commands, group, description, usage, help = undefined, shortDescription = undefined) {
        super(group, description, usage, group, help, shortDescription);

        this.commands = commands;
        
    }
    /**
     * @inheritdoc 
     * @readonly
     * @memberof CommandGroup
     */
    get helpDocs() {
        let res = [chalk.bold('Usage:'), `\t${this.usage}`];
        res.push('', this.description);
        if (this.commands.length > 0) res.push('', chalk.bold('Commands:'), this.commands.map(cmd => `\t${chalk.bold(cmd.name)} - ${cmd.shortDescription}`).join('\n'));
        if (this.help) res.push('', chalk.bold('Help:'), this.help);
        
        return res.join('\n');
    }
    /**
     * @inheritdoc
     * @param {ParserResult} parserResult
     * @param {CliContext} context
     */
    async action(parserResult, context) {
        if (!parserResult.firstArg) {
            context.outputter.print(this.helpDocs);
            return;
        }
        let command = this.commands.filter(_ => _.name === parserResult.firstArg)[0];
        if (command) {
            parserResult.firstArg = parserResult.restArgs.shift();
            await command.action(parserResult, context);
        }
        else {
            context.outputter.warn(`No such sub command as '${parserResult.firstArg}'`);
            context.outputter.print();
            context.outputter.print(this.helpDocs);
        }
    }
}