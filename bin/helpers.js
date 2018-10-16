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
    if (/^\.\.?$/.test(name)) {
        throw 'Argument parsing error. Invalid name';
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbImdldEZpbGVEaXJQYXRoIiwiZ2V0RmlsZU5hbWUiLCJnZXRGaWxlTmFtZUFuZEV4dGVuc2lvbiIsImdldEZpbGVEaXIiLCJ2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQiLCJ1c2FnZVByZWZpeCIsImZpbGVQYXRoIiwicGF0aCIsInJlcXVpcmUiLCJub3JtYWxpemUiLCJwYXJzZSIsImRpciIsIm5hbWUiLCJiYXNlIiwiZGlybmFtZSIsImluY2x1ZGVzIiwiYmFzZW5hbWUiLCJ0ZXN0Il0sIm1hcHBpbmdzIjoiOzs7OztRQWlCZ0JBLGMsR0FBQUEsYztRQVVBQyxXLEdBQUFBLFc7UUFVQUMsdUIsR0FBQUEsdUI7UUFVQUMsVSxHQUFBQSxVO1FBVUFDLHFCLEdBQUFBLHFCO0FBekRoQjs7Ozs7QUFLQTs7OztBQUlPLElBQU1DLG9DQUFjLE9BQXBCOztBQUdQOzs7OztBQUtPLFNBQVNMLGNBQVQsQ0FBd0JNLFFBQXhCLEVBQWtDO0FBQ3JDLFFBQU1DLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQ0FGLGVBQVdDLEtBQUtFLFNBQUwsQ0FBZUgsUUFBZixDQUFYO0FBQ0EsV0FBT0MsS0FBS0csS0FBTCxDQUFXSixRQUFYLEVBQXFCSyxHQUE1QjtBQUNIO0FBQ0Q7Ozs7O0FBS08sU0FBU1YsV0FBVCxDQUFxQkssUUFBckIsRUFBK0I7QUFDbEMsUUFBTUMsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFDQUYsZUFBV0MsS0FBS0UsU0FBTCxDQUFlSCxRQUFmLENBQVg7QUFDQSxXQUFPQyxLQUFLRyxLQUFMLENBQVdKLFFBQVgsRUFBcUJNLElBQTVCO0FBQ0g7QUFDRDs7Ozs7QUFLTyxTQUFTVix1QkFBVCxDQUFpQ0ksUUFBakMsRUFBMkM7QUFDOUMsUUFBTUMsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFDQUYsZUFBV0MsS0FBS0UsU0FBTCxDQUFlSCxRQUFmLENBQVg7QUFDQSxXQUFPQyxLQUFLRyxLQUFMLENBQVdKLFFBQVgsRUFBcUJPLElBQTVCO0FBQ0g7QUFDRDs7Ozs7QUFLTyxTQUFTVixVQUFULENBQW9CRyxRQUFwQixFQUE4QjtBQUNqQyxRQUFNQyxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUNBRixlQUFXQyxLQUFLRSxTQUFMLENBQWVILFFBQWYsQ0FBWDtBQUNBLFdBQU9DLEtBQUtPLE9BQUwsQ0FBYVIsUUFBYixDQUFQO0FBQ0g7O0FBRUQ7Ozs7QUFJTyxTQUFTRixxQkFBVCxDQUErQlEsSUFBL0IsRUFBcUM7QUFDeEMsUUFBTUwsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFDQSxRQUFJSSxLQUFLRyxRQUFMLENBQWMsR0FBZCxDQUFKLEVBQXdCO0FBQ3BCLGNBQU0sK0NBQU47QUFDSDtBQUNELFFBQUlILEtBQUtHLFFBQUwsQ0FBYyxHQUFkLENBQUosRUFBd0I7QUFDcEIsY0FBTSxtREFBTjtBQUNIO0FBQ0QsUUFBSUgsU0FBU0wsS0FBS1MsUUFBTCxDQUFjSixJQUFkLENBQWIsRUFBa0M7QUFDOUIsY0FBTSxzQ0FBTjtBQUNIO0FBQ0QsUUFBSSxVQUFVSyxJQUFWLENBQWVMLElBQWYsQ0FBSixFQUEwQjtBQUN0QixjQUFNLHNDQUFOO0FBQ0g7QUFDSiIsImZpbGUiOiJoZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFRoZSB1c2FnZSBwcmVmaXggdXNlZCBpbiBjb21tYW5kcyBpbmZvXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgdXNhZ2UgcHJlZml4XG4gKi9cbmV4cG9ydCBjb25zdCB1c2FnZVByZWZpeCA9ICdcXG5cXHQgJztcblxuXG4vKipcbiAqIEdldHMgdGhlIGZ1bGwgZGlyZWN0b3J5IHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aFxuICogQHJldHVybnMge3N0cmluZ30gZGlyZWN0b3J5IHBhdGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVEaXJQYXRoKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgICBmaWxlUGF0aCA9IHBhdGgubm9ybWFsaXplKGZpbGVQYXRoKTtcbiAgICByZXR1cm4gcGF0aC5wYXJzZShmaWxlUGF0aCkuZGlyO1xufVxuLyoqXG4gKiBHZXRzIHRoZSBmaWxlbmFtZSB3aXRob3V0IGV4dGVuc2lvblxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVQYXRoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBmaWxlbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsZU5hbWUoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgIGZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVQYXRoKS5uYW1lO1xufVxuLyoqXG4gKiBHZXRzIHRoZSBmaWxlbmFtZSB3aXRoIGV4dGVuc2lvblxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVQYXRoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBmaWxlbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsZU5hbWVBbmRFeHRlbnNpb24oZmlsZVBhdGgpIHtcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgIGZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVQYXRoKS5iYXNlO1xufVxuLyoqXG4gKiBHZXRzIHRoZSBkaXJlY3RvcnkgbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVQYXRoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBmaWxlIGRpcm5hbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVEaXIoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgIGZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgIHJldHVybiBwYXRoLmRpcm5hbWUoZmlsZVBhdGgpO1xufVxuXG4vKipcbiAqIFZhbGlkYXRlIHRoZSBuYW1lIGFyZ3VtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlQXJnc05hbWVJbnB1dChuYW1lKSB7XG4gICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgICBpZiAobmFtZS5pbmNsdWRlcygnICcpKSB7XG4gICAgICAgIHRocm93ICdBcmd1bWVudCBwYXJzaW5nIGVycm9yLiBOYW1lIGNvbnRhaW5lZCBzcGFjZXMnO1xuICAgIH1cbiAgICBpZiAobmFtZS5pbmNsdWRlcygnLScpKSB7XG4gICAgICAgIHRocm93ICdBcmd1bWVudCBwYXJzaW5nIGVycm9yLiBOYW1lIGNvbnRhaW5lZCBkYXNoZXMgKC0pJztcbiAgICB9XG4gICAgaWYgKG5hbWUgIT09IHBhdGguYmFzZW5hbWUobmFtZSkpIHtcbiAgICAgICAgdGhyb3cgJ0FyZ3VtZW50IHBhcnNpbmcgZXJyb3IuIEludmFsaWQgbmFtZSc7XG4gICAgfVxuICAgIGlmICgvXlxcLlxcLj8kLy50ZXN0KG5hbWUpKSB7XG4gICAgICAgIHRocm93ICdBcmd1bWVudCBwYXJzaW5nIGVycm9yLiBJbnZhbGlkIG5hbWUnO1xuICAgIH1cbn0iXX0=