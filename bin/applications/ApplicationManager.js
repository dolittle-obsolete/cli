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

var _BoilerPlatesManager = require('../boilerPlates/BoilerPlatesManager');

var _ConfigManager = require('../configuration/ConfigManager');

var _Guid = require('../Guid');

var _Application = require('./Application');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    _classCallCheck(this, ApplicationManager);

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


  _createClass(ApplicationManager, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImFwcGxpY2F0aW9uRmlsZW5hbWUiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfY29uZmlnTWFuYWdlciIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJBcHBsaWNhdGlvbk1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiY29uZmlnTWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsIm5hbWUiLCJpbmZvIiwiYm9pbGVyUGxhdGUiLCJnZXQiLCJib2lsZXJQbGF0ZXNCeVR5cGUiLCJjb250ZXh0IiwiaWQiLCJHdWlkIiwiY3JlYXRlIiwiZGVzdGluYXRpb24iLCJwcm9jZXNzIiwiY3dkIiwiY3JlYXRlSW5zdGFuY2UiLCJleGlzdHNTeW5jIiwicGF0aCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7cWpCQUFBOzs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLHNCQUFzQixrQkFBNUI7O0FBRUEsSUFBTUMsdUJBQXVCLElBQUlDLE9BQUosRUFBN0I7QUFDQSxJQUFNQyxpQkFBaUIsSUFBSUQsT0FBSixFQUF2QjtBQUNBLElBQU1FLFdBQVcsSUFBSUYsT0FBSixFQUFqQjtBQUNBLElBQU1HLGNBQWMsSUFBSUgsT0FBSixFQUFwQjs7QUFHQTs7OztJQUdhSSxrQixXQUFBQSxrQjs7QUFFVDs7Ozs7Ozs7QUFRQSw4QkFBWUMsbUJBQVosRUFBaUNDLGFBQWpDLEVBQWdEQyxPQUFoRCxFQUF5REMsVUFBekQsRUFBcUVDLE1BQXJFLEVBQTZFO0FBQUE7O0FBQ3pFVix5QkFBcUJXLEdBQXJCLENBQXlCLElBQXpCLEVBQStCTCxtQkFBL0I7QUFDQUosbUJBQWVTLEdBQWYsQ0FBbUIsSUFBbkIsRUFBeUJKLGFBQXpCO0FBQ0FKLGFBQVNRLEdBQVQsQ0FBYSxJQUFiLEVBQW1CSCxPQUFuQjtBQUNBSixnQkFBWU8sR0FBWixDQUFnQixJQUFoQixFQUFzQkYsVUFBdEI7QUFDQSxTQUFLRyxPQUFMLEdBQWVGLE1BQWY7QUFDSDs7QUFFRDs7Ozs7Ozs7MkJBSU9HLEksRUFBTTtBQUNULFdBQUtELE9BQUwsQ0FBYUUsSUFBYix1Q0FBcURELElBQXJEOztBQUVBLFVBQUlFLGNBQWNmLHFCQUFxQmdCLEdBQXJCLENBQXlCLElBQXpCLEVBQStCQyxrQkFBL0IsQ0FBa0QsYUFBbEQsRUFBaUUsQ0FBakUsQ0FBbEI7QUFDQSxVQUFJQyxVQUFVO0FBQ1ZDLFlBQUlDLFdBQUtDLE1BQUwsRUFETTtBQUVWUixjQUFNQTtBQUZJLE9BQWQ7QUFJQSxVQUFJUyxjQUFjQyxRQUFRQyxHQUFSLEVBQWxCOztBQUVBeEIsMkJBQXFCZ0IsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JTLGNBQS9CLENBQThDVixXQUE5QyxFQUEyRE8sV0FBM0QsRUFBd0VKLE9BQXhFO0FBQ0g7O0FBRUQ7Ozs7OztxQ0FHaUI7QUFDYixhQUFPZCxZQUFZWSxHQUFaLENBQWdCLElBQWhCLEVBQXNCVSxVQUF0QixDQUFpQ0MsZUFBS0MsSUFBTCxDQUFVTCxRQUFRQyxHQUFSLEVBQVYsRUFBd0J6QixtQkFBeEIsQ0FBakMsQ0FBUDtBQUNIIiwiZmlsZSI6IkFwcGxpY2F0aW9uTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCB7wqBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCB7wqBCb2lsZXJQbGF0ZXNNYW5hZ2VyfSBmcm9tICcuLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XG5pbXBvcnQge8KgQ29uZmlnTWFuYWdlciB9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XG5pbXBvcnQgeyBHdWlkIH0gZnJvbSAnLi4vR3VpZCc7XG5pbXBvcnQge8KgQXBwbGljYXRpb24gfSBmcm9tICcuL0FwcGxpY2F0aW9uJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuY29uc3QgYXBwbGljYXRpb25GaWxlbmFtZSA9IFwiYXBwbGljYXRpb24uanNvblwiO1xuXG5jb25zdCBfYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbWFuYWdlciBmb3IgYXBwbGljYXRpb25zXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbk1hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0FwcGxpY2F0aW9uTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlc01hbmFnZXJ9IGJvaWxlclBsYXRlc01hbmFnZXJcbiAgICAgKiBAcGFyYW0ge0NvbmZpZ01hbmFnZXJ9IGNvbmZpZ01hbmFnZXJcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnMgXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihib2lsZXJQbGF0ZXNNYW5hZ2VyLCBjb25maWdNYW5hZ2VyLCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIGJvaWxlclBsYXRlc01hbmFnZXIpO1xuICAgICAgICBfY29uZmlnTWFuYWdlci5zZXQodGhpcywgY29uZmlnTWFuYWdlcik7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGFwcGxpY2F0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICovXG4gICAgY3JlYXRlKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGFwcGxpY2F0aW9uIHdpdGggbmFtZSAnJHtuYW1lfSdgKTtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlUeXBlKFwiYXBwbGljYXRpb25cIilbMF07XG4gICAgICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICAgICAgaWQ6IEd1aWQuY3JlYXRlKCksXG4gICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH07XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICAgIFxuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlSW5zdGFuY2UoYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBhbiBhcHBsaWNhdGlvbiBoYXMgYmVlbiBzZXR1cFxuICAgICAqL1xuICAgIGhhc0FwcGxpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmV4aXN0c1N5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksYXBwbGljYXRpb25GaWxlbmFtZSkpO1xuICAgIH1cbn0iXX0=