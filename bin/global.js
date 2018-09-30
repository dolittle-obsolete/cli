'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

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
        _configManager.set(this, new _ConfigManager.ConfigManager(_fsExtra2.default, this.configParser, this.logger));

        var git = (0, _simpleGit2.default)(this.configManager.centralFolderLocation);
        git.forFolder = function (folder) {
            return (0, _simpleGit2.default)(folder);
        };

        _git.set(this, git);
        _folders.set(this, new _Folders.Folders(_fsExtra2.default));
        _boilerPlatesManager.set(this, new _BoilerPlatesManager.BoilerPlatesManager(this.configManager, this.httpWrapper, this.git, this.folders, _fsExtra2.default, this.logger));
        _applicationManager.set(this, new _ApplicationManager.ApplicationManager(this.boilerPlatesManager, this.configManager, this.folders, _fsExtra2.default, this.logger));
        _boundedContextManager.set(this, new _BoundedContextManager.BoundedContextManager(this.boilerPlatesManager, this.applicationManager, this.folders, _fsExtra2.default, this.logger));
        _inquirerManager.set(this, new _InquirerManager.InquirerManager(this.folders, _fsExtra2.default, this.logger));
        _artifactsManager.set(this, new _ArtifactsManager.ArtifactsManager(this.inquirerManager, this.boilerPlatesManager, this.boundedContextManager, this.folders, _fsExtra2.default, this.logger));
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
            filePath = _path2.default.normalize(filePath);
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
            filePath = _path2.default.normalize(filePath);
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
            filePath = _path2.default.normalize(filePath);
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
            filePath = _path2.default.normalize(filePath);
            return _path2.default.dirname(filePath);
        }

        /**
         * Validate the name argument
         * @param {string} name 
         */

    }, {
        key: 'validateArgsNameInput',
        value: function validateArgsNameInput(name) {
            if (name.includes(' ')) {
                _logger.get(this).error('Name argument cannot contain spaces');
                throw 'Argument parsing error';
            }
            if (name.includes('-')) {
                _logger.get(this).error('Name argument cannot contain "-"');
                throw 'Argument parsing error';
            }
            if (name !== _path2.default.basename(name)) {
                _logger.get(this).error("Name argument cannot isn't a valid filename");
                throw 'Argument parsing error';
            }
            if (/^\.\.?$/.test(name)) {
                _logger.get(this).error('Name argument cannot be "." or ".."');
                throw 'Argument parsing error';
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9nbG9iYWwuanMiXSwibmFtZXMiOlsiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfYXJ0aWZhY3RzTWFuYWdlciIsIl9ib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIl9pbnF1aXJlck1hbmFnZXIiLCJfZm9sZGVycyIsIl9naXQiLCJfbG9nZ2VyIiwiX2h0dHBXcmFwcGVyIiwiZ2xvYmFsIiwic2V0Iiwid2luc3RvbiIsImNyZWF0ZUxvZ2dlciIsImxldmVsIiwiZm9ybWF0IiwiY29tYmluZSIsImNvbG9yaXplIiwic2ltcGxlIiwidHJhbnNwb3J0cyIsIkNvbnNvbGUiLCJIdHRwV3JhcHBlciIsIkNvbmZpZ1BhcnNlciIsIkNvbmZpZ01hbmFnZXIiLCJmcyIsImNvbmZpZ1BhcnNlciIsImxvZ2dlciIsImdpdCIsImNvbmZpZ01hbmFnZXIiLCJjZW50cmFsRm9sZGVyTG9jYXRpb24iLCJmb3JGb2xkZXIiLCJmb2xkZXIiLCJGb2xkZXJzIiwiQm9pbGVyUGxhdGVzTWFuYWdlciIsImh0dHBXcmFwcGVyIiwiZm9sZGVycyIsIkFwcGxpY2F0aW9uTWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJCb3VuZGVkQ29udGV4dE1hbmFnZXIiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJJbnF1aXJlck1hbmFnZXIiLCJBcnRpZmFjdHNNYW5hZ2VyIiwiaW5xdWlyZXJNYW5hZ2VyIiwiYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiZmlsZVBhdGgiLCJwYXRoIiwibm9ybWFsaXplIiwicGFyc2UiLCJkaXIiLCJuYW1lIiwiYmFzZSIsImRpcm5hbWUiLCJpbmNsdWRlcyIsImdldCIsImVycm9yIiwiYmFzZW5hbWUiLCJ0ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztB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Ozs7Ozs7OzRCQUlrQjtBQUNkLG1CQUFPNUMsYUFBYTRDLEdBQWIsQ0FBaUIsSUFBakIsQ0FBUDtBQUNIOzs7NEJBRWlCO0FBQ2QsbUJBQU8sT0FBUDtBQUNIOzs7OztrQkFnRVUsSUFBSTNDLE1BQUosRSIsImZpbGUiOiJnbG9iYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHdpbnN0b24gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgc2ltcGxlR2l0IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgR2l0IH0gZnJvbSAnc2ltcGxlLWdpdCc7XG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0IHsgQ29uZmlnUGFyc2VyIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uL0NvbmZpZ1BhcnNlcic7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbk1hbmFnZXIgfSBmcm9tICcuL2FwcGxpY2F0aW9ucy9BcHBsaWNhdGlvbk1hbmFnZXInO1xuaW1wb3J0IHsgQm91bmRlZENvbnRleHRNYW5hZ2VyIH0gZnJvbSAnLi9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyJztcbmltcG9ydCB7IEJvaWxlclBsYXRlc01hbmFnZXIgfSBmcm9tICcuL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCB7IEh0dHBXcmFwcGVyIH0gZnJvbSAnLi9IdHRwV3JhcHBlcic7XG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi9Gb2xkZXJzJztcbmltcG9ydCB7IEFydGlmYWN0c01hbmFnZXIgfSBmcm9tICcuL2FydGlmYWN0cy9BcnRpZmFjdHNNYW5hZ2VyJztcbmltcG9ydCB7IElucXVpcmVyTWFuYWdlciB9IGZyb20gJy4vYXJ0aWZhY3RzL0lucXVpcmVyTWFuYWdlcic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfY29uZmlnUGFyc2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9hcHBsaWNhdGlvbk1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2FydGlmYWN0c01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2JvdW5kZWRDb250ZXh0TWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaW5xdWlyZXJNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfbG9nZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9odHRwV3JhcHBlciA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogQ29tbW9uIGdsb2JhbCBvYmplY3RcbiAqL1xuY2xhc3MgZ2xvYmFsIHtcbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGluaXRpYWxpemF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIF9sb2dnZXIuc2V0KHRoaXMsIHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcbiAgICAgICAgICAgIGxldmVsOiAnaW5mbycsXG4gICAgICAgICAgICBmb3JtYXQ6IHdpbnN0b24uZm9ybWF0LmNvbWJpbmUoXG4gICAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSxcbiAgICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5zaW1wbGUoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoKVxuICAgICAgICAgICAgXVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgX2h0dHBXcmFwcGVyLnNldCh0aGlzLCBuZXcgSHR0cFdyYXBwZXIoKSk7XG4gICAgICAgIFxuICAgICAgICBfY29uZmlnUGFyc2VyLnNldCh0aGlzLCBuZXcgQ29uZmlnUGFyc2VyKCkpO1xuICAgICAgICBfY29uZmlnTWFuYWdlci5zZXQodGhpcywgbmV3IENvbmZpZ01hbmFnZXIoZnMsIHRoaXMuY29uZmlnUGFyc2VyLCB0aGlzLmxvZ2dlcikpO1xuXG4gICAgICAgIGxldCBnaXQgPSBzaW1wbGVHaXQodGhpcy5jb25maWdNYW5hZ2VyLmNlbnRyYWxGb2xkZXJMb2NhdGlvbik7XG4gICAgICAgIGdpdC5mb3JGb2xkZXIgPSAoZm9sZGVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2ltcGxlR2l0KGZvbGRlcik7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBfZ2l0LnNldCh0aGlzLCBnaXQpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgbmV3IEZvbGRlcnMoZnMpKTtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIG5ldyBCb2lsZXJQbGF0ZXNNYW5hZ2VyKHRoaXMuY29uZmlnTWFuYWdlciwgdGhpcy5odHRwV3JhcHBlciwgdGhpcy5naXQsIHRoaXMuZm9sZGVycywgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9hcHBsaWNhdGlvbk1hbmFnZXIuc2V0KHRoaXMsIG5ldyBBcHBsaWNhdGlvbk1hbmFnZXIodGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmNvbmZpZ01hbmFnZXIsIHRoaXMuZm9sZGVycywgIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBfYm91bmRlZENvbnRleHRNYW5hZ2VyLnNldCh0aGlzLCBuZXcgQm91bmRlZENvbnRleHRNYW5hZ2VyKHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5hcHBsaWNhdGlvbk1hbmFnZXIsIHRoaXMuZm9sZGVycywgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuc2V0KHRoaXMsIG5ldyBJbnF1aXJlck1hbmFnZXIodGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2FydGlmYWN0c01hbmFnZXIuc2V0KHRoaXMsIG5ldyBBcnRpZmFjdHNNYW5hZ2VyKHRoaXMuaW5xdWlyZXJNYW5hZ2VyLCB0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuYm91bmRlZENvbnRleHRNYW5hZ2VyLCB0aGlzLmZvbGRlcnMsIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Q29uZmlnTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7Q29uZmlnTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgY29uZmlnTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Q29uZmlnUGFyc2VyfVxuICAgICAqIEByZXR1cm5zIHtDb25maWdQYXJzZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvbmZpZ1BhcnNlcigpIHtcbiAgICAgICAgcmV0dXJuIF9jb25maWdQYXJzZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtGb2xkZXJzfVxuICAgICAqIEByZXR1cm5zIHtGb2xkZXJzfVxuICAgICAqL1xuICAgIGdldCBmb2xkZXJzKCkge1xuICAgICAgICByZXR1cm4gX2ZvbGRlcnMuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0FwcGxpY2F0aW9uTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYXBwbGljYXRpb25NYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2FwcGxpY2F0aW9uTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqIFxuICAgICAqIEdldHMgdGhlIHtBcnRpZmFjdHNNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtBcnRpZmFjdHNNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBhcnRpZmFjdHNNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2FydGlmYWN0c01hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtCb3VuZGVkQ29udGV4dE1hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0JvdW5kZWRDb250ZXh0TWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYm91bmRlZENvbnRleHRNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2JvdW5kZWRDb250ZXh0TWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0JvaWxlclBsYXRlc01hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlc01hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGJvaWxlclBsYXRlc01hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtJbnF1aXJlck1hbmFnZXJcbiAgICAgKiBAcmV0dXJucyB7SW5xdWlyZXJNYW5hZ2VyfX1cbiAgICAgKi9cbiAgICBnZXQgaW5xdWlyZXJNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2lucXVpcmVyTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0dpdH0gc3lzdGVtXG4gICAgICogQHJldHVybnMge0dpdH1cbiAgICAgKi9cbiAgICBnZXQgZ2l0KCkge1xuICAgICAgICByZXR1cm4gX2dpdC5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0xvZ2dlcn1cbiAgICAgKiBAcmV0dXJucyB7TG9nZ2VyfVxuICAgICAqL1xuICAgIGdldCBsb2dnZXIoKSB7wqBcbiAgICAgICAgcmV0dXJuIF9sb2dnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtIdHRwV3JhcHBlcn1cbiAgICAgKiBAcmV0dXJucyB7SHR0cFdyYXBwZXJ9XG4gICAgICovXG4gICAgZ2V0IGh0dHBXcmFwcGVyKCkge1xuICAgICAgICByZXR1cm4gX2h0dHBXcmFwcGVyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICBnZXQgdXNhZ2VQcmVmaXgoKSB7XG4gICAgICAgIHJldHVybiAnXFxuXFx0ICc7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGZ1bGwgZGlyZWN0b3J5IHBhdGhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGhcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkaXJlY3RvcnkgcGF0aFxuICAgICAqL1xuICAgIGdldEZpbGVEaXJQYXRoKGZpbGVQYXRoKSB7XG4gICAgICAgIGZpbGVQYXRoID0gcGF0aC5ub3JtYWxpemUoZmlsZVBhdGgpO1xuICAgICAgICByZXR1cm4gcGF0aC5wYXJzZShmaWxlUGF0aCkuZGlyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBmaWxlbmFtZSB3aXRob3V0IGV4dGVuc2lvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGZpbGVuYW1lXG4gICAgICovXG4gICAgZ2V0RmlsZU5hbWUoZmlsZVBhdGgpIHtcbiAgICAgICAgZmlsZVBhdGggPSBwYXRoLm5vcm1hbGl6ZShmaWxlUGF0aCk7XG4gICAgICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVQYXRoKS5uYW1lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBmaWxlbmFtZSB3aXRoIGV4dGVuc2lvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGZpbGVuYW1lXG4gICAgICovXG4gICAgZ2V0RmlsZU5hbWVBbmRFeHRlbnNpb24oZmlsZVBhdGgpIHtcbiAgICAgICAgZmlsZVBhdGggPSBwYXRoLm5vcm1hbGl6ZShmaWxlUGF0aCk7XG4gICAgICAgIHJldHVybiBwYXRoLnBhcnNlKGZpbGVQYXRoKS5iYXNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBkaXJlY3RvcnkgbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGZpbGUgZGlybmFtZVxuICAgICAqL1xuICAgIGdldEZpbGVEaXIoZmlsZVBhdGgpIHtcbiAgICAgICAgZmlsZVBhdGggPSBwYXRoLm5vcm1hbGl6ZShmaWxlUGF0aCk7XG4gICAgICAgIHJldHVybiBwYXRoLmRpcm5hbWUoZmlsZVBhdGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIHRoZSBuYW1lIGFyZ3VtZW50XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICovXG4gICAgdmFsaWRhdGVBcmdzTmFtZUlucHV0KG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUuaW5jbHVkZXMoJyAnKSkge1xuICAgICAgICAgICAgX2xvZ2dlci5nZXQodGhpcykuZXJyb3IoJ05hbWUgYXJndW1lbnQgY2Fubm90IGNvbnRhaW4gc3BhY2VzJyk7XG4gICAgICAgICAgICB0aHJvdyAnQXJndW1lbnQgcGFyc2luZyBlcnJvcidcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZS5pbmNsdWRlcygnLScpKSB7XG4gICAgICAgICAgICBfbG9nZ2VyLmdldCh0aGlzKS5lcnJvcignTmFtZSBhcmd1bWVudCBjYW5ub3QgY29udGFpbiBcIi1cIicpO1xuICAgICAgICAgICAgdGhyb3cgJ0FyZ3VtZW50IHBhcnNpbmcgZXJyb3InXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWUgIT09IHBhdGguYmFzZW5hbWUobmFtZSkpIHtcbiAgICAgICAgICAgIF9sb2dnZXIuZ2V0KHRoaXMpLmVycm9yKFwiTmFtZSBhcmd1bWVudCBjYW5ub3QgaXNuJ3QgYSB2YWxpZCBmaWxlbmFtZVwiKTtcbiAgICAgICAgICAgIHRocm93ICdBcmd1bWVudCBwYXJzaW5nIGVycm9yJ1xuICAgICAgICB9XG4gICAgICAgIGlmICgvXlxcLlxcLj8kLy50ZXN0KG5hbWUpKSB7XG4gICAgICAgICAgICBfbG9nZ2VyLmdldCh0aGlzKS5lcnJvcignTmFtZSBhcmd1bWVudCBjYW5ub3QgYmUgXCIuXCIgb3IgXCIuLlwiJyk7XG4gICAgICAgICAgICB0aHJvdyAnQXJndW1lbnQgcGFyc2luZyBlcnJvcidcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgZ2xvYmFsKCk7Il19