/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ConfigParser } from './ConfigParser';
import { Config } from './Config';
import { Logger } from 'winston';
import fs from 'fs-extra';
import path from 'path';

/**
 * @type {WeakMap<ConfigManager, fs>}
 */
const _fileSystem = new WeakMap();
/**
 * @type {WeakMap<ConfigManager, ConfigParser>}
 */
const _configParser = new WeakMap();
/**
 * @type {WeakMap<ConfigManager, string>}
 */
const _centralFolderLocation = new WeakMap();
/**
 * @type {WeakMap<ConfigManager, boolean>}
 */
const _isFirstRun = new WeakMap();

const centralFolder = '~/.dolittle';
const configFile = "config.json";

/**
 * Expand the given filepaths possible reference to home folder
 * @param {*} filepath 
 */
function expandPath(filepath) {
    if (filepath[0] === '~') {
        return path.join(process.env.HOME||process.env.HOMEPATH, filepath.slice(1));
    }
    return filepath;
}

/**
 * Make sure the central folder exists
 * @param {fs} fileSystem 
 */
function makeSureCentralFolderExists(fileSystem) {
    if( !fileSystem.existsSync(this.centralFolderLocation)) {
        _isFirstRun.set(this, true);
        this._logger.info("Central Dolittle folder does not exist - creating it and setting up default configuration");
        try {
            fileSystem.ensureDirSync(this.centralFolderLocation);
        } catch(err)
        {
            try {
                let shell = require('shelljs');
                shell.mkdir('-p', this.centralFolderLocation);
    
            } catch(err)
            {
                this._logger.error('Could not create .dolittle folder at root: ', err);
                this._logger.info('Try creating this directory manually: ', this.centralFolderLocation);
                throw 'Could not create .dolittle directory'
            }
        }
        let config = new Config();
        fileSystem.writeFile(this.configFileLocation, JSON.stringify(config));
    } else {
        _isFirstRun.set(this, false);
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

    /**
     * Gets whether or not this is a first run of the CLI tool
     * @returns {boolean} True if it is, false if not
     */
    get isFirstRun() {
        return _isFirstRun.get(this);
    }
}