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

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable no-unused-vars */

/**
 * @type {WeakMap<ConfigManager, fs>}
 */
var _fileSystem = new WeakMap();
/**
 * @type {WeakMap<ConfigManager, ConfigParser>}
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable no-unused-vars */
var _configParser = new WeakMap();
/**
 * @type {WeakMap<ConfigManager, string>}
 */
var _centralFolderLocation = new WeakMap();
/**
 * @type {WeakMap<ConfigManager, boolean>}
 */
var _isFirstRun = new WeakMap();

var centralFolder = '~/.dolittle';
var configFile = 'config.json';

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
        this._logger.info('Central Dolittle folder does not exist - creating it and setting up default configuration');
        try {
            fileSystem.ensureDirSync(this.centralFolderLocation);
        } catch (err) {
            try {
                var shell = require('shelljs');
                shell.mkdir('-p', this.centralFolderLocation);
            } catch (err) {
                this._logger.error('Could not create .dolittle folder at root: ', err);
                this._logger.info('Try creating this directory manually: ', this.centralFolderLocation);
                throw 'Could not create .dolittle directory';
            }
        }
        var config = new _Config.Config();
        fileSystem.writeFile(this.configFileLocation, JSON.stringify(config));
    } else {
        _isFirstRun.set(this, false);
    }
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXIuanMiXSwibmFtZXMiOlsiX2ZpbGVTeXN0ZW0iLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9jZW50cmFsRm9sZGVyTG9jYXRpb24iLCJfaXNGaXJzdFJ1biIsImNlbnRyYWxGb2xkZXIiLCJjb25maWdGaWxlIiwiZXhwYW5kUGF0aCIsImZpbGVwYXRoIiwicGF0aCIsImpvaW4iLCJwcm9jZXNzIiwiZW52IiwiSE9NRSIsIkhPTUVQQVRIIiwic2xpY2UiLCJtYWtlU3VyZUNlbnRyYWxGb2xkZXJFeGlzdHMiLCJmaWxlU3lzdGVtIiwiZXhpc3RzU3luYyIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiIsInNldCIsIl9sb2dnZXIiLCJpbmZvIiwiZW5zdXJlRGlyU3luYyIsImVyciIsInNoZWxsIiwicmVxdWlyZSIsIm1rZGlyIiwiZXJyb3IiLCJjb25maWciLCJDb25maWciLCJ3cml0ZUZpbGUiLCJjb25maWdGaWxlTG9jYXRpb24iLCJKU09OIiwic3RyaW5naWZ5IiwiQ29uZmlnTWFuYWdlciIsImNvbmZpZ1BhcnNlciIsImxvZ2dlciIsImNhbGwiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUtBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUNBOztBQUVBOzs7QUFHQSxJQUFNQSxjQUFjLElBQUlDLE9BQUosRUFBcEI7QUFDQTs7O0FBaEJBOzs7O0FBSUE7QUFlQSxJQUFNQyxnQkFBZ0IsSUFBSUQsT0FBSixFQUF0QjtBQUNBOzs7QUFHQSxJQUFNRSx5QkFBeUIsSUFBSUYsT0FBSixFQUEvQjtBQUNBOzs7QUFHQSxJQUFNRyxjQUFjLElBQUlILE9BQUosRUFBcEI7O0FBRUEsSUFBTUksZ0JBQWdCLGFBQXRCO0FBQ0EsSUFBTUMsYUFBYSxhQUFuQjs7QUFFQTs7OztBQUlBLFNBQVNDLFVBQVQsQ0FBb0JDLFFBQXBCLEVBQThCO0FBQzFCLFFBQUlBLFNBQVMsQ0FBVCxNQUFnQixHQUFwQixFQUF5QjtBQUNyQixlQUFPQyxlQUFLQyxJQUFMLENBQVVDLFFBQVFDLEdBQVIsQ0FBWUMsSUFBWixJQUFrQkYsUUFBUUMsR0FBUixDQUFZRSxRQUF4QyxFQUFrRE4sU0FBU08sS0FBVCxDQUFlLENBQWYsQ0FBbEQsQ0FBUDtBQUNIO0FBQ0QsV0FBT1AsUUFBUDtBQUNIOztBQUVEOzs7O0FBSUEsU0FBU1EsMkJBQVQsQ0FBcUNDLFVBQXJDLEVBQWlEO0FBQzdDLFFBQUksQ0FBQ0EsV0FBV0MsVUFBWCxDQUFzQixLQUFLQyxxQkFBM0IsQ0FBTCxFQUF3RDtBQUNwRGYsb0JBQVlnQixHQUFaLENBQWdCLElBQWhCLEVBQXNCLElBQXRCO0FBQ0EsYUFBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLDJGQUFsQjtBQUNBLFlBQUk7QUFDQUwsdUJBQVdNLGFBQVgsQ0FBeUIsS0FBS0oscUJBQTlCO0FBQ0gsU0FGRCxDQUVFLE9BQU1LLEdBQU4sRUFDRjtBQUNJLGdCQUFJO0FBQ0Esb0JBQUlDLFFBQVFDLFFBQVEsU0FBUixDQUFaO0FBQ0FELHNCQUFNRSxLQUFOLENBQVksSUFBWixFQUFrQixLQUFLUixxQkFBdkI7QUFFSCxhQUpELENBSUUsT0FBTUssR0FBTixFQUNGO0FBQ0kscUJBQUtILE9BQUwsQ0FBYU8sS0FBYixDQUFtQiw2Q0FBbkIsRUFBa0VKLEdBQWxFO0FBQ0EscUJBQUtILE9BQUwsQ0FBYUMsSUFBYixDQUFrQix3Q0FBbEIsRUFBNEQsS0FBS0gscUJBQWpFO0FBQ0Esc0JBQU0sc0NBQU47QUFDSDtBQUNKO0FBQ0QsWUFBSVUsU0FBUyxJQUFJQyxjQUFKLEVBQWI7QUFDQWIsbUJBQVdjLFNBQVgsQ0FBcUIsS0FBS0Msa0JBQTFCLEVBQThDQyxLQUFLQyxTQUFMLENBQWVMLE1BQWYsQ0FBOUM7QUFDSCxLQXBCRCxNQW9CTztBQUNIekIsb0JBQVlnQixHQUFaLENBQWdCLElBQWhCLEVBQXNCLEtBQXRCO0FBQ0g7QUFDSjs7QUFFRDs7OztJQUdhZSxhLFdBQUFBLGE7O0FBRVQ7Ozs7OztBQU1BLDJCQUFZbEIsVUFBWixFQUF3Qm1CLFlBQXhCLEVBQXNDQyxNQUF0QyxFQUE4QztBQUFBOztBQUMxQ3JDLG9CQUFZb0IsR0FBWixDQUFnQixJQUFoQixFQUFzQkgsVUFBdEI7QUFDQWYsc0JBQWNrQixHQUFkLENBQWtCLElBQWxCLEVBQXdCZ0IsWUFBeEI7QUFDQSxhQUFLZixPQUFMLEdBQWVnQixNQUFmOztBQUVBbEMsK0JBQXVCaUIsR0FBdkIsQ0FBMkIsSUFBM0IsRUFBaUNiLFdBQVdGLGFBQVgsQ0FBakM7QUFDQVcsb0NBQTRCc0IsSUFBNUIsQ0FBaUMsSUFBakMsRUFBdUNyQixVQUF2QztBQUNIOztBQUVEOzs7Ozs7Ozs0QkFJNEI7QUFDeEIsbUJBQU9kLHVCQUF1Qm9DLEdBQXZCLENBQTJCLElBQTNCLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJeUI7QUFDckIsbUJBQU85QixlQUFLQyxJQUFMLENBQVUsS0FBS1MscUJBQWYsRUFBc0NiLFVBQXRDLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJaUI7QUFDYixtQkFBT0YsWUFBWW1DLEdBQVosQ0FBZ0IsSUFBaEIsQ0FBUDtBQUNIIiwiZmlsZSI6IkNvbmZpZ01hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbmltcG9ydCB7Q29uZmlnUGFyc2VyfSBmcm9tICcuL0NvbmZpZ1BhcnNlcic7XHJcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL0NvbmZpZyc7XHJcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICd3aW5zdG9uJztcclxuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7V2Vha01hcDxDb25maWdNYW5hZ2VyLCBmcz59XHJcbiAqL1xyXG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XHJcbi8qKlxyXG4gKiBAdHlwZSB7V2Vha01hcDxDb25maWdNYW5hZ2VyLCBDb25maWdQYXJzZXI+fVxyXG4gKi9cclxuY29uc3QgX2NvbmZpZ1BhcnNlciA9IG5ldyBXZWFrTWFwKCk7XHJcbi8qKlxyXG4gKiBAdHlwZSB7V2Vha01hcDxDb25maWdNYW5hZ2VyLCBzdHJpbmc+fVxyXG4gKi9cclxuY29uc3QgX2NlbnRyYWxGb2xkZXJMb2NhdGlvbiA9IG5ldyBXZWFrTWFwKCk7XHJcbi8qKlxyXG4gKiBAdHlwZSB7V2Vha01hcDxDb25maWdNYW5hZ2VyLCBib29sZWFuPn1cclxuICovXHJcbmNvbnN0IF9pc0ZpcnN0UnVuID0gbmV3IFdlYWtNYXAoKTtcclxuXHJcbmNvbnN0IGNlbnRyYWxGb2xkZXIgPSAnfi8uZG9saXR0bGUnO1xyXG5jb25zdCBjb25maWdGaWxlID0gJ2NvbmZpZy5qc29uJztcclxuXHJcbi8qKlxyXG4gKiBFeHBhbmQgdGhlIGdpdmVuIGZpbGVwYXRocyBwb3NzaWJsZSByZWZlcmVuY2UgdG8gaG9tZSBmb2xkZXJcclxuICogQHBhcmFtIHsqfSBmaWxlcGF0aCBcclxuICovXHJcbmZ1bmN0aW9uIGV4cGFuZFBhdGgoZmlsZXBhdGgpIHtcclxuICAgIGlmIChmaWxlcGF0aFswXSA9PT0gJ34nKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihwcm9jZXNzLmVudi5IT01FfHxwcm9jZXNzLmVudi5IT01FUEFUSCwgZmlsZXBhdGguc2xpY2UoMSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbGVwYXRoO1xyXG59XHJcblxyXG4vKipcclxuICogTWFrZSBzdXJlIHRoZSBjZW50cmFsIGZvbGRlciBleGlzdHNcclxuICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbSBcclxuICovXHJcbmZ1bmN0aW9uIG1ha2VTdXJlQ2VudHJhbEZvbGRlckV4aXN0cyhmaWxlU3lzdGVtKSB7XHJcbiAgICBpZiggIWZpbGVTeXN0ZW0uZXhpc3RzU3luYyh0aGlzLmNlbnRyYWxGb2xkZXJMb2NhdGlvbikpIHtcclxuICAgICAgICBfaXNGaXJzdFJ1bi5zZXQodGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oJ0NlbnRyYWwgRG9saXR0bGUgZm9sZGVyIGRvZXMgbm90IGV4aXN0IC0gY3JlYXRpbmcgaXQgYW5kIHNldHRpbmcgdXAgZGVmYXVsdCBjb25maWd1cmF0aW9uJyk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZmlsZVN5c3RlbS5lbnN1cmVEaXJTeW5jKHRoaXMuY2VudHJhbEZvbGRlckxvY2F0aW9uKTtcclxuICAgICAgICB9IGNhdGNoKGVycilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hlbGwgPSByZXF1aXJlKCdzaGVsbGpzJyk7XHJcbiAgICAgICAgICAgICAgICBzaGVsbC5ta2RpcignLXAnLCB0aGlzLmNlbnRyYWxGb2xkZXJMb2NhdGlvbik7XHJcbiAgICBcclxuICAgICAgICAgICAgfSBjYXRjaChlcnIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcignQ291bGQgbm90IGNyZWF0ZSAuZG9saXR0bGUgZm9sZGVyIGF0IHJvb3Q6ICcsIGVycik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbygnVHJ5IGNyZWF0aW5nIHRoaXMgZGlyZWN0b3J5IG1hbnVhbGx5OiAnLCB0aGlzLmNlbnRyYWxGb2xkZXJMb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyAnQ291bGQgbm90IGNyZWF0ZSAuZG9saXR0bGUgZGlyZWN0b3J5JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xyXG4gICAgICAgIGZpbGVTeXN0ZW0ud3JpdGVGaWxlKHRoaXMuY29uZmlnRmlsZUxvY2F0aW9uLCBKU09OLnN0cmluZ2lmeShjb25maWcpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX2lzRmlyc3RSdW4uc2V0KHRoaXMsIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBtYW5hZ2VyIGZvciBkZWFsaW5nIHdpdGggY29uZmlndXJhdGlvbnNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maWdNYW5hZ2VyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtDb25maWdNYW5hZ2VyfVxyXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxyXG4gICAgICogQHBhcmFtIHtDb25maWdQYXJzZXJ9IGNvbmZpZ1BhcnNlclxyXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihmaWxlU3lzdGVtLCBjb25maWdQYXJzZXIsIGxvZ2dlcikge1xyXG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcclxuICAgICAgICBfY29uZmlnUGFyc2VyLnNldCh0aGlzLCBjb25maWdQYXJzZXIpO1xyXG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjsgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBfY2VudHJhbEZvbGRlckxvY2F0aW9uLnNldCh0aGlzLCBleHBhbmRQYXRoKGNlbnRyYWxGb2xkZXIpKTtcclxuICAgICAgICBtYWtlU3VyZUNlbnRyYWxGb2xkZXJFeGlzdHMuY2FsbCh0aGlzLCBmaWxlU3lzdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGNlbnRyYWwgZm9sZGVyIGxvY2F0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY2VudHJhbCBmb2xkZXJcclxuICAgICAqL1xyXG4gICAgZ2V0IGNlbnRyYWxGb2xkZXJMb2NhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX2NlbnRyYWxGb2xkZXJMb2NhdGlvbi5nZXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBsb2NhdGlvbiBvZiB0aGUgY29uZmlnIGZpbGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBjb25maWcgZmlsZVxyXG4gICAgICovXHJcbiAgICBnZXQgY29uZmlnRmlsZUxvY2F0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4odGhpcy5jZW50cmFsRm9sZGVyTG9jYXRpb24sIGNvbmZpZ0ZpbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIG9yIG5vdCB0aGlzIGlzIGEgZmlyc3QgcnVuIG9mIHRoZSBDTEkgdG9vbFxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgaXQgaXMsIGZhbHNlIGlmIG5vdFxyXG4gICAgICovXHJcbiAgICBnZXQgaXNGaXJzdFJ1bigpIHtcclxuICAgICAgICByZXR1cm4gX2lzRmlyc3RSdW4uZ2V0KHRoaXMpO1xyXG4gICAgfVxyXG59Il19