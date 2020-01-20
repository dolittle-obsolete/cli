/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
import { ProjectConfigObject } from '@dolittle/tooling.common';
import { ICommandManager } from '@dolittle/tooling.common.commands';
import { IDependencyResolvers } from '@dolittle/tooling.common.dependencies';
import { ICanFindLatestVersionOfPackage, ICanDownloadPackages, IConnectionChecker, ILatestCompatiblePackageFinder } from '@dolittle/tooling.common.packages';
import { ICanOutputMessages, IBusyIndicator } from '@dolittle/tooling.common.utilities';
import chalk from 'chalk';
import { ParserResult, getCoreLanguage, ICommands, Namespace, CommandGroup, Command, Check } from '../internal';

const description = `${chalk.bold('Welcome to the Dolittle CLI!')}

Checkout the available commands and command groups to see what the CLI tool can do.
For further information and help on each command and command group add '-h' or '--help' to the command.
`;
const help = [
'\tnamespace: A group of related commands and command groups',
'\tcommand-group: A group of related commands.',
'\tbasic-command: Basic / global commands not related to any of the command groups',
'\t--help: Displays usage, help and description of a command or command group',
'\t--version: Displays the version of the CLI tool',
'\t--coreLang: Sets the core language for a command',
].join('\n');

/**
 * Represents an implementation of {ICommands}
 */
export class Commands implements ICommands {

    private _namespaces: Namespace[] = [];
    private _commandGroups: CommandGroup[] = [];
    private _commands: Command[];

    private _isInitialized = false;

    constructor(private _commandManager: ICommandManager, private _dependencyResolvers: IDependencyResolvers,
                private _outputter: ICanOutputMessages, private _busyIndicator: IBusyIndicator,
                private _latestPackageVersionFinder: ICanFindLatestVersionOfPackage, private _latestCompatiblePackageFinder: ILatestCompatiblePackageFinder,
                private _packageDownloader: ICanDownloadPackages, private _connectionChecker: IConnectionChecker, private _toolingPackage: any)
    {
        this._commands = [
            new Check(this._latestPackageVersionFinder, this._latestCompatiblePackageFinder, this._packageDownloader, this._connectionChecker, this._toolingPackage)
        ];
    }

    get commands() {
        return this._commands;
    }
    get commandGroups() {
        return this._commandGroups;
    }
    get namespaces() {
        return this._namespaces;
    }

    get isInitialized() {
        return this._isInitialized;
    }

    get helpDocs() {
        const res = [
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

    async initialize() {
        this._isInitialized = true;
        await this.createCommands();
    }

    async execute(parserResult: ParserResult, projectConfigObject: ProjectConfigObject) {
        if (!this.isInitialized) {
            this._outputter.warn('Commands not initialized');
            return;
        }
        if (!parserResult.firstArg) {
            if (!parserResult.help) this._outputter.warn('No command is given');
            this._outputter.print(this.helpDocs);
            return;
        }
        const isCommandGroup = this._commandGroups.map(_ => _.name).includes(parserResult.firstArg);
        const isBasicCommand = this._commands.map(_ => _.name).includes(parserResult.firstArg);
        const isFirstArgNamespace = this._namespaces.map(_ => _.name).includes(parserResult.firstArg);
        let command: Command | undefined;
        if (isBasicCommand) command = this._commands.find(_ => _.name === parserResult.firstArg);
        else if (isCommandGroup) command = this._commandGroups.find(_ => _.name === parserResult.firstArg);
        else if (isFirstArgNamespace) command = this._namespaces.find(_ => _.name === parserResult.firstArg);
        if (command === undefined) {
            this._outputter.warn(`No such command, command group or namespace '${parserResult.firstArg}'`);
            this._outputter.print();
            this._outputter.print(this.helpDocs);
            return;
        }
        parserResult.firstArg = parserResult.restArgs.shift();

        const cwd = process.cwd();
        const coreLanguage = getCoreLanguage(parserResult, projectConfigObject);

        await command.trigger(parserResult, {coreLanguage, currentWorkingDirectory: cwd}, this._dependencyResolvers, this._outputter, this._busyIndicator);
    }

    private async createCommands() {
        const commands = this._commandManager.commands;
        const commandGroups = this._commandManager.commandGroups;
        const namespaces = this._commandManager.namespaces;

        this._commands.push(...commands.map(_ => Command.fromCommand(_)));

        const populateCommandGroups = Promise.all(commandGroups.map( async commandGroup => {
            const baseCommands = await commandGroup.getCommands();
            const commands = baseCommands.map(_ => Command.fromCommand(_, commandGroup.name));
            this._commandGroups.push(await CommandGroup.fromCommandGroup(commandGroup, commands));
        }));

        const populateNamespaces = Promise.all(namespaces.map(async namespace => {

            const baseCommands = namespace.commands;
            const baseCommandGroups = namespace.commandGroups;

            const commands = baseCommands.map(_ => Command.fromCommand(_, undefined, namespace.name));
            const commandGroups = await Promise.all(baseCommandGroups.map(async commandGroup => {
                const baseCommands = await commandGroup.getCommands();
                const commands = baseCommands.map(_ => Command.fromCommand(_, commandGroup.name, namespace.name));
                return CommandGroup.fromCommandGroup(commandGroup, commands, namespace.name);
            }));

            this._namespaces.push(Namespace.fromNamespace(namespace, commands, commandGroups));
        }));

        await Promise.all([populateCommandGroups, populateNamespaces]);
    }
}
