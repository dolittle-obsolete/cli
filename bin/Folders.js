'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.folders = undefined;

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

var folders = exports.folders = function () {
    /**
     * Initializes a new instance of {folders}
     * @param {fs} fileSystem 
     */
    function folders(fileSystem) {
        _classCallCheck(this, folders);

        _fileSystem.set(this, fileSystem);
    }

    /**
     * Copy one folder and its content recursively to a specified destination
     * @param {string} destination Destination path to copy to
     * @param {string} source Source path to copy from
     */


    _createClass(folders, [{
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
                    results = results.concat(folderHandler.SearchRecursive(dirInner, pattern));
                }

                if (stat.isFile() && dirInner.endsWith(pattern)) {
                    results.push(dirInner);
                }
            });

            return results;
        }
    }]);

    return folders;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9Gb2xkZXJzLmpzIl0sIm5hbWVzIjpbIl9maWxlU3lzdGVtIiwiV2Vha01hcCIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwic2V0IiwiZGVzdGluYXRpb24iLCJzb3VyY2UiLCJmcyIsImNvcHlTeW5jIiwicGF0aCIsImRpciIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJmb2xkZXIiLCJwYXR0ZXJuIiwicmVzdWx0cyIsInJlYWRkaXJTeW5jIiwiZm9yRWFjaCIsImRpcklubmVyIiwicmVzb2x2ZSIsInN0YXQiLCJzdGF0U3luYyIsImlzRGlyZWN0b3J5IiwiY29uY2F0IiwiZm9sZGVySGFuZGxlciIsIlNlYXJjaFJlY3Vyc2l2ZSIsImlzRmlsZSIsImVuZHNXaXRoIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxakJBQUE7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsY0FBYyxJQUFJQyxPQUFKLEVBQXBCOztBQUVBOzs7O0lBR2FDLE8sV0FBQUEsTztBQUVUOzs7O0FBSUEscUJBQVlDLFVBQVosRUFBd0I7QUFBQTs7QUFDcEJILG9CQUFZSSxHQUFaLENBQWdCLElBQWhCLEVBQXFCRCxVQUFyQjtBQUNIOztBQUVEOzs7Ozs7Ozs7NkJBS0tFLFcsRUFBYUMsTSxFQUNsQjtBQUNJQyw4QkFBR0MsUUFBSCxDQUFZRixNQUFaLEVBQW9CRCxXQUFwQjtBQUNIOztBQUVEOzs7Ozs7OzhDQUlzQkksSSxFQUN0QjtBQUNJLGdCQUFJQyxNQUFNRCxJQUFWOztBQUVBLGdCQUFJLENBQUNGLGtCQUFHSSxVQUFILENBQWNELEdBQWQsQ0FBTCxFQUF3QjtBQUNwQkgsa0NBQUdLLFNBQUgsQ0FBYUYsR0FBYjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7O3dDQUtnQkcsTSxFQUFRQyxPLEVBQVM7QUFDN0IsZ0JBQUlDLFVBQVUsRUFBZDs7QUFFQVIsOEJBQUdTLFdBQUgsQ0FBZUgsTUFBZixFQUF1QkksT0FBdkIsQ0FBK0IsVUFBVUMsUUFBVixFQUFvQjtBQUMvQ0EsMkJBQVdULGVBQUtVLE9BQUwsQ0FBYU4sTUFBYixFQUFxQkssUUFBckIsQ0FBWDtBQUNBLG9CQUFJRSxPQUFPYixrQkFBR2MsUUFBSCxDQUFZSCxRQUFaLENBQVg7O0FBRUEsb0JBQUlFLEtBQUtFLFdBQUwsRUFBSixFQUF3QjtBQUNwQlAsOEJBQVVBLFFBQVFRLE1BQVIsQ0FBZUMsY0FBY0MsZUFBZCxDQUE4QlAsUUFBOUIsRUFBd0NKLE9BQXhDLENBQWYsQ0FBVjtBQUNIOztBQUVELG9CQUFJTSxLQUFLTSxNQUFMLE1BQWlCUixTQUFTUyxRQUFULENBQWtCYixPQUFsQixDQUFyQixFQUFpRDtBQUM3Q0MsNEJBQVFhLElBQVIsQ0FBYVYsUUFBYjtBQUNIO0FBQ0osYUFYRDs7QUFhQSxtQkFBT0gsT0FBUDtBQUNIIiwiZmlsZSI6IkZvbGRlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGhlbHBlcnMgZm9yIHdvcmtpbmcgd2l0aCBmb2xkZXJzXG4gKi9cbmV4cG9ydCBjbGFzcyBmb2xkZXJzXG57XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge2ZvbGRlcnN9XG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihmaWxlU3lzdGVtKSB7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLGZpbGVTeXN0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvcHkgb25lIGZvbGRlciBhbmQgaXRzIGNvbnRlbnQgcmVjdXJzaXZlbHkgdG8gYSBzcGVjaWZpZWQgZGVzdGluYXRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb24gRGVzdGluYXRpb24gcGF0aCB0byBjb3B5IHRvXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBTb3VyY2UgcGF0aCB0byBjb3B5IGZyb21cbiAgICAgKi9cbiAgICBjb3B5KGRlc3RpbmF0aW9uLCBzb3VyY2UpXG4gICAge1xuICAgICAgICBmcy5jb3B5U3luYyhzb3VyY2UsIGRlc3RpbmF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBmb2xkZXIgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBOYW1lIG9mIHRoZSBmb2xkZXIgdG8gbWFrZSBzdXJlIGV4aXN0c1xuICAgICAqL1xuICAgIG1ha2VGb2xkZXJJZk5vdEV4aXN0cyhwYXRoKVxuICAgIHtcbiAgICAgICAgdmFyIGRpciA9IHBhdGg7XG5cbiAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcikpe1xuICAgICAgICAgICAgZnMubWtkaXJTeW5jKGRpcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggZm9yIGEgc3BlY2lmaWMgZmlsZSBwYXR0ZXJuIHdpdGhpbiBhIGZvbGRlciwgcmVjdXJzaXZlbHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIEZvbGRlciB0byBzZWFyY2ggZnJvbVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuIFBhdHRlcm4gb2YgZmlsZXMgdG8gbG9vayBmb3JcbiAgICAgKi9cbiAgICBzZWFyY2hSZWN1cnNpdmUoZm9sZGVyLCBwYXR0ZXJuKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICAgICAgZnMucmVhZGRpclN5bmMoZm9sZGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChkaXJJbm5lcikge1xuICAgICAgICAgICAgZGlySW5uZXIgPSBwYXRoLnJlc29sdmUoZm9sZGVyLCBkaXJJbm5lcik7XG4gICAgICAgICAgICB2YXIgc3RhdCA9IGZzLnN0YXRTeW5jKGRpcklubmVyKTtcblxuICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChmb2xkZXJIYW5kbGVyLlNlYXJjaFJlY3Vyc2l2ZShkaXJJbm5lciwgcGF0dGVybikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhdC5pc0ZpbGUoKSAmJiBkaXJJbm5lci5lbmRzV2l0aChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChkaXJJbm5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG59XG4iXX0=