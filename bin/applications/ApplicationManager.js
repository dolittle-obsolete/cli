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

var _Application = require('./Application');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var applicationFilename = "application.json";

var _boilerPlatesManager = new WeakMap();
var _configManager = new WeakMap();
var _folders = new WeakMap();
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
     * Check if an application has been setup
     */

  }, {
    key: 'hasApplication',
    value: function hasApplication() {
      return _fileSystem.get(this).existsSync(_path2.default.join(process.cwd(), applicationFilename));
    }
  }]);
  return ApplicationManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImFwcGxpY2F0aW9uRmlsZW5hbWUiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfY29uZmlnTWFuYWdlciIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJBcHBsaWNhdGlvbk1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiY29uZmlnTWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsIm5hbWUiLCJpbmZvIiwiYm9pbGVyUGxhdGUiLCJnZXQiLCJib2lsZXJQbGF0ZXNCeVR5cGUiLCJjb250ZXh0IiwiaWQiLCJHdWlkIiwiY3JlYXRlIiwiZGVzdGluYXRpb24iLCJwcm9jZXNzIiwiY3dkIiwiY3JlYXRlSW5zdGFuY2UiLCJleGlzdHNTeW5jIiwicGF0aCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQVhBOzs7O0FBYUEsSUFBTUEsc0JBQXNCLGtCQUE1Qjs7QUFFQSxJQUFNQyx1QkFBdUIsSUFBSUMsT0FBSixFQUE3QjtBQUNBLElBQU1DLGlCQUFpQixJQUFJRCxPQUFKLEVBQXZCO0FBQ0EsSUFBTUUsV0FBVyxJQUFJRixPQUFKLEVBQWpCO0FBQ0EsSUFBTUcsY0FBYyxJQUFJSCxPQUFKLEVBQXBCOztBQUdBOzs7O0lBR2FJLGtCLFdBQUFBLGtCOztBQUVUOzs7Ozs7OztBQVFBLDhCQUFZQyxtQkFBWixFQUFpQ0MsYUFBakMsRUFBZ0RDLE9BQWhELEVBQXlEQyxVQUF6RCxFQUFxRUMsTUFBckUsRUFBNkU7QUFBQTs7QUFDekVWLHlCQUFxQlcsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JMLG1CQUEvQjtBQUNBSixtQkFBZVMsR0FBZixDQUFtQixJQUFuQixFQUF5QkosYUFBekI7QUFDQUosYUFBU1EsR0FBVCxDQUFhLElBQWIsRUFBbUJILE9BQW5CO0FBQ0FKLGdCQUFZTyxHQUFaLENBQWdCLElBQWhCLEVBQXNCRixVQUF0QjtBQUNBLFNBQUtHLE9BQUwsR0FBZUYsTUFBZjtBQUNIOztBQUVEOzs7Ozs7OzsyQkFJT0csSSxFQUFNO0FBQ1QsV0FBS0QsT0FBTCxDQUFhRSxJQUFiLHVDQUFxREQsSUFBckQ7O0FBRUEsVUFBSUUsY0FBY2YscUJBQXFCZ0IsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JDLGtCQUEvQixDQUFrRCxhQUFsRCxFQUFpRSxDQUFqRSxDQUFsQjtBQUNBLFVBQUlDLFVBQVU7QUFDVkMsWUFBSUMsV0FBS0MsTUFBTCxFQURNO0FBRVZSLGNBQU1BO0FBRkksT0FBZDtBQUlBLFVBQUlTLGNBQWNDLFFBQVFDLEdBQVIsRUFBbEI7O0FBRUF4QiwyQkFBcUJnQixHQUFyQixDQUF5QixJQUF6QixFQUErQlMsY0FBL0IsQ0FBOENWLFdBQTlDLEVBQTJETyxXQUEzRCxFQUF3RUosT0FBeEU7QUFDSDs7QUFFRDs7Ozs7O3FDQUdpQjtBQUNiLGFBQU9kLFlBQVlZLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JVLFVBQXRCLENBQWlDQyxlQUFLQyxJQUFMLENBQVVMLFFBQVFDLEdBQVIsRUFBVixFQUF3QnpCLG1CQUF4QixDQUFqQyxDQUFQO0FBQ0giLCJmaWxlIjoiQXBwbGljYXRpb25NYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IHvCoExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHvCoEJvaWxlclBsYXRlc01hbmFnZXJ9IGZyb20gJy4uL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCB7wqBDb25maWdNYW5hZ2VyIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbi9Db25maWdNYW5hZ2VyJztcbmltcG9ydCB7IEd1aWQgfSBmcm9tICcuLi9HdWlkJztcbmltcG9ydCB7wqBBcHBsaWNhdGlvbiB9IGZyb20gJy4vQXBwbGljYXRpb24nO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBhcHBsaWNhdGlvbkZpbGVuYW1lID0gXCJhcHBsaWNhdGlvbi5qc29uXCI7XG5cbmNvbnN0IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9jb25maWdNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBtYW5hZ2VyIGZvciBhcHBsaWNhdGlvbnNcbiAqL1xuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7QXBwbGljYXRpb25NYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGVzTWFuYWdlcn0gYm9pbGVyUGxhdGVzTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Q29uZmlnTWFuYWdlcn0gY29uZmlnTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVycyBcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGJvaWxlclBsYXRlc01hbmFnZXIsIGNvbmZpZ01hbmFnZXIsIGZvbGRlcnMsIGZpbGVTeXN0ZW0sIGxvZ2dlcikge1xuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5zZXQodGhpcywgYm9pbGVyUGxhdGVzTWFuYWdlcik7XG4gICAgICAgIF9jb25maWdNYW5hZ2VyLnNldCh0aGlzLCBjb25maWdNYW5hZ2VyKTtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gYXBwbGljYXRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKi9cbiAgICBjcmVhdGUobmFtZSkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgYXBwbGljYXRpb24gd2l0aCBuYW1lICcke25hbWV9J2ApO1xuXG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5ib2lsZXJQbGF0ZXNCeVR5cGUoXCJhcHBsaWNhdGlvblwiKVswXTtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB7XG4gICAgICAgICAgICBpZDogR3VpZC5jcmVhdGUoKSxcbiAgICAgICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgXG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVJbnN0YW5jZShib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGFuIGFwcGxpY2F0aW9uIGhhcyBiZWVuIHNldHVwXG4gICAgICovXG4gICAgaGFzQXBwbGljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSxhcHBsaWNhdGlvbkZpbGVuYW1lKSk7XG4gICAgfVxufSJdfQ==