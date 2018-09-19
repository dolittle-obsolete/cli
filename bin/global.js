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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _configManager = new WeakMap(); /*---------------------------------------------------------------------------------------------
                                     *  Copyright (c) Dolittle. All rights reserved.
                                     *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                     *--------------------------------------------------------------------------------------------*/

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
    (0, _createClass3.default)(global, [{
        key: 'supportedSDKLanguages',
        get: function get() {
            return ["csharp", 'javascript'];
        }
    }, {
        key: 'languageQuestion',
        get: function get() {
            return [{
                type: 'rawlist',
                name: 'language',
                message: 'Which SDK language are you working in?',
                choices: this.supportedSDKLanguages
            }];
        }
        /**
         * Perform initialization
         */

    }]);

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
        _artifactsManager.set(this, new _ArtifactsManager.ArtifactsManager(this.inquirerManager, this.boilerPlatesManager, this.folders, _fs2.default, this.logger));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9nbG9iYWwuanMiXSwibmFtZXMiOlsiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfYXJ0aWZhY3RzTWFuYWdlciIsIl9ib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIl9pbnF1aXJlck1hbmFnZXIiLCJfZm9sZGVycyIsIl9naXQiLCJfbG9nZ2VyIiwiX2h0dHBXcmFwcGVyIiwiZ2xvYmFsIiwidHlwZSIsIm5hbWUiLCJtZXNzYWdlIiwiY2hvaWNlcyIsInN1cHBvcnRlZFNES0xhbmd1YWdlcyIsInNldCIsIndpbnN0b24iLCJjcmVhdGVMb2dnZXIiLCJsZXZlbCIsImZvcm1hdCIsImNvbWJpbmUiLCJjb2xvcml6ZSIsInNpbXBsZSIsInRyYW5zcG9ydHMiLCJDb25zb2xlIiwiSHR0cFdyYXBwZXIiLCJDb25maWdQYXJzZXIiLCJDb25maWdNYW5hZ2VyIiwiZnMiLCJjb25maWdQYXJzZXIiLCJsb2dnZXIiLCJnaXQiLCJjb25maWdNYW5hZ2VyIiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIiwiZm9yRm9sZGVyIiwiZm9sZGVyIiwiRm9sZGVycyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJodHRwV3JhcHBlciIsImZvbGRlcnMiLCJBcHBsaWNhdGlvbk1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiQm91bmRlZENvbnRleHRNYW5hZ2VyIiwiYXBwbGljYXRpb25NYW5hZ2VyIiwiSW5xdWlyZXJNYW5hZ2VyIiwiQXJ0aWZhY3RzTWFuYWdlciIsImlucXVpcmVyTWFuYWdlciIsImdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU1BLGlCQUFpQixJQUFJQyxPQUFK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R0FBYixDQUFpQixJQUFqQixDQUFQO0FBQ0g7Ozs0QkFFaUI7QUFDZCxtQkFBTyxPQUFQO0FBQ0g7Ozs7O2tCQUdVLElBQUl0QyxNQUFKLEUiLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB3aW5zdG9uIGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHNpbXBsZUdpdCBmcm9tICdzaW1wbGUtZ2l0JztcbmltcG9ydCB7IEdpdCB9IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgQ29uZmlnTWFuYWdlciB9IGZyb20gJy4vY29uZmlndXJhdGlvbi9Db25maWdNYW5hZ2VyJztcbmltcG9ydCB7IENvbmZpZ1BhcnNlciB9IGZyb20gJy4vY29uZmlndXJhdGlvbi9Db25maWdQYXJzZXInO1xuaW1wb3J0IHsgQXBwbGljYXRpb25NYW5hZ2VyIH0gZnJvbSAnLi9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyJztcbmltcG9ydCB7IEJvdW5kZWRDb250ZXh0TWFuYWdlciB9IGZyb20gJy4vYm91bmRlZENvbnRleHRzL0JvdW5kZWRDb250ZXh0TWFuYWdlcic7XG5pbXBvcnQgeyBCb2lsZXJQbGF0ZXNNYW5hZ2VyIH0gZnJvbSAnLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XG5pbXBvcnQgeyBIdHRwV3JhcHBlciB9IGZyb20gJy4vSHR0cFdyYXBwZXInO1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4vRm9sZGVycyc7XG5pbXBvcnQgeyBBcnRpZmFjdHNNYW5hZ2VyIH0gZnJvbSAnLi9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlcic7XG5pbXBvcnQgeyBJbnF1aXJlck1hbmFnZXIgfSBmcm9tICcuL2FydGlmYWN0cy9JbnF1aXJlck1hbmFnZXInO1xuXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfY29uZmlnUGFyc2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9hcHBsaWNhdGlvbk1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2FydGlmYWN0c01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2JvdW5kZWRDb250ZXh0TWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaW5xdWlyZXJNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfbG9nZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9odHRwV3JhcHBlciA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogQ29tbW9uIGdsb2JhbCBvYmplY3RcbiAqL1xuY2xhc3MgZ2xvYmFsIHtcblxuICAgIGdldCBzdXBwb3J0ZWRTREtMYW5ndWFnZXMoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBcImNzaGFycFwiLFxuICAgICAgICAgICAgJ2phdmFzY3JpcHQnXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0IGxhbmd1YWdlUXVlc3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgdHlwZTogJ3Jhd2xpc3QnLFxuICAgICAgICAgICAgbmFtZTogJ2xhbmd1YWdlJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdXaGljaCBTREsgbGFuZ3VhZ2UgYXJlIHlvdSB3b3JraW5nIGluPycsXG4gICAgICAgICAgICBjaG9pY2VzOiB0aGlzLnN1cHBvcnRlZFNES0xhbmd1YWdlc1xuICAgICAgICB9XTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBpbml0aWFsaXphdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBfbG9nZ2VyLnNldCh0aGlzLCB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7XG4gICAgICAgICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LmNvbG9yaXplKCksXG4gICAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuc2ltcGxlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgICAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKClcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIF9odHRwV3JhcHBlci5zZXQodGhpcywgbmV3IEh0dHBXcmFwcGVyKCkpO1xuICAgICAgICBcbiAgICAgICAgX2NvbmZpZ1BhcnNlci5zZXQodGhpcywgbmV3IENvbmZpZ1BhcnNlcigpKTtcbiAgICAgICAgX2NvbmZpZ01hbmFnZXIuc2V0KHRoaXMsIG5ldyBDb25maWdNYW5hZ2VyKGZzLCB0aGlzLmNvbmZpZ1BhcnNlciwgdGhpcy5sb2dnZXIpKTtcblxuICAgICAgICBsZXQgZ2l0ID0gc2ltcGxlR2l0KHRoaXMuY29uZmlnTWFuYWdlci5jZW50cmFsRm9sZGVyTG9jYXRpb24pO1xuICAgICAgICBnaXQuZm9yRm9sZGVyID0gKGZvbGRlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNpbXBsZUdpdChmb2xkZXIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIF9naXQuc2V0KHRoaXMsIGdpdCk7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBuZXcgRm9sZGVycyhmcykpO1xuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5zZXQodGhpcywgbmV3IEJvaWxlclBsYXRlc01hbmFnZXIodGhpcy5jb25maWdNYW5hZ2VyLCB0aGlzLmh0dHBXcmFwcGVyLCB0aGlzLmdpdCwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2FwcGxpY2F0aW9uTWFuYWdlci5zZXQodGhpcywgbmV3IEFwcGxpY2F0aW9uTWFuYWdlcih0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuY29uZmlnTWFuYWdlciwgdGhpcy5mb2xkZXJzLCAgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuc2V0KHRoaXMsIG5ldyBCb3VuZGVkQ29udGV4dE1hbmFnZXIodGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmFwcGxpY2F0aW9uTWFuYWdlciwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2lucXVpcmVyTWFuYWdlci5zZXQodGhpcywgbmV3IElucXVpcmVyTWFuYWdlcih0aGlzLmZvbGRlcnMsIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBfYXJ0aWZhY3RzTWFuYWdlci5zZXQodGhpcywgbmV3IEFydGlmYWN0c01hbmFnZXIodGhpcy5pbnF1aXJlck1hbmFnZXIsIHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0NvbmZpZ01hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0NvbmZpZ01hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvbmZpZ01hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0NvbmZpZ1BhcnNlcn1cbiAgICAgKiBAcmV0dXJucyB7Q29uZmlnUGFyc2VyfVxuICAgICAqL1xuICAgIGdldCBjb25maWdQYXJzZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnUGFyc2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Rm9sZGVyc31cbiAgICAgKiBAcmV0dXJucyB7Rm9sZGVyc31cbiAgICAgKi9cbiAgICBnZXQgZm9sZGVycygpIHtcbiAgICAgICAgcmV0dXJuIF9mb2xkZXJzLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7QXBwbGljYXRpb25NYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGFwcGxpY2F0aW9uTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9hcHBsaWNhdGlvbk1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKiBcbiAgICAgKiBHZXRzIHRoZSB7QXJ0aWZhY3RzTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7QXJ0aWZhY3RzTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYXJ0aWZhY3RzTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9hcnRpZmFjdHNNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Qm91bmRlZENvbnRleHRNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtCb3VuZGVkQ29udGV4dE1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGJvdW5kZWRDb250ZXh0TWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZXNNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7SW5xdWlyZXJNYW5hZ2VyXG4gICAgICogQHJldHVybnMge0lucXVpcmVyTWFuYWdlcn19XG4gICAgICovXG4gICAgZ2V0IGlucXVpcmVyTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9pbnF1aXJlck1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtHaXR9IHN5c3RlbVxuICAgICAqIEByZXR1cm5zIHtHaXR9XG4gICAgICovXG4gICAgZ2V0IGdpdCgpIHtcbiAgICAgICAgcmV0dXJuIF9naXQuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtMb2dnZXJ9XG4gICAgICogQHJldHVybnMge0xvZ2dlcn1cbiAgICAgKi9cbiAgICBnZXQgbG9nZ2VyKCkge8KgXG4gICAgICAgIHJldHVybiBfbG9nZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7SHR0cFdyYXBwZXJ9XG4gICAgICogQHJldHVybnMge0h0dHBXcmFwcGVyfVxuICAgICAqL1xuICAgIGdldCBodHRwV3JhcHBlcigpIHtcbiAgICAgICAgcmV0dXJuIF9odHRwV3JhcHBlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0IHVzYWdlUHJlZml4KCkge1xuICAgICAgICByZXR1cm4gJ1xcblxcdCAnO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IGdsb2JhbCgpOyJdfQ==