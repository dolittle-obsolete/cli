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

/**
 * The context needed by commands to perform their actions
 *
 * @export
 * @class CliContext
 */
export class CliContext {
    #_outputter;
    #_projectConfig;
    #_boilerplatesConfig;
    #_managers;
    #_inquirer;
    #_filesystem;

    /**
     * Creates an instance of {CliContext}.
     * @param {Outputter} outputter
     * @param {ProjectConfig} projectConfig
     * @param {BoilerplatesConfig} boilerplatesConfig
     * @param {} managers;
     * @param {Inquirer} inquirer
     * @param {import('fs')} filesystem
     * @memberof CliContext
     */
    constructor(outputter, projectConfig, boilerplatesConfig, managers, inquirer, filesystem) {
        this.#_outputter = outputter;
        this.#_projectConfig = projectConfig;
        this.#_boilerplatesConfig = boilerplatesConfig;
        this.#_managers = managers;
        this.#_inquirer = inquirer;
        this.#_filesystem = filesystem;
        
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
