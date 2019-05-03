/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from './Command';
import { CommandGroup } from './Groups/CommandGroup';
import { Add } from './Groups/Add/Add';
import { ParserResult } from '../ParserResult';
import { CliContext } from '../CliContext';
import { BoilerplatesManager } from '@dolittle/tooling.common/dist/boilerplates/BoilerplatesManager';
import { ApplicationsManager } from '@dolittle/tooling.common/dist/applications/ApplicationsManager';
import { BoundedContextsManager } from '@dolittle/tooling.common/dist/boundedContexts/BoundedContextsManager';
import { ArtifactsManager } from '@dolittle/tooling.common/dist/artifacts/ArtifactsManager';
import { DependenciesManager } from '@dolittle/tooling.common/dist/dependencies/DependenciesManager';
import { NotConnectedError } from '../Util/requireInternet';
import { MissingCommandArgumentError } from '../Util/requireArguments';
import { ArgumentsNotMatchingDependenciesError } from '../Util/resolveArgumentDependencies';
import { MissingBoundedContextError } from './Groups/Add/MissingBoundedContextError';
import boilerplatesCommandGroup from './Groups/Boilerplates/Boilerplates';
import createCommandGroup from './Groups/Create/Create';
import initCommand from './Init';
import checkCommand from './Check';
import chalk from 'chalk';

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
'\t--namespace: <To be implemented>',
].join('\n');

/**
 * Represents a manager for commands
 */
export class CommandManager {
    /**
     * The commands
     * @type {Command[]}
     * @memberof CommandManager
     */
    commands = [];
    /**
     * The command groups
     * @type {CommandGroup[]}
     * @memberof CommandManager
     */
    commandGroups = []
    
    #_boilerplatesManager;
    #_applicationsManager;
    #_boundedContextsManager;
    #_artifactsManager;
    #_dependenciesManager;
    /**
     *Creates an instance of {CommandManager}.
     * @param {BoilerplatesManager} boilerplatesManager
     * @param {ApplicationsManager} applicationsManager
     * @param {BoundedContextsManager} boundedContextsManager
     * @param {ArtifactsManager} artifactsManager
     * @param {DependenciesManager} dependenciesManager
     * @memberof CommandManager
     */
    constructor(boilerplatesManager, applicationsManager, boundedContextsManager, artifactsManager, dependenciesManager) {
        this.#_boilerplatesManager = boilerplatesManager;
        this.#_applicationsManager = applicationsManager;
        this.#_boundedContextsManager = boundedContextsManager;
        this.#_artifactsManager = artifactsManager;
        this.#_dependenciesManager = dependenciesManager;

        this.commands.push(...[
            initCommand,
            checkCommand
        ]);
        
        let addCommandGroup = new Add(this.boilerplatesManager, this.artifactsManager);
        addCommandGroup.loadCommands();

        this.commandGroups.push(...[
            addCommandGroup,
            boilerplatesCommandGroup,
            createCommandGroup
        ]);
    }
    /**
     *
     * @type {BoilerplatesManager}
     * @readonly
     * @memberof CommandManager
     */
    get boilerplatesManager() {
        return this.#_boilerplatesManager;
    }
    /**
     *
     * @type {ApplicationsManager}
     * @readonly
     * @memberof CommandManager
     */
    get applicationsManager() {
        return this.#_applicationsManager;
    }
    /**
     *
     * @type {BoundedContextsManager}
     * @readonly
     * @memberof CommandManager
     */
    get boundedContextsManager() {
        return this.#_boundedContextsManager;
    }
    /**
     *
     * @type {ArtifactsManager}
     * @readonly
     * @memberof CommandManager
     */
    get artifactsManager() {
        return this.#_artifactsManager;
    }

    /**
     *
     * @type {DependenciesManager}
     * @readonly
     * @memberof CommandManager
     */
    get dependenciesManager() {
        return this.#_dependenciesManager;
    }
    /**
     * Gets all the commands available to the CLI
     *
     * @readonly
     * @memberof CommandManager
     */
    get allCommands() {
        let commands = this.commands;
        this.commandGroups.forEach(_ => commands.push(..._.commands));
        return commands;
    }
    /**
     * Gets the help message giving an overview of the CLI tool
     *
     * @readonly
     * @memberof CommandManager
     */
    get helpDocs() {
        let res = [
            chalk.bold('Usage:'),
            '\tdolittle [<namespace>] <command-group | basic-command> [<command>] [<args>] [-h | --help] [-v | --version] [-d | --debug] [-n | --namespace]'
        ];
        if (description) res.push('', description);
        if (this.commands.length > 0) res.push('', chalk.bold('Basic commands:'), this.commands.map(cmd => `\t${chalk.bold(cmd.name)} - ${cmd.shortDescription}`).join('\n'));
        if (this.commandGroups.length > 0) res.push('', chalk.bold('Command groups:'), this.commandGroups.map(cmd => `\t${chalk.bold(cmd.name)} - ${cmd.shortDescription}`).join('\n'));
        //TODO: List namespaces
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
    async execute(parserResult, cliContext) {
        if (!parserResult.firstArg) {
            cliContext.outputter.print(this.helpDocs);
            return;
        }
        let isCommandGroup = this.commandGroups.map(_ => _.name).includes(parserResult.firstArg);
        let isBasicCommand = this.commands.map(_ => _.name).includes(parserResult.firstArg);
        let command = null;
        if (isBasicCommand) command = this.commands.find(_ => _.name === parserResult.firstArg);
        else if (isCommandGroup) command = this.commandGroups.find(_ => _.name === parserResult.firstArg);
        else {
            cliContext.outputter.warn(`No such command or command group '${parserResult.firstArg}'`);
            cliContext.outputter.print();
            cliContext.outputter.print(this.helpDocs);
            return;
        }
        parserResult.firstArg = parserResult.restArgs.shift();

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
            else throw error;
        }
    }
}