/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { ProjectConfig } from "@dolittle/tooling.common.boilerplates";
import { ICanOutputMessages } from "@dolittle/tooling.common.utilities";
import { ParserResult } from "../ParserResult";
import { WrappedCommand } from "./WrappedCommand";
import { WrappedCommandGroup } from "./WrappedCommandGroup";
import { WrappedNamespace } from "./WrappedNamespace";


/**
 * Defines a system that knows about {WrappedCommand} commands
 */
export interface ICommands {
    
    /**
     * All the commands available
     *
     * @readonly
     */
    commands: WrappedCommand[]

    /**
     * All the command groups available
     *
     * @readonly
     */
    commandGroups: WrappedCommandGroup[]

    /**
     * All the namespaces available
     *
     * @readonly
     */
    namespaces: WrappedNamespace[]

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