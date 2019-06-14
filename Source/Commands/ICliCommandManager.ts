/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ProjectConfig } from "@dolittle/tooling.common.boilerplates";
import { ICanOutputMessages } from "@dolittle/tooling.common.utilities";
import { ParserResult } from "../ParserResult";
import { CliCommand } from "./CliCommand";


/**
 * Represents a manager for commands
 */
export interface ICliCommandManager {
    
    /**
     * All the commands available
     *
     * @readonly
     * @memberof CommandManager
     */
    allCommands: CliCommand[]
    /**
     * The help message
     *
     * @readonly
     * @memberof CommandManager
     */
    helpDocs: string;
    /**
     * Starting point of command execution
     *
     * @param {ParserResult} parserResult
     * @memberof CommandManager
     */
    execute(parserResult: ParserResult, projectConfig: ProjectConfig, outputter: ICanOutputMessages): Promise<void>
}