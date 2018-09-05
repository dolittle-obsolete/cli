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
            return _boilerPlates.get(this).some(function (boilerPlate) {
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
            return _boilerPlates.get(this).some(function (boilerPlate) {
                return boilerPlate.type == type;
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

            var folders = _folders.get(this).getFoldersIn(this.boilerPlateLocation);
            var boilerPlates = [];
            folders.forEach(function (folder) {
                var boilerPlateFile = _path2.default.join(folder, 'boilerplate.js');

                if (_fileSystem.get(_this4).existsSync(boilerPlateFile)) {
                    var boilerPlateFromFile = require(boilerPlateFile);

                    var boilerPlate = new _BoilerPlate.BoilerPlate(boilerPlateFromFile.language || 'any', boilerPlateFromFile.name, boilerPlateFromFile.description, boilerPlateFromFile.type, _path2.default.join(folder, "content"));
                    boilerPlates.push(boilerPlate);
                }
            });

            var boilerPlatesAsObjects = boilerPlates.map(function (_) {
                return _.toJson();
            });
            var boilerPlatesAsJson = JSON.stringify(boilerPlatesAsObjects, null, 4);
            _fileSystem.get(this).writeFileSync(this.boilerPlateConfigFile, boilerPlatesAsJson);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsIl9jb25maWdNYW5hZ2VyIiwiV2Vha01hcCIsIl9odHRwV3JhcHBlciIsIl9naXQiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiX2JvaWxlclBsYXRlcyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIl9sb2dnZXIiLCJyZWFkQm9pbGVyUGxhdGVzIiwibGFuZ3VhZ2UiLCJnZXQiLCJzb21lIiwiYm9pbGVyUGxhdGUiLCJ0eXBlIiwiY29uZmlnRmlsZSIsImJvaWxlclBsYXRlQ29uZmlnRmlsZSIsImV4aXN0c1N5bmMiLCJqc29uIiwicmVhZEZpbGVTeW5jIiwiYm9pbGVyUGxhdGVzQXNPYmplY3RzIiwiSlNPTiIsInBhcnNlIiwiYm9pbGVyUGxhdGVzIiwiZm9yRWFjaCIsIkJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVPYmplY3QiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJsb2NhdGlvbiIsInB1c2giLCJsZW5ndGgiLCJ3YXJuIiwidXJpIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZ2V0SnNvbiIsInRoZW4iLCJyZXN1bHQiLCJ1cmxzIiwiaXRlbSIsImdldEZvbGRlcnNJbiIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJpbmZvIiwiZm9sZGVyIiwiZm9yRm9sZGVyIiwicHVsbCIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsIm5hbWVzIiwiZm9sZGVyTmFtZSIsInBhdGgiLCJqb2luIiwidXJsIiwic2lsZW50IiwiY2xvbmUiLCJ1cGRhdGVDb25maWd1cmF0aW9uIiwiYm9pbGVyUGxhdGVGaWxlIiwiYm9pbGVyUGxhdGVGcm9tRmlsZSIsInJlcXVpcmUiLCJtYXAiLCJfIiwidG9Kc29uIiwiYm9pbGVyUGxhdGVzQXNKc29uIiwic3RyaW5naWZ5Iiwid3JpdGVGaWxlU3luYyIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxakJBQUE7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsb0JBQW9CLGVBQTFCOztBQUVBLElBQU1DLGlCQUFpQixJQUFJQyxPQUFKLEVBQXZCO0FBQ0EsSUFBTUMsZUFBZSxJQUFJRCxPQUFKLEVBQXJCO0FBQ0EsSUFBTUUsT0FBTyxJQUFJRixPQUFKLEVBQWI7QUFDQSxJQUFNRyxXQUFXLElBQUlILE9BQUosRUFBakI7QUFDQSxJQUFNSSxjQUFjLElBQUlKLE9BQUosRUFBcEI7O0FBRUEsSUFBTUssZ0JBQWdCLElBQUlMLE9BQUosRUFBdEI7O0FBRUE7Ozs7SUFHYU0sbUIsV0FBQUEsbUI7O0FBRVQ7Ozs7Ozs7OztBQVNBLGlDQUFZQyxhQUFaLEVBQTJCQyxXQUEzQixFQUF3Q0MsR0FBeEMsRUFBNkNDLE9BQTdDLEVBQXNEQyxVQUF0RCxFQUFrRUMsTUFBbEUsRUFBMEU7QUFBQTs7QUFDdEViLHVCQUFlYyxHQUFmLENBQW1CLElBQW5CLEVBQXlCTixhQUF6QjtBQUNBTixxQkFBYVksR0FBYixDQUFpQixJQUFqQixFQUF1QkwsV0FBdkI7QUFDQUwsaUJBQVNVLEdBQVQsQ0FBYSxJQUFiLEVBQW1CSCxPQUFuQjtBQUNBTixvQkFBWVMsR0FBWixDQUFnQixJQUFoQixFQUFzQkYsVUFBdEI7QUFDQVQsYUFBS1csR0FBTCxDQUFTLElBQVQsRUFBZUosR0FBZjs7QUFFQSxhQUFLSyxPQUFMLEdBQWVGLE1BQWY7QUFDQSxhQUFLRyxnQkFBTDtBQUNIOztBQUVEOzs7Ozs7Ozs7O0FBd0JBOzs7OzsrQ0FLdUJDLFEsRUFBVTtBQUM3QixtQkFBT1gsY0FBY1ksR0FBZCxDQUFr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QWxCO0FBQ0g7QUFDSixhQWREOztBQWdCQSxnQkFBSU8sd0JBQXdCRyxhQUFhdUMsR0FBYixDQUFpQjtBQUFBLHVCQUFLQyxFQUFFQyxNQUFGLEVBQUw7QUFBQSxhQUFqQixDQUE1QjtBQUNBLGdCQUFJQyxxQkFBcUI1QyxLQUFLNkMsU0FBTCxDQUFlOUMscUJBQWYsRUFBc0MsSUFBdEMsRUFBNEMsQ0FBNUMsQ0FBekI7QUFDQXRCLHdCQUFZYSxHQUFaLENBQWdCLElBQWhCLEVBQXNCd0QsYUFBdEIsQ0FBb0MsS0FBS25ELHFCQUF6QyxFQUFnRWlELGtCQUFoRTtBQUNIOzs7NEJBbEp5QjtBQUN0QixtQkFBT1osZUFBS0MsSUFBTCxDQUFVN0QsZUFBZWtCLEdBQWYsQ0FBbUIsSUFBbkIsRUFBeUJ5RCxxQkFBbkMsRUFBMEQ1RSxpQkFBMUQsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OzRCQUk0QjtBQUN4QixtQkFBTzZELGVBQUtDLElBQUwsQ0FBVTdELGVBQWVrQixHQUFmLENBQW1CLElBQW5CLEVBQXlCeUQscUJBQW5DLEVBQXlELG9CQUF6RCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSW1CO0FBQ2YsbUJBQU9yRSxjQUFjWSxHQUFkLENBQWtCLElBQWxCLENBQVA7QUFDSCIsImZpbGUiOiJCb2lsZXJQbGF0ZXNNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgQ29uZmlnTWFuYWdlciB9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XG5pbXBvcnQgeyBIdHRwV3JhcHBlciB9IGZyb20gJy4uL0h0dHBXcmFwcGVyJztcbmltcG9ydCB7IEdpdCB9IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyDCoEJvaWxlclBsYXRlIH0gZnJvbSAnLi9Cb2lsZXJQbGF0ZSc7XG5cbmNvbnN0IGJvaWxlclBsYXRlRm9sZGVyID0gJ2JvaWxlci1wbGF0ZXMnO1xuXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaHR0cFdyYXBwZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IF9ib2lsZXJQbGF0ZXMgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIG1hbmFnZXIgb2YgYm9pbGVyIHBsYXRlc1xuICovXG5leHBvcnQgY2xhc3MgQm9pbGVyUGxhdGVzTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0NvbmZpZ01hbmFnZXJ9IGNvbmZpZ01hbmFnZXIgXG4gICAgICogQHBhcmFtIHtIdHRwV3JhcHBlcn0gaHR0cFdyYXBwZXJcbiAgICAgKiBAcGFyYW0ge0dpdH0gZ2l0XG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXI7XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnTWFuYWdlciwgaHR0cFdyYXBwZXIsIGdpdCwgZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XG4gICAgICAgIF9jb25maWdNYW5hZ2VyLnNldCh0aGlzLCBjb25maWdNYW5hZ2VyKTtcbiAgICAgICAgX2h0dHBXcmFwcGVyLnNldCh0aGlzLCBodHRwV3JhcHBlcik7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICBfZ2l0LnNldCh0aGlzLCBnaXQpO1xuXG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgdGhpcy5yZWFkQm9pbGVyUGxhdGVzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBiYXNlIHBhdGggZm9yIGJvaWxlciBwbGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBCYXNlIHBhdGggb2YgYm9pbGVyIHBsYXRlc1xuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZUxvY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKS5jZW50cmFsRm9sZGVyTG9jYXRpb24sIGJvaWxlclBsYXRlRm9sZGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHBhdGggdG8gdGhlIGJvaWxlciBwbGF0ZXMgY29uZmlnIGZpbGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBQYXRoIHRvIHRoZSBjb25maWcgZmlsZVxuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUoKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oX2NvbmZpZ01hbmFnZXIuZ2V0KHRoaXMpLmNlbnRyYWxGb2xkZXJMb2NhdGlvbixcImJvaWxlci1wbGF0ZXMuanNvblwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXNcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVzKCkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzIGZvciB0aGUgbGFuZ3VhZ2VcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeUxhbmd1YWdlKGxhbmd1YWdlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5zb21lKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLmxhbmd1YWdlID09IGxhbmd1YWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIHR5cGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzIGZvciB0aGUgdHlwZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5VHlwZSh0eXBlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5zb21lKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLnR5cGUgPT0gdHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVhZCBhbGwgYm9pbGVyIHBsYXRlcyBmcm9tIGRpc2tcbiAgICAgKi9cbiAgICByZWFkQm9pbGVyUGxhdGVzKCkge1xuICAgICAgICBsZXQgY29uZmlnRmlsZSA9IHRoaXMuYm9pbGVyUGxhdGVDb25maWdGaWxlO1xuICAgICAgICBpZiggX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmV4aXN0c1N5bmMoY29uZmlnRmlsZSkgKSB7XG4gICAgICAgICAgICBsZXQganNvbiA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoY29uZmlnRmlsZSk7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNPYmplY3RzID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZXMgPSBbXTtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBib2lsZXJQbGF0ZXNBc09iamVjdHMuZm9yRWFjaChib2lsZXJQbGF0ZU9iamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gbmV3IEJvaWxlclBsYXRlKFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZXMucHVzaChib2lsZXJQbGF0ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgX2JvaWxlclBsYXRlcy5zZXQodGhpcywgYm9pbGVyUGxhdGVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgX2JvaWxlclBsYXRlcy5zZXQodGhpcywgW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmxlbmd0aCA9PSAwICkge1xuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLndhcm4oXCJUaGVyZSBhcmUgbm8gYm9pbGVyIHBsYXRlcyBpbnN0YWxsZWQgLSBydW4gJ2RvbGl0dGxlIHVwZGF0ZScgdG8gZ2V0IGl0IHVwZGF0ZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZnJvbSBHaXRIdWJcbiAgICAgKi9cbiAgICBnZXRBdmFpbGFibGVCb2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIGxldCB1cmkgPSBcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vb3Jncy9kb2xpdHRsZS1ib2lsZXJwbGF0ZXMvcmVwb3NcIjtcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBfaHR0cFdyYXBwZXIuZ2V0KHRoaXMpLmdldEpzb24odXJpKS50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgICAgIGxldCB1cmxzID0gW107XG4gICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goaXRlbSA9PiB1cmxzLnB1c2goaXRlbS5uYW1lKSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh1cmxzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGFueSBleGlzdGluZyBib2lsZXIgcGxhdGVzIG9uIGRpc2tcbiAgICAgKi9cbiAgICB1cGRhdGVCb2lsZXJQbGF0ZXNPbkRpc2soKSB7XG4gICAgICAgIGxldCBmb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNJbih0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24pO1xuICAgICAgICBmb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBVcGRhdGUgYm9pbGVyIHBsYXRlIGluICcke2ZvbGRlcn0nYCk7XG4gICAgICAgICAgICBfZ2l0LmdldCh0aGlzKS5mb3JGb2xkZXIoZm9sZGVyKS5wdWxsKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBib2lsZXIgcGxhdGVzLlxuICAgICAqIFRoaXMgd2lsbCB1cGRhdGUgYW55IGV4aXN0aW5nIGFuZCBkb3dubG9hZCBhbnkgbmV3IG9uZXMuXG4gICAgICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbygnVXBkYXRpbmcgYWxsIGJvaWxlciBwbGF0ZXMnKTtcbiAgICAgICAgdGhpcy51cGRhdGVCb2lsZXJQbGF0ZXNPbkRpc2soKTtcblxuICAgICAgICB0aGlzLmdldEF2YWlsYWJsZUJvaWxlclBsYXRlcygpLnRoZW4obmFtZXMgPT4ge1xuICAgICAgICAgICAgbmFtZXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZm9sZGVyTmFtZSA9IHBhdGguam9pbih0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24sIG5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICghX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmV4aXN0c1N5bmMoZm9sZGVyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVybCA9IGBodHRwczovL2dpdGh1Yi5jb20vZG9saXR0bGUtYm9pbGVycGxhdGVzLyR7bmFtZX0uZ2l0YDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYEdldHRpbmcgYm9pbGVycGxhdGUgbm90IG9uIGRpc2sgZnJvbSAnJHt1cmx9J2ApO1xuICAgICAgICAgICAgICAgICAgICBfZ2l0LmdldCh0aGlzKS5zaWxlbnQoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvbmUodXJsLCBmb2xkZXJOYW1lLCB7ICctLXJlY3Vyc2l2ZSc6IG51bGwgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29uZmlndXJhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgY29uZmlndXJhdGlvbiBmaWxlIG9uIGRpc2tcbiAgICAgKi9cbiAgICB1cGRhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICBsZXQgZm9sZGVycyA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRGb2xkZXJzSW4odGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uKTtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlcyA9IFtdO1xuICAgICAgICBmb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IHtcbiAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZUZpbGUgPSBwYXRoLmpvaW4oZm9sZGVyLCAnYm9pbGVycGxhdGUuanMnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKF9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGJvaWxlclBsYXRlRmlsZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVGcm9tRmlsZSA9IHJlcXVpcmUoYm9pbGVyUGxhdGVGaWxlKTtcblxuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IG5ldyBCb2lsZXJQbGF0ZShcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVGcm9tRmlsZS5sYW5ndWFnZSB8fCAnYW55JyxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVGcm9tRmlsZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZUZyb21GaWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZUZyb21GaWxlLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihmb2xkZXIsIFwiY29udGVudFwiKSk7XG4gICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVzLnB1c2goYm9pbGVyUGxhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNPYmplY3RzID0gYm9pbGVyUGxhdGVzLm1hcChfID0+IF8udG9Kc29uKCkpO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNKc29uID0gSlNPTi5zdHJpbmdpZnkoYm9pbGVyUGxhdGVzQXNPYmplY3RzLCBudWxsLCA0KTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmModGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUsIGJvaWxlclBsYXRlc0FzSnNvbik7XG4gICAgfVxufSJdfQ==