/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Folders } from '../Folders';
import { Logger } from 'winston';
import { BoilerPlatesManager} from '../boilerPlates/BoilerPlatesManager';
import fs from 'fs';
import path from 'path';

const applicationFilename = "application.json";

const _boilerPlatesManager = new WeakMap();
const _folders = new WeakMap();
const _fileSystem = new WeakMap();


/**
 * Represents a manager for artifacts
 */
export class ArtifactsManager {
    /**
     * Initializes a new instance of {ApplicationManager}
     * @param {BoilerPlatesManager} boilerPlatesManager
     * @param {Folders} folders 
     * @param {fs} fileSystem
     * @param {Logger} logger
     */
    constructor(boilerPlatesManager, folders, fileSystem, logger) {
        _boilerPlatesManager.set(this, boilerPlatesManager);
        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        this._logger = logger;
    }

    /**
     * Create a command
     * @param {string} name 
     * @param {string} namespace 
     */
    createCommand(name, namespace) {
        this._logger.info(`Creating command with name '${name}' and namespace '${namespace}'`);

        let boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
        let context = {
            name: name,
            namespace: namespace
        };
        let destination = process.cwd();
        
        _boilerPlatesManager.get(this).createArtifactInstance('command', 'csharp', boilerPlate, destination, context);
    }
}