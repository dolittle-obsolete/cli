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
        value: function boilerPlatesByLanguage(language) {
            return _boilerPlates.get(this).some(function (boilerPlate) {
                return boilerPlate.language == language;
            });
        }
    }, {
        key: 'boilerPlatesByType',
        value: function boilerPlatesByType(type) {
            return _boilerPlates.get(this).some(function (boilerPlate) {
                return boilerPlate.type == type;
            });
        }
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
    }, {
        key: 'updateConfiguration',
        value: function updateConfiguration() {
            var _this4 = this;

            var folders = _folders.get(this).getFoldersIn(this.boilerPlateLocation);
            var boilerPlates = [];
            folders.forEach(function (folder) {
                var boilerPlateFile = _path2.default.join(folder, 'boilerplate.js');

                if (_fileSystem.get(_this4).existsSync(boilerPlateFile)) {
                    _this4._logger.info(boilerPlateFile);

                    var boilerPlateFromFile = require(boilerPlateFile);

                    var boilerPlate = new _BoilerPlate.BoilerPlate(boilerPlateFromFile.language || 'any', boilerPlateFromFile.name, boilerPlateFromFile.description, boilerPlateFromFile.type, _path2.default.join(folder, "content"));
                    boilerPlates.push(boilerPlate);
                }
            });
            this._logger.info(boilerPlates);

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
    }, {
        key: 'boilerPlates',
        get: function get() {
            return _boilerPlates.get(this);
        }
    }]);

    return BoilerPlatesManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsIl9jb25maWdNYW5hZ2VyIiwiV2Vha01hcCIsIl9odHRwV3JhcHBlciIsIl9naXQiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiX2JvaWxlclBsYXRlcyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIl9sb2dnZXIiLCJyZWFkQm9pbGVyUGxhdGVzIiwibGFuZ3VhZ2UiLCJnZXQiLCJzb21lIiwiYm9pbGVyUGxhdGUiLCJ0eXBlIiwiY29uZmlnRmlsZSIsImJvaWxlclBsYXRlQ29uZmlnRmlsZSIsImV4aXN0c1N5bmMiLCJqc29uIiwicmVhZEZpbGVTeW5jIiwiYm9pbGVyUGxhdGVzQXNPYmplY3RzIiwiSlNPTiIsInBhcnNlIiwiYm9pbGVyUGxhdGVzIiwiZm9yRWFjaCIsIkJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVPYmplY3QiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJsb2NhdGlvbiIsInB1c2giLCJsZW5ndGgiLCJ3YXJuIiwidXJpIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZ2V0SnNvbiIsInRoZW4iLCJyZXN1bHQiLCJ1cmxzIiwiaXRlbSIsImdldEZvbGRlcnNJbiIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJpbmZvIiwiZm9sZGVyIiwiZm9yRm9sZGVyIiwicHVsbCIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsIm5hbWVzIiwiZm9sZGVyTmFtZSIsInBhdGgiLCJqb2luIiwidXJsIiwic2lsZW50IiwiY2xvbmUiLCJ1cGRhdGVDb25maWd1cmF0aW9uIiwiYm9pbGVyUGxhdGVGaWxlIiwiYm9pbGVyUGxhdGVGcm9tRmlsZSIsInJlcXVpcmUiLCJtYXAiLCJfIiwidG9Kc29uIiwiYm9pbGVyUGxhdGVzQXNKc29uIiwic3RyaW5naWZ5Iiwid3JpdGVGaWxlU3luYyIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxakJBQUE7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsb0JBQW9CLGVBQTFCOztBQUVBLElBQU1DLGlCQUFpQixJQUFJQyxPQUFKLEVBQXZCO0FBQ0EsSUFBTUMsZUFBZSxJQUFJRCxPQUFKLEVBQXJCO0FBQ0EsSUFBTUUsT0FBTyxJQUFJRixPQUFKLEVBQWI7QUFDQSxJQUFNRyxXQUFXLElBQUlILE9BQUosRUFBakI7QUFDQSxJQUFNSSxjQUFjLElBQUlKLE9BQUosRUFBcEI7O0FBRUEsSUFBTUssZ0JBQWdCLElBQUlMLE9BQUosRUFBdEI7O0FBRUE7Ozs7SUFHYU0sbUIsV0FBQUEsbUI7O0FBRVQ7Ozs7Ozs7OztBQVNBLGlDQUFZQyxhQUFaLEVBQTJCQyxXQUEzQixFQUF3Q0MsR0FBeEMsRUFBNkNDLE9BQTdDLEVBQXNEQyxVQUF0RCxFQUFrRUMsTUFBbEUsRUFBMEU7QUFBQTs7QUFDdEViLHVCQUFlYyxHQUFmLENBQW1CLElBQW5CLEVBQXlCTixhQUF6QjtBQUNBTixxQkFBYVksR0FBYixDQUFpQixJQUFqQixFQUF1QkwsV0FBdkI7QUFDQUwsaUJBQVNVLEdBQVQsQ0FBYSxJQUFiLEVBQW1CSCxPQUFuQjtBQUNBTixvQkFBWVMsR0FBWixDQUFnQixJQUFoQixFQUFzQkYsVUFBdEI7QUFDQVQsYUFBS1csR0FBTCxDQUFTLElBQVQsRUFBZUosR0FBZjs7QUFFQSxhQUFLSyxPQUFMLEdBQWVGLE1BQWY7QUFDQSxhQUFLRyxnQkFBTDtBQUNIOztBQUVEOzs7Ozs7OzsrQ0FvQnVCQyxRLEVBQVU7QUFDN0IsbUJBQU9YLGNBQWNZLEdBQWQsQ0FBa0IsSUFBbEIsRUFB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QSxpQkFBS0wsT0FBTCxDQUFhcUMsSUFBYixDQUFrQnRCLFlBQWxCOztBQUVBLGdCQUFJSCx3QkFBd0JHLGFBQWF1QyxHQUFiLENBQWlCO0FBQUEsdUJBQUtDLEVBQUVDLE1BQUYsRUFBTDtBQUFBLGFBQWpCLENBQTVCO0FBQ0EsZ0JBQUlDLHFCQUFxQjVDLEtBQUs2QyxTQUFMLENBQWU5QyxxQkFBZixFQUFzQyxJQUF0QyxFQUE0QyxDQUE1QyxDQUF6QjtBQUNBdEIsd0JBQVlhLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0J3RCxhQUF0QixDQUFvQyxLQUFLbkQscUJBQXpDLEVBQWdFaUQsa0JBQWhFO0FBQ0g7Ozs0QkF4SHlCO0FBQ3RCLG1CQUFPWixlQUFLQyxJQUFMLENBQVU3RCxlQUFla0IsR0FBZixDQUFtQixJQUFuQixFQUF5QnlELHFCQUFuQyxFQUEwRDVFLGlCQUExRCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSTRCO0FBQ3hCLG1CQUFPNkQsZUFBS0MsSUFBTCxDQUFVN0QsZUFBZWtCLEdBQWYsQ0FBbUIsSUFBbkIsRUFBeUJ5RCxxQkFBbkMsRUFBeUQsb0JBQXpELENBQVA7QUFDSDs7OzRCQUVrQjtBQUNmLG1CQUFPckUsY0FBY1ksR0FBZCxDQUFrQixJQUFsQixDQUFQO0FBQ0giLCJmaWxlIjoiQm9pbGVyUGxhdGVzTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IENvbmZpZ01hbmFnZXIgfSBmcm9tICcuLi9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0IHsgSHR0cFdyYXBwZXIgfSBmcm9tICcuLi9IdHRwV3JhcHBlcic7XG5pbXBvcnQgeyBHaXQgfSBmcm9tICdzaW1wbGUtZ2l0JztcbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgwqBCb2lsZXJQbGF0ZSB9IGZyb20gJy4vQm9pbGVyUGxhdGUnO1xuXG5jb25zdCBib2lsZXJQbGF0ZUZvbGRlciA9ICdib2lsZXItcGxhdGVzJztcblxuY29uc3QgX2NvbmZpZ01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2h0dHBXcmFwcGVyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9naXQgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBfYm9pbGVyUGxhdGVzID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBtYW5hZ2VyIG9mIGJvaWxlciBwbGF0ZXNcbiAqL1xuZXhwb3J0IGNsYXNzIEJvaWxlclBsYXRlc01hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0JvaWxlclBsYXRlc01hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtDb25maWdNYW5hZ2VyfSBjb25maWdNYW5hZ2VyIFxuICAgICAqIEBwYXJhbSB7SHR0cFdyYXBwZXJ9IGh0dHBXcmFwcGVyXG4gICAgICogQHBhcmFtIHtHaXR9IGdpdFxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyO1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ01hbmFnZXIsIGh0dHBXcmFwcGVyLCBnaXQsIGZvbGRlcnMsIGZpbGVTeXN0ZW0sIGxvZ2dlcikge1xuICAgICAgICBfY29uZmlnTWFuYWdlci5zZXQodGhpcywgY29uZmlnTWFuYWdlcik7XG4gICAgICAgIF9odHRwV3JhcHBlci5zZXQodGhpcywgaHR0cFdyYXBwZXIpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgX2dpdC5zZXQodGhpcywgZ2l0KTtcblxuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIHRoaXMucmVhZEJvaWxlclBsYXRlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYmFzZSBwYXRoIGZvciBib2lsZXIgcGxhdGVzXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQmFzZSBwYXRoIG9mIGJvaWxlciBwbGF0ZXNcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVMb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihfY29uZmlnTWFuYWdlci5nZXQodGhpcykuY2VudHJhbEZvbGRlckxvY2F0aW9uLCBib2lsZXJQbGF0ZUZvbGRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBwYXRoIHRvIHRoZSBib2lsZXIgcGxhdGVzIGNvbmZpZyBmaWxlXG4gICAgICogQHJldHVybnMge3N0cmluZ30gUGF0aCB0byB0aGUgY29uZmlnIGZpbGVcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVDb25maWdGaWxlKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKS5jZW50cmFsRm9sZGVyTG9jYXRpb24sXCJib2lsZXItcGxhdGVzLmpzb25cIik7XG4gICAgfVxuXG4gICAgZ2V0IGJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2UobGFuZ3VhZ2UpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLnNvbWUoYm9pbGVyUGxhdGUgPT4gYm9pbGVyUGxhdGUubGFuZ3VhZ2UgPT0gbGFuZ3VhZ2UpO1xuICAgIH1cblxuICAgIGJvaWxlclBsYXRlc0J5VHlwZSh0eXBlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5zb21lKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLnR5cGUgPT0gdHlwZSk7XG4gICAgfVxuXG4gICAgcmVhZEJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgbGV0IGNvbmZpZ0ZpbGUgPSB0aGlzLmJvaWxlclBsYXRlQ29uZmlnRmlsZTtcbiAgICAgICAgaWYoIF9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGNvbmZpZ0ZpbGUpICkge1xuICAgICAgICAgICAgbGV0IGpzb24gPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGNvbmZpZ0ZpbGUpO1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlc0FzT2JqZWN0cyA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gW107XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgYm9pbGVyUGxhdGVzQXNPYmplY3RzLmZvckVhY2goYm9pbGVyUGxhdGVPYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IG5ldyBCb2lsZXJQbGF0ZShcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubGFuZ3VhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC50eXBlLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sb2NhdGlvblxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVzLnB1c2goYm9pbGVyUGxhdGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXMuc2V0KHRoaXMsIGJvaWxlclBsYXRlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXMuc2V0KHRoaXMsIFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5sZW5ndGggPT0gMCApIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci53YXJuKFwiVGhlcmUgYXJlIG5vIGJvaWxlciBwbGF0ZXMgaW5zdGFsbGVkIC0gcnVuICdkb2xpdHRsZSB1cGRhdGUnIHRvIGdldCBpdCB1cGRhdGVkXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRBdmFpbGFibGVCb2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIGxldCB1cmkgPSBcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vb3Jncy9kb2xpdHRsZS1ib2lsZXJwbGF0ZXMvcmVwb3NcIjtcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBfaHR0cFdyYXBwZXIuZ2V0KHRoaXMpLmdldEpzb24odXJpKS50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgICAgIGxldCB1cmxzID0gW107XG4gICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goaXRlbSA9PiB1cmxzLnB1c2goaXRlbS5uYW1lKSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh1cmxzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgdXBkYXRlQm9pbGVyUGxhdGVzT25EaXNrKCkge1xuICAgICAgICBsZXQgZm9sZGVycyA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRGb2xkZXJzSW4odGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uKTtcbiAgICAgICAgZm9sZGVycy5mb3JFYWNoKGZvbGRlciA9PiB7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgVXBkYXRlIGJvaWxlciBwbGF0ZSBpbiAnJHtmb2xkZXJ9J2ApO1xuICAgICAgICAgICAgX2dpdC5nZXQodGhpcykuZm9yRm9sZGVyKGZvbGRlcikucHVsbCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdVcGRhdGluZyBhbGwgYm9pbGVyIHBsYXRlcycpO1xuICAgICAgICB0aGlzLnVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpO1xuXG4gICAgICAgIHRoaXMuZ2V0QXZhaWxhYmxlQm9pbGVyUGxhdGVzKCkudGhlbihuYW1lcyA9PiB7XG4gICAgICAgICAgICBuYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb2xkZXJOYW1lID0gcGF0aC5qb2luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbiwgbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhmb2xkZXJOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gYGh0dHBzOi8vZ2l0aHViLmNvbS9kb2xpdHRsZS1ib2lsZXJwbGF0ZXMvJHtuYW1lfS5naXRgO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgR2V0dGluZyBib2lsZXJwbGF0ZSBub3Qgb24gZGlzayBmcm9tICcke3VybH0nYCk7XG4gICAgICAgICAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpLnNpbGVudChmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9uZSh1cmwsIGZvbGRlck5hbWUsIHsgJy0tcmVjdXJzaXZlJzogbnVsbCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVDb25maWd1cmF0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIGxldCBmb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNJbih0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24pO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gW107XG4gICAgICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlRmlsZSA9IHBhdGguam9pbihmb2xkZXIsICdib2lsZXJwbGF0ZS5qcycpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmV4aXN0c1N5bmMoYm9pbGVyUGxhdGVGaWxlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGJvaWxlclBsYXRlRmlsZSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVGcm9tRmlsZSA9IHJlcXVpcmUoYm9pbGVyUGxhdGVGaWxlKTtcblxuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IG5ldyBCb2lsZXJQbGF0ZShcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVGcm9tRmlsZS5sYW5ndWFnZSB8fCAnYW55JyxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVGcm9tRmlsZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZUZyb21GaWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZUZyb21GaWxlLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihmb2xkZXIsIFwiY29udGVudFwiKSk7XG4gICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVzLnB1c2goYm9pbGVyUGxhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYm9pbGVyUGxhdGVzKTtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNPYmplY3RzID0gYm9pbGVyUGxhdGVzLm1hcChfID0+IF8udG9Kc29uKCkpO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNKc29uID0gSlNPTi5zdHJpbmdpZnkoYm9pbGVyUGxhdGVzQXNPYmplY3RzLCBudWxsLCA0KTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmModGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUsIGJvaWxlclBsYXRlc0FzSnNvbik7XG4gICAgfVxufSJdfQ==