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
            var milestoneRegexp = new RegExp(dependency.milestone);
            var milestonePath = _folders.get(this).getNearestFileSearchingUpwards(location, milestoneRegexp);
            if (milestonePath === null || milestonePath === '') {
                this._logger.warn('Could not discover the namespace');
                return '';
            }
            var milestoneFileName = (0, _helpers.getFileName)(milestonePath);

            var namespaceSegments = [];
            var segmentPath = location;
            var segment = (0, _helpers.getFileNameAndExtension)(segmentPath);

            while (_folders.get(this).searchFolderRegex(segmentPath, milestoneRegexp).length === 0) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvSW5xdWlyZXJNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImlucXVpcmVyIiwicmVxdWlyZSIsIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9maWxlU3lzdGVtIiwiSW5xdWlyZXJNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwiYXJ0aWZhY3ROYW1lIiwibG9jYXRpb24iLCJib2lsZXJQbGF0ZSIsImFydGlmYWN0VGVtcGxhdGUiLCJjb250ZXh0IiwibmFtZSIsImRlcGVuZGVuY2llcyIsInVuZGVmaW5lZCIsImZvckVhY2giLCJwdXNoIiwiZGVwZW5kZW5jeSIsInF1ZXN0aW9ucyIsInR5cGUiLCJnZW5lcmF0ZURlcGVuZGVuY3kiLCJnZW5lcmF0ZVByb21wdCIsInByb21wdCIsInRoZW4iLCJhbnN3ZXJzIiwiZmllbGQiLCJfIiwiZGlzY292ZXIiLCJkaXNjb3ZlclR5cGUiLCJkaXNjb3Zlck5hbWVzcGFjZSIsImRpc2NvdmVyTXVsdGlwbGVGaWxlcyIsIm5hbWVzcGFjZSIsImNyZWF0ZU5hbWVzcGFjZSIsImZpbGVQYXRocyIsImZyb21Gb2xkZXJzIiwiZ2V0Iiwic2VhcmNoUmVjdXJzaXZlUmVnZXgiLCJSZWdFeHAiLCJmaWxlTWF0Y2giLCJnZXROZWFyZXN0RGlyc1NlYXJjaGluZ1Vwd2FyZHMiLCJmb2xkZXIiLCJyZXN1bHRzIiwiY29udGVudE1hdGNoIiwiY29udGVudCIsInJlYWRGaWxlU3luYyIsImZpbGVQYXRoIiwidGhlTWF0Y2giLCJtYXRjaCIsImxlbmd0aCIsIndpdGhOYW1lc3BhY2UiLCJjaG9pY2UiLCJ2YWx1ZSIsInByb21wdFR5cGUiLCJnZW5lcmF0ZUlucHV0UHJvbXB0IiwiZ2VuZXJhdGVMaXN0UHJvbXB0IiwiZ2VuZXJhdGVDaGVja2JveFByb21wdCIsIm1lc3NhZ2UiLCJhY3R1YWxDaG9pY2VzIiwiY2hvaWNlcyIsImN1c3RvbUlucHV0IiwicGFnZXNpemUiLCJ3aGVuIiwibWlsZXN0b25lUmVnZXhwIiwibWlsZXN0b25lIiwibWlsZXN0b25lUGF0aCIsImdldE5lYXJlc3RGaWxlU2VhcmNoaW5nVXB3YXJkcyIsIndhcm4iLCJtaWxlc3RvbmVGaWxlTmFtZSIsIm5hbWVzcGFjZVNlZ21lbnRzIiwic2VnbWVudFBhdGgiLCJzZWdtZW50Iiwic2VhcmNoRm9sZGVyUmVnZXgiLCJyZXZlcnNlIiwiZWxlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFWQTs7Ozs7QUFLQTtBQU9BLElBQU1BLFdBQVdDLFFBQVEsVUFBUixDQUFqQjtBQUNBOzs7QUFHQSxJQUFNQyxXQUFXLElBQUlDLE9BQUosRUFBakI7QUFDQTs7O0FBR0EsSUFBTUMsY0FBYyxJQUFJRCxPQUFKLEVBQXBCOztJQUVhRSxlLFdBQUFBLGU7QUFDVDs7Ozs7O0FBTUEsNkJBQVlDLE9BQVosRUFBcUJDLFVBQXJCLEVBQWlDQyxNQUFqQyxFQUF5QztBQUFBOztBQUNyQ04saUJBQVNPLEdBQVQsQ0FBYSxJQUFiLEVBQW1CSCxPQUFuQjtBQUNBRixvQkFBWUssR0FBWixDQUFnQixJQUFoQixFQUFzQkYsVUFBdEI7QUFDQSxhQUFLRyxPQUFMLEdBQWVGLE1BQWY7QUFFSDtBQUNEOzs7Ozs7Ozs7Ozs7O21DQVNXRyxZLEVBQWNDLFEsRUFBVUMsVyxFQUFhQyxnQixFQUFrQjtBQUFBOztBQUM5RCxnQkFBSUMsVUFBVSxFQUFFQyxNQUFNTCxZQUFSLEVBQWQ7QUFDQSxnQkFBSU0sZUFBZSxFQUFuQjtBQUNBLGdCQUFJSixZQUFZSSxZQUFaLEtBQTZCQyxTQUFqQyxFQUNJTCxZQUFZSSxZQUFaLENBQXlCRSxPQUF6QixDQUFpQztBQUFBLHVCQUFjRixhQUFhRyxJQUFiLENBQWtCQyxVQUFsQixDQUFkO0FBQUEsYUFBakM7QUFDSixnQkFBS1AsaUJBQWlCRyxZQUFqQixLQUFrQ0MsU0FBdkMsRUFDSUosaUJBQWlCRyxZQUFqQixDQUE4QkUsT0FBOUIsQ0FBc0M7QUFBQSx1QkFBY0YsYUFBYUcsSUFBYixDQUFrQkMsVUFBbEIsQ0FBZDtBQUFBLGFBQXRDOztBQUVKLGdCQUFJQyxZQUFZLEVBQWhCOztBQUVBTCx5QkFBYUUsT0FBYixDQUFxQixzQkFBYztBQUMvQixvQkFBSUUsV0FBV0UsSUFBWCxLQUFvQixRQUF4QixFQUNJUixVQUFVLE1BQUtTLGtCQUFMLENBQXdCSCxVQUF4QixFQUFvQ1QsUUFBcEMsRUFBOENHLE9BQTlDLENBQVY7QUFDUCxhQUhEO0FBSUFFLHlCQUFhRSxPQUFiLENBQXFCLHNCQUFjO0FBQy9CLG9CQUFJRSxXQUFXRSxJQUFYLEtBQW9CLFFBQXhCLEVBQ0lELFVBQVVGLElBQVYsbURBQWtCLE1BQUtLLGNBQUwsQ0FBb0JKLFVBQXBCLEVBQWdDTixPQUFoQyxDQUFsQjtBQUNQLGFBSEQ7O0FBS0EsbUJBQU9mLFNBQVMwQixNQUFULENBQWdCSixTQUFoQixFQUNGSyxJQURFLENBQ0csbUJBQVc7QUFDYkMsd0JBQVFaLElBQVIsR0FBZUQsUUFBUUMsSUFBdkI7QUFDQUMsNkJBQWFFLE9BQWIsQ0FBcUIsYUFBSztBQUN0Qix3QkFBTVUsUUFBUUMsRUFBRWQsSUFBaEI7QUFDQSx3QkFBSWMsRUFBRVAsSUFBRixLQUFXLFFBQVgsSUFBdUJLLFFBQVFDLEtBQVIsTUFBbUJYLFNBQTlDLEVBQXlEO0FBQ3JEVSxnQ0FBUUMsS0FBUixJQUFpQmQsUUFBUWMsS0FBUixDQUFqQjtBQUNIO0FBQ0osaUJBTEQ7QUFNQSx1QkFBT0QsT0FBUDtBQUNILGFBVkUsQ0FBUDtBQVdIO0FBQ0Q7Ozs7Ozs7OzsyQ0FNbUJQLFUsRUFBWVQsUSxFQUFVRyxPLEVBQVM7QUFDOUMsZ0JBQUlNLFdBQVdFLElBQVgsS0FBb0IsVUFBeEIsRUFBb0M7QUFDaEMsdUJBQU8sS0FBS1EsUUFBTCxDQUFjVixVQUFkLEVBQTBCVCxRQUExQixFQUFvQ0csT0FBcEMsQ0FBUDtBQUNIOztBQUVELHVEQUF3Q00sV0FBV0UsSUFBbkQ7QUFDSDtBQUNEOzs7Ozs7Ozs7aUNBTVNGLFUsRUFBWVQsUSxFQUFVRyxPLEVBQVM7QUFDcEMsZ0JBQUlNLFdBQVdXLFlBQVgsS0FBNEIsV0FBaEMsRUFBNkM7QUFDekMsdUJBQU8sS0FBS0MsaUJBQUwsQ0FBdUJaLFVBQXZCLEVBQW1DVCxRQUFuQyxFQUE2Q0csT0FBN0MsQ0FBUDtBQUNILGFBRkQsTUFHSyxJQUFJTSxXQUFXVyxZQUFYLEtBQTRCLGVBQWhDLEVBQWlEO0FBQ2xELHVCQUFPLEtBQUtFLHFCQUFMLENBQTJCYixVQUEzQixFQUF1Q1QsUUFBdkMsRUFBaURHLE9BQWpELENBQVA7QUFDSDs7QUFFRCxxREFBc0NNLFdBQVdXLFlBQWpEO0FBQ0g7QUFDRDs7Ozs7Ozs7OzBDQU1rQlgsVSxFQUFZVCxRLEVBQVVHLE8sRUFBUztBQUM3QyxnQkFBTW9CLFlBQVksS0FBS0MsZUFBTCxDQUFxQmYsVUFBckIsRUFBaUNULFFBQWpDLENBQWxCO0FBQ0FHLG9CQUFRTSxXQUFXTCxJQUFuQixJQUEyQm1CLFNBQTNCO0FBQ0EsbUJBQU9wQixPQUFQO0FBQ0g7QUFDRDs7Ozs7Ozs7OzhDQU1zQk0sVSxFQUFZVCxRLEVBQVVHLE8sRUFBUztBQUFBOztBQUVqRCxnQkFBSXNCLFlBQVksRUFBaEI7QUFDQSxnQkFBSWhCLFdBQVdpQixXQUFYLEtBQTJCcEIsU0FBL0IsRUFDSW1CLFlBQVluQyxTQUFTcUMsR0FBVCxDQUFhLElBQWIsRUFBbUJDLG9CQUFuQixDQUF3QzVCLFFBQXhDLEVBQWtELElBQUk2QixNQUFKLENBQVdwQixXQUFXcUIsU0FBdEIsQ0FBbEQsQ0FBWixDQURKLEtBRUs7QUFDRCxvQkFBTXBDLFVBQVVKLFNBQVNxQyxHQUFULENBQWEsSUFBYixFQUFtQkksOEJBQW5CLENBQWtEL0IsUUFBbEQsRUFBNEQsSUFBSTZCLE1BQUosQ0FBV3BCLFdBQVdpQixXQUF0QixDQUE1RCxDQUFoQjtBQUNBaEMsd0JBQVFhLE9BQVIsQ0FBZ0I7QUFBQTs7QUFBQSwyQkFBVSx5QkFBVUMsSUFBVixvREFBa0JsQixTQUFTcUMsR0FBVCxDQUFhLE1BQWIsRUFBbUJDLG9CQUFuQixDQUF3Q0ksTUFBeEMsRUFBZ0QsSUFBSUgsTUFBSixDQUFXcEIsV0FBV3FCLFNBQXRCLENBQWhELENBQWxCLEVBQVY7QUFBQSxpQkFBaEI7QUFDSDtBQUNELGdCQUFJRyxVQUFVLEVBQWQ7QUFDQSxnQkFBSXhCLFdBQVd5QixZQUFYLEtBQTRCNUIsU0FBNUIsSUFBeUNHLFdBQVd5QixZQUFYLEtBQTRCLEVBQXpFLEVBQTZFO0FBQ3pFRCwwQkFBVVIsU0FBVjtBQUNILGFBRkQsTUFHSztBQUNEQSwwQkFBVWxCLE9BQVYsQ0FBa0Isb0JBQVk7QUFDMUIsd0JBQUk0QixVQUFVM0MsWUFBWW1DLEdBQVosQ0FBZ0IsTUFBaEIsRUFBc0JTLFlBQXRCLENBQW1DQyxRQUFuQyxFQUE2QyxNQUE3QyxDQUFkO0FBQ0Esd0JBQUlDLFdBQVdILFFBQVFJLEtBQVIsQ0FBYyxJQUFJVixNQUFKLENBQVdwQixXQUFXeUIsWUFBdEIsQ0FBZCxDQUFmO0FBQ0Esd0JBQUlJLGFBQWEsSUFBYixJQUFxQkEsU0FBU0UsTUFBVCxHQUFrQixDQUEzQyxFQUE4QztBQUMxQyw0QkFBSWpCLFlBQVksRUFBaEI7QUFDQSw0QkFBSWQsV0FBV2dDLGFBQWYsRUFDSWxCLFlBQVksT0FBS0MsZUFBTCxDQUFxQmYsVUFBckIsRUFBaUMsNkJBQWU0QixRQUFmLENBQWpDLENBQVo7O0FBRUosNEJBQUlLLFNBQVNqQyxXQUFXZ0MsYUFBWCxHQUEyQixFQUFDckMsTUFBTW1CLFlBQVksR0FBWixHQUFrQmUsU0FBUyxDQUFULENBQXpCLEVBQXNDSyxPQUFPTCxTQUFTLENBQVQsQ0FBN0MsRUFBM0IsR0FDUCxFQUFDbEMsTUFBTWtDLFNBQVMsQ0FBVCxDQUFQLEVBQW9CSyxPQUFPTCxTQUFTLENBQVQsQ0FBM0IsRUFETjtBQUVBTCxnQ0FBUXpCLElBQVIsQ0FBYWtDLE1BQWI7QUFDSDtBQUNKLGlCQVpEO0FBYUg7QUFDRHZDLG9CQUFRTSxXQUFXTCxJQUFuQixJQUEyQjZCLE9BQTNCO0FBQ0EsbUJBQU85QixPQUFQO0FBQ0g7QUFDRDs7Ozs7Ozs7O3VDQU1lTSxVLEVBQVlOLE8sRUFBUztBQUNoQyxnQkFBSU0sV0FBV21DLFVBQVgsS0FBMEIsT0FBOUIsRUFBdUM7QUFDbkMsdUJBQU8sS0FBS0MsbUJBQUwsQ0FBeUJwQyxVQUF6QixDQUFQO0FBQ0gsYUFGRCxNQUdLLElBQUlBLFdBQVdtQyxVQUFYLEtBQTBCLFNBQTFCLElBQXVDbkMsV0FBV21DLFVBQVgsS0FBMEIsTUFBckUsRUFBNkU7QUFDOUUsdUJBQU8sS0FBS0Usa0JBQUwsQ0FBd0JyQyxVQUF4QixFQUFvQ04sT0FBcEMsQ0FBUDtBQUNILGFBRkksTUFHQSxJQUFJTSxXQUFXbUMsVUFBWCxLQUEwQixVQUE5QixFQUEwQztBQUMzQyx1QkFBTyxLQUFLRyxzQkFBTCxDQUE0QnRDLFVBQTVCLEVBQXdDTixPQUF4QyxDQUFQO0FBQ0g7O0FBRUQsa0RBQW1DTSxXQUFXbUMsVUFBOUM7QUFFSDtBQUNEOzs7Ozs7OzRDQUlvQm5DLFUsRUFBWTtBQUM1QixtQkFBTyxDQUFDO0FBQ0pFLHNCQUFNLE9BREY7QUFFSlAsc0JBQU1LLFdBQVdMLElBRmI7QUFHSjRDLHlCQUFTdkMsV0FBV3VDO0FBSGhCLGFBQUQsQ0FBUDtBQUtIO0FBQ0Q7Ozs7Ozs7OzJDQUttQnZDLFUsRUFBWU4sTyxFQUFTO0FBQ3BDLGdCQUFJOEMsZ0JBQWdCOUMsUUFBUU0sV0FBV3lDLE9BQW5CLEtBQStCekMsV0FBV3lDLE9BQTlEO0FBQ0EsZ0JBQUksQ0FBRXpDLFdBQVcwQyxXQUFqQixFQUE4QjtBQUMxQix1QkFBTyxDQUNIO0FBQ0l4QywwQkFBTUYsV0FBV21DLFVBRHJCO0FBRUl4QywwQkFBTUssV0FBV0wsSUFGckI7QUFHSTRDLDZCQUFTdkMsV0FBV3VDLE9BSHhCO0FBSUlFLDZCQUFTRCxhQUpiO0FBS0lHLDhCQUFVM0MsV0FBVzJDLFFBQVgsSUFBdUI7QUFMckMsaUJBREcsQ0FBUDtBQVNILGFBVkQsTUFXSztBQUNESCw4QkFBY3pDLElBQWQsQ0FBbUIsRUFBQ0osTUFBTUssV0FBVzBDLFdBQWxCLEVBQStCUixPQUFPbEMsV0FBVzBDLFdBQWpELEVBQW5CO0FBQ0EsdUJBQU8sQ0FDSDtBQUNJeEMsMEJBQU1GLFdBQVdtQyxVQURyQjtBQUVJeEMsMEJBQU1LLFdBQVdMLElBRnJCO0FBR0k0Qyw2QkFBU3ZDLFdBQVd1QyxPQUh4QjtBQUlJRSw2QkFBU0QsYUFKYjtBQUtJRyw4QkFBVTNDLFdBQVcyQyxRQUFYLElBQXVCO0FBTHJDLGlCQURHLEVBUUg7QUFDSXpDLDBCQUFNLE9BRFY7QUFFSVAsMEJBQU1LLFdBQVdMLElBRnJCO0FBR0k0Qyw2QkFBU3ZDLFdBQVcwQyxXQUh4QjtBQUlJRSwwQkFBTSxjQUFTckMsT0FBVCxFQUFrQjtBQUNwQiwrQkFBT0EsUUFBUVAsV0FBV0wsSUFBbkIsTUFBNkJLLFdBQVcwQyxXQUEvQztBQUNIO0FBTkwsaUJBUkcsQ0FBUDtBQWlCSDtBQUNKOzs7K0NBQ3NCMUMsVSxFQUFZTixPLEVBQVM7QUFDeEMsZ0JBQUk4QyxnQkFBZ0I5QyxRQUFRTSxXQUFXeUMsT0FBbkIsS0FBK0J6QyxXQUFXeUMsT0FBOUQ7QUFDQSxnQkFBSSxDQUFFekMsV0FBVzBDLFdBQWpCLEVBQThCO0FBQzFCLHVCQUFPLENBQ0g7QUFDSXhDLDBCQUFNLFVBRFY7QUFFSVAsMEJBQU1LLFdBQVdMLElBRnJCO0FBR0k0Qyw2QkFBU3ZDLFdBQVd1QyxPQUh4QjtBQUlJRSw2QkFBU0QsYUFKYjtBQUtJRyw4QkFBVTNDLFdBQVcyQyxRQUFYLElBQXVCO0FBTHJDLGlCQURHLENBQVA7QUFTSCxhQVZELE1BV0s7QUFDREgsOEJBQWN6QyxJQUFkLENBQW1CLEVBQUNKLE1BQU1LLFdBQVcwQyxXQUFsQixFQUErQlIsT0FBT2xDLFdBQVcwQyxXQUFqRCxFQUFuQjtBQUNBLHVCQUFPLENBQ0g7QUFDSXhDLDBCQUFNLFVBRFY7QUFFSVAsMEJBQU1LLFdBQVdMLElBRnJCO0FBR0k0Qyw2QkFBU3ZDLFdBQVd1QyxPQUh4QjtBQUlJRSw2QkFBU0QsYUFKYjtBQUtJRyw4QkFBVTNDLFdBQVcyQyxRQUFYLElBQXVCO0FBTHJDLGlCQURHLEVBUUg7QUFDSXpDLDBCQUFNLE9BRFY7QUFFSVAsMEJBQU1LLFdBQVdMLElBRnJCO0FBR0k0Qyw2QkFBU3ZDLFdBQVcwQyxXQUh4QjtBQUlJRSwwQkFBTSxjQUFTckMsT0FBVCxFQUFrQjtBQUNwQiwrQkFBT0EsUUFBUVAsV0FBV0wsSUFBbkIsTUFBNkJLLFdBQVcwQyxXQUEvQztBQUNIO0FBTkwsaUJBUkcsQ0FBUDtBQWlCSDtBQUNKO0FBQ0Q7Ozs7Ozs7Ozt3Q0FNZ0IxQyxVLEVBQVlULFEsRUFBVTtBQUNsQyxnQkFBSXNELGtCQUFrQixJQUFJekIsTUFBSixDQUFXcEIsV0FBVzhDLFNBQXRCLENBQXRCO0FBQ0EsZ0JBQU1DLGdCQUFnQmxFLFNBQVNxQyxHQUFULENBQWEsSUFBYixFQUFtQjhCLDhCQUFuQixDQUFrRHpELFFBQWxELEVBQTREc0QsZUFBNUQsQ0FBdEI7QUFDQSxnQkFBSUUsa0JBQWtCLElBQWxCLElBQTBCQSxrQkFBa0IsRUFBaEQsRUFBb0Q7QUFDaEQscUJBQUsxRCxPQUFMLENBQWE0RCxJQUFiLENBQWtCLGtDQUFsQjtBQUNBLHVCQUFPLEVBQVA7QUFDSDtBQUNELGdCQUFNQyxvQkFBb0IsMEJBQVlILGFBQVosQ0FBMUI7O0FBRUEsZ0JBQUlJLG9CQUFvQixFQUF4QjtBQUNBLGdCQUFJQyxjQUFjN0QsUUFBbEI7QUFDQSxnQkFBSThELFVBQVUsc0NBQXdCRCxXQUF4QixDQUFkOztBQUVBLG1CQUFPdkUsU0FBU3FDLEdBQVQsQ0FBYSxJQUFiLEVBQW1Cb0MsaUJBQW5CLENBQXFDRixXQUFyQyxFQUFrRFAsZUFBbEQsRUFBbUVkLE1BQW5FLEtBQThFLENBQXJGLEVBQXdGO0FBQ3BGb0Isa0NBQWtCcEQsSUFBbEIsQ0FBdUJzRCxPQUF2QjtBQUNBRCw4QkFBYyx5QkFBV0EsV0FBWCxDQUFkO0FBQ0FDLDBCQUFVLDBCQUFZRCxXQUFaLENBQVY7QUFDSDtBQUNERCxnQ0FBb0JBLGtCQUFrQkksT0FBbEIsRUFBcEI7O0FBRUEsZ0JBQUl6QyxZQUFZb0MsaUJBQWhCO0FBQ0FDLDhCQUFrQnJELE9BQWxCLENBQTBCLG1CQUFXO0FBQ2pDZ0IsNkJBQWEsTUFBTTBDLE9BQW5CO0FBQ0gsYUFGRDs7QUFJQSxtQkFBTzFDLFNBQVA7QUFDSCIsImZpbGUiOiJJbnF1aXJlck1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQge0ZvbGRlcnN9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCB7IGdldEZpbGVEaXJQYXRoLCBnZXRGaWxlTmFtZSwgZ2V0RmlsZU5hbWVBbmRFeHRlbnNpb24sIGdldEZpbGVEaXIgfSBmcm9tICcuLi9oZWxwZXJzJztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuY29uc3QgaW5xdWlyZXIgPSByZXF1aXJlKCdpbnF1aXJlcicpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxJbnF1aXJlck1hbmFnZXIsIEZvbGRlcnM+fVxuICovXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPElucXVpcmVyTWFuYWdlciwgZnM+fVxuICovXG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBjbGFzcyBJbnF1aXJlck1hbmFnZXIge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtJbnF1aXJlck1hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzIFxuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGFuZCBmaWxscyB0aGUgY29udGV4dCB1c2VkIGZvciB0ZW1wbGF0aW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFydGlmYWN0TmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvblxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGV9IGJvaWxlclBsYXRlIFxuICAgICAqIEBwYXJhbSB7YW55fSBhcnRpZmFjdFRlbXBsYXRlXG4gICAgICogXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBwcm9tcHRVc2VyKGFydGlmYWN0TmFtZSwgbG9jYXRpb24sIGJvaWxlclBsYXRlLCBhcnRpZmFjdFRlbXBsYXRlKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0geyBuYW1lOiBhcnRpZmFjdE5hbWUgfTtcbiAgICAgICAgbGV0IGRlcGVuZGVuY2llcyA9IFtdO1xuICAgICAgICBpZiAoYm9pbGVyUGxhdGUuZGVwZW5kZW5jaWVzICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBib2lsZXJQbGF0ZS5kZXBlbmRlbmNpZXMuZm9yRWFjaChkZXBlbmRlbmN5ID0+IGRlcGVuZGVuY2llcy5wdXNoKGRlcGVuZGVuY3kpKTtcbiAgICAgICAgaWYgKCBhcnRpZmFjdFRlbXBsYXRlLmRlcGVuZGVuY2llcyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgYXJ0aWZhY3RUZW1wbGF0ZS5kZXBlbmRlbmNpZXMuZm9yRWFjaChkZXBlbmRlbmN5ID0+IGRlcGVuZGVuY2llcy5wdXNoKGRlcGVuZGVuY3kpKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBxdWVzdGlvbnMgPSBbXTtcblxuICAgICAgICBkZXBlbmRlbmNpZXMuZm9yRWFjaChkZXBlbmRlbmN5ID0+IHtcbiAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5LnR5cGUgIT09ICdwcm9tcHQnKVxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzLmdlbmVyYXRlRGVwZW5kZW5jeShkZXBlbmRlbmN5LCBsb2NhdGlvbiwgY29udGV4dCk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXBlbmRlbmNpZXMuZm9yRWFjaChkZXBlbmRlbmN5ID0+IHtcbiAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5LnR5cGUgPT09ICdwcm9tcHQnKVxuICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKC4uLnRoaXMuZ2VuZXJhdGVQcm9tcHQoZGVwZW5kZW5jeSwgY29udGV4dCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaW5xdWlyZXIucHJvbXB0KHF1ZXN0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGFuc3dlcnMgPT4ge1xuICAgICAgICAgICAgICAgIGFuc3dlcnMubmFtZSA9IGNvbnRleHQubmFtZTtcbiAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXMuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmllbGQgPSBfLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLnR5cGUgIT09ICdwcm9tcHQnICYmIGFuc3dlcnNbZmllbGRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcnNbZmllbGRdID0gY29udGV4dFtmaWVsZF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2VycztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cbiAgICAgKiBAcGFyYW0ge2FueX0gY29udGV4dCBcbiAgICAgKi9cbiAgICBnZW5lcmF0ZURlcGVuZGVuY3koZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRlcGVuZGVuY3kudHlwZSA9PT0gJ2Rpc2NvdmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzY292ZXIoZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgYENhbm5vdCBoYW5kbGUgZGVwZW5kZW5jeSB0eXBlICcke2RlcGVuZGVuY3kudHlwZX0nYDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3kgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIFxuICAgICAqIEBwYXJhbSB7YW55fSBjb250ZXh0IFxuICAgICAqL1xuICAgIGRpc2NvdmVyKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIGlmIChkZXBlbmRlbmN5LmRpc2NvdmVyVHlwZSA9PT0gJ25hbWVzcGFjZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2NvdmVyTmFtZXNwYWNlKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZiAoZGVwZW5kZW5jeS5kaXNjb3ZlclR5cGUgPT09ICdtdWx0aXBsZUZpbGVzJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzY292ZXJNdWx0aXBsZUZpbGVzKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IGBDYW5ub3QgaGFuZGxlIGRpc2NvdmVyeVR5cGUgJyR7ZGVwZW5kZW5jeS5kaXNjb3ZlclR5cGV9J2A7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7YW55fSBkZXBlbmRlbmN5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIFxuICAgICAqIEBwYXJhbSB7YW55fSBjb250ZXh0IFxuICAgICAqL1xuICAgIGRpc2NvdmVyTmFtZXNwYWNlKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IHRoaXMuY3JlYXRlTmFtZXNwYWNlKGRlcGVuZGVuY3ksIGxvY2F0aW9uKTtcbiAgICAgICAgY29udGV4dFtkZXBlbmRlbmN5Lm5hbWVdID0gbmFtZXNwYWNlO1xuICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3lcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cbiAgICAgKiBAcGFyYW0ge2FueX0gY29udGV4dCBcbiAgICAgKi9cbiAgICBkaXNjb3Zlck11bHRpcGxlRmlsZXMoZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBmaWxlUGF0aHMgPSBbXTtcbiAgICAgICAgaWYgKGRlcGVuZGVuY3kuZnJvbUZvbGRlcnMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGZpbGVQYXRocyA9IF9mb2xkZXJzLmdldCh0aGlzKS5zZWFyY2hSZWN1cnNpdmVSZWdleChsb2NhdGlvbiwgbmV3IFJlZ0V4cChkZXBlbmRlbmN5LmZpbGVNYXRjaCkpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0TmVhcmVzdERpcnNTZWFyY2hpbmdVcHdhcmRzKGxvY2F0aW9uLCBuZXcgUmVnRXhwKGRlcGVuZGVuY3kuZnJvbUZvbGRlcnMpKTtcbiAgICAgICAgICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4gZmlsZVBhdGhzLnB1c2goLi4uX2ZvbGRlcnMuZ2V0KHRoaXMpLnNlYXJjaFJlY3Vyc2l2ZVJlZ2V4KGZvbGRlciwgbmV3IFJlZ0V4cChkZXBlbmRlbmN5LmZpbGVNYXRjaCkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgaWYgKGRlcGVuZGVuY3kuY29udGVudE1hdGNoID09PSB1bmRlZmluZWQgfHwgZGVwZW5kZW5jeS5jb250ZW50TWF0Y2ggPT09ICcnKSB7IFxuICAgICAgICAgICAgcmVzdWx0cyA9IGZpbGVQYXRocztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZpbGVQYXRocy5mb3JFYWNoKGZpbGVQYXRoID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4Jyk7XG4gICAgICAgICAgICAgICAgbGV0IHRoZU1hdGNoID0gY29udGVudC5tYXRjaChuZXcgUmVnRXhwKGRlcGVuZGVuY3kuY29udGVudE1hdGNoKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoZU1hdGNoICE9PSBudWxsICYmIHRoZU1hdGNoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWVzcGFjZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVwZW5kZW5jeS53aXRoTmFtZXNwYWNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlID0gdGhpcy5jcmVhdGVOYW1lc3BhY2UoZGVwZW5kZW5jeSwgZ2V0RmlsZURpclBhdGgoZmlsZVBhdGgpKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hvaWNlID0gZGVwZW5kZW5jeS53aXRoTmFtZXNwYWNlPyAge25hbWU6IG5hbWVzcGFjZSArICcuJyArIHRoZU1hdGNoWzFdLCB2YWx1ZTogdGhlTWF0Y2hbMV19XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHtuYW1lOiB0aGVNYXRjaFsxXSwgdmFsdWU6IHRoZU1hdGNoWzFdfTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGNob2ljZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dFtkZXBlbmRlbmN5Lm5hbWVdID0gcmVzdWx0cztcbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7YW55fSBkZXBlbmRlbmN5XG4gICAgICogQHBhcmFtIHthbnl9IGNvbnRleHRcbiAgICAgKiBAcmV0dXJucyB7YW55fSBxdWVzdGlvblxuICAgICAqL1xuICAgIGdlbmVyYXRlUHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRlcGVuZGVuY3kucHJvbXB0VHlwZSA9PT0gJ2lucHV0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVJbnB1dFByb21wdChkZXBlbmRlbmN5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXBlbmRlbmN5LnByb21wdFR5cGUgPT09ICdyYXdsaXN0JyB8fCBkZXBlbmRlbmN5LnByb21wdFR5cGUgPT09ICdsaXN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVMaXN0UHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlcGVuZGVuY3kucHJvbXB0VHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVDaGVja2JveFByb21wdChkZXBlbmRlbmN5LCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhyb3cgYENhbm5vdCBoYW5kbGUgcHJvbXB0VHlwZSAnJHtkZXBlbmRlbmN5LnByb21wdFR5cGV9J2A7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgYW4gaW5wdXQgcHJvbXB0XG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3lcbiAgICAgKi9cbiAgICBnZW5lcmF0ZUlucHV0UHJvbXB0KGRlcGVuZGVuY3kpIHtcbiAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5tZXNzYWdlXG4gICAgICAgIH1dO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBhIGxpc3QgcHJvbXB0XG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3lcbiAgICAgKiBAcGFyYW0ge2FueX0gY29udGV4dCBcbiAgICAgKi9cbiAgICBnZW5lcmF0ZUxpc3RQcm9tcHQoZGVwZW5kZW5jeSwgY29udGV4dCkge1xuICAgICAgICBsZXQgYWN0dWFsQ2hvaWNlcyA9IGNvbnRleHRbZGVwZW5kZW5jeS5jaG9pY2VzXSB8fCBkZXBlbmRlbmN5LmNob2ljZXM7XG4gICAgICAgIGlmICghIGRlcGVuZGVuY3kuY3VzdG9tSW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBkZXBlbmRlbmN5LnByb21wdFR5cGUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGRlcGVuZGVuY3kubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzOiBhY3R1YWxDaG9pY2VzLFxuICAgICAgICAgICAgICAgICAgICBwYWdlc2l6ZTogZGVwZW5kZW5jeS5wYWdlc2l6ZSB8fCAxMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhY3R1YWxDaG9pY2VzLnB1c2goe25hbWU6IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXQsIHZhbHVlOiBkZXBlbmRlbmN5LmN1c3RvbUlucHV0fSk7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZGVwZW5kZW5jeS5wcm9tcHRUeXBlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRlcGVuZGVuY3kubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlczogYWN0dWFsQ2hvaWNlcyxcbiAgICAgICAgICAgICAgICAgICAgcGFnZXNpemU6IGRlcGVuZGVuY3kucGFnZXNpemUgfHwgMTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZXBlbmRlbmN5LmN1c3RvbUlucHV0LFxuICAgICAgICAgICAgICAgICAgICB3aGVuOiBmdW5jdGlvbihhbnN3ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2Vyc1tkZXBlbmRlbmN5Lm5hbWVdID09PSBkZXBlbmRlbmN5LmN1c3RvbUlucHV0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW5lcmF0ZUNoZWNrYm94UHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpIHtcbiAgICAgICAgbGV0IGFjdHVhbENob2ljZXMgPSBjb250ZXh0W2RlcGVuZGVuY3kuY2hvaWNlc10gfHwgZGVwZW5kZW5jeS5jaG9pY2VzO1xuICAgICAgICBpZiAoISBkZXBlbmRlbmN5LmN1c3RvbUlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZXBlbmRlbmN5Lm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM6IGFjdHVhbENob2ljZXMsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzaXplOiBkZXBlbmRlbmN5LnBhZ2VzaXplIHx8IDEwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFjdHVhbENob2ljZXMucHVzaCh7bmFtZTogZGVwZW5kZW5jeS5jdXN0b21JbnB1dCwgdmFsdWU6IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXR9KTtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRlcGVuZGVuY3kubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlczogYWN0dWFsQ2hvaWNlcyxcbiAgICAgICAgICAgICAgICAgICAgcGFnZXNpemU6IGRlcGVuZGVuY3kucGFnZXNpemUgfHwgMTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZXBlbmRlbmN5LmN1c3RvbUlucHV0LFxuICAgICAgICAgICAgICAgICAgICB3aGVuOiBmdW5jdGlvbihhbnN3ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2Vyc1tkZXBlbmRlbmN5Lm5hbWVdID09PSBkZXBlbmRlbmN5LmN1c3RvbUlucHV0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBuYW1lc3BhY2VcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgbmFtZXNwYWNlIFxuICAgICAqL1xuICAgIGNyZWF0ZU5hbWVzcGFjZShkZXBlbmRlbmN5LCBsb2NhdGlvbikge1xuICAgICAgICBsZXQgbWlsZXN0b25lUmVnZXhwID0gbmV3IFJlZ0V4cChkZXBlbmRlbmN5Lm1pbGVzdG9uZSk7XG4gICAgICAgIGNvbnN0IG1pbGVzdG9uZVBhdGggPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0TmVhcmVzdEZpbGVTZWFyY2hpbmdVcHdhcmRzKGxvY2F0aW9uLCBtaWxlc3RvbmVSZWdleHApO1xuICAgICAgICBpZiAobWlsZXN0b25lUGF0aCA9PT0gbnVsbCB8fCBtaWxlc3RvbmVQYXRoID09PSAnJykge1xuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLndhcm4oJ0NvdWxkIG5vdCBkaXNjb3ZlciB0aGUgbmFtZXNwYWNlJyk7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWlsZXN0b25lRmlsZU5hbWUgPSBnZXRGaWxlTmFtZShtaWxlc3RvbmVQYXRoKTtcblxuICAgICAgICBsZXQgbmFtZXNwYWNlU2VnbWVudHMgPSBbXTtcbiAgICAgICAgbGV0IHNlZ21lbnRQYXRoID0gbG9jYXRpb247XG4gICAgICAgIGxldCBzZWdtZW50ID0gZ2V0RmlsZU5hbWVBbmRFeHRlbnNpb24oc2VnbWVudFBhdGgpO1xuICAgICAgIFxuICAgICAgICB3aGlsZSAoX2ZvbGRlcnMuZ2V0KHRoaXMpLnNlYXJjaEZvbGRlclJlZ2V4KHNlZ21lbnRQYXRoLCBtaWxlc3RvbmVSZWdleHApLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgbmFtZXNwYWNlU2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICAgICAgICAgIHNlZ21lbnRQYXRoID0gZ2V0RmlsZURpcihzZWdtZW50UGF0aCk7XG4gICAgICAgICAgICBzZWdtZW50ID0gZ2V0RmlsZU5hbWUoc2VnbWVudFBhdGgpO1xuICAgICAgICB9IFxuICAgICAgICBuYW1lc3BhY2VTZWdtZW50cyA9IG5hbWVzcGFjZVNlZ21lbnRzLnJldmVyc2UoKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBuYW1lc3BhY2UgPSBtaWxlc3RvbmVGaWxlTmFtZTtcbiAgICAgICAgbmFtZXNwYWNlU2VnbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIG5hbWVzcGFjZSArPSAnLicgKyBlbGVtZW50O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmFtZXNwYWNlO1xuICAgIH1cbn0iXX0=