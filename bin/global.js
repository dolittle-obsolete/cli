'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*---------------------------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) Dolittle. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *--------------------------------------------------------------------------------------------*/


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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _configManager = new WeakMap();
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
        _classCallCheck(this, global);

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


    _createClass(global, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9nbG9iYWwuanMiXSwibmFtZXMiOlsiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiX2JvaWxlclBsYXRlc01hbmFnZXIiLCJfZm9sZGVycyIsIl9naXQiLCJfbG9nZ2VyIiwiX2h0dHBXcmFwcGVyIiwiZ2xvYmFsIiwic2V0Iiwid2luc3RvbiIsImNyZWF0ZUxvZ2dlciIsImxldmVsIiwiZm9ybWF0IiwiY29tYmluZSIsImNvbG9yaXplIiwic2ltcGxlIiwidHJhbnNwb3J0cyIsIkNvbnNvbGUiLCJIdHRwV3JhcHBlciIsIkNvbmZpZ1BhcnNlciIsIkNvbmZpZ01hbmFnZXIiLCJmcyIsImNvbmZpZ1BhcnNlciIsImxvZ2dlciIsImdpdCIsImNvbmZpZ01hbmFnZXIiLCJjZW50cmFsRm9sZGVyTG9jYXRpb24iLCJmb3JGb2xkZXIiLCJmb2xkZXIiLCJGb2xkZXJzIiwiQm9pbGVyUGxhdGVzTWFuYWdlciIsImh0dHBXcmFwcGVyIiwiZm9sZGVycyIsIkFwcGxpY2F0aW9uTWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJCb3VuZGVkQ29udGV4dE1hbmFnZXIiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7OztxakJBQUE7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsSUFBSUMsT0FBSixFQUF2QjtBQUNBLElBQU1DLGdCQUFnQixJQUFJRCxPQUFKLEVBQXRCO0FBQ0EsSUFBTUUsc0JBQXNCLElBQUlGLE9BQUosRUFBNUI7QUFDQSxJQUFNRyx5QkFBeUIsSUFBSUgsT0FBSixFQUEvQjtBQUNBLElBQU1JLHVCQUF1QixJQUFJSixPQUFKLEVBQTdCO0FBQ0EsSUFBTUss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Ozs7Ozs7NEJBSWE7QUFDVCxtQkFBT2hDLFFBQVFnQyxHQUFSLENBQVksSUFBWixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSWtCO0FBQ2QsbUJBQU8vQixhQUFhK0IsR0FBYixDQUFpQixJQUFqQixDQUFQO0FBQ0g7Ozs7OztrQkFHVSxJQUFJOUIsTUFBSixFIiwiZmlsZSI6Imdsb2JhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgd2luc3RvbiBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBzaW1wbGVHaXQgZnJvbSAnc2ltcGxlLWdpdCc7XG5pbXBvcnQgeyBHaXQgfSBmcm9tICdzaW1wbGUtZ2l0JztcbmltcG9ydCB7IENvbmZpZ01hbmFnZXIgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XG5pbXBvcnQgeyBDb25maWdQYXJzZXIgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24vQ29uZmlnUGFyc2VyJztcbmltcG9ydCB7IEFwcGxpY2F0aW9uTWFuYWdlciB9IGZyb20gJy4vYXBwbGljYXRpb25zL0FwcGxpY2F0aW9uTWFuYWdlcic7XG5pbXBvcnQgeyBCb3VuZGVkQ29udGV4dE1hbmFnZXIgfSBmcm9tICcuL2JvdW5kZWRDb250ZXh0cy9Cb3VuZGVkQ29udGV4dE1hbmFnZXInO1xuaW1wb3J0IHsgQm9pbGVyUGxhdGVzTWFuYWdlciB9IGZyb20gJy4vYm9pbGVyUGxhdGVzL0JvaWxlclBsYXRlc01hbmFnZXInO1xuaW1wb3J0IHsgSHR0cFdyYXBwZXIgfSBmcm9tICcuL0h0dHBXcmFwcGVyJztcbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuL0ZvbGRlcnMnO1xuXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfY29uZmlnUGFyc2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9hcHBsaWNhdGlvbk1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2JvdW5kZWRDb250ZXh0TWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZ2l0ID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9sb2dnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2h0dHBXcmFwcGVyID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBDb21tb24gZ2xvYmFsIG9iamVjdFxuICovXG5jbGFzcyBnbG9iYWwge1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBpbml0aWFsaXphdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBfbG9nZ2VyLnNldCh0aGlzLCB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7XG4gICAgICAgICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LmNvbG9yaXplKCksXG4gICAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuc2ltcGxlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgICAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKClcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIF9odHRwV3JhcHBlci5zZXQodGhpcywgbmV3IEh0dHBXcmFwcGVyKCkpO1xuICAgICAgICBcbiAgICAgICAgX2NvbmZpZ1BhcnNlci5zZXQodGhpcywgbmV3IENvbmZpZ1BhcnNlcigpKTtcbiAgICAgICAgX2NvbmZpZ01hbmFnZXIuc2V0KHRoaXMsIG5ldyBDb25maWdNYW5hZ2VyKGZzLCB0aGlzLmNvbmZpZ1BhcnNlciwgdGhpcy5sb2dnZXIpKTtcblxuICAgICAgICBsZXQgZ2l0ID0gc2ltcGxlR2l0KHRoaXMuY29uZmlnTWFuYWdlci5jZW50cmFsRm9sZGVyTG9jYXRpb24pO1xuICAgICAgICBnaXQuZm9yRm9sZGVyID0gKGZvbGRlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNpbXBsZUdpdChmb2xkZXIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIF9naXQuc2V0KHRoaXMsIGdpdCk7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBuZXcgRm9sZGVycyhmcykpO1xuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5zZXQodGhpcywgbmV3IEJvaWxlclBsYXRlc01hbmFnZXIodGhpcy5jb25maWdNYW5hZ2VyLCB0aGlzLmh0dHBXcmFwcGVyLCB0aGlzLmdpdCwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2FwcGxpY2F0aW9uTWFuYWdlci5zZXQodGhpcywgbmV3IEFwcGxpY2F0aW9uTWFuYWdlcih0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuY29uZmlnTWFuYWdlciwgdGhpcy5mb2xkZXJzLCAgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuc2V0KHRoaXMsIG5ldyBCb3VuZGVkQ29udGV4dE1hbmFnZXIodGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmFwcGxpY2F0aW9uTWFuYWdlciwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Q29uZmlnTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7Q29uZmlnTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgY29uZmlnTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Q29uZmlnUGFyc2VyfVxuICAgICAqIEByZXR1cm5zIHtDb25maWdQYXJzZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvbmZpZ1BhcnNlcigpIHtcbiAgICAgICAgcmV0dXJuIF9jb25maWdQYXJzZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtGb2xkZXJzfVxuICAgICAqIEByZXR1cm5zIHtGb2xkZXJzfVxuICAgICAqL1xuICAgIGdldCBmb2xkZXJzKCkge1xuICAgICAgICByZXR1cm4gX2ZvbGRlcnMuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0FwcGxpY2F0aW9uTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYXBwbGljYXRpb25NYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2FwcGxpY2F0aW9uTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0JvdW5kZWRDb250ZXh0TWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7Qm91bmRlZENvbnRleHRNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBib3VuZGVkQ29udGV4dE1hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfYm91bmRlZENvbnRleHRNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVzTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7R2l0fSBzeXN0ZW1cbiAgICAgKiBAcmV0dXJucyB7R2l0fVxuICAgICAqL1xuICAgIGdldCBnaXQoKSB7XG4gICAgICAgIHJldHVybiBfZ2l0LmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7TG9nZ2VyfVxuICAgICAqIEByZXR1cm5zIHtMb2dnZXJ9XG4gICAgICovXG4gICAgZ2V0IGxvZ2dlcigpIHvCoFxuICAgICAgICByZXR1cm4gX2xvZ2dlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0h0dHBXcmFwcGVyfVxuICAgICAqIEByZXR1cm5zIHtIdHRwV3JhcHBlcn1cbiAgICAgKi9cbiAgICBnZXQgaHR0cFdyYXBwZXIoKSB7XG4gICAgICAgIHJldHVybiBfaHR0cFdyYXBwZXIuZ2V0KHRoaXMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IGdsb2JhbCgpOyJdfQ==