'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoundedContextManager = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _BoilerPlatesManager = require('../boilerPlates/BoilerPlatesManager');

var _Guid = require('../Guid');

var _ApplicationManager = require('../applications/ApplicationManager');

var _winston = require('winston');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _BoundedContext = require('./BoundedContext');

var _Folders = require('../Folders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable no-unused-vars */

/**
 * @type {WeakMap<BoundedContextManager, BoilerPlatesManager>}
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable no-unused-vars */
var _boilerPlatesManager = new WeakMap();
/**
 * @type {WeakMap<BoundedContextManager, ApplicationManager>}
 */
var _applicationManager = new WeakMap();
/**
 * @type {WeakMap<BoundedContextManager, Folders>}
 */
var _folders = new WeakMap();
/**
 * @type {WeakMap<BoundedContextManager, fs>}
 */
var _fileSystem = new WeakMap();

var BOUNDED_CONTEXT_FILE_NAME = 'bounded-context.json';
/**
 * Represents the manager for bounded contexts
 */

var BoundedContextManager = exports.BoundedContextManager = function () {

  /**
   * Initializes a new instance of {BoundedContextManager}
   * @param {BoilerPlatesManager} boilerPlatesManager 
   * @param {ApplicationManager} applicationManager
   * @param {Folders} folders
   * @param {fs} fileSystem
   * @param {Logger} logger
   */
  function BoundedContextManager(boilerPlatesManager, applicationManager, folders, fileSystem, logger) {
    (0, _classCallCheck3.default)(this, BoundedContextManager);

    _boilerPlatesManager.set(this, boilerPlatesManager);
    _applicationManager.set(this, applicationManager);
    _folders.set(this, folders);
    _fileSystem.set(this, fileSystem);
    this._logger = logger;
  }

  /**
   * Creates a complete bounded context from boilerplate
   * @param {{name: string, destination: string}} context of the bounded context 
   */


  (0, _createClass3.default)(BoundedContextManager, [{
    key: 'create',
    value: function create(context) {
      this._logger.info('Creating bounded context with name \'' + context.name + '\'');

      var application = _applicationManager.get(this).getApplicationFrom(context.destination);

      if (application === null) {
        var errorMsg = 'Missing application - use \'dolittle create application [name]\' for a new application';
        this._logger.error(errorMsg);
        throw errorMsg;
      }

      var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByLanguageAndType('csharp', 'boundedContext')[0];

      var boundedContextPath = _path2.default.join(context.destination, context.name);

      _folders.get(this).makeFolderIfNotExists(boundedContextPath);
      var templateContext = {
        id: _Guid.Guid.create(),
        name: context.name,
        applicationId: application.id
      };
      _boilerPlatesManager.get(this).createInstance(boilerPlate, boundedContextPath, templateContext);
    }
    /**
     * Searches the file hierarchy for bounded-context.json and returns the BoundedContext
     * @param {string} startPath to search from
     * @returns {BoundedContext} the bounded context
     */

  }, {
    key: 'getNearestBoundedContextConfig',
    value: function getNearestBoundedContextConfig(startPath) {
      var boundedContextConfigPath = this.getNearestBoundedContextPath(startPath);
      if (boundedContextConfigPath === '') {
        this._logger.error(BOUNDED_CONTEXT_FILE_NAME + ' was not found. Cannot create artifacts. Run dolittle create boundedcontext to create a new bounded context from scratch');
        throw 'Bounded context configuration not found';
      }
      this._logger.info('Found bounded context configuration at path \'' + boundedContextConfigPath + '\'');

      var boundedContextObj = JSON.parse(_fileSystem.get(this).readFileSync(boundedContextConfigPath, 'utf8'));
      var boundedContext = new _BoundedContext.BoundedContext(boundedContextObj.application, boundedContextObj.boundedContext, boundedContextObj.boundedContextName, boundedContextObj.core, boundedContextObj.interaction);

      return boundedContext;
    }
    /**
     * Searches the file hierarchy for bounded-context.json and returns the path of the file
     * @param {string} startPath to search from
     * @returns {string} the path of the bounded context or '' if it was not found
     */

  }, {
    key: 'getNearestBoundedContextPath',
    value: function getNearestBoundedContextPath(startPath) {
      var reg = new RegExp('\\b' + BOUNDED_CONTEXT_FILE_NAME + '\\b');
      return _folders.get(this).getNearestFileSearchingUpwards(startPath, reg);
    }
  }]);
  return BoundedContextManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9ib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiV2Vha01hcCIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiQk9VTkRFRF9DT05URVhUX0ZJTEVfTkFNRSIsIkJvdW5kZWRDb250ZXh0TWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIl9sb2dnZXIiLCJjb250ZXh0IiwiaW5mbyIsIm5hbWUiLCJhcHBsaWNhdGlvbiIsImdldCIsImdldEFwcGxpY2F0aW9uRnJvbSIsImRlc3RpbmF0aW9uIiwiZXJyb3JNc2ciLCJlcnJvciIsImJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUiLCJib3VuZGVkQ29udGV4dFBhdGgiLCJwYXRoIiwiam9pbiIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsInRlbXBsYXRlQ29udGV4dCIsImlkIiwiR3VpZCIsImNyZWF0ZSIsImFwcGxpY2F0aW9uSWQiLCJjcmVhdGVJbnN0YW5jZSIsInN0YXJ0UGF0aCIsImJvdW5kZWRDb250ZXh0Q29uZmlnUGF0aCIsImdldE5lYXJlc3RCb3VuZGVkQ29udGV4dFBhdGgiLCJib3VuZGVkQ29udGV4dE9iaiIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImJvdW5kZWRDb250ZXh0IiwiQm91bmRlZENvbnRleHQiLCJib3VuZGVkQ29udGV4dE5hbWUiLCJjb3JlIiwiaW50ZXJhY3Rpb24iLCJyZWciLCJSZWdFeHAiLCJnZXROZWFyZXN0RmlsZVNlYXJjaGluZ1Vwd2FyZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQU1BOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7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LE1BQUosQ0FBVyxRQUFNM0MseUJBQU4sR0FBZ0MsS0FBM0MsQ0FBWDtBQUNBLGFBQU9GLFNBQVNlLEdBQVQsQ0FBYSxJQUFiLEVBQW1CK0IsOEJBQW5CLENBQWtEZCxTQUFsRCxFQUE2RFksR0FBN0QsQ0FBUDtBQUNIIiwiZmlsZSI6IkJvdW5kZWRDb250ZXh0TWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IEJvaWxlclBsYXRlc01hbmFnZXIgfSBmcm9tICcuLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XG5pbXBvcnQgeyBHdWlkIH1mcm9tICcuLi9HdWlkJztcbmltcG9ydCB7IEFwcGxpY2F0aW9uTWFuYWdlciB9IGZyb20gJy4uL2FwcGxpY2F0aW9ucy9BcHBsaWNhdGlvbk1hbmFnZXInO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHsgQm91bmRlZENvbnRleHQgfSBmcm9tICcuL0JvdW5kZWRDb250ZXh0JztcbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxCb3VuZGVkQ29udGV4dE1hbmFnZXIsIEJvaWxlclBsYXRlc01hbmFnZXI+fVxuICovXG5jb25zdCBfYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvdW5kZWRDb250ZXh0TWFuYWdlciwgQXBwbGljYXRpb25NYW5hZ2VyPn1cbiAqL1xuY29uc3QgX2FwcGxpY2F0aW9uTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvdW5kZWRDb250ZXh0TWFuYWdlciwgRm9sZGVycz59XG4gKi9cbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Qm91bmRlZENvbnRleHRNYW5hZ2VyLCBmcz59XG4gKi9cbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgQk9VTkRFRF9DT05URVhUX0ZJTEVfTkFNRSA9ICdib3VuZGVkLWNvbnRleHQuanNvbic7XG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIG1hbmFnZXIgZm9yIGJvdW5kZWQgY29udGV4dHNcbiAqL1xuZXhwb3J0IGNsYXNzIEJvdW5kZWRDb250ZXh0TWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Qm91bmRlZENvbnRleHRNYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGVzTWFuYWdlcn0gYm9pbGVyUGxhdGVzTWFuYWdlciBcbiAgICAgKiBAcGFyYW0ge0FwcGxpY2F0aW9uTWFuYWdlcn0gYXBwbGljYXRpb25NYW5hZ2VyXG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihib2lsZXJQbGF0ZXNNYW5hZ2VyLCBhcHBsaWNhdGlvbk1hbmFnZXIsIGZvbGRlcnMsIGZpbGVTeXN0ZW0sIGxvZ2dlcikge1xuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5zZXQodGhpcywgYm9pbGVyUGxhdGVzTWFuYWdlcik7XG4gICAgICAgIF9hcHBsaWNhdGlvbk1hbmFnZXIuc2V0KHRoaXMsIGFwcGxpY2F0aW9uTWFuYWdlcik7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNvbXBsZXRlIGJvdW5kZWQgY29udGV4dCBmcm9tIGJvaWxlcnBsYXRlXG4gICAgICogQHBhcmFtIHt7bmFtZTogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nfX0gY29udGV4dCBvZiB0aGUgYm91bmRlZCBjb250ZXh0IFxuICAgICAqL1xuICAgIGNyZWF0ZShjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyBib3VuZGVkIGNvbnRleHQgd2l0aCBuYW1lICcke2NvbnRleHQubmFtZX0nYCk7XG5cbiAgICAgICAgbGV0IGFwcGxpY2F0aW9uID0gX2FwcGxpY2F0aW9uTWFuYWdlci5nZXQodGhpcykuZ2V0QXBwbGljYXRpb25Gcm9tKGNvbnRleHQuZGVzdGluYXRpb24pO1xuXG4gICAgICAgIGlmKCBhcHBsaWNhdGlvbiA9PT0gbnVsbCApIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTXNnID0gJ01pc3NpbmcgYXBwbGljYXRpb24gLSB1c2UgXFwnZG9saXR0bGUgY3JlYXRlIGFwcGxpY2F0aW9uIFtuYW1lXVxcJyBmb3IgYSBuZXcgYXBwbGljYXRpb24nO1xuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmVycm9yKGVycm9yTXNnKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yTXNnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKCdjc2hhcnAnLCAnYm91bmRlZENvbnRleHQnKVswXTtcbiAgICAgICAgXG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dFBhdGggPSBwYXRoLmpvaW4oY29udGV4dC5kZXN0aW5hdGlvbiwgY29udGV4dC5uYW1lKTtcbiAgICAgICAgXG4gICAgICAgIF9mb2xkZXJzLmdldCh0aGlzKS5tYWtlRm9sZGVySWZOb3RFeGlzdHMoYm91bmRlZENvbnRleHRQYXRoKTtcbiAgICAgICAgbGV0IHRlbXBsYXRlQ29udGV4dCA9IHtcbiAgICAgICAgICAgIGlkOiBHdWlkLmNyZWF0ZSgpLFxuICAgICAgICAgICAgbmFtZTogY29udGV4dC5uYW1lLFxuICAgICAgICAgICAgYXBwbGljYXRpb25JZDogYXBwbGljYXRpb24uaWRcbiAgICAgICAgfTtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUluc3RhbmNlKGJvaWxlclBsYXRlLCBib3VuZGVkQ29udGV4dFBhdGgsIHRlbXBsYXRlQ29udGV4dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlYXJjaGVzIHRoZSBmaWxlIGhpZXJhcmNoeSBmb3IgYm91bmRlZC1jb250ZXh0Lmpzb24gYW5kIHJldHVybnMgdGhlIEJvdW5kZWRDb250ZXh0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0UGF0aCB0byBzZWFyY2ggZnJvbVxuICAgICAqIEByZXR1cm5zIHtCb3VuZGVkQ29udGV4dH0gdGhlIGJvdW5kZWQgY29udGV4dFxuICAgICAqL1xuICAgIGdldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyhzdGFydFBhdGgpIHtcbiAgICAgICAgY29uc3QgYm91bmRlZENvbnRleHRDb25maWdQYXRoID0gdGhpcy5nZXROZWFyZXN0Qm91bmRlZENvbnRleHRQYXRoKHN0YXJ0UGF0aCk7XG4gICAgICAgIGlmIChib3VuZGVkQ29udGV4dENvbmZpZ1BhdGggPT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYCR7Qk9VTkRFRF9DT05URVhUX0ZJTEVfTkFNRX0gd2FzIG5vdCBmb3VuZC4gQ2Fubm90IGNyZWF0ZSBhcnRpZmFjdHMuIFJ1biBkb2xpdHRsZSBjcmVhdGUgYm91bmRlZGNvbnRleHQgdG8gY3JlYXRlIGEgbmV3IGJvdW5kZWQgY29udGV4dCBmcm9tIHNjcmF0Y2hgKTtcbiAgICAgICAgICAgIHRocm93ICdCb3VuZGVkIGNvbnRleHQgY29uZmlndXJhdGlvbiBub3QgZm91bmQnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBGb3VuZCBib3VuZGVkIGNvbnRleHQgY29uZmlndXJhdGlvbiBhdCBwYXRoICcke2JvdW5kZWRDb250ZXh0Q29uZmlnUGF0aH0nYCk7XG5cbiAgICAgICAgbGV0IGJvdW5kZWRDb250ZXh0T2JqID0gSlNPTi5wYXJzZShfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGJvdW5kZWRDb250ZXh0Q29uZmlnUGF0aCwgJ3V0ZjgnKSk7XG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dCA9IG5ldyBCb3VuZGVkQ29udGV4dChib3VuZGVkQ29udGV4dE9iai5hcHBsaWNhdGlvbiwgYm91bmRlZENvbnRleHRPYmouYm91bmRlZENvbnRleHQsIGJvdW5kZWRDb250ZXh0T2JqLmJvdW5kZWRDb250ZXh0TmFtZSxcbiAgICAgICAgICAgIGJvdW5kZWRDb250ZXh0T2JqLmNvcmUsIGJvdW5kZWRDb250ZXh0T2JqLmludGVyYWN0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBib3VuZGVkQ29udGV4dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VhcmNoZXMgdGhlIGZpbGUgaGllcmFyY2h5IGZvciBib3VuZGVkLWNvbnRleHQuanNvbiBhbmQgcmV0dXJucyB0aGUgcGF0aCBvZiB0aGUgZmlsZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydFBhdGggdG8gc2VhcmNoIGZyb21cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgcGF0aCBvZiB0aGUgYm91bmRlZCBjb250ZXh0IG9yICcnIGlmIGl0IHdhcyBub3QgZm91bmRcbiAgICAgKi9cbiAgICBnZXROZWFyZXN0Qm91bmRlZENvbnRleHRQYXRoKHN0YXJ0UGF0aCkge1xuICAgICAgICBsZXQgcmVnID0gIG5ldyBSZWdFeHAoJ1xcXFxiJytCT1VOREVEX0NPTlRFWFRfRklMRV9OQU1FKydcXFxcYicpO1xuICAgICAgICByZXR1cm4gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldE5lYXJlc3RGaWxlU2VhcmNoaW5nVXB3YXJkcyhzdGFydFBhdGgsIHJlZyk7XG4gICAgfVxufSJdfQ==