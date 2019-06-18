/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ICommandGroup } from '@dolittle/tooling.common.commands';
import { IBusyIndicator, ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import chalk from 'chalk';
import { CliCommand } from './CliCommand';
import { Outputter } from '../Outputter';
import { BusyIndicator } from '../BusyIndicator';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';

/**
 * Base class for {CliCommandGroup} commands
 *
 * @export
 * @class CliCommandGroup
 * @extends {Command}
 */
export class CliCommandGroup extends CliCommand {
    
    readonly commands: CliCommand[] = [];

    static fromCommandGroup(commandGroup: ICommandGroup, commands: CliCommand[], namespace?: string) {
        const usage = `dolittle ${commandGroup.name} <command>`;
        return new CliCommandGroup(commandGroup.name, commands, commandGroup.description, usage, undefined, commandGroup.shortDescription);
    }
    /**
     * Instantiates an instance of {CliCommandGroup}.
     * @param {string} name
     * @param {CliCommand[]} commands
     * @param {string} description
     * @param {string} usage
     * @param {string} [help]
     * @param {string} [shortDescription]
     */
    constructor(name: string, commands: CliCommand[], description: string, usage: string, help?: string, shortDescription?: string) {
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
    async action(dependencyResolvers: IDependencyResolvers, currentWorkingDirectory: string, coreLanguage: string, commandArguments: string[], commandOptions: Map<string, any>, namespace?: string, outputter: ICanOutputMessages = new Outputter(), busyIndicator: IBusyIndicator = new BusyIndicator()) {
        let firstArgument = commandArguments[0];
        if (!firstArgument || firstArgument === '') {
            outputter.print(this.helpDocs);
            return;
        }
        let command = this.commands.find(_ => _.name === firstArgument);
        if (command) {
            commandArguments.shift();
            await command.action(dependencyResolvers, currentWorkingDirectory, coreLanguage, commandArguments, commandOptions, namespace, outputter, busyIndicator);
        }
        else {
            outputter.warn(`No such sub command as '${firstArgument}'`);
            outputter.print();
            outputter.print(this.helpDocs);
        }
    }
}