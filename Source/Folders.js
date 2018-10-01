/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import fs from 'fs-extra';
import path from 'path';

/**
 * @type {WeakMap<Folders, fs}
 */
const _fileSystem = new WeakMap();

/**
 * Represents helpers for working with folders
 */
export class Folders
{
    /**
     * Initializes a new instance of {folders}
     * @param {fs} fileSystem 
     */
    constructor(fileSystem) {
        _fileSystem.set(this,fileSystem);
    }

    /**
     * Copy one folder and its content recursively to a specified destination
     * @param {string} destination Destination path to copy to
     * @param {string} source Source path to copy from
     */
    copy(destination, source)
    {
        destination = path.normalize(destination);
        source = path.normalize(source);
        fs.copySync(source, destination);
    }

    /**
     * Create a folder if it does not exist
     * @param {string} folderPath Name of the folder to make sure exists
     */
    makeFolderIfNotExists(folderPath)
    {
        folderPath = path.normalize(folderPath);
        try {
        _fileSystem.get(this).ensureDirSync(folderPath);
        } catch(err)
        {
            try {
                let shell = require('shelljs');
                shell.mkdir('-p', folderPath);
    
            } catch(err)
            {
                this._logger.error('Could not create directory: ',folderPath);
                throw 'Could not create directory';
            }
        }
    }

    /**
     * Get top level folders in a given path
     * @param {string} path 
     */
    getFoldersIn(folder) {
        folder = path.normalize(folder);
        let self = this;
        var results = [];
        _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = _fileSystem.get(self).statSync(actualPath);
            if (stat.isDirectory()) {
                results.push(actualPath);
            }
        });
        return results;
    }

    /**
     * Get top level folders in a given path
     * @param {string} folder path 
     * @param {RegExp} regularExp
     * @returns {string[]} folder paths
     */
    getFoldersInRegex(folder, regularExp) {
        folder = path.normalize(folder);
        let self = this;
        var results = [];
        _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = _fileSystem.get(self).statSync(actualPath);
            let regexMatch = path.parse(actualPath).name.match(regularExp);
            if (stat.isDirectory() && regexMatch && regexMatch.length > 0) {
                results.push(actualPath);
            }
        });
        return results;
    }

    /**
     * Get all files within a specific folder recursively
     * @param {string} folder Path of the folder to get from
     * @returns {string[]} Array of files
     */
    getFilesRecursivelyIn(folder) {
        folder = path.normalize(folder);
        let self = this;
        let results = [];
        _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = _fileSystem.get(self).statSync(actualPath);

            if (stat.isDirectory()) {
                results = results.concat(self.getFoldersAndFilesRecursivelyIn(actualPath));
            }
            if (stat.isFile()) {
                results.push(actualPath);
            }
        });
        return results;
    }

    /**
     * Get all files within a specific folder recursively
     * @param {string} folder Path of the folder to get from
     * @param {string[]} templateFileNames The template file names
     * @returns {string[]} Array of files
     */
    getArtifactTemplateFilesRecursivelyIn(folder, templateFileNames) {
        folder = path.normalize(folder);
        let self = this;
        let results = [];
        _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = _fileSystem.get(self).statSync(actualPath);
            if (stat.isDirectory()) {
                results = results.concat(self.getFoldersAndFilesRecursivelyIn(actualPath));
            }
            if (stat.isFile()) {
                const filename = path.basename(actualPath);
                if (templateFileNames.includes(filename)) {
                    results.push(actualPath);
                }
            }
        });
        return results;
    }

    /**
     * Get all folders and files within a specific folder recursively
     * @param {string} folder Path of the folder to get from
     * @returns {string[]} Array of files and folders
     */
    getFoldersAndFilesRecursivelyIn(folder) {
        folder = path.normalize(folder);
        let self = this;
        let results = [];
        _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = _fileSystem.get(self).statSync(actualPath);
            
            if (stat.isDirectory()) {
                results = results.concat(self.getFoldersAndFilesRecursivelyIn(actualPath));
            }
            results.push(actualPath);
        });
        return results;
    }

    /**
     * Search for a specific file pattern within a folder
     * @param {string} folder Folder to search from
     * @param {string} pattern Pattern of files to look for
     */
    searchFolder(folder, pattern) {
        folder = path.normalize(folder);
        let self = this;
        var results = [];

        _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
            dirInner = path.resolve(folder, dirInner);
            var stat = _fileSystem.get(self).statSync(dirInner);
            if (stat.isFile() && dirInner.endsWith(pattern)) {
                results.push(dirInner);
            }
        });

        return results;
    };
    /**
     * Search for a specific file pattern within a folder with regex
     * @param {string} folder Folder to search from
     * @param {RegExp} regularExp The regex pattern of files to look for
     */
    searchFolderRegex(folder, regularExp) {
        folder = path.normalize(folder);
        let self = this;
        var results = [];

        _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
            dirInner = path.resolve(folder, dirInner);
            let regexMatch = dirInner.match(regularExp);
            var stat = _fileSystem.get(self).statSync(dirInner);
            if (stat.isFile() && regexMatch && regexMatch.length > 0) {
                results.push(dirInner);
            }
        });

        return results;
    };
    /**
     * Search for a specific file pattern within a folder, recursively
     * @param {string} folder Folder to search from
     * @param {string} pattern Pattern of files to look for
     * @returns {string[]} The paths of the matching files
     */
    searchRecursive(folder, pattern) {
        folder = path.normalize(folder);
        let self = this;
        var results = [];

        _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
            dirInner = path.resolve(folder, dirInner);
            var stat = _fileSystem.get(self).statSync(dirInner);
            if (stat.isDirectory()) {
                results = results.concat(self.searchRecursive(dirInner, pattern));
            }

            if (stat.isFile() && dirInner.endsWith(pattern)) {
                results.push(dirInner);
            }
        });

        return results;
    };
    /**
     * Search for a specific file with regular expression, recursively
     * @param {string} folder to search from
     * @param {string} regularExp Pattern of the files to look for
     * @returns {string[]} the paths of the matching files 
     */
    searchRecursiveRegex(folder, regularExp) {
        folder = path.normalize(folder);
        let self = this;
        var results = [];

        _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
            dirInner = path.resolve(folder, dirInner);
            var stat = _fileSystem.get(self).statSync(dirInner);
            if (stat.isDirectory()) {
                results = results.concat(self.searchRecursiveRegex(dirInner, regularExp));
            }
            let regexMatch = dirInner.match(regularExp);
            if (stat.isFile() && regexMatch && regexMatch.length > 0) {
                results.push(dirInner);
            }
        });

        return results;
    }
    /**
     * Gets the paths of the nearest directories matching the regular expression, searching upwards
     * @param {string} folder the start folder
     * @param {RegExp} regularExp
     * @returns {string[]} paths
     */
    getNearestDirsSearchingUpwards(folder, regularExp) {
        folder = path.normalize(folder);
        let results = [];
        while (this.isNotEmptyFolder(folder)) {
            let folders = this.getFoldersInRegex(folder, regularExp);
            if (folders.length > 0)
                results.push(...folders);
            folder = path.join(folder, '../');
            if (results.length > 0)
                break;
        }
        return results;
    }
    /**
     * Gets the path of the nearest file matching the regular expression, searching upwards
     * @param {string} folder the start folder
     * @param {RegExp} regularExp
     * @returns {string} path
     */
    getNearestFileSearchingUpwards(folder, regularExp) {
        folder = path.normalize(folder);
        while (this.isNotEmptyFolder(folder))
        {
            let results = this.searchFolderRegex(folder, regularExp); 
            if (results.length >= 1)
                return results[0];
            folder = path.join(folder, '../');
        }
        return '';
    }

    isNotEmptyFolder(folder) {
        return folder !== null && folder !== '' && folder !== path.sep; 
    }
    
}
