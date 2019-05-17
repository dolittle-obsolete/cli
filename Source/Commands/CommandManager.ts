/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { IApplicationsManager, IArtifactTemplatesManager, IBoilerplateManagers, IBoundedContextsManager } from '@dolittle/tooling.common.boilerplates';
import { ArgumentsNotMatchingDependenciesError, IDependenciesManager } from '@dolittle/tooling.common.dependencies';
import { NotConnectedError } from '@dolittle/tooling.common.utilities';
import chalk from 'chalk';
import { CliContext } from '../CliContext';
import { ParserResult } from '../ParserResult';
import { CoreLanguageNotFoundError } from '../Util/getCoreLanguage';
import { MissingCommandArgumentError } from '../Util/requireArguments'
import { Command } from './Command';
import { Add } from './Groups/Add/Add';
import { MissingBoundedContextError } from './Groups/Add/MissingBoundedContextError';
import boilerplatesCommandGroup from './Groups/Boilerplates/Boilerplates';
import { CommandGroup } from './Groups/CommandGroup';
import { ApplicationConfigurationNotFoundError } from './Groups/Create/BoundedContext';
import createCommandGroup from './Groups/Create/Create';
import { ICommandManager } from './ICommandManager';
import { Init } from './Init';
import { Check } from './Check';

const description = 
`${chalk.bold('Welcome to the Dolittle CLI!')}

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
export class CommandManager implements ICommandManager {
    
    private _isInitialized = false;
    private _namespaces: string[]
    private _commands: Command[]
    private _commandGroups: CommandGroup[];
    
    constructor(
        private _applicationsManager: IApplicationsManager, private _boundedContextsManager: IBoundedContextsManager, 
        private _artifactTemplatesManager: IArtifactTemplatesManager, private _dependenciesManager: IDependenciesManager, 
        private _boilerplateManagers: IBoilerplateManagers 
    ) {
        this._commands = [];
        this._commandGroups = [];
        this._namespaces = [];
        
    }
    /**
     * Gets all the commands available to the CLI
     *
     * @readonly
     * @memberof CommandManager
     */
    get allCommands() {
        this.initialize();
        let commands = this._commands;
        this._commandGroups.forEach(_ => commands.push(..._.commands));
        return commands;
    }
    /**
     * Gets the help message giving an overview of the CLI tool
     *
     * @readonly
     * @memberof CommandManager
     */
    get helpDocs() {
        this.initialize();
        let res = [
            chalk.bold('Usage:'),
            '\tdolittle [<namespace>] <command-group | basic-command> [<command>] [<args>] [-h | --help] [-v | --version] [-d | --debug] [--coreLang] [-n | --namespace]'
        ];
        if (description) res.push('', description);
        if (this._commands.length > 0) res.push('', chalk.bold('Basic commands:'), this._commands.map(cmd => `\t${chalk.bold(cmd.name)} - ${cmd.shortDescription}`).join('\n'));
        if (this._commandGroups.length > 0) res.push('', chalk.bold('Command groups:'), this._commandGroups.map(cmd => `\t${chalk.bold(cmd.name)} - ${cmd.shortDescription}`).join('\n'));
        if (this._namespaces.length > 0) res.push('', chalk.bold('Namespaces: '), this._namespaces.map(namespace => `\t${namespace}`).join('\n'));
        if (help) res.push('', chalk.bold('Help:'), help);
        return res.join('\n');
    }
    /**
     * Starting point of command execution
     *
     * @param {ParserResult} parserResult
     * @param {CliContext} cliContext
     * @memberof CommandManager
     */
    async execute(parserResult: ParserResult, cliContext: CliContext) {
        this.initialize();
        if (!parserResult.firstArg) {
            if (!parserResult.help) cliContext.outputter.warn('No command is given');
            cliContext.outputter.print(this.helpDocs);
            return;
        }
        const isCommandGroup = this._commandGroups.map(_ => _.name).includes(parserResult.firstArg);
        const isBasicCommand = this._commands.map(_ => _.name).includes(parserResult.firstArg);
        const isFirstArgNamespace = this._namespaces.includes(parserResult.firstArg);
        let command: Command | CommandGroup | undefined
        if (isBasicCommand) command = this._commands.find(_ => _.name === parserResult.firstArg);
        else if (isCommandGroup) command = this._commandGroups.find(_ => _.name === parserResult.firstArg);
        else if (isFirstArgNamespace) {
            cliContext.namespace = parserResult.firstArg;
            parserResult.firstArg = parserResult.restArgs.shift() || '';
            await this.execute(parserResult, cliContext);
            return;
        }
        if (command === undefined) {
            cliContext.outputter.warn(`No such command, command group or namespace '${parserResult.firstArg}'`);
            cliContext.outputter.print();
            cliContext.outputter.print(this.helpDocs);
            return;
        }
        parserResult.firstArg = parserResult.restArgs.shift() || '';

        try {
            await command.action(parserResult, cliContext);
        } catch (error) {
            cliContext.outputter.warn('Could not execute the command');
            if (error instanceof NotConnectedError) {
                cliContext.outputter.warn('No internet connection could be established');
                process.exit(1);
            }
            else if (error instanceof MissingCommandArgumentError) {
                cliContext.outputter.warn('Missing required argument');
                process.exit(1);
            }
            else if (error instanceof ArgumentsNotMatchingDependenciesError) {
                cliContext.outputter.warn('Command arguments not matching boilerplate dependencies');
                process.exit(1);
            }
            else if (error instanceof MissingBoundedContextError) {
                cliContext.outputter.warn('Excpected to find a bounded context');
                process.exit(1);
            }
            else if (error instanceof CoreLanguageNotFoundError) {
                cliContext.outputter.warn('Could not get core language.')
                process.exit(1);
            }
            else if (error instanceof ApplicationConfigurationNotFoundError) {
                process.exit(1);
            }
            else throw error;
        }
    }

    private initialize() {
        if (!this._isInitialized) {
            this._isInitialized = true;
            this._commands.push(...[
                new Init(),
                new Check()
            ]);
            
            let addCommandGroup = new Add(this._artifactTemplatesManager);
            addCommandGroup.loadCommands();
    
            this._commandGroups.push(...[
                addCommandGroup,
                boilerplatesCommandGroup,
                createCommandGroup
            ]);
            this._namespaces = [...new Set(this._boilerplateManagers.boilerplates.filter(_ => _.namespace).map(_ => _.namespace))];

        }
    }
}