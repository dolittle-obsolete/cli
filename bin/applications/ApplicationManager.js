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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImFwcGxpY2F0aW9uRmlsZW5hbWUiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfY29uZmlnTWFuYWdlciIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJBcHBsaWNhdGlvbk1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiY29uZmlnTWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsImNvbnRleHQiLCJpbmZvIiwibmFtZSIsImJvaWxlclBsYXRlIiwiZ2V0IiwiYm9pbGVyUGxhdGVzQnlUeXBlIiwidGVtcGxhdGVDb250ZXh0IiwiaWQiLCJHdWlkIiwiY3JlYXRlIiwiY3JlYXRlSW5zdGFuY2UiLCJkZXN0aW5hdGlvbiIsImZvbGRlciIsImhhc0FwcGxpY2F0aW9uIiwiYXBwbGljYXRpb25PYmoiLCJKU09OIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJwYXRoIiwiam9pbiIsIkFwcGxpY2F0aW9uIiwiZXhpc3RzU3luYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBTUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBZEE7Ozs7O0FBS0E7QUFXQSxJQUFNQSxzQkFBc0Isa0JBQTVCO0FBQ0E7OztBQUdBLElBQU1DLHVCQUF1QixJQUFJQyxPQUFKLEVBQTdCO0FBQ0E7OztBQUdBLElBQU1DLGlCQUFpQixJQUFJRCxPQUFKLEVBQXZCO0FBQ0E7OztBQUdBLElBQU1FLFdBQVcsSUFBSUYsT0FBSixFQUFqQjtBQUNBOzs7QUFHQSxJQUFNRyxjQUFjLElBQUlILE9BQUosRUFBcEI7O0FBR0E7Ozs7SUFHYUksa0IsV0FBQUEsa0I7O0FBRVQ7Ozs7Ozs7O0FBUUEsOEJBQVlDLG1CQUFaLEVBQWlDQyxhQUFqQyxFQUFnREMsT0FBaEQsRUFBeURDLFVBQXpELEVBQXFFQyxNQUFyRSxFQUE2RTtBQUFBOztBQUN6RVYseUJBQXFCVyxHQUFyQixDQUF5QixJQUF6QixFQUErQkwsbUJBQS9CO0FBQ0FKLG1CQUFlUyxHQUFmLENBQW1CLElBQW5CLEVBQXlCSixhQUF6QjtBQUNBSixhQUFTUSxHQUFULENBQWEsSUFBYixFQUFtQkgsT0FBbkI7QUFDQUosZ0JBQVlPLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JGLFVBQXRCO0FBQ0EsU0FBS0csT0FBTCxHQUFlRixNQUFmO0FBQ0g7O0FBRUQ7Ozs7Ozs7OzJCQUlPRyxPLEVBQVM7QUFDWixXQUFLRCxPQUFMLENBQWFFLElBQWIsdUNBQXFERCxRQUFRRSxJQUE3RDs7QUFFQSxVQUFJQyxjQUFjaEIscUJBQXFCaUIsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JDLGtCQUEvQixDQUFrRCxhQUFsRCxFQUFpRSxDQUFqRSxDQUFsQjtBQUNBLFVBQUlDLGtCQUFrQjtBQUNsQkMsWUFBSUMsV0FBS0MsTUFBTCxFQURjO0FBRWxCUCxjQUFNRixRQUFRRTtBQUZJLE9BQXRCOztBQUtBZiwyQkFBcUJpQixHQUFyQixDQUF5QixJQUF6QixFQUErQk0sY0FBL0IsQ0FBOENQLFdBQTlDLEVBQTJESCxRQUFRVyxXQUFuRSxFQUFnRkwsZUFBaEY7QUFDSDtBQUNEOzs7Ozs7Ozt1Q0FLbUJNLE0sRUFBUTtBQUN2QixVQUFJLENBQUUsS0FBS0MsY0FBTCxDQUFvQkQsTUFBcEIsQ0FBTixFQUNJLE9BQU8sSUFBUDtBQUNKLFVBQUlFLGlCQUFpQkMsS0FBS0MsS0FBTCxDQUFXekIsWUFBWWEsR0FBWixDQUFnQixJQUFoQixFQUFzQmEsWUFBdEIsQ0FBbUNDLGVBQUtDLElBQUwsQ0FBVVAsTUFBVixFQUFrQjFCLG1CQUFsQixDQUFuQyxFQUEyRSxNQUEzRSxDQUFYLENBQXJCO0FBQ0EsYUFBTyxJQUFJa0Msd0JBQUosQ0FBZ0JOLGVBQWVQLEVBQS9CLEVBQW1DTyxlQUFlWixJQUFsRCxDQUFQO0FBQ0g7QUFDRDs7Ozs7Ozs7bUNBS2VVLE0sRUFBUTs7QUFFbkIsYUFBT3JCLFlBQVlhLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JpQixVQUF0QixDQUFpQ0gsZUFBS0MsSUFBTCxDQUFVUCxNQUFWLEVBQWlCMUIsbUJBQWpCLENBQWpDLENBQVA7QUFDSCIsImZpbGUiOiJBcHBsaWNhdGlvbk1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5pbXBvcnQge0ZvbGRlcnN9IGZyb20gJy4uL0ZvbGRlcnMnO1xyXG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnd2luc3Rvbic7XHJcbmltcG9ydCB7Qm9pbGVyUGxhdGVzTWFuYWdlcn0gZnJvbSAnLi4vYm9pbGVyUGxhdGVzL0JvaWxlclBsYXRlc01hbmFnZXInO1xyXG5pbXBvcnQge0NvbmZpZ01hbmFnZXJ9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XHJcbmltcG9ydCB7R3VpZH0gZnJvbSAnLi4vR3VpZCc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xyXG5pbXBvcnQge0FwcGxpY2F0aW9ufSBmcm9tICcuL0FwcGxpY2F0aW9uJztcclxuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5cclxuY29uc3QgYXBwbGljYXRpb25GaWxlbmFtZSA9ICdhcHBsaWNhdGlvbi5qc29uJztcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPEFwcGxpY2F0aW9uTWFuYWdlciwgQm9pbGVyUGxhdGVzTWFuYWdlcj59XHJcbiAqL1xyXG5jb25zdCBfYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XHJcbi8qKlxyXG4gKiBAdHlwZSB7V2Vha01hcDxBcHBsaWNhdGlvbk1hbmFnZXIsIENvbmZpZ01hbmFnZXI+fVxyXG4gKi9cclxuY29uc3QgX2NvbmZpZ01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xyXG4vKipcclxuICogQHR5cGUge1dlYWtNYXA8QXBwbGljYXRpb25NYW5hZ2VyLCBGb2xkZXJzPn1cclxuICovXHJcbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPEFwcGxpY2F0aW9uTWFuYWdlciwgZnM+fVxyXG4gKi9cclxuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgbWFuYWdlciBmb3IgYXBwbGljYXRpb25zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb25NYW5hZ2VyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XHJcbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlc01hbmFnZXJ9IGJvaWxlclBsYXRlc01hbmFnZXJcclxuICAgICAqIEBwYXJhbSB7Q29uZmlnTWFuYWdlcn0gY29uZmlnTWFuYWdlclxyXG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzIFxyXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxyXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihib2lsZXJQbGF0ZXNNYW5hZ2VyLCBjb25maWdNYW5hZ2VyLCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcclxuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5zZXQodGhpcywgYm9pbGVyUGxhdGVzTWFuYWdlcik7XHJcbiAgICAgICAgX2NvbmZpZ01hbmFnZXIuc2V0KHRoaXMsIGNvbmZpZ01hbmFnZXIpO1xyXG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcclxuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XHJcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGFuIGFwcGxpY2F0aW9uXHJcbiAgICAgKiBAcGFyYW0ge3tuYW1lOiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmd9fSBjb250ZXh0XHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZShjb250ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGFwcGxpY2F0aW9uIHdpdGggbmFtZSAnJHtjb250ZXh0Lm5hbWV9J2ApO1xyXG5cclxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlUeXBlKCdhcHBsaWNhdGlvbicpWzBdO1xyXG4gICAgICAgIGxldCB0ZW1wbGF0ZUNvbnRleHQgPSB7XHJcbiAgICAgICAgICAgIGlkOiBHdWlkLmNyZWF0ZSgpLFxyXG4gICAgICAgICAgICBuYW1lOiBjb250ZXh0Lm5hbWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVJbnN0YW5jZShib2lsZXJQbGF0ZSwgY29udGV4dC5kZXN0aW5hdGlvbiwgdGVtcGxhdGVDb250ZXh0KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgYXBwbGljYXRpb24gY29uZmlndXJhdGlvbiBmcm9tIHRoZSBnaXZlbiBmb2xkZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb2xkZXIgcGF0aCBcclxuICAgICAqIEBwYXJhbSB7QXBwbGljYXRpb24gfCBudWxsfSBhcHBsaWNhdGlvbiBjb25maWcgb3IgbnVsbCBpZiBub3QgZm91bmRcclxuICAgICAqL1xyXG4gICAgZ2V0QXBwbGljYXRpb25Gcm9tKGZvbGRlcikge1xyXG4gICAgICAgIGlmICghIHRoaXMuaGFzQXBwbGljYXRpb24oZm9sZGVyKSkgXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIGxldCBhcHBsaWNhdGlvbk9iaiA9IEpTT04ucGFyc2UoX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oZm9sZGVyLCBhcHBsaWNhdGlvbkZpbGVuYW1lKSwgJ3V0ZjgnKSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBBcHBsaWNhdGlvbihhcHBsaWNhdGlvbk9iai5pZCwgYXBwbGljYXRpb25PYmoubmFtZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIGFuIGFwcGxpY2F0aW9uIGhhcyBiZWVuIHNldHVwIGluIHRoZSBnaXZlbiBmb2xkZXIuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9sZGVyIHBhdGhcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB3aGV0aGVyIG9yIG5vdCB0aGUgYXBwbGljYXRpb24gY29uZmlndXJhdGlvbiBpcyBzZXQgdXBcclxuICAgICAqL1xyXG4gICAgaGFzQXBwbGljYXRpb24oZm9sZGVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIF9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKHBhdGguam9pbihmb2xkZXIsYXBwbGljYXRpb25GaWxlbmFtZSkpO1xyXG4gICAgfVxyXG59Il19