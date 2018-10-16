'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicationManager = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Folders = require('../Folders');

var _winston = require('winston');

var _BoilerPlatesManager = require('../boilerPlates/BoilerPlatesManager');

var _ConfigManager = require('../configuration/ConfigManager');

var _Guid = require('../Guid');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _Application = require('./Application');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable no-unused-vars */

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable no-unused-vars */
var applicationFilename = 'application.json';
/**
 * @type {WeakMap<ApplicationManager, BoilerPlatesManager>}
 */
var _boilerPlatesManager = new WeakMap();
/**
 * @type {WeakMap<ApplicationManager, ConfigManager>}
 */
var _configManager = new WeakMap();
/**
 * @type {WeakMap<ApplicationManager, Folders>}
 */
var _folders = new WeakMap();
/**
 * @type {WeakMap<ApplicationManager, fs>}
 */
var _fileSystem = new WeakMap();

/**
 * Represents a manager for applications
 */

var ApplicationManager = exports.ApplicationManager = function () {

  /**
   * Initializes a new instance of {ApplicationManager}
   * @param {BoilerPlatesManager} boilerPlatesManager
   * @param {ConfigManager} configManager
   * @param {Folders} folders 
   * @param {fs} fileSystem
   * @param {Logger} logger
   */
  function ApplicationManager(boilerPlatesManager, configManager, folders, fileSystem, logger) {
    (0, _classCallCheck3.default)(this, ApplicationManager);

    _boilerPlatesManager.set(this, boilerPlatesManager);
    _configManager.set(this, configManager);
    _folders.set(this, folders);
    _fileSystem.set(this, fileSystem);
    this._logger = logger;
  }

  /**
   * Create an application
   * @param {string} name 
   */


  (0, _createClass3.default)(ApplicationManager, [{
    key: 'create',
    value: function create(name) {
      this._logger.info('Creating application with name \'' + name + '\'');

      var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('application')[0];
      var context = {
        id: _Guid.Guid.create(),
        name: name
      };
      var destination = process.cwd();

      _boilerPlatesManager.get(this).createInstance(boilerPlate, destination, context);
    }
    /**
     * Gets the application configuration from the given folder
     * @param {string} folder path 
     * @param {Application | null} application config or null if not found
     */

  }, {
    key: 'getApplicationFrom',
    value: function getApplicationFrom(folder) {
      if (!this.hasApplication(folder)) return null;
      var applicationObj = JSON.parse(_fileSystem.get(this).readFileSync(_path2.default.join(folder, applicationFilename), 'utf8'));
      return new _Application.Application(applicationObj.id, applicationObj.name);
    }
    /**
     * Check if an application has been setup in the given folder.
     * @param {string} folder path
     * @returns {boolean} whether or not the application configuration is set up
     */

  }, {
    key: 'hasApplication',
    value: function hasApplication(folder) {

      return _fileSystem.get(this).existsSync(_path2.default.join(folder, applicationFilename));
    }
  }]);
  return ApplicationManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImFwcGxpY2F0aW9uRmlsZW5hbWUiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfY29uZmlnTWFuYWdlciIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJBcHBsaWNhdGlvbk1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiY29uZmlnTWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsIm5hbWUiLCJpbmZvIiwiYm9pbGVyUGxhdGUiLCJnZXQiLCJib2lsZXJQbGF0ZXNCeVR5cGUiLCJjb250ZXh0IiwiaWQiLCJHdWlkIiwiY3JlYXRlIiwiZGVzdGluYXRpb24iLCJwcm9jZXNzIiwiY3dkIiwiY3JlYXRlSW5zdGFuY2UiLCJmb2xkZXIiLCJoYXNBcHBsaWNhdGlvbiIsImFwcGxpY2F0aW9uT2JqIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwicGF0aCIsImpvaW4iLCJBcHBsaWNhdGlvbiIsImV4aXN0c1N5bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQU1BOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQWRBOzs7OztBQUtBO0FBV0EsSUFBTUEsc0JBQXNCLGtCQUE1QjtBQUNBOzs7QUFHQSxJQUFNQyx1QkFBdUIsSUFBSUMsT0FBSixFQUE3QjtBQUNBOzs7QUFHQSxJQUFNQyxpQkFBaUIsSUFBSUQsT0FBSixFQUF2QjtBQUNBOzs7QUFHQSxJQUFNRSxXQUFXLElBQUlGLE9BQUosRUFBakI7QUFDQTs7O0FBR0EsSUFBTUcsY0FBYyxJQUFJSCxPQUFKLEVBQXBCOztBQUdBOzs7O0lBR2FJLGtCLFdBQUFBLGtCOztBQUVUOzs7Ozs7OztBQVFBLDhCQUFZQyxtQkFBWixFQUFpQ0MsYUFBakMsRUFBZ0RDLE9BQWhELEVBQXlEQyxVQUF6RCxFQUFxRUMsTUFBckUsRUFBNkU7QUFBQTs7QUFDekVWLHlCQUFxQlcsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JMLG1CQUEvQjtBQUNBSixtQkFBZVMsR0FBZixDQUFtQixJQUFuQixFQUF5QkosYUFBekI7QUFDQUosYUFBU1EsR0FBVCxDQUFhLElBQWIsRUFBbUJILE9BQW5CO0FBQ0FKLGdCQUFZTyxHQUFaLENBQWdCLElBQWhCLEVBQXNCRixVQUF0QjtBQUNBLFNBQUtHLE9BQUwsR0FBZUYsTUFBZjtBQUNIOztBQUVEOzs7Ozs7OzsyQkFJT0csSSxFQUFNO0FBQ1QsV0FBS0QsT0FBTCxDQUFhRSxJQUFiLHVDQUFxREQsSUFBckQ7O0FBRUEsVUFBSUUsY0FBY2YscUJBQXFCZ0IsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JDLGtCQUEvQixDQUFrRCxhQUFsRCxFQUFpRSxDQUFqRSxDQUFsQjtBQUNBLFVBQUlDLFVBQVU7QUFDVkMsWUFBSUMsV0FBS0MsTUFBTCxFQURNO0FBRVZSLGNBQU1BO0FBRkksT0FBZDtBQUlBLFVBQUlTLGNBQWNDLFFBQVFDLEdBQVIsRUFBbEI7O0FBRUF4QiwyQkFBcUJnQixHQUFyQixDQUF5QixJQUF6QixFQUErQlMsY0FBL0IsQ0FBOENWLFdBQTlDLEVBQTJETyxXQUEzRCxFQUF3RUosT0FBeEU7QUFDSDtBQUNEOzs7Ozs7Ozt1Q0FLbUJRLE0sRUFBUTtBQUN2QixVQUFJLENBQUUsS0FBS0MsY0FBTCxDQUFvQkQsTUFBcEIsQ0FBTixFQUNJLE9BQU8sSUFBUDtBQUNKLFVBQUlFLGlCQUFpQkMsS0FBS0MsS0FBTCxDQUFXMUIsWUFBWVksR0FBWixDQUFnQixJQUFoQixFQUFzQmUsWUFBdEIsQ0FBbUNDLGVBQUtDLElBQUwsQ0FBVVAsTUFBVixFQUFrQjNCLG1CQUFsQixDQUFuQyxFQUEyRSxNQUEzRSxDQUFYLENBQXJCO0FBQ0EsYUFBTyxJQUFJbUMsd0JBQUosQ0FBZ0JOLGVBQWVULEVBQS9CLEVBQW1DUyxlQUFlZixJQUFsRCxDQUFQO0FBQ0g7QUFDRDs7Ozs7Ozs7bUNBS2VhLE0sRUFBUTs7QUFFbkIsYUFBT3RCLFlBQVlZLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JtQixVQUF0QixDQUFpQ0gsZUFBS0MsSUFBTCxDQUFVUCxNQUFWLEVBQWlCM0IsbUJBQWpCLENBQWpDLENBQVA7QUFDSCIsImZpbGUiOiJBcHBsaWNhdGlvbk1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQge0ZvbGRlcnN9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfSBmcm9tICcuLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XG5pbXBvcnQge0NvbmZpZ01hbmFnZXJ9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XG5pbXBvcnQge0d1aWR9IGZyb20gJy4uL0d1aWQnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbn0gZnJvbSAnLi9BcHBsaWNhdGlvbic7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbmNvbnN0IGFwcGxpY2F0aW9uRmlsZW5hbWUgPSAnYXBwbGljYXRpb24uanNvbic7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEFwcGxpY2F0aW9uTWFuYWdlciwgQm9pbGVyUGxhdGVzTWFuYWdlcj59XG4gKi9cbmNvbnN0IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8QXBwbGljYXRpb25NYW5hZ2VyLCBDb25maWdNYW5hZ2VyPn1cbiAqL1xuY29uc3QgX2NvbmZpZ01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxBcHBsaWNhdGlvbk1hbmFnZXIsIEZvbGRlcnM+fVxuICovXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEFwcGxpY2F0aW9uTWFuYWdlciwgZnM+fVxuICovXG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbWFuYWdlciBmb3IgYXBwbGljYXRpb25zXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbk1hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0FwcGxpY2F0aW9uTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlc01hbmFnZXJ9IGJvaWxlclBsYXRlc01hbmFnZXJcbiAgICAgKiBAcGFyYW0ge0NvbmZpZ01hbmFnZXJ9IGNvbmZpZ01hbmFnZXJcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnMgXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihib2lsZXJQbGF0ZXNNYW5hZ2VyLCBjb25maWdNYW5hZ2VyLCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIGJvaWxlclBsYXRlc01hbmFnZXIpO1xuICAgICAgICBfY29uZmlnTWFuYWdlci5zZXQodGhpcywgY29uZmlnTWFuYWdlcik7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGFwcGxpY2F0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICovXG4gICAgY3JlYXRlKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGFwcGxpY2F0aW9uIHdpdGggbmFtZSAnJHtuYW1lfSdgKTtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlUeXBlKCdhcHBsaWNhdGlvbicpWzBdO1xuICAgICAgICBsZXQgY29udGV4dCA9IHtcbiAgICAgICAgICAgIGlkOiBHdWlkLmNyZWF0ZSgpLFxuICAgICAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB9O1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgICBcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUluc3RhbmNlKGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgZ2l2ZW4gZm9sZGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciBwYXRoIFxuICAgICAqIEBwYXJhbSB7QXBwbGljYXRpb24gfCBudWxsfSBhcHBsaWNhdGlvbiBjb25maWcgb3IgbnVsbCBpZiBub3QgZm91bmRcbiAgICAgKi9cbiAgICBnZXRBcHBsaWNhdGlvbkZyb20oZm9sZGVyKSB7XG4gICAgICAgIGlmICghIHRoaXMuaGFzQXBwbGljYXRpb24oZm9sZGVyKSkgXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IGFwcGxpY2F0aW9uT2JqID0gSlNPTi5wYXJzZShfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKHBhdGguam9pbihmb2xkZXIsIGFwcGxpY2F0aW9uRmlsZW5hbWUpLCAndXRmOCcpKTtcbiAgICAgICAgcmV0dXJuIG5ldyBBcHBsaWNhdGlvbihhcHBsaWNhdGlvbk9iai5pZCwgYXBwbGljYXRpb25PYmoubmFtZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGFuIGFwcGxpY2F0aW9uIGhhcyBiZWVuIHNldHVwIGluIHRoZSBnaXZlbiBmb2xkZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciBwYXRoXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IHRoZSBhcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uIGlzIHNldCB1cFxuICAgICAqL1xuICAgIGhhc0FwcGxpY2F0aW9uKGZvbGRlcikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIF9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKHBhdGguam9pbihmb2xkZXIsYXBwbGljYXRpb25GaWxlbmFtZSkpO1xuICAgIH1cbn0iXX0=