'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QueryforInquirer = undefined;

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

var QueryforInquirer = exports.QueryforInquirer = function () {

    /**
     * Constructor
     * @param {Folders} folders
     * @param {fs} fileSystem
     */
    function QueryforInquirer(folders, fileSystem) {
        (0, _classCallCheck3.default)(this, QueryforInquirer);

        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
    }
    /**
     * Gets the inquirer.js prompt answers based on the language
     * @param {String} language
     * @returns {Promise<any>} The answers
     */


    (0, _createClass3.default)(QueryforInquirer, [{
        key: 'promptUser',
        value: function promptUser(language) {
            if (language === 'csharp') {
                return this._getCSharpPrompt();
            }
        }
    }, {
        key: '_getCSharpPrompt',
        value: function _getCSharpPrompt() {
            var customReadModel = 'Write read model name';
            var namespace = _global2.default.createCSharpNamespace(process.cwd(), _global2.default.getNearestCsprojFile());
            console.log(namespace);

            var readModelChoices = this._findCSharpReadmodels();
            readModelChoices.push(customReadModel);
            var questions = [{
                type: 'input',
                name: 'name',
                message: 'What\'s the Query\'s name?'
            }, {
                type: 'rawlist',
                name: 'readModel',
                message: 'Choose a read model: ',
                choices: readModelChoices
            }, {
                type: 'input',
                name: 'readModelCustom',
                message: 'Write the name of the read model: ',
                when: function when(answers) {
                    return answers.readModel === customReadModel;
                }
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
                if (answers.readModelCustom !== undefined && answers.readModelCustom !== null) answers.readModel = answers.readModelCustom;

                console.log(answers);
                return answers;
            });
        }
        /**
         * Finds and returns the names of the public readModels
         * @returns [string[]]
         */

    }, {
        key: '_findCSharpReadmodels',
        value: function _findCSharpReadmodels() {
            var _this = this;

            var filePaths = _folders.get(this).searchRecursive(process.cwd(), '.cs');
            var readModels = [];
            filePaths.forEach(function (filePath) {
                console.log(filePath);
                var content = _fileSystem.get(_this).readFileSync(filePath, 'utf8');
                var readModelNameMatch = content.match(/.*public\s*class\s*(\w*)\s*:\s*IReadModel/);
                if (readModelNameMatch !== null && readModelNameMatch.length > 0) {
                    readModels.push(readModelNameMatch[1]);
                }
            });
            return readModels;
        }
    }]);
    return QueryforInquirer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvUXVlcnlmb3JJbnF1aXJlci5qcyJdLCJuYW1lcyI6WyJpbnF1aXJlciIsInJlcXVpcmUiLCJfZm9sZGVycyIsIldlYWtNYXAiLCJfZmlsZVN5c3RlbSIsIlF1ZXJ5Zm9ySW5xdWlyZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsInNldCIsImxhbmd1YWdlIiwiX2dldENTaGFycFByb21wdCIsImN1c3RvbVJlYWRNb2RlbCIsIm5hbWVzcGFjZSIsImdsb2JhbCIsImNyZWF0ZUNTaGFycE5hbWVzcGFjZSIsInByb2Nlc3MiLCJjd2QiLCJnZXROZWFyZXN0Q3Nwcm9qRmlsZSIsImNvbnNvbGUiLCJsb2ciLCJyZWFkTW9kZWxDaG9pY2VzIiwiX2ZpbmRDU2hhcnBSZWFkbW9kZWxzIiwicHVzaCIsInF1ZXN0aW9ucyIsInR5cGUiLCJuYW1lIiwibWVzc2FnZSIsImNob2ljZXMiLCJ3aGVuIiwiYW5zd2VycyIsInJlYWRNb2RlbCIsImdlbmVyYXRlZE5hbWVzcGFjZSIsInByb21wdCIsInRoZW4iLCJyZWFkTW9kZWxDdXN0b20iLCJ1bmRlZmluZWQiLCJmaWxlUGF0aHMiLCJnZXQiLCJzZWFyY2hSZWN1cnNpdmUiLCJyZWFkTW9kZWxzIiwiZm9yRWFjaCIsImZpbGVQYXRoIiwiY29udGVudCIsInJlYWRGaWxlU3luYyIsInJlYWRNb2RlbE5hbWVNYXRjaCIsIm1hdGNoIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxXQUFXQyxRQUFRLFVBQVIsQ0FBakIsQyxDQVJBOzs7Ozs7QUFVQSxJQUFNQyxXQUFXLElBQUlDLE9BQUosRUFBakI7QUFDQSxJQUFNQyxjQUFjLElBQUlELE9BQUosRUFBcEI7O0lBRWFFLGdCLFdBQUFBLGdCOztBQUVUOzs7OztBQUtBLDhCQUFZQyxPQUFaLEVBQXFCQyxVQUFyQixFQUFpQztBQUFBOztBQUM3QkwsaUJBQVNNLEdBQVQsQ0FBYSxJQUFiLEVBQW1CRixPQUFuQjtBQUNBRixvQkFBWUksR0FBWixDQUFnQixJQUFoQixFQUFzQkQsVUFBdEI7QUFDSDtBQUNEOzs7Ozs7Ozs7bUNBS1dFLFEsRUFBUztBQUNoQixnQkFBSUEsYUFBYSxRQUFqQixFQUEyQjtBQUN2Qix1QkFBTyxLQUFLQyxnQkFBTCxFQUFQO0FBQ0g7QUFDSjs7OzJDQUVrQjtBQUNmLGdCQUFNQyxrQkFBa0IsdUJBQXhCO0FBQ0EsZ0JBQU1DLFlBQVlDLGlCQUFPQyxxQkFBUCxDQUE2QkMsUUFBUUMsR0FBUixFQUE3QixFQUE0Q0gsaUJBQU9JLG9CQUFQLEVBQTVDLENBQWxCO0FBQ0FDLG9CQUFRQyxHQUFSLENBQVlQLFNBQVo7O0FBRUEsZ0JBQUlRLG1CQUFtQixLQUFLQyxxQkFBTCxFQUF2QjtBQUNBRCw2QkFBaUJFLElBQWpCLENBQXNCWCxlQUF0QjtBQUNBLGdCQUFJWSxZQUFZLENBQ1o7QUFDSUMsc0JBQU0sT0FEVjtBQUVJQyxzQkFBTSxNQUZWO0FBR0lDO0FBSEosYUFEWSxFQU1aO0FBQ0lGLHNCQUFNLFNBRFY7QUFFSUMsc0JBQU0sV0FGVjtBQUdJQyx5QkFBUyx1QkFIYjtBQUlJQyx5QkFBU1A7QUFKYixhQU5ZLEVBWVo7QUFDSUksc0JBQU0sT0FEVjtBQUVJQyxzQkFBTSxpQkFGVjtBQUdJQyx5QkFBUyxvQ0FIYjtBQUlJRSxzQkFBTSxjQUFTQyxPQUFULEVBQWtCO0FBQ3BCLDJCQUFPQSxRQUFRQyxTQUFSLEtBQXNCbkIsZUFBN0I7QUFDSDtBQU5MLGFBWlksRUFvQlo7QUFDSWEsc0JBQU0sU0FEVjtBQUVJQyxzQkFBTSxvQkFGVjtBQUdJQyxnRUFBOENkLFNBQTlDO0FBSEosYUFwQlksRUF5Qlo7QUFDSVksc0JBQU0sT0FEVjtBQUVJQyxzQkFBTSxXQUZWO0FBR0lDLHVEQUhKO0FBSUlFLHNCQUFNLGNBQVNDLE9BQVQsRUFBa0I7QUFDcEIsMkJBQU8sQ0FBQ0EsUUFBUUUsa0JBQWhCO0FBQ0g7QUFOTCxhQXpCWSxDQUFoQjs7QUFtQ0EsbUJBQU8vQixTQUFTZ0MsTUFBVCxDQUFnQlQsU0FBaEIsRUFDRlUsSUFERSxDQUNHLG1CQUFXO0FBQ2Isb0JBQUlKLFFBQVFFLGtCQUFaLEVBQ0lGLFFBQVFqQixTQUFSLEdBQW9CQSxTQUFwQjtBQUNKLG9CQUFJaUIsUUFBUUssZUFBUixLQUE0QkMsU0FBNUIsSUFBeUNOLFFBQVFLLGVBQVIsS0FBNEIsSUFBekUsRUFDSUwsUUFBUUMsU0FBUixHQUFvQkQsUUFBUUssZUFBNUI7O0FBRUpoQix3QkFBUUMsR0FBUixDQUFZVSxPQUFaO0FBQ0EsdUJBQU9BLE9BQVA7QUFDSCxhQVRFLENBQVA7QUFVSDtBQUNEOzs7Ozs7O2dEQUl3QjtBQUFBOztBQUNwQixnQkFBSU8sWUFBWWxDLFNBQVNtQyxHQUFULENBQWEsSUFBYixFQUFtQkMsZUFBbkIsQ0FBbUN2QixRQUFRQyxHQUFSLEVBQW5DLEVBQWtELEtBQWxELENBQWhCO0FBQ0EsZ0JBQUl1QixhQUFhLEVBQWpCO0FBQ0FILHNCQUFVSSxPQUFWLENBQWtCLG9CQUFZO0FBQzFCdEIsd0JBQVFDLEdBQVIsQ0FBWXNCLFFBQVo7QUFDQSxvQkFBSUMsVUFBVXRDLFlBQVlpQyxHQUFaLENBQWdCLEtBQWhCLEVBQXNCTSxZQUF0QixDQUFtQ0YsUUFBbkMsRUFBNkMsTUFBN0MsQ0FBZDtBQUNBLG9CQUFNRyxxQkFBcUJGLFFBQVFHLEtBQVIsQ0FBYywyQ0FBZCxDQUEzQjtBQUNBLG9CQUFJRCx1QkFBdUIsSUFBdkIsSUFBK0JBLG1CQUFtQkUsTUFBbkIsR0FBNEIsQ0FBL0QsRUFBaUU7QUFDN0RQLCtCQUFXakIsSUFBWCxDQUFnQnNCLG1CQUFtQixDQUFuQixDQUFoQjtBQUNIO0FBQ0osYUFQRDtBQVFBLG1CQUFPTCxVQUFQO0FBQ0giLCJmaWxlIjoiUXVlcnlmb3JJbnF1aXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCdcblxuY29uc3QgaW5xdWlyZXIgPSByZXF1aXJlKCdpbnF1aXJlcicpO1xuXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBjbGFzcyBRdWVyeWZvcklucXVpcmVyIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZvbGRlcnMsIGZpbGVTeXN0ZW0pIHtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGlucXVpcmVyLmpzIHByb21wdCBhbnN3ZXJzIGJhc2VkIG9uIHRoZSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFRoZSBhbnN3ZXJzXG4gICAgICovXG4gICAgcHJvbXB0VXNlcihsYW5ndWFnZSl7XG4gICAgICAgIGlmIChsYW5ndWFnZSA9PT0gJ2NzaGFycCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRDU2hhcnBQcm9tcHQoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2dldENTaGFycFByb21wdCgpIHtcbiAgICAgICAgY29uc3QgY3VzdG9tUmVhZE1vZGVsID0gJ1dyaXRlIHJlYWQgbW9kZWwgbmFtZSc7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IGdsb2JhbC5jcmVhdGVDU2hhcnBOYW1lc3BhY2UocHJvY2Vzcy5jd2QoKSwgZ2xvYmFsLmdldE5lYXJlc3RDc3Byb2pGaWxlKCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhuYW1lc3BhY2UpO1xuXG4gICAgICAgIGxldCByZWFkTW9kZWxDaG9pY2VzID0gdGhpcy5fZmluZENTaGFycFJlYWRtb2RlbHMoKTtcbiAgICAgICAgcmVhZE1vZGVsQ2hvaWNlcy5wdXNoKGN1c3RvbVJlYWRNb2RlbCk7XG4gICAgICAgIGxldCBxdWVzdGlvbnMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnbmFtZScsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYFdoYXQncyB0aGUgUXVlcnkncyBuYW1lP2BcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3Jhd2xpc3QnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdyZWFkTW9kZWwnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdDaG9vc2UgYSByZWFkIG1vZGVsOiAnLFxuICAgICAgICAgICAgICAgIGNob2ljZXM6IHJlYWRNb2RlbENob2ljZXNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAncmVhZE1vZGVsQ3VzdG9tJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnV3JpdGUgdGhlIG5hbWUgb2YgdGhlIHJlYWQgbW9kZWw6ICcsXG4gICAgICAgICAgICAgICAgd2hlbjogZnVuY3Rpb24oYW5zd2Vycykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2Vycy5yZWFkTW9kZWwgPT09IGN1c3RvbVJlYWRNb2RlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdjb25maXJtJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnZ2VuZXJhdGVkTmFtZXNwYWNlJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgRG8geW91IHdhbnQgdG8gdXNlIHRoaXMgbmFtZXNwYWNlICR7bmFtZXNwYWNlfT9gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICduYW1lc3BhY2UnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBFbnRlciB0aGUgUXVlcnkncyBuYW1lc3BhY2VgLFxuICAgICAgICAgICAgICAgIHdoZW46IGZ1bmN0aW9uKGFuc3dlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFhbnN3ZXJzLmdlbmVyYXRlZE5hbWVzcGFjZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgcmV0dXJuIGlucXVpcmVyLnByb21wdChxdWVzdGlvbnMpXG4gICAgICAgICAgICAudGhlbihhbnN3ZXJzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYW5zd2Vycy5nZW5lcmF0ZWROYW1lc3BhY2UpXG4gICAgICAgICAgICAgICAgICAgIGFuc3dlcnMubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICAgICAgICAgICAgICAgIGlmIChhbnN3ZXJzLnJlYWRNb2RlbEN1c3RvbSAhPT0gdW5kZWZpbmVkICYmIGFuc3dlcnMucmVhZE1vZGVsQ3VzdG9tICE9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBhbnN3ZXJzLnJlYWRNb2RlbCA9IGFuc3dlcnMucmVhZE1vZGVsQ3VzdG9tO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYW5zd2Vycyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuc3dlcnM7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmluZHMgYW5kIHJldHVybnMgdGhlIG5hbWVzIG9mIHRoZSBwdWJsaWMgcmVhZE1vZGVsc1xuICAgICAqIEByZXR1cm5zIFtzdHJpbmdbXV1cbiAgICAgKi9cbiAgICBfZmluZENTaGFycFJlYWRtb2RlbHMoKSB7XG4gICAgICAgIGxldCBmaWxlUGF0aHMgPSBfZm9sZGVycy5nZXQodGhpcykuc2VhcmNoUmVjdXJzaXZlKHByb2Nlc3MuY3dkKCksICcuY3MnKTtcbiAgICAgICAgbGV0IHJlYWRNb2RlbHMgPSBbXTtcbiAgICAgICAgZmlsZVBhdGhzLmZvckVhY2goZmlsZVBhdGggPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZVBhdGgpO1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmOCcpO1xuICAgICAgICAgICAgY29uc3QgcmVhZE1vZGVsTmFtZU1hdGNoID0gY29udGVudC5tYXRjaCgvLipwdWJsaWNcXHMqY2xhc3NcXHMqKFxcdyopXFxzKjpcXHMqSVJlYWRNb2RlbC8pO1xuICAgICAgICAgICAgaWYgKHJlYWRNb2RlbE5hbWVNYXRjaCAhPT0gbnVsbCAmJiByZWFkTW9kZWxOYW1lTWF0Y2gubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgcmVhZE1vZGVscy5wdXNoKHJlYWRNb2RlbE5hbWVNYXRjaFsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVhZE1vZGVscztcbiAgICB9XG59Il19