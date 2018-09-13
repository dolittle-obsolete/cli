/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import fs from 'fs-extra';
import path from 'path';

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
        fs.copySync(source, destination);
    }

    /**
     * Create a folder if it does not exist
     * @param {string} path Name of the folder to make sure exists
     */
    makeFolderIfNotExists(path)
    {
        var dir = path;

        if (!_fileSystem.get(this).existsSync(dir)){
            _fileSystem.get(this).mkdirSync(dir);
        }
    }

    /**
     * Get top level folders in a given path
     * @param {string} path 
     */
    getFoldersIn(folder) {
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
     * Get all files within a specific folder recursively
     * @param {string} folder Path of the folder to get from
     * @returns {string[]} Array of files
     */
    getFilesRecursivelyIn(folder) {
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
        let self = this;
        let results = [];
        _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = _fileSystem.get(self).statSync(actualPath);
            if (stat.isDirectory()) {
                results = results.concat(self.getFoldersAndFilesRecursivelyIn(actualPath));
            }
            if (stat.isFile()) {
                const lastPathSeparatorMatch = actualPath.match(/(\\|\/)/);
                const lastIndex = actualPath.lastIndexOf(lastPathSeparatorMatch[lastPathSeparatorMatch.length-1])
                const filename = actualPath.substring(lastIndex+1, actualPath.length);
                if (templateFileNames.indexOf(filename) >= 0) {
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
     * Search for a specific file pattern within a folder, recursively
     * @param {string} folder Folder to search from
     * @param {string} pattern Pattern of files to look for
     */
    searchRecursive(folder, pattern) {
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
}
