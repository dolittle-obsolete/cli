/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
  * Represents an artifact template
  */
export class ArtifactTemplate
{
    constructor (name, type, description, language, dependencies, includedFiles, location) {
        this._name = name;
        this._type = type;
        this._description = description;
        this._language = language;
        this._dependencies = dependencies;
        this._includedFiles = includedFiles;
        this._location = location;
    }
    /**
     * Gets the name of the artifact template
     */
    get name() {
        return this._name;
    }
    /**
     * Gets the type of the artifact template
     */
    get type() {
        return this._type;
    }
    /**
     * Gets the description of the artifact template
     */
    get description() {
        return this._description;
    }
    /**
     * Gets the programming language of the artifact this is a template for
     */
    get language() {
        return this._language;
    }
    /**
     * Gets the dependencies of the template
     */
    get dependencies() {
        return this._dependencies;
    }
    /**
     * Gets the list of files that needs to be templated
     */
    get includedFiles() {
        return this._includedFiles;
    }
    /**
     * Gets the file location of the
     */
    get location() {
        return this._location;
    }
}