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

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

var _BoilerPlate = require('../boilerPlates/BoilerPlate');

var _BoundedContext = require('../boundedContexts/BoundedContext');

var _BoundedContextManager = require('../boundedContexts/BoundedContextManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
                throw "Bounded Context configuration missing language";
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
                throw "Could not find boilerplate for given language and type";
            }
            if (boilerPlates.length > 1) {
                this._logger.error('Found more than one boilerplate.json configuration for language: ' + language + ' and type: ' + type);
                throw "Found multiple boilerplates";
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
                var lastPathSeparatorMatch = _.match(/(\\|\/)/);
                var lastIndex = _.lastIndexOf(lastPathSeparatorMatch[lastPathSeparatorMatch.length - 1]);
                var location = _global2.default.getFileDirPath(_);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiX2ZvbGRlcnMiLCJfZmlsZVN5c3RlbSIsIl9pbnF1aXJlck1hbmFnZXIiLCJBcnRpZmFjdHNNYW5hZ2VyIiwiaW5xdWlyZXJNYW5hZ2VyIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImJvdW5kZWRDb250ZXh0TWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsInN0YXJ0UGF0aCIsImJvdW5kZWRDb250ZXh0IiwiZ2V0IiwiZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnIiwiX3ZhbGlkYXRlQm91bmRlZENvbnRleHQiLCJiYWNrZW5kIiwibGFuZ3VhZ2UiLCJlcnJvciIsInR5cGUiLCJib2lsZXJQbGF0ZXMiLCJib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSIsImxlbmd0aCIsImJvaWxlclBsYXRlIiwiYXJ0aWZhY3RUeXBlIiwidGVtcGxhdGVGaWxlcyIsInNlYXJjaFJlY3Vyc2l2ZSIsImxvY2F0aW9uIiwidGVtcGxhdGVzQW5kTG9jYXRpb24iLCJmb3JFYWNoIiwibGFzdFBhdGhTZXBhcmF0b3JNYXRjaCIsIl8iLCJtYXRjaCIsImxhc3RJbmRleCIsImxhc3RJbmRleE9mIiwiZ2xvYmFsIiwiZ2V0RmlsZURpclBhdGgiLCJ0ZW1wbGF0ZSIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsInB1c2giLCJhcnRpZmFjdFRlbXBsYXRlIiwiZmlsdGVyIiwidW5kZWZpbmVkIiwiY29udGV4dCIsImJvdW5kZWRDb250ZXh0Q29uZmlnIiwiX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyIsImRlc3RpbmF0aW9uIiwiX2dldEFydGlmYWN0c0JvaWxlclBsYXRlQnlMYW5ndWFnZSIsIl9nZXRBcnRpZmFjdFRlbXBsYXRlQnlCb2lsZXJwbGF0ZSIsInByb21wdFVzZXIiLCJhcnRpZmFjdE5hbWUiLCJ0aGVuIiwiaW5mbyIsImNyZWF0ZUFydGlmYWN0SW5zdGFuY2UiLCJ0ZW1wbGF0ZUNvbnRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7QUFHQSxJQUFNQSx1QkFBdUIsSUFBSUMsT0FBSixFQUE3QjtBQUNBOzs7QUFsQkE7Ozs7QUFxQkEsSUFBTUMseUJBQXlCLElBQUlELE9BQUosRUFBL0I7QUFDQTs7O0FBR0EsSUFBTUUsV0FBVyxJQUFJRixPQUFKLEVBQWpCO0FBQ0E7OztBQUdBLElBQU1HLGNBQWMsSUFBSUgsT0FBSixFQUFwQjtBQUNBOzs7QUFHQSxJQUFNSSxtQkFBbUIsSUFBSUosT0FBSixFQUF6Qjs7QUFHQTs7OztJQUdhSyxnQixXQUFBQSxnQjtBQUNUOzs7Ozs7Ozs7QUFTQSw4QkFBWUMsZUFBWixFQUE2QkMsbUJBQTdCLEVBQWtEQyxxQkFBbEQsRUFBeUVDLE9BQXpFLEVBQWtGQyxVQUFsRixFQUE4RkMsTUFBOUYsRUFBc0c7QUFBQTs7QUFDbEdQLHlCQUFpQlEsR0FBakIsQ0FBcUIsSUFBckIsRUFBMkJOLGVBQTNCO0FBQ0FQLDZCQUFxQmEsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JMLG1CQUEvQjtBQUNBTiwrQkFBdUJXLEdBQXZCLENBQTJCLElBQTNCLEVBQWlDSixxQkFBakM7QUFDQU4saUJBQVNVLEdBQVQsQ0FBYSxJQUFiLEVBQW1CSCxPQUFuQjtBQUNBTixvQkFBWVMsR0FBWixDQUFnQixJQUFoQixFQUFzQkYsVUFBdEI7QUFDQSxhQUFLRyxPQUFMLEdBQWVGLE1BQWY7QUFFSDtBQUNEOzs7Ozs7Ozs7d0RBS2dDRyxTLEVBQVc7QUFDdkMsZ0JBQUlDLGlCQUFpQmQsdUJBQXVCZSxHQUF2QixDQUEyQixJQUEzQixFQUFpQ0MsOEJB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QkFBaUJZLEdBQWpCLENBQXFCLElBQXJCLEVBQTJCc0MsVUFBM0IsQ0FBc0NOLFFBQVFPLFlBQTlDLEVBQTREUCxRQUFRRyxXQUFwRSxFQUFpRnpCLFdBQWpGLEVBQThGbUIsaUJBQWlCTCxRQUEvRyxFQUNLZ0IsSUFETCxDQUNVLDJCQUFtQjtBQUNyQix1QkFBSzNDLE9BQUwsQ0FBYTRDLElBQWIscUNBQW1EVCxRQUFRckIsWUFBM0QsdUJBQXVGcUIsUUFBUU8sWUFBL0YsMEJBQThIbkMsUUFBOUg7QUFDQXJCLHFDQUFxQmlCLEdBQXJCLENBQXlCLE1BQXpCLEVBQStCMEMsc0JBQS9CLENBQXNEYixnQkFBdEQsRUFBd0VHLFFBQVFHLFdBQWhGLEVBQTZGUSxlQUE3RjtBQUNILGFBSkw7QUFLSCIsImZpbGUiOiJBcnRpZmFjdHNNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IHvCoExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHvCoEJvaWxlclBsYXRlc01hbmFnZXJ9IGZyb20gJy4uL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCB7IElucXVpcmVyTWFuYWdlciB9IGZyb20gJy4vSW5xdWlyZXJNYW5hZ2VyJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgeyBCb2lsZXJQbGF0ZSB9IGZyb20gJy4uL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZSc7XG5pbXBvcnQgeyBCb3VuZGVkQ29udGV4dCB9IGZyb20gJy4uL2JvdW5kZWRDb250ZXh0cy9Cb3VuZGVkQ29udGV4dCc7XG5pbXBvcnQgeyBCb3VuZGVkQ29udGV4dE1hbmFnZXIgfSBmcm9tICcuLi9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyJztcblxuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxBcnRpZmFjdHNNYW5hZ2VyLCBCb2lsZXJQbGF0ZXNNYW5hZ2VyPn1cbiAqL1xuY29uc3QgX2JvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxBcnRpZmFjdHNNYW5hZ2VyLCBCb3VuZGVkQ29udGV4dE1hbmFnZXI+fVxuICovXG5jb25zdCBfYm91bmRlZENvbnRleHRNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8QXJ0aWZhY3RzTWFuYWdlciwgRm9sZGVycz59XG4gKi9cbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8QXJ0aWZhY3RzTWFuYWdlciwgZnM+fVxuICovXG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEFydGlmYWN0c01hbmFnZXIsIElucXVpcmVyTWFuYWdlcj59XG4gKi9cbmNvbnN0IF9pbnF1aXJlck1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIG1hbmFnZXIgZm9yIGFydGlmYWN0c1xuICovXG5leHBvcnQgY2xhc3MgQXJ0aWZhY3RzTWFuYWdlciB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0FwcGxpY2F0aW9uTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0lucXVpcmVyTWFuYWdlcn0gaW5xdWlyZXJNYW5hZ2VyXG4gICAgICogQHBhcmFtIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfSBib2lsZXJQbGF0ZXNNYW5hZ2VyXG4gICAgICogQHBhcmFtIHtib3VuZGVkQ29udGV4dE1hbmFnZXJ9IGJvdW5kZWRDb250ZXh0TWFuYWdlclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVycyBcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlucXVpcmVyTWFuYWdlciwgYm9pbGVyUGxhdGVzTWFuYWdlciwgYm91bmRlZENvbnRleHRNYW5hZ2VyLCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2lucXVpcmVyTWFuYWdlci5zZXQodGhpcywgaW5xdWlyZXJNYW5hZ2VyKTtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIGJvaWxlclBsYXRlc01hbmFnZXIpO1xuICAgICAgICBfYm91bmRlZENvbnRleHRNYW5hZ2VyLnNldCh0aGlzLCBib3VuZGVkQ29udGV4dE1hbmFnZXIpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICBcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VhcmNoZXMgdGhlIGZpbGUgZGlyZWN0b3JpZXMgZm9yIHRoZSBib3VuZGVkLWNvbnRleHQuanNvbiBjb25maWd1cmF0aW9uIGZpbGUgcmVjdXJzaXZlbHkgYnkgZ29pbmcgdXB3YXJkcyBpbiB0aGUgaGllcmFyY2h5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0UGF0aCBXaGVyZSB0byBzdGFydCBsb29raW5nIGZvciB0aGUgYm91bmRlZCBjb250ZXh0XG4gICAgICogQHJldHVybiB7Qm91bmRlZENvbnRleHR9IGJvdW5kZWQgY29udGV4dCBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICAqL1xuICAgIF9nZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWcoc3RhcnRQYXRoKSB7XG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dCA9IF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuZ2V0KHRoaXMpLmdldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyhzdGFydFBhdGgpO1xuXG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlQm91bmRlZENvbnRleHQoYm91bmRlZENvbnRleHQpO1xuICAgICAgICByZXR1cm4gYm91bmRlZENvbnRleHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyB0aGUgZmllbGRzIG9mIHRoZSBwYXJzZWQgYm91bmRlZC1jb250ZXh0Lmpzb24gb2JqZWN0IFxuICAgICAqIEBwYXJhbSB7Qm91bmRlZENvbnRleHR9IGJvdW5kZWRDb250ZXh0IFxuICAgICAqL1xuICAgIF92YWxpZGF0ZUJvdW5kZWRDb250ZXh0KGJvdW5kZWRDb250ZXh0KSB7XG4gICAgICAgIGlmICggIShib3VuZGVkQ29udGV4dC5iYWNrZW5kICYmIGJvdW5kZWRDb250ZXh0LmJhY2tlbmQubGFuZ3VhZ2UgJiYgYm91bmRlZENvbnRleHQuYmFja2VuZC5sYW5ndWFnZSAhPT0gJycpKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoJ1RoZSBib3VuZGVkLWNvbnRleHQuanNvbiBjb25maWd1cmF0aW9uIGlzIG1pc3NpbmcgXCJsYW5ndWFnZVwiJyk7XG4gICAgICAgICAgICB0aHJvdyBcIkJvdW5kZWQgQ29udGV4dCBjb25maWd1cmF0aW9uIG1pc3NpbmcgbGFuZ3VhZ2VcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGJvaWxlcnBsYXRlLmpzb24gY29uZmlndXJhdGlvbiBmb3IgYXJ0aWZhY3RzIHdpdGggdGhlIGdpdmVuIGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIFxuICAgICAqIEByZXR1cm4ge0JvaWxlclBsYXRlfSBUaGUgQm9pbGVycGxhdGUgd2l0aCBvZiB0aGUgZ2l2ZW4gbGFuZ3VhZ2VcbiAgICAgKi9cbiAgICBfZ2V0QXJ0aWZhY3RzQm9pbGVyUGxhdGVCeUxhbmd1YWdlKGxhbmd1YWdlKSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSAnYXJ0aWZhY3RzJztcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlcyA9IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5ib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZShsYW5ndWFnZSwgdHlwZSk7XG4gICAgICAgIGlmIChib2lsZXJQbGF0ZXMgPT09IG51bGwgfHwgYm9pbGVyUGxhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmVycm9yKGBDb3VsZCBub3QgZmluZCBhIGJvaWxlcnBsYXRlLmpzb24gY29uZmlndXJhdGlvbiBmb3IgbGFuZ3VhZ2U6ICR7bGFuZ3VhZ2V9IGFuZCB0eXBlOiAke3R5cGV9YClcbiAgICAgICAgICAgIHRocm93IFwiQ291bGQgbm90IGZpbmQgYm9pbGVycGxhdGUgZm9yIGdpdmVuIGxhbmd1YWdlIGFuZCB0eXBlXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvaWxlclBsYXRlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYEZvdW5kIG1vcmUgdGhhbiBvbmUgYm9pbGVycGxhdGUuanNvbiBjb25maWd1cmF0aW9uIGZvciBsYW5ndWFnZTogJHtsYW5ndWFnZX0gYW5kIHR5cGU6ICR7dHlwZX1gKVxuICAgICAgICAgICAgdGhyb3cgXCJGb3VuZCBtdWx0aXBsZSBib2lsZXJwbGF0ZXNcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm9pbGVyUGxhdGVzWzBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBhcnRpZmFjdCB0ZW1wbGF0ZSBhbG9uZ3NpZGUgd2l0aCB0aGUgbG9jYXRpb24gb2Ygd2hlcmUgaXQgd2FzIGZvdW5kIGJhc2VkIG9uIHRoZSBsYW5ndWFnZSBhbmQgdHlwZSBvZiB0aGUgYXJ0aWZhY3RcbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlfSBib2lsZXJQbGF0ZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXJ0aWZhY3RUeXBlXG4gICAgICogQHJldHVybnMge3t0ZW1wbGF0ZTogYW55LCBsb2NhdGlvbjogc3RyaW5nfX1cbiAgICAgKi9cbiAgICBfZ2V0QXJ0aWZhY3RUZW1wbGF0ZUJ5Qm9pbGVycGxhdGUoYm9pbGVyUGxhdGUsIGFydGlmYWN0VHlwZSlcbiAgICB7XG4gICAgICAgIGxldCB0ZW1wbGF0ZUZpbGVzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLnNlYXJjaFJlY3Vyc2l2ZShib2lsZXJQbGF0ZS5sb2NhdGlvbiwgJ3RlbXBsYXRlLmpzb24nKTtcbiAgICAgICAgbGV0IHRlbXBsYXRlc0FuZExvY2F0aW9uID0gW107XG4gICAgICAgIHRlbXBsYXRlRmlsZXMuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2ggPSBfLm1hdGNoKC8oXFxcXHxcXC8pLyk7XG4gICAgICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBfLmxhc3RJbmRleE9mKGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2hbbGFzdFBhdGhTZXBhcmF0b3JNYXRjaC5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgbGV0IGxvY2F0aW9uID0gZ2xvYmFsLmdldEZpbGVEaXJQYXRoKF8pXG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogSlNPTi5wYXJzZShfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKF8sICd1dGY4JykpLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRlbXBsYXRlc0FuZExvY2F0aW9uLnB1c2godGVtcGxhdGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYXJ0aWZhY3RUZW1wbGF0ZSA9IHRlbXBsYXRlc0FuZExvY2F0aW9uLmZpbHRlcih0ZW1wbGF0ZSA9PiB0ZW1wbGF0ZS50ZW1wbGF0ZS50eXBlID09IGFydGlmYWN0VHlwZSAmJiB0ZW1wbGF0ZS50ZW1wbGF0ZS5sYW5ndWFnZSA9PSBib2lsZXJQbGF0ZS5sYW5ndWFnZSlbMF07XG4gICAgICAgIFxuICAgICAgICBpZiAoYXJ0aWZhY3RUZW1wbGF0ZSA9PT0gdW5kZWZpbmVkIHx8IGFydGlmYWN0VGVtcGxhdGUgPT09IG51bGwpIFxuICAgICAgICAgICAgdGhyb3cgJ0FydGlmYWN0IHRlbXBsYXRlIG5vdCBmb3VuZCc7XG5cbiAgICAgICAgcmV0dXJuIGFydGlmYWN0VGVtcGxhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYXJ0aWZhY3Qgb2YgdGhlIGdpdmVuIHR5cGUgYXQgdGhlIGdpdmVuIGRlc3RpbmF0aW9uIHdpdGggdGhlIGdpdmVuIG5hbWUgXG4gICAgICogQHBhcmFtIHt7YXJ0aWZhY3ROYW1lOiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcsIGFydGlmYWN0VHlwZTogc3RyaW5nfX0gY29udGV4dCBcbiAgICAgKi9cbiAgICBjcmVhdGVBcnRpZmFjdChjb250ZXh0KSB7XG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dENvbmZpZyA9IHRoaXMuX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyhjb250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgbGV0IGxhbmd1YWdlID0gYm91bmRlZENvbnRleHRDb25maWcuYmFja2VuZC5sYW5ndWFnZTtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gdGhpcy5fZ2V0QXJ0aWZhY3RzQm9pbGVyUGxhdGVCeUxhbmd1YWdlKGxhbmd1YWdlKTtcbiAgICAgICAgbGV0IGFydGlmYWN0VGVtcGxhdGUgPSB0aGlzLl9nZXRBcnRpZmFjdFRlbXBsYXRlQnlCb2lsZXJwbGF0ZShib2lsZXJQbGF0ZSwgY29udGV4dC5hcnRpZmFjdFR5cGUpO1xuXG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuZ2V0KHRoaXMpLnByb21wdFVzZXIoY29udGV4dC5hcnRpZmFjdE5hbWUsIGNvbnRleHQuZGVzdGluYXRpb24sIGJvaWxlclBsYXRlLCBhcnRpZmFjdFRlbXBsYXRlLnRlbXBsYXRlKVxuICAgICAgICAgICAgLnRoZW4odGVtcGxhdGVDb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgYW4gYXJ0aWZhY3Qgb2YgdHlwZSAnJHtjb250ZXh0LmFydGlmYWN0VHlwZX0nIHdpdGggbmFtZSAnJHtjb250ZXh0LmFydGlmYWN0TmFtZX0nIGFuZCBsYW5ndWFnZSAnJHtsYW5ndWFnZX0nYCk7XG4gICAgICAgICAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoYXJ0aWZhY3RUZW1wbGF0ZSwgY29udGV4dC5kZXN0aW5hdGlvbiwgdGVtcGxhdGVDb250ZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn0iXX0=