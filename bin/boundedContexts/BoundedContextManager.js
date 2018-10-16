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
      var boundedContextPath = _path2.default.join(process.cwd(), context.name);

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
      var boundedContext = new _BoundedContext.BoundedContext(boundedContextObj.application, boundedContextObj.boundedContext, boundedContextObj.boundedContextName, boundedContextObj.backend, boundedContextObj.interaction);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9ib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiV2Vha01hcCIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiQk9VTkRFRF9DT05URVhUX0ZJTEVfTkFNRSIsIkJvdW5kZWRDb250ZXh0TWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIl9sb2dnZXIiLCJjb250ZXh0IiwiaW5mbyIsIm5hbWUiLCJhcHBsaWNhdGlvbiIsImdldCIsImdldEFwcGxpY2F0aW9uRnJvbSIsImRlc3RpbmF0aW9uIiwiZXJyb3IiLCJib2lsZXJQbGF0ZSIsImJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlIiwiYm91bmRlZENvbnRleHRQYXRoIiwicGF0aCIsImpvaW4iLCJwcm9jZXNzIiwiY3dkIiwibWFrZUZvbGRlcklmTm90RXhpc3RzIiwidGVtcGxhdGVDb250ZXh0IiwiaWQiLCJHdWlkIiwiY3JlYXRlIiwiYXBwbGljYXRpb25JZCIsImNyZWF0ZUluc3RhbmNlIiwic3RhcnRQYXRoIiwiYm91bmRlZENvbnRleHRDb25maWdQYXRoIiwiZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0UGF0aCIsImJvdW5kZWRDb250ZXh0T2JqIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiYm91bmRlZENvbnRleHQiLCJCb3VuZGVkQ29udGV4dCIsImJvdW5kZWRDb250ZXh0TmFtZSIsImJhY2tlbmQiLCJpbnRlcmFjdGlvbiIsInJlZyIsIlJlZ0V4cCIsImdldE5lYXJlc3RGaWxlU2VhcmNoaW5nVXB3YXJkcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBTUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBRUE7OztBQWhCQTs7Ozs7QUFLQTtBQWNBLElBQU1BLHVCQUF1QixJQUFJQyxPQUFKLEVBQTdCO0FBQ0E7OztBQUdBLElBQU1DLHNCQUFzQixJQUFJRCxPQUFKLEVBQTVCO0FBQ0E7OztBQUdBLElBQU1FLFdBQVcsSUFBSUYsT0FBSixFQUFqQjtBQUNBOzs7QUFHQSxJQUFNRyxjQUFjLElBQUlILE9BQUosRUFBcEI7O0FBRUEsSUFBTUksNEJBQTRCLHNCQUFsQztBQUNBOzs7O0lBR2FDLHFCLFdBQUFBLHFCOztBQUVUOzs7Ozs7OztBQVFBLGlDQUFZQyxtQkFBWixFQUFpQ0Msa0JBQWpDLEVBQXFEQyxPQUFyRCxFQUE4REMsVUFBOUQsRUFBMEVDLE1BQTFFLEVBQWtGO0FBQUE7O0FBQzlFWCx5QkFBcUJZLEdBQXJCLENBQXlCLElBQXpCLEVBQStCTCxtQkFBL0I7QUFDQUwsd0JBQW9CVSxHQUFwQixDQUF3QixJQUF4QixFQUE4Qkosa0JBQTlCO0FBQ0FMLGFBQVNTLEdBQVQsQ0FBYSxJQUFiLEVBQW1CSCxPQUFuQjtBQUNBTCxnQkFBWVEsR0FBWixDQUFnQixJQUFoQixFQUFzQkYsVUFBdEI7QUFDQSxTQUFLRyxPQUFMLEdBQWVGLE1BQWY7QUFDSDs7QUFFRDs7Ozs7Ozs7MkJBSU9HLE8sRUFBUztBQUNaLFdBQUtELE9BQUwsQ0FBYUUsSUFBYiwyQ0FBeURELFFBQVFFLElBQWpFOztBQUVBLFVBQUlDLGNBQWNmLG9CQUFvQmdCLEdBQXBCLENBQXdCLElBQXhCLEVBQThCQyxrQkFBOUIsQ0FBaURMLFFBQVFNLFdBQXpELENBQWxCOztBQUVBLFVBQUlILGdCQUFnQixJQUFwQixFQUEyQjtBQUN2QixhQUFLSixPQUFMLENBQWFRLEtBQWIsQ0FBbUIsd0ZBQW5CO0FBQ0E7QUFDSDs7QUFFRCxVQUFJQyxjQUFjdEIscUJBQXFCa0IsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JLLDZCQUEvQixDQUE2RCxRQUE3RCxFQUF1RSxnQkFBdkUsRUFBeUYsQ0FBekYsQ0FBbEI7QUFDQSxVQUFJQyxxQkFBcUJDLGVBQUtDLElBQUwsQ0FBVUMsUUFBUUMsR0FBUixFQUFWLEVBQXlCZCxRQUFRRSxJQUFqQyxDQUF6Qjs7QUFFQWIsZUFBU2UsR0FBVCxDQUFhLElBQWIsRUFBbUJXLHFCQUFuQixDQUF5Q0wsa0JBQXpDO0FBQ0EsVUFBSU0sa0JBQWtCO0FBQ2xCQyxZQUFJQyxXQUFLQyxNQUFMLEVBRGM7QUFFbEJqQixjQUFNRixRQUFRRSxJQUZJO0FBR2xCa0IsdUJBQWVqQixZQUFZYztBQUhULE9BQXRCO0FBS0EvQiwyQkFBcUJrQixHQUFyQixDQUF5QixJQUF6QixFQUErQmlCLGNBQS9CLENBQThDYixXQUE5QyxFQUEyREUsa0JBQTNELEVBQStFTSxlQUEvRTtBQUNIO0FBQ0Q7Ozs7Ozs7O21EQUsrQk0sUyxFQUFXO0FBQ3RDLFVBQU1DLDJCQUEyQixLQUFLQyw0QkFBTCxDQUFrQ0YsU0FBbEMsQ0FBakM7QUFDQSxVQUFJQyw2QkFBNkIsRUFBakMsRUFBcUM7QUFDakMsYUFBS3hCLE9BQUwsQ0FBYVEsS0FBYixDQUFzQmhCLHlCQUF0QjtBQUNBLGNBQU0seUNBQU47QUFDSDtBQUNELFdBQUtRLE9BQUwsQ0FBYUUsSUFBYixvREFBa0VzQix3QkFBbEU7O0FBRUEsVUFBSUUsb0JBQW9CQyxLQUFLQyxLQUFMLENBQVdyQyxZQUFZYyxHQUFaLENBQWdCLElBQWhCLEVBQXNCd0IsWUFBdEIsQ0FBbUNMLHdCQUFuQyxFQUE2RCxNQUE3RCxDQUFYLENBQXhCO0FBQ0EsVUFBSU0saUJBQWlCLElBQUlDLDhCQUFKLENBQW1CTCxrQkFBa0J0QixXQUFyQyxFQUFrRHNCLGtCQUFrQkksY0FBcEUsRUFBb0ZKLGtCQUFrQk0sa0JBQXRHLEVBQ2pCTixrQkFBa0JPLE9BREQsRUFDVVAsa0JBQWtCUSxXQUQ1QixDQUFyQjs7QUFHQSxhQUFPSixjQUFQO0FBQ0g7QUFDRDs7Ozs7Ozs7aURBSzZCUCxTLEVBQVc7QUFDcEMsVUFBSVksTUFBTyxJQUFJQyxNQUFKLENBQVcsUUFBTTVDLHlCQUFOLEdBQWdDLEtBQTNDLENBQVg7QUFDQSxhQUFPRixTQUFTZSxHQUFULENBQWEsSUFBYixFQUFtQmdDLDhCQUFuQixDQUFrRGQsU0FBbEQsRUFBNkRZLEdBQTdELENBQVA7QUFDSCIsImZpbGUiOiJCb3VuZGVkQ29udGV4dE1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBCb2lsZXJQbGF0ZXNNYW5hZ2VyIH0gZnJvbSAnLi4vYm9pbGVyUGxhdGVzL0JvaWxlclBsYXRlc01hbmFnZXInO1xuaW1wb3J0IHsgR3VpZCB9ZnJvbSAnLi4vR3VpZCc7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbk1hbmFnZXIgfSBmcm9tICcuLi9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCB7IEJvdW5kZWRDb250ZXh0IH0gZnJvbSAnLi9Cb3VuZGVkQ29udGV4dCc7XG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Qm91bmRlZENvbnRleHRNYW5hZ2VyLCBCb2lsZXJQbGF0ZXNNYW5hZ2VyPn1cbiAqL1xuY29uc3QgX2JvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxCb3VuZGVkQ29udGV4dE1hbmFnZXIsIEFwcGxpY2F0aW9uTWFuYWdlcj59XG4gKi9cbmNvbnN0IF9hcHBsaWNhdGlvbk1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxCb3VuZGVkQ29udGV4dE1hbmFnZXIsIEZvbGRlcnM+fVxuICovXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvdW5kZWRDb250ZXh0TWFuYWdlciwgZnM+fVxuICovXG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IEJPVU5ERURfQ09OVEVYVF9GSUxFX05BTUUgPSAnYm91bmRlZC1jb250ZXh0Lmpzb24nO1xuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBtYW5hZ2VyIGZvciBib3VuZGVkIGNvbnRleHRzXG4gKi9cbmV4cG9ydCBjbGFzcyBCb3VuZGVkQ29udGV4dE1hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0JvdW5kZWRDb250ZXh0TWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlc01hbmFnZXJ9IGJvaWxlclBsYXRlc01hbmFnZXIgXG4gICAgICogQHBhcmFtIHtBcHBsaWNhdGlvbk1hbmFnZXJ9IGFwcGxpY2F0aW9uTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYm9pbGVyUGxhdGVzTWFuYWdlciwgYXBwbGljYXRpb25NYW5hZ2VyLCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIGJvaWxlclBsYXRlc01hbmFnZXIpO1xuICAgICAgICBfYXBwbGljYXRpb25NYW5hZ2VyLnNldCh0aGlzLCBhcHBsaWNhdGlvbk1hbmFnZXIpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjb21wbGV0ZSBib3VuZGVkIGNvbnRleHQgZnJvbSBib2lsZXJwbGF0ZVxuICAgICAqIEBwYXJhbSB7e25hbWU6IHN0cmluZywgZGVzdGluYXRpb246IHN0cmluZ319IGNvbnRleHQgb2YgdGhlIGJvdW5kZWQgY29udGV4dCBcbiAgICAgKi9cbiAgICBjcmVhdGUoY29udGV4dCkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgYm91bmRlZCBjb250ZXh0IHdpdGggbmFtZSAnJHtjb250ZXh0Lm5hbWV9J2ApO1xuXG4gICAgICAgIGxldCBhcHBsaWNhdGlvbiA9IF9hcHBsaWNhdGlvbk1hbmFnZXIuZ2V0KHRoaXMpLmdldEFwcGxpY2F0aW9uRnJvbShjb250ZXh0LmRlc3RpbmF0aW9uKTtcblxuICAgICAgICBpZiggYXBwbGljYXRpb24gPT09IG51bGwgKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoJ01pc3NpbmcgYXBwbGljYXRpb24gLSB1c2UgXFwnZG9saXR0bGUgY3JlYXRlIGFwcGxpY2F0aW9uIFtuYW1lXVxcJyBmb3IgYSBuZXcgYXBwbGljYXRpb24nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5ib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSgnY3NoYXJwJywgJ2JvdW5kZWRDb250ZXh0JylbMF07XG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dFBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgY29udGV4dC5uYW1lKTtcbiAgICAgICAgXG4gICAgICAgIF9mb2xkZXJzLmdldCh0aGlzKS5tYWtlRm9sZGVySWZOb3RFeGlzdHMoYm91bmRlZENvbnRleHRQYXRoKTtcbiAgICAgICAgbGV0IHRlbXBsYXRlQ29udGV4dCA9IHtcbiAgICAgICAgICAgIGlkOiBHdWlkLmNyZWF0ZSgpLFxuICAgICAgICAgICAgbmFtZTogY29udGV4dC5uYW1lLFxuICAgICAgICAgICAgYXBwbGljYXRpb25JZDogYXBwbGljYXRpb24uaWRcbiAgICAgICAgfTtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUluc3RhbmNlKGJvaWxlclBsYXRlLCBib3VuZGVkQ29udGV4dFBhdGgsIHRlbXBsYXRlQ29udGV4dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlYXJjaGVzIHRoZSBmaWxlIGhpZXJhcmNoeSBmb3IgYm91bmRlZC1jb250ZXh0Lmpzb24gYW5kIHJldHVybnMgdGhlIEJvdW5kZWRDb250ZXh0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0UGF0aCB0byBzZWFyY2ggZnJvbVxuICAgICAqIEByZXR1cm5zIHtCb3VuZGVkQ29udGV4dH0gdGhlIGJvdW5kZWQgY29udGV4dFxuICAgICAqL1xuICAgIGdldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyhzdGFydFBhdGgpIHtcbiAgICAgICAgY29uc3QgYm91bmRlZENvbnRleHRDb25maWdQYXRoID0gdGhpcy5nZXROZWFyZXN0Qm91bmRlZENvbnRleHRQYXRoKHN0YXJ0UGF0aCk7XG4gICAgICAgIGlmIChib3VuZGVkQ29udGV4dENvbmZpZ1BhdGggPT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYCR7Qk9VTkRFRF9DT05URVhUX0ZJTEVfTkFNRX0gd2FzIG5vdCBmb3VuZC4gQ2Fubm90IGNyZWF0ZSBhcnRpZmFjdHMuIFJ1biBkb2xpdHRsZSBjcmVhdGUgYm91bmRlZGNvbnRleHQgdG8gY3JlYXRlIGEgbmV3IGJvdW5kZWQgY29udGV4dCBmcm9tIHNjcmF0Y2hgKTtcbiAgICAgICAgICAgIHRocm93ICdCb3VuZGVkIGNvbnRleHQgY29uZmlndXJhdGlvbiBub3QgZm91bmQnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBGb3VuZCBib3VuZGVkIGNvbnRleHQgY29uZmlndXJhdGlvbiBhdCBwYXRoICcke2JvdW5kZWRDb250ZXh0Q29uZmlnUGF0aH0nYCk7XG5cbiAgICAgICAgbGV0IGJvdW5kZWRDb250ZXh0T2JqID0gSlNPTi5wYXJzZShfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGJvdW5kZWRDb250ZXh0Q29uZmlnUGF0aCwgJ3V0ZjgnKSk7XG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dCA9IG5ldyBCb3VuZGVkQ29udGV4dChib3VuZGVkQ29udGV4dE9iai5hcHBsaWNhdGlvbiwgYm91bmRlZENvbnRleHRPYmouYm91bmRlZENvbnRleHQsIGJvdW5kZWRDb250ZXh0T2JqLmJvdW5kZWRDb250ZXh0TmFtZSxcbiAgICAgICAgICAgIGJvdW5kZWRDb250ZXh0T2JqLmJhY2tlbmQsIGJvdW5kZWRDb250ZXh0T2JqLmludGVyYWN0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBib3VuZGVkQ29udGV4dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VhcmNoZXMgdGhlIGZpbGUgaGllcmFyY2h5IGZvciBib3VuZGVkLWNvbnRleHQuanNvbiBhbmQgcmV0dXJucyB0aGUgcGF0aCBvZiB0aGUgZmlsZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydFBhdGggdG8gc2VhcmNoIGZyb21cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgcGF0aCBvZiB0aGUgYm91bmRlZCBjb250ZXh0IG9yICcnIGlmIGl0IHdhcyBub3QgZm91bmRcbiAgICAgKi9cbiAgICBnZXROZWFyZXN0Qm91bmRlZENvbnRleHRQYXRoKHN0YXJ0UGF0aCkge1xuICAgICAgICBsZXQgcmVnID0gIG5ldyBSZWdFeHAoJ1xcXFxiJytCT1VOREVEX0NPTlRFWFRfRklMRV9OQU1FKydcXFxcYicpO1xuICAgICAgICByZXR1cm4gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldE5lYXJlc3RGaWxlU2VhcmNoaW5nVXB3YXJkcyhzdGFydFBhdGgsIHJlZyk7XG4gICAgfVxufSJdfQ==