/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from './Command';
import { CommandGroup } from './Groups/CommandGroup';
import { Add } from './Groups/Add/Add';
import { Create } from './Groups/Create/Create';
import { ParserResult } from '../ParserResult';
import { CliContext } from '../CliContext';
import boilerplatesCommandGroup from './Groups/Boilerplates/Boilerplates';
import initCommand from './Init';
import chalk from 'chalk';

const description = 
`The Dolittle CLI helps developers develop dolittle-based applications fast`;
const help = [
    '\tnamespace: ',
'\tcommand-group: ',
'\tbasic-command: ',
'\t--help: ',
'\t--version: ',
'\t--debug: ',
'\t--namespace: ',
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
    
    #boilerplatesManager;
    #applicationsManager;
    #boundedContextsManager;
    #artifactsManager;
    #dependenciesManager;

    constructor(boilerplatesManager, applicationsManager, boundedContextsManager, artifactsManager, dependenciesManager) {
        this.#boilerplatesManager = boilerplatesManager;
        this.applicationsManager = applicationsManager;
        this.boundedContextsManager = boundedContextsManager;
        this.artifactsManager = artifactsManager;
        this.dependenciesManager = dependenciesManager;

        this.commands.push(...[
            initCommand
        ]);
        this.commandGroups.push(...[
            new Add(this.#boilerplatesManager, this.#artifactsManager),
            boilerplatesCommandGroup,
            new Create(this.#boilerplatesManager, this.#applicationsManager, this.#boundedContextsManager)
        ]);
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
     * Startingpoint of command execution
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
        await command.action(parserResult, cliContext);
    }
}