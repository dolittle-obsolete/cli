'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BoilerPlatesManager = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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

var boilerPlateFolder = 'boiler-plates'; /*---------------------------------------------------------------------------------------------
                                          *  Copyright (c) Dolittle. All rights reserved.
                                          *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                          *--------------------------------------------------------------------------------------------*/


var binaryFiles = [".jpg", ".png", ".obj", ".dll", ".bin", ".exe", ".ttf"];

var _configManager = new WeakMap();
var _httpWrapper = new WeakMap();
var _git = new WeakMap();
var _folders = new WeakMap();
var _fileSystem = new WeakMap();
var _hasBoilerPlates = new WeakMap();

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
        (0, _classCallCheck3.default)(this, BoilerPlatesManager);

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


    (0, _createClass3.default)(BoilerPlatesManager, [{
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

            _hasBoilerPlates.set(this, _boilerPlates.get(this).length == 0 ? false : true);
        }

        /**
         * Get available boiler plates from GitHub
         */

    }, {
        key: 'getAvailableBoilerPlates',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var _this = this;

                var uri;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                uri = "https://api.github.com/orgs/dolittle-boilerplates/repos";
                                return _context.abrupt('return', new Promise(function (resolve) {
                                    _httpWrapper.get(_this).getJson(uri).then(function (json) {
                                        var result = JSON.parse(json);
                                        var urls = [];
                                        result.forEach(function (item) {
                                            return urls.push(item.name);
                                        });
                                        resolve(urls);
                                    });
                                }));

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getAvailableBoilerPlates() {
                return _ref.apply(this, arguments);
            }

            return getAvailableBoilerPlates;
        }()

        /**
         * Update any existing boiler plates on disk
         */

    }, {
        key: 'updateBoilerPlatesOnDisk',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                var _this2 = this;

                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                return _context3.abrupt('return', new Promise(function () {
                                    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(resolve) {
                                        var folders, updateCount;
                                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        folders = _folders.get(_this2).getFoldersIn(_this2.boilerPlateLocation);
                                                        updateCount = folders.length;

                                                        if (updateCount == 0) resolve();

                                                        folders.forEach(function (folder) {
                                                            _this2._logger.info('Update boiler plate in \'' + folder + '\'');
                                                            _git.get(_this2).forFolder(folder).pull().exec(function () {
                                                                if (--updateCount == 0) resolve();
                                                            });
                                                        });

                                                    case 4:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this2);
                                    }));

                                    return function (_x) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function updateBoilerPlatesOnDisk() {
                return _ref2.apply(this, arguments);
            }

            return updateBoilerPlatesOnDisk;
        }()

        /**
         * Update boiler plates.
         * This will update any existing and download any new ones.
         */

    }, {
        key: 'update',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
                var _this3 = this;

                var promise;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                this._logger.info('Updating all boiler plates');
                                promise = new Promise(function () {
                                    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(resolve) {
                                        var names, cloneCount;
                                        return _regenerator2.default.wrap(function _callee4$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        _context4.next = 2;
                                                        return _this3.updateBoilerPlatesOnDisk();

                                                    case 2:
                                                        _context4.next = 4;
                                                        return _this3.getAvailableBoilerPlates();

                                                    case 4:
                                                        names = _context4.sent;
                                                        cloneCount = 0;

                                                        names.forEach(function (name) {

                                                            var folderName = _path2.default.join(_this3.boilerPlateLocation, name);
                                                            if (!_fileSystem.get(_this3).existsSync(folderName)) {
                                                                var url = 'https://github.com/dolittle-boilerplates/' + name + '.git';
                                                                _this3._logger.info('Getting boilerplate not on disk from \'' + url + '\'');
                                                                cloneCount++;
                                                                _git.get(_this3).silent(false).clone(url, folderName, { '--recursive': null }).exec(function () {
                                                                    if (--cloneCount == 0) {
                                                                        _this3.updateConfiguration();
                                                                        resolve();
                                                                    }
                                                                });
                                                            }
                                                        });

                                                    case 7:
                                                    case 'end':
                                                        return _context4.stop();
                                                }
                                            }
                                        }, _callee4, _this3);
                                    }));

                                    return function (_x2) {
                                        return _ref5.apply(this, arguments);
                                    };
                                }());
                                return _context5.abrupt('return', promise);

                            case 3:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function update() {
                return _ref4.apply(this, arguments);
            }

            return update;
        }()

        /**
         * Update configuration file on disk
         */

    }, {
        key: 'updateConfiguration',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
                var _this4 = this;

                var self, folders, boilerPlates, boilerPlatesAsObjects, boilerPlatesAsJson;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                self = this;
                                folders = _folders.get(this).getFoldersIn(this.boilerPlateLocation);
                                boilerPlates = [];

                                folders.forEach(function (folder) {
                                    var boilerPlateFile = _path2.default.join(folder, 'boilerplate.js');

                                    if (_fileSystem.get(_this4).existsSync(boilerPlateFile)) {
                                        var boilerPlateFromFile = require(boilerPlateFile);
                                        var contentFolder = _path2.default.join(folder, "Content");

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

                                boilerPlatesAsObjects = boilerPlates.map(function (_) {
                                    return _.toJson();
                                });
                                boilerPlatesAsJson = JSON.stringify(boilerPlatesAsObjects, null, 4);

                                _fileSystem.get(this).writeFileSync(this.boilerPlateConfigFile, boilerPlatesAsJson);

                            case 7:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function updateConfiguration() {
                return _ref6.apply(this, arguments);
            }

            return updateConfiguration;
        }()

        /**
         * Create an instance of {BoilerPlate} into a specific destination folder with a given context
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
                var segments = [];
                pathToRename.split(/(\\|\/)/).forEach(function (segment) {
                    return segments.push(_handlebars2.default.compile(segment)(context));
                });
                var result = segments.join('');
                _fileSystem.get(_this5).renameSync(pathToRename, result);
            });

            boilerPlate.filesNeedingBinding.forEach(function (_) {
                var file = _path2.default.join(destination, _);

                var content = _fileSystem.get(_this5).readFileSync(file, 'utf8');
                var template = _handlebars2.default.compile(content);
                var result = template(context);
                _fileSystem.get(_this5).writeFileSync(file, result);
            });
        }

        /**
         * Gets whether or not there are boiler plates installed
         * @returns {boolean} True if there are, false if not
         */

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
    }, {
        key: 'hasBoilerPlates',
        get: function get() {
            return _hasBoilerPlates.get(this);
        }
    }]);
    return BoilerPlatesManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsImJpbmFyeUZpbGVzIiwiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2h0dHBXcmFwcGVyIiwiX2dpdCIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJfaGFzQm9pbGVyUGxhdGVzIiwiX2JvaWxlclBsYXRlcyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJfbG9nZ2VyIiwicmVhZEJvaWxlclBsYXRlcyIsImxhbmd1YWdlIiwiZ2V0IiwiZmlsdGVyIiwiYm9pbGVyUGxhdGUiLCJ0eXBlIiwiY29uZmlnRmlsZSIsImJvaWxlclBsYXRlQ29uZmlnRmlsZSIsImV4aXN0c1N5bmMiLCJqc29uIiwicmVhZEZpbGVTeW5jIiwiYm9pbGVyUGxhdGVzQXNPYmplY3RzIiwiSlNPTiIsInBhcnNlIiwiYm9pbGVyUGxhdGVzIiwiZm9yRWFjaCIsIkJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVPYmplY3QiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJsb2NhdGlvbiIsInBhdGhzTmVlZGluZ0JpbmRpbmciLCJmaWxlc05lZWRpbmdCaW5kaW5nIiwicHVzaCIsImxlbmd0aCIsInVyaSIsIlByb21pc2UiLCJnZXRKc29uIiwidGhlbiIsInJlc3VsdCIsInVybHMiLCJpdGVtIiwicmVzb2x2ZSIsImdldEZvbGRlcnNJbiIsInVwZGF0ZUNvdW50IiwiaW5mbyIsImZvbGRlciIsImZvckZvbGRlciIsInB1bGwiLCJleGVjIiwicHJvbWlzZSIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsIm5hbWVzIiwiY2xvbmVDb3VudCIsImZvbGRlck5hbWUiLCJwYXRoIiwiam9pbiIsInVybCIsInNpbGVudCIsImNsb25lIiwidXBkYXRlQ29uZmlndXJhdGlvbiIsInNlbGYiLCJib2lsZXJQbGF0ZUZpbGUiLCJib2lsZXJQbGF0ZUZyb21GaWxlIiwicmVxdWlyZSIsImNvbnRlbnRGb2xkZXIiLCJwYXRocyIsImdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4iLCJpc0JpbmFyeSIsIl8iLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJiIiwibWFwIiwic3Vic3RyIiwic3RhdCIsInN0YXRTeW5jIiwiaXNEaXJlY3RvcnkiLCJmaWxlIiwidG9Kc29uIiwiYm9pbGVyUGxhdGVzQXNKc29uIiwic3RyaW5naWZ5Iiwid3JpdGVGaWxlU3luYyIsImRlc3RpbmF0aW9uIiwiY29udGV4dCIsImNvcHkiLCJwYXRoVG9SZW5hbWUiLCJzZWdtZW50cyIsInNwbGl0IiwiSGFuZGxlYmFycyIsImNvbXBpbGUiLCJzZWdtZW50IiwicmVuYW1lU3luYyIsImNvbnRlbnQiLCJ0ZW1wbGF0ZSIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLG9CQUFvQixlQUExQixDLENBZEE7Ozs7OztBQWdCQSxJQUFNQyxjQUFjLENBQ2hCLE1BRGdCLEVBRWhCLE1BRmdCLEVBR2hCLE1BSGdCLEVBSWhCLE1BSmdCLEVBS2hCLE1BTGdCLEVBTWhCLE1BTmdCLEVBT2hCLE1BUGdCLENBQXBCOztBQVVBLElBQU1DLGlCQUFpQixJQUFJQyxPQUFKLEVBQXZCO0FBQ0EsSUFBTUMsZUFBZSxJQUFJRCxPQUFKLEVBQXJCO0FBQ0EsSUFBTUUsT0FBTyxJQUFJRixPQUFKLEVBQWI7QUFDQSxJQUFNRyxXQUFXLElBQUlILE9BQUosRUFB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UDtBQUNIOztBQUVEOzs7Ozs7OzRCQUk0QjtBQUN4QixtQkFBT21FLGVBQUtDLElBQUwsQ0FBVWxFLGVBQWVxQixHQUFmLENBQW1CLElBQW5CLEVBQXlCb0YscUJBQW5DLEVBQTBELG9CQUExRCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSW1CO0FBQ2YsbUJBQU9sRyxjQUFjYyxHQUFkLENBQWtCLElBQWxCLENBQVA7QUFDSDs7OzRCQW9OcUI7QUFDbEIsbUJBQU9mLGlCQUFpQmUsR0FBakIsQ0FBcUIsSUFBckIsQ0FBUDtBQUNIIiwiZmlsZSI6IkJvaWxlclBsYXRlc01hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbi9Db25maWdNYW5hZ2VyJztcbmltcG9ydCB7IEh0dHBXcmFwcGVyIH0gZnJvbSAnLi4vSHR0cFdyYXBwZXInO1xuaW1wb3J0IHsgR2l0IH0gZnJvbSAnc2ltcGxlLWdpdCc7XG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IEJvaWxlclBsYXRlIH0gZnJvbSAnLi9Cb2lsZXJQbGF0ZSc7XG5pbXBvcnQgSGFuZGxlYmFycyBmcm9tICdoYW5kbGViYXJzJztcblxuY29uc3QgYm9pbGVyUGxhdGVGb2xkZXIgPSAnYm9pbGVyLXBsYXRlcyc7XG5cbmNvbnN0IGJpbmFyeUZpbGVzID0gW1xuICAgIFwiLmpwZ1wiLFxuICAgIFwiLnBuZ1wiLFxuICAgIFwiLm9ialwiLFxuICAgIFwiLmRsbFwiLFxuICAgIFwiLmJpblwiLFxuICAgIFwiLmV4ZVwiLFxuICAgIFwiLnR0ZlwiXG5dO1xuXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaHR0cFdyYXBwZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaGFzQm9pbGVyUGxhdGVzID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgX2JvaWxlclBsYXRlcyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgbWFuYWdlciBvZiBib2lsZXIgcGxhdGVzXG4gKi9cbmV4cG9ydCBjbGFzcyBCb2lsZXJQbGF0ZXNNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7Q29uZmlnTWFuYWdlcn0gY29uZmlnTWFuYWdlciBcbiAgICAgKiBAcGFyYW0ge0h0dHBXcmFwcGVyfSBodHRwV3JhcHBlclxuICAgICAqIEBwYXJhbSB7R2l0fSBnaXRcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnNcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlcjtcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWdNYW5hZ2VyLCBodHRwV3JhcHBlciwgZ2l0LCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2NvbmZpZ01hbmFnZXIuc2V0KHRoaXMsIGNvbmZpZ01hbmFnZXIpO1xuICAgICAgICBfaHR0cFdyYXBwZXIuc2V0KHRoaXMsIGh0dHBXcmFwcGVyKTtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIF9naXQuc2V0KHRoaXMsIGdpdCk7XG5cbiAgICAgICAgZm9sZGVycy5tYWtlRm9sZGVySWZOb3RFeGlzdHModGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uKTtcblxuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIHRoaXMucmVhZEJvaWxlclBsYXRlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYmFzZSBwYXRoIGZvciBib2lsZXIgcGxhdGVzXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQmFzZSBwYXRoIG9mIGJvaWxlciBwbGF0ZXNcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVMb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihfY29uZmlnTWFuYWdlci5nZXQodGhpcykuY2VudHJhbEZvbGRlckxvY2F0aW9uLCBib2lsZXJQbGF0ZUZvbGRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBwYXRoIHRvIHRoZSBib2lsZXIgcGxhdGVzIGNvbmZpZyBmaWxlXG4gICAgICogQHJldHVybnMge3N0cmluZ30gUGF0aCB0byB0aGUgY29uZmlnIGZpbGVcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVDb25maWdGaWxlKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKS5jZW50cmFsRm9sZGVyTG9jYXRpb24sIFwiYm9pbGVyLXBsYXRlcy5qc29uXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlc1xuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2UobGFuZ3VhZ2UpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS5sYW5ndWFnZSA9PSBsYW5ndWFnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlcyBmb3IgdGhlIHR5cGVcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeVR5cGUodHlwZSkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcykuZmlsdGVyKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLnR5cGUgPT0gdHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKGxhbmd1YWdlLCB0eXBlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5maWx0ZXIoYm9pbGVyUGxhdGUgPT4gYm9pbGVyUGxhdGUubGFuZ3VhZ2UgPT0gbGFuZ3VhZ2UgJiYgYm9pbGVyUGxhdGUudHlwZSA9PSB0eXBlKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlYWQgYWxsIGJvaWxlciBwbGF0ZXMgZnJvbSBkaXNrXG4gICAgICovXG4gICAgcmVhZEJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgbGV0IGNvbmZpZ0ZpbGUgPSB0aGlzLmJvaWxlclBsYXRlQ29uZmlnRmlsZTtcbiAgICAgICAgaWYgKF9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGNvbmZpZ0ZpbGUpKSB7XG4gICAgICAgICAgICBsZXQganNvbiA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoY29uZmlnRmlsZSk7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNPYmplY3RzID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZXMgPSBbXTtcblxuXG4gICAgICAgICAgICBib2lsZXJQbGF0ZXNBc09iamVjdHMuZm9yRWFjaChib2lsZXJQbGF0ZU9iamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gbmV3IEJvaWxlclBsYXRlKFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5wYXRoc05lZWRpbmdCaW5kaW5nIHx8IFtdLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5maWxlc05lZWRpbmdCaW5kaW5nIHx8IFtdXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZXMucHVzaChib2lsZXJQbGF0ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgX2JvaWxlclBsYXRlcy5zZXQodGhpcywgYm9pbGVyUGxhdGVzKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgX2JvaWxlclBsYXRlcy5zZXQodGhpcywgW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgX2hhc0JvaWxlclBsYXRlcy5zZXQodGhpcywgX2JvaWxlclBsYXRlcy5nZXQodGhpcykubGVuZ3RoID09IDAgPyBmYWxzZTogdHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZyb20gR2l0SHViXG4gICAgICovXG4gICAgYXN5bmMgZ2V0QXZhaWxhYmxlQm9pbGVyUGxhdGVzKCkge1xuICAgICAgICBsZXQgdXJpID0gXCJodHRwczovL2FwaS5naXRodWIuY29tL29yZ3MvZG9saXR0bGUtYm9pbGVycGxhdGVzL3JlcG9zXCI7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIF9odHRwV3JhcHBlci5nZXQodGhpcykuZ2V0SnNvbih1cmkpLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICAgICAgbGV0IHVybHMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaChpdGVtID0+IHVybHMucHVzaChpdGVtLm5hbWUpKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHVybHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhbnkgZXhpc3RpbmcgYm9pbGVyIHBsYXRlcyBvbiBkaXNrXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlQm9pbGVyUGxhdGVzT25EaXNrKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBsZXQgZm9sZGVycyA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRGb2xkZXJzSW4odGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uKTtcbiAgICAgICAgICAgIGxldCB1cGRhdGVDb3VudCA9IGZvbGRlcnMubGVuZ3RoO1xuICAgICAgICAgICAgaWYoIHVwZGF0ZUNvdW50ID09IDAgKSByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBVcGRhdGUgYm9pbGVyIHBsYXRlIGluICcke2ZvbGRlcn0nYCk7XG4gICAgICAgICAgICAgICAgX2dpdC5nZXQodGhpcykuZm9yRm9sZGVyKGZvbGRlcikucHVsbCgpLmV4ZWMoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoLS11cGRhdGVDb3VudCA9PSAwKSByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYm9pbGVyIHBsYXRlcy5cbiAgICAgKiBUaGlzIHdpbGwgdXBkYXRlIGFueSBleGlzdGluZyBhbmQgZG93bmxvYWQgYW55IG5ldyBvbmVzLlxuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oJ1VwZGF0aW5nIGFsbCBib2lsZXIgcGxhdGVzJyk7XG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpO1xuICAgICAgICAgICAgbGV0IG5hbWVzID0gYXdhaXQgdGhpcy5nZXRBdmFpbGFibGVCb2lsZXJQbGF0ZXMoKTtcblxuICAgICAgICAgICAgbGV0IGNsb25lQ291bnQgPSAwO1xuICAgICAgICAgICAgbmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCBmb2xkZXJOYW1lID0gcGF0aC5qb2luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbiwgbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhmb2xkZXJOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gYGh0dHBzOi8vZ2l0aHViLmNvbS9kb2xpdHRsZS1ib2lsZXJwbGF0ZXMvJHtuYW1lfS5naXRgO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgR2V0dGluZyBib2lsZXJwbGF0ZSBub3Qgb24gZGlzayBmcm9tICcke3VybH0nYCk7XG4gICAgICAgICAgICAgICAgICAgIGNsb25lQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgX2dpdC5nZXQodGhpcykuc2lsZW50KGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb25lKHVybCwgZm9sZGVyTmFtZSwgeyAnLS1yZWN1cnNpdmUnOiBudWxsIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhlYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC0tY2xvbmVDb3VudCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29uZmlndXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgY29uZmlndXJhdGlvbiBmaWxlIG9uIGRpc2tcbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBmb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNJbih0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24pO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gW107XG4gICAgICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlRmlsZSA9IHBhdGguam9pbihmb2xkZXIsICdib2lsZXJwbGF0ZS5qcycpO1xuXG4gICAgICAgICAgICBpZiAoX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmV4aXN0c1N5bmMoYm9pbGVyUGxhdGVGaWxlKSkge1xuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZUZyb21GaWxlID0gcmVxdWlyZShib2lsZXJQbGF0ZUZpbGUpO1xuICAgICAgICAgICAgICAgIGxldCBjb250ZW50Rm9sZGVyID0gcGF0aC5qb2luKGZvbGRlciwgXCJDb250ZW50XCIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oY29udGVudEZvbGRlcik7XG4gICAgICAgICAgICAgICAgcGF0aHMgPSBwYXRocy5maWx0ZXIoXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpc0JpbmFyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBiaW5hcnlGaWxlcy5mb3JFYWNoKGIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8udG9Mb3dlckNhc2UoKS5pbmRleE9mKGIpID4gMCkgaXNCaW5hcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc0JpbmFyeTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsZXQgcGF0aHNOZWVkaW5nQmluZGluZyA9IHBhdGhzLmZpbHRlcihfID0+IF8uaW5kZXhPZigne3snKSA+IDApLm1hcChfID0+IF8uc3Vic3RyKGNvbnRlbnRGb2xkZXIubGVuZ3RoICsgMSkpO1xuICAgICAgICAgICAgICAgIGxldCBmaWxlc05lZWRpbmdCaW5kaW5nID0gW107XG5cbiAgICAgICAgICAgICAgICBwYXRocy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhfKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnJlYWRGaWxlU3luYyhfKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLmluZGV4T2YoJ3t7JykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzTmVlZGluZ0JpbmRpbmcucHVzaChfLnN1YnN0cihjb250ZW50Rm9sZGVyLmxlbmd0aCArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gbmV3IEJvaWxlclBsYXRlKFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZUZyb21GaWxlLmxhbmd1YWdlIHx8ICdhbnknLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZUZyb21GaWxlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlRnJvbUZpbGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlRnJvbUZpbGUudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEZvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgcGF0aHNOZWVkaW5nQmluZGluZyxcbiAgICAgICAgICAgICAgICAgICAgZmlsZXNOZWVkaW5nQmluZGluZ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVzLnB1c2goYm9pbGVyUGxhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNPYmplY3RzID0gYm9pbGVyUGxhdGVzLm1hcChfID0+IF8udG9Kc29uKCkpO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNKc29uID0gSlNPTi5zdHJpbmdpZnkoYm9pbGVyUGxhdGVzQXNPYmplY3RzLCBudWxsLCA0KTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmModGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUsIGJvaWxlclBsYXRlc0FzSnNvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZX0gaW50byBhIHNwZWNpZmljIGRlc3RpbmF0aW9uIGZvbGRlciB3aXRoIGEgZ2l2ZW4gY29udGV4dFxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGV9IGJvaWxlclBsYXRlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dCBcbiAgICAgKi9cbiAgICBjcmVhdGVJbnN0YW5jZShib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgX2ZvbGRlcnMuZ2V0KHRoaXMpLmNvcHkoZGVzdGluYXRpb24sIGJvaWxlclBsYXRlLmxvY2F0aW9uKTtcbiAgICAgICAgYm9pbGVyUGxhdGUucGF0aHNOZWVkaW5nQmluZGluZy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgbGV0IHBhdGhUb1JlbmFtZSA9IHBhdGguam9pbihkZXN0aW5hdGlvbiwgXyk7XG4gICAgICAgICAgICBsZXQgc2VnbWVudHMgPSBbXTtcbiAgICAgICAgICAgIHBhdGhUb1JlbmFtZS5zcGxpdCgvKFxcXFx8XFwvKS8pLmZvckVhY2goc2VnbWVudCA9PiBzZWdtZW50cy5wdXNoKEhhbmRsZWJhcnMuY29tcGlsZShzZWdtZW50KShjb250ZXh0KSkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHNlZ21lbnRzLmpvaW4oJycpO1xuICAgICAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlbmFtZVN5bmMocGF0aFRvUmVuYW1lLCByZXN1bHQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBib2lsZXJQbGF0ZS5maWxlc05lZWRpbmdCaW5kaW5nLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICBsZXQgZmlsZSA9IHBhdGguam9pbihkZXN0aW5hdGlvbiwgXyk7XG5cbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhmaWxlLCAndXRmOCcpXG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUoY29udGVudCk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGVtcGxhdGUoY29udGV4dCk7XG4gICAgICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyhmaWxlLCByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgb3Igbm90IHRoZXJlIGFyZSBib2lsZXIgcGxhdGVzIGluc3RhbGxlZFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZXJlIGFyZSwgZmFsc2UgaWYgbm90XG4gICAgICovXG4gICAgZ2V0IGhhc0JvaWxlclBsYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIF9oYXNCb2lsZXJQbGF0ZXMuZ2V0KHRoaXMpO1xuICAgIH1cbn0iXX0=