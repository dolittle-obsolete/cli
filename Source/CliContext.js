import { Outputter } from "./Outputter";

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
    #projectConfigObj;
    #managers;
    #inquirer;

    /**
     * Creates an instance of {CliContext}.
     * @param {Outputter} outputter
     * @param {{[key: string]: any}} projectConfigObj
     * @param {} managers;
     * @param {Inquirer} inquirer
     * @memberof CliContext
     */
    constructor(outputter, projectConfigObj, managers, inquirer) {
        this.#outputter = outputter;
        this.#projectConfigObj = projectConfigObj;
        this.#managers = managers;
        this.#inquirer = inquirer;
    }

    get outputter() {
        return this.#outputter;
    }
    get projectConfigObj() {
        return this.#projectConfigObj;
    }
    get managers() {
        return this.#managers;
    }
    get inquirer() {
        return this.#inquirer;
    }
}
