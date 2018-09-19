'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InquirerManager = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Folders = require('../Folders');

var _winston = require('winston');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _QueryInquirer = require('./QueryInquirer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var _folders = new WeakMap();
var _fileSystem = new WeakMap();

var InquirerManager = exports.InquirerManager = function () {
    /**
     * Initializes a new instance of {InquirerManager}
     * @param {Folders} folders 
     * @param {fs} fileSystem
     * @param {Logger} logger
     */
    function InquirerManager(folders, fileSystem, logger) {
        (0, _classCallCheck3.default)(this, InquirerManager);

        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        this._logger = logger;

        this._queryInquirer = new _QueryInquirer.QueryInquirer(folders, fileSystem);
    }

    /**
     * Create a query
     * @param {string} language
     * @returns {Promise<any>} 
     */


    (0, _createClass3.default)(InquirerManager, [{
        key: 'promptForQuery',
        value: function promptForQuery(language) {
            return this._queryInquirer.promptUser(language).then(function (context) {
                console.log('context: ', context);
                return context;
            });
        }
    }]);
    return InquirerManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvSW5xdWlyZXJNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9maWxlU3lzdGVtIiwiSW5xdWlyZXJNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwiX3F1ZXJ5SW5xdWlyZXIiLCJRdWVyeUlucXVpcmVyIiwibGFuZ3VhZ2UiLCJwcm9tcHRVc2VyIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJjb250ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBUEE7Ozs7QUFVQSxJQUFNQSxXQUFXLElBQUlDLE9BQUosRUFBakI7QUFDQSxJQUFNQyxjQUFjLElBQUlELE9BQUosRUFBcEI7O0lBSWFFLGUsV0FBQUEsZTtBQUNUOzs7Ozs7QUFNQSw2QkFBWUMsT0FBWixFQUFxQkMsVUFBckIsRUFBaUNDLE1BQWpDLEVBQXlDO0FBQUE7O0FBQ3JDTixpQkFBU08sR0FBVCxDQUFhLElBQWIsRUFBbUJILE9BQW5CO0FBQ0FGLG9CQUFZSyxHQUFaLENBQWdCLElBQWhCLEVBQXNCRixVQUF0QjtBQUNBLGFBQUtHLE9BQUwsR0FBZUYsTUFBZjs7QUFFQSxhQUFLRyxjQUFMLEdBQXNCLElBQUlDLDRCQUFKLENBQWtCTixPQUFsQixFQUEyQkMsVUFBM0IsQ0FBdEI7QUFDSDs7QUFFRDs7Ozs7Ozs7O3VDQUtlTSxRLEVBQVU7QUFDckIsbUJBQU8sS0FBS0YsY0FBTCxDQUFvQkcsVUFBcEIsQ0FBK0JELFFBQS9CLEVBQ0ZFLElBREUsQ0FDRyxtQkFBVztBQUNiQyx3QkFBUUMsR0FBUixDQUFZLFdBQVosRUFBeUJDLE9BQXpCO0FBQ0EsdUJBQU9BLE9BQVA7QUFDSCxhQUpFLENBQVA7QUFLSCIsImZpbGUiOiJJbnF1aXJlck1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG5pbXBvcnQge8KgTG9nZ2VyIH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgUXVlcnlJbnF1aXJlciB9IGZyb20gJy4vUXVlcnlJbnF1aXJlcic7XG5cblxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5cblxuZXhwb3J0IGNsYXNzIElucXVpcmVyTWFuYWdlciB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0lucXVpcmVyTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnMgXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcblxuICAgICAgICB0aGlzLl9xdWVyeUlucXVpcmVyID0gbmV3IFF1ZXJ5SW5xdWlyZXIoZm9sZGVycywgZmlsZVN5c3RlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcXVlcnlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBcbiAgICAgKi9cbiAgICBwcm9tcHRGb3JRdWVyeShsYW5ndWFnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlcnlJbnF1aXJlci5wcm9tcHRVc2VyKGxhbmd1YWdlKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbnRleHQ6ICcsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==