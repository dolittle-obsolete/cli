/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ProjectConfig } from "@dolittle/tooling.common.boilerplates";
import { ICanOutputMessages } from "@dolittle/tooling.common.utilities";
import { ParserResult } from "../ParserResult";
import { CliCommand } from "./CliCommand";
import { CliCommandGroup } from "./CliCommandGroup";
import { CliNamespace } from "./CliNamespace";


/**
 * Represents a manager for commands
 */
export interface ICliCommandManager {
    
    /**
     * All the commands available
     *
     * @readonly
     */
    commands: CliCommand[]

    /**
     * All the command groups available
     *
     * @readonly
     */
    commandGroups: CliCommandGroup[]

    /**
     * All the namespaces available
     *
     * @readonly
     */
    namespaces: CliNamespace[]

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