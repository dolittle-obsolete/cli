/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
  * Represents a Bounded Context's backend configuration
  */
export class Backend
{
    /**
      * Instantiates an instance of Backend
      * @param {string} language 
      * @param {string} entryPoint 
      */
    constructor (language, entryPoint) {
        this._language = language;
        this._entryPoint = entryPoint;
    }
    /**
      * Gets the programming language
      * @returns {string} The string representing the programming language
      */
    get language() {
        return this._language;
    }
    /**
      * Gets the entry point
      * @returns {string} The entry point
      */
    get entryPoint() {
        return this._entryPoint;
    }
    
}