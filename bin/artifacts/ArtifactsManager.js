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

var _InquirerManager = require('./InquirerManager');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _boilerPlatesManager = new WeakMap(); /*---------------------------------------------------------------------------------------------
                                           *  Copyright (c) Dolittle. All rights reserved.
                                           *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                           *--------------------------------------------------------------------------------------------*/

var _folders = new WeakMap();
var _fileSystem = new WeakMap();
var _inquirerManager = new WeakMap();

/**
 * Represents a manager for artifacts
 */

var ArtifactsManager = exports.ArtifactsManager = function () {
    /**
     * Initializes a new instance of {ApplicationManager}
     * @param {InquirerManager} inquirerManager
     * @param {BoilerPlatesManager} boilerPlatesManager
     * @param {Folders} folders 
     * @param {fs} fileSystem
     * @param {Logger} logger
     */
    function ArtifactsManager(inquirerManager, boilerPlatesManager, folders, fileSystem, logger) {
        (0, _classCallCheck3.default)(this, ArtifactsManager);

        _inquirerManager.set(this, inquirerManager);
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
         * Create an aggregate root
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
        /**
         * Create a query
         * @param {string} language
         */

    }, {
        key: 'createQuery',
        value: function createQuery(language) {
            var _this = this;

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var destination = process.cwd();

            _inquirerManager.get(this).promptForQuery(language).then(function (context) {
                _boilerPlatesManager.get(_this).createArtifactInstance('query', 'csharp', boilerPlate, destination, context);
            });
        }
        /**
         * Create a query for a specific read model
         * @param {string} name 
         * @param {string} namespace 
         */

    }, {
        key: 'createQueryFor',
        value: function createQueryFor(name, namespace) {
            this._logger.info('Creating queryfor with name \'' + name + '\' and namespace \'' + namespace + '\'');

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var context = {
                name: name,
                namespace: namespace
            };
            var destination = process.cwd();

            _boilerPlatesManager.get(this).createArtifactInstance('queryFor', 'csharp', boilerPlate, destination, context);
        }
    }]);
    return ArtifactsManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiX2lucXVpcmVyTWFuYWdlciIsIkFydGlmYWN0c01hbmFnZXIiLCJpbnF1aXJlck1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwibmFtZSIsIm5hbWVzcGFjZSIsImluZm8iLCJib2lsZXJQbGF0ZSIsImdldCIsImJvaWxlclBsYXRlc0J5VHlwZSIsImNvbnRleHQiLCJkZXN0aW5hdGlvbiIsInByb2Nlc3MiLCJjd2QiLCJjcmVhdGVBcnRpZmFjdEluc3RhbmNlIiwibGFuZ3VhZ2UiLCJwcm9tcHRGb3JRdWVyeSIsInRoZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSx1QkFBdUIsSUFBSUMsT0FBSixFQUE3QixDLENBVkE7Ozs7O0FBV0EsSUFBTUMsV0FBVyxJQUFJRCxPQUFKLEVBQWpCO0FBQ0EsSUFBTUUsY0FBYyxJQUFJRixPQUFKLEVBQXBCO0FBQ0EsSUFBTUcsbUJBQW1CLElBQUlILE9BQUosRUFBekI7O0FBR0E7Ozs7SUFHYUksZ0IsV0FBQUEsZ0I7QUFDVDs7Ozs7Ozs7QUFRQSw4QkFBWUMsZUFBWixFQUE2QkMsbUJBQTdCLEVBQWtEQyxPQUFsRCxFQUEyREMsVUFBM0QsRUFBdUVDLE1BQXZFLEVBQStFO0FBQUE7O0FBQzNFTix5QkFBaUJPLEdBQWpCLENBQXFCLElBQXJCLEVBQTJCTCxlQUEzQjtBQUNBTiw2QkFBcUJXLEdBQXJCLENBQXlCLElBQXpCLEVBQStCSixtQkFBL0I7QUFDQUwsaUJBQVNTLEdBQVQsQ0FBYSxJQUFiLEVBQW1CSCxPQUFuQjtBQUNBTCxv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RUFsQiw2QkFBaUJhLEdBQWpCLENBQXFCLElBQXJCLEVBQTJCUSxjQUEzQixDQUEwQ0QsUUFBMUMsRUFDS0UsSUFETCxDQUNVLG1CQUFXO0FBQ2IxQixxQ0FBcUJpQixHQUFyQixDQUF5QixLQUF6QixFQUErQk0sc0JBQS9CLENBQXNELE9BQXRELEVBQStELFFBQS9ELEVBQXlFUCxXQUF6RSxFQUFzRkksV0FBdEYsRUFBbUdELE9BQW5HO0FBQ0gsYUFITDtBQUlIO0FBQ0Q7Ozs7Ozs7O3VDQUtlTixJLEVBQU1DLFMsRUFBVztBQUM1QixpQkFBS0YsT0FBTCxDQUFhRyxJQUFiLG9DQUFrREYsSUFBbEQsMkJBQTBFQyxTQUExRTs7QUFFQSxnQkFBSUUsY0FBY2hCLHFCQUFxQmlCLEdBQXJCLENBQXlCLElBQXpCLEVBQStCQyxrQkFBL0IsQ0FBa0QsV0FBbEQsRUFBK0QsQ0FBL0QsQ0FBbEI7QUFDQSxnQkFBSUMsVUFBVTtBQUNWTixzQkFBTUEsSUFESTtBQUVWQywyQkFBV0E7QUFGRCxhQUFkO0FBSUEsZ0JBQUlNLGNBQWNDLFFBQVFDLEdBQVIsRUFBbEI7O0FBRUF0QixpQ0FBcUJpQixHQUFyQixDQUF5QixJQUF6QixFQUErQk0sc0JBQS9CLENBQXNELFVBQXRELEVBQWtFLFFBQWxFLEVBQTRFUCxXQUE1RSxFQUF5RkksV0FBekYsRUFBc0dELE9BQXRHO0FBQ0giLCJmaWxlIjoiQXJ0aWZhY3RzTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCB7wqBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCB7wqBCb2lsZXJQbGF0ZXNNYW5hZ2VyfSBmcm9tICcuLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XG5pbXBvcnQgeyBJbnF1aXJlck1hbmFnZXIgfSBmcm9tICcuL0lucXVpcmVyTWFuYWdlcic7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuXG5jb25zdCBfYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaW5xdWlyZXJNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBtYW5hZ2VyIGZvciBhcnRpZmFjdHNcbiAqL1xuZXhwb3J0IGNsYXNzIEFydGlmYWN0c01hbmFnZXIge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtJbnF1aXJlck1hbmFnZXJ9IGlucXVpcmVyTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGVzTWFuYWdlcn0gYm9pbGVyUGxhdGVzTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVycyBcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlucXVpcmVyTWFuYWdlciwgYm9pbGVyUGxhdGVzTWFuYWdlciwgZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuc2V0KHRoaXMsIGlucXVpcmVyTWFuYWdlcik7XG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLnNldCh0aGlzLCBib2lsZXJQbGF0ZXNNYW5hZ2VyKTtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjb21tYW5kXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZSBcbiAgICAgKi9cbiAgICBjcmVhdGVDb21tYW5kKG5hbWUsIG5hbWVzcGFjZSkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgY29tbWFuZCB3aXRoIG5hbWUgJyR7bmFtZX0nIGFuZCBuYW1lc3BhY2UgJyR7bmFtZXNwYWNlfSdgKTtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlUeXBlKCdhcnRpZmFjdHMnKVswXTtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgbmFtZXNwYWNlOiBuYW1lc3BhY2VcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgXG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKCdjb21tYW5kJywgJ2NzaGFycCcsIGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBldmVudFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2UgXG4gICAgICovXG4gICAgY3JlYXRlRXZlbnQobmFtZSwgbmFtZXNwYWNlKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyBldmVudCB3aXRoIG5hbWUgJyR7bmFtZX0nIGFuZCBuYW1lc3BhY2UgJyR7bmFtZXNwYWNlfSdgKTtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlUeXBlKCdhcnRpZmFjdHMnKVswXTtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgbmFtZXNwYWNlOiBuYW1lc3BhY2VcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgXG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKCdldmVudCcsICdjc2hhcnAnLCBib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSByZWFkIG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZSBcbiAgICAgKi9cbiAgICBjcmVhdGVSZWFkTW9kZWwobmFtZSwgbmFtZXNwYWNlKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyByZWFkIG1vZGVsIHdpdGggbmFtZSAnJHtuYW1lfScgYW5kIG5hbWVzcGFjZSAnJHtuYW1lc3BhY2V9J2ApO1xuXG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5ib2lsZXJQbGF0ZXNCeVR5cGUoJ2FydGlmYWN0cycpWzBdO1xuICAgICAgICBsZXQgY29udGV4dCA9IHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZVxuICAgICAgICB9O1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgICBcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoJ3JlYWRNb2RlbCcsICdjc2hhcnAnLCBib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gYWdncmVnYXRlIHJvb3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlIFxuICAgICAqL1xuICAgIGNyZWF0ZUFnZ3JlZ2F0ZVJvb3QobmFtZSwgbmFtZXNwYWNlKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyBhZ2dyZWdhdGUgcm9vdCB3aXRoIG5hbWUgJyR7bmFtZX0nIGFuZCBuYW1lc3BhY2UgJyR7bmFtZXNwYWNlfSdgKTtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlUeXBlKCdhcnRpZmFjdHMnKVswXTtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgbmFtZXNwYWNlOiBuYW1lc3BhY2VcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgXG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKCdhZ2dyZWdhdGVSb290JywgJ2NzaGFycCcsIGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHF1ZXJ5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gICAgICovXG4gICAgY3JlYXRlUXVlcnkobGFuZ3VhZ2UpIHtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5VHlwZSgnYXJ0aWZhY3RzJylbMF07XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHByb2Nlc3MuY3dkKCk7XG5cbiAgICAgICAgX2lucXVpcmVyTWFuYWdlci5nZXQodGhpcykucHJvbXB0Rm9yUXVlcnkobGFuZ3VhZ2UpXG4gICAgICAgICAgICAudGhlbihjb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSgncXVlcnknLCAnY3NoYXJwJywgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTsgIFxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHF1ZXJ5IGZvciBhIHNwZWNpZmljIHJlYWQgbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlIFxuICAgICAqL1xuICAgIGNyZWF0ZVF1ZXJ5Rm9yKG5hbWUsIG5hbWVzcGFjZSkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgcXVlcnlmb3Igd2l0aCBuYW1lICcke25hbWV9JyBhbmQgbmFtZXNwYWNlICcke25hbWVzcGFjZX0nYCk7XG5cbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5VHlwZSgnYXJ0aWZhY3RzJylbMF07XG4gICAgICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlXG4gICAgICAgIH07XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICAgIFxuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSgncXVlcnlGb3InLCAnY3NoYXJwJywgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTtcbiAgICB9XG59Il19