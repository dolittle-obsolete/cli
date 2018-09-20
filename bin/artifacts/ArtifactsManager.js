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

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var _boilerPlatesManager = new WeakMap();
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

    (0, _createClass3.default)(ArtifactsManager, [{
        key: '_getNearestBoundedContextConfig',
        value: function _getNearestBoundedContextConfig() {
            var boundedContextConfigPath = _global2.default.getNearestBoundedContextConfig();

            if (boundedContextConfigPath === "") {
                this._logger.error('bounded-context.json was not found. Cannot create artifacts. Run dolittle create boundedcontext to create a new bounded context from scratch');
                process.exit(1);
            }
            this._logger.info('Using bounded-context.json at path \'' + boundedContextConfigPath + '\'');

            return JSON.parse(_fileSystem.get(this).readFileSync(boundedContextConfigPath, 'utf8'));
        }
    }, {
        key: '_getArtifactBoilerPlateByLanguageAndType',
        value: function _getArtifactBoilerPlateByLanguageAndType(language, type) {
            var boilerPlates = _boilerPlatesManager.get(this).boilerPlatesByLanguageAndType(language, type);
            if (boilerPlates === null || boilerPlates.length === 0) {
                this._logger.error('Could not find a boilerplate.json configuration for language: ' + language + ' and type: ' + type);
                process.exit(1);
            }
            if (boilerPlates.length > 1) {
                this._logger.error('Found more than one boilerplate.json configuration for language: ' + language + ' and type: ' + type);
                process.exit(1);
            }
            return boilerPlates[0];
        }
        /**
         * Create a command
         * @param {any} flags 
         */

    }, {
        key: 'createCommand',
        value: function createCommand(flags) {
            var _this = this;

            var boundedContextConfig = this._getNearestBoundedContextConfig();
            flags.language = boundedContextConfig.language;
            var boilerPlate = this._getArtifactBoilerPlateByLanguageAndType(flags.language, 'command');
            var destination = process.cwd();
            _inquirerManager.get(this).promptForCommand(flags).then(function (context) {
                _this._logger.info('Creating command with name \'' + context.name + '\' and namespace \'' + context.namespace + '\'');
                _boilerPlatesManager.get(_this).createArtifactInstance('command', flags.language, boilerPlate, destination, context);
            });
        }
        /**
         * Create an event
         * @param {any} flags
         */

    }, {
        key: 'createEvent',
        value: function createEvent(flags) {
            var _this2 = this;

            var boundedContextConfig = this._getNearestBoundedContextConfig();
            flags.language = boundedContextConfig.language;
            var boilerPlate = this._getArtifactBoilerPlateByLanguageAndType(flags.language, 'command');
            var destination = process.cwd();

            _inquirerManager.get(this).promptForEvent(flags).then(function (context) {
                _this2._logger.info('Creating event with name \'' + context.name + '\' and namespace \'' + context.namespace + '\'');
                _boilerPlatesManager.get(_this2).createArtifactInstance('event', flags.language, boilerPlate, destination, context);
            });
        }
        /**
         * Create a read model
         * @param {any} flags
         */

    }, {
        key: 'createReadModel',
        value: function createReadModel(flags) {
            var _this3 = this;

            var boundedContextConfig = this._getNearestBoundedContextConfig();
            flags.language = boundedContextConfig.language;
            var boilerPlate = this._getArtifactBoilerPlateByLanguageAndType(flags.language, 'command');
            var destination = process.cwd();

            _inquirerManager.get(this).promptForReadModel(flags).then(function (context) {
                _this3._logger.info('Creating read model with name \'' + context.name + '\' and namespace \'' + context.namespace + '\'');
                _boilerPlatesManager.get(_this3).createArtifactInstance('readModel', flags.language, boilerPlate, destination, context);
            });
        }
        /**
         * Create an aggregate root
         * @param {any} flags
         */

    }, {
        key: 'createAggregateRoot',
        value: function createAggregateRoot(flags) {
            var _this4 = this;

            var boundedContextConfig = this._getNearestBoundedContextConfig();
            flags.language = boundedContextConfig.language;
            var boilerPlate = this._getArtifactBoilerPlateByLanguageAndType(flags.language, 'command');
            var destination = process.cwd();

            _inquirerManager.get(this).promptForAggregateRoot(flags).then(function (context) {
                _this4._logger.info('Creating aggregate root with name \'' + context.name + '\' and namespace \'' + context.namespace + '\'');
                _boilerPlatesManager.get(_this4).createArtifactInstance('aggregateRoot', flags.language, boilerPlate, destination, context);
            });
        }
        /**
         * Create a query
         * @param {any} flags
         */

    }, {
        key: 'createQuery',
        value: function createQuery(flags) {
            var _this5 = this;

            var boundedContextConfig = this._getNearestBoundedContextConfig();
            flags.language = boundedContextConfig.language;
            var boilerPlate = this._getArtifactBoilerPlateByLanguageAndType(flags.language, 'command');
            var destination = process.cwd();

            _inquirerManager.get(this).promptForQuery(flags).then(function (context) {
                _this5._logger.info('Creating query with name \'' + context.name + '\'');
                _boilerPlatesManager.get(_this5).createArtifactInstance('query', flags.language, boilerPlate, destination, context);
            });
        }
        /**
         * Create a query for a specific read model
         * @param {any} flags
         */

    }, {
        key: 'createQueryFor',
        value: function createQueryFor(flags) {
            var _this6 = this;

            var boundedContextConfig = this._getNearestBoundedContextConfig();
            flags.language = boundedContextConfig.language;
            var boilerPlate = this._getArtifactBoilerPlateByLanguageAndType(flags.language, 'command');
            var destination = process.cwd();

            _inquirerManager.get(this).promptForQueryfor(flags).then(function (context) {
                _this6._logger.info('Creating query for \'' + context.readModel + '\' with name \'' + context.name + '\'');
                _boilerPlatesManager.get(_this6).createArtifactInstance('queryFor', flags.language, boilerPlate, destination, context);
            });
        }
    }]);
    return ArtifactsManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiX2lucXVpcmVyTWFuYWdlciIsIkFydGlmYWN0c01hbmFnZXIiLCJpbnF1aXJlck1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwiYm91bmRlZENvbnRleHRDb25maWdQYXRoIiwiZ2xvYmFsIiwiZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnIiwiZXJyb3IiLCJwcm9jZXNzIiwiZXhpdCIsImluZm8iLCJKU09OIiwicGFyc2UiLCJnZXQiLCJyZWFkRmlsZVN5bmMiLCJsYW5ndWFnZSIsInR5cGUiLCJib2lsZXJQbGF0ZXMiLCJib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSIsImxlbmd0aCIsImZsYWdzIiwiYm91bmRlZENvbnRleHRDb25maWciLCJfZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnIiwiYm9pbGVyUGxhdGUiLCJfZ2V0QXJ0aWZhY3RCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2VBbmRUeXBlIiwiZGVzdGluYXRpb24iLCJjd2QiLCJwcm9tcHRGb3JDb21tYW5kIiwidGhlbiIsImNvbnRleHQiLCJuYW1lIiwibmFtZXNwYWNlIiwiY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSIsInByb21wdEZvckV2ZW50IiwicHJvbXB0Rm9yUmVhZE1vZGVsIiwicHJvbXB0Rm9yQWdncmVnYXRlUm9vdCIsInByb21wdEZvclF1ZXJ5IiwicHJvbXB0Rm9yUXVlcnlmb3IiLCJyZWFkTW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQVRBOzs7O0FBV0EsSUFBTUEsdUJB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QStEWixNQUFNTCxRQUFyRSxFQUErRVEsV0FBL0UsRUFBNEZFLFdBQTVGLEVBQXlHSSxPQUF6RztBQUNILGFBSkw7QUFLSDtBQUNEOzs7Ozs7O3VDQUllVCxLLEVBQU87QUFBQTs7QUFDbEIsZ0JBQUlDLHVCQUF1QixLQUFLQywrQkFBTCxFQUEzQjtBQUNBRixrQkFBTUwsUUFBTixHQUFpQk0scUJBQXFCTixRQUF0QztBQUNBLGdCQUFJUSxjQUFjLEtBQUtDLHdDQUFMLENBQThDSixNQUFNTCxRQUFwRCxFQUE4RCxTQUE5RCxDQUFsQjtBQUNBLGdCQUFJVSxjQUFjakIsUUFBUWtCLEdBQVIsRUFBbEI7O0FBRUEvQiw2QkFBaUJrQixHQUFqQixDQUFxQixJQUFyQixFQUEyQndCLGlCQUEzQixDQUE2Q2pCLEtBQTdDLEVBQ0tRLElBREwsQ0FDVSxtQkFBVztBQUNiLHVCQUFLekIsT0FBTCxDQUFhTyxJQUFiLDJCQUF5Q21CLFFBQVFTLFNBQWpELHVCQUEwRVQsUUFBUUMsSUFBbEY7QUFDQXZDLHFDQUFxQnNCLEdBQXJCLENBQXlCLE1BQXpCLEVBQStCbUIsc0JBQS9CLENBQXNELFVBQXRELEVBQWtFWixNQUFNTCxRQUF4RSxFQUFrRlEsV0FBbEYsRUFBK0ZFLFdBQS9GLEVBQTRHSSxPQUE1RztBQUNILGFBSkw7QUFLSCIsImZpbGUiOiJBcnRpZmFjdHNNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IHvCoExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHvCoEJvaWxlclBsYXRlc01hbmFnZXJ9IGZyb20gJy4uL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCB7IElucXVpcmVyTWFuYWdlciB9IGZyb20gJy4vSW5xdWlyZXJNYW5hZ2VyJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCc7XG5cbmNvbnN0IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9pbnF1aXJlck1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBtYW5hZ2VyIGZvciBhcnRpZmFjdHNcbiAqL1xuZXhwb3J0IGNsYXNzIEFydGlmYWN0c01hbmFnZXIge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtJbnF1aXJlck1hbmFnZXJ9IGlucXVpcmVyTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGVzTWFuYWdlcn0gYm9pbGVyUGxhdGVzTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVycyBcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlucXVpcmVyTWFuYWdlciwgYm9pbGVyUGxhdGVzTWFuYWdlciwgZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuc2V0KHRoaXMsIGlucXVpcmVyTWFuYWdlcik7XG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLnNldCh0aGlzLCBib2lsZXJQbGF0ZXNNYW5hZ2VyKTtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICBfZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnKCkge1xuICAgICAgICBsZXQgYm91bmRlZENvbnRleHRDb25maWdQYXRoID0gZ2xvYmFsLmdldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZygpO1xuICAgIFxuICAgICAgICBpZiAoYm91bmRlZENvbnRleHRDb25maWdQYXRoID09PSBcIlwiKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoJ2JvdW5kZWQtY29udGV4dC5qc29uIHdhcyBub3QgZm91bmQuIENhbm5vdCBjcmVhdGUgYXJ0aWZhY3RzLiBSdW4gZG9saXR0bGUgY3JlYXRlIGJvdW5kZWRjb250ZXh0IHRvIGNyZWF0ZSBhIG5ldyBib3VuZGVkIGNvbnRleHQgZnJvbSBzY3JhdGNoJyk7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYFVzaW5nIGJvdW5kZWQtY29udGV4dC5qc29uIGF0IHBhdGggJyR7Ym91bmRlZENvbnRleHRDb25maWdQYXRofSdgKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhib3VuZGVkQ29udGV4dENvbmZpZ1BhdGgsICd1dGY4JykpO1xuICAgIH1cbiAgICBfZ2V0QXJ0aWZhY3RCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2VBbmRUeXBlKGxhbmd1YWdlLCB0eXBlKSB7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXMgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUobGFuZ3VhZ2UsIHR5cGUpO1xuICAgICAgICBpZiAoYm9pbGVyUGxhdGVzID09PSBudWxsIHx8IGJvaWxlclBsYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgQ291bGQgbm90IGZpbmQgYSBib2lsZXJwbGF0ZS5qc29uIGNvbmZpZ3VyYXRpb24gZm9yIGxhbmd1YWdlOiAke2xhbmd1YWdlfSBhbmQgdHlwZTogJHt0eXBlfWApXG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvaWxlclBsYXRlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYEZvdW5kIG1vcmUgdGhhbiBvbmUgYm9pbGVycGxhdGUuanNvbiBjb25maWd1cmF0aW9uIGZvciBsYW5ndWFnZTogJHtsYW5ndWFnZX0gYW5kIHR5cGU6ICR7dHlwZX1gKVxuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib2lsZXJQbGF0ZXNbMF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGNvbW1hbmRcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3MgXG4gICAgICovXG4gICAgY3JlYXRlQ29tbWFuZChmbGFncykge1xuICAgICAgICBsZXQgYm91bmRlZENvbnRleHRDb25maWcgPSB0aGlzLl9nZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWcoKTtcbiAgICAgICAgZmxhZ3MubGFuZ3VhZ2UgPSBib3VuZGVkQ29udGV4dENvbmZpZy5sYW5ndWFnZTtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gdGhpcy5fZ2V0QXJ0aWZhY3RCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2VBbmRUeXBlKGZsYWdzLmxhbmd1YWdlLCAnY29tbWFuZCcpO1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLmdldCh0aGlzKS5wcm9tcHRGb3JDb21tYW5kKGZsYWdzKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGNvbW1hbmQgd2l0aCBuYW1lICcke2NvbnRleHQubmFtZX0nIGFuZCBuYW1lc3BhY2UgJyR7Y29udGV4dC5uYW1lc3BhY2V9J2ApO1xuICAgICAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKCdjb21tYW5kJywgZmxhZ3MubGFuZ3VhZ2UsIGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCk7ICBcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gZXZlbnRcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3NcbiAgICAgKi9cbiAgICBjcmVhdGVFdmVudChmbGFncykge1xuICAgICAgICBcbiAgICAgICAgbGV0IGJvdW5kZWRDb250ZXh0Q29uZmlnID0gdGhpcy5fZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnKCk7XG4gICAgICAgIGZsYWdzLmxhbmd1YWdlID0gYm91bmRlZENvbnRleHRDb25maWcubGFuZ3VhZ2U7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IHRoaXMuX2dldEFydGlmYWN0Qm9pbGVyUGxhdGVCeUxhbmd1YWdlQW5kVHlwZShmbGFncy5sYW5ndWFnZSwgJ2NvbW1hbmQnKTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcHJvY2Vzcy5jd2QoKTtcblxuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLmdldCh0aGlzKS5wcm9tcHRGb3JFdmVudChmbGFncylcbiAgICAgICAgICAgIC50aGVuKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyBldmVudCB3aXRoIG5hbWUgJyR7Y29udGV4dC5uYW1lfScgYW5kIG5hbWVzcGFjZSAnJHtjb250ZXh0Lm5hbWVzcGFjZX0nYCk7XG4gICAgICAgICAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoJ2V2ZW50JywgZmxhZ3MubGFuZ3VhZ2UsIGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCk7ICBcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSByZWFkIG1vZGVsXG4gICAgICogQHBhcmFtIHthbnl9IGZsYWdzXG4gICAgICovXG4gICAgY3JlYXRlUmVhZE1vZGVsKGZsYWdzKSB7XG5cbiAgICAgICAgbGV0IGJvdW5kZWRDb250ZXh0Q29uZmlnID0gdGhpcy5fZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnKCk7XG4gICAgICAgIGZsYWdzLmxhbmd1YWdlID0gYm91bmRlZENvbnRleHRDb25maWcubGFuZ3VhZ2U7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IHRoaXMuX2dldEFydGlmYWN0Qm9pbGVyUGxhdGVCeUxhbmd1YWdlQW5kVHlwZShmbGFncy5sYW5ndWFnZSwgJ2NvbW1hbmQnKTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcHJvY2Vzcy5jd2QoKTtcblxuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLmdldCh0aGlzKS5wcm9tcHRGb3JSZWFkTW9kZWwoZmxhZ3MpXG4gICAgICAgICAgICAudGhlbihjb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgcmVhZCBtb2RlbCB3aXRoIG5hbWUgJyR7Y29udGV4dC5uYW1lfScgYW5kIG5hbWVzcGFjZSAnJHtjb250ZXh0Lm5hbWVzcGFjZX0nYCk7XG4gICAgICAgICAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoJ3JlYWRNb2RlbCcsIGZsYWdzLmxhbmd1YWdlLCBib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpOyAgXG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGFnZ3JlZ2F0ZSByb290XG4gICAgICogQHBhcmFtIHthbnl9IGZsYWdzXG4gICAgICovXG4gICAgY3JlYXRlQWdncmVnYXRlUm9vdChmbGFncykge1xuXG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dENvbmZpZyA9IHRoaXMuX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZygpO1xuICAgICAgICBmbGFncy5sYW5ndWFnZSA9IGJvdW5kZWRDb250ZXh0Q29uZmlnLmxhbmd1YWdlO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSB0aGlzLl9nZXRBcnRpZmFjdEJvaWxlclBsYXRlQnlMYW5ndWFnZUFuZFR5cGUoZmxhZ3MubGFuZ3VhZ2UsICdjb21tYW5kJyk7XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHByb2Nlc3MuY3dkKCk7XG5cbiAgICAgICAgX2lucXVpcmVyTWFuYWdlci5nZXQodGhpcykucHJvbXB0Rm9yQWdncmVnYXRlUm9vdChmbGFncylcbiAgICAgICAgICAgIC50aGVuKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyBhZ2dyZWdhdGUgcm9vdCB3aXRoIG5hbWUgJyR7Y29udGV4dC5uYW1lfScgYW5kIG5hbWVzcGFjZSAnJHtjb250ZXh0Lm5hbWVzcGFjZX0nYCk7XG4gICAgICAgICAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoJ2FnZ3JlZ2F0ZVJvb3QnLCBmbGFncy5sYW5ndWFnZSwgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTsgIFxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHF1ZXJ5XG4gICAgICogQHBhcmFtIHthbnl9IGZsYWdzXG4gICAgICovXG4gICAgY3JlYXRlUXVlcnkoZmxhZ3MpIHtcblxuICAgICAgICBsZXQgYm91bmRlZENvbnRleHRDb25maWcgPSB0aGlzLl9nZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWcoKTtcbiAgICAgICAgZmxhZ3MubGFuZ3VhZ2UgPSBib3VuZGVkQ29udGV4dENvbmZpZy5sYW5ndWFnZTtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gdGhpcy5fZ2V0QXJ0aWZhY3RCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2VBbmRUeXBlKGZsYWdzLmxhbmd1YWdlLCAnY29tbWFuZCcpO1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuZ2V0KHRoaXMpLnByb21wdEZvclF1ZXJ5KGZsYWdzKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIHF1ZXJ5IHdpdGggbmFtZSAnJHtjb250ZXh0Lm5hbWV9J2ApXG4gICAgICAgICAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoJ3F1ZXJ5JywgZmxhZ3MubGFuZ3VhZ2UsIGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCk7ICBcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBxdWVyeSBmb3IgYSBzcGVjaWZpYyByZWFkIG1vZGVsXG4gICAgICogQHBhcmFtIHthbnl9IGZsYWdzXG4gICAgICovXG4gICAgY3JlYXRlUXVlcnlGb3IoZmxhZ3MpIHtcbiAgICAgICAgbGV0IGJvdW5kZWRDb250ZXh0Q29uZmlnID0gdGhpcy5fZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnKCk7XG4gICAgICAgIGZsYWdzLmxhbmd1YWdlID0gYm91bmRlZENvbnRleHRDb25maWcubGFuZ3VhZ2U7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IHRoaXMuX2dldEFydGlmYWN0Qm9pbGVyUGxhdGVCeUxhbmd1YWdlQW5kVHlwZShmbGFncy5sYW5ndWFnZSwgJ2NvbW1hbmQnKTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcHJvY2Vzcy5jd2QoKTtcblxuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLmdldCh0aGlzKS5wcm9tcHRGb3JRdWVyeWZvcihmbGFncylcbiAgICAgICAgICAgIC50aGVuKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyBxdWVyeSBmb3IgJyR7Y29udGV4dC5yZWFkTW9kZWx9JyB3aXRoIG5hbWUgJyR7Y29udGV4dC5uYW1lfSdgKTtcbiAgICAgICAgICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSgncXVlcnlGb3InLCBmbGFncy5sYW5ndWFnZSwgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTsgIFxuICAgICAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==