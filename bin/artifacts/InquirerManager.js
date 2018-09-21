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

var _EventProcessorInquirer = require('./EventProcessorInquirer');

var _CommandHandlerInquirer = require('./CommandHandlerInquirer');

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
        this._commandHandlerInquirer = new _CommandHandlerInquirer.CommandHandlerInquirer(folders, fileSystem);
        this._aggregateRootInquirer = new _AggregateRootInquirer.AggregateRootInquirer(folders, fileSystem);
        this._eventInquirer = new _EventInquirer.EventInquirer(folders, fileSystem);
        this._eventProcessorInquirer = new _EventProcessorInquirer.EventProcessorInquirer(folders, fileSystem);
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
         * Create a command handler
         * @param {any} flags
         * @returns {Promise<any>} 
         */

    }, {
        key: 'promptForCommandHandler',
        value: function promptForCommandHandler(flags) {
            return this._commandHandlerInquirer.promptUser(flags).then(function (context) {
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
         * Create an event processor
         * @param {any} flags
         * @returns {Promise<any>} 
         */

    }, {
        key: 'promptForEventProcessor',
        value: function promptForEventProcessor(flags) {
            return this._eventProcessorInquirer.promptUser(flags).then(function (context) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvSW5xdWlyZXJNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9mb2xkZXJzIiwiV2Vha01hcCIsIl9maWxlU3lzdGVtIiwiSW5xdWlyZXJNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwiX3F1ZXJ5SW5xdWlyZXIiLCJRdWVyeUlucXVpcmVyIiwiX3F1ZXJ5Zm9ySW5xdWlyZXIiLCJRdWVyeWZvcklucXVpcmVyIiwiX2NvbW1hbmRJbnF1aXJlciIsIkNvbW1hbmRJbnF1aXJlciIsIl9jb21tYW5kSGFuZGxlcklucXVpcmVyIiwiQ29tbWFuZEhhbmRsZXJJbnF1aXJlciIsIl9hZ2dyZWdhdGVSb290SW5xdWlyZXIiLCJBZ2dyZWdhdGVSb290SW5xdWlyZXIiLCJfZXZlbnRJbnF1aXJlciIsIkV2ZW50SW5xdWlyZXIiLCJfZXZlbnRQcm9jZXNzb3JJbnF1aXJlciIsIkV2ZW50UHJvY2Vzc29ySW5xdWlyZXIiLCJfcmVhZE1vZGVsSW5xdWlyZXIiLCJSZWFkTW9kZWxJbnF1aXJlciIsImZsYWdzIiwicHJvbXB0VXNlciIsInRoZW4iLCJjb250ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBR0EsSUFBTUEsV0FBVyxJQUFJQyxPQUFKLEVBQWpCLEMsQ0FqQkE7Ozs7O0FBa0JBLElBQU1DLGNBQWMsSUFBSUQsT0FBSixFQUFwQjs7SUFJYUUsZSxXQUFBQSxlO0FBQ1Q7Ozs7OztBQU1BLDZCQUFZQyxPQUFaLEVBQXFCQyxVQUFyQixFQUFpQ0MsTUFBakMsRUFBeUM7QUFBQTs7QUFDckNOLGlCQUFTTyxHQUFULENBQWEsSUFBYixFQUFtQkgsT0FBbkI7QUFDQUYsb0JBQVlLLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JGLFVBQXRCO0FBQ0EsYUFBS0csT0FBTCxHQUFlRixNQUFmOztBQUVBLGFBQUtHLGNBQUwsR0FBc0IsSUFBSUMsNEJBQUosQ0FBa0JOLE9BQWxCLEVBQTJCQyxVQUEzQixDQUF0QjtBQUNBLGFBQUtNLGlCQUFMLEdBQXlCLElBQUlDLGtDQUFKLENBQXFCUixPQUFyQixFQUE4QkMsVUFBOUIsQ0FBekI7QUFDQSxhQUFLUSxnQkFBTCxHQUF3QixJQUFJQyxnQ0FBSixDQUFvQlYsT0FBcEIsRUFBNkJDLFVBQTdCLENBQXhCO0FBQ0EsYUFBS1UsdUJBQUwsR0FBK0IsSUFBSUMsOENBQUosQ0FBMkJaLE9BQTNCLEVBQW9DQyxVQUFwQyxDQUEvQjtBQUNBLGFBQUtZLHNCQUFMLEdBQThCLElBQUlDLDRDQUFKLENBQTBCZCxPQUExQixFQUFtQ0MsVUFBbkMsQ0FBOUI7QUFDQSxhQUFLYyxjQUFMLEdBQXNCLElBQUlDLDRCQUFKLENBQWtCaEIsT0FBbEIsRUFBMkJDLFVBQTNCLENBQXRCO0FBQ0EsYUFBS2dCLHVCQUFMLEdBQStCLElBQUlDLDhDQUFKLENBQTJCbEIsT0FBM0IsRUFBb0NDLFVBQXBDLENBQS9CO0FBQ0EsYUFBS2tCLGtCQUFMLEdBQTBCLElBQUlDLG9DQUFKLENBQXNCcEIsT0FBdEIsRUFBK0JDLFVBQS9CLENBQTFCO0FBRUg7QUFDRDs7Ozs7Ozs7O3lDQUtpQm9CLEssRUFBTztBQUNwQixtQkFBTyxLQUFLWixnQkFBTCxDQUFzQmEsVUFBdEIsQ0FBaUNELEtBQWpDLEVBQ0ZFLElBREUsQ0FDRyxtQkFBVztBQUNiLHVCQUFPQyxPQUFQO0FBQ0gsYUFIRSxDQUFQO0FBSUg7QUFDRDs7Ozs7Ozs7Z0RBS3dCSCxLLEVBQU87QUFDM0IsbUJBQU8sS0FBS1YsdUJBQUwsQ0FBNkJXLFVBQTdCLENBQXdDRCxLQUF4QyxFQUNGRSxJQURFLENBQ0csbUJBQVc7QUFDYix1QkFBT0MsT0FBUDtBQUNILGFBSEUsQ0FBUDtBQUlIO0FBQ0Q7Ozs7Ozs7OytDQUt1QkgsSyxFQUFPO0FBQzFCLG1CQUFPLEtBQUtSLHNCQUFMLENBQTRCUyxVQUE1QixDQUF1Q0QsS0FBdkMsRUFDRkUsSUFERSxDQUNHLG1CQUFXO0FBQ2IsdUJBQU9DLE9BQVA7QUFDSCxhQUhFLENBQVA7QUFJSDtBQUNEOzs7Ozs7Ozt1Q0FLZUgsSyxFQUFPO0FBQ2xCLG1CQUFPLEtBQUtOLGNBQUwsQ0FBb0JPLFVBQXBCLENBQStCRCxLQUEvQixFQUNGRSxJQURFLENBQ0csbUJBQVc7QUFDYix1QkFBT0MsT0FBUDtBQUNILGFBSEUsQ0FBUDtBQUlIO0FBQ0Q7Ozs7Ozs7O2dEQUt3QkgsSyxFQUFPO0FBQzNCLG1CQUFPLEtBQUtKLHVCQUFMLENBQTZCSyxVQUE3QixDQUF3Q0QsS0FBeEMsRUFDRkUsSUFERSxDQUNHLG1CQUFXO0FBQ2IsdUJBQU9DLE9BQVA7QUFDSCxhQUhFLENBQVA7QUFJSDtBQUNEOzs7Ozs7OzsyQ0FLbUJILEssRUFBTztBQUN0QixtQkFBTyxLQUFLRixrQkFBTCxDQUF3QkcsVUFBeEIsQ0FBbUNELEtBQW5DLEVBQ0ZFLElBREUsQ0FDRyxtQkFBVztBQUNiLHVCQUFPQyxPQUFQO0FBQ0gsYUFIRSxDQUFQO0FBSUg7QUFDRDs7Ozs7Ozs7dUNBS2VILEssRUFBTztBQUNsQixtQkFBTyxLQUFLaEIsY0FBTCxDQUFvQmlCLFVBQXBCLENBQStCRCxLQUEvQixFQUNGRSxJQURFLENBQ0csbUJBQVc7QUFDYix1QkFBT0MsT0FBUDtBQUNILGFBSEUsQ0FBUDtBQUlIO0FBQ0Q7Ozs7Ozs7OzBDQUtrQkgsSyxFQUFPO0FBQ3JCLG1CQUFPLEtBQUtkLGlCQUFMLENBQXVCZSxVQUF2QixDQUFrQ0QsS0FBbEMsRUFDRkUsSUFERSxDQUNHLG1CQUFXO0FBQ2IsdUJBQU9DLE9BQVA7QUFDSCxhQUhFLENBQVA7QUFJSCIsImZpbGUiOiJJbnF1aXJlck1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG5pbXBvcnQge8KgTG9nZ2VyIH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgUXVlcnlJbnF1aXJlciB9IGZyb20gJy4vUXVlcnlJbnF1aXJlcic7XG5pbXBvcnQgeyBRdWVyeWZvcklucXVpcmVyIH0gZnJvbSAnLi9RdWVyeWZvcklucXVpcmVyJztcbmltcG9ydCB7IENvbW1hbmRJbnF1aXJlciB9IGZyb20gJy4vQ29tbWFuZElucXVpcmVyJztcbmltcG9ydCB7IEFnZ3JlZ2F0ZVJvb3RJbnF1aXJlciB9IGZyb20gJy4vQWdncmVnYXRlUm9vdElucXVpcmVyJztcbmltcG9ydCB7IEV2ZW50SW5xdWlyZXIgfSBmcm9tICcuL0V2ZW50SW5xdWlyZXInO1xuaW1wb3J0IHsgUmVhZE1vZGVsSW5xdWlyZXIgfSBmcm9tICcuL1JlYWRNb2RlbElucXVpcmVyJztcbmltcG9ydCB7IEV2ZW50UHJvY2Vzc29ySW5xdWlyZXIgfSBmcm9tICcuL0V2ZW50UHJvY2Vzc29ySW5xdWlyZXInO1xuaW1wb3J0IHsgQ29tbWFuZEhhbmRsZXJJbnF1aXJlciB9IGZyb20gJy4vQ29tbWFuZEhhbmRsZXJJbnF1aXJlcic7XG5cblxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5cblxuZXhwb3J0IGNsYXNzIElucXVpcmVyTWFuYWdlciB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0lucXVpcmVyTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnMgXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcblxuICAgICAgICB0aGlzLl9xdWVyeUlucXVpcmVyID0gbmV3IFF1ZXJ5SW5xdWlyZXIoZm9sZGVycywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX3F1ZXJ5Zm9ySW5xdWlyZXIgPSBuZXcgUXVlcnlmb3JJbnF1aXJlcihmb2xkZXJzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fY29tbWFuZElucXVpcmVyID0gbmV3IENvbW1hbmRJbnF1aXJlcihmb2xkZXJzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fY29tbWFuZEhhbmRsZXJJbnF1aXJlciA9IG5ldyBDb21tYW5kSGFuZGxlcklucXVpcmVyKGZvbGRlcnMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLl9hZ2dyZWdhdGVSb290SW5xdWlyZXIgPSBuZXcgQWdncmVnYXRlUm9vdElucXVpcmVyKGZvbGRlcnMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLl9ldmVudElucXVpcmVyID0gbmV3IEV2ZW50SW5xdWlyZXIoZm9sZGVycywgZmlsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMuX2V2ZW50UHJvY2Vzc29ySW5xdWlyZXIgPSBuZXcgRXZlbnRQcm9jZXNzb3JJbnF1aXJlcihmb2xkZXJzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgdGhpcy5fcmVhZE1vZGVsSW5xdWlyZXIgPSBuZXcgUmVhZE1vZGVsSW5xdWlyZXIoZm9sZGVycywgZmlsZVN5c3RlbSk7XG4gICAgICAgIFxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjb21tYW5kXG4gICAgICogQHBhcmFtIHthbnl9IGZsYWdzXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gXG4gICAgICovXG4gICAgcHJvbXB0Rm9yQ29tbWFuZChmbGFncykge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZElucXVpcmVyLnByb21wdFVzZXIoZmxhZ3MpXG4gICAgICAgICAgICAudGhlbihjb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjb21tYW5kIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3NcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBcbiAgICAgKi9cbiAgICBwcm9tcHRGb3JDb21tYW5kSGFuZGxlcihmbGFncykge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tbWFuZEhhbmRsZXJJbnF1aXJlci5wcm9tcHRVc2VyKGZsYWdzKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGFnZ3JlZ2F0ZSByb290XG4gICAgICogQHBhcmFtIHthbnl9IGZsYWdzXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gXG4gICAgICovXG4gICAgcHJvbXB0Rm9yQWdncmVnYXRlUm9vdChmbGFncykge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWdncmVnYXRlUm9vdElucXVpcmVyLnByb21wdFVzZXIoZmxhZ3MpXG4gICAgICAgICAgICAudGhlbihjb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gZXZlbnRcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3NcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBcbiAgICAgKi9cbiAgICBwcm9tcHRGb3JFdmVudChmbGFncykge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRJbnF1aXJlci5wcm9tcHRVc2VyKGZsYWdzKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGV2ZW50IHByb2Nlc3NvclxuICAgICAqIEBwYXJhbSB7YW55fSBmbGFnc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFxuICAgICAqL1xuICAgIHByb21wdEZvckV2ZW50UHJvY2Vzc29yKGZsYWdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudFByb2Nlc3NvcklucXVpcmVyLnByb21wdFVzZXIoZmxhZ3MpXG4gICAgICAgICAgICAudGhlbihjb250ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSByZWFkIG1vZGVsXG4gICAgICogQHBhcmFtIHthbnl9IGZsYWdzXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gXG4gICAgICovXG4gICAgcHJvbXB0Rm9yUmVhZE1vZGVsKGZsYWdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkTW9kZWxJbnF1aXJlci5wcm9tcHRVc2VyKGZsYWdzKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcXVlcnlcbiAgICAgKiBAcGFyYW0ge2FueX0gZmxhZ3NcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBcbiAgICAgKi9cbiAgICBwcm9tcHRGb3JRdWVyeShmbGFncykge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlcnlJbnF1aXJlci5wcm9tcHRVc2VyKGZsYWdzKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcXVlcnkgYSByZWFkIG1vZGVsXG4gICAgICogQHBhcmFtIHthbnl9IGZsYWdzXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gXG4gICAgICovXG4gICAgcHJvbXB0Rm9yUXVlcnlmb3IoZmxhZ3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXJ5Zm9ySW5xdWlyZXIucHJvbXB0VXNlcihmbGFncylcbiAgICAgICAgICAgIC50aGVuKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==