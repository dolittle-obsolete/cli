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

/* eslint-enable no-unused-vars */

/**
 * @type {WeakMap<globals, ConfigManager>}
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable no-unused-vars */
var _configManager = new WeakMap();
/**
 * @type {WeakMap<globals, ConfigParser>}
 */
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

    _git.set(this, git);
    _folders.set(this, new _Folders.Folders(_fsExtra2.default));
    _boilerPlatesManager.set(this, new _BoilerPlatesManager.BoilerPlatesManager(this.configManager, this.httpWrapper, git, this.folders, _fsExtra2.default, this.logger));
    _applicationManager.set(this, new _ApplicationManager.ApplicationManager(this.boilerPlatesManager, this.configManager, this.folders, _fsExtra2.default, this.logger));
    _boundedContextManager.set(this, new _BoundedContextManager.BoundedContextManager(this.boilerPlatesManager, this.applicationManager, this.folders, _fsExtra2.default, this.logger));
    _inquirerManager.set(this, new _InquirerManager.InquirerManager(this.folders, _fsExtra2.default, this.logger));
    _artifactsManager.set(this, new _ArtifactsManager.ArtifactsManager(this.inquirerManager, this.boilerPlatesManager, this.boundedContextManager, this.folders, _fsExtra2.default, this.logger));
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
  }]);
  return globals;
}();

exports.default = new globals();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9nbG9iYWxzLmpzIl0sIm5hbWVzIjpbIl9jb25maWdNYW5hZ2VyIiwiV2Vha01hcCIsIl9jb25maWdQYXJzZXIiLCJfYXBwbGljYXRpb25NYW5hZ2VyIiwiX2FydGlmYWN0c01hbmFnZXIiLCJfYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiX2JvaWxlclBsYXRlc01hbmFnZXIiLCJfaW5xdWlyZXJNYW5hZ2VyIiwiX2ZvbGRlcnMiLCJfZ2l0IiwiX2xvZ2dlciIsIl9odHRwV3JhcHBlciIsImdsb2JhbHMiLCJzZXQiLCJ3aW5zdG9uIiwiY3JlYXRlTG9nZ2VyIiwibGV2ZWwiLCJmb3JtYXQiLCJjb21iaW5lIiwiY29sb3JpemUiLCJzaW1wbGUiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsIkh0dHBXcmFwcGVyIiwiQ29uZmlnUGFyc2VyIiwiQ29uZmlnTWFuYWdlciIsImZzIiwiY29uZmlnUGFyc2VyIiwibG9nZ2VyIiwiZ2l0IiwiY29uZmlnTWFuYWdlciIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiIsImZvckZvbGRlciIsImZvbGRlciIsIkZvbGRlcnMiLCJCb2lsZXJQbGF0ZXNNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJmb2xkZXJzIiwiQXBwbGljYXRpb25NYW5hZ2VyIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsIkJvdW5kZWRDb250ZXh0TWFuYWdlciIsImFwcGxpY2F0aW9uTWFuYWdlciIsIklucXVpcmVyTWFuYWdlciIsIkFydGlmYWN0c01hbmFnZXIiLCJpbnF1aXJlck1hbmFnZXIiLCJib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUNBOztBQUVBOzs7QUFyQkE7Ozs7QUFJQTtBQW9CQSxJQUFNQSxpQkFBaUIsSUFBSUMs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LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHdpbnN0b24gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgc2ltcGxlR2l0IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgR2l0IH0gZnJvbSAnc2ltcGxlLWdpdCc7XG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0IHsgQ29uZmlnUGFyc2VyIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uL0NvbmZpZ1BhcnNlcic7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbk1hbmFnZXIgfSBmcm9tICcuL2FwcGxpY2F0aW9ucy9BcHBsaWNhdGlvbk1hbmFnZXInO1xuaW1wb3J0IHsgQm91bmRlZENvbnRleHRNYW5hZ2VyIH0gZnJvbSAnLi9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyJztcbmltcG9ydCB7IEJvaWxlclBsYXRlc01hbmFnZXIgfSBmcm9tICcuL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCB7IEh0dHBXcmFwcGVyIH0gZnJvbSAnLi9IdHRwV3JhcHBlcic7XG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi9Gb2xkZXJzJztcbmltcG9ydCB7IEFydGlmYWN0c01hbmFnZXIgfSBmcm9tICcuL2FydGlmYWN0cy9BcnRpZmFjdHNNYW5hZ2VyJztcbmltcG9ydCB7IElucXVpcmVyTWFuYWdlciB9IGZyb20gJy4vYXJ0aWZhY3RzL0lucXVpcmVyTWFuYWdlcic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxnbG9iYWxzLCBDb25maWdNYW5hZ2VyPn1cbiAqL1xuY29uc3QgX2NvbmZpZ01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxnbG9iYWxzLCBDb25maWdQYXJzZXI+fVxuICovXG5jb25zdCBfY29uZmlnUGFyc2VyID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Z2xvYmFscywgQXBwbGljYXRpb25NYW5hZ2VyPn1cbiAqL1xuY29uc3QgX2FwcGxpY2F0aW9uTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPGdsb2JhbHMsIEFydGlmYWN0c01hbmFnZXI+fVxuICovXG5jb25zdCBfYXJ0aWZhY3RzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPGdsb2JhbHMsIEJvdW5kZWRDb250ZXh0TWFuYWdlcj59XG4gKi9cbmNvbnN0IF9ib3VuZGVkQ29udGV4dE1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxnbG9iYWxzLCBCb2lsZXJQbGF0ZXNNYW5hZ2VyPn1cbiAqL1xuY29uc3QgX2JvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxnbG9iYWxzLCBJbnF1aXJlck1hbmFnZXI+fVxuICovXG5jb25zdCBfaW5xdWlyZXJNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Z2xvYmFscywgRm9sZGVycz59XG4gKi9cbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Z2xvYmFscywgR2l0Pn1cbiAqL1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPGdsb2JhbHMsIHdpbnN0b24+fVxuICovXG5jb25zdCBfbG9nZ2VyID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Z2xvYmFscywgSHR0cFdyYXBwZXI+fVxuICovXG5jb25zdCBfaHR0cFdyYXBwZXIgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIENvbW1vbiBnbG9iYWxzIG9iamVjdFxuICovXG5jbGFzcyBnbG9iYWxzIHtcbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGluaXRpYWxpemF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIF9sb2dnZXIuc2V0KHRoaXMsIHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcbiAgICAgICAgICAgIGxldmVsOiAnaW5mbycsXG4gICAgICAgICAgICBmb3JtYXQ6IHdpbnN0b24uZm9ybWF0LmNvbWJpbmUoXG4gICAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSxcbiAgICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5zaW1wbGUoKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoKVxuICAgICAgICAgICAgXVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgX2h0dHBXcmFwcGVyLnNldCh0aGlzLCBuZXcgSHR0cFdyYXBwZXIoKSk7XG4gICAgICAgIFxuICAgICAgICBfY29uZmlnUGFyc2VyLnNldCh0aGlzLCBuZXcgQ29uZmlnUGFyc2VyKCkpO1xuICAgICAgICBfY29uZmlnTWFuYWdlci5zZXQodGhpcywgbmV3IENvbmZpZ01hbmFnZXIoZnMsIHRoaXMuY29uZmlnUGFyc2VyLCB0aGlzLmxvZ2dlcikpO1xuXG4gICAgICAgIGxldCBnaXQgPSBzaW1wbGVHaXQodGhpcy5jb25maWdNYW5hZ2VyLmNlbnRyYWxGb2xkZXJMb2NhdGlvbik7XG4gICAgICAgIGdpdC5mb3JGb2xkZXIgPSAoZm9sZGVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2ltcGxlR2l0KGZvbGRlcik7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBfZ2l0LnNldCh0aGlzLCBnaXQpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgbmV3IEZvbGRlcnMoZnMpKTtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIG5ldyBCb2lsZXJQbGF0ZXNNYW5hZ2VyKHRoaXMuY29uZmlnTWFuYWdlciwgdGhpcy5odHRwV3JhcHBlciwgZ2l0LCB0aGlzLmZvbGRlcnMsIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBfYXBwbGljYXRpb25NYW5hZ2VyLnNldCh0aGlzLCBuZXcgQXBwbGljYXRpb25NYW5hZ2VyKHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5jb25maWdNYW5hZ2VyLCB0aGlzLmZvbGRlcnMsICBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2JvdW5kZWRDb250ZXh0TWFuYWdlci5zZXQodGhpcywgbmV3IEJvdW5kZWRDb250ZXh0TWFuYWdlcih0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuYXBwbGljYXRpb25NYW5hZ2VyLCB0aGlzLmZvbGRlcnMsIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLnNldCh0aGlzLCBuZXcgSW5xdWlyZXJNYW5hZ2VyKHRoaXMuZm9sZGVycywgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9hcnRpZmFjdHNNYW5hZ2VyLnNldCh0aGlzLCBuZXcgQXJ0aWZhY3RzTWFuYWdlcih0aGlzLmlucXVpcmVyTWFuYWdlciwgdGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmJvdW5kZWRDb250ZXh0TWFuYWdlciwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0NvbmZpZ01hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0NvbmZpZ01hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvbmZpZ01hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnTWFuYWdlci5nZXQodGhpcyk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtDb25maWdQYXJzZXJ9XG4gICAgICogQHJldHVybnMge0NvbmZpZ1BhcnNlcn1cbiAgICAgKi9cbiAgICBnZXQgY29uZmlnUGFyc2VyKCkge1xuICAgICAgICByZXR1cm4gX2NvbmZpZ1BhcnNlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0ZvbGRlcnN9XG4gICAgICogQHJldHVybnMge0ZvbGRlcnN9XG4gICAgICovXG4gICAgZ2V0IGZvbGRlcnMoKSB7XG4gICAgICAgIHJldHVybiBfZm9sZGVycy5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0FwcGxpY2F0aW9uTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7QXBwbGljYXRpb25NYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBhcHBsaWNhdGlvbk1hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfYXBwbGljYXRpb25NYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKiogXG4gICAgICogR2V0cyB0aGUge0FydGlmYWN0c01hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0FydGlmYWN0c01hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGFydGlmYWN0c01hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfYXJ0aWZhY3RzTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0JvdW5kZWRDb250ZXh0TWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7Qm91bmRlZENvbnRleHRNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBib3VuZGVkQ29udGV4dE1hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfYm91bmRlZENvbnRleHRNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVzTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0lucXVpcmVyTWFuYWdlclxuICAgICAqIEByZXR1cm5zIHtJbnF1aXJlck1hbmFnZXJ9fVxuICAgICAqL1xuICAgIGdldCBpbnF1aXJlck1hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfaW5xdWlyZXJNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7R2l0fSBzeXN0ZW1cbiAgICAgKiBAcmV0dXJucyB7R2l0fVxuICAgICAqL1xuICAgIGdldCBnaXQoKSB7XG4gICAgICAgIHJldHVybiBfZ2l0LmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7d2luc3Rvbn0gbG9nZ2VyXG4gICAgICogQHJldHVybnMge3dpbnN0b259XG4gICAgICovXG4gICAgZ2V0IGxvZ2dlcigpIHtcbiAgICAgICAgcmV0dXJuIF9sb2dnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtIdHRwV3JhcHBlcn1cbiAgICAgKiBAcmV0dXJucyB7SHR0cFdyYXBwZXJ9XG4gICAgICovXG4gICAgZ2V0IGh0dHBXcmFwcGVyKCkge1xuICAgICAgICByZXR1cm4gX2h0dHBXcmFwcGVyLmdldCh0aGlzKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IGdsb2JhbHMoKTsiXX0=