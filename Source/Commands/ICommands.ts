/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ProjectConfig } from "@dolittle/tooling.common.boilerplates";
import { ICanOutputMessages } from "@dolittle/tooling.common.utilities";
import { ParserResult, Command, CommandGroup, Namespace } from "../index";


/**
 * Defines a system that knows about {Command} commands
 */
export interface ICommands {
    
    /**
     * All the commands available
     *
     * @readonly
     */
    commands: Command[]

    /**
     * All the command groups available
     *
     * @readonly
     */
    commandGroups: CommandGroup[]

    /**
     * All the namespaces available
     *
     * @readonly
     */
    namespaces: Namespace[]

    /**
     * The help message
     *
     * @readonly
     */
    helpDocs: string

    /**
     * Whether the commands system has been initialized
     *
     * @type {boolean}
     */
    readonly isInitialized: boolean
    
    /**
     * Initializes the commands system
     *
     * @returns {Promise<void>}
     */
    initialize(): Promise<void>
    /**
     * Starting point of command execution
     *
     */
    execute(parserResult: ParserResult, projectConfig: ProjectConfig, outputter: ICanOutputMessages): Promise<void>
}