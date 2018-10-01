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

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
                        if (dependency.withNamespace) namespace = _this2.createNamespace(dependency, _global2.default.getFileDirPath(filePath));

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
            var milestoneFileName = _global2.default.getFileName(milestonePath);
            var milestoneFileDir = _global2.default.getFileDirPath(milestonePath);

            var namespaceSegments = [];
            var segmentPath = location;
            var segment = _global2.default.getFileNameAndExtension(segmentPath);

            while (segmentPath != milestoneFileDir) {
                if (segment === '' || segmentPath === '/') {
                    this._logger.warn('Could not discover the namespace');
                    return '';
                }
                namespaceSegments.push(segment);
                segmentPath = _global2.default.getFileDir(segmentPath);
                segment = _global2.default.getFileName(segmentPath);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvSW5xdWlyZXJNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImlucXVpcmVyIiwicmVxdWlyZSIsIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9maWxlU3lzdGVtIiwiSW5xdWlyZXJNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwiYXJ0aWZhY3ROYW1lIiwibG9jYXRpb24iLCJib2lsZXJQbGF0ZSIsImFydGlmYWN0VGVtcGxhdGUiLCJjb250ZXh0IiwibmFtZSIsImRlcGVuZGVuY2llcyIsInVuZGVmaW5lZCIsImZvckVhY2giLCJwdXNoIiwiZGVwZW5kZW5jeSIsInF1ZXN0aW9ucyIsInR5cGUiLCJnZW5lcmF0ZURlcGVuZGVuY3kiLCJnZW5lcmF0ZVByb21wdCIsInByb21wdCIsInRoZW4iLCJhbnN3ZXJzIiwiZmllbGQiLCJfIiwiZGlzY292ZXIiLCJkaXNjb3ZlclR5cGUiLCJkaXNjb3Zlck5hbWVzcGFjZSIsImRpc2NvdmVyTXVsdGlwbGVGaWxlcyIsIm5hbWVzcGFjZSIsImNyZWF0ZU5hbWVzcGFjZSIsImZpbGVQYXRocyIsImZyb21Gb2xkZXJzIiwiZ2V0Iiwic2VhcmNoUmVjdXJzaXZlUmVnZXgiLCJSZWdFeHAiLCJmaWxlTWF0Y2giLCJnZXROZWFyZXN0RGlyc1NlYXJjaGluZ1Vwd2FyZHMiLCJmb2xkZXIiLCJyZXN1bHRzIiwiY29udGVudE1hdGNoIiwiY29udGVudCIsInJlYWRGaWxlU3luYyIsImZpbGVQYXRoIiwidGhlTWF0Y2giLCJtYXRjaCIsImxlbmd0aCIsIndpdGhOYW1lc3BhY2UiLCJnbG9iYWwiLCJnZXRGaWxlRGlyUGF0aCIsImNob2ljZSIsInZhbHVlIiwicHJvbXB0VHlwZSIsImdlbmVyYXRlSW5wdXRQcm9tcHQiLCJnZW5lcmF0ZUxpc3RQcm9tcHQiLCJnZW5lcmF0ZUNoZWNrYm94UHJvbXB0IiwibWVzc2FnZSIsImFjdHVhbENob2ljZXMiLCJjaG9pY2VzIiwiY3VzdG9tSW5wdXQiLCJwYWdlc2l6ZSIsIndoZW4iLCJtaWxlc3RvbmVQYXRoIiwiZ2V0TmVhcmVzdEZpbGVTZWFyY2hpbmdVcHdhcmRzIiwibWlsZXN0b25lIiwibWlsZXN0b25lRmlsZU5hbWUiLCJnZXRGaWxlTmFtZSIsIm1pbGVzdG9uZUZpbGVEaXIiLCJuYW1lc3BhY2VTZWdtZW50cyIsInNlZ21lbnRQYXRoIiwic2VnbWVudCIsImdldEZpbGVOYW1lQW5kRXh0ZW5zaW9uIiwid2FybiIsImdldEZpbGVEaXIiLCJyZXZlcnNlIiwiZWxlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQVBBOzs7O0FBU0EsSUFBTUEsV0FBV0MsUUFBUSxVQUFSLENBQWpCO0FBQ0E7OztBQUdBLElBQU1DLFdBQVcsSUFBSUMsT0FBSixFQUFqQjtBQUNBOzs7QUFHQSxJQUFNQyxjQUFjLElBQUlELE9BQUosRUFBcEI7O0lBRWFFLGUsV0FBQUEsZTtBQUNUOzs7Ozs7QUFNQSw2QkFBWUMsT0FBWixFQUFxQkMsVUFBckIsRUFBaUNDLE1BQWpDLEVBQXlDO0FBQUE7O0FBQ3JDTixpQkFBU08sR0FBVCxDQUFhLElBQWIsRUFBbUJILE9BQW5CO0FBQ0FGLG9CQUFZSyxHQUFaLENBQWdCLElBQWhCLEVBQXNCRixVQUF0QjtBQUNBLGFBQUtHLE9BQUwsR0FBZUYsTUFBZjtBQUVIO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7bUNBU1dHLFksRUFBY0MsUSxFQUFVQyxXLEVBQWFDLGdCLEVBQWtCO0FBQUE7O0FBQzlELGdCQUFJQyxVQUFVLEVBQUVDLE1BQU1MLFlBQVIsRUFBZDtBQUNBLGdCQUFJTSxlQUFlLEVBQW5CO0FBQ0EsZ0JBQUlKLFlBQVlJLFlBQVosS0FBNkJDLFNBQWpDLEVBQ0lMLFlBQVlJLFlBQVosQ0FBeUJFLE9BQXpCLENBQWlDO0FBQUEsdUJBQWNGLGFBQWFHLElBQWIsQ0FBa0JDLFVBQWxCLENBQWQ7QUFBQSxhQUFqQztB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bUJHLFdBQW5CLENBQVY7QUFDSDtBQUNERCxnQ0FBb0JBLGtCQUFrQk0sT0FBbEIsRUFBcEI7O0FBRUEsZ0JBQUk3QyxZQUFZb0MsaUJBQWhCO0FBQ0FHLDhCQUFrQnZELE9BQWxCLENBQTBCLG1CQUFXO0FBQ2pDZ0IsNkJBQWEsTUFBTThDLE9BQW5CO0FBQ0gsYUFGRDs7QUFJQSxtQkFBTzlDLFNBQVA7QUFDSCIsImZpbGUiOiJJbnF1aXJlck1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG5pbXBvcnQge8KgTG9nZ2VyIH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuLi9nbG9iYWwnO1xuXG5jb25zdCBpbnF1aXJlciA9IHJlcXVpcmUoJ2lucXVpcmVyJyk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPElucXVpcmVyTWFuYWdlciwgRm9sZGVycz59XG4gKi9cbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8SW5xdWlyZXJNYW5hZ2VyLCBmcz59XG4gKi9cbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcblxuZXhwb3J0IGNsYXNzIElucXVpcmVyTWFuYWdlciB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0lucXVpcmVyTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnMgXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgXG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb21wdHMgdGhlIHVzZXIgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gYW5kIGZpbGxzIHRoZSBjb250ZXh0IHVzZWQgZm9yIHRlbXBsYXRpbmdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXJ0aWZhY3ROYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uXG4gICAgICogQHBhcmFtIHtCb2lsZXJQbGF0ZX0gYm9pbGVyUGxhdGUgXG4gICAgICogQHBhcmFtIHthbnl9IGFydGlmYWN0VGVtcGxhdGVcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICAgIHByb21wdFVzZXIoYXJ0aWZhY3ROYW1lLCBsb2NhdGlvbiwgYm9pbGVyUGxhdGUsIGFydGlmYWN0VGVtcGxhdGUpIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB7IG5hbWU6IGFydGlmYWN0TmFtZSB9O1xuICAgICAgICBsZXQgZGVwZW5kZW5jaWVzID0gW107XG4gICAgICAgIGlmIChib2lsZXJQbGF0ZS5kZXBlbmRlbmNpZXMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGJvaWxlclBsYXRlLmRlcGVuZGVuY2llcy5mb3JFYWNoKGRlcGVuZGVuY3kgPT4gZGVwZW5kZW5jaWVzLnB1c2goZGVwZW5kZW5jeSkpO1xuICAgICAgICBpZiAoIGFydGlmYWN0VGVtcGxhdGUuZGVwZW5kZW5jaWVzICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBhcnRpZmFjdFRlbXBsYXRlLmRlcGVuZGVuY2llcy5mb3JFYWNoKGRlcGVuZGVuY3kgPT4gZGVwZW5kZW5jaWVzLnB1c2goZGVwZW5kZW5jeSkpO1xuICAgICAgICBcbiAgICAgICAgbGV0IHF1ZXN0aW9ucyA9IFtdO1xuXG4gICAgICAgIGRlcGVuZGVuY2llcy5mb3JFYWNoKGRlcGVuZGVuY3kgPT4ge1xuICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3kudHlwZSAhPT0gJ3Byb21wdCcpXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IHRoaXMuZ2VuZXJhdGVEZXBlbmRlbmN5KGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlcGVuZGVuY2llcy5mb3JFYWNoKGRlcGVuZGVuY3kgPT4ge1xuICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3kudHlwZSA9PT0gJ3Byb21wdCcpXG4gICAgICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2goLi4udGhpcy5nZW5lcmF0ZVByb21wdChkZXBlbmRlbmN5LCBjb250ZXh0KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBpbnF1aXJlci5wcm9tcHQocXVlc3Rpb25zKVxuICAgICAgICAgICAgLnRoZW4oYW5zd2VycyA9PiB7XG4gICAgICAgICAgICAgICAgYW5zd2Vycy5uYW1lID0gY29udGV4dC5uYW1lO1xuICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llcy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZCA9IF8ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8udHlwZSAhPT0gJ3Byb21wdCcgJiYgYW5zd2Vyc1tmaWVsZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2Vyc1tmaWVsZF0gPSBjb250ZXh0W2ZpZWxkXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcnM7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3kgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uXG4gICAgICogQHBhcmFtIHthbnl9IGNvbnRleHQgXG4gICAgICovXG4gICAgZ2VuZXJhdGVEZXBlbmRlbmN5KGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIGlmIChkZXBlbmRlbmN5LnR5cGUgPT09ICdkaXNjb3ZlcicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2NvdmVyKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IGBDYW5ub3QgaGFuZGxlIGRlcGVuZGVuY3kgdHlwZSAnJHtkZXBlbmRlbmN5LnR5cGV9J2BcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3kgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIFxuICAgICAqIEBwYXJhbSB7YW55fSBjb250ZXh0IFxuICAgICAqL1xuICAgIGRpc2NvdmVyKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIGlmIChkZXBlbmRlbmN5LmRpc2NvdmVyVHlwZSA9PT0gJ25hbWVzcGFjZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2NvdmVyTmFtZXNwYWNlKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZiAoZGVwZW5kZW5jeS5kaXNjb3ZlclR5cGUgPT09ICdtdWx0aXBsZUZpbGVzJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzY292ZXJNdWx0aXBsZUZpbGVzKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IGBDYW5ub3QgaGFuZGxlIGRpc2NvdmVyeVR5cGUgJyR7ZGVwZW5kZW5jeS5kaXNjb3ZlclR5cGV9J2BcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3lcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gXG4gICAgICogQHBhcmFtIHthbnl9IGNvbnRleHQgXG4gICAgICovXG4gICAgZGlzY292ZXJOYW1lc3BhY2UoZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gdGhpcy5jcmVhdGVOYW1lc3BhY2UoZGVwZW5kZW5jeSwgbG9jYXRpb24pO1xuICAgICAgICBjb250ZXh0W2RlcGVuZGVuY3kubmFtZV0gPSBuYW1lc3BhY2U7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvblxuICAgICAqIEBwYXJhbSB7YW55fSBjb250ZXh0IFxuICAgICAqL1xuICAgIGRpc2NvdmVyTXVsdGlwbGVGaWxlcyhkZXBlbmRlbmN5LCBsb2NhdGlvbiwgY29udGV4dCkge1xuICAgICAgICBcbiAgICAgICAgbGV0IGZpbGVQYXRocyA9IFtdO1xuICAgICAgICBpZiAoZGVwZW5kZW5jeS5mcm9tRm9sZGVycyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgZmlsZVBhdGhzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLnNlYXJjaFJlY3Vyc2l2ZVJlZ2V4KGxvY2F0aW9uLCBuZXcgUmVnRXhwKGRlcGVuZGVuY3kuZmlsZU1hdGNoKSk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZm9sZGVycyA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXROZWFyZXN0RGlyc1NlYXJjaGluZ1Vwd2FyZHMobG9jYXRpb24sIG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5mcm9tRm9sZGVycykpO1xuICAgICAgICAgICAgZm9sZGVycy5mb3JFYWNoKGZvbGRlciA9PiBmaWxlUGF0aHMucHVzaCguLi5fZm9sZGVycy5nZXQodGhpcykuc2VhcmNoUmVjdXJzaXZlUmVnZXgoZm9sZGVyLCBuZXcgUmVnRXhwKGRlcGVuZGVuY3kuZmlsZU1hdGNoKSkpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgICBpZiAoZGVwZW5kZW5jeS5jb250ZW50TWF0Y2ggPT09IHVuZGVmaW5lZCB8fCBkZXBlbmRlbmN5LmNvbnRlbnRNYXRjaCA9PT0gJycpIHsgXG4gICAgICAgICAgICByZXN1bHRzID0gZmlsZVBhdGhzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZmlsZVBhdGhzLmZvckVhY2goZmlsZVBhdGggPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcbiAgICAgICAgICAgICAgICBsZXQgdGhlTWF0Y2ggPSBjb250ZW50Lm1hdGNoKG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5jb250ZW50TWF0Y2gpKTtcbiAgICAgICAgICAgICAgICBpZiAodGhlTWF0Y2ggIT09IG51bGwgJiYgdGhlTWF0Y2gubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZXNwYWNlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5LndpdGhOYW1lc3BhY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2UgPSB0aGlzLmNyZWF0ZU5hbWVzcGFjZShkZXBlbmRlbmN5LCBnbG9iYWwuZ2V0RmlsZURpclBhdGgoZmlsZVBhdGgpKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hvaWNlID0gZGVwZW5kZW5jeS53aXRoTmFtZXNwYWNlPyAge25hbWU6IG5hbWVzcGFjZSArICcuJyArIHRoZU1hdGNoWzFdLCB2YWx1ZTogdGhlTWF0Y2hbMV19XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHtuYW1lOiB0aGVNYXRjaFsxXSwgdmFsdWU6IHRoZU1hdGNoWzFdfTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGNob2ljZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dFtkZXBlbmRlbmN5Lm5hbWVdID0gcmVzdWx0cztcbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7YW55fSBkZXBlbmRlbmN5XG4gICAgICogQHBhcmFtIHthbnl9IGNvbnRleHRcbiAgICAgKiBAcmV0dXJucyB7YW55fSBxdWVzdGlvblxuICAgICAqL1xuICAgIGdlbmVyYXRlUHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRlcGVuZGVuY3kucHJvbXB0VHlwZSA9PT0gJ2lucHV0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVJbnB1dFByb21wdChkZXBlbmRlbmN5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXBlbmRlbmN5LnByb21wdFR5cGUgPT09ICdyYXdsaXN0JyB8fCBkZXBlbmRlbmN5LnByb21wdFR5cGUgPT09ICdsaXN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVMaXN0UHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlcGVuZGVuY3kucHJvbXB0VHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVDaGVja2JveFByb21wdChkZXBlbmRlbmN5LCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhyb3cgYENhbm5vdCBoYW5kbGUgcHJvbXB0VHlwZSAnJHtkZXBlbmRlbmN5LnByb21wdFR5cGV9J2BcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBhbiBpbnB1dCBwcm9tcHRcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeVxuICAgICAqL1xuICAgIGdlbmVyYXRlSW5wdXRQcm9tcHQoZGVwZW5kZW5jeSkge1xuICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5Lm5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBkZXBlbmRlbmN5Lm1lc3NhZ2VcbiAgICAgICAgfV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGEgbGlzdCBwcm9tcHRcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeVxuICAgICAqIEBwYXJhbSB7YW55fSBjb250ZXh0IFxuICAgICAqL1xuICAgIGdlbmVyYXRlTGlzdFByb21wdChkZXBlbmRlbmN5LCBjb250ZXh0KSB7XG4gICAgICAgIGxldCBhY3R1YWxDaG9pY2VzID0gY29udGV4dFtkZXBlbmRlbmN5LmNob2ljZXNdIHx8IGRlcGVuZGVuY3kuY2hvaWNlcztcbiAgICAgICAgaWYgKCEgZGVwZW5kZW5jeS5jdXN0b21JbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGRlcGVuZGVuY3kucHJvbXB0VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZXBlbmRlbmN5Lm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM6IGFjdHVhbENob2ljZXMsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzaXplOiBkZXBlbmRlbmN5LnBhZ2VzaXplIHx8IDEwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFjdHVhbENob2ljZXMucHVzaCh7bmFtZTogZGVwZW5kZW5jeS5jdXN0b21JbnB1dCwgdmFsdWU6IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXR9KTtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBkZXBlbmRlbmN5LnByb21wdFR5cGUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGRlcGVuZGVuY3kubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzOiBhY3R1YWxDaG9pY2VzLFxuICAgICAgICAgICAgICAgICAgICBwYWdlc2l6ZTogZGVwZW5kZW5jeS5wYWdlc2l6ZSB8fCAxMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXQsXG4gICAgICAgICAgICAgICAgICAgIHdoZW46IGZ1bmN0aW9uKGFuc3dlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbnN3ZXJzW2RlcGVuZGVuY3kubmFtZV0gPT09IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdlbmVyYXRlQ2hlY2tib3hQcm9tcHQoZGVwZW5kZW5jeSwgY29udGV4dCkge1xuICAgICAgICBsZXQgYWN0dWFsQ2hvaWNlcyA9IGNvbnRleHRbZGVwZW5kZW5jeS5jaG9pY2VzXSB8fCBkZXBlbmRlbmN5LmNob2ljZXM7XG4gICAgICAgIGlmICghIGRlcGVuZGVuY3kuY3VzdG9tSW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRlcGVuZGVuY3kubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlczogYWN0dWFsQ2hvaWNlcyxcbiAgICAgICAgICAgICAgICAgICAgcGFnZXNpemU6IGRlcGVuZGVuY3kucGFnZXNpemUgfHwgMTBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWN0dWFsQ2hvaWNlcy5wdXNoKHtuYW1lOiBkZXBlbmRlbmN5LmN1c3RvbUlucHV0LCB2YWx1ZTogZGVwZW5kZW5jeS5jdXN0b21JbnB1dH0pO1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGRlcGVuZGVuY3kubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzOiBhY3R1YWxDaG9pY2VzLFxuICAgICAgICAgICAgICAgICAgICBwYWdlc2l6ZTogZGVwZW5kZW5jeS5wYWdlc2l6ZSB8fCAxMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXQsXG4gICAgICAgICAgICAgICAgICAgIHdoZW46IGZ1bmN0aW9uKGFuc3dlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbnN3ZXJzW2RlcGVuZGVuY3kubmFtZV0gPT09IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIG5hbWVzcGFjZVxuICAgICAqIEBwYXJhbSB7YW55fSBkZXBlbmRlbmN5IFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBuYW1lc3BhY2UgXG4gICAgICovXG4gICAgY3JlYXRlTmFtZXNwYWNlKGRlcGVuZGVuY3ksIGxvY2F0aW9uKSB7XG4gICAgICAgIGNvbnN0IG1pbGVzdG9uZVBhdGggPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0TmVhcmVzdEZpbGVTZWFyY2hpbmdVcHdhcmRzKGxvY2F0aW9uLCBuZXcgUmVnRXhwKGRlcGVuZGVuY3kubWlsZXN0b25lKSk7XG4gICAgICAgIGxldCBtaWxlc3RvbmVGaWxlTmFtZSA9IGdsb2JhbC5nZXRGaWxlTmFtZShtaWxlc3RvbmVQYXRoKTtcbiAgICAgICAgbGV0IG1pbGVzdG9uZUZpbGVEaXIgPSBnbG9iYWwuZ2V0RmlsZURpclBhdGgobWlsZXN0b25lUGF0aClcblxuICAgICAgICBsZXQgbmFtZXNwYWNlU2VnbWVudHMgPSBbXTtcbiAgICAgICAgbGV0IHNlZ21lbnRQYXRoID0gbG9jYXRpb247XG4gICAgICAgIGxldCBzZWdtZW50ID0gZ2xvYmFsLmdldEZpbGVOYW1lQW5kRXh0ZW5zaW9uKHNlZ21lbnRQYXRoKTtcblxuICAgICAgICB3aGlsZSAoc2VnbWVudFBhdGggIT0gbWlsZXN0b25lRmlsZURpcikge1xuICAgICAgICAgICAgaWYgKHNlZ21lbnQgPT09ICcnIHx8IHNlZ21lbnRQYXRoID09PSAnLycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIud2FybignQ291bGQgbm90IGRpc2NvdmVyIHRoZSBuYW1lc3BhY2UnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuYW1lc3BhY2VTZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuICAgICAgICAgICAgc2VnbWVudFBhdGggPSBnbG9iYWwuZ2V0RmlsZURpcihzZWdtZW50UGF0aCk7XG4gICAgICAgICAgICBzZWdtZW50ID0gZ2xvYmFsLmdldEZpbGVOYW1lKHNlZ21lbnRQYXRoKTtcbiAgICAgICAgfSBcbiAgICAgICAgbmFtZXNwYWNlU2VnbWVudHMgPSBuYW1lc3BhY2VTZWdtZW50cy5yZXZlcnNlKCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgbmFtZXNwYWNlID0gbWlsZXN0b25lRmlsZU5hbWU7XG4gICAgICAgIG5hbWVzcGFjZVNlZ21lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBuYW1lc3BhY2UgKz0gJy4nICsgZWxlbWVudDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5hbWVzcGFjZTtcbiAgICB9XG59Il19