/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Command } from './Command';
import initCommand from './Init';
import { CommandGroup } from './Groups/CommandGroup';
import { Add } from './Groups/Add/Add';
import boilerplatesCommandGroup from './Groups/Boilerplates/Boilerplates';

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
            new Add([]),
            boilerplatesCommandGroup,
            new Create([])
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
}