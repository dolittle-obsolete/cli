'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _simpleGit = require('simple-git');

var _simpleGit2 = _interopRequireDefault(_simpleGit);

var _ConfigManager = require('./configuration/ConfigManager');

var _ConfigParser = require('./configuration/ConfigParser');

var _ApplicationManager = require('./applications/ApplicationManager');

var _BoundedContextManager = require('./boundedContexts/BoundedContextManager');

var _BoilerPlatesManager = require('./boilerPlates/BoilerPlatesManager');

var _HttpWrapper = require('./HttpWrapper');

var _Folders = require('./Folders');

var _ArtifactsManager = require('./artifacts/ArtifactsManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var _configManager = new WeakMap();
var _configParser = new WeakMap();
var _applicationManager = new WeakMap();
var _artifactsManager = new WeakMap();
var _boundedContextManager = new WeakMap();
var _boilerPlatesManager = new WeakMap();
var _folders = new WeakMap();
var _git = new WeakMap();
var _logger = new WeakMap();
var _httpWrapper = new WeakMap();

/**
 * Common global object
 */

var global = function () {

    /**
     * Perform initialization
     */
    function global() {
        (0, _classCallCheck3.default)(this, global);

        _logger.set(this, _winston2.default.createLogger({
            level: 'info',
            format: _winston2.default.format.combine(_winston2.default.format.colorize(), _winston2.default.format.simple()),
            transports: [new _winston2.default.transports.Console()]
        }));

        _httpWrapper.set(this, new _HttpWrapper.HttpWrapper());

        _configParser.set(this, new _ConfigParser.ConfigParser());
        _configManager.set(this, new _ConfigManager.ConfigManager(_fs2.default, this.configParser, this.logger));

        var git = (0, _simpleGit2.default)(this.configManager.centralFolderLocation);
        git.forFolder = function (folder) {
            return (0, _simpleGit2.default)(folder);
        };

        _git.set(this, git);
        _folders.set(this, new _Folders.Folders(_fs2.default));
        _boilerPlatesManager.set(this, new _BoilerPlatesManager.BoilerPlatesManager(this.configManager, this.httpWrapper, this.git, this.folders, _fs2.default, this.logger));
        _applicationManager.set(this, new _ApplicationManager.ApplicationManager(this.boilerPlatesManager, this.configManager, this.folders, _fs2.default, this.logger));
        _boundedContextManager.set(this, new _BoundedContextManager.BoundedContextManager(this.boilerPlatesManager, this.applicationManager, this.folders, _fs2.default, this.logger));
        _artifactsManager.set(this, new _ArtifactsManager.ArtifactsManager(this.boilerPlatesManager, this.folders, _fs2.default, this.logger));
    }

    /**
     * Gets the {ConfigManager}
     * @returns {ConfigManager}
     */


    (0, _createClass3.default)(global, [{
        key: 'configManager',
        get: function get() {
            return _configManager.get(this);
        }

        /**
         * Gets the {ConfigParser}
         * @returns {ConfigParser}
         */

    }, {
        key: 'configParser',
        get: function get() {
            return _configParser.get(this);
        }

        /**
         * Gets the {Folders}
         * @returns {Folders}
         */

    }, {
        key: 'folders',
        get: function get() {
            return _folders.get(this);
        }

        /**
         * Gets the {ApplicationManager}
         * @returns {ApplicationManager}
         */

    }, {
        key: 'applicationManager',
        get: function get() {
            return _applicationManager.get(this);
        }

        /** 
         * Gets the {ArtifactsManager}
         * @returns {ArtifactsManager}
         */

    }, {
        key: 'artifactsManager',
        get: function get() {
            return _artifactsManager.get(this);
        }

        /**
         * Gets the {BoundedContextManager}
         * @returns {BoundedContextManager}
         */

    }, {
        key: 'boundedContextManager',
        get: function get() {
            return _boundedContextManager.get(this);
        }

        /**
         * Gets the {BoilerPlatesManager}
         * @returns {BoilerPlatesManager}
         */

    }, {
        key: 'boilerPlatesManager',
        get: function get() {
            return _boilerPlatesManager.get(this);
        }

        /**
         * Gets the {Git} system
         * @returns {Git}
         */

    }, {
        key: 'git',
        get: function get() {
            return _git.get(this);
        }

        /**
         * Gets the {Logger}
         * @returns {Logger}
         */

    }, {
        key: 'logger',
        get: function get() {
            return _logger.get(this);
        }

        /**
         * Gets the {HttpWrapper}
         * @returns {HttpWrapper}
         */

    }, {
        key: 'httpWrapper',
        get: function get() {
            return _httpWrapper.get(this);
        }
    }]);
    return global;
}();

exports.default = new global();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9nbG9iYWwuanMiXSwibmFtZXMiOlsiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfYXJ0aWZhY3RzTWFuYWdlciIsIl9ib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIl9mb2xkZXJzIiwiX2dpdCIsIl9sb2dnZXIiLCJfaHR0cFdyYXBwZXIiLCJnbG9iYWwiLCJzZXQiLCJ3aW5zdG9uIiwiY3JlYXRlTG9nZ2VyIiwibGV2ZWwiLCJmb3JtYXQiLCJjb21iaW5lIiwiY29sb3JpemUiLCJzaW1wbGUiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsIkh0dHBXcmFwcGVyIiwiQ29uZmlnUGFyc2VyIiwiQ29uZmlnTWFuYWdlciIsImZzIiwiY29uZmlnUGFyc2VyIiwibG9nZ2VyIiwiZ2l0IiwiY29uZmlnTWFuYWdlciIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiIsImZvckZvbGRlciIsImZvbGRlciIsIkZvbGRlcnMiLCJCb2lsZXJQbGF0ZXNNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJmb2xkZXJzIiwiQXBwbGljYXRpb25NYW5hZ2VyIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsIkJvdW5kZWRDb250ZXh0TWFuYWdlciIsImFwcGxpY2F0aW9uTWFuYWdlciIsIkFydGlmYWN0c01hbmFnZXIiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFmQTs7OztBQWlCQSxJQUFNQSxpQkFBaUIsSUFBSUMsT0FBSixFQUF2QjtBQUNBLElBQU1DLGdCQUFnQixJQUFJRCxPQUFKLEVBQXRCO0FBQ0EsSUFBTUUsc0JBQXNCLElBQUlGLE9BQUosRUFBNUI7QUFDQSxJQUFNRyxvQkFBb0IsSUFBSUgsT0FBSixFQUEx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O0FBRUQ7Ozs7Ozs7NEJBSXVCO0FBQ25CLG1CQUFPdEMsa0JBQWtCc0MsR0FBbEIsQ0FBc0IsSUFBdEIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OzRCQUk0QjtBQUN4QixtQkFBT3JDLHVCQUF1QnFDLEdBQXZCLENBQTJCLElBQTNCLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJMEI7QUFDdEIsbUJBQU9wQyxxQkFBcUJvQyxHQUFyQixDQUF5QixJQUF6QixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSVU7QUFDTixtQkFBT2xDLEtBQUtrQyxHQUFMLENBQVMsSUFBVCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSWE7QUFDVCxtQkFBT2pDLFFBQVFpQyxHQUFSLENBQVksSUFBWixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSWtCO0FBQ2QsbUJBQU9oQyxhQUFhZ0MsR0FBYixDQUFpQixJQUFqQixDQUFQO0FBQ0g7Ozs7O2tCQUdVLElBQUkvQixNQUFKLEUiLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB3aW5zdG9uIGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHNpbXBsZUdpdCBmcm9tICdzaW1wbGUtZ2l0JztcbmltcG9ydCB7IEdpdCB9IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgQ29uZmlnTWFuYWdlciB9IGZyb20gJy4vY29uZmlndXJhdGlvbi9Db25maWdNYW5hZ2VyJztcbmltcG9ydCB7IENvbmZpZ1BhcnNlciB9IGZyb20gJy4vY29uZmlndXJhdGlvbi9Db25maWdQYXJzZXInO1xuaW1wb3J0IHsgQXBwbGljYXRpb25NYW5hZ2VyIH0gZnJvbSAnLi9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyJztcbmltcG9ydCB7IEJvdW5kZWRDb250ZXh0TWFuYWdlciB9IGZyb20gJy4vYm91bmRlZENvbnRleHRzL0JvdW5kZWRDb250ZXh0TWFuYWdlcic7XG5pbXBvcnQgeyBCb2lsZXJQbGF0ZXNNYW5hZ2VyIH0gZnJvbSAnLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XG5pbXBvcnQgeyBIdHRwV3JhcHBlciB9IGZyb20gJy4vSHR0cFdyYXBwZXInO1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4vRm9sZGVycyc7XG5pbXBvcnQgeyBBcnRpZmFjdHNNYW5hZ2VyIH0gZnJvbSAnLi9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlcic7XG5cbmNvbnN0IF9jb25maWdNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9jb25maWdQYXJzZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2FwcGxpY2F0aW9uTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfYXJ0aWZhY3RzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfYm91bmRlZENvbnRleHRNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9naXQgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2xvZ2dlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaHR0cFdyYXBwZXIgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIENvbW1vbiBnbG9iYWwgb2JqZWN0XG4gKi9cbmNsYXNzIGdsb2JhbCB7XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGluaXRpYWxpemF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIF9sb2dnZXIuc2V0KHRoaXMsIHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcbiAgICAgICAgICAgIGxldmVsOiAnaW5mbycsXG4gICAgICAgICAgICBmb3JtYXQ6IHdpbnN0b24uZm9ybWF0LmNvbWJpbmUoXG4gICAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSxcbiAgICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5zaW1wbGUoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoKVxuICAgICAgICAgICAgXVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgX2h0dHBXcmFwcGVyLnNldCh0aGlzLCBuZXcgSHR0cFdyYXBwZXIoKSk7XG4gICAgICAgIFxuICAgICAgICBfY29uZmlnUGFyc2VyLnNldCh0aGlzLCBuZXcgQ29uZmlnUGFyc2VyKCkpO1xuICAgICAgICBfY29uZmlnTWFuYWdlci5zZXQodGhpcywgbmV3IENvbmZpZ01hbmFnZXIoZnMsIHRoaXMuY29uZmlnUGFyc2VyLCB0aGlzLmxvZ2dlcikpO1xuXG4gICAgICAgIGxldCBnaXQgPSBzaW1wbGVHaXQodGhpcy5jb25maWdNYW5hZ2VyLmNlbnRyYWxGb2xkZXJMb2NhdGlvbik7XG4gICAgICAgIGdpdC5mb3JGb2xkZXIgPSAoZm9sZGVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2ltcGxlR2l0KGZvbGRlcik7XG4gICAgICAgIH07XG5cbiAgICAgICAgX2dpdC5zZXQodGhpcywgZ2l0KTtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIG5ldyBGb2xkZXJzKGZzKSk7XG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLnNldCh0aGlzLCBuZXcgQm9pbGVyUGxhdGVzTWFuYWdlcih0aGlzLmNvbmZpZ01hbmFnZXIsIHRoaXMuaHR0cFdyYXBwZXIsIHRoaXMuZ2l0LCB0aGlzLmZvbGRlcnMsIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBfYXBwbGljYXRpb25NYW5hZ2VyLnNldCh0aGlzLCBuZXcgQXBwbGljYXRpb25NYW5hZ2VyKHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5jb25maWdNYW5hZ2VyLCB0aGlzLmZvbGRlcnMsICBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2JvdW5kZWRDb250ZXh0TWFuYWdlci5zZXQodGhpcywgbmV3IEJvdW5kZWRDb250ZXh0TWFuYWdlcih0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuYXBwbGljYXRpb25NYW5hZ2VyLCB0aGlzLmZvbGRlcnMsIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBfYXJ0aWZhY3RzTWFuYWdlci5zZXQodGhpcywgbmV3IEFydGlmYWN0c01hbmFnZXIodGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmZvbGRlcnMsIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtDb25maWdNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtDb25maWdNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBjb25maWdNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2NvbmZpZ01hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtDb25maWdQYXJzZXJ9XG4gICAgICogQHJldHVybnMge0NvbmZpZ1BhcnNlcn1cbiAgICAgKi9cbiAgICBnZXQgY29uZmlnUGFyc2VyKCkge1xuICAgICAgICByZXR1cm4gX2NvbmZpZ1BhcnNlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0ZvbGRlcnN9XG4gICAgICogQHJldHVybnMge0ZvbGRlcnN9XG4gICAgICovXG4gICAgZ2V0IGZvbGRlcnMoKSB7XG4gICAgICAgIHJldHVybiBfZm9sZGVycy5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0FwcGxpY2F0aW9uTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7QXBwbGljYXRpb25NYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBhcHBsaWNhdGlvbk1hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfYXBwbGljYXRpb25NYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKiogXG4gICAgICogR2V0cyB0aGUge0FydGlmYWN0c01hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0FydGlmYWN0c01hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGFydGlmYWN0c01hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfYXJ0aWZhY3RzTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0JvdW5kZWRDb250ZXh0TWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7Qm91bmRlZENvbnRleHRNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBib3VuZGVkQ29udGV4dE1hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfYm91bmRlZENvbnRleHRNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVzTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7R2l0fSBzeXN0ZW1cbiAgICAgKiBAcmV0dXJucyB7R2l0fVxuICAgICAqL1xuICAgIGdldCBnaXQoKSB7XG4gICAgICAgIHJldHVybiBfZ2l0LmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7TG9nZ2VyfVxuICAgICAqIEByZXR1cm5zIHtMb2dnZXJ9XG4gICAgICovXG4gICAgZ2V0IGxvZ2dlcigpIHvCoFxuICAgICAgICByZXR1cm4gX2xvZ2dlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0h0dHBXcmFwcGVyfVxuICAgICAqIEByZXR1cm5zIHtIdHRwV3JhcHBlcn1cbiAgICAgKi9cbiAgICBnZXQgaHR0cFdyYXBwZXIoKSB7XG4gICAgICAgIHJldHVybiBfaHR0cFdyYXBwZXIuZ2V0KHRoaXMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IGdsb2JhbCgpOyJdfQ==