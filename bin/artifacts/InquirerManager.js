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

var _CommandInquirer = require('./CommandInquirer');

var _AggregateRootInquirer = require('./AggregateRootInquirer');

var _EventInquirer = require('./EventInquirer');

var _ReadModelInquirer = require('./ReadModelInquirer');

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
        this._commandInquirer = new _CommandInquirer.CommandInquirer(folders, fileSystem);
        this._aggregateRootInquirer = new _AggregateRootInquirer.AggregateRootInquirer(folders, fileSystem);
        this._eventInquirer = new _EventInquirer.EventInquirer(folders, fileSystem);
        this._readModelInquirer = new _ReadModelInquirer.ReadModelInquirer(folders, fileSystem);
    }
    /**
     * Create a command
     * @param {any} flags
     * @returns {Promise<any>} 
     */


    (0, _createClass3.default)(InquirerManager, [{
        key: 'promptForCommand',
        value: function promptForCommand(flags) {
            return this._commandInquirer.promptUser(flags).then(function (context) {
                return context;
            });
        }
        /**
         * Create an aggregate root
         * @param {any} flags
         * @returns {Promise<any>} 
         */

    }, {
        key: 'promptForAggregateRoot',
        value: function promptForAggregateRoot(flags) {
            return this._aggregateRootInquirer.promptUser(flags).then(function (context) {
                return context;
            });
        }
        /**
         * Create an event
         * @param {any} flags
         * @returns {Promise<any>} 
         */

    }, {
        key: 'promptForEvent',
        value: function promptForEvent(flags) {
            return this._eventInquirer.promptUser(flags).then(function (context) {
                return context;
            });
        }
        /**
         * Create a read model
         * @param {any} flags
         * @returns {Promise<any>} 
         */

    }, {
        key: 'promptForReadModel',
        value: function promptForReadModel(flags) {
            return this._readModelInquirer.promptUser(flags).then(function (context) {
                return context;
            });
        }
        /**
         * Create a query
         * @param {any} flags
         * @returns {Promise<any>} 
         */

    }, {
        key: 'promptForQuery',
        value: function promptForQuery(flags) {
            return this._queryInquirer.promptUser(flags).then(function (context) {
                return context;
            });
        }
        /**
         * Create a query a read model
         * @param {any} flags
         * @returns {Promise<any>} 
         */

    }, {
        key: 'promptForQueryfor',
        value: function promptForQueryfor(flags) {
            return this._queryforInquirer.promptUser(flags).then(function (context) {
                return context;
            });
        }
    }]);
    return InquirerManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvSW5xdWlyZXJNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9maWxlU3lzdGVtIiwiSW5xdWlyZXJNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwiX3F1ZXJ5SW5xdWlyZXIiLCJRdWVyeUlucXVpcmVyIiwiX3F1ZXJ5Zm9ySW5xdWlyZXIiLCJRdWVyeWZvcklucXVpcmVyIiwiX2NvbW1hbmRJbnF1aXJlciIsIkNvbW1hbmRJbnF1aXJlciIsIl9hZ2dyZWdhdGVSb290SW5xdWlyZXIiLCJBZ2dyZWdhdGVSb290SW5xdWlyZXIiLCJfZXZlbnRJbnF1aXJlciIsIkV2ZW50SW5xdWlyZXIiLCJfcmVhZE1vZGVsSW5xdWlyZXIiLCJSZWFkTW9kZWxJbnF1aXJlciIsImZsYWdzIiwicHJvbXB0VXNlciIsInRoZW4iLCJjb250ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBR0EsSUFBTUEsV0FBVyxJQUFJQyxPQUFKLEVBQWpCLEMsQ0FmQTs7Ozs7QUFnQkEsSUFBTUMsY0FBYyxJQUFJRCxPQUFKLEVBQXBCOztJQUlhRSxlLFdBQUFBLGU7QUFDVDs7Ozs7O0FBTUEsNkJBQVlDLE9BQVosRUFBcUJDLFVBQXJCLEVBQWlDQyxNQUFqQyxFQUF5QztBQUFBOztBQUNyQ04saUJBQVNPLEdBQVQsQ0FBYSxJQUFiLEVBQW1CSCxPQUFuQjtBQUNBRixvQkFBWUssR0FBWixDQUFnQixJQUFoQixFQUFzQkYsVUFBdEI7QUFDQSxhQUFLRyxPQUFMLEdBQWVGLE1BQWY7O0FBRUEsYUFBS0csY0FBTCxHQUFzQixJQUFJQyw0QkFBSixDQUFrQk4sT0FBbEIsRUFBMkJDLFVBQTNCLENBQXRCO0FBQ0EsYUFBS00saUJBQUwsR0FBeUIsSUFBSUMsa0NBQUosQ0FBcUJSLE9BQXJCLEVBQThCQyxVQUE5QixDQUF6QjtBQUNBLGFBQUtRLGdCQUFMLEdBQXdCLElBQUlDLGdDQUFKLENBQW9CVixPQUFwQixFQUE2QkMsVUFBN0IsQ0FBeEI7QUFDQSxhQUFLVSxzQkFBTCxHQUE4QixJQUFJQyw0Q0FBSixDQUEwQlosT0FBMUIsRUFBbUNDLFVBQW5DLENBQTlCO0FBQ0EsYUFBS1ksY0FBTCxHQUFzQixJQUFJQyw0QkFBSixDQUFrQmQsT0FBbEIsRUFBMkJDLFVBQTNCLENBQXRCO0FBQ0EsYUFBS2Msa0JBQUwsR0FBMEIsSUFBSUMsb0NBQUosQ0FBc0JoQixPQUF0QixFQUErQkMsVUFBL0IsQ0FBMUI7QUFDSDtBQUNEOzs7Ozs7Ozs7eUNBS2lCZ0IsSyxFQUFPO0FBQ3BCLG1CQUFPLEtBQUtSLGdCQUFMLENBQXNCUyxVQUF0QixDQUFpQ0QsS0FBakMsRUFDRkUsSUFERSxDQUNHLG1CQUFXO0FBQ2IsdUJBQU9DLE9BQVA7QUFDSCxhQUhFLENBQVA7QUFJSDtBQUNEOzs7Ozs7OzsrQ0FLdUJILEssRUFBTztBQUMxQixtQkFBTyxLQUFLTixzQkFBTCxDQUE0Qk8sVUFBNUIsQ0FBdUNELEtBQXZDLEVBQ0ZFLElBREUsQ0FDRyxtQkFBVztBQUNiLHVCQUFPQyxPQUFQO0FBQ0gsYUFIRSxDQUFQO0FBSUg7QUFDRDs7Ozs7Ozs7dUNBS2VILEssRUFBTztBQUNsQixtQkFBTyxLQUFLSixjQUFMLENBQW9CSyxVQUFwQixDQUErQkQsS0FBL0IsRUFDRkUsSUFERSxDQUNHLG1CQUFXO0FBQ2IsdUJBQU9DLE9BQVA7QUFDSCxhQUhFLENBQVA7QUFJSDtBQUNEOzs7Ozs7OzsyQ0FLbUJILEssRUFBTztBQUN0QixtQkFBTyxLQUFLRixrQkFBTCxDQUF3QkcsVUFBeEIsQ0FBbUNELEtBQW5DLEVBQ0ZFLElBREUsQ0FDRyxtQkFBVztBQUNiLHVCQUFPQyxPQUFQO0FBQ0gsYUFIRSxDQUFQO0FBSUg7QUFDRDs7Ozs7Ozs7dUNBS2VILEssRUFBTztBQUNsQixtQkFBTyxLQUFLWixjQUFMLENBQW9CYSxVQUFwQixDQUErQkQsS0FBL0IsRUFDRkUsSUFERSxDQUNHLG1CQUFXO0FBQ2IsdUJBQU9DLE9BQVA7QUFDSCxhQUhFLENBQVA7QUFJSDtBQUNEOzs7Ozs7OzswQ0FLa0JILEssRUFBTztBQUNyQixtQkFBTyxLQUFLVixpQkFBTCxDQUF1QlcsVUFBdkIsQ0FBa0NELEtBQWxDLEVBQ0ZFLElBREUsQ0FDRyxtQkFBVztBQUNiLHVCQUFPQyxPQUFQO0FBQ0gsYUFIRSxDQUFQO0FBSUgiLCJmaWxlIjoiSW5xdWlyZXJNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IHvCoExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IFF1ZXJ5SW5xdWlyZXIgfSBmcm9tICcuL1F1ZXJ5SW5xdWlyZXInO1xuaW1wb3J0IHsgUXVlcnlmb3JJbnF1aXJlciB9IGZyb20gJy4vUXVlcnlmb3JJbnF1aXJlcic7XG5pbXBvcnQgeyBDb21tYW5kSW5xdWlyZXIgfSBmcm9tICcuL0NvbW1hbmRJbnF1aXJlcic7XG5pbXBvcnQgeyBBZ2dyZWdhdGVSb290SW5xdWlyZXIgfSBmcm9tICcuL0FnZ3JlZ2F0ZVJvb3RJbnF1aXJlcic7XG5pbXBvcnQgeyBFdmVudElucXVpcmVyIH0gZnJvbSAnLi9FdmVudElucXVpcmVyJztcbmltcG9ydCB7IFJlYWRNb2RlbElucXVpcmVyIH0gZnJvbSAnLi9SZWFkTW9kZWxJbnF1aXJlcic7XG5cblxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5cblxuZXhwb3J0IGNsYXNzIElucXVpcmVyTWFuYWdlciB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0lucXVpcmVyTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnMgXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcblxuICAgICAgICB0aGlzLl9xdWVyeUlucXVpcmVyID0gbmV3IFF1ZXJ5SW5xdWlyZXIoZm9sZGVycywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX3F1ZXJ5Zm9ySW5xdWlyZXIgPSBuZXcgUXVlcnlmb3JJbnF1aXJlcihmb2xkZXJzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fY29tbWFuZElucXVpcmVyID0gbmV3IENvbW1hbmRJbnF1aXJlcihmb2xkZXJzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fYWdncmVnYXRlUm9vdElucXVpcmVyID0gbmV3IEFnZ3JlZ2F0ZVJvb3RJbnF1aXJlcihmb2xkZXJzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fZXZlbnRJbnF1aXJlciA9IG5ldyBFdmVudElucXVpcmVyKGZvbGRlcnMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLl9yZWFkTW9kZWxJbnF1aXJlciA9IG5ldyBSZWFkTW9kZWxJbnF1aXJlcihmb2xkZXJzLCBmaWxlU3lzdGVtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY29tbWFuZFxuICAgICAqIEBwYXJhbSB7YW55fSBmbGFnc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFxuICAgICAqL1xuICAgIHByb21wdEZvckNvbW1hbmQoZmxhZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbW1hbmRJbnF1aXJlci5wcm9tcHRVc2VyKGZsYWdzKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGFnZ3JlZ2F0ZSByb290XG4gICAgICogQHBhcmFtIHthbnl9IGZsYWdzXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gXG4gICAgICovXG4gICAgcHJvbXB0Rm9yQWdncmVnYXRlUm9vdChmbGFncykge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWdncmVnYXRlUm9vdElucXVpcmVyLnByb21wdFVzZXIoZmxhZ3MpXG4gICAgICAgICAgICAudGhlbihjb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gZXZlbnRcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3NcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBcbiAgICAgKi9cbiAgICBwcm9tcHRGb3JFdmVudChmbGFncykge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRJbnF1aXJlci5wcm9tcHRVc2VyKGZsYWdzKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcmVhZCBtb2RlbFxuICAgICAqIEBwYXJhbSB7YW55fSBmbGFnc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFxuICAgICAqL1xuICAgIHByb21wdEZvclJlYWRNb2RlbChmbGFncykge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZE1vZGVsSW5xdWlyZXIucHJvbXB0VXNlcihmbGFncylcbiAgICAgICAgICAgIC50aGVuKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHF1ZXJ5XG4gICAgICogQHBhcmFtIHthbnl9IGZsYWdzXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gXG4gICAgICovXG4gICAgcHJvbXB0Rm9yUXVlcnkoZmxhZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXJ5SW5xdWlyZXIucHJvbXB0VXNlcihmbGFncylcbiAgICAgICAgICAgIC50aGVuKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHF1ZXJ5IGEgcmVhZCBtb2RlbFxuICAgICAqIEBwYXJhbSB7YW55fSBmbGFnc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFxuICAgICAqL1xuICAgIHByb21wdEZvclF1ZXJ5Zm9yKGZsYWdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeWZvcklucXVpcmVyLnByb21wdFVzZXIoZmxhZ3MpXG4gICAgICAgICAgICAudGhlbihjb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn0iXX0=