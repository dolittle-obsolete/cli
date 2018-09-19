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
                return context;
            });
        }
    }]);
    return InquirerManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvSW5xdWlyZXJNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9maWxlU3lzdGVtIiwiSW5xdWlyZXJNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwiX3F1ZXJ5SW5xdWlyZXIiLCJRdWVyeUlucXVpcmVyIiwibGFuZ3VhZ2UiLCJwcm9tcHRVc2VyIiwidGhlbiIsImNvbnRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFQQTs7OztBQVVBLElBQU1BLFdBQVcsSUFBSUMsT0FBSixFQUFqQjtBQUNBLElBQU1DLGNBQWMsSUFBSUQsT0FBSixFQUFwQjs7SUFJYUUsZSxXQUFBQSxlO0FBQ1Q7Ozs7OztBQU1BLDZCQUFZQyxPQUFaLEVBQXFCQyxVQUFyQixFQUFpQ0MsTUFBakMsRUFBeUM7QUFBQTs7QUFDckNOLGlCQUFTTyxHQUFULENBQWEsSUFBYixFQUFtQkgsT0FBbkI7QUFDQUYsb0JBQVlLLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JGLFVBQXRCO0FBQ0EsYUFBS0csT0FBTCxHQUFlRixNQUFmOztBQUVBLGFBQUtHLGNBQUwsR0FBc0IsSUFBSUMsNEJBQUosQ0FBa0JOLE9BQWxCLEVBQTJCQyxVQUEzQixDQUF0QjtBQUNIOztBQUVEOzs7Ozs7Ozs7dUNBS2VNLFEsRUFBVTtBQUNyQixtQkFBTyxLQUFLRixjQUFMLENBQW9CRyxVQUFwQixDQUErQkQsUUFBL0IsRUFDRkUsSUFERSxDQUNHLG1CQUFXO0FBQ2IsdUJBQU9DLE9BQVA7QUFDSCxhQUhFLENBQVA7QUFJSCIsImZpbGUiOiJJbnF1aXJlck1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG5pbXBvcnQge8KgTG9nZ2VyIH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgUXVlcnlJbnF1aXJlciB9IGZyb20gJy4vUXVlcnlJbnF1aXJlcic7XG5cblxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5cblxuZXhwb3J0IGNsYXNzIElucXVpcmVyTWFuYWdlciB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0lucXVpcmVyTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnMgXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcblxuICAgICAgICB0aGlzLl9xdWVyeUlucXVpcmVyID0gbmV3IFF1ZXJ5SW5xdWlyZXIoZm9sZGVycywgZmlsZVN5c3RlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcXVlcnlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBcbiAgICAgKi9cbiAgICBwcm9tcHRGb3JRdWVyeShsYW5ndWFnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlcnlJbnF1aXJlci5wcm9tcHRVc2VyKGxhbmd1YWdlKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59Il19