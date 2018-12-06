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
   * @param {{name: string, destination: string}} context
   */


  (0, _createClass3.default)(ApplicationManager, [{
    key: 'create',
    value: function create(context) {
      this._logger.info('Creating application with name \'' + context.name + '\'');

      var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('application')[0];
      var templateContext = {
        id: _Guid.Guid.create(),
        name: context.name
      };

      _boilerPlatesManager.get(this).createInstance(boilerPlate, context.destination, templateContext);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImFwcGxpY2F0aW9uRmlsZW5hbWUiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfY29uZmlnTWFuYWdlciIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJBcHBsaWNhdGlvbk1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiY29uZmlnTWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsImNvbnRleHQiLCJpbmZvIiwibmFtZSIsImJvaWxlclBsYXRlIiwiZ2V0IiwiYm9pbGVyUGxhdGVzQnlUeXBlIiwidGVtcGxhdGVDb250ZXh0IiwiaWQiLCJHdWlkIiwiY3JlYXRlIiwiY3JlYXRlSW5zdGFuY2UiLCJkZXN0aW5hdGlvbiIsImZvbGRlciIsImhhc0FwcGxpY2F0aW9uIiwiYXBwbGljYXRpb25PYmoiLCJKU09OIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJwYXRoIiwiam9pbiIsIkFwcGxpY2F0aW9uIiwiZXhpc3RzU3luYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBTUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBZEE7Ozs7O0FBS0E7QUFXQSxJQUFNQSxzQkFBc0Isa0JBQTVCO0FBQ0E7OztBQUdBLElBQU1DLHVCQUF1QixJQUFJQyxPQUFKLEVBQTdCO0FBQ0E7OztBQUdBLElBQU1DLGlCQUFpQixJQUFJRCxPQUFKLEVBQXZCO0FBQ0E7OztBQUdBLElBQU1FLFdBQVcsSUFBSUYsT0FBSixFQUFqQjtBQUNBOzs7QUFHQSxJQUFNRyxjQUFjLElBQUlILE9BQUosRUFBcEI7O0FBR0E7Ozs7SUFHYUksa0IsV0FBQUEsa0I7O0FBRVQ7Ozs7Ozs7O0FBUUEsOEJBQVlDLG1CQUFaLEVBQWlDQyxhQUFqQyxFQUFnREMsT0FBaEQsRUFBeURDLFVBQXpELEVBQXFFQyxNQUFyRSxFQUE2RTtBQUFBOztBQUN6RVYseUJBQXFCVyxHQUFyQixDQUF5QixJQUF6QixFQUErQkwsbUJBQS9CO0FBQ0FKLG1CQUFlUyxHQUFmLENBQW1CLElBQW5CLEVBQXlCSixhQUF6QjtBQUNBSixhQUFTUSxHQUFULENBQWEsSUFBYixFQUFtQkgsT0FBbkI7QUFDQUosZ0JBQVlPLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JGLFVBQXRCO0FBQ0EsU0FBS0csT0FBTCxHQUFlRixNQUFmO0FBQ0g7O0FBRUQ7Ozs7Ozs7OzJCQUlPRyxPLEVBQVM7QUFDWixXQUFLRCxPQUFMLENBQWFFLElBQWIsdUNBQXFERCxRQUFRRSxJQUE3RDs7QUFFQSxVQUFJQyxjQUFjaEIscUJBQXFCaUIsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JDLGtCQUEvQixDQUFrRCxhQUFsRCxFQUFpRSxDQUFqRSxDQUFsQjtBQUNBLFVBQUlDLGtCQUFrQjtBQUNsQkMsWUFBSUMsV0FBS0MsTUFBTCxFQURjO0FBRWxCUCxjQUFNRixRQUFRRTtBQUZJLE9BQXRCOztBQUtBZiwyQkFBcUJpQixHQUFyQixDQUF5QixJQUF6QixFQUErQk0sY0FBL0IsQ0FBOENQLFdBQTlDLEVBQTJESCxRQUFRVyxXQUFuRSxFQUFnRkwsZUFBaEY7QUFDSDtBQUNEOzs7Ozs7Ozt1Q0FLbUJNLE0sRUFBUTtBQUN2QixVQUFJLENBQUUsS0FBS0MsY0FBTCxDQUFvQkQsTUFBcEIsQ0FBTixFQUNJLE9BQU8sSUFBUDtBQUNKLFVBQUlFLGlCQUFpQkMsS0FBS0MsS0FBTCxDQUFXekIsWUFBWWEsR0FBWixDQUFnQixJQUFoQixFQUFzQmEsWUFBdEIsQ0FBbUNDLGVBQUtDLElBQUwsQ0FBVVAsTUFBVixFQUFrQjFCLG1CQUFsQixDQUFuQyxFQUEyRSxNQUEzRSxDQUFYLENBQXJCO0FBQ0EsYUFBTyxJQUFJa0Msd0JBQUosQ0FBZ0JOLGVBQWVQLEVBQS9CLEVBQW1DTyxlQUFlWixJQUFsRCxDQUFQO0FBQ0g7QUFDRDs7Ozs7Ozs7bUNBS2VVLE0sRUFBUTs7QUFFbkIsYUFBT3JCLFlBQVlhLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JpQixVQUF0QixDQUFpQ0gsZUFBS0MsSUFBTCxDQUFVUCxNQUFWLEVBQWlCMUIsbUJBQWpCLENBQWpDLENBQVA7QUFDSCIsImZpbGUiOiJBcHBsaWNhdGlvbk1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQge0ZvbGRlcnN9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfSBmcm9tICcuLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XG5pbXBvcnQge0NvbmZpZ01hbmFnZXJ9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XG5pbXBvcnQge0d1aWR9IGZyb20gJy4uL0d1aWQnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHtBcHBsaWNhdGlvbn0gZnJvbSAnLi9BcHBsaWNhdGlvbic7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbmNvbnN0IGFwcGxpY2F0aW9uRmlsZW5hbWUgPSAnYXBwbGljYXRpb24uanNvbic7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEFwcGxpY2F0aW9uTWFuYWdlciwgQm9pbGVyUGxhdGVzTWFuYWdlcj59XG4gKi9cbmNvbnN0IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8QXBwbGljYXRpb25NYW5hZ2VyLCBDb25maWdNYW5hZ2VyPn1cbiAqL1xuY29uc3QgX2NvbmZpZ01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxBcHBsaWNhdGlvbk1hbmFnZXIsIEZvbGRlcnM+fVxuICovXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEFwcGxpY2F0aW9uTWFuYWdlciwgZnM+fVxuICovXG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbWFuYWdlciBmb3IgYXBwbGljYXRpb25zXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbk1hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0FwcGxpY2F0aW9uTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlc01hbmFnZXJ9IGJvaWxlclBsYXRlc01hbmFnZXJcbiAgICAgKiBAcGFyYW0ge0NvbmZpZ01hbmFnZXJ9IGNvbmZpZ01hbmFnZXJcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnMgXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihib2lsZXJQbGF0ZXNNYW5hZ2VyLCBjb25maWdNYW5hZ2VyLCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIGJvaWxlclBsYXRlc01hbmFnZXIpO1xuICAgICAgICBfY29uZmlnTWFuYWdlci5zZXQodGhpcywgY29uZmlnTWFuYWdlcik7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGFwcGxpY2F0aW9uXG4gICAgICogQHBhcmFtIHt7bmFtZTogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nfX0gY29udGV4dFxuICAgICAqL1xuICAgIGNyZWF0ZShjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyBhcHBsaWNhdGlvbiB3aXRoIG5hbWUgJyR7Y29udGV4dC5uYW1lfSdgKTtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlUeXBlKCdhcHBsaWNhdGlvbicpWzBdO1xuICAgICAgICBsZXQgdGVtcGxhdGVDb250ZXh0ID0ge1xuICAgICAgICAgICAgaWQ6IEd1aWQuY3JlYXRlKCksXG4gICAgICAgICAgICBuYW1lOiBjb250ZXh0Lm5hbWVcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVJbnN0YW5jZShib2lsZXJQbGF0ZSwgY29udGV4dC5kZXN0aW5hdGlvbiwgdGVtcGxhdGVDb250ZXh0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYXBwbGljYXRpb24gY29uZmlndXJhdGlvbiBmcm9tIHRoZSBnaXZlbiBmb2xkZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIHBhdGggXG4gICAgICogQHBhcmFtIHtBcHBsaWNhdGlvbiB8IG51bGx9IGFwcGxpY2F0aW9uIGNvbmZpZyBvciBudWxsIGlmIG5vdCBmb3VuZFxuICAgICAqL1xuICAgIGdldEFwcGxpY2F0aW9uRnJvbShmb2xkZXIpIHtcbiAgICAgICAgaWYgKCEgdGhpcy5oYXNBcHBsaWNhdGlvbihmb2xkZXIpKSBcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgYXBwbGljYXRpb25PYmogPSBKU09OLnBhcnNlKF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGZvbGRlciwgYXBwbGljYXRpb25GaWxlbmFtZSksICd1dGY4JykpO1xuICAgICAgICByZXR1cm4gbmV3IEFwcGxpY2F0aW9uKGFwcGxpY2F0aW9uT2JqLmlkLCBhcHBsaWNhdGlvbk9iai5uYW1lKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYW4gYXBwbGljYXRpb24gaGFzIGJlZW4gc2V0dXAgaW4gdGhlIGdpdmVuIGZvbGRlci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIHBhdGhcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gd2hldGhlciBvciBub3QgdGhlIGFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb24gaXMgc2V0IHVwXG4gICAgICovXG4gICAgaGFzQXBwbGljYXRpb24oZm9sZGVyKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmV4aXN0c1N5bmMocGF0aC5qb2luKGZvbGRlcixhcHBsaWNhdGlvbkZpbGVuYW1lKSk7XG4gICAgfVxufSJdfQ==