'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InquirerManager = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Folders = require('../Folders');

var _winston = require('winston');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable no-unused-vars */

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable no-unused-vars */
var inquirer = require('inquirer');
/**
 * @type {WeakMap<InquirerManager, Folders>}
 */
var _folders = new WeakMap();
/**
 * @type {WeakMap<InquirerManager, fs>}
 */
var _fileSystem = new WeakMap();

var InquirerManager = exports.InquirerManager = function () {
    /**
     * Initializes a new instance of {InquirerManager}
     * @param {Folders} folders 
     * @param {fs} fileSystem
     * @param {Logger} logger
     */
    function InquirerManager(folders, fileSystem, logger) {
        (0, _classCallCheck3.default)(this, InquirerManager);

        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        this._logger = logger;
    }
    /**
     * Prompts the user for additional information and fills the context used for templating
     * @param {string} artifactName
     * @param {string} location
     * @param {BoilerPlate} boilerPlate 
     * @param {any} artifactTemplate
     * 
     * @returns {Promise<any>}
     */


    (0, _createClass3.default)(InquirerManager, [{
        key: 'promptUser',
        value: function promptUser(artifactName, location, boilerPlate, artifactTemplate) {
            var _this = this;

            var context = { name: artifactName };
            var dependencies = [];
            if (boilerPlate.dependencies !== undefined) boilerPlate.dependencies.forEach(function (dependency) {
                return dependencies.push(dependency);
            });
            if (artifactTemplate.dependencies !== undefined) artifactTemplate.dependencies.forEach(function (dependency) {
                return dependencies.push(dependency);
            });

            var questions = [];

            dependencies.forEach(function (dependency) {
                if (dependency.type !== 'prompt') context = _this.generateDependency(dependency, location, context);
            });
            dependencies.forEach(function (dependency) {
                if (dependency.type === 'prompt') questions.push.apply(questions, (0, _toConsumableArray3.default)(_this.generatePrompt(dependency, context)));
            });

            return inquirer.prompt(questions).then(function (answers) {
                answers.name = context.name;
                dependencies.forEach(function (_) {
                    var field = _.name;
                    if (_.type !== 'prompt' && answers[field] === undefined) {
                        answers[field] = context[field];
                    }
                });
                return answers;
            });
        }
        /**
         * 
         * @param {any} dependency 
         * @param {string} location
         * @param {any} context 
         */

    }, {
        key: 'generateDependency',
        value: function generateDependency(dependency, location, context) {
            if (dependency.type === 'discover') {
                return this.discover(dependency, location, context);
            }

            throw 'Cannot handle dependency type \'' + dependency.type + '\'';
        }
        /**
         * 
         * @param {any} dependency 
         * @param {string} location 
         * @param {any} context 
         */

    }, {
        key: 'discover',
        value: function discover(dependency, location, context) {
            if (dependency.discoverType === 'namespace') {
                return this.discoverNamespace(dependency, location, context);
            } else if (dependency.discoverType === 'multipleFiles') {
                return this.discoverMultipleFiles(dependency, location, context);
            }

            throw 'Cannot handle discoveryType \'' + dependency.discoverType + '\'';
        }
        /**
         * 
         * @param {any} dependency
         * @param {string} location 
         * @param {any} context 
         */

    }, {
        key: 'discoverNamespace',
        value: function discoverNamespace(dependency, location, context) {
            var namespace = this.createNamespace(dependency, location);
            context[dependency.name] = namespace;
            return context;
        }
        /**
         * 
         * @param {any} dependency
         * @param {string} location
         * @param {any} context 
         */

    }, {
        key: 'discoverMultipleFiles',
        value: function discoverMultipleFiles(dependency, location, context) {
            var _this2 = this;

            var filePaths = [];
            if (dependency.fromFolders === undefined) filePaths = _folders.get(this).searchRecursiveRegex(location, new RegExp(dependency.fileMatch));else {
                var folders = _folders.get(this).getNearestDirsSearchingUpwards(location, new RegExp(dependency.fromFolders));
                folders.forEach(function (folder) {
                    var _filePaths;

                    return (_filePaths = filePaths).push.apply(_filePaths, (0, _toConsumableArray3.default)(_folders.get(_this2).searchRecursiveRegex(folder, new RegExp(dependency.fileMatch))));
                });
            }
            var results = [];
            if (dependency.contentMatch === undefined || dependency.contentMatch === '') {
                results = filePaths;
            } else {
                filePaths.forEach(function (filePath) {
                    var content = _fileSystem.get(_this2).readFileSync(filePath, 'utf8');
                    var theMatch = content.match(new RegExp(dependency.contentMatch));
                    if (theMatch !== null && theMatch.length > 0) {
                        var namespace = '';
                        if (dependency.withNamespace) namespace = _this2.createNamespace(dependency, (0, _helpers.getFileDirPath)(filePath));

                        var choice = dependency.withNamespace ? { name: namespace + '.' + theMatch[1], value: theMatch[1] } : { name: theMatch[1], value: theMatch[1] };
                        results.push(choice);
                    }
                });
            }
            context[dependency.name] = results;
            return context;
        }
        /**
         * 
         * @param {any} dependency
         * @param {any} context
         * @returns {any} question
         */

    }, {
        key: 'generatePrompt',
        value: function generatePrompt(dependency, context) {
            if (dependency.promptType === 'input') {
                return this.generateInputPrompt(dependency);
            } else if (dependency.promptType === 'rawlist' || dependency.promptType === 'list') {
                return this.generateListPrompt(dependency, context);
            } else if (dependency.promptType === 'checkbox') {
                return this.generateCheckboxPrompt(dependency, context);
            }

            throw 'Cannot handle promptType \'' + dependency.promptType + '\'';
        }
        /**
         * Generate an input prompt
         * @param {any} dependency
         */

    }, {
        key: 'generateInputPrompt',
        value: function generateInputPrompt(dependency) {
            return [{
                type: 'input',
                name: dependency.name,
                message: dependency.message
            }];
        }
        /**
         * Generate a list prompt
         * @param {any} dependency
         * @param {any} context 
         */

    }, {
        key: 'generateListPrompt',
        value: function generateListPrompt(dependency, context) {
            var actualChoices = context[dependency.choices] || dependency.choices;
            if (!dependency.customInput) {
                return [{
                    type: dependency.promptType,
                    name: dependency.name,
                    message: dependency.message,
                    choices: actualChoices,
                    pagesize: dependency.pagesize || 10
                }];
            } else {
                actualChoices.push({ name: dependency.customInput, value: dependency.customInput });
                return [{
                    type: dependency.promptType,
                    name: dependency.name,
                    message: dependency.message,
                    choices: actualChoices,
                    pagesize: dependency.pagesize || 10
                }, {
                    type: 'input',
                    name: dependency.name,
                    message: dependency.customInput,
                    when: function when(answers) {
                        return answers[dependency.name] === dependency.customInput;
                    }
                }];
            }
        }
    }, {
        key: 'generateCheckboxPrompt',
        value: function generateCheckboxPrompt(dependency, context) {
            var actualChoices = context[dependency.choices] || dependency.choices;
            if (!dependency.customInput) {
                return [{
                    type: 'checkbox',
                    name: dependency.name,
                    message: dependency.message,
                    choices: actualChoices,
                    pagesize: dependency.pagesize || 10
                }];
            } else {
                actualChoices.push({ name: dependency.customInput, value: dependency.customInput });
                return [{
                    type: 'checkbox',
                    name: dependency.name,
                    message: dependency.message,
                    choices: actualChoices,
                    pagesize: dependency.pagesize || 10
                }, {
                    type: 'input',
                    name: dependency.name,
                    message: dependency.customInput,
                    when: function when(answers) {
                        return answers[dependency.name] === dependency.customInput;
                    }
                }];
            }
        }
        /**
         * Creates the namespace
         * @param {any} dependency 
         * @param {string} location
         * @returns {string} the namespace 
         */

    }, {
        key: 'createNamespace',
        value: function createNamespace(dependency, location) {
            var milestonePath = _folders.get(this).getNearestFileSearchingUpwards(location, new RegExp(dependency.milestone));
            var milestoneFileName = (0, _helpers.getFileName)(milestonePath);
            var milestoneFileDir = (0, _helpers.getFileDirPath)(milestonePath);

            var namespaceSegments = [];
            var segmentPath = location;
            var segment = (0, _helpers.getFileNameAndExtension)(segmentPath);

            while (segmentPath != milestoneFileDir) {
                if (segment === '' || segmentPath === '/') {
                    this._logger.warn('Could not discover the namespace');
                    return '';
                }
                namespaceSegments.push(segment);
                segmentPath = (0, _helpers.getFileDir)(segmentPath);
                segment = (0, _helpers.getFileName)(segmentPath);
            }
            namespaceSegments = namespaceSegments.reverse();

            var namespace = milestoneFileName;
            namespaceSegments.forEach(function (element) {
                namespace += '.' + element;
            });

            return namespace;
        }
    }]);
    return InquirerManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvSW5xdWlyZXJNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImlucXVpcmVyIiwicmVxdWlyZSIsIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9maWxlU3lzdGVtIiwiSW5xdWlyZXJNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwiYXJ0aWZhY3ROYW1lIiwibG9jYXRpb24iLCJib2lsZXJQbGF0ZSIsImFydGlmYWN0VGVtcGxhdGUiLCJjb250ZXh0IiwibmFtZSIsImRlcGVuZGVuY2llcyIsInVuZGVmaW5lZCIsImZvckVhY2giLCJwdXNoIiwiZGVwZW5kZW5jeSIsInF1ZXN0aW9ucyIsInR5cGUiLCJnZW5lcmF0ZURlcGVuZGVuY3kiLCJnZW5lcmF0ZVByb21wdCIsInByb21wdCIsInRoZW4iLCJhbnN3ZXJzIiwiZmllbGQiLCJfIiwiZGlzY292ZXIiLCJkaXNjb3ZlclR5cGUiLCJkaXNjb3Zlck5hbWVzcGFjZSIsImRpc2NvdmVyTXVsdGlwbGVGaWxlcyIsIm5hbWVzcGFjZSIsImNyZWF0ZU5hbWVzcGFjZSIsImZpbGVQYXRocyIsImZyb21Gb2xkZXJzIiwiZ2V0Iiwic2VhcmNoUmVjdXJzaXZlUmVnZXgiLCJSZWdFeHAiLCJmaWxlTWF0Y2giLCJnZXROZWFyZXN0RGlyc1NlYXJjaGluZ1Vwd2FyZHMiLCJmb2xkZXIiLCJyZXN1bHRzIiwiY29udGVudE1hdGNoIiwiY29udGVudCIsInJlYWRGaWxlU3luYyIsImZpbGVQYXRoIiwidGhlTWF0Y2giLCJtYXRjaCIsImxlbmd0aCIsIndpdGhOYW1lc3BhY2UiLCJjaG9pY2UiLCJ2YWx1ZSIsInByb21wdFR5cGUiLCJnZW5lcmF0ZUlucHV0UHJvbXB0IiwiZ2VuZXJhdGVMaXN0UHJvbXB0IiwiZ2VuZXJhdGVDaGVja2JveFByb21wdCIsIm1lc3NhZ2UiLCJhY3R1YWxDaG9pY2VzIiwiY2hvaWNlcyIsImN1c3RvbUlucHV0IiwicGFnZXNpemUiLCJ3aGVuIiwibWlsZXN0b25lUGF0aCIsImdldE5lYXJlc3RGaWxlU2VhcmNoaW5nVXB3YXJkcyIsIm1pbGVzdG9uZSIsIm1pbGVzdG9uZUZpbGVOYW1lIiwibWlsZXN0b25lRmlsZURpciIsIm5hbWVzcGFjZVNlZ21lbnRzIiwic2VnbWVudFBhdGgiLCJzZWdtZW50Iiwid2FybiIsInJldmVyc2UiLCJlbGVtZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQVZBOzs7OztBQUtBO0FBT0EsSUFBTUEsV0FBV0MsUUFBUSxVQUFSLENBQWpCO0FBQ0E7OztBQUdBLElBQU1DLFdBQVcsSUFBSUMsT0FBSixFQUFqQjtBQUNBOzs7QUFHQSxJQUFNQyxjQUFjLElBQUlELE9BQUosRUFBcEI7O0lBRWFFLGUsV0FBQUEsZTtBQUNUOzs7Ozs7QUFNQSw2QkFBWUMsT0FBWixFQUFxQkMsVUFBckIsRUFBaUNDLE1BQWpDLEVBQXlDO0FBQUE7O0FBQ3JDTixpQkFBU08sR0FBVCxDQUFhLElBQWIsRUFBbUJILE9BQW5CO0FBQ0FGLG9CQUFZSyxHQUFaLENBQWdCLElBQWhCLEVBQXNCRixVQUF0QjtBQUNBLGFBQUtHLE9BQUwsR0FBZUYsTUFBZjtBQUVIO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7bUNBU1dHLFksRUFBY0MsUSxFQUFVQyxXLEVBQWFDLGdCLEVBQWtCO0FBQUE7O0FBQzlELGdCQUFJQyxVQUFVLEVBQUVDLE1BQU1MLFlBQVIsRUFBZDtBQUNBLGdCQUFJTSxlQUFlLEVBQW5CO0FBQ0EsZ0JBQUlKLFlBQVlJLFlBQVosS0FBNkJDLFNBQWpDLEVBQ0lMLFlBQVlJLFlBQVosQ0FBeUJFLE9BQXpCLENBQWlDO0FBQUEsdUJBQWNGLGFBQWFHLElBQWIsQ0FBa0JDLFVBQWxCLENBQWQ7QUFBQSxhQUFqQztBQUNKLGdCQUFLUCxpQkFBaUJHLFlBQWpCLEtBQWtDQyxTQUF2QyxFQUNJSixpQkFBaUJHLFlBQWpCLENBQThCRSxPQUE5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QU96QyxTQUFQO0FBQ0giLCJmaWxlIjoiSW5xdWlyZXJNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtGb2xkZXJzfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgeyBnZXRGaWxlRGlyUGF0aCwgZ2V0RmlsZU5hbWUsIGdldEZpbGVOYW1lQW5kRXh0ZW5zaW9uLCBnZXRGaWxlRGlyIH0gZnJvbSAnLi4vaGVscGVycyc7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbmNvbnN0IGlucXVpcmVyID0gcmVxdWlyZSgnaW5xdWlyZXInKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8SW5xdWlyZXJNYW5hZ2VyLCBGb2xkZXJzPn1cbiAqL1xuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxJbnF1aXJlck1hbmFnZXIsIGZzPn1cbiAqL1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5leHBvcnQgY2xhc3MgSW5xdWlyZXJNYW5hZ2VyIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7SW5xdWlyZXJNYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVycyBcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZvbGRlcnMsIGZpbGVTeXN0ZW0sIGxvZ2dlcikge1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICBcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBhbmQgZmlsbHMgdGhlIGNvbnRleHQgdXNlZCBmb3IgdGVtcGxhdGluZ1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhcnRpZmFjdE5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlfSBib2lsZXJQbGF0ZSBcbiAgICAgKiBAcGFyYW0ge2FueX0gYXJ0aWZhY3RUZW1wbGF0ZVxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgcHJvbXB0VXNlcihhcnRpZmFjdE5hbWUsIGxvY2F0aW9uLCBib2lsZXJQbGF0ZSwgYXJ0aWZhY3RUZW1wbGF0ZSkge1xuICAgICAgICBsZXQgY29udGV4dCA9IHsgbmFtZTogYXJ0aWZhY3ROYW1lIH07XG4gICAgICAgIGxldCBkZXBlbmRlbmNpZXMgPSBbXTtcbiAgICAgICAgaWYgKGJvaWxlclBsYXRlLmRlcGVuZGVuY2llcyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgYm9pbGVyUGxhdGUuZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwZW5kZW5jeSA9PiBkZXBlbmRlbmNpZXMucHVzaChkZXBlbmRlbmN5KSk7XG4gICAgICAgIGlmICggYXJ0aWZhY3RUZW1wbGF0ZS5kZXBlbmRlbmNpZXMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGFydGlmYWN0VGVtcGxhdGUuZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwZW5kZW5jeSA9PiBkZXBlbmRlbmNpZXMucHVzaChkZXBlbmRlbmN5KSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgcXVlc3Rpb25zID0gW107XG5cbiAgICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwZW5kZW5jeSA9PiB7XG4gICAgICAgICAgICBpZiAoZGVwZW5kZW5jeS50eXBlICE9PSAncHJvbXB0JylcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhpcy5nZW5lcmF0ZURlcGVuZGVuY3koZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwZW5kZW5jeSA9PiB7XG4gICAgICAgICAgICBpZiAoZGVwZW5kZW5jeS50eXBlID09PSAncHJvbXB0JylcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCguLi50aGlzLmdlbmVyYXRlUHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGlucXVpcmVyLnByb21wdChxdWVzdGlvbnMpXG4gICAgICAgICAgICAudGhlbihhbnN3ZXJzID0+IHtcbiAgICAgICAgICAgICAgICBhbnN3ZXJzLm5hbWUgPSBjb250ZXh0Lm5hbWU7XG4gICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gXy5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy50eXBlICE9PSAncHJvbXB0JyAmJiBhbnN3ZXJzW2ZpZWxkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXJzW2ZpZWxkXSA9IGNvbnRleHRbZmllbGRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcnM7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3kgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uXG4gICAgICogQHBhcmFtIHthbnl9IGNvbnRleHQgXG4gICAgICovXG4gICAgZ2VuZXJhdGVEZXBlbmRlbmN5KGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIGlmIChkZXBlbmRlbmN5LnR5cGUgPT09ICdkaXNjb3ZlcicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2NvdmVyKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IGBDYW5ub3QgaGFuZGxlIGRlcGVuZGVuY3kgdHlwZSAnJHtkZXBlbmRlbmN5LnR5cGV9J2A7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7YW55fSBkZXBlbmRlbmN5IFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBcbiAgICAgKiBAcGFyYW0ge2FueX0gY29udGV4dCBcbiAgICAgKi9cbiAgICBkaXNjb3ZlcihkZXBlbmRlbmN5LCBsb2NhdGlvbiwgY29udGV4dCkge1xuICAgICAgICBpZiAoZGVwZW5kZW5jeS5kaXNjb3ZlclR5cGUgPT09ICduYW1lc3BhY2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNjb3Zlck5hbWVzcGFjZShkZXBlbmRlbmN5LCBsb2NhdGlvbiwgY29udGV4dCk7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYgKGRlcGVuZGVuY3kuZGlzY292ZXJUeXBlID09PSAnbXVsdGlwbGVGaWxlcycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2NvdmVyTXVsdGlwbGVGaWxlcyhkZXBlbmRlbmN5LCBsb2NhdGlvbiwgY29udGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBgQ2Fubm90IGhhbmRsZSBkaXNjb3ZlcnlUeXBlICcke2RlcGVuZGVuY3kuZGlzY292ZXJUeXBlfSdgO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBcbiAgICAgKiBAcGFyYW0ge2FueX0gY29udGV4dCBcbiAgICAgKi9cbiAgICBkaXNjb3Zlck5hbWVzcGFjZShkZXBlbmRlbmN5LCBsb2NhdGlvbiwgY29udGV4dCkge1xuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSB0aGlzLmNyZWF0ZU5hbWVzcGFjZShkZXBlbmRlbmN5LCBsb2NhdGlvbik7XG4gICAgICAgIGNvbnRleHRbZGVwZW5kZW5jeS5uYW1lXSA9IG5hbWVzcGFjZTtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7YW55fSBkZXBlbmRlbmN5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uXG4gICAgICogQHBhcmFtIHthbnl9IGNvbnRleHQgXG4gICAgICovXG4gICAgZGlzY292ZXJNdWx0aXBsZUZpbGVzKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgZmlsZVBhdGhzID0gW107XG4gICAgICAgIGlmIChkZXBlbmRlbmN5LmZyb21Gb2xkZXJzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBmaWxlUGF0aHMgPSBfZm9sZGVycy5nZXQodGhpcykuc2VhcmNoUmVjdXJzaXZlUmVnZXgobG9jYXRpb24sIG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5maWxlTWF0Y2gpKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldE5lYXJlc3REaXJzU2VhcmNoaW5nVXB3YXJkcyhsb2NhdGlvbiwgbmV3IFJlZ0V4cChkZXBlbmRlbmN5LmZyb21Gb2xkZXJzKSk7XG4gICAgICAgICAgICBmb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IGZpbGVQYXRocy5wdXNoKC4uLl9mb2xkZXJzLmdldCh0aGlzKS5zZWFyY2hSZWN1cnNpdmVSZWdleChmb2xkZXIsIG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5maWxlTWF0Y2gpKSkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHRzID0gW107XG4gICAgICAgIGlmIChkZXBlbmRlbmN5LmNvbnRlbnRNYXRjaCA9PT0gdW5kZWZpbmVkIHx8IGRlcGVuZGVuY3kuY29udGVudE1hdGNoID09PSAnJykgeyBcbiAgICAgICAgICAgIHJlc3VsdHMgPSBmaWxlUGF0aHM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmaWxlUGF0aHMuZm9yRWFjaChmaWxlUGF0aCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmOCcpO1xuICAgICAgICAgICAgICAgIGxldCB0aGVNYXRjaCA9IGNvbnRlbnQubWF0Y2gobmV3IFJlZ0V4cChkZXBlbmRlbmN5LmNvbnRlbnRNYXRjaCkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGVNYXRjaCAhPT0gbnVsbCAmJiB0aGVNYXRjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lc3BhY2UgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3kud2l0aE5hbWVzcGFjZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZSA9IHRoaXMuY3JlYXRlTmFtZXNwYWNlKGRlcGVuZGVuY3ksIGdldEZpbGVEaXJQYXRoKGZpbGVQYXRoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNob2ljZSA9IGRlcGVuZGVuY3kud2l0aE5hbWVzcGFjZT8gIHtuYW1lOiBuYW1lc3BhY2UgKyAnLicgKyB0aGVNYXRjaFsxXSwgdmFsdWU6IHRoZU1hdGNoWzFdfVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB7bmFtZTogdGhlTWF0Y2hbMV0sIHZhbHVlOiB0aGVNYXRjaFsxXX07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChjaG9pY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHRbZGVwZW5kZW5jeS5uYW1lXSA9IHJlc3VsdHM7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeVxuICAgICAqIEBwYXJhbSB7YW55fSBjb250ZXh0XG4gICAgICogQHJldHVybnMge2FueX0gcXVlc3Rpb25cbiAgICAgKi9cbiAgICBnZW5lcmF0ZVByb21wdChkZXBlbmRlbmN5LCBjb250ZXh0KSB7XG4gICAgICAgIGlmIChkZXBlbmRlbmN5LnByb21wdFR5cGUgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlSW5wdXRQcm9tcHQoZGVwZW5kZW5jeSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVwZW5kZW5jeS5wcm9tcHRUeXBlID09PSAncmF3bGlzdCcgfHwgZGVwZW5kZW5jeS5wcm9tcHRUeXBlID09PSAnbGlzdCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlTGlzdFByb21wdChkZXBlbmRlbmN5LCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXBlbmRlbmN5LnByb21wdFR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlQ2hlY2tib3hQcm9tcHQoZGVwZW5kZW5jeSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRocm93IGBDYW5ub3QgaGFuZGxlIHByb21wdFR5cGUgJyR7ZGVwZW5kZW5jeS5wcm9tcHRUeXBlfSdgO1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGFuIGlucHV0IHByb21wdFxuICAgICAqIEBwYXJhbSB7YW55fSBkZXBlbmRlbmN5XG4gICAgICovXG4gICAgZ2VuZXJhdGVJbnB1dFByb21wdChkZXBlbmRlbmN5KSB7XG4gICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgIG5hbWU6IGRlcGVuZGVuY3kubmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGRlcGVuZGVuY3kubWVzc2FnZVxuICAgICAgICB9XTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgYSBsaXN0IHByb21wdFxuICAgICAqIEBwYXJhbSB7YW55fSBkZXBlbmRlbmN5XG4gICAgICogQHBhcmFtIHthbnl9IGNvbnRleHQgXG4gICAgICovXG4gICAgZ2VuZXJhdGVMaXN0UHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpIHtcbiAgICAgICAgbGV0IGFjdHVhbENob2ljZXMgPSBjb250ZXh0W2RlcGVuZGVuY3kuY2hvaWNlc10gfHwgZGVwZW5kZW5jeS5jaG9pY2VzO1xuICAgICAgICBpZiAoISBkZXBlbmRlbmN5LmN1c3RvbUlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZGVwZW5kZW5jeS5wcm9tcHRUeXBlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRlcGVuZGVuY3kubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlczogYWN0dWFsQ2hvaWNlcyxcbiAgICAgICAgICAgICAgICAgICAgcGFnZXNpemU6IGRlcGVuZGVuY3kucGFnZXNpemUgfHwgMTBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWN0dWFsQ2hvaWNlcy5wdXNoKHtuYW1lOiBkZXBlbmRlbmN5LmN1c3RvbUlucHV0LCB2YWx1ZTogZGVwZW5kZW5jeS5jdXN0b21JbnB1dH0pO1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGRlcGVuZGVuY3kucHJvbXB0VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZXBlbmRlbmN5Lm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM6IGFjdHVhbENob2ljZXMsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzaXplOiBkZXBlbmRlbmN5LnBhZ2VzaXplIHx8IDEwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGRlcGVuZGVuY3kubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5jdXN0b21JbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgd2hlbjogZnVuY3Rpb24oYW5zd2Vycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcnNbZGVwZW5kZW5jeS5uYW1lXSA9PT0gZGVwZW5kZW5jeS5jdXN0b21JbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuZXJhdGVDaGVja2JveFByb21wdChkZXBlbmRlbmN5LCBjb250ZXh0KSB7XG4gICAgICAgIGxldCBhY3R1YWxDaG9pY2VzID0gY29udGV4dFtkZXBlbmRlbmN5LmNob2ljZXNdIHx8IGRlcGVuZGVuY3kuY2hvaWNlcztcbiAgICAgICAgaWYgKCEgZGVwZW5kZW5jeS5jdXN0b21JbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGRlcGVuZGVuY3kubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzOiBhY3R1YWxDaG9pY2VzLFxuICAgICAgICAgICAgICAgICAgICBwYWdlc2l6ZTogZGVwZW5kZW5jeS5wYWdlc2l6ZSB8fCAxMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhY3R1YWxDaG9pY2VzLnB1c2goe25hbWU6IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXQsIHZhbHVlOiBkZXBlbmRlbmN5LmN1c3RvbUlucHV0fSk7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZXBlbmRlbmN5Lm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM6IGFjdHVhbENob2ljZXMsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzaXplOiBkZXBlbmRlbmN5LnBhZ2VzaXplIHx8IDEwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGRlcGVuZGVuY3kubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5jdXN0b21JbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgd2hlbjogZnVuY3Rpb24oYW5zd2Vycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcnNbZGVwZW5kZW5jeS5uYW1lXSA9PT0gZGVwZW5kZW5jeS5jdXN0b21JbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgbmFtZXNwYWNlXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3kgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gdGhlIG5hbWVzcGFjZSBcbiAgICAgKi9cbiAgICBjcmVhdGVOYW1lc3BhY2UoZGVwZW5kZW5jeSwgbG9jYXRpb24pIHtcbiAgICAgICAgY29uc3QgbWlsZXN0b25lUGF0aCA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXROZWFyZXN0RmlsZVNlYXJjaGluZ1Vwd2FyZHMobG9jYXRpb24sIG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5taWxlc3RvbmUpKTtcbiAgICAgICAgbGV0IG1pbGVzdG9uZUZpbGVOYW1lID0gZ2V0RmlsZU5hbWUobWlsZXN0b25lUGF0aCk7XG4gICAgICAgIGxldCBtaWxlc3RvbmVGaWxlRGlyID0gZ2V0RmlsZURpclBhdGgobWlsZXN0b25lUGF0aCk7XG5cbiAgICAgICAgbGV0IG5hbWVzcGFjZVNlZ21lbnRzID0gW107XG4gICAgICAgIGxldCBzZWdtZW50UGF0aCA9IGxvY2F0aW9uO1xuICAgICAgICBsZXQgc2VnbWVudCA9IGdldEZpbGVOYW1lQW5kRXh0ZW5zaW9uKHNlZ21lbnRQYXRoKTtcblxuICAgICAgICB3aGlsZSAoc2VnbWVudFBhdGggIT0gbWlsZXN0b25lRmlsZURpcikge1xuICAgICAgICAgICAgaWYgKHNlZ21lbnQgPT09ICcnIHx8IHNlZ21lbnRQYXRoID09PSAnLycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIud2FybignQ291bGQgbm90IGRpc2NvdmVyIHRoZSBuYW1lc3BhY2UnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuYW1lc3BhY2VTZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuICAgICAgICAgICAgc2VnbWVudFBhdGggPSBnZXRGaWxlRGlyKHNlZ21lbnRQYXRoKTtcbiAgICAgICAgICAgIHNlZ21lbnQgPSBnZXRGaWxlTmFtZShzZWdtZW50UGF0aCk7XG4gICAgICAgIH0gXG4gICAgICAgIG5hbWVzcGFjZVNlZ21lbnRzID0gbmFtZXNwYWNlU2VnbWVudHMucmV2ZXJzZSgpO1xuICAgICAgICBcbiAgICAgICAgbGV0IG5hbWVzcGFjZSA9IG1pbGVzdG9uZUZpbGVOYW1lO1xuICAgICAgICBuYW1lc3BhY2VTZWdtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgbmFtZXNwYWNlICs9ICcuJyArIGVsZW1lbnQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuYW1lc3BhY2U7XG4gICAgfVxufSJdfQ==