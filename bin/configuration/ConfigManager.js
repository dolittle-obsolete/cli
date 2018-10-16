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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXIuanMiXSwibmFtZXMiOlsiX2ZpbGVTeXN0ZW0iLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9jZW50cmFsRm9sZGVyTG9jYXRpb24iLCJfaXNGaXJzdFJ1biIsImNlbnRyYWxGb2xkZXIiLCJjb25maWdGaWxlIiwiZXhwYW5kUGF0aCIsImZpbGVwYXRoIiwicGF0aCIsImpvaW4iLCJwcm9jZXNzIiwiZW52IiwiSE9NRSIsIkhPTUVQQVRIIiwic2xpY2UiLCJtYWtlU3VyZUNlbnRyYWxGb2xkZXJFeGlzdHMiLCJmaWxlU3lzdGVtIiwiZXhpc3RzU3luYyIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiIsInNldCIsIl9sb2dnZXIiLCJpbmZvIiwiZW5zdXJlRGlyU3luYyIsImVyciIsInNoZWxsIiwicmVxdWlyZSIsIm1rZGlyIiwiZXJyb3IiLCJjb25maWciLCJDb25maWciLCJ3cml0ZUZpbGUiLCJjb25maWdGaWxlTG9jYXRpb24iLCJKU09OIiwic3RyaW5naWZ5IiwiQ29uZmlnTWFuYWdlciIsImNvbmZpZ1BhcnNlciIsImxvZ2dlciIsImNhbGwiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUtBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUNBOztBQUVBOzs7QUFHQSxJQUFNQSxjQUFjLElBQUlDLE9BQUosRUFBcEI7QUFDQTs7O0FBaEJBOzs7O0FBSUE7QUFlQSxJQUFNQyxnQkFBZ0IsSUFBSUQsT0FBSixFQUF0QjtBQUNBOzs7QUFHQSxJQUFNRSx5QkFBeUIsSUFBSUYsT0FBSixFQUEvQjtBQUNBOzs7QUFHQSxJQUFNRyxjQUFjLElBQUlILE9BQUosRUFBcEI7O0FBRUEsSUFBTUksZ0JBQWdCLGFBQXRCO0FBQ0EsSUFBTUMsYUFBYSxhQUFuQjs7QUFFQTs7OztBQUlBLFNBQVNDLFVBQVQsQ0FBb0JDLFFBQXBCLEVBQThCO0FBQzFCLFFBQUlBLFNBQVMsQ0FBVCxNQUFnQixHQUFwQixFQUF5QjtBQUNyQixlQUFPQyxlQUFLQyxJQUFMLENBQVVDLFFBQVFDLEdBQVIsQ0FBWUMsSUFBWixJQUFrQkYsUUFBUUMsR0FBUixDQUFZRSxRQUF4QyxFQUFrRE4sU0FBU08sS0FBVCxDQUFlLENBQWYsQ0FBbEQsQ0FBUDtBQUNIO0FBQ0QsV0FBT1AsUUFBUDtBQUNIOztBQUVEOzs7O0FBSUEsU0FBU1EsMkJBQVQsQ0FBcUNDLFVBQXJDLEVBQWlEO0FBQzdDLFFBQUksQ0FBQ0EsV0FBV0MsVUFBWCxDQUFzQixLQUFLQyxxQkFBM0IsQ0FBTCxFQUF3RDtBQUNwRGYsb0JBQVlnQixHQUFaLENBQWdCLElBQWhCLEVBQXNCLElBQXRCO0FBQ0EsYUFBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLDJGQUFsQjtBQUNBLFlBQUk7QUFDQUwsdUJBQVdNLGFBQVgsQ0FBeUIsS0FBS0oscUJBQTlCO0FBQ0gsU0FGRCxDQUVFLE9BQU1LLEdBQU4sRUFDRjtBQUNJLGdCQUFJO0FBQ0Esb0JBQUlDLFFBQVFDLFFBQVEsU0FBUixDQUFaO0FBQ0FELHNCQUFNRSxLQUFOLENBQVksSUFBWixFQUFrQixLQUFLUixxQkFBdkI7QUFFSCxhQUpELENBSUUsT0FBTUssR0FBTixFQUNGO0FBQ0kscUJBQUtILE9BQUwsQ0FBYU8sS0FBYixDQUFtQiw2Q0FBbkIsRUFBa0VKLEdBQWxFO0FBQ0EscUJBQUtILE9BQUwsQ0FBYUMsSUFBYixDQUFrQix3Q0FBbEIsRUFBNEQsS0FBS0gscUJBQWpFO0FBQ0Esc0JBQU0sc0NBQU47QUFDSDtBQUNKO0FBQ0QsWUFBSVUsU0FBUyxJQUFJQyxjQUFKLEVBQWI7QUFDQWIsbUJBQVdjLFNBQVgsQ0FBcUIsS0FBS0Msa0JBQTFCLEVBQThDQyxLQUFLQyxTQUFMLENBQWVMLE1BQWYsQ0FBOUM7QUFDSCxLQXBCRCxNQW9CTztBQUNIekIsb0JBQVlnQixHQUFaLENBQWdCLElBQWhCLEVBQXNCLEtBQXRCO0FBQ0g7QUFDSjs7QUFFRDs7OztJQUdhZSxhLFdBQUFBLGE7O0FBRVQ7Ozs7OztBQU1BLDJCQUFZbEIsVUFBWixFQUF3Qm1CLFlBQXhCLEVBQXNDQyxNQUF0QyxFQUE4QztBQUFBOztBQUMxQ3JDLG9CQUFZb0IsR0FBWixDQUFnQixJQUFoQixFQUFzQkgsVUFBdEI7QUFDQWYsc0JBQWNrQixHQUFkLENBQWtCLElBQWxCLEVBQXdCZ0IsWUFBeEI7QUFDQSxhQUFLZixPQUFMLEdBQWVnQixNQUFmOztBQUVBbEMsK0JBQXVCaUIsR0FBdkIsQ0FBMkIsSUFBM0IsRUFBaUNiLFdBQVdGLGFBQVgsQ0FBakM7QUFDQVcsb0NBQTRCc0IsSUFBNUIsQ0FBaUMsSUFBakMsRUFBdUNyQixVQUF2QztBQUNIOztBQUVEOzs7Ozs7Ozs0QkFJNEI7QUFDeEIsbUJBQU9kLHVCQUF1Qm9DLEdBQXZCLENBQTJCLElBQTNCLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJeUI7QUFDckIsbUJBQU85QixlQUFLQyxJQUFMLENBQVUsS0FBS1MscUJBQWYsRUFBc0NiLFVBQXRDLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJaUI7QUFDYixtQkFBT0YsWUFBWW1DLEdBQVosQ0FBZ0IsSUFBaEIsQ0FBUDtBQUNIIiwiZmlsZSI6IkNvbmZpZ01hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtDb25maWdQYXJzZXJ9IGZyb20gJy4vQ29uZmlnUGFyc2VyJztcbmltcG9ydCB7Q29uZmlnfSBmcm9tICcuL0NvbmZpZyc7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Q29uZmlnTWFuYWdlciwgZnM+fVxuICovXG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPENvbmZpZ01hbmFnZXIsIENvbmZpZ1BhcnNlcj59XG4gKi9cbmNvbnN0IF9jb25maWdQYXJzZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxDb25maWdNYW5hZ2VyLCBzdHJpbmc+fVxuICovXG5jb25zdCBfY2VudHJhbEZvbGRlckxvY2F0aW9uID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Q29uZmlnTWFuYWdlciwgYm9vbGVhbj59XG4gKi9cbmNvbnN0IF9pc0ZpcnN0UnVuID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgY2VudHJhbEZvbGRlciA9ICd+Ly5kb2xpdHRsZSc7XG5jb25zdCBjb25maWdGaWxlID0gJ2NvbmZpZy5qc29uJztcblxuLyoqXG4gKiBFeHBhbmQgdGhlIGdpdmVuIGZpbGVwYXRocyBwb3NzaWJsZSByZWZlcmVuY2UgdG8gaG9tZSBmb2xkZXJcbiAqIEBwYXJhbSB7Kn0gZmlsZXBhdGggXG4gKi9cbmZ1bmN0aW9uIGV4cGFuZFBhdGgoZmlsZXBhdGgpIHtcbiAgICBpZiAoZmlsZXBhdGhbMF0gPT09ICd+Jykge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKHByb2Nlc3MuZW52LkhPTUV8fHByb2Nlc3MuZW52LkhPTUVQQVRILCBmaWxlcGF0aC5zbGljZSgxKSk7XG4gICAgfVxuICAgIHJldHVybiBmaWxlcGF0aDtcbn1cblxuLyoqXG4gKiBNYWtlIHN1cmUgdGhlIGNlbnRyYWwgZm9sZGVyIGV4aXN0c1xuICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbSBcbiAqL1xuZnVuY3Rpb24gbWFrZVN1cmVDZW50cmFsRm9sZGVyRXhpc3RzKGZpbGVTeXN0ZW0pIHtcbiAgICBpZiggIWZpbGVTeXN0ZW0uZXhpc3RzU3luYyh0aGlzLmNlbnRyYWxGb2xkZXJMb2NhdGlvbikpIHtcbiAgICAgICAgX2lzRmlyc3RSdW4uc2V0KHRoaXMsIHRydWUpO1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbygnQ2VudHJhbCBEb2xpdHRsZSBmb2xkZXIgZG9lcyBub3QgZXhpc3QgLSBjcmVhdGluZyBpdCBhbmQgc2V0dGluZyB1cCBkZWZhdWx0IGNvbmZpZ3VyYXRpb24nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZpbGVTeXN0ZW0uZW5zdXJlRGlyU3luYyh0aGlzLmNlbnRyYWxGb2xkZXJMb2NhdGlvbik7XG4gICAgICAgIH0gY2F0Y2goZXJyKVxuICAgICAgICB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBzaGVsbCA9IHJlcXVpcmUoJ3NoZWxsanMnKTtcbiAgICAgICAgICAgICAgICBzaGVsbC5ta2RpcignLXAnLCB0aGlzLmNlbnRyYWxGb2xkZXJMb2NhdGlvbik7XG4gICAgXG4gICAgICAgICAgICB9IGNhdGNoKGVycilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoJ0NvdWxkIG5vdCBjcmVhdGUgLmRvbGl0dGxlIGZvbGRlciBhdCByb290OiAnLCBlcnIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdUcnkgY3JlYXRpbmcgdGhpcyBkaXJlY3RvcnkgbWFudWFsbHk6ICcsIHRoaXMuY2VudHJhbEZvbGRlckxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICB0aHJvdyAnQ291bGQgbm90IGNyZWF0ZSAuZG9saXR0bGUgZGlyZWN0b3J5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICBmaWxlU3lzdGVtLndyaXRlRmlsZSh0aGlzLmNvbmZpZ0ZpbGVMb2NhdGlvbiwgSlNPTi5zdHJpbmdpZnkoY29uZmlnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX2lzRmlyc3RSdW4uc2V0KHRoaXMsIGZhbHNlKTtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIG1hbmFnZXIgZm9yIGRlYWxpbmcgd2l0aCBjb25maWd1cmF0aW9uc1xuICovXG5leHBvcnQgY2xhc3MgQ29uZmlnTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Q29uZmlnTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtDb25maWdQYXJzZXJ9IGNvbmZpZ1BhcnNlclxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihmaWxlU3lzdGVtLCBjb25maWdQYXJzZXIsIGxvZ2dlcikge1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIF9jb25maWdQYXJzZXIuc2V0KHRoaXMsIGNvbmZpZ1BhcnNlcik7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjsgICAgICBcbiAgICAgICAgXG4gICAgICAgIF9jZW50cmFsRm9sZGVyTG9jYXRpb24uc2V0KHRoaXMsIGV4cGFuZFBhdGgoY2VudHJhbEZvbGRlcikpO1xuICAgICAgICBtYWtlU3VyZUNlbnRyYWxGb2xkZXJFeGlzdHMuY2FsbCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjZW50cmFsIGZvbGRlciBsb2NhdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBjZW50cmFsIGZvbGRlclxuICAgICAqL1xuICAgIGdldCBjZW50cmFsRm9sZGVyTG9jYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBfY2VudHJhbEZvbGRlckxvY2F0aW9uLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBsb2NhdGlvbiBvZiB0aGUgY29uZmlnIGZpbGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY29uZmlnIGZpbGVcbiAgICAgKi9cbiAgICBnZXQgY29uZmlnRmlsZUxvY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKHRoaXMuY2VudHJhbEZvbGRlckxvY2F0aW9uLCBjb25maWdGaWxlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgb3Igbm90IHRoaXMgaXMgYSBmaXJzdCBydW4gb2YgdGhlIENMSSB0b29sXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgaXQgaXMsIGZhbHNlIGlmIG5vdFxuICAgICAqL1xuICAgIGdldCBpc0ZpcnN0UnVuKCkge1xuICAgICAgICByZXR1cm4gX2lzRmlyc3RSdW4uZ2V0KHRoaXMpO1xuICAgIH1cbn0iXX0=