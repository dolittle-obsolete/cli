/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


export function usagePrefix() {
    return '\n\t ';
}

/**
 * Gets the full directory path
 * @param {string} filePath
 * @returns {string} directory path
 */
export function getFileDirPath(filePath) {
    const path = require('path');
    filePath = path.normalize(filePath);
    return path.parse(filePath).dir;
}
/**
 * Gets the filename without extension
 * @param {string} filePath
 * @returns {string} filename
 */
export function getFileName(filePath) {
    const path = require('path');
    filePath = path.normalize(filePath);
    return path.parse(filePath).name;
}
/**
 * Gets the filename with extension
 * @param {string} filePath
 * @returns {string} filename
 */
export function getFileNameAndExtension(filePath) {
    const path = require('path');
    filePath = path.normalize(filePath);
    return path.parse(filePath).base;
}
/**
 * Gets the directory name
 * @param {string} filePath
 * @returns {string} file dirname
 */
export function getFileDir(filePath) {
    const path = require('path');
    filePath = path.normalize(filePath);
    return path.dirname(filePath);
}

/**
 * Validate the name argument
 * @param {string} name 
 */
export function validateArgsNameInput(name) {
    const path = require('path');
    if (name.includes(' ')) {
        throw 'Argument parsing error. Name contained spaces';
    }
    if (name.includes('-')) {
        throw 'Argument parsing error. Name contained dashes (-)';
    }
    if (name !== path.basename(name)) {
        throw 'Argument parsing error. Invalid name';
    }
    if (/^\.\.?$/.test(name)) {
        throw 'Argument parsing error. Invalid name';
    }
}