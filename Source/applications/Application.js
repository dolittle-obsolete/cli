/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const _id = new WeakMap();
const _name = new WeakMap();

/**
 * Represents the definition of an application
 */
export class Application {

    /**
     * Initializes a new instance of {Application}
     * @param {string} id Unique identifier for application
     * @param {string} name Name of application
     */
    constructor(id, name) {
        _id.set(this, id);
        _name.set(this, name);
    }

    /**
     * Gets the unique identifier for the application
     * @returns {string} Global unique identifier
     */
    get id() {
        return _id.get(this);
    }

    /**
     * Gets the name of the application
     * @returns {string} Name of the application
     */
    get name() {
        return _name.get(this);
    }
}