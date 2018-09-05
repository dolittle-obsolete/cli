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
            _fileSystem.get(this).copySync(source, destination);
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
         * Search for a specific file pattern within a folder, recursively
         * @param {string} folder Folder to search from
         * @param {string} pattern Pattern of files to look for
         */

    }, {
        key: 'searchRecursive',
        value: function searchRecursive(folder, pattern) {
            var self = this;
            var results = [];

            _fileSystem.get(this).readdirSync(folder).forEach(function (dirInner) {
                dirInner = _path2.default.resolve(folder, dirInner);
                var stat = _fileSystem.get(self).statSync(dirInner);

                if (stat.isDirectory()) {
                    results = results.concat(self.SearchRecursive(dirInner, pattern));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9Gb2xkZXJzLmpzIl0sIm5hbWVzIjpbIl9maWxlU3lzdGVtIiwiV2Vha01hcCIsIkZvbGRlcnMiLCJmaWxlU3lzdGVtIiwic2V0IiwiZGVzdGluYXRpb24iLCJzb3VyY2UiLCJnZXQiLCJjb3B5U3luYyIsInBhdGgiLCJkaXIiLCJleGlzdHNTeW5jIiwibWtkaXJTeW5jIiwiZm9sZGVyIiwic2VsZiIsInJlc3VsdHMiLCJyZWFkZGlyU3luYyIsImZvckVhY2giLCJkaXJJbm5lciIsImFjdHVhbFBhdGgiLCJyZXNvbHZlIiwic3RhdCIsInN0YXRTeW5jIiwiaXNEaXJlY3RvcnkiLCJwdXNoIiwiY29uY2F0IiwiZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbiIsInBhdHRlcm4iLCJTZWFyY2hSZWN1cnNpdmUiLCJpc0ZpbGUiLCJlbmRzV2l0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxakJBQUE7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsY0FBYyxJQUFJQyxPQUFKLEVBQXBCOztBQUVBOzs7O0lBR2FDLE8sV0FBQUEsTztBQUVUOzs7O0FBSUEscUJBQVlDLFVBQVosRUFBd0I7QUFBQTs7QUFDcEJILG9CQUFZSSxHQUFaLENBQWdCLElBQWhCLEVBQXFCRCxVQUFyQjtBQUNIOztBQUVEOzs7Ozs7Ozs7NkJBS0tFLFcsRUFBYUMsTSxFQUNsQjtBQUNJTix3QkFBWU8sR0FBWixDQUFnQixJQUFoQixFQUFzQkMsUUFBdEIsQ0FBK0JGLE1BQS9CLEVBQXVDRCxXQUF2QztBQUNIOztBQUVEOzs7Ozs7OzhDQUlzQkksSSxFQUN0QjtBQUNJLGdCQUFJQyxNQUFNRCxJQUFWOztBQUVBLGdCQUFJLENBQUNULFlBQVlPLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JJLFVBQXRCLENBQWlDRCxHQUFqQyxDQUFMLEVBQTJDO0FBQ3ZDViw0QkFBWU8sR0FBWixDQUFnQixJQUFoQixFQUFzQkssU0FBdEIsQ0FBZ0NGLEdBQWhDO0FBQ0g7QUFDSjs7QUFFRDs7Ozs7OztxQ0FJYUcsTSxFQUFRO0FBQ2pCLGdCQUFJQyxPQUFPLElBQVg7QUFDQSxnQkFBSUMsVUFBVSxFQUFkO0FBQ0FmLHdCQUFZTyxHQUFaLENBQWdCLElBQWhCLEVBQXNCUyxXQUF0QixDQUFrQ0gsTUFBbEMsRUFBMENJLE9BQTFDLENBQWtELFVBQVVDLFFBQVYsRUFBb0I7QUFDbEUsb0JBQUlDLGFBQWFWLGVBQUtXLE9BQUwsQ0FBYVAsTUFBYixFQUFxQkssUUFBckIsQ0FBakI7QUFDQSxvQkFBSUcsT0FBT3JCLFlBQVlPLEdBQVosQ0FBZ0JPLElBQWhCLEVBQXNCUSxRQUF0QixDQUErQkgsVUFBL0IsQ0FBWDtBQUNBLG9CQUFJRSxLQUFLRSxXQUFMLEVBQUosRUFBd0I7QUFDcEJSLDRCQUFRUyxJQUFSLENBQWFMLFVBQWI7QUFDSDtBQUNKLGFBTkQ7QUFPQSxtQkFBT0osT0FBUDtBQUNIOztBQUVEOzs7Ozs7Ozt3REFLZ0NGLE0sRUFBUTtBQUNwQyxnQkFBSUMsT0FBTyxJQUFYO0FBQ0EsZ0JBQUlDLFVBQVUsRUFBZDtBQUNBZix3QkFBWU8sR0FBWixDQUFnQixJQUFoQixFQUFzQlMsV0FBdEIsQ0FBa0NILE1BQWxDLEVBQTBDSSxPQUExQyxDQUFrRCxVQUFVQyxRQUFWLEVBQW9CO0FBQ2xFLG9CQUFJQyxhQUFhVixlQUFLVyxPQUFMLENBQWFQLE1BQWIsRUFBcUJLLFFBQXJCLENBQWpCO0FBQ0Esb0JBQUlHLE9BQU9yQixZQUFZTyxHQUFaLENBQWdCTyxJQUFoQixFQUFzQlEsUUFBdEIsQ0FBK0JILFVBQS9CLENBQVg7O0FBRUEsb0JBQUlFLEtBQUtFLFdBQUwsRUFBSixFQUF3QjtBQUNwQlIsOEJBQVVBLFFBQVFVLE1BQVIsQ0FBZVgsS0FBS1ksK0JBQUwsQ0FBcUNQLFVBQXJDLENBQWYsQ0FBVjtBQUNIO0FBQ0RKLHdCQUFRUyxJQUFSLENBQWFMLFVBQWI7QUFDSCxhQVJEO0FBU0EsbUJBQU9KLE9BQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7d0NBS2dCRixNLEVBQVFjLE8sRUFBUztBQUM3QixnQkFBSWIsT0FBTyxJQUFYO0FBQ0EsZ0JBQUlDLFVBQVUsRUFBZDs7QUFFQWYsd0JBQVlPLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JTLFdBQXRCLENBQWtDSCxNQUFsQyxFQUEwQ0ksT0FBMUMsQ0FBa0QsVUFBVUMsUUFBVixFQUFvQjtBQUNsRUEsMkJBQVdULGVBQUtXLE9BQUwsQ0FBYVAsTUFBYixFQUFxQkssUUFBckIsQ0FBWDtBQUNBLG9CQUFJRyxPQUFPckIsWUFBWU8sR0FBWixDQUFnQk8sSUFBaEIsRUFBc0JRLFFBQXRCLENBQStCSixRQUEvQixDQUFYOztBQUVBLG9CQUFJRyxLQUFLRSxXQUFMLEVBQUosRUFBd0I7QUFDcEJSLDhCQUFVQSxRQUFRVSxNQUFSLENBQWVYLEtBQUtjLGVBQUwsQ0FBcUJWLFFBQXJCLEVBQStCUyxPQUEvQixDQUFmLENBQVY7QUFDSDs7QUFFRCxvQkFBSU4sS0FBS1EsTUFBTCxNQUFpQlgsU0FBU1ksUUFBVCxDQUFrQkgsT0FBbEIsQ0FBckIsRUFBaUQ7QUFDN0NaLDRCQUFRUyxJQUFSLENBQWFOLFFBQWI7QUFDSDtBQUNKLGFBWEQ7O0FBYUEsbUJBQU9ILE9BQVA7QUFDSCIsImZpbGUiOiJGb2xkZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogUmVwcmVzZW50cyBoZWxwZXJzIGZvciB3b3JraW5nIHdpdGggZm9sZGVyc1xuICovXG5leHBvcnQgY2xhc3MgRm9sZGVyc1xue1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtmb2xkZXJzfVxuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW0gXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZmlsZVN5c3RlbSkge1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcyxmaWxlU3lzdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb3B5IG9uZSBmb2xkZXIgYW5kIGl0cyBjb250ZW50IHJlY3Vyc2l2ZWx5IHRvIGEgc3BlY2lmaWVkIGRlc3RpbmF0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uIERlc3RpbmF0aW9uIHBhdGggdG8gY29weSB0b1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2UgU291cmNlIHBhdGggdG8gY29weSBmcm9tXG4gICAgICovXG4gICAgY29weShkZXN0aW5hdGlvbiwgc291cmNlKVxuICAgIHtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmNvcHlTeW5jKHNvdXJjZSwgZGVzdGluYXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGZvbGRlciBpZiBpdCBkb2VzIG5vdCBleGlzdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIE5hbWUgb2YgdGhlIGZvbGRlciB0byBtYWtlIHN1cmUgZXhpc3RzXG4gICAgICovXG4gICAgbWFrZUZvbGRlcklmTm90RXhpc3RzKHBhdGgpXG4gICAge1xuICAgICAgICB2YXIgZGlyID0gcGF0aDtcblxuICAgICAgICBpZiAoIV9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGRpcikpe1xuICAgICAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLm1rZGlyU3luYyhkaXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRvcCBsZXZlbCBmb2xkZXJzIGluIGEgZ2l2ZW4gcGF0aFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFxuICAgICAqL1xuICAgIGdldEZvbGRlcnNJbihmb2xkZXIpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZGRpclN5bmMoZm9sZGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJJbm5lcikge1xuICAgICAgICAgICAgbGV0IGFjdHVhbFBhdGggPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICBsZXQgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhhY3R1YWxQYXRoKTtcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGZvbGRlcnMgYW5kIGZpbGVzIHdpdGhpbiBhIHNwZWNpZmljIGZvbGRlciByZWN1cnNpdmVseVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgUGF0aCBvZiB0aGUgZm9sZGVyIHRvIGdldCBmcm9tXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBBcnJheSBvZiBmaWxlcyBhbmQgZm9sZGVyc1xuICAgICAqL1xuICAgIGdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oZm9sZGVyKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRkaXJTeW5jKGZvbGRlcikuZm9yRWFjaChmdW5jdGlvbiAoZGlySW5uZXIpIHtcbiAgICAgICAgICAgIGxldCBhY3R1YWxQYXRoID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoYWN0dWFsUGF0aCk7XG5cbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoc2VsZi5nZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluKGFjdHVhbFBhdGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChhY3R1YWxQYXRoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3IgYSBzcGVjaWZpYyBmaWxlIHBhdHRlcm4gd2l0aGluIGEgZm9sZGVyLCByZWN1cnNpdmVseVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgRm9sZGVyIHRvIHNlYXJjaCBmcm9tXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm4gUGF0dGVybiBvZiBmaWxlcyB0byBsb29rIGZvclxuICAgICAqL1xuICAgIHNlYXJjaFJlY3Vyc2l2ZShmb2xkZXIsIHBhdHRlcm4pIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkZGlyU3luYyhmb2xkZXIpLmZvckVhY2goZnVuY3Rpb24gKGRpcklubmVyKSB7XG4gICAgICAgICAgICBkaXJJbm5lciA9IHBhdGgucmVzb2x2ZShmb2xkZXIsIGRpcklubmVyKTtcbiAgICAgICAgICAgIHZhciBzdGF0ID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnN0YXRTeW5jKGRpcklubmVyKTtcblxuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChzZWxmLlNlYXJjaFJlY3Vyc2l2ZShkaXJJbm5lciwgcGF0dGVybikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhdC5pc0ZpbGUoKSAmJiBkaXJJbm5lci5lbmRzV2l0aChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChkaXJJbm5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG59XG4iXX0=