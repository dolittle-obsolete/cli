/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ConfigManager } from '../configuration/ConfigManager';
import { HttpWrapper } from '../HttpWrapper';
import { Git } from 'simple-git';
import { Folders } from '../Folders';
import fs from 'fs';
import { Logger } from 'winston';
import path from 'path';
import { BoilerPlate } from './BoilerPlate';
import Handlebars from 'handlebars';

const boilerPlateFolder = 'boiler-plates';

const binaryFiles = [
    ".jpg",
    ".png",
    ".obj",
    ".dll",
    ".bin",
    ".exe",
    ".ttf"
];

const _configManager = new WeakMap();
const _httpWrapper = new WeakMap();
const _git = new WeakMap();
const _folders = new WeakMap();
const _fileSystem = new WeakMap();

const _boilerPlates = new WeakMap();

/**
 * Represents the manager of boiler plates
 */
export class BoilerPlatesManager {

    /**
     * Initializes a new instance of {BoilerPlatesManager}
     * @param {ConfigManager} configManager 
     * @param {HttpWrapper} httpWrapper
     * @param {Git} git
     * @param {Folders} folders
     * @param {fs} fileSystem
     * @param {Logger} logger;
     */
    constructor(configManager, httpWrapper, git, folders, fileSystem, logger) {
        _configManager.set(this, configManager);
        _httpWrapper.set(this, httpWrapper);
        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        _git.set(this, git);

        folders.makeFolderIfNotExists(this.boilerPlateLocation);

        this._logger = logger;
        this.readBoilerPlates();
    }

    /**
     * Gets base path for boiler plates
     * @returns {string} Base path of boiler plates
     */
    get boilerPlateLocation() {
        return path.join(_configManager.get(this).centralFolderLocation, boilerPlateFolder);
    }

    /**
     * Gets path to the boiler plates config file
     * @returns {string} Path to the config file
     */
    get boilerPlateConfigFile() {
        return path.join(_configManager.get(this).centralFolderLocation, "boiler-plates.json");
    }

    /**
     * Get all available boiler plates
     * @returns {BoilerPlate[]} Avaiable boiler plates
     */
    get boilerPlates() {
        return _boilerPlates.get(this);
    }

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @returns {BoilerPlate[]} Avaiable boiler plates for the language
     */
    boilerPlatesByLanguage(language) {
        return _boilerPlates.get(this).filter(boilerPlate => boilerPlate.language == language);
    }

    /**
     * Get all available boiler plates for a specific type
     * @param {string} type
     * @returns {BoilerPlate[]} Avaiable boiler plates for the type
     */
    boilerPlatesByType(type) {
        return _boilerPlates.get(this).filter(boilerPlate => boilerPlate.type == type);
    }

    /**
     * Get all available boiler plates for a specific language
     * @param {string} language
     * @param {string} type
     * @returns {BoilerPlate[]} Avaiable boiler plates for the language
     */
    boilerPlatesByLanguageAndType(language, type) {
        return _boilerPlates.get(this).filter(boilerPlate => boilerPlate.language == language && boilerPlate.type == type);
    }


    /**
     * Read all boiler plates from disk
     */
    readBoilerPlates() {
        let configFile = this.boilerPlateConfigFile;
        if (_fileSystem.get(this).existsSync(configFile)) {
            let json = _fileSystem.get(this).readFileSync(configFile);
            let boilerPlatesAsObjects = JSON.parse(json);
            let boilerPlates = [];


            boilerPlatesAsObjects.forEach(boilerPlateObject => {
                let boilerPlate = new BoilerPlate(
                    boilerPlateObject.language,
                    boilerPlateObject.name,
                    boilerPlateObject.description,
                    boilerPlateObject.type,
                    boilerPlateObject.location,
                    boilerPlateObject.pathsNeedingBinding || [],
                    boilerPlateObject.filesNeedingBinding || []
                );
                boilerPlates.push(boilerPlate);
            });

            _boilerPlates.set(this, boilerPlates);
        } else {

            _boilerPlates.set(this, []);
        }

        if (_boilerPlates.get(this).length == 0) {
            this._logger.warn("There are no boiler plates installed - run 'dolittle update' to get it updated");
        }
    }

    /**
     * Get available boiler plates from GitHub
     */
    getAvailableBoilerPlates() {
        let uri = "https://api.github.com/orgs/dolittle-boilerplates/repos";
        let promise = new Promise((resolve, reject) => {
            _httpWrapper.get(this).getJson(uri).then(json => {
                let result = JSON.parse(json);
                let urls = [];
                result.forEach(item => urls.push(item.name));
                resolve(urls);
            });
        });
        return promise;
    }

    /**
     * Update any existing boiler plates on disk
     */
    updateBoilerPlatesOnDisk() {
        let folders = _folders.get(this).getFoldersIn(this.boilerPlateLocation);
        folders.forEach(folder => {
            this._logger.info(`Update boiler plate in '${folder}'`);
            _git.get(this).forFolder(folder).pull();
        });
    }

    /**
     * Update boiler plates.
     * This will update any existing and download any new ones.
     */
    update() {
        this._logger.info('Updating all boiler plates');
        this.updateBoilerPlatesOnDisk();

        this.getAvailableBoilerPlates().then(names => {
            let cloneCount = 0;
            names.forEach(name => {

                let folderName = path.join(this.boilerPlateLocation, name);
                if (!_fileSystem.get(this).existsSync(folderName)) {
                    let url = `https://github.com/dolittle-boilerplates/${name}.git`;
                    this._logger.info(`Getting boilerplate not on disk from '${url}'`);
                    cloneCount++;
                    _git.get(this).silent(false)
                        .clone(url, folderName, { '--recursive': null })
                        .exec(() => {
                            if (--cloneCount == 0) {
                                this.updateConfiguration();
                            }
                        });
                }
            });
        });
    }

    /**
     * Update configuration file on disk
     */
    updateConfiguration() {
        let self = this;
        let folders = _folders.get(this).getFoldersIn(this.boilerPlateLocation);
        let boilerPlates = [];
        folders.forEach(folder => {
            let boilerPlateFile = path.join(folder, 'boilerplate.js');

            if (_fileSystem.get(this).existsSync(boilerPlateFile)) {
                let boilerPlateFromFile = require(boilerPlateFile);
                let contentFolder = path.join(folder, "Content");

                let paths = _folders.get(this).getFoldersAndFilesRecursivelyIn(contentFolder);
                paths = paths.filter(_ => {
                    let isBinary = false;
                    binaryFiles.forEach(b => {
                        if (_.toLowerCase().indexOf(b) > 0) isBinary = true;
                    });
                    return !isBinary;
                });
                let pathsNeedingBinding = paths.filter(_ => _.indexOf('{{') > 0).map(_ => _.substr(contentFolder.length + 1));
                let filesNeedingBinding = [];

                paths.forEach(_ => {
                    let stat = _fileSystem.get(self).statSync(_);
                    if (!stat.isDirectory()) {
                        let file = _fileSystem.get(self).readFileSync(_);
                        if (file.indexOf('{{') >= 0) {
                            filesNeedingBinding.push(_.substr(contentFolder.length + 1));
                        }
                    }
                });

                let boilerPlate = new BoilerPlate(
                    boilerPlateFromFile.language || 'any',
                    boilerPlateFromFile.name,
                    boilerPlateFromFile.description,
                    boilerPlateFromFile.type,
                    contentFolder,
                    pathsNeedingBinding,
                    filesNeedingBinding
                );
                boilerPlates.push(boilerPlate);
            }
        });

        let boilerPlatesAsObjects = boilerPlates.map(_ => _.toJson());
        let boilerPlatesAsJson = JSON.stringify(boilerPlatesAsObjects, null, 4);
        _fileSystem.get(this).writeFileSync(this.boilerPlateConfigFile, boilerPlatesAsJson);
    }

    /**
     * 
     * @param {BoilerPlate} boilerPlate 
     * @param {string} destination 
     * @param {object} context 
     */
    createInstance(boilerPlate, destination, context) {
        _folders.get(this).copy(destination, boilerPlate.location);
        boilerPlate.pathsNeedingBinding.forEach(_ => {
            let pathToRename = path.join(destination, _);
            let segments = [];
            pathToRename.split(/(\\|\/)/).forEach(segment => segments.push(Handlebars.compile(segment)(context)));
            let result = segments.join('');
            _fileSystem.get(this).renameSync(pathToRename, result);
        });

        boilerPlate.filesNeedingBinding.forEach(_ => {
            let file = path.join(destination, _);

            let content = _fileSystem.get(this).readFileSync(file, 'utf8')
            let template = Handlebars.compile(content);
            let result = template(context);
            _fileSystem.get(this).writeFileSync(file, result);
        });
    }
}