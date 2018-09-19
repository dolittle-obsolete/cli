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

var inquirer = require('inquirer'); /*---------------------------------------------------------------------------------------------
                                     *  Copyright (c) Dolittle. All rights reserved.
                                     *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                     *--------------------------------------------------------------------------------------------*/


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
                if (answers.generatedNamespace) answers.namespace = namespace;

                return answers;
            });
        }
    }]);
    return QueryInquirer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvUXVlcnlJbnF1aXJlci5qcyJdLCJuYW1lcyI6WyJpbnF1aXJlciIsInJlcXVpcmUiLCJfZm9sZGVycyIsIldlYWtNYXAiLCJfZmlsZVN5c3RlbSIsIlF1ZXJ5SW5xdWlyZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsInNldCIsImxhbmd1YWdlIiwiX2dldENTaGFycFByb21wdCIsIm5hbWVzcGFjZSIsImdsb2JhbCIsImNyZWF0ZUNTaGFycE5hbWVzcGFjZSIsInByb2Nlc3MiLCJjd2QiLCJnZXROZWFyZXN0Q3Nwcm9qRmlsZSIsImNvbnNvbGUiLCJsb2ciLCJxdWVzdGlvbnMiLCJ0eXBlIiwibmFtZSIsIm1lc3NhZ2UiLCJ3aGVuIiwiYW5zd2VycyIsImdlbmVyYXRlZE5hbWVzcGFjZSIsInByb21wdCIsInRoZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFdBQVdDLFFBQVEsVUFBUixDQUFqQixDLENBUkE7Ozs7OztBQVVBLElBQU1DLFdBQVcsSUFBSUMsT0FBSixFQUFqQjtBQUNBLElBQU1DLGNBQWMsSUFBSUQsT0FBSixFQUFwQjs7SUFFYUUsYSxXQUFBQSxhOztBQUVUOzs7OztBQUtBLDJCQUFZQyxPQUFaLEVBQXFCQyxVQUFyQixFQUFpQztBQUFBOztBQUM3QkwsaUJBQVNNLEdBQVQsQ0FBYSxJQUFiLEVBQW1CRixPQUFuQjtBQUNBRixvQkFBWUksR0FBWixDQUFnQixJQUFoQixFQUFzQkQsVUFBdEI7QUFDSDtBQUNEOzs7Ozs7Ozs7bUNBS1dFLFEsRUFBUztBQUNoQixnQkFBSUEsYUFBYSxRQUFqQixFQUEyQjtBQUN2Qix1QkFBTyxLQUFLQyxnQkFBTCxFQUFQO0FBQ0g7QUFDSjs7OzJDQUVrQjtBQUNmLGdCQUFNQyxZQUFZQyxpQkFBT0MscUJBQVAsQ0FBNkJDLFFBQVFDLEdBQVIsRUFBN0IsRUFBNENILGlCQUFPSSxvQkFBUCxFQUE1QyxDQUFsQjtBQUNBQyxvQkFBUUMsR0FBUixDQUFZUCxTQUFaO0FBQ0EsZ0JBQUlRLFlBQVksQ0FDWjtBQUNJQyxzQkFBTSxPQURWO0FBRUlDLHNCQUFNLE1BRlY7QUFHSUM7QUFISixhQURZLEVBTVo7QUFDSUYsc0JBQU0sU0FEVjtBQUVJQyxzQkFBTSxvQkFGVjtBQUdJQyxnRUFBOENYLFNBQTlDO0FBSEosYUFOWSxFQVdaO0FBQ0lTLHNCQUFNLE9BRFY7QUFFSUMsc0JBQU0sV0FGVjtBQUdJQyx1REFISjtBQUlJQyxzQkFBTSxjQUFTQyxPQUFULEVBQWtCO0FBQ3BCLDJCQUFPLENBQUNBLFFBQVFDLGtCQUFoQjtBQUNIO0FBTkwsYUFYWSxDQUFoQjs7QUFxQkEsbUJBQU96QixTQUFTMEIsTUFBVCxDQUFnQlAsU0FBaEIsRUFDRlEsSUFERSxDQUNHLG1CQUFXO0FBQ2Isb0JBQUlILFFBQVFDLGtCQUFaLEVBQ0lELFFBQVFiLFNBQVIsR0FBb0JBLFNBQXBCOztBQUVKLHVCQUFPYSxPQUFQO0FBQ0gsYUFORSxDQUFQO0FBT0giLCJmaWxlIjoiUXVlcnlJbnF1aXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCdcblxuY29uc3QgaW5xdWlyZXIgPSByZXF1aXJlKCdpbnF1aXJlcicpO1xuXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBjbGFzcyBRdWVyeUlucXVpcmVyIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZvbGRlcnMsIGZpbGVTeXN0ZW0pIHtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGlucXVpcmVyLmpzIHByb21wdCBhbnN3ZXJzIGJhc2VkIG9uIHRoZSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFRoZSBhbnN3ZXJzXG4gICAgICovXG4gICAgcHJvbXB0VXNlcihsYW5ndWFnZSl7XG4gICAgICAgIGlmIChsYW5ndWFnZSA9PT0gJ2NzaGFycCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRDU2hhcnBQcm9tcHQoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2dldENTaGFycFByb21wdCgpIHtcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gZ2xvYmFsLmNyZWF0ZUNTaGFycE5hbWVzcGFjZShwcm9jZXNzLmN3ZCgpLCBnbG9iYWwuZ2V0TmVhcmVzdENzcHJvakZpbGUoKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKG5hbWVzcGFjZSk7XG4gICAgICAgIGxldCBxdWVzdGlvbnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYFdoYXQncyB0aGUgUXVlcnkncyBuYW1lP2BcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvbmZpcm0nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdnZW5lcmF0ZWROYW1lc3BhY2UnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBEbyB5b3Ugd2FudCB0byB1c2UgdGhpcyBuYW1lc3BhY2UgJHtuYW1lc3BhY2V9P2AsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ25hbWVzcGFjZScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYEVudGVyIHRoZSBRdWVyeSdzIG5hbWVzcGFjZWAsXG4gICAgICAgICAgICAgICAgd2hlbjogZnVuY3Rpb24oYW5zd2Vycykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWFuc3dlcnMuZ2VuZXJhdGVkTmFtZXNwYWNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICByZXR1cm4gaW5xdWlyZXIucHJvbXB0KHF1ZXN0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGFuc3dlcnMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhbnN3ZXJzLmdlbmVyYXRlZE5hbWVzcGFjZSlcbiAgICAgICAgICAgICAgICAgICAgYW5zd2Vycy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcnM7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59Il19