/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BoilerPlatesManager } from '../boilerPlates/BoilerPlatesManager';
import path from 'path';

const _boilerPlatesManager = new WeakMap();
const _folders = new WeakMap();


/**
 * Represents the manager for bounded contexts
 */
export class BoundedContextManager {

    /**
     * Initializes a new instance of {BoundedContextManager}
     * @param {BoilerPlatesManager} boilerPlatesManager 
     * @param {Folders} folders
     */
    constructor(boilerPlatesManager, folders) {
        _boilerPlatesManager.set(this, boilerPlatesManager);
        _folders.set(this, folders);
    }

    /**
     * 
     * @param {*} name 
     */
    create(name) {
        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByLanguageAndType("csharp", "boundedContext")[0];
        let destination = path.join(process.cwd(),name);
        _folders.get(this).makeFolderIfNotExists(destination);
        let context = {
            name: name
        };
        _boilerPlatesManager.get(this).createInstance(boilerPlate, destination, context);
    }
}