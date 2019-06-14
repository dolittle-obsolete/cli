/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IBusyIndicator, ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import chalk from 'chalk';
import { CliCommand } from './CliCommand';
import { Outputter } from '../Outputter';
import { BusyIndicator } from '../BusyIndicator';
import { CliCommandGroup } from './CliCommandGroup';
import { INamespace } from '@dolittle/tooling.common.commands';

/**
 * Base class for {CliNamespace} commands
 *
 * @export
 * @class CliNamespace
 * @extends {CliCommand}
 */
export class CliNamespace extends CliCommand {
    
    readonly commands: CliCommand[] = [];
    readonly commandGroups: CliCommandGroup[] = [];

    static fromNamespace(namespace: INamespace, commands: CliCommand[], commandGroups: CliCommandGroup[]) {
        const usage = `dolittle ${namespace.name} <command-group> <command>`;
        return new CliNamespace(namespace.name, commands, commandGroups, namespace.description, usage, undefined, namespace.shortDescription);
    }

    /**
     * Instantiates an instance of {CliNamespace}.
     * @param {string} name
     * @param {CliCommand[]} commands
     * @param {CliCommandGroup[]} commandGroups
     * @param {string} description
     * @param {string} usage
     * @param {string} [help]
     * @param {string} [shortDescription]
     */
    constructor(name: string, commands: CliCommand[], commandGroups: CliCommandGroup[], description: string, usage: string, help?: string, shortDescription?: string) {
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
    async action(currentWorkingDirectory: string, coreLanguage: string, commandArguments: string[], commandOptions: Map<string, any>, namespace?: string, outputter: ICanOutputMessages = new Outputter(), busyIndicator: IBusyIndicator = new BusyIndicator()) {
        console.log(`Inside ${this.name} namespace`);
        console.log(currentWorkingDirectory);
        console.log(commandArguments);
        console.log(commandOptions);
        console.log(namespace);

        console.log('Commands: ');
        this.commands.forEach(_ => console.log(_.name));
        console.log('Command groups: ');
        this.commandGroups.forEach(_ => console.log(_.name));
        // if (!parserResult.firstArg) {
        //     context.outputter.print(this.helpDocs);
        //     return;
        // }
        // let command = this.commands.filter(_ => _.name === parserResult.firstArg)[0];
        // if (command) {
        //     parserResult.firstArg = parserResult.restArgs.shift() || '';
        //     await command.action(parserResult, context);
        // }
        // else {
        //     context.outputter.warn(`No such sub command as '${parserResult.firstArg}'`);
        //     context.outputter.print();
        //     context.outputter.print(this.helpDocs);
        // }
    }
}