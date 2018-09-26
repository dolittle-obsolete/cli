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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var inquirer = require('inquirer');

var _folders = new WeakMap();
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
                    this._logger.warning('Could not discover the namespace');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvSW5xdWlyZXJNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImlucXVpcmVyIiwicmVxdWlyZSIsIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9maWxlU3lzdGVtIiwiSW5xdWlyZXJNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwiYXJ0aWZhY3ROYW1lIiwibG9jYXRpb24iLCJib2lsZXJQbGF0ZSIsImFydGlmYWN0VGVtcGxhdGUiLCJjb250ZXh0IiwibmFtZSIsImRlcGVuZGVuY2llcyIsInVuZGVmaW5lZCIsImZvckVhY2giLCJwdXNoIiwiZGVwZW5kZW5jeSIsInF1ZXN0aW9ucyIsInR5cGUiLCJnZW5lcmF0ZURlcGVuZGVuY3kiLCJnZW5lcmF0ZVByb21wdCIsInByb21wdCIsInRoZW4iLCJhbnN3ZXJzIiwiZmllbGQiLCJfIiwiZGlzY292ZXIiLCJkaXNjb3ZlclR5cGUiLCJkaXNjb3Zlck5hbWVzcGFjZSIsImRpc2NvdmVyTXVsdGlwbGVGaWxlcyIsIm5hbWVzcGFjZSIsImNyZWF0ZU5hbWVzcGFjZSIsImZpbGVQYXRocyIsImZyb21Gb2xkZXJzIiwiZ2V0Iiwic2VhcmNoUmVjdXJzaXZlUmVnZXgiLCJSZWdFeHAiLCJmaWxlTWF0Y2giLCJnZXROZWFyZXN0RGlyc1NlYXJjaGluZ1Vwd2FyZHMiLCJmb2xkZXIiLCJyZXN1bHRzIiwiY29udGVudE1hdGNoIiwiY29udGVudCIsInJlYWRGaWxlU3luYyIsImZpbGVQYXRoIiwidGhlTWF0Y2giLCJtYXRjaCIsImxlbmd0aCIsIndpdGhOYW1lc3BhY2UiLCJnbG9iYWwiLCJnZXRGaWxlRGlyUGF0aCIsImNob2ljZSIsInZhbHVlIiwicHJvbXB0VHlwZSIsImdlbmVyYXRlSW5wdXRQcm9tcHQiLCJnZW5lcmF0ZUxpc3RQcm9tcHQiLCJnZW5lcmF0ZUNoZWNrYm94UHJvbXB0IiwibWVzc2FnZSIsImFjdHVhbENob2ljZXMiLCJjaG9pY2VzIiwiY3VzdG9tSW5wdXQiLCJwYWdlc2l6ZSIsIndoZW4iLCJtaWxlc3RvbmVQYXRoIiwiZ2V0TmVhcmVzdEZpbGVTZWFyY2hpbmdVcHdhcmRzIiwibWlsZXN0b25lIiwibWlsZXN0b25lRmlsZU5hbWUiLCJnZXRGaWxlTmFtZSIsIm1pbGVzdG9uZUZpbGVEaXIiLCJuYW1lc3BhY2VTZWdtZW50cyIsInNlZ21lbnRQYXRoIiwic2VnbWVudCIsImdldEZpbGVOYW1lQW5kRXh0ZW5zaW9uIiwid2FybmluZyIsImdldEZpbGVEaXIiLCJyZXZlcnNlIiwiZWxlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQVBBOzs7O0FBU0EsSUFBTUEsV0FBV0MsUUFBUSxVQUFSLENBQWpCOztBQUVBLElBQU1DLFdBQVcsSUFBSUMsT0FBSixFQUFqQjtBQUNBLElBQU1DLGNBQWMsSUFBSUQsT0FBSixFQUFwQjs7SUFFYUUsZSxXQUFBQSxlO0FBQ1Q7Ozs7OztBQU1BLDZCQUFZQyxPQUFaLEVBQXFCQyxVQUFyQixFQUFpQ0MsTUFBakMsRUFBeUM7QUFBQTs7QUFDckNOLGlCQUFTTyxHQUFULENBQWEsSUFBYixFQUFtQkgsT0FBbkI7QUFDQUYsb0JBQVlLLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JGLFVBQXRCO0FBQ0EsYUFBS0csT0FBTCxHQUFlRixNQUFmO0FBRUg7QUFDRDs7Ozs7Ozs7Ozs7OzttQ0FTV0csWSxFQUFjQyxRLEVBQVVDLFcsRUFBYUMsZ0IsRUFBa0I7QUFBQTs7QUFDOUQsZ0JBQUlDLFVBQVUsRUFBRUMsTUFBTUwsWUFBUixFQUFkO0FBQ0EsZ0JBQUlNLGVBQWUsRUFBbkI7QUFDQSxnQkFBSUosWUFBWUksWUFBWixLQUE2QkMsU0FBakMsRUFDSUwsWUFBWUksWUFBWixDQUF5QkUsT0FBekIsQ0FBaUM7QUFBQSx1QkFBY0YsYUFBYUcsSUFBYixDQUFrQkMsVUFBbEIsQ0FBZDtBQUFBLGFBQWpDO0FBQ0osZ0JBQUtQ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Q0FBVjtBQUNIO0FBQ0RELGdDQUFvQkEsa0JBQWtCTSxPQUFsQixFQUFwQjs7QUFFQSxnQkFBSTdDLFlBQVlvQyxpQkFBaEI7QUFDQUcsOEJBQWtCdkQsT0FBbEIsQ0FBMEIsbUJBQVc7QUFDakNnQiw2QkFBYSxNQUFNOEMsT0FBbkI7QUFDSCxhQUZEOztBQUlBLG1CQUFPOUMsU0FBUDtBQUNIIiwiZmlsZSI6IklucXVpcmVyTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCB7wqBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCc7XG5cbmNvbnN0IGlucXVpcmVyID0gcmVxdWlyZSgnaW5xdWlyZXInKTtcblxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5leHBvcnQgY2xhc3MgSW5xdWlyZXJNYW5hZ2VyIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7SW5xdWlyZXJNYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVycyBcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZvbGRlcnMsIGZpbGVTeXN0ZW0sIGxvZ2dlcikge1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICBcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBhbmQgZmlsbHMgdGhlIGNvbnRleHQgdXNlZCBmb3IgdGVtcGxhdGluZ1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhcnRpZmFjdE5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlfSBib2lsZXJQbGF0ZSBcbiAgICAgKiBAcGFyYW0ge2FueX0gYXJ0aWZhY3RUZW1wbGF0ZVxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgcHJvbXB0VXNlcihhcnRpZmFjdE5hbWUsIGxvY2F0aW9uLCBib2lsZXJQbGF0ZSwgYXJ0aWZhY3RUZW1wbGF0ZSkge1xuICAgICAgICBsZXQgY29udGV4dCA9IHsgbmFtZTogYXJ0aWZhY3ROYW1lIH07XG4gICAgICAgIGxldCBkZXBlbmRlbmNpZXMgPSBbXTtcbiAgICAgICAgaWYgKGJvaWxlclBsYXRlLmRlcGVuZGVuY2llcyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgYm9pbGVyUGxhdGUuZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwZW5kZW5jeSA9PiBkZXBlbmRlbmNpZXMucHVzaChkZXBlbmRlbmN5KSk7XG4gICAgICAgIGlmICggYXJ0aWZhY3RUZW1wbGF0ZS5kZXBlbmRlbmNpZXMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGFydGlmYWN0VGVtcGxhdGUuZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwZW5kZW5jeSA9PiBkZXBlbmRlbmNpZXMucHVzaChkZXBlbmRlbmN5KSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgcXVlc3Rpb25zID0gW107XG5cbiAgICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwZW5kZW5jeSA9PiB7XG4gICAgICAgICAgICBpZiAoZGVwZW5kZW5jeS50eXBlICE9PSAncHJvbXB0JylcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhpcy5nZW5lcmF0ZURlcGVuZGVuY3koZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwZW5kZW5jeSA9PiB7XG4gICAgICAgICAgICBpZiAoZGVwZW5kZW5jeS50eXBlID09PSAncHJvbXB0JylcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCguLi50aGlzLmdlbmVyYXRlUHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGlucXVpcmVyLnByb21wdChxdWVzdGlvbnMpXG4gICAgICAgICAgICAudGhlbihhbnN3ZXJzID0+IHtcbiAgICAgICAgICAgICAgICBhbnN3ZXJzLm5hbWUgPSBjb250ZXh0Lm5hbWU7XG4gICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gXy5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy50eXBlICE9PSAncHJvbXB0JyAmJiBhbnN3ZXJzW2ZpZWxkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXJzW2ZpZWxkXSA9IGNvbnRleHRbZmllbGRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2VycztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cbiAgICAgKiBAcGFyYW0ge2FueX0gY29udGV4dCBcbiAgICAgKi9cbiAgICBnZW5lcmF0ZURlcGVuZGVuY3koZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRlcGVuZGVuY3kudHlwZSA9PT0gJ2Rpc2NvdmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzY292ZXIoZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgYENhbm5vdCBoYW5kbGUgZGVwZW5kZW5jeSB0eXBlICcke2RlcGVuZGVuY3kudHlwZX0nYFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gXG4gICAgICogQHBhcmFtIHthbnl9IGNvbnRleHQgXG4gICAgICovXG4gICAgZGlzY292ZXIoZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRlcGVuZGVuY3kuZGlzY292ZXJUeXBlID09PSAnbmFtZXNwYWNlJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzY292ZXJOYW1lc3BhY2UoZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmIChkZXBlbmRlbmN5LmRpc2NvdmVyVHlwZSA9PT0gJ211bHRpcGxlRmlsZXMnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNjb3Zlck11bHRpcGxlRmlsZXMoZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgYENhbm5vdCBoYW5kbGUgZGlzY292ZXJ5VHlwZSAnJHtkZXBlbmRlbmN5LmRpc2NvdmVyVHlwZX0nYFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBcbiAgICAgKiBAcGFyYW0ge2FueX0gY29udGV4dCBcbiAgICAgKi9cbiAgICBkaXNjb3Zlck5hbWVzcGFjZShkZXBlbmRlbmN5LCBsb2NhdGlvbiwgY29udGV4dCkge1xuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSB0aGlzLmNyZWF0ZU5hbWVzcGFjZShkZXBlbmRlbmN5LCBsb2NhdGlvbik7XG4gICAgICAgIGNvbnRleHRbZGVwZW5kZW5jeS5uYW1lXSA9IG5hbWVzcGFjZTtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7YW55fSBkZXBlbmRlbmN5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uXG4gICAgICogQHBhcmFtIHthbnl9IGNvbnRleHQgXG4gICAgICovXG4gICAgZGlzY292ZXJNdWx0aXBsZUZpbGVzKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgZmlsZVBhdGhzID0gW107XG4gICAgICAgIGlmIChkZXBlbmRlbmN5LmZyb21Gb2xkZXJzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBmaWxlUGF0aHMgPSBfZm9sZGVycy5nZXQodGhpcykuc2VhcmNoUmVjdXJzaXZlUmVnZXgobG9jYXRpb24sIG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5maWxlTWF0Y2gpKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldE5lYXJlc3REaXJzU2VhcmNoaW5nVXB3YXJkcyhsb2NhdGlvbiwgbmV3IFJlZ0V4cChkZXBlbmRlbmN5LmZyb21Gb2xkZXJzKSk7XG4gICAgICAgICAgICBmb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IGZpbGVQYXRocy5wdXNoKC4uLl9mb2xkZXJzLmdldCh0aGlzKS5zZWFyY2hSZWN1cnNpdmVSZWdleChmb2xkZXIsIG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5maWxlTWF0Y2gpKSkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHRzID0gW107XG4gICAgICAgIGlmIChkZXBlbmRlbmN5LmNvbnRlbnRNYXRjaCA9PT0gdW5kZWZpbmVkIHx8IGRlcGVuZGVuY3kuY29udGVudE1hdGNoID09PSAnJykgeyBcbiAgICAgICAgICAgIHJlc3VsdHMgPSBmaWxlUGF0aHM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmaWxlUGF0aHMuZm9yRWFjaChmaWxlUGF0aCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmOCcpO1xuICAgICAgICAgICAgICAgIGxldCB0aGVNYXRjaCA9IGNvbnRlbnQubWF0Y2gobmV3IFJlZ0V4cChkZXBlbmRlbmN5LmNvbnRlbnRNYXRjaCkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGVNYXRjaCAhPT0gbnVsbCAmJiB0aGVNYXRjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lc3BhY2UgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3kud2l0aE5hbWVzcGFjZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZSA9IHRoaXMuY3JlYXRlTmFtZXNwYWNlKGRlcGVuZGVuY3ksIGdsb2JhbC5nZXRGaWxlRGlyUGF0aChmaWxlUGF0aCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaG9pY2UgPSBkZXBlbmRlbmN5LndpdGhOYW1lc3BhY2U/ICB7bmFtZTogbmFtZXNwYWNlICsgJy4nICsgdGhlTWF0Y2hbMV0sIHZhbHVlOiB0aGVNYXRjaFsxXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDoge25hbWU6IHRoZU1hdGNoWzFdLCB2YWx1ZTogdGhlTWF0Y2hbMV19O1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goY2hvaWNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0W2RlcGVuZGVuY3kubmFtZV0gPSByZXN1bHRzO1xuICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3lcbiAgICAgKiBAcGFyYW0ge2FueX0gY29udGV4dFxuICAgICAqIEByZXR1cm5zIHthbnl9IHF1ZXN0aW9uXG4gICAgICovXG4gICAgZ2VuZXJhdGVQcm9tcHQoZGVwZW5kZW5jeSwgY29udGV4dCkge1xuICAgICAgICBpZiAoZGVwZW5kZW5jeS5wcm9tcHRUeXBlID09PSAnaW5wdXQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUlucHV0UHJvbXB0KGRlcGVuZGVuY3kpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlcGVuZGVuY3kucHJvbXB0VHlwZSA9PT0gJ3Jhd2xpc3QnIHx8IGRlcGVuZGVuY3kucHJvbXB0VHlwZSA9PT0gJ2xpc3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUxpc3RQcm9tcHQoZGVwZW5kZW5jeSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVwZW5kZW5jeS5wcm9tcHRUeXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUNoZWNrYm94UHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aHJvdyBgQ2Fubm90IGhhbmRsZSBwcm9tcHRUeXBlICcke2RlcGVuZGVuY3kucHJvbXB0VHlwZX0nYFxuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGFuIGlucHV0IHByb21wdFxuICAgICAqIEBwYXJhbSB7YW55fSBkZXBlbmRlbmN5XG4gICAgICovXG4gICAgZ2VuZXJhdGVJbnB1dFByb21wdChkZXBlbmRlbmN5KSB7XG4gICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgIG5hbWU6IGRlcGVuZGVuY3kubmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGRlcGVuZGVuY3kubWVzc2FnZVxuICAgICAgICB9XTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgYSBsaXN0IHByb21wdFxuICAgICAqIEBwYXJhbSB7YW55fSBkZXBlbmRlbmN5XG4gICAgICogQHBhcmFtIHthbnl9IGNvbnRleHQgXG4gICAgICovXG4gICAgZ2VuZXJhdGVMaXN0UHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpIHtcbiAgICAgICAgbGV0IGFjdHVhbENob2ljZXMgPSBjb250ZXh0W2RlcGVuZGVuY3kuY2hvaWNlc10gfHwgZGVwZW5kZW5jeS5jaG9pY2VzO1xuICAgICAgICBpZiAoISBkZXBlbmRlbmN5LmN1c3RvbUlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZGVwZW5kZW5jeS5wcm9tcHRUeXBlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRlcGVuZGVuY3kubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlczogYWN0dWFsQ2hvaWNlcyxcbiAgICAgICAgICAgICAgICAgICAgcGFnZXNpemU6IGRlcGVuZGVuY3kucGFnZXNpemUgfHwgMTBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWN0dWFsQ2hvaWNlcy5wdXNoKHtuYW1lOiBkZXBlbmRlbmN5LmN1c3RvbUlucHV0LCB2YWx1ZTogZGVwZW5kZW5jeS5jdXN0b21JbnB1dH0pO1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGRlcGVuZGVuY3kucHJvbXB0VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZXBlbmRlbmN5Lm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM6IGFjdHVhbENob2ljZXMsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzaXplOiBkZXBlbmRlbmN5LnBhZ2VzaXplIHx8IDEwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGRlcGVuZGVuY3kubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5jdXN0b21JbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgd2hlbjogZnVuY3Rpb24oYW5zd2Vycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcnNbZGVwZW5kZW5jeS5uYW1lXSA9PT0gZGVwZW5kZW5jeS5jdXN0b21JbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuZXJhdGVDaGVja2JveFByb21wdChkZXBlbmRlbmN5LCBjb250ZXh0KSB7XG4gICAgICAgIGxldCBhY3R1YWxDaG9pY2VzID0gY29udGV4dFtkZXBlbmRlbmN5LmNob2ljZXNdIHx8IGRlcGVuZGVuY3kuY2hvaWNlcztcbiAgICAgICAgaWYgKCEgZGVwZW5kZW5jeS5jdXN0b21JbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGRlcGVuZGVuY3kubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzOiBhY3R1YWxDaG9pY2VzLFxuICAgICAgICAgICAgICAgICAgICBwYWdlc2l6ZTogZGVwZW5kZW5jeS5wYWdlc2l6ZSB8fCAxMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhY3R1YWxDaG9pY2VzLnB1c2goe25hbWU6IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXQsIHZhbHVlOiBkZXBlbmRlbmN5LmN1c3RvbUlucHV0fSk7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZXBlbmRlbmN5Lm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM6IGFjdHVhbENob2ljZXMsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzaXplOiBkZXBlbmRlbmN5LnBhZ2VzaXplIHx8IDEwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGRlcGVuZGVuY3kubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5jdXN0b21JbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgd2hlbjogZnVuY3Rpb24oYW5zd2Vycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcnNbZGVwZW5kZW5jeS5uYW1lXSA9PT0gZGVwZW5kZW5jeS5jdXN0b21JbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0aGUgbmFtZXNwYWNlXG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3kgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gdGhlIG5hbWVzcGFjZSBcbiAgICAgKi9cbiAgICBjcmVhdGVOYW1lc3BhY2UoZGVwZW5kZW5jeSwgbG9jYXRpb24pIHtcbiAgICAgICAgY29uc3QgbWlsZXN0b25lUGF0aCA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXROZWFyZXN0RmlsZVNlYXJjaGluZ1Vwd2FyZHMobG9jYXRpb24sIG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5taWxlc3RvbmUpKTtcbiAgICAgICAgbGV0IG1pbGVzdG9uZUZpbGVOYW1lID0gZ2xvYmFsLmdldEZpbGVOYW1lKG1pbGVzdG9uZVBhdGgpO1xuICAgICAgICBsZXQgbWlsZXN0b25lRmlsZURpciA9IGdsb2JhbC5nZXRGaWxlRGlyUGF0aChtaWxlc3RvbmVQYXRoKVxuXG4gICAgICAgIGxldCBuYW1lc3BhY2VTZWdtZW50cyA9IFtdO1xuICAgICAgICBsZXQgc2VnbWVudFBhdGggPSBsb2NhdGlvbjtcbiAgICAgICAgbGV0IHNlZ21lbnQgPSBnbG9iYWwuZ2V0RmlsZU5hbWVBbmRFeHRlbnNpb24oc2VnbWVudFBhdGgpO1xuXG4gICAgICAgIHdoaWxlIChzZWdtZW50UGF0aCAhPSBtaWxlc3RvbmVGaWxlRGlyKSB7XG4gICAgICAgICAgICBpZiAoc2VnbWVudCA9PT0gJycgfHwgc2VnbWVudFBhdGggPT09ICcvJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci53YXJuaW5nKCdDb3VsZCBub3QgZGlzY292ZXIgdGhlIG5hbWVzcGFjZScpO1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hbWVzcGFjZVNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG4gICAgICAgICAgICBzZWdtZW50UGF0aCA9IGdsb2JhbC5nZXRGaWxlRGlyKHNlZ21lbnRQYXRoKTtcbiAgICAgICAgICAgIHNlZ21lbnQgPSBnbG9iYWwuZ2V0RmlsZU5hbWUoc2VnbWVudFBhdGgpO1xuICAgICAgICB9IFxuICAgICAgICBuYW1lc3BhY2VTZWdtZW50cyA9IG5hbWVzcGFjZVNlZ21lbnRzLnJldmVyc2UoKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBuYW1lc3BhY2UgPSBtaWxlc3RvbmVGaWxlTmFtZTtcbiAgICAgICAgbmFtZXNwYWNlU2VnbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIG5hbWVzcGFjZSArPSAnLicgKyBlbGVtZW50O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmFtZXNwYWNlO1xuICAgIH1cbn0iXX0=