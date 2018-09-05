/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const _language = new WeakMap();
const _name = new WeakMap();
const _description = new WeakMap();
const _type = new WeakMap();
const _location = new WeakMap();

/**
 * Represents a boiler plate
 */
export class BoilerPlate {

    /**
     * Initializes a new instance of {BoilerPlate}
     * @param {string} programming language 
     * @param {string} name 
     * @param {string} description 
     * @param {string} type
     * @param {string} location 
     */
    constructor(language, name, description, type, location) {
        _language.set(this, language);
        _name.set(this, name);
        _description.set(this, description);
        _type.set(this, type);
        _location.set(this, location);
    }

    /**
     * Get the name of the {BoilerPlate}
     * @returns {string} Name of {BoilerPlate}
     */
    get name() { return _name.get(this); }

    /**
     * Get the language of the {BoilerPlate}
     * @returns {string} Language of the {BoilerPlate}
     */
    get language() { return _language.get(this); }

    /**
     * Get the description of the {BoilerPlate}
     * @returns {string} Description of the {BoilerPlate}
     */
    get description() { return _description.get(this); }

    /**
     * Get the type of {BoilerPlate}
     * @returns {string} Type of {BoilerPlate}
     */
    get type() { return _type.get(this); }

    /**
     * Get the location of the {BoilerPlate}
     * @returns {string} Location of {BoilerPlate}
     */
    get location() { return _location.get(this); }

    /**
     * Convert to a JSON object
     * @returns {*} Object literal
     */
    toJson() {
        return {
            name: this.name,
            language: this.language,
            description: this.description,
            type: this.type,
            location: this.location
        }
    }
}