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
        value: function createCommand(language) {
            var _this = this;

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var destination = process.cwd();
            _inquirerManager.get(this).promptForCommand(language).then(function (context) {
                _this._logger.info('Creating command with name \'' + context.name + '\' and namespace \'' + context.namespace + '\'');
                _boilerPlatesManager.get(_this).createArtifactInstance('command', language, boilerPlate, destination, context);
            });
        }
        /**
         * Create an event
         * @param {string} name 
         * @param {string} namespace 
         */

    }, {
        key: 'createEvent',
        value: function createEvent(language) {
            var _this2 = this;

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var destination = process.cwd();
            _inquirerManager.get(this).promptForEvent(language).then(function (context) {
                _this2._logger.info('Creating event with name \'' + context.name + '\' and namespace \'' + context.namespace + '\'');
                _boilerPlatesManager.get(_this2).createArtifactInstance('event', language, boilerPlate, destination, context);
            });
        }
        /**
         * Create a read model
         * @param {string} name 
         * @param {string} namespace 
         */

    }, {
        key: 'createReadModel',
        value: function createReadModel(language) {
            var _this3 = this;

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var destination = process.cwd();
            _inquirerManager.get(this).promptForReadModel(language).then(function (context) {
                _this3._logger.info('Creating read model with name \'' + context.name + '\' and namespace \'' + context.namespace + '\'');
                _boilerPlatesManager.get(_this3).createArtifactInstance('readModel', language, boilerPlate, destination, context);
            });
        }
        /**
         * Create an aggregate root
         * @param {string} name 
         * @param {string} namespace 
         */

    }, {
        key: 'createAggregateRoot',
        value: function createAggregateRoot(language) {
            var _this4 = this;

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var destination = process.cwd();
            _inquirerManager.get(this).promptForAggregateRoot(language).then(function (context) {
                _this4._logger.info('Creating aggregate root with name \'' + context.name + '\' and namespace \'' + context.namespace + '\'');
                _boilerPlatesManager.get(_this4).createArtifactInstance('aggregateRoot', language, boilerPlate, destination, context);
            });
        }
        /**
         * Create a query
         * @param {string} language
         */

    }, {
        key: 'createQuery',
        value: function createQuery(language) {
            var _this5 = this;

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var destination = process.cwd();

            _inquirerManager.get(this).promptForQuery(language).then(function (context) {
                _this5._logger.info('Creating query with name \'' + context.name + '\'');
                _boilerPlatesManager.get(_this5).createArtifactInstance('query', language, boilerPlate, destination, context);
            });
        }
        /**
         * Create a query for a specific read model
         * @param {string} language
         */

    }, {
        key: 'createQueryFor',
        value: function createQueryFor(language) {
            var _this6 = this;

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var destination = process.cwd();
            _inquirerManager.get(this).promptForQueryfor(language).then(function (context) {
                _this6._logger.info('Creating query for \'' + context.readModel + '\' with name \'' + context.name + '\'');
                _boilerPlatesManager.get(_this6).createArtifactInstance('queryFor', language, boilerPlate, destination, context);
            });
        }
    }]);
    return ArtifactsManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiX2lucXVpcmVyTWFuYWdlciIsIkFydGlmYWN0c01hbmFnZXIiLCJpbnF1aXJlck1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwibGFuZ3VhZ2UiLCJib2lsZXJQbGF0ZSIsImdldCIsImJvaWxlclBsYXRlc0J5VHlwZSIsImRlc3RpbmF0aW9uIiwicHJvY2VzcyIsImN3ZCIsInByb21wdEZvckNvbW1hbmQiLCJ0aGVuIiwiaW5mbyIsImNvbnRleHQiLCJuYW1lIiwibmFtZXNwYWNlIiwiY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSIsInByb21wdEZvckV2ZW50IiwicHJvbXB0Rm9yUmVhZE1vZGVsIiwicHJvbXB0Rm9yQWdncmVnYXRlUm9vdCIsInByb21wdEZvclF1ZXJ5IiwicHJvbXB0Rm9yUXVlcnlmb3IiLCJyZWFkTW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSx1QkFBdUIsSUFBSUMsT0FBSixFQUE3QixDLENBVkE7Ozs7O0FBV0EsSUFBTUMsV0FBVyxJQUFJRCxPQUFKLEVBQWpCO0FBQ0EsSUFBTUUsY0FBYyxJQUFJRixPQUFKLEVBQXBCO0FBQ0EsSUFBTUcsbUJBQW1CLElBQUlILE9BQUosRUFBekI7O0FBR0E7Ozs7SUFHYUksZ0IsV0FBQUEsZ0I7QUFDVDs7Ozs7Ozs7QUFRQSw4QkFBWUMsZUFBWixFQUE2QkMsbUJBQTdCLEVBQWtEQyxPQUFsRCxFQUEyREMsVUFBM0QsRUFBdUVDLE1BQXZFLEVBQStFO0FBQUE7O0FBQzNFTix5QkFBaUJPLEdBQWpCLENBQXFC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QUE0RUMsV0FBNUUsRUFBeUZHLFdBQXpGLEVBQXNHTSxPQUF0RztBQUNILGFBSkw7QUFLSCIsImZpbGUiOiJBcnRpZmFjdHNNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IHvCoExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHvCoEJvaWxlclBsYXRlc01hbmFnZXJ9IGZyb20gJy4uL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCB7IElucXVpcmVyTWFuYWdlciB9IGZyb20gJy4vSW5xdWlyZXJNYW5hZ2VyJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5cbmNvbnN0IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9pbnF1aXJlck1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIG1hbmFnZXIgZm9yIGFydGlmYWN0c1xuICovXG5leHBvcnQgY2xhc3MgQXJ0aWZhY3RzTWFuYWdlciB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0FwcGxpY2F0aW9uTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0lucXVpcmVyTWFuYWdlcn0gaW5xdWlyZXJNYW5hZ2VyXG4gICAgICogQHBhcmFtIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfSBib2lsZXJQbGF0ZXNNYW5hZ2VyXG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzIFxuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaW5xdWlyZXJNYW5hZ2VyLCBib2lsZXJQbGF0ZXNNYW5hZ2VyLCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2lucXVpcmVyTWFuYWdlci5zZXQodGhpcywgaW5xdWlyZXJNYW5hZ2VyKTtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIGJvaWxlclBsYXRlc01hbmFnZXIpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGNvbW1hbmRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlIFxuICAgICAqL1xuICAgIGNyZWF0ZUNvbW1hbmQobGFuZ3VhZ2UpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5ib2lsZXJQbGF0ZXNCeVR5cGUoJ2FydGlmYWN0cycpWzBdO1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLmdldCh0aGlzKS5wcm9tcHRGb3JDb21tYW5kKGxhbmd1YWdlKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGNvbW1hbmQgd2l0aCBuYW1lICcke2NvbnRleHQubmFtZX0nIGFuZCBuYW1lc3BhY2UgJyR7Y29udGV4dC5uYW1lc3BhY2V9J2ApO1xuICAgICAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKCdjb21tYW5kJywgbGFuZ3VhZ2UsIGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCk7ICBcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gZXZlbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlIFxuICAgICAqL1xuICAgIGNyZWF0ZUV2ZW50KGxhbmd1YWdlKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlUeXBlKCdhcnRpZmFjdHMnKVswXTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgX2lucXVpcmVyTWFuYWdlci5nZXQodGhpcykucHJvbXB0Rm9yRXZlbnQobGFuZ3VhZ2UpXG4gICAgICAgICAgICAudGhlbihjb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgZXZlbnQgd2l0aCBuYW1lICcke2NvbnRleHQubmFtZX0nIGFuZCBuYW1lc3BhY2UgJyR7Y29udGV4dC5uYW1lc3BhY2V9J2ApO1xuICAgICAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKCdldmVudCcsIGxhbmd1YWdlLCBib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpOyAgXG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcmVhZCBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2UgXG4gICAgICovXG4gICAgY3JlYXRlUmVhZE1vZGVsKGxhbmd1YWdlKSB7XG5cbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5VHlwZSgnYXJ0aWZhY3RzJylbMF07XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuZ2V0KHRoaXMpLnByb21wdEZvclJlYWRNb2RlbChsYW5ndWFnZSlcbiAgICAgICAgICAgIC50aGVuKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyByZWFkIG1vZGVsIHdpdGggbmFtZSAnJHtjb250ZXh0Lm5hbWV9JyBhbmQgbmFtZXNwYWNlICcke2NvbnRleHQubmFtZXNwYWNlfSdgKTtcbiAgICAgICAgICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSgncmVhZE1vZGVsJywgbGFuZ3VhZ2UsIGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCk7ICBcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gYWdncmVnYXRlIHJvb3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlIFxuICAgICAqL1xuICAgIGNyZWF0ZUFnZ3JlZ2F0ZVJvb3QobGFuZ3VhZ2UpIHtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlUeXBlKCdhcnRpZmFjdHMnKVswXTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgX2lucXVpcmVyTWFuYWdlci5nZXQodGhpcykucHJvbXB0Rm9yQWdncmVnYXRlUm9vdChsYW5ndWFnZSlcbiAgICAgICAgICAgIC50aGVuKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyBhZ2dyZWdhdGUgcm9vdCB3aXRoIG5hbWUgJyR7Y29udGV4dC5uYW1lfScgYW5kIG5hbWVzcGFjZSAnJHtjb250ZXh0Lm5hbWVzcGFjZX0nYCk7XG4gICAgICAgICAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoJ2FnZ3JlZ2F0ZVJvb3QnLCBsYW5ndWFnZSwgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTsgIFxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHF1ZXJ5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gICAgICovXG4gICAgY3JlYXRlUXVlcnkobGFuZ3VhZ2UpIHtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlUeXBlKCdhcnRpZmFjdHMnKVswXTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcHJvY2Vzcy5jd2QoKTtcblxuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLmdldCh0aGlzKS5wcm9tcHRGb3JRdWVyeShsYW5ndWFnZSlcbiAgICAgICAgICAgIC50aGVuKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyBxdWVyeSB3aXRoIG5hbWUgJyR7Y29udGV4dC5uYW1lfSdgKVxuICAgICAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKCdxdWVyeScsIGxhbmd1YWdlLCBib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpOyAgXG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcXVlcnkgZm9yIGEgc3BlY2lmaWMgcmVhZCBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGNyZWF0ZVF1ZXJ5Rm9yKGxhbmd1YWdlKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlUeXBlKCdhcnRpZmFjdHMnKVswXTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgX2lucXVpcmVyTWFuYWdlci5nZXQodGhpcykucHJvbXB0Rm9yUXVlcnlmb3IobGFuZ3VhZ2UpXG4gICAgICAgICAgICAudGhlbihjb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgcXVlcnkgZm9yICcke2NvbnRleHQucmVhZE1vZGVsfScgd2l0aCBuYW1lICcke2NvbnRleHQubmFtZX0nYCk7XG4gICAgICAgICAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoJ3F1ZXJ5Rm9yJywgbGFuZ3VhZ2UsIGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCk7ICBcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn0iXX0=