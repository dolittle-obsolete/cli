/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IBusyIndicator, ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import chalk from 'chalk';
import { WrappedCommand } from './WrappedCommand';
import { Outputter } from '../Outputter';
import { BusyIndicator } from '../BusyIndicator';
import { WrappedCommandGroup } from './WrappedCommandGroup';
import { INamespace } from '@dolittle/tooling.common.commands';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';

/**
 * Base class for {CliNamespace} commands
 *
 * @export
 * @class WrappedNamespace
 * @extends {WrappedCommand}
 */
export class WrappedNamespace extends WrappedCommand {
    
    readonly commands: WrappedCommand[] = [];
    readonly commandGroups: WrappedCommandGroup[] = [];

    static fromNamespace(namespace: INamespace, commands: WrappedCommand[], commandGroups: WrappedCommandGroup[]) {
        const usage = `dolittle ${namespace.name} <command-group> <command>`;
        return new WrappedNamespace(namespace.name, commands, commandGroups, namespace.description, usage, undefined, namespace.shortDescription);
    }

    /**
     * Instantiates an instance of {WrappedNamespace}.
     * @param {string} name
     * @param {WrappedCommand[]} commands
     * @param {WrappedCommandGroup[]} commandGroups
     * @param {string} description
     * @param {string} usage
     * @param {string} [help]
     * @param {string} [shortDescription]
     */
    constructor(name: string, commands: WrappedCommand[], commandGroups: WrappedCommandGroup[], description: string, usage: string, help?: string, shortDescription?: string) {
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
    async action(dependencyResolvers: IDependencyResolvers, currentWorkingDirectory: string, coreLanguage: string, commandArguments: string[], commandOptions: Map<string, any>, namespace?: string, outputter: ICanOutputMessages = new Outputter(), busyIndicator: IBusyIndicator = new BusyIndicator()) {
        let firstArgument = commandArguments[0];
        if (!firstArgument || firstArgument === '') {
            outputter.print(this.helpDocs);
            return;
        }

        const isCommandGroup = this.commandGroups.map(_ => _.name).includes(firstArgument);
        const isBasicCommand = this.commands.map(_ => _.name).includes(firstArgument);
        let command: WrappedCommand | undefined
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