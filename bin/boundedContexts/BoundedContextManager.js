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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _BoundedContext = require('./BoundedContext');

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var _boilerPlatesManager = new WeakMap();
var _applicationManager = new WeakMap();
var _folders = new WeakMap();
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
     * @param {string} name of the bounded context 
     */


    (0, _createClass3.default)(BoundedContextManager, [{
        key: 'create',
        value: function create(name) {
            this._logger.info('Creating bounded context with name \'' + name + '\'');
            if (!_applicationManager.get(this).hasApplication()) {
                this._logger.error('Missing application - use \'dolittle create application [name]\' for a new application');
                return;
            }

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByLanguageAndType("csharp", "boundedContext")[0];
            var destination = _path2.default.join(process.cwd(), name);
            _folders.get(this).makeFolderIfNotExists(destination);
            var context = {
                id: _Guid.Guid.create(),
                name: name
            };
            _boilerPlatesManager.get(this).createInstance(boilerPlate, destination, context);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9ib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiV2Vha01hcCIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiQk9VTkRFRF9DT05URVhUX0ZJTEVfTkFNRSIsIkJvdW5kZWRDb250ZXh0TWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIl9sb2dnZXIiLCJuYW1lIiwiaW5mbyIsImdldCIsImhhc0FwcGxpY2F0aW9uIiwiZXJyb3IiLCJib2lsZXJQbGF0ZSIsImJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlIiwiZGVzdGluYXRpb24iLCJwYXRoIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJtYWtlRm9sZGVySWZOb3RFeGlzdHMiLCJjb250ZXh0IiwiaWQiLCJHdWlkIiwiY3JlYXRlIiwiY3JlYXRlSW5zdGFuY2UiLCJzdGFydFBhdGgiLCJib3VuZGVkQ29udGV4dENvbmZpZ1BhdGgiLCJnZXROZWFyZXN0Qm91bmRlZENvbnRleHRQYXRoIiwiYm91bmRlZENvbnRleHRPYmoiLCJKU09OIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJib3VuZGVkQ29udGV4dCIsIkJvdW5kZWRDb250ZXh0IiwiYXBwbGljYXRpb24iLCJib3VuZGVkQ29udGV4dE5hbWUiLCJiYWNrZW5kIiwiaW50ZXJhY3Rpb24iLCJyZWciLCJSZWdFeHAiLCJnZXROZWFyZXN0RmlsZVNlYXJjaGluZ1Vwd2FyZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBWEE7Ozs7QUFhQSxJQUFNQSx1QkFBdUIsSUFBSUMsT0FBSixFQUE3QjtBQUNBLElBQU1DLHNCQUFzQixJQUFJRCxPQUFKLEVBQTVCO0FBQ0EsSUFBTUUsV0FBVyxJQUFJRixPQUFKLEVBQWpCO0FBQ0EsSUFBTUcsY0FBYyxJQUFJSCxPQUFKLEVBQXBCOztBQUVBLElBQU1JLDRCQUE0QixzQkFBbEM7QUFDQTs7OztJQUdhQyxxQixXQUFBQSxxQjs7QUFFVDs7Ozs7Ozs7QUFRQSxtQ0FBWUMsbUJBQVosRUFBaUNDLGtCQUFqQyxFQUFxREMsT0FBckQsRUFBOERDLFVBQTlELEVBQTBFQyxNQUExRSxFQUFrRjtBQUFBOztBQUM5RVgsNkJBQXFCWSxHQUFyQixDQUF5QixJQUF6QixFQUErQkwsbUJBQS9CO0FBQ0FMLDRCQUFvQlUsR0FBcEIsQ0FBd0IsSUFBeEIsRUFBOEJKLGtCQUE5QjtBQUNBTCxpQkFBU1MsR0FBVCxDQUFhLElBQWIsRUFBbUJILE9BQW5CO0FBQ0FMLG9CQUFZUSxHQUFaLENBQWdCLElBQWhCLEVBQXNCRixVQUF0QjtBQUNBLGFBQUtHLE9BQUwsR0FBZUYsTUFBZjtBQUNIOztBQUVEOzs7Ozs7OzsrQkFJT0csSSxFQUFNO0FBQ1QsaUJBQUtELE9BQUwsQ0FBYUUsSUFBYiwyQ0FBeURELElBQXpEO0FBQ0EsZ0JBQUksQ0FBQ1osb0JBQW9CYyxHQUFwQixDQUF3QixJQUF4QixFQUE4QkMsY0FBOUIsRUFBTCxFQUFzRDtBQUNsRCxxQkFBS0osT0FBTCxDQUFhSyxLQUFiO0FBQ0E7QUFDSDs7QUFFRCxnQkFBSUMsY0FBY25CLHFCQUFxQmdCLEdBQXJCLENBQXlCLElBQXpCLEVBQStCSSw2QkFBL0IsQ0FBNkQsUUFBN0QsRUFBdUUsZ0JBQXZFLEVBQXlGLENBQXpGLENBQWxCO0FBQ0EsZ0JBQUlDLGNBQWNDLGVBQUtDLElBQUwsQ0FBVUMsUUFBUUMsR0FBUixFQUFWLEVBQXdCWCxJQUF4QixDQUFsQjtBQUNBWCxxQkFBU2EsR0FBVCxDQUFhLElBQWIsRUFBbUJVLHFCQUFuQixDQUF5Q0wsV0FBekM7QUFDQSxnQkFBSU0sVUFBVTtBQUNWQyxvQkFBSUMsV0FBS0MsTUFBTCxFQURNO0FBRVZoQixzQkFBTUE7QUFGSSxhQUFkO0FBSUFkLGlDQUFxQmdCLEdBQXJCLENBQXlCLElBQXpCLEVBQStCZSxjQUEvQixDQUE4Q1osV0FBOUMsRUFBMkRFLFdBQTNELEVBQXdFTSxPQUF4RTtBQUNIO0FBQ0Q7Ozs7Ozs7O3VEQUsrQkssUyxFQUFXO0FBQ3RDLGdCQUFNQywyQkFBMkIsS0FBS0MsNEJBQUwsQ0FBa0NGLFNBQWxDLENBQWpDO0FBQ0EsZ0JBQUlDLDZCQUE2QixFQUFqQyxFQUFxQztBQUNqQyxxQkFBS3BCLE9BQUwsQ0FBYUssS0FBYixDQUFzQmIseUJBQXRCO0FBQ0Esc0JBQU0seUNBQU47QUFDSDtBQUNELGlCQUFLUSxPQUFMLENBQWFFLElBQWIsb0RBQWtFa0Isd0JBQWxFOztBQUVBLGdCQUFJRSxvQkFBb0JDLEtBQUtDLEtBQUwsQ0FBV2pDLFlBQVlZLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JzQixZQUF0QixDQUFtQ0wsd0JBQW5DLEVBQTZELE1BQTdELENBQVgsQ0FBeEI7QUFDQSxnQkFBSU0saUJBQWlCLElBQUlDLDhCQUFKLENBQW1CTCxrQkFBa0JNLFdBQXJDLEVBQWtETixrQkFBa0JJLGNBQXBFLEVBQW9GSixrQkFBa0JPLGtCQUF0RyxFQUNqQlAsa0JBQWtCUSxPQURELEVBQ1VSLGtCQUFrQlMsV0FENUIsQ0FBckI7O0FBR0EsbUJBQU9MLGNBQVA7QUFDSDtBQUNEOzs7Ozs7OztxREFLNkJQLFMsRUFBVztBQUNwQyxnQkFBSWEsTUFBTyxJQUFJQyxNQUFKLENBQVcsUUFBTXpDLHlCQUFOLEdBQWdDLEtBQTNDLENBQVg7QUFDQSxtQkFBT0YsU0FBU2EsR0FBVCxDQUFhLElBQWIsRUFBbUIrQiw4QkFBbkIsQ0FBa0RmLFNBQWxELEVBQTZEYSxHQUE3RCxDQUFQO0FBQ0giLCJmaWxlIjoiQm91bmRlZENvbnRleHRNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgQm9pbGVyUGxhdGVzTWFuYWdlciB9IGZyb20gJy4uL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCB7IEd1aWQgfSBmcm9tICcuLi9HdWlkJztcbmltcG9ydCB7wqBBcHBsaWNhdGlvbk1hbmFnZXIgfSBmcm9tICcuLi9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgQm91bmRlZENvbnRleHQgfSBmcm9tICcuL0JvdW5kZWRDb250ZXh0JztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi4vZ2xvYmFsJztcblxuY29uc3QgX2JvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2FwcGxpY2F0aW9uTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IEJPVU5ERURfQ09OVEVYVF9GSUxFX05BTUUgPSAnYm91bmRlZC1jb250ZXh0Lmpzb24nO1xuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBtYW5hZ2VyIGZvciBib3VuZGVkIGNvbnRleHRzXG4gKi9cbmV4cG9ydCBjbGFzcyBCb3VuZGVkQ29udGV4dE1hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0JvdW5kZWRDb250ZXh0TWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlc01hbmFnZXJ9IGJvaWxlclBsYXRlc01hbmFnZXIgXG4gICAgICogQHBhcmFtIHtBcHBsaWNhdGlvbk1hbmFnZXJ9IGFwcGxpY2F0aW9uTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYm9pbGVyUGxhdGVzTWFuYWdlciwgYXBwbGljYXRpb25NYW5hZ2VyLCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIGJvaWxlclBsYXRlc01hbmFnZXIpO1xuICAgICAgICBfYXBwbGljYXRpb25NYW5hZ2VyLnNldCh0aGlzLCBhcHBsaWNhdGlvbk1hbmFnZXIpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjb21wbGV0ZSBib3VuZGVkIGNvbnRleHQgZnJvbSBib2lsZXJwbGF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG9mIHRoZSBib3VuZGVkIGNvbnRleHQgXG4gICAgICovXG4gICAgY3JlYXRlKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGJvdW5kZWQgY29udGV4dCB3aXRoIG5hbWUgJyR7bmFtZX0nYCk7XG4gICAgICAgIGlmKCAhX2FwcGxpY2F0aW9uTWFuYWdlci5nZXQodGhpcykuaGFzQXBwbGljYXRpb24oKSApIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgTWlzc2luZyBhcHBsaWNhdGlvbiAtIHVzZSAnZG9saXR0bGUgY3JlYXRlIGFwcGxpY2F0aW9uIFtuYW1lXScgZm9yIGEgbmV3IGFwcGxpY2F0aW9uYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUoXCJjc2hhcnBcIiwgXCJib3VuZGVkQ29udGV4dFwiKVswXTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksbmFtZSk7XG4gICAgICAgIF9mb2xkZXJzLmdldCh0aGlzKS5tYWtlRm9sZGVySWZOb3RFeGlzdHMoZGVzdGluYXRpb24pO1xuICAgICAgICBsZXQgY29udGV4dCA9IHtcbiAgICAgICAgICAgIGlkOiBHdWlkLmNyZWF0ZSgpLFxuICAgICAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB9O1xuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlSW5zdGFuY2UoYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VhcmNoZXMgdGhlIGZpbGUgaGllcmFyY2h5IGZvciBib3VuZGVkLWNvbnRleHQuanNvbiBhbmQgcmV0dXJucyB0aGUgQm91bmRlZENvbnRleHRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnRQYXRoIHRvIHNlYXJjaCBmcm9tXG4gICAgICogQHJldHVybnMge0JvdW5kZWRDb250ZXh0fSB0aGUgYm91bmRlZCBjb250ZXh0XG4gICAgICovXG4gICAgZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnKHN0YXJ0UGF0aCkge1xuICAgICAgICBjb25zdCBib3VuZGVkQ29udGV4dENvbmZpZ1BhdGggPSB0aGlzLmdldE5lYXJlc3RCb3VuZGVkQ29udGV4dFBhdGgoc3RhcnRQYXRoKTtcbiAgICAgICAgaWYgKGJvdW5kZWRDb250ZXh0Q29uZmlnUGF0aCA9PT0gXCJcIikge1xuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmVycm9yKGAke0JPVU5ERURfQ09OVEVYVF9GSUxFX05BTUV9IHdhcyBub3QgZm91bmQuIENhbm5vdCBjcmVhdGUgYXJ0aWZhY3RzLiBSdW4gZG9saXR0bGUgY3JlYXRlIGJvdW5kZWRjb250ZXh0IHRvIGNyZWF0ZSBhIG5ldyBib3VuZGVkIGNvbnRleHQgZnJvbSBzY3JhdGNoYCk7XG4gICAgICAgICAgICB0aHJvdyBcIkJvdW5kZWQgY29udGV4dCBjb25maWd1cmF0aW9uIG5vdCBmb3VuZFwiXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYEZvdW5kIGJvdW5kZWQgY29udGV4dCBjb25maWd1cmF0aW9uIGF0IHBhdGggJyR7Ym91bmRlZENvbnRleHRDb25maWdQYXRofSdgKTtcblxuICAgICAgICBsZXQgYm91bmRlZENvbnRleHRPYmogPSBKU09OLnBhcnNlKF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoYm91bmRlZENvbnRleHRDb25maWdQYXRoLCAndXRmOCcpKTtcbiAgICAgICAgbGV0IGJvdW5kZWRDb250ZXh0ID0gbmV3IEJvdW5kZWRDb250ZXh0KGJvdW5kZWRDb250ZXh0T2JqLmFwcGxpY2F0aW9uLCBib3VuZGVkQ29udGV4dE9iai5ib3VuZGVkQ29udGV4dCwgYm91bmRlZENvbnRleHRPYmouYm91bmRlZENvbnRleHROYW1lLFxuICAgICAgICAgICAgYm91bmRlZENvbnRleHRPYmouYmFja2VuZCwgYm91bmRlZENvbnRleHRPYmouaW50ZXJhY3Rpb24pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGJvdW5kZWRDb250ZXh0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZWFyY2hlcyB0aGUgZmlsZSBoaWVyYXJjaHkgZm9yIGJvdW5kZWQtY29udGV4dC5qc29uIGFuZCByZXR1cm5zIHRoZSBwYXRoIG9mIHRoZSBmaWxlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0UGF0aCB0byBzZWFyY2ggZnJvbVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBwYXRoIG9mIHRoZSBib3VuZGVkIGNvbnRleHQgb3IgJycgaWYgaXQgd2FzIG5vdCBmb3VuZFxuICAgICAqL1xuICAgIGdldE5lYXJlc3RCb3VuZGVkQ29udGV4dFBhdGgoc3RhcnRQYXRoKSB7XG4gICAgICAgIGxldCByZWcgPSAgbmV3IFJlZ0V4cChcIlxcXFxiXCIrQk9VTkRFRF9DT05URVhUX0ZJTEVfTkFNRStcIlxcXFxiXCIpO1xuICAgICAgICByZXR1cm4gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldE5lYXJlc3RGaWxlU2VhcmNoaW5nVXB3YXJkcyhzdGFydFBhdGgsIHJlZyk7XG4gICAgfVxufSJdfQ==