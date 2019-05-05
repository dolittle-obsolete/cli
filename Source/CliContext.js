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
import { Folders } from "@dolittle/tooling.common/dist/Folders";

/**
 * The context needed by commands to perform their actions
 *
 * @export
 * @class CliContext
 */
export class CliContext {
    #_cwd;
    #_outputter;
    #_dolittleConfig;
    #_projectConfig;
    #_boilerplatesConfig;
    #_managers;
    #_inquirer;
    #_filesystem;
    #_folders;
    
    /**
     * The namespace of the CLI Context
     *
     * @memberof CliContext
     */
    namespace;

    /**
     * Creates an instance of {CliContext}.
     * @param {string} cwd
     * @param {Outputter} outputter
     * @param {any} dolittleConfig
     * @param {ProjectConfig} projectConfig
     * @param {BoilerplatesConfig} boilerplatesConfig
     * @param {} managers;
     * @param {Inquirer} inquirer
     * @param {import('fs')} filesystem
     * @param {Folders} folders
     * @memberof CliContext
     */
    constructor(cwd, outputter, dolittleConfig, projectConfig, boilerplatesConfig, managers, inquirer, filesystem, folders) {
        this.#_cwd = cwd;
        this.#_outputter = outputter;
        this.#_dolittleConfig = dolittleConfig;
        this.#_projectConfig = projectConfig;
        this.#_boilerplatesConfig = boilerplatesConfig;
        this.#_managers = managers;
        this.#_inquirer = inquirer;
        this.#_filesystem = filesystem;
        this.#_folders = folders;
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
     * Gets the dolittle config
     *
     * @readonly
     * @memberof CliContext
     */
    get dolittleConfig() {
        return this.#_dolittleConfig;
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
    /**
     * Gets the folders object
     * @type {Folders}
     * @readonly
     * @memberof CliContext
     */
    get folders() {
        return this.#_folders;
    }
}
