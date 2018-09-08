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

        folders.makeFolderIfNotExists(this.boilerPlateLocation);

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
                var cloneCount = 0;
                names.forEach(function (name) {

                    var folderName = _path2.default.join(_this3.boilerPlateLocation, name);
                    if (!_fileSystem.get(_this3).existsSync(folderName)) {
                        var url = 'https://github.com/dolittle-boilerplates/' + name + '.git';
                        _this3._logger.info('Getting boilerplate not on disk from \'' + url + '\'');
                        cloneCount++;
                        _git.get(_this3).silent(false).clone(url, folderName, { '--recursive': null }).exec(function () {
                            if (--cloneCount == 0) {
                                _this3.updateConfiguration();
                            }
                        });
                    }
                });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsImJpbmFyeUZpbGVzIiwiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2h0dHBXcmFwcGVyIiwiX2dpdCIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJfYm9pbGVyUGxhdGVzIiwiQm9pbGVyUGxhdGVzTWFuYWdlciIsImNvbmZpZ01hbmFnZXIiLCJodHRwV3JhcHBlciIsImdpdCIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwibWFrZUZvbGRlcklmTm90RXhpc3RzIiwiYm9pbGVyUGxhdGVMb2NhdGlvbiIsIl9sb2dnZXIiLCJyZWFkQm9pbGVyUGxhdGVzIiwibGFuZ3VhZ2UiLCJnZXQiLCJmaWx0ZXIiLCJib2lsZXJQbGF0ZSIsInR5cGUiLCJjb25maWdGaWxlIiwiYm9pbGVyUGxhdGVDb25maWdGaWxlIiwiZXhpc3RzU3luYyIsImpzb24iLCJyZWFkRmlsZVN5bmMiLCJib2lsZXJQbGF0ZXNBc09iamVjdHMiLCJKU09OIiwicGFyc2UiLCJib2lsZXJQbGF0ZXMiLCJmb3JFYWNoIiwiQm9pbGVyUGxhdGUiLCJib2lsZXJQbGF0ZU9iamVjdCIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsImxvY2F0aW9uIiwicGF0aHNOZWVkaW5nQmluZGluZyIsImZpbGVzTmVlZGluZ0JpbmRpbmciLCJwdXNoIiwibGVuZ3RoIiwid2FybiIsInVyaSIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImdldEpzb24iLCJ0aGVuIiwicmVzdWx0IiwidXJscyIsIml0ZW0iLCJnZXRGb2xkZXJzSW4iLCJpbmZvIiwiZm9sZGVyIiwiZm9yRm9sZGVyIiwicHVsbCIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsImNsb25lQ291bnQiLCJuYW1lcyIsImZvbGRlck5hbWUiLCJwYXRoIiwiam9pbiIsInVybCIsInNpbGVudCIsImNsb25lIiwiZXhlYyIsInVwZGF0ZUNvbmZpZ3VyYXRpb24iLCJzZWxmIiwiYm9pbGVyUGxhdGVGaWxlIiwiYm9pbGVyUGxhdGVGcm9tRmlsZSIsInJlcXVpcmUiLCJjb250ZW50Rm9sZGVyIiwicGF0aHMiLCJnZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluIiwiaXNCaW5hcnkiLCJfIiwidG9Mb3dlckNhc2UiLCJpbmRleE9mIiwiYiIsIm1hcCIsInN1YnN0ciIsInN0YXQiLCJzdGF0U3luYyIsImlzRGlyZWN0b3J5IiwiZmlsZSIsInRvSnNvbiIsImJvaWxlclBsYXRlc0FzSnNvbiIsInN0cmluZ2lmeSIsIndyaXRlRmlsZVN5bmMiLCJkZXN0aW5hdGlvbiIsImNvbnRleHQiLCJjb3B5IiwicGF0aFRvUmVuYW1lIiwidGVtcGxhdGUiLCJIYW5kbGViYXJzIiwiY29tcGlsZSIsImZzIiwicmVuYW1lU3luYyIsImNvbnNvbGUiLCJsb2ciLCJjb250ZW50IiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FqQkFBQTs7Ozs7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLG9CQUFvQixlQUExQjs7QUFFQSxJQUFNQyxjQUFjLENBQ2hCLE1BRGdCLEVBRWhCLE1BRmdCLEVBR2hCLE1BSGdCLEVBSWhCLE1BSmdCLEVBS2hCLE1BTGdCLEVBTWhCLE1BTmdCLEVBT2hCLE1BUGdCLENBQXBCOztBQVVBLElBQU1DLGlCQUFpQixJQUFJQyxPQUFKLEVBQXZCO0FBQ0EsSUFBTUMsZUFBZSxJQUFJRCxPQUFKLEVBQXJCO0FBQ0EsSUFBTUUsT0FBTyxJQUFJRixPQUFKLEVBQWI7QUFDQSxJQUFNRyxXQUFXLElBQUlILE9BQUosRUFBakI7QUFDQSxJQUFNSSxjQUFjLElBQUlKLE9BQUosRUFBcEI7O0FB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LENBQW1DNEQsSUFBbkMsRUFBeUMsTUFBekMsQ0FBZDtBQUNBLG9CQUFJUyxXQUFXQyxxQkFBV0MsT0FBWCxDQUFtQkssT0FBbkIsQ0FBZjtBQUNBLG9CQUFJckQsU0FBUzhDLFNBQVNILE9BQVQsQ0FBYjtBQUNBekYsNEJBQVllLEdBQVosQ0FBZ0IsTUFBaEIsRUFBc0J3RSxhQUF0QixDQUFvQ0osSUFBcEMsRUFBMENyQyxNQUExQztBQUNILGFBUkQ7QUFTSDs7OzRCQXpOeUI7QUFDdEIsbUJBQU9hLGVBQUtDLElBQUwsQ0FBVWpFLGVBQWVvQixHQUFmLENBQW1CLElBQW5CLEVBQXlCcUYscUJBQW5DLEVBQTBEM0csaUJBQTFELENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJNEI7QUFDeEIsbUJBQU9rRSxlQUFLQyxJQUFMLENBQVVqRSxlQUFlb0IsR0FBZixDQUFtQixJQUFuQixFQUF5QnFGLHFCQUFuQyxFQUEwRCxvQkFBMUQsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OzRCQUltQjtBQUNmLG1CQUFPbkcsY0FBY2MsR0FBZCxDQUFrQixJQUFsQixDQUFQO0FBQ0giLCJmaWxlIjoiQm9pbGVyUGxhdGVzTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IENvbmZpZ01hbmFnZXIgfSBmcm9tICcuLi9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0IHsgSHR0cFdyYXBwZXIgfSBmcm9tICcuLi9IdHRwV3JhcHBlcic7XG5pbXBvcnQgeyBHaXQgfSBmcm9tICdzaW1wbGUtZ2l0JztcbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQm9pbGVyUGxhdGUgfSBmcm9tICcuL0JvaWxlclBsYXRlJztcbmltcG9ydCBIYW5kbGViYXJzIGZyb20gJ2hhbmRsZWJhcnMnO1xuXG5jb25zdCBib2lsZXJQbGF0ZUZvbGRlciA9ICdib2lsZXItcGxhdGVzJztcblxuY29uc3QgYmluYXJ5RmlsZXMgPSBbXG4gICAgXCIuanBnXCIsXG4gICAgXCIucG5nXCIsXG4gICAgXCIub2JqXCIsXG4gICAgXCIuZGxsXCIsXG4gICAgXCIuYmluXCIsXG4gICAgXCIuZXhlXCIsXG4gICAgXCIudHRmXCJcbl07XG5cbmNvbnN0IF9jb25maWdNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9odHRwV3JhcHBlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZ2l0ID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgX2JvaWxlclBsYXRlcyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgbWFuYWdlciBvZiBib2lsZXIgcGxhdGVzXG4gKi9cbmV4cG9ydCBjbGFzcyBCb2lsZXJQbGF0ZXNNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7Q29uZmlnTWFuYWdlcn0gY29uZmlnTWFuYWdlciBcbiAgICAgKiBAcGFyYW0ge0h0dHBXcmFwcGVyfSBodHRwV3JhcHBlclxuICAgICAqIEBwYXJhbSB7R2l0fSBnaXRcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnNcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlcjtcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWdNYW5hZ2VyLCBodHRwV3JhcHBlciwgZ2l0LCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2NvbmZpZ01hbmFnZXIuc2V0KHRoaXMsIGNvbmZpZ01hbmFnZXIpO1xuICAgICAgICBfaHR0cFdyYXBwZXIuc2V0KHRoaXMsIGh0dHBXcmFwcGVyKTtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIF9naXQuc2V0KHRoaXMsIGdpdCk7XG5cbiAgICAgICAgZm9sZGVycy5tYWtlRm9sZGVySWZOb3RFeGlzdHModGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uKTtcblxuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIHRoaXMucmVhZEJvaWxlclBsYXRlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYmFzZSBwYXRoIGZvciBib2lsZXIgcGxhdGVzXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQmFzZSBwYXRoIG9mIGJvaWxlciBwbGF0ZXNcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVMb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihfY29uZmlnTWFuYWdlci5nZXQodGhpcykuY2VudHJhbEZvbGRlckxvY2F0aW9uLCBib2lsZXJQbGF0ZUZvbGRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBwYXRoIHRvIHRoZSBib2lsZXIgcGxhdGVzIGNvbmZpZyBmaWxlXG4gICAgICogQHJldHVybnMge3N0cmluZ30gUGF0aCB0byB0aGUgY29uZmlnIGZpbGVcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVDb25maWdGaWxlKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKS5jZW50cmFsRm9sZGVyTG9jYXRpb24sIFwiYm9pbGVyLXBsYXRlcy5qc29uXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlc1xuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2UobGFuZ3VhZ2UpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS5sYW5ndWFnZSA9PSBsYW5ndWFnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlcyBmb3IgdGhlIHR5cGVcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeVR5cGUodHlwZSkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcykuZmlsdGVyKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLnR5cGUgPT0gdHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKGxhbmd1YWdlLCB0eXBlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5maWx0ZXIoYm9pbGVyUGxhdGUgPT4gYm9pbGVyUGxhdGUubGFuZ3VhZ2UgPT0gbGFuZ3VhZ2UgJiYgYm9pbGVyUGxhdGUudHlwZSA9PSB0eXBlKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlYWQgYWxsIGJvaWxlciBwbGF0ZXMgZnJvbSBkaXNrXG4gICAgICovXG4gICAgcmVhZEJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgbGV0IGNvbmZpZ0ZpbGUgPSB0aGlzLmJvaWxlclBsYXRlQ29uZmlnRmlsZTtcbiAgICAgICAgaWYgKF9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGNvbmZpZ0ZpbGUpKSB7XG4gICAgICAgICAgICBsZXQganNvbiA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoY29uZmlnRmlsZSk7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNPYmplY3RzID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZXMgPSBbXTtcblxuXG4gICAgICAgICAgICBib2lsZXJQbGF0ZXNBc09iamVjdHMuZm9yRWFjaChib2lsZXJQbGF0ZU9iamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gbmV3IEJvaWxlclBsYXRlKFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5wYXRoc05lZWRpbmdCaW5kaW5nIHx8IFtdLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5maWxlc05lZWRpbmdCaW5kaW5nIHx8IFtdXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZXMucHVzaChib2lsZXJQbGF0ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgX2JvaWxlclBsYXRlcy5zZXQodGhpcywgYm9pbGVyUGxhdGVzKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgX2JvaWxlclBsYXRlcy5zZXQodGhpcywgW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIud2FybihcIlRoZXJlIGFyZSBubyBib2lsZXIgcGxhdGVzIGluc3RhbGxlZCAtIHJ1biAnZG9saXR0bGUgdXBkYXRlJyB0byBnZXQgaXQgdXBkYXRlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmcm9tIEdpdEh1YlxuICAgICAqL1xuICAgIGdldEF2YWlsYWJsZUJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgbGV0IHVyaSA9IFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9vcmdzL2RvbGl0dGxlLWJvaWxlcnBsYXRlcy9yZXBvc1wiO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIF9odHRwV3JhcHBlci5nZXQodGhpcykuZ2V0SnNvbih1cmkpLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICAgICAgbGV0IHVybHMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaChpdGVtID0+IHVybHMucHVzaChpdGVtLm5hbWUpKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHVybHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW55IGV4aXN0aW5nIGJvaWxlciBwbGF0ZXMgb24gZGlza1xuICAgICAqL1xuICAgIHVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpIHtcbiAgICAgICAgbGV0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG4gICAgICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYFVwZGF0ZSBib2lsZXIgcGxhdGUgaW4gJyR7Zm9sZGVyfSdgKTtcbiAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpLmZvckZvbGRlcihmb2xkZXIpLnB1bGwoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGJvaWxlciBwbGF0ZXMuXG4gICAgICogVGhpcyB3aWxsIHVwZGF0ZSBhbnkgZXhpc3RpbmcgYW5kIGRvd25sb2FkIGFueSBuZXcgb25lcy5cbiAgICAgKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdVcGRhdGluZyBhbGwgYm9pbGVyIHBsYXRlcycpO1xuICAgICAgICB0aGlzLnVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpO1xuXG4gICAgICAgIHRoaXMuZ2V0QXZhaWxhYmxlQm9pbGVyUGxhdGVzKCkudGhlbihuYW1lcyA9PiB7XG4gICAgICAgICAgICBsZXQgY2xvbmVDb3VudCA9IDA7XG4gICAgICAgICAgICBuYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IGZvbGRlck5hbWUgPSBwYXRoLmpvaW4odGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uLCBuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoIV9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGZvbGRlck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSBgaHR0cHM6Ly9naXRodWIuY29tL2RvbGl0dGxlLWJvaWxlcnBsYXRlcy8ke25hbWV9LmdpdGA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBHZXR0aW5nIGJvaWxlcnBsYXRlIG5vdCBvbiBkaXNrIGZyb20gJyR7dXJsfSdgKTtcbiAgICAgICAgICAgICAgICAgICAgY2xvbmVDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBfZ2l0LmdldCh0aGlzKS5zaWxlbnQoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvbmUodXJsLCBmb2xkZXJOYW1lLCB7ICctLXJlY3Vyc2l2ZSc6IG51bGwgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5leGVjKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoLS1jbG9uZUNvdW50ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb25maWd1cmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBjb25maWd1cmF0aW9uIGZpbGUgb24gZGlza1xuICAgICAqL1xuICAgIHVwZGF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXMgPSBbXTtcbiAgICAgICAgZm9sZGVycy5mb3JFYWNoKGZvbGRlciA9PiB7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVGaWxlID0gcGF0aC5qb2luKGZvbGRlciwgJ2JvaWxlcnBsYXRlLmpzJyk7XG5cbiAgICAgICAgICAgIGlmIChfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhib2lsZXJQbGF0ZUZpbGUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlRnJvbUZpbGUgPSByZXF1aXJlKGJvaWxlclBsYXRlRmlsZSk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnRGb2xkZXIgPSBwYXRoLmpvaW4oZm9sZGVyLCBcImNvbnRlbnRcIik7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbihjb250ZW50Rm9sZGVyKTtcbiAgICAgICAgICAgICAgICBwYXRocyA9IHBhdGhzLmZpbHRlcihfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlzQmluYXJ5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeUZpbGVzLmZvckVhY2goYiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoYikgPiAwKSBpc0JpbmFyeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWlzQmluYXJ5O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxldCBwYXRoc05lZWRpbmdCaW5kaW5nID0gcGF0aHMuZmlsdGVyKF8gPT4gXy5pbmRleE9mKCd7eycpID4gMCkubWFwKF8gPT4gXy5zdWJzdHIoY29udGVudEZvbGRlci5sZW5ndGggKyAxKSk7XG4gICAgICAgICAgICAgICAgbGV0IGZpbGVzTmVlZGluZ0JpbmRpbmcgPSBbXTtcblxuICAgICAgICAgICAgICAgIHBhdGhzLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGF0ID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnN0YXRTeW5jKF8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGUgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikucmVhZEZpbGVTeW5jKF8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUuaW5kZXhPZigne3snKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXNOZWVkaW5nQmluZGluZy5wdXNoKF8uc3Vic3RyKGNvbnRlbnRGb2xkZXIubGVuZ3RoICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBuZXcgQm9pbGVyUGxhdGUoXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlRnJvbUZpbGUubGFuZ3VhZ2UgfHwgJ2FueScsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlRnJvbUZpbGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVGcm9tRmlsZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVGcm9tRmlsZS50eXBlLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50Rm9sZGVyLFxuICAgICAgICAgICAgICAgICAgICBwYXRoc05lZWRpbmdCaW5kaW5nLFxuICAgICAgICAgICAgICAgICAgICBmaWxlc05lZWRpbmdCaW5kaW5nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZXMucHVzaChib2lsZXJQbGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc09iamVjdHMgPSBib2lsZXJQbGF0ZXMubWFwKF8gPT4gXy50b0pzb24oKSk7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc0pzb24gPSBKU09OLnN0cmluZ2lmeShib2lsZXJQbGF0ZXNBc09iamVjdHMsIG51bGwsIDQpO1xuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyh0aGlzLmJvaWxlclBsYXRlQ29uZmlnRmlsZSwgYm9pbGVyUGxhdGVzQXNKc29uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlfSBib2lsZXJQbGF0ZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb24gXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHQgXG4gICAgICovXG4gICAgY3JlYXRlSW5zdGFuY2UoYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIF9mb2xkZXJzLmdldCh0aGlzKS5jb3B5KGRlc3RpbmF0aW9uLCBib2lsZXJQbGF0ZS5sb2NhdGlvbik7XG4gICAgICAgIGJvaWxlclBsYXRlLnBhdGhzTmVlZGluZ0JpbmRpbmcuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgIGxldCBwYXRoVG9SZW5hbWUgPSBwYXRoLmpvaW4oZGVzdGluYXRpb24sIF8pO1xuICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKHBhdGhUb1JlbmFtZSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGVtcGxhdGUoY29udGV4dCk7XG4gICAgICAgICAgICBmcy5yZW5hbWVTeW5jKHBhdGhUb1JlbmFtZSwgcmVzdWx0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYm9pbGVyUGxhdGUuZmlsZXNOZWVkaW5nQmluZGluZy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgbGV0IGZpbGUgPSBwYXRoLmpvaW4oZGVzdGluYXRpb24sIF8pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWxlIDogXCIgKyBmaWxlKTtcblxuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGZpbGUsICd1dGY4JylcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShjb250ZW50KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0ZW1wbGF0ZShjb250ZXh0KTtcbiAgICAgICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS53cml0ZUZpbGVTeW5jKGZpbGUsIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=