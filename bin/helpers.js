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
    var newDestination = cwd.replace(regExp, '$1' + path.sep + areaName + '$2');

    var splittedName = name.split('.');
    var featurePath = path.sep + splittedName.slice(0, -1).join(path.sep);
    return { destination: newDestination + featurePath, name: splittedName[splittedName.length - 1] };
}

function escapeRegex(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImdldEZpbGVEaXJQYXRoIiwiZ2V0RmlsZU5hbWUiLCJnZXRGaWxlTmFtZUFuZEV4dGVuc2lvbiIsImdldEZpbGVEaXIiLCJ2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQiLCJkZXRlcm1pbmVEZXN0aW5hdGlvbiIsInVzYWdlUHJlZml4IiwiZmlsZVBhdGgiLCJwYXRoIiwicmVxdWlyZSIsIm5vcm1hbGl6ZSIsInBhcnNlIiwiZGlyIiwibmFtZSIsImJhc2UiLCJkaXJuYW1lIiwiaW5jbHVkZXMiLCJiYXNlbmFtZSIsInRlc3QiLCJhcmVhIiwibGFuZ3VhZ2UiLCJjd2QiLCJib3VuZGVkQ29udGV4dFBhdGgiLCJkb2xpdHRsZUNvbmZpZyIsImNvbmZpZyIsInVuZGVmaW5lZCIsImFyZWFOYW1lIiwiYm91bmRlZENvbnRleHRSb290IiwicmVnRXhwIiwiUmVnRXhwIiwiZXNjYXBlUmVnZXgiLCJzZXAiLCJuZXdEZXN0aW5hdGlvbiIsInJlcGxhY2UiLCJzcGxpdHRlZE5hbWUiLCJzcGxpdCIsImZlYXR1cmVQYXRoIiwic2xpY2UiLCJqb2luIiwiZGVzdGluYXRpb24iLCJsZW5ndGgiLCJzIl0sIm1hcHBpbmdzIjoiOzs7OztRQWlCZ0JBLGMsR0FBQUEsYztRQVVBQyxXLEdBQUFBLFc7UUFVQUMsdUIsR0FBQUEsdUI7UUFVQUMsVSxHQUFBQSxVO1FBU0FDLHFCLEdBQUFBLHFCO1FBMkJBQyxvQixHQUFBQSxvQjtBQW5GaEI7Ozs7O0FBS0E7Ozs7QUFJTyxJQUFNQyxvQ0FBYyxPQUFwQjs7QUFHUDs7Ozs7QUFLTyxTQUFTTixjQUFULENBQXdCTyxRQUF4QixFQUFrQztBQUNyQyxRQUFNQyxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUNBRixlQUFXQyxLQUFLRSxTQUFMLENBQWVILFFBQWYsQ0FBWDtBQUNBLFdBQU9DLEtBQUtHLEtBQUwsQ0FBV0osUUFBWCxFQUFxQkssR0FBNUI7QUFDSDtBQUNEOzs7OztBQUtP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QUFxQlcsQ0FBckIsRUFBd0I7QUFDcEIsV0FBT0EsRUFBRVIsT0FBRixDQUFVLHdCQUFWLEVBQW9DLE1BQXBDLENBQVA7QUFDSCIsImZpbGUiOiJoZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSB1c2FnZSBwcmVmaXggdXNlZCBpbiBjb21tYW5kcyBpbmZvXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgdXNhZ2UgcHJlZml4XG4gKi9cbmV4cG9ydCBjb25zdCB1c2FnZVByZWZpeCA9ICdcXG5cXHQgJztcblxuXG4vKipcbiAqIEdldHMgdGhlIGZ1bGwgZGlyZWN0b3J5IHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aFxuICogQHJldHVybnMge3N0cmluZ30gZGlyZWN0b3J5IHBhdGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVEaXJQYXRoKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgICBmaWxlUGF0aCA9IHBhdGgubm9ybWFsaXplKGZpbGVQYXRoKTtcbiAgICByZXR1cm4gcGF0aC5wYXJzZShmaWxlUGF0aCkuZGlyO1xufVxuLyoqXG4gKiBHZXRzIHRoZSBmaWxlbmFtZSB3aXRob3V0IGV4dGVuc2lvblxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVQYXRoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBmaWxlbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsZU5hbWUoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgIGZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVQYXRoKS5uYW1lO1xufVxuLyoqXG4gKiBHZXRzIHRoZSBmaWxlbmFtZSB3aXRoIGV4dGVuc2lvblxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVQYXRoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBmaWxlbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsZU5hbWVBbmRFeHRlbnNpb24oZmlsZVBhdGgpIHtcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgIGZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVQYXRoKS5iYXNlO1xufVxuLyoqXG4gICogR2V0cyB0aGUgZGlyZWN0b3J5IG5hbWVcbiAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcbiAgKiBAcmV0dXJucyB7c3RyaW5nfSBmaWxlIGRpcm5hbWVcbiAgKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlRGlyKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgICBmaWxlUGF0aCA9IHBhdGgubm9ybWFsaXplKGZpbGVQYXRoKTtcbiAgICByZXR1cm4gcGF0aC5kaXJuYW1lKGZpbGVQYXRoKTtcbn1cbi8qKlxuICogVmFsaWRhdGUgdGhlIG5hbWUgYXJndW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVBcmdzTmFtZUlucHV0KG5hbWUpIHtcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgIGlmIChuYW1lLmluY2x1ZGVzKCcgJykpIHtcbiAgICAgICAgdGhyb3cgJ0FyZ3VtZW50IHBhcnNpbmcgZXJyb3IuIE5hbWUgY29udGFpbmVkIHNwYWNlcyc7XG4gICAgfVxuICAgIGlmIChuYW1lLmluY2x1ZGVzKCctJykpIHtcbiAgICAgICAgdGhyb3cgJ0FyZ3VtZW50IHBhcnNpbmcgZXJyb3IuIE5hbWUgY29udGFpbmVkIGRhc2hlcyAoLSknO1xuICAgIH1cbiAgICBpZiAobmFtZSAhPT0gcGF0aC5iYXNlbmFtZShuYW1lKSkge1xuICAgICAgICB0aHJvdyAnQXJndW1lbnQgcGFyc2luZyBlcnJvci4gSW52YWxpZCBuYW1lJztcbiAgICB9XG4gICAgaWYgKC9eXFwuKj8kLy50ZXN0KG5hbWUpKSB7XG4gICAgICAgIHRocm93ICdBcmd1bWVudCBwYXJzaW5nIGVycm9yLiBJbnZhbGlkIG5hbWUnO1xuICAgIH1cbn1cbi8qKlxuICpcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYXJlYVxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGN3ZFxuICogQHBhcmFtIHtzdHJpbmd9IGJvdW5kZWRDb250ZXh0UGF0aFxuICogQHBhcmFtIHthbnl9IGRvbGl0dGxlQ29uZmlnXG4gKiBcbiAqIEByZXR1cm5zIHt7ZGVzdGluYXRpb246IHN0cmluZywgbmFtZTogc3RyaW5nfX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRldGVybWluZURlc3RpbmF0aW9uKGFyZWEsIGxhbmd1YWdlLCBuYW1lLCBjd2QsIGJvdW5kZWRDb250ZXh0UGF0aCwgZG9saXR0bGVDb25maWcpe1xuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gICAgbGV0IGNvbmZpZyA9IGRvbGl0dGxlQ29uZmlnW2xhbmd1YWdlXTtcbiAgICBpZiAoY29uZmlnID09PSB1bmRlZmluZWQgfHwgY29uZmlnID09PSBudWxsKVxuICAgICAgICB0aHJvdyBgTm8gY29uZmlndXJhdGlvbiBmb3IgbGFuZ3VhZ2UgJHtsYW5ndWFnZX1gO1xuICAgIGNvbnN0IGFyZWFOYW1lID0gY29uZmlnW2FyZWFdO1xuICAgIGlmIChhcmVhTmFtZSA9PT0gdW5kZWZpbmVkIHx8IGFyZWFOYW1lID09PSBudWxsKVxuICAgICAgICB0aHJvdyBgTm8gY29uZmlndXJhdGlvbiBmb3IgYXJlYSAke2FyZWF9IGZvciBsYW5ndWFnZSAke2xhbmd1YWdlfWA7XG4gICAgY29uc3QgYm91bmRlZENvbnRleHRSb290ID0gcGF0aC5kaXJuYW1lKGJvdW5kZWRDb250ZXh0UGF0aCk7XG4gICAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cChcbiAgICAgICAgYCgke2VzY2FwZVJlZ2V4KGJvdW5kZWRDb250ZXh0Um9vdCl9KWAgKyAvLyBNYXRjaCBmaXJzdCBwYXJ0IG9mIHBhdGggKHJvb3Qgb2YgYm91bmRlZC1jb250ZXh0KSBcbiAgICAgICAgYCg/OiR7ZXNjYXBlUmVnZXgocGF0aC5zZXApfVteJHtlc2NhcGVSZWdleChwYXRoLnNlcCl9XSspP2AgKyAvLyBOb24tbWF0Y2hpbmcgZ3JvdXAgbWF0Y2hpbmcgdGhlIHNlZ21lbnQgYWZ0ZXIgdGhlIGJvdW5kZWQtY29udGV4dCByb290IGZvbGRlci4gVGhpcyBpbmRpY2F0ZXMgdGhlIGFyZWEgb2YgdGhlIGFydGlmYWN0XG4gICAgICAgIGAoJHtlc2NhcGVSZWdleChwYXRoLnNlcCl9Py4qKWAgLy8gTWF0Y2ggYWxsIHRoZSBzZWdtZW50cyBhZnRlciB0aGUgYXJlYVxuICAgICAgICBcbiAgICApO1xuICAgIGNvbnN0IG5ld0Rlc3RpbmF0aW9uID0gY3dkLnJlcGxhY2UocmVnRXhwLCAnJDEnICsgcGF0aC5zZXAgKyBhcmVhTmFtZSArICckMicpO1xuXG4gICAgbGV0IHNwbGl0dGVkTmFtZSA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICBjb25zdCBmZWF0dXJlUGF0aCA9IHBhdGguc2VwICsgc3BsaXR0ZWROYW1lLnNsaWNlKDAsIC0xKS5qb2luKHBhdGguc2VwKTtcbiAgICByZXR1cm4ge2Rlc3RpbmF0aW9uOiBuZXdEZXN0aW5hdGlvbiArIGZlYXR1cmVQYXRoLCBuYW1lOiBzcGxpdHRlZE5hbWVbc3BsaXR0ZWROYW1lLmxlbmd0aCAtIDFdfTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlUmVnZXgocykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoL1stXFwvXFxcXF4kKis/LigpfFtcXF17fV0vZywgJ1xcXFwkJicpO1xufSJdfQ==