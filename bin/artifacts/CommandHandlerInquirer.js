'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CommandHandlerInquirer = undefined;

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

var CommandHandlerInquirer = exports.CommandHandlerInquirer = function () {

    /**
     * Constructor
     * @param {Folders} folders
     * @param {fs} fileSystem
     */
    function CommandHandlerInquirer(folders, fileSystem) {
        (0, _classCallCheck3.default)(this, CommandHandlerInquirer);

        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
    }
    /**
     * Gets the inquirer.js prompt answers based on the language
     * @param {any} flags
     * @returns {Promise<any>} The answers
     */


    (0, _createClass3.default)(CommandHandlerInquirer, [{
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
            var choices = this._findCSharpCommands().map(function (item) {
                return { name: item };
            });

            var questions = [{
                type: 'checkbox',
                message: 'Select commands to handle: ',
                name: 'commandNames',
                choices: choices
            }];

            _cSharpInquirerQuestions2.default.getCSharpQuestions().forEach(function (question) {
                return questions.push(question);
            });

            return inquirer.prompt(questions).then(function (answers) {
                answers.name = name;
                answers.commands = [];
                answers.commandNames.forEach(function (commandName) {
                    return answers.commands.push({
                        commandName: commandName
                    });
                });
                return answers;
            });
        }
        /**
         * Finds and returns the names of the public ICommand classes
         * @returns [string[]]
         */

    }, {
        key: '_findCSharpCommands',
        value: function _findCSharpCommands() {
            var _this = this;

            var filePaths = _folders.get(this).searchRecursive(process.cwd(), '.cs');
            var commands = [];
            filePaths.forEach(function (filePath) {
                var content = _fileSystem.get(_this).readFileSync(filePath, 'utf8');
                var commandNameMatch = content.match(/.*public\s*class\s*(\w*)\s*:\s*ICommand/);
                if (commandNameMatch !== null && commandNameMatch.length > 0) {
                    commands.push(commandNameMatch[1]);
                }
            });
            return commands;
        }
    }]);
    return CommandHandlerInquirer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQ29tbWFuZEhhbmRsZXJJbnF1aXJlci5qcyJdLCJuYW1lcyI6WyJpbnF1aXJlciIsInJlcXVpcmUiLCJfZm9sZGVycyIsIldlYWtNYXAiLCJfZmlsZVN5c3RlbSIsIkNvbW1hbmRIYW5kbGVySW5xdWlyZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsInNldCIsImZsYWdzIiwibGFuZ3VhZ2UiLCJfZ2V0Q1NoYXJwUHJvbXB0IiwibmFtZSIsImNob2ljZXMiLCJfZmluZENTaGFycENvbW1hbmRzIiwibWFwIiwiaXRlbSIsInF1ZXN0aW9ucyIsInR5cGUiLCJtZXNzYWdlIiwiY1NoYXJwSW5xdWlyZXIiLCJnZXRDU2hhcnBRdWVzdGlvbnMiLCJmb3JFYWNoIiwicHVzaCIsInF1ZXN0aW9uIiwicHJvbXB0IiwidGhlbiIsImFuc3dlcnMiLCJjb21tYW5kcyIsImNvbW1hbmROYW1lcyIsImNvbW1hbmROYW1lIiwiZmlsZVBhdGhzIiwiZ2V0Iiwic2VhcmNoUmVjdXJzaXZlIiwicHJvY2VzcyIsImN3ZCIsImNvbnRlbnQiLCJyZWFkRmlsZVN5bmMiLCJmaWxlUGF0aCIsImNvbW1hbmROYW1lTWF0Y2giLCJtYXRjaCIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsV0FBV0MsUUFBUSxVQUFSLENBQWpCLEMsQ0FSQTs7Ozs7O0FBVUEsSUFBTUMsV0FBVyxJQUFJQyxPQUFKLEVBQWpCO0FBQ0EsSUFBTUMsY0FBYyxJQUFJRCxPQUFKLEVBQXBCOztJQUVhRSxzQixXQUFBQSxzQjs7QUFFVDs7Ozs7QUFLQSxvQ0FBWUMsT0FBWixFQUFxQkMsVUFBckIsRUFBaUM7QUFBQTs7QUFDN0JMLGlCQUFTTSxHQUFULENBQWEsSUFBYixFQUFtQkYsT0FBbkI7QUFDQUYsb0JBQVlJLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JELFVBQXRCO0FBQ0g7QUFDRDs7Ozs7Ozs7O21DQUtXRSxLLEVBQU07QUFDYixnQkFBSUEsTUFBTUMsUUFBTixLQUFtQixRQUF2QixFQUFpQztBQUM3Qix1QkFBTyxLQUFLQyxnQkFBTCxDQUFzQkYsTUFBTUcsSUFBNUIsQ0FBUDtBQUNIO0FBQ0o7QUFDRDs7Ozs7Ozt5Q0FJaUJBLEksRUFBTTtBQUNuQixnQkFBSUMsVUFBVSxLQUFLQyxtQkFBTCxHQUEyQkMsR0FBM0IsQ0FBK0IsZ0JBQVE7QUFBQyx1QkFBTyxFQUFDSCxNQUFNSSxJQUFQLEVBQVA7QUFBb0IsYUFBNUQsQ0FBZDs7QUFFQSxnQkFBSUMsWUFBWSxDQUFDO0FBQ1RDLHNCQUFNLFVBREc7QUFFVEMseUJBQVMsNkJBRkE7QUFHVFAsc0JBQU0sY0FIRztBQUlUQyx5QkFBU0E7QUFKQSxhQUFELENBQWhCOztBQVFBTyw4Q0FBZUMsa0JBQWYsR0FBb0NDLE9BQXBDLENBQTRDO0FBQUEsdUJBQVlMLFVBQVVNLElBQVYsQ0FBZUMsUUFBZixDQUFaO0FBQUEsYUFBNUM7O0FBRUEsbUJBQU94QixTQUFTeUIsTUFBVCxDQUFnQlIsU0FBaEIsRUFDRlMsSUFERSxDQUNHLG1CQUFXO0FBQ2JDLHdCQUFRZixJQUFSLEdBQWVBLElBQWY7QUFDQWUsd0JBQVFDLFFBQVIsR0FBbUIsRUFBbkI7QUFDQUQsd0JBQVFFLFlBQVIsQ0FBcUJQLE9BQXJCLENBQTZCO0FBQUEsMkJBQ3pCSyxRQUFRQyxRQUFSLENBQWlCTCxJQUFqQixDQUFzQjtBQUNsQk8scUNBQWFBO0FBREsscUJBQXRCLENBRHlCO0FBQUEsaUJBQTdCO0FBSUEsdUJBQU9ILE9BQVA7QUFDSCxhQVRFLENBQVA7QUFVSDtBQUNEOzs7Ozs7OzhDQUlzQjtBQUFBOztBQUNsQixnQkFBSUksWUFBWTdCLFNBQVM4QixHQUFULENBQWEsSUFBYixFQUFtQkMsZUFBbkIsQ0FBbUNDLFFBQVFDLEdBQVIsRUFBbkMsRUFBa0QsS0FBbEQsQ0FBaEI7QUFDQSxnQkFBSVAsV0FBVyxFQUFmO0FBQ0FHLHNCQUFVVCxPQUFWLENBQWtCLG9CQUFZO0FBQzFCLG9CQUFJYyxVQUFVaEMsWUFBWTRCLEdBQVosQ0FBZ0IsS0FBaEIsRUFBc0JLLFlBQXRCLENBQW1DQyxRQUFuQyxFQUE2QyxNQUE3QyxDQUFkO0FBQ0Esb0JBQU1DLG1CQUFtQkgsUUFBUUksS0FBUixDQUFjLHlDQUFkLENBQXpCO0FBQ0Esb0JBQUlELHFCQUFxQixJQUFyQixJQUE2QkEsaUJBQWlCRSxNQUFqQixHQUEwQixDQUEzRCxFQUE2RDtBQUN6RGIsNkJBQVNMLElBQVQsQ0FBY2dCLGlCQUFpQixDQUFqQixDQUFkO0FBQ0g7QUFDSixhQU5EO0FBT0EsbUJBQU9YLFFBQVA7QUFDSCIsImZpbGUiOiJDb21tYW5kSGFuZGxlcklucXVpcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBjU2hhcnBJbnF1aXJlciBmcm9tICcuL2NTaGFycElucXVpcmVyUXVlc3Rpb25zJztcblxuY29uc3QgaW5xdWlyZXIgPSByZXF1aXJlKCdpbnF1aXJlcicpO1xuXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBjbGFzcyBDb21tYW5kSGFuZGxlcklucXVpcmVyIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZvbGRlcnMsIGZpbGVTeXN0ZW0pIHtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGlucXVpcmVyLmpzIHByb21wdCBhbnN3ZXJzIGJhc2VkIG9uIHRoZSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7YW55fSBmbGFnc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFRoZSBhbnN3ZXJzXG4gICAgICovXG4gICAgcHJvbXB0VXNlcihmbGFncyl7XG4gICAgICAgIGlmIChmbGFncy5sYW5ndWFnZSA9PT0gJ2NzaGFycCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRDU2hhcnBQcm9tcHQoZmxhZ3MubmFtZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBDIyBwcm9tcHRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqL1xuICAgIF9nZXRDU2hhcnBQcm9tcHQobmFtZSkge1xuICAgICAgICBsZXQgY2hvaWNlcyA9IHRoaXMuX2ZpbmRDU2hhcnBDb21tYW5kcygpLm1hcChpdGVtID0+IHtyZXR1cm4ge25hbWU6IGl0ZW19fSk7XG5cbiAgICAgICAgbGV0IHF1ZXN0aW9ucyA9IFt7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnU2VsZWN0IGNvbW1hbmRzIHRvIGhhbmRsZTogJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnY29tbWFuZE5hbWVzJyxcbiAgICAgICAgICAgICAgICBjaG9pY2VzOiBjaG9pY2VzXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIFxuICAgICAgICBjU2hhcnBJbnF1aXJlci5nZXRDU2hhcnBRdWVzdGlvbnMoKS5mb3JFYWNoKHF1ZXN0aW9uID0+IHF1ZXN0aW9ucy5wdXNoKHF1ZXN0aW9uKSk7XG5cbiAgICAgICAgcmV0dXJuIGlucXVpcmVyLnByb21wdChxdWVzdGlvbnMpXG4gICAgICAgICAgICAudGhlbihhbnN3ZXJzID0+IHtcbiAgICAgICAgICAgICAgICBhbnN3ZXJzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgIGFuc3dlcnMuY29tbWFuZHMgPSBbXTtcbiAgICAgICAgICAgICAgICBhbnN3ZXJzLmNvbW1hbmROYW1lcy5mb3JFYWNoKGNvbW1hbmROYW1lID0+IFxuICAgICAgICAgICAgICAgICAgICBhbnN3ZXJzLmNvbW1hbmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZE5hbWU6IGNvbW1hbmROYW1lXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2VycztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbmQgcmV0dXJucyB0aGUgbmFtZXMgb2YgdGhlIHB1YmxpYyBJQ29tbWFuZCBjbGFzc2VzXG4gICAgICogQHJldHVybnMgW3N0cmluZ1tdXVxuICAgICAqL1xuICAgIF9maW5kQ1NoYXJwQ29tbWFuZHMoKSB7XG4gICAgICAgIGxldCBmaWxlUGF0aHMgPSBfZm9sZGVycy5nZXQodGhpcykuc2VhcmNoUmVjdXJzaXZlKHByb2Nlc3MuY3dkKCksICcuY3MnKTtcbiAgICAgICAgbGV0IGNvbW1hbmRzID0gW107XG4gICAgICAgIGZpbGVQYXRocy5mb3JFYWNoKGZpbGVQYXRoID0+IHtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmROYW1lTWF0Y2ggPSBjb250ZW50Lm1hdGNoKC8uKnB1YmxpY1xccypjbGFzc1xccyooXFx3KilcXHMqOlxccypJQ29tbWFuZC8pO1xuICAgICAgICAgICAgaWYgKGNvbW1hbmROYW1lTWF0Y2ggIT09IG51bGwgJiYgY29tbWFuZE5hbWVNYXRjaC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBjb21tYW5kcy5wdXNoKGNvbW1hbmROYW1lTWF0Y2hbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvbW1hbmRzO1xuICAgIH1cbn1cbiJdfQ==