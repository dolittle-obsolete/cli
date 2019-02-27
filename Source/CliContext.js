import { Outputter } from "./Outputter";
import { BoilerplatesConfig, ProjectConfig } from '@dolittle/tooling.common';
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/**
 * The context needed by commands to perform their actions
 *
 * @export
 * @class CliContext
 */
export class CliContext {
    #outputter;
    #projectConfig;
    #boilerplatesConfig;
    #managers;
    #inquirer;
    #filesystem;

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
        this.#outputter = outputter;
        this.#projectConfig = projectConfig;
        this.#boilerplatesConfig;
        this.#managers = managers;
        this.#inquirer = inquirer;
        this.#filesystem = filesystem;
    }

    get outputter() {
        return this.#outputter;
    }
    get projectConfig() {
        return this.#projectConfig;
    }
    get boilerplatesConfig() {
        return this.#boilerplatesConfig;
    }
    get managers() {
        return this.#managers;
    }
    get inquirer() {
        return this.#inquirer;
    }
    get filesystem() {
        return this.#filesystem;
    }
}
