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

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var applicationFilename = "application.json";
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

      var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType("application")[0];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImFwcGxpY2F0aW9uRmlsZW5hbWUiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfY29uZmlnTWFuYWdlciIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJBcHBsaWNhdGlvbk1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiY29uZmlnTWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsIm5hbWUiLCJpbmZvIiwiYm9pbGVyUGxhdGUiLCJnZXQiLCJib2lsZXJQbGF0ZXNCeVR5cGUiLCJjb250ZXh0IiwiaWQiLCJHdWlkIiwiY3JlYXRlIiwiZGVzdGluYXRpb24iLCJwcm9jZXNzIiwiY3dkIiwiY3JlYXRlSW5zdGFuY2UiLCJmb2xkZXIiLCJoYXNBcHBsaWNhdGlvbiIsImFwcGxpY2F0aW9uT2JqIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwicGF0aCIsImpvaW4iLCJBcHBsaWNhdGlvbiIsImV4aXN0c1N5bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQVhBOzs7O0FBYUEsSUFBTUEsc0JBQXNCLGtCQUE1QjtBQUNBOzs7QUFHQSxJQUFNQyx1QkFBdUIsSUFBSUMsT0FBSixFQUE3QjtBQUNBOzs7QUFHQSxJQUFNQyxpQkFBaUIsSUFBSUQsT0FBSixFQUF2QjtBQUNBOzs7QUFHQSxJQUFNRSxXQUFXLElBQUlGLE9BQUosRUFBakI7QUFDQTs7O0FBR0EsSUFBTUcsY0FBYyxJQUFJSCxPQUFKLEVBQXBCOztBQUdBOzs7O0lBR2FJLGtCLFdBQUFBLGtCOztBQUVUOzs7Ozs7OztBQVFBLDhCQUFZQyxtQkFBWixFQUFpQ0MsYUFBakMsRUFBZ0RDLE9BQWhELEVBQXlEQyxVQUF6RCxFQUFxRUMsTUFBckUsRUFBNkU7QUFBQTs7QUFDekVWLHlCQUFxQlcsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JMLG1CQUEvQjtBQUNBSixtQkFBZVMsR0FBZixDQUFtQixJQUFuQixFQUF5QkosYUFBekI7QUFDQUosYUFBU1EsR0FBVCxDQUFhLElBQWIsRUFBbUJILE9BQW5CO0FBQ0FKLGdCQUFZTyxHQUFaLENBQWdCLElBQWhCLEVBQXNCRixVQUF0QjtBQUNBLFNBQUtHLE9BQUwsR0FBZUYsTUFBZjtBQUNIOztBQUVEOzs7Ozs7OzsyQkFJT0csSSxFQUFNO0FBQ1QsV0FBS0QsT0FBTCxDQUFhRSxJQUFiLHVDQUFxREQsSUFBckQ7O0FBRUEsVUFBSUUsY0FBY2YscUJBQXFCZ0IsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JDLGtCQUEvQixDQUFrRCxhQUFsRCxFQUFpRSxDQUFqRSxDQUFsQjtBQUNBLFVBQUlDLFVBQVU7QUFDVkMsWUFBSUMsV0FBS0MsTUFBTCxFQURNO0FBRVZSLGNBQU1BO0FBRkksT0FBZDtBQUlBLFVBQUlTLGNBQWNDLFFBQVFDLEdBQVIsRUFBbEI7O0FBRUF4QiwyQkFBcUJnQixHQUFyQixDQUF5QixJQUF6QixFQUErQlMsY0FBL0IsQ0FBOENWLFdBQTlDLEVBQTJETyxXQUEzRCxFQUF3RUosT0FBeEU7QUFDSDtBQUNEOzs7Ozs7Ozt1Q0FLbUJRLE0sRUFBUTtBQUN2QixVQUFJLENBQUUsS0FBS0MsY0FBTCxDQUFvQkQsTUFBcEIsQ0FBTixFQUNJLE9BQU8sSUFBUDtBQUNKLFVBQUlFLGlCQUFpQkMsS0FBS0MsS0FBTCxDQUFXMUIsWUFBWVksR0FBWixDQUFnQixJQUFoQixFQUFzQmUsWUFBdEIsQ0FBbUNDLGVBQUtDLElBQUwsQ0FBVVAsTUFBVixFQUFrQjNCLG1CQUFsQixDQUFuQyxFQUEyRSxNQUEzRSxDQUFYLENBQXJCO0FBQ0EsYUFBTyxJQUFJbUMsd0JBQUosQ0FBZ0JOLGVBQWVULEVBQS9CLEVBQW1DUyxlQUFlZixJQUFsRCxDQUFQO0FBQ0g7QUFDRDs7Ozs7Ozs7bUNBS2VhLE0sRUFBUTs7QUFFbkIsYUFBT3RCLFlBQVlZLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JtQixVQUF0QixDQUFpQ0gsZUFBS0MsSUFBTCxDQUFVUCxNQUFWLEVBQWlCM0IsbUJBQWpCLENBQWpDLENBQVA7QUFDSCIsImZpbGUiOiJBcHBsaWNhdGlvbk1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG5pbXBvcnQge8KgTG9nZ2VyIH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQge8KgQm9pbGVyUGxhdGVzTWFuYWdlcn0gZnJvbSAnLi4vYm9pbGVyUGxhdGVzL0JvaWxlclBsYXRlc01hbmFnZXInO1xuaW1wb3J0IHvCoENvbmZpZ01hbmFnZXIgfSBmcm9tICcuLi9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0IHsgR3VpZCB9IGZyb20gJy4uL0d1aWQnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tICcuL0FwcGxpY2F0aW9uJztcblxuY29uc3QgYXBwbGljYXRpb25GaWxlbmFtZSA9IFwiYXBwbGljYXRpb24uanNvblwiO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxBcHBsaWNhdGlvbk1hbmFnZXIsIEJvaWxlclBsYXRlc01hbmFnZXI+fVxuICovXG5jb25zdCBfYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEFwcGxpY2F0aW9uTWFuYWdlciwgQ29uZmlnTWFuYWdlcj59XG4gKi9cbmNvbnN0IF9jb25maWdNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8QXBwbGljYXRpb25NYW5hZ2VyLCBGb2xkZXJzPn1cbiAqL1xuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxBcHBsaWNhdGlvbk1hbmFnZXIsIGZzPn1cbiAqL1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIG1hbmFnZXIgZm9yIGFwcGxpY2F0aW9uc1xuICovXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb25NYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfSBib2lsZXJQbGF0ZXNNYW5hZ2VyXG4gICAgICogQHBhcmFtIHtDb25maWdNYW5hZ2VyfSBjb25maWdNYW5hZ2VyXG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzIFxuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYm9pbGVyUGxhdGVzTWFuYWdlciwgY29uZmlnTWFuYWdlciwgZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLnNldCh0aGlzLCBib2lsZXJQbGF0ZXNNYW5hZ2VyKTtcbiAgICAgICAgX2NvbmZpZ01hbmFnZXIuc2V0KHRoaXMsIGNvbmZpZ01hbmFnZXIpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBhcHBsaWNhdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqL1xuICAgIGNyZWF0ZShuYW1lKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyBhcHBsaWNhdGlvbiB3aXRoIG5hbWUgJyR7bmFtZX0nYCk7XG5cbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5VHlwZShcImFwcGxpY2F0aW9uXCIpWzBdO1xuICAgICAgICBsZXQgY29udGV4dCA9IHtcbiAgICAgICAgICAgIGlkOiBHdWlkLmNyZWF0ZSgpLFxuICAgICAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB9O1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgICBcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUluc3RhbmNlKGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgZ2l2ZW4gZm9sZGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciBwYXRoIFxuICAgICAqIEBwYXJhbSB7QXBwbGljYXRpb24gfCBudWxsfSBhcHBsaWNhdGlvbiBjb25maWcgb3IgbnVsbCBpZiBub3QgZm91bmRcbiAgICAgKi9cbiAgICBnZXRBcHBsaWNhdGlvbkZyb20oZm9sZGVyKSB7XG4gICAgICAgIGlmICghIHRoaXMuaGFzQXBwbGljYXRpb24oZm9sZGVyKSkgXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IGFwcGxpY2F0aW9uT2JqID0gSlNPTi5wYXJzZShfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKHBhdGguam9pbihmb2xkZXIsIGFwcGxpY2F0aW9uRmlsZW5hbWUpLCAndXRmOCcpKTtcbiAgICAgICAgcmV0dXJuIG5ldyBBcHBsaWNhdGlvbihhcHBsaWNhdGlvbk9iai5pZCwgYXBwbGljYXRpb25PYmoubmFtZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGFuIGFwcGxpY2F0aW9uIGhhcyBiZWVuIHNldHVwIGluIHRoZSBnaXZlbiBmb2xkZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZvbGRlciBwYXRoXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IHRoZSBhcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uIGlzIHNldCB1cFxuICAgICAqL1xuICAgIGhhc0FwcGxpY2F0aW9uKGZvbGRlcikge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIF9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKHBhdGguam9pbihmb2xkZXIsYXBwbGljYXRpb25GaWxlbmFtZSkpO1xuICAgIH1cbn0iXX0=