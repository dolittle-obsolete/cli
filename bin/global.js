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

var _InquirerManager = require('./artifacts/InquirerManager');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

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
var _inquirerManager = new WeakMap();

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
        _inquirerManager.set(this, new _InquirerManager.InquirerManager(this.folders, _fs2.default, this.logger));
        _artifactsManager.set(this, new _ArtifactsManager.ArtifactsManager(this.inquirerManager, this.boilerPlatesManager, this.boundedContextManager, this.folders, _fs2.default, this.logger));
    }

    /**
     * Gets the {ConfigManager}
     * @returns {ConfigManager}
     */


    (0, _createClass3.default)(global, [{
        key: 'getFileDirPath',


        /**
         * Gets the full directory path
         * @param {string} filePath
         * @returns {string} directory path
         */
        value: function getFileDirPath(filePath) {
            return _path2.default.parse(filePath).dir;
        }
        /**
         * Gets the filename without extension
         * @param {string} filePath
         * @returns {string} filename
         */

    }, {
        key: 'getFileName',
        value: function getFileName(filePath) {
            return _path2.default.parse(filePath).name;
        }
        /**
         * Gets the filename with extension
         * @param {string} filePath
         * @returns {string} filename
         */

    }, {
        key: 'getFileNameAndExtension',
        value: function getFileNameAndExtension(filePath) {
            return _path2.default.parse(filePath).base;
        }
        /**
         * Gets the directory name
         * @param {string} filePath
         * @returns {string} file dirname
         */

    }, {
        key: 'getFileDir',
        value: function getFileDir(filePath) {
            return _path2.default.dirname(filePath);
        }
    }, {
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
         * Gets the {InquirerManager
         * @returns {InquirerManager}}
         */

    }, {
        key: 'inquirerManager',
        get: function get() {
            return _inquirerManager.get(this);
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
    }, {
        key: 'usagePrefix',
        get: function get() {
            return '\n\t ';
        }
    }]);
    return global;
}();

exports.default = new global();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9nbG9iYWwuanMiXSwibmFtZXMiOlsiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfYXJ0aWZhY3RzTWFuYWdlciIsIl9ib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIl9pbnF1aXJlck1hbmFnZXIiLCJfZm9sZGVycyIsIl9naXQiLCJfbG9nZ2VyIiwiX2h0dHBXcmFwcGVyIiwiZ2xvYmFsIiwic2V0Iiwid2luc3RvbiIsImNyZWF0ZUxvZ2dlciIsImxldmVsIiwiZm9ybWF0IiwiY29tYmluZSIsImNvbG9yaXplIiwic2ltcGxlIiwidHJhbnNwb3J0cyIsIkNvbnNvbGUiLCJIdHRwV3JhcHBlciIsIkNvbmZpZ1BhcnNlciIsIkNvbmZpZ01hbmFnZXIiLCJmcyIsImNvbmZpZ1BhcnNlciIsImxvZ2dlciIsImdpdCIsImNvbmZpZ01hbmFnZXIiLCJjZW50cmFsRm9sZGVyTG9jYXRpb24iLCJmb3JGb2xkZXIiLCJmb2xkZXIiLCJGb2xkZXJzIiwiQm9pbGVyUGxhdGVzTWFuYWdlciIsImh0dHBXcmFwcGVyIiwiZm9sZGVycyIsIkFwcGxpY2F0aW9uTWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJCb3VuZGVkQ29udGV4dE1hbmFnZXIiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJJbnF1aXJlck1hbmFnZXIiLCJBcnRpZmFjdHNNYW5hZ2VyIiwiaW5xdWlyZXJNYW5hZ2VyIiwiYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiZmlsZVBhdGgiLCJwYXRoIiwicGFyc2UiLCJkaXIiLCJuYW1lIiwiYmFzZSIsImRpcm5hbWUiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7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QUFxQixJQUFyQixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSVU7QUFDTixtQkFBTzVDLEtBQUs0QyxHQUFMLENBQVMsSUFBVCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSWE7QUFDVCxtQkFBTzNDLFFBQVEyQyxHQUFSLENBQVksSUFBWixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSWtCO0FBQ2QsbUJBQU8xQyxhQUFhMEMsR0FBYixDQUFpQixJQUFqQixDQUFQO0FBQ0g7Ozs0QkFFaUI7QUFDZCxtQkFBTyxPQUFQO0FBQ0g7Ozs7O2tCQXFDVSxJQUFJekMsTUFBSixFIiwiZmlsZSI6Imdsb2JhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgd2luc3RvbiBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBzaW1wbGVHaXQgZnJvbSAnc2ltcGxlLWdpdCc7XG5pbXBvcnQgeyBHaXQgfSBmcm9tICdzaW1wbGUtZ2l0JztcbmltcG9ydCB7IENvbmZpZ01hbmFnZXIgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XG5pbXBvcnQgeyBDb25maWdQYXJzZXIgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24vQ29uZmlnUGFyc2VyJztcbmltcG9ydCB7IEFwcGxpY2F0aW9uTWFuYWdlciB9IGZyb20gJy4vYXBwbGljYXRpb25zL0FwcGxpY2F0aW9uTWFuYWdlcic7XG5pbXBvcnQgeyBCb3VuZGVkQ29udGV4dE1hbmFnZXIgfSBmcm9tICcuL2JvdW5kZWRDb250ZXh0cy9Cb3VuZGVkQ29udGV4dE1hbmFnZXInO1xuaW1wb3J0IHsgQm9pbGVyUGxhdGVzTWFuYWdlciB9IGZyb20gJy4vYm9pbGVyUGxhdGVzL0JvaWxlclBsYXRlc01hbmFnZXInO1xuaW1wb3J0IHsgSHR0cFdyYXBwZXIgfSBmcm9tICcuL0h0dHBXcmFwcGVyJztcbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuL0ZvbGRlcnMnO1xuaW1wb3J0IHsgQXJ0aWZhY3RzTWFuYWdlciB9IGZyb20gJy4vYXJ0aWZhY3RzL0FydGlmYWN0c01hbmFnZXInO1xuaW1wb3J0IHsgSW5xdWlyZXJNYW5hZ2VyIH0gZnJvbSAnLi9hcnRpZmFjdHMvSW5xdWlyZXJNYW5hZ2VyJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmNvbnN0IF9jb25maWdNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9jb25maWdQYXJzZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2FwcGxpY2F0aW9uTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfYXJ0aWZhY3RzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfYm91bmRlZENvbnRleHRNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9pbnF1aXJlck1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZ2l0ID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9sb2dnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2h0dHBXcmFwcGVyID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBDb21tb24gZ2xvYmFsIG9iamVjdFxuICovXG5jbGFzcyBnbG9iYWwge1xuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gaW5pdGlhbGl6YXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgX2xvZ2dlci5zZXQodGhpcywgd2luc3Rvbi5jcmVhdGVMb2dnZXIoe1xuICAgICAgICAgICAgbGV2ZWw6ICdpbmZvJyxcbiAgICAgICAgICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcbiAgICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5jb2xvcml6ZSgpLFxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LnNpbXBsZSgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICAgICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSgpXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pKTtcblxuICAgICAgICBfaHR0cFdyYXBwZXIuc2V0KHRoaXMsIG5ldyBIdHRwV3JhcHBlcigpKTtcbiAgICAgICAgXG4gICAgICAgIF9jb25maWdQYXJzZXIuc2V0KHRoaXMsIG5ldyBDb25maWdQYXJzZXIoKSk7XG4gICAgICAgIF9jb25maWdNYW5hZ2VyLnNldCh0aGlzLCBuZXcgQ29uZmlnTWFuYWdlcihmcywgdGhpcy5jb25maWdQYXJzZXIsIHRoaXMubG9nZ2VyKSk7XG5cbiAgICAgICAgbGV0IGdpdCA9IHNpbXBsZUdpdCh0aGlzLmNvbmZpZ01hbmFnZXIuY2VudHJhbEZvbGRlckxvY2F0aW9uKTtcbiAgICAgICAgZ2l0LmZvckZvbGRlciA9IChmb2xkZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzaW1wbGVHaXQoZm9sZGVyKTtcbiAgICAgICAgfTtcblxuICAgICAgICBfZ2l0LnNldCh0aGlzLCBnaXQpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgbmV3IEZvbGRlcnMoZnMpKTtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIG5ldyBCb2lsZXJQbGF0ZXNNYW5hZ2VyKHRoaXMuY29uZmlnTWFuYWdlciwgdGhpcy5odHRwV3JhcHBlciwgdGhpcy5naXQsIHRoaXMuZm9sZGVycywgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9hcHBsaWNhdGlvbk1hbmFnZXIuc2V0KHRoaXMsIG5ldyBBcHBsaWNhdGlvbk1hbmFnZXIodGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmNvbmZpZ01hbmFnZXIsIHRoaXMuZm9sZGVycywgIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBfYm91bmRlZENvbnRleHRNYW5hZ2VyLnNldCh0aGlzLCBuZXcgQm91bmRlZENvbnRleHRNYW5hZ2VyKHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5hcHBsaWNhdGlvbk1hbmFnZXIsIHRoaXMuZm9sZGVycywgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuc2V0KHRoaXMsIG5ldyBJbnF1aXJlck1hbmFnZXIodGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2FydGlmYWN0c01hbmFnZXIuc2V0KHRoaXMsIG5ldyBBcnRpZmFjdHNNYW5hZ2VyKHRoaXMuaW5xdWlyZXJNYW5hZ2VyLCB0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuYm91bmRlZENvbnRleHRNYW5hZ2VyLCB0aGlzLmZvbGRlcnMsIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Q29uZmlnTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7Q29uZmlnTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgY29uZmlnTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Q29uZmlnUGFyc2VyfVxuICAgICAqIEByZXR1cm5zIHtDb25maWdQYXJzZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvbmZpZ1BhcnNlcigpIHtcbiAgICAgICAgcmV0dXJuIF9jb25maWdQYXJzZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtGb2xkZXJzfVxuICAgICAqIEByZXR1cm5zIHtGb2xkZXJzfVxuICAgICAqL1xuICAgIGdldCBmb2xkZXJzKCkge1xuICAgICAgICByZXR1cm4gX2ZvbGRlcnMuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0FwcGxpY2F0aW9uTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYXBwbGljYXRpb25NYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2FwcGxpY2F0aW9uTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqIFxuICAgICAqIEdldHMgdGhlIHtBcnRpZmFjdHNNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtBcnRpZmFjdHNNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBhcnRpZmFjdHNNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2FydGlmYWN0c01hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtCb3VuZGVkQ29udGV4dE1hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0JvdW5kZWRDb250ZXh0TWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYm91bmRlZENvbnRleHRNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2JvdW5kZWRDb250ZXh0TWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0JvaWxlclBsYXRlc01hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlc01hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGJvaWxlclBsYXRlc01hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtJbnF1aXJlck1hbmFnZXJcbiAgICAgKiBAcmV0dXJucyB7SW5xdWlyZXJNYW5hZ2VyfX1cbiAgICAgKi9cbiAgICBnZXQgaW5xdWlyZXJNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2lucXVpcmVyTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0dpdH0gc3lzdGVtXG4gICAgICogQHJldHVybnMge0dpdH1cbiAgICAgKi9cbiAgICBnZXQgZ2l0KCkge1xuICAgICAgICByZXR1cm4gX2dpdC5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0xvZ2dlcn1cbiAgICAgKiBAcmV0dXJucyB7TG9nZ2VyfVxuICAgICAqL1xuICAgIGdldCBsb2dnZXIoKSB7wqBcbiAgICAgICAgcmV0dXJuIF9sb2dnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtIdHRwV3JhcHBlcn1cbiAgICAgKiBAcmV0dXJucyB7SHR0cFdyYXBwZXJ9XG4gICAgICovXG4gICAgZ2V0IGh0dHBXcmFwcGVyKCkge1xuICAgICAgICByZXR1cm4gX2h0dHBXcmFwcGVyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXQgdXNhZ2VQcmVmaXgoKSB7XG4gICAgICAgIHJldHVybiAnXFxuXFx0ICc7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGZ1bGwgZGlyZWN0b3J5IHBhdGhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkaXJlY3RvcnkgcGF0aFxuICAgICAqL1xuICAgIGdldEZpbGVEaXJQYXRoKGZpbGVQYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVQYXRoKS5kaXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGZpbGVuYW1lIHdpdGhvdXQgZXh0ZW5zaW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVQYXRoXG4gICAgICogQHJldHVybnMge3N0cmluZ30gZmlsZW5hbWVcbiAgICAgKi9cbiAgICBnZXRGaWxlTmFtZShmaWxlUGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aC5wYXJzZShmaWxlUGF0aCkubmFtZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZmlsZW5hbWUgd2l0aCBleHRlbnNpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBmaWxlbmFtZVxuICAgICAqL1xuICAgIGdldEZpbGVOYW1lQW5kRXh0ZW5zaW9uKGZpbGVQYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVQYXRoKS5iYXNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBkaXJlY3RvcnkgbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGZpbGUgZGlybmFtZVxuICAgICAqL1xuICAgIGdldEZpbGVEaXIoZmlsZVBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguZGlybmFtZShmaWxlUGF0aCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBnbG9iYWwoKTsiXX0=