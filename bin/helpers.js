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
    var regExp = new RegExp('(' + boundedContextRoot + ')' + ( // Match first part of path (root of bounded-context) 
    '(?:\\' + path.sep + '[^' + path.sep + ']+)?') + ( // Non-matching group matching the segment after the bounded-context root folder. This indicates the area of the artifact
    '(\\' + path.sep + '?.*)') // Match all the segments after the area

    );
    var newDestination = cwd.replace(regExp, '$1' + path.sep + areaName + '$2');

    var splittedName = name.split('.');
    var featurePath = path.sep + splittedName.slice(0, -1).join(path.sep);
    return { destination: newDestination + featurePath, name: splittedName[splittedName.length - 1] };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImdldEZpbGVEaXJQYXRoIiwiZ2V0RmlsZU5hbWUiLCJnZXRGaWxlTmFtZUFuZEV4dGVuc2lvbiIsImdldEZpbGVEaXIiLCJ2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQiLCJkZXRlcm1pbmVEZXN0aW5hdGlvbiIsInVzYWdlUHJlZml4IiwiZmlsZVBhdGgiLCJwYXRoIiwicmVxdWlyZSIsIm5vcm1hbGl6ZSIsInBhcnNlIiwiZGlyIiwibmFtZSIsImJhc2UiLCJkaXJuYW1lIiwiaW5jbHVkZXMiLCJiYXNlbmFtZSIsInRlc3QiLCJhcmVhIiwibGFuZ3VhZ2UiLCJjd2QiLCJib3VuZGVkQ29udGV4dFBhdGgiLCJkb2xpdHRsZUNvbmZpZyIsImNvbmZpZyIsInVuZGVmaW5lZCIsImFyZWFOYW1lIiwiYm91bmRlZENvbnRleHRSb290IiwicmVnRXhwIiwiUmVnRXhwIiwic2VwIiwibmV3RGVzdGluYXRpb24iLCJyZXBsYWNlIiwic3BsaXR0ZWROYW1lIiwic3BsaXQiLCJmZWF0dXJlUGF0aCIsInNsaWNlIiwiam9pbiIsImRlc3RpbmF0aW9uIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7OztRQWtCZ0JBLGMsR0FBQUEsYztRQVVBQyxXLEdBQUFBLFc7UUFVQUMsdUIsR0FBQUEsdUI7UUFVQUMsVSxHQUFBQSxVO1FBU0FDLHFCLEdBQUFBLHFCO1FBMkJBQyxvQixHQUFBQSxvQjtBQXBGaEI7Ozs7O0FBTUE7Ozs7QUFJTyxJQUFNQyxvQ0FBYyxPQUFwQjs7QUFHUDs7Ozs7QUFLTyxTQUFTTixjQUFULENBQXdCTyxRQUF4QixFQUFrQztBQUNyQyxRQUFNQyxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUNBRixlQUFXQyxLQUFLRSxTQUFMLENBQWVILFFBQWYsQ0FBWDtBQUNBLFdBQU9DLEtBQUtHLEtBQUwsQ0FBV0osUUFBWCxFQUFxQkssR0FBNUI7QUFDSDtBQUNEOzs7OztBQUtPLFNBQVNYLFdBQVQsQ0FBcUJNLFFBQXJCLEVBQStCO0FBQ2xDLFFBQU1DLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQ0FGLGVBQVdDLEtBQUtFLFNBQUwsQ0FBZUgsUUFBZixDQUFYO0FBQ0EsV0FBT0MsS0FBS0csS0FBTCxDQUFXSixRQUFYLEVBQXFCTSxJQUE1QjtBQUNIO0FBQ0Q7Ozs7O0FBS08sU0FBU1gsdUJBQVQsQ0FBaUNLLFFBQWpDLEVBQTJDO0FBQzlDLFFBQU1DLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQ0FGLGVBQVdDLEtBQUtFLFNBQUwsQ0FBZUgsUUFBZixDQUFYO0FBQ0EsV0FBT0MsS0FBS0csS0FBTCxDQUFXSixRQUFYLEVBQXFCTyxJQUE1QjtBQUNIO0FBQ0Q7Ozs7O0FBS08sU0FBU1gsVUFBVCxDQUFvQkksUUFBcEIsRUFBOEI7QUFDakMsUUFBTUMsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFDQUYsZUFBV0MsS0FBS0UsU0FBTCxDQUFlSCxRQUFmLENBQVg7QUFDQSxXQUFPQyxLQUFLTyxPQUFMLENBQWFSLFFBQWIsQ0FBUDtBQUNIO0FBQ0Q7Ozs7QUFJTyxTQUFTSCxxQkFBVCxDQUErQlMsSUFBL0IsRUFBcUM7QUFDeEMsUUFBTUwsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFDQSxRQUFJSSxLQUFLRyxRQUFMLENBQWMsR0FBZCxDQUFKLEVBQXdCO0FBQ3BCLGNBQU0sK0NBQU47QUFDSDtBQUNELFFBQUlILEtBQUtHLFFBQUwsQ0FBYyxHQUFkLENBQUosRUFBd0I7QUFDcEIsY0FBTSxtREFBTjtBQUNIO0FBQ0QsUUFBSUgsU0FBU0wsS0FBS1MsUUFBTCxDQUFjSixJQUFkLENBQWIsRUFBa0M7QUFDOUIsY0FBTSxzQ0FBTjtBQUNIO0FBQ0QsUUFBSSxTQUFTSyxJQUFULENBQWNMLElBQWQsQ0FBSixFQUF5QjtBQUNyQixjQUFNLHNDQUFOO0FBQ0g7QUFDSjtBQUNEOzs7Ozs7Ozs7Ozs7QUFZTyxTQUFTUixvQkFBVCxDQUE4QmMsSUFBOUIsRUFBb0NDLFFBQXBDLEVBQThDUCxJQUE5QyxFQUFvRFEsR0FBcEQsRUFBeURDLGtCQUF6RCxFQUE2RUMsY0FBN0UsRUFBNEY7QUFDL0YsUUFBTWYsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFDQSxRQUFJZSxTQUFTRCxlQUFlSCxRQUFmLENBQWI7QUFDQSxRQUFJSSxXQUFXQyxTQUFYLElBQXdCRCxXQUFXLElBQXZDLEVBQ0kseUNBQXVDSixRQUF2QztBQUNKLFFBQU1NLFdBQVdGLE9BQU9MLElBQVAsQ0FBakI7QUFDQSxRQUFJTyxhQUFhRCxTQUFiLElBQTBCQyxhQUFhLElBQTNDLEVBQ0kscUNBQW1DUCxJQUFuQyxzQkFBd0RDLFFBQXhEO0FBQ0osUUFBTU8scUJBQXFCbkIsS0FBS08sT0FBTCxDQUFhTyxrQkFBYixDQUEzQjtBQUNBLFFBQU1NLFNBQVMsSUFBSUMsTUFBSixDQUNYLE1BQUlGLGtCQUFKLFdBQTRCO0FBQTVCLGNBQ1FuQixLQUFLc0IsR0FEYixVQUNxQnRCLEtBQUtzQixHQUQxQixlQUNzQztBQUR0QyxZQUVNdEIsS0FBS3NCLEdBRlgsVUFEVyxDQUdVOztBQUhWLEtBQWY7QUFNQSxRQUFNQyxpQkFBaUJWLElBQUlXLE9BQUosQ0FBWUosTUFBWixFQUFvQixPQUFPcEIsS0FBS3NCLEdBQVosR0FBa0JKLFFBQWxCLEdBQTZCLElBQWpELENBQXZCOztBQUVBLFFBQUlPLGVBQWVwQixLQUFLcUIsS0FBTCxDQUFXLEdBQVgsQ0FBbkI7QUFDQSxRQUFNQyxjQUFjM0IsS0FBS3NCLEdBQUwsR0FBV0csYUFBYUcsS0FBYixDQUFtQixDQUFuQixFQUFzQixDQUFDLENBQXZCLEVBQTBCQyxJQUExQixDQUErQjdCLEtBQUtzQixHQUFwQyxDQUEvQjtBQUNBLFdBQU8sRUFBQ1EsYUFBYVAsaUJBQWlCSSxXQUEvQixFQUE0Q3RCLE1BQU1vQixhQUFhQSxhQUFhTSxNQUFiLEdBQXNCLENBQW5DLENBQWxELEVBQVA7QUFDSCIsImZpbGUiOiJoZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cbi8qKlxuICogVGhlIHVzYWdlIHByZWZpeCB1c2VkIGluIGNvbW1hbmRzIGluZm9cbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSB1c2FnZSBwcmVmaXhcbiAqL1xuZXhwb3J0IGNvbnN0IHVzYWdlUHJlZml4ID0gJ1xcblxcdCAnO1xuXG5cbi8qKlxuICogR2V0cyB0aGUgZnVsbCBkaXJlY3RvcnkgcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVQYXRoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBkaXJlY3RvcnkgcGF0aFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsZURpclBhdGgoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgIGZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVQYXRoKS5kaXI7XG59XG4vKipcbiAqIEdldHMgdGhlIGZpbGVuYW1lIHdpdGhvdXQgZXh0ZW5zaW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGZpbGVuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlTmFtZShmaWxlUGF0aCkge1xuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gICAgZmlsZVBhdGggPSBwYXRoLm5vcm1hbGl6ZShmaWxlUGF0aCk7XG4gICAgcmV0dXJuIHBhdGgucGFyc2UoZmlsZVBhdGgpLm5hbWU7XG59XG4vKipcbiAqIEdldHMgdGhlIGZpbGVuYW1lIHdpdGggZXh0ZW5zaW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGZpbGVuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlTmFtZUFuZEV4dGVuc2lvbihmaWxlUGF0aCkge1xuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gICAgZmlsZVBhdGggPSBwYXRoLm5vcm1hbGl6ZShmaWxlUGF0aCk7XG4gICAgcmV0dXJuIHBhdGgucGFyc2UoZmlsZVBhdGgpLmJhc2U7XG59XG4vKipcbiAgKiBHZXRzIHRoZSBkaXJlY3RvcnkgbmFtZVxuICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aFxuICAqIEByZXR1cm5zIHtzdHJpbmd9IGZpbGUgZGlybmFtZVxuICAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVEaXIoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgIGZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgIHJldHVybiBwYXRoLmRpcm5hbWUoZmlsZVBhdGgpO1xufVxuLyoqXG4gKiBWYWxpZGF0ZSB0aGUgbmFtZSBhcmd1bWVudFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQobmFtZSkge1xuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gICAgaWYgKG5hbWUuaW5jbHVkZXMoJyAnKSkge1xuICAgICAgICB0aHJvdyAnQXJndW1lbnQgcGFyc2luZyBlcnJvci4gTmFtZSBjb250YWluZWQgc3BhY2VzJztcbiAgICB9XG4gICAgaWYgKG5hbWUuaW5jbHVkZXMoJy0nKSkge1xuICAgICAgICB0aHJvdyAnQXJndW1lbnQgcGFyc2luZyBlcnJvci4gTmFtZSBjb250YWluZWQgZGFzaGVzICgtKSc7XG4gICAgfVxuICAgIGlmIChuYW1lICE9PSBwYXRoLmJhc2VuYW1lKG5hbWUpKSB7XG4gICAgICAgIHRocm93ICdBcmd1bWVudCBwYXJzaW5nIGVycm9yLiBJbnZhbGlkIG5hbWUnO1xuICAgIH1cbiAgICBpZiAoL15cXC4qPyQvLnRlc3QobmFtZSkpIHtcbiAgICAgICAgdGhyb3cgJ0FyZ3VtZW50IHBhcnNpbmcgZXJyb3IuIEludmFsaWQgbmFtZSc7XG4gICAgfVxufVxuLyoqXG4gKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcmVhXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gY3dkXG4gKiBAcGFyYW0ge3N0cmluZ30gYm91bmRlZENvbnRleHRQYXRoXG4gKiBAcGFyYW0ge2FueX0gZG9saXR0bGVDb25maWdcbiAqIFxuICogQHJldHVybnMge3tkZXN0aW5hdGlvbjogc3RyaW5nLCBuYW1lOiBzdHJpbmd9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGV0ZXJtaW5lRGVzdGluYXRpb24oYXJlYSwgbGFuZ3VhZ2UsIG5hbWUsIGN3ZCwgYm91bmRlZENvbnRleHRQYXRoLCBkb2xpdHRsZUNvbmZpZyl7XG4gICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgICBsZXQgY29uZmlnID0gZG9saXR0bGVDb25maWdbbGFuZ3VhZ2VdO1xuICAgIGlmIChjb25maWcgPT09IHVuZGVmaW5lZCB8fCBjb25maWcgPT09IG51bGwpXG4gICAgICAgIHRocm93IGBObyBjb25maWd1cmF0aW9uIGZvciBsYW5ndWFnZSAke2xhbmd1YWdlfWA7XG4gICAgY29uc3QgYXJlYU5hbWUgPSBjb25maWdbYXJlYV07XG4gICAgaWYgKGFyZWFOYW1lID09PSB1bmRlZmluZWQgfHwgYXJlYU5hbWUgPT09IG51bGwpXG4gICAgICAgIHRocm93IGBObyBjb25maWd1cmF0aW9uIGZvciBhcmVhICR7YXJlYX0gZm9yIGxhbmd1YWdlICR7bGFuZ3VhZ2V9YDtcbiAgICBjb25zdCBib3VuZGVkQ29udGV4dFJvb3QgPSBwYXRoLmRpcm5hbWUoYm91bmRlZENvbnRleHRQYXRoKTtcbiAgICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKFxuICAgICAgICBgKCR7Ym91bmRlZENvbnRleHRSb290fSlgICsgLy8gTWF0Y2ggZmlyc3QgcGFydCBvZiBwYXRoIChyb290IG9mIGJvdW5kZWQtY29udGV4dCkgXG4gICAgICAgIGAoPzpcXFxcJHtwYXRoLnNlcH1bXiR7cGF0aC5zZXB9XSspP2AgKyAvLyBOb24tbWF0Y2hpbmcgZ3JvdXAgbWF0Y2hpbmcgdGhlIHNlZ21lbnQgYWZ0ZXIgdGhlIGJvdW5kZWQtY29udGV4dCByb290IGZvbGRlci4gVGhpcyBpbmRpY2F0ZXMgdGhlIGFyZWEgb2YgdGhlIGFydGlmYWN0XG4gICAgICAgIGAoXFxcXCR7cGF0aC5zZXB9Py4qKWAgLy8gTWF0Y2ggYWxsIHRoZSBzZWdtZW50cyBhZnRlciB0aGUgYXJlYVxuICAgICAgICBcbiAgICApO1xuICAgIGNvbnN0IG5ld0Rlc3RpbmF0aW9uID0gY3dkLnJlcGxhY2UocmVnRXhwLCAnJDEnICsgcGF0aC5zZXAgKyBhcmVhTmFtZSArICckMicpO1xuXG4gICAgbGV0IHNwbGl0dGVkTmFtZSA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICBjb25zdCBmZWF0dXJlUGF0aCA9IHBhdGguc2VwICsgc3BsaXR0ZWROYW1lLnNsaWNlKDAsIC0xKS5qb2luKHBhdGguc2VwKTtcbiAgICByZXR1cm4ge2Rlc3RpbmF0aW9uOiBuZXdEZXN0aW5hdGlvbiArIGZlYXR1cmVQYXRoLCBuYW1lOiBzcGxpdHRlZE5hbWVbc3BsaXR0ZWROYW1lLmxlbmd0aCAtIDFdfTtcbn0iXX0=