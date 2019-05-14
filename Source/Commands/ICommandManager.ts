import { Command } from "./Command";
import { ParserResult } from "Source/ParserResult";
import { CliContext } from "Source/CliContext";

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * Represents a manager for commands
 */
export interface ICommandManager {
    
    /**
     * All the commands available
     *
     * @readonly
     * @memberof CommandManager
     */
    allCommands: Command[]
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
     * @param {CliContext} cliContext
     * @memberof CommandManager
     */
    execute(parserResult: ParserResult, cliContext: CliContext): Promise<void>
}