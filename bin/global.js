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
                type: 'rawlist',
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

            console.log('csprojFileName: ', csprojFileName);
            console.log('csprojFileDir: ', csprojFileDir);
            while (segment != csprojFileDir) {

                console.log('segmentPath: ', segmentPath);
                console.log('segment: ', segment);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9nbG9iYWwuanMiXSwibmFtZXMiOlsiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2NvbmZpZ1BhcnNlciIsIl9hcHBsaWNhdGlvbk1hbmFnZXIiLCJfYXJ0aWZhY3RzTWFuYWdlciIsIl9ib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIl9pbnF1aXJlck1hbmFnZXIiLCJfZm9sZGVycyIsIl9naXQiLCJfbG9nZ2VyIiwiX2h0dHBXcmFwcGVyIiwiZ2xvYmFsIiwidHlwZSIsIm5hbWUiLCJtZXNzYWdlIiwiY2hvaWNlcyIsInN1cHBvcnRlZFNES0xhbmd1YWdlcyIsInNldCIsIndpbnN0b24iLCJjcmVhdGVMb2dnZXIiLCJsZXZlbCIsImZvcm1hdCIsImNvbWJpbmUiLCJjb2xvcml6ZSIsInNpbXBsZSIsInRyYW5zcG9ydHMiLCJDb25zb2xlIiwiSHR0cFdyYXBwZXIiLCJDb25maWdQYXJzZXIiLCJDb25maWdNYW5hZ2VyIiwiZnMiLCJjb25maWdQYXJzZXIiLCJsb2dnZXIiLCJnaXQiLCJjb25maWdNYW5hZ2VyIiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIiwiZm9yRm9sZGVyIiwiZm9sZGVyIiwiRm9sZGVycyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJodHRwV3JhcHBlciIsImZvbGRlcnMiLCJBcHBsaWNhdGlvbk1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiQm91bmRlZENvbnRleHRNYW5hZ2VyIiwiYXBwbGljYXRpb25NYW5hZ2VyIiwiSW5xdWlyZXJNYW5hZ2VyIiwiQXJ0aWZhY3RzTWFuYWdlciIsImlucXVpcmVyTWFuYWdlciIsImN1cnJlbnRQYXRoIiwiY3Nwcm9qUGF0aCIsImNzcHJvakZpbGVOYW1lIiwicGF0aCIsInBhcnNlIiwiZ2V0RmlsZU5hbWUiLCJjc3Byb2pGaWxlRGlyIiwiZ2V0RmlsZURpciIsIm5hbWVzcGFjZVNlZ21lbnRzIiwic2VnbWVudFBhdGgiLCJzZWdtZW50IiwiY29uc29sZSIsImxvZyIsInB1c2giLCJyZXZlcnNlIiwibmFtZXNwYWNlIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJwcm9jZXNzIiwiY3dkIiwibGFzdFBhdGhTZXBJbmRleCIsImdldExhc3RQYXRoU2VwYXJhdG9ySW5kZXgiLCJyZXN1bHRzIiwiZ2V0Iiwic2VhcmNoRm9sZGVyIiwibGVuZ3RoIiwic3Vic3RyIiwiZmlsZVBhdGgiLCJsYXN0UGF0aFNlcGFyYXRvck1hdGNoIiwibWF0Y2giLCJ1bmRlZmluZWQiLCJsYXN0SW5kZXhPZiIsInN1YnN0cmluZyIsImRpcm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQWpCQTs7OztBQW1CQSxJQUFNQSxpQkFBaUIsSUFBSUMsT0FBSixFQUF2QjtBQUNBLElBQU1DLGdCQUFnQixJQUFJRCxPQUFKLEVBQXRCO0FBQ0EsSUFBTUUsc0JBQXNCLElBQUlGLE9BQUosRUFBNUI7QUFDQSxJQUFNRyxvQkFBb0IsSUFBSUgsT0FBSixFQUExQjtBQUNBLElBQU1JLHlCQUF5QixJQUFJSixPQUFKLEVBQS9CO0FBQ0EsSUFBTUssdUJBQXVCLElBQUlMLE9BQUosRUFBN0I7QUFDQSxJQUFNTSxtQkFBbUIsSUFBSU4sT0FBSixFQUF6Qjs7QUFFQSxJQUFNTyxXQUFXLElBQUlQLE9BQUosRUFBakI7QUFDQSxJQUFNUSxPQUFPLElBQUlSLE9BQUosRUFBYjtBQUNBLElBQU1TLFVBQVUsSUFBSVQsT0FBSixFQUFoQjtBQUNBLElBQU1VLGVBQWUsSUFBSVYsT0FBSixFQUFyQjs7QUFFQTs7OztJQUdNVyxNOzs7NEJBRzBCO0FBQ3hCLG1CQUFPLENBQ0gsUUFERyxFQUVILFlBRkcsQ0FBUDtBQUlIOzs7NEJBRXNCO0FBQ25CLG1CQUFPLENBQUM7QUFDSkMsc0JBQU0sU0FERjtBQUVKQyxzQkFBTSxV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cUJBQXFCbUUsR0FBckIsQ0FBeUIsSUFBekIsQ0FBUDtBQUNIO0FBQ0Q7Ozs7Ozs7NEJBSXNCO0FBQ2xCLG1CQUFPbEUsaUJBQWlCa0UsR0FBakIsQ0FBcUIsSUFBckIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OzRCQUlVO0FBQ04sbUJBQU9oRSxLQUFLZ0UsR0FBTCxDQUFTLElBQVQsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OzRCQUlhO0FBQ1QsbUJBQU8vRCxRQUFRK0QsR0FBUixDQUFZLElBQVosQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OzRCQUlrQjtBQUNkLG1CQUFPOUQsYUFBYThELEdBQWIsQ0FBaUIsSUFBakIsQ0FBUDtBQUNIOzs7NEJBRWlCO0FBQ2QsbUJBQU8sT0FBUDtBQUNIOzs7OztrQkE2RVUsSUFBSTdELE1BQUosRSIsImZpbGUiOiJnbG9iYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHdpbnN0b24gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgc2ltcGxlR2l0IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgR2l0IH0gZnJvbSAnc2ltcGxlLWdpdCc7XG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0IHsgQ29uZmlnUGFyc2VyIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uL0NvbmZpZ1BhcnNlcic7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbk1hbmFnZXIgfSBmcm9tICcuL2FwcGxpY2F0aW9ucy9BcHBsaWNhdGlvbk1hbmFnZXInO1xuaW1wb3J0IHsgQm91bmRlZENvbnRleHRNYW5hZ2VyIH0gZnJvbSAnLi9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyJztcbmltcG9ydCB7IEJvaWxlclBsYXRlc01hbmFnZXIgfSBmcm9tICcuL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCB7IEh0dHBXcmFwcGVyIH0gZnJvbSAnLi9IdHRwV3JhcHBlcic7XG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi9Gb2xkZXJzJztcbmltcG9ydCB7IEFydGlmYWN0c01hbmFnZXIgfSBmcm9tICcuL2FydGlmYWN0cy9BcnRpZmFjdHNNYW5hZ2VyJztcbmltcG9ydCB7IElucXVpcmVyTWFuYWdlciB9IGZyb20gJy4vYXJ0aWZhY3RzL0lucXVpcmVyTWFuYWdlcic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfY29uZmlnUGFyc2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9hcHBsaWNhdGlvbk1hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2FydGlmYWN0c01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2JvdW5kZWRDb250ZXh0TWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaW5xdWlyZXJNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfbG9nZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9odHRwV3JhcHBlciA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogQ29tbW9uIGdsb2JhbCBvYmplY3RcbiAqL1xuY2xhc3MgZ2xvYmFsIHtcbiAgICBcblxuICAgIGdldCBzdXBwb3J0ZWRTREtMYW5ndWFnZXMoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBcImNzaGFycFwiLFxuICAgICAgICAgICAgJ2phdmFzY3JpcHQnXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0IGxhbmd1YWdlUXVlc3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgdHlwZTogJ3Jhd2xpc3QnLFxuICAgICAgICAgICAgbmFtZTogJ2xhbmd1YWdlJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdXaGljaCBTREsgbGFuZ3VhZ2UgYXJlIHlvdSB3b3JraW5nIGluPycsXG4gICAgICAgICAgICBjaG9pY2VzOiB0aGlzLnN1cHBvcnRlZFNES0xhbmd1YWdlc1xuICAgICAgICB9XTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBpbml0aWFsaXphdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBfbG9nZ2VyLnNldCh0aGlzLCB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7XG4gICAgICAgICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxuICAgICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LmNvbG9yaXplKCksXG4gICAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuc2ltcGxlKClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgICAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKClcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIF9odHRwV3JhcHBlci5zZXQodGhpcywgbmV3IEh0dHBXcmFwcGVyKCkpO1xuICAgICAgICBcbiAgICAgICAgX2NvbmZpZ1BhcnNlci5zZXQodGhpcywgbmV3IENvbmZpZ1BhcnNlcigpKTtcbiAgICAgICAgX2NvbmZpZ01hbmFnZXIuc2V0KHRoaXMsIG5ldyBDb25maWdNYW5hZ2VyKGZzLCB0aGlzLmNvbmZpZ1BhcnNlciwgdGhpcy5sb2dnZXIpKTtcblxuICAgICAgICBsZXQgZ2l0ID0gc2ltcGxlR2l0KHRoaXMuY29uZmlnTWFuYWdlci5jZW50cmFsRm9sZGVyTG9jYXRpb24pO1xuICAgICAgICBnaXQuZm9yRm9sZGVyID0gKGZvbGRlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNpbXBsZUdpdChmb2xkZXIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIF9naXQuc2V0KHRoaXMsIGdpdCk7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBuZXcgRm9sZGVycyhmcykpO1xuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5zZXQodGhpcywgbmV3IEJvaWxlclBsYXRlc01hbmFnZXIodGhpcy5jb25maWdNYW5hZ2VyLCB0aGlzLmh0dHBXcmFwcGVyLCB0aGlzLmdpdCwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2FwcGxpY2F0aW9uTWFuYWdlci5zZXQodGhpcywgbmV3IEFwcGxpY2F0aW9uTWFuYWdlcih0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuY29uZmlnTWFuYWdlciwgdGhpcy5mb2xkZXJzLCAgZnMsIHRoaXMubG9nZ2VyKSk7XG4gICAgICAgIF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuc2V0KHRoaXMsIG5ldyBCb3VuZGVkQ29udGV4dE1hbmFnZXIodGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmFwcGxpY2F0aW9uTWFuYWdlciwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgX2lucXVpcmVyTWFuYWdlci5zZXQodGhpcywgbmV3IElucXVpcmVyTWFuYWdlcih0aGlzLmZvbGRlcnMsIGZzLCB0aGlzLmxvZ2dlcikpO1xuICAgICAgICBfYXJ0aWZhY3RzTWFuYWdlci5zZXQodGhpcywgbmV3IEFydGlmYWN0c01hbmFnZXIodGhpcy5pbnF1aXJlck1hbmFnZXIsIHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5mb2xkZXJzLCBmcywgdGhpcy5sb2dnZXIpKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0NvbmZpZ01hbmFnZXJ9XG4gICAgICogQHJldHVybnMge0NvbmZpZ01hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGNvbmZpZ01hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnTWFuYWdlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUge0NvbmZpZ1BhcnNlcn1cbiAgICAgKiBAcmV0dXJucyB7Q29uZmlnUGFyc2VyfVxuICAgICAqL1xuICAgIGdldCBjb25maWdQYXJzZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29uZmlnUGFyc2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Rm9sZGVyc31cbiAgICAgKiBAcmV0dXJucyB7Rm9sZGVyc31cbiAgICAgKi9cbiAgICBnZXQgZm9sZGVycygpIHtcbiAgICAgICAgcmV0dXJuIF9mb2xkZXJzLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7QXBwbGljYXRpb25NYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtBcHBsaWNhdGlvbk1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGFwcGxpY2F0aW9uTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9hcHBsaWNhdGlvbk1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKiBcbiAgICAgKiBHZXRzIHRoZSB7QXJ0aWZhY3RzTWFuYWdlcn1cbiAgICAgKiBAcmV0dXJucyB7QXJ0aWZhY3RzTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXQgYXJ0aWZhY3RzTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9hcnRpZmFjdHNNYW5hZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7Qm91bmRlZENvbnRleHRNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtCb3VuZGVkQ29udGV4dE1hbmFnZXJ9XG4gICAgICovXG4gICAgZ2V0IGJvdW5kZWRDb250ZXh0TWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9ib3VuZGVkQ29udGV4dE1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZXNNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7SW5xdWlyZXJNYW5hZ2VyXG4gICAgICogQHJldHVybnMge0lucXVpcmVyTWFuYWdlcn19XG4gICAgICovXG4gICAgZ2V0IGlucXVpcmVyTWFuYWdlcigpIHtcbiAgICAgICAgcmV0dXJuIF9pbnF1aXJlck1hbmFnZXIuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtHaXR9IHN5c3RlbVxuICAgICAqIEByZXR1cm5zIHtHaXR9XG4gICAgICovXG4gICAgZ2V0IGdpdCgpIHtcbiAgICAgICAgcmV0dXJuIF9naXQuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHtMb2dnZXJ9XG4gICAgICogQHJldHVybnMge0xvZ2dlcn1cbiAgICAgKi9cbiAgICBnZXQgbG9nZ2VyKCkge8KgXG4gICAgICAgIHJldHVybiBfbG9nZ2VyLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB7SHR0cFdyYXBwZXJ9XG4gICAgICogQHJldHVybnMge0h0dHBXcmFwcGVyfVxuICAgICAqL1xuICAgIGdldCBodHRwV3JhcHBlcigpIHtcbiAgICAgICAgcmV0dXJuIF9odHRwV3JhcHBlci5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgZ2V0IHVzYWdlUHJlZml4KCkge1xuICAgICAgICByZXR1cm4gJ1xcblxcdCAnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBuYW1lc3BhY2UgYmFzZWQgb24gdGhlIGNsb3Nlc3QgY3Nwcm9qUGF0aCBhbmQgdGhlIGN3ZCBwYXRoXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGN1cnJlbnRQYXRoIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjc3Byb2pQYXRoIFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgY3JlYXRlQ1NoYXJwTmFtZXNwYWNlKGN1cnJlbnRQYXRoLCBjc3Byb2pQYXRoKSB7XG4gICAgICAgIGNvbnN0IGNzcHJvakZpbGVOYW1lID0gcGF0aC5wYXJzZSh0aGlzLmdldEZpbGVOYW1lKGNzcHJvalBhdGgpKS5uYW1lO1xuICAgICAgICBjb25zdCBjc3Byb2pGaWxlRGlyID0gdGhpcy5nZXRGaWxlTmFtZSh0aGlzLmdldEZpbGVEaXIoY3Nwcm9qUGF0aCkpO1xuICAgICAgICBsZXQgbmFtZXNwYWNlU2VnbWVudHMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGxldCBzZWdtZW50UGF0aCA9IGN1cnJlbnRQYXRoO1xuICAgICAgICBsZXQgc2VnbWVudCA9IHRoaXMuZ2V0RmlsZU5hbWUoc2VnbWVudFBhdGgpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdjc3Byb2pGaWxlTmFtZTogJywgY3Nwcm9qRmlsZU5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZygnY3Nwcm9qRmlsZURpcjogJywgY3Nwcm9qRmlsZURpcik7XG4gICAgICAgIHdoaWxlIChzZWdtZW50ICE9IGNzcHJvakZpbGVEaXIpIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlZ21lbnRQYXRoOiAnLCBzZWdtZW50UGF0aCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2VnbWVudDogJywgc2VnbWVudCk7XG4gICAgICAgICAgICBuYW1lc3BhY2VTZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xuICAgICAgICAgICAgc2VnbWVudFBhdGggPSB0aGlzLmdldEZpbGVEaXIoc2VnbWVudFBhdGgpO1xuICAgICAgICAgICAgc2VnbWVudCA9IHRoaXMuZ2V0RmlsZU5hbWUoc2VnbWVudFBhdGgpO1xuICAgICAgICB9IFxuICAgICAgICBuYW1lc3BhY2VTZWdtZW50cyA9IG5hbWVzcGFjZVNlZ21lbnRzLnJldmVyc2UoKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBuYW1lc3BhY2UgPSBjc3Byb2pGaWxlTmFtZTtcbiAgICAgICAgbmFtZXNwYWNlU2VnbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIG5hbWVzcGFjZSArPSAnLicgKyBlbGVtZW50O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5hbWVzcGFjZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcGF0aCBvZiB0aGUgbmVhcmVzdCAuY3Nwcm9qIGZpbGUsIHNlYXJjaGluZyB1cHdhcmRzIG5vdCByZWN1cnNpdmVseVxuICAgICAqL1xuICAgIGdldE5lYXJlc3RDc3Byb2pGaWxlKCkge1xuICAgICAgICBsZXQgY3VycmVudFBhdGggPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgICBsZXQgbGFzdFBhdGhTZXBJbmRleCA9IHRoaXMuZ2V0TGFzdFBhdGhTZXBhcmF0b3JJbmRleChjdXJyZW50UGF0aCk7XG4gICAgICAgIHdoaWxlIChsYXN0UGF0aFNlcEluZGV4ICE9IC0xICYmIGN1cnJlbnRQYXRoICE9IG51bGwgJiYgY3VycmVudFBhdGggIT0gJycpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLnNlYXJjaEZvbGRlcihjdXJyZW50UGF0aCwgJy5jc3Byb2onKTsgXG4gICAgICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPj0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0c1swXTtcbiAgICAgICAgICAgIGN1cnJlbnRQYXRoID0gY3VycmVudFBhdGguc3Vic3RyKDAsIGxhc3RQYXRoU2VwSW5kZXgpO1xuICAgICAgICAgICAgbGFzdFBhdGhTZXBJbmRleCA9IHRoaXMuZ2V0TGFzdFBhdGhTZXBhcmF0b3JJbmRleChjdXJyZW50UGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGluZGV4IG9mIHRoZSBsYXN0IHBhdGggc2VwYXJhdG9yIGluIHRoZSBwYXRoXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZpbGVQYXRoIFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IGluZGV4XG4gICAgICovXG4gICAgZ2V0TGFzdFBhdGhTZXBhcmF0b3JJbmRleChmaWxlUGF0aCkge1xuICAgICAgICBjb25zdCBsYXN0UGF0aFNlcGFyYXRvck1hdGNoID0gZmlsZVBhdGgubWF0Y2goLyhcXFxcfFxcLykvKTtcbiAgICAgICAgaWYgKGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2ggPT09IHVuZGVmaW5lZCB8fCBsYXN0UGF0aFNlcGFyYXRvck1hdGNoID09PSBudWxsIHx8IGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2gubGVuZ3RoID09IDApIFxuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gZmlsZVBhdGgubGFzdEluZGV4T2YobGFzdFBhdGhTZXBhcmF0b3JNYXRjaFtsYXN0UGF0aFNlcGFyYXRvck1hdGNoLmxlbmd0aC0xXSlcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZmlsZW5hbWUgLyBsYXN0IGRpcmVjdG9yeSBmcm9tIHRoZSBwYXRoXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZpbGVQYXRoIFxuICAgICAqL1xuICAgIGdldEZpbGVOYW1lKGZpbGVQYXRoKXtcbiAgICAgICAgcmV0dXJuIGZpbGVQYXRoLnN1YnN0cmluZyh0aGlzLmdldExhc3RQYXRoU2VwYXJhdG9ySW5kZXgoZmlsZVBhdGgpKzEsIGZpbGVQYXRoLmxlbmd0aCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRpcmVjdG9yeSBuYW1lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZpbGVQYXRoIFxuICAgICAqL1xuICAgIGdldEZpbGVEaXIoZmlsZVBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguZGlybmFtZShmaWxlUGF0aCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBnbG9iYWwoKTsiXX0=