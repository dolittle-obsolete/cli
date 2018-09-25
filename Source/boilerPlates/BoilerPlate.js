/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const _language = new WeakMap();
const _name = new WeakMap();
const _description = new WeakMap();
const _type = new WeakMap();
const _dependencies = new WeakMap();
const _location = new WeakMap();
const _pathsNeedingBinding = new WeakMap();
const _filesNeedingBinding = new WeakMap();

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
     * @param {any[]} dependencies
     * @param {string} location 
     * @param {string[]} [pathsNeedingBinding]
     * @param {string[]} [filesNeedingBinding]
     */
    constructor(language, name, description, type, dependencies, location, pathsNeedingBinding, filesNeedingBinding) {
        _language.set(this, language);
        _name.set(this, name);
        _description.set(this, description);
        _type.set(this, type);
        _dependencies.set(this, dependencies);
        _location.set(this, location);
        _pathsNeedingBinding.set(this, pathsNeedingBinding || []);
        _filesNeedingBinding.set(this, filesNeedingBinding || []);
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
     * Gets all the dependencies of the boilerplate
     * @returns {any[]} List of dependencies
     */
    get dependencies() { return _dependencies.get(this); }
    /**
     * Get the location of the {BoilerPlate}
     * @returns {string} Location of {BoilerPlate}
     */
    get location() { return _location.get(this); }

    /**
     * Get the paths that need binding - relative within the content of the location of the {BoilerPlate}
     * @returns {string[]} Paths
     */
    get pathsNeedingBinding() { return _pathsNeedingBinding.get(this); }

    /**
     * Gets the files that need binding - relative within the content of the location of the {BoilerPlate}
     * @returns {string[]} Files
     */
    get filesNeedingBinding() { return _filesNeedingBinding.get(this); }

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
            dependencies: this.dependencies,
            location: this.location,
            pathsNeedingBinding: this.pathsNeedingBinding,
            filesNeedingBinding: this.filesNeedingBinding
        }
    }
}