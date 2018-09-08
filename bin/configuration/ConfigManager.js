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

var _winston = require('winston');

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
        return _path2.default.join(process.env.HOME || process.env.HOMEPATH, filepath.slice(1));
    }
    return filepath;
}

/**
 * Make sure the central folder exists
 * @param {fs} fileSystem 
 */
function makeSureCentralFolderExists(fileSystem) {
    if (!fileSystem.existsSync(this.centralFolderLocation)) {
        this._logger.info("Central Dolittle folder does not exist - creating it and setting up default configuration");
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
     * @param {Logger} logger
     */
    function ConfigManager(fileSystem, configParser, logger) {
        _classCallCheck(this, ConfigManager);

        _fileSystem.set(this, fileSystem);
        _configParser.set(this, configParser);
        this._logger = logger;

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

        /**
         * Gets the location of the config file
         * @returns {string} The path to the config file
         */

    }, {
        key: 'configFileLocation',
        get: function get() {
            return _path2.default.join(this.centralFolderLocation, configFile);
        }
    }]);

    return ConfigManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXIuanMiXSwibmFtZXMiOlsiX2ZpbGVTeXN0ZW0iLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9jZW50cmFsRm9sZGVyTG9jYXRpb24iLCJjZW50cmFsRm9sZGVyIiwiY29uZmlnRmlsZSIsImV4cGFuZFBhdGgiLCJmaWxlcGF0aCIsInBhdGgiLCJqb2luIiwicHJvY2VzcyIsImVudiIsIkhPTUUiLCJIT01FUEFUSCIsInNsaWNlIiwibWFrZVN1cmVDZW50cmFsRm9sZGVyRXhpc3RzIiwiZmlsZVN5c3RlbSIsImV4aXN0c1N5bmMiLCJjZW50cmFsRm9sZGVyTG9jYXRpb24iLCJfbG9nZ2VyIiwiaW5mbyIsIm1rZGlyIiwiY29uZmlnIiwiQ29uZmlnIiwid3JpdGVGaWxlIiwiY29uZmlnRmlsZUxvY2F0aW9uIiwiSlNPTiIsInN0cmluZ2lmeSIsIkNvbmZpZ01hbmFnZXIiLCJjb25maWdQYXJzZXIiLCJsb2dnZXIiLCJzZXQiLCJjYWxsIiwiZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FqQkFBQTs7Ozs7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxjQUFjLElBQUlDLE9BQUosRUFBcEI7QUFDQSxJQUFNQyxnQkFBZ0IsSUFBSUQsT0FBSixFQUF0QjtBQUNBLElBQU1FLHlCQUF5QixJQUFJRixPQUFKLEVBQS9COztBQUVBLElBQU1HLGdCQUFnQixhQUF0QjtBQUNBLElBQU1DLGFBQWEsYUFBbkI7O0FBRUE7Ozs7QUFJQSxTQUFTQyxVQUFULENBQW9CQyxRQUFwQixFQUE4QjtBQUMxQixRQUFJQSxTQUFTLENBQVQsTUFBZ0IsR0FBcEIsRUFBeUI7QUFDckIsZUFBT0MsZUFBS0MsSUFBTCxDQUFVQyxRQUFRQyxHQUFSLENBQVlDLElBQVosSUFBa0JGLFFBQVFDLEdBQVIsQ0FBWUUsUUFBeEMsRUFBa0ROLFNBQVNPLEtBQVQsQ0FBZSxDQUFmLENBQWxELENBQVA7QUFDSDtBQUNELFdBQU9QLFFBQVA7QUFDSDs7QUFFRDs7OztBQUlBLFNBQVNRLDJCQUFULENBQXFDQyxVQUFyQyxFQUFpRDtBQUM3QyxRQUFJLENBQUNBLFdBQVdDLFVBQVgsQ0FBc0IsS0FBS0MscUJBQTNCLENBQUwsRUFBd0Q7QUFDcEQsYUFBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLDJGQUFsQjtBQUNBSixtQkFBV0ssS0FBWCxDQUFpQixLQUFLSCxxQkFBdEI7QUFDQSxZQUFJSSxTQUFTLElBQUlDLGNBQUosRUFBYjtBQUNBUCxtQkFBV1EsU0FBWCxDQUFxQixLQUFLQyxrQkFBMUIsRUFBOENDLEtBQUtDLFNBQUwsQ0FBZUwsTUFBZixDQUE5QztBQUNIO0FBQ0o7O0FBRUQ7Ozs7SUFHYU0sYSxXQUFBQSxhOztBQUVUOzs7Ozs7QUFNQSwyQkFBWVosVUFBWixFQUF3QmEsWUFBeEIsRUFBc0NDLE1BQXRDLEVBQThDO0FBQUE7O0FBQzFDOUIsb0JBQVkrQixHQUFaLENBQWdCLElBQWhCLEVBQXNCZixVQUF0QjtBQUNBZCxzQkFBYzZCLEdBQWQsQ0FBa0IsSUFBbEIsRUFBd0JGLFlBQXhCO0FBQ0EsYUFBS1YsT0FBTCxHQUFlVyxNQUFmOztBQUVBM0IsK0JBQXVCNEIsR0FBdkIsQ0FBMkIsSUFBM0IsRUFBaUN6QixXQUFXRixhQUFYLENBQWpDO0FBQ0FXLG9DQUE0QmlCLElBQTVCLENBQWlDLElBQWpDLEVBQXVDaEIsVUFBdkM7QUFDSDs7QUFFRDs7Ozs7Ozs7NEJBSTRCO0FBQ3hCLG1CQUFPYix1QkFBdUI4QixHQUF2QixDQUEyQixJQUEzQixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSXlCO0FBQ3JCLG1CQUFPekIsZUFBS0MsSUFBTCxDQUFVLEtBQUtTLHFCQUFmLEVBQXNDYixVQUF0QyxDQUFQO0FBQ0giLCJmaWxlIjoiQ29uZmlnTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7wqBDb25maWdQYXJzZXIgfSBmcm9tICcuL0NvbmZpZ1BhcnNlcic7XG5pbXBvcnQge8KgQ29uZmlnIH0gZnJvbSAnLi9Db25maWcnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9jb25maWdQYXJzZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2NlbnRyYWxGb2xkZXJMb2NhdGlvbiA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IGNlbnRyYWxGb2xkZXIgPSAnfi8uZG9saXR0bGUnO1xuY29uc3QgY29uZmlnRmlsZSA9IFwiY29uZmlnLmpzb25cIjtcblxuLyoqXG4gKiBFeHBhbmQgdGhlIGdpdmVuIGZpbGVwYXRocyBwb3NzaWJsZSByZWZlcmVuY2UgdG8gaG9tZSBmb2xkZXJcbiAqIEBwYXJhbSB7Kn0gZmlsZXBhdGggXG4gKi9cbmZ1bmN0aW9uIGV4cGFuZFBhdGgoZmlsZXBhdGgpIHtcbiAgICBpZiAoZmlsZXBhdGhbMF0gPT09ICd+Jykge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKHByb2Nlc3MuZW52LkhPTUV8fHByb2Nlc3MuZW52LkhPTUVQQVRILCBmaWxlcGF0aC5zbGljZSgxKSk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlcGF0aDtcbn1cblxuLyoqXG4gKiBNYWtlIHN1cmUgdGhlIGNlbnRyYWwgZm9sZGVyIGV4aXN0c1xuICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbSBcbiAqL1xuZnVuY3Rpb24gbWFrZVN1cmVDZW50cmFsRm9sZGVyRXhpc3RzKGZpbGVTeXN0ZW0pIHtcbiAgICBpZiggIWZpbGVTeXN0ZW0uZXhpc3RzU3luYyh0aGlzLmNlbnRyYWxGb2xkZXJMb2NhdGlvbikpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oXCJDZW50cmFsIERvbGl0dGxlIGZvbGRlciBkb2VzIG5vdCBleGlzdCAtIGNyZWF0aW5nIGl0IGFuZCBzZXR0aW5nIHVwIGRlZmF1bHQgY29uZmlndXJhdGlvblwiKTtcbiAgICAgICAgZmlsZVN5c3RlbS5ta2Rpcih0aGlzLmNlbnRyYWxGb2xkZXJMb2NhdGlvbik7XG4gICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgIGZpbGVTeXN0ZW0ud3JpdGVGaWxlKHRoaXMuY29uZmlnRmlsZUxvY2F0aW9uLCBKU09OLnN0cmluZ2lmeShjb25maWcpKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBtYW5hZ2VyIGZvciBkZWFsaW5nIHdpdGggY29uZmlndXJhdGlvbnNcbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZ01hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0NvbmZpZ01hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7Q29uZmlnUGFyc2VyfSBjb25maWdQYXJzZXJcbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZmlsZVN5c3RlbSwgY29uZmlnUGFyc2VyLCBsb2dnZXIpIHtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICBfY29uZmlnUGFyc2VyLnNldCh0aGlzLCBjb25maWdQYXJzZXIpO1xuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7ICAgICAgXG4gICAgICAgIFxuICAgICAgICBfY2VudHJhbEZvbGRlckxvY2F0aW9uLnNldCh0aGlzLCBleHBhbmRQYXRoKGNlbnRyYWxGb2xkZXIpKTtcbiAgICAgICAgbWFrZVN1cmVDZW50cmFsRm9sZGVyRXhpc3RzLmNhbGwodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY2VudHJhbCBmb2xkZXIgbG9jYXRpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY2VudHJhbCBmb2xkZXJcbiAgICAgKi9cbiAgICBnZXQgY2VudHJhbEZvbGRlckxvY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2NlbnRyYWxGb2xkZXJMb2NhdGlvbi5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbG9jYXRpb24gb2YgdGhlIGNvbmZpZyBmaWxlXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIGNvbmZpZyBmaWxlXG4gICAgICovXG4gICAgZ2V0IGNvbmZpZ0ZpbGVMb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbih0aGlzLmNlbnRyYWxGb2xkZXJMb2NhdGlvbiwgY29uZmlnRmlsZSk7XG4gICAgfVxufSJdfQ==