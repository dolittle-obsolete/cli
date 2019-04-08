/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Outputter } from "./Outputter";
import { Inquirer } from "./Inquirer";
import { BoilerplatesConfig } from "@dolittle/tooling.common/dist/configuration/BoilerplatesConfig";
import { ProjectConfig } from "@dolittle/tooling.common/dist/configuration/ProjectConfig";
import { CommandManager } from "./Commands/CommandManager";
import { BoilerplatesManager } from "@dolittle/tooling.common/dist/boilerplates/BoilerplatesManager";
import { BoundedContextsManager } from "@dolittle/tooling.common/dist/boundedContexts/BoundedContextsManager";
import { ApplicationsManager } from "@dolittle/tooling.common/dist/applications/ApplicationsManager";
import { ArtifactsManager } from "@dolittle/tooling.common/dist/artifacts/ArtifactsManager";
import { DependenciesManager } from "@dolittle/tooling.common/dist/dependencies/DependenciesManager";
import { CommandsConfig } from "./Configurations/CommandsConfig";

/**
 * The context needed by commands to perform their actions
 *
 * @export
 * @class CliContext
 */
export class CliContext {
    #_cwd;
    #_outputter;
    #_projectConfig;
    #_boilerplatesConfig;
    #_commandsConfig;
    #_managers;
    #_inquirer;
    #_filesystem;

    /**
     * Creates an instance of {CliContext}.
     * @param {string} cwd
     * @param {Outputter} outputter
     * @param {ProjectConfig} projectConfig
     * @param {BoilerplatesConfig} boilerplatesConfig
     * @param {CommandsConfig} commandsConfig
     * @param {} managers;
     * @param {Inquirer} inquirer
     * @param {import('fs')} filesystem
     * @memberof CliContext
     */
    constructor(cwd, outputter, projectConfig, boilerplatesConfig, commandsConfig, managers, inquirer, filesystem) {
        this.#_cwd = cwd;
        this.#_outputter = outputter;
        this.#_projectConfig = projectConfig;
        this.#_boilerplatesConfig = boilerplatesConfig;
        this.#_commandsConfig = commandsConfig;
        this.#_managers = managers;
        this.#_inquirer = inquirer;
        this.#_filesystem = filesystem;
        
    }
    /**
     * Gets the current working directory
     * @type {string}
     * @readonly
     * @memberof CliContext
     */
    get cwd() {
        return this.#_cwd;
    }
    /**
     * Gets the CLI outputter
     * @type {Outputter}
     * @readonly
     * @memberof CliContext
     */
    get outputter() {
        return this.#_outputter;
    }
    /**
     * Gets the project configuration object
     * @type {ProjectConfig}
     * @readonly
     * @memberof CliContext
     */
    get projectConfig() {
        return this.#_projectConfig;
    }
    /**
     * Gets the boilerplates configuration object
     * @type {BoilerplatesConfig}
     * @readonly
     * @memberof CliContext
     */
    get boilerplatesConfig() {
        return this.#_boilerplatesConfig;
    }
    /**
     * Gets the commands configuration object
     * @type {CommandsConfig}
     * @readonly
     * @memberof CliContext
     */
    get commandsConfig() {
        return this.#_commandsConfig;
    }
    /**
     * Gets the managers
     * @type {{boilerplatesManager: BoilerplatesManager, applicationsManager: ApplicationsManager, boundedContextsManager: BoundedContextsManager, artifactsManager: ArtifactsManager, dependenciesManager: DependenciesManager, commandManager: CommandManager }}
     * @readonly
     * @memberof CliContext
     */
    get managers() {
        return this.#_managers;
    }
    /**
     * Gets the inquirer system
     * @type {Inquirer}
     * @readonly
     * @memberof CliContext
     */
    get inquirer() {
        return this.#_inquirer;
    }
    /**
     * Gets the filesystem
     * @type {import('fs')}
     * @readonly
     * @memberof CliContext
     */
    get filesystem() {
        return this.#_filesystem;
    }
}
