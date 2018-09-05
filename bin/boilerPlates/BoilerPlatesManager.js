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
                    var boilerPlate = new _BoilerPlate.BoilerPlate(boilerPlateObject.language, boilerPlateObject.name, boilerPlateObject.description, boilerPlateObject.type, boilerPlateObject.location);
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
            _folders.get(this).copy(destination, boilerPlate.location);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsImJpbmFyeUZpbGVzIiwiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2h0dHBXcmFwcGVyIiwiX2dpdCIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJfYm9pbGVyUGxhdGVzIiwiQm9pbGVyUGxhdGVzTWFuYWdlciIsImNvbmZpZ01hbmFnZXIiLCJodHRwV3JhcHBlciIsImdpdCIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwibG9nZ2VyIiwic2V0IiwiX2xvZ2dlciIsInJlYWRCb2lsZXJQbGF0ZXMiLCJsYW5ndWFnZSIsImdldCIsImZpbHRlciIsImJvaWxlclBsYXRlIiwidHlwZSIsImNvbmZpZ0ZpbGUiLCJib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUiLCJleGlzdHNTeW5jIiwianNvbiIsInJlYWRGaWxlU3luYyIsImJvaWxlclBsYXRlc0FzT2JqZWN0cyIsIkpTT04iLCJwYXJzZSIsImJvaWxlclBsYXRlcyIsImZvckVhY2giLCJCb2lsZXJQbGF0ZSIsImJvaWxlclBsYXRlT2JqZWN0IiwibmFtZSIsImRlc2NyaXB0aW9uIiwibG9jYXRpb24iLCJwdXNoIiwibGVuZ3RoIiwid2FybiIsInVyaSIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImdldEpzb24iLCJ0aGVuIiwicmVzdWx0IiwidXJscyIsIml0ZW0iLCJnZXRGb2xkZXJzSW4iLCJib2lsZXJQbGF0ZUxvY2F0aW9uIiwiaW5mbyIsImZvbGRlciIsImZvckZvbGRlciIsInB1bGwiLCJ1cGRhdGVCb2lsZXJQbGF0ZXNPbkRpc2siLCJnZXRBdmFpbGFibGVCb2lsZXJQbGF0ZXMiLCJuYW1lcyIsImZvbGRlck5hbWUiLCJwYXRoIiwiam9pbiIsInVybCIsInNpbGVudCIsImNsb25lIiwidXBkYXRlQ29uZmlndXJhdGlvbiIsInNlbGYiLCJib2lsZXJQbGF0ZUZpbGUiLCJib2lsZXJQbGF0ZUZyb21GaWxlIiwicmVxdWlyZSIsImNvbnRlbnRGb2xkZXIiLCJwYXRocyIsImdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4iLCJpc0JpbmFyeSIsIl8iLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJiIiwicGF0aHNOZWVkaW5nQmluZGluZyIsIm1hcCIsInN1YnN0ciIsImZpbGVzTmVlZGluZ0JpbmRpbmciLCJzdGF0Iiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsImZpbGUiLCJ0b0pzb24iLCJib2lsZXJQbGF0ZXNBc0pzb24iLCJzdHJpbmdpZnkiLCJ3cml0ZUZpbGVTeW5jIiwiZGVzdGluYXRpb24iLCJjb250ZXh0IiwiY29weSIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxakJBQUE7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsb0JBQW9CLGVBQTFCOztBQUVBLElBQU1DLGNBQWMsQ0FDaEIsTUFEZ0IsRUFFaEIsTUFGZ0IsRUFHaEIsTUFIZ0IsRUFJaEIsTUFKZ0IsRUFLaEIsTUFMZ0IsRUFNaEIsTUFOZ0IsRUFPaEIsTUFQZ0IsQ0FBcEI7O0FBVUEsSUFBTUMsaUJBQWlCLElBQUlDLE9BQUosRUFBdkI7QUFDQSxJQUFNQyxlQUFlLElBQUlELE9BQUosRUFBckI7QUFDQSxJQUFNRSxPQUFPLElBQUlGLE9BQUosRUFBYjtBQUNBLElBQU1HLFdBQVcsSUFBSUgsT0FBSixFQUFqQjtBQUNBLElBQU1JLGNBQWMsSUFBSUosT0FBSixFQUFwQjs7QUFFQSxJQUFNSyxnQkFBZ0IsSUFBSUwsT0FBSixFQUF0Qjs7QUFFQTs7OztJQUdhTSxtQixXQUFBQSxtQjs7QUFFVDs7Ozs7Ozs7O0FBU0EsaUNBQVlDLGFBQVosRUFBMkJDLFdBQTNCLEVBQXdDQyxHQUF4QyxFQUE2Q0MsT0FBN0MsRUFBc0RDLFVBQXRELEVB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OUN2RixxQkFBU2MsR0FBVCxDQUFhLElBQWIsRUFBbUIwRSxJQUFuQixDQUF3QkYsV0FBeEIsRUFBcUN0RSxZQUFZZ0IsUUFBakQ7QUFDSDs7OzRCQWpNeUI7QUFDdEIsbUJBQU93QixlQUFLQyxJQUFMLENBQVU3RCxlQUFla0IsR0FBZixDQUFtQixJQUFuQixFQUF5QjJFLHFCQUFuQyxFQUEwRC9GLGlCQUExRCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSTRCO0FBQ3hCLG1CQUFPOEQsZUFBS0MsSUFBTCxDQUFVN0QsZUFBZWtCLEdBQWYsQ0FBbUIsSUFBbkIsRUFBeUIyRSxxQkFBbkMsRUFBeUQsb0JBQXpELENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJbUI7QUFDZixtQkFBT3ZGLGNBQWNZLEdBQWQsQ0FBa0IsSUFBbEIsQ0FBUDtBQUNIIiwiZmlsZSI6IkJvaWxlclBsYXRlc01hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbi9Db25maWdNYW5hZ2VyJztcbmltcG9ydCB7IEh0dHBXcmFwcGVyIH0gZnJvbSAnLi4vSHR0cFdyYXBwZXInO1xuaW1wb3J0IHsgR2l0IH0gZnJvbSAnc2ltcGxlLWdpdCc7XG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IMKgQm9pbGVyUGxhdGUgfSBmcm9tICcuL0JvaWxlclBsYXRlJztcblxuY29uc3QgYm9pbGVyUGxhdGVGb2xkZXIgPSAnYm9pbGVyLXBsYXRlcyc7XG5cbmNvbnN0IGJpbmFyeUZpbGVzID0gW1xuICAgIFwiLmpwZ1wiLFxuICAgIFwiLnBuZ1wiLFxuICAgIFwiLm9ialwiLFxuICAgIFwiLmRsbFwiLFxuICAgIFwiLmJpblwiLFxuICAgIFwiLmV4ZVwiLFxuICAgIFwiLnR0ZlwiXG5dO1xuXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaHR0cFdyYXBwZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IF9ib2lsZXJQbGF0ZXMgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIG1hbmFnZXIgb2YgYm9pbGVyIHBsYXRlc1xuICovXG5leHBvcnQgY2xhc3MgQm9pbGVyUGxhdGVzTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0NvbmZpZ01hbmFnZXJ9IGNvbmZpZ01hbmFnZXIgXG4gICAgICogQHBhcmFtIHtIdHRwV3JhcHBlcn0gaHR0cFdyYXBwZXJcbiAgICAgKiBAcGFyYW0ge0dpdH0gZ2l0XG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXI7XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnTWFuYWdlciwgaHR0cFdyYXBwZXIsIGdpdCwgZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XG4gICAgICAgIF9jb25maWdNYW5hZ2VyLnNldCh0aGlzLCBjb25maWdNYW5hZ2VyKTtcbiAgICAgICAgX2h0dHBXcmFwcGVyLnNldCh0aGlzLCBodHRwV3JhcHBlcik7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICBfZ2l0LnNldCh0aGlzLCBnaXQpO1xuXG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgdGhpcy5yZWFkQm9pbGVyUGxhdGVzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBiYXNlIHBhdGggZm9yIGJvaWxlciBwbGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBCYXNlIHBhdGggb2YgYm9pbGVyIHBsYXRlc1xuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZUxvY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKS5jZW50cmFsRm9sZGVyTG9jYXRpb24sIGJvaWxlclBsYXRlRm9sZGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHBhdGggdG8gdGhlIGJvaWxlciBwbGF0ZXMgY29uZmlnIGZpbGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBQYXRoIHRvIHRoZSBjb25maWcgZmlsZVxuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUoKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oX2NvbmZpZ01hbmFnZXIuZ2V0KHRoaXMpLmNlbnRyYWxGb2xkZXJMb2NhdGlvbixcImJvaWxlci1wbGF0ZXMuanNvblwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXNcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVzKCkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzIGZvciB0aGUgbGFuZ3VhZ2VcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeUxhbmd1YWdlKGxhbmd1YWdlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5maWx0ZXIoYm9pbGVyUGxhdGUgPT4gYm9pbGVyUGxhdGUubGFuZ3VhZ2UgPT0gbGFuZ3VhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIGEgc3BlY2lmaWMgdHlwZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSB0eXBlXG4gICAgICovXG4gICAgYm9pbGVyUGxhdGVzQnlUeXBlKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS50eXBlID09IHR5cGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIGEgc3BlY2lmaWMgbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzIGZvciB0aGUgbGFuZ3VhZ2VcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZShsYW5ndWFnZSwgdHlwZSkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcykuZmlsdGVyKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLmxhbmd1YWdlID09IGxhbmd1YWdlICYmIGJvaWxlclBsYXRlLnR5cGUgPT0gdHlwZSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGFsbCBib2lsZXIgcGxhdGVzIGZyb20gZGlza1xuICAgICAqL1xuICAgIHJlYWRCb2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIGxldCBjb25maWdGaWxlID0gdGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGU7XG4gICAgICAgIGlmKCBfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhjb25maWdGaWxlKSApIHtcbiAgICAgICAgICAgIGxldCBqc29uID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhjb25maWdGaWxlKTtcbiAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc09iamVjdHMgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlcyA9IFtdO1xuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGJvaWxlclBsYXRlc0FzT2JqZWN0cy5mb3JFYWNoKGJvaWxlclBsYXRlT2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBuZXcgQm9pbGVyUGxhdGUoXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0Lmxhbmd1YWdlLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubG9jYXRpb25cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlcy5wdXNoKGJvaWxlclBsYXRlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfYm9pbGVyUGxhdGVzLnNldCh0aGlzLCBib2lsZXJQbGF0ZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBfYm9pbGVyUGxhdGVzLnNldCh0aGlzLCBbXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiggX2JvaWxlclBsYXRlcy5nZXQodGhpcykubGVuZ3RoID09IDAgKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIud2FybihcIlRoZXJlIGFyZSBubyBib2lsZXIgcGxhdGVzIGluc3RhbGxlZCAtIHJ1biAnZG9saXR0bGUgdXBkYXRlJyB0byBnZXQgaXQgdXBkYXRlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmcm9tIEdpdEh1YlxuICAgICAqL1xuICAgIGdldEF2YWlsYWJsZUJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgbGV0IHVyaSA9IFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9vcmdzL2RvbGl0dGxlLWJvaWxlcnBsYXRlcy9yZXBvc1wiO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIF9odHRwV3JhcHBlci5nZXQodGhpcykuZ2V0SnNvbih1cmkpLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICAgICAgbGV0IHVybHMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaChpdGVtID0+IHVybHMucHVzaChpdGVtLm5hbWUpKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHVybHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW55IGV4aXN0aW5nIGJvaWxlciBwbGF0ZXMgb24gZGlza1xuICAgICAqL1xuICAgIHVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpIHtcbiAgICAgICAgbGV0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG4gICAgICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYFVwZGF0ZSBib2lsZXIgcGxhdGUgaW4gJyR7Zm9sZGVyfSdgKTtcbiAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpLmZvckZvbGRlcihmb2xkZXIpLnB1bGwoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGJvaWxlciBwbGF0ZXMuXG4gICAgICogVGhpcyB3aWxsIHVwZGF0ZSBhbnkgZXhpc3RpbmcgYW5kIGRvd25sb2FkIGFueSBuZXcgb25lcy5cbiAgICAgKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdVcGRhdGluZyBhbGwgYm9pbGVyIHBsYXRlcycpO1xuICAgICAgICB0aGlzLnVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpO1xuXG4gICAgICAgIHRoaXMuZ2V0QXZhaWxhYmxlQm9pbGVyUGxhdGVzKCkudGhlbihuYW1lcyA9PiB7XG4gICAgICAgICAgICBuYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb2xkZXJOYW1lID0gcGF0aC5qb2luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbiwgbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhmb2xkZXJOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gYGh0dHBzOi8vZ2l0aHViLmNvbS9kb2xpdHRsZS1ib2lsZXJwbGF0ZXMvJHtuYW1lfS5naXRgO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgR2V0dGluZyBib2lsZXJwbGF0ZSBub3Qgb24gZGlzayBmcm9tICcke3VybH0nYCk7XG4gICAgICAgICAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpLnNpbGVudChmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9uZSh1cmwsIGZvbGRlck5hbWUsIHsgJy0tcmVjdXJzaXZlJzogbnVsbCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVDb25maWd1cmF0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBjb25maWd1cmF0aW9uIGZpbGUgb24gZGlza1xuICAgICAqL1xuICAgIHVwZGF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXMgPSBbXTtcbiAgICAgICAgZm9sZGVycy5mb3JFYWNoKGZvbGRlciA9PiB7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVGaWxlID0gcGF0aC5qb2luKGZvbGRlciwgJ2JvaWxlcnBsYXRlLmpzJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhib2lsZXJQbGF0ZUZpbGUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlRnJvbUZpbGUgPSByZXF1aXJlKGJvaWxlclBsYXRlRmlsZSk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnRGb2xkZXIgPSBwYXRoLmpvaW4oZm9sZGVyLCBcImNvbnRlbnRcIik7IFxuXG4gICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oY29udGVudEZvbGRlcik7XG4gICAgICAgICAgICAgICAgcGF0aHMgPSBwYXRocy5maWx0ZXIoXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpc0JpbmFyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBiaW5hcnlGaWxlcy5mb3JFYWNoKGIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoXy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoYik+MCkgaXNCaW5hcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc0JpbmFyeTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsZXQgcGF0aHNOZWVkaW5nQmluZGluZyA9IHBhdGhzLmZpbHRlcihfID0+IF8uaW5kZXhPZigne3snKSA+IDApLm1hcChfID0+IF8uc3Vic3RyKGNvbnRlbnRGb2xkZXIubGVuZ3RoKzEpKTtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZXNOZWVkaW5nQmluZGluZyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgcGF0aHMuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoXyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKCAhc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5yZWFkRmlsZVN5bmMoXyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggZmlsZS5pbmRleE9mKCd7eycpID49IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXNOZWVkaW5nQmluZGluZy5wdXNoKF8uc3Vic3RyKGNvbnRlbnRGb2xkZXIubGVuZ3RoKzEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gbmV3IEJvaWxlclBsYXRlKFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZUZyb21GaWxlLmxhbmd1YWdlIHx8ICdhbnknLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZUZyb21GaWxlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlRnJvbUZpbGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlRnJvbUZpbGUudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEZvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgcGF0aHNOZWVkaW5nQmluZGluZyxcbiAgICAgICAgICAgICAgICAgICAgZmlsZXNOZWVkaW5nQmluZGluZ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVzLnB1c2goYm9pbGVyUGxhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNPYmplY3RzID0gYm9pbGVyUGxhdGVzLm1hcChfID0+IF8udG9Kc29uKCkpO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNKc29uID0gSlNPTi5zdHJpbmdpZnkoYm9pbGVyUGxhdGVzQXNPYmplY3RzLCBudWxsLCA0KTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmModGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUsIGJvaWxlclBsYXRlc0FzSnNvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtCb2lsZXJQbGF0ZX0gYm9pbGVyUGxhdGUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IFxuICAgICAqL1xuICAgIGNyZWF0ZUluc3RhbmNlKGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCkge1xuICAgICAgICBfZm9sZGVycy5nZXQodGhpcykuY29weShkZXN0aW5hdGlvbiwgYm9pbGVyUGxhdGUubG9jYXRpb24pO1xuICAgIH1cbn0iXX0=