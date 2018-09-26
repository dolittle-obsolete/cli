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

var _BoundedContext = require('../boundedContexts/BoundedContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var _boilerPlatesManager = new WeakMap();
var _boundedContextManager = new WeakMap();
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
                var template = {
                    'template': JSON.parse(_fileSystem.get(_this).readFileSync(_, 'utf8')),
                    'location': _.substring(0, lastIndex + 1)
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

            // console.log('boundedContextConfig. ', boundedContextConfig);
            // console.log('language. ', language);
            // console.log('boilerPlate. ', boilerPlate);
            // console.log('artifactTemplate. ', artifactTemplate);

            _inquirerManager.get(this).promptUser(context.artifactName, context.destination, boilerPlate, artifactTemplate.template).then(function (templateContext) {
                _this2._logger.info('Creating an artifact of type \'' + context.artifactType + '\' with name \'' + context.artifactName + '\' and language \'' + language + '\'');
                _boilerPlatesManager.get(_this2).createArtifactInstance(artifactTemplate, context.destination, templateContext);
            });
        }
    }]);
    return ArtifactsManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiX2ZvbGRlcnMiLCJfZmlsZVN5c3RlbSIsIl9pbnF1aXJlck1hbmFnZXIiLCJBcnRpZmFjdHNNYW5hZ2VyIiwiaW5xdWlyZXJNYW5hZ2VyIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImJvdW5kZWRDb250ZXh0TWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsInN0YXJ0UGF0aCIsImJvdW5kZWRDb250ZXh0IiwiZ2V0IiwiZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnIiwiX3ZhbGlkYXRlQm91bmRlZENvbnRleHQiLCJiYWNrZW5kIiwibGFuZ3VhZ2UiLCJlcnJvciIsInR5cGUiLCJib2lsZXJQbGF0ZXMiLCJib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSIsImxlbmd0aCIsImJvaWxlclBsYXRlIiwiYXJ0aWZhY3RUeXBlIiwidGVtcGxhdGVGaWxlcyIsInNlYXJjaFJlY3Vyc2l2ZSIsImxvY2F0aW9uIiwidGVtcGxhdGVzQW5kTG9jYXRpb24iLCJmb3JFYWNoIiwibGFzdFBhdGhTZXBhcmF0b3JNYXRjaCIsIl8iLCJtYXRjaCIsImxhc3RJbmRleCIsImxhc3RJbmRleE9mIiwidGVtcGxhdGUiLCJKU09OIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJzdWJzdHJpbmciLCJwdXNoIiwiYXJ0aWZhY3RUZW1wbGF0ZSIsImZpbHRlciIsInVuZGVmaW5lZCIsImNvbnRleHQiLCJib3VuZGVkQ29udGV4dENvbmZpZyIsIl9nZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWciLCJkZXN0aW5hdGlvbiIsIl9nZXRBcnRpZmFjdHNCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2UiLCJfZ2V0QXJ0aWZhY3RUZW1wbGF0ZUJ5Qm9pbGVycGxhdGUiLCJwcm9tcHRVc2VyIiwiYXJ0aWZhY3ROYW1lIiwidGhlbiIsImluZm8iLCJjcmVhdGVBcnRpZmFjdEluc3RhbmNlIiwidGVtcGxhdGVDb250ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFYQTs7OztBQWFBLElBQU1BLHVCQUF1QixJQUFJQyxPQUFKLEVBQTdCO0FBQ0EsSUFBTUMseUJBQXlCLElBQUlELE9BQUosRUFBL0I7QUFDQSxJQUFNRSxXQUFXLElBQUlGLE9BQUosRUFBakI7QUFDQSxJQUFNRyxjQUFjLElBQUlILE9BQUosRUFBcEI7QUFDQSxJQUFNSSxtQkFBbUIsSUFBSUosT0FBSixFQUF6Qjs7QUFHQTs7OztJQUdhSyxnQixXQUFBQSxnQjtBQUNUOzs7Ozs7Ozs7QUFTQSw4QkFBWUMsZUFBWixFQUE2QkMsbUJBQTdCLEVBQWtEQyxxQkFBbEQsRUFBeUVDLE9BQXpFLEVBQWtGQyxVQUFsRixFQUE4RkMsTUFBOUYsRUFBc0c7QUFBQTs7QUFDbEdQLHlCQUFpQlEsR0FBakIsQ0FBcUIsSUFBckIsRUFBMkJOLGVBQTNCO0FBQ0FQLDZCQUFxQmEsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JMLG1CQUEvQjtBQUNBTiwrQkFBdUJXLEdBQXZCLENBQTJCLElBQTNCLEVBQWlDSixxQkFBakM7QUFDQU4saUJBQVNVLEdBQVQsQ0FBYSxJQUFiLEVBQW1CSCxPQUFuQjtBQUNBTixvQkFBWVMsR0FBWixDQUFnQixJQUFoQixFQUFzQkYsVUFBdEI7QUFDQSxhQUFLRyxPQUFMLEdBQWVGLE1BQWY7QUFHSDtBQUNEOzs7Ozs7Ozs7d0RBS2dDRyxTLEVBQVc7QUFDdkMsZ0JBQUlDLGlCQUFpQmQsdUJBQXVCZSxHQUF2QixDQUEyQixJQUEzQixFQUFpQ0MsOEJBQWpDLENBQWdFSCxTQUFoRSxDQUFyQjs7QUFFQSxpQkFBS0ksdUJBQUwsQ0FBNkJILGNBQTdCO0FB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UU8sWUFBOUMsRUFBNERQLFFBQVFHLFdBQXBFLEVBQWlGeEIsV0FBakYsRUFBOEZrQixpQkFBaUJOLFFBQS9HLEVBQ0tpQixJQURMLENBQ1UsMkJBQW1CO0FBQ3JCLHVCQUFLMUMsT0FBTCxDQUFhMkMsSUFBYixxQ0FBbURULFFBQVFwQixZQUEzRCx1QkFBdUZvQixRQUFRTyxZQUEvRiwwQkFBOEhsQyxRQUE5SDtBQUNBckIscUNBQXFCaUIsR0FBckIsQ0FBeUIsTUFBekIsRUFBK0J5QyxzQkFBL0IsQ0FBc0RiLGdCQUF0RCxFQUF3RUcsUUFBUUcsV0FBaEYsRUFBNkZRLGVBQTdGO0FBQ0gsYUFKTDtBQUtIIiwiZmlsZSI6IkFydGlmYWN0c01hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG5pbXBvcnQge8KgTG9nZ2VyIH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQge8KgQm9pbGVyUGxhdGVzTWFuYWdlcn0gZnJvbSAnLi4vYm9pbGVyUGxhdGVzL0JvaWxlclBsYXRlc01hbmFnZXInO1xuaW1wb3J0IHsgSW5xdWlyZXJNYW5hZ2VyIH0gZnJvbSAnLi9JbnF1aXJlck1hbmFnZXInO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCB7IEJvaWxlclBsYXRlIH0gZnJvbSAnLi4vYm9pbGVyUGxhdGVzL0JvaWxlclBsYXRlJztcbmltcG9ydCB7IEJvdW5kZWRDb250ZXh0IH0gZnJvbSAnLi4vYm91bmRlZENvbnRleHRzL0JvdW5kZWRDb250ZXh0JztcblxuY29uc3QgX2JvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2JvdW5kZWRDb250ZXh0TWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaW5xdWlyZXJNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBtYW5hZ2VyIGZvciBhcnRpZmFjdHNcbiAqL1xuZXhwb3J0IGNsYXNzIEFydGlmYWN0c01hbmFnZXIge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtJbnF1aXJlck1hbmFnZXJ9IGlucXVpcmVyTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGVzTWFuYWdlcn0gYm9pbGVyUGxhdGVzTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Ym91bmRlZENvbnRleHRNYW5hZ2VyfSBib3VuZGVkQ29udGV4dE1hbmFnZXJcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnMgXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpbnF1aXJlck1hbmFnZXIsIGJvaWxlclBsYXRlc01hbmFnZXIsIGJvdW5kZWRDb250ZXh0TWFuYWdlciwgZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuc2V0KHRoaXMsIGlucXVpcmVyTWFuYWdlcik7XG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLnNldCh0aGlzLCBib2lsZXJQbGF0ZXNNYW5hZ2VyKTtcbiAgICAgICAgX2JvdW5kZWRDb250ZXh0TWFuYWdlci5zZXQodGhpcywgYm91bmRlZENvbnRleHRNYW5hZ2VyKTtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZWFyY2hlcyB0aGUgZmlsZSBkaXJlY3RvcmllcyBmb3IgdGhlIGJvdW5kZWQtY29udGV4dC5qc29uIGNvbmZpZ3VyYXRpb24gZmlsZSByZWN1cnNpdmVseSBieSBnb2luZyB1cHdhcmRzIGluIHRoZSBoaWVyYXJjaHlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnRQYXRoIFdoZXJlIHRvIHN0YXJ0IGxvb2tpbmcgZm9yIHRoZSBib3VuZGVkIGNvbnRleHRcbiAgICAgKiBAcmV0dXJuIHtCb3VuZGVkQ29udGV4dH0gYm91bmRlZCBjb250ZXh0IGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAgICovXG4gICAgX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyhzdGFydFBhdGgpIHtcbiAgICAgICAgbGV0IGJvdW5kZWRDb250ZXh0ID0gX2JvdW5kZWRDb250ZXh0TWFuYWdlci5nZXQodGhpcykuZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnKHN0YXJ0UGF0aCk7XG5cbiAgICAgICAgdGhpcy5fdmFsaWRhdGVCb3VuZGVkQ29udGV4dChib3VuZGVkQ29udGV4dCk7XG4gICAgICAgIHJldHVybiBib3VuZGVkQ29udGV4dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIHRoZSBmaWVsZHMgb2YgdGhlIHBhcnNlZCBib3VuZGVkLWNvbnRleHQuanNvbiBvYmplY3QgXG4gICAgICogQHBhcmFtIHtCb3VuZGVkQ29udGV4dH0gYm91bmRlZENvbnRleHQgXG4gICAgICovXG4gICAgX3ZhbGlkYXRlQm91bmRlZENvbnRleHQoYm91bmRlZENvbnRleHQpIHtcbiAgICAgICAgaWYgKCAhKGJvdW5kZWRDb250ZXh0LmJhY2tlbmQgJiYgYm91bmRlZENvbnRleHQuYmFja2VuZC5sYW5ndWFnZSAmJiBib3VuZGVkQ29udGV4dC5iYWNrZW5kLmxhbmd1YWdlICE9PSAnJykpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcignVGhlIGJvdW5kZWQtY29udGV4dC5qc29uIGNvbmZpZ3VyYXRpb24gaXMgbWlzc2luZyBcImxhbmd1YWdlXCInKTtcbiAgICAgICAgICAgIHRocm93IFwiQm91bmRlZCBDb250ZXh0IGNvbmZpZ3VyYXRpb24gbWlzc2luZyBsYW5ndWFnZVwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgYm9pbGVycGxhdGUuanNvbiBjb25maWd1cmF0aW9uIGZvciBhcnRpZmFjdHMgd2l0aCB0aGUgZ2l2ZW4gbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgXG4gICAgICogQHJldHVybiB7Qm9pbGVyUGxhdGV9IFRoZSBCb2lsZXJwbGF0ZSB3aXRoIG9mIHRoZSBnaXZlbiBsYW5ndWFnZVxuICAgICAqL1xuICAgIF9nZXRBcnRpZmFjdHNCb2lsZXJQbGF0ZUJ5TGFuZ3VhZ2UobGFuZ3VhZ2UpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9ICdhcnRpZmFjdHMnO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKGxhbmd1YWdlLCB0eXBlKTtcbiAgICAgICAgaWYgKGJvaWxlclBsYXRlcyA9PT0gbnVsbCB8fCBib2lsZXJQbGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYENvdWxkIG5vdCBmaW5kIGEgYm9pbGVycGxhdGUuanNvbiBjb25maWd1cmF0aW9uIGZvciBsYW5ndWFnZTogJHtsYW5ndWFnZX0gYW5kIHR5cGU6ICR7dHlwZX1gKVxuICAgICAgICAgICAgdGhyb3cgXCJDb3VsZCBub3QgZmluZCBib2lsZXJwbGF0ZSBmb3IgZ2l2ZW4gbGFuZ3VhZ2UgYW5kIHR5cGVcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9pbGVyUGxhdGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgRm91bmQgbW9yZSB0aGFuIG9uZSBib2lsZXJwbGF0ZS5qc29uIGNvbmZpZ3VyYXRpb24gZm9yIGxhbmd1YWdlOiAke2xhbmd1YWdlfSBhbmQgdHlwZTogJHt0eXBlfWApXG4gICAgICAgICAgICB0aHJvdyBcIkZvdW5kIG11bHRpcGxlIGJvaWxlcnBsYXRlc1wiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib2lsZXJQbGF0ZXNbMF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGFydGlmYWN0IHRlbXBsYXRlIGFsb25nc2lkZSB3aXRoIHRoZSBsb2NhdGlvbiBvZiB3aGVyZSBpdCB3YXMgZm91bmQgYmFzZWQgb24gdGhlIGxhbmd1YWdlIGFuZCB0eXBlIG9mIHRoZSBhcnRpZmFjdFxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGV9IGJvaWxlclBsYXRlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhcnRpZmFjdFR5cGVcbiAgICAgKiBAcmV0dXJucyB7e3RlbXBsYXRlOiBhbnksIGxvY2F0aW9uOiBzdHJpbmd9fVxuICAgICAqL1xuICAgIF9nZXRBcnRpZmFjdFRlbXBsYXRlQnlCb2lsZXJwbGF0ZShib2lsZXJQbGF0ZSwgYXJ0aWZhY3RUeXBlKVxuICAgIHtcbiAgICAgICAgbGV0IHRlbXBsYXRlRmlsZXMgPSBfZm9sZGVycy5nZXQodGhpcykuc2VhcmNoUmVjdXJzaXZlKGJvaWxlclBsYXRlLmxvY2F0aW9uLCAndGVtcGxhdGUuanNvbicpO1xuICAgICAgICBsZXQgdGVtcGxhdGVzQW5kTG9jYXRpb24gPSBbXTtcbiAgICAgICAgdGVtcGxhdGVGaWxlcy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFzdFBhdGhTZXBhcmF0b3JNYXRjaCA9IF8ubWF0Y2goLyhcXFxcfFxcLykvKTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IF8ubGFzdEluZGV4T2YobGFzdFBhdGhTZXBhcmF0b3JNYXRjaFtsYXN0UGF0aFNlcGFyYXRvck1hdGNoLmxlbmd0aC0xXSk7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAndGVtcGxhdGUnOiBKU09OLnBhcnNlKF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoXywgJ3V0ZjgnKSksXG4gICAgICAgICAgICAgICAgJ2xvY2F0aW9uJzogXy5zdWJzdHJpbmcoMCwgbGFzdEluZGV4KzEpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGVtcGxhdGVzQW5kTG9jYXRpb24ucHVzaCh0ZW1wbGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBhcnRpZmFjdFRlbXBsYXRlID0gdGVtcGxhdGVzQW5kTG9jYXRpb24uZmlsdGVyKHRlbXBsYXRlID0+IHRlbXBsYXRlLnRlbXBsYXRlLnR5cGUgPT0gYXJ0aWZhY3RUeXBlICYmIHRlbXBsYXRlLnRlbXBsYXRlLmxhbmd1YWdlID09IGJvaWxlclBsYXRlLmxhbmd1YWdlKVswXTtcbiAgICAgICAgaWYgKGFydGlmYWN0VGVtcGxhdGUgPT09IHVuZGVmaW5lZCB8fCBhcnRpZmFjdFRlbXBsYXRlID09PSBudWxsKSBcbiAgICAgICAgICAgIHRocm93ICdBcnRpZmFjdCB0ZW1wbGF0ZSBub3QgZm91bmQnO1xuXG4gICAgICAgIHJldHVybiBhcnRpZmFjdFRlbXBsYXRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGFydGlmYWN0IG9mIHRoZSBnaXZlbiB0eXBlIGF0IHRoZSBnaXZlbiBkZXN0aW5hdGlvbiB3aXRoIHRoZSBnaXZlbiBuYW1lIFxuICAgICAqIEBwYXJhbSB7e2FydGlmYWN0TmFtZTogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nLCBhcnRpZmFjdFR5cGU6IHN0cmluZ319IGNvbnRleHQgXG4gICAgICovXG4gICAgY3JlYXRlQXJ0aWZhY3QoY29udGV4dCkge1xuICAgICAgICBsZXQgYm91bmRlZENvbnRleHRDb25maWcgPSB0aGlzLl9nZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWcoY29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgICAgIGxldCBsYW5ndWFnZSA9IGJvdW5kZWRDb250ZXh0Q29uZmlnLmJhY2tlbmQubGFuZ3VhZ2U7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IHRoaXMuX2dldEFydGlmYWN0c0JvaWxlclBsYXRlQnlMYW5ndWFnZShsYW5ndWFnZSk7XG4gICAgICAgIGxldCBhcnRpZmFjdFRlbXBsYXRlID0gdGhpcy5fZ2V0QXJ0aWZhY3RUZW1wbGF0ZUJ5Qm9pbGVycGxhdGUoYm9pbGVyUGxhdGUsIGNvbnRleHQuYXJ0aWZhY3RUeXBlKTtcbiAgICAgICAgXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdib3VuZGVkQ29udGV4dENvbmZpZy4gJywgYm91bmRlZENvbnRleHRDb25maWcpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnbGFuZ3VhZ2UuICcsIGxhbmd1YWdlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2JvaWxlclBsYXRlLiAnLCBib2lsZXJQbGF0ZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdhcnRpZmFjdFRlbXBsYXRlLiAnLCBhcnRpZmFjdFRlbXBsYXRlKTtcblxuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLmdldCh0aGlzKS5wcm9tcHRVc2VyKGNvbnRleHQuYXJ0aWZhY3ROYW1lLCBjb250ZXh0LmRlc3RpbmF0aW9uLCBib2lsZXJQbGF0ZSwgYXJ0aWZhY3RUZW1wbGF0ZS50ZW1wbGF0ZSlcbiAgICAgICAgICAgIC50aGVuKHRlbXBsYXRlQ29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGFuIGFydGlmYWN0IG9mIHR5cGUgJyR7Y29udGV4dC5hcnRpZmFjdFR5cGV9JyB3aXRoIG5hbWUgJyR7Y29udGV4dC5hcnRpZmFjdE5hbWV9JyBhbmQgbGFuZ3VhZ2UgJyR7bGFuZ3VhZ2V9J2ApO1xuICAgICAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKGFydGlmYWN0VGVtcGxhdGUsIGNvbnRleHQuZGVzdGluYXRpb24sIHRlbXBsYXRlQ29udGV4dCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59Il19