/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The usage prefix used in commands info
 * @returns {string} the usage prefix
 */
export const usagePrefix = '\n\t ';


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
    if (/^\.*?$/.test(name)) {
        throw 'Argument parsing error. Invalid name';
    }
}
/**
 *
 *
 * @param {string} area
 * @param {string} language
 * @param {string} name
 * @param {string} cwd
 * @param {string} boundedContextPath
 * @param {any} dolittleConfig
 * 
 * @returns {{destination: string, name: string}}
 */
export function determineDestination(area, language, name, cwd, boundedContextPath, dolittleConfig){
    const path = require('path');
    let config = dolittleConfig[language];
    if (config === undefined || config === null)
        throw `No configuration for language ${language}`;
    const areaName = config[area];
    if (areaName === undefined || areaName === null)
        throw `No configuration for area ${area} for language ${language}`;
    const boundedContextRoot = path.dirname(boundedContextPath);
    const regExp = new RegExp(
        `(${escapeRegex(boundedContextRoot)})` + // Match first part of path (root of bounded-context) 
        `(?:${escapeRegex(path.sep)}[^${escapeRegex(path.sep)}]+)?` + // Non-matching group matching the segment after the bounded-context root folder. This indicates the area of the artifact
        `(${escapeRegex(path.sep)}?.*)` // Match all the segments after the area
        
    );
    const newDestination = cwd.replace(regExp, '$1' + path.sep + areaName + '$2');

    let splittedName = name.split('.');
    const featurePath = path.sep + splittedName.slice(0, -1).join(path.sep);
    return {destination: newDestination + featurePath, name: splittedName[splittedName.length - 1]};
}

function escapeRegex(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
