/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ConfigParser } from './ConfigParser';
import { Config } from './Config';
import { Logger } from 'winston';
import fs from 'fs';
import path from 'path';

const _fileSystem = new WeakMap();
const _configParser = new WeakMap();
const _centralFolderLocation = new WeakMap();

const centralFolder = '~/.dolittle';
const configFile = "config.json";

/**
 * Expand the given filepaths possible reference to home folder
 * @param {*} filepath 
 */
function expandPath(filepath) {
    if (filepath[0] === '~') {
        return path.join(process.env.HOME, filepath.slice(1));
    }
    return filepath;
}

/**
 * Make sure the central folder exists
 * @param {fs} fileSystem 
 */
function makeSureCentralFolderExists(fileSystem) {
    if( !fileSystem.existsSync(this.centralFolderLocation)) {
        this._logger.info("Central Dolittle folder does not exist - creating it and setting up default configuration");
        fileSystem.mkdir(this.centralFolderLocation);
        let config = new Config();
        fileSystem.writeFile(this.configFileLocation, JSON.stringify(config));
    }
};

/**
 * Represents a manager for dealing with configurations
 */
export class ConfigManager {

    /**
     * Initializes a new instance of {ConfigManager}
     * @param {fs} fileSystem
     * @param {ConfigParser} configParser
     * @param {Logger} logger
     */
    constructor(fileSystem, configParser, logger) {
        _fileSystem.set(this, fileSystem);
        _configParser.set(this, configParser);
        this._logger = logger;        
        
        _centralFolderLocation.set(this, expandPath(centralFolder));
        makeSureCentralFolderExists.call(this, fileSystem);
    }

    /**
     * Gets the central folder location
     * @returns {string} The path to the central folder
     */
    get centralFolderLocation() {
        return _centralFolderLocation.get(this);
    }

    /**
     * Gets the location of the config file
     * @returns {string} The path to the config file
     */
    get configFileLocation() {
        return path.join(this.centralFolderLocation, configFile);
    }
}