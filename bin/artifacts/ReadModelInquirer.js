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

var _cSharpInquirerQuestions = require('./cSharpInquirerQuestions');

var _cSharpInquirerQuestions2 = _interopRequireDefault(_cSharpInquirerQuestions);

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
     * @param {any} flags
     * @param {fs} fileSystem
     */
    function ReadModelInquirer(folders, fileSystem) {
        (0, _classCallCheck3.default)(this, ReadModelInquirer);

        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
    }
    /**
     * Gets the inquirer.js prompt answers based on the language
     * @param {any} flags
     * @returns {Promise<any>} The answers
     */


    (0, _createClass3.default)(ReadModelInquirer, [{
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
            var questions = _cSharpInquirerQuestions2.default.getCSharpQuestions();

            return inquirer.prompt(questions).then(function (answers) {
                answers.name = name;

                return answers;
            });
        }
    }]);
    return ReadModelInquirer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvUmVhZE1vZGVsSW5xdWlyZXIuanMiXSwibmFtZXMiOlsiaW5xdWlyZXIiLCJyZXF1aXJlIiwiX2ZvbGRlcnMiLCJXZWFrTWFwIiwiX2ZpbGVTeXN0ZW0iLCJSZWFkTW9kZWxJbnF1aXJlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwic2V0IiwiZmxhZ3MiLCJsYW5ndWFnZSIsIl9nZXRDU2hhcnBQcm9tcHQiLCJuYW1lIiwicXVlc3Rpb25zIiwiY1NoYXJwSW5xdWlyZXIiLCJnZXRDU2hhcnBRdWVzdGlvbnMiLCJwcm9tcHQiLCJ0aGVuIiwiYW5zd2VycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsV0FBV0MsUUFBUSxVQUFSLENBQWpCLEMsQ0FSQTs7Ozs7O0FBVUEsSUFBTUMsV0FBVyxJQUFJQyxPQUFKLEVBQWpCO0FBQ0EsSUFBTUMsY0FBYyxJQUFJRCxPQUFKLEVBQXBCOztJQUVhRSxpQixXQUFBQSxpQjs7QUFFVDs7Ozs7QUFLQSwrQkFBWUMsT0FBWixFQUFxQkMsVUFBckIsRUFBaUM7QUFBQTs7QUFDN0JMLGlCQUFTTSxHQUFULENBQWEsSUFBYixFQUFtQkYsT0FBbkI7QUFDQUYsb0JBQVlJLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JELFVBQXRCO0FBQ0g7QUFDRDs7Ozs7Ozs7O21DQUtXRSxLLEVBQU07QUFDYixnQkFBSUEsTUFBTUMsUUFBTixLQUFtQixRQUF2QixFQUFpQztBQUM3Qix1QkFBTyxLQUFLQyxnQkFBTCxDQUFzQkYsTUFBTUcsSUFBNUIsQ0FBUDtBQUNIO0FBQ0o7QUFDRDs7Ozs7Ozt5Q0FJaUJBLEksRUFBTTtBQUNuQixnQkFBSUMsWUFBWUMsa0NBQWVDLGtCQUFmLEVBQWhCOztBQUVBLG1CQUFPZixTQUFTZ0IsTUFBVCxDQUFnQkgsU0FBaEIsRUFDRkksSUFERSxDQUNHLG1CQUFXO0FBQ2JDLHdCQUFRTixJQUFSLEdBQWVBLElBQWY7O0FBRUEsdUJBQU9NLE9BQVA7QUFDSCxhQUxFLENBQVA7QUFNSCIsImZpbGUiOiJSZWFkTW9kZWxJbnF1aXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgY1NoYXJwSW5xdWlyZXIgZnJvbSAnLi9jU2hhcnBJbnF1aXJlclF1ZXN0aW9ucydcblxuY29uc3QgaW5xdWlyZXIgPSByZXF1aXJlKCdpbnF1aXJlcicpO1xuXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBjbGFzcyBSZWFkTW9kZWxJbnF1aXJlciB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7YW55fSBmbGFnc1xuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihmb2xkZXJzLCBmaWxlU3lzdGVtKSB7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpbnF1aXJlci5qcyBwcm9tcHQgYW5zd2VycyBiYXNlZCBvbiB0aGUgbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3NcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBUaGUgYW5zd2Vyc1xuICAgICAqL1xuICAgIHByb21wdFVzZXIoZmxhZ3Mpe1xuICAgICAgICBpZiAoZmxhZ3MubGFuZ3VhZ2UgPT09ICdjc2hhcnAnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q1NoYXJwUHJvbXB0KGZsYWdzLm5hbWUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgQyMgcHJvbXB0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKi9cbiAgICBfZ2V0Q1NoYXJwUHJvbXB0KG5hbWUpIHtcbiAgICAgICAgbGV0IHF1ZXN0aW9ucyA9IGNTaGFycElucXVpcmVyLmdldENTaGFycFF1ZXN0aW9ucygpOyBcblxuICAgICAgICByZXR1cm4gaW5xdWlyZXIucHJvbXB0KHF1ZXN0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGFuc3dlcnMgPT4ge1xuICAgICAgICAgICAgICAgIGFuc3dlcnMubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcnM7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59Il19