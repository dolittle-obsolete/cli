/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import fs from 'fs';
import winston from 'winston';
import simpleGit from 'simple-git';
import { Git } from 'simple-git';
import { ConfigManager } from './configuration/ConfigManager';
import { ConfigParser } from './configuration/ConfigParser';
import { ApplicationManager } from './applications/ApplicationManager';
import { BoundedContextManager } from './boundedContexts/BoundedContextManager';
import { BoilerPlatesManager } from './boilerPlates/BoilerPlatesManager';
import { HttpWrapper } from './HttpWrapper';
import { Folders } from './Folders';
import { ArtifactsManager } from './artifacts/ArtifactsManager';

const _configManager = new WeakMap();
const _configParser = new WeakMap();
const _applicationManager = new WeakMap();
const _artifactsManager = new WeakMap();
const _boundedContextManager = new WeakMap();
const _boilerPlatesManager = new WeakMap();
const _folders = new WeakMap();
const _git = new WeakMap();
const _logger = new WeakMap();
const _httpWrapper = new WeakMap();

/**
 * Common global object
 */
class global {

    /**
     * Perform initialization
     */
    constructor() {
        _logger.set(this, winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
            transports: [
                new winston.transports.Console()
            ]
        }));

        _httpWrapper.set(this, new HttpWrapper());
        
        _configParser.set(this, new ConfigParser());
        _configManager.set(this, new ConfigManager(fs, this.configParser, this.logger));

        let git = simpleGit(this.configManager.centralFolderLocation);
        git.forFolder = (folder) => {
            return simpleGit(folder);
        };

        _git.set(this, git);
        _folders.set(this, new Folders(fs));
        _boilerPlatesManager.set(this, new BoilerPlatesManager(this.configManager, this.httpWrapper, this.git, this.folders, fs, this.logger));
        _applicationManager.set(this, new ApplicationManager(this.boilerPlatesManager, this.configManager, this.folders,  fs, this.logger));
        _boundedContextManager.set(this, new BoundedContextManager(this.boilerPlatesManager, this.applicationManager, this.folders, fs, this.logger));
        _artifactsManager.set(this, new ArtifactsManager(this.boilerPlatesManager, this.folders, fs, this.logger));
    }

    /**
     * Gets the {ConfigManager}
     * @returns {ConfigManager}
     */
    get configManager() {
        return _configManager.get(this);
    }

    /**
     * Gets the {ConfigParser}
     * @returns {ConfigParser}
     */
    get configParser() {
        return _configParser.get(this);
    }

    /**
     * Gets the {Folders}
     * @returns {Folders}
     */
    get folders() {
        return _folders.get(this);
    }

    /**
     * Gets the {ApplicationManager}
     * @returns {ApplicationManager}
     */
    get applicationManager() {
        return _applicationManager.get(this);
    }

    /** 
     * Gets the {ArtifactsManager}
     * @returns {ArtifactsManager}
     */
    get artifactsManager() {
        return _artifactsManager.get(this);
    }

    /**
     * Gets the {BoundedContextManager}
     * @returns {BoundedContextManager}
     */
    get boundedContextManager() {
        return _boundedContextManager.get(this);
    }

    /**
     * Gets the {BoilerPlatesManager}
     * @returns {BoilerPlatesManager}
     */
    get boilerPlatesManager() {
        return _boilerPlatesManager.get(this);
    }

    /**
     * Gets the {Git} system
     * @returns {Git}
     */
    get git() {
        return _git.get(this);
    }

    /**
     * Gets the {Logger}
     * @returns {Logger}
     */
    get logger() { 
        return _logger.get(this);
    }

    /**
     * Gets the {HttpWrapper}
     * @returns {HttpWrapper}
     */
    get httpWrapper() {
        return _httpWrapper.get(this);
    }
}

export default new global();