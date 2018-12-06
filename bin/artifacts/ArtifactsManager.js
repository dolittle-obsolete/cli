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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiX2ZvbGRlcnMiLCJfZmlsZVN5c3RlbSIsIl9pbnF1aXJlck1hbmFnZXIiLCJfZG9saXR0bGVDb25maWciLCJBcnRpZmFjdHNNYW5hZ2VyIiwiaW5xdWlyZXJNYW5hZ2VyIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImJvdW5kZWRDb250ZXh0TWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwiZG9saXR0bGVDb25maWciLCJzZXQiLCJfbG9nZ2VyIiwic3RhcnRQYXRoIiwiYm91bmRlZENvbnRleHQiLCJnZXQiLCJnZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWciLCJfdmFsaWRhdGVCb3VuZGVkQ29udGV4dCIsImNvcmUiLCJsYW5ndWFnZSIsImVycm9yIiwidHlwZSIsImJvaWxlclBsYXRlcyIsImJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlIiwibGVuZ3RoIiwiYm9pbGVyUGxhdGUiLCJhcnRpZmFjdFR5cGUiLCJ0ZW1wbGF0ZUZpbGVzIiwic2VhcmNoUmVjdXJzaXZlIiwibG9jYXRpb24iLCJ0ZW1wbGF0ZXNBbmRMb2NhdGlvbiIsImZvckVhY2giLCJfIiwidGVtcGxhdGUiLCJKU09OIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJwdXNoIiwiYXJ0aWZhY3RUZW1wbGF0ZSIsImZpbHRlciIsInVuZGVmaW5lZCIsImNvbnRleHQiLCJib3VuZGVkQ29udGV4dENvbmZpZyIsImRlc3RpbmF0aW9uIiwiYXJ0aWZhY3ROYW1lIiwicGF0aCIsInJlcXVpcmUiLCJpc0Fic29sdXRlIiwiX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyIsImN3ZCIsInByb2Nlc3MiLCJkZXN0aW5hdGlvblJlc3VsdCIsImFyZWEiLCJnZXROZWFyZXN0Qm91bmRlZENvbnRleHRQYXRoIiwibmFtZSIsIl9nZXRBcnRpZmFjdHNCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2UiLCJfZ2V0QXJ0aWZhY3RUZW1wbGF0ZUJ5Qm9pbGVycGxhdGUiLCJlbnN1cmVEaXJTeW5jIiwicHJvbXB0VXNlciIsInRoZW4iLCJpbmZvIiwiY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSIsInRlbXBsYXRlQ29udGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBTUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUVBOzs7QUFHQSxJQUFNQSx1QkFBdUIsSUFBSUMsT0FBSixFQUE3QjtBQUNBOzs7QUFyQkE7Ozs7O0FBS0E7QUFtQkEsSUFBTUMseUJBQXlCLElBQUlELE9BQUosRUFBL0I7QUFDQTs7O0FBR0EsSUFBTUUsV0FBVyxJQUFJRixPQUFKLEVBQWpCO0FBQ0E7OztBQUdBLElBQU1HLGNBQWMsSUFBSUgsT0FBSixFQUFwQjtBQUNBOzs7QUFHQSxJQUFNSSxtQkFBbUIsSUFBSUosT0FBSixFQUF6Qjs7QUFFQSxJQUFNSyxrQkFBa0IsSUFBSUwsT0FBSixFQUF4Qjs7QUFFQTs7OztJQUdhTSxnQixXQUFBQSxnQjtBQUNUOzs7Ozs7Ozs7QUFTQSw4QkFBWUMsZUFBWixFQUE2QkMsbUJBQTdCLEVBQWtEQyxxQkFBbEQsRUFBeUVDLE9BQXpFLEVBQWtGQyxVQUFsRixFQUE4RkMsTUFBOUYsRUFBc0dDLGNBQXRHLEVBQXNIO0FBQUE7O0FBQ2xIVCx5QkFBaUJVLEdBQWpCLENBQXFCLElBQXJCLEVBQTJCUCxlQUEzQjtBQUNBUiw2QkFBcUJlLEdBQXJCLENBQXlCLElBQXpCLEVBQStCTixtQkFBL0I7QUFDQVAsK0JBQXVCYSxHQUF2QixDQUEyQixJQUEzQixFQUFpQ0wscUJBQWpDO0FBQ0FQLGlCQUFTWSxHQUFULENBQWEsSUFBYixFQUFtQkosT0FBbkI7QUFDQVAsb0JBQVlXLEdBQVosQ0FBZ0IsSUFB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QURMLENBQ1UsMkJBQW1CO0FBQ3JCLHVCQUFLL0MsT0FBTCxDQUFhZ0QsSUFBYixxQ0FBbURuQixRQUFRZixZQUEzRCx1QkFBdUZrQixZQUF2RiwwQkFBc0h6QixRQUF0SDtBQUNBdkIscUNBQXFCbUIsR0FBckIsQ0FBeUIsTUFBekIsRUFBK0I4QyxzQkFBL0IsQ0FBc0R2QixnQkFBdEQsRUFBd0VLLFdBQXhFLEVBQXFGbUIsZUFBckY7QUFDSCxhQUpMO0FBS0giLCJmaWxlIjoiQXJ0aWZhY3RzTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbmltcG9ydCB7Rm9sZGVyc30gZnJvbSAnLi4vRm9sZGVycyc7XHJcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICd3aW5zdG9uJztcclxuaW1wb3J0IHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfSBmcm9tICcuLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XHJcbmltcG9ydCB7SW5xdWlyZXJNYW5hZ2VyfSBmcm9tICcuL0lucXVpcmVyTWFuYWdlcic7XHJcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XHJcbmltcG9ydCB7Qm9pbGVyUGxhdGV9IGZyb20gJy4uL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZSc7XHJcbmltcG9ydCB7Qm91bmRlZENvbnRleHR9IGZyb20gJy4uL2JvdW5kZWRDb250ZXh0cy9Cb3VuZGVkQ29udGV4dCc7XHJcbmltcG9ydCB7Qm91bmRlZENvbnRleHRNYW5hZ2VyfSBmcm9tICcuLi9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyJztcclxuaW1wb3J0IHsgZ2V0RmlsZURpclBhdGgsIGRldGVybWluZURlc3RpbmF0aW9uIH0gZnJvbSAnLi4vaGVscGVycyc7XHJcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7V2Vha01hcDxBcnRpZmFjdHNNYW5hZ2VyLCBCb2lsZXJQbGF0ZXNNYW5hZ2VyPn1cclxuICovXHJcbmNvbnN0IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPEFydGlmYWN0c01hbmFnZXIsIEJvdW5kZWRDb250ZXh0TWFuYWdlcj59XHJcbiAqL1xyXG5jb25zdCBfYm91bmRlZENvbnRleHRNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPEFydGlmYWN0c01hbmFnZXIsIEZvbGRlcnM+fVxyXG4gKi9cclxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xyXG4vKipcclxuICogQHR5cGUge1dlYWtNYXA8QXJ0aWZhY3RzTWFuYWdlciwgZnM+fVxyXG4gKi9cclxuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xyXG4vKipcclxuICogQHR5cGUge1dlYWtNYXA8QXJ0aWZhY3RzTWFuYWdlciwgSW5xdWlyZXJNYW5hZ2VyPn1cclxuICovXHJcbmNvbnN0IF9pbnF1aXJlck1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuY29uc3QgX2RvbGl0dGxlQ29uZmlnID0gbmV3IFdlYWtNYXAoKTtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgbWFuYWdlciBmb3IgYXJ0aWZhY3RzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXJ0aWZhY3RzTWFuYWdlciB7XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XHJcbiAgICAgKiBAcGFyYW0ge0lucXVpcmVyTWFuYWdlcn0gaW5xdWlyZXJNYW5hZ2VyXHJcbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlc01hbmFnZXJ9IGJvaWxlclBsYXRlc01hbmFnZXJcclxuICAgICAqIEBwYXJhbSB7Ym91bmRlZENvbnRleHRNYW5hZ2VyfSBib3VuZGVkQ29udGV4dE1hbmFnZXJcclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVycyBcclxuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cclxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaW5xdWlyZXJNYW5hZ2VyLCBib2lsZXJQbGF0ZXNNYW5hZ2VyLCBib3VuZGVkQ29udGV4dE1hbmFnZXIsIGZvbGRlcnMsIGZpbGVTeXN0ZW0sIGxvZ2dlciwgZG9saXR0bGVDb25maWcpIHtcclxuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLnNldCh0aGlzLCBpbnF1aXJlck1hbmFnZXIpO1xyXG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLnNldCh0aGlzLCBib2lsZXJQbGF0ZXNNYW5hZ2VyKTtcclxuICAgICAgICBfYm91bmRlZENvbnRleHRNYW5hZ2VyLnNldCh0aGlzLCBib3VuZGVkQ29udGV4dE1hbmFnZXIpO1xyXG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcclxuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XHJcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xyXG4gICAgICAgIF9kb2xpdHRsZUNvbmZpZy5zZXQodGhpcywgZG9saXR0bGVDb25maWcpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2hlcyB0aGUgZmlsZSBkaXJlY3RvcmllcyBmb3IgdGhlIGJvdW5kZWQtY29udGV4dC5qc29uIGNvbmZpZ3VyYXRpb24gZmlsZSByZWN1cnNpdmVseSBieSBnb2luZyB1cHdhcmRzIGluIHRoZSBoaWVyYXJjaHlcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydFBhdGggV2hlcmUgdG8gc3RhcnQgbG9va2luZyBmb3IgdGhlIGJvdW5kZWQgY29udGV4dFxyXG4gICAgICogQHJldHVybiB7Qm91bmRlZENvbnRleHR9IGJvdW5kZWQgY29udGV4dCBjb25maWd1cmF0aW9uIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBfZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnKHN0YXJ0UGF0aCkge1xyXG4gICAgICAgIGxldCBib3VuZGVkQ29udGV4dCA9IF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuZ2V0KHRoaXMpLmdldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyhzdGFydFBhdGgpO1xyXG5cclxuICAgICAgICB0aGlzLl92YWxpZGF0ZUJvdW5kZWRDb250ZXh0KGJvdW5kZWRDb250ZXh0KTtcclxuICAgICAgICByZXR1cm4gYm91bmRlZENvbnRleHQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFZhbGlkYXRlcyB0aGUgZmllbGRzIG9mIHRoZSBwYXJzZWQgYm91bmRlZC1jb250ZXh0Lmpzb24gb2JqZWN0IFxyXG4gICAgICogQHBhcmFtIHtCb3VuZGVkQ29udGV4dH0gYm91bmRlZENvbnRleHQgXHJcbiAgICAgKi9cclxuICAgIF92YWxpZGF0ZUJvdW5kZWRDb250ZXh0KGJvdW5kZWRDb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKCAhKGJvdW5kZWRDb250ZXh0LmNvcmUgJiYgYm91bmRlZENvbnRleHQuY29yZS5sYW5ndWFnZSAmJiBib3VuZGVkQ29udGV4dC5jb3JlLmxhbmd1YWdlICE9PSAnJykpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmVycm9yKCdUaGUgYm91bmRlZC1jb250ZXh0Lmpzb24gY29uZmlndXJhdGlvbiBpcyBtaXNzaW5nIFwibGFuZ3VhZ2VcIicpO1xyXG4gICAgICAgICAgICB0aHJvdyAnQm91bmRlZCBDb250ZXh0IGNvbmZpZ3VyYXRpb24gbWlzc2luZyBsYW5ndWFnZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGJvaWxlcnBsYXRlLmpzb24gY29uZmlndXJhdGlvbiBmb3IgYXJ0aWZhY3RzIHdpdGggdGhlIGdpdmVuIGxhbmd1YWdlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgXHJcbiAgICAgKiBAcmV0dXJuIHtCb2lsZXJQbGF0ZX0gVGhlIEJvaWxlcnBsYXRlIHdpdGggb2YgdGhlIGdpdmVuIGxhbmd1YWdlXHJcbiAgICAgKi9cclxuICAgIF9nZXRBcnRpZmFjdHNCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2UobGFuZ3VhZ2UpIHtcclxuICAgICAgICBjb25zdCB0eXBlID0gJ2FydGlmYWN0cyc7XHJcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlcyA9IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5ib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZShsYW5ndWFnZSwgdHlwZSk7XHJcbiAgICAgICAgaWYgKGJvaWxlclBsYXRlcyA9PT0gbnVsbCB8fCBib2lsZXJQbGF0ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgQ291bGQgbm90IGZpbmQgYSBib2lsZXJwbGF0ZS5qc29uIGNvbmZpZ3VyYXRpb24gZm9yIGxhbmd1YWdlOiAke2xhbmd1YWdlfSBhbmQgdHlwZTogJHt0eXBlfWApO1xyXG4gICAgICAgICAgICB0aHJvdyAnQ291bGQgbm90IGZpbmQgYm9pbGVycGxhdGUgZm9yIGdpdmVuIGxhbmd1YWdlIGFuZCB0eXBlJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJvaWxlclBsYXRlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgRm91bmQgbW9yZSB0aGFuIG9uZSBib2lsZXJwbGF0ZS5qc29uIGNvbmZpZ3VyYXRpb24gZm9yIGxhbmd1YWdlOiAke2xhbmd1YWdlfSBhbmQgdHlwZTogJHt0eXBlfWApO1xyXG4gICAgICAgICAgICB0aHJvdyAnRm91bmQgbXVsdGlwbGUgYm9pbGVycGxhdGVzJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJvaWxlclBsYXRlc1swXTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgYXJ0aWZhY3QgdGVtcGxhdGUgYWxvbmdzaWRlIHdpdGggdGhlIGxvY2F0aW9uIG9mIHdoZXJlIGl0IHdhcyBmb3VuZCBiYXNlZCBvbiB0aGUgbGFuZ3VhZ2UgYW5kIHR5cGUgb2YgdGhlIGFydGlmYWN0XHJcbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlfSBib2lsZXJQbGF0ZSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhcnRpZmFjdFR5cGVcclxuICAgICAqIEByZXR1cm5zIHt7dGVtcGxhdGU6IGFueSwgbG9jYXRpb246IHN0cmluZ319XHJcbiAgICAgKi9cclxuICAgIF9nZXRBcnRpZmFjdFRlbXBsYXRlQnlCb2lsZXJwbGF0ZShib2lsZXJQbGF0ZSwgYXJ0aWZhY3RUeXBlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0ZW1wbGF0ZUZpbGVzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLnNlYXJjaFJlY3Vyc2l2ZShib2lsZXJQbGF0ZS5sb2NhdGlvbiwgJ3RlbXBsYXRlLmpzb24nKTtcclxuICAgICAgICBsZXQgdGVtcGxhdGVzQW5kTG9jYXRpb24gPSBbXTtcclxuICAgICAgICB0ZW1wbGF0ZUZpbGVzLmZvckVhY2goXyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsb2NhdGlvbiA9IGdldEZpbGVEaXJQYXRoKF8pO1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBKU09OLnBhcnNlKF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoXywgJ3V0ZjgnKSksXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGVtcGxhdGVzQW5kTG9jYXRpb24ucHVzaCh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgYXJ0aWZhY3RUZW1wbGF0ZSA9IHRlbXBsYXRlc0FuZExvY2F0aW9uLmZpbHRlcih0ZW1wbGF0ZSA9PiB0ZW1wbGF0ZS50ZW1wbGF0ZS50eXBlID09IGFydGlmYWN0VHlwZSAmJiB0ZW1wbGF0ZS50ZW1wbGF0ZS5sYW5ndWFnZSA9PSBib2lsZXJQbGF0ZS5sYW5ndWFnZSlbMF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGFydGlmYWN0VGVtcGxhdGUgPT09IHVuZGVmaW5lZCB8fCBhcnRpZmFjdFRlbXBsYXRlID09PSBudWxsKSBcclxuICAgICAgICAgICAgdGhyb3cgJ0FydGlmYWN0IHRlbXBsYXRlIG5vdCBmb3VuZCc7XHJcblxyXG4gICAgICAgIHJldHVybiBhcnRpZmFjdFRlbXBsYXRlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGFydGlmYWN0IG9mIHRoZSBnaXZlbiB0eXBlIGF0IHRoZSBnaXZlbiBkZXN0aW5hdGlvbiB3aXRoIHRoZSBnaXZlbiBuYW1lIFxyXG4gICAgICogQHBhcmFtIHt7YXJ0aWZhY3ROYW1lOiBzdHJpbmcsIGFydGlmYWN0VHlwZTogc3RyaW5nLCBhcmVhOiBzdHJpbmcsIHBhdGg6IHN0cmluZ319IGNvbnRleHQgXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUFydGlmYWN0KGNvbnRleHQpIHtcclxuICAgICAgICBsZXQgYm91bmRlZENvbnRleHRDb25maWcgPSBudWxsO1xyXG4gICAgICAgIGxldCBsYW5ndWFnZSA9ICcnO1xyXG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9ICcnO1xyXG4gICAgICAgIGxldCBhcnRpZmFjdE5hbWUgPSAnJztcclxuICAgICAgICBcclxuICAgICAgICBpZiAoY29udGV4dC5wYXRoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcclxuICAgICAgICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUoY29udGV4dC5wYXRoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgYEdpdmVuIHBhdGggJHtjb250ZXh0LnBhdGh9IGlzIG5vdCBhbiBhYnNvbHV0ZSBwYXRoYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IGNvbnRleHQucGF0aDtcclxuICAgICAgICAgICAgYXJ0aWZhY3ROYW1lID0gY29udGV4dC5hcnRpZmFjdE5hbWU7XHJcblxyXG4gICAgICAgICAgICBib3VuZGVkQ29udGV4dENvbmZpZyA9IHRoaXMuX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyhkZXN0aW5hdGlvbik7XHJcbiAgICAgICAgICAgIGxhbmd1YWdlID0gYm91bmRlZENvbnRleHRDb25maWcuY29yZS5sYW5ndWFnZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBjd2QgPSBwcm9jZXNzLmN3ZCgpO1xyXG4gICAgICAgICAgICBib3VuZGVkQ29udGV4dENvbmZpZyA9IHRoaXMuX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyhjd2QpO1xyXG4gICAgICAgICAgICBsYW5ndWFnZSA9IGJvdW5kZWRDb250ZXh0Q29uZmlnLmNvcmUubGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZGVzdGluYXRpb25SZXN1bHQgPSBkZXRlcm1pbmVEZXN0aW5hdGlvbihjb250ZXh0LmFyZWEsIGxhbmd1YWdlLCBjb250ZXh0LmFydGlmYWN0TmFtZSwgY3dkLCBfYm91bmRlZENvbnRleHRNYW5hZ2VyLmdldCh0aGlzKS5nZXROZWFyZXN0Qm91bmRlZENvbnRleHRQYXRoKGN3ZCksIF9kb2xpdHRsZUNvbmZpZy5nZXQodGhpcykpO1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uUmVzdWx0LmRlc3RpbmF0aW9uO1xyXG4gICAgICAgICAgICBhcnRpZmFjdE5hbWUgPSBkZXN0aW5hdGlvblJlc3VsdC5uYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSB0aGlzLl9nZXRBcnRpZmFjdHNCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2UobGFuZ3VhZ2UpO1xyXG4gICAgICAgIGxldCBhcnRpZmFjdFRlbXBsYXRlID0gdGhpcy5fZ2V0QXJ0aWZhY3RUZW1wbGF0ZUJ5Qm9pbGVycGxhdGUoYm9pbGVyUGxhdGUsIGNvbnRleHQuYXJ0aWZhY3RUeXBlKTtcclxuXHJcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmVuc3VyZURpclN5bmMoZGVzdGluYXRpb24pO1xyXG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuZ2V0KHRoaXMpLnByb21wdFVzZXIoYXJ0aWZhY3ROYW1lLCBkZXN0aW5hdGlvbiwgYm9pbGVyUGxhdGUsIGFydGlmYWN0VGVtcGxhdGUudGVtcGxhdGUpXHJcbiAgICAgICAgICAgIC50aGVuKHRlbXBsYXRlQ29udGV4dCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgYW4gYXJ0aWZhY3Qgb2YgdHlwZSAnJHtjb250ZXh0LmFydGlmYWN0VHlwZX0nIHdpdGggbmFtZSAnJHthcnRpZmFjdE5hbWV9JyBhbmQgbGFuZ3VhZ2UgJyR7bGFuZ3VhZ2V9J2ApO1xyXG4gICAgICAgICAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoYXJ0aWZhY3RUZW1wbGF0ZSwgZGVzdGluYXRpb24sIHRlbXBsYXRlQ29udGV4dCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19