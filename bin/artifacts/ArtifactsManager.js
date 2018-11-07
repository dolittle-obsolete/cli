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

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _BoilerPlate = require('../boilerPlates/BoilerPlate');

var _BoundedContext = require('../boundedContexts/BoundedContext');

var _BoundedContextManager = require('../boundedContexts/BoundedContextManager');

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable no-unused-vars */

/**
 * @type {WeakMap<ArtifactsManager, BoilerPlatesManager>}
 */
var _boilerPlatesManager = new WeakMap();
/**
 * @type {WeakMap<ArtifactsManager, BoundedContextManager>}
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable no-unused-vars */
var _boundedContextManager = new WeakMap();
/**
 * @type {WeakMap<ArtifactsManager, Folders>}
 */
var _folders = new WeakMap();
/**
 * @type {WeakMap<ArtifactsManager, fs>}
 */
var _fileSystem = new WeakMap();
/**
 * @type {WeakMap<ArtifactsManager, InquirerManager>}
 */
var _inquirerManager = new WeakMap();

/**
 * Represents a manager for artifacts
 */

var ArtifactsManager = exports.ArtifactsManager = function () {
    /**
     * Initializes a new instance of {ApplicationManager}
     * @param {InquirerManager} inquirerManager
     * @param {BoilerPlatesManager} boilerPlatesManager
     * @param {boundedContextManager} boundedContextManager
     * @param {Folders} folders 
     * @param {fs} fileSystem
     * @param {Logger} logger
     */
    function ArtifactsManager(inquirerManager, boilerPlatesManager, boundedContextManager, folders, fileSystem, logger) {
        (0, _classCallCheck3.default)(this, ArtifactsManager);

        _inquirerManager.set(this, inquirerManager);
        _boilerPlatesManager.set(this, boilerPlatesManager);
        _boundedContextManager.set(this, boundedContextManager);
        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        this._logger = logger;
    }
    /**
     * Searches the file directories for the bounded-context.json configuration file recursively by going upwards in the hierarchy
     * @param {string} startPath Where to start looking for the bounded context
     * @return {BoundedContext} bounded context configuration object
     */


    (0, _createClass3.default)(ArtifactsManager, [{
        key: '_getNearestBoundedContextConfig',
        value: function _getNearestBoundedContextConfig(startPath) {
            var boundedContext = _boundedContextManager.get(this).getNearestBoundedContextConfig(startPath);

            this._validateBoundedContext(boundedContext);
            return boundedContext;
        }
        /**
         * Validates the fields of the parsed bounded-context.json object 
         * @param {BoundedContext} boundedContext 
         */

    }, {
        key: '_validateBoundedContext',
        value: function _validateBoundedContext(boundedContext) {
            if (!(boundedContext.backend && boundedContext.backend.language && boundedContext.backend.language !== '')) {
                this._logger.error('The bounded-context.json configuration is missing "language"');
                throw 'Bounded Context configuration missing language';
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
                throw 'Could not find boilerplate for given language and type';
            }
            if (boilerPlates.length > 1) {
                this._logger.error('Found more than one boilerplate.json configuration for language: ' + language + ' and type: ' + type);
                throw 'Found multiple boilerplates';
            }
            return boilerPlates[0];
        }
        /**
         * Gets the artifact template alongside with the location of where it was found based on the language and type of the artifact
         * @param {BoilerPlate} boilerPlate 
         * @param {string} artifactType
         * @returns {{template: any, location: string}}
         */

    }, {
        key: '_getArtifactTemplateByBoilerplate',
        value: function _getArtifactTemplateByBoilerplate(boilerPlate, artifactType) {
            var _this = this;

            var templateFiles = _folders.get(this).searchRecursive(boilerPlate.location, 'template.json');
            var templatesAndLocation = [];
            templateFiles.forEach(function (_) {
                var location = (0, _helpers.getFileDirPath)(_);
                var template = {
                    template: JSON.parse(_fileSystem.get(_this).readFileSync(_, 'utf8')),
                    location: location
                };
                templatesAndLocation.push(template);
            });
            var artifactTemplate = templatesAndLocation.filter(function (template) {
                return template.template.type == artifactType && template.template.language == boilerPlate.language;
            })[0];

            if (artifactTemplate === undefined || artifactTemplate === null) throw 'Artifact template not found';

            return artifactTemplate;
        }
        /**
         * Creates an artifact of the given type at the given destination with the given name 
         * @param {{artifactName: string, destination: string, artifactType: string}} context 
         */

    }, {
        key: 'createArtifact',
        value: function createArtifact(context) {
            var _this2 = this;

            var boundedContextConfig = this._getNearestBoundedContextConfig(context.destination);
            var language = boundedContextConfig.backend.language;
            var boilerPlate = this._getArtifactsBoilerPlateByLanguage(language);
            var artifactTemplate = this._getArtifactTemplateByBoilerplate(boilerPlate, context.artifactType);

            _inquirerManager.get(this).promptUser(context.artifactName, context.destination, boilerPlate, artifactTemplate.template).then(function (templateContext) {
                _this2._logger.info('Creating an artifact of type \'' + context.artifactType + '\' with name \'' + context.artifactName + '\' and language \'' + language + '\'');
                _boilerPlatesManager.get(_this2).createArtifactInstance(artifactTemplate, context.destination, templateContext);
            });
        }
    }]);
    return ArtifactsManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiX2ZvbGRlcnMiLCJfZmlsZVN5c3RlbSIsIl9pbnF1aXJlck1hbmFnZXIiLCJBcnRpZmFjdHNNYW5hZ2VyIiwiaW5xdWlyZXJNYW5hZ2VyIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImJvdW5kZWRDb250ZXh0TWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsInN0YXJ0UGF0aCIsImJvdW5kZWRDb250ZXh0IiwiZ2V0IiwiZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnIiwiX3ZhbGlkYXRlQm91bmRlZENvbnRleHQiLCJiYWNrZW5kIiwibGFuZ3VhZ2UiLCJlcnJvciIsInR5cGUiLCJib2lsZXJQbGF0ZXMiLCJib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSIsImxlbmd0aCIsImJvaWxlclBsYXRlIiwiYXJ0aWZhY3RUeXBlIiwidGVtcGxhdGVGaWxlcyIsInNlYXJjaFJlY3Vyc2l2ZSIsImxvY2F0aW9uIiwidGVtcGxhdGVzQW5kTG9jYXRpb24iLCJmb3JFYWNoIiwiXyIsInRlbXBsYXRlIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwicHVzaCIsImFydGlmYWN0VGVtcGxhdGUiLCJmaWx0ZXIiLCJ1bmRlZmluZWQiLCJjb250ZXh0IiwiYm91bmRlZENvbnRleHRDb25maWciLCJfZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnIiwiZGVzdGluYXRpb24iLCJfZ2V0QXJ0aWZhY3RzQm9pbGVyUGxhdGVCeUxhbmd1YWdlIiwiX2dldEFydGlmYWN0VGVtcGxhdGVCeUJvaWxlcnBsYXRlIiwicHJvbXB0VXNlciIsImFydGlmYWN0TmFtZSIsInRoZW4iLCJpbmZvIiwiY3JlYXRl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OUg7QUFDQXJCLHFDQUFxQmlCLEdBQXJCLENBQXlCLE1BQXpCLEVBQStCb0Msc0JBQS9CLENBQXNEYixnQkFBdEQsRUFBd0VHLFFBQVFHLFdBQWhGLEVBQTZGUSxlQUE3RjtBQUNILGFBSkw7QUFLSCIsImZpbGUiOiJBcnRpZmFjdHNNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtGb2xkZXJzfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCB7Qm9pbGVyUGxhdGVzTWFuYWdlcn0gZnJvbSAnLi4vYm9pbGVyUGxhdGVzL0JvaWxlclBsYXRlc01hbmFnZXInO1xuaW1wb3J0IHtJbnF1aXJlck1hbmFnZXJ9IGZyb20gJy4vSW5xdWlyZXJNYW5hZ2VyJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQge0JvaWxlclBsYXRlfSBmcm9tICcuLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGUnO1xuaW1wb3J0IHtCb3VuZGVkQ29udGV4dH0gZnJvbSAnLi4vYm91bmRlZENvbnRleHRzL0JvdW5kZWRDb250ZXh0JztcbmltcG9ydCB7Qm91bmRlZENvbnRleHRNYW5hZ2VyfSBmcm9tICcuLi9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyJztcbmltcG9ydCB7IGdldEZpbGVEaXJQYXRoIH0gZnJvbSAnLi4vaGVscGVycyc7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKlxuICogQHR5cGUge1dlYWtNYXA8QXJ0aWZhY3RzTWFuYWdlciwgQm9pbGVyUGxhdGVzTWFuYWdlcj59XG4gKi9cbmNvbnN0IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8QXJ0aWZhY3RzTWFuYWdlciwgQm91bmRlZENvbnRleHRNYW5hZ2VyPn1cbiAqL1xuY29uc3QgX2JvdW5kZWRDb250ZXh0TWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEFydGlmYWN0c01hbmFnZXIsIEZvbGRlcnM+fVxuICovXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEFydGlmYWN0c01hbmFnZXIsIGZzPn1cbiAqL1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxBcnRpZmFjdHNNYW5hZ2VyLCBJbnF1aXJlck1hbmFnZXI+fVxuICovXG5jb25zdCBfaW5xdWlyZXJNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBtYW5hZ2VyIGZvciBhcnRpZmFjdHNcbiAqL1xuZXhwb3J0IGNsYXNzIEFydGlmYWN0c01hbmFnZXIge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtJbnF1aXJlck1hbmFnZXJ9IGlucXVpcmVyTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGVzTWFuYWdlcn0gYm9pbGVyUGxhdGVzTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Ym91bmRlZENvbnRleHRNYW5hZ2VyfSBib3VuZGVkQ29udGV4dE1hbmFnZXJcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnMgXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpbnF1aXJlck1hbmFnZXIsIGJvaWxlclBsYXRlc01hbmFnZXIsIGJvdW5kZWRDb250ZXh0TWFuYWdlciwgZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuc2V0KHRoaXMsIGlucXVpcmVyTWFuYWdlcik7XG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLnNldCh0aGlzLCBib2lsZXJQbGF0ZXNNYW5hZ2VyKTtcbiAgICAgICAgX2JvdW5kZWRDb250ZXh0TWFuYWdlci5zZXQodGhpcywgYm91bmRlZENvbnRleHRNYW5hZ2VyKTtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgXG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlYXJjaGVzIHRoZSBmaWxlIGRpcmVjdG9yaWVzIGZvciB0aGUgYm91bmRlZC1jb250ZXh0Lmpzb24gY29uZmlndXJhdGlvbiBmaWxlIHJlY3Vyc2l2ZWx5IGJ5IGdvaW5nIHVwd2FyZHMgaW4gdGhlIGhpZXJhcmNoeVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydFBhdGggV2hlcmUgdG8gc3RhcnQgbG9va2luZyBmb3IgdGhlIGJvdW5kZWQgY29udGV4dFxuICAgICAqIEByZXR1cm4ge0JvdW5kZWRDb250ZXh0fSBib3VuZGVkIGNvbnRleHQgY29uZmlndXJhdGlvbiBvYmplY3RcbiAgICAgKi9cbiAgICBfZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnKHN0YXJ0UGF0aCkge1xuICAgICAgICBsZXQgYm91bmRlZENvbnRleHQgPSBfYm91bmRlZENvbnRleHRNYW5hZ2VyLmdldCh0aGlzKS5nZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWcoc3RhcnRQYXRoKTtcblxuICAgICAgICB0aGlzLl92YWxpZGF0ZUJvdW5kZWRDb250ZXh0KGJvdW5kZWRDb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIGJvdW5kZWRDb250ZXh0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgdGhlIGZpZWxkcyBvZiB0aGUgcGFyc2VkIGJvdW5kZWQtY29udGV4dC5qc29uIG9iamVjdCBcbiAgICAgKiBAcGFyYW0ge0JvdW5kZWRDb250ZXh0fSBib3VuZGVkQ29udGV4dCBcbiAgICAgKi9cbiAgICBfdmFsaWRhdGVCb3VuZGVkQ29udGV4dChib3VuZGVkQ29udGV4dCkge1xuICAgICAgICBpZiAoICEoYm91bmRlZENvbnRleHQuYmFja2VuZCAmJiBib3VuZGVkQ29udGV4dC5iYWNrZW5kLmxhbmd1YWdlICYmIGJvdW5kZWRDb250ZXh0LmJhY2tlbmQubGFuZ3VhZ2UgIT09ICcnKSkge1xuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmVycm9yKCdUaGUgYm91bmRlZC1jb250ZXh0Lmpzb24gY29uZmlndXJhdGlvbiBpcyBtaXNzaW5nIFwibGFuZ3VhZ2VcIicpO1xuICAgICAgICAgICAgdGhyb3cgJ0JvdW5kZWQgQ29udGV4dCBjb25maWd1cmF0aW9uIG1pc3NpbmcgbGFuZ3VhZ2UnO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgYm9pbGVycGxhdGUuanNvbiBjb25maWd1cmF0aW9uIGZvciBhcnRpZmFjdHMgd2l0aCB0aGUgZ2l2ZW4gbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgXG4gICAgICogQHJldHVybiB7Qm9pbGVyUGxhdGV9IFRoZSBCb2lsZXJwbGF0ZSB3aXRoIG9mIHRoZSBnaXZlbiBsYW5ndWFnZVxuICAgICAqL1xuICAgIF9nZXRBcnRpZmFjdHNCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2UobGFuZ3VhZ2UpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9ICdhcnRpZmFjdHMnO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKGxhbmd1YWdlLCB0eXBlKTtcbiAgICAgICAgaWYgKGJvaWxlclBsYXRlcyA9PT0gbnVsbCB8fCBib2lsZXJQbGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYENvdWxkIG5vdCBmaW5kIGEgYm9pbGVycGxhdGUuanNvbiBjb25maWd1cmF0aW9uIGZvciBsYW5ndWFnZTogJHtsYW5ndWFnZX0gYW5kIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgICAgIHRocm93ICdDb3VsZCBub3QgZmluZCBib2lsZXJwbGF0ZSBmb3IgZ2l2ZW4gbGFuZ3VhZ2UgYW5kIHR5cGUnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2lsZXJQbGF0ZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmVycm9yKGBGb3VuZCBtb3JlIHRoYW4gb25lIGJvaWxlcnBsYXRlLmpzb24gY29uZmlndXJhdGlvbiBmb3IgbGFuZ3VhZ2U6ICR7bGFuZ3VhZ2V9IGFuZCB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgICAgICB0aHJvdyAnRm91bmQgbXVsdGlwbGUgYm9pbGVycGxhdGVzJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm9pbGVyUGxhdGVzWzBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBhcnRpZmFjdCB0ZW1wbGF0ZSBhbG9uZ3NpZGUgd2l0aCB0aGUgbG9jYXRpb24gb2Ygd2hlcmUgaXQgd2FzIGZvdW5kIGJhc2VkIG9uIHRoZSBsYW5ndWFnZSBhbmQgdHlwZSBvZiB0aGUgYXJ0aWZhY3RcbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlfSBib2lsZXJQbGF0ZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXJ0aWZhY3RUeXBlXG4gICAgICogQHJldHVybnMge3t0ZW1wbGF0ZTogYW55LCBsb2NhdGlvbjogc3RyaW5nfX1cbiAgICAgKi9cbiAgICBfZ2V0QXJ0aWZhY3RUZW1wbGF0ZUJ5Qm9pbGVycGxhdGUoYm9pbGVyUGxhdGUsIGFydGlmYWN0VHlwZSlcbiAgICB7XG4gICAgICAgIGxldCB0ZW1wbGF0ZUZpbGVzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLnNlYXJjaFJlY3Vyc2l2ZShib2lsZXJQbGF0ZS5sb2NhdGlvbiwgJ3RlbXBsYXRlLmpzb24nKTtcbiAgICAgICAgbGV0IHRlbXBsYXRlc0FuZExvY2F0aW9uID0gW107XG4gICAgICAgIHRlbXBsYXRlRmlsZXMuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgIGxldCBsb2NhdGlvbiA9IGdldEZpbGVEaXJQYXRoKF8pO1xuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IEpTT04ucGFyc2UoX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhfLCAndXRmOCcpKSxcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0ZW1wbGF0ZXNBbmRMb2NhdGlvbi5wdXNoKHRlbXBsYXRlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGFydGlmYWN0VGVtcGxhdGUgPSB0ZW1wbGF0ZXNBbmRMb2NhdGlvbi5maWx0ZXIodGVtcGxhdGUgPT4gdGVtcGxhdGUudGVtcGxhdGUudHlwZSA9PSBhcnRpZmFjdFR5cGUgJiYgdGVtcGxhdGUudGVtcGxhdGUubGFuZ3VhZ2UgPT0gYm9pbGVyUGxhdGUubGFuZ3VhZ2UpWzBdO1xuICAgICAgICBcbiAgICAgICAgaWYgKGFydGlmYWN0VGVtcGxhdGUgPT09IHVuZGVmaW5lZCB8fCBhcnRpZmFjdFRlbXBsYXRlID09PSBudWxsKSBcbiAgICAgICAgICAgIHRocm93ICdBcnRpZmFjdCB0ZW1wbGF0ZSBub3QgZm91bmQnO1xuXG4gICAgICAgIHJldHVybiBhcnRpZmFjdFRlbXBsYXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFydGlmYWN0IG9mIHRoZSBnaXZlbiB0eXBlIGF0IHRoZSBnaXZlbiBkZXN0aW5hdGlvbiB3aXRoIHRoZSBnaXZlbiBuYW1lIFxuICAgICAqIEBwYXJhbSB7e2FydGlmYWN0TmFtZTogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nLCBhcnRpZmFjdFR5cGU6IHN0cmluZ319IGNvbnRleHQgXG4gICAgICovXG4gICAgY3JlYXRlQXJ0aWZhY3QoY29udGV4dCkge1xuICAgICAgICBsZXQgYm91bmRlZENvbnRleHRDb25maWcgPSB0aGlzLl9nZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWcoY29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgICAgIGxldCBsYW5ndWFnZSA9IGJvdW5kZWRDb250ZXh0Q29uZmlnLmJhY2tlbmQubGFuZ3VhZ2U7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IHRoaXMuX2dldEFydGlmYWN0c0JvaWxlclBsYXRlQnlMYW5ndWFnZShsYW5ndWFnZSk7XG4gICAgICAgIGxldCBhcnRpZmFjdFRlbXBsYXRlID0gdGhpcy5fZ2V0QXJ0aWZhY3RUZW1wbGF0ZUJ5Qm9pbGVycGxhdGUoYm9pbGVyUGxhdGUsIGNvbnRleHQuYXJ0aWZhY3RUeXBlKTtcblxuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLmdldCh0aGlzKS5wcm9tcHRVc2VyKGNvbnRleHQuYXJ0aWZhY3ROYW1lLCBjb250ZXh0LmRlc3RpbmF0aW9uLCBib2lsZXJQbGF0ZSwgYXJ0aWZhY3RUZW1wbGF0ZS50ZW1wbGF0ZSlcbiAgICAgICAgICAgIC50aGVuKHRlbXBsYXRlQ29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGFuIGFydGlmYWN0IG9mIHR5cGUgJyR7Y29udGV4dC5hcnRpZmFjdFR5cGV9JyB3aXRoIG5hbWUgJyR7Y29udGV4dC5hcnRpZmFjdE5hbWV9JyBhbmQgbGFuZ3VhZ2UgJyR7bGFuZ3VhZ2V9J2ApO1xuICAgICAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKGFydGlmYWN0VGVtcGxhdGUsIGNvbnRleHQuZGVzdGluYXRpb24sIHRlbXBsYXRlQ29udGV4dCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59Il19