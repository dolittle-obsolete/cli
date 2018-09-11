'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _simpleGit = require('simple-git');

var _simpleGit2 = _interopRequireDefault(_simpleGit);

var _ConfigManager = require('./configuration/ConfigManager');

var _ConfigParser = require('./configuration/ConfigParser');

var _ApplicationManager = require('./applications/ApplicationManager');

var _BoundedContextManager = require('./boundedContexts/BoundedContextManager');

var _BoilerPlatesManager = require('./boilerPlates/BoilerPlatesManager');

var _HttpWrapper = require('./HttpWrapper');

var _Folders = require('./Folders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _configManager = new WeakMap(); /*---------------------------------------------------------------------------------------------
                                     *  Copyright (c) Dolittle. All rights reserved.
                                     *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                     *--------------------------------------------------------------------------------------------*/

var _configParser = new WeakMap();
var _applicationManager = new WeakMap();
var _boundedContextManager = new WeakMap();
var _boilerPlatesManager = new WeakMap();
var _folders = new WeakMap();
var _git = new WeakMap();
var _logger = new WeakMap();
var _httpWrapper = new WeakMap();

/**
 * Common global object
 */

var global = function () {

    /**
     * Perform initialization
     */
    function global() {
        (0, _classCallCheck3.default)(this, global);


        _logger.set(this, _winston2.default.createLogger({
            level: 'info',
            format: _winston2.default.format.combine(_winston2.default.format.colorize(), _winston2.default.format.simple()),
            transports: [new _winston2.default.transports.Console()]
        }));

        _httpWrapper.set(this, new _HttpWrapper.HttpWrapper());

        _configParser.set(this, new _ConfigParser.ConfigParser());
        _configManager.set(this, new _ConfigManager.ConfigManager(_fs2.default, this.configParser, this.logger));

        var git = (0, _simpleGit2.default)(this.configManager.centralFolderLocation);
        git.forFolder = function (folder) {
            return (0, _simpleGit2.default)(folder);
        };

        _git.set(this, git);
        _folders.set(this, new _Folders.Folders(_fs2.default));
        _boilerPlatesManager.set(this, new _BoilerPlatesManager.BoilerPlatesManager(this.configManager, this.httpWrapper, this.git, this.folders, _fs2.default, this.logger));
        _applicationManager.set(this, new _ApplicationManager.ApplicationManager(this.boilerPlatesManager, this.configManager, this.folders, _fs2.default, this.logger));
        _boundedContextManager.set(this, new _BoundedContextManager.BoundedContextManager(this.boilerPlatesManager, this.applicationManager, this.folders, _fs2.default, this.logger));
    }

    /**
     * Gets the {ConfigManager}
     * @returns {ConfigManager}
     */


    (0, _createClass3.default)(global, [{
        key: 'configManager',
        get: function get() {
            return _configManager.get(this);
        }

        /**
         * Gets the {ConfigParser}
         * @returns {ConfigParser}
         */

    }, {
        key: 'configParser',
        get: function get() {
            return _configParser.get(this);
        }

        /**
         * Gets the {Folders}
         * @returns {Folders}
         */

    }, {
        key: 'folders',
        get: function get() {
            return _folders.get(this);
        }

        /**
         * Gets the {ApplicationManager}
         * @returns {ApplicationManager}
         */

    }, {
        key: 'applicationManager',
        get: function get() {
            return _applicationManager.get(this);
        }

        /**
         * Gets the {BoundedContextManager}
         * @returns {BoundedContextManager}
         */

    }, {
        key: 'boundedContextManager',
        get: function get() {
            return _boundedContextManager.get(this);
        }

        /**
         * Gets the {BoilerPlatesManager}
         * @returns {BoilerPlatesManager}
         */

    }, {
        key: 'boilerPlatesManager',
        get: function get() {
            return _boilerPlatesManager.get(this);
        }

        /**
         * Gets the {Git} system
         * @returns {Git}
         */

    }, {
        key: 'git',
        get: function get() {
            return _git.get(this);
        }

        /**
         * Gets the {Logger}
         * @returns {Logger}
         */

    }, {
        key: 'logger',
        get: function get() {
            return _logger.get(this);
        }

        /**
         * Gets the {HttpWrapper}
         * @returns {HttpWrapper}
         */

    }, {
        key: 'httpWrapper',
        get: function get() {
            return _httpWrapper.get(this);
        }
    }]);
    return global;
}();

exports.default = new global();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9nbG9iYWwuanMiXSwibmFtZXMiOlsiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiX2JvaWxlclBsYXRlc01hbmFnZXIiLCJfZm9sZGVycyIsIl9naXQiLCJfbG9nZ2VyIiwiX2h0dHBXcmFwcGVyIiwiZ2xvYmFsIiwic2V0Iiwid2luc3RvbiIsImNyZWF0ZUxvZ2dlciIsImxldmVsIiwiZm9ybWF0IiwiY29tYmluZSIsImNvbG9yaXplIiwic2ltcGxlIiwidHJhbnNwb3J0cyIsIkNvbnNvbGUiLCJIdHRwV3JhcHBlciIsIkNvbmZpZ1BhcnNlciIsIkNvbmZpZ01hbmFnZXIiLCJmcyIsImNvbmZpZ1BhcnNlciIsImxvZ2dlciIsImdpdCIsImNvbmZpZ01hbmFnZXIiLCJjZW50cmFsRm9sZGVyTG9jYXRpb24iLCJmb3JGb2xkZXIiLCJmb2xkZXIiLCJGb2xkZXJzIiwiQm9pbGVyUGxhdGVzTWFuYWdlciIsImh0dHBXcmFwcGVyIiwiZm9sZGVycyIsIkFwcGxpY2F0aW9uTWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJCb3VuZGVkQ29udGV4dE1hbmFnZXIiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsSUFBSUMsT0FBSixFQUF2QixDLENBaEJBOzs7OztBQWlCQSxJQUFNQyxnQkFBZ0IsSUFBSUQsT0FBSixFQUF0QjtBQUNBLElBQU1FLHNCQUFzQixJQUFJRixPQUFKLEVBQTVCO0FBQ0EsSUFBTUcseUJBQXlCLElBQUlILE9BQUosRUFBL0I7QUFDQSxJQUFNSSx1QkFBdUIsSUFBSUosT0FBSixFQUE3QjtBQUNB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SDs7QUFFRDs7Ozs7Ozs0QkFJYTtBQUNULG1CQUFPaEMsUUFBUWdDLEdBQVIsQ0FBWSxJQUFaLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJa0I7QUFDZCxtQkFBTy9CLGFBQWErQixHQUFiLENBQWlCLElBQWpCLENBQVA7QUFDSDs7Ozs7a0JBR1UsSUFBSTlCLE1BQUosRSIsImZpbGUiOiJnbG9iYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHdpbnN0b24gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgc2ltcGxlR2l0IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgR2l0IH0gZnJvbSAnc2ltcGxlLWdpdCc7XG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0IHsgQ29uZmlnUGFyc2VyIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uL0NvbmZpZ1BhcnNlcic7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbk1hbmFnZXIgfSBmcm9tICcuL2FwcGxpY2F0aW9ucy9BcHBsaWNhdGlvbk1hbmFnZXInO1xuaW1wb3J0IHsgQm91bmRlZENvbnRleHRNYW5hZ2VyIH0gZnJvbSAnLi9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyJztcbmltcG9ydCB7IEJvaWxlclBsYXRlc01hbmFnZXIgfSBmcm9tICcuL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCB7IEh0dHBXcmFwcGVyIH0gZnJvbSAnLi9IdHRwV3JhcHBlcic7XG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi9Gb2xkZXJzJztcblxuY29uc3QgX2NvbmZpZ01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2NvbmZpZ1BhcnNlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfYXBwbGljYXRpb25NYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9ib3VuZGVkQ29udGV4dE1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2JvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfbG9nZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9odHRwV3JhcHBlciA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogQ29tbW9uIGdsb2JhbCBvYmplY3RcbiAqL1xuY2xhc3MgZ2xvYmFsIHtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gaW5pdGlhbGl6YXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICBcbiAgICAgICAgX2xvZ2dlci5zZXQodGhpcywgd2luc3Rvbi5jcmVhdGVMb2dnZXIoe1xuICAgICAgICAgICAgbGV2ZWw6ICdpbmZvJyxcbiAgICAgICAgICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcbiAgICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5jb2xvcml6ZSgpLFxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LnNpbXBsZSgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICAgICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSgpXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pKTtcblxuICAgICAgICBfaHR0cFdyYXBwZXIuc2V0KHRoaXMsIG5ldyBIdHRwV3JhcHBlcigpKTtcbiAgICAgICAgXG4gICAgICAgIF9jb25maWdQYXJzZXIuc2V0KHRoaXMsIG5ldyBDb25maWdQYXJzZXIoKSk7XG4gICAgICAgIF9jb25maWdNYW5hZ2VyLnNldCh0aGlzLCBuZXcgQ29uZmlnTWFuYWdlcihmcywgdGhpcy5jb25maWdQYXJzZXIsIHRoaXMubG9nZ2VyKSk7XG5cbiAgICAgICAgbGV0IGdpdCA9IHNpbXBsZUdpdCh0aGlzLmNvbmZpZ01hbmFnZXIuY2VudHJhbEZvbGRlckxvY2F0aW9uKTtcbiAgICAgICAgZ2l0LmZvckZvbGRlciA9IChmb2xkZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzaW1wbGVHaXQoZm9sZGVyKTtcbiAgICAgICAgfTtcblxuICAgICAgICBfZ2l0LnNldCh0aGlzLCBnaXQpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgbmV3IEZvbGRlcnMoZnMpKTtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIG5ldyBCb2lsZXJQbGF0ZXNNYW5hZ2VyKHRoaXMuY29uZmlnTWFuYWdlciwgdGhpcy5odHRwV3JhcHBlciwgdGhpcy5naXQsIHRoaXMuZm9sZGVycywgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9hcHBsaWNhdGlvbk1hbmFnZXIuc2V0KHRoaXMsIG5ldyBBcHBsaWNhdGlvbk1hbmFnZXIodGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmNvbmZpZ01hbmFnZXIsIHRoaXMuZm9sZGVycywgIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBfYm91bmRlZENvbnRleHRNYW5hZ2VyLnNldCh0aGlzLCBuZXcgQm91bmRlZENvbnRleHRNYW5hZ2VyKHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5hcHBsaWNhdGlvbk1hbmFnZXIsIHRoaXMuZm9sZGVycywgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0NvbmZpZ01hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0NvbmZpZ01hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvbmZpZ01hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0NvbmZpZ1BhcnNlcn1cbiAgICAgKiBAcmV0dXJucyB7Q29uZmlnUGFyc2VyfVxuICAgICAqL1xuICAgIGdldCBjb25maWdQYXJzZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnUGFyc2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Rm9sZGVyc31cbiAgICAgKiBAcmV0dXJucyB7Rm9sZGVyc31cbiAgICAgKi9cbiAgICBnZXQgZm9sZGVycygpIHtcbiAgICAgICAgcmV0dXJuIF9mb2xkZXJzLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7QXBwbGljYXRpb25NYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGFwcGxpY2F0aW9uTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9hcHBsaWNhdGlvbk1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtCb3VuZGVkQ29udGV4dE1hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0JvdW5kZWRDb250ZXh0TWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYm91bmRlZENvbnRleHRNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2JvdW5kZWRDb250ZXh0TWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0JvaWxlclBsYXRlc01hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlc01hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGJvaWxlclBsYXRlc01hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0dpdH0gc3lzdGVtXG4gICAgICogQHJldHVybnMge0dpdH1cbiAgICAgKi9cbiAgICBnZXQgZ2l0KCkge1xuICAgICAgICByZXR1cm4gX2dpdC5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0xvZ2dlcn1cbiAgICAgKiBAcmV0dXJucyB7TG9nZ2VyfVxuICAgICAqL1xuICAgIGdldCBsb2dnZXIoKSB7wqBcbiAgICAgICAgcmV0dXJuIF9sb2dnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtIdHRwV3JhcHBlcn1cbiAgICAgKiBAcmV0dXJucyB7SHR0cFdyYXBwZXJ9XG4gICAgICovXG4gICAgZ2V0IGh0dHBXcmFwcGVyKCkge1xuICAgICAgICByZXR1cm4gX2h0dHBXcmFwcGVyLmdldCh0aGlzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBnbG9iYWwoKTsiXX0=