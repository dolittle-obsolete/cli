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
        }
    }]);

    return BoundedContextManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9ib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiV2Vha01hcCIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiQm91bmRlZENvbnRleHRNYW5hZ2VyIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImFwcGxpY2F0aW9uTWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsIm5hbWUiLCJpbmZvIiwiZ2V0IiwiaGFzQXBwbGljYXRpb24iLCJlcnJvciIsImJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUiLCJkZXN0aW5hdGlvbiIsInBhdGgiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsImNvbnRleHQiLCJpZCIsIkd1aWQiLCJjcmVhdGUiLCJjcmVhdGVJbnN0YW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxakJBQUE7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsdUJBQXVCLElBQUlDLE9BQUosRUFBN0I7QUFDQSxJQUFNQyxzQkFBc0IsSUFBSUQsT0FBSixFQUE1QjtBQUNBLElBQU1FLFdBQVcsSUFBSUYsT0FBSixFQUFqQjtBQUNBLElBQU1HLGNBQWMsSUFBSUgsT0FBSixFQUFwQjs7QUFHQTs7OztJQUdhSSxxQixXQUFBQSxxQjs7QUFFVDs7Ozs7Ozs7QUFRQSxtQ0FBWUMsbUJBQVosRUFBaUNDLGtCQUFqQyxFQUFxREMsT0FBckQsRUFBOERDLFVBQTlELEVBQTBFQyxNQUExRSxFQUFrRjtBQUFBOztBQUM5RVYsNkJBQXFCVyxHQUFyQixDQUF5QixJQUF6QixFQUErQkwsbUJBQS9CO0FBQ0FKLDRCQUFvQlMsR0FBcEIsQ0FBd0IsSUFBeEIsRUFBOEJKLGtCQUE5QjtBQUNBSixpQkFBU1EsR0FBVCxDQUFhLElBQWIsRUFBbUJILE9BQW5CO0FBQ0FKLG9CQUFZTyxHQUFaLENBQWdCLElBQWhCLEVBQXNCRixVQUF0QjtBQUNBLGFBQUtHLE9BQUwsR0FBZUYsTUFBZjtBQUNIOztBQUVEOzs7Ozs7OzsrQkFJT0csSSxFQUFNO0FBQ1QsaUJBQUtELE9BQUwsQ0FBYUUsSUFBYiwyQ0FBeURELElBQXpEO0FBQ0EsZ0JBQUksQ0FBQ1gsb0JBQW9CYSxHQUFwQixDQUF3QixJQUF4QixFQUE4QkMsY0FBOUIsRUFBTCxFQUFzRDtBQUNsRCxxQkFBS0osT0FBTCxDQUFhSyxLQUFiO0FBQ0E7QUFDSDs7QUFFRCxnQkFBSUMsY0FBY2xCLHFCQUFxQmUsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JJLDZCQUEvQixDQUE2RCxRQUE3RCxFQUF1RSxnQkFBdkUsRUFBeUYsQ0FBekYsQ0FBbEI7QUFDQSxnQkFBSUMsY0FBY0MsZUFBS0MsSUFBTCxDQUFVQyxRQUFRQyxHQUFSLEVBQVYsRUFBd0JYLElBQXhCLENBQWxCO0FBQ0FWLHFCQUFTWSxHQUFULENBQWEsSUFBYixFQUFtQlUscUJBQW5CLENBQXlDTCxXQUF6QztBQUNBLGdCQUFJTSxVQUFVO0FBQ1ZDLG9CQUFJQyxXQUFLQyxNQUFMLEVBRE07QUFFVmhCLHNCQUFNQTtBQUZJLGFBQWQ7QUFJQWIsaUNBQXFCZSxHQUFyQixDQUF5QixJQUF6QixFQUErQmUsY0FBL0IsQ0FBOENaLFdBQTlDLEVBQTJERSxXQUEzRCxFQUF3RU0sT0FBeEU7QUFDSCIsImZpbGUiOiJCb3VuZGVkQ29udGV4dE1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBCb2lsZXJQbGF0ZXNNYW5hZ2VyIH0gZnJvbSAnLi4vYm9pbGVyUGxhdGVzL0JvaWxlclBsYXRlc01hbmFnZXInO1xuaW1wb3J0IHsgR3VpZCB9IGZyb20gJy4uL0d1aWQnO1xuaW1wb3J0IHvCoEFwcGxpY2F0aW9uTWFuYWdlciB9IGZyb20gJy4uL2FwcGxpY2F0aW9ucy9BcHBsaWNhdGlvbk1hbmFnZXInO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5cbmNvbnN0IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9hcHBsaWNhdGlvbk1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgbWFuYWdlciBmb3IgYm91bmRlZCBjb250ZXh0c1xuICovXG5leHBvcnQgY2xhc3MgQm91bmRlZENvbnRleHRNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtCb3VuZGVkQ29udGV4dE1hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfSBib2lsZXJQbGF0ZXNNYW5hZ2VyIFxuICAgICAqIEBwYXJhbSB7QXBwbGljYXRpb25NYW5hZ2VyfSBhcHBsaWNhdGlvbk1hbmFnZXJcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnNcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGJvaWxlclBsYXRlc01hbmFnZXIsIGFwcGxpY2F0aW9uTWFuYWdlciwgZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLnNldCh0aGlzLCBib2lsZXJQbGF0ZXNNYW5hZ2VyKTtcbiAgICAgICAgX2FwcGxpY2F0aW9uTWFuYWdlci5zZXQodGhpcywgYXBwbGljYXRpb25NYW5hZ2VyKTtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0geyp9IG5hbWUgXG4gICAgICovXG4gICAgY3JlYXRlKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGJvdW5kZWQgY29udGV4dCB3aXRoIG5hbWUgJyR7bmFtZX0nYCk7XG4gICAgICAgIGlmKCAhX2FwcGxpY2F0aW9uTWFuYWdlci5nZXQodGhpcykuaGFzQXBwbGljYXRpb24oKSApIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgTWlzc2luZyBhcHBsaWNhdGlvbiAtIHVzZSAnZG9saXR0bGUgY3JlYXRlIGFwcGxpY2F0aW9uIFtuYW1lXScgZm9yIGEgbmV3IGFwcGxpY2F0aW9uYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUoXCJjc2hhcnBcIiwgXCJib3VuZGVkQ29udGV4dFwiKVswXTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksbmFtZSk7XG4gICAgICAgIF9mb2xkZXJzLmdldCh0aGlzKS5tYWtlRm9sZGVySWZOb3RFeGlzdHMoZGVzdGluYXRpb24pO1xuICAgICAgICBsZXQgY29udGV4dCA9IHtcbiAgICAgICAgICAgIGlkOiBHdWlkLmNyZWF0ZSgpLFxuICAgICAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB9O1xuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlSW5zdGFuY2UoYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTtcbiAgICB9XG59Il19