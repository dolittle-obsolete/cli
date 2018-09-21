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
            var choices = [];
            var commandsMap = this._findCSharpCommands();

            commandsMap.forEach(function (value, key) {
                value.forEach(function (commandName) {
                    choices.push({
                        name: key + '.' + commandName,
                        value: commandName
                    });
                });
                choices.push(new inquirer.Separator(''));
            });

            var questions = [{
                type: 'checkbox',
                message: 'Select commands to handle: ',
                name: 'commandNames',
                pageSize: 10,
                choices: choices
            }];

            _cSharpInquirerQuestions2.default.getCSharpQuestions().forEach(function (question) {
                return questions.push(question);
            });

            return inquirer.prompt(questions).then(function (answers) {
                answers.name = name;
                answers.commands = [];
                answers.imports = [];
                commandsMap.forEach(function (value, key) {
                    answers.imports.push({
                        namespace: key
                    });
                });
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
         * @returns {Map<string, string[]}
         */

    }, {
        key: '_findCSharpCommands',
        value: function _findCSharpCommands() {
            var _this = this;

            var nearestCsProj = _global2.default.getNearestCsprojFile(process.cwd());
            var filePaths = _folders.get(this).searchRecursive(process.cwd(), '.cs');
            var commandsMap = new Map();

            filePaths.forEach(function (filePath) {
                var content = _fileSystem.get(_this).readFileSync(filePath, 'utf8');
                var commandNameMatch = content.match(/.*public\s*class\s*(\w*)\s*:\s*ICommand/);

                if (commandNameMatch !== null && commandNameMatch.length > 0) {
                    var namespace = _global2.default.createCSharpNamespace(_global2.default.getFileDir(filePath), nearestCsProj);
                    var commandName = commandNameMatch[1];
                    var values = commandsMap.get(namespace) || [];
                    values.push(commandName);
                    commandsMap.set(namespace, values);
                }
            });
            return commandsMap;
        }
    }]);
    return CommandHandlerInquirer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQ29tbWFuZEhhbmRsZXJJbnF1aXJlci5qcyJdLCJuYW1lcyI6WyJpbnF1aXJlciIsInJlcXVpcmUiLCJfZm9sZGVycyIsIldlYWtNYXAiLCJfZmlsZVN5c3RlbSIsIkNvbW1hbmRIYW5kbGVySW5xdWlyZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsInNldCIsImZsYWdzIiwibGFuZ3VhZ2UiLCJfZ2V0Q1NoYXJwUHJvbXB0IiwibmFtZSIsImNob2ljZXMiLCJjb21tYW5kc01hcCIsIl9maW5kQ1NoYXJwQ29tbWFuZHMiLCJmb3JFYWNoIiwidmFsdWUiLCJrZXkiLCJwdXNoIiwiY29tbWFuZE5hbWUiLCJTZXBhcmF0b3IiLCJxdWVzdGlvbnMiLCJ0eXBlIiwibWVzc2FnZSIsInBhZ2VTaXplIiwiY1NoYXJwSW5xdWlyZXIiLCJnZXRDU2hhcnBRdWVzdGlvbnMiLCJxdWVzdGlvbiIsInByb21wdCIsInRoZW4iLCJhbnN3ZXJzIiwiY29tbWFuZHMiLCJpbXBvcnRzIiwibmFtZXNwYWNlIiwiY29tbWFuZE5hbWVzIiwibmVhcmVzdENzUHJvaiIsImdsb2JhbCIsImdldE5lYXJlc3RDc3Byb2pGaWxlIiwicHJvY2VzcyIsImN3ZCIsImZpbGVQYXRocyIsImdldCIsInNlYXJjaFJlY3Vyc2l2ZSIsIk1hcCIsImNvbnRlbnQiLCJyZWFkRmlsZVN5bmMiLCJmaWxlUGF0aCIsImNvbW1hbmROYW1lTWF0Y2giLCJtYXRjaCIsImxlbmd0aCIsImNyZWF0ZUNTaGFycE5hbWVzcGFjZSIsImdldEZpbGVEaXIiLCJ2YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBUEE7Ozs7QUFTQSxJQUFNQSxXQUFXQyxRQUFRLFVBQVIsQ0FBakI7O0FBRUEsSUFBTUMsV0FBVyxJQUFJQyxPQUFKLEVBQWpCO0FBQ0EsSUFBTUMsY0FBYyxJQUFJRCxPQUFKLEVBQXBCOztJ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QUExRCxDQUFsQjtBQUNBLHdCQUFNaEIsY0FBYzRCLGlCQUFpQixDQUFqQixDQUFwQjtBQUNBLHdCQUFJSyxTQUFTdkMsWUFBWTRCLEdBQVosQ0FBZ0JSLFNBQWhCLEtBQThCLEVBQTNDO0FBQ0FtQiwyQkFBT2xDLElBQVAsQ0FBWUMsV0FBWjtBQUNBTixnQ0FBWU4sR0FBWixDQUFnQjBCLFNBQWhCLEVBQTJCbUIsTUFBM0I7QUFDSDtBQUNKLGFBWEQ7QUFZQSxtQkFBT3ZDLFdBQVA7QUFDSCIsImZpbGUiOiJDb21tYW5kSGFuZGxlcklucXVpcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBjU2hhcnBJbnF1aXJlciBmcm9tICcuL2NTaGFycElucXVpcmVyUXVlc3Rpb25zJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi4vZ2xvYmFsJztcblxuY29uc3QgaW5xdWlyZXIgPSByZXF1aXJlKCdpbnF1aXJlcicpO1xuXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBjbGFzcyBDb21tYW5kSGFuZGxlcklucXVpcmVyIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZvbGRlcnMsIGZpbGVTeXN0ZW0pIHtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGlucXVpcmVyLmpzIHByb21wdCBhbnN3ZXJzIGJhc2VkIG9uIHRoZSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7YW55fSBmbGFnc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFRoZSBhbnN3ZXJzXG4gICAgICovXG4gICAgcHJvbXB0VXNlcihmbGFncyl7XG4gICAgICAgIGlmIChmbGFncy5sYW5ndWFnZSA9PT0gJ2NzaGFycCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRDU2hhcnBQcm9tcHQoZmxhZ3MubmFtZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBDIyBwcm9tcHRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqL1xuICAgIF9nZXRDU2hhcnBQcm9tcHQobmFtZSkge1xuICAgICAgICBsZXQgY2hvaWNlcyA9ICBbXTtcbiAgICAgICAgbGV0IGNvbW1hbmRzTWFwID0gdGhpcy5fZmluZENTaGFycENvbW1hbmRzKCk7XG4gICAgICAgIFxuICAgICAgICBjb21tYW5kc01hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGNvbW1hbmROYW1lID0+IHtcbiAgICAgICAgICAgICAgICBjaG9pY2VzLnB1c2goIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZToga2V5ICsgJy4nICsgY29tbWFuZE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjb21tYW5kTmFtZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGNob2ljZXMucHVzaChuZXcgaW5xdWlyZXIuU2VwYXJhdG9yKCcnKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcXVlc3Rpb25zID0gW3tcbiAgICAgICAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdTZWxlY3QgY29tbWFuZHMgdG8gaGFuZGxlOiAnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdjb21tYW5kTmFtZXMnLFxuICAgICAgICAgICAgICAgIHBhZ2VTaXplOiAxMCxcbiAgICAgICAgICAgICAgICBjaG9pY2VzOiBjaG9pY2VzXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIFxuICAgICAgICBjU2hhcnBJbnF1aXJlci5nZXRDU2hhcnBRdWVzdGlvbnMoKS5mb3JFYWNoKHF1ZXN0aW9uID0+IHF1ZXN0aW9ucy5wdXNoKHF1ZXN0aW9uKSk7XG5cbiAgICAgICAgcmV0dXJuIGlucXVpcmVyLnByb21wdChxdWVzdGlvbnMpXG4gICAgICAgICAgICAudGhlbihhbnN3ZXJzID0+IHtcbiAgICAgICAgICAgICAgICBhbnN3ZXJzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgIGFuc3dlcnMuY29tbWFuZHMgPSBbXTtcbiAgICAgICAgICAgICAgICBhbnN3ZXJzLmltcG9ydHMgPSBbXTtcbiAgICAgICAgICAgICAgICBjb21tYW5kc01hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFuc3dlcnMuaW1wb3J0cy5wdXNoKCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2U6IGtleVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBhbnN3ZXJzLmNvbW1hbmROYW1lcy5mb3JFYWNoKGNvbW1hbmROYW1lID0+IFxuICAgICAgICAgICAgICAgICAgICBhbnN3ZXJzLmNvbW1hbmRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZE5hbWU6IGNvbW1hbmROYW1lXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2VycztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbmQgcmV0dXJucyB0aGUgbmFtZXMgb2YgdGhlIHB1YmxpYyBJQ29tbWFuZCBjbGFzc2VzXG4gICAgICogQHJldHVybnMge01hcDxzdHJpbmcsIHN0cmluZ1tdfVxuICAgICAqL1xuICAgIF9maW5kQ1NoYXJwQ29tbWFuZHMoKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBuZWFyZXN0Q3NQcm9qID0gZ2xvYmFsLmdldE5lYXJlc3RDc3Byb2pGaWxlKHByb2Nlc3MuY3dkKCkpO1xuICAgICAgICBsZXQgZmlsZVBhdGhzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLnNlYXJjaFJlY3Vyc2l2ZShwcm9jZXNzLmN3ZCgpLCAnLmNzJyk7XG4gICAgICAgIGxldCBjb21tYW5kc01hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgXG4gICAgICAgIGZpbGVQYXRocy5mb3JFYWNoKGZpbGVQYXRoID0+IHtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmROYW1lTWF0Y2ggPSBjb250ZW50Lm1hdGNoKC8uKnB1YmxpY1xccypjbGFzc1xccyooXFx3KilcXHMqOlxccypJQ29tbWFuZC8pO1xuXG4gICAgICAgICAgICBpZiAoY29tbWFuZE5hbWVNYXRjaCAhPT0gbnVsbCAmJiBjb21tYW5kTmFtZU1hdGNoLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IGdsb2JhbC5jcmVhdGVDU2hhcnBOYW1lc3BhY2UoZ2xvYmFsLmdldEZpbGVEaXIoZmlsZVBhdGgpLCBuZWFyZXN0Q3NQcm9qKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tYW5kTmFtZSA9IGNvbW1hbmROYW1lTWF0Y2hbMV07XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlcyA9IGNvbW1hbmRzTWFwLmdldChuYW1lc3BhY2UpIHx8IFtdO1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGNvbW1hbmROYW1lKTtcbiAgICAgICAgICAgICAgICBjb21tYW5kc01hcC5zZXQobmFtZXNwYWNlLCB2YWx1ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvbW1hbmRzTWFwO1xuICAgIH1cbn1cbiJdfQ==