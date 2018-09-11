'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConfigManager = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ConfigParser = require('./ConfigParser');

var _Config = require('./Config');

var _winston = require('winston');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _fileSystem = new WeakMap(); /*---------------------------------------------------------------------------------------------
                                  *  Copyright (c) Dolittle. All rights reserved.
                                  *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                  *--------------------------------------------------------------------------------------------*/

var _configParser = new WeakMap();
var _centralFolderLocation = new WeakMap();
var _isFirstRun = new WeakMap();

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
        _isFirstRun.set(this, true);
        this._logger.info("Central Dolittle folder does not exist - creating it and setting up default configuration");
        fileSystem.mkdir(this.centralFolderLocation);
        var config = new _Config.Config();
        fileSystem.writeFile(this.configFileLocation, JSON.stringify(config));
    } else {
        _isFirstRun.set(this, false);
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
        (0, _classCallCheck3.default)(this, ConfigManager);

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


    (0, _createClass3.default)(ConfigManager, [{
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

        /**
         * Gets whether or not this is a first run of the CLI tool
         * @returns {boolean} True if it is, false if not
         */

    }, {
        key: 'isFirstRun',
        get: function get() {
            return _isFirstRun.get(this);
        }
    }]);
    return ConfigManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXIuanMiXSwibmFtZXMiOlsiX2ZpbGVTeXN0ZW0iLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9jZW50cmFsRm9sZGVyTG9jYXRpb24iLCJfaXNGaXJzdFJ1biIsImNlbnRyYWxGb2xkZXIiLCJjb25maWdGaWxlIiwiZXhwYW5kUGF0aCIsImZpbGVwYXRoIiwicGF0aCIsImpvaW4iLCJwcm9jZXNzIiwiZW52IiwiSE9NRSIsIkhPTUVQQVRIIiwic2xpY2UiLCJtYWtlU3VyZUNlbnRyYWxGb2xkZXJFeGlzdHMiLCJmaWxlU3lzdGVtIiwiZXhpc3RzU3luYyIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiIsInNldCIsIl9sb2dnZXIiLCJpbmZvIiwibWtkaXIiLCJjb25maWciLCJDb25maWciLCJ3cml0ZUZpbGUiLCJjb25maWdGaWxlTG9jYXRpb24iLCJKU09OIiwic3RyaW5naWZ5IiwiQ29uZmlnTWFuYWdlciIsImNvbmZpZ1BhcnNlciIsImxvZ2dlciIsImNhbGwiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGNBQWMsSUFBSUMsT0FBSixFQUFwQixDLENBVkE7Ozs7O0FBV0EsSUFBTUMsZ0JBQWdCLElBQUlELE9BQUosRUFBdEI7QUFDQSxJQUFNRSx5QkFBeUIsSUFBSUYsT0FBSixFQUEvQjtBQUNBLElBQU1HLGNBQWMsSUFBSUgsT0FBSixFQUFwQjs7QUFFQSxJQUFNSSxnQkFBZ0IsYUFBdEI7QUFDQSxJQUFNQyxhQUFhLGFBQW5COztBQUVBOzs7O0FBSUEsU0FBU0MsVUFBVCxDQUFvQkMsUUFBcEIsRUFBOEI7QUFDMUIsUUFBSUEsU0FBUyxDQUFULE1BQWdCLEdBQXBCLEVBQXlCO0FBQ3JCLGVBQU9DLGVBQUtDLElBQUwsQ0FBVUMsUUFBUUMsR0FBUixDQUFZQyxJQUFaLElBQWtCRixRQUFRQyxHQUFSLENBQVlFLFFBQXhDLEVBQWtETixTQUFTTyxLQUFULENBQWUsQ0FBZixDQUFsRCxDQUFQO0FBQ0g7QUFDRCxXQUFPUCxRQUFQO0FBQ0g7O0FBRUQ7Ozs7QUFJQSxTQUFTUSwyQkFBVCxDQUFxQ0MsVUFBckMsRUFBaUQ7QUFDN0MsUUFBSSxDQUFDQSxXQUFXQyxVQUFYLENBQXNCLEtBQUtDLHFCQUEzQixDQUFMLEVBQXdEO0FBQ3BEZixvQkFBWWdCLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0IsSUFBdEI7QUFDQSxhQUFLQyxPQUFMLENBQWFDLElBQWIsQ0FBa0IsMkZBQWxCO0FBQ0FMLG1CQUFXTSxLQUFYLENBQWlCLEtBQUtKLHFCQUF0QjtBQUNBLFlBQUlLLFNBQVMsSUFBSUMsY0FBSixFQUFiO0FBQ0FSLG1CQUFXUyxTQUFYLENBQXFCLEtBQUtDLGtCQUExQixFQUE4Q0MsS0FBS0MsU0FBTCxDQUFlTCxNQUFmLENBQTlDO0FBQ0gsS0FORCxNQU1PO0FBQ0hwQixvQkFBWWdCLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0IsS0FBdEI7QUFDSDtBQUNKOztBQUVEOzs7O0lBR2FVLGEsV0FBQUEsYTs7QUFFVDs7Ozs7O0FBTUEsMkJBQVliLFVBQVosRUFBd0JjLFlBQXhCLEVBQXNDQyxNQUF0QyxFQUE4QztBQUFBOztBQUMxQ2hDLG9CQUFZb0IsR0FBWixDQUFnQixJQUFoQixFQUFzQkgsVUFBdEI7QUFDQWYsc0JBQWNrQixHQUFkLENBQWtCLElBQWxCLEVBQXdCVyxZQUF4QjtBQUNBLGFBQUtWLE9BQUwsR0FBZVcsTUFBZjs7QUFFQTdCLCtCQUF1QmlCLEdBQXZCLENBQTJCLElBQTNCLEVBQWlDYixXQUFXRixhQUFYLENBQWpDO0FBQ0FXLG9DQUE0QmlCLElBQTVCLENBQWlDLElBQWpDLEVBQXVDaEIsVUFBdkM7QUFDSDs7QUFFRDs7Ozs7Ozs7NEJBSTRCO0FBQ3hCLG1CQUFPZCx1QkFBdUIrQixHQUF2QixDQUEyQixJQUEzQixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSXlCO0FBQ3JCLG1CQUFPekIsZUFBS0MsSUFBTCxDQUFVLEtBQUtTLHFCQUFmLEVBQXNDYixVQUF0QyxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSWlCO0FBQ2IsbUJBQU9GLFlBQVk4QixHQUFaLENBQWdCLElBQWhCLENBQVA7QUFDSCIsImZpbGUiOiJDb25maWdNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHvCoENvbmZpZ1BhcnNlciB9IGZyb20gJy4vQ29uZmlnUGFyc2VyJztcbmltcG9ydCB7wqBDb25maWcgfSBmcm9tICcuL0NvbmZpZyc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2NvbmZpZ1BhcnNlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfY2VudHJhbEZvbGRlckxvY2F0aW9uID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9pc0ZpcnN0UnVuID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgY2VudHJhbEZvbGRlciA9ICd+Ly5kb2xpdHRsZSc7XG5jb25zdCBjb25maWdGaWxlID0gXCJjb25maWcuanNvblwiO1xuXG4vKipcbiAqIEV4cGFuZCB0aGUgZ2l2ZW4gZmlsZXBhdGhzIHBvc3NpYmxlIHJlZmVyZW5jZSB0byBob21lIGZvbGRlclxuICogQHBhcmFtIHsqfSBmaWxlcGF0aCBcbiAqL1xuZnVuY3Rpb24gZXhwYW5kUGF0aChmaWxlcGF0aCkge1xuICAgIGlmIChmaWxlcGF0aFswXSA9PT0gJ34nKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4ocHJvY2Vzcy5lbnYuSE9NRXx8cHJvY2Vzcy5lbnYuSE9NRVBBVEgsIGZpbGVwYXRoLnNsaWNlKDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGVwYXRoO1xufVxuXG4vKipcbiAqIE1ha2Ugc3VyZSB0aGUgY2VudHJhbCBmb2xkZXIgZXhpc3RzXG4gKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtIFxuICovXG5mdW5jdGlvbiBtYWtlU3VyZUNlbnRyYWxGb2xkZXJFeGlzdHMoZmlsZVN5c3RlbSkge1xuICAgIGlmKCAhZmlsZVN5c3RlbS5leGlzdHNTeW5jKHRoaXMuY2VudHJhbEZvbGRlckxvY2F0aW9uKSkge1xuICAgICAgICBfaXNGaXJzdFJ1bi5zZXQodGhpcywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKFwiQ2VudHJhbCBEb2xpdHRsZSBmb2xkZXIgZG9lcyBub3QgZXhpc3QgLSBjcmVhdGluZyBpdCBhbmQgc2V0dGluZyB1cCBkZWZhdWx0IGNvbmZpZ3VyYXRpb25cIik7XG4gICAgICAgIGZpbGVTeXN0ZW0ubWtkaXIodGhpcy5jZW50cmFsRm9sZGVyTG9jYXRpb24pO1xuICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICBmaWxlU3lzdGVtLndyaXRlRmlsZSh0aGlzLmNvbmZpZ0ZpbGVMb2NhdGlvbiwgSlNPTi5zdHJpbmdpZnkoY29uZmlnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX2lzRmlyc3RSdW4uc2V0KHRoaXMsIGZhbHNlKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBtYW5hZ2VyIGZvciBkZWFsaW5nIHdpdGggY29uZmlndXJhdGlvbnNcbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZ01hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0NvbmZpZ01hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7Q29uZmlnUGFyc2VyfSBjb25maWdQYXJzZXJcbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZmlsZVN5c3RlbSwgY29uZmlnUGFyc2VyLCBsb2dnZXIpIHtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICBfY29uZmlnUGFyc2VyLnNldCh0aGlzLCBjb25maWdQYXJzZXIpO1xuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7ICAgICAgXG4gICAgICAgIFxuICAgICAgICBfY2VudHJhbEZvbGRlckxvY2F0aW9uLnNldCh0aGlzLCBleHBhbmRQYXRoKGNlbnRyYWxGb2xkZXIpKTtcbiAgICAgICAgbWFrZVN1cmVDZW50cmFsRm9sZGVyRXhpc3RzLmNhbGwodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY2VudHJhbCBmb2xkZXIgbG9jYXRpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY2VudHJhbCBmb2xkZXJcbiAgICAgKi9cbiAgICBnZXQgY2VudHJhbEZvbGRlckxvY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2NlbnRyYWxGb2xkZXJMb2NhdGlvbi5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbG9jYXRpb24gb2YgdGhlIGNvbmZpZyBmaWxlXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIGNvbmZpZyBmaWxlXG4gICAgICovXG4gICAgZ2V0IGNvbmZpZ0ZpbGVMb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbih0aGlzLmNlbnRyYWxGb2xkZXJMb2NhdGlvbiwgY29uZmlnRmlsZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIG9yIG5vdCB0aGlzIGlzIGEgZmlyc3QgcnVuIG9mIHRoZSBDTEkgdG9vbFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGl0IGlzLCBmYWxzZSBpZiBub3RcbiAgICAgKi9cbiAgICBnZXQgaXNGaXJzdFJ1bigpIHtcbiAgICAgICAgcmV0dXJuIF9pc0ZpcnN0UnVuLmdldCh0aGlzKTtcbiAgICB9XG59Il19