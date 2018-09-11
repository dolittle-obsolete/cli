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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9Gb2xkZXJzLmpzIl0sIm5hbWVzIjpbIl9maWxlU3lzdGVtIiwiV2Vha01hcCIsIkZvbGRlcnMiLCJmaWxlU3lzdGVtIiwic2V0IiwiZGVzdGluYXRpb24iLCJzb3VyY2UiLCJmcyIsImNvcHlTeW5jIiwicGF0aCIsImRpciIsImdldCIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJmb2xkZXIiLCJzZWxmIiwicmVzdWx0cyIsInJlYWRkaXJTeW5jIiwiZm9yRWFjaCIsImRpcklubmVyIiwiYWN0dWFsUGF0aCIsInJlc29sdmUiLCJzdGF0Iiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsInB1c2giLCJjb25jYXQiLCJnZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluIiwicGF0dGVybiIsIlNlYXJjaFJlY3Vyc2l2ZSIsImlzRmlsZSIsImVuZHNXaXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7OztBQUNBOzs7Ozs7QUFMQTs7OztBQU9BLElBQU1BLGNBQWMsSUFBSUMsT0FBSixFQUFwQjs7QUFFQTs7OztJQUdhQyxPLFdBQUFBLE87QUFFVDs7OztBQUlBLHFCQUFZQyxVQUFaLEVBQXdCO0FBQUE7O0FBQ3BCSCxvQkFBWUksR0FBWixDQUFnQixJQUFoQixFQUFxQkQsVUFBckI7QUFDSDs7QUFFRDs7Ozs7Ozs7OzZCQUtLRSxXLEVBQWFDLE0sRUFDbEI7QUFDSUMsOEJBQUdDLFFBQUgsQ0FBWUYsTUFBWixFQUFvQkQsV0FBcEI7QUFDSDs7QUFFRDs7Ozs7Ozs4Q0FJc0JJLEksRUFDdEI7QUFDSSxnQkFBSUMsTUFBTUQsSUFBVjs7QUFFQSxnQkFBSSxDQUFDVCxZQUFZVyxHQUFaLENBQWdCLElBQWhCLEVBQXNCQyxVQUF0QixDQUFpQ0YsR0FBakMsQ0FBTCxFQUEyQztBQUN2Q1YsNEJBQVlXLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JFLFNBQXRCLENBQWdDSCxHQUFoQztBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7cUNBSWFJLE0sRUFBUTtBQUNqQixnQkFBSUMsT0FBTyxJQUFYO0FBQ0EsZ0JBQUlDLFVBQVUsRUFBZDtBQUNBaEIsd0JBQVlXLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JNLFdBQXRCLENBQWtDSCxNQUFsQyxFQUEwQ0ksT0FBMUMsQ0FBa0QsVUFBVUMsUUFBVixFQUFvQjtBQUNsRSxvQkFBSUMsYUFBYVgsZUFBS1ksT0FBTCxDQUFhUCxNQUFiLEVBQXFCSyxRQUFyQixDQUFqQjtBQUNBLG9CQUFJRyxPQUFPdEIsWUFBWVcsR0FBWixDQUFnQkksSUFBaEIsRUFBc0JRLFFBQXRCLENBQStCSCxVQUEvQixDQUFYO0FBQ0Esb0JBQUlFLEtBQUtFLFdBQUwsRUFBSixFQUF3QjtBQUNwQlIsNEJBQVFTLElBQVIsQ0FBYUwsVUFBYjtBQUNIO0FBQ0osYUFORDtBQU9BLG1CQUFPSixPQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3dEQUtnQ0YsTSxFQUFRO0FBQ3BDLGdCQUFJQyxPQUFPLElBQVg7QUFDQSxnQkFBSUMsVUFBVSxFQUFkO0FBQ0FoQix3QkFBWVcsR0FBWixDQUFnQixJQUFoQixFQUFzQk0sV0FBdEIsQ0FBa0NILE1BQWxDLEVBQTBDSSxPQUExQyxDQUFrRCxVQUFVQyxRQUFWLEVBQW9CO0FBQ2xFLG9CQUFJQyxhQUFhWCxlQUFLWSxPQUFMLENBQWFQLE1BQWIsRUFBcUJLLFFBQXJCLENBQWpCO0FBQ0Esb0JBQUlHLE9BQU90QixZQUFZVyxHQUFaLENBQWdCSSxJQUFoQixFQUFzQlEsUUFBdEIsQ0FBK0JILFVBQS9CLENBQVg7O0FBRUEsb0JBQUlFLEtBQUtFLFdBQUwsRUFBSixFQUF3QjtBQUNwQlIsOEJBQVVBLFFBQVFVLE1BQVIsQ0FBZVgsS0FBS1ksK0JBQUwsQ0FBcUNQLFVBQXJDLENBQWYsQ0FBVjtBQUNIO0FBQ0RKLHdCQUFRUyxJQUFSLENBQWFMLFVBQWI7QUFDSCxhQVJEO0FBU0EsbUJBQU9KLE9BQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7d0NBS2dCRixNLEVBQVFjLE8sRUFBUztBQUM3QixnQkFBSWIsT0FBTyxJQUFYO0FBQ0EsZ0JBQUlDLFVBQVUsRUFBZDs7QUFFQWhCLHdCQUFZVyxHQUFaLENBQWdCLElBQWhCLEVBQXNCTSxXQUF0QixDQUFrQ0gsTUFBbEMsRUFBMENJLE9BQTFDLENBQWtELFVBQVVDLFFBQVYsRUFBb0I7QUFDbEVBLDJCQUFXVixlQUFLWSxPQUFMLENBQWFQLE1BQWIsRUFBcUJLLFFBQXJCLENBQVg7QUFDQSxvQkFBSUcsT0FBT3RCLFlBQVlXLEdBQVosQ0FBZ0JJLElBQWhCLEVBQXNCUSxRQUF0QixDQUErQkosUUFBL0IsQ0FBWDs7QUFFQSxvQkFBSUcsS0FBS0UsV0FBTCxFQUFKLEVBQXdCO0FBQ3BCUiw4QkFBVUEsUUFBUVUsTUFBUixDQUFlWCxLQUFLYyxlQUFMLENBQXFCVixRQUFyQixFQUErQlMsT0FBL0IsQ0FBZixDQUFWO0FBQ0g7O0FBRUQsb0JBQUlOLEtBQUtRLE1BQUwsTUFBaUJYLFNBQVNZLFFBQVQsQ0FBa0JILE9BQWxCLENBQXJCLEVBQWlEO0FBQzdDWiw0QkFBUVMsSUFBUixDQUFhTixRQUFiO0FBQ0g7QUFDSixhQVhEOztBQWFBLG1CQUFPSCxPQUFQO0FBQ0giLCJmaWxlIjoiRm9sZGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgaGVscGVycyBmb3Igd29ya2luZyB3aXRoIGZvbGRlcnNcbiAqL1xuZXhwb3J0IGNsYXNzIEZvbGRlcnNcbntcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Zm9sZGVyc31cbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZpbGVTeXN0ZW0pIHtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsZmlsZVN5c3RlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29weSBvbmUgZm9sZGVyIGFuZCBpdHMgY29udGVudCByZWN1cnNpdmVseSB0byBhIHNwZWNpZmllZCBkZXN0aW5hdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvbiBEZXN0aW5hdGlvbiBwYXRoIHRvIGNvcHkgdG9cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc291cmNlIFNvdXJjZSBwYXRoIHRvIGNvcHkgZnJvbVxuICAgICAqL1xuICAgIGNvcHkoZGVzdGluYXRpb24sIHNvdXJjZSlcbiAgICB7XG4gICAgICAgIGZzLmNvcHlTeW5jKHNvdXJjZSwgZGVzdGluYXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGZvbGRlciBpZiBpdCBkb2VzIG5vdCBleGlzdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIE5hbWUgb2YgdGhlIGZvbGRlciB0byBtYWtlIHN1cmUgZXhpc3RzXG4gICAgICovXG4gICAgbWFrZUZvbGRlcklmTm90RXhpc3RzKHBhdGgpXG4gICAge1xuICAgICAgICB2YXIgZGlyID0gcGF0aDtcblxuICAgICAgICBpZiAoIV9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGRpcikpe1xuICAgICAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLm1rZGlyU3luYyhkaXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRvcCBsZXZlbCBmb2xkZXJzIGluIGEgZ2l2ZW4gcGF0aFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFxuICAgICAqL1xuICAgIGdldEZvbGRlcnNJbihmb2xkZXIpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZGRpclN5bmMoZm9sZGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJJbm5lcikge1xuICAgICAgICAgICAgbGV0IGFjdHVhbFBhdGggPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICBsZXQgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhhY3R1YWxQYXRoKTtcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGZvbGRlcnMgYW5kIGZpbGVzIHdpdGhpbiBhIHNwZWNpZmljIGZvbGRlciByZWN1cnNpdmVseVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgUGF0aCBvZiB0aGUgZm9sZGVyIHRvIGdldCBmcm9tXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBBcnJheSBvZiBmaWxlcyBhbmQgZm9sZGVyc1xuICAgICAqL1xuICAgIGdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oZm9sZGVyKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRkaXJTeW5jKGZvbGRlcikuZm9yRWFjaChmdW5jdGlvbiAoZGlySW5uZXIpIHtcbiAgICAgICAgICAgIGxldCBhY3R1YWxQYXRoID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoYWN0dWFsUGF0aCk7XG5cbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoc2VsZi5nZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluKGFjdHVhbFBhdGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChhY3R1YWxQYXRoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3IgYSBzcGVjaWZpYyBmaWxlIHBhdHRlcm4gd2l0aGluIGEgZm9sZGVyLCByZWN1cnNpdmVseVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgRm9sZGVyIHRvIHNlYXJjaCBmcm9tXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm4gUGF0dGVybiBvZiBmaWxlcyB0byBsb29rIGZvclxuICAgICAqL1xuICAgIHNlYXJjaFJlY3Vyc2l2ZShmb2xkZXIsIHBhdHRlcm4pIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkZGlyU3luYyhmb2xkZXIpLmZvckVhY2goZnVuY3Rpb24gKGRpcklubmVyKSB7XG4gICAgICAgICAgICBkaXJJbm5lciA9IHBhdGgucmVzb2x2ZShmb2xkZXIsIGRpcklubmVyKTtcbiAgICAgICAgICAgIHZhciBzdGF0ID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnN0YXRTeW5jKGRpcklubmVyKTtcblxuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChzZWxmLlNlYXJjaFJlY3Vyc2l2ZShkaXJJbm5lciwgcGF0dGVybikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhdC5pc0ZpbGUoKSAmJiBkaXJJbm5lci5lbmRzV2l0aChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChkaXJJbm5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG59XG4iXX0=