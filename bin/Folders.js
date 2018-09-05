'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Folders = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*---------------------------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) Dolittle. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *--------------------------------------------------------------------------------------------*/


var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        _classCallCheck(this, Folders);

        _fileSystem.set(this, fileSystem);
    }

    /**
     * Copy one folder and its content recursively to a specified destination
     * @param {string} destination Destination path to copy to
     * @param {string} source Source path to copy from
     */


    _createClass(Folders, [{
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

            if (!_fsExtra2.default.existsSync(dir)) {
                _fsExtra2.default.mkdirSync(dir);
            }
        }

        /**
         * Get top level folders in a given path
         * @param {string} path 
         */

    }, {
        key: 'getFoldersIn',
        value: function getFoldersIn(folder) {
            var results = [];
            _fsExtra2.default.readdirSync(folder).forEach(function (dirInner) {
                var actualPath = _path2.default.resolve(folder, dirInner);
                var stat = _fsExtra2.default.statSync(actualPath);
                if (stat.isDirectory()) {
                    results.push(actualPath);
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
            _fsExtra2.default.readdirSync(folder).forEach(function (dirInner) {
                var actualPath = _path2.default.resolve(folder, dirInner);
                var stat = _fsExtra2.default.statSync(actualPath);

                if (stat.isDirectory()) {
                    results = results.concat(self.getFoldersAndFilesRecursivelyIn(actualPath));
                }
                results.push(actualPath);
            });
            return results;
        }

        /**
         * Search for a specific file pattern within a folder, recursively
         * @param {string} folder Folder to search from
         * @param {string} pattern Pattern of files to look for
         */

    }, {
        key: 'searchRecursive',
        value: function searchRecursive(folder, pattern) {
            var results = [];

            _fsExtra2.default.readdirSync(folder).forEach(function (dirInner) {
                dirInner = _path2.default.resolve(folder, dirInner);
                var stat = _fsExtra2.default.statSync(dirInner);

                if (stat.isDirectory()) {
                    results = results.concat(this.SearchRecursive(dirInner, pattern));
                }

                if (stat.isFile() && dirInner.endsWith(pattern)) {
                    results.push(dirInner);
                }
            });

            return results;
        }
    }]);

    return Folders;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9Gb2xkZXJzLmpzIl0sIm5hbWVzIjpbIl9maWxlU3lzdGVtIiwiV2Vha01hcCIsIkZvbGRlcnMiLCJmaWxlU3lzdGVtIiwic2V0IiwiZGVzdGluYXRpb24iLCJzb3VyY2UiLCJmcyIsImNvcHlTeW5jIiwicGF0aCIsImRpciIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJmb2xkZXIiLCJyZXN1bHRzIiwicmVhZGRpclN5bmMiLCJmb3JFYWNoIiwiZGlySW5uZXIiLCJhY3R1YWxQYXRoIiwicmVzb2x2ZSIsInN0YXQiLCJzdGF0U3luYyIsImlzRGlyZWN0b3J5IiwicHVzaCIsInNlbGYiLCJjb25jYXQiLCJnZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluIiwicGF0dGVybiIsIlNlYXJjaFJlY3Vyc2l2ZSIsImlzRmlsZSIsImVuZHNXaXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FqQkFBQTs7Ozs7O0FBSUE7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxjQUFjLElBQUlDLE9BQUosRUFBcEI7O0FBRUE7Ozs7SUFHYUMsTyxXQUFBQSxPO0FBRVQ7Ozs7QUFJQSxxQkFBWUMsVUFBWixFQUF3QjtBQUFBOztBQUNwQkgsb0JBQVlJLEdBQVosQ0FBZ0IsSUFBaEIsRUFBcUJELFVBQXJCO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs2QkFLS0UsVyxFQUFhQyxNLEVBQ2xCO0FBQ0lDLDhCQUFHQyxRQUFILENBQVlGLE1BQVosRUFBb0JELFdBQXBCO0FBQ0g7O0FBRUQ7Ozs7Ozs7OENBSXNCSSxJLEVBQ3RCO0FBQ0ksZ0JBQUlDLE1BQU1ELElBQVY7O0FBRUEsZ0JBQUksQ0FBQ0Ysa0JBQUdJLFVBQUgsQ0FBY0QsR0FBZCxDQUFMLEVBQXdCO0FBQ3BCSCxrQ0FBR0ssU0FBSCxDQUFhRixHQUFiO0FBQ0g7QUFDSjs7QUFFRDs7Ozs7OztxQ0FJYUcsTSxFQUFRO0FBQ2pCLGdCQUFJQyxVQUFVLEVBQWQ7QUFDQVAsOEJBQUdRLFdBQUgsQ0FBZUYsTUFBZixFQUF1QkcsT0FBdkIsQ0FBK0IsVUFBVUMsUUFBVixFQUFvQjtBQUMvQyxvQkFBSUMsYUFBYVQsZUFBS1UsT0FBTCxDQUFhTixNQUFiLEVBQXFCSSxRQUFyQixDQUFqQjtBQUNBLG9CQUFJRyxPQUFPYixrQkFBR2MsUUFBSCxDQUFZSCxVQUFaLENBQVg7QUFDQSxvQkFBSUUsS0FBS0UsV0FBTCxFQUFKLEVBQXdCO0FBQ3BCUiw0QkFBUVMsSUFBUixDQUFhTCxVQUFiO0FBQ0g7QUFDSixhQU5EO0FBT0EsbUJBQU9KLE9BQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7d0RBS2dDRCxNLEVBQVE7QUFDcEMsZ0JBQUlXLE9BQU8sSUFBWDtBQUNBLGdCQUFJVixVQUFVLEVBQWQ7QUFDQVAsOEJBQUdRLFdBQUgsQ0FBZUYsTUFBZixFQUF1QkcsT0FBdkIsQ0FBK0IsVUFBVUMsUUFBVixFQUFvQjtBQUMvQyxvQkFBSUMsYUFBYVQsZUFBS1UsT0FBTCxDQUFhTixNQUFiLEVBQXFCSSxRQUFyQixDQUFqQjtBQUNBLG9CQUFJRyxPQUFPYixrQkFBR2MsUUFBSCxDQUFZSCxVQUFaLENBQVg7O0FBRUEsb0JBQUlFLEtBQUtFLFdBQUwsRUFBSixFQUF3QjtBQUNwQlIsOEJBQVVBLFFBQVFXLE1BQVIsQ0FBZUQsS0FBS0UsK0JBQUwsQ0FBcUNSLFVBQXJDLENBQWYsQ0FBVjtBQUNIO0FBQ0RKLHdCQUFRUyxJQUFSLENBQWFMLFVBQWI7QUFDSCxhQVJEO0FBU0EsbUJBQU9KLE9BQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7d0NBS2dCRCxNLEVBQVFjLE8sRUFBUztBQUM3QixnQkFBSWIsVUFBVSxFQUFkOztBQUVBUCw4QkFBR1EsV0FBSCxDQUFlRixNQUFmLEVBQXVCRyxPQUF2QixDQUErQixVQUFVQyxRQUFWLEVBQW9CO0FBQy9DQSwyQkFBV1IsZUFBS1UsT0FBTCxDQUFhTixNQUFiLEVBQXFCSSxRQUFyQixDQUFYO0FBQ0Esb0JBQUlHLE9BQU9iLGtCQUFHYyxRQUFILENBQVlKLFFBQVosQ0FBWDs7QUFFQSxvQkFBSUcsS0FBS0UsV0FBTCxFQUFKLEVBQXdCO0FBQ3BCUiw4QkFBVUEsUUFBUVcsTUFBUixDQUFlLEtBQUtHLGVBQUwsQ0FBcUJYLFFBQXJCLEVBQStCVSxPQUEvQixDQUFmLENBQVY7QUFDSDs7QUFFRCxvQkFBSVAsS0FBS1MsTUFBTCxNQUFpQlosU0FBU2EsUUFBVCxDQUFrQkgsT0FBbEIsQ0FBckIsRUFBaUQ7QUFDN0NiLDRCQUFRUyxJQUFSLENBQWFOLFFBQWI7QUFDSDtBQUNKLGFBWEQ7O0FBYUEsbUJBQU9ILE9BQVA7QUFDSCIsImZpbGUiOiJGb2xkZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogUmVwcmVzZW50cyBoZWxwZXJzIGZvciB3b3JraW5nIHdpdGggZm9sZGVyc1xuICovXG5leHBvcnQgY2xhc3MgRm9sZGVyc1xue1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtmb2xkZXJzfVxuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW0gXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZmlsZVN5c3RlbSkge1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcyxmaWxlU3lzdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3B5IG9uZSBmb2xkZXIgYW5kIGl0cyBjb250ZW50IHJlY3Vyc2l2ZWx5IHRvIGEgc3BlY2lmaWVkIGRlc3RpbmF0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uIERlc3RpbmF0aW9uIHBhdGggdG8gY29weSB0b1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2UgU291cmNlIHBhdGggdG8gY29weSBmcm9tXG4gICAgICovXG4gICAgY29weShkZXN0aW5hdGlvbiwgc291cmNlKVxuICAgIHtcbiAgICAgICAgZnMuY29weVN5bmMoc291cmNlLCBkZXN0aW5hdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgZm9sZGVyIGlmIGl0IGRvZXMgbm90IGV4aXN0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggTmFtZSBvZiB0aGUgZm9sZGVyIHRvIG1ha2Ugc3VyZSBleGlzdHNcbiAgICAgKi9cbiAgICBtYWtlRm9sZGVySWZOb3RFeGlzdHMocGF0aClcbiAgICB7XG4gICAgICAgIHZhciBkaXIgPSBwYXRoO1xuXG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXIpKXtcbiAgICAgICAgICAgIGZzLm1rZGlyU3luYyhkaXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRvcCBsZXZlbCBmb2xkZXJzIGluIGEgZ2l2ZW4gcGF0aFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFxuICAgICAqL1xuICAgIGdldEZvbGRlcnNJbihmb2xkZXIpIHtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZnMucmVhZGRpclN5bmMoZm9sZGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJJbm5lcikge1xuICAgICAgICAgICAgbGV0IGFjdHVhbFBhdGggPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICBsZXQgc3RhdCA9IGZzLnN0YXRTeW5jKGFjdHVhbFBhdGgpO1xuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChhY3R1YWxQYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZm9sZGVycyBhbmQgZmlsZXMgd2l0aGluIGEgc3BlY2lmaWMgZm9sZGVyIHJlY3Vyc2l2ZWx5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciBQYXRoIG9mIHRoZSBmb2xkZXIgdG8gZ2V0IGZyb21cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IEFycmF5IG9mIGZpbGVzIGFuZCBmb2xkZXJzXG4gICAgICovXG4gICAgZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbihmb2xkZXIpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmcy5yZWFkZGlyU3luYyhmb2xkZXIpLmZvckVhY2goZnVuY3Rpb24gKGRpcklubmVyKSB7XG4gICAgICAgICAgICBsZXQgYWN0dWFsUGF0aCA9IHBhdGgucmVzb2x2ZShmb2xkZXIsIGRpcklubmVyKTtcbiAgICAgICAgICAgIGxldCBzdGF0ID0gZnMuc3RhdFN5bmMoYWN0dWFsUGF0aCk7XG5cbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoc2VsZi5nZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluKGFjdHVhbFBhdGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChhY3R1YWxQYXRoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3IgYSBzcGVjaWZpYyBmaWxlIHBhdHRlcm4gd2l0aGluIGEgZm9sZGVyLCByZWN1cnNpdmVseVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgRm9sZGVyIHRvIHNlYXJjaCBmcm9tXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm4gUGF0dGVybiBvZiBmaWxlcyB0byBsb29rIGZvclxuICAgICAqL1xuICAgIHNlYXJjaFJlY3Vyc2l2ZShmb2xkZXIsIHBhdHRlcm4pIHtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICAgICAgICBmcy5yZWFkZGlyU3luYyhmb2xkZXIpLmZvckVhY2goZnVuY3Rpb24gKGRpcklubmVyKSB7XG4gICAgICAgICAgICBkaXJJbm5lciA9IHBhdGgucmVzb2x2ZShmb2xkZXIsIGRpcklubmVyKTtcbiAgICAgICAgICAgIHZhciBzdGF0ID0gZnMuc3RhdFN5bmMoZGlySW5uZXIpO1xuXG4gICAgICAgICAgICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KHRoaXMuU2VhcmNoUmVjdXJzaXZlKGRpcklubmVyLCBwYXR0ZXJuKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGF0LmlzRmlsZSgpICYmIGRpcklubmVyLmVuZHNXaXRoKHBhdHRlcm4pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGRpcklubmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcbn1cbiJdfQ==