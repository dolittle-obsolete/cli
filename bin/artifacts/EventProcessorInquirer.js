'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventProcessorInquirer = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Folders = require('../Folders');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cSharpInquirerQuestions = require('./cSharpInquirerQuestions');

var _cSharpInquirerQuestions2 = _interopRequireDefault(_cSharpInquirerQuestions);

var _Guid = require('../Guid');

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inquirer = require('inquirer'); /*---------------------------------------------------------------------------------------------
                                     *  Copyright (c) Dolittle. All rights reserved.
                                     *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                     *--------------------------------------------------------------------------------------------*/


var _folders = new WeakMap();
var _fileSystem = new WeakMap();

var eventsFolderRegex = /Events/;

var EventProcessorInquirer = exports.EventProcessorInquirer = function () {

    /**
     * Constructor
     * @param {Folders} folders
     * @param {fs} fileSystem
     */
    function EventProcessorInquirer(folders, fileSystem) {
        (0, _classCallCheck3.default)(this, EventProcessorInquirer);

        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
    }
    /**
     * Gets the inquirer.js prompt answers based on the language
     * @param {any} flags
     * @returns {Promise<any>} The answers
     */


    (0, _createClass3.default)(EventProcessorInquirer, [{
        key: 'promptUser',
        value: function promptUser(flags) {
            if (flags.language === 'csharp') {
                return this._getCSharpPrompt(flags.name);
            }
        }
        /**
         * Gets the C# prompt
         * @param {string} name
         */

    }, {
        key: '_getCSharpPrompt',
        value: function _getCSharpPrompt(name) {

            var choices = [];
            var eventsMap = this._findCSharpEvents();

            eventsMap.forEach(function (value, key) {
                value.forEach(function (eventName) {
                    choices.push({
                        name: key + '.' + eventName,
                        value: eventName
                    });
                });
                choices.push(new inquirer.Separator(''));
            });
            var questions = [{
                type: 'checkbox',
                message: 'Select events: ',
                name: 'eventNames',
                pageSize: 10,
                choices: choices
            }];

            _cSharpInquirerQuestions2.default.getCSharpQuestions().forEach(function (question) {
                return questions.push(question);
            });

            return inquirer.prompt(questions).then(function (answers) {
                answers.name = name;
                answers.events = [];
                answers.imports = [];
                eventsMap.forEach(function (value, key) {
                    answers.imports.push({
                        namespace: key
                    });
                });
                answers.eventNames.forEach(function (eventName) {
                    return answers.events.push({
                        eventName: eventName,
                        eventProcessor: _Guid.Guid.create()
                    });
                });
                return answers;
            });
        }
        /**
         * Finds and returns the names of the public IEvent classes
         * @returns {Map<string, string[]>}
         */

    }, {
        key: '_findCSharpEvents',
        value: function _findCSharpEvents() {
            var _this = this;

            //TODO: Need to find events in a separate folder. Discuss strategies
            /**
             * Thoughts: Go by convention, folders named Events[.something] are where events are made.
             * Find all events and group them by events folder / Module / Feature, give user a checkbox thing where they can pick events.
             */
            var eventsFolders = this._findEventsFolders();
            var eventsMap = new Map();
            eventsFolders.forEach(function (eventFolder) {
                var nearestCsProj = _global2.default.getNearestCsprojFile(eventFolder.path);
                var filePaths = _folders.get(_this).searchRecursive(eventFolder.path, '.cs');

                filePaths.forEach(function (filePath) {
                    var content = _fileSystem.get(_this).readFileSync(filePath, 'utf8');
                    var eventNameMatch = content.match(/.*public\s*class\s*(\w*)\s*:\s*IEvent/);

                    if (eventNameMatch !== null && eventNameMatch.length > 0) {
                        var namespace = _global2.default.createCSharpNamespace(_global2.default.getFileDir(filePath), nearestCsProj);
                        var eventName = eventNameMatch[1];
                        var values = eventsMap.get(namespace) || [];
                        values.push(eventName);
                        eventsMap.set(namespace, values);
                    }
                });
            });

            return eventsMap;
        }
        /**
         * Finds the folders containing events by convention
         * @returns {any[]} The list of Event folders with name and path
         */

    }, {
        key: '_findEventsFolders',
        value: function _findEventsFolders() {
            var _this2 = this;

            var currentPath = process.cwd();
            var lastPathSepIndex = _global2.default.getLastPathSeparatorIndex(currentPath);

            var _loop = function _loop() {
                var results = [];
                var folders = _folders.get(_this2).getFoldersIn(currentPath);
                folders.forEach(function (folder) {
                    var folderName = _global2.default.getFileName(folder);
                    var folderNameMatch = folderName.match(eventsFolderRegex);
                    if (folderNameMatch != null && folderNameMatch.length > 0) results.push({ name: folderName, path: folder });
                });
                if (results.length >= 1) return {
                        v: results
                    };
                currentPath = currentPath.substr(0, lastPathSepIndex);
                lastPathSepIndex = _global2.default.getLastPathSeparatorIndex(currentPath);
            };

            while (lastPathSepIndex != -1 && currentPath != null && currentPath != '') {
                var _ret = _loop();

                if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
            }
            return [];
        }
    }]);
    return EventProcessorInquirer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvRXZlbnRQcm9jZXNzb3JJbnF1aXJlci5qcyJdLCJuYW1lcyI6WyJpbnF1aXJlciIsInJlcXVpcmUiLCJfZm9sZGVycyIsIldlYWtNYXAiLCJfZmlsZVN5c3RlbSIsImV2ZW50c0ZvbGRlclJlZ2V4IiwiRXZlbnRQcm9jZXNzb3JJbnF1aXJlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwic2V0IiwiZmxhZ3MiLCJsYW5ndWFnZSIsIl9nZXRDU2hhcnBQcm9tcHQiLCJuYW1lIiwiY2hvaWNlcyIsImV2ZW50c01hcCIsIl9maW5kQ1NoYXJwRXZlbnRzIiwiZm9yRWFjaCIsInZhbHVlIiwia2V5IiwicHVzaCIsImV2ZW50TmFtZSIsIlNlcGFyYXRvciIsInF1ZXN0aW9ucyIsInR5cGUiLCJtZXNzYWdlIiwicGFnZVNpemUiLCJjU2hhcnBJbnF1aXJlciIsImdldENTaGFycFF1ZXN0aW9ucyIsInF1ZXN0aW9uIiwicHJvbXB0IiwidGhlbiIsImFuc3dlcnMiLCJldmVudHMiLCJpbXBvcnRzIiwibmFtZXNwYWNlIiwiZXZlbnROYW1lcyIsImV2ZW50UHJvY2Vzc29yIiwiR3VpZCIsImNyZWF0ZSIsImV2ZW50c0ZvbGRlcnMiLCJfZmluZEV2ZW50c0ZvbGRlcnMiLCJNYXAiLCJuZWFyZXN0Q3NQcm9qIiwiZ2xvYmFsIiwiZ2V0TmVhcmVzdENzcHJvakZpbGUiLCJldmVudEZvbGRlciIsInBhdGgiLCJmaWxlUGF0aHMiLCJnZXQiLCJzZWFyY2hSZWN1cnNpdmUiLCJjb250ZW50IiwicmVhZEZpbGVTeW5jIiwiZmlsZVBhdGgiLCJldmVudE5hbWVNYXRjaCIsIm1hdGNoIiwibGVuZ3RoIiwiY3JlYXRlQ1NoYXJwTmFtZXNwYWNlIiwiZ2V0RmlsZURpciIsInZhbHVlcyIsImN1cnJlbnRQYXRoIiwicHJvY2VzcyIsImN3ZCIsImxhc3RQYXRoU2VwSW5kZXgiLCJnZXRMYXN0UGF0aFNlcGFyYXRvckluZGV4IiwicmVzdWx0cyIsImdldEZvbGRlcnNJbiIsImZvbGRlck5hbWUiLCJnZXRGaWxlTmFtZSIsImZvbGRlciIsImZvbGRlck5hbWVNYXRjaCIsInN1YnN0ciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsV0FBV0MsUUFBUSxVQUFSLENBQWpCLEMsQ0FWQTs7Ozs7O0FBWUEsSUFBTUMsV0FBVyxJQUFJQyxPQUFKLEVBQWpCO0FBQ0EsSUFBTUMsY0FBYyxJQUFJRCxPQUFKLEVBQXBCOztBQUVBLElBQU1FLG9CQUFvQixRQUExQjs7SUFDYUMsc0IsV0FBQUEsc0I7O0FBRVQ7Ozs7O0FBS0Esb0NBQVlDLE9BQVosRUFBcUJDLFVBQXJCLEVBQWlDO0FBQUE7O0FBQzdCTixpQkFBU08sR0FBVCxDQUFhLElBQWIsRUFBbUJGLE9BQW5CO0FBQ0FILG9CQUFZSyxHQUFaLENBQWdCLElBQWhCLEVBQXNCRCxVQUF0QjtBQUNIO0FBQ0Q7Ozs7Ozs7OzttQ0FLV0UsSyxFQUFNO0FBQ2IsZ0JBQUlBLE1BQU1DLFFBQU4sS0FBbUIsUUFBdkIsRUFBaUM7QUFDN0IsdUJBQU8sS0FBS0MsZ0JBQUwsQ0FBc0JGLE1BQU1HLElBQTVCLENBQVA7QUFDSDtBQUNKO0FBQ0Q7Ozs7Ozs7eUNBSWlCQSxJLEVBQU07O0FBRW5CLGdCQUFJQyxVQUFVLEVBQWQ7QUFDQSxnQkFBSUMsWUFBWSxLQUFLQyxpQkFBTCxFQUFoQjs7QUFFQUQsc0JBQVVFLE9BQVYsQ0FBa0IsVUFBQ0MsS0FBRCxFQUFRQyxHQUFSLEVBQWdCO0FBQzlCRCxzQkFBTUQsT0FBTixDQUFjLHFCQUFhO0FBQ3ZCSCw0QkFBUU0sSUFBUixDQUFjO0FBQ1ZQLDhCQUFNTSxNQUFNLEdBQU4sR0FBWUUsU0FEUjtBQUVWSCwrQkFBT0c7QUFGRyxxQkFBZDtBQUlDLGlCQUxMO0FBTUlQLHdCQUFRTSxJQUFSLENBQWEsSUFBSXBCLFNBQVNzQixTQUFiLENBQXVCLEVBQXZCLENBQWI7QUFDSCxhQVJM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LE1BQW5CLENBQW5CO0FBQ0Esd0JBQU1DLGtCQUFrQkgsV0FBV1osS0FBWCxDQUFpQmxELGlCQUFqQixDQUF4QjtBQUNBLHdCQUFJaUUsbUJBQW1CLElBQW5CLElBQTJCQSxnQkFBZ0JkLE1BQWhCLEdBQXlCLENBQXhELEVBQ0lTLFFBQVE3QyxJQUFSLENBQWEsRUFBQ1AsTUFBTXNELFVBQVAsRUFBbUJwQixNQUFNc0IsTUFBekIsRUFBYjtBQUNQLGlCQUxEO0FBTUEsb0JBQUlKLFFBQVFULE1BQVIsSUFBa0IsQ0FBdEIsRUFDSTtBQUFBLDJCQUFPUztBQUFQO0FBQ0pMLDhCQUFjQSxZQUFZVyxNQUFaLENBQW1CLENBQW5CLEVBQXNCUixnQkFBdEIsQ0FBZDtBQUNBQSxtQ0FBbUJuQixpQkFBT29CLHlCQUFQLENBQWlDSixXQUFqQyxDQUFuQjtBQWpCUjs7QUFJSSxtQkFBT0csb0JBQW9CLENBQUMsQ0FBckIsSUFBMEJILGVBQWUsSUFBekMsSUFBaURBLGVBQWUsRUFBdkUsRUFDQTtBQUFBOztBQUFBO0FBYUM7QUFDRCxtQkFBTyxFQUFQO0FBQ0giLCJmaWxlIjoiRXZlbnRQcm9jZXNzb3JJbnF1aXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgY1NoYXJwSW5xdWlyZXIgZnJvbSAnLi9jU2hhcnBJbnF1aXJlclF1ZXN0aW9ucydcbmltcG9ydCB7IEd1aWQgfSBmcm9tICcuLi9HdWlkJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi4vZ2xvYmFsJztcblxuY29uc3QgaW5xdWlyZXIgPSByZXF1aXJlKCdpbnF1aXJlcicpO1xuXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IGV2ZW50c0ZvbGRlclJlZ2V4ID0gL0V2ZW50cy87XG5leHBvcnQgY2xhc3MgRXZlbnRQcm9jZXNzb3JJbnF1aXJlciB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihmb2xkZXJzLCBmaWxlU3lzdGVtKSB7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpbnF1aXJlci5qcyBwcm9tcHQgYW5zd2VycyBiYXNlZCBvbiB0aGUgbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3NcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBUaGUgYW5zd2Vyc1xuICAgICAqL1xuICAgIHByb21wdFVzZXIoZmxhZ3Mpe1xuICAgICAgICBpZiAoZmxhZ3MubGFuZ3VhZ2UgPT09ICdjc2hhcnAnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q1NoYXJwUHJvbXB0KGZsYWdzLm5hbWUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgQyMgcHJvbXB0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKi9cbiAgICBfZ2V0Q1NoYXJwUHJvbXB0KG5hbWUpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBjaG9pY2VzID0gW107XG4gICAgICAgIGxldCBldmVudHNNYXAgPSB0aGlzLl9maW5kQ1NoYXJwRXZlbnRzKCk7XG4gICAgICAgIFxuICAgICAgICBldmVudHNNYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgICAgIGNob2ljZXMucHVzaCgge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBrZXkgKyAnLicgKyBldmVudE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBldmVudE5hbWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBjaG9pY2VzLnB1c2gobmV3IGlucXVpcmVyLlNlcGFyYXRvcignJykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGxldCBxdWVzdGlvbnMgPSBbe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1NlbGVjdCBldmVudHM6ICcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ2V2ZW50TmFtZXMnLFxuICAgICAgICAgICAgICAgIHBhZ2VTaXplOiAxMCxcbiAgICAgICAgICAgICAgICBjaG9pY2VzOiBjaG9pY2VzXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIFxuICAgICAgICBjU2hhcnBJbnF1aXJlci5nZXRDU2hhcnBRdWVzdGlvbnMoKS5mb3JFYWNoKHF1ZXN0aW9uID0+IHF1ZXN0aW9ucy5wdXNoKHF1ZXN0aW9uKSk7XG5cbiAgICAgICAgcmV0dXJuIGlucXVpcmVyLnByb21wdChxdWVzdGlvbnMpXG4gICAgICAgICAgICAudGhlbihhbnN3ZXJzID0+IHtcbiAgICAgICAgICAgICAgICBhbnN3ZXJzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgIGFuc3dlcnMuZXZlbnRzID0gW107XG4gICAgICAgICAgICAgICAgYW5zd2Vycy5pbXBvcnRzID0gW107XG4gICAgICAgICAgICAgICAgZXZlbnRzTWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYW5zd2Vycy5pbXBvcnRzLnB1c2goIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZToga2V5XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGFuc3dlcnMuZXZlbnROYW1lcy5mb3JFYWNoKGV2ZW50TmFtZSA9PiBcbiAgICAgICAgICAgICAgICAgICAgYW5zd2Vycy5ldmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6IGV2ZW50TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50UHJvY2Vzc29yOiBHdWlkLmNyZWF0ZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2VycztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbmQgcmV0dXJucyB0aGUgbmFtZXMgb2YgdGhlIHB1YmxpYyBJRXZlbnQgY2xhc3Nlc1xuICAgICAqIEByZXR1cm5zIHtNYXA8c3RyaW5nLCBzdHJpbmdbXT59XG4gICAgICovXG4gICAgX2ZpbmRDU2hhcnBFdmVudHMoKSB7XG4gICAgICAgIC8vVE9ETzogTmVlZCB0byBmaW5kIGV2ZW50cyBpbiBhIHNlcGFyYXRlIGZvbGRlci4gRGlzY3VzcyBzdHJhdGVnaWVzXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaG91Z2h0czogR28gYnkgY29udmVudGlvbiwgZm9sZGVycyBuYW1lZCBFdmVudHNbLnNvbWV0aGluZ10gYXJlIHdoZXJlIGV2ZW50cyBhcmUgbWFkZS5cbiAgICAgICAgICogRmluZCBhbGwgZXZlbnRzIGFuZCBncm91cCB0aGVtIGJ5IGV2ZW50cyBmb2xkZXIgLyBNb2R1bGUgLyBGZWF0dXJlLCBnaXZlIHVzZXIgYSBjaGVja2JveCB0aGluZyB3aGVyZSB0aGV5IGNhbiBwaWNrIGV2ZW50cy5cbiAgICAgICAgICovXG4gICAgICAgIGxldCBldmVudHNGb2xkZXJzID0gdGhpcy5fZmluZEV2ZW50c0ZvbGRlcnMoKTtcbiAgICAgICAgbGV0IGV2ZW50c01hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgZXZlbnRzRm9sZGVycy5mb3JFYWNoKGV2ZW50Rm9sZGVyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5lYXJlc3RDc1Byb2ogPSBnbG9iYWwuZ2V0TmVhcmVzdENzcHJvakZpbGUoZXZlbnRGb2xkZXIucGF0aCk7XG4gICAgICAgICAgICBsZXQgZmlsZVBhdGhzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLnNlYXJjaFJlY3Vyc2l2ZShldmVudEZvbGRlci5wYXRoLCAnLmNzJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZpbGVQYXRocy5mb3JFYWNoKGZpbGVQYXRoID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4Jyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnROYW1lTWF0Y2ggPSBjb250ZW50Lm1hdGNoKC8uKnB1YmxpY1xccypjbGFzc1xccyooXFx3KilcXHMqOlxccypJRXZlbnQvKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnROYW1lTWF0Y2ggIT09IG51bGwgJiYgZXZlbnROYW1lTWF0Y2gubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSBnbG9iYWwuY3JlYXRlQ1NoYXJwTmFtZXNwYWNlKGdsb2JhbC5nZXRGaWxlRGlyKGZpbGVQYXRoKSwgbmVhcmVzdENzUHJvaik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGV2ZW50TmFtZU1hdGNoWzFdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWVzID0gZXZlbnRzTWFwLmdldChuYW1lc3BhY2UpIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChldmVudE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBldmVudHNNYXAuc2V0KG5hbWVzcGFjZSwgdmFsdWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGV2ZW50c01hcDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIGZvbGRlcnMgY29udGFpbmluZyBldmVudHMgYnkgY29udmVudGlvblxuICAgICAqIEByZXR1cm5zIHthbnlbXX0gVGhlIGxpc3Qgb2YgRXZlbnQgZm9sZGVycyB3aXRoIG5hbWUgYW5kIHBhdGhcbiAgICAgKi9cbiAgICBfZmluZEV2ZW50c0ZvbGRlcnMoKVxuICAgIHtcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRoID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgbGV0IGxhc3RQYXRoU2VwSW5kZXggPSBnbG9iYWwuZ2V0TGFzdFBhdGhTZXBhcmF0b3JJbmRleChjdXJyZW50UGF0aCk7XG5cbiAgICAgICAgd2hpbGUgKGxhc3RQYXRoU2VwSW5kZXggIT0gLTEgJiYgY3VycmVudFBhdGggIT0gbnVsbCAmJiBjdXJyZW50UGF0aCAhPSAnJylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgIGxldCBmb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNJbihjdXJyZW50UGF0aCk7XG4gICAgICAgICAgICBmb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb2xkZXJOYW1lID0gZ2xvYmFsLmdldEZpbGVOYW1lKGZvbGRlcik7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9sZGVyTmFtZU1hdGNoID0gZm9sZGVyTmFtZS5tYXRjaChldmVudHNGb2xkZXJSZWdleCk7XG4gICAgICAgICAgICAgICAgaWYgKGZvbGRlck5hbWVNYXRjaCAhPSBudWxsICYmIGZvbGRlck5hbWVNYXRjaC5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goe25hbWU6IGZvbGRlck5hbWUsIHBhdGg6IGZvbGRlcn0pO1xuICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPj0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIGN1cnJlbnRQYXRoID0gY3VycmVudFBhdGguc3Vic3RyKDAsIGxhc3RQYXRoU2VwSW5kZXgpO1xuICAgICAgICAgICAgbGFzdFBhdGhTZXBJbmRleCA9IGdsb2JhbC5nZXRMYXN0UGF0aFNlcGFyYXRvckluZGV4KGN1cnJlbnRQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxufSJdfQ==