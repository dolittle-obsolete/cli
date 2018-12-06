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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9nbG9iYWxzLmpzIl0sIm5hbWVzIjpbIl9jb25maWdNYW5hZ2VyIiwiV2Vha01hcCIsIl9jb25maWdQYXJzZXIiLCJfYXBwbGljYXRpb25NYW5hZ2VyIiwiX2FydGlmYWN0c01hbmFnZXIiLCJfYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiX2JvaWxlclBsYXRlc01hbmFnZXIiLCJfaW5xdWlyZXJNYW5hZ2VyIiwiX2ZvbGRlcnMiLCJfZ2l0IiwiX2xvZ2dlciIsIl9odHRwV3JhcHBlciIsIl9kb2xpdHRsZUNvbmZpZyIsImdsb2JhbHMiLCJzZXQiLCJ3aW5zdG9uIiwiY3JlYXRlTG9nZ2VyIiwibGV2ZWwiLCJmb3JtYXQiLCJjb21iaW5lIiwiY29sb3JpemUiLCJzaW1wbGUiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsIkh0dHBXcmFwcGVyIiwiQ29uZmlnUGFyc2VyIiwiQ29uZmlnTWFuYWdlciIsImZzIiwiY29uZmlnUGFyc2VyIiwibG9nZ2VyIiwiZ2l0IiwiY29uZmlnTWFuYWdlciIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiIsImZvckZvbGRlciIsImZvbGRlciIsInJlcXVpcmUiLCJjc2hhcnAiLCJjb25jZXB0cyIsImRvbWFpbiIsImV2ZW50cyIsInJlYWQiLCJGb2xkZXJzIiwiQm9pbGVyUGxhdGVzTWFuYWdlciIsImh0dHBXcmFwcGVyIiwiZm9sZGVycyIsIkFwcGxpY2F0aW9uTWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJCb3VuZGVkQ29udGV4dE1hbmFnZXIiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJJbnF1aXJlck1hbmFnZXIiLCJBcnRpZmFjdHNNYW5hZ2VyIiwiaW5xdWlyZXJNYW5hZ2VyIiwiYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiZG9saXR0bGVDb25maWciLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FB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Ty9DLGlCQUFpQitDLEdBQWpCLENBQXFCLElBQXJCLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozt3QkFJVTtBQUNOLGFBQU83QyxLQUFLNkMsR0FBTCxDQUFTLElBQVQsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7O3dCQUlhO0FBQ1QsYUFBTzVDLFFBQVE0QyxHQUFSLENBQVksSUFBWixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7d0JBSWtCO0FBQ2QsYUFBTzNDLGFBQWEyQyxHQUFiLENBQWlCLElBQWpCLENBQVA7QUFDSDtBQUNEOzs7Ozs7O3dCQUlxQjtBQUNqQixhQUFPMUMsZ0JBQWdCMEMsR0FBaEIsQ0FBb0IsSUFBcEIsQ0FBUDtBQUNIOzs7OztrQkFJVSxJQUFJekMsT0FBSixFIiwiZmlsZSI6Imdsb2JhbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCB3aW5zdG9uIGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHNpbXBsZUdpdCBmcm9tICdzaW1wbGUtZ2l0JztcbmltcG9ydCB7IEdpdCB9IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgQ29uZmlnTWFuYWdlciB9IGZyb20gJy4vY29uZmlndXJhdGlvbi9Db25maWdNYW5hZ2VyJztcbmltcG9ydCB7IENvbmZpZ1BhcnNlciB9IGZyb20gJy4vY29uZmlndXJhdGlvbi9Db25maWdQYXJzZXInO1xuaW1wb3J0IHsgQXBwbGljYXRpb25NYW5hZ2VyIH0gZnJvbSAnLi9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyJztcbmltcG9ydCB7IEJvdW5kZWRDb250ZXh0TWFuYWdlciB9IGZyb20gJy4vYm91bmRlZENvbnRleHRzL0JvdW5kZWRDb250ZXh0TWFuYWdlcic7XG5pbXBvcnQgeyBCb2lsZXJQbGF0ZXNNYW5hZ2VyIH0gZnJvbSAnLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XG5pbXBvcnQgeyBIdHRwV3JhcHBlciB9IGZyb20gJy4vSHR0cFdyYXBwZXInO1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4vRm9sZGVycyc7XG5pbXBvcnQgeyBBcnRpZmFjdHNNYW5hZ2VyIH0gZnJvbSAnLi9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlcic7XG5pbXBvcnQgeyBJbnF1aXJlck1hbmFnZXIgfSBmcm9tICcuL2FydGlmYWN0cy9JbnF1aXJlck1hbmFnZXInO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPGdsb2JhbHMsIENvbmZpZ01hbmFnZXI+fVxuICovXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPGdsb2JhbHMsIENvbmZpZ1BhcnNlcj59XG4gKi9cbmNvbnN0IF9jb25maWdQYXJzZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxnbG9iYWxzLCBBcHBsaWNhdGlvbk1hbmFnZXI+fVxuICovXG5jb25zdCBfYXBwbGljYXRpb25NYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Z2xvYmFscywgQXJ0aWZhY3RzTWFuYWdlcj59XG4gKi9cbmNvbnN0IF9hcnRpZmFjdHNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Z2xvYmFscywgQm91bmRlZENvbnRleHRNYW5hZ2VyPn1cbiAqL1xuY29uc3QgX2JvdW5kZWRDb250ZXh0TWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPGdsb2JhbHMsIEJvaWxlclBsYXRlc01hbmFnZXI+fVxuICovXG5jb25zdCBfYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPGdsb2JhbHMsIElucXVpcmVyTWFuYWdlcj59XG4gKi9cbmNvbnN0IF9pbnF1aXJlck1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxnbG9iYWxzLCBGb2xkZXJzPn1cbiAqL1xuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxnbG9iYWxzLCBHaXQ+fVxuICovXG5jb25zdCBfZ2l0ID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Z2xvYmFscywgd2luc3Rvbj59XG4gKi9cbmNvbnN0IF9sb2dnZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxnbG9iYWxzLCBIdHRwV3JhcHBlcj59XG4gKi9cbmNvbnN0IF9odHRwV3JhcHBlciA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPGdsb2JhbHMsIGFueT59XG4gKi9cbmNvbnN0IF9kb2xpdHRsZUNvbmZpZyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIENvbW1vbiBnbG9iYWxzIG9iamVjdFxuICovXG5jbGFzcyBnbG9iYWxzIHtcbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGluaXRpYWxpemF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIF9sb2dnZXIuc2V0KHRoaXMsIHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcbiAgICAgICAgICAgIGxldmVsOiAnaW5mbycsXG4gICAgICAgICAgICBmb3JtYXQ6IHdpbnN0b24uZm9ybWF0LmNvbWJpbmUoXG4gICAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSxcbiAgICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5zaW1wbGUoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoKVxuICAgICAgICAgICAgXVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgX2h0dHBXcmFwcGVyLnNldCh0aGlzLCBuZXcgSHR0cFdyYXBwZXIoKSk7XG4gICAgICAgIFxuICAgICAgICBfY29uZmlnUGFyc2VyLnNldCh0aGlzLCBuZXcgQ29uZmlnUGFyc2VyKCkpO1xuICAgICAgICBfY29uZmlnTWFuYWdlci5zZXQodGhpcywgbmV3IENvbmZpZ01hbmFnZXIoZnMsIHRoaXMuY29uZmlnUGFyc2VyLCB0aGlzLmxvZ2dlcikpO1xuXG4gICAgICAgIGxldCBnaXQgPSBzaW1wbGVHaXQodGhpcy5jb25maWdNYW5hZ2VyLmNlbnRyYWxGb2xkZXJMb2NhdGlvbik7XG4gICAgICAgIGdpdC5mb3JGb2xkZXIgPSAoZm9sZGVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2ltcGxlR2l0KGZvbGRlcik7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBfZG9saXR0bGVDb25maWcuc2V0KHRoaXMsIHJlcXVpcmUoJ3JjJykoJ2RvbGl0dGxlJywge1xuICAgICAgICAgICAgY3NoYXJwOiB7XG4gICAgICAgICAgICAgICAgY29uY2VwdHM6ICdDb25jZXB0cycsXG4gICAgICAgICAgICAgICAgZG9tYWluOiAnRG9tYWluJyxcbiAgICAgICAgICAgICAgICBldmVudHM6ICdFdmVudHMnLFxuICAgICAgICAgICAgICAgIHJlYWQ6ICdSZWFkJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICAgIF9naXQuc2V0KHRoaXMsIGdpdCk7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBuZXcgRm9sZGVycyhmcykpO1xuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5zZXQodGhpcywgbmV3IEJvaWxlclBsYXRlc01hbmFnZXIodGhpcy5jb25maWdNYW5hZ2VyLCB0aGlzLmh0dHBXcmFwcGVyLCBnaXQsIHRoaXMuZm9sZGVycywgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9hcHBsaWNhdGlvbk1hbmFnZXIuc2V0KHRoaXMsIG5ldyBBcHBsaWNhdGlvbk1hbmFnZXIodGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmNvbmZpZ01hbmFnZXIsIHRoaXMuZm9sZGVycywgIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBfYm91bmRlZENvbnRleHRNYW5hZ2VyLnNldCh0aGlzLCBuZXcgQm91bmRlZENvbnRleHRNYW5hZ2VyKHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5hcHBsaWNhdGlvbk1hbmFnZXIsIHRoaXMuZm9sZGVycywgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuc2V0KHRoaXMsIG5ldyBJbnF1aXJlck1hbmFnZXIodGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2FydGlmYWN0c01hbmFnZXIuc2V0KHRoaXMsIG5ldyBBcnRpZmFjdHNNYW5hZ2VyKHRoaXMuaW5xdWlyZXJNYW5hZ2VyLCB0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuYm91bmRlZENvbnRleHRNYW5hZ2VyLCB0aGlzLmZvbGRlcnMsIGZzLCB0aGlzLmxvZ2dlciwgdGhpcy5kb2xpdHRsZUNvbmZpZykpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Q29uZmlnTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7Q29uZmlnTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgY29uZmlnTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0NvbmZpZ1BhcnNlcn1cbiAgICAgKiBAcmV0dXJucyB7Q29uZmlnUGFyc2VyfVxuICAgICAqL1xuICAgIGdldCBjb25maWdQYXJzZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnUGFyc2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Rm9sZGVyc31cbiAgICAgKiBAcmV0dXJucyB7Rm9sZGVyc31cbiAgICAgKi9cbiAgICBnZXQgZm9sZGVycygpIHtcbiAgICAgICAgcmV0dXJuIF9mb2xkZXJzLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7QXBwbGljYXRpb25NYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGFwcGxpY2F0aW9uTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9hcHBsaWNhdGlvbk1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKiBcbiAgICAgKiBHZXRzIHRoZSB7QXJ0aWZhY3RzTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7QXJ0aWZhY3RzTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYXJ0aWZhY3RzTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9hcnRpZmFjdHNNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Qm91bmRlZENvbnRleHRNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtCb3VuZGVkQ29udGV4dE1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGJvdW5kZWRDb250ZXh0TWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZXNNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7SW5xdWlyZXJNYW5hZ2VyXG4gICAgICogQHJldHVybnMge0lucXVpcmVyTWFuYWdlcn19XG4gICAgICovXG4gICAgZ2V0IGlucXVpcmVyTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9pbnF1aXJlck1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtHaXR9IHN5c3RlbVxuICAgICAqIEByZXR1cm5zIHtHaXR9XG4gICAgICovXG4gICAgZ2V0IGdpdCgpIHtcbiAgICAgICAgcmV0dXJuIF9naXQuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHt3aW5zdG9ufSBsb2dnZXJcbiAgICAgKiBAcmV0dXJucyB7d2luc3Rvbn1cbiAgICAgKi9cbiAgICBnZXQgbG9nZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2xvZ2dlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0h0dHBXcmFwcGVyfVxuICAgICAqIEByZXR1cm5zIHtIdHRwV3JhcHBlcn1cbiAgICAgKi9cbiAgICBnZXQgaHR0cFdyYXBwZXIoKSB7XG4gICAgICAgIHJldHVybiBfaHR0cFdyYXBwZXIuZ2V0KHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBkb2xpdHRsZSByYyBjb25maWdcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGdldCBkb2xpdHRsZUNvbmZpZygpIHtcbiAgICAgICAgcmV0dXJuIF9kb2xpdHRsZUNvbmZpZy5nZXQodGhpcyk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBnbG9iYWxzKCk7Il19