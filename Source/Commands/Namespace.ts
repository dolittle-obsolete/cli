/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IBusyIndicator, ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { CommandContext,INamespace, IFailedCommandOutputter } from '@dolittle/tooling.common.commands';
import chalk from 'chalk';
import { Command, CommandGroup } from './index';

/**
 * Base class for {Namespace} commands
 *
 * @export
 * @class Namespace
 * @extends {Command}
 */
export class Namespace extends Command {
    
    readonly commands: Command[] = [];
    readonly commandGroups: CommandGroup[] = [];

    static fromNamespace(namespace: INamespace, commands: Command[], commandGroups: CommandGroup[]) {
        const usage = `dolittle ${namespace.name} <command-group> <command>`;
        return new Namespace(namespace.name, commands, commandGroups, namespace.description, usage, undefined, namespace.shortDescription);
    }

    /**
     * Instantiates an instance of {Namespace}.
     * @param {string} name
     * @param {Command[]} commands
     * @param {CommandGroup[]} commandGroups
     * @param {string} description
     * @param {string} usage
     * @param {string} [help]
     * @param {string} [shortDescription]
     */
    constructor(name: string, commands: Command[], commandGroups: CommandGroup[], description: string, usage: string, help?: string, shortDescription?: string) {
        super(name, description, usage, undefined, help, shortDescription);
        this.commands = commands;
        this.commandGroups = commandGroups;
        
    }

    get helpDocs() {
        let res = [chalk.bold('Usage:'), `\t${this.usage}`];
        res.push('', this.description);
        if (this.commands.length > 0) res.push('', chalk.bold('Commands:'), this.commands.map(cmd => `\t${chalk.bold(cmd.name)} - ${cmd.shortDescription}`).join('\n'));
        if (this.commandGroups.length > 0) res.push('', chalk.bold('Command groups:'), this.commandGroups.map(cmd => `\t${chalk.bold(cmd.name)} - ${cmd.shortDescription}`).join('\n'));
        if (this.help) res.push('', chalk.bold('Help:'), this.help);
        
        return res.join('\n');

    }
    async onAction(commandContext: CommandContext, dependencyResolvers: IDependencyResolvers, failedCommandOutputter: IFailedCommandOutputter, outputter: ICanOutputMessages, busyIndicator: IBusyIndicator) {
        let firstArgument = commandArguments[0];
        if (!firstArgument || firstArgument === '') {
            outputter.print(this.helpDocs);
            return;
        }

        const isCommandGroup = this.commandGroups.map(_ => _.name).includes(firstArgument);
        const isBasicCommand = this.commands.map(_ => _.name).includes(firstArgument);
        let command: Command | undefined
        if (isBasicCommand) command = this.commands.find(_ => _.name === firstArgument);
        else if (isCommandGroup) command = this.commandGroups.find(_ => _.name === firstArgument);

        if (command) {
            commandArguments.shift();
            await command.action(dependencyResolvers, currentWorkingDirectory, coreLanguage, commandArguments, commandOptions, this.name, outputter, busyIndicator);
        }
        else {
            outputter.warn(`No such sub command as '${firstArgument}'`);
            outputter.print();
            outputter.print(this.helpDocs);
        }
    }
}