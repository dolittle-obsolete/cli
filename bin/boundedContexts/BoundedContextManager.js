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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var _boilerPlatesManager = new WeakMap();
var _applicationManager = new WeakMap();
var _folders = new WeakMap();
var _fileSystem = new WeakMap();

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
     * 
     * @param {*} name 
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
    }]);
    return BoundedContextManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9ib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiV2Vha01hcCIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiQm91bmRlZENvbnRleHRNYW5hZ2VyIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImFwcGxpY2F0aW9uTWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsIm5hbWUiLCJpbmZvIiwiZ2V0IiwiaGFzQXBwbGljYXRpb24iLCJlcnJvciIsImJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUiLCJkZXN0aW5hdGlvbiIsInBhdGgiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsImNvbnRleHQiLCJpZCIsIkd1aWQiLCJjcmVhdGUiLCJjcmVhdGVJbnN0YW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBVEE7Ozs7QUFXQSxJQUFNQSx1QkFBdUIsSUFBSUMsT0FBSixFQUE3QjtBQUNBLElBQU1DLHNCQUFzQixJQUFJRCxPQUFKLEVBQTVCO0FBQ0EsSUFBTUUsV0FBVyxJQUFJRixPQUFKLEVBQWpCO0FBQ0EsSUFBTUcsY0FBYyxJQUFJSCxPQUFKLEVBQXBCOztBQUdBOzs7O0lBR2FJLHFCLFdBQUFBLHFCOztBQUVUOzs7Ozs7OztBQVFBLG1DQUFZQyxtQkFBWixFQUFpQ0Msa0JBQWpDLEVBQXFEQyxPQUFyRCxFQUE4REMsVUFBOUQsRUFBMEVDLE1BQTFFLEVBQWtGO0FBQUE7O0FBQzlFViw2QkFBcUJXLEdBQXJCLENBQXlCLElBQXpCLEVBQStCTCxtQkFBL0I7QUFDQUosNEJBQW9CUyxHQUFwQixDQUF3QixJQUF4QixFQUE4Qkosa0JBQTlCO0FBQ0FKLGlCQUFTUSxHQUFULENBQWEsSUFBYixFQUFtQkgsT0FBbkI7QUFDQUosb0JBQVlPLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JGLFVBQXRCO0FBQ0EsYUFBS0csT0FBTCxHQUFlRixNQUFmO0FBQ0g7O0FBRUQ7Ozs7Ozs7OytCQUlPRyxJLEVBQU07QUFDVCxpQkFBS0QsT0FBTCxDQUFhRSxJQUFiLDJDQUF5REQsSUFBekQ7QUFDQSxnQkFBSSxDQUFDWCxvQkFBb0JhLEdBQXBCLENBQXdCLElBQXhCLEVBQThCQyxjQUE5QixFQUFMLEVBQXNEO0FBQ2xELHFCQUFLSixPQUFMLENBQWFLLEtBQWI7QUFDQTtBQUNIOztBQUVELGdCQUFJQyxjQUFjbEIscUJBQXFCZSxHQUFyQixDQUF5QixJQUF6QixFQUErQkksNkJBQS9CLENBQTZELFFBQTdELEVBQXVFLGdCQUF2RSxFQUF5RixDQUF6RixDQUFsQjtBQUNBLGdCQUFJQyxjQUFjQyxlQUFLQyxJQUFMLENBQVVDLFFBQVFDLEdBQVIsRUFBVixFQUF3QlgsSUFBeEIsQ0FBbEI7QUFDQVYscUJBQVNZLEdBQVQsQ0FBYSxJQUFiLEVBQW1CVSxxQkFBbkIsQ0FBeUNMLFdBQXpDO0FBQ0EsZ0JBQUlNLFVBQVU7QUFDVkMsb0JBQUlDLFdBQUtDLE1BQUwsRUFETTtBQUVWaEIsc0JBQU1BO0FBRkksYUFBZDtBQUlBYixpQ0FBcUJlLEdBQXJCLENBQXlCLElBQXpCLEVBQStCZSxjQUEvQixDQUE4Q1osV0FBOUMsRUFBMkRFLFdBQTNELEVBQXdFTSxPQUF4RTtBQUNIIiwiZmlsZSI6IkJvdW5kZWRDb250ZXh0TWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEJvaWxlclBsYXRlc01hbmFnZXIgfSBmcm9tICcuLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XG5pbXBvcnQgeyBHdWlkIH0gZnJvbSAnLi4vR3VpZCc7XG5pbXBvcnQge8KgQXBwbGljYXRpb25NYW5hZ2VyIH0gZnJvbSAnLi4vYXBwbGljYXRpb25zL0FwcGxpY2F0aW9uTWFuYWdlcic7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuY29uc3QgX2JvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2FwcGxpY2F0aW9uTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBtYW5hZ2VyIGZvciBib3VuZGVkIGNvbnRleHRzXG4gKi9cbmV4cG9ydCBjbGFzcyBCb3VuZGVkQ29udGV4dE1hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0JvdW5kZWRDb250ZXh0TWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlc01hbmFnZXJ9IGJvaWxlclBsYXRlc01hbmFnZXIgXG4gICAgICogQHBhcmFtIHtBcHBsaWNhdGlvbk1hbmFnZXJ9IGFwcGxpY2F0aW9uTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYm9pbGVyUGxhdGVzTWFuYWdlciwgYXBwbGljYXRpb25NYW5hZ2VyLCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIGJvaWxlclBsYXRlc01hbmFnZXIpO1xuICAgICAgICBfYXBwbGljYXRpb25NYW5hZ2VyLnNldCh0aGlzLCBhcHBsaWNhdGlvbk1hbmFnZXIpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Kn0gbmFtZSBcbiAgICAgKi9cbiAgICBjcmVhdGUobmFtZSkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgYm91bmRlZCBjb250ZXh0IHdpdGggbmFtZSAnJHtuYW1lfSdgKTtcbiAgICAgICAgaWYoICFfYXBwbGljYXRpb25NYW5hZ2VyLmdldCh0aGlzKS5oYXNBcHBsaWNhdGlvbigpICkge1xuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmVycm9yKGBNaXNzaW5nIGFwcGxpY2F0aW9uIC0gdXNlICdkb2xpdHRsZSBjcmVhdGUgYXBwbGljYXRpb24gW25hbWVdJyBmb3IgYSBuZXcgYXBwbGljYXRpb25gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5ib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZShcImNzaGFycFwiLCBcImJvdW5kZWRDb250ZXh0XCIpWzBdO1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSxuYW1lKTtcbiAgICAgICAgX2ZvbGRlcnMuZ2V0KHRoaXMpLm1ha2VGb2xkZXJJZk5vdEV4aXN0cyhkZXN0aW5hdGlvbik7XG4gICAgICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICAgICAgaWQ6IEd1aWQuY3JlYXRlKCksXG4gICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH07XG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVJbnN0YW5jZShib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpO1xuICAgIH1cbn0iXX0=