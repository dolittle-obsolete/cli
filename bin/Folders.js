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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9Gb2xkZXJzLmpzIl0sIm5hbWVzIjpbIl9maWxlU3lzdGVtIiwiV2Vha01hcCIsIkZvbGRlcnMiLCJmaWxlU3lzdGVtIiwic2V0IiwiZGVzdGluYXRpb24iLCJzb3VyY2UiLCJmcyIsImNvcHlTeW5jIiwicGF0aCIsImRpciIsImdldCIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJmb2xkZXIiLCJzZWxmIiwicmVzdWx0cyIsInJlYWRkaXJTeW5jIiwiZm9yRWFjaCIsImRpcklubmVyIiwiYWN0dWFsUGF0aCIsInJlc29sdmUiLCJzdGF0Iiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsInB1c2giLCJjb25jYXQiLCJnZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluIiwicGF0dGVybiIsIlNlYXJjaFJlY3Vyc2l2ZSIsImlzRmlsZSIsImVuZHNXaXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7OztBQUNBOzs7Ozs7QUFMQTs7OztBQU9BLElBQU1BLGNBQWMsSUFBSUMsT0FBSixFQUFwQjs7QUFFQTs7OztJQUdhQyxPLFdBQUFBLE87QUFFVDs7OztBQUlBLHFCQUFZQyxVQUFaLEVBQXdCO0FBQUE7O0FBQ3BCSCxvQkFBWUksR0FBWixDQUFnQixJQUFoQixFQUFxQkQsVUFBckI7QUFDSDs7QUFFRDs7Ozs7Ozs7OzZCQUtLRSxXLEVBQWFDLE0sRUFDbEI7QUFDSUMsOEJBQUdDLFFBQUgsQ0FBWUYsTUFBWixFQUFvQkQsV0FBcEI7QUFDSDs7QUFFRDs7Ozs7Ozs4Q0FJc0JJLEksRUFDdEI7QUFDSSxnQkFBSUMsTUFBTUQsSUFBVjs7QUFFQSxnQkFBSSxDQUFDVCxZQUFZVyxHQUFaLENBQWdCLElBQWhCLEVBQXNCQyxVQUF0QixDQUFpQ0YsR0FBakMsQ0FBTCxFQUEyQztBQUN2Q1YsNEJBQVlXLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JFLFNBQXRCLENBQWdDSCxHQUFoQztBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7cUNBSWFJLE0sRUFBUTtBQUNqQixnQkFBSUMsT0FBTyxJQUFYO0FBQ0EsZ0JBQUlDLFVBQVUsRUFBZDs7QUFFQWhCLHdCQUFZVyxHQUFaLENBQWdCLElBQWhCLEVBQXNCTSxXQUF0QixDQUFrQ0gsTUFBbEMsRUFBMENJLE9BQTFDLENBQWtELFVBQVVDLFFBQVYsRUFBb0I7QUFDbEUsb0JBQUlDLGFBQWFYLGVBQUtZLE9BQUwsQ0FBYVAsTUFBYixFQUFxQkssUUFBckIsQ0FBakI7QUFDQSxvQkFBSUcsT0FBT3RCLFlBQVlXLEdBQVosQ0FBZ0JJLElBQWhCLEVBQXNCUSxRQUF0QixDQUErQkgsVUFBL0IsQ0FBWDtBQUNBLG9CQUFJRSxLQUFLRSxXQUFMLEVBQUosRUFBd0I7QUFDcEJSLDRCQUFRUyxJQUFSLENBQWFMLFVBQWI7QUFDSDtBQUNKLGFBTkQ7QUFPQSxtQkFBT0osT0FBUDtBQUNIOztBQUVEOzs7Ozs7Ozt3REFLZ0NGLE0sRUFBUTtBQUNwQyxnQkFBSUMsT0FBTyxJQUFYO0FBQ0EsZ0JBQUlDLFVBQVUsRUFBZDtBQUNBaEIsd0JBQVlXLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JNLFdBQXRCLENBQWtDSCxNQUFsQyxFQUEwQ0ksT0FBMUMsQ0FBa0QsVUFBVUMsUUFBVixFQUFvQjtBQUNsRSxvQkFBSUMsYUFBYVgsZUFBS1ksT0FBTCxDQUFhUCxNQUFiLEVBQXFCSyxRQUFyQixDQUFqQjtBQUNBLG9CQUFJRyxPQUFPdEIsWUFBWVcsR0FBWixDQUFnQkksSUFBaEIsRUFBc0JRLFFBQXRCLENBQStCSCxVQUEvQixDQUFYOztBQUVBLG9CQUFJRSxLQUFLRSxXQUFMLEVBQUosRUFBd0I7QUFDcEJSLDhCQUFVQSxRQUFRVSxNQUFSLENBQWVYLEtBQUtZLCtCQUFMLENBQXFDUCxVQUFyQyxDQUFmLENBQVY7QUFDSDtBQUNESix3QkFBUVMsSUFBUixDQUFhTCxVQUFiO0FBQ0gsYUFSRDtBQVNBLG1CQUFPSixPQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3dDQUtnQkYsTSxFQUFRYyxPLEVBQVM7QUFDN0IsZ0JBQUliLE9BQU8sSUFBWDtBQUNBLGdCQUFJQyxVQUFVLEVBQWQ7O0FBRUFoQix3QkFBWVcsR0FBWixDQUFnQixJQUFoQixFQUFzQk0sV0FBdEIsQ0FBa0NILE1BQWxDLEVBQTBDSSxPQUExQyxDQUFrRCxVQUFVQyxRQUFWLEVBQW9CO0FBQ2xFQSwyQkFBV1YsZUFBS1ksT0FBTCxDQUFhUCxNQUFiLEVBQXFCSyxRQUFyQixDQUFYO0FBQ0Esb0JBQUlHLE9BQU90QixZQUFZVyxHQUFaLENBQWdCSSxJQUFoQixFQUFzQlEsUUFBdEIsQ0FBK0JKLFFBQS9CLENBQVg7O0FBRUEsb0JBQUlHLEtBQUtFLFdBQUwsRUFBSixFQUF3QjtBQUNwQlIsOEJBQVVBLFFBQVFVLE1BQVIsQ0FBZVgsS0FBS2MsZUFBTCxDQUFxQlYsUUFBckIsRUFBK0JTLE9BQS9CLENBQWYsQ0FBVjtBQUNIOztBQUVELG9CQUFJTixLQUFLUSxNQUFMLE1BQWlCWCxTQUFTWSxRQUFULENBQWtCSCxPQUFsQixDQUFyQixFQUFpRDtBQUM3Q1osNEJBQVFTLElBQVIsQ0FBYU4sUUFBYjtBQUNIO0FBQ0osYUFYRDs7QUFhQSxtQkFBT0gsT0FBUDtBQUNIIiwiZmlsZSI6IkZvbGRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGhlbHBlcnMgZm9yIHdvcmtpbmcgd2l0aCBmb2xkZXJzXG4gKi9cbmV4cG9ydCBjbGFzcyBGb2xkZXJzXG57XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge2ZvbGRlcnN9XG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihmaWxlU3lzdGVtKSB7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLGZpbGVTeXN0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvcHkgb25lIGZvbGRlciBhbmQgaXRzIGNvbnRlbnQgcmVjdXJzaXZlbHkgdG8gYSBzcGVjaWZpZWQgZGVzdGluYXRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb24gRGVzdGluYXRpb24gcGF0aCB0byBjb3B5IHRvXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBTb3VyY2UgcGF0aCB0byBjb3B5IGZyb21cbiAgICAgKi9cbiAgICBjb3B5KGRlc3RpbmF0aW9uLCBzb3VyY2UpXG4gICAge1xuICAgICAgICBmcy5jb3B5U3luYyhzb3VyY2UsIGRlc3RpbmF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBmb2xkZXIgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBOYW1lIG9mIHRoZSBmb2xkZXIgdG8gbWFrZSBzdXJlIGV4aXN0c1xuICAgICAqL1xuICAgIG1ha2VGb2xkZXJJZk5vdEV4aXN0cyhwYXRoKVxuICAgIHtcbiAgICAgICAgdmFyIGRpciA9IHBhdGg7XG5cbiAgICAgICAgaWYgKCFfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhkaXIpKXtcbiAgICAgICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5ta2RpclN5bmMoZGlyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0b3AgbGV2ZWwgZm9sZGVycyBpbiBhIGdpdmVuIHBhdGhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBcbiAgICAgKi9cbiAgICBnZXRGb2xkZXJzSW4oZm9sZGVyKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZGRpclN5bmMoZm9sZGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJJbm5lcikge1xuICAgICAgICAgICAgbGV0IGFjdHVhbFBhdGggPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICBsZXQgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhhY3R1YWxQYXRoKTtcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGZvbGRlcnMgYW5kIGZpbGVzIHdpdGhpbiBhIHNwZWNpZmljIGZvbGRlciByZWN1cnNpdmVseVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgUGF0aCBvZiB0aGUgZm9sZGVyIHRvIGdldCBmcm9tXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBBcnJheSBvZiBmaWxlcyBhbmQgZm9sZGVyc1xuICAgICAqL1xuICAgIGdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oZm9sZGVyKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRkaXJTeW5jKGZvbGRlcikuZm9yRWFjaChmdW5jdGlvbiAoZGlySW5uZXIpIHtcbiAgICAgICAgICAgIGxldCBhY3R1YWxQYXRoID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoYWN0dWFsUGF0aCk7XG5cbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoc2VsZi5nZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluKGFjdHVhbFBhdGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChhY3R1YWxQYXRoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3IgYSBzcGVjaWZpYyBmaWxlIHBhdHRlcm4gd2l0aGluIGEgZm9sZGVyLCByZWN1cnNpdmVseVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgRm9sZGVyIHRvIHNlYXJjaCBmcm9tXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm4gUGF0dGVybiBvZiBmaWxlcyB0byBsb29rIGZvclxuICAgICAqL1xuICAgIHNlYXJjaFJlY3Vyc2l2ZShmb2xkZXIsIHBhdHRlcm4pIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkZGlyU3luYyhmb2xkZXIpLmZvckVhY2goZnVuY3Rpb24gKGRpcklubmVyKSB7XG4gICAgICAgICAgICBkaXJJbm5lciA9IHBhdGgucmVzb2x2ZShmb2xkZXIsIGRpcklubmVyKTtcbiAgICAgICAgICAgIHZhciBzdGF0ID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnN0YXRTeW5jKGRpcklubmVyKTtcblxuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChzZWxmLlNlYXJjaFJlY3Vyc2l2ZShkaXJJbm5lciwgcGF0dGVybikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhdC5pc0ZpbGUoKSAmJiBkaXJJbm5lci5lbmRzV2l0aChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChkaXJJbm5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG59XG4iXX0=