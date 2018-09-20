'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AggregateRootInquirer = undefined;

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

var AggregateRootInquirer = exports.AggregateRootInquirer = function () {
    /**
     * Constructor
     * @param {Folders} folders
     * @param {fs} fileSystem
     */
    function AggregateRootInquirer(folders, fileSystem) {
        (0, _classCallCheck3.default)(this, AggregateRootInquirer);

        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
    }
    /**
     * Gets the inquirer.js prompt answers based on the language
     * @param {any} flags
     * @returns {Promise<any>} The answers
     */


    (0, _createClass3.default)(AggregateRootInquirer, [{
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
    return AggregateRootInquirer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQWdncmVnYXRlUm9vdElucXVpcmVyLmpzIl0sIm5hbWVzIjpbImlucXVpcmVyIiwicmVxdWlyZSIsIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9maWxlU3lzdGVtIiwiQWdncmVnYXRlUm9vdElucXVpcmVyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJzZXQiLCJmbGFncyIsImxhbmd1YWdlIiwiX2dldENTaGFycFByb21wdCIsIm5hbWUiLCJxdWVzdGlvbnMiLCJjU2hhcnBJbnF1aXJlciIsImdldENTaGFycFF1ZXN0aW9ucyIsInByb21wdCIsInRoZW4iLCJhbnN3ZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxXQUFXQyxRQUFRLFVBQVIsQ0FBakIsQyxDQVJBOzs7Ozs7QUFVQSxJQUFNQyxXQUFXLElBQUlDLE9BQUosRUFBakI7QUFDQSxJQUFNQyxjQUFjLElBQUlELE9BQUosRUFBcEI7O0lBRWFFLHFCLFdBQUFBLHFCO0FBQ1Q7Ozs7O0FBS0EsbUNBQVlDLE9BQVosRUFBcUJDLFVBQXJCLEVBQWlDO0FBQUE7O0FBQzdCTCxpQkFBU00sR0FBVCxDQUFhLElBQWIsRUFBbUJGLE9BQW5CO0FBQ0FGLG9CQUFZSSxHQUFaLENBQWdCLElBQWhCLEVBQXNCRCxVQUF0QjtBQUNIO0FBQ0Q7Ozs7Ozs7OzttQ0FLV0UsSyxFQUFNO0FBQ2IsZ0JBQUlBLE1BQU1DLFFBQU4sS0FBbUIsUUFBdkIsRUFBaUM7QUFDN0IsdUJBQU8sS0FBS0MsZ0JBQUwsQ0FBc0JGLE1BQU1HLElBQTVCLENBQVA7QUFDSDtBQUNKO0FBQ0Q7Ozs7Ozs7eUNBSWlCQSxJLEVBQU07O0FBRW5CLGdCQUFJQyxZQUFZQyxrQ0FBZUMsa0JBQWYsRUFBaEI7O0FBRUEsbUJBQU9mLFNBQVNnQixNQUFULENBQWdCSCxTQUFoQixFQUNGSSxJQURFLENBQ0csbUJBQVc7QUFDYkMsd0JBQVFOLElBQVIsR0FBZUEsSUFBZjs7QUFFQSx1QkFBT00sT0FBUDtBQUNILGFBTEUsQ0FBUDtBQU1IIiwiZmlsZSI6IkFnZ3JlZ2F0ZVJvb3RJbnF1aXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgY1NoYXJwSW5xdWlyZXIgZnJvbSAnLi9jU2hhcnBJbnF1aXJlclF1ZXN0aW9ucydcblxuY29uc3QgaW5xdWlyZXIgPSByZXF1aXJlKCdpbnF1aXJlcicpO1xuXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBjbGFzcyBBZ2dyZWdhdGVSb290SW5xdWlyZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZvbGRlcnMsIGZpbGVTeXN0ZW0pIHtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGlucXVpcmVyLmpzIHByb21wdCBhbnN3ZXJzIGJhc2VkIG9uIHRoZSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7YW55fSBmbGFnc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFRoZSBhbnN3ZXJzXG4gICAgICovXG4gICAgcHJvbXB0VXNlcihmbGFncyl7XG4gICAgICAgIGlmIChmbGFncy5sYW5ndWFnZSA9PT0gJ2NzaGFycCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRDU2hhcnBQcm9tcHQoZmxhZ3MubmFtZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBDIyBwcm9tcHRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqL1xuICAgIF9nZXRDU2hhcnBQcm9tcHQobmFtZSkge1xuICAgICAgICBcbiAgICAgICAgbGV0IHF1ZXN0aW9ucyA9IGNTaGFycElucXVpcmVyLmdldENTaGFycFF1ZXN0aW9ucygpOyBcblxuICAgICAgICByZXR1cm4gaW5xdWlyZXIucHJvbXB0KHF1ZXN0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGFuc3dlcnMgPT4ge1xuICAgICAgICAgICAgICAgIGFuc3dlcnMubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcnM7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbn0iXX0=