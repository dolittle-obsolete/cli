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

var _dolittleConfig = new WeakMap();

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
    function ArtifactsManager(inquirerManager, boilerPlatesManager, boundedContextManager, folders, fileSystem, logger, dolittleConfig) {
        (0, _classCallCheck3.default)(this, ArtifactsManager);

        _inquirerManager.set(this, inquirerManager);
        _boilerPlatesManager.set(this, boilerPlatesManager);
        _boundedContextManager.set(this, boundedContextManager);
        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        this._logger = logger;
        _dolittleConfig.set(this, dolittleConfig);
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
            if (!(boundedContext.core && boundedContext.core.language && boundedContext.core.language !== '')) {
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
         * @param {{artifactName: string, artifactType: string, area: string, path: string}} context 
         */

    }, {
        key: 'createArtifact',
        value: function createArtifact(context) {
            var _this2 = this;

            var boundedContextConfig = null;
            var language = '';
            var destination = '';
            var artifactName = '';

            if (context.path !== undefined) {
                var path = require('path');
                if (!path.isAbsolute(context.path)) {
                    throw 'Given path ' + context.path + ' is not an absolute path';
                }
                destination = context.path;
                artifactName = context.artifactName;

                boundedContextConfig = this._getNearestBoundedContextConfig(destination);
                language = boundedContextConfig.core.language;
            } else {
                var cwd = process.cwd();
                boundedContextConfig = this._getNearestBoundedContextConfig(cwd);
                language = boundedContextConfig.core.language;

                var destinationResult = (0, _helpers.determineDestination)(context.area, language, context.artifactName, cwd, _boundedContextManager.get(this).getNearestBoundedContextPath(cwd), _dolittleConfig.get(this));
                destination = destinationResult.destination;
                artifactName = destinationResult.name;
            }
            var boilerPlate = this._getArtifactsBoilerPlateByLanguage(language);
            var artifactTemplate = this._getArtifactTemplateByBoilerplate(boilerPlate, context.artifactType);

            _fileSystem.get(this).ensureDirSync(destination);
            _inquirerManager.get(this).promptUser(artifactName, destination, boilerPlate, artifactTemplate.template).then(function (templateContext) {
                _this2._logger.info('Creating an artifact of type \'' + context.artifactType + '\' with name \'' + artifactName + '\' and language \'' + language + '\'');
                _boilerPlatesManager.get(_this2).createArtifactInstance(artifactTemplate, destination, templateContext);
            });
        }
    }]);
    return ArtifactsManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiX2ZvbGRlcnMiLCJfZmlsZVN5c3RlbSIsIl9pbnF1aXJlck1hbmFnZXIiLCJfZG9saXR0bGVDb25maWciLCJBcnRpZmFjdHNNYW5hZ2VyIiwiaW5xdWlyZXJNYW5hZ2VyIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImJvdW5kZWRDb250ZXh0TWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwiZG9saXR0bGVDb25maWciLCJzZXQiLCJfbG9nZ2VyIiwic3RhcnRQYXRoIiwiYm91bmRlZENvbnRleHQiLCJnZXQiLCJnZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWciLCJfdmFsaWRhdGVCb3VuZGVkQ29udGV4dCIsImNvcmUiLCJsYW5ndWFnZSIsImVycm9yIiwidHlwZSIsImJvaWxlclBsYXRlcyIsImJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlIiwibGVuZ3RoIiwiYm9pbGVyUGxhdGUiLCJhcnRpZmFjdFR5cGUiLCJ0ZW1wbGF0ZUZpbGVzIiwic2VhcmNoUmVjdXJzaXZlIiwibG9jYXRpb24iLCJ0ZW1wbGF0ZXNBbmRMb2NhdGlvbiIsImZvckVhY2giLCJfIiwidGVtcGxhdGUiLCJKU09OIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJwdXNoIiwiYXJ0aWZhY3RUZW1wbGF0ZSIsImZpbHRlciIsInVuZGVmaW5lZCIsImNvbnRleHQiLCJib3VuZGVkQ29udGV4dENvbmZpZyIsImRlc3RpbmF0aW9uIiwiYXJ0aWZhY3ROYW1lIiwicGF0aCIsInJlcXVpcmUiLCJpc0Fic29sdXRlIiwiX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyIsImN3ZCIsInByb2Nlc3MiLCJkZXN0aW5hdGlvblJlc3VsdCIsImFyZWEiLCJnZXROZWFyZXN0Qm91bmRlZENvbnRleHRQYXRoIiwibmFtZSIsIl9nZXRBcnRpZmFjdHNCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2UiLCJfZ2V0QXJ0aWZhY3RUZW1wbGF0ZUJ5Qm9pbGVycGxhdGUiLCJlbnN1cmVEaXJTeW5jIiwicHJvbXB0VXNlciIsInRoZW4iLCJpbmZvIiwiY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSIsInRlbXBsYXRlQ29udGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBTUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUVBOzs7QUFHQSxJQUFNQSx1QkFBdUIsSUFBSUMsT0FBSixFQUE3QjtBQUNBOzs7QUFyQkE7Ozs7O0FBS0E7QUFtQkEsSUFBTUMseUJBQXlCLElBQUlELE9BQUosRUFBL0I7QUFDQTs7O0FBR0EsSUFBTUUsV0FBVyxJQUFJRixPQUFKLEVBQWpCO0FBQ0E7OztBQUdBLElBQU1HLGNBQWMsSUFBSUgsT0FBSixFQUFwQjtBQUNBOzs7QUFHQSxJQUFNSSxtQkFBbUIsSUFBSUosT0FBSixFQUF6Qjs7QUFFQSxJQUFNSyxrQkFBa0IsSUFBSUwsT0FBSixFQUF4Qjs7QUFFQTs7OztJQUdhTSxnQixXQUFBQSxnQjtBQUNUOzs7Ozs7Ozs7QUFTQSw4QkFBWUMsZUFBWixFQUE2QkMsbUJBQTdCLEVBQWtEQyxxQkFBbEQsRUFBeUVDLE9BQXpFLEVBQWtGQyxVQUFsRixFQUE4RkMsTUFBOUYsRUFBc0dDLGNBQXRHLEVBQXNIO0FBQUE7O0FBQ2xIVCx5QkFBaUJVLEdBQWpCLENBQXFCLElBQXJCLEVBQTJCUCxlQUEzQjtBQUNBUiw2QkFBcUJlLEdBQXJCLENBQXlCLElBQXpCLEVBQStCTixtQkFBL0I7QUFDQVAsK0JBQXVCYSxHQUF2QixDQUEyQixJQUEzQixFQUFpQ0wscUJBQWpDO0FBQ0FQLGlCQUFTWSxHQUFULENBQWEsSUFBYixFQUFtQkosT0FBbkI7QUFDQVAsb0JBQVlXLEdBQVosQ0FBZ0IsSUFB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QURMLENBQ1UsMkJBQW1CO0FBQ3JCLHVCQUFLL0MsT0FBTCxDQUFhZ0QsSUFBYixxQ0FBbURuQixRQUFRZixZQUEzRCx1QkFBdUZrQixZQUF2RiwwQkFBc0h6QixRQUF0SDtBQUNBdkIscUNBQXFCbUIsR0FBckIsQ0FBeUIsTUFBekIsRUFBK0I4QyxzQkFBL0IsQ0FBc0R2QixnQkFBdEQsRUFBd0VLLFdBQXhFLEVBQXFGbUIsZUFBckY7QUFDSCxhQUpMO0FBS0giLCJmaWxlIjoiQXJ0aWZhY3RzTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7Rm9sZGVyc30gZnJvbSAnLi4vRm9sZGVycyc7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQge0JvaWxlclBsYXRlc01hbmFnZXJ9IGZyb20gJy4uL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCB7SW5xdWlyZXJNYW5hZ2VyfSBmcm9tICcuL0lucXVpcmVyTWFuYWdlcic7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHtCb2lsZXJQbGF0ZX0gZnJvbSAnLi4vYm9pbGVyUGxhdGVzL0JvaWxlclBsYXRlJztcbmltcG9ydCB7Qm91bmRlZENvbnRleHR9IGZyb20gJy4uL2JvdW5kZWRDb250ZXh0cy9Cb3VuZGVkQ29udGV4dCc7XG5pbXBvcnQge0JvdW5kZWRDb250ZXh0TWFuYWdlcn0gZnJvbSAnLi4vYm91bmRlZENvbnRleHRzL0JvdW5kZWRDb250ZXh0TWFuYWdlcic7XG5pbXBvcnQgeyBnZXRGaWxlRGlyUGF0aCwgZGV0ZXJtaW5lRGVzdGluYXRpb24gfSBmcm9tICcuLi9oZWxwZXJzJztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxBcnRpZmFjdHNNYW5hZ2VyLCBCb2lsZXJQbGF0ZXNNYW5hZ2VyPn1cbiAqL1xuY29uc3QgX2JvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxBcnRpZmFjdHNNYW5hZ2VyLCBCb3VuZGVkQ29udGV4dE1hbmFnZXI+fVxuICovXG5jb25zdCBfYm91bmRlZENvbnRleHRNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8QXJ0aWZhY3RzTWFuYWdlciwgRm9sZGVycz59XG4gKi9cbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8QXJ0aWZhY3RzTWFuYWdlciwgZnM+fVxuICovXG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEFydGlmYWN0c01hbmFnZXIsIElucXVpcmVyTWFuYWdlcj59XG4gKi9cbmNvbnN0IF9pbnF1aXJlck1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBfZG9saXR0bGVDb25maWcgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBtYW5hZ2VyIGZvciBhcnRpZmFjdHNcbiAqL1xuZXhwb3J0IGNsYXNzIEFydGlmYWN0c01hbmFnZXIge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtJbnF1aXJlck1hbmFnZXJ9IGlucXVpcmVyTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGVzTWFuYWdlcn0gYm9pbGVyUGxhdGVzTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Ym91bmRlZENvbnRleHRNYW5hZ2VyfSBib3VuZGVkQ29udGV4dE1hbmFnZXJcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnMgXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpbnF1aXJlck1hbmFnZXIsIGJvaWxlclBsYXRlc01hbmFnZXIsIGJvdW5kZWRDb250ZXh0TWFuYWdlciwgZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyLCBkb2xpdHRsZUNvbmZpZykge1xuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLnNldCh0aGlzLCBpbnF1aXJlck1hbmFnZXIpO1xuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5zZXQodGhpcywgYm9pbGVyUGxhdGVzTWFuYWdlcik7XG4gICAgICAgIF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuc2V0KHRoaXMsIGJvdW5kZWRDb250ZXh0TWFuYWdlcik7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIF9kb2xpdHRsZUNvbmZpZy5zZXQodGhpcywgZG9saXR0bGVDb25maWcpO1xuICAgICAgICBcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VhcmNoZXMgdGhlIGZpbGUgZGlyZWN0b3JpZXMgZm9yIHRoZSBib3VuZGVkLWNvbnRleHQuanNvbiBjb25maWd1cmF0aW9uIGZpbGUgcmVjdXJzaXZlbHkgYnkgZ29pbmcgdXB3YXJkcyBpbiB0aGUgaGllcmFyY2h5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0UGF0aCBXaGVyZSB0byBzdGFydCBsb29raW5nIGZvciB0aGUgYm91bmRlZCBjb250ZXh0XG4gICAgICogQHJldHVybiB7Qm91bmRlZENvbnRleHR9IGJvdW5kZWQgY29udGV4dCBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICAqL1xuICAgIF9nZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWcoc3RhcnRQYXRoKSB7XG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dCA9IF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuZ2V0KHRoaXMpLmdldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyhzdGFydFBhdGgpO1xuXG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlQm91bmRlZENvbnRleHQoYm91bmRlZENvbnRleHQpO1xuICAgICAgICByZXR1cm4gYm91bmRlZENvbnRleHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlcyB0aGUgZmllbGRzIG9mIHRoZSBwYXJzZWQgYm91bmRlZC1jb250ZXh0Lmpzb24gb2JqZWN0IFxuICAgICAqIEBwYXJhbSB7Qm91bmRlZENvbnRleHR9IGJvdW5kZWRDb250ZXh0IFxuICAgICAqL1xuICAgIF92YWxpZGF0ZUJvdW5kZWRDb250ZXh0KGJvdW5kZWRDb250ZXh0KSB7XG4gICAgICAgIGlmICggIShib3VuZGVkQ29udGV4dC5jb3JlICYmIGJvdW5kZWRDb250ZXh0LmNvcmUubGFuZ3VhZ2UgJiYgYm91bmRlZENvbnRleHQuY29yZS5sYW5ndWFnZSAhPT0gJycpKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoJ1RoZSBib3VuZGVkLWNvbnRleHQuanNvbiBjb25maWd1cmF0aW9uIGlzIG1pc3NpbmcgXCJsYW5ndWFnZVwiJyk7XG4gICAgICAgICAgICB0aHJvdyAnQm91bmRlZCBDb250ZXh0IGNvbmZpZ3VyYXRpb24gbWlzc2luZyBsYW5ndWFnZSc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBib2lsZXJwbGF0ZS5qc29uIGNvbmZpZ3VyYXRpb24gZm9yIGFydGlmYWN0cyB3aXRoIHRoZSBnaXZlbiBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSBcbiAgICAgKiBAcmV0dXJuIHtCb2lsZXJQbGF0ZX0gVGhlIEJvaWxlcnBsYXRlIHdpdGggb2YgdGhlIGdpdmVuIGxhbmd1YWdlXG4gICAgICovXG4gICAgX2dldEFydGlmYWN0c0JvaWxlclBsYXRlQnlMYW5ndWFnZShsYW5ndWFnZSkge1xuICAgICAgICBjb25zdCB0eXBlID0gJ2FydGlmYWN0cyc7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXMgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUobGFuZ3VhZ2UsIHR5cGUpO1xuICAgICAgICBpZiAoYm9pbGVyUGxhdGVzID09PSBudWxsIHx8IGJvaWxlclBsYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgQ291bGQgbm90IGZpbmQgYSBib2lsZXJwbGF0ZS5qc29uIGNvbmZpZ3VyYXRpb24gZm9yIGxhbmd1YWdlOiAke2xhbmd1YWdlfSBhbmQgdHlwZTogJHt0eXBlfWApO1xuICAgICAgICAgICAgdGhyb3cgJ0NvdWxkIG5vdCBmaW5kIGJvaWxlcnBsYXRlIGZvciBnaXZlbiBsYW5ndWFnZSBhbmQgdHlwZSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvaWxlclBsYXRlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYEZvdW5kIG1vcmUgdGhhbiBvbmUgYm9pbGVycGxhdGUuanNvbiBjb25maWd1cmF0aW9uIGZvciBsYW5ndWFnZTogJHtsYW5ndWFnZX0gYW5kIHR5cGU6ICR7dHlwZX1gKTtcbiAgICAgICAgICAgIHRocm93ICdGb3VuZCBtdWx0aXBsZSBib2lsZXJwbGF0ZXMnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib2lsZXJQbGF0ZXNbMF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGFydGlmYWN0IHRlbXBsYXRlIGFsb25nc2lkZSB3aXRoIHRoZSBsb2NhdGlvbiBvZiB3aGVyZSBpdCB3YXMgZm91bmQgYmFzZWQgb24gdGhlIGxhbmd1YWdlIGFuZCB0eXBlIG9mIHRoZSBhcnRpZmFjdFxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGV9IGJvaWxlclBsYXRlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhcnRpZmFjdFR5cGVcbiAgICAgKiBAcmV0dXJucyB7e3RlbXBsYXRlOiBhbnksIGxvY2F0aW9uOiBzdHJpbmd9fVxuICAgICAqL1xuICAgIF9nZXRBcnRpZmFjdFRlbXBsYXRlQnlCb2lsZXJwbGF0ZShib2lsZXJQbGF0ZSwgYXJ0aWZhY3RUeXBlKVxuICAgIHtcbiAgICAgICAgbGV0IHRlbXBsYXRlRmlsZXMgPSBfZm9sZGVycy5nZXQodGhpcykuc2VhcmNoUmVjdXJzaXZlKGJvaWxlclBsYXRlLmxvY2F0aW9uLCAndGVtcGxhdGUuanNvbicpO1xuICAgICAgICBsZXQgdGVtcGxhdGVzQW5kTG9jYXRpb24gPSBbXTtcbiAgICAgICAgdGVtcGxhdGVGaWxlcy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgbGV0IGxvY2F0aW9uID0gZ2V0RmlsZURpclBhdGgoXyk7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogSlNPTi5wYXJzZShfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKF8sICd1dGY4JykpLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRlbXBsYXRlc0FuZExvY2F0aW9uLnB1c2godGVtcGxhdGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYXJ0aWZhY3RUZW1wbGF0ZSA9IHRlbXBsYXRlc0FuZExvY2F0aW9uLmZpbHRlcih0ZW1wbGF0ZSA9PiB0ZW1wbGF0ZS50ZW1wbGF0ZS50eXBlID09IGFydGlmYWN0VHlwZSAmJiB0ZW1wbGF0ZS50ZW1wbGF0ZS5sYW5ndWFnZSA9PSBib2lsZXJQbGF0ZS5sYW5ndWFnZSlbMF07XG4gICAgICAgIFxuICAgICAgICBpZiAoYXJ0aWZhY3RUZW1wbGF0ZSA9PT0gdW5kZWZpbmVkIHx8IGFydGlmYWN0VGVtcGxhdGUgPT09IG51bGwpIFxuICAgICAgICAgICAgdGhyb3cgJ0FydGlmYWN0IHRlbXBsYXRlIG5vdCBmb3VuZCc7XG5cbiAgICAgICAgcmV0dXJuIGFydGlmYWN0VGVtcGxhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYXJ0aWZhY3Qgb2YgdGhlIGdpdmVuIHR5cGUgYXQgdGhlIGdpdmVuIGRlc3RpbmF0aW9uIHdpdGggdGhlIGdpdmVuIG5hbWUgXG4gICAgICogQHBhcmFtIHt7YXJ0aWZhY3ROYW1lOiBzdHJpbmcsIGFydGlmYWN0VHlwZTogc3RyaW5nLCBhcmVhOiBzdHJpbmcsIHBhdGg6IHN0cmluZ319IGNvbnRleHQgXG4gICAgICovXG4gICAgY3JlYXRlQXJ0aWZhY3QoY29udGV4dCkge1xuICAgICAgICBsZXQgYm91bmRlZENvbnRleHRDb25maWcgPSBudWxsO1xuICAgICAgICBsZXQgbGFuZ3VhZ2UgPSAnJztcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gJyc7XG4gICAgICAgIGxldCBhcnRpZmFjdE5hbWUgPSAnJztcbiAgICAgICAgXG4gICAgICAgIGlmIChjb250ZXh0LnBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgICAgICAgICAgIGlmICghcGF0aC5pc0Fic29sdXRlKGNvbnRleHQucGF0aCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBgR2l2ZW4gcGF0aCAke2NvbnRleHQucGF0aH0gaXMgbm90IGFuIGFic29sdXRlIHBhdGhgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVzdGluYXRpb24gPSBjb250ZXh0LnBhdGg7XG4gICAgICAgICAgICBhcnRpZmFjdE5hbWUgPSBjb250ZXh0LmFydGlmYWN0TmFtZTtcblxuICAgICAgICAgICAgYm91bmRlZENvbnRleHRDb25maWcgPSB0aGlzLl9nZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWcoZGVzdGluYXRpb24pO1xuICAgICAgICAgICAgbGFuZ3VhZ2UgPSBib3VuZGVkQ29udGV4dENvbmZpZy5jb3JlLmxhbmd1YWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY3dkID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgICAgIGJvdW5kZWRDb250ZXh0Q29uZmlnID0gdGhpcy5fZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnKGN3ZCk7XG4gICAgICAgICAgICBsYW5ndWFnZSA9IGJvdW5kZWRDb250ZXh0Q29uZmlnLmNvcmUubGFuZ3VhZ2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBkZXN0aW5hdGlvblJlc3VsdCA9IGRldGVybWluZURlc3RpbmF0aW9uKGNvbnRleHQuYXJlYSwgbGFuZ3VhZ2UsIGNvbnRleHQuYXJ0aWZhY3ROYW1lLCBjd2QsIF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuZ2V0KHRoaXMpLmdldE5lYXJlc3RCb3VuZGVkQ29udGV4dFBhdGgoY3dkKSwgX2RvbGl0dGxlQ29uZmlnLmdldCh0aGlzKSk7XG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uUmVzdWx0LmRlc3RpbmF0aW9uO1xuICAgICAgICAgICAgYXJ0aWZhY3ROYW1lID0gZGVzdGluYXRpb25SZXN1bHQubmFtZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSB0aGlzLl9nZXRBcnRpZmFjdHNCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2UobGFuZ3VhZ2UpO1xuICAgICAgICBsZXQgYXJ0aWZhY3RUZW1wbGF0ZSA9IHRoaXMuX2dldEFydGlmYWN0VGVtcGxhdGVCeUJvaWxlcnBsYXRlKGJvaWxlclBsYXRlLCBjb250ZXh0LmFydGlmYWN0VHlwZSk7XG5cbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmVuc3VyZURpclN5bmMoZGVzdGluYXRpb24pO1xuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLmdldCh0aGlzKS5wcm9tcHRVc2VyKGFydGlmYWN0TmFtZSwgZGVzdGluYXRpb24sIGJvaWxlclBsYXRlLCBhcnRpZmFjdFRlbXBsYXRlLnRlbXBsYXRlKVxuICAgICAgICAgICAgLnRoZW4odGVtcGxhdGVDb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgYW4gYXJ0aWZhY3Qgb2YgdHlwZSAnJHtjb250ZXh0LmFydGlmYWN0VHlwZX0nIHdpdGggbmFtZSAnJHthcnRpZmFjdE5hbWV9JyBhbmQgbGFuZ3VhZ2UgJyR7bGFuZ3VhZ2V9J2ApO1xuICAgICAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKGFydGlmYWN0VGVtcGxhdGUsIGRlc3RpbmF0aW9uLCB0ZW1wbGF0ZUNvbnRleHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==