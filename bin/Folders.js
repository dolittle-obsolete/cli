'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Folders = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {WeakMap<Folders, fs}
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var _fileSystem = new WeakMap();

/**
 * Represents helpers for working with folders
 */

var Folders = exports.Folders = function () {
    /**
     * Initializes a new instance of {folders}
     * @param {fs} fileSystem 
     */
    function Folders(fileSystem) {
        (0, _classCallCheck3.default)(this, Folders);

        _fileSystem.set(this, fileSystem);
    }

    /**
     * Copy one folder and its content recursively to a specified destination
     * @param {string} destination Destination path to copy to
     * @param {string} source Source path to copy from
     */


    (0, _createClass3.default)(Folders, [{
        key: 'copy',
        value: function copy(destination, source) {
            destination = _path2.default.normalize(destination);
            source = _path2.default.normalize(source);
            _fsExtra2.default.copySync(source, destination);
        }

        /**
         * Create a folder if it does not exist
         * @param {string} folderPath Name of the folder to make sure exists
         */

    }, {
        key: 'makeFolderIfNotExists',
        value: function makeFolderIfNotExists(folderPath) {
            folderPath = _path2.default.normalize(folderPath);
            try {
                _fileSystem.get(this).ensureDirSync(folderPath);
            } catch (err) {
                try {
                    var shell = require('shelljs');
                    shell.mkdir('-p', folderPath);
                } catch (err) {
                    this._logger.error('Could not create directory: ', folderPath);
                    throw 'Could not create directory';
                }
            }
        }

        /**
         * Get top level folders in a given path
         * @param {string} path 
         */

    }, {
        key: 'getFoldersIn',
        value: function getFoldersIn(folder) {
            folder = _path2.default.normalize(folder);
            var self = this;
            var results = [];
            _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
                var actualPath = _path2.default.resolve(folder, dirInner);
                var stat = _fileSystem.get(self).statSync(actualPath);
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

    }, {
        key: 'getFoldersInRegex',
        value: function getFoldersInRegex(folder, regularExp) {
            folder = _path2.default.normalize(folder);
            var self = this;
            var results = [];
            _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
                var actualPath = _path2.default.resolve(folder, dirInner);
                var stat = _fileSystem.get(self).statSync(actualPath);
                var regexMatch = _path2.default.parse(actualPath).name.match(regularExp);
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

    }, {
        key: 'getFilesRecursivelyIn',
        value: function getFilesRecursivelyIn(folder) {
            folder = _path2.default.normalize(folder);
            var self = this;
            var results = [];
            _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
                var actualPath = _path2.default.resolve(folder, dirInner);
                var stat = _fileSystem.get(self).statSync(actualPath);

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

    }, {
        key: 'getArtifactTemplateFilesRecursivelyIn',
        value: function getArtifactTemplateFilesRecursivelyIn(folder, templateFileNames) {
            folder = _path2.default.normalize(folder);
            var self = this;
            var results = [];
            _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
                var actualPath = _path2.default.resolve(folder, dirInner);
                var stat = _fileSystem.get(self).statSync(actualPath);
                if (stat.isDirectory()) {
                    results = results.concat(self.getFoldersAndFilesRecursivelyIn(actualPath));
                }
                if (stat.isFile()) {
                    var filename = _path2.default.basename(actualPath);
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

    }, {
        key: 'getFoldersAndFilesRecursivelyIn',
        value: function getFoldersAndFilesRecursivelyIn(folder) {
            folder = _path2.default.normalize(folder);
            var self = this;
            var results = [];
            _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
                var actualPath = _path2.default.resolve(folder, dirInner);
                var stat = _fileSystem.get(self).statSync(actualPath);

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

    }, {
        key: 'searchFolder',
        value: function searchFolder(folder, pattern) {
            folder = _path2.default.normalize(folder);
            var self = this;
            var results = [];

            _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
                dirInner = _path2.default.resolve(folder, dirInner);
                var stat = _fileSystem.get(self).statSync(dirInner);
                if (stat.isFile() && dirInner.endsWith(pattern)) {
                    results.push(dirInner);
                }
            });

            return results;
        }
        /**
         * Search for a specific file pattern within a folder with regex
         * @param {string} folder Folder to search from
         * @param {RegExp} regularExp The regex pattern of files to look for
         */

    }, {
        key: 'searchFolderRegex',
        value: function searchFolderRegex(folder, regularExp) {
            folder = _path2.default.normalize(folder);
            var self = this;
            var results = [];

            _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
                dirInner = _path2.default.resolve(folder, dirInner);
                var regexMatch = dirInner.match(regularExp);
                var stat = _fileSystem.get(self).statSync(dirInner);
                if (stat.isFile() && regexMatch && regexMatch.length > 0) {
                    results.push(dirInner);
                }
            });

            return results;
        }
        /**
         * Search for a specific file pattern within a folder, recursively
         * @param {string} folder Folder to search from
         * @param {string} pattern Pattern of files to look for
         * @returns {string[]} The paths of the matching files
         */

    }, {
        key: 'searchRecursive',
        value: function searchRecursive(folder, pattern) {
            folder = _path2.default.normalize(folder);
            var self = this;
            var results = [];

            _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
                dirInner = _path2.default.resolve(folder, dirInner);
                var stat = _fileSystem.get(self).statSync(dirInner);
                if (stat.isDirectory()) {
                    results = results.concat(self.searchRecursive(dirInner, pattern));
                }

                if (stat.isFile() && dirInner.endsWith(pattern)) {
                    results.push(dirInner);
                }
            });

            return results;
        }
        /**
         * Search for a specific file with regular expression, recursively
         * @param {string} folder to search from
         * @param {string} regularExp Pattern of the files to look for
         * @returns {string[]} the paths of the matching files 
         */

    }, {
        key: 'searchRecursiveRegex',
        value: function searchRecursiveRegex(folder, regularExp) {
            folder = _path2.default.normalize(folder);
            var self = this;
            var results = [];

            _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
                dirInner = _path2.default.resolve(folder, dirInner);
                var stat = _fileSystem.get(self).statSync(dirInner);
                if (stat.isDirectory()) {
                    results = results.concat(self.searchRecursiveRegex(dirInner, regularExp));
                }
                var regexMatch = dirInner.match(regularExp);
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

    }, {
        key: 'getNearestDirsSearchingUpwards',
        value: function getNearestDirsSearchingUpwards(folder, regularExp) {
            folder = _path2.default.normalize(folder);
            var results = [];
            while (this.isNotEmptyFolder(folder)) {
                var folders = this.getFoldersInRegex(folder, regularExp);
                if (folders.length > 0) results.push.apply(results, (0, _toConsumableArray3.default)(folders));
                folder = _path2.default.join(folder, '../');
                if (results.length > 0) break;
            }
            return results;
        }
        /**
         * Gets the path of the nearest file matching the regular expression, searching upwards
         * @param {string} folder the start folder
         * @param {RegExp} regularExp
         * @returns {string} path
         */

    }, {
        key: 'getNearestFileSearchingUpwards',
        value: function getNearestFileSearchingUpwards(folder, regularExp) {
            folder = _path2.default.normalize(folder);
            while (this.isNotEmptyFolder(folder)) {
                var results = this.searchFolderRegex(folder, regularExp);
                if (results.length >= 1) return results[0];
                folder = _path2.default.join(folder, '../');
            }
            return '';
        }
    }, {
        key: 'isNotEmptyFolder',
        value: function isNotEmptyFolder(folder) {
            return folder !== null && folder !== '' && folder !== _path2.default.sep;
        }
    }]);
    return Folders;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9Gb2xkZXJzLmpzIl0sIm5hbWVzIjpbIl9maWxlU3lzdGVtIiwiV2Vha01hcCIsIkZvbGRlcnMiLCJmaWxlU3lzdGVtIiwic2V0IiwiZGVzdGluYXRpb24iLCJzb3VyY2UiLCJwYXRoIiwibm9ybWFsaXplIiwiZnMiLCJjb3B5U3luYyIsImZvbGRlclBhdGgiLCJnZXQiLCJlbnN1cmVEaXJTeW5jIiwiZXJyIiwic2hlbGwiLCJyZXF1aXJlIiwibWtkaXIiLCJfbG9nZ2VyIiwiZXJyb3IiLCJmb2xkZXIiLCJzZWxmIiwicmVzdWx0cyIsInJlYWRkaXJTeW5jIiwiZm9yRWFjaCIsImRpcklubmVyIiwiYWN0dWFsUGF0aCIsInJlc29sdmUiLCJzdGF0Iiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsInB1c2giLCJyZWd1bGFyRXhwIiwicmVnZXhNYXRjaCIsInBhcnNlIiwibmFtZSIsIm1hdGNoIiwibGVuZ3RoIiwiY29uY2F0IiwiZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbiIsImlzRmlsZSIsInRlbXBsYXRlRmlsZU5hbWVzIiwiZmlsZW5hbWUiLCJiYXNlbmFtZSIsImluY2x1ZGVzIiwicGF0dGVybiIsImVuZHNXaXRoIiwic2VhcmNoUmVjdXJzaXZlIiwic2VhcmNoUmVjdXJzaXZlUmVnZXgiLCJpc05vdEVtcHR5Rm9sZGVyIiwiZm9sZGVycyIsImdldEZvbGRlcnNJblJlZ2V4Iiwiam9pbiIsInNlYXJjaEZvbGRlclJlZ2V4Iiwic2VwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7Ozs7QUFDQTs7Ozs7O0FBRUE7OztBQVBBOzs7O0FBVUEsSUFBTUEsY0FBYyxJQUFJQyxPQUFKLEVBQXBCOztBQUVBOzs7O0lBR2FDLE8sV0FBQUEsTztBQUVUOzs7O0FBSUEscUJBQVlDLFVBQVosRUFBd0I7QUFBQTs7QUFDcEJILG9CQUFZSSxHQUFaLENBQWdCLElBQWhCLEVBQXFCRCxVQUFyQjtBQUNIOztBQUVEOzs7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bUJBQU9BLFdBQVcsSUFBWCxJQUFtQkEsV0FBVyxFQUE5QixJQUFvQ0EsV0FBV2IsZUFBSytDLEdBQTNEO0FBQ0giLCJmaWxlIjoiRm9sZGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxGb2xkZXJzLCBmc31cbiAqL1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgaGVscGVycyBmb3Igd29ya2luZyB3aXRoIGZvbGRlcnNcbiAqL1xuZXhwb3J0IGNsYXNzIEZvbGRlcnNcbntcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Zm9sZGVyc31cbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZpbGVTeXN0ZW0pIHtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsZmlsZVN5c3RlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29weSBvbmUgZm9sZGVyIGFuZCBpdHMgY29udGVudCByZWN1cnNpdmVseSB0byBhIHNwZWNpZmllZCBkZXN0aW5hdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvbiBEZXN0aW5hdGlvbiBwYXRoIHRvIGNvcHkgdG9cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc291cmNlIFNvdXJjZSBwYXRoIHRvIGNvcHkgZnJvbVxuICAgICAqL1xuICAgIGNvcHkoZGVzdGluYXRpb24sIHNvdXJjZSlcbiAgICB7XG4gICAgICAgIGRlc3RpbmF0aW9uID0gcGF0aC5ub3JtYWxpemUoZGVzdGluYXRpb24pO1xuICAgICAgICBzb3VyY2UgPSBwYXRoLm5vcm1hbGl6ZShzb3VyY2UpO1xuICAgICAgICBmcy5jb3B5U3luYyhzb3VyY2UsIGRlc3RpbmF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBmb2xkZXIgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyUGF0aCBOYW1lIG9mIHRoZSBmb2xkZXIgdG8gbWFrZSBzdXJlIGV4aXN0c1xuICAgICAqL1xuICAgIG1ha2VGb2xkZXJJZk5vdEV4aXN0cyhmb2xkZXJQYXRoKVxuICAgIHtcbiAgICAgICAgZm9sZGVyUGF0aCA9IHBhdGgubm9ybWFsaXplKGZvbGRlclBhdGgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmVuc3VyZURpclN5bmMoZm9sZGVyUGF0aCk7XG4gICAgICAgIH0gY2F0Y2goZXJyKVxuICAgICAgICB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBzaGVsbCA9IHJlcXVpcmUoJ3NoZWxsanMnKTtcbiAgICAgICAgICAgICAgICBzaGVsbC5ta2RpcignLXAnLCBmb2xkZXJQYXRoKTtcbiAgICBcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcignQ291bGQgbm90IGNyZWF0ZSBkaXJlY3Rvcnk6ICcsZm9sZGVyUGF0aCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ0NvdWxkIG5vdCBjcmVhdGUgZGlyZWN0b3J5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0b3AgbGV2ZWwgZm9sZGVycyBpbiBhIGdpdmVuIHBhdGhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBcbiAgICAgKi9cbiAgICBnZXRGb2xkZXJzSW4oZm9sZGVyKSB7XG4gICAgICAgIGZvbGRlciA9IHBhdGgubm9ybWFsaXplKGZvbGRlcik7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRkaXJTeW5jKGZvbGRlcikuZm9yRWFjaChmdW5jdGlvbiAoZGlySW5uZXIpIHtcbiAgICAgICAgICAgIGxldCBhY3R1YWxQYXRoID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGFjdHVhbFBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRvcCBsZXZlbCBmb2xkZXJzIGluIGEgZ2l2ZW4gcGF0aFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgcGF0aCBcbiAgICAgKiBAcGFyYW0ge1JlZ0V4cH0gcmVndWxhckV4cFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gZm9sZGVyIHBhdGhzXG4gICAgICovXG4gICAgZ2V0Rm9sZGVyc0luUmVnZXgoZm9sZGVyLCByZWd1bGFyRXhwKSB7XG4gICAgICAgIGZvbGRlciA9IHBhdGgubm9ybWFsaXplKGZvbGRlcik7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRkaXJTeW5jKGZvbGRlcikuZm9yRWFjaChmdW5jdGlvbiAoZGlySW5uZXIpIHtcbiAgICAgICAgICAgIGxldCBhY3R1YWxQYXRoID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICBsZXQgcmVnZXhNYXRjaCA9IHBhdGgucGFyc2UoYWN0dWFsUGF0aCkubmFtZS5tYXRjaChyZWd1bGFyRXhwKTtcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkgJiYgcmVnZXhNYXRjaCAmJiByZWdleE1hdGNoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGZpbGVzIHdpdGhpbiBhIHNwZWNpZmljIGZvbGRlciByZWN1cnNpdmVseVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgUGF0aCBvZiB0aGUgZm9sZGVyIHRvIGdldCBmcm9tXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBBcnJheSBvZiBmaWxlc1xuICAgICAqL1xuICAgIGdldEZpbGVzUmVjdXJzaXZlbHlJbihmb2xkZXIpIHtcbiAgICAgICAgZm9sZGVyID0gcGF0aC5ub3JtYWxpemUoZm9sZGVyKTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZGRpclN5bmMoZm9sZGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJJbm5lcikge1xuICAgICAgICAgICAgbGV0IGFjdHVhbFBhdGggPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICBsZXQgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhhY3R1YWxQYXRoKTtcblxuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChzZWxmLmdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oYWN0dWFsUGF0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGZpbGVzIHdpdGhpbiBhIHNwZWNpZmljIGZvbGRlciByZWN1cnNpdmVseVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgUGF0aCBvZiB0aGUgZm9sZGVyIHRvIGdldCBmcm9tXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gdGVtcGxhdGVGaWxlTmFtZXMgVGhlIHRlbXBsYXRlIGZpbGUgbmFtZXNcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IEFycmF5IG9mIGZpbGVzXG4gICAgICovXG4gICAgZ2V0QXJ0aWZhY3RUZW1wbGF0ZUZpbGVzUmVjdXJzaXZlbHlJbihmb2xkZXIsIHRlbXBsYXRlRmlsZU5hbWVzKSB7XG4gICAgICAgIGZvbGRlciA9IHBhdGgubm9ybWFsaXplKGZvbGRlcik7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRkaXJTeW5jKGZvbGRlcikuZm9yRWFjaChmdW5jdGlvbiAoZGlySW5uZXIpIHtcbiAgICAgICAgICAgIGxldCBhY3R1YWxQYXRoID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KHNlbGYuZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbihhY3R1YWxQYXRoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZShhY3R1YWxQYXRoKTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGVGaWxlTmFtZXMuaW5jbHVkZXMoZmlsZW5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChhY3R1YWxQYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGZvbGRlcnMgYW5kIGZpbGVzIHdpdGhpbiBhIHNwZWNpZmljIGZvbGRlciByZWN1cnNpdmVseVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgUGF0aCBvZiB0aGUgZm9sZGVyIHRvIGdldCBmcm9tXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBBcnJheSBvZiBmaWxlcyBhbmQgZm9sZGVyc1xuICAgICAqL1xuICAgIGdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oZm9sZGVyKSB7XG4gICAgICAgIGZvbGRlciA9IHBhdGgubm9ybWFsaXplKGZvbGRlcik7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRkaXJTeW5jKGZvbGRlcikuZm9yRWFjaChmdW5jdGlvbiAoZGlySW5uZXIpIHtcbiAgICAgICAgICAgIGxldCBhY3R1YWxQYXRoID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoc2VsZi5nZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluKGFjdHVhbFBhdGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChhY3R1YWxQYXRoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3IgYSBzcGVjaWZpYyBmaWxlIHBhdHRlcm4gd2l0aGluIGEgZm9sZGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciBGb2xkZXIgdG8gc2VhcmNoIGZyb21cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0dGVybiBQYXR0ZXJuIG9mIGZpbGVzIHRvIGxvb2sgZm9yXG4gICAgICovXG4gICAgc2VhcmNoRm9sZGVyKGZvbGRlciwgcGF0dGVybikge1xuICAgICAgICBmb2xkZXIgPSBwYXRoLm5vcm1hbGl6ZShmb2xkZXIpO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRkaXJTeW5jKGZvbGRlcikuZm9yRWFjaChmdW5jdGlvbiAoZGlySW5uZXIpIHtcbiAgICAgICAgICAgIGRpcklubmVyID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgdmFyIHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoZGlySW5uZXIpO1xuICAgICAgICAgICAgaWYgKHN0YXQuaXNGaWxlKCkgJiYgZGlySW5uZXIuZW5kc1dpdGgocGF0dGVybikpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZGlySW5uZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VhcmNoIGZvciBhIHNwZWNpZmljIGZpbGUgcGF0dGVybiB3aXRoaW4gYSBmb2xkZXIgd2l0aCByZWdleFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgRm9sZGVyIHRvIHNlYXJjaCBmcm9tXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ3VsYXJFeHAgVGhlIHJlZ2V4IHBhdHRlcm4gb2YgZmlsZXMgdG8gbG9vayBmb3JcbiAgICAgKi9cbiAgICBzZWFyY2hGb2xkZXJSZWdleChmb2xkZXIsIHJlZ3VsYXJFeHApIHtcbiAgICAgICAgZm9sZGVyID0gcGF0aC5ub3JtYWxpemUoZm9sZGVyKTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkZGlyU3luYyhmb2xkZXIpLmZvckVhY2goZnVuY3Rpb24gKGRpcklubmVyKSB7XG4gICAgICAgICAgICBkaXJJbm5lciA9IHBhdGgucmVzb2x2ZShmb2xkZXIsIGRpcklubmVyKTtcbiAgICAgICAgICAgIGxldCByZWdleE1hdGNoID0gZGlySW5uZXIubWF0Y2gocmVndWxhckV4cCk7XG4gICAgICAgICAgICB2YXIgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhkaXJJbm5lcik7XG4gICAgICAgICAgICBpZiAoc3RhdC5pc0ZpbGUoKSAmJiByZWdleE1hdGNoICYmIHJlZ2V4TWF0Y2gubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChkaXJJbm5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggZm9yIGEgc3BlY2lmaWMgZmlsZSBwYXR0ZXJuIHdpdGhpbiBhIGZvbGRlciwgcmVjdXJzaXZlbHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIEZvbGRlciB0byBzZWFyY2ggZnJvbVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuIFBhdHRlcm4gb2YgZmlsZXMgdG8gbG9vayBmb3JcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IFRoZSBwYXRocyBvZiB0aGUgbWF0Y2hpbmcgZmlsZXNcbiAgICAgKi9cbiAgICBzZWFyY2hSZWN1cnNpdmUoZm9sZGVyLCBwYXR0ZXJuKSB7XG4gICAgICAgIGZvbGRlciA9IHBhdGgubm9ybWFsaXplKGZvbGRlcik7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZGRpclN5bmMoZm9sZGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJJbm5lcikge1xuICAgICAgICAgICAgZGlySW5uZXIgPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICB2YXIgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhkaXJJbm5lcik7XG4gICAgICAgICAgICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KHNlbGYuc2VhcmNoUmVjdXJzaXZlKGRpcklubmVyLCBwYXR0ZXJuKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGF0LmlzRmlsZSgpICYmIGRpcklubmVyLmVuZHNXaXRoKHBhdHRlcm4pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGRpcklubmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3IgYSBzcGVjaWZpYyBmaWxlIHdpdGggcmVndWxhciBleHByZXNzaW9uLCByZWN1cnNpdmVseVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgdG8gc2VhcmNoIGZyb21cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVndWxhckV4cCBQYXR0ZXJuIG9mIHRoZSBmaWxlcyB0byBsb29rIGZvclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gdGhlIHBhdGhzIG9mIHRoZSBtYXRjaGluZyBmaWxlcyBcbiAgICAgKi9cbiAgICBzZWFyY2hSZWN1cnNpdmVSZWdleChmb2xkZXIsIHJlZ3VsYXJFeHApIHtcbiAgICAgICAgZm9sZGVyID0gcGF0aC5ub3JtYWxpemUoZm9sZGVyKTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkZGlyU3luYyhmb2xkZXIpLmZvckVhY2goZnVuY3Rpb24gKGRpcklubmVyKSB7XG4gICAgICAgICAgICBkaXJJbm5lciA9IHBhdGgucmVzb2x2ZShmb2xkZXIsIGRpcklubmVyKTtcbiAgICAgICAgICAgIHZhciBzdGF0ID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnN0YXRTeW5jKGRpcklubmVyKTtcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoc2VsZi5zZWFyY2hSZWN1cnNpdmVSZWdleChkaXJJbm5lciwgcmVndWxhckV4cCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJlZ2V4TWF0Y2ggPSBkaXJJbm5lci5tYXRjaChyZWd1bGFyRXhwKTtcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRmlsZSgpICYmIHJlZ2V4TWF0Y2ggJiYgcmVnZXhNYXRjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGRpcklubmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBhdGhzIG9mIHRoZSBuZWFyZXN0IGRpcmVjdG9yaWVzIG1hdGNoaW5nIHRoZSByZWd1bGFyIGV4cHJlc3Npb24sIHNlYXJjaGluZyB1cHdhcmRzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciB0aGUgc3RhcnQgZm9sZGVyXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ3VsYXJFeHBcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IHBhdGhzXG4gICAgICovXG4gICAgZ2V0TmVhcmVzdERpcnNTZWFyY2hpbmdVcHdhcmRzKGZvbGRlciwgcmVndWxhckV4cCkge1xuICAgICAgICBmb2xkZXIgPSBwYXRoLm5vcm1hbGl6ZShmb2xkZXIpO1xuICAgICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgICB3aGlsZSAodGhpcy5pc05vdEVtcHR5Rm9sZGVyKGZvbGRlcikpIHtcbiAgICAgICAgICAgIGxldCBmb2xkZXJzID0gdGhpcy5nZXRGb2xkZXJzSW5SZWdleChmb2xkZXIsIHJlZ3VsYXJFeHApO1xuICAgICAgICAgICAgaWYgKGZvbGRlcnMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goLi4uZm9sZGVycyk7XG4gICAgICAgICAgICBmb2xkZXIgPSBwYXRoLmpvaW4oZm9sZGVyLCAnLi4vJyk7XG4gICAgICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwYXRoIG9mIHRoZSBuZWFyZXN0IGZpbGUgbWF0Y2hpbmcgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiwgc2VhcmNoaW5nIHVwd2FyZHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIHRoZSBzdGFydCBmb2xkZXJcbiAgICAgKiBAcGFyYW0ge1JlZ0V4cH0gcmVndWxhckV4cFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHBhdGhcbiAgICAgKi9cbiAgICBnZXROZWFyZXN0RmlsZVNlYXJjaGluZ1Vwd2FyZHMoZm9sZGVyLCByZWd1bGFyRXhwKSB7XG4gICAgICAgIGZvbGRlciA9IHBhdGgubm9ybWFsaXplKGZvbGRlcik7XG4gICAgICAgIHdoaWxlICh0aGlzLmlzTm90RW1wdHlGb2xkZXIoZm9sZGVyKSlcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSB0aGlzLnNlYXJjaEZvbGRlclJlZ2V4KGZvbGRlciwgcmVndWxhckV4cCk7IFxuICAgICAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID49IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHNbMF07XG4gICAgICAgICAgICBmb2xkZXIgPSBwYXRoLmpvaW4oZm9sZGVyLCAnLi4vJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGlzTm90RW1wdHlGb2xkZXIoZm9sZGVyKSB7XG4gICAgICAgIHJldHVybiBmb2xkZXIgIT09IG51bGwgJiYgZm9sZGVyICE9PSAnJyAmJiBmb2xkZXIgIT09IHBhdGguc2VwOyBcbiAgICB9XG4gICAgXG59XG4iXX0=