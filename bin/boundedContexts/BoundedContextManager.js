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
        this._logger.error('Missing application - use \'dolittle create application [name]\' for a new application');
        return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9ib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiV2Vha01hcCIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiQk9VTkRFRF9DT05URVhUX0ZJTEVfTkFNRSIsIkJvdW5kZWRDb250ZXh0TWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIl9sb2dnZXIiLCJjb250ZXh0IiwiaW5mbyIsIm5hbWUiLCJhcHBsaWNhdGlvbiIsImdldCIsImdldEFwcGxpY2F0aW9uRnJvbSIsImRlc3RpbmF0aW9uIiwiZXJyb3IiLCJib2lsZXJQbGF0ZSIsImJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlIiwiYm91bmRlZENvbnRleHRQYXRoIiwicGF0aCIsImpvaW4iLCJtYWtlRm9sZGVySWZOb3RFeGlzdHMiLCJ0ZW1wbGF0ZUNvbnRleHQiLCJpZCIsIkd1aWQiLCJjcmVhdGUiLCJhcHBsaWNhdGlvbklkIiwiY3JlYXRlSW5zdGFuY2UiLCJzdGFydFBhdGgiLCJib3VuZGVkQ29udGV4dENvbmZpZ1BhdGgiLCJnZXROZWFyZXN0Qm91bmRlZENvbnRleHRQYXRoIiwiYm91bmRlZENvbnRleHRPYmoiLCJKU09OIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJib3VuZGVkQ29udGV4dCIsIkJvdW5kZWRDb250ZXh0IiwiYm91bmRlZENvbnRleHROYW1lIiwiY29yZSIsImludGVyYWN0aW9uIiwicmVnIiwiUmVnRXhwIiwiZ2V0TmVhcmVzdEZpbGVTZWFyY2hpbmdVcHdhcmRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFNQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7O0FBaEJBOzs7OztBQUtBO0FBY0EsSUFBTUEsdUJBQXVCLElBQUlDLE9BQUosRUFBN0I7QUFDQTs7O0FBR0EsSUFBTUMsc0JBQXNCLElBQUlELE9BQUosRUFBNUI7QUFDQTs7O0FBR0EsSUFBTUUsV0FBVyxJQUFJRixPQUFKLEVBQWpCO0FBQ0E7OztBQUdBLElBQU1HLGNBQWMsSUFBSUgsT0FBSixFQUFwQjs7QUFFQSxJQUFNSSw0QkFBNEIsc0JBQWxDO0FBQ0E7Ozs7SUFHYUMscUIsV0FBQUEscUI7O0FBRVQ7Ozs7Ozs7O0FBUUEsaUNBQVlDLG1CQUFaLEVBQWlDQyxrQkFBakMsRUFBcURDLE9BQXJELEVBQThEQyxVQUE5RCxFQUEwRUMsTUFBMUUsRUFBa0Y7QUFBQTs7QUFDOUVYLHlCQUFxQlksR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JMLG1CQUEvQjtBQUNBTCx3QkFBb0JVLEdBQXBCLENBQXdCLElBQXhCLEVBQThCSixrQkFBOUI7QUFDQUwsYUFBU1MsR0FBVCxDQUFhLElBQWIsRUFBbUJILE9BQW5CO0FBQ0FMLGdCQUFZUSxHQUFaLENBQWdCLElBQWhCLEVBQXNCRixVQUF0QjtBQUNBLFNBQUtHLE9BQUwsR0FBZUYsTUFBZjtBQUNIOztBQUVEOzs7Ozs7OzsyQkFJT0csTyxFQUFTO0FBQ1osV0FBS0QsT0FBTCxDQUFhRSxJQUFiLDJDQUF5REQsUUFBUUUsSUFBakU7O0FBRUEsVUFBSUMsY0FBY2Ysb0JBQW9CZ0IsR0FBcEIsQ0FBd0IsSUFBeEIsRUFBOEJDLGtCQUE5QixDQUFpREwsUUFBUU0sV0FBekQsQ0FBbEI7O0FBRUEsVUFBSUgsZ0JBQWdCLElBQXBCLEVBQTJCO0FBQ3ZCLGFBQUtKLE9BQUwsQ0FBYVEsS0FBYixDQUFtQix3RkFBbkI7QUFDQTtBQUNIOztBQUVELFVBQUlDLGNBQWN0QixxQkFBcUJrQixHQUFyQixDQUF5QixJQUF6QixFQUErQkssNkJBQS9CLENBQTZELFFBQTdELEVBQXVFLGdCQUF2RSxFQUF5RixDQUF6RixDQUFsQjs7QUFFQSxVQUFJQyxxQkFBcUJDLGVBQUtDLElBQUwsQ0FBVVosUUFBUU0sV0FBbEIsRUFBK0JOLFFBQVFFLElBQXZDLENBQXpCOztBQUVBYixlQUFTZSxHQUFULENBQWEsSUFBYixFQUFtQlMscUJBQW5CLENBQXlDSCxrQkFBekM7QUFDQSxVQUFJSSxrQkFBa0I7QUFDbEJDLFlBQUlDLFdBQUtDLE1BQUwsRUFEYztBQUVsQmYsY0FBTUYsUUFBUUUsSUFGSTtBQUdsQmdCLHVCQUFlZixZQUFZWTtBQUhULE9BQXRCO0FBS0E3QiwyQkFBcUJrQixHQUFyQixDQUF5QixJQUF6QixFQUErQmUsY0FBL0IsQ0FBOENYLFdBQTlDLEVBQTJERSxrQkFBM0QsRUFBK0VJLGVBQS9FO0FBQ0g7QUFDRDs7Ozs7Ozs7bURBSytCTSxTLEVBQVc7QUFDdEMsVUFBTUMsMkJBQTJCLEtBQUtDLDRCQUFMLENBQWtDRixTQUFsQyxDQUFqQztBQUNBLFVBQUlDLDZCQUE2QixFQUFqQyxFQUFxQztBQUNqQyxhQUFLdEIsT0FBTCxDQUFhUSxLQUFiLENBQXNCaEIseUJBQXRCO0FBQ0EsY0FBTSx5Q0FBTjtBQUNIO0FBQ0QsV0FBS1EsT0FBTCxDQUFhRSxJQUFiLG9EQUFrRW9CLHdCQUFsRTs7QUFFQSxVQUFJRSxvQkFBb0JDLEtBQUtDLEtBQUwsQ0FBV25DLFlBQVljLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JzQixZQUF0QixDQUFtQ0wsd0JBQW5DLEVBQTZELE1BQTdELENBQVgsQ0FBeEI7QUFDQSxVQUFJTSxpQkFBaUIsSUFBSUMsOEJBQUosQ0FBbUJMLGtCQUFrQnBCLFdBQXJDLEVBQWtEb0Isa0JBQWtCSSxjQUFwRSxFQUFvRkosa0JBQWtCTSxrQkFBdEcsRUFDakJOLGtCQUFrQk8sSUFERCxFQUNPUCxrQkFBa0JRLFdBRHpCLENBQXJCOztBQUdBLGFBQU9KLGNBQVA7QUFDSDtBQUNEOzs7Ozs7OztpREFLNkJQLFMsRUFBVztBQUNwQyxVQUFJWSxNQUFPLElBQUlDLE1BQUosQ0FBVyxRQUFNMUMseUJBQU4sR0FBZ0MsS0FBM0MsQ0FBWDtBQUNBLGFBQU9GLFNBQVNlLEdBQVQsQ0FBYSxJQUFiLEVBQW1COEIsOEJBQW5CLENBQWtEZCxTQUFsRCxFQUE2RFksR0FBN0QsQ0FBUDtBQUNIIiwiZmlsZSI6IkJvdW5kZWRDb250ZXh0TWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbmltcG9ydCB7IEJvaWxlclBsYXRlc01hbmFnZXIgfSBmcm9tICcuLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XHJcbmltcG9ydCB7IEd1aWQgfWZyb20gJy4uL0d1aWQnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvbk1hbmFnZXIgfSBmcm9tICcuLi9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyJztcclxuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJ3dpbnN0b24nO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcclxuaW1wb3J0IHsgQm91bmRlZENvbnRleHQgfSBmcm9tICcuL0JvdW5kZWRDb250ZXh0JztcclxuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xyXG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXHJcblxyXG4vKipcclxuICogQHR5cGUge1dlYWtNYXA8Qm91bmRlZENvbnRleHRNYW5hZ2VyLCBCb2lsZXJQbGF0ZXNNYW5hZ2VyPn1cclxuICovXHJcbmNvbnN0IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPEJvdW5kZWRDb250ZXh0TWFuYWdlciwgQXBwbGljYXRpb25NYW5hZ2VyPn1cclxuICovXHJcbmNvbnN0IF9hcHBsaWNhdGlvbk1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xyXG4vKipcclxuICogQHR5cGUge1dlYWtNYXA8Qm91bmRlZENvbnRleHRNYW5hZ2VyLCBGb2xkZXJzPn1cclxuICovXHJcbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPEJvdW5kZWRDb250ZXh0TWFuYWdlciwgZnM+fVxyXG4gKi9cclxuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuY29uc3QgQk9VTkRFRF9DT05URVhUX0ZJTEVfTkFNRSA9ICdib3VuZGVkLWNvbnRleHQuanNvbic7XHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBtYW5hZ2VyIGZvciBib3VuZGVkIGNvbnRleHRzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQm91bmRlZENvbnRleHRNYW5hZ2VyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtCb3VuZGVkQ29udGV4dE1hbmFnZXJ9XHJcbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlc01hbmFnZXJ9IGJvaWxlclBsYXRlc01hbmFnZXIgXHJcbiAgICAgKiBAcGFyYW0ge0FwcGxpY2F0aW9uTWFuYWdlcn0gYXBwbGljYXRpb25NYW5hZ2VyXHJcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnNcclxuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cclxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYm9pbGVyUGxhdGVzTWFuYWdlciwgYXBwbGljYXRpb25NYW5hZ2VyLCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcclxuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5zZXQodGhpcywgYm9pbGVyUGxhdGVzTWFuYWdlcik7XHJcbiAgICAgICAgX2FwcGxpY2F0aW9uTWFuYWdlci5zZXQodGhpcywgYXBwbGljYXRpb25NYW5hZ2VyKTtcclxuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XHJcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xyXG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBjb21wbGV0ZSBib3VuZGVkIGNvbnRleHQgZnJvbSBib2lsZXJwbGF0ZVxyXG4gICAgICogQHBhcmFtIHt7bmFtZTogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nfX0gY29udGV4dCBvZiB0aGUgYm91bmRlZCBjb250ZXh0IFxyXG4gICAgICovXHJcbiAgICBjcmVhdGUoY29udGV4dCkge1xyXG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyBib3VuZGVkIGNvbnRleHQgd2l0aCBuYW1lICcke2NvbnRleHQubmFtZX0nYCk7XHJcblxyXG4gICAgICAgIGxldCBhcHBsaWNhdGlvbiA9IF9hcHBsaWNhdGlvbk1hbmFnZXIuZ2V0KHRoaXMpLmdldEFwcGxpY2F0aW9uRnJvbShjb250ZXh0LmRlc3RpbmF0aW9uKTtcclxuXHJcbiAgICAgICAgaWYoIGFwcGxpY2F0aW9uID09PSBudWxsICkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoJ01pc3NpbmcgYXBwbGljYXRpb24gLSB1c2UgXFwnZG9saXR0bGUgY3JlYXRlIGFwcGxpY2F0aW9uIFtuYW1lXVxcJyBmb3IgYSBuZXcgYXBwbGljYXRpb24nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKCdjc2hhcnAnLCAnYm91bmRlZENvbnRleHQnKVswXTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYm91bmRlZENvbnRleHRQYXRoID0gcGF0aC5qb2luKGNvbnRleHQuZGVzdGluYXRpb24sIGNvbnRleHQubmFtZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgX2ZvbGRlcnMuZ2V0KHRoaXMpLm1ha2VGb2xkZXJJZk5vdEV4aXN0cyhib3VuZGVkQ29udGV4dFBhdGgpO1xyXG4gICAgICAgIGxldCB0ZW1wbGF0ZUNvbnRleHQgPSB7XHJcbiAgICAgICAgICAgIGlkOiBHdWlkLmNyZWF0ZSgpLFxyXG4gICAgICAgICAgICBuYW1lOiBjb250ZXh0Lm5hbWUsXHJcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uSWQ6IGFwcGxpY2F0aW9uLmlkXHJcbiAgICAgICAgfTtcclxuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlSW5zdGFuY2UoYm9pbGVyUGxhdGUsIGJvdW5kZWRDb250ZXh0UGF0aCwgdGVtcGxhdGVDb250ZXh0KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2VhcmNoZXMgdGhlIGZpbGUgaGllcmFyY2h5IGZvciBib3VuZGVkLWNvbnRleHQuanNvbiBhbmQgcmV0dXJucyB0aGUgQm91bmRlZENvbnRleHRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydFBhdGggdG8gc2VhcmNoIGZyb21cclxuICAgICAqIEByZXR1cm5zIHtCb3VuZGVkQ29udGV4dH0gdGhlIGJvdW5kZWQgY29udGV4dFxyXG4gICAgICovXHJcbiAgICBnZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWcoc3RhcnRQYXRoKSB7XHJcbiAgICAgICAgY29uc3QgYm91bmRlZENvbnRleHRDb25maWdQYXRoID0gdGhpcy5nZXROZWFyZXN0Qm91bmRlZENvbnRleHRQYXRoKHN0YXJ0UGF0aCk7XHJcbiAgICAgICAgaWYgKGJvdW5kZWRDb250ZXh0Q29uZmlnUGF0aCA9PT0gJycpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmVycm9yKGAke0JPVU5ERURfQ09OVEVYVF9GSUxFX05BTUV9IHdhcyBub3QgZm91bmQuIENhbm5vdCBjcmVhdGUgYXJ0aWZhY3RzLiBSdW4gZG9saXR0bGUgY3JlYXRlIGJvdW5kZWRjb250ZXh0IHRvIGNyZWF0ZSBhIG5ldyBib3VuZGVkIGNvbnRleHQgZnJvbSBzY3JhdGNoYCk7XHJcbiAgICAgICAgICAgIHRocm93ICdCb3VuZGVkIGNvbnRleHQgY29uZmlndXJhdGlvbiBub3QgZm91bmQnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgRm91bmQgYm91bmRlZCBjb250ZXh0IGNvbmZpZ3VyYXRpb24gYXQgcGF0aCAnJHtib3VuZGVkQ29udGV4dENvbmZpZ1BhdGh9J2ApO1xyXG5cclxuICAgICAgICBsZXQgYm91bmRlZENvbnRleHRPYmogPSBKU09OLnBhcnNlKF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoYm91bmRlZENvbnRleHRDb25maWdQYXRoLCAndXRmOCcpKTtcclxuICAgICAgICBsZXQgYm91bmRlZENvbnRleHQgPSBuZXcgQm91bmRlZENvbnRleHQoYm91bmRlZENvbnRleHRPYmouYXBwbGljYXRpb24sIGJvdW5kZWRDb250ZXh0T2JqLmJvdW5kZWRDb250ZXh0LCBib3VuZGVkQ29udGV4dE9iai5ib3VuZGVkQ29udGV4dE5hbWUsXHJcbiAgICAgICAgICAgIGJvdW5kZWRDb250ZXh0T2JqLmNvcmUsIGJvdW5kZWRDb250ZXh0T2JqLmludGVyYWN0aW9uKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYm91bmRlZENvbnRleHQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFNlYXJjaGVzIHRoZSBmaWxlIGhpZXJhcmNoeSBmb3IgYm91bmRlZC1jb250ZXh0Lmpzb24gYW5kIHJldHVybnMgdGhlIHBhdGggb2YgdGhlIGZpbGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydFBhdGggdG8gc2VhcmNoIGZyb21cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBwYXRoIG9mIHRoZSBib3VuZGVkIGNvbnRleHQgb3IgJycgaWYgaXQgd2FzIG5vdCBmb3VuZFxyXG4gICAgICovXHJcbiAgICBnZXROZWFyZXN0Qm91bmRlZENvbnRleHRQYXRoKHN0YXJ0UGF0aCkge1xyXG4gICAgICAgIGxldCByZWcgPSAgbmV3IFJlZ0V4cCgnXFxcXGInK0JPVU5ERURfQ09OVEVYVF9GSUxFX05BTUUrJ1xcXFxiJyk7XHJcbiAgICAgICAgcmV0dXJuIF9mb2xkZXJzLmdldCh0aGlzKS5nZXROZWFyZXN0RmlsZVNlYXJjaGluZ1Vwd2FyZHMoc3RhcnRQYXRoLCByZWcpO1xyXG4gICAgfVxyXG59Il19