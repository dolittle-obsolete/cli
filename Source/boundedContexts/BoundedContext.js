/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/* eslint-disable no-unused-vars */
import { Backend } from './Backend';
import { InteractionLayer } from './InteractionLayer';
/* eslint-enable no-unused-vars */

/**
  * Represents a Bounded Context
  */
export class BoundedContext
{
    /**
      * Instantiates an instance of BoundedContext
      * @param {string} application 
      * @param {string} boundedContext 
      * @param {string} boundedContextName 
      * @param {Backend} backend 
      * @param {InteractionLayer[]} interaction 
      */
    constructor (application, boundedContext, boundedContextName, backend, interaction) {
        this._application = application;
        this._boundedContext = boundedContext;
        this._boundedContextName = boundedContextName;
        this._backend = backend;
        this._interaction = interaction;
    }
    /**
      * Gets the application GUID
      * @returns {string} The GUID of the Application
      */
    get application() {
        return this._application;
    }
    /**
      * Gets the bounded context GUID
      * @returns {string} The GUID of the bounded context
      */
    get boundedContext() {
        return this._boundedContext;
    }
    /**
      * Gets the name of the bounded context
      * @returns {string} Bounded Context name
      */
    get boundedContextName() {
        return this._boundedContextName;
    }
    /**
      * Gets the backend configuration 
      * @returns {Backend}
      */
    get backend() {
        return this._backend;
    }
    /**
      * Gets the list interaction layers
      * @returns {InteractionLayer[]}
      */
    get interaction() {
        return this._interaction;
    }
}