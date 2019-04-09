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
import boilerplatesCommandGroup from './Groups/Boilerplates/Boilerplates';
import createCommandGroup from './Groups/Create/Create';
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
            initCommand
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
        await command.action(parserResult, cliContext);
    }
}