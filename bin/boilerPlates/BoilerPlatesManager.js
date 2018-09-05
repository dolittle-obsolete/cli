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
                var template = _handlebars2.default.compile(_);
                var result = template(context);
                _fs2.default.renameSync(_, result);
            });

            boilerPlate.filesNeedingBinding.forEach(function (_) {
                var file = _path2.default.join(destination, _);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsImJpbmFyeUZpbGVzIiwiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2h0dHBXcmFwcGVyIiwiX2dpdCIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJfYm9pbGVyUGxhdGVzIiwiQm9pbGVyUGxhdGVzTWFuYWdlciIsImNvbmZpZ01hbmFnZXIiLCJodHRwV3JhcHBlciIsImdpdCIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsInJlYWRCb2lsZXJQbGF0ZXMiLCJsYW5ndWFnZSIsImdldCIsImZpbHRlciIsImJvaWxlclBsYXRlIiwidHlwZSIsImNvbmZpZ0ZpbGUiLCJib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUiLCJleGlzdHNTeW5jIiwianNvbiIsInJlYWRGaWxlU3luYyIsImJvaWxlclBsYXRlc0FzT2JqZWN0cyIsIkpTT04iLCJwYXJzZSIsImJvaWxlclBsYXRlcyIsImZvckVhY2giLCJCb2lsZXJQbGF0ZSIsImJvaWxlclBsYXRlT2JqZWN0IiwibmFtZSIsImRlc2NyaXB0aW9uIiwibG9jYXRpb24iLCJwYXRoc05lZWRpbmdCaW5kaW5nIiwiZmlsZXNOZWVkaW5nQmluZGluZyIsInB1c2giLCJsZW5ndGgiLCJ3YXJuIiwidXJpIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZ2V0SnNvbiIsInRoZW4iLCJyZXN1bHQiLCJ1cmxzIiwiaXRlbSIsImdldEZvbGRlcnNJbiIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJpbmZvIiwiZm9sZGVyIiwiZm9yRm9sZGVyIiwicHVsbCIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsIm5hbWVzIiwiZm9sZGVyTmFtZSIsInBhdGgiLCJqb2luIiwidXJsIiwic2lsZW50IiwiY2xvbmUiLCJ1cGRhdGVDb25maWd1cmF0aW9uIiwic2VsZiIsImJvaWxlclBsYXRlRmlsZSIsImJvaWxlclBsYXRlRnJvbUZpbGUiLCJyZXF1aXJlIiwiY29udGVudEZvbGRlciIsInBhdGhzIiwiZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbiIsImlzQmluYXJ5IiwiXyIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsImIiLCJtYXAiLCJzdWJzdHIiLCJzdGF0Iiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsImZpbGUiLCJ0b0pzb24iLCJib2lsZXJQbGF0ZXNBc0pzb24iLCJzdHJpbmdpZnkiLCJ3cml0ZUZpbGVTeW5jIiwiZGVzdGluYXRpb24iLCJjb250ZXh0IiwiY29weSIsInRlbXBsYXRlIiwiSGFuZGxlYmFycyIsImNvbXBpbGUiLCJmcyIsInJlbmFtZVN5bmMiLCJjb250ZW50IiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FqQkFBQTs7Ozs7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLG9CQUFvQixlQUExQjs7QUFFQSxJQUFNQyxjQUFjLENBQ2hCLE1BRGdCLEVBRWhCLE1BRmdCLEVBR2hCLE1BSGdCLEVBSWhCLE1BSmdCLEVBS2hCLE1BTGdCLEVBTWhCLE1BTmdCLEVBT2hCLE1BUGdCLENBQXBCOztBQVVBLElBQU1DLGlCQUFpQixJQUFJQyxPQUFKLEVBQXZCO0FBQ0EsSUFBTUMsZUFBZSxJQUFJRCxPQUFKLEVBQXJCO0FBQ0EsSUFBTUUsT0FBTyxJQUFJRixPQUFKLEVBQWI7QUFDQSxJQUFNRyxXQUFXLElBQUlILE9BQUosRUFBakI7QUFDQSxJQUFNSSxjQUFjLElBQUlKLE9BQUosRUFBcEI7O0FBRUEsSUFBTUssZ0JBQWdCLElBQUlMLE9BQUosRUFBdEI7O0FBRUE7Ozs7SUFHYU0sbUIsV0FBQUEsbUI7O0FBRVQ7Ozs7Ozs7OztB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QixtQkFBT2dFLGVBQUtDLElBQUwsQ0FBVS9ELGVBQWVrQixHQUFmLENBQW1CLElBQW5CLEVBQXlCaUYscUJBQW5DLEVBQXlELG9CQUF6RCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSW1CO0FBQ2YsbUJBQU83RixjQUFjWSxHQUFkLENBQWtCLElBQWxCLENBQVA7QUFDSCIsImZpbGUiOiJCb2lsZXJQbGF0ZXNNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgQ29uZmlnTWFuYWdlciB9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XG5pbXBvcnQgeyBIdHRwV3JhcHBlciB9IGZyb20gJy4uL0h0dHBXcmFwcGVyJztcbmltcG9ydCB7IEdpdCB9IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyDCoEJvaWxlclBsYXRlIH0gZnJvbSAnLi9Cb2lsZXJQbGF0ZSc7XG5pbXBvcnQgSGFuZGxlYmFycyBmcm9tICdoYW5kbGViYXJzJztcblxuY29uc3QgYm9pbGVyUGxhdGVGb2xkZXIgPSAnYm9pbGVyLXBsYXRlcyc7XG5cbmNvbnN0IGJpbmFyeUZpbGVzID0gW1xuICAgIFwiLmpwZ1wiLFxuICAgIFwiLnBuZ1wiLFxuICAgIFwiLm9ialwiLFxuICAgIFwiLmRsbFwiLFxuICAgIFwiLmJpblwiLFxuICAgIFwiLmV4ZVwiLFxuICAgIFwiLnR0ZlwiXG5dO1xuXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaHR0cFdyYXBwZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IF9ib2lsZXJQbGF0ZXMgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIG1hbmFnZXIgb2YgYm9pbGVyIHBsYXRlc1xuICovXG5leHBvcnQgY2xhc3MgQm9pbGVyUGxhdGVzTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0NvbmZpZ01hbmFnZXJ9IGNvbmZpZ01hbmFnZXIgXG4gICAgICogQHBhcmFtIHtIdHRwV3JhcHBlcn0gaHR0cFdyYXBwZXJcbiAgICAgKiBAcGFyYW0ge0dpdH0gZ2l0XG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXI7XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnTWFuYWdlciwgaHR0cFdyYXBwZXIsIGdpdCwgZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XG4gICAgICAgIF9jb25maWdNYW5hZ2VyLnNldCh0aGlzLCBjb25maWdNYW5hZ2VyKTtcbiAgICAgICAgX2h0dHBXcmFwcGVyLnNldCh0aGlzLCBodHRwV3JhcHBlcik7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICBfZ2l0LnNldCh0aGlzLCBnaXQpO1xuXG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgdGhpcy5yZWFkQm9pbGVyUGxhdGVzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBiYXNlIHBhdGggZm9yIGJvaWxlciBwbGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBCYXNlIHBhdGggb2YgYm9pbGVyIHBsYXRlc1xuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZUxvY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKS5jZW50cmFsRm9sZGVyTG9jYXRpb24sIGJvaWxlclBsYXRlRm9sZGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHBhdGggdG8gdGhlIGJvaWxlciBwbGF0ZXMgY29uZmlnIGZpbGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBQYXRoIHRvIHRoZSBjb25maWcgZmlsZVxuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUoKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oX2NvbmZpZ01hbmFnZXIuZ2V0KHRoaXMpLmNlbnRyYWxGb2xkZXJMb2NhdGlvbixcImJvaWxlci1wbGF0ZXMuanNvblwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXNcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVzKCkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzIGZvciB0aGUgbGFuZ3VhZ2VcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeUxhbmd1YWdlKGxhbmd1YWdlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5maWx0ZXIoYm9pbGVyUGxhdGUgPT4gYm9pbGVyUGxhdGUubGFuZ3VhZ2UgPT0gbGFuZ3VhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIGEgc3BlY2lmaWMgdHlwZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSB0eXBlXG4gICAgICovXG4gICAgYm9pbGVyUGxhdGVzQnlUeXBlKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS50eXBlID09IHR5cGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIGEgc3BlY2lmaWMgbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzIGZvciB0aGUgbGFuZ3VhZ2VcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZShsYW5ndWFnZSwgdHlwZSkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcykuZmlsdGVyKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLmxhbmd1YWdlID09IGxhbmd1YWdlICYmIGJvaWxlclBsYXRlLnR5cGUgPT0gdHlwZSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGFsbCBib2lsZXIgcGxhdGVzIGZyb20gZGlza1xuICAgICAqL1xuICAgIHJlYWRCb2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIGxldCBjb25maWdGaWxlID0gdGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGU7XG4gICAgICAgIGlmKCBfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhjb25maWdGaWxlKSApIHtcbiAgICAgICAgICAgIGxldCBqc29uID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhjb25maWdGaWxlKTtcbiAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc09iamVjdHMgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlcyA9IFtdO1xuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGJvaWxlclBsYXRlc0FzT2JqZWN0cy5mb3JFYWNoKGJvaWxlclBsYXRlT2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBuZXcgQm9pbGVyUGxhdGUoXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0Lmxhbmd1YWdlLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnBhdGhzTmVlZGluZ0JpbmRpbmd8fFtdLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5maWxlc05lZWRpbmdCaW5kaW5nfHxbXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVzLnB1c2goYm9pbGVyUGxhdGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXMuc2V0KHRoaXMsIGJvaWxlclBsYXRlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXMuc2V0KHRoaXMsIFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5sZW5ndGggPT0gMCApIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci53YXJuKFwiVGhlcmUgYXJlIG5vIGJvaWxlciBwbGF0ZXMgaW5zdGFsbGVkIC0gcnVuICdkb2xpdHRsZSB1cGRhdGUnIHRvIGdldCBpdCB1cGRhdGVkXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZyb20gR2l0SHViXG4gICAgICovXG4gICAgZ2V0QXZhaWxhYmxlQm9pbGVyUGxhdGVzKCkge1xuICAgICAgICBsZXQgdXJpID0gXCJodHRwczovL2FwaS5naXRodWIuY29tL29yZ3MvZG9saXR0bGUtYm9pbGVycGxhdGVzL3JlcG9zXCI7XG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgX2h0dHBXcmFwcGVyLmdldCh0aGlzKS5nZXRKc29uKHVyaSkudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgICAgICAgICBsZXQgdXJscyA9IFtdO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKGl0ZW0gPT4gdXJscy5wdXNoKGl0ZW0ubmFtZSkpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUodXJscyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhbnkgZXhpc3RpbmcgYm9pbGVyIHBsYXRlcyBvbiBkaXNrXG4gICAgICovXG4gICAgdXBkYXRlQm9pbGVyUGxhdGVzT25EaXNrKCkge1xuICAgICAgICBsZXQgZm9sZGVycyA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRGb2xkZXJzSW4odGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uKTtcbiAgICAgICAgZm9sZGVycy5mb3JFYWNoKGZvbGRlciA9PiB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgVXBkYXRlIGJvaWxlciBwbGF0ZSBpbiAnJHtmb2xkZXJ9J2ApO1xuICAgICAgICAgICAgX2dpdC5nZXQodGhpcykuZm9yRm9sZGVyKGZvbGRlcikucHVsbCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYm9pbGVyIHBsYXRlcy5cbiAgICAgKiBUaGlzIHdpbGwgdXBkYXRlIGFueSBleGlzdGluZyBhbmQgZG93bmxvYWQgYW55IG5ldyBvbmVzLlxuICAgICAqL1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oJ1VwZGF0aW5nIGFsbCBib2lsZXIgcGxhdGVzJyk7XG4gICAgICAgIHRoaXMudXBkYXRlQm9pbGVyUGxhdGVzT25EaXNrKCk7XG5cbiAgICAgICAgdGhpcy5nZXRBdmFpbGFibGVCb2lsZXJQbGF0ZXMoKS50aGVuKG5hbWVzID0+IHtcbiAgICAgICAgICAgIG5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvbGRlck5hbWUgPSBwYXRoLmpvaW4odGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uLCBuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoIV9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGZvbGRlck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSBgaHR0cHM6Ly9naXRodWIuY29tL2RvbGl0dGxlLWJvaWxlcnBsYXRlcy8ke25hbWV9LmdpdGA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBHZXR0aW5nIGJvaWxlcnBsYXRlIG5vdCBvbiBkaXNrIGZyb20gJyR7dXJsfSdgKTtcbiAgICAgICAgICAgICAgICAgICAgX2dpdC5nZXQodGhpcykuc2lsZW50KGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb25lKHVybCwgZm9sZGVyTmFtZSwgeyAnLS1yZWN1cnNpdmUnOiBudWxsIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbmZpZ3VyYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGNvbmZpZ3VyYXRpb24gZmlsZSBvbiBkaXNrXG4gICAgICovXG4gICAgdXBkYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgZm9sZGVycyA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRGb2xkZXJzSW4odGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uKTtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlcyA9IFtdO1xuICAgICAgICBmb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IHtcbiAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZUZpbGUgPSBwYXRoLmpvaW4oZm9sZGVyLCAnYm9pbGVycGxhdGUuanMnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKF9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGJvaWxlclBsYXRlRmlsZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVGcm9tRmlsZSA9IHJlcXVpcmUoYm9pbGVyUGxhdGVGaWxlKTtcbiAgICAgICAgICAgICAgICBsZXQgY29udGVudEZvbGRlciA9IHBhdGguam9pbihmb2xkZXIsIFwiY29udGVudFwiKTsgXG5cbiAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbihjb250ZW50Rm9sZGVyKTtcbiAgICAgICAgICAgICAgICBwYXRocyA9IHBhdGhzLmZpbHRlcihfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlzQmluYXJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeUZpbGVzLmZvckVhY2goYiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihiKT4wKSBpc0JpbmFyeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWlzQmluYXJ5O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxldCBwYXRoc05lZWRpbmdCaW5kaW5nID0gcGF0aHMuZmlsdGVyKF8gPT4gXy5pbmRleE9mKCd7eycpID4gMCkubWFwKF8gPT4gXy5zdWJzdHIoY29udGVudEZvbGRlci5sZW5ndGgrMSkpO1xuICAgICAgICAgICAgICAgIGxldCBmaWxlc05lZWRpbmdCaW5kaW5nID0gW107XG5cbiAgICAgICAgICAgICAgICBwYXRocy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhfKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoICFzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnJlYWRGaWxlU3luYyhfKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBmaWxlLmluZGV4T2YoJ3t7JykgPj0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlc05lZWRpbmdCaW5kaW5nLnB1c2goXy5zdWJzdHIoY29udGVudEZvbGRlci5sZW5ndGgrMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBuZXcgQm9pbGVyUGxhdGUoXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlRnJvbUZpbGUubGFuZ3VhZ2UgfHwgJ2FueScsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlRnJvbUZpbGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVGcm9tRmlsZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVGcm9tRmlsZS50eXBlLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50Rm9sZGVyLFxuICAgICAgICAgICAgICAgICAgICBwYXRoc05lZWRpbmdCaW5kaW5nLFxuICAgICAgICAgICAgICAgICAgICBmaWxlc05lZWRpbmdCaW5kaW5nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZXMucHVzaChib2lsZXJQbGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc09iamVjdHMgPSBib2lsZXJQbGF0ZXMubWFwKF8gPT4gXy50b0pzb24oKSk7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc0pzb24gPSBKU09OLnN0cmluZ2lmeShib2lsZXJQbGF0ZXNBc09iamVjdHMsIG51bGwsIDQpO1xuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyh0aGlzLmJvaWxlclBsYXRlQ29uZmlnRmlsZSwgYm9pbGVyUGxhdGVzQXNKc29uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlfSBib2lsZXJQbGF0ZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb24gXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHQgXG4gICAgICovXG4gICAgY3JlYXRlSW5zdGFuY2UoYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIF9mb2xkZXJzLmdldCh0aGlzKS5jb3B5KGRlc3RpbmF0aW9uLCBib2lsZXJQbGF0ZS5sb2NhdGlvbik7XG4gICAgICAgIGJvaWxlclBsYXRlLnBhdGhzTmVlZGluZ0JpbmRpbmcuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShfKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0ZW1wbGF0ZShjb250ZXh0KTtcbiAgICAgICAgICAgIGZzLnJlbmFtZVN5bmMoXywgcmVzdWx0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYm9pbGVyUGxhdGUuZmlsZXNOZWVkaW5nQmluZGluZy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgbGV0IGZpbGUgPSBwYXRoLmpvaW4oZGVzdGluYXRpb24sXyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhmaWxlLCAndXRmOCcpXG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUoY29udGVudCk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGVtcGxhdGUoY29udGV4dCk7XG4gICAgICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyhmaWxlLCByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9XG59Il19