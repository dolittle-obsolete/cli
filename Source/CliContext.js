/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { Outputter } from "./Outputter";
import { BoilerplatesConfig, ProjectConfig } from '@dolittle/tooling.common';
import { Inquirer } from "./Inquirer";

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
     * @readonly
     * @memberof CliContext
     */
    get projectConfig() {
        return this.#_projectConfig;
    }
    /**
     * Gets the boilerplates configuration object
     * @readonly
     * @memberof CliContext
     */
    get boilerplatesConfig() {
        return this.#_boilerplatesConfig;
    }
    /**
     * Gets the managers
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
