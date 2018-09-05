'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BoundedContextManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*---------------------------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) Dolittle. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *--------------------------------------------------------------------------------------------*/


var _BoilerPlatesManager = require('../boilerPlates/BoilerPlatesManager');

var _Guid = require('../Guid');

var _ApplicationManager = require('../applications/ApplicationManager');

var _winston = require('winston');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        _classCallCheck(this, BoundedContextManager);

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


    _createClass(BoundedContextManager, [{
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
            var filesAndFolders = _folders.get(this).getFoldersAndFilesRecursivelyIn(destination);
            var filesAndFoldersToBind = filesAndFolders.filter(function (_) {
                return _.indexOf('{{') > 0;
            });
            filesAndFoldersToBind.forEach(function (_) {
                var template = _handlebars2.default.compile(_);
                var result = template(context);
                _fs2.default.renameSync(_, result);
            });
        }
    }]);

    return BoundedContextManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkY29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9ib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiV2Vha01hcCIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiQm91bmRlZENvbnRleHRNYW5hZ2VyIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImFwcGxpY2F0aW9uTWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsIm5hbWUiLCJpbmZvIiwiZ2V0IiwiaGFzQXBwbGljYXRpb24iLCJlcnJvciIsImJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUiLCJkZXN0aW5hdGlvbiIsInBhdGgiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsImNvbnRleHQiLCJpZCIsIkd1aWQiLCJjcmVhdGUiLCJjcmVhdGVJbnN0YW5jZSIsImZpbGVzQW5kRm9sZGVycyIsImdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4iLCJmaWxlc0FuZEZvbGRlcnNUb0JpbmQiLCJmaWx0ZXIiLCJfIiwiaW5kZXhPZiIsImZvckVhY2giLCJ0ZW1wbGF0ZSIsIkhhbmRsZWJhcnMiLCJjb21waWxlIiwicmVzdWx0IiwiZnMiLCJyZW5hbWVTeW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FqQkFBQTs7Ozs7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7OztBQUVBLElBQU1BLHVCQUF1QixJQUFJQyxPQUFKLEVBQTdCO0FBQ0EsSUFBTUMsc0JBQXNCLElBQUlELE9BQUosRUFBNUI7QUFDQSxJQUFNRSxXQUFXLElBQUlGLE9BQUosRUFBakI7QUFDQSxJQUFNRyxjQUFjLElBQUlILE9BQUosRUFBcEI7O0FBR0E7Ozs7SUFHYUkscUIsV0FBQUEscUI7O0FBRVQ7Ozs7Ozs7O0FBUUEsbUNBQVlDLG1CQUFaLEVBQWlDQyxrQkFBakMsRUFBcURDLE9BQXJELEVBQThEQyxVQUE5RCxFQUEwRUMsTUFBMUUsRUFBa0Y7QUFBQTs7QUFDOUVWLDZCQUFxQlcsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JMLG1CQUEvQjtBQUNBSiw0QkFBb0JTLEdBQXBCLENBQXdCLElBQXhCLEVBQThCSixrQkFBOUI7QUFDQUosaUJBQVNRLEdBQVQsQ0FBYSxJQUFiLEVBQW1CSCxPQUFuQjtBQUNBSixvQkFBWU8sR0FBWixDQUFnQixJQUFoQixFQUFzQkYsVUFBdEI7QUFDQSxhQUFLRyxPQUFMLEdBQWVGLE1BQWY7QUFDSDs7QUFFRDs7Ozs7Ozs7K0JBSU9HLEksRUFBTTtBQUNULGlCQUFLRCxPQUFMLENBQWFFLElBQWIsMkNBQXlERCxJQUF6RDtBQUNBLGdCQUFJLENBQUNYLG9CQUFvQmEsR0FBcEIsQ0FBd0IsSUFBeEIsRUFBOEJDLGNBQTlCLEVBQUwsRUFBc0Q7QUFDbEQscUJBQUtKLE9BQUwsQ0FBYUssS0FBYjtBQUNBO0FBQ0g7O0FBRUQsZ0JBQUlDLGNBQWNsQixxQkFBcUJlLEdBQXJCLENBQXlCLElBQXpCLEVBQStCSSw2QkFBL0IsQ0FBNkQsUUFBN0QsRUFBdUUsZ0JBQXZFLEVBQXlGLENBQXpGLENBQWxCO0FBQ0EsZ0JBQUlDLGNBQWNDLGVBQUtDLElBQUwsQ0FBVUMsUUFBUUMsR0FBUixFQUFWLEVBQXdCWCxJQUF4QixDQUFsQjtBQUNBVixxQkFBU1ksR0FBVCxDQUFhLElBQWIsRUFBbUJVLHFCQUFuQixDQUF5Q0wsV0FBekM7QUFDQSxnQkFBSU0sVUFBVTtBQUNWQyxvQkFBSUMsV0FBS0MsTUFBTCxFQURNO0FBRVZoQixzQkFBTUE7QUFGSSxhQUFkO0FBSUFiLGlDQUFxQmUsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JlLGNBQS9CLENBQThDWixXQUE5QyxFQUEyREUsV0FBM0QsRUFBd0VNLE9BQXhFO0FBQ0EsZ0JBQUlLLGtCQUFrQjVCLFNBQVNZLEdBQVQsQ0FBYSxJQUFiLEVBQW1CaUIsK0JBQW5CLENBQW1EWixXQUFuRCxDQUF0QjtBQUNBLGdCQUFJYSx3QkFBd0JGLGdCQUFnQkcsTUFBaEIsQ0FBdUI7QUFBQSx1QkFBS0MsRUFBRUMsT0FBRixDQUFVLElBQVYsSUFBa0IsQ0FBdkI7QUFBQSxhQUF2QixDQUE1QjtBQUNBSCxrQ0FBc0JJLE9BQXRCLENBQThCLGFBQUs7QUFDL0Isb0JBQUlDLFdBQVdDLHFCQUFXQyxPQUFYLENBQW1CTCxDQUFuQixDQUFmO0FBQ0Esb0JBQUlNLFNBQVNILFNBQVNaLE9BQVQsQ0FBYjtBQUNBZ0IsNkJBQUdDLFVBQUgsQ0FBY1IsQ0FBZCxFQUFpQk0sTUFBakI7QUFDSCxhQUpEO0FBS0giLCJmaWxlIjoiQm91bmRlZENvbnRleHRNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgQm9pbGVyUGxhdGVzTWFuYWdlciB9IGZyb20gJy4uL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCB7IEd1aWQgfSBmcm9tICcuLi9HdWlkJztcbmltcG9ydCB7wqBBcHBsaWNhdGlvbk1hbmFnZXIgfSBmcm9tICcuLi9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuXG5pbXBvcnQgSGFuZGxlYmFycyBmcm9tICdoYW5kbGViYXJzJztcblxuY29uc3QgX2JvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2FwcGxpY2F0aW9uTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBtYW5hZ2VyIGZvciBib3VuZGVkIGNvbnRleHRzXG4gKi9cbmV4cG9ydCBjbGFzcyBCb3VuZGVkQ29udGV4dE1hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0JvdW5kZWRDb250ZXh0TWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlc01hbmFnZXJ9IGJvaWxlclBsYXRlc01hbmFnZXIgXG4gICAgICogQHBhcmFtIHtBcHBsaWNhdGlvbk1hbmFnZXJ9IGFwcGxpY2F0aW9uTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYm9pbGVyUGxhdGVzTWFuYWdlciwgYXBwbGljYXRpb25NYW5hZ2VyLCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIGJvaWxlclBsYXRlc01hbmFnZXIpO1xuICAgICAgICBfYXBwbGljYXRpb25NYW5hZ2VyLnNldCh0aGlzLCBhcHBsaWNhdGlvbk1hbmFnZXIpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Kn0gbmFtZSBcbiAgICAgKi9cbiAgICBjcmVhdGUobmFtZSkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgYm91bmRlZCBjb250ZXh0IHdpdGggbmFtZSAnJHtuYW1lfSdgKTtcbiAgICAgICAgaWYoICFfYXBwbGljYXRpb25NYW5hZ2VyLmdldCh0aGlzKS5oYXNBcHBsaWNhdGlvbigpICkge1xuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmVycm9yKGBNaXNzaW5nIGFwcGxpY2F0aW9uIC0gdXNlICdkb2xpdHRsZSBjcmVhdGUgYXBwbGljYXRpb24gW25hbWVdJyBmb3IgYSBuZXcgYXBwbGljYXRpb25gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5ib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZShcImNzaGFycFwiLCBcImJvdW5kZWRDb250ZXh0XCIpWzBdO1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSxuYW1lKTtcbiAgICAgICAgX2ZvbGRlcnMuZ2V0KHRoaXMpLm1ha2VGb2xkZXJJZk5vdEV4aXN0cyhkZXN0aW5hdGlvbik7XG4gICAgICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICAgICAgaWQ6IEd1aWQuY3JlYXRlKCksXG4gICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH07XG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVJbnN0YW5jZShib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpO1xuICAgICAgICBsZXQgZmlsZXNBbmRGb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oZGVzdGluYXRpb24pO1xuICAgICAgICBsZXQgZmlsZXNBbmRGb2xkZXJzVG9CaW5kID0gZmlsZXNBbmRGb2xkZXJzLmZpbHRlcihfID0+IF8uaW5kZXhPZigne3snKSA+IDApO1xuICAgICAgICBmaWxlc0FuZEZvbGRlcnNUb0JpbmQuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShfKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0ZW1wbGF0ZShjb250ZXh0KTtcbiAgICAgICAgICAgIGZzLnJlbmFtZVN5bmMoXywgcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==