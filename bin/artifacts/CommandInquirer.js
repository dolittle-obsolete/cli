'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CommandInquirer = undefined;

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

var CommandInquirer = exports.CommandInquirer = function () {

    /**
     * Constructor
     * @param {Folders} folders
     * @param {fs} fileSystem
     */
    function CommandInquirer(folders, fileSystem) {
        (0, _classCallCheck3.default)(this, CommandInquirer);

        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
    }
    /**
     * Gets the inquirer.js prompt answers based on the language
     * @param {String} language
     * @returns {Promise<any>} The answers
     */


    (0, _createClass3.default)(CommandInquirer, [{
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
                message: 'What\'s the Command\'s name?'
            }, {
                type: 'confirm',
                name: 'generatedNamespace',
                message: 'Do you want to use this namespace ' + namespace + '?'
            }, {
                type: 'input',
                name: 'namespace',
                message: 'Enter the Command\'s namespace',
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
    return CommandInquirer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQ29tbWFuZElucXVpcmVyLmpzIl0sIm5hbWVzIjpbImlucXVpcmVyIiwicmVxdWlyZSIsIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9maWxlU3lzdGVtIiwiQ29tbWFuZElucXVpcmVyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJzZXQiLCJsYW5ndWFnZSIsIl9nZXRDU2hhcnBQcm9tcHQiLCJuYW1lc3BhY2UiLCJnbG9iYWwiLCJjcmVhdGVDU2hhcnBOYW1lc3BhY2UiLCJwcm9jZXNzIiwiY3dkIiwiZ2V0TmVhcmVzdENzcHJvakZpbGUiLCJjb25zb2xlIiwibG9nIiwicXVlc3Rpb25zIiwidHlwZSIsIm5hbWUiLCJtZXNzYWdlIiwid2hlbiIsImFuc3dlcnMiLCJnZW5lcmF0ZWROYW1lc3BhY2UiLCJwcm9tcHQiLCJ0aGVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxXQUFXQyxRQUFRLFVBQVIsQ0FBakIsQyxDQVJBOzs7Ozs7QUFVQSxJQUFNQyxXQUFXLElBQUlDLE9BQUosRUFBakI7QUFDQSxJQUFNQyxjQUFjLElBQUlELE9BQUosRUFBcEI7O0lBRWFFLGUsV0FBQUEsZTs7QUFFVDs7Ozs7QUFLQSw2QkFBWUMsT0FBWixFQUFxQkMsVUFBckIsRUFBaUM7QUFBQTs7QUFDN0JMLGlCQUFTTSxHQUFULENBQWEsSUFBYixFQUFtQkYsT0FBbkI7QUFDQUYsb0JBQVlJLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JELFVBQXRCO0FBQ0g7QUFDRDs7Ozs7Ozs7O21DQUtXRSxRLEVBQVM7QUFDaEIsZ0JBQUlBLGFBQWEsUUFBakIsRUFBMkI7QUFDdkIsdUJBQU8sS0FBS0MsZ0JBQUwsRUFBUDtBQUNIO0FBQ0o7OzsyQ0FFa0I7QUFDZixnQkFBTUMsWUFBWUMsaUJBQU9DLHFCQUFQLENBQTZCQyxRQUFRQyxHQUFSLEVBQTdCLEVBQTRDSCxpQkFBT0ksb0JBQVAsRUFBNUMsQ0FBbEI7QUFDQUMsb0JBQVFDLEdBQVIsQ0FBWVAsU0FBWjtBQUNBLGdCQUFJUSxZQUFZLENBQ1o7QUFDSUMsc0JBQU0sT0FEVjtBQUVJQyxzQkFBTSxNQUZWO0FBR0lDO0FBSEosYUFEWSxFQU1aO0FBQ0lGLHNCQUFNLFNBRFY7QUFFSUMsc0JBQU0sb0JBRlY7QUFHSUMsZ0VBQThDWCxTQUE5QztBQUhKLGFBTlksRUFXWjtBQUNJUyxzQkFBTSxPQURWO0FBRUlDLHNCQUFNLFdBRlY7QUFHSUMseURBSEo7QUFJSUMsc0JBQU0sY0FBU0MsT0FBVCxFQUFrQjtBQUNwQiwyQkFBTyxDQUFDQSxRQUFRQyxrQkFBaEI7QUFDSDtBQU5MLGFBWFksQ0FBaEI7O0FBcUJBLG1CQUFPekIsU0FBUzBCLE1BQVQsQ0FBZ0JQLFNBQWhCLEVBQ0ZRLElBREUsQ0FDRyxtQkFBVztBQUNiLG9CQUFJSCxRQUFRQyxrQkFBWixFQUNJRCxRQUFRYixTQUFSLEdBQW9CQSxTQUFwQjs7QUFFSix1QkFBT2EsT0FBUDtBQUNILGFBTkUsQ0FBUDtBQU9IIiwiZmlsZSI6IkNvbW1hbmRJbnF1aXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCdcblxuY29uc3QgaW5xdWlyZXIgPSByZXF1aXJlKCdpbnF1aXJlcicpO1xuXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBjbGFzcyBDb21tYW5kSW5xdWlyZXIge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnNcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZm9sZGVycywgZmlsZVN5c3RlbSkge1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgaW5xdWlyZXIuanMgcHJvbXB0IGFuc3dlcnMgYmFzZWQgb24gdGhlIGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGxhbmd1YWdlXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gVGhlIGFuc3dlcnNcbiAgICAgKi9cbiAgICBwcm9tcHRVc2VyKGxhbmd1YWdlKXtcbiAgICAgICAgaWYgKGxhbmd1YWdlID09PSAnY3NoYXJwJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldENTaGFycFByb21wdCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZ2V0Q1NoYXJwUHJvbXB0KCkge1xuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSBnbG9iYWwuY3JlYXRlQ1NoYXJwTmFtZXNwYWNlKHByb2Nlc3MuY3dkKCksIGdsb2JhbC5nZXROZWFyZXN0Q3Nwcm9qRmlsZSgpKTtcbiAgICAgICAgY29uc29sZS5sb2cobmFtZXNwYWNlKTtcbiAgICAgICAgbGV0IHF1ZXN0aW9ucyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgV2hhdCdzIHRoZSBDb21tYW5kJ3MgbmFtZT9gXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdjb25maXJtJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnZ2VuZXJhdGVkTmFtZXNwYWNlJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgRG8geW91IHdhbnQgdG8gdXNlIHRoaXMgbmFtZXNwYWNlICR7bmFtZXNwYWNlfT9gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICduYW1lc3BhY2UnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBFbnRlciB0aGUgQ29tbWFuZCdzIG5hbWVzcGFjZWAsXG4gICAgICAgICAgICAgICAgd2hlbjogZnVuY3Rpb24oYW5zd2Vycykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWFuc3dlcnMuZ2VuZXJhdGVkTmFtZXNwYWNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICByZXR1cm4gaW5xdWlyZXIucHJvbXB0KHF1ZXN0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGFuc3dlcnMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhbnN3ZXJzLmdlbmVyYXRlZE5hbWVzcGFjZSlcbiAgICAgICAgICAgICAgICAgICAgYW5zd2Vycy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcnM7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59Il19