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
            _fsExtra2.default.copySync(source, destination);
        }

        /**
         * Create a folder if it does not exist
         * @param {string} path Name of the folder to make sure exists
         */

    }, {
        key: 'makeFolderIfNotExists',
        value: function makeFolderIfNotExists(path) {
            var dir = path;

            if (!_fileSystem.get(this).existsSync(dir)) {
                _fileSystem.get(this).mkdirSync(dir);
            }
        }

        /**
         * Get top level folders in a given path
         * @param {string} path 
         */

    }, {
        key: 'getFoldersIn',
        value: function getFoldersIn(folder) {
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
         * @param {string} path 
         * @param {RegExp} regularExp
         * @returns {string[]} folder paths
         */

    }, {
        key: 'getFoldersInRegex',
        value: function getFoldersInRegex(folder, regularExp) {
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
            var self = this;
            var results = [];
            _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
                var actualPath = _path2.default.resolve(folder, dirInner);
                var stat = _fileSystem.get(self).statSync(actualPath);
                if (stat.isDirectory()) {
                    results = results.concat(self.getFoldersAndFilesRecursivelyIn(actualPath));
                }
                if (stat.isFile()) {
                    var lastPathSeparatorMatch = actualPath.match(/(\\|\/)/);
                    var lastIndex = actualPath.lastIndexOf(lastPathSeparatorMatch[lastPathSeparatorMatch.length - 1]);
                    var filename = actualPath.substring(lastIndex + 1, actualPath.length);
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
    }, {
        key: 'searchFolderRegex',

        /**
         * Search for a specific file pattern within a folder with regex
         * @param {string} folder Folder to search from
         * @param {RegExp} regularExp The regex pattern of files to look for
         */
        value: function searchFolderRegex(folder, regularExp) {
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
    }, {
        key: 'searchRecursive',

        /**
         * Search for a specific file pattern within a folder, recursively
         * @param {string} folder Folder to search from
         * @param {string} pattern Pattern of files to look for
         * @returns {string[]} The paths of the matching files
         */
        value: function searchRecursive(folder, pattern) {
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
    }, {
        key: 'searchRecursiveRegex',

        /**
         * Search for a specific file with regular expression, recursively
         * @param {string} folder to search from
         * @param {string} regularExp Pattern of the files to look for
         * @returns {string[]} the paths of the matching files 
         */
        value: function searchRecursiveRegex(folder, regularExp) {
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
            var results = [];
            while (folder !== null && folder !== '') {
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
            while (folder !== null && folder !== '') {
                var results = this.searchFolderRegex(folder, regularExp);
                if (results.length >= 1) return results[0];
                folder = _path2.default.join(folder, '../');
            }
            return '';
        }
    }]);
    return Folders;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9Gb2xkZXJzLmpzIl0sIm5hbWVzIjpbIl9maWxlU3lzdGVtIiwiV2Vha01hcCIsIkZvbGRlcnMiLCJmaWxlU3lzdGVtIiwic2V0IiwiZGVzdGluYXRpb24iLCJzb3VyY2UiLCJmcyIsImNvcHlTeW5jIiwicGF0aCIsImRpciIsImdldCIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJmb2xkZXIiLCJzZWxmIiwicmVzdWx0cyIsInJlYWRkaXJTeW5jIiwiZm9yRWFjaCIsImRpcklubmVyIiwiYWN0dWFsUGF0aCIsInJlc29sdmUiLCJzdGF0Iiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsInB1c2giLCJyZWd1bGFyRXhwIiwicmVnZXhNYXRjaCIsInBhcnNlIiwibmFtZSIsIm1hdGNoIiwibGVuZ3RoIiwiY29uY2F0IiwiZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbiIsImlzRmlsZSIsInRlbXBsYXRlRmlsZU5hbWVzIiwibGFzdFBhdGhTZXBhcmF0b3JNYXRjaCIsImxhc3RJbmRleCIsImxhc3RJbmRleE9mIiwiZmlsZW5hbWUiLCJzdWJzdHJpbmciLCJpbmNsdWRlcyIsInBhdHRlcm4iLCJlbmRzV2l0aCIsInNlYXJjaFJlY3Vyc2l2ZSIsInNlYXJjaFJlY3Vyc2l2ZVJlZ2V4IiwiZm9sZGVycyIsImdldEZvbGRlcnNJblJlZ2V4Iiwiam9pbiIsInNlYXJjaEZvbGRlclJlZ2V4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7Ozs7QUFDQTs7Ozs7O0FBTEE7Ozs7QUFPQSxJQUFNQSxjQUFjLElBQUlDLE9BQUosRUFBcEI7O0FBRUE7Ozs7SUFHYUMsTyxXQUFBQSxPO0FBRVQ7Ozs7QUFJQSxxQkFBWUMsVUFBWixFQUF3QjtBQUFBOztBQUNwQkgsb0JBQVlJLEdBQVosQ0FBZ0IsSUFBaEIsRUFBcUJELFVBQXJCO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs2QkFLS0UsVyxFQUFhQyxNLEVBQ2xCO0FBQ0lDLDhCQUFH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Ozs7Ozs7Ozt1REFNK0JGLE0sRUFBUVksVSxFQUFZO0FBQy9DLG1CQUFPWixXQUFXLElBQVgsSUFBbUJBLFdBQVcsRUFBckMsRUFDQTtBQUNJLG9CQUFJRSxVQUFVLEtBQUtpQyxpQkFBTCxDQUF1Qm5DLE1BQXZCLEVBQStCWSxVQUEvQixDQUFkO0FBQ0Esb0JBQUlWLFFBQVFlLE1BQVIsSUFBa0IsQ0FBdEIsRUFDSSxPQUFPZixRQUFRLENBQVIsQ0FBUDtBQUNKRix5QkFBU0wsZUFBS3VDLElBQUwsQ0FBVWxDLE1BQVYsRUFBa0IsS0FBbEIsQ0FBVDtBQUNIO0FBQ0QsbUJBQU8sRUFBUDtBQUNIIiwiZmlsZSI6IkZvbGRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGhlbHBlcnMgZm9yIHdvcmtpbmcgd2l0aCBmb2xkZXJzXG4gKi9cbmV4cG9ydCBjbGFzcyBGb2xkZXJzXG57XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge2ZvbGRlcnN9XG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihmaWxlU3lzdGVtKSB7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLGZpbGVTeXN0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvcHkgb25lIGZvbGRlciBhbmQgaXRzIGNvbnRlbnQgcmVjdXJzaXZlbHkgdG8gYSBzcGVjaWZpZWQgZGVzdGluYXRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb24gRGVzdGluYXRpb24gcGF0aCB0byBjb3B5IHRvXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBTb3VyY2UgcGF0aCB0byBjb3B5IGZyb21cbiAgICAgKi9cbiAgICBjb3B5KGRlc3RpbmF0aW9uLCBzb3VyY2UpXG4gICAge1xuICAgICAgICBmcy5jb3B5U3luYyhzb3VyY2UsIGRlc3RpbmF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBmb2xkZXIgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBOYW1lIG9mIHRoZSBmb2xkZXIgdG8gbWFrZSBzdXJlIGV4aXN0c1xuICAgICAqL1xuICAgIG1ha2VGb2xkZXJJZk5vdEV4aXN0cyhwYXRoKVxuICAgIHtcbiAgICAgICAgdmFyIGRpciA9IHBhdGg7XG5cbiAgICAgICAgaWYgKCFfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhkaXIpKXtcbiAgICAgICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5ta2RpclN5bmMoZGlyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0b3AgbGV2ZWwgZm9sZGVycyBpbiBhIGdpdmVuIHBhdGhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBcbiAgICAgKi9cbiAgICBnZXRGb2xkZXJzSW4oZm9sZGVyKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRkaXJTeW5jKGZvbGRlcikuZm9yRWFjaChmdW5jdGlvbiAoZGlySW5uZXIpIHtcbiAgICAgICAgICAgIGxldCBhY3R1YWxQYXRoID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGFjdHVhbFBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRvcCBsZXZlbCBmb2xkZXJzIGluIGEgZ2l2ZW4gcGF0aFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByZWd1bGFyRXhwXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBmb2xkZXIgcGF0aHNcbiAgICAgKi9cbiAgICBnZXRGb2xkZXJzSW5SZWdleChmb2xkZXIsIHJlZ3VsYXJFeHApIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZGRpclN5bmMoZm9sZGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJJbm5lcikge1xuICAgICAgICAgICAgbGV0IGFjdHVhbFBhdGggPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICBsZXQgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhhY3R1YWxQYXRoKTtcbiAgICAgICAgICAgIGxldCByZWdleE1hdGNoID0gcGF0aC5wYXJzZShhY3R1YWxQYXRoKS5uYW1lLm1hdGNoKHJlZ3VsYXJFeHApO1xuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSAmJiByZWdleE1hdGNoICYmIHJlZ2V4TWF0Y2gubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChhY3R1YWxQYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZmlsZXMgd2l0aGluIGEgc3BlY2lmaWMgZm9sZGVyIHJlY3Vyc2l2ZWx5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciBQYXRoIG9mIHRoZSBmb2xkZXIgdG8gZ2V0IGZyb21cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IEFycmF5IG9mIGZpbGVzXG4gICAgICovXG4gICAgZ2V0RmlsZXNSZWN1cnNpdmVseUluKGZvbGRlcikge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCByZXN1bHRzID0gW107XG4gICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkZGlyU3luYyhmb2xkZXIpLmZvckVhY2goZnVuY3Rpb24gKGRpcklubmVyKSB7XG4gICAgICAgICAgICBsZXQgYWN0dWFsUGF0aCA9IHBhdGgucmVzb2x2ZShmb2xkZXIsIGRpcklubmVyKTtcbiAgICAgICAgICAgIGxldCBzdGF0ID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnN0YXRTeW5jKGFjdHVhbFBhdGgpO1xuXG4gICAgICAgICAgICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KHNlbGYuZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbihhY3R1YWxQYXRoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdC5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChhY3R1YWxQYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZmlsZXMgd2l0aGluIGEgc3BlY2lmaWMgZm9sZGVyIHJlY3Vyc2l2ZWx5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciBQYXRoIG9mIHRoZSBmb2xkZXIgdG8gZ2V0IGZyb21cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSB0ZW1wbGF0ZUZpbGVOYW1lcyBUaGUgdGVtcGxhdGUgZmlsZSBuYW1lc1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gQXJyYXkgb2YgZmlsZXNcbiAgICAgKi9cbiAgICBnZXRBcnRpZmFjdFRlbXBsYXRlRmlsZXNSZWN1cnNpdmVseUluKGZvbGRlciwgdGVtcGxhdGVGaWxlTmFtZXMpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZGRpclN5bmMoZm9sZGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJJbm5lcikge1xuICAgICAgICAgICAgbGV0IGFjdHVhbFBhdGggPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICBsZXQgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhhY3R1YWxQYXRoKTtcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoc2VsZi5nZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluKGFjdHVhbFBhdGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGF0LmlzRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFBhdGhTZXBhcmF0b3JNYXRjaCA9IGFjdHVhbFBhdGgubWF0Y2goLyhcXFxcfFxcLykvKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBhY3R1YWxQYXRoLmxhc3RJbmRleE9mKGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2hbbGFzdFBhdGhTZXBhcmF0b3JNYXRjaC5sZW5ndGgtMV0pXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZW5hbWUgPSBhY3R1YWxQYXRoLnN1YnN0cmluZyhsYXN0SW5kZXgrMSwgYWN0dWFsUGF0aC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZUZpbGVOYW1lcy5pbmNsdWRlcyhmaWxlbmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGFjdHVhbFBhdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZm9sZGVycyBhbmQgZmlsZXMgd2l0aGluIGEgc3BlY2lmaWMgZm9sZGVyIHJlY3Vyc2l2ZWx5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciBQYXRoIG9mIHRoZSBmb2xkZXIgdG8gZ2V0IGZyb21cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IEFycmF5IG9mIGZpbGVzIGFuZCBmb2xkZXJzXG4gICAgICovXG4gICAgZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbihmb2xkZXIpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZGRpclN5bmMoZm9sZGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJJbm5lcikge1xuICAgICAgICAgICAgbGV0IGFjdHVhbFBhdGggPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICBsZXQgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhhY3R1YWxQYXRoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChzZWxmLmdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oYWN0dWFsUGF0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGFjdHVhbFBhdGgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VhcmNoIGZvciBhIHNwZWNpZmljIGZpbGUgcGF0dGVybiB3aXRoaW4gYSBmb2xkZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIEZvbGRlciB0byBzZWFyY2ggZnJvbVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuIFBhdHRlcm4gb2YgZmlsZXMgdG8gbG9vayBmb3JcbiAgICAgKi9cbiAgICBzZWFyY2hGb2xkZXIoZm9sZGVyLCBwYXR0ZXJuKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZGRpclN5bmMoZm9sZGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJJbm5lcikge1xuICAgICAgICAgICAgZGlySW5uZXIgPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICB2YXIgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhkaXJJbm5lcik7XG4gICAgICAgICAgICBpZiAoc3RhdC5pc0ZpbGUoKSAmJiBkaXJJbm5lci5lbmRzV2l0aChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChkaXJJbm5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2VhcmNoIGZvciBhIHNwZWNpZmljIGZpbGUgcGF0dGVybiB3aXRoaW4gYSBmb2xkZXIgd2l0aCByZWdleFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgRm9sZGVyIHRvIHNlYXJjaCBmcm9tXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ3VsYXJFeHAgVGhlIHJlZ2V4IHBhdHRlcm4gb2YgZmlsZXMgdG8gbG9vayBmb3JcbiAgICAgKi9cbiAgICBzZWFyY2hGb2xkZXJSZWdleChmb2xkZXIsIHJlZ3VsYXJFeHApIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkZGlyU3luYyhmb2xkZXIpLmZvckVhY2goZnVuY3Rpb24gKGRpcklubmVyKSB7XG4gICAgICAgICAgICBkaXJJbm5lciA9IHBhdGgucmVzb2x2ZShmb2xkZXIsIGRpcklubmVyKTtcbiAgICAgICAgICAgIGxldCByZWdleE1hdGNoID0gZGlySW5uZXIubWF0Y2gocmVndWxhckV4cCk7XG4gICAgICAgICAgICB2YXIgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhkaXJJbm5lcik7XG4gICAgICAgICAgICBpZiAoc3RhdC5pc0ZpbGUoKSAmJiByZWdleE1hdGNoICYmIHJlZ2V4TWF0Y2gubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChkaXJJbm5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2VhcmNoIGZvciBhIHNwZWNpZmljIGZpbGUgcGF0dGVybiB3aXRoaW4gYSBmb2xkZXIsIHJlY3Vyc2l2ZWx5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciBGb2xkZXIgdG8gc2VhcmNoIGZyb21cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0dGVybiBQYXR0ZXJuIG9mIGZpbGVzIHRvIGxvb2sgZm9yXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBUaGUgcGF0aHMgb2YgdGhlIG1hdGNoaW5nIGZpbGVzXG4gICAgICovXG4gICAgc2VhcmNoUmVjdXJzaXZlKGZvbGRlciwgcGF0dGVybikge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRkaXJTeW5jKGZvbGRlcikuZm9yRWFjaChmdW5jdGlvbiAoZGlySW5uZXIpIHtcbiAgICAgICAgICAgIGRpcklubmVyID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgdmFyIHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoZGlySW5uZXIpO1xuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChzZWxmLnNlYXJjaFJlY3Vyc2l2ZShkaXJJbm5lciwgcGF0dGVybikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhdC5pc0ZpbGUoKSAmJiBkaXJJbm5lci5lbmRzV2l0aChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChkaXJJbm5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2VhcmNoIGZvciBhIHNwZWNpZmljIGZpbGUgd2l0aCByZWd1bGFyIGV4cHJlc3Npb24sIHJlY3Vyc2l2ZWx5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciB0byBzZWFyY2ggZnJvbVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWd1bGFyRXhwIFBhdHRlcm4gb2YgdGhlIGZpbGVzIHRvIGxvb2sgZm9yXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSB0aGUgcGF0aHMgb2YgdGhlIG1hdGNoaW5nIGZpbGVzIFxuICAgICAqL1xuICAgIHNlYXJjaFJlY3Vyc2l2ZVJlZ2V4KGZvbGRlciwgcmVndWxhckV4cCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRkaXJTeW5jKGZvbGRlcikuZm9yRWFjaChmdW5jdGlvbiAoZGlySW5uZXIpIHtcbiAgICAgICAgICAgIGRpcklubmVyID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgdmFyIHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoZGlySW5uZXIpO1xuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChzZWxmLnNlYXJjaFJlY3Vyc2l2ZVJlZ2V4KGRpcklubmVyLCByZWd1bGFyRXhwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVnZXhNYXRjaCA9IGRpcklubmVyLm1hdGNoKHJlZ3VsYXJFeHApO1xuICAgICAgICAgICAgaWYgKHN0YXQuaXNGaWxlKCkgJiYgcmVnZXhNYXRjaCAmJiByZWdleE1hdGNoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZGlySW5uZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcGF0aHMgb2YgdGhlIG5lYXJlc3QgZGlyZWN0b3JpZXMgbWF0Y2hpbmcgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiwgc2VhcmNoaW5nIHVwd2FyZHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIHRoZSBzdGFydCBmb2xkZXJcbiAgICAgKiBAcGFyYW0ge1JlZ0V4cH0gcmVndWxhckV4cFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gcGF0aHNcbiAgICAgKi9cbiAgICBnZXROZWFyZXN0RGlyc1NlYXJjaGluZ1Vwd2FyZHMoZm9sZGVyLCByZWd1bGFyRXhwKSB7XG4gICAgICAgIGxldCByZXN1bHRzID0gW107XG4gICAgICAgIHdoaWxlIChmb2xkZXIgIT09IG51bGwgJiYgZm9sZGVyICE9PSAnJykge1xuICAgICAgICAgICAgbGV0IGZvbGRlcnMgPSB0aGlzLmdldEZvbGRlcnNJblJlZ2V4KGZvbGRlciwgcmVndWxhckV4cCk7XG4gICAgICAgICAgICBpZiAoZm9sZGVycy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCguLi5mb2xkZXJzKTtcbiAgICAgICAgICAgIGZvbGRlciA9IHBhdGguam9pbihmb2xkZXIsICcuLi8nKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBhdGggb2YgdGhlIG5lYXJlc3QgZmlsZSBtYXRjaGluZyB0aGUgcmVndWxhciBleHByZXNzaW9uLCBzZWFyY2hpbmcgdXB3YXJkc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgdGhlIHN0YXJ0IGZvbGRlclxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByZWd1bGFyRXhwXG4gICAgICogQHJldHVybnMge3N0cmluZ30gcGF0aFxuICAgICAqL1xuICAgIGdldE5lYXJlc3RGaWxlU2VhcmNoaW5nVXB3YXJkcyhmb2xkZXIsIHJlZ3VsYXJFeHApIHtcbiAgICAgICAgd2hpbGUgKGZvbGRlciAhPT0gbnVsbCAmJiBmb2xkZXIgIT09ICcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0cyA9IHRoaXMuc2VhcmNoRm9sZGVyUmVnZXgoZm9sZGVyLCByZWd1bGFyRXhwKTsgXG4gICAgICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPj0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0c1swXTtcbiAgICAgICAgICAgIGZvbGRlciA9IHBhdGguam9pbihmb2xkZXIsICcuLi8nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIFxufVxuIl19