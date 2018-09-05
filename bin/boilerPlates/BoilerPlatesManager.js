'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BoilerPlatesManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*---------------------------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) Dolittle. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *--------------------------------------------------------------------------------------------*/


var _ConfigManager = require('../configuration/ConfigManager');

var _HttpWrapper = require('../HttpWrapper');

var _simpleGit = require('simple-git');

var _Folders = require('../Folders');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _winston = require('winston');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _BoilerPlate = require('./BoilerPlate');

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var boilerPlateFolder = 'boiler-plates';

var binaryFiles = [".jpg", ".png", ".obj", ".dll", ".bin", ".exe", ".ttf"];

var _configManager = new WeakMap();
var _httpWrapper = new WeakMap();
var _git = new WeakMap();
var _folders = new WeakMap();
var _fileSystem = new WeakMap();

var _boilerPlates = new WeakMap();

/**
 * Represents the manager of boiler plates
 */

var BoilerPlatesManager = exports.BoilerPlatesManager = function () {

    /**
     * Initializes a new instance of {BoilerPlatesManager}
     * @param {ConfigManager} configManager 
     * @param {HttpWrapper} httpWrapper
     * @param {Git} git
     * @param {Folders} folders
     * @param {fs} fileSystem
     * @param {Logger} logger;
     */
    function BoilerPlatesManager(configManager, httpWrapper, git, folders, fileSystem, logger) {
        _classCallCheck(this, BoilerPlatesManager);

        _configManager.set(this, configManager);
        _httpWrapper.set(this, httpWrapper);
        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
        _git.set(this, git);

        this._logger = logger;
        this.readBoilerPlates();
    }

    /**
     * Gets base path for boiler plates
     * @returns {string} Base path of boiler plates
     */


    _createClass(BoilerPlatesManager, [{
        key: 'boilerPlatesByLanguage',


        /**
         * Get all available boiler plates for a specific language
         * @param {string} language
         * @returns {BoilerPlate[]} Avaiable boiler plates for the language
         */
        value: function boilerPlatesByLanguage(language) {
            return _boilerPlates.get(this).filter(function (boilerPlate) {
                return boilerPlate.language == language;
            });
        }

        /**
         * Get all available boiler plates for a specific type
         * @param {string} type
         * @returns {BoilerPlate[]} Avaiable boiler plates for the type
         */

    }, {
        key: 'boilerPlatesByType',
        value: function boilerPlatesByType(type) {
            return _boilerPlates.get(this).filter(function (boilerPlate) {
                return boilerPlate.type == type;
            });
        }

        /**
         * Get all available boiler plates for a specific language
         * @param {string} language
         * @param {string} type
         * @returns {BoilerPlate[]} Avaiable boiler plates for the language
         */

    }, {
        key: 'boilerPlatesByLanguageAndType',
        value: function boilerPlatesByLanguageAndType(language, type) {
            return _boilerPlates.get(this).filter(function (boilerPlate) {
                return boilerPlate.language == language && boilerPlate.type == type;
            });
        }

        /**
         * Read all boiler plates from disk
         */

    }, {
        key: 'readBoilerPlates',
        value: function readBoilerPlates() {
            var configFile = this.boilerPlateConfigFile;
            if (_fileSystem.get(this).existsSync(configFile)) {
                var json = _fileSystem.get(this).readFileSync(configFile);
                var boilerPlatesAsObjects = JSON.parse(json);
                var boilerPlates = [];

                boilerPlatesAsObjects.forEach(function (boilerPlateObject) {
                    var boilerPlate = new _BoilerPlate.BoilerPlate(boilerPlateObject.language, boilerPlateObject.name, boilerPlateObject.description, boilerPlateObject.type, boilerPlateObject.location, boilerPlateObject.pathsNeedingBinding || [], boilerPlateObject.filesNeedingBinding || []);
                    boilerPlates.push(boilerPlate);
                });

                _boilerPlates.set(this, boilerPlates);
            } else {

                _boilerPlates.set(this, []);
            }

            if (_boilerPlates.get(this).length == 0) {
                this._logger.warn("There are no boiler plates installed - run 'dolittle update' to get it updated");
            }
        }

        /**
         * Get available boiler plates from GitHub
         */

    }, {
        key: 'getAvailableBoilerPlates',
        value: function getAvailableBoilerPlates() {
            var _this = this;

            var uri = "https://api.github.com/orgs/dolittle-boilerplates/repos";
            var promise = new Promise(function (resolve, reject) {
                _httpWrapper.get(_this).getJson(uri).then(function (json) {
                    var result = JSON.parse(json);
                    var urls = [];
                    result.forEach(function (item) {
                        return urls.push(item.name);
                    });
                    resolve(urls);
                });
            });
            return promise;
        }

        /**
         * Update any existing boiler plates on disk
         */

    }, {
        key: 'updateBoilerPlatesOnDisk',
        value: function updateBoilerPlatesOnDisk() {
            var _this2 = this;

            var folders = _folders.get(this).getFoldersIn(this.boilerPlateLocation);
            folders.forEach(function (folder) {
                _this2._logger.info('Update boiler plate in \'' + folder + '\'');
                _git.get(_this2).forFolder(folder).pull();
            });
        }

        /**
         * Update boiler plates.
         * This will update any existing and download any new ones.
         */

    }, {
        key: 'update',
        value: function update() {
            var _this3 = this;

            this._logger.info('Updating all boiler plates');
            this.updateBoilerPlatesOnDisk();

            this.getAvailableBoilerPlates().then(function (names) {
                names.forEach(function (name) {
                    var folderName = _path2.default.join(_this3.boilerPlateLocation, name);
                    if (!_fileSystem.get(_this3).existsSync(folderName)) {
                        var url = 'https://github.com/dolittle-boilerplates/' + name + '.git';
                        _this3._logger.info('Getting boilerplate not on disk from \'' + url + '\'');
                        _git.get(_this3).silent(false).clone(url, folderName, { '--recursive': null });
                    }
                });

                _this3.updateConfiguration();
            });
        }

        /**
         * Update configuration file on disk
         */

    }, {
        key: 'updateConfiguration',
        value: function updateConfiguration() {
            var _this4 = this;

            var self = this;
            var folders = _folders.get(this).getFoldersIn(this.boilerPlateLocation);
            var boilerPlates = [];
            folders.forEach(function (folder) {
                var boilerPlateFile = _path2.default.join(folder, 'boilerplate.js');

                if (_fileSystem.get(_this4).existsSync(boilerPlateFile)) {
                    var boilerPlateFromFile = require(boilerPlateFile);
                    var contentFolder = _path2.default.join(folder, "content");

                    var paths = _folders.get(_this4).getFoldersAndFilesRecursivelyIn(contentFolder);
                    paths = paths.filter(function (_) {
                        var isBinary = false;
                        binaryFiles.forEach(function (b) {
                            if (_.toLowerCase().indexOf(b) > 0) isBinary = true;
                        });
                        return !isBinary;
                    });
                    var pathsNeedingBinding = paths.filter(function (_) {
                        return _.indexOf('{{') > 0;
                    }).map(function (_) {
                        return _.substr(contentFolder.length + 1);
                    });
                    var filesNeedingBinding = [];

                    paths.forEach(function (_) {
                        var stat = _fileSystem.get(self).statSync(_);
                        if (!stat.isDirectory()) {
                            var file = _fileSystem.get(self).readFileSync(_);
                            if (file.indexOf('{{') >= 0) {
                                filesNeedingBinding.push(_.substr(contentFolder.length + 1));
                            }
                        }
                    });

                    var boilerPlate = new _BoilerPlate.BoilerPlate(boilerPlateFromFile.language || 'any', boilerPlateFromFile.name, boilerPlateFromFile.description, boilerPlateFromFile.type, contentFolder, pathsNeedingBinding, filesNeedingBinding);
                    boilerPlates.push(boilerPlate);
                }
            });

            var boilerPlatesAsObjects = boilerPlates.map(function (_) {
                return _.toJson();
            });
            var boilerPlatesAsJson = JSON.stringify(boilerPlatesAsObjects, null, 4);
            _fileSystem.get(this).writeFileSync(this.boilerPlateConfigFile, boilerPlatesAsJson);
        }

        /**
         * 
         * @param {BoilerPlate} boilerPlate 
         * @param {string} destination 
         * @param {object} context 
         */

    }, {
        key: 'createInstance',
        value: function createInstance(boilerPlate, destination, context) {
            var _this5 = this;

            _folders.get(this).copy(destination, boilerPlate.location);
            boilerPlate.pathsNeedingBinding.forEach(function (_) {
                var pathToRename = _path2.default.join(destination, _);
                var template = _handlebars2.default.compile(pathToRename);
                var result = template(context);
                _fs2.default.renameSync(pathToRename, result);
            });

            boilerPlate.filesNeedingBinding.forEach(function (_) {
                var file = _path2.default.join(destination, _);
                console.log("File : " + file);

                var content = _fileSystem.get(_this5).readFileSync(file, 'utf8');
                var template = _handlebars2.default.compile(content);
                var result = template(context);
                _fileSystem.get(_this5).writeFileSync(file, result);
            });
        }
    }, {
        key: 'boilerPlateLocation',
        get: function get() {
            return _path2.default.join(_configManager.get(this).centralFolderLocation, boilerPlateFolder);
        }

        /**
         * Gets path to the boiler plates config file
         * @returns {string} Path to the config file
         */

    }, {
        key: 'boilerPlateConfigFile',
        get: function get() {
            return _path2.default.join(_configManager.get(this).centralFolderLocation, "boiler-plates.json");
        }

        /**
         * Get all available boiler plates
         * @returns {BoilerPlate[]} Avaiable boiler plates
         */

    }, {
        key: 'boilerPlates',
        get: function get() {
            return _boilerPlates.get(this);
        }
    }]);

    return BoilerPlatesManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsImJpbmFyeUZpbGVzIiwiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2h0dHBXcmFwcGVyIiwiX2dpdCIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJfYm9pbGVyUGxhdGVzIiwiQm9pbGVyUGxhdGVzTWFuYWdlciIsImNvbmZpZ01hbmFnZXIiLCJodHRwV3JhcHBlciIsImdpdCIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsInJlYWRCb2lsZXJQbGF0ZXMiLCJsYW5ndWFnZSIsImdldCIsImZpbHRlciIsImJvaWxlclBsYXRlIiwidHlwZSIsImNvbmZpZ0ZpbGUiLCJib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUiLCJleGlzdHNTeW5jIiwianNvbiIsInJlYWRGaWxlU3luYyIsImJvaWxlclBsYXRlc0FzT2JqZWN0cyIsIkpTT04iLCJwYXJzZSIsImJvaWxlclBsYXRlcyIsImZvckVhY2giLCJCb2lsZXJQbGF0ZSIsImJvaWxlclBsYXRlT2JqZWN0IiwibmFtZSIsImRlc2NyaXB0aW9uIiwibG9jYXRpb24iLCJwYXRoc05lZWRpbmdCaW5kaW5nIiwiZmlsZXNOZWVkaW5nQmluZGluZyIsInB1c2giLCJsZW5ndGgiLCJ3YXJuIiwidXJpIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZ2V0SnNvbiIsInRoZW4iLCJyZXN1bHQiLCJ1cmxzIiwiaXRlbSIsImdldEZvbGRlcnNJbiIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJpbmZvIiwiZm9sZGVyIiwiZm9yRm9sZGVyIiwicHVsbCIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsIm5hbWVzIiwiZm9sZGVyTmFtZSIsInBhdGgiLCJqb2luIiwidXJsIiwic2lsZW50IiwiY2xvbmUiLCJ1cGRhdGVDb25maWd1cmF0aW9uIiwic2VsZiIsImJvaWxlclBsYXRlRmlsZSIsImJvaWxlclBsYXRlRnJvbUZpbGUiLCJyZXF1aXJlIiwiY29udGVudEZvbGRlciIsInBhdGhzIiwiZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbiIsImlzQmluYXJ5IiwiXyIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsImIiLCJtYXAiLCJzdWJzdHIiLCJzdGF0Iiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsImZpbGUiLCJ0b0pzb24iLCJib2lsZXJQbGF0ZXNBc0pzb24iLCJzdHJpbmdpZnkiLCJ3cml0ZUZpbGVTeW5jIiwiZGVzdGluYXRpb24iLCJjb250ZXh0IiwiY29weSIsInBhdGhUb1JlbmFtZSIsInRlbXBsYXRlIiwiSGFuZGxlYmFycyIsImNvbXBpbGUiLCJmcyIsInJlbmFtZVN5bmMiLCJjb25zb2xlIiwibG9nIiwiY29udGVudCIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxakJBQUE7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxvQkFBb0IsZUFBMUI7O0FBRUEsSUFBTUMsY0FBYyxDQUNoQixNQURnQixFQUVoQixNQUZnQixFQUdoQixNQUhnQixFQUloQixNQUpnQixFQUtoQixNQUxnQixFQU1oQixNQU5nQixFQU9oQixNQVBnQixDQUFwQjs7QUFVQSxJQUFNQyxpQkFBaUIsSUFBSUMsT0FBSixFQUF2QjtBQUNBLElBQU1DLGVBQWUsSUFBSUQsT0FBSixFQUFyQjtBQUNBLElBQU1FLE9BQU8sSUFBSUYsT0FBSixFQUFiO0FBQ0EsSUFBTUcsV0FBVyxJQUFJSCxPQUFKLEVBQWpCO0FBQ0EsSUFBTUksY0FBYyxJQUFJSixPQUFKLEVBQXBCOztBQUVBLElBQU1LLGdCQUFnQixJQUFJTCxPQUFKLEVBQXRCOztBQUVBOzs7O0lB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OzRCQW5OeUI7QUFDdEIsbUJBQU9hLGVBQUtDLElBQUwsQ0FBVS9ELGVBQWVrQixHQUFmLENBQW1CLElBQW5CLEVBQXlCb0YscUJBQW5DLEVBQTBEeEcsaUJBQTFELENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJNEI7QUFDeEIsbUJBQU9nRSxlQUFLQyxJQUFMLENBQVUvRCxlQUFla0IsR0FBZixDQUFtQixJQUFuQixFQUF5Qm9GLHFCQUFuQyxFQUF5RCxvQkFBekQsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OzRCQUltQjtBQUNmLG1CQUFPaEcsY0FBY1ksR0FBZCxDQUFrQixJQUFsQixDQUFQO0FBQ0giLCJmaWxlIjoiQm9pbGVyUGxhdGVzTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IENvbmZpZ01hbmFnZXIgfSBmcm9tICcuLi9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0IHsgSHR0cFdyYXBwZXIgfSBmcm9tICcuLi9IdHRwV3JhcHBlcic7XG5pbXBvcnQgeyBHaXQgfSBmcm9tICdzaW1wbGUtZ2l0JztcbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgwqBCb2lsZXJQbGF0ZSB9IGZyb20gJy4vQm9pbGVyUGxhdGUnO1xuaW1wb3J0IEhhbmRsZWJhcnMgZnJvbSAnaGFuZGxlYmFycyc7XG5cbmNvbnN0IGJvaWxlclBsYXRlRm9sZGVyID0gJ2JvaWxlci1wbGF0ZXMnO1xuXG5jb25zdCBiaW5hcnlGaWxlcyA9IFtcbiAgICBcIi5qcGdcIixcbiAgICBcIi5wbmdcIixcbiAgICBcIi5vYmpcIixcbiAgICBcIi5kbGxcIixcbiAgICBcIi5iaW5cIixcbiAgICBcIi5leGVcIixcbiAgICBcIi50dGZcIlxuXTtcblxuY29uc3QgX2NvbmZpZ01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2h0dHBXcmFwcGVyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9naXQgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBfYm9pbGVyUGxhdGVzID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBtYW5hZ2VyIG9mIGJvaWxlciBwbGF0ZXNcbiAqL1xuZXhwb3J0IGNsYXNzIEJvaWxlclBsYXRlc01hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0JvaWxlclBsYXRlc01hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtDb25maWdNYW5hZ2VyfSBjb25maWdNYW5hZ2VyIFxuICAgICAqIEBwYXJhbSB7SHR0cFdyYXBwZXJ9IGh0dHBXcmFwcGVyXG4gICAgICogQHBhcmFtIHtHaXR9IGdpdFxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyO1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ01hbmFnZXIsIGh0dHBXcmFwcGVyLCBnaXQsIGZvbGRlcnMsIGZpbGVTeXN0ZW0sIGxvZ2dlcikge1xuICAgICAgICBfY29uZmlnTWFuYWdlci5zZXQodGhpcywgY29uZmlnTWFuYWdlcik7XG4gICAgICAgIF9odHRwV3JhcHBlci5zZXQodGhpcywgaHR0cFdyYXBwZXIpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgX2dpdC5zZXQodGhpcywgZ2l0KTtcblxuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIHRoaXMucmVhZEJvaWxlclBsYXRlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYmFzZSBwYXRoIGZvciBib2lsZXIgcGxhdGVzXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQmFzZSBwYXRoIG9mIGJvaWxlciBwbGF0ZXNcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVMb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihfY29uZmlnTWFuYWdlci5nZXQodGhpcykuY2VudHJhbEZvbGRlckxvY2F0aW9uLCBib2lsZXJQbGF0ZUZvbGRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBwYXRoIHRvIHRoZSBib2lsZXIgcGxhdGVzIGNvbmZpZyBmaWxlXG4gICAgICogQHJldHVybnMge3N0cmluZ30gUGF0aCB0byB0aGUgY29uZmlnIGZpbGVcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVDb25maWdGaWxlKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKS5jZW50cmFsRm9sZGVyTG9jYXRpb24sXCJib2lsZXItcGxhdGVzLmpzb25cIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlc1xuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzXG4gICAgICovXG4gICAgZ2V0IGJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIGEgc3BlY2lmaWMgbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlcyBmb3IgdGhlIGxhbmd1YWdlXG4gICAgICovXG4gICAgYm9pbGVyUGxhdGVzQnlMYW5ndWFnZShsYW5ndWFnZSkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcykuZmlsdGVyKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLmxhbmd1YWdlID09IGxhbmd1YWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIHR5cGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzIGZvciB0aGUgdHlwZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5VHlwZSh0eXBlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5maWx0ZXIoYm9pbGVyUGxhdGUgPT4gYm9pbGVyUGxhdGUudHlwZSA9PSB0eXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlcyBmb3IgdGhlIGxhbmd1YWdlXG4gICAgICovXG4gICAgYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUobGFuZ3VhZ2UsIHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS5sYW5ndWFnZSA9PSBsYW5ndWFnZSAmJiBib2lsZXJQbGF0ZS50eXBlID09IHR5cGUpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVhZCBhbGwgYm9pbGVyIHBsYXRlcyBmcm9tIGRpc2tcbiAgICAgKi9cbiAgICByZWFkQm9pbGVyUGxhdGVzKCkge1xuICAgICAgICBsZXQgY29uZmlnRmlsZSA9IHRoaXMuYm9pbGVyUGxhdGVDb25maWdGaWxlO1xuICAgICAgICBpZiggX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmV4aXN0c1N5bmMoY29uZmlnRmlsZSkgKSB7XG4gICAgICAgICAgICBsZXQganNvbiA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoY29uZmlnRmlsZSk7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNPYmplY3RzID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZXMgPSBbXTtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBib2lsZXJQbGF0ZXNBc09iamVjdHMuZm9yRWFjaChib2lsZXJQbGF0ZU9iamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gbmV3IEJvaWxlclBsYXRlKFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5wYXRoc05lZWRpbmdCaW5kaW5nfHxbXSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZmlsZXNOZWVkaW5nQmluZGluZ3x8W11cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlcy5wdXNoKGJvaWxlclBsYXRlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfYm9pbGVyUGxhdGVzLnNldCh0aGlzLCBib2lsZXJQbGF0ZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBfYm9pbGVyUGxhdGVzLnNldCh0aGlzLCBbXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggX2JvaWxlclBsYXRlcy5nZXQodGhpcykubGVuZ3RoID09IDAgKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIud2FybihcIlRoZXJlIGFyZSBubyBib2lsZXIgcGxhdGVzIGluc3RhbGxlZCAtIHJ1biAnZG9saXR0bGUgdXBkYXRlJyB0byBnZXQgaXQgdXBkYXRlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmcm9tIEdpdEh1YlxuICAgICAqL1xuICAgIGdldEF2YWlsYWJsZUJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgbGV0IHVyaSA9IFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9vcmdzL2RvbGl0dGxlLWJvaWxlcnBsYXRlcy9yZXBvc1wiO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIF9odHRwV3JhcHBlci5nZXQodGhpcykuZ2V0SnNvbih1cmkpLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICAgICAgbGV0IHVybHMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaChpdGVtID0+IHVybHMucHVzaChpdGVtLm5hbWUpKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHVybHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW55IGV4aXN0aW5nIGJvaWxlciBwbGF0ZXMgb24gZGlza1xuICAgICAqL1xuICAgIHVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpIHtcbiAgICAgICAgbGV0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG4gICAgICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYFVwZGF0ZSBib2lsZXIgcGxhdGUgaW4gJyR7Zm9sZGVyfSdgKTtcbiAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpLmZvckZvbGRlcihmb2xkZXIpLnB1bGwoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGJvaWxlciBwbGF0ZXMuXG4gICAgICogVGhpcyB3aWxsIHVwZGF0ZSBhbnkgZXhpc3RpbmcgYW5kIGRvd25sb2FkIGFueSBuZXcgb25lcy5cbiAgICAgKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdVcGRhdGluZyBhbGwgYm9pbGVyIHBsYXRlcycpO1xuICAgICAgICB0aGlzLnVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpO1xuXG4gICAgICAgIHRoaXMuZ2V0QXZhaWxhYmxlQm9pbGVyUGxhdGVzKCkudGhlbihuYW1lcyA9PiB7XG4gICAgICAgICAgICBuYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb2xkZXJOYW1lID0gcGF0aC5qb2luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbiwgbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhmb2xkZXJOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gYGh0dHBzOi8vZ2l0aHViLmNvbS9kb2xpdHRsZS1ib2lsZXJwbGF0ZXMvJHtuYW1lfS5naXRgO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgR2V0dGluZyBib2lsZXJwbGF0ZSBub3Qgb24gZGlzayBmcm9tICcke3VybH0nYCk7XG4gICAgICAgICAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpLnNpbGVudChmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9uZSh1cmwsIGZvbGRlck5hbWUsIHsgJy0tcmVjdXJzaXZlJzogbnVsbCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVDb25maWd1cmF0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBjb25maWd1cmF0aW9uIGZpbGUgb24gZGlza1xuICAgICAqL1xuICAgIHVwZGF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXMgPSBbXTtcbiAgICAgICAgZm9sZGVycy5mb3JFYWNoKGZvbGRlciA9PiB7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVGaWxlID0gcGF0aC5qb2luKGZvbGRlciwgJ2JvaWxlcnBsYXRlLmpzJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhib2lsZXJQbGF0ZUZpbGUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlRnJvbUZpbGUgPSByZXF1aXJlKGJvaWxlclBsYXRlRmlsZSk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnRGb2xkZXIgPSBwYXRoLmpvaW4oZm9sZGVyLCBcImNvbnRlbnRcIik7IFxuXG4gICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oY29udGVudEZvbGRlcik7XG4gICAgICAgICAgICAgICAgcGF0aHMgPSBwYXRocy5maWx0ZXIoXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpc0JpbmFyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBiaW5hcnlGaWxlcy5mb3JFYWNoKGIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoXy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoYik+MCkgaXNCaW5hcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc0JpbmFyeTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsZXQgcGF0aHNOZWVkaW5nQmluZGluZyA9IHBhdGhzLmZpbHRlcihfID0+IF8uaW5kZXhPZigne3snKSA+IDApLm1hcChfID0+IF8uc3Vic3RyKGNvbnRlbnRGb2xkZXIubGVuZ3RoKzEpKTtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZXNOZWVkaW5nQmluZGluZyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgcGF0aHMuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoXyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKCAhc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5yZWFkRmlsZVN5bmMoXyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggZmlsZS5pbmRleE9mKCd7eycpID49IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXNOZWVkaW5nQmluZGluZy5wdXNoKF8uc3Vic3RyKGNvbnRlbnRGb2xkZXIubGVuZ3RoKzEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gbmV3IEJvaWxlclBsYXRlKFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZUZyb21GaWxlLmxhbmd1YWdlIHx8ICdhbnknLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZUZyb21GaWxlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlRnJvbUZpbGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlRnJvbUZpbGUudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEZvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgcGF0aHNOZWVkaW5nQmluZGluZyxcbiAgICAgICAgICAgICAgICAgICAgZmlsZXNOZWVkaW5nQmluZGluZ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVzLnB1c2goYm9pbGVyUGxhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNPYmplY3RzID0gYm9pbGVyUGxhdGVzLm1hcChfID0+IF8udG9Kc29uKCkpO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNKc29uID0gSlNPTi5zdHJpbmdpZnkoYm9pbGVyUGxhdGVzQXNPYmplY3RzLCBudWxsLCA0KTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmModGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUsIGJvaWxlclBsYXRlc0FzSnNvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtCb2lsZXJQbGF0ZX0gYm9pbGVyUGxhdGUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IFxuICAgICAqL1xuICAgIGNyZWF0ZUluc3RhbmNlKGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCkge1xuICAgICAgICBfZm9sZGVycy5nZXQodGhpcykuY29weShkZXN0aW5hdGlvbiwgYm9pbGVyUGxhdGUubG9jYXRpb24pO1xuICAgICAgICBib2lsZXJQbGF0ZS5wYXRoc05lZWRpbmdCaW5kaW5nLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICBsZXQgcGF0aFRvUmVuYW1lID0gcGF0aC5qb2luKGRlc3RpbmF0aW9uLCBfKTtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShwYXRoVG9SZW5hbWUpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRlbXBsYXRlKGNvbnRleHQpO1xuICAgICAgICAgICAgZnMucmVuYW1lU3luYyhwYXRoVG9SZW5hbWUsIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJvaWxlclBsYXRlLmZpbGVzTmVlZGluZ0JpbmRpbmcuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgIGxldCBmaWxlID0gcGF0aC5qb2luKGRlc3RpbmF0aW9uLF8pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIDogXCIrZmlsZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhmaWxlLCAndXRmOCcpXG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUoY29udGVudCk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGVtcGxhdGUoY29udGV4dCk7XG4gICAgICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyhmaWxlLCByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9XG59Il19