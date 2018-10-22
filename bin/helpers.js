'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFileDirPath = getFileDirPath;
exports.getFileName = getFileName;
exports.getFileNameAndExtension = getFileNameAndExtension;
exports.getFileDir = getFileDir;
exports.validateArgsNameInput = validateArgsNameInput;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImdldEZpbGVEaXJQYXRoIiwiZ2V0RmlsZU5hbWUiLCJnZXRGaWxlTmFtZUFuZEV4dGVuc2lvbiIsImdldEZpbGVEaXIiLCJ2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQiLCJ1c2FnZVByZWZpeCIsImZpbGVQYXRoIiwicGF0aCIsInJlcXVpcmUiLCJub3JtYWxpemUiLCJwYXJzZSIsImRpciIsIm5hbWUiLCJiYXNlIiwiZGlybmFtZSIsImluY2x1ZGVzIiwiYmFzZW5hbWUiLCJ0ZXN0Il0sIm1hcHBpbmdzIjoiOzs7OztRQWlCZ0JBLGMsR0FBQUEsYztRQVVBQyxXLEdBQUFBLFc7UUFVQUMsdUIsR0FBQUEsdUI7UUFVQUMsVSxHQUFBQSxVO1FBU0FDLHFCLEdBQUFBLHFCO0FBeERoQjs7Ozs7QUFLQTs7OztBQUlPLElBQU1DLG9DQUFjLE9BQXBCOztBQUdQOzs7OztBQUtPLFNBQVNMLGNBQVQsQ0FBd0JNLFFBQXhCLEVBQWtDO0FBQ3JDLFFBQU1DLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQ0FGLGVBQVdDLEtBQUtFLFNBQUwsQ0FBZUgsUUFBZixDQUFYO0FBQ0EsV0FBT0MsS0FBS0csS0FBTCxDQUFXSixRQUFYLEVBQXFCSyxHQUE1QjtBQUNIO0FBQ0Q7Ozs7O0FBS08sU0FBU1YsV0FBVCxDQUFxQkssUUFBckIsRUFBK0I7QUFDbEMsUUFBTUMsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFDQUYsZUFBV0MsS0FBS0UsU0FBTCxDQUFlSCxRQUFmLENBQVg7QUFDQSxXQUFPQyxLQUFLRyxLQUFMLENBQVdKLFFBQVgsRUFBcUJNLElBQTVCO0FBQ0g7QUFDRDs7Ozs7QUFLTyxTQUFTVix1QkFBVCxDQUFpQ0ksUUFBakMsRUFBMkM7QUFDOUMsUUFBTUMsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFDQUYsZUFBV0MsS0FBS0UsU0FBTCxDQUFlSCxRQUFmLENBQVg7QUFDQSxXQUFPQyxLQUFLRyxLQUFMLENBQVdKLFFBQVgsRUFBcUJPLElBQTVCO0FBQ0g7QUFDRDs7Ozs7QUFLTyxTQUFTVixVQUFULENBQW9CRyxRQUFwQixFQUE4QjtBQUNqQyxRQUFNQyxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUNBRixlQUFXQyxLQUFLRSxTQUFMLENBQWVILFFBQWYsQ0FBWDtBQUNBLFdBQU9DLEtBQUtPLE9BQUwsQ0FBYVIsUUFBYixDQUFQO0FBQ0g7QUFDRDs7OztBQUlPLFNBQVNGLHFCQUFULENBQStCUSxJQUEvQixFQUFxQztBQUN4QyxRQUFNTCxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUNBLFFBQUlJLEtBQUtHLFFBQUwsQ0FBYyxHQUFkLENBQUosRUFBd0I7QUFDcEIsY0FBTSwrQ0FBTjtBQUNIO0FBQ0QsUUFBSUgsS0FBS0csUUFBTCxDQUFjLEdBQWQsQ0FBSixFQUF3QjtBQUNwQixjQUFNLG1EQUFOO0FBQ0g7QUFDRCxRQUFJSCxTQUFTTCxLQUFLUyxRQUFMLENBQWNKLElBQWQsQ0FBYixFQUFrQztBQUM5QixjQUFNLHNDQUFOO0FBQ0g7QUFDRCxRQUFJLFNBQVNLLElBQVQsQ0FBY0wsSUFBZCxDQUFKLEVBQXlCO0FBQ3JCLGNBQU0sc0NBQU47QUFDSDtBQUNKIiwiZmlsZSI6ImhlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogVGhlIHVzYWdlIHByZWZpeCB1c2VkIGluIGNvbW1hbmRzIGluZm9cbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSB1c2FnZSBwcmVmaXhcbiAqL1xuZXhwb3J0IGNvbnN0IHVzYWdlUHJlZml4ID0gJ1xcblxcdCAnO1xuXG5cbi8qKlxuICogR2V0cyB0aGUgZnVsbCBkaXJlY3RvcnkgcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVQYXRoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBkaXJlY3RvcnkgcGF0aFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsZURpclBhdGgoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgIGZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVQYXRoKS5kaXI7XG59XG4vKipcbiAqIEdldHMgdGhlIGZpbGVuYW1lIHdpdGhvdXQgZXh0ZW5zaW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGZpbGVuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlTmFtZShmaWxlUGF0aCkge1xuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gICAgZmlsZVBhdGggPSBwYXRoLm5vcm1hbGl6ZShmaWxlUGF0aCk7XG4gICAgcmV0dXJuIHBhdGgucGFyc2UoZmlsZVBhdGgpLm5hbWU7XG59XG4vKipcbiAqIEdldHMgdGhlIGZpbGVuYW1lIHdpdGggZXh0ZW5zaW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGZpbGVuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlTmFtZUFuZEV4dGVuc2lvbihmaWxlUGF0aCkge1xuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gICAgZmlsZVBhdGggPSBwYXRoLm5vcm1hbGl6ZShmaWxlUGF0aCk7XG4gICAgcmV0dXJuIHBhdGgucGFyc2UoZmlsZVBhdGgpLmJhc2U7XG59XG4vKipcbiAgKiBHZXRzIHRoZSBkaXJlY3RvcnkgbmFtZVxuICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aFxuICAqIEByZXR1cm5zIHtzdHJpbmd9IGZpbGUgZGlybmFtZVxuICAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVEaXIoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgIGZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgIHJldHVybiBwYXRoLmRpcm5hbWUoZmlsZVBhdGgpO1xufVxuLyoqXG4gKiBWYWxpZGF0ZSB0aGUgbmFtZSBhcmd1bWVudFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQobmFtZSkge1xuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gICAgaWYgKG5hbWUuaW5jbHVkZXMoJyAnKSkge1xuICAgICAgICB0aHJvdyAnQXJndW1lbnQgcGFyc2luZyBlcnJvci4gTmFtZSBjb250YWluZWQgc3BhY2VzJztcbiAgICB9XG4gICAgaWYgKG5hbWUuaW5jbHVkZXMoJy0nKSkge1xuICAgICAgICB0aHJvdyAnQXJndW1lbnQgcGFyc2luZyBlcnJvci4gTmFtZSBjb250YWluZWQgZGFzaGVzICgtKSc7XG4gICAgfVxuICAgIGlmIChuYW1lICE9PSBwYXRoLmJhc2VuYW1lKG5hbWUpKSB7XG4gICAgICAgIHRocm93ICdBcmd1bWVudCBwYXJzaW5nIGVycm9yLiBJbnZhbGlkIG5hbWUnO1xuICAgIH1cbiAgICBpZiAoL15cXC4qPyQvLnRlc3QobmFtZSkpIHtcbiAgICAgICAgdGhyb3cgJ0FyZ3VtZW50IHBhcnNpbmcgZXJyb3IuIEludmFsaWQgbmFtZSc7XG4gICAgfVxufSJdfQ==