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
                console.log('filePaths: ', filePaths);
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
                        if (dependency.withNamespace) namespace = _this2.createNamespace(dependency, location);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvSW5xdWlyZXJNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImlucXVpcmVyIiwicmVxdWlyZSIsIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9maWxlU3lzdGVtIiwiSW5xdWlyZXJNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwiYXJ0aWZhY3ROYW1lIiwibG9jYXRpb24iLCJib2lsZXJQbGF0ZSIsImFydGlmYWN0VGVtcGxhdGUiLCJjb250ZXh0IiwibmFtZSIsImRlcGVuZGVuY2llcyIsInVuZGVmaW5lZCIsImZvckVhY2giLCJwdXNoIiwiZGVwZW5kZW5jeSIsInF1ZXN0aW9ucyIsInR5cGUiLCJnZW5lcmF0ZURlcGVuZGVuY3kiLCJnZW5lcmF0ZVByb21wdCIsInByb21wdCIsInRoZW4iLCJhbnN3ZXJzIiwiZmllbGQiLCJfIiwiZGlzY292ZXIiLCJkaXNjb3ZlclR5cGUiLCJkaXNjb3Zlck5hbWVzcGFjZSIsImRpc2NvdmVyTXVsdGlwbGVGaWxlcyIsIm5hbWVzcGFjZSIsImNyZWF0ZU5hbWVzcGFjZSIsImZpbGVQYXRocyIsImZyb21Gb2xkZXJzIiwiZ2V0Iiwic2VhcmNoUmVjdXJzaXZlUmVnZXgiLCJSZWdFeHAiLCJmaWxlTWF0Y2giLCJnZXROZWFyZXN0RGlyc1NlYXJjaGluZ1Vwd2FyZHMiLCJmb2xkZXIiLCJjb25zb2xlIiwibG9nIiwicmVzdWx0cyIsImNvbnRlbnRNYXRjaCIsImNvbnRlbnQiLCJyZWFkRmlsZVN5bmMiLCJmaWxlUGF0aCIsInRoZU1hdGNoIiwibWF0Y2giLCJsZW5ndGgiLCJ3aXRoTmFtZXNwYWNlIiwiY2hvaWNlIiwidmFsdWUiLCJwcm9tcHRUeXBlIiwiZ2VuZXJhdGVJbnB1dFByb21wdCIsImdlbmVyYXRlTGlzdFByb21wdCIsImdlbmVyYXRlQ2hlY2tib3hQcm9tcHQiLCJtZXNzYWdlIiwiYWN0dWFsQ2hvaWNlcyIsImNob2ljZXMiLCJjdXN0b21JbnB1dCIsInBhZ2VzaXplIiwid2hlbiIsIm1pbGVzdG9uZVBhdGgiLCJnZXROZWFyZXN0RmlsZVNlYXJjaGluZ1Vwd2FyZHMiLCJtaWxlc3RvbmUiLCJtaWxlc3RvbmVGaWxlTmFtZSIsImdsb2JhbCIsImdldEZpbGVOYW1lIiwibWlsZXN0b25lRmlsZURpciIsImdldEZpbGVEaXJQYXRoIiwibmFtZXNwYWNlU2VnbWVudHMiLCJzZWdtZW50UGF0aCIsInNlZ21lbnQiLCJnZXRGaWxlTmFtZUFuZEV4dGVuc2lvbiIsIndhcm5pbmciLCJnZXRGaWxlRGlyIiwicmV2ZXJzZSIsImVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFQQTs7OztBQVNBLElBQU1BLFdBQVdDLFFBQVEsVUFBUixDQUFqQjs7QUFFQSxJQUFNQyxXQUFXLElBQUlDLE9BQUosRUFBakI7QUFDQSxJQUFNQyxjQUFjLElBQUlELE9BQUosRUFBcEI7O0lBRWFFLGUsV0FBQUEsZTtBQUNUOzs7Ozs7QUFNQSw2QkFBWUMsT0FBWixFQUFxQkMsVUFBckIsRUFBaUNDLE1BQWpDLEVBQXlDO0FBQUE7O0FBQ3JDTixpQkFBU08sR0FBVCxDQUFhLElBQWIsRUFBbUJILE9BQW5CO0FBQ0FGLG9CQUFZSyxHQUFaLENBQWdCLElBQWhCLEVBQXNCRixVQUF0QjtBQUNBLGFBQUtHLE9BQUwsR0FBZUYsTUFBZjtBQUVIO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7bUNBU1dHLFksRUFBY0MsUSxFQUFVQyxXLEVBQWFDLGdCLEVBQWtCO0FBQUE7O0FBQzlELGdCQUFJQyxVQUFVLEVBQUVDLE1BQU1MLFlBQVIsRUFBZDtBQUNBLGdCQUFJTSxlQUFlLEVBQW5CO0FBQ0EsZ0JBQUlKLFlBQVlJLFlBQVosS0FBNkJDLFNBQWpDLEVBQ0lMLFlBQVlJLFlBQVosQ0FBeUJFLE9BQXpCLENBQWlDO0FBQUEsdUJBQWNGLGFBQWFHLElBQWIsQ0FBa0JDLFVBQWxCLENBQWQ7QUFBQSxh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QkFBT0MsV0FBUCxDQUFtQkksV0FBbkIsQ0FBVjtBQUNIO0FBQ0RELGdDQUFvQkEsa0JBQWtCTSxPQUFsQixFQUFwQjs7QUFFQSxnQkFBSS9DLFlBQVlvQyxpQkFBaEI7QUFDQUssOEJBQWtCekQsT0FBbEIsQ0FBMEIsbUJBQVc7QUFDakNnQiw2QkFBYSxNQUFNZ0QsT0FBbkI7QUFDSCxhQUZEOztBQUlBLG1CQUFPaEQsU0FBUDtBQUNIIiwiZmlsZSI6IklucXVpcmVyTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCB7wqBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCc7XG5cbmNvbnN0IGlucXVpcmVyID0gcmVxdWlyZSgnaW5xdWlyZXInKTtcblxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5leHBvcnQgY2xhc3MgSW5xdWlyZXJNYW5hZ2VyIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7SW5xdWlyZXJNYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVycyBcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZvbGRlcnMsIGZpbGVTeXN0ZW0sIGxvZ2dlcikge1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICBcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvbXB0cyB0aGUgdXNlciBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBhbmQgZmlsbHMgdGhlIGNvbnRleHQgdXNlZCBmb3IgdGVtcGxhdGluZ1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhcnRpZmFjdE5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlfSBib2lsZXJQbGF0ZSBcbiAgICAgKiBAcGFyYW0ge2FueX0gYXJ0aWZhY3RUZW1wbGF0ZVxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgcHJvbXB0VXNlcihhcnRpZmFjdE5hbWUsIGxvY2F0aW9uLCBib2lsZXJQbGF0ZSwgYXJ0aWZhY3RUZW1wbGF0ZSkge1xuICAgICAgICBsZXQgY29udGV4dCA9IHsgbmFtZTogYXJ0aWZhY3ROYW1lIH07XG4gICAgICAgIGxldCBkZXBlbmRlbmNpZXMgPSBbXTtcbiAgICAgICAgaWYgKGJvaWxlclBsYXRlLmRlcGVuZGVuY2llcyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgYm9pbGVyUGxhdGUuZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwZW5kZW5jeSA9PiBkZXBlbmRlbmNpZXMucHVzaChkZXBlbmRlbmN5KSk7XG4gICAgICAgIGlmICggYXJ0aWZhY3RUZW1wbGF0ZS5kZXBlbmRlbmNpZXMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGFydGlmYWN0VGVtcGxhdGUuZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwZW5kZW5jeSA9PiBkZXBlbmRlbmNpZXMucHVzaChkZXBlbmRlbmN5KSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgcXVlc3Rpb25zID0gW107XG5cbiAgICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwZW5kZW5jeSA9PiB7XG4gICAgICAgICAgICBpZiAoZGVwZW5kZW5jeS50eXBlICE9PSAncHJvbXB0JylcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhpcy5nZW5lcmF0ZURlcGVuZGVuY3koZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2goZGVwZW5kZW5jeSA9PiB7XG4gICAgICAgICAgICBpZiAoZGVwZW5kZW5jeS50eXBlID09PSAncHJvbXB0JylcbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMucHVzaCguLi50aGlzLmdlbmVyYXRlUHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGlucXVpcmVyLnByb21wdChxdWVzdGlvbnMpXG4gICAgICAgICAgICAudGhlbihhbnN3ZXJzID0+IHtcbiAgICAgICAgICAgICAgICBhbnN3ZXJzLm5hbWUgPSBjb250ZXh0Lm5hbWU7XG4gICAgICAgICAgICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gXy5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy50eXBlICE9PSAncHJvbXB0JyAmJiBhbnN3ZXJzW2ZpZWxkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXJzW2ZpZWxkXSA9IGNvbnRleHRbZmllbGRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2VycztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cbiAgICAgKiBAcGFyYW0ge2FueX0gY29udGV4dCBcbiAgICAgKi9cbiAgICBnZW5lcmF0ZURlcGVuZGVuY3koZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRlcGVuZGVuY3kudHlwZSA9PT0gJ2Rpc2NvdmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzY292ZXIoZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgYENhbm5vdCBoYW5kbGUgZGVwZW5kZW5jeSB0eXBlICcke2RlcGVuZGVuY3kudHlwZX0nYFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gXG4gICAgICogQHBhcmFtIHthbnl9IGNvbnRleHQgXG4gICAgICovXG4gICAgZGlzY292ZXIoZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRlcGVuZGVuY3kuZGlzY292ZXJUeXBlID09PSAnbmFtZXNwYWNlJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzY292ZXJOYW1lc3BhY2UoZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpO1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIGlmIChkZXBlbmRlbmN5LmRpc2NvdmVyVHlwZSA9PT0gJ211bHRpcGxlRmlsZXMnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNjb3Zlck11bHRpcGxlRmlsZXMoZGVwZW5kZW5jeSwgbG9jYXRpb24sIGNvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgYENhbm5vdCBoYW5kbGUgZGlzY292ZXJ5VHlwZSAnJHtkZXBlbmRlbmN5LmRpc2NvdmVyVHlwZX0nYFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBcbiAgICAgKiBAcGFyYW0ge2FueX0gY29udGV4dCBcbiAgICAgKi9cbiAgICBkaXNjb3Zlck5hbWVzcGFjZShkZXBlbmRlbmN5LCBsb2NhdGlvbiwgY29udGV4dCkge1xuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSB0aGlzLmNyZWF0ZU5hbWVzcGFjZShkZXBlbmRlbmN5LCBsb2NhdGlvbik7XG4gICAgICAgIGNvbnRleHRbZGVwZW5kZW5jeS5uYW1lXSA9IG5hbWVzcGFjZTtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7YW55fSBkZXBlbmRlbmN5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uXG4gICAgICogQHBhcmFtIHthbnl9IGNvbnRleHQgXG4gICAgICovXG4gICAgZGlzY292ZXJNdWx0aXBsZUZpbGVzKGRlcGVuZGVuY3ksIGxvY2F0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgZmlsZVBhdGhzID0gW107XG4gICAgICAgIGlmIChkZXBlbmRlbmN5LmZyb21Gb2xkZXJzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBmaWxlUGF0aHMgPSBfZm9sZGVycy5nZXQodGhpcykuc2VhcmNoUmVjdXJzaXZlUmVnZXgobG9jYXRpb24sIG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5maWxlTWF0Y2gpKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldE5lYXJlc3REaXJzU2VhcmNoaW5nVXB3YXJkcyhsb2NhdGlvbiwgbmV3IFJlZ0V4cChkZXBlbmRlbmN5LmZyb21Gb2xkZXJzKSk7XG4gICAgICAgICAgICBmb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IGZpbGVQYXRocy5wdXNoKC4uLl9mb2xkZXJzLmdldCh0aGlzKS5zZWFyY2hSZWN1cnNpdmVSZWdleChmb2xkZXIsIG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5maWxlTWF0Y2gpKSkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZpbGVQYXRoczogJywgZmlsZVBhdGhzKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgICBpZiAoZGVwZW5kZW5jeS5jb250ZW50TWF0Y2ggPT09IHVuZGVmaW5lZCB8fCBkZXBlbmRlbmN5LmNvbnRlbnRNYXRjaCA9PT0gJycpIHsgXG4gICAgICAgICAgICByZXN1bHRzID0gZmlsZVBhdGhzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZmlsZVBhdGhzLmZvckVhY2goZmlsZVBhdGggPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcbiAgICAgICAgICAgICAgICBsZXQgdGhlTWF0Y2ggPSBjb250ZW50Lm1hdGNoKG5ldyBSZWdFeHAoZGVwZW5kZW5jeS5jb250ZW50TWF0Y2gpKTtcbiAgICAgICAgICAgICAgICBpZiAodGhlTWF0Y2ggIT09IG51bGwgJiYgdGhlTWF0Y2gubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZXNwYWNlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5LndpdGhOYW1lc3BhY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2UgPSB0aGlzLmNyZWF0ZU5hbWVzcGFjZShkZXBlbmRlbmN5LCBsb2NhdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNob2ljZSA9IGRlcGVuZGVuY3kud2l0aE5hbWVzcGFjZT8gIHtuYW1lOiBuYW1lc3BhY2UgKyAnLicgKyB0aGVNYXRjaFsxXSwgdmFsdWU6IHRoZU1hdGNoWzFdfVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB7bmFtZTogdGhlTWF0Y2hbMV0sIHZhbHVlOiB0aGVNYXRjaFsxXX07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChjaG9pY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHRbZGVwZW5kZW5jeS5uYW1lXSA9IHJlc3VsdHM7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeVxuICAgICAqIEBwYXJhbSB7YW55fSBjb250ZXh0XG4gICAgICogQHJldHVybnMge2FueX0gcXVlc3Rpb25cbiAgICAgKi9cbiAgICBnZW5lcmF0ZVByb21wdChkZXBlbmRlbmN5LCBjb250ZXh0KSB7XG4gICAgICAgIGlmIChkZXBlbmRlbmN5LnByb21wdFR5cGUgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlSW5wdXRQcm9tcHQoZGVwZW5kZW5jeSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVwZW5kZW5jeS5wcm9tcHRUeXBlID09PSAncmF3bGlzdCcgfHwgZGVwZW5kZW5jeS5wcm9tcHRUeXBlID09PSAnbGlzdCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlTGlzdFByb21wdChkZXBlbmRlbmN5LCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXBlbmRlbmN5LnByb21wdFR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlQ2hlY2tib3hQcm9tcHQoZGVwZW5kZW5jeSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRocm93IGBDYW5ub3QgaGFuZGxlIHByb21wdFR5cGUgJyR7ZGVwZW5kZW5jeS5wcm9tcHRUeXBlfSdgXG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgYW4gaW5wdXQgcHJvbXB0XG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3lcbiAgICAgKi9cbiAgICBnZW5lcmF0ZUlucHV0UHJvbXB0KGRlcGVuZGVuY3kpIHtcbiAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5tZXNzYWdlXG4gICAgICAgIH1dO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBhIGxpc3QgcHJvbXB0XG4gICAgICogQHBhcmFtIHthbnl9IGRlcGVuZGVuY3lcbiAgICAgKiBAcGFyYW0ge2FueX0gY29udGV4dCBcbiAgICAgKi9cbiAgICBnZW5lcmF0ZUxpc3RQcm9tcHQoZGVwZW5kZW5jeSwgY29udGV4dCkge1xuICAgICAgICBsZXQgYWN0dWFsQ2hvaWNlcyA9IGNvbnRleHRbZGVwZW5kZW5jeS5jaG9pY2VzXSB8fCBkZXBlbmRlbmN5LmNob2ljZXM7XG4gICAgICAgIGlmICghIGRlcGVuZGVuY3kuY3VzdG9tSW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBkZXBlbmRlbmN5LnByb21wdFR5cGUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGRlcGVuZGVuY3kubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZGVwZW5kZW5jeS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBjaG9pY2VzOiBhY3R1YWxDaG9pY2VzLFxuICAgICAgICAgICAgICAgICAgICBwYWdlc2l6ZTogZGVwZW5kZW5jeS5wYWdlc2l6ZSB8fCAxMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhY3R1YWxDaG9pY2VzLnB1c2goe25hbWU6IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXQsIHZhbHVlOiBkZXBlbmRlbmN5LmN1c3RvbUlucHV0fSk7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZGVwZW5kZW5jeS5wcm9tcHRUeXBlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRlcGVuZGVuY3kubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlczogYWN0dWFsQ2hvaWNlcyxcbiAgICAgICAgICAgICAgICAgICAgcGFnZXNpemU6IGRlcGVuZGVuY3kucGFnZXNpemUgfHwgMTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZXBlbmRlbmN5LmN1c3RvbUlucHV0LFxuICAgICAgICAgICAgICAgICAgICB3aGVuOiBmdW5jdGlvbihhbnN3ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2Vyc1tkZXBlbmRlbmN5Lm5hbWVdID09PSBkZXBlbmRlbmN5LmN1c3RvbUlucHV0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW5lcmF0ZUNoZWNrYm94UHJvbXB0KGRlcGVuZGVuY3ksIGNvbnRleHQpIHtcbiAgICAgICAgbGV0IGFjdHVhbENob2ljZXMgPSBjb250ZXh0W2RlcGVuZGVuY3kuY2hvaWNlc10gfHwgZGVwZW5kZW5jeS5jaG9pY2VzO1xuICAgICAgICBpZiAoISBkZXBlbmRlbmN5LmN1c3RvbUlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZXBlbmRlbmN5Lm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGNob2ljZXM6IGFjdHVhbENob2ljZXMsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzaXplOiBkZXBlbmRlbmN5LnBhZ2VzaXplIHx8IDEwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFjdHVhbENob2ljZXMucHVzaCh7bmFtZTogZGVwZW5kZW5jeS5jdXN0b21JbnB1dCwgdmFsdWU6IGRlcGVuZGVuY3kuY3VzdG9tSW5wdXR9KTtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkZXBlbmRlbmN5Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRlcGVuZGVuY3kubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgY2hvaWNlczogYWN0dWFsQ2hvaWNlcyxcbiAgICAgICAgICAgICAgICAgICAgcGFnZXNpemU6IGRlcGVuZGVuY3kucGFnZXNpemUgfHwgMTBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVwZW5kZW5jeS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkZXBlbmRlbmN5LmN1c3RvbUlucHV0LFxuICAgICAgICAgICAgICAgICAgICB3aGVuOiBmdW5jdGlvbihhbnN3ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2Vyc1tkZXBlbmRlbmN5Lm5hbWVdID09PSBkZXBlbmRlbmN5LmN1c3RvbUlucHV0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBuYW1lc3BhY2VcbiAgICAgKiBAcGFyYW0ge2FueX0gZGVwZW5kZW5jeSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgbmFtZXNwYWNlIFxuICAgICAqL1xuICAgIGNyZWF0ZU5hbWVzcGFjZShkZXBlbmRlbmN5LCBsb2NhdGlvbikge1xuICAgICAgICBjb25zdCBtaWxlc3RvbmVQYXRoID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldE5lYXJlc3RGaWxlU2VhcmNoaW5nVXB3YXJkcyhsb2NhdGlvbiwgbmV3IFJlZ0V4cChkZXBlbmRlbmN5Lm1pbGVzdG9uZSkpO1xuICAgICAgICBsZXQgbWlsZXN0b25lRmlsZU5hbWUgPSBnbG9iYWwuZ2V0RmlsZU5hbWUobWlsZXN0b25lUGF0aCk7XG4gICAgICAgIGxldCBtaWxlc3RvbmVGaWxlRGlyID0gZ2xvYmFsLmdldEZpbGVEaXJQYXRoKG1pbGVzdG9uZVBhdGgpXG5cbiAgICAgICAgbGV0IG5hbWVzcGFjZVNlZ21lbnRzID0gW107XG4gICAgICAgIGxldCBzZWdtZW50UGF0aCA9IGxvY2F0aW9uO1xuICAgICAgICBsZXQgc2VnbWVudCA9IGdsb2JhbC5nZXRGaWxlTmFtZUFuZEV4dGVuc2lvbihzZWdtZW50UGF0aCk7XG5cbiAgICAgICAgd2hpbGUgKHNlZ21lbnRQYXRoICE9IG1pbGVzdG9uZUZpbGVEaXIpIHtcbiAgICAgICAgICAgIGlmIChzZWdtZW50ID09PSAnJyB8fCBzZWdtZW50UGF0aCA9PT0gJy8nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLndhcm5pbmcoJ0NvdWxkIG5vdCBkaXNjb3ZlciB0aGUgbmFtZXNwYWNlJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmFtZXNwYWNlU2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICAgICAgICAgIHNlZ21lbnRQYXRoID0gZ2xvYmFsLmdldEZpbGVEaXIoc2VnbWVudFBhdGgpO1xuICAgICAgICAgICAgc2VnbWVudCA9IGdsb2JhbC5nZXRGaWxlTmFtZShzZWdtZW50UGF0aCk7XG4gICAgICAgIH0gXG4gICAgICAgIG5hbWVzcGFjZVNlZ21lbnRzID0gbmFtZXNwYWNlU2VnbWVudHMucmV2ZXJzZSgpO1xuICAgICAgICBcbiAgICAgICAgbGV0IG5hbWVzcGFjZSA9IG1pbGVzdG9uZUZpbGVOYW1lO1xuICAgICAgICBuYW1lc3BhY2VTZWdtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgbmFtZXNwYWNlICs9ICcuJyArIGVsZW1lbnQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuYW1lc3BhY2U7XG4gICAgfVxufSJdfQ==