/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

 /**
  * Represents an interaction layer
  */
 export class InteractionLayer
 {
     /**
      * Instantiates an instance of InteractionLater
      * @param {string} type 
      * @param {string} language 
      * @param {string} framework 
      * @param {string} entryPoint 
      */
     constructor (type, language, framework, entryPoint) {
         this._type = type;
         this._language = language;
         this._framework = framework;
         this._entryPoint = entryPoint;
     }
     /**
      * Gets the type of the interaction layer
      * @returns {string} the type
      */
     get type() {
         return this._type;
     }
     /**
      * Gets the programming language string
      * @returns {string} programming language
      */
     get language() {
         return this._language;
     }
     /**
      * Gets the framework
      * @returns {string} framework
      */
     get framework() {
         return this._framework;
     }
     /**
      * Gets the entry point
      * @returns {string} the entrypoint of the interaction layer
      */
     get entryPoint() {
         return this._entryPoint;
     }
 }