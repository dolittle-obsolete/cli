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
    (0, _createClass3.default)(global, [{
        key: 'supportedSDKLanguages',
        get: function get() {
            return ["csharp", 'javascript'];
        }
    }, {
        key: 'languageQuestion',
        get: function get() {
            return [{
                type: 'list',
                name: 'language',
                message: 'Which SDK language are you working in?',
                choices: this.supportedSDKLanguages
            }];
        }
        /**
         * Perform initialization
         */

    }]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9nbG9iYWwuanMiXSwibmFtZXMiOlsiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfYXJ0aWZhY3RzTWFuYWdlciIsIl9ib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIl9pbnF1aXJlck1hbmFnZXIiLCJfZm9sZGVycyIsIl9naXQiLCJfbG9nZ2VyIiwiX2h0dHBXcmFwcGVyIiwiZ2xvYmFsIiwidHlwZSIsIm5hbWUiLCJtZXNzYWdlIiwiY2hvaWNlcyIsInN1cHBvcnRlZFNES0xhbmd1YWdlcyIsInNldCIsIndpbnN0b24iLCJjcmVhdGVMb2dnZXIiLCJsZXZlbCIsImZvcm1hdCIsImNvbWJpbmUiLCJjb2xvcml6ZSIsInNpbXBsZSIsInRyYW5zcG9ydHMiLCJDb25zb2xlIiwiSHR0cFdyYXBwZXIiLCJDb25maWdQYXJzZXIiLCJDb25maWdNYW5hZ2VyIiwiZnMiLCJjb25maWdQYXJzZXIiLCJsb2dnZXIiLCJnaXQiLCJjb25maWdNYW5hZ2VyIiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIiwiZm9yRm9sZGVyIiwiZm9sZGVyIiwiRm9sZGVycyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJodHRwV3JhcHBlciIsImZvbGRlcnMiLCJBcHBsaWNhdGlvbk1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiQm91bmRlZENvbnRleHRNYW5hZ2VyIiwiYXBwbGljYXRpb25NYW5hZ2VyIiwiSW5xdWlyZXJNYW5hZ2VyIiwiQXJ0aWZhY3RzTWFuYWdlciIsImlucXVpcmVyTWFuYWdlciIsImN1cnJlbnRQYXRoIiwiY3Nwcm9qUGF0aCIsImNzcHJvakZpbGVOYW1lIiwicGF0aCIsInBhcnNlIiwiZ2V0RmlsZU5hbWUiLCJjc3Byb2pGaWxlRGlyIiwiZ2V0RmlsZURpciIsIm5hbWVzcGFjZVNlZ21lbnRzIiwic2VnbWVudFBhdGgiLCJzZWdtZW50IiwicHVzaCIsInJldmVyc2UiLCJuYW1lc3BhY2UiLCJmb3JFYWNoIiwiZWxlbWVudCIsInByb2Nlc3MiLCJjd2QiLCJsYXN0UGF0aFNlcEluZGV4IiwiZ2V0TGFzdFBhdGhTZXBhcmF0b3JJbmRleCIsInJlc3VsdHMiLCJnZXQiLCJzZWFyY2hGb2xkZXIiLCJsZW5ndGgiLCJzdWJzdHIiLCJmaWxlUGF0aCIsImxhc3RQYXRoU2VwYXJhdG9yTWF0Y2giLCJtYXRjaCIsInVuZGVmaW5lZCIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwiZGlybmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBakJBOzs7O0FBbUJBLElBQU1BLGlCQUFpQixJQUFJQyxPQUFKLEVBQXZCO0FBQ0EsSUFBTUMsZ0JBQWdCLElBQUlELE9BQUosRUFBdEI7QUFDQSxJQUFNRSxzQkFBc0IsSUFBSUYsT0FBSixFQUE1QjtBQUNBLElBQU1HLG9CQUFvQixJQUFJSCxPQUFKLEVBQTFCO0FBQ0EsSUFBTUkseUJBQXlCLElBQUlKLE9BQUosRUFBL0I7QUFDQSxJQUFNSyx1QkFBdUIsSUFBSUwsT0FBSixFQUE3QjtBQUNBLElBQU1NLG1CQUFtQixJQUFJTixPQUFKLEVBQXpCOztBQUVBLElBQU1PLFdBQVcsSUFBSVAsT0FBSixFQUFqQjtBQUNBLElBQU1RLE9BQU8sSUFBSVIsT0FBSixFQUFiO0FBQ0EsSUFBTVMsVUFBVSxJQUFJVCxPQUFKLEVBQWhCO0FBQ0EsSUFBTVUsZUFBZSxJQUFJVixPQUFKLEVBQXJCOztBQUVBOzs7O0lBR01XLE07Ozs0QkFHMEI7QUFDeEIsbUJBQU8sQ0FDSCxRQURHLEVBRUgsWUFGRyxDQUFQO0FBSUg7Ozs0QkFFc0I7QUFDbkIsbUJBQU8sQ0FBQztBQUNKQyxzQkFBTSxNQURGO0FBRUpDLHNCQUFNLFVBRkY7QUFHSkMseUJBQVMs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QUlhO0FBQ1QsbUJBQU83RCxRQUFRNkQsR0FBUixDQUFZLElBQVosQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OzRCQUlrQjtBQUNkLG1CQUFPNUQsYUFBYTRELEdBQWIsQ0FBaUIsSUFBakIsQ0FBUDtBQUNIOzs7NEJBRWlCO0FBQ2QsbUJBQU8sT0FBUDtBQUNIOzs7OztrQkF3RVUsSUFBSTNELE1BQUosRSIsImZpbGUiOiJnbG9iYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHdpbnN0b24gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgc2ltcGxlR2l0IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgR2l0IH0gZnJvbSAnc2ltcGxlLWdpdCc7XG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0IHsgQ29uZmlnUGFyc2VyIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uL0NvbmZpZ1BhcnNlcic7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbk1hbmFnZXIgfSBmcm9tICcuL2FwcGxpY2F0aW9ucy9BcHBsaWNhdGlvbk1hbmFnZXInO1xuaW1wb3J0IHsgQm91bmRlZENvbnRleHRNYW5hZ2VyIH0gZnJvbSAnLi9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyJztcbmltcG9ydCB7IEJvaWxlclBsYXRlc01hbmFnZXIgfSBmcm9tICcuL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCB7IEh0dHBXcmFwcGVyIH0gZnJvbSAnLi9IdHRwV3JhcHBlcic7XG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi9Gb2xkZXJzJztcbmltcG9ydCB7IEFydGlmYWN0c01hbmFnZXIgfSBmcm9tICcuL2FydGlmYWN0cy9BcnRpZmFjdHNNYW5hZ2VyJztcbmltcG9ydCB7IElucXVpcmVyTWFuYWdlciB9IGZyb20gJy4vYXJ0aWZhY3RzL0lucXVpcmVyTWFuYWdlcic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfY29uZmlnUGFyc2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9hcHBsaWNhdGlvbk1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2FydGlmYWN0c01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2JvdW5kZWRDb250ZXh0TWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaW5xdWlyZXJNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfbG9nZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9odHRwV3JhcHBlciA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogQ29tbW9uIGdsb2JhbCBvYmplY3RcbiAqL1xuY2xhc3MgZ2xvYmFsIHtcbiAgICBcblxuICAgIGdldCBzdXBwb3J0ZWRTREtMYW5ndWFnZXMoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBcImNzaGFycFwiLFxuICAgICAgICAgICAgJ2phdmFzY3JpcHQnXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0IGxhbmd1YWdlUXVlc3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgdHlwZTogJ2xpc3QnLFxuICAgICAgICAgICAgbmFtZTogJ2xhbmd1YWdlJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdXaGljaCBTREsgbGFuZ3VhZ2UgYXJlIHlvdSB3b3JraW5nIGluPycsXG4gICAgICAgICAgICBjaG9pY2VzOiB0aGlzLnN1cHBvcnRlZFNES0xhbmd1YWdlc1xuICAgICAgICB9XTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBpbml0aWFsaXphdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBfbG9nZ2VyLnNldCh0aGlzLCB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7XG4gICAgICAgICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LmNvbG9yaXplKCksXG4gICAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuc2ltcGxlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgICAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKClcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIF9odHRwV3JhcHBlci5zZXQodGhpcywgbmV3IEh0dHBXcmFwcGVyKCkpO1xuICAgICAgICBcbiAgICAgICAgX2NvbmZpZ1BhcnNlci5zZXQodGhpcywgbmV3IENvbmZpZ1BhcnNlcigpKTtcbiAgICAgICAgX2NvbmZpZ01hbmFnZXIuc2V0KHRoaXMsIG5ldyBDb25maWdNYW5hZ2VyKGZzLCB0aGlzLmNvbmZpZ1BhcnNlciwgdGhpcy5sb2dnZXIpKTtcblxuICAgICAgICBsZXQgZ2l0ID0gc2ltcGxlR2l0KHRoaXMuY29uZmlnTWFuYWdlci5jZW50cmFsRm9sZGVyTG9jYXRpb24pO1xuICAgICAgICBnaXQuZm9yRm9sZGVyID0gKGZvbGRlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNpbXBsZUdpdChmb2xkZXIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIF9naXQuc2V0KHRoaXMsIGdpdCk7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBuZXcgRm9sZGVycyhmcykpO1xuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5zZXQodGhpcywgbmV3IEJvaWxlclBsYXRlc01hbmFnZXIodGhpcy5jb25maWdNYW5hZ2VyLCB0aGlzLmh0dHBXcmFwcGVyLCB0aGlzLmdpdCwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2FwcGxpY2F0aW9uTWFuYWdlci5zZXQodGhpcywgbmV3IEFwcGxpY2F0aW9uTWFuYWdlcih0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuY29uZmlnTWFuYWdlciwgdGhpcy5mb2xkZXJzLCAgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuc2V0KHRoaXMsIG5ldyBCb3VuZGVkQ29udGV4dE1hbmFnZXIodGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmFwcGxpY2F0aW9uTWFuYWdlciwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2lucXVpcmVyTWFuYWdlci5zZXQodGhpcywgbmV3IElucXVpcmVyTWFuYWdlcih0aGlzLmZvbGRlcnMsIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBfYXJ0aWZhY3RzTWFuYWdlci5zZXQodGhpcywgbmV3IEFydGlmYWN0c01hbmFnZXIodGhpcy5pbnF1aXJlck1hbmFnZXIsIHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0NvbmZpZ01hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0NvbmZpZ01hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvbmZpZ01hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0NvbmZpZ1BhcnNlcn1cbiAgICAgKiBAcmV0dXJucyB7Q29uZmlnUGFyc2VyfVxuICAgICAqL1xuICAgIGdldCBjb25maWdQYXJzZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnUGFyc2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Rm9sZGVyc31cbiAgICAgKiBAcmV0dXJucyB7Rm9sZGVyc31cbiAgICAgKi9cbiAgICBnZXQgZm9sZGVycygpIHtcbiAgICAgICAgcmV0dXJuIF9mb2xkZXJzLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7QXBwbGljYXRpb25NYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGFwcGxpY2F0aW9uTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9hcHBsaWNhdGlvbk1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKiBcbiAgICAgKiBHZXRzIHRoZSB7QXJ0aWZhY3RzTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7QXJ0aWZhY3RzTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYXJ0aWZhY3RzTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9hcnRpZmFjdHNNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Qm91bmRlZENvbnRleHRNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtCb3VuZGVkQ29udGV4dE1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGJvdW5kZWRDb250ZXh0TWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZXNNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7SW5xdWlyZXJNYW5hZ2VyXG4gICAgICogQHJldHVybnMge0lucXVpcmVyTWFuYWdlcn19XG4gICAgICovXG4gICAgZ2V0IGlucXVpcmVyTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9pbnF1aXJlck1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtHaXR9IHN5c3RlbVxuICAgICAqIEByZXR1cm5zIHtHaXR9XG4gICAgICovXG4gICAgZ2V0IGdpdCgpIHtcbiAgICAgICAgcmV0dXJuIF9naXQuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtMb2dnZXJ9XG4gICAgICogQHJldHVybnMge0xvZ2dlcn1cbiAgICAgKi9cbiAgICBnZXQgbG9nZ2VyKCkge8KgXG4gICAgICAgIHJldHVybiBfbG9nZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7SHR0cFdyYXBwZXJ9XG4gICAgICogQHJldHVybnMge0h0dHBXcmFwcGVyfVxuICAgICAqL1xuICAgIGdldCBodHRwV3JhcHBlcigpIHtcbiAgICAgICAgcmV0dXJuIF9odHRwV3JhcHBlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0IHVzYWdlUHJlZml4KCkge1xuICAgICAgICByZXR1cm4gJ1xcblxcdCAnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBuYW1lc3BhY2UgYmFzZWQgb24gdGhlIGNsb3Nlc3QgY3Nwcm9qUGF0aCBhbmQgdGhlIGN3ZCBwYXRoXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGN1cnJlbnRQYXRoIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjc3Byb2pQYXRoIFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgY3JlYXRlQ1NoYXJwTmFtZXNwYWNlKGN1cnJlbnRQYXRoLCBjc3Byb2pQYXRoKSB7XG4gICAgICAgIGNvbnN0IGNzcHJvakZpbGVOYW1lID0gcGF0aC5wYXJzZSh0aGlzLmdldEZpbGVOYW1lKGNzcHJvalBhdGgpKS5uYW1lO1xuICAgICAgICBjb25zdCBjc3Byb2pGaWxlRGlyID0gdGhpcy5nZXRGaWxlTmFtZSh0aGlzLmdldEZpbGVEaXIoY3Nwcm9qUGF0aCkpO1xuICAgICAgICBsZXQgbmFtZXNwYWNlU2VnbWVudHMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGxldCBzZWdtZW50UGF0aCA9IGN1cnJlbnRQYXRoO1xuICAgICAgICBsZXQgc2VnbWVudCA9IHRoaXMuZ2V0RmlsZU5hbWUoc2VnbWVudFBhdGgpO1xuXG4gICAgICAgIHdoaWxlIChzZWdtZW50ICE9IGNzcHJvakZpbGVEaXIpIHtcbiAgICAgICAgICAgIG5hbWVzcGFjZVNlZ21lbnRzLnB1c2goc2VnbWVudCk7XG4gICAgICAgICAgICBzZWdtZW50UGF0aCA9IHRoaXMuZ2V0RmlsZURpcihzZWdtZW50UGF0aCk7XG4gICAgICAgICAgICBzZWdtZW50ID0gdGhpcy5nZXRGaWxlTmFtZShzZWdtZW50UGF0aCk7XG4gICAgICAgIH0gXG4gICAgICAgIG5hbWVzcGFjZVNlZ21lbnRzID0gbmFtZXNwYWNlU2VnbWVudHMucmV2ZXJzZSgpO1xuICAgICAgICBcbiAgICAgICAgbGV0IG5hbWVzcGFjZSA9IGNzcHJvakZpbGVOYW1lO1xuICAgICAgICBuYW1lc3BhY2VTZWdtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgbmFtZXNwYWNlICs9ICcuJyArIGVsZW1lbnQ7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmFtZXNwYWNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwYXRoIG9mIHRoZSBuZWFyZXN0IC5jc3Byb2ogZmlsZSwgc2VhcmNoaW5nIHVwd2FyZHMgbm90IHJlY3Vyc2l2ZWx5XG4gICAgICovXG4gICAgZ2V0TmVhcmVzdENzcHJvakZpbGUoKSB7XG4gICAgICAgIGxldCBjdXJyZW50UGF0aCA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICAgIGxldCBsYXN0UGF0aFNlcEluZGV4ID0gdGhpcy5nZXRMYXN0UGF0aFNlcGFyYXRvckluZGV4KGN1cnJlbnRQYXRoKTtcbiAgICAgICAgd2hpbGUgKGxhc3RQYXRoU2VwSW5kZXggIT0gLTEgJiYgY3VycmVudFBhdGggIT0gbnVsbCAmJiBjdXJyZW50UGF0aCAhPSAnJylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBfZm9sZGVycy5nZXQodGhpcykuc2VhcmNoRm9sZGVyKGN1cnJlbnRQYXRoLCAnLmNzcHJvaicpOyBcbiAgICAgICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzWzBdO1xuICAgICAgICAgICAgY3VycmVudFBhdGggPSBjdXJyZW50UGF0aC5zdWJzdHIoMCwgbGFzdFBhdGhTZXBJbmRleCk7XG4gICAgICAgICAgICBsYXN0UGF0aFNlcEluZGV4ID0gdGhpcy5nZXRMYXN0UGF0aFNlcGFyYXRvckluZGV4KGN1cnJlbnRQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaW5kZXggb2YgdGhlIGxhc3QgcGF0aCBzZXBhcmF0b3IgaW4gdGhlIHBhdGhcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsZVBhdGggXG4gICAgICogQHJldHVybnMge251bWJlcn0gaW5kZXhcbiAgICAgKi9cbiAgICBnZXRMYXN0UGF0aFNlcGFyYXRvckluZGV4KGZpbGVQYXRoKSB7XG4gICAgICAgIGNvbnN0IGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2ggPSBmaWxlUGF0aC5tYXRjaCgvKFxcXFx8XFwvKS8pO1xuICAgICAgICBpZiAobGFzdFBhdGhTZXBhcmF0b3JNYXRjaCA9PT0gdW5kZWZpbmVkIHx8IGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2ggPT09IG51bGwgfHwgbGFzdFBhdGhTZXBhcmF0b3JNYXRjaC5sZW5ndGggPT0gMCkgXG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIHJldHVybiBmaWxlUGF0aC5sYXN0SW5kZXhPZihsYXN0UGF0aFNlcGFyYXRvck1hdGNoW2xhc3RQYXRoU2VwYXJhdG9yTWF0Y2gubGVuZ3RoLTFdKVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBmaWxlbmFtZSAvIGxhc3QgZGlyZWN0b3J5IGZyb20gdGhlIHBhdGhcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsZVBhdGggXG4gICAgICovXG4gICAgZ2V0RmlsZU5hbWUoZmlsZVBhdGgpe1xuICAgICAgICByZXR1cm4gZmlsZVBhdGguc3Vic3RyaW5nKHRoaXMuZ2V0TGFzdFBhdGhTZXBhcmF0b3JJbmRleChmaWxlUGF0aCkrMSwgZmlsZVBhdGgubGVuZ3RoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGlyZWN0b3J5IG5hbWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsZVBhdGggXG4gICAgICovXG4gICAgZ2V0RmlsZURpcihmaWxlUGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aC5kaXJuYW1lKGZpbGVQYXRoKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IGdsb2JhbCgpOyJdfQ==