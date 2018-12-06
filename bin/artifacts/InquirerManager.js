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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvSW5xdWlyZXJNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImlucXVpcmVyIiwicmVxdWlyZSIsIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9maWxlU3lzdGVtIiwiSW5xdWlyZXJNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwiYXJ0aWZhY3ROYW1lIiwibG9jYXRpb24iLCJib2lsZXJQbGF0ZSIsImFydGlmYWN0VGVtcGxhdGUiLCJjb250ZXh0IiwibmFtZSIsImRlcGVuZGVuY2llcyIsInVuZGVmaW5lZCIsImZvckVhY2giLCJwdXNoIiwiZGVwZW5kZW5jeSIsInF1ZXN0aW9ucyIsInR5cGUiLCJnZW5lcmF0ZURlcGVuZGVuY3kiLCJnZW5lcmF0ZVByb21wdCIsInByb21wdCIsInRoZW4iLCJhbnN3ZXJzIiwiZmllbGQiLCJfIiwiZGlzY292ZXIiLCJkaXNjb3ZlclR5cGUiLCJkaXNjb3Zlck5hbWVzcGFjZSIsImRpc2NvdmVyTXVsdGlwbGVGaWxlcyIsIm5hbWVzcGFjZSIsImNyZWF0ZU5hbWVzcGFjZSIsImZpbGVQYXRocyIsImZyb21Gb2xkZXJzIiwiZ2V0Iiwic2VhcmNoUmVjdXJzaXZlUmVnZXgiLCJSZWdFeHAiLCJmaWxlTWF0Y2giLCJnZXROZWFyZXN0RGlyc1NlYXJjaGluZ1Vwd2FyZHMiLCJmb2xkZXIiLCJyZXN1bHRzIiwiY29udGVudE1hdGNoIiwiY29udGVudCIsInJlYWRGaWxlU3luYyIsImZpbGVQYXRoIiwidGhlTWF0Y2giLCJtYXRjaCIsImxlbmd0aCIsIndpdGhOYW1lc3BhY2UiLCJjaG9pY2UiLCJ2YWx1ZSIsInByb21wdFR5cGUiLCJnZW5lcmF0ZUlucHV0UHJvbXB0IiwiZ2VuZXJhdGVMaXN0UHJvbXB0IiwiZ2VuZXJhdGVDaGVja2JveFByb21wdCIsIm1lc3NhZ2UiLCJhY3R1YWxDaG9pY2VzIiwiY2hvaWNlcyIsImN1c3RvbUlucHV0IiwicGFnZXNpemUiLCJ3aGVuIiwibWlsZXN0b25lUmVnZXhwIiwibWlsZXN0b25lIiwibWlsZXN0b25lUGF0aCIsImdldE5lYXJlc3RGaWxlU2VhcmNoaW5nVXB3YXJkcyIsIndhcm4iLCJtaWxlc3RvbmVGaWxlTmFtZSIsIm5hbWVzcGFjZVNlZ21lbnRzIiwic2VnbWVudFBhdGgiLCJzZWdtZW50Iiwic2VhcmNoRm9sZGVyUmVnZXgiLCJyZXZlcnNlIiwiZWxlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFWQTs7Ozs7QUFLQTtBQU9BLElBQU1BLFdBQVdDLFFBQVEsVUFBUixDQUFqQjtBQUNBOzs7QUFHQSxJQUFNQyxXQUFXLElBQUlDLE9BQUosRUFBakI7QUFDQTs7O0FBR0EsSUFBTUMsY0FBYyxJQUFJRCxPQUFKLEVBQXBCOztJQUVhRSxlLFdBQUFBLGU7QUFDVDs7Ozs7O0FBTUEsNkJBQVlDLE9BQVosRUFBcUJDLFVBQXJCLEVBQWlDQyxNQUFqQyxFQUF5QztBQUFBOztBQUNyQ04saUJBQVNPLEdBQVQsQ0FBYSxJQUFiLEVBQW1CSCxPQUFuQjtBQUNBRixvQkFBWUssR0FBWixDQUFnQixJQUFoQixFQUFzQkYsVUFBdEI7QUFDQSxhQUFLRyxPQUFMLEdBQWVGLE1BQWY7QUFFSDtBQUNEOzs7Ozs7Ozs7Ozs7O21DQVNXRyxZLEVBQWNDLFEsRUFBVUMsVyxFQUFhQyxnQixFQUFrQjtBQUFBOztBQUM5RCxnQkFBSUMsVUFBVSxFQUFFQyxNQUFNTCxZQUFSLEVBQWQ7QUFDQSxnQkFBSU0sZUFBZSxFQUFuQjtBQUNBLGdCQUFJSixZQUFZSSxZQUFaLEtBQTZCQyxTQUFqQyxFQUNJTCxZQUFZSSxZQUFaLENBQXlCRSxPQUF6QixDQUFpQztBQUFBLHVCQUFjRixhQUFhRyxJQUFiLENBQWtCQyxVQUFsQixDQUFkO0FBQUEsYUFBakM7QUFDSixnQkFBS1AsaUJBQWlCRyxZQUFqQixLQUFrQ0MsU0FBdkMsRUFDSUosaUJBQWlC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b0MsaUJBQWhCO0FBQ0FDLDhCQUFrQnJELE9BQWxCLENBQTBCLG1CQUFXO0FBQ2pDZ0IsNkJBQWEsTUFBTTBDLE9BQW5CO0FBQ0gsYUFGRDs7QUFJQSxtQkFBTzFDLFNBQVA7QUFDSCIsImZpbGUiOiJJbnF1aXJlck1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5pbXBvcnQge0ZvbGRlcnN9IGZyb20gJy4uL0ZvbGRlcnMnO1xyXG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnd2luc3Rvbic7XHJcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XHJcbmltcG9ydCB7IGdldEZpbGVEaXJQYXRoLCBnZXRGaWxlTmFtZSwgZ2V0RmlsZU5hbWVBbmRFeHRlbnNpb24sIGdldEZpbGVEaXIgfSBmcm9tICcuLi9oZWxwZXJzJztcclxuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5cclxuY29uc3QgaW5xdWlyZXIgPSByZXF1aXJlKCdpbnF1aXJlcicpO1xyXG4vKipcclxuICogQHR5cGUge1dlYWtNYXA8SW5xdWlyZXJNYW5hZ2VyLCBGb2xkZXJzPn1cclxuICovXHJcbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPElucXVpcmVyTWFuYWdlciwgZnM+fVxyXG4gKi9cclxuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuZXhwb3J0IGNsYXNzIElucXVpcmVyTWFuYWdlciB7XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtJbnF1aXJlck1hbmFnZXJ9XHJcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnMgXHJcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXHJcbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGZvbGRlcnMsIGZpbGVTeXN0ZW0sIGxvZ2dlcikge1xyXG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcclxuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XHJcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9tcHRzIHRoZSB1c2VyIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGFuZCBmaWxscyB0aGUgY29udGV4dCB1c2VkIGZvciB0ZW1wbGF0aW5nXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXJ0aWZhY3ROYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cclxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGV9IGJvaWxlclBsYXRlIFxyXG4gICAgICogQHBhcmFtIHthbnl9IGFydGlmYWN0VGVtcGxhdGVcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cclxuICAgICAqL1xyXG4gICAgcHJvbXB0VXNlcihhcnRpZmFjdE5hbWUsIGxvY2F0aW9uLCBib2lsZXJQbGF0ZSwgYXJ0aWZhY3RUZW1wbGF0ZSkge1xyXG4gICAgICAgIGxldCBjb250ZXh0ID0geyBuYW1lOiBhcnRpZmFjdE5hbWUgfTtcclxuICAgICAgICBsZXQgZGVwZW5kZW5jaWVzID0gW107XHJcbiAgICAgICAgaWYgKGJvaWxlclBsYXRlLmRlcGVuZGVuY2llcyAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBib2lsZXJQbGF0ZS5kZXBlbmRlbmNpZXMuZm9yRWFjaChkZXBlbmRlbmN5ID0+IGRlcGVuZGVuY2llcy5wdXNoKGRlcGVuZGVuY3kpKTtcclxuICAgICAgICBpZiAoIGFydGlmYWN0VGVtcGxhdGUuZGVwZW5kZW5jaWVzICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGFydGlmYWN0VGVtcGxhdGUuZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwZW5kZW5jeSA9PiBkZXBlbmRlbmNpZXMucHVzaChkZXBlbmRlbmN5KSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHF1ZXN0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICBkZXBlbmRlbmNpZXMuZm9yRWFjaChkZXBlbmRlbmN5ID0+IHtcclxuICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3kudHlwZSAhPT0gJ3Byb21wdCcpXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhpcy5nZW5lcmF0ZURlcGVuZGVuY3koZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRlcGVuZGVuY2llcy5mb3JFYWNoKGRlcGVuZGVuY3kgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGVwZW5kZW5jeS50eXBlID09PSAncHJvbXB0JylcclxuICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKC4uLnRoaXMuZ2VuZXJhdGVQcm9tcHQoZGVwZW5kZW5jeSwgY29udGV4dCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5xdWlyZXIucHJvbXB0KHF1ZXN0aW9ucylcclxuICAgICAgICAgICAgLnRoZW4oYW5zd2VycyA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbnN3ZXJzLm5hbWUgPSBjb250ZXh0Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXMuZm9yRWFjaChfID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZCA9IF8ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXy50eXBlICE9PSAncHJvbXB0JyAmJiBhbnN3ZXJzW2ZpZWxkXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcnNbZmllbGRdID0gY29udGV4dFtmaWVsZF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2VycztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3kgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cclxuICAgICAqIEBwYXJhbSB7YW55fSBjb250ZXh0IFxyXG4gICAgICovXHJcbiAgICBnZW5lcmF0ZURlcGVuZGVuY3koZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpIHtcclxuICAgICAgICBpZiAoZGVwZW5kZW5jeS50eXBlID09PSAnZGlzY292ZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2NvdmVyKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IGBDYW5ub3QgaGFuZGxlIGRlcGVuZGVuY3kgdHlwZSAnJHtkZXBlbmRlbmN5LnR5cGV9J2A7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3kgXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gY29udGV4dCBcclxuICAgICAqL1xyXG4gICAgZGlzY292ZXIoZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpIHtcclxuICAgICAgICBpZiAoZGVwZW5kZW5jeS5kaXNjb3ZlclR5cGUgPT09ICduYW1lc3BhY2UnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2NvdmVyTmFtZXNwYWNlKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKGRlcGVuZGVuY3kuZGlzY292ZXJUeXBlID09PSAnbXVsdGlwbGVGaWxlcycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzY292ZXJNdWx0aXBsZUZpbGVzKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IGBDYW5ub3QgaGFuZGxlIGRpc2NvdmVyeVR5cGUgJyR7ZGVwZW5kZW5jeS5kaXNjb3ZlclR5cGV9J2A7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3lcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBcclxuICAgICAqIEBwYXJhbSB7YW55fSBjb250ZXh0IFxyXG4gICAgICovXHJcbiAgICBkaXNjb3Zlck5hbWVzcGFjZShkZXBlbmRlbmN5LCBsb2NhdGlvbiwgY29udGV4dCkge1xyXG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IHRoaXMuY3JlYXRlTmFtZXNwYWNlKGRlcGVuZGVuY3ksIGxvY2F0aW9uKTtcclxuICAgICAgICBjb250ZXh0W2RlcGVuZGVuY3kubmFtZV0gPSBuYW1lc3BhY2U7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3lcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvblxyXG4gICAgICogQHBhcmFtIHthbnl9IGNvbnRleHQgXHJcbiAgICAgKi9cclxuICAgIGRpc2NvdmVyTXVsdGlwbGVGaWxlcyhkZXBlbmRlbmN5LCBsb2NhdGlvbiwgY29udGV4dCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBmaWxlUGF0aHMgPSBbXTtcclxuICAgICAgICBpZiAoZGVwZW5kZW5jeS5mcm9tRm9sZGVycyA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBmaWxlUGF0aHMgPSBfZm9sZGVycy5nZXQodGhpcykuc2VhcmNoUmVjdXJzaXZlUmVnZXgobG9jYXRpb24sIG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5maWxlTWF0Y2gpKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgZm9sZGVycyA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXROZWFyZXN0RGlyc1NlYXJjaGluZ1Vwd2FyZHMobG9jYXRpb24sIG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5mcm9tRm9sZGVycykpO1xyXG4gICAgICAgICAgICBmb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IGZpbGVQYXRocy5wdXNoKC4uLl9mb2xkZXJzLmdldCh0aGlzKS5zZWFyY2hSZWN1cnNpdmVSZWdleChmb2xkZXIsIG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5maWxlTWF0Y2gpKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgIGlmIChkZXBlbmRlbmN5LmNvbnRlbnRNYXRjaCA9PT0gdW5kZWZpbmVkIHx8IGRlcGVuZGVuY3kuY29udGVudE1hdGNoID09PSAnJykgeyBcclxuICAgICAgICAgICAgcmVzdWx0cyA9IGZpbGVQYXRocztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZpbGVQYXRocy5mb3JFYWNoKGZpbGVQYXRoID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcclxuICAgICAgICAgICAgICAgIGxldCB0aGVNYXRjaCA9IGNvbnRlbnQubWF0Y2gobmV3IFJlZ0V4cChkZXBlbmRlbmN5LmNvbnRlbnRNYXRjaCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoZU1hdGNoICE9PSBudWxsICYmIHRoZU1hdGNoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZXNwYWNlID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3kud2l0aE5hbWVzcGFjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlID0gdGhpcy5jcmVhdGVOYW1lc3BhY2UoZGVwZW5kZW5jeSwgZ2V0RmlsZURpclBhdGgoZmlsZVBhdGgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNob2ljZSA9IGRlcGVuZGVuY3kud2l0aE5hbWVzcGFjZT8gIHtuYW1lOiBuYW1lc3BhY2UgKyAnLicgKyB0aGVNYXRjaFsxXSwgdmFsdWU6IHRoZU1hdGNoWzFdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHtuYW1lOiB0aGVNYXRjaFsxXSwgdmFsdWU6IHRoZU1hdGNoWzFdfTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goY2hvaWNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRleHRbZGVwZW5kZW5jeS5uYW1lXSA9IHJlc3VsdHM7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3lcclxuICAgICAqIEBwYXJhbSB7YW55fSBjb250ZXh0XHJcbiAgICAgKiBAcmV0dXJucyB7YW55fSBxdWVzdGlvblxyXG4gICAgICovXHJcbiAgICBnZW5lcmF0ZVByb21wdChkZXBlbmRlbmN5LCBjb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKGRlcGVuZGVuY3kucHJvbXB0VHlwZSA9PT0gJ2lucHV0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUlucHV0UHJvbXB0KGRlcGVuZGVuY3kpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkZXBlbmRlbmN5LnByb21wdFR5cGUgPT09ICdyYXdsaXN0JyB8fCBkZXBlbmRlbmN5LnByb21wdFR5cGUgPT09ICdsaXN0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUxpc3RQcm9tcHQoZGVwZW5kZW5jeSwgY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRlcGVuZGVuY3kucHJvbXB0VHlwZSA9PT0gJ2NoZWNrYm94Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUNoZWNrYm94UHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aHJvdyBgQ2Fubm90IGhhbmRsZSBwcm9tcHRUeXBlICcke2RlcGVuZGVuY3kucHJvbXB0VHlwZX0nYDtcclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIGFuIGlucHV0IHByb21wdFxyXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3lcclxuICAgICAqL1xyXG4gICAgZ2VuZXJhdGVJbnB1dFByb21wdChkZXBlbmRlbmN5KSB7XHJcbiAgICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXHJcbiAgICAgICAgICAgIG5hbWU6IGRlcGVuZGVuY3kubmFtZSxcclxuICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5tZXNzYWdlXHJcbiAgICAgICAgfV07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIGEgbGlzdCBwcm9tcHRcclxuICAgICAqIEBwYXJhbSB7YW55fSBkZXBlbmRlbmN5XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gY29udGV4dCBcclxuICAgICAqL1xyXG4gICAgZ2VuZXJhdGVMaXN0UHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpIHtcclxuICAgICAgICBsZXQgYWN0dWFsQ2hvaWNlcyA9IGNvbnRleHRbZGVwZW5kZW5jeS5jaG9pY2VzXSB8fCBkZXBlbmRlbmN5LmNob2ljZXM7XHJcbiAgICAgICAgaWYgKCEgZGVwZW5kZW5jeS5jdXN0b21JbnB1dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGRlcGVuZGVuY3kucHJvbXB0VHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM6IGFjdHVhbENob2ljZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZXNpemU6IGRlcGVuZGVuY3kucGFnZXNpemUgfHwgMTBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFjdHVhbENob2ljZXMucHVzaCh7bmFtZTogZGVwZW5kZW5jeS5jdXN0b21JbnB1dCwgdmFsdWU6IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXR9KTtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBkZXBlbmRlbmN5LnByb21wdFR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRlcGVuZGVuY3kubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzOiBhY3R1YWxDaG9pY2VzLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzaXplOiBkZXBlbmRlbmN5LnBhZ2VzaXplIHx8IDEwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgd2hlbjogZnVuY3Rpb24oYW5zd2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2Vyc1tkZXBlbmRlbmN5Lm5hbWVdID09PSBkZXBlbmRlbmN5LmN1c3RvbUlucHV0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZW5lcmF0ZUNoZWNrYm94UHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpIHtcclxuICAgICAgICBsZXQgYWN0dWFsQ2hvaWNlcyA9IGNvbnRleHRbZGVwZW5kZW5jeS5jaG9pY2VzXSB8fCBkZXBlbmRlbmN5LmNob2ljZXM7XHJcbiAgICAgICAgaWYgKCEgZGVwZW5kZW5jeS5jdXN0b21JbnB1dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRlcGVuZGVuY3kubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzOiBhY3R1YWxDaG9pY2VzLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzaXplOiBkZXBlbmRlbmN5LnBhZ2VzaXplIHx8IDEwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhY3R1YWxDaG9pY2VzLnB1c2goe25hbWU6IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXQsIHZhbHVlOiBkZXBlbmRlbmN5LmN1c3RvbUlucHV0fSk7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM6IGFjdHVhbENob2ljZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZXNpemU6IGRlcGVuZGVuY3kucGFnZXNpemUgfHwgMTBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5jdXN0b21JbnB1dCxcclxuICAgICAgICAgICAgICAgICAgICB3aGVuOiBmdW5jdGlvbihhbnN3ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbnN3ZXJzW2RlcGVuZGVuY3kubmFtZV0gPT09IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgbmFtZXNwYWNlXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvblxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gdGhlIG5hbWVzcGFjZSBcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTmFtZXNwYWNlKGRlcGVuZGVuY3ksIGxvY2F0aW9uKSB7XHJcbiAgICAgICAgbGV0IG1pbGVzdG9uZVJlZ2V4cCA9IG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5taWxlc3RvbmUpO1xyXG4gICAgICAgIGNvbnN0IG1pbGVzdG9uZVBhdGggPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0TmVhcmVzdEZpbGVTZWFyY2hpbmdVcHdhcmRzKGxvY2F0aW9uLCBtaWxlc3RvbmVSZWdleHApO1xyXG4gICAgICAgIGlmIChtaWxlc3RvbmVQYXRoID09PSBudWxsIHx8IG1pbGVzdG9uZVBhdGggPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci53YXJuKCdDb3VsZCBub3QgZGlzY292ZXIgdGhlIG5hbWVzcGFjZScpO1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG1pbGVzdG9uZUZpbGVOYW1lID0gZ2V0RmlsZU5hbWUobWlsZXN0b25lUGF0aCk7XHJcblxyXG4gICAgICAgIGxldCBuYW1lc3BhY2VTZWdtZW50cyA9IFtdO1xyXG4gICAgICAgIGxldCBzZWdtZW50UGF0aCA9IGxvY2F0aW9uO1xyXG4gICAgICAgIGxldCBzZWdtZW50ID0gZ2V0RmlsZU5hbWVBbmRFeHRlbnNpb24oc2VnbWVudFBhdGgpO1xyXG4gICAgICAgXHJcbiAgICAgICAgd2hpbGUgKF9mb2xkZXJzLmdldCh0aGlzKS5zZWFyY2hGb2xkZXJSZWdleChzZWdtZW50UGF0aCwgbWlsZXN0b25lUmVnZXhwKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgbmFtZXNwYWNlU2VnbWVudHMucHVzaChzZWdtZW50KTtcclxuICAgICAgICAgICAgc2VnbWVudFBhdGggPSBnZXRGaWxlRGlyKHNlZ21lbnRQYXRoKTtcclxuICAgICAgICAgICAgc2VnbWVudCA9IGdldEZpbGVOYW1lKHNlZ21lbnRQYXRoKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIG5hbWVzcGFjZVNlZ21lbnRzID0gbmFtZXNwYWNlU2VnbWVudHMucmV2ZXJzZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBuYW1lc3BhY2UgPSBtaWxlc3RvbmVGaWxlTmFtZTtcclxuICAgICAgICBuYW1lc3BhY2VTZWdtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBuYW1lc3BhY2UgKz0gJy4nICsgZWxlbWVudDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5hbWVzcGFjZTtcclxuICAgIH1cclxufSJdfQ==