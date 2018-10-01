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

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

var _Folders = require('../Folders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {WeakMap<BoundedContextManager, BoilerPlatesManager>}
 */
var _boilerPlatesManager = new WeakMap();
/**
 * @type {WeakMap<BoundedContextManager, ApplicationManager>}
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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

      var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByLanguageAndType("csharp", "boundedContext")[0];
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
      if (boundedContextConfigPath === "") {
        this._logger.error(BOUNDED_CONTEXT_FILE_NAME + ' was not found. Cannot create artifacts. Run dolittle create boundedcontext to create a new bounded context from scratch');
        throw "Bounded context configuration not found";
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
      var reg = new RegExp("\\b" + BOUNDED_CONTEXT_FILE_NAME + "\\b");
      return _folders.get(this).getNearestFileSearchingUpwards(startPath, reg);
    }
  }]);
  return BoundedContextManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9ib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiV2Vha01hcCIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiQk9VTkRFRF9DT05URVhUX0ZJTEVfTkFNRSIsIkJvdW5kZWRDb250ZXh0TWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIl9sb2dnZXIiLCJjb250ZXh0IiwiaW5mbyIsIm5hbWUiLCJhcHBsaWNhdGlvbiIsImdldCIsImdldEFwcGxpY2F0aW9uRnJvbSIsImRlc3RpbmF0aW9uIiwiZXJyb3IiLCJib2lsZXJQbGF0ZSIsImJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlIiwiYm91bmRlZENvbnRleHRQYXRoIiwicGF0aCIsImpvaW4iLCJwcm9jZXNzIiwiY3dkIiwibWFrZUZvbGRlcklmTm90RXhpc3RzIiwidGVtcGxhdGVDb250ZXh0IiwiaWQiLCJHdWlkIiwiY3JlYXRlIiwiYXBwbGljYXRpb25JZCIsImNyZWF0ZUluc3RhbmNlIiwic3RhcnRQYXRoIiwiYm91bmRlZENvbnRleHRDb25maWdQYXRoIiwiZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0UGF0aCIsImJvdW5kZWRDb250ZXh0T2JqIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiYm91bmRlZENvbnRleHQiLCJCb3VuZGVkQ29udGV4dCIsImJvdW5kZWRDb250ZXh0TmFtZSIsImJhY2tlbmQiLCJpbnRlcmFjdGlvbiIsInJlZyIsIlJlZ0V4cCIsImdldE5lYXJlc3RGaWxlU2VhcmNoaW5nVXB3YXJkcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7O0FBR0EsSUFBTUEsdUJBQXVCLElBQUlDLE9BQUosRUFBN0I7QUFDQTs7O0FBbEJBOzs7O0FBcUJBLElBQU1DLHNCQUFzQixJQUFJRCxPQUFKLEVBQTVCO0FBQ0E7OztBQUdBLElBQU1FLFdBQVcsSUFBSUYsT0FBSixFQUFqQjtBQUNBOzs7QUFHQSxJQUFNRyxjQUFjLElBQUlILE9BQUosRUFBcEI7O0FBRUEsSUFBTUksNEJBQTRCLHNCQUFsQztBQUNBOzs7O0lBR2FDLHFCLFdBQUFBLHFCOztBQUVUOzs7Ozs7OztBQVFBLGlDQUFZQyxtQkFBWixFQUFpQ0Msa0JBQWpDLEVBQXFEQyxPQUFyRCxFQUE4REMsVUFBOUQsRUFBMEVDLE1BQTFFLEVBQWtGO0FBQUE7O0FBQzlFWCx5QkFBcUJZLEdBQXJCLENBQXlCLElBQXpCLEVBQStCTCxtQkFBL0I7QUFDQUwsd0JBQW9CVSxHQUFwQixDQUF3QixJQUF4QixFQUE4Qkosa0JBQTlCO0FBQ0FMLGFBQVNTLEdBQVQsQ0FBYSxJQUFiLEVBQW1CSCxPQUFuQjtBQUNBTCxnQkFBWVEsR0FBWixDQUFnQixJQUFoQixFQUFzQkYsVUFBdEI7QUFDQSxTQUFLRyxPQUFMLEdBQWVGLE1BQWY7QUFDSDs7QUFFRDs7Ozs7Ozs7MkJBSU9HLE8sRUFBUztBQUNaLFdBQUtELE9BQUwsQ0FBYUUsSUFBYiwyQ0FBeURELFFBQVFFLElBQWpFOztBQUVBLFVBQUlDLGNBQWNmLG9CQUFvQmdCLEdBQXBCLENBQXdCLElBQXhCLEVBQThCQyxrQkFBOUIsQ0FBaURMLFFBQVFNLFdBQXpELENBQWxCOztBQUVBLFVBQUlILGdCQUFnQixJQUFwQixFQUEyQjtBQUN2QixhQUFLSixPQUFMLENBQWFRLEtBQWI7QUFDQTtBQUNIOztBQUVELFVBQUlDLGNBQWN0QixxQkFBcUJrQixHQUFyQixDQUF5QixJQUF6QixFQUErQkssNkJBQS9CLENBQTZELFFBQTdELEVBQXVFLGdCQUF2RSxFQUF5RixDQUF6RixDQUFsQjtBQUNBLFVBQUlDLHFCQUFxQkMsZUFBS0MsSUFBTCxDQUFVQyxRQUFRQyxHQUFSLEVBQVYsRUFBeUJkLFFBQVFFLElBQWpDLENBQXpCOztBQUVBYixlQUFTZSxHQUFULENBQWEsSUFBYixFQUFtQlcscUJBQW5CLENBQXlDTCxrQkFBekM7QUFDQSxVQUFJTSxrQkFBa0I7QUFDbEJDLFlBQUlDLFdBQUtDLE1BQUwsRUFEYztBQUVsQmpCLGNBQU1GLFFBQVFFLElBRkk7QUFHbEJrQix1QkFBZWpCLFlBQVljO0FBSFQsT0FBdEI7QUFLQS9CLDJCQUFxQmtCLEdBQXJCLENBQXlCLElBQXpCLEVBQStCaUIsY0FBL0IsQ0FBOENiLFdBQTlDLEVBQTJERSxrQkFBM0QsRUFBK0VNLGVBQS9FO0FBQ0g7QUFDRDs7Ozs7Ozs7bURBSytCTSxTLEVBQVc7QUFDdEMsVUFBTUMsMkJBQTJCLEtBQUtDLDRCQUFMLENBQWtDRixTQUFsQyxDQUFqQztBQUNBLFVBQUlDLDZCQUE2QixFQUFqQyxFQUFxQztBQUNqQyxhQUFLeEIsT0FBTCxDQUFhUSxLQUFiLENBQXNCaEIseUJBQXRCO0FBQ0EsY0FBTSx5Q0FBTjtBQUNIO0FBQ0QsV0FBS1EsT0FBTCxDQUFhRSxJQUFiLG9EQUFrRXNCLHdCQUFsRTs7QUFFQSxVQUFJRSxvQkFBb0JDLEtBQUtDLEtBQUwsQ0FBV3JDLFlBQVljLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0J3QixZQUF0QixDQUFtQ0wsd0JBQW5DLEVBQTZELE1BQTdELENBQVgsQ0FBeEI7QUFDQSxVQUFJTSxpQkFBaUIsSUFBSUMsOEJBQUosQ0FBbUJMLGtCQUFrQnRCLFdBQXJDLEVBQWtEc0Isa0JBQWtCSSxjQUFwRSxFQUFvRkosa0JBQWtCTSxrQkFBdEcsRUFDakJOLGtCQUFrQk8sT0FERCxFQUNVUCxrQkFBa0JRLFdBRDVCLENBQXJCOztBQUdBLGFBQU9KLGNBQVA7QUFDSDtBQUNEOzs7Ozs7OztpREFLNkJQLFMsRUFBVztBQUNwQyxVQUFJWSxNQUFPLElBQUlDLE1BQUosQ0FBVyxRQUFNNUMseUJBQU4sR0FBZ0MsS0FBM0MsQ0FBWDtBQUNBLGFBQU9GLFNBQVNlLEdBQVQsQ0FBYSxJQUFiLEVBQW1CZ0MsOEJBQW5CLENBQWtEZCxTQUFsRCxFQUE2RFksR0FBN0QsQ0FBUDtBQUNIIiwiZmlsZSI6IkJvdW5kZWRDb250ZXh0TWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEJvaWxlclBsYXRlc01hbmFnZXIgfSBmcm9tICcuLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XG5pbXBvcnQgeyBHdWlkIH0gZnJvbSAnLi4vR3VpZCc7XG5pbXBvcnQge8KgQXBwbGljYXRpb25NYW5hZ2VyIH0gZnJvbSAnLi4vYXBwbGljYXRpb25zL0FwcGxpY2F0aW9uTWFuYWdlcic7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCB7IEJvdW5kZWRDb250ZXh0IH0gZnJvbSAnLi9Cb3VuZGVkQ29udGV4dCc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG5cbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Qm91bmRlZENvbnRleHRNYW5hZ2VyLCBCb2lsZXJQbGF0ZXNNYW5hZ2VyPn1cbiAqL1xuY29uc3QgX2JvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxCb3VuZGVkQ29udGV4dE1hbmFnZXIsIEFwcGxpY2F0aW9uTWFuYWdlcj59XG4gKi9cbmNvbnN0IF9hcHBsaWNhdGlvbk1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxCb3VuZGVkQ29udGV4dE1hbmFnZXIsIEZvbGRlcnM+fVxuICovXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvdW5kZWRDb250ZXh0TWFuYWdlciwgZnM+fVxuICovXG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IEJPVU5ERURfQ09OVEVYVF9GSUxFX05BTUUgPSAnYm91bmRlZC1jb250ZXh0Lmpzb24nO1xuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBtYW5hZ2VyIGZvciBib3VuZGVkIGNvbnRleHRzXG4gKi9cbmV4cG9ydCBjbGFzcyBCb3VuZGVkQ29udGV4dE1hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0JvdW5kZWRDb250ZXh0TWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlc01hbmFnZXJ9IGJvaWxlclBsYXRlc01hbmFnZXIgXG4gICAgICogQHBhcmFtIHtBcHBsaWNhdGlvbk1hbmFnZXJ9IGFwcGxpY2F0aW9uTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYm9pbGVyUGxhdGVzTWFuYWdlciwgYXBwbGljYXRpb25NYW5hZ2VyLCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIGJvaWxlclBsYXRlc01hbmFnZXIpO1xuICAgICAgICBfYXBwbGljYXRpb25NYW5hZ2VyLnNldCh0aGlzLCBhcHBsaWNhdGlvbk1hbmFnZXIpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjb21wbGV0ZSBib3VuZGVkIGNvbnRleHQgZnJvbSBib2lsZXJwbGF0ZVxuICAgICAqIEBwYXJhbSB7e25hbWU6IHN0cmluZywgZGVzdGluYXRpb246IHN0cmluZ319IGNvbnRleHQgb2YgdGhlIGJvdW5kZWQgY29udGV4dCBcbiAgICAgKi9cbiAgICBjcmVhdGUoY29udGV4dCkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgYm91bmRlZCBjb250ZXh0IHdpdGggbmFtZSAnJHtjb250ZXh0Lm5hbWV9J2ApO1xuXG4gICAgICAgIGxldCBhcHBsaWNhdGlvbiA9IF9hcHBsaWNhdGlvbk1hbmFnZXIuZ2V0KHRoaXMpLmdldEFwcGxpY2F0aW9uRnJvbShjb250ZXh0LmRlc3RpbmF0aW9uKTtcblxuICAgICAgICBpZiggYXBwbGljYXRpb24gPT09IG51bGwgKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYE1pc3NpbmcgYXBwbGljYXRpb24gLSB1c2UgJ2RvbGl0dGxlIGNyZWF0ZSBhcHBsaWNhdGlvbiBbbmFtZV0nIGZvciBhIG5ldyBhcHBsaWNhdGlvbmApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKFwiY3NoYXJwXCIsIFwiYm91bmRlZENvbnRleHRcIilbMF07XG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dFBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgY29udGV4dC5uYW1lKTtcbiAgICAgICAgXG4gICAgICAgIF9mb2xkZXJzLmdldCh0aGlzKS5tYWtlRm9sZGVySWZOb3RFeGlzdHMoYm91bmRlZENvbnRleHRQYXRoKTtcbiAgICAgICAgbGV0IHRlbXBsYXRlQ29udGV4dCA9IHtcbiAgICAgICAgICAgIGlkOiBHdWlkLmNyZWF0ZSgpLFxuICAgICAgICAgICAgbmFtZTogY29udGV4dC5uYW1lLFxuICAgICAgICAgICAgYXBwbGljYXRpb25JZDogYXBwbGljYXRpb24uaWRcbiAgICAgICAgfTtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUluc3RhbmNlKGJvaWxlclBsYXRlLCBib3VuZGVkQ29udGV4dFBhdGgsIHRlbXBsYXRlQ29udGV4dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlYXJjaGVzIHRoZSBmaWxlIGhpZXJhcmNoeSBmb3IgYm91bmRlZC1jb250ZXh0Lmpzb24gYW5kIHJldHVybnMgdGhlIEJvdW5kZWRDb250ZXh0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0UGF0aCB0byBzZWFyY2ggZnJvbVxuICAgICAqIEByZXR1cm5zIHtCb3VuZGVkQ29udGV4dH0gdGhlIGJvdW5kZWQgY29udGV4dFxuICAgICAqL1xuICAgIGdldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyhzdGFydFBhdGgpIHtcbiAgICAgICAgY29uc3QgYm91bmRlZENvbnRleHRDb25maWdQYXRoID0gdGhpcy5nZXROZWFyZXN0Qm91bmRlZENvbnRleHRQYXRoKHN0YXJ0UGF0aCk7XG4gICAgICAgIGlmIChib3VuZGVkQ29udGV4dENvbmZpZ1BhdGggPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgJHtCT1VOREVEX0NPTlRFWFRfRklMRV9OQU1FfSB3YXMgbm90IGZvdW5kLiBDYW5ub3QgY3JlYXRlIGFydGlmYWN0cy4gUnVuIGRvbGl0dGxlIGNyZWF0ZSBib3VuZGVkY29udGV4dCB0byBjcmVhdGUgYSBuZXcgYm91bmRlZCBjb250ZXh0IGZyb20gc2NyYXRjaGApO1xuICAgICAgICAgICAgdGhyb3cgXCJCb3VuZGVkIGNvbnRleHQgY29uZmlndXJhdGlvbiBub3QgZm91bmRcIlxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBGb3VuZCBib3VuZGVkIGNvbnRleHQgY29uZmlndXJhdGlvbiBhdCBwYXRoICcke2JvdW5kZWRDb250ZXh0Q29uZmlnUGF0aH0nYCk7XG5cbiAgICAgICAgbGV0IGJvdW5kZWRDb250ZXh0T2JqID0gSlNPTi5wYXJzZShfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGJvdW5kZWRDb250ZXh0Q29uZmlnUGF0aCwgJ3V0ZjgnKSk7XG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dCA9IG5ldyBCb3VuZGVkQ29udGV4dChib3VuZGVkQ29udGV4dE9iai5hcHBsaWNhdGlvbiwgYm91bmRlZENvbnRleHRPYmouYm91bmRlZENvbnRleHQsIGJvdW5kZWRDb250ZXh0T2JqLmJvdW5kZWRDb250ZXh0TmFtZSxcbiAgICAgICAgICAgIGJvdW5kZWRDb250ZXh0T2JqLmJhY2tlbmQsIGJvdW5kZWRDb250ZXh0T2JqLmludGVyYWN0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBib3VuZGVkQ29udGV4dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VhcmNoZXMgdGhlIGZpbGUgaGllcmFyY2h5IGZvciBib3VuZGVkLWNvbnRleHQuanNvbiBhbmQgcmV0dXJucyB0aGUgcGF0aCBvZiB0aGUgZmlsZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydFBhdGggdG8gc2VhcmNoIGZyb21cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgcGF0aCBvZiB0aGUgYm91bmRlZCBjb250ZXh0IG9yICcnIGlmIGl0IHdhcyBub3QgZm91bmRcbiAgICAgKi9cbiAgICBnZXROZWFyZXN0Qm91bmRlZENvbnRleHRQYXRoKHN0YXJ0UGF0aCkge1xuICAgICAgICBsZXQgcmVnID0gIG5ldyBSZWdFeHAoXCJcXFxcYlwiK0JPVU5ERURfQ09OVEVYVF9GSUxFX05BTUUrXCJcXFxcYlwiKTtcbiAgICAgICAgcmV0dXJuIF9mb2xkZXJzLmdldCh0aGlzKS5nZXROZWFyZXN0RmlsZVNlYXJjaGluZ1Vwd2FyZHMoc3RhcnRQYXRoLCByZWcpO1xuICAgIH1cbn0iXX0=