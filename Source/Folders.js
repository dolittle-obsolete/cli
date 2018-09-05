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

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    }

    /**
     * Get top level folders in a given path
     * @param {string} path 
     */
    getFoldersIn(folder) {
        var results = [];
        fs.readdirSync(folder).forEach(function (dirInner) {
            let actualPath = path.resolve(folder, dirInner);
            let stat = fs.statSync(actualPath);
            if (stat.isDirectory()) {
                results.push(actualPath);
            }
        });
        return results;
    }

    /**
     * Search for a specific file pattern within a folder, recursively
     * @param {string} folder Folder to search from
     * @param {string} pattern Pattern of files to look for
     */
    searchRecursive(folder, pattern) {
        var results = [];

        fs.readdirSync(folder).forEach(function (dirInner) {
            dirInner = path.resolve(folder, dirInner);
            var stat = fs.statSync(dirInner);

            if (stat.isDirectory()) {
                results = results.concat(this.SearchRecursive(dirInner, pattern));
            }

            if (stat.isFile() && dirInner.endsWith(pattern)) {
                results.push(dirInner);
            }
        });

        return results;
    };
}
