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

var _ArtifactsManager = require('./artifacts/ArtifactsManager');

var _InquirerManager = require('./artifacts/InquirerManager');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var _configManager = new WeakMap();
var _configParser = new WeakMap();
var _applicationManager = new WeakMap();
var _artifactsManager = new WeakMap();
var _boundedContextManager = new WeakMap();
var _boilerPlatesManager = new WeakMap();
var _inquirerManager = new WeakMap();

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
        _inquirerManager.set(this, new _InquirerManager.InquirerManager(this.folders, _fs2.default, this.logger));
        _artifactsManager.set(this, new _ArtifactsManager.ArtifactsManager(this.inquirerManager, this.boilerPlatesManager, this.folders, _fs2.default, this.logger));
    }

    /**
     * Gets the {ConfigManager}
     * @returns {ConfigManager}
     */


    (0, _createClass3.default)(global, [{
        key: 'createCSharpNamespace',

        /**
         * Gets the namespace based on the closest csprojPath and the cwd path
         * @param {String} currentPath 
         * @param {String} csprojPath 
         * @returns {String}
         */
        value: function createCSharpNamespace(currentPath, csprojPath) {
            var csprojFileName = _path2.default.parse(this.getFileName(csprojPath)).name;
            var csprojFileDir = this.getFileName(this.getFileDir(csprojPath));
            var namespaceSegments = [];

            var segmentPath = currentPath;
            var segment = this.getFileName(segmentPath);

            while (segment != csprojFileDir) {
                namespaceSegments.push(segment);
                segmentPath = this.getFileDir(segmentPath);
                segment = this.getFileName(segmentPath);
            }
            namespaceSegments = namespaceSegments.reverse();

            var namespace = csprojFileName;
            namespaceSegments.forEach(function (element) {
                namespace += '.' + element;
            });
            return namespace;
        }
        /**
         * Gets the path of the nearest .csproj file, searching upwards not recursively
         */

    }, {
        key: 'getNearestBoundedContextConfig',
        value: function getNearestBoundedContextConfig() {
            var currentPath = process.cwd();
            var lastPathSepIndex = this.getLastPathSeparatorIndex(currentPath);
            while (lastPathSepIndex != -1 && currentPath != null && currentPath != '') {
                var results = _folders.get(this).searchFolder(currentPath, 'bounded-context.json');
                if (results.length >= 1) return results[0];
                currentPath = currentPath.substr(0, lastPathSepIndex);
                lastPathSepIndex = this.getLastPathSeparatorIndex(currentPath);
            }
            return '';
        }
        /**
         * Gets the path of the nearest .csproj file, searching upwards not recursively
         */

    }, {
        key: 'getNearestCsprojFile',
        value: function getNearestCsprojFile() {
            var currentPath = process.cwd();
            var lastPathSepIndex = this.getLastPathSeparatorIndex(currentPath);
            while (lastPathSepIndex != -1 && currentPath != null && currentPath != '') {
                var results = _folders.get(this).searchFolder(currentPath, '.csproj');
                if (results.length >= 1) return results[0];
                currentPath = currentPath.substr(0, lastPathSepIndex);
                lastPathSepIndex = this.getLastPathSeparatorIndex(currentPath);
            }
            return '';
        }

        /**
         * Get the index of the last path separator in the path
         * @param {String} filePath 
         * @returns {number} index
         */

    }, {
        key: 'getLastPathSeparatorIndex',
        value: function getLastPathSeparatorIndex(filePath) {
            var lastPathSeparatorMatch = filePath.match(/(\\|\/)/);
            if (lastPathSeparatorMatch === undefined || lastPathSeparatorMatch === null || lastPathSeparatorMatch.length == 0) return -1;
            return filePath.lastIndexOf(lastPathSeparatorMatch[lastPathSeparatorMatch.length - 1]);
        }
        /**
         * Gets the filename / last directory from the path
         * @param {String} filePath 
         */

    }, {
        key: 'getFileName',
        value: function getFileName(filePath) {
            return filePath.substring(this.getLastPathSeparatorIndex(filePath) + 1, filePath.length);
        }
        /**
         * Gets the directory name
         * @param {String} filePath 
         */

    }, {
        key: 'getFileDir',
        value: function getFileDir(filePath) {
            return _path2.default.dirname(filePath);
        }
    }, {
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
         * Gets the {ArtifactsManager}
         * @returns {ArtifactsManager}
         */

    }, {
        key: 'artifactsManager',
        get: function get() {
            return _artifactsManager.get(this);
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
         * Gets the {InquirerManager
         * @returns {InquirerManager}}
         */

    }, {
        key: 'inquirerManager',
        get: function get() {
            return _inquirerManager.get(this);
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
    }, {
        key: 'usagePrefix',
        get: function get() {
            return '\n\t ';
        }
    }]);
    return global;
}();

exports.default = new global();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9nbG9iYWwuanMiXSwibmFtZXMiOlsiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfYXJ0aWZhY3RzTWFuYWdlciIsIl9ib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIl9pbnF1aXJlck1hbmFnZXIiLCJfZm9sZGVycyIsIl9naXQiLCJfbG9nZ2VyIiwiX2h0dHBXcmFwcGVyIiwiZ2xvYmFsIiwic2V0Iiwid2luc3RvbiIsImNyZWF0ZUxvZ2dlciIsImxldmVsIiwiZm9ybWF0IiwiY29tYmluZSIsImNvbG9yaXplIiwic2ltcGxlIiwidHJhbnNwb3J0cyIsIkNvbnNvbGUiLCJIdHRwV3JhcHBlciIsIkNvbmZpZ1BhcnNlciIsIkNvbmZpZ01hbmFnZXIiLCJmcyIsImNvbmZpZ1BhcnNlciIsImxvZ2dlciIsImdpdCIsImNvbmZpZ01hbmFnZXIiLCJjZW50cmFsRm9sZGVyTG9jYXRpb24iLCJmb3JGb2xkZXIiLCJmb2xkZXIiLCJGb2xkZXJzIiwiQm9pbGVyUGxhdGVzTWFuYWdlciIsImh0dHBXcmFwcGVyIiwiZm9sZGVycyIsIkFwcGxpY2F0aW9uTWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJCb3VuZGVkQ29udGV4dE1hbmFnZXIiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJJbnF1aXJlck1hbmFnZXIiLCJBcnRpZmFjdHNNYW5hZ2VyIiwiaW5xdWlyZXJNYW5hZ2VyIiwiY3VycmVudFBhdGgiLCJjc3Byb2pQYXRoIiwiY3Nwcm9qRmlsZU5hbWUiLCJwYXRoIiwicGFyc2UiLCJnZXRGaWxlTmFtZSIsIm5hbWUiLCJjc3Byb2pGaWxlRGlyIiwiZ2V0RmlsZURpciIsIm5hbWVzcGFjZVNlZ21lbnRzIiwic2VnbWVudFBhdGgiLCJzZWdtZW50IiwicHVzaCIsInJldmVyc2UiLCJuYW1lc3BhY2UiLCJmb3JFYWNoIiwiZWxlbWVudCIsInByb2Nlc3MiLCJjd2QiLCJsYXN0UGF0aFNlcEluZGV4IiwiZ2V0TGFzdFBhdGhTZXBhcmF0b3JJbmRleCIsInJlc3VsdHMiLCJnZXQiLCJzZWFyY2hGb2xkZXIiLCJsZW5ndGgiLCJzdWJzdHIiLCJmaWxlUGF0aCIsImxhc3RQYXRoU2VwYXJhdG9yTWF0Y2giLCJtYXRjaCIsInVuZGVmaW5lZCIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwiZGlybmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBakJBOzs7O0FBbUJBLElBQU1BLGlCQUFpQixJQUFJQyxPQUFKLEVBQXZCO0FBQ0EsSUFBTUMsZ0JBQWdCLElBQUlELE9BQUosRUFBdEI7QUFDQSxJQUFNRSxzQkFBc0IsSUFBSUYsT0FBSixFQUE1QjtBQUNBLElBQU1HLG9CQUFvQixJQUFJSCxPQUFKLEVBQTFCO0FBQ0EsSUFBTUkseUJBQXlCLElBQUlKLE9BQUosRUFBL0I7QUFDQSxJQUFNSyx1QkFBdUIsSUFBSUwsT0FBSixFQUE3QjtBQUNBLElBQU1NLG1CQUFtQixJQUFJTixPQUFKLEVBQXpCOztBQUVBLElBQU1PLFdBQVcsSUFBSVAsT0FBSixFQUFqQjtBQUNBLElBQU1RLE9BQU8sSUFBSVIsT0FBSixFQUFiO0FBQ0EsSUFBTVMsVUFBVSxJQUFJVCxPQUFKLEVBQWhCO0FBQ0EsSUFBTVUsZUFBZSxJQUFJVixPQUFKLEVBQXJCOztBQUVBOzs7O0lBR01XLE07QUFDRjs7O0FBR0Esc0JBQWM7QUFBQTs7QUFDVkYsZ0JBQVFHLEdBQVIsQ0FBWSxJQUFaLEVBQWtCQyxrQkFBUUMsWUFBUixDQUFxQjtBQUNuQ0MsbUJBQU8sTUFENEI7QUFFbkNDLG9CQUFRSCxrQkFBUUcsTUFBUixDQUFlQyxPQUFmLENBQ0pKLGtCQUFRRyxNQUFSLENBQWVFLFFBQWYsRUFESSxFQUVKTCxr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QTNCLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJMEI7QUFDdEIsbUJBQU83RCxxQkFBcUI2RCxHQUFyQixDQUF5QixJQUF6QixDQUFQO0FBQ0g7QUFDRDs7Ozs7Ozs0QkFJc0I7QUFDbEIsbUJBQU81RCxpQkFBaUI0RCxHQUFqQixDQUFxQixJQUFyQixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSVU7QUFDTixtQkFBTzFELEtBQUswRCxHQUFMLENBQVMsSUFBVCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSWE7QUFDVCxtQkFBT3pELFFBQVF5RCxHQUFSLENBQVksSUFBWixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSWtCO0FBQ2QsbUJBQU94RCxhQUFhd0QsR0FBYixDQUFpQixJQUFqQixDQUFQO0FBQ0g7Ozs0QkFFaUI7QUFDZCxtQkFBTyxPQUFQO0FBQ0g7Ozs7O2tCQXlGVSxJQUFJdkQsTUFBSixFIiwiZmlsZSI6Imdsb2JhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgd2luc3RvbiBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBzaW1wbGVHaXQgZnJvbSAnc2ltcGxlLWdpdCc7XG5pbXBvcnQgeyBHaXQgfSBmcm9tICdzaW1wbGUtZ2l0JztcbmltcG9ydCB7IENvbmZpZ01hbmFnZXIgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XG5pbXBvcnQgeyBDb25maWdQYXJzZXIgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24vQ29uZmlnUGFyc2VyJztcbmltcG9ydCB7IEFwcGxpY2F0aW9uTWFuYWdlciB9IGZyb20gJy4vYXBwbGljYXRpb25zL0FwcGxpY2F0aW9uTWFuYWdlcic7XG5pbXBvcnQgeyBCb3VuZGVkQ29udGV4dE1hbmFnZXIgfSBmcm9tICcuL2JvdW5kZWRDb250ZXh0cy9Cb3VuZGVkQ29udGV4dE1hbmFnZXInO1xuaW1wb3J0IHsgQm9pbGVyUGxhdGVzTWFuYWdlciB9IGZyb20gJy4vYm9pbGVyUGxhdGVzL0JvaWxlclBsYXRlc01hbmFnZXInO1xuaW1wb3J0IHsgSHR0cFdyYXBwZXIgfSBmcm9tICcuL0h0dHBXcmFwcGVyJztcbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuL0ZvbGRlcnMnO1xuaW1wb3J0IHsgQXJ0aWZhY3RzTWFuYWdlciB9IGZyb20gJy4vYXJ0aWZhY3RzL0FydGlmYWN0c01hbmFnZXInO1xuaW1wb3J0IHsgSW5xdWlyZXJNYW5hZ2VyIH0gZnJvbSAnLi9hcnRpZmFjdHMvSW5xdWlyZXJNYW5hZ2VyJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmNvbnN0IF9jb25maWdNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9jb25maWdQYXJzZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2FwcGxpY2F0aW9uTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfYXJ0aWZhY3RzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfYm91bmRlZENvbnRleHRNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9pbnF1aXJlck1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZ2l0ID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9sb2dnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2h0dHBXcmFwcGVyID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBDb21tb24gZ2xvYmFsIG9iamVjdFxuICovXG5jbGFzcyBnbG9iYWwge1xuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gaW5pdGlhbGl6YXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgX2xvZ2dlci5zZXQodGhpcywgd2luc3Rvbi5jcmVhdGVMb2dnZXIoe1xuICAgICAgICAgICAgbGV2ZWw6ICdpbmZvJyxcbiAgICAgICAgICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcbiAgICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5jb2xvcml6ZSgpLFxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LnNpbXBsZSgpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICAgICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSgpXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pKTtcblxuICAgICAgICBfaHR0cFdyYXBwZXIuc2V0KHRoaXMsIG5ldyBIdHRwV3JhcHBlcigpKTtcbiAgICAgICAgXG4gICAgICAgIF9jb25maWdQYXJzZXIuc2V0KHRoaXMsIG5ldyBDb25maWdQYXJzZXIoKSk7XG4gICAgICAgIF9jb25maWdNYW5hZ2VyLnNldCh0aGlzLCBuZXcgQ29uZmlnTWFuYWdlcihmcywgdGhpcy5jb25maWdQYXJzZXIsIHRoaXMubG9nZ2VyKSk7XG5cbiAgICAgICAgbGV0IGdpdCA9IHNpbXBsZUdpdCh0aGlzLmNvbmZpZ01hbmFnZXIuY2VudHJhbEZvbGRlckxvY2F0aW9uKTtcbiAgICAgICAgZ2l0LmZvckZvbGRlciA9IChmb2xkZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzaW1wbGVHaXQoZm9sZGVyKTtcbiAgICAgICAgfTtcblxuICAgICAgICBfZ2l0LnNldCh0aGlzLCBnaXQpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgbmV3IEZvbGRlcnMoZnMpKTtcbiAgICAgICAgX2JvaWxlclBsYXRlc01hbmFnZXIuc2V0KHRoaXMsIG5ldyBCb2lsZXJQbGF0ZXNNYW5hZ2VyKHRoaXMuY29uZmlnTWFuYWdlciwgdGhpcy5odHRwV3JhcHBlciwgdGhpcy5naXQsIHRoaXMuZm9sZGVycywgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9hcHBsaWNhdGlvbk1hbmFnZXIuc2V0KHRoaXMsIG5ldyBBcHBsaWNhdGlvbk1hbmFnZXIodGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmNvbmZpZ01hbmFnZXIsIHRoaXMuZm9sZGVycywgIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBfYm91bmRlZENvbnRleHRNYW5hZ2VyLnNldCh0aGlzLCBuZXcgQm91bmRlZENvbnRleHRNYW5hZ2VyKHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5hcHBsaWNhdGlvbk1hbmFnZXIsIHRoaXMuZm9sZGVycywgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuc2V0KHRoaXMsIG5ldyBJbnF1aXJlck1hbmFnZXIodGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2FydGlmYWN0c01hbmFnZXIuc2V0KHRoaXMsIG5ldyBBcnRpZmFjdHNNYW5hZ2VyKHRoaXMuaW5xdWlyZXJNYW5hZ2VyLCB0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuZm9sZGVycywgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtDb25maWdNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtDb25maWdNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBjb25maWdNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2NvbmZpZ01hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtDb25maWdQYXJzZXJ9XG4gICAgICogQHJldHVybnMge0NvbmZpZ1BhcnNlcn1cbiAgICAgKi9cbiAgICBnZXQgY29uZmlnUGFyc2VyKCkge1xuICAgICAgICByZXR1cm4gX2NvbmZpZ1BhcnNlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0ZvbGRlcnN9XG4gICAgICogQHJldHVybnMge0ZvbGRlcnN9XG4gICAgICovXG4gICAgZ2V0IGZvbGRlcnMoKSB7XG4gICAgICAgIHJldHVybiBfZm9sZGVycy5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0FwcGxpY2F0aW9uTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7QXBwbGljYXRpb25NYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBhcHBsaWNhdGlvbk1hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfYXBwbGljYXRpb25NYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKiogXG4gICAgICogR2V0cyB0aGUge0FydGlmYWN0c01hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0FydGlmYWN0c01hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGFydGlmYWN0c01hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfYXJ0aWZhY3RzTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0JvdW5kZWRDb250ZXh0TWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7Qm91bmRlZENvbnRleHRNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBib3VuZGVkQ29udGV4dE1hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfYm91bmRlZENvbnRleHRNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVzTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0lucXVpcmVyTWFuYWdlclxuICAgICAqIEByZXR1cm5zIHtJbnF1aXJlck1hbmFnZXJ9fVxuICAgICAqL1xuICAgIGdldCBpbnF1aXJlck1hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfaW5xdWlyZXJNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7R2l0fSBzeXN0ZW1cbiAgICAgKiBAcmV0dXJucyB7R2l0fVxuICAgICAqL1xuICAgIGdldCBnaXQoKSB7XG4gICAgICAgIHJldHVybiBfZ2l0LmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7TG9nZ2VyfVxuICAgICAqIEByZXR1cm5zIHtMb2dnZXJ9XG4gICAgICovXG4gICAgZ2V0IGxvZ2dlcigpIHvCoFxuICAgICAgICByZXR1cm4gX2xvZ2dlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0h0dHBXcmFwcGVyfVxuICAgICAqIEByZXR1cm5zIHtIdHRwV3JhcHBlcn1cbiAgICAgKi9cbiAgICBnZXQgaHR0cFdyYXBwZXIoKSB7XG4gICAgICAgIHJldHVybiBfaHR0cFdyYXBwZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIGdldCB1c2FnZVByZWZpeCgpIHtcbiAgICAgICAgcmV0dXJuICdcXG5cXHQgJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbmFtZXNwYWNlIGJhc2VkIG9uIHRoZSBjbG9zZXN0IGNzcHJvalBhdGggYW5kIHRoZSBjd2QgcGF0aFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjdXJyZW50UGF0aCBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY3Nwcm9qUGF0aCBcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIGNyZWF0ZUNTaGFycE5hbWVzcGFjZShjdXJyZW50UGF0aCwgY3Nwcm9qUGF0aCkge1xuICAgICAgICBjb25zdCBjc3Byb2pGaWxlTmFtZSA9IHBhdGgucGFyc2UodGhpcy5nZXRGaWxlTmFtZShjc3Byb2pQYXRoKSkubmFtZTtcbiAgICAgICAgY29uc3QgY3Nwcm9qRmlsZURpciA9IHRoaXMuZ2V0RmlsZU5hbWUodGhpcy5nZXRGaWxlRGlyKGNzcHJvalBhdGgpKTtcbiAgICAgICAgbGV0IG5hbWVzcGFjZVNlZ21lbnRzID0gW107XG4gICAgICAgIFxuICAgICAgICBsZXQgc2VnbWVudFBhdGggPSBjdXJyZW50UGF0aDtcbiAgICAgICAgbGV0IHNlZ21lbnQgPSB0aGlzLmdldEZpbGVOYW1lKHNlZ21lbnRQYXRoKTtcblxuICAgICAgICB3aGlsZSAoc2VnbWVudCAhPSBjc3Byb2pGaWxlRGlyKSB7XG4gICAgICAgICAgICBuYW1lc3BhY2VTZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuICAgICAgICAgICAgc2VnbWVudFBhdGggPSB0aGlzLmdldEZpbGVEaXIoc2VnbWVudFBhdGgpO1xuICAgICAgICAgICAgc2VnbWVudCA9IHRoaXMuZ2V0RmlsZU5hbWUoc2VnbWVudFBhdGgpO1xuICAgICAgICB9IFxuICAgICAgICBuYW1lc3BhY2VTZWdtZW50cyA9IG5hbWVzcGFjZVNlZ21lbnRzLnJldmVyc2UoKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBuYW1lc3BhY2UgPSBjc3Byb2pGaWxlTmFtZTtcbiAgICAgICAgbmFtZXNwYWNlU2VnbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIG5hbWVzcGFjZSArPSAnLicgKyBlbGVtZW50O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5hbWVzcGFjZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcGF0aCBvZiB0aGUgbmVhcmVzdCAuY3Nwcm9qIGZpbGUsIHNlYXJjaGluZyB1cHdhcmRzIG5vdCByZWN1cnNpdmVseVxuICAgICAqL1xuICAgIGdldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZygpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRoID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgbGV0IGxhc3RQYXRoU2VwSW5kZXggPSB0aGlzLmdldExhc3RQYXRoU2VwYXJhdG9ySW5kZXgoY3VycmVudFBhdGgpO1xuICAgICAgICB3aGlsZSAobGFzdFBhdGhTZXBJbmRleCAhPSAtMSAmJiBjdXJyZW50UGF0aCAhPSBudWxsICYmIGN1cnJlbnRQYXRoICE9ICcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0cyA9IF9mb2xkZXJzLmdldCh0aGlzKS5zZWFyY2hGb2xkZXIoY3VycmVudFBhdGgsICdib3VuZGVkLWNvbnRleHQuanNvbicpOyBcbiAgICAgICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzWzBdO1xuICAgICAgICAgICAgY3VycmVudFBhdGggPSBjdXJyZW50UGF0aC5zdWJzdHIoMCwgbGFzdFBhdGhTZXBJbmRleCk7XG4gICAgICAgICAgICBsYXN0UGF0aFNlcEluZGV4ID0gdGhpcy5nZXRMYXN0UGF0aFNlcGFyYXRvckluZGV4KGN1cnJlbnRQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBhdGggb2YgdGhlIG5lYXJlc3QgLmNzcHJvaiBmaWxlLCBzZWFyY2hpbmcgdXB3YXJkcyBub3QgcmVjdXJzaXZlbHlcbiAgICAgKi9cbiAgICBnZXROZWFyZXN0Q3Nwcm9qRmlsZSgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRoID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgbGV0IGxhc3RQYXRoU2VwSW5kZXggPSB0aGlzLmdldExhc3RQYXRoU2VwYXJhdG9ySW5kZXgoY3VycmVudFBhdGgpO1xuICAgICAgICB3aGlsZSAobGFzdFBhdGhTZXBJbmRleCAhPSAtMSAmJiBjdXJyZW50UGF0aCAhPSBudWxsICYmIGN1cnJlbnRQYXRoICE9ICcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0cyA9IF9mb2xkZXJzLmdldCh0aGlzKS5zZWFyY2hGb2xkZXIoY3VycmVudFBhdGgsICcuY3Nwcm9qJyk7IFxuICAgICAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID49IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHNbMF07XG4gICAgICAgICAgICBjdXJyZW50UGF0aCA9IGN1cnJlbnRQYXRoLnN1YnN0cigwLCBsYXN0UGF0aFNlcEluZGV4KTtcbiAgICAgICAgICAgIGxhc3RQYXRoU2VwSW5kZXggPSB0aGlzLmdldExhc3RQYXRoU2VwYXJhdG9ySW5kZXgoY3VycmVudFBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGluZGV4IG9mIHRoZSBsYXN0IHBhdGggc2VwYXJhdG9yIGluIHRoZSBwYXRoXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZpbGVQYXRoIFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IGluZGV4XG4gICAgICovXG4gICAgZ2V0TGFzdFBhdGhTZXBhcmF0b3JJbmRleChmaWxlUGF0aCkge1xuICAgICAgICBjb25zdCBsYXN0UGF0aFNlcGFyYXRvck1hdGNoID0gZmlsZVBhdGgubWF0Y2goLyhcXFxcfFxcLykvKTtcbiAgICAgICAgaWYgKGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2ggPT09IHVuZGVmaW5lZCB8fCBsYXN0UGF0aFNlcGFyYXRvck1hdGNoID09PSBudWxsIHx8IGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2gubGVuZ3RoID09IDApIFxuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gZmlsZVBhdGgubGFzdEluZGV4T2YobGFzdFBhdGhTZXBhcmF0b3JNYXRjaFtsYXN0UGF0aFNlcGFyYXRvck1hdGNoLmxlbmd0aC0xXSlcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZmlsZW5hbWUgLyBsYXN0IGRpcmVjdG9yeSBmcm9tIHRoZSBwYXRoXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZpbGVQYXRoIFxuICAgICAqL1xuICAgIGdldEZpbGVOYW1lKGZpbGVQYXRoKXtcbiAgICAgICAgcmV0dXJuIGZpbGVQYXRoLnN1YnN0cmluZyh0aGlzLmdldExhc3RQYXRoU2VwYXJhdG9ySW5kZXgoZmlsZVBhdGgpKzEsIGZpbGVQYXRoLmxlbmd0aCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRpcmVjdG9yeSBuYW1lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZpbGVQYXRoIFxuICAgICAqL1xuICAgIGdldEZpbGVEaXIoZmlsZVBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguZGlybmFtZShmaWxlUGF0aCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBnbG9iYWwoKTsiXX0=