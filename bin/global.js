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
        value: function getNearestCsprojFile(path) {
            var currentPath = path;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9nbG9iYWwuanMiXSwibmFtZXMiOlsiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfYXJ0aWZhY3RzTWFuYWdlciIsIl9ib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIl9pbnF1aXJlck1hbmFnZXIiLCJfZm9sZGVycyIsIl9naXQiLCJfbG9nZ2VyIiwiX2h0dHBXcmFwcGVyIiwiZ2xvYmFsIiwic2V0Iiwid2luc3RvbiIsImNyZWF0ZUxvZ2dlciIsImxldmVsIiwiZm9ybWF0IiwiY29tYmluZSIsImNvbG9yaXplIiwic2ltcGxlIiwidHJhbnNwb3J0cyIsIkNvbnNvbGUiLCJIdHRwV3JhcHBlciIsIkNvbmZpZ1BhcnNlciIsIkNvbmZpZ01hbmFnZXIiLCJmcyIsImNvbmZpZ1BhcnNlciIsImxvZ2dlciIsImdpdCIsImNvbmZpZ01hbmFnZXIiLCJjZW50cmFsRm9sZGVyTG9jYXRpb24iLCJmb3JGb2xkZXIiLCJmb2xkZXIiLCJGb2xkZXJzIiwiQm9pbGVyUGxhdGVzTWFuYWdlciIsImh0dHBXcmFwcGVyIiwiZm9sZGVycyIsIkFwcGxpY2F0aW9uTWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJCb3VuZGVkQ29udGV4dE1hbmFnZXIiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJJbnF1aXJlck1hbmFnZXIiLCJBcnRpZmFjdHNNYW5hZ2VyIiwiaW5xdWlyZXJNYW5hZ2VyIiwiY3VycmVudFBhdGgiLCJjc3Byb2pQYXRoIiwiY3Nwcm9qRmlsZU5hbWUiLCJwYXRoIiwicGFyc2UiLCJnZXRGaWxlTmFtZSIsIm5hbWUiLCJjc3Byb2pGaWxlRGlyIiwiZ2V0RmlsZURpciIsIm5hbWVzcGFjZVNlZ21lbnRzIiwic2VnbWVudFBhdGgiLCJzZWdtZW50IiwicHVzaCIsInJldmVyc2UiLCJuYW1lc3BhY2UiLCJmb3JFYWNoIiwiZWxlbWVudCIsInByb2Nlc3MiLCJjd2QiLCJsYXN0UGF0aFNlcEluZGV4IiwiZ2V0TGFzdFBhdGhTZXBhcmF0b3JJbmRleCIsInJlc3VsdHMiLCJnZXQiLCJzZWFyY2hGb2xkZXIiLCJsZW5ndGgiLCJzdWJzdHIiLCJmaWxlUGF0aCIsImxhc3RQYXRoU2VwYXJhdG9yTWF0Y2giLCJtYXRjaCIsInVuZGVmaW5lZCIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwiZGlybmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBakJBOzs7O0FBbUJBLElBQU1BLGlCQUFpQixJQUFJQyxPQUFKLEVBQXZCO0FBQ0EsSUFBTUMsZ0JBQWdCLElBQUlELE9BQUosRUFBdEI7QUFDQSxJQUFNRSxzQkFBc0IsSUFBSUYsT0FBSixFQUE1QjtBQUNBLElBQU1HLG9CQUFvQixJQUFJSCxPQUFKLEVBQTFCO0FBQ0EsSUFBTUkseUJBQXlCLElBQUlKLE9BQUosRUFBL0I7QUFDQSxJQUFNSyx1QkFBdUIsSUFBSUwsT0FBSixFQUE3QjtBQUNBLElBQU1NLG1CQUFtQixJQUFJTixPQUFKLEVBQXpCOztBQUVBLElBQU1PLFdBQVcsSUFBSVAsT0FBSixFQUFqQjtBQUNBLElBQU1RLE9BQU8sSUFBSVIsT0FBSixFQUFiO0FBQ0EsSUFBTVMsVUFBVSxJQUFJVCxPQUFKLEVBQWhCO0FBQ0EsSUFBTVUsZUFBZSxJQUFJVixPQUFKLEVBQXJCOztBQUVBOzs7O0lBR01XLE07QUFDRjs7O0FBR0Esc0JBQWM7QUFBQTs7QUFDVkYsZ0JBQVFHLEdBQVIsQ0FBWSxJQUFaLEVBQWtCQyxrQkFBUUMsWUFBUixDQUFxQjtBQUNuQ0MsbUJBQU8sTUFENEI7QUFFbkNDLG9CQUFRSCxrQkFBUUcsTUFBUixDQUFlQyxPQUFmLENBQ0pKLGtCQUFRRyxNQUFSLENBQWVFLFFBQWYsRUFESSxFQUVKTCxr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M0IsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OzRCQUkwQjtBQUN0QixtQkFBTzdELHFCQUFxQjZELEdBQXJCLENBQXlCLElBQXpCLENBQVA7QUFDSDtBQUNEOzs7Ozs7OzRCQUlzQjtBQUNsQixtQkFBTzVELGlCQUFpQjRELEdBQWpCLENBQXFCLElBQXJCLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJVTtBQUNOLG1CQUFPMUQsS0FBSzBELEdBQUwsQ0FBUyxJQUFULENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJYTtBQUNULG1CQUFPekQsUUFBUXlELEdBQVIsQ0FBWSxJQUFaLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJa0I7QUFDZCxtQkFBT3hELGFBQWF3RCxHQUFiLENBQWlCLElBQWpCLENBQVA7QUFDSDs7OzRCQUVpQjtBQUNkLG1CQUFPLE9BQVA7QUFDSDs7Ozs7a0JBMkZVLElBQUl2RCxNQUFKLEUiLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB3aW5zdG9uIGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHNpbXBsZUdpdCBmcm9tICdzaW1wbGUtZ2l0JztcbmltcG9ydCB7IEdpdCB9IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgQ29uZmlnTWFuYWdlciB9IGZyb20gJy4vY29uZmlndXJhdGlvbi9Db25maWdNYW5hZ2VyJztcbmltcG9ydCB7IENvbmZpZ1BhcnNlciB9IGZyb20gJy4vY29uZmlndXJhdGlvbi9Db25maWdQYXJzZXInO1xuaW1wb3J0IHsgQXBwbGljYXRpb25NYW5hZ2VyIH0gZnJvbSAnLi9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb25NYW5hZ2VyJztcbmltcG9ydCB7IEJvdW5kZWRDb250ZXh0TWFuYWdlciB9IGZyb20gJy4vYm91bmRlZENvbnRleHRzL0JvdW5kZWRDb250ZXh0TWFuYWdlcic7XG5pbXBvcnQgeyBCb2lsZXJQbGF0ZXNNYW5hZ2VyIH0gZnJvbSAnLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlcic7XG5pbXBvcnQgeyBIdHRwV3JhcHBlciB9IGZyb20gJy4vSHR0cFdyYXBwZXInO1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4vRm9sZGVycyc7XG5pbXBvcnQgeyBBcnRpZmFjdHNNYW5hZ2VyIH0gZnJvbSAnLi9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlcic7XG5pbXBvcnQgeyBJbnF1aXJlck1hbmFnZXIgfSBmcm9tICcuL2FydGlmYWN0cy9JbnF1aXJlck1hbmFnZXInO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY29uc3QgX2NvbmZpZ01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2NvbmZpZ1BhcnNlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfYXBwbGljYXRpb25NYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9hcnRpZmFjdHNNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9ib3VuZGVkQ29udGV4dE1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2JvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2lucXVpcmVyTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9naXQgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2xvZ2dlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaHR0cFdyYXBwZXIgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIENvbW1vbiBnbG9iYWwgb2JqZWN0XG4gKi9cbmNsYXNzIGdsb2JhbCB7XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBpbml0aWFsaXphdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBfbG9nZ2VyLnNldCh0aGlzLCB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7XG4gICAgICAgICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LmNvbG9yaXplKCksXG4gICAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuc2ltcGxlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgICAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKClcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIF9odHRwV3JhcHBlci5zZXQodGhpcywgbmV3IEh0dHBXcmFwcGVyKCkpO1xuICAgICAgICBcbiAgICAgICAgX2NvbmZpZ1BhcnNlci5zZXQodGhpcywgbmV3IENvbmZpZ1BhcnNlcigpKTtcbiAgICAgICAgX2NvbmZpZ01hbmFnZXIuc2V0KHRoaXMsIG5ldyBDb25maWdNYW5hZ2VyKGZzLCB0aGlzLmNvbmZpZ1BhcnNlciwgdGhpcy5sb2dnZXIpKTtcblxuICAgICAgICBsZXQgZ2l0ID0gc2ltcGxlR2l0KHRoaXMuY29uZmlnTWFuYWdlci5jZW50cmFsRm9sZGVyTG9jYXRpb24pO1xuICAgICAgICBnaXQuZm9yRm9sZGVyID0gKGZvbGRlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNpbXBsZUdpdChmb2xkZXIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIF9naXQuc2V0KHRoaXMsIGdpdCk7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBuZXcgRm9sZGVycyhmcykpO1xuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5zZXQodGhpcywgbmV3IEJvaWxlclBsYXRlc01hbmFnZXIodGhpcy5jb25maWdNYW5hZ2VyLCB0aGlzLmh0dHBXcmFwcGVyLCB0aGlzLmdpdCwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2FwcGxpY2F0aW9uTWFuYWdlci5zZXQodGhpcywgbmV3IEFwcGxpY2F0aW9uTWFuYWdlcih0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuY29uZmlnTWFuYWdlciwgdGhpcy5mb2xkZXJzLCAgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuc2V0KHRoaXMsIG5ldyBCb3VuZGVkQ29udGV4dE1hbmFnZXIodGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmFwcGxpY2F0aW9uTWFuYWdlciwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2lucXVpcmVyTWFuYWdlci5zZXQodGhpcywgbmV3IElucXVpcmVyTWFuYWdlcih0aGlzLmZvbGRlcnMsIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBfYXJ0aWZhY3RzTWFuYWdlci5zZXQodGhpcywgbmV3IEFydGlmYWN0c01hbmFnZXIodGhpcy5pbnF1aXJlck1hbmFnZXIsIHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0NvbmZpZ01hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0NvbmZpZ01hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvbmZpZ01hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0NvbmZpZ1BhcnNlcn1cbiAgICAgKiBAcmV0dXJucyB7Q29uZmlnUGFyc2VyfVxuICAgICAqL1xuICAgIGdldCBjb25maWdQYXJzZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnUGFyc2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Rm9sZGVyc31cbiAgICAgKiBAcmV0dXJucyB7Rm9sZGVyc31cbiAgICAgKi9cbiAgICBnZXQgZm9sZGVycygpIHtcbiAgICAgICAgcmV0dXJuIF9mb2xkZXJzLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7QXBwbGljYXRpb25NYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGFwcGxpY2F0aW9uTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9hcHBsaWNhdGlvbk1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKiBcbiAgICAgKiBHZXRzIHRoZSB7QXJ0aWZhY3RzTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7QXJ0aWZhY3RzTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYXJ0aWZhY3RzTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9hcnRpZmFjdHNNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Qm91bmRlZENvbnRleHRNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtCb3VuZGVkQ29udGV4dE1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGJvdW5kZWRDb250ZXh0TWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZXNNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7SW5xdWlyZXJNYW5hZ2VyXG4gICAgICogQHJldHVybnMge0lucXVpcmVyTWFuYWdlcn19XG4gICAgICovXG4gICAgZ2V0IGlucXVpcmVyTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9pbnF1aXJlck1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtHaXR9IHN5c3RlbVxuICAgICAqIEByZXR1cm5zIHtHaXR9XG4gICAgICovXG4gICAgZ2V0IGdpdCgpIHtcbiAgICAgICAgcmV0dXJuIF9naXQuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtMb2dnZXJ9XG4gICAgICogQHJldHVybnMge0xvZ2dlcn1cbiAgICAgKi9cbiAgICBnZXQgbG9nZ2VyKCkge8KgXG4gICAgICAgIHJldHVybiBfbG9nZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7SHR0cFdyYXBwZXJ9XG4gICAgICogQHJldHVybnMge0h0dHBXcmFwcGVyfVxuICAgICAqL1xuICAgIGdldCBodHRwV3JhcHBlcigpIHtcbiAgICAgICAgcmV0dXJuIF9odHRwV3JhcHBlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0IHVzYWdlUHJlZml4KCkge1xuICAgICAgICByZXR1cm4gJ1xcblxcdCAnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG5hbWVzcGFjZSBiYXNlZCBvbiB0aGUgY2xvc2VzdCBjc3Byb2pQYXRoIGFuZCB0aGUgY3dkIHBhdGhcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY3VycmVudFBhdGggXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNzcHJvalBhdGggXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBjcmVhdGVDU2hhcnBOYW1lc3BhY2UoY3VycmVudFBhdGgsIGNzcHJvalBhdGgpIHtcbiAgICAgICAgY29uc3QgY3Nwcm9qRmlsZU5hbWUgPSBwYXRoLnBhcnNlKHRoaXMuZ2V0RmlsZU5hbWUoY3Nwcm9qUGF0aCkpLm5hbWU7XG4gICAgICAgIGNvbnN0IGNzcHJvakZpbGVEaXIgPSB0aGlzLmdldEZpbGVOYW1lKHRoaXMuZ2V0RmlsZURpcihjc3Byb2pQYXRoKSk7XG4gICAgICAgIGxldCBuYW1lc3BhY2VTZWdtZW50cyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgbGV0IHNlZ21lbnRQYXRoID0gY3VycmVudFBhdGg7XG4gICAgICAgIGxldCBzZWdtZW50ID0gdGhpcy5nZXRGaWxlTmFtZShzZWdtZW50UGF0aCk7XG5cbiAgICAgICAgd2hpbGUgKHNlZ21lbnQgIT0gY3Nwcm9qRmlsZURpcikge1xuICAgICAgICAgICAgbmFtZXNwYWNlU2VnbWVudHMucHVzaChzZWdtZW50KTtcbiAgICAgICAgICAgIHNlZ21lbnRQYXRoID0gdGhpcy5nZXRGaWxlRGlyKHNlZ21lbnRQYXRoKTtcbiAgICAgICAgICAgIHNlZ21lbnQgPSB0aGlzLmdldEZpbGVOYW1lKHNlZ21lbnRQYXRoKTtcbiAgICAgICAgfSBcbiAgICAgICAgbmFtZXNwYWNlU2VnbWVudHMgPSBuYW1lc3BhY2VTZWdtZW50cy5yZXZlcnNlKCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgbmFtZXNwYWNlID0gY3Nwcm9qRmlsZU5hbWU7XG4gICAgICAgIG5hbWVzcGFjZVNlZ21lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBuYW1lc3BhY2UgKz0gJy4nICsgZWxlbWVudDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuYW1lc3BhY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcGF0aCBvZiB0aGUgbmVhcmVzdCAuY3Nwcm9qIGZpbGUsIHNlYXJjaGluZyB1cHdhcmRzIG5vdCByZWN1cnNpdmVseVxuICAgICAqL1xuICAgIGdldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZygpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRoID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgbGV0IGxhc3RQYXRoU2VwSW5kZXggPSB0aGlzLmdldExhc3RQYXRoU2VwYXJhdG9ySW5kZXgoY3VycmVudFBhdGgpO1xuICAgICAgICB3aGlsZSAobGFzdFBhdGhTZXBJbmRleCAhPSAtMSAmJiBjdXJyZW50UGF0aCAhPSBudWxsICYmIGN1cnJlbnRQYXRoICE9ICcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0cyA9IF9mb2xkZXJzLmdldCh0aGlzKS5zZWFyY2hGb2xkZXIoY3VycmVudFBhdGgsICdib3VuZGVkLWNvbnRleHQuanNvbicpOyBcbiAgICAgICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzWzBdO1xuICAgICAgICAgICAgY3VycmVudFBhdGggPSBjdXJyZW50UGF0aC5zdWJzdHIoMCwgbGFzdFBhdGhTZXBJbmRleCk7XG4gICAgICAgICAgICBsYXN0UGF0aFNlcEluZGV4ID0gdGhpcy5nZXRMYXN0UGF0aFNlcGFyYXRvckluZGV4KGN1cnJlbnRQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHBhdGggb2YgdGhlIG5lYXJlc3QgLmNzcHJvaiBmaWxlLCBzZWFyY2hpbmcgdXB3YXJkcyBub3QgcmVjdXJzaXZlbHlcbiAgICAgKi9cbiAgICBnZXROZWFyZXN0Q3Nwcm9qRmlsZShwYXRoKSB7XG4gICAgICAgIGxldCBjdXJyZW50UGF0aCA9IHBhdGg7XG4gICAgICAgIGxldCBsYXN0UGF0aFNlcEluZGV4ID0gdGhpcy5nZXRMYXN0UGF0aFNlcGFyYXRvckluZGV4KGN1cnJlbnRQYXRoKTtcbiAgICAgICAgd2hpbGUgKGxhc3RQYXRoU2VwSW5kZXggIT0gLTEgJiYgY3VycmVudFBhdGggIT0gbnVsbCAmJiBjdXJyZW50UGF0aCAhPSAnJylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBfZm9sZGVycy5nZXQodGhpcykuc2VhcmNoRm9sZGVyKGN1cnJlbnRQYXRoLCAnLmNzcHJvaicpOyBcbiAgICAgICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzWzBdO1xuICAgICAgICAgICAgY3VycmVudFBhdGggPSBjdXJyZW50UGF0aC5zdWJzdHIoMCwgbGFzdFBhdGhTZXBJbmRleCk7XG4gICAgICAgICAgICBsYXN0UGF0aFNlcEluZGV4ID0gdGhpcy5nZXRMYXN0UGF0aFNlcGFyYXRvckluZGV4KGN1cnJlbnRQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBpbmRleCBvZiB0aGUgbGFzdCBwYXRoIHNlcGFyYXRvciBpbiB0aGUgcGF0aFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlUGF0aCBcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBpbmRleFxuICAgICAqL1xuICAgIGdldExhc3RQYXRoU2VwYXJhdG9ySW5kZXgoZmlsZVBhdGgpIHtcbiAgICAgICAgY29uc3QgbGFzdFBhdGhTZXBhcmF0b3JNYXRjaCA9IGZpbGVQYXRoLm1hdGNoKC8oXFxcXHxcXC8pLyk7XG4gICAgICAgIGlmIChsYXN0UGF0aFNlcGFyYXRvck1hdGNoID09PSB1bmRlZmluZWQgfHwgbGFzdFBhdGhTZXBhcmF0b3JNYXRjaCA9PT0gbnVsbCB8fCBsYXN0UGF0aFNlcGFyYXRvck1hdGNoLmxlbmd0aCA9PSAwKSBcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgcmV0dXJuIGZpbGVQYXRoLmxhc3RJbmRleE9mKGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2hbbGFzdFBhdGhTZXBhcmF0b3JNYXRjaC5sZW5ndGgtMV0pXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGZpbGVuYW1lIC8gbGFzdCBkaXJlY3RvcnkgZnJvbSB0aGUgcGF0aFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlUGF0aCBcbiAgICAgKi9cbiAgICBnZXRGaWxlTmFtZShmaWxlUGF0aCl7XG4gICAgICAgIHJldHVybiBmaWxlUGF0aC5zdWJzdHJpbmcodGhpcy5nZXRMYXN0UGF0aFNlcGFyYXRvckluZGV4KGZpbGVQYXRoKSsxLCBmaWxlUGF0aC5sZW5ndGgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBkaXJlY3RvcnkgbmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlUGF0aCBcbiAgICAgKi9cbiAgICBnZXRGaWxlRGlyKGZpbGVQYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmRpcm5hbWUoZmlsZVBhdGgpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgZ2xvYmFsKCk7Il19