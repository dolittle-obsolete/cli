'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ArtifactsManager = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Folders = require('../Folders');

var _winston = require('winston');

var _BoilerPlatesManager = require('../boilerPlates/BoilerPlatesManager');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applicationFilename = "application.json"; /*---------------------------------------------------------------------------------------------
                                               *  Copyright (c) Dolittle. All rights reserved.
                                               *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                               *--------------------------------------------------------------------------------------------*/


var _boilerPlatesManager = new WeakMap();
var _folders = new WeakMap();
var _fileSystem = new WeakMap();

/**
 * Represents a manager for artifacts
 */

var ArtifactsManager = exports.ArtifactsManager = function () {
    /**
     * Initializes a new instance of {ApplicationManager}
     * @param {BoilerPlatesManager} boilerPlatesManager
     * @param {Folders} folders 
     * @param {fs} fileSystem
     * @param {Logger} logger
     */
    function ArtifactsManager(boilerPlatesManager, folders, fileSystem, logger) {
        (0, _classCallCheck3.default)(this, ArtifactsManager);

        _boilerPlatesManager.set(this, boilerPlatesManager);
        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        this._logger = logger;
    }

    /**
     * Create a command
     * @param {string} name 
     * @param {string} namespace 
     */


    (0, _createClass3.default)(ArtifactsManager, [{
        key: 'createCommand',
        value: function createCommand(name, namespace) {
            this._logger.info('Creating command with name \'' + name + '\' and namespace \'' + namespace + '\'');

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var context = {
                name: name,
                namespace: namespace
            };
            var destination = process.cwd();

            _boilerPlatesManager.get(this).createArtifactInstance('command', 'csharp', boilerPlate, destination, context);
        }
        /**
         * Create an event
         * @param {string} name 
         * @param {string} namespace 
         */

    }, {
        key: 'createEvent',
        value: function createEvent(name, namespace) {
            this._logger.info('Creating event with name \'' + name + '\' and namespace \'' + namespace + '\'');

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var context = {
                name: name,
                namespace: namespace
            };
            var destination = process.cwd();

            _boilerPlatesManager.get(this).createArtifactInstance('event', 'csharp', boilerPlate, destination, context);
        }
        /**
         * Create a read model
         * @param {string} name 
         * @param {string} namespace 
         */

    }, {
        key: 'createReadModel',
        value: function createReadModel(name, namespace) {
            this._logger.info('Creating read model with name \'' + name + '\' and namespace \'' + namespace + '\'');

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var context = {
                name: name,
                namespace: namespace
            };
            var destination = process.cwd();

            _boilerPlatesManager.get(this).createArtifactInstance('readModel', 'csharp', boilerPlate, destination, context);
        }
        /**
         * Create an event
         * @param {string} name 
         * @param {string} namespace 
         */

    }, {
        key: 'createAggregateRoot',
        value: function createAggregateRoot(name, namespace) {
            this._logger.info('Creating aggregate root with name \'' + name + '\' and namespace \'' + namespace + '\'');

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var context = {
                name: name,
                namespace: namespace
            };
            var destination = process.cwd();

            _boilerPlatesManager.get(this).createArtifactInstance('aggregateRoot', 'csharp', boilerPlate, destination, context);
        }
    }]);
    return ArtifactsManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJhcHBsaWNhdGlvbkZpbGVuYW1lIiwiX2JvaWxlclBsYXRlc01hbmFnZXIiLCJXZWFrTWFwIiwiX2ZvbGRlcnMiLCJfZmlsZVN5c3RlbSIsIkFydGlmYWN0c01hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwibmFtZSIsIm5hbWVzcGFjZSIsImluZm8iLCJib2lsZXJQbGF0ZSIsImdldCIsImJvaWxlclBsYXRlc0J5VHlwZSIsImNvbnRleHQiLCJkZXN0aW5hdGlvbiIsInByb2Nlc3MiLCJjd2QiLCJjcmVhdGVBcnRpZmFjdEluc3RhbmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxzQkFBc0Isa0JBQTVCLEMsQ0FWQTs7Ozs7O0FBWUEsSUFBTUMsdUJBQXVCLElBQUlDLE9BQUosRUFBN0I7QUFDQSxJQUFNQyxXQUFXLElBQUlELE9BQUosRUFBakI7QUFDQSxJQUFNRSxjQUFjLElBQUlGLE9BQUosRUFBcEI7O0FBR0E7Ozs7SUFHYUcsZ0IsV0FBQUEsZ0I7QUFDVDs7Ozs7OztBQU9BLDhCQUFZQyxtQkFBWixFQUFpQ0MsT0FBakMsRUFBMENDLFVBQTFDLEVBQXNEQyxNQUF0RCxFQUE4RDtBQUFBOztBQUMxRFIsNkJBQXFCUyxHQUFyQixDQUF5QixJQUF6QixFQUErQkosbUJBQS9CO0FBQ0FILGlCQUFTTyxHQUFULENBQWEsSUFBYixFQUFtQkgsT0FBbkI7QUFDQUgsb0JBQVlNLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JGLFVBQXRCO0FBQ0EsYUFBS0csT0FBTCxHQUFlRixNQUFmO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztzQ0FLY0csSSxFQUFNQyxTLEVBQVc7QUFDM0IsaUJBQUtGLE9BQUwsQ0FBYUcsSUFBYixtQ0FBaURGLElBQWpELDJCQUF5RUMsU0FBekU7O0FBRUEsZ0JBQUlFLGNBQWNkLHFCQUFxQmUsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JDLGtCQUEvQixDQUFrRCxXQUFsRCxFQUErRCxDQUEvRCxDQUFsQjtBQUNBLGdCQUFJQyxVQUFVO0FBQ1ZOLHNCQUFNQSxJQURJO0FBRVZDLDJCQUFXQTtBQUZELGFBQWQ7QUFJQSxnQkFBSU0sY0FBY0MsUUFBUUMsR0FBUixFQUFsQjs7QUFFQXBCLGlDQUFxQmUsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JNLHNCQUEvQixDQUFzRCxTQUF0RCxFQUFpRSxRQUFqRSxFQUEyRVAsV0FBM0UsRUFBd0ZJLFdBQXhGLEVBQXFHRCxPQUFyRztBQUNIO0FBQ0Q7Ozs7Ozs7O29DQUtZTixJLEVBQU1DLFMsRUFBVztBQUN6QixpQkFBS0YsT0FBTCxDQUFhRyxJQUFiLGlDQUErQ0YsSUFBL0MsMkJBQXVFQyxTQUF2RTs7QUFFQSxnQkFBSUUsY0FBY2QscUJBQXFCZSxHQUFyQixDQUF5QixJQUF6QixFQUErQkMsa0JBQS9CLENBQWtELFdBQWxELEVBQStELENBQS9ELENBQWxCO0FBQ0EsZ0JBQUlDLFVBQVU7QUFDVk4sc0JBQU1BLElBREk7QUFFVkMsMkJBQVdBO0FBRkQsYUFBZDtBQUlBLGdCQUFJTSxjQUFjQyxRQUFRQyxHQUFSLEVBQWxCOztBQUVBcEIsaUNBQXFCZSxHQUFyQixDQUF5QixJQUF6QixFQUErQk0sc0JBQS9CLENBQXNELE9BQXRELEVBQStELFFBQS9ELEVBQXlFUCxXQUF6RSxFQUFzRkksV0FBdEYsRUFBbUdELE9BQW5HO0FBQ0g7QUFDRDs7Ozs7Ozs7d0NBS2dCTixJLEVBQU1DLFMsRUFBVztBQUM3QixpQkFBS0YsT0FBTCxDQUFhRyxJQUFiLHNDQUFvREYsSUFBcEQsMkJBQTRFQyxTQUE1RTs7QUFFQSxnQkFBSUUsY0FBY2QscUJBQXFCZSxHQUFyQixDQUF5QixJQUF6QixFQUErQkMsa0JBQS9CLENBQWtELFdBQWxELEVBQStELENBQS9ELENBQWxCO0FBQ0EsZ0JBQUlDLFVBQVU7QUFDVk4sc0JBQU1BLElBREk7QUFFVkMsMkJBQVdBO0FBRkQsYUFBZDtBQUlBLGdCQUFJTSxjQUFjQyxRQUFRQyxHQUFSLEVBQWxCOztBQUVBcEIsaUNBQXFCZSxHQUFyQixDQUF5QixJQUF6QixFQUErQk0sc0JBQS9CLENBQXNELFdBQXRELEVBQW1FLFFBQW5FLEVBQTZFUCxXQUE3RSxFQUEwRkksV0FBMUYsRUFBdUdELE9BQXZHO0FBQ0g7QUFDRDs7Ozs7Ozs7NENBS29CTixJLEVBQU1DLFMsRUFBVztBQUNqQyxpQkFBS0YsT0FBTCxDQUFhRyxJQUFiLDBDQUF3REYsSUFBeEQsMkJBQWdGQyxTQUFoRjs7QUFFQSxnQkFBSUUsY0FBY2QscUJBQXFCZSxHQUFyQixDQUF5QixJQUF6QixFQUErQkMsa0JBQS9CLENBQWtELFdBQWxELEVBQStELENBQS9ELENBQWxCO0FBQ0EsZ0JBQUlDLFVBQVU7QUFDVk4sc0JBQU1BLElBREk7QUFFVkMsMkJBQVdBO0FBRkQsYUFBZDtBQUlBLGdCQUFJTSxjQUFjQyxRQUFRQyxHQUFSLEVBQWxCOztBQUVBcEIsaUNBQXFCZSxHQUFyQixDQUF5QixJQUF6QixFQUErQk0sc0JBQS9CLENBQXNELGVBQXRELEVBQXVFLFFBQXZFLEVBQWlGUCxXQUFqRixFQUE4RkksV0FBOUYsRUFBMkdELE9BQTNHO0FBQ0giLCJmaWxlIjoiQXJ0aWZhY3RzTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCB7wqBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCB7wqBCb2lsZXJQbGF0ZXNNYW5hZ2VyfSBmcm9tICcuLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IGFwcGxpY2F0aW9uRmlsZW5hbWUgPSBcImFwcGxpY2F0aW9uLmpzb25cIjtcblxuY29uc3QgX2JvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIG1hbmFnZXIgZm9yIGFydGlmYWN0c1xuICovXG5leHBvcnQgY2xhc3MgQXJ0aWZhY3RzTWFuYWdlciB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0FwcGxpY2F0aW9uTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlc01hbmFnZXJ9IGJvaWxlclBsYXRlc01hbmFnZXJcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnMgXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihib2lsZXJQbGF0ZXNNYW5hZ2VyLCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIGJvaWxlclBsYXRlc01hbmFnZXIpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGNvbW1hbmRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlIFxuICAgICAqL1xuICAgIGNyZWF0ZUNvbW1hbmQobmFtZSwgbmFtZXNwYWNlKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyBjb21tYW5kIHdpdGggbmFtZSAnJHtuYW1lfScgYW5kIG5hbWVzcGFjZSAnJHtuYW1lc3BhY2V9J2ApO1xuXG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5ib2lsZXJQbGF0ZXNCeVR5cGUoJ2FydGlmYWN0cycpWzBdO1xuICAgICAgICBsZXQgY29udGV4dCA9IHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZVxuICAgICAgICB9O1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgICBcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoJ2NvbW1hbmQnLCAnY3NoYXJwJywgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGV2ZW50XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZSBcbiAgICAgKi9cbiAgICBjcmVhdGVFdmVudChuYW1lLCBuYW1lc3BhY2UpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGV2ZW50IHdpdGggbmFtZSAnJHtuYW1lfScgYW5kIG5hbWVzcGFjZSAnJHtuYW1lc3BhY2V9J2ApO1xuXG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5ib2lsZXJQbGF0ZXNCeVR5cGUoJ2FydGlmYWN0cycpWzBdO1xuICAgICAgICBsZXQgY29udGV4dCA9IHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZVxuICAgICAgICB9O1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgICBcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoJ2V2ZW50JywgJ2NzaGFycCcsIGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHJlYWQgbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlIFxuICAgICAqL1xuICAgIGNyZWF0ZVJlYWRNb2RlbChuYW1lLCBuYW1lc3BhY2UpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIHJlYWQgbW9kZWwgd2l0aCBuYW1lICcke25hbWV9JyBhbmQgbmFtZXNwYWNlICcke25hbWVzcGFjZX0nYCk7XG5cbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5VHlwZSgnYXJ0aWZhY3RzJylbMF07XG4gICAgICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlXG4gICAgICAgIH07XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICAgIFxuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSgncmVhZE1vZGVsJywgJ2NzaGFycCcsIGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBldmVudFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2UgXG4gICAgICovXG4gICAgY3JlYXRlQWdncmVnYXRlUm9vdChuYW1lLCBuYW1lc3BhY2UpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGFnZ3JlZ2F0ZSByb290IHdpdGggbmFtZSAnJHtuYW1lfScgYW5kIG5hbWVzcGFjZSAnJHtuYW1lc3BhY2V9J2ApO1xuXG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5ib2lsZXJQbGF0ZXNCeVR5cGUoJ2FydGlmYWN0cycpWzBdO1xuICAgICAgICBsZXQgY29udGV4dCA9IHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZVxuICAgICAgICB9O1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgICBcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoJ2FnZ3JlZ2F0ZVJvb3QnLCAnY3NoYXJwJywgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTtcbiAgICB9XG59Il19