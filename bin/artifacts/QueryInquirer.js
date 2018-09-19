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

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

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
            var namespace = _global2.default.createCSharpNamespace(process.cwd(), _global2.default.getNearestCsprojFile());
            console.log(namespace);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvUXVlcnlJbnF1aXJlci5qcyJdLCJuYW1lcyI6WyJpbnF1aXJlciIsInJlcXVpcmUiLCJfZm9sZGVycyIsIldlYWtNYXAiLCJfZmlsZVN5c3RlbSIsIlF1ZXJ5SW5xdWlyZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsInNldCIsImxhbmd1YWdlIiwiX2dldENTaGFycFByb21wdCIsIm5hbWVzcGFjZSIsImdsb2JhbCIsImNyZWF0ZUNTaGFycE5hbWVzcGFjZSIsInByb2Nlc3MiLCJjd2QiLCJnZXROZWFyZXN0Q3Nwcm9qRmlsZSIsImNvbnNvbGUiLCJsb2ciLCJxdWVzdGlvbnMiLCJ0eXBlIiwibmFtZSIsIm1lc3NhZ2UiLCJ3aGVuIiwiYW5zd2VycyIsImdlbmVyYXRlZE5hbWVzcGFjZSIsInByb21wdCIsInRoZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFdBQVdDLFFBQVEsVUFBUixDQUFqQjs7QUFFQSxJQUFNQyxXQUFXLElBQUlDLE9BQUosRUFBakI7QUFDQSxJQUFNQyxjQUFjLElBQUlELE9BQUosRUFBcEI7O0lBRWFFLGEsV0FBQUEsYTs7QUFFVDs7Ozs7QUFLQSwyQkFBWUMsT0FBWixFQUFxQkMsVUFBckIsRUFBaUM7QUFBQTs7QUFDN0JMLGlCQUFTTSxHQUFULENBQWEsSUFBYixFQUFtQkYsT0FBbkI7QUFDQUYsb0JBQVlJLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JELFVBQXRCO0FBQ0g7QUFDRDs7Ozs7Ozs7O21DQUtXRSxRLEVBQVM7QUFDaEIsZ0JBQUlBLGFBQWEsUUFBakIsRUFBMkI7QUFDdkIsdUJBQU8sS0FBS0MsZ0JBQUwsRUFBUDtBQUNIO0FBQ0o7OzsyQ0FFa0I7QUFDZixnQkFBTUMsWUFBWUMsaUJBQU9DLHFCQUFQLENBQTZCQyxRQUFRQyxHQUFSLEVBQTdCLEVBQTRDSCxpQkFBT0ksb0JBQVAsRUFBNUMsQ0FBbEI7QUFDQUMsb0JBQVFDLEdBQVIsQ0FBWVAsU0FBWjtBQUNBLGdCQUFJUSxZQUFZLENBQ1o7QUFDSUMsc0JBQU0sT0FEVjtBQUVJQyxzQkFBTSxNQUZWO0FBR0lDO0FBSEosYUFEWSxFQU1aO0FBQ0lGLHNCQUFNLFNBRFY7QUFFSUMsc0JBQU0sb0JBRlY7QUFHSUMsZ0VBQThDWCxTQUE5QztBQUhKLGFBTlksRUFXWjtBQUNJUyxzQkFBTSxPQURWO0FBRUlDLHNCQUFNLFdBRlY7QUFHSUMsdURBSEo7QUFJSUMsc0JBQU0sY0FBU0MsT0FBVCxFQUFrQjtBQUNwQiwyQkFBTyxDQUFDQSxRQUFRQyxrQkFBaEI7QUFDSDtBQU5MLGFBWFksQ0FBaEI7O0FBcUJBLG1CQUFPekIsU0FBUzBCLE1BQVQsQ0FBZ0JQLFNBQWhCLEVBQ0ZRLElBREUsQ0FDRyxtQkFBVztBQUNiLG9CQUFJSCxRQUFRQyxrQkFBWixFQUNBO0FBQ0lELDRCQUFRYixTQUFSLEdBQW9CQSxTQUFwQjtBQUNIO0FBQ0QsdUJBQU9hLE9BQVA7QUFDSCxhQVBFLENBQVA7QUFRSCIsImZpbGUiOiJRdWVyeUlucXVpcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi4vZ2xvYmFsJ1xuXG5jb25zdCBpbnF1aXJlciA9IHJlcXVpcmUoJ2lucXVpcmVyJyk7XG5cbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcblxuZXhwb3J0IGNsYXNzIFF1ZXJ5SW5xdWlyZXIge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnNcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZm9sZGVycywgZmlsZVN5c3RlbSkge1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgaW5xdWlyZXIuanMgcHJvbXB0IGFuc3dlcnMgYmFzZWQgb24gdGhlIGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGxhbmd1YWdlXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gVGhlIGFuc3dlcnNcbiAgICAgKi9cbiAgICBwcm9tcHRVc2VyKGxhbmd1YWdlKXtcbiAgICAgICAgaWYgKGxhbmd1YWdlID09PSAnY3NoYXJwJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldENTaGFycFByb21wdCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZ2V0Q1NoYXJwUHJvbXB0KCkge1xuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSBnbG9iYWwuY3JlYXRlQ1NoYXJwTmFtZXNwYWNlKHByb2Nlc3MuY3dkKCksIGdsb2JhbC5nZXROZWFyZXN0Q3Nwcm9qRmlsZSgpKTtcbiAgICAgICAgY29uc29sZS5sb2cobmFtZXNwYWNlKTtcbiAgICAgICAgbGV0IHF1ZXN0aW9ucyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgV2hhdCdzIHRoZSBRdWVyeSdzIG5hbWU/YFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnY29uZmlybScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ2dlbmVyYXRlZE5hbWVzcGFjZScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYERvIHlvdSB3YW50IHRvIHVzZSB0aGlzIG5hbWVzcGFjZSAke25hbWVzcGFjZX0/YCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnbmFtZXNwYWNlJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgRW50ZXIgdGhlIFF1ZXJ5J3MgbmFtZXNwYWNlYCxcbiAgICAgICAgICAgICAgICB3aGVuOiBmdW5jdGlvbihhbnN3ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhYW5zd2Vycy5nZW5lcmF0ZWROYW1lc3BhY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuXG4gICAgICAgIHJldHVybiBpbnF1aXJlci5wcm9tcHQocXVlc3Rpb25zKVxuICAgICAgICAgICAgLnRoZW4oYW5zd2VycyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFuc3dlcnMuZ2VuZXJhdGVkTmFtZXNwYWNlKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYW5zd2Vycy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhbnN3ZXJzO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==