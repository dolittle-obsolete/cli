/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ProjectConfig } from '@dolittle/tooling.common.boilerplates';
import { ICommandManager } from '@dolittle/tooling.common.commands';
import { IDependencyResolvers, ArgumentsNotMatchingDependencies } from '@dolittle/tooling.common.dependencies';
import { NotConnectedToInternet } from '@dolittle/tooling.common.packages';
import { ICanOutputMessages } from '@dolittle/tooling.common.utilities';
import chalk from 'chalk';
import { ParserResult } from '../ParserResult';
import getCoreLanguage, { CoreLanguageNotFoundError } from '../Util/getCoreLanguage';
import { MissingCommandArgumentError } from '../Util/requireArguments'
import { CliCommand } from './CliCommand';
import { CliCommandGroup } from './CliCommandGroup';
import { ICliCommandManager } from './ICliCommandManager';
import { Init } from './Init';
import { Check } from './Check';
import { CliNamespace } from './CliNamespace';
import { BusyIndicator } from '../BusyIndicator';

const description = `${chalk.bold('Welcome to the Dolittle CLI!')}

Developing on the Dolittle platform should be fast, easy and fun!

This tool is meant for enhancing the experience of working with a Dolittle-based application while also giving the developer an interface into the Dolittle platform.

Checkout the available commands and command groups to see what the CLI tool can do.
For further information and help on each command and command group add '-h' or '--help' to the command.
`;
const help = [
    '\tnamespace: <To be implemented>',
'\tcommand-group: A group of related commands.',
'\tbasic-command: Basic / global commands not related to any of the command groups',
'\t--help: Displays usage, help and description of a command or command group',
'\t--version: Displays the version of the CLI tool',
'\t--debug: <To be implemented>',
'\t--coreLang: Sets the core language for a command',
'\t--namespace: <To be implemented>',
].join('\n');

/**
 * Represents a manager for commands
 */
export class CliCommandManager implements ICliCommandManager {

    private _namespaces: CliNamespace[] = []
    private _commandGroups: CliCommandGroup[] = [];
    private _commands: CliCommand[];
    
    constructor(private _commandManager: ICommandManager, private _dependencyResolvers: IDependencyResolvers) {
        this._commands = [
            new Init(),
            new Check(this._dependencyResolvers)
        ];
        this.createCliCommands();
    }
    
    get allCommands() {
        let commands = this._commands;
        this._commandGroups.forEach(_ => commands.push(..._.commands));
        return commands;
    }

    get helpDocs() {
        let res = [
            chalk.bold('Usage:'),
            '\tdolittle [<namespace>] <command-group | basic-command> [<command>] [<args>] [-h | --help] [-v | --version] [-d | --debug] [--coreLang] [-n | --namespace]'
        ];
        if (description) res.push('', description);
        if (this._commands.length > 0) res.push('', chalk.bold('Basic commands:'), this._commands.map(_ => `\t${chalk.bold(_.name)} - ${_.shortDescription}`).join('\n'));
        if (this._commandGroups.length > 0) res.push('', chalk.bold('Command groups:'), this._commandGroups.map(_ => `\t${chalk.bold(_.name)} - ${_.shortDescription}`).join('\n'));
        if (this._namespaces.length > 0) res.push('', chalk.bold('Namespaces: '), this._namespaces.map(_ => `\t${chalk.bold(_.name)} - ${_.shortDescription}`).join('\n'));
        if (help) res.push('', chalk.bold('Help:'), help);
        return res.join('\n');
    }
    
    async execute(parserResult: ParserResult, projectConfig: ProjectConfig, outputter: ICanOutputMessages) {
        if (!parserResult.firstArg) {
            if (!parserResult.help) outputter.warn('No command is given');
            outputter.print(this.helpDocs);
            return;
        }
        const isCommandGroup = this._commandGroups.map(_ => _.name).includes(parserResult.firstArg);
        const isBasicCommand = this._commands.map(_ => _.name).includes(parserResult.firstArg);
        const isFirstArgNamespace = this._namespaces.map(_ => _.name).includes(parserResult.firstArg);
        let command: CliCommand | undefined
        if (isBasicCommand) command = this._commands.find(_ => _.name === parserResult.firstArg);
        else if (isCommandGroup) command = this._commandGroups.find(_ => _.name === parserResult.firstArg);
        else if (isFirstArgNamespace) command = this._namespaces.find(_ => _.name === parserResult.firstArg);
        if (command === undefined) {
            outputter.warn(`No such command, command group or namespace '${parserResult.firstArg}'`);
            outputter.print();
            outputter.print(this.helpDocs);
            return;
        }
        parserResult.firstArg = parserResult.restArgs.shift() || '';

        try {
            let commandOptions = new Map<string, any>();
            Object.keys(parserResult.extraOpts).forEach(key => {
                commandOptions.set(key, parserResult.extraOpts[key]);
            });
            if (parserResult.help) commandOptions.set('help', 'true');
            await command.action(process.cwd(), getCoreLanguage(parserResult, projectConfig.store), [parserResult.firstArg, ...parserResult.restArgs], commandOptions, undefined, outputter, new BusyIndicator());
        } catch (error) {
            outputter.warn('Could not execute the command');
            if (error instanceof NotConnectedToInternet) {
                outputter.warn('No internet connection could be established');
                process.exit(1);
            }
            else if (error instanceof MissingCommandArgumentError) {
                outputter.warn('Missing required argument');
                process.exit(1);
            }
            else if (error instanceof ArgumentsNotMatchingDependencies) {
                outputter.warn('Command arguments not matching boilerplate dependencies');
                process.exit(1);
            }
            else if (error instanceof CoreLanguageNotFoundError) {
                outputter.warn('Could not get core language.')
                process.exit(1);
            }
        }
    }

    private createCliCommands() {
        let commands = this._commandManager.commands;
        let commandGroups = this._commandManager.commandGroups;
        let namespaces = this._commandManager.namespaces;

        this._commands.push(...commands.map(_ => CliCommand.fromCommand(_)));
        
        this._commandGroups.push(...commandGroups.map(commandGroup => {
            let commands = commandGroup.commands;
            let cliCommands = commands.map(_ => CliCommand.fromCommand(_, commandGroup.name));
            return CliCommandGroup.fromCommandGroup(commandGroup, cliCommands);
        }));

        this._namespaces.push(...namespaces.map(namespace => {

            let commands = this._commandManager.commands;
            let commandGroups = this._commandManager.commandGroups;

            let cliCommands = commands.map(_ => CliCommand.fromCommand(_, undefined, namespace.name));
            let cliCommandGroups = commandGroups.map(commandGroup => {
                let commands = commandGroup.commands;
                let cliCommands = commands.map(_ => CliCommand.fromCommand(_, commandGroup.name, namespace.name));
                return CliCommandGroup.fromCommandGroup(commandGroup, cliCommands, namespace.name);
            });

            return CliNamespace.fromNamespace(namespace, cliCommands, cliCommandGroups);
        }));

        // for (let i = 0; i < this._commandManager.commands.length; i++) {
        //     this._commandManager.commands[i] = CliCommand.fromCommand(this._commandManager.commands[i]);
        // }
        // for (let i = 0; i < this._commandManager.commandGroups.length; i++) {
        //     let commandGroup = this._commandManager.commandGroups[i];
        //     for (let j = 0; j < commandGroup.commands.length; j++) {
        //         let command = commandGroup.commands[j];
        //         this._commandManager.commandGroups[i].commands[j] = CliCommand.fromCommand(command, commandGroup.name);
        //     }
        // }
        // for (let i = 0; i < this._commandManager.namespaces.length; i++) {
        //     let namespace = this._commandManager.namespaces[i];
        //     for (let j = 0; j < namespace.commands.length; j++) {
        //         let command = namespace.commands[j];
        //         this._commandManager.namespaces[i].commands[j] = CliCommand.fromCommand(command, undefined, namespace.name);
        //     }
        //     for (let j = 0; j < namespace.commandGroups.length; j++) {
        //         let commandGroup = namespace.commandGroups[i];
        //         for (let k = 0; k < commandGroup.commands.length; k++) {
        //             let command = commandGroup.commands[k];
        //             this._commandManager.namespaces[i].commandGroups[j].commands[k] = CliCommand.fromCommand(command, commandGroup.name, namespace.name);
        //         }
        //     }
        // }
    }
}