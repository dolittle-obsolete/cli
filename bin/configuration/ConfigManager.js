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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXIuanMiXSwibmFtZXMiOlsiX2ZpbGVTeXN0ZW0iLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9jZW50cmFsRm9sZGVyTG9jYXRpb24iLCJfaXNGaXJzdFJ1biIsImNlbnRyYWxGb2xkZXIiLCJjb25maWdGaWxlIiwiZXhwYW5kUGF0aCIsImZpbGVwYXRoIiwicGF0aCIsImpvaW4iLCJwcm9jZXNzIiwiZW52IiwiSE9NRSIsIkhPTUVQQVRIIiwic2xpY2UiLCJtYWtlU3VyZUNlbnRyYWxGb2xkZXJFeGlzdHMiLCJmaWxlU3lzdGVtIiwiZXhpc3RzU3luYyIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiIsInNldCIsIl9sb2dnZXIiLCJpbmZvIiwiZW5zdXJlRGlyU3luYyIsImVyciIsInNoZWxsIiwicmVxdWlyZSIsIm1rZGlyIiwiZXJyb3IiLCJjb25maWciLCJDb25maWciLCJ3cml0ZUZpbGUiLCJjb25maWdGaWxlTG9jYXRpb24iLCJKU09OIiwic3RyaW5naWZ5IiwiQ29uZmlnTWFuYWdlciIsImNvbmZpZ1BhcnNlciIsImxvZ2dlciIsImNhbGwiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7QUFHQSxJQUFNQSxjQUFjLElBQUlDLE9BQUosRUFBcEI7QUFDQTs7O0FBZEE7Ozs7QUFpQkEsSUFBTUMsZ0JBQWdCLElBQUlELE9BQUosRUFBdEI7QUFDQTs7O0FBR0EsSUFBTUUseUJBQXlCLElBQUlGLE9BQUosRUFBL0I7QUFDQTs7O0FBR0EsSUFBTUcsY0FBYyxJQUFJSCxPQUFKLEVBQXBCOztBQUVBLElBQU1JLGdCQUFnQixhQUF0QjtBQUNBLElBQU1DLGFBQWEsYUFBbkI7O0FBRUE7Ozs7QUFJQSxTQUFTQyxVQUFULENBQW9CQyxRQUFwQixFQUE4QjtBQUMxQixRQUFJQSxTQUFTLENBQVQsTUFBZ0IsR0FBcEIsRUFBeUI7QUFDckIsZUFBT0MsZUFBS0MsSUFBTCxDQUFVQyxRQUFRQyxHQUFSLENBQVlDLElBQVosSUFBa0JGLFFBQVFDLEdBQVIsQ0FBWUUsUUFBeEMsRUFBa0ROLFNBQVNPLEtBQVQsQ0FBZSxDQUFmLENBQWxELENBQVA7QUFDSDtBQUNELFdBQU9QLFFBQVA7QUFDSDs7QUFFRDs7OztBQUlBLFNBQVNRLDJCQUFULENBQXFDQyxVQUFyQyxFQUFpRDtBQUM3QyxRQUFJLENBQUNBLFdBQVdDLFVBQVgsQ0FBc0IsS0FBS0MscUJBQTNCLENBQUwsRUFBd0Q7QUFDcERmLG9CQUFZZ0IsR0FBWixDQUFnQixJQUFoQixFQUFzQixJQUF0QjtBQUNBLGFBQUtDLE9BQUwsQ0FBYUMsSUFBYixDQUFrQiwyRkFBbEI7QUFDQSxZQUFJO0FBQ0FMLHVCQUFXTSxhQUFYLENBQXlCLEtBQUtKLHFCQUE5QjtBQUNILFNBRkQsQ0FFRSxPQUFNSyxHQUFOLEVBQ0Y7QUFDSSxnQkFBSTtBQUNBLG9CQUFJQyxRQUFRQyxRQUFRLFNBQVIsQ0FBWjtBQUNBRCxzQkFBTUUsS0FBTixDQUFZLElBQVosRUFBa0IsS0FBS1IscUJBQXZCO0FBRUgsYUFKRCxDQUlFLE9BQU1LLEdBQU4sRUFDRjtBQUNJLHFCQUFLSCxPQUFMLENBQWFPLEtBQWIsQ0FBbUIsNkNBQW5CLEVBQWtFSixHQUFsRTtBQUNBLHFCQUFLSCxPQUFMLENBQWFDLElBQWIsQ0FBa0Isd0NBQWxCLEVBQTRELEtBQUtILHFCQUFqRTtBQUNBLHNCQUFNLHNDQUFOO0FBQ0g7QUFDSjtBQUNELFlBQUlVLFNBQVMsSUFBSUMsY0FBSixFQUFiO0FBQ0FiLG1CQUFXYyxTQUFYLENBQXFCLEtBQUtDLGtCQUExQixFQUE4Q0MsS0FBS0MsU0FBTCxDQUFlTCxNQUFmLENBQTlDO0FBQ0gsS0FwQkQsTUFvQk87QUFDSHpCLG9CQUFZZ0IsR0FBWixDQUFnQixJQUFoQixFQUFzQixLQUF0QjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7SUFHYWUsYSxXQUFBQSxhOztBQUVUOzs7Ozs7QUFNQSwyQkFBWWxCLFVBQVosRUFBd0JtQixZQUF4QixFQUFzQ0MsTUFBdEMsRUFBOEM7QUFBQTs7QUFDMUNyQyxvQkFBWW9CLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JILFVBQXRCO0FBQ0FmLHNCQUFja0IsR0FBZCxDQUFrQixJQUFsQixFQUF3QmdCLFlBQXhCO0FBQ0EsYUFBS2YsT0FBTCxHQUFlZ0IsTUFBZjs7QUFFQWxDLCtCQUF1QmlCLEdBQXZCLENBQTJCLElBQTNCLEVBQWlDYixXQUFXRixhQUFYLENBQWpDO0FBQ0FXLG9DQUE0QnNCLElBQTVCLENBQWlDLElBQWpDLEVBQXVDckIsVUFBdkM7QUFDSDs7QUFFRDs7Ozs7Ozs7NEJBSTRCO0FBQ3hCLG1CQUFPZCx1QkFBdUJvQyxHQUF2QixDQUEyQixJQUEzQixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSXlCO0FBQ3JCLG1CQUFPOUIsZUFBS0MsSUFBTCxDQUFVLEtBQUtTLHFCQUFmLEVBQXNDYixVQUF0QyxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSWlCO0FBQ2IsbUJBQU9GLFlBQVltQyxHQUFaLENBQWdCLElBQWhCLENBQVA7QUFDSCIsImZpbGUiOiJDb25maWdNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHvCoENvbmZpZ1BhcnNlciB9IGZyb20gJy4vQ29uZmlnUGFyc2VyJztcbmltcG9ydCB7wqBDb25maWcgfSBmcm9tICcuL0NvbmZpZyc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxDb25maWdNYW5hZ2VyLCBmcz59XG4gKi9cbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Q29uZmlnTWFuYWdlciwgQ29uZmlnUGFyc2VyPn1cbiAqL1xuY29uc3QgX2NvbmZpZ1BhcnNlciA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPENvbmZpZ01hbmFnZXIsIHN0cmluZz59XG4gKi9cbmNvbnN0IF9jZW50cmFsRm9sZGVyTG9jYXRpb24gPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxDb25maWdNYW5hZ2VyLCBib29sZWFuPn1cbiAqL1xuY29uc3QgX2lzRmlyc3RSdW4gPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBjZW50cmFsRm9sZGVyID0gJ34vLmRvbGl0dGxlJztcbmNvbnN0IGNvbmZpZ0ZpbGUgPSBcImNvbmZpZy5qc29uXCI7XG5cbi8qKlxuICogRXhwYW5kIHRoZSBnaXZlbiBmaWxlcGF0aHMgcG9zc2libGUgcmVmZXJlbmNlIHRvIGhvbWUgZm9sZGVyXG4gKiBAcGFyYW0geyp9IGZpbGVwYXRoIFxuICovXG5mdW5jdGlvbiBleHBhbmRQYXRoKGZpbGVwYXRoKSB7XG4gICAgaWYgKGZpbGVwYXRoWzBdID09PSAnficpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihwcm9jZXNzLmVudi5IT01FfHxwcm9jZXNzLmVudi5IT01FUEFUSCwgZmlsZXBhdGguc2xpY2UoMSkpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZXBhdGg7XG59XG5cbi8qKlxuICogTWFrZSBzdXJlIHRoZSBjZW50cmFsIGZvbGRlciBleGlzdHNcbiAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW0gXG4gKi9cbmZ1bmN0aW9uIG1ha2VTdXJlQ2VudHJhbEZvbGRlckV4aXN0cyhmaWxlU3lzdGVtKSB7XG4gICAgaWYoICFmaWxlU3lzdGVtLmV4aXN0c1N5bmModGhpcy5jZW50cmFsRm9sZGVyTG9jYXRpb24pKSB7XG4gICAgICAgIF9pc0ZpcnN0UnVuLnNldCh0aGlzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oXCJDZW50cmFsIERvbGl0dGxlIGZvbGRlciBkb2VzIG5vdCBleGlzdCAtIGNyZWF0aW5nIGl0IGFuZCBzZXR0aW5nIHVwIGRlZmF1bHQgY29uZmlndXJhdGlvblwiKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZpbGVTeXN0ZW0uZW5zdXJlRGlyU3luYyh0aGlzLmNlbnRyYWxGb2xkZXJMb2NhdGlvbik7XG4gICAgICAgIH0gY2F0Y2goZXJyKVxuICAgICAgICB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBzaGVsbCA9IHJlcXVpcmUoJ3NoZWxsanMnKTtcbiAgICAgICAgICAgICAgICBzaGVsbC5ta2RpcignLXAnLCB0aGlzLmNlbnRyYWxGb2xkZXJMb2NhdGlvbik7XG4gICAgXG4gICAgICAgICAgICB9IGNhdGNoKGVycilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoJ0NvdWxkIG5vdCBjcmVhdGUgLmRvbGl0dGxlIGZvbGRlciBhdCByb290OiAnLCBlcnIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdUcnkgY3JlYXRpbmcgdGhpcyBkaXJlY3RvcnkgbWFudWFsbHk6ICcsIHRoaXMuY2VudHJhbEZvbGRlckxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICB0aHJvdyAnQ291bGQgbm90IGNyZWF0ZSAuZG9saXR0bGUgZGlyZWN0b3J5J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgIGZpbGVTeXN0ZW0ud3JpdGVGaWxlKHRoaXMuY29uZmlnRmlsZUxvY2F0aW9uLCBKU09OLnN0cmluZ2lmeShjb25maWcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBfaXNGaXJzdFJ1bi5zZXQodGhpcywgZmFsc2UpO1xuICAgIH1cbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIG1hbmFnZXIgZm9yIGRlYWxpbmcgd2l0aCBjb25maWd1cmF0aW9uc1xuICovXG5leHBvcnQgY2xhc3MgQ29uZmlnTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Q29uZmlnTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtDb25maWdQYXJzZXJ9IGNvbmZpZ1BhcnNlclxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihmaWxlU3lzdGVtLCBjb25maWdQYXJzZXIsIGxvZ2dlcikge1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIF9jb25maWdQYXJzZXIuc2V0KHRoaXMsIGNvbmZpZ1BhcnNlcik7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjsgICAgICBcbiAgICAgICAgXG4gICAgICAgIF9jZW50cmFsRm9sZGVyTG9jYXRpb24uc2V0KHRoaXMsIGV4cGFuZFBhdGgoY2VudHJhbEZvbGRlcikpO1xuICAgICAgICBtYWtlU3VyZUNlbnRyYWxGb2xkZXJFeGlzdHMuY2FsbCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjZW50cmFsIGZvbGRlciBsb2NhdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBjZW50cmFsIGZvbGRlclxuICAgICAqL1xuICAgIGdldCBjZW50cmFsRm9sZGVyTG9jYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBfY2VudHJhbEZvbGRlckxvY2F0aW9uLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBsb2NhdGlvbiBvZiB0aGUgY29uZmlnIGZpbGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY29uZmlnIGZpbGVcbiAgICAgKi9cbiAgICBnZXQgY29uZmlnRmlsZUxvY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKHRoaXMuY2VudHJhbEZvbGRlckxvY2F0aW9uLCBjb25maWdGaWxlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgb3Igbm90IHRoaXMgaXMgYSBmaXJzdCBydW4gb2YgdGhlIENMSSB0b29sXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgaXQgaXMsIGZhbHNlIGlmIG5vdFxuICAgICAqL1xuICAgIGdldCBpc0ZpcnN0UnVuKCkge1xuICAgICAgICByZXR1cm4gX2lzRmlyc3RSdW4uZ2V0KHRoaXMpO1xuICAgIH1cbn0iXX0=