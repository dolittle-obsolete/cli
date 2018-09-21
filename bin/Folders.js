'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Folders = undefined;

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
    }]);
    return Folders;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9Gb2xkZXJzLmpzIl0sIm5hbWVzIjpbIl9maWxlU3lzdGVtIiwiV2Vha01hcCIsIkZvbGRlcnMiLCJmaWxlU3lzdGVtIiwic2V0IiwiZGVzdGluYXRpb24iLCJzb3VyY2UiLCJmcyIsImNvcHlTeW5jIiwicGF0aCIsImRpciIsImdldCIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJmb2xkZXIiLCJzZWxmIiwicmVzdWx0cyIsInJlYWRkaXJTeW5jIiwiZm9yRWFjaCIsImRpcklubmVyIiwiYWN0dWFsUGF0aCIsInJlc29sdmUiLCJzdGF0Iiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsInB1c2giLCJjb25jYXQiLCJnZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluIiwiaXNGaWxlIiwidGVtcGxhdGVGaWxlTmFtZXMiLCJsYXN0UGF0aFNlcGFyYXRvck1hdGNoIiwibWF0Y2giLCJsYXN0SW5kZXgiLCJsYXN0SW5kZXhPZiIsImxlbmd0aCIsImZpbGVuYW1lIiwic3Vic3RyaW5nIiwiaW5jbHVkZXMiLCJwYXR0ZXJuIiwiZW5kc1dpdGgiLCJzZWFyY2hSZWN1cnNpdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0EsSUFBTUEsY0FBYyxJQUFJQyxPQUFKLEVBQXBCOztBQUVBOzs7O0lBR2FDLE8sV0FBQUEsTztBQUVUOzs7O0FBSUEscUJBQVlDLFVBQVosRUFBd0I7QUFBQTs7QUFDcEJILG9CQUFZSSxHQUFaLENBQWdCLElBQWhCLEVBQXFCRCxVQUFyQjtBQUNIOztBQUVEOzs7Ozs7Ozs7NkJBS0tFLFcsRUFBYUMsTSxFQUNsQjtBQUNJQyw4QkFBR0MsUUFBSCxDQUFZRixNQUFaLEVBQW9CRCxXQUFwQjtBQUNIOztBQUVEOzs7Ozs7OzhDQUlzQkksSSxFQUN0QjtBQUNJLGdCQUFJQyxNQUFNRCxJQUFWOztBQUVBLGdCQUFJLENBQUNULFlBQVlXLEdBQVosQ0FBZ0IsSUFB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QUNEOzs7Ozs7d0NBTWdCRixNLEVBQVF3QixPLEVBQVM7QUFDN0IsZ0JBQUl2QixPQUFPLElBQVg7QUFDQSxnQkFBSUMsVUFBVSxFQUFkOztBQUVBaEIsd0JBQVlXLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JNLFdBQXRCLENBQWtDSCxNQUFsQyxFQUEwQ0ksT0FBMUMsQ0FBa0QsVUFBVUMsUUFBVixFQUFvQjtBQUNsRUEsMkJBQVdWLGVBQUtZLE9BQUwsQ0FBYVAsTUFBYixFQUFxQkssUUFBckIsQ0FBWDtBQUNBLG9CQUFJRyxPQUFPdEIsWUFBWVcsR0FBWixDQUFnQkksSUFBaEIsRUFBc0JRLFFBQXRCLENBQStCSixRQUEvQixDQUFYO0FBQ0Esb0JBQUlHLEtBQUtFLFdBQUwsRUFBSixFQUF3QjtBQUNwQlIsOEJBQVVBLFFBQVFVLE1BQVIsQ0FBZVgsS0FBS3lCLGVBQUwsQ0FBcUJyQixRQUFyQixFQUErQm1CLE9BQS9CLENBQWYsQ0FBVjtBQUNIOztBQUVELG9CQUFJaEIsS0FBS00sTUFBTCxNQUFpQlQsU0FBU29CLFFBQVQsQ0FBa0JELE9BQWxCLENBQXJCLEVBQWlEO0FBQzdDdEIsNEJBQVFTLElBQVIsQ0FBYU4sUUFBYjtBQUNIO0FBQ0osYUFWRDs7QUFZQSxtQkFBT0gsT0FBUDtBQUNIIiwiZmlsZSI6IkZvbGRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGhlbHBlcnMgZm9yIHdvcmtpbmcgd2l0aCBmb2xkZXJzXG4gKi9cbmV4cG9ydCBjbGFzcyBGb2xkZXJzXG57XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge2ZvbGRlcnN9XG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihmaWxlU3lzdGVtKSB7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLGZpbGVTeXN0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvcHkgb25lIGZvbGRlciBhbmQgaXRzIGNvbnRlbnQgcmVjdXJzaXZlbHkgdG8gYSBzcGVjaWZpZWQgZGVzdGluYXRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb24gRGVzdGluYXRpb24gcGF0aCB0byBjb3B5IHRvXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBTb3VyY2UgcGF0aCB0byBjb3B5IGZyb21cbiAgICAgKi9cbiAgICBjb3B5KGRlc3RpbmF0aW9uLCBzb3VyY2UpXG4gICAge1xuICAgICAgICBmcy5jb3B5U3luYyhzb3VyY2UsIGRlc3RpbmF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBmb2xkZXIgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBOYW1lIG9mIHRoZSBmb2xkZXIgdG8gbWFrZSBzdXJlIGV4aXN0c1xuICAgICAqL1xuICAgIG1ha2VGb2xkZXJJZk5vdEV4aXN0cyhwYXRoKVxuICAgIHtcbiAgICAgICAgdmFyIGRpciA9IHBhdGg7XG5cbiAgICAgICAgaWYgKCFfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhkaXIpKXtcbiAgICAgICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5ta2RpclN5bmMoZGlyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0b3AgbGV2ZWwgZm9sZGVycyBpbiBhIGdpdmVuIHBhdGhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBcbiAgICAgKi9cbiAgICBnZXRGb2xkZXJzSW4oZm9sZGVyKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRkaXJTeW5jKGZvbGRlcikuZm9yRWFjaChmdW5jdGlvbiAoZGlySW5uZXIpIHtcbiAgICAgICAgICAgIGxldCBhY3R1YWxQYXRoID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGFjdHVhbFBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBmaWxlcyB3aXRoaW4gYSBzcGVjaWZpYyBmb2xkZXIgcmVjdXJzaXZlbHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIFBhdGggb2YgdGhlIGZvbGRlciB0byBnZXQgZnJvbVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gQXJyYXkgb2YgZmlsZXNcbiAgICAgKi9cbiAgICBnZXRGaWxlc1JlY3Vyc2l2ZWx5SW4oZm9sZGVyKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRkaXJTeW5jKGZvbGRlcikuZm9yRWFjaChmdW5jdGlvbiAoZGlySW5uZXIpIHtcbiAgICAgICAgICAgIGxldCBhY3R1YWxQYXRoID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoYWN0dWFsUGF0aCk7XG5cbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoc2VsZi5nZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluKGFjdHVhbFBhdGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGF0LmlzRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGFjdHVhbFBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBmaWxlcyB3aXRoaW4gYSBzcGVjaWZpYyBmb2xkZXIgcmVjdXJzaXZlbHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIFBhdGggb2YgdGhlIGZvbGRlciB0byBnZXQgZnJvbVxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHRlbXBsYXRlRmlsZU5hbWVzIFRoZSB0ZW1wbGF0ZSBmaWxlIG5hbWVzXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBBcnJheSBvZiBmaWxlc1xuICAgICAqL1xuICAgIGdldEFydGlmYWN0VGVtcGxhdGVGaWxlc1JlY3Vyc2l2ZWx5SW4oZm9sZGVyLCB0ZW1wbGF0ZUZpbGVOYW1lcykge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCByZXN1bHRzID0gW107XG4gICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkZGlyU3luYyhmb2xkZXIpLmZvckVhY2goZnVuY3Rpb24gKGRpcklubmVyKSB7XG4gICAgICAgICAgICBsZXQgYWN0dWFsUGF0aCA9IHBhdGgucmVzb2x2ZShmb2xkZXIsIGRpcklubmVyKTtcbiAgICAgICAgICAgIGxldCBzdGF0ID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnN0YXRTeW5jKGFjdHVhbFBhdGgpO1xuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChzZWxmLmdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oYWN0dWFsUGF0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0UGF0aFNlcGFyYXRvck1hdGNoID0gYWN0dWFsUGF0aC5tYXRjaCgvKFxcXFx8XFwvKS8pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IGFjdHVhbFBhdGgubGFzdEluZGV4T2YobGFzdFBhdGhTZXBhcmF0b3JNYXRjaFtsYXN0UGF0aFNlcGFyYXRvck1hdGNoLmxlbmd0aC0xXSlcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlbmFtZSA9IGFjdHVhbFBhdGguc3Vic3RyaW5nKGxhc3RJbmRleCsxLCBhY3R1YWxQYXRoLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXBsYXRlRmlsZU5hbWVzLmluY2x1ZGVzKGZpbGVuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBmb2xkZXJzIGFuZCBmaWxlcyB3aXRoaW4gYSBzcGVjaWZpYyBmb2xkZXIgcmVjdXJzaXZlbHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIFBhdGggb2YgdGhlIGZvbGRlciB0byBnZXQgZnJvbVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gQXJyYXkgb2YgZmlsZXMgYW5kIGZvbGRlcnNcbiAgICAgKi9cbiAgICBnZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluKGZvbGRlcikge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCByZXN1bHRzID0gW107XG4gICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkZGlyU3luYyhmb2xkZXIpLmZvckVhY2goZnVuY3Rpb24gKGRpcklubmVyKSB7XG4gICAgICAgICAgICBsZXQgYWN0dWFsUGF0aCA9IHBhdGgucmVzb2x2ZShmb2xkZXIsIGRpcklubmVyKTtcbiAgICAgICAgICAgIGxldCBzdGF0ID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnN0YXRTeW5jKGFjdHVhbFBhdGgpO1xuXG4gICAgICAgICAgICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KHNlbGYuZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbihhY3R1YWxQYXRoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goYWN0dWFsUGF0aCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggZm9yIGEgc3BlY2lmaWMgZmlsZSBwYXR0ZXJuIHdpdGhpbiBhIGZvbGRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgRm9sZGVyIHRvIHNlYXJjaCBmcm9tXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm4gUGF0dGVybiBvZiBmaWxlcyB0byBsb29rIGZvclxuICAgICAqL1xuICAgIHNlYXJjaEZvbGRlcihmb2xkZXIsIHBhdHRlcm4pIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkZGlyU3luYyhmb2xkZXIpLmZvckVhY2goZnVuY3Rpb24gKGRpcklubmVyKSB7XG4gICAgICAgICAgICBkaXJJbm5lciA9IHBhdGgucmVzb2x2ZShmb2xkZXIsIGRpcklubmVyKTtcbiAgICAgICAgICAgIHZhciBzdGF0ID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnN0YXRTeW5jKGRpcklubmVyKTtcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRmlsZSgpICYmIGRpcklubmVyLmVuZHNXaXRoKHBhdHRlcm4pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGRpcklubmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZWFyY2ggZm9yIGEgc3BlY2lmaWMgZmlsZSBwYXR0ZXJuIHdpdGhpbiBhIGZvbGRlciwgcmVjdXJzaXZlbHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIEZvbGRlciB0byBzZWFyY2ggZnJvbVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuIFBhdHRlcm4gb2YgZmlsZXMgdG8gbG9vayBmb3JcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IFRoZSBwYXRocyBvZiB0aGUgbWF0Y2hpbmcgZmlsZXNcbiAgICAgKi9cbiAgICBzZWFyY2hSZWN1cnNpdmUoZm9sZGVyLCBwYXR0ZXJuKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZGRpclN5bmMoZm9sZGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJJbm5lcikge1xuICAgICAgICAgICAgZGlySW5uZXIgPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICB2YXIgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhkaXJJbm5lcik7XG4gICAgICAgICAgICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KHNlbGYuc2VhcmNoUmVjdXJzaXZlKGRpcklubmVyLCBwYXR0ZXJuKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGF0LmlzRmlsZSgpICYmIGRpcklubmVyLmVuZHNXaXRoKHBhdHRlcm4pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGRpcklubmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcbn1cbiJdfQ==