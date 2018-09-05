'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConfigManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*---------------------------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) Dolittle. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *--------------------------------------------------------------------------------------------*/


var _ConfigParser = require('./ConfigParser');

var _Config = require('./Config');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _fileSystem = new WeakMap();
var _configParser = new WeakMap();
var _centralFolderLocation = new WeakMap();

var centralFolder = '~/.dolittle';
var configFile = "config.json";

/**
 * Expand the given filepaths possible reference to home folder
 * @param {*} filepath 
 */
function expandPath(filepath) {
    if (filepath[0] === '~') {
        return _path2.default.join(process.env.HOME, filepath.slice(1));
    }
    return filepath;
}

/**
 * Make sure the central folder exists
 * @param {fs} fileSystem 
 */
function makeSureCentralFolderExists(fileSystem) {
    if (!fileSystem.existsSync(this.centralFolderLocation)) {
        fileSystem.mkdir(this.centralFolderLocation);
        var config = new _Config.Config();
        fileSystem.writeFile(this.configFileLocation, JSON.stringify(config));
    }
};

/**
 * Represents a manager for dealing with configurations
 */

var ConfigManager = exports.ConfigManager = function () {

    /**
     * Initializes a new instance of {ConfigManager}
     * @param {fs} fileSystem
     * @param {ConfigParser} configParser
     */
    function ConfigManager(fileSystem, configParser) {
        _classCallCheck(this, ConfigManager);

        _fileSystem.set(this, fileSystem);
        _configParser.set(this, configParser);
        _centralFolderLocation.set(this, expandPath(centralFolder));
        makeSureCentralFolderExists.call(this, fileSystem);
    }

    /**
     * Gets the central folder location
     * @returns {string} The path to the central folder
     */


    _createClass(ConfigManager, [{
        key: 'centralFolderLocation',
        get: function get() {
            return _centralFolderLocation.get(this);
        }
    }, {
        key: 'configFileLocation',
        get: function get() {
            return _path2.default.join(this.centralFolderLocation, configFile);
        }
    }]);

    return ConfigManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXIuanMiXSwibmFtZXMiOlsiX2ZpbGVTeXN0ZW0iLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9jZW50cmFsRm9sZGVyTG9jYXRpb24iLCJjZW50cmFsRm9sZGVyIiwiY29uZmlnRmlsZSIsImV4cGFuZFBhdGgiLCJmaWxlcGF0aCIsInBhdGgiLCJqb2luIiwicHJvY2VzcyIsImVudiIsIkhPTUUiLCJzbGljZSIsIm1ha2VTdXJlQ2VudHJhbEZvbGRlckV4aXN0cyIsImZpbGVTeXN0ZW0iLCJleGlzdHNTeW5jIiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIiwibWtkaXIiLCJjb25maWciLCJDb25maWciLCJ3cml0ZUZpbGUiLCJjb25maWdGaWxlTG9jYXRpb24iLCJKU09OIiwic3RyaW5naWZ5IiwiQ29uZmlnTWFuYWdlciIsImNvbmZpZ1BhcnNlciIsInNldCIsImNhbGwiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7cWpCQUFBOzs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLGNBQWMsSUFBSUMsT0FBSixFQUFwQjtBQUNBLElBQU1DLGdCQUFnQixJQUFJRCxPQUFKLEVBQXRCO0FBQ0EsSUFBTUUseUJBQXlCLElBQUlGLE9BQUosRUFBL0I7O0FBRUEsSUFBTUcsZ0JBQWdCLGFBQXRCO0FBQ0EsSUFBTUMsYUFBYSxhQUFuQjs7QUFFQTs7OztBQUlBLFNBQVNDLFVBQVQsQ0FBb0JDLFFBQXBCLEVBQThCO0FBQzFCLFFBQUlBLFNBQVMsQ0FBVCxNQUFnQixHQUFwQixFQUF5QjtBQUNyQixlQUFPQyxlQUFLQyxJQUFMLENBQVVDLFFBQVFDLEdBQVIsQ0FBWUMsSUFBdEIsRUFBNEJMLFNBQVNNLEtBQVQsQ0FBZSxDQUFmLENBQTVCLENBQVA7QUFDSDtBQUNELFdBQU9OLFFBQVA7QUFDSDs7QUFFRDs7OztBQUlBLFNBQVNPLDJCQUFULENBQXFDQyxVQUFyQyxFQUFpRDtBQUM3QyxRQUFJLENBQUNBLFdBQVdDLFVBQVgsQ0FBc0IsS0FBS0MscUJBQTNCLENBQUwsRUFBd0Q7QUFDcERGLG1CQUFXRyxLQUFYLENBQWlCLEtBQUtELHFCQUF0QjtBQUNBLFlBQUlFLFNBQVMsSUFBSUMsY0FBSixFQUFiO0FBQ0FMLG1CQUFXTSxTQUFYLENBQXFCLEtBQUtDLGtCQUExQixFQUE4Q0MsS0FBS0MsU0FBTCxDQUFlTCxNQUFmLENBQTlDO0FBQ0g7QUFDSjs7QUFFRDs7OztJQUdhTSxhLFdBQUFBLGE7O0FBRVQ7Ozs7O0FBS0EsMkJBQVlWLFVBQVosRUFBd0JXLFlBQXhCLEVBQXNDO0FBQUE7O0FBQ2xDMUIsb0JBQVkyQixHQUFaLENBQWdCLElBQWhCLEVBQXNCWixVQUF0QjtBQUNBYixzQkFBY3lCLEdBQWQsQ0FBa0IsSUFBbEIsRUFBd0JELFlBQXhCO0FBQ0F2QiwrQkFBdUJ3QixHQUF2QixDQUEyQixJQUEzQixFQUFpQ3JCLFdBQVdGLGFBQVgsQ0FBakM7QUFDQVUsb0NBQTRCYyxJQUE1QixDQUFpQyxJQUFqQyxFQUF1Q2IsVUFBdkM7QUFDSDs7QUFFRDs7Ozs7Ozs7NEJBSTRCO0FBQ3hCLG1CQUFPWix1QkFBdUIwQixHQUF2QixDQUEyQixJQUEzQixDQUFQO0FBQ0g7Ozs0QkFFd0I7QUFDckIsbUJBQU9yQixlQUFLQyxJQUFMLENBQVUsS0FBS1EscUJBQWYsRUFBc0NaLFVBQXRDLENBQVA7QUFDSCIsImZpbGUiOiJDb25maWdNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHvCoENvbmZpZ1BhcnNlciB9IGZyb20gJy4vQ29uZmlnUGFyc2VyJztcbmltcG9ydCB7wqBDb25maWcgfSBmcm9tICcuL0NvbmZpZyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9jb25maWdQYXJzZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2NlbnRyYWxGb2xkZXJMb2NhdGlvbiA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IGNlbnRyYWxGb2xkZXIgPSAnfi8uZG9saXR0bGUnO1xuY29uc3QgY29uZmlnRmlsZSA9IFwiY29uZmlnLmpzb25cIjtcblxuLyoqXG4gKiBFeHBhbmQgdGhlIGdpdmVuIGZpbGVwYXRocyBwb3NzaWJsZSByZWZlcmVuY2UgdG8gaG9tZSBmb2xkZXJcbiAqIEBwYXJhbSB7Kn0gZmlsZXBhdGggXG4gKi9cbmZ1bmN0aW9uIGV4cGFuZFBhdGgoZmlsZXBhdGgpIHtcbiAgICBpZiAoZmlsZXBhdGhbMF0gPT09ICd+Jykge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKHByb2Nlc3MuZW52LkhPTUUsIGZpbGVwYXRoLnNsaWNlKDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGVwYXRoO1xufVxuXG4vKipcbiAqIE1ha2Ugc3VyZSB0aGUgY2VudHJhbCBmb2xkZXIgZXhpc3RzXG4gKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtIFxuICovXG5mdW5jdGlvbiBtYWtlU3VyZUNlbnRyYWxGb2xkZXJFeGlzdHMoZmlsZVN5c3RlbSkge1xuICAgIGlmKCAhZmlsZVN5c3RlbS5leGlzdHNTeW5jKHRoaXMuY2VudHJhbEZvbGRlckxvY2F0aW9uKSkge1xuICAgICAgICBmaWxlU3lzdGVtLm1rZGlyKHRoaXMuY2VudHJhbEZvbGRlckxvY2F0aW9uKTtcbiAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcbiAgICAgICAgZmlsZVN5c3RlbS53cml0ZUZpbGUodGhpcy5jb25maWdGaWxlTG9jYXRpb24sIEpTT04uc3RyaW5naWZ5KGNvbmZpZykpO1xuICAgIH1cbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIG1hbmFnZXIgZm9yIGRlYWxpbmcgd2l0aCBjb25maWd1cmF0aW9uc1xuICovXG5leHBvcnQgY2xhc3MgQ29uZmlnTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Q29uZmlnTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtDb25maWdQYXJzZXJ9IGNvbmZpZ1BhcnNlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZpbGVTeXN0ZW0sIGNvbmZpZ1BhcnNlcikge1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIF9jb25maWdQYXJzZXIuc2V0KHRoaXMsIGNvbmZpZ1BhcnNlcik7XG4gICAgICAgIF9jZW50cmFsRm9sZGVyTG9jYXRpb24uc2V0KHRoaXMsIGV4cGFuZFBhdGgoY2VudHJhbEZvbGRlcikpO1xuICAgICAgICBtYWtlU3VyZUNlbnRyYWxGb2xkZXJFeGlzdHMuY2FsbCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjZW50cmFsIGZvbGRlciBsb2NhdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBjZW50cmFsIGZvbGRlclxuICAgICAqL1xuICAgIGdldCBjZW50cmFsRm9sZGVyTG9jYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBfY2VudHJhbEZvbGRlckxvY2F0aW9uLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXQgY29uZmlnRmlsZUxvY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKHRoaXMuY2VudHJhbEZvbGRlckxvY2F0aW9uLCBjb25maWdGaWxlKTtcbiAgICB9XG59XG4iXX0=