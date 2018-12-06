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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable no-unused-vars */

/**
 * @type {WeakMap<globals, ConfigManager>}
 */
var _configManager = new WeakMap();
/**
 * @type {WeakMap<globals, ConfigParser>}
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable no-unused-vars */
var _configParser = new WeakMap();
/**
 * @type {WeakMap<globals, ApplicationManager>}
 */
var _applicationManager = new WeakMap();
/**
 * @type {WeakMap<globals, ArtifactsManager>}
 */
var _artifactsManager = new WeakMap();
/**
 * @type {WeakMap<globals, BoundedContextManager>}
 */
var _boundedContextManager = new WeakMap();
/**
 * @type {WeakMap<globals, BoilerPlatesManager>}
 */
var _boilerPlatesManager = new WeakMap();
/**
 * @type {WeakMap<globals, InquirerManager>}
 */
var _inquirerManager = new WeakMap();
/**
 * @type {WeakMap<globals, Folders>}
 */
var _folders = new WeakMap();
/**
 * @type {WeakMap<globals, Git>}
 */
var _git = new WeakMap();
/**
 * @type {WeakMap<globals, winston>}
 */
var _logger = new WeakMap();
/**
 * @type {WeakMap<globals, HttpWrapper>}
 */
var _httpWrapper = new WeakMap();
/**
 * @type {WeakMap<globals, any>}
 */
var _dolittleConfig = new WeakMap();
/**
 * Common globals object
 */

var globals = function () {
    /**
     * Perform initialization
     */
    function globals() {
        (0, _classCallCheck3.default)(this, globals);

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

        _dolittleConfig.set(this, require('rc')('dolittle', {
            csharp: {
                concepts: 'Concepts',
                domain: 'Domain',
                events: 'Events',
                read: 'Read'
            }
        }));
        _git.set(this, git);
        _folders.set(this, new _Folders.Folders(_fsExtra2.default));
        _boilerPlatesManager.set(this, new _BoilerPlatesManager.BoilerPlatesManager(this.configManager, this.httpWrapper, git, this.folders, _fsExtra2.default, this.logger));
        _applicationManager.set(this, new _ApplicationManager.ApplicationManager(this.boilerPlatesManager, this.configManager, this.folders, _fsExtra2.default, this.logger));
        _boundedContextManager.set(this, new _BoundedContextManager.BoundedContextManager(this.boilerPlatesManager, this.applicationManager, this.folders, _fsExtra2.default, this.logger));
        _inquirerManager.set(this, new _InquirerManager.InquirerManager(this.folders, _fsExtra2.default, this.logger));
        _artifactsManager.set(this, new _ArtifactsManager.ArtifactsManager(this.inquirerManager, this.boilerPlatesManager, this.boundedContextManager, this.folders, _fsExtra2.default, this.logger, this.dolittleConfig));
    }

    /**
     * Gets the {ConfigManager}
     * @returns {ConfigManager}
     */


    (0, _createClass3.default)(globals, [{
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
         * Gets the {winston} logger
         * @returns {winston}
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
        /**
         * Gets the dolittle rc config
         * @returns {any}
         */

    }, {
        key: 'dolittleConfig',
        get: function get() {
            return _dolittleConfig.get(this);
        }
    }]);
    return globals;
}();

exports.default = new globals();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9nbG9iYWxzLmpzIl0sIm5hbWVzIjpbIl9jb25maWdNYW5hZ2VyIiwiV2Vha01hcCIsIl9jb25maWdQYXJzZXIiLCJfYXBwbGljYXRpb25NYW5hZ2VyIiwiX2FydGlmYWN0c01hbmFnZXIiLCJfYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiX2JvaWxlclBsYXRlc01hbmFnZXIiLCJfaW5xdWlyZXJNYW5hZ2VyIiwiX2ZvbGRlcnMiLCJfZ2l0IiwiX2xvZ2dlciIsIl9odHRwV3JhcHBlciIsIl9kb2xpdHRsZUNvbmZpZyIsImdsb2JhbHMiLCJzZXQiLCJ3aW5zdG9uIiwiY3JlYXRlTG9nZ2VyIiwibGV2ZWwiLCJmb3JtYXQiLCJjb21iaW5lIiwiY29sb3JpemUiLCJzaW1wbGUiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsIkh0dHBXcmFwcGVyIiwiQ29uZmlnUGFyc2VyIiwiQ29uZmlnTWFuYWdlciIsImZzIiwiY29uZmlnUGFyc2VyIiwibG9nZ2VyIiwiZ2l0IiwiY29uZmlnTWFuYWdlciIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiIsImZvckZvbGRlciIsImZvbGRlciIsInJlcXVpcmUiLCJjc2hhcnAiLCJjb25jZXB0cyIsImRvbWFpbiIsImV2ZW50cyIsInJlYWQiLCJGb2xkZXJzIiwiQm9pbGVyUGxhdGVzTWFuYWdlciIsImh0dHBXcmFwcGVyIiwiZm9sZGVycyIsIkFwcGxpY2F0aW9uTWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJCb3VuZGVkQ29udGV4dE1hbmFnZXIiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJJbnF1aXJlck1hbmFnZXIiLCJBcnRpZmFjdHNNYW5hZ2VyIiwiaW5xdWlyZXJNYW5hZ2VyIiwiYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiZG9saXR0bGVDb25maWciLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FB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QUlzQjtBQUNsQixtQkFBTy9DLGlCQUFpQitDLEdBQWpCLENBQXFCLElBQXJCLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJVTtBQUNOLG1CQUFPN0MsS0FBSzZDLEdBQUwsQ0FBUyxJQUFULENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJYTtBQUNULG1CQUFPNUMsUUFBUTRDLEdBQVIsQ0FBWSxJQUFaLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJa0I7QUFDZCxtQkFBTzNDLGFBQWEyQyxHQUFiLENBQWlCLElBQWpCLENBQVA7QUFDSDtBQUNEOzs7Ozs7OzRCQUlxQjtBQUNqQixtQkFBTzFDLGdCQUFnQjBDLEdBQWhCLENBQW9CLElBQXBCLENBQVA7QUFDSDs7Ozs7a0JBSVUsSUFBSXpDLE9BQUosRSIsImZpbGUiOiJnbG9iYWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xyXG5pbXBvcnQgd2luc3RvbiBmcm9tICd3aW5zdG9uJztcclxuaW1wb3J0IHNpbXBsZUdpdCBmcm9tICdzaW1wbGUtZ2l0JztcclxuaW1wb3J0IHsgR2l0IH0gZnJvbSAnc2ltcGxlLWdpdCc7XHJcbmltcG9ydCB7IENvbmZpZ01hbmFnZXIgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XHJcbmltcG9ydCB7IENvbmZpZ1BhcnNlciB9IGZyb20gJy4vY29uZmlndXJhdGlvbi9Db25maWdQYXJzZXInO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvbk1hbmFnZXIgfSBmcm9tICcuL2FwcGxpY2F0aW9ucy9BcHBsaWNhdGlvbk1hbmFnZXInO1xyXG5pbXBvcnQgeyBCb3VuZGVkQ29udGV4dE1hbmFnZXIgfSBmcm9tICcuL2JvdW5kZWRDb250ZXh0cy9Cb3VuZGVkQ29udGV4dE1hbmFnZXInO1xyXG5pbXBvcnQgeyBCb2lsZXJQbGF0ZXNNYW5hZ2VyIH0gZnJvbSAnLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XHJcbmltcG9ydCB7IEh0dHBXcmFwcGVyIH0gZnJvbSAnLi9IdHRwV3JhcHBlcic7XHJcbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuL0ZvbGRlcnMnO1xyXG5pbXBvcnQgeyBBcnRpZmFjdHNNYW5hZ2VyIH0gZnJvbSAnLi9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlcic7XHJcbmltcG9ydCB7IElucXVpcmVyTWFuYWdlciB9IGZyb20gJy4vYXJ0aWZhY3RzL0lucXVpcmVyTWFuYWdlcic7XHJcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7V2Vha01hcDxnbG9iYWxzLCBDb25maWdNYW5hZ2VyPn1cclxuICovXHJcbmNvbnN0IF9jb25maWdNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPGdsb2JhbHMsIENvbmZpZ1BhcnNlcj59XHJcbiAqL1xyXG5jb25zdCBfY29uZmlnUGFyc2VyID0gbmV3IFdlYWtNYXAoKTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPGdsb2JhbHMsIEFwcGxpY2F0aW9uTWFuYWdlcj59XHJcbiAqL1xyXG5jb25zdCBfYXBwbGljYXRpb25NYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPGdsb2JhbHMsIEFydGlmYWN0c01hbmFnZXI+fVxyXG4gKi9cclxuY29uc3QgX2FydGlmYWN0c01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xyXG4vKipcclxuICogQHR5cGUge1dlYWtNYXA8Z2xvYmFscywgQm91bmRlZENvbnRleHRNYW5hZ2VyPn1cclxuICovXHJcbmNvbnN0IF9ib3VuZGVkQ29udGV4dE1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xyXG4vKipcclxuICogQHR5cGUge1dlYWtNYXA8Z2xvYmFscywgQm9pbGVyUGxhdGVzTWFuYWdlcj59XHJcbiAqL1xyXG5jb25zdCBfYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XHJcbi8qKlxyXG4gKiBAdHlwZSB7V2Vha01hcDxnbG9iYWxzLCBJbnF1aXJlck1hbmFnZXI+fVxyXG4gKi9cclxuY29uc3QgX2lucXVpcmVyTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XHJcbi8qKlxyXG4gKiBAdHlwZSB7V2Vha01hcDxnbG9iYWxzLCBGb2xkZXJzPn1cclxuICovXHJcbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPGdsb2JhbHMsIEdpdD59XHJcbiAqL1xyXG5jb25zdCBfZ2l0ID0gbmV3IFdlYWtNYXAoKTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPGdsb2JhbHMsIHdpbnN0b24+fVxyXG4gKi9cclxuY29uc3QgX2xvZ2dlciA9IG5ldyBXZWFrTWFwKCk7XHJcbi8qKlxyXG4gKiBAdHlwZSB7V2Vha01hcDxnbG9iYWxzLCBIdHRwV3JhcHBlcj59XHJcbiAqL1xyXG5jb25zdCBfaHR0cFdyYXBwZXIgPSBuZXcgV2Vha01hcCgpO1xyXG4vKipcclxuICogQHR5cGUge1dlYWtNYXA8Z2xvYmFscywgYW55Pn1cclxuICovXHJcbmNvbnN0IF9kb2xpdHRsZUNvbmZpZyA9IG5ldyBXZWFrTWFwKCk7XHJcbi8qKlxyXG4gKiBDb21tb24gZ2xvYmFscyBvYmplY3RcclxuICovXHJcbmNsYXNzIGdsb2JhbHMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBQZXJmb3JtIGluaXRpYWxpemF0aW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIF9sb2dnZXIuc2V0KHRoaXMsIHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcclxuICAgICAgICAgICAgbGV2ZWw6ICdpbmZvJyxcclxuICAgICAgICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxyXG4gICAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSxcclxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LnNpbXBsZSgpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIHRyYW5zcG9ydHM6IFtcclxuICAgICAgICAgICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSgpXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIF9odHRwV3JhcHBlci5zZXQodGhpcywgbmV3IEh0dHBXcmFwcGVyKCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIF9jb25maWdQYXJzZXIuc2V0KHRoaXMsIG5ldyBDb25maWdQYXJzZXIoKSk7XHJcbiAgICAgICAgX2NvbmZpZ01hbmFnZXIuc2V0KHRoaXMsIG5ldyBDb25maWdNYW5hZ2VyKGZzLCB0aGlzLmNvbmZpZ1BhcnNlciwgdGhpcy5sb2dnZXIpKTtcclxuXHJcbiAgICAgICAgbGV0IGdpdCA9IHNpbXBsZUdpdCh0aGlzLmNvbmZpZ01hbmFnZXIuY2VudHJhbEZvbGRlckxvY2F0aW9uKTtcclxuICAgICAgICBnaXQuZm9yRm9sZGVyID0gKGZvbGRlcikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc2ltcGxlR2l0KGZvbGRlcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBfZG9saXR0bGVDb25maWcuc2V0KHRoaXMsIHJlcXVpcmUoJ3JjJykoJ2RvbGl0dGxlJywge1xyXG4gICAgICAgICAgICBjc2hhcnA6IHtcclxuICAgICAgICAgICAgICAgIGNvbmNlcHRzOiAnQ29uY2VwdHMnLFxyXG4gICAgICAgICAgICAgICAgZG9tYWluOiAnRG9tYWluJyxcclxuICAgICAgICAgICAgICAgIGV2ZW50czogJ0V2ZW50cycsXHJcbiAgICAgICAgICAgICAgICByZWFkOiAnUmVhZCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBfZ2l0LnNldCh0aGlzLCBnaXQpO1xyXG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBuZXcgRm9sZGVycyhmcykpO1xyXG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLnNldCh0aGlzLCBuZXcgQm9pbGVyUGxhdGVzTWFuYWdlcih0aGlzLmNvbmZpZ01hbmFnZXIsIHRoaXMuaHR0cFdyYXBwZXIsIGdpdCwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcclxuICAgICAgICBfYXBwbGljYXRpb25NYW5hZ2VyLnNldCh0aGlzLCBuZXcgQXBwbGljYXRpb25NYW5hZ2VyKHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5jb25maWdNYW5hZ2VyLCB0aGlzLmZvbGRlcnMsICBmcywgdGhpcy5sb2dnZXIpKTtcclxuICAgICAgICBfYm91bmRlZENvbnRleHRNYW5hZ2VyLnNldCh0aGlzLCBuZXcgQm91bmRlZENvbnRleHRNYW5hZ2VyKHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5hcHBsaWNhdGlvbk1hbmFnZXIsIHRoaXMuZm9sZGVycywgZnMsIHRoaXMubG9nZ2VyKSk7XHJcbiAgICAgICAgX2lucXVpcmVyTWFuYWdlci5zZXQodGhpcywgbmV3IElucXVpcmVyTWFuYWdlcih0aGlzLmZvbGRlcnMsIGZzLCB0aGlzLmxvZ2dlcikpO1xyXG4gICAgICAgIF9hcnRpZmFjdHNNYW5hZ2VyLnNldCh0aGlzLCBuZXcgQXJ0aWZhY3RzTWFuYWdlcih0aGlzLmlucXVpcmVyTWFuYWdlciwgdGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmJvdW5kZWRDb250ZXh0TWFuYWdlciwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIsIHRoaXMuZG9saXR0bGVDb25maWcpKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHtDb25maWdNYW5hZ2VyfVxyXG4gICAgICogQHJldHVybnMge0NvbmZpZ01hbmFnZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldCBjb25maWdNYW5hZ2VyKCkge1xyXG4gICAgICAgIHJldHVybiBfY29uZmlnTWFuYWdlci5nZXQodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB7Q29uZmlnUGFyc2VyfVxyXG4gICAgICogQHJldHVybnMge0NvbmZpZ1BhcnNlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0IGNvbmZpZ1BhcnNlcigpIHtcclxuICAgICAgICByZXR1cm4gX2NvbmZpZ1BhcnNlci5nZXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB7Rm9sZGVyc31cclxuICAgICAqIEByZXR1cm5zIHtGb2xkZXJzfVxyXG4gICAgICovXHJcbiAgICBnZXQgZm9sZGVycygpIHtcclxuICAgICAgICByZXR1cm4gX2ZvbGRlcnMuZ2V0KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUge0FwcGxpY2F0aW9uTWFuYWdlcn1cclxuICAgICAqIEByZXR1cm5zIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldCBhcHBsaWNhdGlvbk1hbmFnZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9hcHBsaWNhdGlvbk1hbmFnZXIuZ2V0KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcclxuICAgICAqIEdldHMgdGhlIHtBcnRpZmFjdHNNYW5hZ2VyfVxyXG4gICAgICogQHJldHVybnMge0FydGlmYWN0c01hbmFnZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldCBhcnRpZmFjdHNNYW5hZ2VyKCkge1xyXG4gICAgICAgIHJldHVybiBfYXJ0aWZhY3RzTWFuYWdlci5nZXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB7Qm91bmRlZENvbnRleHRNYW5hZ2VyfVxyXG4gICAgICogQHJldHVybnMge0JvdW5kZWRDb250ZXh0TWFuYWdlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0IGJvdW5kZWRDb250ZXh0TWFuYWdlcigpIHtcclxuICAgICAgICByZXR1cm4gX2JvdW5kZWRDb250ZXh0TWFuYWdlci5nZXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cclxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxyXG4gICAgICovXHJcbiAgICBnZXQgYm9pbGVyUGxhdGVzTWFuYWdlcigpIHtcclxuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB7SW5xdWlyZXJNYW5hZ2VyXHJcbiAgICAgKiBAcmV0dXJucyB7SW5xdWlyZXJNYW5hZ2VyfX1cclxuICAgICAqL1xyXG4gICAgZ2V0IGlucXVpcmVyTWFuYWdlcigpIHtcclxuICAgICAgICByZXR1cm4gX2lucXVpcmVyTWFuYWdlci5nZXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSB7R2l0fSBzeXN0ZW1cclxuICAgICAqIEByZXR1cm5zIHtHaXR9XHJcbiAgICAgKi9cclxuICAgIGdldCBnaXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9naXQuZ2V0KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUge3dpbnN0b259IGxvZ2dlclxyXG4gICAgICogQHJldHVybnMge3dpbnN0b259XHJcbiAgICAgKi9cclxuICAgIGdldCBsb2dnZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9sb2dnZXIuZ2V0KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUge0h0dHBXcmFwcGVyfVxyXG4gICAgICogQHJldHVybnMge0h0dHBXcmFwcGVyfVxyXG4gICAgICovXHJcbiAgICBnZXQgaHR0cFdyYXBwZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9odHRwV3JhcHBlci5nZXQodGhpcyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGRvbGl0dGxlIHJjIGNvbmZpZ1xyXG4gICAgICogQHJldHVybnMge2FueX1cclxuICAgICAqL1xyXG4gICAgZ2V0IGRvbGl0dGxlQ29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiBfZG9saXR0bGVDb25maWcuZ2V0KHRoaXMpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IGdsb2JhbHMoKTsiXX0=