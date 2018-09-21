'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QueryforInquirer = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Folders = require('../Folders');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cSharpInquirerQuestions = require('./cSharpInquirerQuestions');

var _cSharpInquirerQuestions2 = _interopRequireDefault(_cSharpInquirerQuestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inquirer = require('inquirer'); /*---------------------------------------------------------------------------------------------
                                     *  Copyright (c) Dolittle. All rights reserved.
                                     *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                     *--------------------------------------------------------------------------------------------*/


var _folders = new WeakMap();
var _fileSystem = new WeakMap();

var QueryforInquirer = exports.QueryforInquirer = function () {

    /**
     * Constructor
     * @param {Folders} folders
     * @param {fs} fileSystem
     */
    function QueryforInquirer(folders, fileSystem) {
        (0, _classCallCheck3.default)(this, QueryforInquirer);

        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
    }
    /**
     * Gets the inquirer.js prompt answers based on the language
     * @param {any} flags
     * @returns {Promise<any>} The answers
     */


    (0, _createClass3.default)(QueryforInquirer, [{
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

            var customReadModel = 'Write read model name';
            var readModelChoices = this._findCSharpReadmodels();
            readModelChoices.push(customReadModel);

            var questions = [{
                type: 'rawlist',
                name: 'readModel',
                message: 'Choose a read model: ',
                choices: readModelChoices
            }, {
                type: 'input',
                name: 'readModel',
                message: 'Write the name of the read model: ',
                when: function when(answers) {
                    return answers.readModel === customReadModel;
                }
            }];

            _cSharpInquirerQuestions2.default.getCSharpQuestions().forEach(function (question) {
                questions.push(question);
            });

            return inquirer.prompt(questions).then(function (answers) {
                answers.name = name;

                return answers;
            });
        }
        /**
         * Finds and returns the names of the public IReadModel classes
         * @returns [string[]]
         */

    }, {
        key: '_findCSharpReadmodels',
        value: function _findCSharpReadmodels() {
            var _this = this;

            var filePaths = _folders.get(this).searchRecursive(process.cwd(), '.cs');
            var readModels = [];
            filePaths.forEach(function (filePath) {
                var content = _fileSystem.get(_this).readFileSync(filePath, 'utf8');
                var readModelNameMatch = content.match(/.*public\s*class\s*(\w*)\s*:\s*IReadModel/);
                if (readModelNameMatch !== null && readModelNameMatch.length > 0) {
                    readModels.push(readModelNameMatch[1]);
                }
            });
            return readModels;
        }
    }]);
    return QueryforInquirer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvUXVlcnlmb3JJbnF1aXJlci5qcyJdLCJuYW1lcyI6WyJpbnF1aXJlciIsInJlcXVpcmUiLCJfZm9sZGVycyIsIldlYWtNYXAiLCJfZmlsZVN5c3RlbSIsIlF1ZXJ5Zm9ySW5xdWlyZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsInNldCIsImZsYWdzIiwibGFuZ3VhZ2UiLCJfZ2V0Q1NoYXJwUHJvbXB0IiwibmFtZSIsImN1c3RvbVJlYWRNb2RlbCIsInJlYWRNb2RlbENob2ljZXMiLCJfZmluZENTaGFycFJlYWRtb2RlbHMiLCJwdXNoIiwicXVlc3Rpb25zIiwidHlwZSIsIm1lc3NhZ2UiLCJjaG9pY2VzIiwid2hlbiIsImFuc3dlcnMiLCJyZWFkTW9kZWwiLCJjU2hhcnBJbnF1aXJlciIsImdldENTaGFycFF1ZXN0aW9ucyIsImZvckVhY2giLCJxdWVzdGlvbiIsInByb21wdCIsInRoZW4iLCJmaWxlUGF0aHMiLCJnZXQiLCJzZWFyY2hSZWN1cnNpdmUiLCJwcm9jZXNzIiwiY3dkIiwicmVhZE1vZGVscyIsImNvbnRlbnQiLCJyZWFkRmlsZVN5bmMiLCJmaWxlUGF0aCIsInJlYWRNb2RlbE5hbWVNYXRjaCIsIm1hdGNoIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxXQUFXQyxRQUFRLFVBQVIsQ0FBakIsQyxDQVJBOzs7Ozs7QUFVQSxJQUFNQyxXQUFXLElBQUlDLE9BQUosRUFBakI7QUFDQSxJQUFNQyxjQUFjLElBQUlELE9BQUosRUFBcEI7O0lBRWFFLGdCLFdBQUFBLGdCOztBQUVUOzs7OztBQUtBLDhCQUFZQyxPQUFaLEVBQXFCQyxVQUFyQixFQUFpQztBQUFBOztBQUM3QkwsaUJBQVNNLEdBQVQsQ0FBYSxJQUFiLEVBQW1CRixPQUFuQjtBQUNBRixvQkFBWUksR0FBWixDQUFnQixJQUFoQixFQUFzQkQsVUFBdEI7QUFDSDtBQUNEOzs7Ozs7Ozs7bUNBS1dFLEssRUFBTTtBQUNiLGdCQUFJQSxNQUFNQyxRQUFOLEtBQW1CLFFBQXZCLEVBQWlDO0FBQzdCLHVCQUFPLEtBQUtDLGdCQUFMLENBQXNCRixNQUFNRyxJQUE1QixDQUFQO0FBQ0g7QUFDSjtBQUNEOzs7Ozs7O3lDQUlpQkEsSSxFQUFNOztBQUVuQixnQkFBTUMsa0JBQWtCLHVCQUF4QjtBQUNBLGdCQUFJQyxtQkFBbUIsS0FBS0MscUJBQUwsRUFBdkI7QUFDQUQsNkJBQWlCRSxJQUFqQixDQUFzQkgsZUFBdEI7O0FBRUEsZ0JBQUlJLFlBQVksQ0FDWjtBQUNJQyxzQkFBTSxTQURWO0FBRUlOLHNCQUFNLFdBRlY7QUFHSU8seUJBQVMsdUJBSGI7QUFJSUMseUJBQVNOO0FBSmIsYUFEWSxFQU9aO0FBQ0lJLHNCQUFNLE9BRFY7QUFFSU4sc0JBQU0sV0FGVjtBQUdJTyx5QkFBUyxvQ0FIYjtBQUlJRSxzQkFBTSxjQUFTQyxPQUFULEVBQWtCO0FBQ3BCLDJCQUFPQSxRQUFRQyxTQUFSLEtBQXNCVixlQUE3QjtBQUNIO0FBTkwsYUFQWSxDQUFoQjs7QUFpQkFXLDhDQUFlQyxrQkFBZixHQUFvQ0MsT0FBcEMsQ0FBNEMsb0JBQVk7QUFDcERULDBCQUFVRCxJQUFWLENBQWVXLFFBQWY7QUFDSCxhQUZEOztBQUlBLG1CQUFPM0IsU0FBUzRCLE1BQVQsQ0FBZ0JYLFNBQWhCLEVBQ0ZZLElBREUsQ0FDRyxtQkFBVztBQUNiUCx3QkFBUVYsSUFBUixHQUFlQSxJQUFmOztBQUVBLHVCQUFPVSxPQUFQO0FBQ0gsYUFMRSxDQUFQO0FBTUg7QUFDRDs7Ozs7OztnREFJd0I7QUFBQTs7QUFDcEIsZ0JBQUlRLFlBQVk1QixTQUFTNkIsR0FBVCxDQUFhLElBQWIsRUFBbUJDLGVBQW5CLENBQW1DQyxRQUFRQyxHQUFSLEVBQW5DLEVBQWtELEtBQWxELENBQWhCO0FBQ0EsZ0JBQUlDLGFBQWEsRUFBakI7QUFDQUwsc0JBQVVKLE9BQVYsQ0FBa0Isb0JBQVk7QUFDMUIsb0JBQUlVLFVBQVVoQyxZQUFZMkIsR0FBWixDQUFnQixLQUFoQixFQUFzQk0sWUFBdEIsQ0FBbUNDLFFBQW5DLEVBQTZDLE1BQTdDLENBQWQ7QUFDQSxvQkFBTUMscUJBQXFCSCxRQUFRSSxLQUFSLENBQWMsMkNBQWQsQ0FBM0I7QUFDQSxvQkFBSUQsdUJBQXVCLElBQXZCLElBQStCQSxtQkFBbUJFLE1BQW5CLEdBQTRCLENBQS9ELEVBQWlFO0FBQzdETiwrQkFBV25CLElBQVgsQ0FBZ0J1QixtQkFBbUIsQ0FBbkIsQ0FBaEI7QUFDSDtBQUNKLGFBTkQ7QUFPQSxtQkFBT0osVUFBUDtBQUNIIiwiZmlsZSI6IlF1ZXJ5Zm9ySW5xdWlyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IGNTaGFycElucXVpcmVyIGZyb20gJy4vY1NoYXJwSW5xdWlyZXJRdWVzdGlvbnMnXG5cbmNvbnN0IGlucXVpcmVyID0gcmVxdWlyZSgnaW5xdWlyZXInKTtcblxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5leHBvcnQgY2xhc3MgUXVlcnlmb3JJbnF1aXJlciB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihmb2xkZXJzLCBmaWxlU3lzdGVtKSB7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpbnF1aXJlci5qcyBwcm9tcHQgYW5zd2VycyBiYXNlZCBvbiB0aGUgbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3NcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBUaGUgYW5zd2Vyc1xuICAgICAqL1xuICAgIHByb21wdFVzZXIoZmxhZ3Mpe1xuICAgICAgICBpZiAoZmxhZ3MubGFuZ3VhZ2UgPT09ICdjc2hhcnAnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q1NoYXJwUHJvbXB0KGZsYWdzLm5hbWUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgQyMgcHJvbXB0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKi9cbiAgICBfZ2V0Q1NoYXJwUHJvbXB0KG5hbWUpIHtcblxuICAgICAgICBjb25zdCBjdXN0b21SZWFkTW9kZWwgPSAnV3JpdGUgcmVhZCBtb2RlbCBuYW1lJztcbiAgICAgICAgbGV0IHJlYWRNb2RlbENob2ljZXMgPSB0aGlzLl9maW5kQ1NoYXJwUmVhZG1vZGVscygpO1xuICAgICAgICByZWFkTW9kZWxDaG9pY2VzLnB1c2goY3VzdG9tUmVhZE1vZGVsKTtcblxuICAgICAgICBsZXQgcXVlc3Rpb25zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyYXdsaXN0JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAncmVhZE1vZGVsJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnQ2hvb3NlIGEgcmVhZCBtb2RlbDogJyxcbiAgICAgICAgICAgICAgICBjaG9pY2VzOiByZWFkTW9kZWxDaG9pY2VzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3JlYWRNb2RlbCcsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1dyaXRlIHRoZSBuYW1lIG9mIHRoZSByZWFkIG1vZGVsOiAnLFxuICAgICAgICAgICAgICAgIHdoZW46IGZ1bmN0aW9uKGFuc3dlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcnMucmVhZE1vZGVsID09PSBjdXN0b21SZWFkTW9kZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuXG4gICAgICAgIGNTaGFycElucXVpcmVyLmdldENTaGFycFF1ZXN0aW9ucygpLmZvckVhY2gocXVlc3Rpb24gPT4ge1xuICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2gocXVlc3Rpb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaW5xdWlyZXIucHJvbXB0KHF1ZXN0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGFuc3dlcnMgPT4ge1xuICAgICAgICAgICAgICAgIGFuc3dlcnMubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcnM7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmluZHMgYW5kIHJldHVybnMgdGhlIG5hbWVzIG9mIHRoZSBwdWJsaWMgSVJlYWRNb2RlbCBjbGFzc2VzXG4gICAgICogQHJldHVybnMgW3N0cmluZ1tdXVxuICAgICAqL1xuICAgIF9maW5kQ1NoYXJwUmVhZG1vZGVscygpIHtcbiAgICAgICAgbGV0IGZpbGVQYXRocyA9IF9mb2xkZXJzLmdldCh0aGlzKS5zZWFyY2hSZWN1cnNpdmUocHJvY2Vzcy5jd2QoKSwgJy5jcycpO1xuICAgICAgICBsZXQgcmVhZE1vZGVscyA9IFtdO1xuICAgICAgICBmaWxlUGF0aHMuZm9yRWFjaChmaWxlUGF0aCA9PiB7XG4gICAgICAgICAgICBsZXQgY29udGVudCA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4Jyk7XG4gICAgICAgICAgICBjb25zdCByZWFkTW9kZWxOYW1lTWF0Y2ggPSBjb250ZW50Lm1hdGNoKC8uKnB1YmxpY1xccypjbGFzc1xccyooXFx3KilcXHMqOlxccypJUmVhZE1vZGVsLyk7XG4gICAgICAgICAgICBpZiAocmVhZE1vZGVsTmFtZU1hdGNoICE9PSBudWxsICYmIHJlYWRNb2RlbE5hbWVNYXRjaC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICByZWFkTW9kZWxzLnB1c2gocmVhZE1vZGVsTmFtZU1hdGNoWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZWFkTW9kZWxzO1xuICAgIH1cbn0iXX0=