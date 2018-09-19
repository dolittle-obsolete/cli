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

var _QueryforInquirer = require('./QueryforInquirer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _folders = new WeakMap(); /*---------------------------------------------------------------------------------------------
                               *  Copyright (c) Dolittle. All rights reserved.
                               *  Licensed under the MIT License. See LICENSE in the project root for license information.
                               *--------------------------------------------------------------------------------------------*/

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
        this._queryforInquirer = new _QueryforInquirer.QueryforInquirer(folders, fileSystem);
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
        /**
         * Create a query a read model
         * @param {string} language
         * @returns {Promise<any>} 
         */

    }, {
        key: 'promptForQueryfor',
        value: function promptForQueryfor(language) {
            return this._queryforInquirer.promptUser(language).then(function (context) {
                return context;
            });
        }
    }]);
    return InquirerManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvSW5xdWlyZXJNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9maWxlU3lzdGVtIiwiSW5xdWlyZXJNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwiX3F1ZXJ5SW5xdWlyZXIiLCJRdWVyeUlucXVpcmVyIiwiX3F1ZXJ5Zm9ySW5xdWlyZXIiLCJRdWVyeWZvcklucXVpcmVyIiwibGFuZ3VhZ2UiLCJwcm9tcHRVc2VyIiwidGhlbiIsImNvbnRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFHQSxJQUFNQSxXQUFXLElBQUlDLE9BQUosRUFBakIsQyxDQVhBOzs7OztBQVlBLElBQU1DLGNBQWMsSUFBSUQsT0FBSixFQUFwQjs7SUFJYUUsZSxXQUFBQSxlO0FBQ1Q7Ozs7OztBQU1BLDZCQUFZQyxPQUFaLEVBQXFCQyxVQUFyQixFQUFpQ0MsTUFBakMsRUFBeUM7QUFBQTs7QUFDckNOLGlCQUFTTyxHQUFULENBQWEsSUFBYixFQUFtQkgsT0FBbkI7QUFDQUYsb0JBQVlLLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JGLFVBQXRCO0FBQ0EsYUFBS0csT0FBTCxHQUFlRixNQUFmOztBQUVBLGFBQUtHLGNBQUwsR0FBc0IsSUFBSUMsNEJBQUosQ0FBa0JOLE9BQWxCLEVBQTJCQyxVQUEzQixDQUF0QjtBQUNBLGFBQUtNLGlCQUFMLEdBQXlCLElBQUlDLGtDQUFKLENBQXFCUixPQUFyQixFQUE4QkMsVUFBOUIsQ0FBekI7QUFDSDs7QUFFRDs7Ozs7Ozs7O3VDQUtlUSxRLEVBQVU7QUFDckIsbUJBQU8sS0FBS0osY0FBTCxDQUFvQkssVUFBcEIsQ0FBK0JELFFBQS9CLEVBQ0ZFLElBREUsQ0FDRyxtQkFBVztBQUNiLHVCQUFPQyxPQUFQO0FBQ0gsYUFIRSxDQUFQO0FBSUg7QUFDRDs7Ozs7Ozs7MENBS2tCSCxRLEVBQVU7QUFDeEIsbUJBQU8sS0FBS0YsaUJBQUwsQ0FBdUJHLFVBQXZCLENBQWtDRCxRQUFsQyxFQUNGRSxJQURFLENBQ0csbUJBQVc7QUFDYix1QkFBT0MsT0FBUDtBQUNILGFBSEUsQ0FBUDtBQUlIIiwiZmlsZSI6IklucXVpcmVyTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCB7wqBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBRdWVyeUlucXVpcmVyIH0gZnJvbSAnLi9RdWVyeUlucXVpcmVyJztcbmltcG9ydCB7IFF1ZXJ5Zm9ySW5xdWlyZXIgfSBmcm9tICcuL1F1ZXJ5Zm9ySW5xdWlyZXInO1xuXG5cbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcblxuXG5cbmV4cG9ydCBjbGFzcyBJbnF1aXJlck1hbmFnZXIge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtJbnF1aXJlck1hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzIFxuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG5cbiAgICAgICAgdGhpcy5fcXVlcnlJbnF1aXJlciA9IG5ldyBRdWVyeUlucXVpcmVyKGZvbGRlcnMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLl9xdWVyeWZvcklucXVpcmVyID0gbmV3IFF1ZXJ5Zm9ySW5xdWlyZXIoZm9sZGVycywgZmlsZVN5c3RlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcXVlcnlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBcbiAgICAgKi9cbiAgICBwcm9tcHRGb3JRdWVyeShsYW5ndWFnZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlcnlJbnF1aXJlci5wcm9tcHRVc2VyKGxhbmd1YWdlKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcXVlcnkgYSByZWFkIG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gXG4gICAgICovXG4gICAgcHJvbXB0Rm9yUXVlcnlmb3IobGFuZ3VhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXJ5Zm9ySW5xdWlyZXIucHJvbXB0VXNlcihsYW5ndWFnZSlcbiAgICAgICAgICAgIC50aGVuKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==