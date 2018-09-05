'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicationManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*---------------------------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) Dolittle. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *--------------------------------------------------------------------------------------------*/


var _Folders = require('../Folders');

var _winston = require('winston');

var _ConfigManager = require('../configuration/ConfigManager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _folders = new WeakMap();
var _configManager = new WeakMap();

/**
 * Represents a manager for applications
 */

var ApplicationManager = exports.ApplicationManager = function () {

  /**
   * Initializes a new instance of {ApplicationManager}
   * @param {Folders} folders 
   * @param {ConfigManager} configManager
   * @param {Logger} logger
   */
  function ApplicationManager(folders, configManager, logger) {
    _classCallCheck(this, ApplicationManager);

    _folders.set(this, folders);
    _configManager.set(this, configManager);
    this._logger = logger;
  }

  /**
   * Create an application
   * @param {string} name 
   */


  _createClass(ApplicationManager, [{
    key: 'create',
    value: function create(name) {
      this._logger.info('Creating application with name \'' + name + '\'');
    }
  }]);

  return ApplicationManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9jb25maWdNYW5hZ2VyIiwiQXBwbGljYXRpb25NYW5hZ2VyIiwiZm9sZGVycyIsImNvbmZpZ01hbmFnZXIiLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwibmFtZSIsImluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7cWpCQUFBOzs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU1BLFdBQVcsSUFBSUMsT0FBSixFQUFqQjtBQUNBLElBQU1DLGlCQUFpQixJQUFJRCxPQUFKLEVBQXZCOztBQUdBOzs7O0lBR2FFLGtCLFdBQUFBLGtCOztBQUVUOzs7Ozs7QUFNQSw4QkFBWUMsT0FBWixFQUFxQkMsYUFBckIsRUFBb0NDLE1BQXBDLEVBQTRDO0FBQUE7O0FBQ3hDTixhQUFTTyxHQUFULENBQWEsSUFBYixFQUFtQkgsT0FBbkI7QUFDQUYsbUJBQWVLLEdBQWYsQ0FBbUIsSUFBbkIsRUFBeUJGLGFBQXpCO0FBQ0EsU0FBS0csT0FBTCxHQUFlRixNQUFmO0FBQ0g7O0FBRUQ7Ozs7Ozs7OzJCQUlPRyxJLEVBQU07QUFDVCxXQUFLRCxPQUFMLENBQWFFLElBQWIsdUNBQXFERCxJQUFyRDtBQUdIIiwiZmlsZSI6IkFwcGxpY2F0aW9uTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCB7wqBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCB7wqBDb25maWdNYW5hZ2VyIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbi9Db25maWdNYW5hZ2VyJztcblxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2NvbmZpZ01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIG1hbmFnZXIgZm9yIGFwcGxpY2F0aW9uc1xuICovXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb25NYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzIFxuICAgICAqIEBwYXJhbSB7Q29uZmlnTWFuYWdlcn0gY29uZmlnTWFuYWdlclxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihmb2xkZXJzLCBjb25maWdNYW5hZ2VyLCBsb2dnZXIpIHtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfY29uZmlnTWFuYWdlci5zZXQodGhpcywgY29uZmlnTWFuYWdlcik7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gYXBwbGljYXRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKi9cbiAgICBjcmVhdGUobmFtZSkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgYXBwbGljYXRpb24gd2l0aCBuYW1lICcke25hbWV9J2ApO1xuICAgICAgICBcblxuICAgIH1cbn0iXX0=