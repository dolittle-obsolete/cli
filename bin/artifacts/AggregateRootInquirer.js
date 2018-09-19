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

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

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
     * @param {String} language
     * @returns {Promise<any>} The answers
     */


    (0, _createClass3.default)(AggregateRootInquirer, [{
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
                message: 'What\'s the Aggregate Root\'s name?'
            }, {
                type: 'confirm',
                name: 'generatedNamespace',
                message: 'Do you want to use this namespace ' + namespace + '?'
            }, {
                type: 'input',
                name: 'namespace',
                message: 'Enter the Aggregate Root\'s namespace',
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
    return AggregateRootInquirer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQWdncmVnYXRlUm9vdElucXVpcmVyLmpzIl0sIm5hbWVzIjpbImlucXVpcmVyIiwicmVxdWlyZSIsIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9maWxlU3lzdGVtIiwiQWdncmVnYXRlUm9vdElucXVpcmVyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJzZXQiLCJsYW5ndWFnZSIsIl9nZXRDU2hhcnBQcm9tcHQiLCJuYW1lc3BhY2UiLCJnbG9iYWwiLCJjcmVhdGVDU2hhcnBOYW1lc3BhY2UiLCJwcm9jZXNzIiwiY3dkIiwiZ2V0TmVhcmVzdENzcHJvakZpbGUiLCJjb25zb2xlIiwibG9nIiwicXVlc3Rpb25zIiwidHlwZSIsIm5hbWUiLCJtZXNzYWdlIiwid2hlbiIsImFuc3dlcnMiLCJnZW5lcmF0ZWROYW1lc3BhY2UiLCJwcm9tcHQiLCJ0aGVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxXQUFXQyxRQUFRLFVBQVIsQ0FBakIsQyxDQVJBOzs7Ozs7QUFVQSxJQUFNQyxXQUFXLElBQUlDLE9BQUosRUFBakI7QUFDQSxJQUFNQyxjQUFjLElBQUlELE9BQUosRUFBcEI7O0lBRWFFLHFCLFdBQUFBLHFCOztBQUVUOzs7OztBQUtBLG1DQUFZQyxPQUFaLEVBQXFCQyxVQUFyQixFQUFpQztBQUFBOztBQUM3QkwsaUJBQVNNLEdBQVQsQ0FBYSxJQUFiLEVBQW1CRixPQUFuQjtBQUNBRixvQkFBWUksR0FBWixDQUFnQixJQUFoQixFQUFzQkQsVUFBdEI7QUFDSDtBQUNEOzs7Ozs7Ozs7bUNBS1dFLFEsRUFBUztBQUNoQixnQkFBSUEsYUFBYSxRQUFqQixFQUEyQjtBQUN2Qix1QkFBTyxLQUFLQyxnQkFBTCxFQUFQO0FBQ0g7QUFDSjs7OzJDQUVrQjtBQUNmLGdCQUFNQyxZQUFZQyxpQkFBT0MscUJBQVAsQ0FBNkJDLFFBQVFDLEdBQVIsRUFBN0IsRUFBNENILGlCQUFPSSxvQkFBUCxFQUE1QyxDQUFsQjtBQUNBQyxvQkFBUUMsR0FBUixDQUFZUCxTQUFaO0FBQ0EsZ0JBQUlRLFlBQVksQ0FDWjtBQUNJQyxzQkFBTSxPQURWO0FBRUlDLHNCQUFNLE1BRlY7QUFHSUM7QUFISixhQURZLEVBTVo7QUFDSUYsc0JBQU0sU0FEVjtBQUVJQyxzQkFBTSxvQkFGVjtBQUdJQyxnRUFBOENYLFNBQTlDO0FBSEosYUFOWSxFQVdaO0FBQ0lTLHNCQUFNLE9BRFY7QUFFSUMsc0JBQU0sV0FGVjtBQUdJQyxnRUFISjtBQUlJQyxzQkFBTSxjQUFTQyxPQUFULEVBQWtCO0FBQ3BCLDJCQUFPLENBQUNBLFFBQVFDLGtCQUFoQjtBQUNIO0FBTkwsYUFYWSxDQUFoQjs7QUFxQkEsbUJBQU96QixTQUFTMEIsTUFBVCxDQUFnQlAsU0FBaEIsRUFDRlEsSUFERSxDQUNHLG1CQUFXO0FBQ2Isb0JBQUlILFFBQVFDLGtCQUFaLEVBQ0lELFFBQVFiLFNBQVIsR0FBb0JBLFNBQXBCOztBQUVKLHVCQUFPYSxPQUFQO0FBQ0gsYUFORSxDQUFQO0FBT0giLCJmaWxlIjoiQWdncmVnYXRlUm9vdElucXVpcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi4vZ2xvYmFsJ1xuXG5jb25zdCBpbnF1aXJlciA9IHJlcXVpcmUoJ2lucXVpcmVyJyk7XG5cbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcblxuZXhwb3J0IGNsYXNzIEFnZ3JlZ2F0ZVJvb3RJbnF1aXJlciB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihmb2xkZXJzLCBmaWxlU3lzdGVtKSB7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBpbnF1aXJlci5qcyBwcm9tcHQgYW5zd2VycyBiYXNlZCBvbiB0aGUgbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbGFuZ3VhZ2VcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBUaGUgYW5zd2Vyc1xuICAgICAqL1xuICAgIHByb21wdFVzZXIobGFuZ3VhZ2Upe1xuICAgICAgICBpZiAobGFuZ3VhZ2UgPT09ICdjc2hhcnAnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q1NoYXJwUHJvbXB0KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9nZXRDU2hhcnBQcm9tcHQoKSB7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IGdsb2JhbC5jcmVhdGVDU2hhcnBOYW1lc3BhY2UocHJvY2Vzcy5jd2QoKSwgZ2xvYmFsLmdldE5lYXJlc3RDc3Byb2pGaWxlKCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhuYW1lc3BhY2UpO1xuICAgICAgICBsZXQgcXVlc3Rpb25zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBXaGF0J3MgdGhlIEFnZ3JlZ2F0ZSBSb290J3MgbmFtZT9gXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdjb25maXJtJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnZ2VuZXJhdGVkTmFtZXNwYWNlJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgRG8geW91IHdhbnQgdG8gdXNlIHRoaXMgbmFtZXNwYWNlICR7bmFtZXNwYWNlfT9gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICduYW1lc3BhY2UnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBFbnRlciB0aGUgQWdncmVnYXRlIFJvb3QncyBuYW1lc3BhY2VgLFxuICAgICAgICAgICAgICAgIHdoZW46IGZ1bmN0aW9uKGFuc3dlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFhbnN3ZXJzLmdlbmVyYXRlZE5hbWVzcGFjZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgcmV0dXJuIGlucXVpcmVyLnByb21wdChxdWVzdGlvbnMpXG4gICAgICAgICAgICAudGhlbihhbnN3ZXJzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYW5zd2Vycy5nZW5lcmF0ZWROYW1lc3BhY2UpXG4gICAgICAgICAgICAgICAgICAgIGFuc3dlcnMubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBhbnN3ZXJzO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==