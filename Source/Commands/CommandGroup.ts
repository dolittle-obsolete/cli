/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICommandGroup, CommandContext, IFailedCommandOutputter } from '@dolittle/tooling.common.commands';
import { IBusyIndicator, ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import chalk from 'chalk';
import { Command, ParserResult } from '../index';

/**
 * Base class for {CommandGroup} commands
 *
 * @export
 * @class CommandGroup
 * @extends {Command}
 */
export class CommandGroup extends Command {
    
    readonly commands: Command[] = [];

    static fromCommandGroup(commandGroup: ICommandGroup, commands: Command[], namespace?: string) {
        const usage = `dolittle ${commandGroup.name} <command>`;
        return new CommandGroup(commandGroup.name, commands, commandGroup.description, usage, undefined, commandGroup.shortDescription);
    }
    /**
     * Instantiates an instance of {CommandGroup}.
     * @param {string} name
     * @param {Command[]} commands
     * @param {string} description
     * @param {string} usage
     * @param {string} [help]
     * @param {string} [shortDescription]
     */
    constructor(name: string, commands: Command[], description: string, usage: string, help?: string, shortDescription?: string) {
        super(name, description, usage, name, help, shortDescription);
        this.commands = commands;   
    }

    get helpDocs() {
        let res = [chalk.bold('Usage:'), `\t${this.usage}`];
        res.push('', this.description);
        if (this.commands.length > 0) res.push('', chalk.bold('Commands:'), this.commands.map(cmd => `\t${chalk.bold(cmd.name)} - ${cmd.shortDescription}`).join('\n'));
        if (this.help) res.push('', chalk.bold('Help:'), this.help);
        
        return res.join('\n');

    }
    async trigger(parserResult: ParserResult, commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        let firstArgument = parserResult.firstArg;
        if (!firstArgument || firstArgument === '') {
            outputter.print(this.helpDocs);
            return;
        }
        let command = this.commands.find(_ => _.name === firstArgument);
        if (command) {
            parserResult.firstArg = parserResult.restArgs.shift() || '';
            await command.trigger(parserResult, commandContext, dependencyResolvers,outputter, busyIndicator);
        }
        else {
            outputter.warn(`Sub command: '${firstArgument}' does not exist`);
            outputter.print();
            outputter.print(this.helpDocs);
        }
    }
    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        
    }
}