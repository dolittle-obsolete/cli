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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9Gb2xkZXJzLmpzIl0sIm5hbWVzIjpbIl9maWxlU3lzdGVtIiwiV2Vha01hcCIsIkZvbGRlcnMiLCJmaWxlU3lzdGVtIiwic2V0IiwiZGVzdGluYXRpb24iLCJzb3VyY2UiLCJmcyIsImNvcHlTeW5jIiwicGF0aCIsImRpciIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJmb2xkZXIiLCJyZXN1bHRzIiwicmVhZGRpclN5bmMiLCJmb3JFYWNoIiwiZGlySW5uZXIiLCJhY3R1YWxQYXRoIiwicmVzb2x2ZSIsInN0YXQiLCJzdGF0U3luYyIsImlzRGlyZWN0b3J5IiwicHVzaCIsInBhdHRlcm4iLCJjb25jYXQiLCJTZWFyY2hSZWN1cnNpdmUiLCJpc0ZpbGUiLCJlbmRzV2l0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxakJBQUE7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsY0FBYyxJQUFJQyxPQUFKLEVBQXBCOztBQUVBOzs7O0lBR2FDLE8sV0FBQUEsTztBQUVUOzs7O0FBSUEscUJBQVlDLFVBQVosRUFBd0I7QUFBQTs7QUFDcEJILG9CQUFZSSxHQUFaLENBQWdCLElBQWhCLEVBQXFCRCxVQUFyQjtBQUNIOztBQUVEOzs7Ozs7Ozs7NkJBS0tFLFcsRUFBYUMsTSxFQUNsQjtBQUNJQyw4QkFBR0MsUUFBSCxDQUFZRixNQUFaLEVBQW9CRCxXQUFwQjtBQUNIOztBQUVEOzs7Ozs7OzhDQUlzQkksSSxFQUN0QjtBQUNJLGdCQUFJQyxNQUFNRCxJQUFWOztBQUVBLGdCQUFJLENBQUNGLGtCQUFHSSxVQUFILENBQWNELEdBQWQsQ0FBTCxFQUF3QjtBQUNwQkgsa0NBQUdLLFNBQUgsQ0FBYUYsR0FBYjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7cUNBSWFHLE0sRUFBUTtBQUNqQixnQkFBSUMsVUFBVSxFQUFkO0FBQ0FQLDhCQUFHUSxXQUFILENBQWVGLE1BQWYsRUFBdUJHLE9BQXZCLENBQStCLFVBQVVDLFFBQVYsRUFBb0I7QUFDL0Msb0JBQUlDLGFBQWFULGVBQUtVLE9BQUwsQ0FBYU4sTUFBYixFQUFxQkksUUFBckIsQ0FBakI7QUFDQSxvQkFBSUcsT0FBT2Isa0JBQUdjLFFBQUgsQ0FBWUgsVUFBWixDQUFYO0FBQ0Esb0JBQUlFLEtBQUtFLFdBQUwsRUFBSixFQUF3QjtBQUNwQlIsNEJBQVFTLElBQVIsQ0FBYUwsVUFBYjtBQUNIO0FBQ0osYUFORDtBQU9BLG1CQUFPSixPQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3dDQUtnQkQsTSxFQUFRVyxPLEVBQVM7QUFDN0IsZ0JBQUlWLFVBQVUsRUFBZDs7QUFFQVAsOEJBQUdRLFdBQUgsQ0FBZUYsTUFBZixFQUF1QkcsT0FBdkIsQ0FBK0IsVUFBVUMsUUFBVixFQUFvQjtBQUMvQ0EsMkJBQVdSLGVBQUtVLE9BQUwsQ0FBYU4sTUFBYixFQUFxQkksUUFBckIsQ0FBWDtBQUNBLG9CQUFJRyxPQUFPYixrQkFBR2MsUUFBSCxDQUFZSixRQUFaLENBQVg7O0FBRUEsb0JBQUlHLEtBQUtFLFdBQUwsRUFBSixFQUF3QjtBQUNwQlIsOEJBQVVBLFFBQVFXLE1BQVIsQ0FBZSxLQUFLQyxlQUFMLENBQXFCVCxRQUFyQixFQUErQk8sT0FBL0IsQ0FBZixDQUFWO0FBQ0g7O0FBRUQsb0JBQUlKLEtBQUtPLE1BQUwsTUFBaUJWLFNBQVNXLFFBQVQsQ0FBa0JKLE9BQWxCLENBQXJCLEVBQWlEO0FBQzdDViw0QkFBUVMsSUFBUixDQUFhTixRQUFiO0FBQ0g7QUFDSixhQVhEOztBQWFBLG1CQUFPSCxPQUFQO0FBQ0giLCJmaWxlIjoiRm9sZGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgaGVscGVycyBmb3Igd29ya2luZyB3aXRoIGZvbGRlcnNcbiAqL1xuZXhwb3J0IGNsYXNzIEZvbGRlcnNcbntcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Zm9sZGVyc31cbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZpbGVTeXN0ZW0pIHtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsZmlsZVN5c3RlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29weSBvbmUgZm9sZGVyIGFuZCBpdHMgY29udGVudCByZWN1cnNpdmVseSB0byBhIHNwZWNpZmllZCBkZXN0aW5hdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvbiBEZXN0aW5hdGlvbiBwYXRoIHRvIGNvcHkgdG9cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc291cmNlIFNvdXJjZSBwYXRoIHRvIGNvcHkgZnJvbVxuICAgICAqL1xuICAgIGNvcHkoZGVzdGluYXRpb24sIHNvdXJjZSlcbiAgICB7XG4gICAgICAgIGZzLmNvcHlTeW5jKHNvdXJjZSwgZGVzdGluYXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGZvbGRlciBpZiBpdCBkb2VzIG5vdCBleGlzdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIE5hbWUgb2YgdGhlIGZvbGRlciB0byBtYWtlIHN1cmUgZXhpc3RzXG4gICAgICovXG4gICAgbWFrZUZvbGRlcklmTm90RXhpc3RzKHBhdGgpXG4gICAge1xuICAgICAgICB2YXIgZGlyID0gcGF0aDtcblxuICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlyKSl7XG4gICAgICAgICAgICBmcy5ta2RpclN5bmMoZGlyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0b3AgbGV2ZWwgZm9sZGVycyBpbiBhIGdpdmVuIHBhdGhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBcbiAgICAgKi9cbiAgICBnZXRGb2xkZXJzSW4oZm9sZGVyKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgIGZzLnJlYWRkaXJTeW5jKGZvbGRlcikuZm9yRWFjaChmdW5jdGlvbiAoZGlySW5uZXIpIHtcbiAgICAgICAgICAgIGxldCBhY3R1YWxQYXRoID0gcGF0aC5yZXNvbHZlKGZvbGRlciwgZGlySW5uZXIpO1xuICAgICAgICAgICAgbGV0IHN0YXQgPSBmcy5zdGF0U3luYyhhY3R1YWxQYXRoKTtcbiAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goYWN0dWFsUGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggZm9yIGEgc3BlY2lmaWMgZmlsZSBwYXR0ZXJuIHdpdGhpbiBhIGZvbGRlciwgcmVjdXJzaXZlbHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIEZvbGRlciB0byBzZWFyY2ggZnJvbVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuIFBhdHRlcm4gb2YgZmlsZXMgdG8gbG9vayBmb3JcbiAgICAgKi9cbiAgICBzZWFyY2hSZWN1cnNpdmUoZm9sZGVyLCBwYXR0ZXJuKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICAgICAgZnMucmVhZGRpclN5bmMoZm9sZGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJJbm5lcikge1xuICAgICAgICAgICAgZGlySW5uZXIgPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICB2YXIgc3RhdCA9IGZzLnN0YXRTeW5jKGRpcklubmVyKTtcblxuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdCh0aGlzLlNlYXJjaFJlY3Vyc2l2ZShkaXJJbm5lciwgcGF0dGVybikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhdC5pc0ZpbGUoKSAmJiBkaXJJbm5lci5lbmRzV2l0aChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChkaXJJbm5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG59XG4iXX0=