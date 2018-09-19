'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReadModelInquirer = undefined;

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

var inquirer = require('inquirer'); /*---------------------------------------------------------------------------------------------
                                     *  Copyright (c) Dolittle. All rights reserved.
                                     *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                     *--------------------------------------------------------------------------------------------*/


var _folders = new WeakMap();
var _fileSystem = new WeakMap();

var ReadModelInquirer = exports.ReadModelInquirer = function () {

    /**
     * Constructor
     * @param {Folders} folders
     * @param {fs} fileSystem
     */
    function ReadModelInquirer(folders, fileSystem) {
        (0, _classCallCheck3.default)(this, ReadModelInquirer);

        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
    }
    /**
     * Gets the inquirer.js prompt answers based on the language
     * @param {String} language
     * @returns {Promise<any>} The answers
     */


    (0, _createClass3.default)(ReadModelInquirer, [{
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
                message: 'What\'s the Read Model\'s name?'
            }, {
                type: 'confirm',
                name: 'generatedNamespace',
                message: 'Do you want to use this namespace ' + namespace + '?'
            }, {
                type: 'input',
                name: 'namespace',
                message: 'Enter the Read Model\'s namespace',
                when: function when(answers) {
                    return !answers.generatedNamespace;
                }
            }];

            return inquirer.prompt(questions).then(function (answers) {
                if (answers.generatedNamespace) answers.namespace = namespace;

                return answers;
            });
        }
    }]);
    return ReadModelInquirer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvUmVhZE1vZGVsSW5xdWlyZXIuanMiXSwibmFtZXMiOlsiaW5xdWlyZXIiLCJyZXF1aXJlIiwiX2ZvbGRlcnMiLCJXZWFrTWFwIiwiX2ZpbGVTeXN0ZW0iLCJSZWFkTW9kZWxJbnF1aXJlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwic2V0IiwibGFuZ3VhZ2UiLCJfZ2V0Q1NoYXJwUHJvbXB0IiwibmFtZXNwYWNlIiwiZ2xvYmFsIiwiY3JlYXRlQ1NoYXJwTmFtZXNwYWNlIiwicHJvY2VzcyIsImN3ZCIsImdldE5lYXJlc3RDc3Byb2pGaWxlIiwiY29uc29sZSIsImxvZyIsInF1ZXN0aW9ucyIsInR5cGUiLCJuYW1lIiwibWVzc2FnZSIsIndoZW4iLCJhbnN3ZXJzIiwiZ2VuZXJhdGVkTmFtZXNwYWNlIiwicHJvbXB0IiwidGhlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsV0FBV0MsUUFBUSxVQUFSLENBQWpCLEMsQ0FSQTs7Ozs7O0FBVUEsSUFBTUMsV0FBVyxJQUFJQyxPQUFKLEVBQWpCO0FBQ0EsSUFBTUMsY0FBYyxJQUFJRCxPQUFKLEVBQXBCOztJQUVhRSxpQixXQUFBQSxpQjs7QUFFVDs7Ozs7QUFLQSwrQkFBWUMsT0FBWixFQUFxQkMsVUFBckIsRUFBaUM7QUFBQTs7QUFDN0JMLGlCQUFTTSxHQUFULENBQWEsSUFBYixFQUFtQkYsT0FBbkI7QUFDQUYsb0JBQVlJLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JELFVBQXRCO0FBQ0g7QUFDRDs7Ozs7Ozs7O21DQUtXRSxRLEVBQVM7QUFDaEIsZ0JBQUlBLGFBQWEsUUFBakIsRUFBMkI7QUFDdkIsdUJBQU8sS0FBS0MsZ0JBQUwsRUFBUDtBQUNIO0FBQ0o7OzsyQ0FFa0I7QUFDZixnQkFBTUMsWUFBWUMsaUJBQU9DLHFCQUFQLENBQTZCQyxRQUFRQyxHQUFSLEVBQTdCLEVBQTRDSCxpQkFBT0ksb0JBQVAsRUFBNUMsQ0FBbEI7QUFDQUMsb0JBQVFDLEdBQVIsQ0FBWVAsU0FBWjtBQUNBLGdCQUFJUSxZQUFZLENBQ1o7QUFDSUMsc0JBQU0sT0FEVjtBQUVJQyxzQkFBTSxNQUZWO0FBR0lDO0FBSEosYUFEWSxFQU1aO0FBQ0lGLHNCQUFNLFNBRFY7QUFFSUMsc0JBQU0sb0JBRlY7QUFHSUMsZ0VBQThDWCxTQUE5QztBQUhKLGFBTlksRUFXWjtBQUNJUyxzQkFBTSxPQURWO0FBRUlDLHNCQUFNLFdBRlY7QUFHSUMsNERBSEo7QUFJSUMsc0JBQU0sY0FBU0MsT0FBVCxFQUFrQjtBQUNwQiwyQkFBTyxDQUFDQSxRQUFRQyxrQkFBaEI7QUFDSDtBQU5MLGFBWFksQ0FBaEI7O0FBcUJBLG1CQUFPekIsU0FBUzBCLE1BQVQsQ0FBZ0JQLFNBQWhCLEVBQ0ZRLElBREUsQ0FDRyxtQkFBVztBQUNiLG9CQUFJSCxRQUFRQyxrQkFBWixFQUNJRCxRQUFRYixTQUFSLEdBQW9CQSxTQUFwQjs7QUFFSix1QkFBT2EsT0FBUDtBQUNILGFBTkUsQ0FBUDtBQU9IIiwiZmlsZSI6IlJlYWRNb2RlbElucXVpcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi4vZ2xvYmFsJ1xuXG5jb25zdCBpbnF1aXJlciA9IHJlcXVpcmUoJ2lucXVpcmVyJyk7XG5cbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcblxuZXhwb3J0IGNsYXNzIFJlYWRNb2RlbElucXVpcmVyIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZvbGRlcnMsIGZpbGVTeXN0ZW0pIHtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGlucXVpcmVyLmpzIHByb21wdCBhbnN3ZXJzIGJhc2VkIG9uIHRoZSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFRoZSBhbnN3ZXJzXG4gICAgICovXG4gICAgcHJvbXB0VXNlcihsYW5ndWFnZSl7XG4gICAgICAgIGlmIChsYW5ndWFnZSA9PT0gJ2NzaGFycCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRDU2hhcnBQcm9tcHQoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2dldENTaGFycFByb21wdCgpIHtcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gZ2xvYmFsLmNyZWF0ZUNTaGFycE5hbWVzcGFjZShwcm9jZXNzLmN3ZCgpLCBnbG9iYWwuZ2V0TmVhcmVzdENzcHJvakZpbGUoKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKG5hbWVzcGFjZSk7XG4gICAgICAgIGxldCBxdWVzdGlvbnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYFdoYXQncyB0aGUgUmVhZCBNb2RlbCdzIG5hbWU/YFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnY29uZmlybScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ2dlbmVyYXRlZE5hbWVzcGFjZScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYERvIHlvdSB3YW50IHRvIHVzZSB0aGlzIG5hbWVzcGFjZSAke25hbWVzcGFjZX0/YCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnbmFtZXNwYWNlJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgRW50ZXIgdGhlIFJlYWQgTW9kZWwncyBuYW1lc3BhY2VgLFxuICAgICAgICAgICAgICAgIHdoZW46IGZ1bmN0aW9uKGFuc3dlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFhbnN3ZXJzLmdlbmVyYXRlZE5hbWVzcGFjZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgcmV0dXJuIGlucXVpcmVyLnByb21wdChxdWVzdGlvbnMpXG4gICAgICAgICAgICAudGhlbihhbnN3ZXJzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYW5zd2Vycy5nZW5lcmF0ZWROYW1lc3BhY2UpXG4gICAgICAgICAgICAgICAgICAgIGFuc3dlcnMubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBhbnN3ZXJzO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==