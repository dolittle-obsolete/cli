'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFileDirPath = getFileDirPath;
exports.getFileName = getFileName;
exports.getFileNameAndExtension = getFileNameAndExtension;
exports.getFileDir = getFileDir;
exports.validateArgsNameInput = validateArgsNameInput;
exports.determineDestination = determineDestination;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * The usage prefix used in commands info
 * @returns {string} the usage prefix
 */
var usagePrefix = exports.usagePrefix = '\n\t ';

/**
 * Gets the full directory path
 * @param {string} filePath
 * @returns {string} directory path
 */
function getFileDirPath(filePath) {
    var path = require('path');
    filePath = path.normalize(filePath);
    return path.parse(filePath).dir;
}
/**
 * Gets the filename without extension
 * @param {string} filePath
 * @returns {string} filename
 */
function getFileName(filePath) {
    var path = require('path');
    filePath = path.normalize(filePath);
    return path.parse(filePath).name;
}
/**
 * Gets the filename with extension
 * @param {string} filePath
 * @returns {string} filename
 */
function getFileNameAndExtension(filePath) {
    var path = require('path');
    filePath = path.normalize(filePath);
    return path.parse(filePath).base;
}
/**
  * Gets the directory name
  * @param {string} filePath
  * @returns {string} file dirname
  */
function getFileDir(filePath) {
    var path = require('path');
    filePath = path.normalize(filePath);
    return path.dirname(filePath);
}
/**
 * Validate the name argument
 * @param {string} name 
 */
function validateArgsNameInput(name) {
    var path = require('path');
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
function determineDestination(area, language, name, cwd, boundedContextPath, dolittleConfig) {
    var path = require('path');
    var config = dolittleConfig[language];
    if (config === undefined || config === null) throw 'No configuration for language ' + language;
    var areaName = config[area];
    if (areaName === undefined || areaName === null) throw 'No configuration for area ' + area + ' for language ' + language;
    var boundedContextRoot = path.dirname(boundedContextPath);
    var regExp = new RegExp('(' + escapeRegex(boundedContextRoot) + ')' + ( // Match first part of path (root of bounded-context) 
    '(?:' + escapeRegex(path.sep) + '[^' + escapeRegex(path.sep) + ']+)?') + ( // Non-matching group matching the segment after the bounded-context root folder. This indicates the area of the artifact
    '(' + escapeRegex(path.sep) + '?.*)') // Match all the segments after the area

    );
    console.log(regExp);
    var newDestination = cwd.replace(regExp, '$1' + path.sep + areaName + '$2');

    var splittedName = name.split('.');
    var featurePath = path.sep + splittedName.slice(0, -1).join(path.sep);
    return { destination: newDestination + featurePath, name: splittedName[splittedName.length - 1] };
}

function escapeRegex(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImdldEZpbGVEaXJQYXRoIiwiZ2V0RmlsZU5hbWUiLCJnZXRGaWxlTmFtZUFuZEV4dGVuc2lvbiIsImdldEZpbGVEaXIiLCJ2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQiLCJkZXRlcm1pbmVEZXN0aW5hdGlvbiIsInVzYWdlUHJlZml4IiwiZmlsZVBhdGgiLCJwYXRoIiwicmVxdWlyZSIsIm5vcm1hbGl6ZSIsInBhcnNlIiwiZGlyIiwibmFtZSIsImJhc2UiLCJkaXJuYW1lIiwiaW5jbHVkZXMiLCJiYXNlbmFtZSIsInRlc3QiLCJhcmVhIiwibGFuZ3VhZ2UiLCJjd2QiLCJib3VuZGVkQ29udGV4dFBhdGgiLCJkb2xpdHRsZUNvbmZpZyIsImNvbmZpZyIsInVuZGVmaW5lZCIsImFyZWFOYW1lIiwiYm91bmRlZENvbnRleHRSb290IiwicmVnRXhwIiwiUmVnRXhwIiwiZXNjYXBlUmVnZXgiLCJzZXAiLCJjb25zb2xlIiwibG9nIiwibmV3RGVzdGluYXRpb24iLCJyZXBsYWNlIiwic3BsaXR0ZWROYW1lIiwic3BsaXQiLCJmZWF0dXJlUGF0aCIsInNsaWNlIiwiam9pbiIsImRlc3RpbmF0aW9uIiwibGVuZ3RoIiwicyJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFpQmdCQSxjLEdBQUFBLGM7UUFVQUMsVyxHQUFBQSxXO1FBVUFDLHVCLEdBQUFBLHVCO1FBVUFDLFUsR0FBQUEsVTtRQVNBQyxxQixHQUFBQSxxQjtRQTJCQUMsb0IsR0FBQUEsb0I7QUFuRmhCOzs7OztBQUtBOzs7O0FBSU8sSUFBTUMsb0NBQWMsT0FBcEI7O0FBR1A7Ozs7O0FBS08sU0FBU04sY0FBVCxDQUF3Qk8sUUFBeEIsRUFBa0M7QUFDckMsUUFBTUMsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFDQUYsZUFBV0MsS0FBS0UsU0FBTCxDQUFlSCxRQUFmLENBQVg7QUFDQSxXQUFPQyxLQUFLRyxLQUFMLENBQVdKLFFBQVgsRUFBcUJLLEdBQTVCO0FB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QXNCLENBQW5DLENBQWxELEVBQVA7QUFDSDs7QUFFRCxTQUFTWixXQUFULENBQXFCYSxDQUFyQixFQUF3QjtBQUNwQixXQUFPQSxFQUFFUixPQUFGLENBQVUsd0JBQVYsRUFBb0MsTUFBcEMsQ0FBUDtBQUNIIiwiZmlsZSI6ImhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4vKipcclxuICogVGhlIHVzYWdlIHByZWZpeCB1c2VkIGluIGNvbW1hbmRzIGluZm9cclxuICogQHJldHVybnMge3N0cmluZ30gdGhlIHVzYWdlIHByZWZpeFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHVzYWdlUHJlZml4ID0gJ1xcblxcdCAnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBmdWxsIGRpcmVjdG9yeSBwYXRoXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBkaXJlY3RvcnkgcGF0aFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVEaXJQYXRoKGZpbGVQYXRoKSB7XHJcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG4gICAgZmlsZVBhdGggPSBwYXRoLm5vcm1hbGl6ZShmaWxlUGF0aCk7XHJcbiAgICByZXR1cm4gcGF0aC5wYXJzZShmaWxlUGF0aCkuZGlyO1xyXG59XHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBmaWxlbmFtZSB3aXRob3V0IGV4dGVuc2lvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcclxuICogQHJldHVybnMge3N0cmluZ30gZmlsZW5hbWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlTmFtZShmaWxlUGF0aCkge1xyXG4gICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcclxuICAgIGZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xyXG4gICAgcmV0dXJuIHBhdGgucGFyc2UoZmlsZVBhdGgpLm5hbWU7XHJcbn1cclxuLyoqXHJcbiAqIEdldHMgdGhlIGZpbGVuYW1lIHdpdGggZXh0ZW5zaW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBmaWxlbmFtZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVOYW1lQW5kRXh0ZW5zaW9uKGZpbGVQYXRoKSB7XHJcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG4gICAgZmlsZVBhdGggPSBwYXRoLm5vcm1hbGl6ZShmaWxlUGF0aCk7XHJcbiAgICByZXR1cm4gcGF0aC5wYXJzZShmaWxlUGF0aCkuYmFzZTtcclxufVxyXG4vKipcclxuICAqIEdldHMgdGhlIGRpcmVjdG9yeSBuYW1lXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcclxuICAqIEByZXR1cm5zIHtzdHJpbmd9IGZpbGUgZGlybmFtZVxyXG4gICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlRGlyKGZpbGVQYXRoKSB7XHJcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG4gICAgZmlsZVBhdGggPSBwYXRoLm5vcm1hbGl6ZShmaWxlUGF0aCk7XHJcbiAgICByZXR1cm4gcGF0aC5kaXJuYW1lKGZpbGVQYXRoKTtcclxufVxyXG4vKipcclxuICogVmFsaWRhdGUgdGhlIG5hbWUgYXJndW1lbnRcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVBcmdzTmFtZUlucHV0KG5hbWUpIHtcclxuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XHJcbiAgICBpZiAobmFtZS5pbmNsdWRlcygnICcpKSB7XHJcbiAgICAgICAgdGhyb3cgJ0FyZ3VtZW50IHBhcnNpbmcgZXJyb3IuIE5hbWUgY29udGFpbmVkIHNwYWNlcyc7XHJcbiAgICB9XHJcbiAgICBpZiAobmFtZS5pbmNsdWRlcygnLScpKSB7XHJcbiAgICAgICAgdGhyb3cgJ0FyZ3VtZW50IHBhcnNpbmcgZXJyb3IuIE5hbWUgY29udGFpbmVkIGRhc2hlcyAoLSknO1xyXG4gICAgfVxyXG4gICAgaWYgKG5hbWUgIT09IHBhdGguYmFzZW5hbWUobmFtZSkpIHtcclxuICAgICAgICB0aHJvdyAnQXJndW1lbnQgcGFyc2luZyBlcnJvci4gSW52YWxpZCBuYW1lJztcclxuICAgIH1cclxuICAgIGlmICgvXlxcLio/JC8udGVzdChuYW1lKSkge1xyXG4gICAgICAgIHRocm93ICdBcmd1bWVudCBwYXJzaW5nIGVycm9yLiBJbnZhbGlkIG5hbWUnO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYXJlYVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtzdHJpbmd9IGN3ZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYm91bmRlZENvbnRleHRQYXRoXHJcbiAqIEBwYXJhbSB7YW55fSBkb2xpdHRsZUNvbmZpZ1xyXG4gKiBcclxuICogQHJldHVybnMge3tkZXN0aW5hdGlvbjogc3RyaW5nLCBuYW1lOiBzdHJpbmd9fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRldGVybWluZURlc3RpbmF0aW9uKGFyZWEsIGxhbmd1YWdlLCBuYW1lLCBjd2QsIGJvdW5kZWRDb250ZXh0UGF0aCwgZG9saXR0bGVDb25maWcpe1xyXG4gICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcclxuICAgIGxldCBjb25maWcgPSBkb2xpdHRsZUNvbmZpZ1tsYW5ndWFnZV07XHJcbiAgICBpZiAoY29uZmlnID09PSB1bmRlZmluZWQgfHwgY29uZmlnID09PSBudWxsKVxyXG4gICAgICAgIHRocm93IGBObyBjb25maWd1cmF0aW9uIGZvciBsYW5ndWFnZSAke2xhbmd1YWdlfWA7XHJcbiAgICBjb25zdCBhcmVhTmFtZSA9IGNvbmZpZ1thcmVhXTtcclxuICAgIGlmIChhcmVhTmFtZSA9PT0gdW5kZWZpbmVkIHx8IGFyZWFOYW1lID09PSBudWxsKVxyXG4gICAgICAgIHRocm93IGBObyBjb25maWd1cmF0aW9uIGZvciBhcmVhICR7YXJlYX0gZm9yIGxhbmd1YWdlICR7bGFuZ3VhZ2V9YDtcclxuICAgIGNvbnN0IGJvdW5kZWRDb250ZXh0Um9vdCA9IHBhdGguZGlybmFtZShib3VuZGVkQ29udGV4dFBhdGgpO1xyXG4gICAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cChcclxuICAgICAgICBgKCR7ZXNjYXBlUmVnZXgoYm91bmRlZENvbnRleHRSb290KX0pYCArIC8vIE1hdGNoIGZpcnN0IHBhcnQgb2YgcGF0aCAocm9vdCBvZiBib3VuZGVkLWNvbnRleHQpIFxyXG4gICAgICAgIGAoPzoke2VzY2FwZVJlZ2V4KHBhdGguc2VwKX1bXiR7ZXNjYXBlUmVnZXgocGF0aC5zZXApfV0rKT9gICsgLy8gTm9uLW1hdGNoaW5nIGdyb3VwIG1hdGNoaW5nIHRoZSBzZWdtZW50IGFmdGVyIHRoZSBib3VuZGVkLWNvbnRleHQgcm9vdCBmb2xkZXIuIFRoaXMgaW5kaWNhdGVzIHRoZSBhcmVhIG9mIHRoZSBhcnRpZmFjdFxyXG4gICAgICAgIGAoJHtlc2NhcGVSZWdleChwYXRoLnNlcCl9Py4qKWAgLy8gTWF0Y2ggYWxsIHRoZSBzZWdtZW50cyBhZnRlciB0aGUgYXJlYVxyXG4gICAgICAgIFxyXG4gICAgKTtcclxuICAgIGNvbnNvbGUubG9nKHJlZ0V4cClcclxuICAgIGNvbnN0IG5ld0Rlc3RpbmF0aW9uID0gY3dkLnJlcGxhY2UocmVnRXhwLCAnJDEnICsgcGF0aC5zZXAgKyBhcmVhTmFtZSArICckMicpO1xyXG5cclxuICAgIGxldCBzcGxpdHRlZE5hbWUgPSBuYW1lLnNwbGl0KCcuJyk7XHJcbiAgICBjb25zdCBmZWF0dXJlUGF0aCA9IHBhdGguc2VwICsgc3BsaXR0ZWROYW1lLnNsaWNlKDAsIC0xKS5qb2luKHBhdGguc2VwKTtcclxuICAgIHJldHVybiB7ZGVzdGluYXRpb246IG5ld0Rlc3RpbmF0aW9uICsgZmVhdHVyZVBhdGgsIG5hbWU6IHNwbGl0dGVkTmFtZVtzcGxpdHRlZE5hbWUubGVuZ3RoIC0gMV19O1xyXG59XHJcblxyXG5mdW5jdGlvbiBlc2NhcGVSZWdleChzKSB7XHJcbiAgICByZXR1cm4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcclxufTtcclxuIl19