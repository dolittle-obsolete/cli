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

var _BoilerPlate = require('../boilerPlates/BoilerPlate');

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
     * Searches the file directories for the bounded-context.json configuration file recursively by going upwards in the hierarchy
     * @return {any} bounded context configuration object
     */


    (0, _createClass3.default)(ArtifactsManager, [{
        key: '_getNearestBoundedContextConfig',
        value: function _getNearestBoundedContextConfig() {
            var boundedContextConfigPath = _global2.default.getNearestBoundedContextConfig();

            if (boundedContextConfigPath === "") {
                this._logger.error('bounded-context.json was not found. Cannot create artifacts. Run dolittle create boundedcontext to create a new bounded context from scratch');
                process.exit(1);
            }

            this._logger.info('Using bounded-context.json at path \'' + boundedContextConfigPath + '\'');

            var boundedContext = JSON.parse(_fileSystem.get(this).readFileSync(boundedContextConfigPath, 'utf8'));
            this._validateBoundedContext(boundedContext);
            return boundedContext;
        }
        /**
         * Validates the fields of the parsed bounded-context.json object 
         * @param {any} boundedContext 
         */

    }, {
        key: '_validateBoundedContext',
        value: function _validateBoundedContext(boundedContext) {
            if (boundedContext.language === undefined || boundedContext.language === null || boundedContext.language === '') {
                this._logger.error('The bounded-context.json configuration is missing "language"');
                process.exit(1);
            }
        }
        /**
         * Retrieves the boilerplate.json configuration for artifacts with the given language
         * @param {string} language 
         * @return {BoilerPlate} The Boilerplate with of the given language
         */

    }, {
        key: '_getArtifactsBoilerPlateByLanguage',
        value: function _getArtifactsBoilerPlateByLanguage(language) {
            var type = 'artifacts';

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
            var boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
            var destination = process.cwd();
            _inquirerManager.get(this).promptForCommand(flags).then(function (context) {
                _this._logger.info('Creating command with name \'' + context.name + '\' and namespace \'' + context.namespace + '\'');
                _boilerPlatesManager.get(_this).createArtifactInstance('command', flags.language, boilerPlate, destination, context);
            });
        }
        /**
         * Create a command handler
         * @param {any} flags 
         */

    }, {
        key: 'createCommandHandler',
        value: function createCommandHandler(flags) {
            var _this2 = this;

            var boundedContextConfig = this._getNearestBoundedContextConfig();
            flags.language = boundedContextConfig.language;
            var boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
            var destination = process.cwd();

            _inquirerManager.get(this).promptForCommandHandler(flags).then(function (context) {
                _this2._logger.info('Creating command handler with name \'' + context.name + '\' and namespace \'' + context.namespace + '\'');
                _boilerPlatesManager.get(_this2).createArtifactInstance('commandHandler', flags.language, boilerPlate, destination, context);
            });
        }
        /**
         * Create an event
         * @param {any} flags
         */

    }, {
        key: 'createEvent',
        value: function createEvent(flags) {
            var _this3 = this;

            var boundedContextConfig = this._getNearestBoundedContextConfig();
            flags.language = boundedContextConfig.language;
            var boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
            var destination = process.cwd();

            _inquirerManager.get(this).promptForEvent(flags).then(function (context) {
                _this3._logger.info('Creating event with name \'' + context.name + '\' and namespace \'' + context.namespace + '\'');
                _boilerPlatesManager.get(_this3).createArtifactInstance('event', flags.language, boilerPlate, destination, context);
            });
        }
        /**
         * Create an event processor
         * @param {any} flags
         */

    }, {
        key: 'createEventProcessor',
        value: function createEventProcessor(flags) {
            var _this4 = this;

            var boundedContextConfig = this._getNearestBoundedContextConfig();
            flags.language = boundedContextConfig.language;
            var boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
            var destination = process.cwd();

            _inquirerManager.get(this).promptForEventProcessor(flags).then(function (context) {
                _this4._logger.info('Creating event processor with name \'' + context.name + '\' and namespace \'' + context.namespace + '\'');
                _boilerPlatesManager.get(_this4).createArtifactInstance('eventProcessor', flags.language, boilerPlate, destination, context);
            });
        }
        /**
         * Create a read model
         * @param {any} flags
         */

    }, {
        key: 'createReadModel',
        value: function createReadModel(flags) {
            var _this5 = this;

            var boundedContextConfig = this._getNearestBoundedContextConfig();
            flags.language = boundedContextConfig.language;
            var boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
            var destination = process.cwd();

            _inquirerManager.get(this).promptForReadModel(flags).then(function (context) {
                _this5._logger.info('Creating read model with name \'' + context.name + '\' and namespace \'' + context.namespace + '\'');
                _boilerPlatesManager.get(_this5).createArtifactInstance('readModel', flags.language, boilerPlate, destination, context);
            });
        }
        /**
         * Create an aggregate root
         * @param {any} flags
         */

    }, {
        key: 'createAggregateRoot',
        value: function createAggregateRoot(flags) {
            var _this6 = this;

            var boundedContextConfig = this._getNearestBoundedContextConfig();
            flags.language = boundedContextConfig.language;
            var boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
            var destination = process.cwd();

            _inquirerManager.get(this).promptForAggregateRoot(flags).then(function (context) {
                _this6._logger.info('Creating aggregate root with name \'' + context.name + '\' and namespace \'' + context.namespace + '\'');
                _boilerPlatesManager.get(_this6).createArtifactInstance('aggregateRoot', flags.language, boilerPlate, destination, context);
            });
        }
        /**
         * Create a query
         * @param {any} flags
         */

    }, {
        key: 'createQuery',
        value: function createQuery(flags) {
            var _this7 = this;

            var boundedContextConfig = this._getNearestBoundedContextConfig();
            flags.language = boundedContextConfig.language;
            var boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
            var destination = process.cwd();

            _inquirerManager.get(this).promptForQuery(flags).then(function (context) {
                _this7._logger.info('Creating query with name \'' + context.name + '\'');
                _boilerPlatesManager.get(_this7).createArtifactInstance('query', flags.language, boilerPlate, destination, context);
            });
        }
        /**
         * Create a query for a specific read model
         * @param {any} flags
         */

    }, {
        key: 'createQueryFor',
        value: function createQueryFor(flags) {
            var _this8 = this;

            var boundedContextConfig = this._getNearestBoundedContextConfig();
            flags.language = boundedContextConfig.language;
            var boilerPlate = this._getArtifactsBoilerPlateByLanguage(flags.language);
            var destination = process.cwd();

            _inquirerManager.get(this).promptForQueryfor(flags).then(function (context) {
                _this8._logger.info('Creating query for \'' + context.readModel + '\' with name \'' + context.name + '\'');
                _boilerPlatesManager.get(_this8).createArtifactInstance('queryFor', flags.language, boilerPlate, destination, context);
            });
        }
    }]);
    return ArtifactsManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiX2lucXVpcmVyTWFuYWdlciIsIkFydGlmYWN0c01hbmFnZXIiLCJpbnF1aXJlck1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwiYm91bmRlZENvbnRleHRDb25maWdQYXRoIiwiZ2xvYmFsIiwiZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnIiwiZXJyb3IiLCJwcm9jZXNzIiwiZXhpdCIsImluZm8iLCJib3VuZGVkQ29udGV4dCIsIkpTT04iLCJwYXJzZSIsImdldCIsInJlYWRGaWxlU3luYyIsIl92YWxpZGF0ZUJvdW5kZWRDb250ZXh0IiwibGFuZ3VhZ2UiLCJ1bmRlZmluZWQiLCJ0eXBlIiwiYm9pbGVyUGxhdGVzIiwiYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUiLCJsZW5ndGgiLCJmbGFncyIsImJvdW5kZWRDb250ZXh0Q29uZmlnIiwiX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyIsImJvaWxlclBsYXRlIiwiX2dldEFydGlmYWN0c0JvaWxlclBsYXRlQnlMYW5ndWFnZSIsImRlc3RpbmF0aW9uIiwiY3dkIiwicHJvbXB0Rm9yQ29tbWFuZCIsInRoZW4iLCJjb250ZXh0IiwibmFtZSIsIm5hbWVzcGFjZSIsImNyZWF0ZUFydGlmYWN0SW5zdGFuY2UiLCJwcm9tcHRGb3JDb21tYW5kSGFuZGxlciIsInByb21wdEZvckV2ZW50IiwicHJvbXB0Rm9yRXZlbnRQcm9jZXNzb3IiLCJwcm9tcHRGb3JSZWFkTW9kZWwiLCJwcm9tcHRGb3JBZ2dyZWdhdGVSb290IiwicHJvbXB0Rm9yUXVlcnkiLCJwcm9tcHRGb3JRdWVyeWZvciIsInJl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cUIsc0JBQS9CLENBQXNELFVBQXRELEVBQWtFWixNQUFNTixRQUF4RSxFQUFrRlMsV0FBbEYsRUFBK0ZFLFdBQS9GLEVBQTRHSSxPQUE1RztBQUNILGFBSkw7QUFLSCIsImZpbGUiOiJBcnRpZmFjdHNNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IHvCoExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHvCoEJvaWxlclBsYXRlc01hbmFnZXJ9IGZyb20gJy4uL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCB7IElucXVpcmVyTWFuYWdlciB9IGZyb20gJy4vSW5xdWlyZXJNYW5hZ2VyJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgeyBCb2lsZXJQbGF0ZSB9IGZyb20gJy4uL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZSc7XG5cbmNvbnN0IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9pbnF1aXJlck1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBtYW5hZ2VyIGZvciBhcnRpZmFjdHNcbiAqL1xuZXhwb3J0IGNsYXNzIEFydGlmYWN0c01hbmFnZXIge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtJbnF1aXJlck1hbmFnZXJ9IGlucXVpcmVyTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGVzTWFuYWdlcn0gYm9pbGVyUGxhdGVzTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVycyBcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlucXVpcmVyTWFuYWdlciwgYm9pbGVyUGxhdGVzTWFuYWdlciwgZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuc2V0KHRoaXMsIGlucXVpcmVyTWFuYWdlcik7XG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLnNldCh0aGlzLCBib2lsZXJQbGF0ZXNNYW5hZ2VyKTtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZWFyY2hlcyB0aGUgZmlsZSBkaXJlY3RvcmllcyBmb3IgdGhlIGJvdW5kZWQtY29udGV4dC5qc29uIGNvbmZpZ3VyYXRpb24gZmlsZSByZWN1cnNpdmVseSBieSBnb2luZyB1cHdhcmRzIGluIHRoZSBoaWVyYXJjaHlcbiAgICAgKiBAcmV0dXJuIHthbnl9IGJvdW5kZWQgY29udGV4dCBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICAqL1xuICAgIF9nZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWcoKSB7XG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dENvbmZpZ1BhdGggPSBnbG9iYWwuZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnKCk7XG4gICAgXG4gICAgICAgIGlmIChib3VuZGVkQ29udGV4dENvbmZpZ1BhdGggPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcignYm91bmRlZC1jb250ZXh0Lmpzb24gd2FzIG5vdCBmb3VuZC4gQ2Fubm90IGNyZWF0ZSBhcnRpZmFjdHMuIFJ1biBkb2xpdHRsZSBjcmVhdGUgYm91bmRlZGNvbnRleHQgdG8gY3JlYXRlIGEgbmV3IGJvdW5kZWQgY29udGV4dCBmcm9tIHNjcmF0Y2gnKTtcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYFVzaW5nIGJvdW5kZWQtY29udGV4dC5qc29uIGF0IHBhdGggJyR7Ym91bmRlZENvbnRleHRDb25maWdQYXRofSdgKTtcblxuICAgICAgICBsZXQgYm91bmRlZENvbnRleHQgPSBKU09OLnBhcnNlKF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoYm91bmRlZENvbnRleHRDb25maWdQYXRoLCAndXRmOCcpKTtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGVCb3VuZGVkQ29udGV4dChib3VuZGVkQ29udGV4dCk7XG4gICAgICAgIHJldHVybiBib3VuZGVkQ29udGV4dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIHRoZSBmaWVsZHMgb2YgdGhlIHBhcnNlZCBib3VuZGVkLWNvbnRleHQuanNvbiBvYmplY3QgXG4gICAgICogQHBhcmFtIHthbnl9IGJvdW5kZWRDb250ZXh0IFxuICAgICAqL1xuICAgIF92YWxpZGF0ZUJvdW5kZWRDb250ZXh0KGJvdW5kZWRDb250ZXh0KSB7XG4gICAgICAgIGlmIChib3VuZGVkQ29udGV4dC5sYW5ndWFnZSA9PT0gdW5kZWZpbmVkIHx8IGJvdW5kZWRDb250ZXh0Lmxhbmd1YWdlID09PSBudWxsIHx8IGJvdW5kZWRDb250ZXh0Lmxhbmd1YWdlID09PSAnJykge1xuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmVycm9yKCdUaGUgYm91bmRlZC1jb250ZXh0Lmpzb24gY29uZmlndXJhdGlvbiBpcyBtaXNzaW5nIFwibGFuZ3VhZ2VcIicpO1xuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgYm9pbGVycGxhdGUuanNvbiBjb25maWd1cmF0aW9uIGZvciBhcnRpZmFjdHMgd2l0aCB0aGUgZ2l2ZW4gbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgXG4gICAgICogQHJldHVybiB7Qm9pbGVyUGxhdGV9IFRoZSBCb2lsZXJwbGF0ZSB3aXRoIG9mIHRoZSBnaXZlbiBsYW5ndWFnZVxuICAgICAqL1xuICAgIF9nZXRBcnRpZmFjdHNCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2UobGFuZ3VhZ2UpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9ICdhcnRpZmFjdHMnO1xuXG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXMgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUobGFuZ3VhZ2UsIHR5cGUpO1xuICAgICAgICBpZiAoYm9pbGVyUGxhdGVzID09PSBudWxsIHx8IGJvaWxlclBsYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgQ291bGQgbm90IGZpbmQgYSBib2lsZXJwbGF0ZS5qc29uIGNvbmZpZ3VyYXRpb24gZm9yIGxhbmd1YWdlOiAke2xhbmd1YWdlfSBhbmQgdHlwZTogJHt0eXBlfWApXG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvaWxlclBsYXRlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYEZvdW5kIG1vcmUgdGhhbiBvbmUgYm9pbGVycGxhdGUuanNvbiBjb25maWd1cmF0aW9uIGZvciBsYW5ndWFnZTogJHtsYW5ndWFnZX0gYW5kIHR5cGU6ICR7dHlwZX1gKVxuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib2lsZXJQbGF0ZXNbMF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGNvbW1hbmRcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3MgXG4gICAgICovXG4gICAgY3JlYXRlQ29tbWFuZChmbGFncykge1xuXG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dENvbmZpZyA9IHRoaXMuX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZygpO1xuICAgICAgICBmbGFncy5sYW5ndWFnZSA9IGJvdW5kZWRDb250ZXh0Q29uZmlnLmxhbmd1YWdlO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSB0aGlzLl9nZXRBcnRpZmFjdHNCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2UoZmxhZ3MubGFuZ3VhZ2UpO1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLmdldCh0aGlzKS5wcm9tcHRGb3JDb21tYW5kKGZsYWdzKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGNvbW1hbmQgd2l0aCBuYW1lICcke2NvbnRleHQubmFtZX0nIGFuZCBuYW1lc3BhY2UgJyR7Y29udGV4dC5uYW1lc3BhY2V9J2ApO1xuICAgICAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKCdjb21tYW5kJywgZmxhZ3MubGFuZ3VhZ2UsIGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCk7ICBcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjb21tYW5kIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3MgXG4gICAgICovXG4gICAgY3JlYXRlQ29tbWFuZEhhbmRsZXIoZmxhZ3MpIHtcblxuICAgICAgICBsZXQgYm91bmRlZENvbnRleHRDb25maWcgPSB0aGlzLl9nZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWcoKTtcbiAgICAgICAgZmxhZ3MubGFuZ3VhZ2UgPSBib3VuZGVkQ29udGV4dENvbmZpZy5sYW5ndWFnZTtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gdGhpcy5fZ2V0QXJ0aWZhY3RzQm9pbGVyUGxhdGVCeUxhbmd1YWdlKGZsYWdzLmxhbmd1YWdlKTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcHJvY2Vzcy5jd2QoKTtcblxuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLmdldCh0aGlzKS5wcm9tcHRGb3JDb21tYW5kSGFuZGxlcihmbGFncylcbiAgICAgICAgICAgIC50aGVuKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBDcmVhdGluZyBjb21tYW5kIGhhbmRsZXIgd2l0aCBuYW1lICcke2NvbnRleHQubmFtZX0nIGFuZCBuYW1lc3BhY2UgJyR7Y29udGV4dC5uYW1lc3BhY2V9J2ApO1xuICAgICAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKCdjb21tYW5kSGFuZGxlcicsIGZsYWdzLmxhbmd1YWdlLCBib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpOyAgXG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGV2ZW50XG4gICAgICogQHBhcmFtIHthbnl9IGZsYWdzXG4gICAgICovXG4gICAgY3JlYXRlRXZlbnQoZmxhZ3MpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dENvbmZpZyA9IHRoaXMuX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZygpO1xuICAgICAgICBmbGFncy5sYW5ndWFnZSA9IGJvdW5kZWRDb250ZXh0Q29uZmlnLmxhbmd1YWdlO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSB0aGlzLl9nZXRBcnRpZmFjdHNCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2UoZmxhZ3MubGFuZ3VhZ2UpO1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuZ2V0KHRoaXMpLnByb21wdEZvckV2ZW50KGZsYWdzKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGV2ZW50IHdpdGggbmFtZSAnJHtjb250ZXh0Lm5hbWV9JyBhbmQgbmFtZXNwYWNlICcke2NvbnRleHQubmFtZXNwYWNlfSdgKTtcbiAgICAgICAgICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSgnZXZlbnQnLCBmbGFncy5sYW5ndWFnZSwgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTsgIFxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBldmVudCBwcm9jZXNzb3JcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3NcbiAgICAgKi9cbiAgICBjcmVhdGVFdmVudFByb2Nlc3NvcihmbGFncykge1xuICAgICAgICBcbiAgICAgICAgbGV0IGJvdW5kZWRDb250ZXh0Q29uZmlnID0gdGhpcy5fZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnKCk7XG4gICAgICAgIGZsYWdzLmxhbmd1YWdlID0gYm91bmRlZENvbnRleHRDb25maWcubGFuZ3VhZ2U7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IHRoaXMuX2dldEFydGlmYWN0c0JvaWxlclBsYXRlQnlMYW5ndWFnZShmbGFncy5sYW5ndWFnZSk7XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHByb2Nlc3MuY3dkKCk7XG5cbiAgICAgICAgX2lucXVpcmVyTWFuYWdlci5nZXQodGhpcykucHJvbXB0Rm9yRXZlbnRQcm9jZXNzb3IoZmxhZ3MpXG4gICAgICAgICAgICAudGhlbihjb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgZXZlbnQgcHJvY2Vzc29yIHdpdGggbmFtZSAnJHtjb250ZXh0Lm5hbWV9JyBhbmQgbmFtZXNwYWNlICcke2NvbnRleHQubmFtZXNwYWNlfSdgKTtcbiAgICAgICAgICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSgnZXZlbnRQcm9jZXNzb3InLCBmbGFncy5sYW5ndWFnZSwgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTsgIFxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHJlYWQgbW9kZWxcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3NcbiAgICAgKi9cbiAgICBjcmVhdGVSZWFkTW9kZWwoZmxhZ3MpIHtcblxuICAgICAgICBsZXQgYm91bmRlZENvbnRleHRDb25maWcgPSB0aGlzLl9nZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWcoKTtcbiAgICAgICAgZmxhZ3MubGFuZ3VhZ2UgPSBib3VuZGVkQ29udGV4dENvbmZpZy5sYW5ndWFnZTtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gdGhpcy5fZ2V0QXJ0aWZhY3RzQm9pbGVyUGxhdGVCeUxhbmd1YWdlKGZsYWdzLmxhbmd1YWdlKTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcHJvY2Vzcy5jd2QoKTtcblxuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLmdldCh0aGlzKS5wcm9tcHRGb3JSZWFkTW9kZWwoZmxhZ3MpXG4gICAgICAgICAgICAudGhlbihjb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgcmVhZCBtb2RlbCB3aXRoIG5hbWUgJyR7Y29udGV4dC5uYW1lfScgYW5kIG5hbWVzcGFjZSAnJHtjb250ZXh0Lm5hbWVzcGFjZX0nYCk7XG4gICAgICAgICAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoJ3JlYWRNb2RlbCcsIGZsYWdzLmxhbmd1YWdlLCBib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpOyAgXG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGFnZ3JlZ2F0ZSByb290XG4gICAgICogQHBhcmFtIHthbnl9IGZsYWdzXG4gICAgICovXG4gICAgY3JlYXRlQWdncmVnYXRlUm9vdChmbGFncykge1xuXG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dENvbmZpZyA9IHRoaXMuX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZygpO1xuICAgICAgICBmbGFncy5sYW5ndWFnZSA9IGJvdW5kZWRDb250ZXh0Q29uZmlnLmxhbmd1YWdlO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSB0aGlzLl9nZXRBcnRpZmFjdHNCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2UoZmxhZ3MubGFuZ3VhZ2UpO1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuZ2V0KHRoaXMpLnByb21wdEZvckFnZ3JlZ2F0ZVJvb3QoZmxhZ3MpXG4gICAgICAgICAgICAudGhlbihjb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgYWdncmVnYXRlIHJvb3Qgd2l0aCBuYW1lICcke2NvbnRleHQubmFtZX0nIGFuZCBuYW1lc3BhY2UgJyR7Y29udGV4dC5uYW1lc3BhY2V9J2ApO1xuICAgICAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKCdhZ2dyZWdhdGVSb290JywgZmxhZ3MubGFuZ3VhZ2UsIGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCk7ICBcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBxdWVyeVxuICAgICAqIEBwYXJhbSB7YW55fSBmbGFnc1xuICAgICAqL1xuICAgIGNyZWF0ZVF1ZXJ5KGZsYWdzKSB7XG5cbiAgICAgICAgbGV0IGJvdW5kZWRDb250ZXh0Q29uZmlnID0gdGhpcy5fZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnKCk7XG4gICAgICAgIGZsYWdzLmxhbmd1YWdlID0gYm91bmRlZENvbnRleHRDb25maWcubGFuZ3VhZ2U7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IHRoaXMuX2dldEFydGlmYWN0c0JvaWxlclBsYXRlQnlMYW5ndWFnZShmbGFncy5sYW5ndWFnZSk7XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHByb2Nlc3MuY3dkKCk7XG5cbiAgICAgICAgX2lucXVpcmVyTWFuYWdlci5nZXQodGhpcykucHJvbXB0Rm9yUXVlcnkoZmxhZ3MpXG4gICAgICAgICAgICAudGhlbihjb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgcXVlcnkgd2l0aCBuYW1lICcke2NvbnRleHQubmFtZX0nYClcbiAgICAgICAgICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSgncXVlcnknLCBmbGFncy5sYW5ndWFnZSwgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTsgIFxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHF1ZXJ5IGZvciBhIHNwZWNpZmljIHJlYWQgbW9kZWxcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3NcbiAgICAgKi9cbiAgICBjcmVhdGVRdWVyeUZvcihmbGFncykge1xuXG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dENvbmZpZyA9IHRoaXMuX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZygpO1xuICAgICAgICBmbGFncy5sYW5ndWFnZSA9IGJvdW5kZWRDb250ZXh0Q29uZmlnLmxhbmd1YWdlO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSB0aGlzLl9nZXRBcnRpZmFjdHNCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2UoZmxhZ3MubGFuZ3VhZ2UpO1xuICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuZ2V0KHRoaXMpLnByb21wdEZvclF1ZXJ5Zm9yKGZsYWdzKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIHF1ZXJ5IGZvciAnJHtjb250ZXh0LnJlYWRNb2RlbH0nIHdpdGggbmFtZSAnJHtjb250ZXh0Lm5hbWV9J2ApO1xuICAgICAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKCdxdWVyeUZvcicsIGZsYWdzLmxhbmd1YWdlLCBib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpOyAgXG4gICAgICAgICAgICB9KTtcbiAgICB9XG59Il19