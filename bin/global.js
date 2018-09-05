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

var _BoilerPlatesManager = require('./boilerPlates/BoilerPlatesManager');

var _HttpWrapper = require('./HttpWrapper');

var _Folders = require('./Folders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _configManager = new WeakMap();
var _configParser = new WeakMap();
var _applicationManager = new WeakMap();
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
        _applicationManager.set(this, new _ApplicationManager.ApplicationManager(this.folders, this.configManager, this.logger));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9nbG9iYWwuanMiXSwibmFtZXMiOlsiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIl9mb2xkZXJzIiwiX2dpdCIsIl9sb2dnZXIiLCJfaHR0cFdyYXBwZXIiLCJnbG9iYWwiLCJzZXQiLCJ3aW5zdG9uIiwiY3JlYXRlTG9nZ2VyIiwibGV2ZWwiLCJmb3JtYXQiLCJjb21iaW5lIiwiY29sb3JpemUiLCJzaW1wbGUiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsIkh0dHBXcmFwcGVyIiwiQ29uZmlnUGFyc2VyIiwiQ29uZmlnTWFuYWdlciIsImZzIiwiY29uZmlnUGFyc2VyIiwibG9nZ2VyIiwiZ2l0IiwiY29uZmlnTWFuYWdlciIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiIsImZvckZvbGRlciIsImZvbGRlciIsIkZvbGRlcnMiLCJCb2lsZXJQbGF0ZXNNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJmb2xkZXJzIiwiQXBwbGljYXRpb25NYW5hZ2VyIiwiZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7cWpCQUFBOzs7Ozs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCLElBQUlDLE9BQUosRUFBdkI7QUFDQSxJQUFNQyxnQkFBZ0IsSUFBSUQsT0FBSixFQUF0QjtBQUNBLElBQU1FLHNCQUFzQixJQUFJRixPQUFKLEVBQTVCO0FBQ0EsSUFBTUcsdUJBQXVCLElBQUlILE9BQUosRUFBN0I7QUFDQSxJQUFNSSxXQUFXLElBQUlKLE9BQUosRUFBakI7QUFDQSxJQUFNSyxPQUFPLElBQUlMLE9BQUosRUFBYjtBQUNBLElBQU1NLFVBQVUsSUFBSU4sT0FBSixFQUFoQjtBQUNBLElBQU1PLGVBQWUsSUFBSVAsT0FBSixFQUFyQjs7QUFFQTs7OztJQUdNUSxNOztBQUVGOzs7QUFHQSxzQkFBYztBQUFBOztBQUNWRixnQkFBUUcsR0FBUixDQUFZLElBQVosRUFBa0JDLGtCQUFRQyxZQUFSLENBQXFCO0FBQ25DQyxtQkFBTyxNQUQ0QjtBQUVuQ0Msb0JBQVFILGtCQUFRRyxNQUFSLENBQWVDLE9BQWYsQ0FDSkosa0JBQVFHLE1BQVIsQ0FBZUUsUUFBZixFQURJLEVBRUpMLGtCQUFRRyxNQUFSLENBQWVHLE1BQWYsRUFGSSxDQUYyQjtBQU1uQ0Msd0JBQVksQ0FDUixJQUFJUCxrQkFBUU8sVUFBUixDQUFtQkMsT0FBdkIsRUFEUTtBQU51QixTQUFyQixDQUFsQjs7QUFXQVgscUJBQWFFLEdBQWIsQ0FBaUIsSUFBakIsRUFBdUIsSUFBSVUsd0JBQUosRUFBdkI7O0FBRUFsQixzQkFBY1EsR0FBZCxDQUFrQixJQUFsQixFQUF3QixJQUFJVywwQkFBSixFQUF4QjtBQUNBckIsdUJBQWVVLEdBQWYsQ0FBbUIsSUFBbkIsRUFBeUIsSUFBSVksNEJBQUosQ0FBa0JDLFlBQWxCLEVBQXNCLEtBQUtDLFlBQTNCLEVBQXlDLEtBQUtDLE1BQTlDLENBQXpCOztBQUVBLFlBQUlDLE1BQU0seUJBQVUsS0FBS0MsYUFBTCxDQUFtQkMscUJBQTdCLENBQVY7QUFDQUYsWUFBSUcsU0FBSixHQUFnQixVQUFDQyxNQUFELEVBQVk7QUFDeEIsbUJBQU8seUJBQVVBLE1BQVYsQ0FBUDtBQUNILFNBRkQ7O0FBSUF4QixhQUFLSSxHQUFMLENBQVMsSUFBVCxFQUFlZ0IsR0FBZjtBQUNBckIsaUJBQVNLLEdBQVQsQ0FBYSxJQUFiLEVBQW1CLElBQUlxQixnQkFBSixDQUFZUixZQUFaLENBQW5CO0FBQ0FuQiw2QkFBcUJNLEdBQXJCLENBQXlCLElBQXpCLEVBQStCLElBQUlzQix3Q0FBSixDQUF3QixLQUFLTCxhQUE3QixFQUE0QyxLQUFLTSxXQUFqRCxFQUE4RCxLQUFLUCxHQUFuRSxFQUF3RSxLQUFLUSxPQUE3RSxFQUFzRlgsWUFBdEYsRUFBMEYsS0FBS0UsTUFBL0YsQ0FBL0I7QUFDQXRCLDRCQUFvQk8sR0FBcEIsQ0FBd0IsSUFBeEIsRUFBOEIsSUFBSXlCLHNDQUFKLENBQXVCLEtBQUtELE9BQTVCLEVBQXFDLEtBQUtQLGFBQTFDLEVBQXlELEtBQUtGLE1BQTlELENBQTlCO0FBQ0g7O0FBRUQ7Ozs7Ozs7OzRCQUlvQjtBQUNoQixtQkFBT3pCLGVBQWVvQyxHQUFmLENBQW1CLElBQW5CLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJbUI7QUFDZixtQkFBT2xDLGNBQWNrQyxHQUFkLENBQWtCLElBQWxCLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJYztBQUNWLG1CQUFPL0IsU0FBUytCLEdBQVQsQ0FBYSxJQUFiLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJeUI7QUFDckIsbUJBQU9qQyxvQkFBb0JpQyxHQUFwQixDQUF3QixJQUF4QixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSTBCO0FBQ3RCLG1CQUFPaEMscUJBQXFCZ0MsR0FBckIsQ0FBeUIsSUFBekIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OzRCQUlVO0FBQ04sbUJBQU85QixLQUFLOEIsR0FBTCxDQUFTLElBQVQsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OzRCQUlhO0FBQ1QsbUJBQU83QixRQUFRNkIsR0FBUixDQUFZLElBQVosQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OzRCQUlrQjtBQUNkLG1CQUFPNUIsYUFBYTRCLEdBQWIsQ0FBaUIsSUFBakIsQ0FBUDtBQUNIOzs7Ozs7a0JBR1UsSUFBSTNCLE1BQUosRSIsImZpbGUiOiJnbG9iYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHdpbnN0b24gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgc2ltcGxlR2l0IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgR2l0IH0gZnJvbSAnc2ltcGxlLWdpdCc7XG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0IHsgQ29uZmlnUGFyc2VyIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uL0NvbmZpZ1BhcnNlcic7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbk1hbmFnZXIgfSBmcm9tICcuL2FwcGxpY2F0aW9ucy9BcHBsaWNhdGlvbk1hbmFnZXInO1xuaW1wb3J0IHsgQm9pbGVyUGxhdGVzTWFuYWdlciB9IGZyb20gJy4vYm9pbGVyUGxhdGVzL0JvaWxlclBsYXRlc01hbmFnZXInO1xuaW1wb3J0IHsgSHR0cFdyYXBwZXIgfSBmcm9tICcuL0h0dHBXcmFwcGVyJztcbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuL0ZvbGRlcnMnO1xuXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfY29uZmlnUGFyc2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9hcHBsaWNhdGlvbk1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2JvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfbG9nZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9odHRwV3JhcHBlciA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogQ29tbW9uIGdsb2JhbCBvYmplY3RcbiAqL1xuY2xhc3MgZ2xvYmFsIHtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gaW5pdGlhbGl6YXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgX2xvZ2dlci5zZXQodGhpcywgd2luc3Rvbi5jcmVhdGVMb2dnZXIoe1xuICAgICAgICAgICAgbGV2ZWw6ICdpbmZvJyxcbiAgICAgICAgICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcbiAgICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5jb2xvcml6ZSgpLFxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LnNpbXBsZSgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICAgICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSgpXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pKTtcblxuICAgICAgICBfaHR0cFdyYXBwZXIuc2V0KHRoaXMsIG5ldyBIdHRwV3JhcHBlcigpKTtcbiAgICAgICAgXG4gICAgICAgIF9jb25maWdQYXJzZXIuc2V0KHRoaXMsIG5ldyBDb25maWdQYXJzZXIoKSk7XG4gICAgICAgIF9jb25maWdNYW5hZ2VyLnNldCh0aGlzLCBuZXcgQ29uZmlnTWFuYWdlcihmcywgdGhpcy5jb25maWdQYXJzZXIsIHRoaXMubG9nZ2VyKSk7XG5cbiAgICAgICAgbGV0IGdpdCA9IHNpbXBsZUdpdCh0aGlzLmNvbmZpZ01hbmFnZXIuY2VudHJhbEZvbGRlckxvY2F0aW9uKTtcbiAgICAgICAgZ2l0LmZvckZvbGRlciA9IChmb2xkZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzaW1wbGVHaXQoZm9sZGVyKTtcbiAgICAgICAgfTtcblxuICAgICAgICBfZ2l0LnNldCh0aGlzLCBnaXQpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgbmV3IEZvbGRlcnMoZnMpKTtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIG5ldyBCb2lsZXJQbGF0ZXNNYW5hZ2VyKHRoaXMuY29uZmlnTWFuYWdlciwgdGhpcy5odHRwV3JhcHBlciwgdGhpcy5naXQsIHRoaXMuZm9sZGVycywgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9hcHBsaWNhdGlvbk1hbmFnZXIuc2V0KHRoaXMsIG5ldyBBcHBsaWNhdGlvbk1hbmFnZXIodGhpcy5mb2xkZXJzLCB0aGlzLmNvbmZpZ01hbmFnZXIsIHRoaXMubG9nZ2VyKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0NvbmZpZ01hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0NvbmZpZ01hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvbmZpZ01hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0NvbmZpZ1BhcnNlcn1cbiAgICAgKiBAcmV0dXJucyB7Q29uZmlnUGFyc2VyfVxuICAgICAqL1xuICAgIGdldCBjb25maWdQYXJzZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnUGFyc2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Rm9sZGVyc31cbiAgICAgKiBAcmV0dXJucyB7Rm9sZGVyc31cbiAgICAgKi9cbiAgICBnZXQgZm9sZGVycygpIHtcbiAgICAgICAgcmV0dXJuIF9mb2xkZXJzLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7QXBwbGljYXRpb25NYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGFwcGxpY2F0aW9uTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9hcHBsaWNhdGlvbk1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZXNNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtHaXR9IHN5c3RlbVxuICAgICAqIEByZXR1cm5zIHtHaXR9XG4gICAgICovXG4gICAgZ2V0IGdpdCgpIHtcbiAgICAgICAgcmV0dXJuIF9naXQuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtMb2dnZXJ9XG4gICAgICogQHJldHVybnMge0xvZ2dlcn1cbiAgICAgKi9cbiAgICBnZXQgbG9nZ2VyKCkge8KgXG4gICAgICAgIHJldHVybiBfbG9nZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7SHR0cFdyYXBwZXJ9XG4gICAgICogQHJldHVybnMge0h0dHBXcmFwcGVyfVxuICAgICAqL1xuICAgIGdldCBodHRwV3JhcHBlcigpIHtcbiAgICAgICAgcmV0dXJuIF9odHRwV3JhcHBlci5nZXQodGhpcyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgZ2xvYmFsKCk7Il19