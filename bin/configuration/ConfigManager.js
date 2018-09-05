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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXIuanMiXSwibmFtZXMiOlsiX2ZpbGVTeXN0ZW0iLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9jZW50cmFsRm9sZGVyTG9jYXRpb24iLCJjZW50cmFsRm9sZGVyIiwiY29uZmlnRmlsZSIsImV4cGFuZFBhdGgiLCJmaWxlcGF0aCIsInBhdGgiLCJqb2luIiwicHJvY2VzcyIsImVudiIsIkhPTUUiLCJzbGljZSIsIm1ha2VTdXJlQ2VudHJhbEZvbGRlckV4aXN0cyIsImZpbGVTeXN0ZW0iLCJleGlzdHNTeW5jIiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIiwiX2xvZ2dlciIsImluZm8iLCJta2RpciIsImNvbmZpZyIsIkNvbmZpZyIsIndyaXRlRmlsZSIsImNvbmZpZ0ZpbGVMb2NhdGlvbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJDb25maWdNYW5hZ2VyIiwiY29uZmlnUGFyc2VyIiwibG9nZ2VyIiwic2V0IiwiY2FsbCIsImdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxakJBQUE7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsY0FBYyxJQUFJQyxPQUFKLEVBQXBCO0FBQ0EsSUFBTUMsZ0JBQWdCLElBQUlELE9BQUosRUFBdEI7QUFDQSxJQUFNRSx5QkFBeUIsSUFBSUYsT0FBSixFQUEvQjs7QUFFQSxJQUFNRyxnQkFBZ0IsYUFBdEI7QUFDQSxJQUFNQyxhQUFhLGFBQW5COztBQUVBOzs7O0FBSUEsU0FBU0MsVUFBVCxDQUFvQkMsUUFBcEIsRUFBOEI7QUFDMUIsUUFBSUEsU0FBUyxDQUFULE1BQWdCLEdBQXBCLEVBQXlCO0FBQ3JCLGVBQU9DLGVBQUtDLElBQUwsQ0FBVUMsUUFBUUMsR0FBUixDQUFZQyxJQUF0QixFQUE0QkwsU0FBU00sS0FBVCxDQUFlLENBQWYsQ0FBNUIsQ0FBUDtBQUNIO0FBQ0QsV0FBT04sUUFBUDtBQUNIOztBQUVEOzs7O0FBSUEsU0FBU08sMkJBQVQsQ0FBcUNDLFVBQXJDLEVBQWlEO0FBQzdDLFFBQUksQ0FBQ0EsV0FBV0MsVUFBWCxDQUFzQixLQUFLQyxxQkFBM0IsQ0FBTCxFQUF3RDtBQUNwRCxhQUFLQyxPQUFMLENBQWFDLElBQWIsQ0FBa0IsMkZBQWxCO0FBQ0FKLG1CQUFXSyxLQUFYLENBQWlCLEtBQUtILHFCQUF0QjtBQUNBLFlBQUlJLFNBQVMsSUFBSUMsY0FBSixFQUFiO0FBQ0FQLG1CQUFXUSxTQUFYLENBQXFCLEtBQUtDLGtCQUExQixFQUE4Q0MsS0FBS0MsU0FBTCxDQUFlTCxNQUFmLENBQTlDO0FBQ0g7QUFDSjs7QUFFRDs7OztJQUdhTSxhLFdBQUFBLGE7O0FBRVQ7Ozs7OztBQU1BLDJCQUFZWixVQUFaLEVBQXdCYSxZQUF4QixFQUFzQ0MsTUFBdEMsRUFBOEM7QUFBQTs7QUFDMUM3QixvQkFBWThCLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JmLFVBQXRCO0FBQ0FiLHNCQUFjNEIsR0FBZCxDQUFrQixJQUFsQixFQUF3QkYsWUFBeEI7QUFDQSxhQUFLVixPQUFMLEdBQWVXLE1BQWY7O0FBRUExQiwrQkFBdUIyQixHQUF2QixDQUEyQixJQUEzQixFQUFpQ3hCLFdBQVdGLGFBQVgsQ0FBakM7QUFDQVUsb0NBQTRCaUIsSUFBNUIsQ0FBaUMsSUFBakMsRUFBdUNoQixVQUF2QztBQUNIOztBQUVEOzs7Ozs7Ozs0QkFJNEI7QUFDeEIsbUJBQU9aLHVCQUF1QjZCLEdBQXZCLENBQTJCLElBQTNCLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJeUI7QUFDckIsbUJBQU94QixlQUFLQyxJQUFMLENBQVUsS0FBS1EscUJBQWYsRUFBc0NaLFVBQXRDLENBQVA7QUFDSCIsImZpbGUiOiJDb25maWdNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHvCoENvbmZpZ1BhcnNlciB9IGZyb20gJy4vQ29uZmlnUGFyc2VyJztcbmltcG9ydCB7wqBDb25maWcgfSBmcm9tICcuL0NvbmZpZyc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2NvbmZpZ1BhcnNlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfY2VudHJhbEZvbGRlckxvY2F0aW9uID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgY2VudHJhbEZvbGRlciA9ICd+Ly5kb2xpdHRsZSc7XG5jb25zdCBjb25maWdGaWxlID0gXCJjb25maWcuanNvblwiO1xuXG4vKipcbiAqIEV4cGFuZCB0aGUgZ2l2ZW4gZmlsZXBhdGhzIHBvc3NpYmxlIHJlZmVyZW5jZSB0byBob21lIGZvbGRlclxuICogQHBhcmFtIHsqfSBmaWxlcGF0aCBcbiAqL1xuZnVuY3Rpb24gZXhwYW5kUGF0aChmaWxlcGF0aCkge1xuICAgIGlmIChmaWxlcGF0aFswXSA9PT0gJ34nKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4ocHJvY2Vzcy5lbnYuSE9NRSwgZmlsZXBhdGguc2xpY2UoMSkpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZXBhdGg7XG59XG5cbi8qKlxuICogTWFrZSBzdXJlIHRoZSBjZW50cmFsIGZvbGRlciBleGlzdHNcbiAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW0gXG4gKi9cbmZ1bmN0aW9uIG1ha2VTdXJlQ2VudHJhbEZvbGRlckV4aXN0cyhmaWxlU3lzdGVtKSB7XG4gICAgaWYoICFmaWxlU3lzdGVtLmV4aXN0c1N5bmModGhpcy5jZW50cmFsRm9sZGVyTG9jYXRpb24pKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKFwiQ2VudHJhbCBEb2xpdHRsZSBmb2xkZXIgZG9lcyBub3QgZXhpc3QgLSBjcmVhdGluZyBpdCBhbmQgc2V0dGluZyB1cCBkZWZhdWx0IGNvbmZpZ3VyYXRpb25cIik7XG4gICAgICAgIGZpbGVTeXN0ZW0ubWtkaXIodGhpcy5jZW50cmFsRm9sZGVyTG9jYXRpb24pO1xuICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICBmaWxlU3lzdGVtLndyaXRlRmlsZSh0aGlzLmNvbmZpZ0ZpbGVMb2NhdGlvbiwgSlNPTi5zdHJpbmdpZnkoY29uZmlnKSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbWFuYWdlciBmb3IgZGVhbGluZyB3aXRoIGNvbmZpZ3VyYXRpb25zXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWdNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtDb25maWdNYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKiBAcGFyYW0ge0NvbmZpZ1BhcnNlcn0gY29uZmlnUGFyc2VyXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZpbGVTeXN0ZW0sIGNvbmZpZ1BhcnNlciwgbG9nZ2VyKSB7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgX2NvbmZpZ1BhcnNlci5zZXQodGhpcywgY29uZmlnUGFyc2VyKTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyOyAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBfY2VudHJhbEZvbGRlckxvY2F0aW9uLnNldCh0aGlzLCBleHBhbmRQYXRoKGNlbnRyYWxGb2xkZXIpKTtcbiAgICAgICAgbWFrZVN1cmVDZW50cmFsRm9sZGVyRXhpc3RzLmNhbGwodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY2VudHJhbCBmb2xkZXIgbG9jYXRpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY2VudHJhbCBmb2xkZXJcbiAgICAgKi9cbiAgICBnZXQgY2VudHJhbEZvbGRlckxvY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2NlbnRyYWxGb2xkZXJMb2NhdGlvbi5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbG9jYXRpb24gb2YgdGhlIGNvbmZpZyBmaWxlXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIGNvbmZpZyBmaWxlXG4gICAgICovXG4gICAgZ2V0IGNvbmZpZ0ZpbGVMb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbih0aGlzLmNlbnRyYWxGb2xkZXJMb2NhdGlvbiwgY29uZmlnRmlsZSk7XG4gICAgfVxufSJdfQ==