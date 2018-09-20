'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventInquirer = undefined;

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

var EventInquirer = exports.EventInquirer = function () {

    /**
     * Constructor
     * @param {Folders} folders
     * @param {fs} fileSystem
     */
    function EventInquirer(folders, fileSystem) {
        (0, _classCallCheck3.default)(this, EventInquirer);

        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
    }
    /**
     * Gets the inquirer.js prompt answers based on the language
     * @param {any} flags
     * @returns {Promise<any>} The answers
     */


    (0, _createClass3.default)(EventInquirer, [{
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
    return EventInquirer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvRXZlbnRJbnF1aXJlci5qcyJdLCJuYW1lcyI6WyJpbnF1aXJlciIsInJlcXVpcmUiLCJfZm9sZGVycyIsIldlYWtNYXAiLCJfZmlsZVN5c3RlbSIsIkV2ZW50SW5xdWlyZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsInNldCIsImZsYWdzIiwibGFuZ3VhZ2UiLCJfZ2V0Q1NoYXJwUHJvbXB0IiwibmFtZSIsInF1ZXN0aW9ucyIsImNTaGFycElucXVpcmVyIiwiZ2V0Q1NoYXJwUXVlc3Rpb25zIiwicHJvbXB0IiwidGhlbiIsImFuc3dlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFdBQVdDLFFBQVEsVUFBUixDQUFqQixDLENBUkE7Ozs7OztBQVVBLElBQU1DLFdBQVcsSUFBSUMsT0FBSixFQUFqQjtBQUNBLElBQU1DLGNBQWMsSUFBSUQsT0FBSixFQUFwQjs7SUFFYUUsYSxXQUFBQSxhOztBQUVUOzs7OztBQUtBLDJCQUFZQyxPQUFaLEVBQXFCQyxVQUFyQixFQUFpQztBQUFBOztBQUM3QkwsaUJBQVNNLEdBQVQsQ0FBYSxJQUFiLEVBQW1CRixPQUFuQjtBQUNBRixvQkFBWUksR0FBWixDQUFnQixJQUFoQixFQUFzQkQsVUFBdEI7QUFDSDtBQUNEOzs7Ozs7Ozs7bUNBS1dFLEssRUFBTTtBQUNiLGdCQUFJQSxNQUFNQyxRQUFOLEtBQW1CLFFBQXZCLEVBQWlDO0FBQzdCLHVCQUFPLEtBQUtDLGdCQUFMLENBQXNCRixNQUFNRyxJQUE1QixDQUFQO0FBQ0g7QUFDSjtBQUNEOzs7Ozs7O3lDQUlpQkEsSSxFQUFNO0FBQ25CLGdCQUFJQyxZQUFZQyxrQ0FBZUMsa0JBQWYsRUFBaEI7O0FBRUEsbUJBQU9mLFNBQVNnQixNQUFULENBQWdCSCxTQUFoQixFQUNGSSxJQURFLENBQ0csbUJBQVc7QUFDYkMsd0JBQVFOLElBQVIsR0FBZUEsSUFBZjs7QUFFQSx1QkFBT00sT0FBUDtBQUNILGFBTEUsQ0FBUDtBQU1IIiwiZmlsZSI6IkV2ZW50SW5xdWlyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IGNTaGFycElucXVpcmVyIGZyb20gJy4vY1NoYXJwSW5xdWlyZXJRdWVzdGlvbnMnXG5cbmNvbnN0IGlucXVpcmVyID0gcmVxdWlyZSgnaW5xdWlyZXInKTtcblxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5leHBvcnQgY2xhc3MgRXZlbnRJbnF1aXJlciB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihmb2xkZXJzLCBmaWxlU3lzdGVtKSB7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpbnF1aXJlci5qcyBwcm9tcHQgYW5zd2VycyBiYXNlZCBvbiB0aGUgbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3NcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBUaGUgYW5zd2Vyc1xuICAgICAqL1xuICAgIHByb21wdFVzZXIoZmxhZ3Mpe1xuICAgICAgICBpZiAoZmxhZ3MubGFuZ3VhZ2UgPT09ICdjc2hhcnAnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q1NoYXJwUHJvbXB0KGZsYWdzLm5hbWUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgQyMgcHJvbXB0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKi9cbiAgICBfZ2V0Q1NoYXJwUHJvbXB0KG5hbWUpIHtcbiAgICAgICAgbGV0IHF1ZXN0aW9ucyA9IGNTaGFycElucXVpcmVyLmdldENTaGFycFF1ZXN0aW9ucygpOyBcblxuICAgICAgICByZXR1cm4gaW5xdWlyZXIucHJvbXB0KHF1ZXN0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGFuc3dlcnMgPT4ge1xuICAgICAgICAgICAgICAgIGFuc3dlcnMubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcnM7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59Il19