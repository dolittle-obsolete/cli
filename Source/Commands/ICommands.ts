/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ProjectConfig } from "@dolittle/tooling.common.boilerplates";
import { ICanOutputMessages } from "@dolittle/tooling.common.utilities";
import { ParserResult } from "../ParserResult";
import { Command } from "./Command";
import { CommandGroup } from "./CommandGroup";
import { Namespace } from "./Namespace";


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
    helpDocs: string;

    /**
     * Starting point of command execution
     *
     */
    execute(parserResult: ParserResult, projectConfig: ProjectConfig, outputter: ICanOutputMessages): Promise<void>
}