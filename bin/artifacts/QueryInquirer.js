'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QueryInquirer = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Folders = require('../Folders');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inquirer = require('inquirer');

var _folders = new WeakMap();
var _fileSystem = new WeakMap();

var QueryInquirer = exports.QueryInquirer = function () {

    /**
     * Constructor
     * @param {Folders} folders
     * @param {fs} fileSystem
     */
    function QueryInquirer(folders, fileSystem) {
        (0, _classCallCheck3.default)(this, QueryInquirer);

        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
    }
    /**
     * Gets the inquirer.js prompt answers based on the language
     * @param {String} language
     * @returns {Promise<any>} The answers
     */


    (0, _createClass3.default)(QueryInquirer, [{
        key: 'promptUser',
        value: function promptUser(language) {
            if (language === 'csharp') {
                return this._getCSharpPrompt();
            }
        }
    }, {
        key: '_getCSharpPrompt',
        value: function _getCSharpPrompt() {
            var namespace = "The.Namespace";
            var questions = [{
                type: 'input',
                name: 'name',
                message: 'What\'s the Query\'s name?'
            }, {
                type: 'confirm',
                name: 'generatedNamespace',
                message: 'Do you want to use this namespace ' + namespace + '?'
            }, {
                type: 'input',
                name: 'namespace',
                message: 'Enter the Query\'s namespace',
                when: function when(answers) {
                    return !answers.generatedNamespace;
                }
            }];

            return inquirer.prompt(questions).then(function (answers) {
                if (answers.generatedNamespace) {
                    answers.namespace = namespace;
                }
                return answers;
            });
        }
    }]);
    return QueryInquirer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvUXVlcnlJbnF1aXJlci5qcyJdLCJuYW1lcyI6WyJpbnF1aXJlciIsInJlcXVpcmUiLCJfZm9sZGVycyIsIldlYWtNYXAiLCJfZmlsZVN5c3RlbSIsIlF1ZXJ5SW5xdWlyZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsInNldCIsImxhbmd1YWdlIiwiX2dldENTaGFycFByb21wdCIsIm5hbWVzcGFjZSIsInF1ZXN0aW9ucyIsInR5cGUiLCJuYW1lIiwibWVzc2FnZSIsIndoZW4iLCJhbnN3ZXJzIiwiZ2VuZXJhdGVkTmFtZXNwYWNlIiwicHJvbXB0IiwidGhlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFdBQVdDLFFBQVEsVUFBUixDQUFqQjs7QUFFQSxJQUFNQyxXQUFXLElBQUlDLE9BQUosRUFBakI7QUFDQSxJQUFNQyxjQUFjLElBQUlELE9BQUosRUFBcEI7O0lBRWFFLGEsV0FBQUEsYTs7QUFFVDs7Ozs7QUFLQSwyQkFBWUMsT0FBWixFQUFxQkMsVUFBckIsRUFBaUM7QUFBQTs7QUFDN0JMLGlCQUFTTSxHQUFULENBQWEsSUFBYixFQUFtQkYsT0FBbkI7QUFDQUYsb0JBQVlJLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JELFVBQXRCO0FBQ0g7QUFDRDs7Ozs7Ozs7O21DQUtXRSxRLEVBQVM7QUFDaEIsZ0JBQUlBLGFBQWEsUUFBakIsRUFBMkI7QUFDdkIsdUJBQU8sS0FBS0MsZ0JBQUwsRUFBUDtBQUNIO0FBQ0o7OzsyQ0FFa0I7QUFDZixnQkFBTUMsWUFBWSxlQUFsQjtBQUNBLGdCQUFJQyxZQUFZLENBQ1o7QUFDSUMsc0JBQU0sT0FEVjtBQUVJQyxzQkFBTSxNQUZWO0FBR0lDO0FBSEosYUFEWSxFQU1aO0FBQ0lGLHNCQUFNLFNBRFY7QUFFSUMsc0JBQU0sb0JBRlY7QUFHSUMsZ0VBQThDSixTQUE5QztBQUhKLGFBTlksRUFXWjtBQUNJRSxzQkFBTSxPQURWO0FBRUlDLHNCQUFNLFdBRlY7QUFHSUMsdURBSEo7QUFJSUMsc0JBQU0sY0FBU0MsT0FBVCxFQUFrQjtBQUNwQiwyQkFBTyxDQUFDQSxRQUFRQyxrQkFBaEI7QUFDSDtBQU5MLGFBWFksQ0FBaEI7O0FBcUJBLG1CQUFPbEIsU0FBU21CLE1BQVQsQ0FBZ0JQLFNBQWhCLEVBQ0ZRLElBREUsQ0FDRyxtQkFBVztBQUNiLG9CQUFJSCxRQUFRQyxrQkFBWixFQUNBO0FBQ0lELDRCQUFRTixTQUFSLEdBQW9CQSxTQUFwQjtBQUNIO0FBQ0QsdUJBQU9NLE9BQVA7QUFDSCxhQVBFLENBQVA7QUFRSCIsImZpbGUiOiJRdWVyeUlucXVpcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuY29uc3QgaW5xdWlyZXIgPSByZXF1aXJlKCdpbnF1aXJlcicpO1xuXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBjbGFzcyBRdWVyeUlucXVpcmVyIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZvbGRlcnMsIGZpbGVTeXN0ZW0pIHtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGlucXVpcmVyLmpzIHByb21wdCBhbnN3ZXJzIGJhc2VkIG9uIHRoZSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFRoZSBhbnN3ZXJzXG4gICAgICovXG4gICAgcHJvbXB0VXNlcihsYW5ndWFnZSl7XG4gICAgICAgIGlmIChsYW5ndWFnZSA9PT0gJ2NzaGFycCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRDU2hhcnBQcm9tcHQoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2dldENTaGFycFByb21wdCgpIHtcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gXCJUaGUuTmFtZXNwYWNlXCI7XG4gICAgICAgIGxldCBxdWVzdGlvbnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYFdoYXQncyB0aGUgUXVlcnkncyBuYW1lP2BcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvbmZpcm0nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdnZW5lcmF0ZWROYW1lc3BhY2UnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBEbyB5b3Ugd2FudCB0byB1c2UgdGhpcyBuYW1lc3BhY2UgJHtuYW1lc3BhY2V9P2AsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ25hbWVzcGFjZScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYEVudGVyIHRoZSBRdWVyeSdzIG5hbWVzcGFjZWAsXG4gICAgICAgICAgICAgICAgd2hlbjogZnVuY3Rpb24oYW5zd2Vycykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWFuc3dlcnMuZ2VuZXJhdGVkTmFtZXNwYWNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICByZXR1cm4gaW5xdWlyZXIucHJvbXB0KHF1ZXN0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGFuc3dlcnMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhbnN3ZXJzLmdlbmVyYXRlZE5hbWVzcGFjZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGFuc3dlcnMubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2VycztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn0iXX0=