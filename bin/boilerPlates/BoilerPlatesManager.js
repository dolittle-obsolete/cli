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

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _winston = require('winston');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _BoilerPlate = require('./BoilerPlate');

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _Guid = require('../Guid');

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable no-unused-vars */

var boilerPlateFolder = 'boiler-plates'; /*---------------------------------------------------------------------------------------------
                                          *  Copyright (c) Dolittle. All rights reserved.
                                          *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                          *--------------------------------------------------------------------------------------------*/

/* eslint-disable no-unused-vars */


var binaryFiles = ['.jpg', '.png', '.obj', '.dll', '.bin', '.exe', '.ttf'];
/**
 * @type {WeakMap<BoilerPlatesManager, ConfigManager>}
 */
var _configManager = new WeakMap();
/**
 * @type {WeakMap<BoilerPlatesManager, HttpWrapper>}
 */
var _httpWrapper = new WeakMap();
/**
 * @type {WeakMap<BoilerPlatesManager, Git>}
 */
var _git = new WeakMap();
/**
 * @type {WeakMap<BoilerPlatesManager, Folders>}
 */
var _folders = new WeakMap();
/**
 * @type {WeakMap<BoilerPlatesManager, fs>}
 */
var _fileSystem = new WeakMap();
/**
 * @type {WeakMap<BoilerPlatesManager, boolean>}
 */
var _hasBoilerPlates = new WeakMap();
/**
 * @type {WeakMap<BoilerPlatesManager, BoilerPlate[]>}
 */
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
     * @param {Logger} logger
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
        this.setupHandlebars();
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
                    var boilerPlate = new _BoilerPlate.BoilerPlate(boilerPlateObject.language, boilerPlateObject.name, boilerPlateObject.description, boilerPlateObject.type, boilerPlateObject.dependencies, boilerPlateObject.location, boilerPlateObject.pathsNeedingBinding || [], boilerPlateObject.filesNeedingBinding || []);
                    boilerPlates.push(boilerPlate);
                });

                _boilerPlates.set(this, boilerPlates);
            } else {

                _boilerPlates.set(this, []);
            }

            _hasBoilerPlates.set(this, _boilerPlates.get(this).length == 0 ? false : true);
        }
        /**
         * Sets up the handlebars system with custom helpers
         */

    }, {
        key: 'setupHandlebars',
        value: function setupHandlebars() {
            _handlebars2.default.registerHelper('createGuid', function () {
                return _Guid.Guid.create();
            });
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
                                uri = 'https://api.github.com/orgs/dolittle-boilerplates/repos';
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
         * @returns {Promise<number>} number of updated folders
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


                                                        if (updateCount === 0) resolve(0);
                                                        folders.forEach(function (folder) {
                                                            _this2._logger.info('Update boiler plate in \'' + folder + '\'');
                                                            _git.get(_this2).forFolder(folder).pull().exec(function () {
                                                                if (--updateCount === 0) resolve(folders.length);
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
                                        var clonedNewRepos, updatedCount, names, cloneCount;
                                        return _regenerator2.default.wrap(function _callee4$(_context4) {
                                            while (1) {
                                                switch (_context4.prev = _context4.next) {
                                                    case 0:
                                                        clonedNewRepos = false;
                                                        _context4.next = 3;
                                                        return _this3.updateBoilerPlatesOnDisk();

                                                    case 3:
                                                        updatedCount = _context4.sent;
                                                        _context4.next = 6;
                                                        return _this3.getAvailableBoilerPlates();

                                                    case 6:
                                                        names = _context4.sent;
                                                        cloneCount = 0;

                                                        names.forEach(function (name) {
                                                            var folderName = _path2.default.join(_this3.boilerPlateLocation, name);

                                                            if (!_fileSystem.get(_this3).existsSync(folderName)) {
                                                                clonedNewRepos = true;
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
                                                        if (!clonedNewRepos && updatedCount > 0) {
                                                            _this3.updateConfiguration();
                                                            resolve();
                                                        }

                                                    case 10:
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
                                this._logger.info('Updating the ' + this.boilerPlateConfigFile + ' configuration');
                                self = this;
                                folders = _folders.get(this).getFoldersIn(this.boilerPlateLocation);
                                boilerPlates = [];

                                folders.forEach(function (folder) {
                                    var boilerPlatesPaths = _folders.get(_this4).searchRecursive(folder, 'boilerplate.json');
                                    var contentFolder = _path2.default.join(folder, 'Content');

                                    boilerPlatesPaths.forEach(function (boilerPlatePath) {
                                        var boilerPlateObject = JSON.parse(_fileSystem.get(_this4).readFileSync(boilerPlatePath, 'utf8'));
                                        if (boilerPlateObject.type != 'artifacts') {
                                            var paths = _folders.get(_this4).getFoldersAndFilesRecursivelyIn(contentFolder);
                                            paths = paths.filter(function (_) {
                                                var include = true;
                                                binaryFiles.forEach(function (b) {
                                                    if (_.toLowerCase().indexOf(b) > 0) include = false;
                                                });
                                                return include;
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

                                            boilerPlateObject.location = contentFolder;
                                            boilerPlateObject.pathsNeedingBinding = pathsNeedingBinding;
                                            boilerPlateObject.filesNeedingBinding = filesNeedingBinding;
                                        } else {
                                            boilerPlateObject.location = _path2.default.dirname(boilerPlatePath);
                                            boilerPlateObject.pathsNeedingBinding = [];
                                            boilerPlateObject.filesNeedingBinding = [];
                                        }

                                        var boilerPlate = new _BoilerPlate.BoilerPlate(boilerPlateObject.language || 'any', boilerPlateObject.name, boilerPlateObject.description, boilerPlateObject.type, boilerPlateObject.dependencies, boilerPlateObject.location, boilerPlateObject.pathsNeedingBinding, boilerPlateObject.filesNeedingBinding);
                                        boilerPlates.push(boilerPlate);
                                    });
                                });
                                boilerPlatesAsObjects = boilerPlates.map(function (_) {
                                    return _.toJson();
                                });
                                boilerPlatesAsJson = JSON.stringify(boilerPlatesAsObjects, null, 4);

                                _fileSystem.get(this).writeFileSync(this.boilerPlateConfigFile, boilerPlatesAsJson);

                            case 8:
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
         * Create an instance of {BoilerPlate} of an artifact into a specific destination folder with a given context
         * @param {{template: any, location: string}} artifactTemplate
         * @param {string} destination 
         * @param {object} context 
         */

    }, {
        key: 'createArtifactInstance',
        value: function createArtifactInstance(artifactTemplate, destination, context) {
            var _this6 = this;

            var filesToCreate = _folders.get(this).getArtifactTemplateFilesRecursivelyIn(artifactTemplate.location, artifactTemplate.template.includedFiles);

            filesToCreate.forEach(function (filePath) {
                var filename = (0, _helpers.getFileNameAndExtension)(filePath);
                var oldContent = _fileSystem.get(_this6).readFileSync(filePath, 'utf8');
                var segments = [];

                _path2.default.join(destination, filename).split(/(\\|\/)/).forEach(function (segment) {
                    return segments.push(_handlebars2.default.compile(segment)(context));
                });
                var newFilePath = segments.join('');

                var template = _handlebars2.default.compile(oldContent);
                var newContent = template(context);
                _fileSystem.get(_this6).writeFileSync(newFilePath, newContent);
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
            return _path2.default.join(_configManager.get(this).centralFolderLocation, 'boiler-plates.json');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsImJpbmFyeUZpbGVzIiwiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2h0dHBXcmFwcGVyIiwiX2dpdCIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJfaGFzQm9pbGVyUGxhdGVzIiwiX2JvaWxlclBsYXRlcyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJfbG9nZ2VyIiwicmVhZEJvaWxlclBsYXRlcyIsInNldHVwSGFuZGxlYmFycyIsImxhbmd1YWdlIiwiZ2V0IiwiZmlsdGVyIiwiYm9pbGVyUGxhdGUiLCJ0eXBlIiwiY29uZmlnRmlsZSIsImJvaWxlclBsYXRlQ29uZmlnRmlsZSIsImV4aXN0c1N5bmMiLCJqc29uIiwicmVhZEZpbGVTeW5jIiwiYm9pbGVyUGxhdGVzQXNPYmplY3RzIiwiSlNPTiIsInBhcnNlIiwiYm9pbGVyUGxhdGVzIiwiZm9yRWFjaCIsIkJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVPYmplY3QiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJkZXBlbmRlbmNpZXMiLCJsb2NhdGlvbiIsInBhdGhzTmVlZGluZ0JpbmRpbmciLCJmaWxlc05lZWRpbmdCaW5kaW5nIiwicHVzaCIsImxlbmd0aCIsIkhhbmRsZWJhcnMiLCJyZWdpc3RlckhlbHBlciIsIkd1aWQiLCJjcmVhdGUiLCJ1cmkiLCJQcm9taXNlIiwiZ2V0SnNvbiIsInRoZW4iLCJyZXN1bHQiLCJ1cmxzIiwiaXRlbSIsInJlc29sdmUiLCJnZXRGb2xkZXJzSW4iLCJ1cGRhdGVDb3VudCIsImluZm8iLCJmb2xkZXIiLCJmb3JGb2xkZXIiLCJwdWxsIiwiZXhlYyIsInByb21pc2UiLCJjbG9uZWROZXdSZXBvcyIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsInVwZGF0ZWRDb3VudCIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsIm5hbWVzIiwiY2xvbmVDb3VudCIsImZvbGRlck5hbWUiLCJwYXRoIiwiam9pbiIsInVybCIsInNpbGVudCIsImNsb25lIiwidXBkYXRlQ29uZmlndXJhdGlvbiIsInNlbGYiLCJib2lsZXJQbGF0ZXNQYXRocyIsInNlYXJjaFJlY3Vyc2l2ZSIsImNvbnRlbnRGb2xkZXIiLCJib2lsZXJQbGF0ZVBhdGgiLCJwYXRocyIsImdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4iLCJpbmNsdWRlIiwiXyIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsImIiLCJtYXAiLCJzdWJzdHIiLCJzdGF0Iiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsImZpbGUiLCJkaXJuYW1lIiwidG9Kc29uIiwiYm9pbGVyUGxhdGVzQXNKc29uIiwic3RyaW5naWZ5Iiwid3JpdGVGaWxlU3luYyIsImRlc3RpbmF0aW9uIiwiY29udGV4dCIsImNvcHkiLCJwYXRoVG9SZW5hbWUiLCJzZWdtZW50cyIsInNwbGl0IiwiY29tcGlsZSIsInNlZ21lbnQiLCJyZW5hbWVTeW5jIiwiY29udGVudCIsInRlbXBsYXRlIiwiYXJ0aWZhY3RUZW1wbGF0ZSIsImZpbGVzVG9DcmVhdGUiLCJnZXRBcnRpZmFjdFRlbXBsYXRlRmlsZXNSZWN1cnNpdmVseUluIiwiaW5jbHVkZWRGaWxlcyIsImZpbGVuYW1lIiwiZmlsZVBhdGgiLCJvbGRDb250ZW50IiwibmV3RmlsZVBhdGgiLCJuZXdDb250ZW50IiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBRUEsSUFBTUEsb0JBQW9CLGVBQTFCLEMsQ0FuQkE7Ozs7O0FBS0E7OztBQWdCQSxJQUFNQyxjQUFjLENBQ2hCLE1BRGdCLEVBRWhCLE1BRmdCLEVBR2hCLE1BSGdCLEVBSWhCLE1BSmdCLEVBS2hCLE1BTGdCLEVBTWhCLE1BTmdCLEVBT2hCLE1BUGdCLENBQXBCO0FBU0E7OztBQUdBLElBQU1DLGlCQUFpQixJQUFJQyxPQUFKLEVBQXZCO0FBQ0E7OztBQUdBLElBQU1DLGVBQWUsSUFBSUQsT0FBSixFQUFyQjtBQUNBOzs7QUFHQSxJQUFNRSxPQUFPLElBQUlGLE9BQUosRUFBYjtBQUNBOzs7QUFHQSxJQUFNRyxXQUFXLElBQUlILE9BQUosRUFBakI7QUFDQTs7O0FBR0EsSUFBTUksY0FBYyxJQUFJSixPQUFKLEVBQXBCO0FBQ0E7OztBQUdBLElBQU1LLG1CQUFtQixJQUFJTCxPQUFKLEVBQXpCO0FBQ0E7OztBQUdBLElBQU1NLGdCQUFnQixJQUFJTixPQUFKLEVBQXRCOztBQUVBOzs7O0lBR2FPLG1CLFdBQUFBLG1COztBQUVUOzs7Ozs7Ozs7QUFTQSxpQ0FBWUMsYUFBWixFQUEyQkMsV0FBM0IsRUFBd0NDLEdBQXhDLEVBQTZDQyxPQUE3QyxFQUFzREMsVUFBdEQsRUFBa0VDLE1BQWxFLEVBQTBFO0FBQUE7O0FBQ3RFZCx1QkFBZWUsR0FBZixDQUFtQixJQUFuQixFQUF5Qk4sYUFBekI7QUFDQVAscUJBQWFhLEdBQWIsQ0FBaUIsSUFBakIsRUFBdUJMLFdBQXZCO0FBQ0FOLGlCQUFTVyxHQUFULENBQWEsSUFBYixFQUFtQkgsT0FBbkI7QUFDQVAsb0JBQVlVLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JGLFVBQXRCO0FBQ0FWLGFBQUtZLEdBQUwsQ0FBUyxJQUFULEVBQWVKLEdBQWY7O0FBRUFDLGdCQUFRSSxxQkFBUixDQUE4QixLQUFLQyxtQkFBbkM7O0FBRUEsYUFBS0MsT0FBTCxHQUFlSixNQUFmO0FBQ0EsYUFBS0ssZ0JBQUw7QUFDQSxhQUFLQyxlQUFMO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7QUF3QkE7Ozs7OytDQUt1QkMsUSxFQUFVO0FBQzdCLG1CQUFPZCxjQUFjZSxHQUFkLENBQWtCLElBQWxCLEVBQXdCQyxNQUF4QixDQUErQjtBQUFBLHVCQUFlQyxZQUFZSCxRQUFaLElBQXdCQSxRQUF2QztBQUFBLGFBQS9CLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7MkNBS21CSSxJLEVBQU07QUFDckIsbUJBQU9sQixjQUFjZSxHQUFkLENBQWtCLElBQWxCLEVBQXdCQyxNQUF4QixDQUErQjtBQUFBLHVCQUFlQyxZQUFZQyxJQUFaLElBQW9CQSxJQUFuQztBQUFBLGFBQS9CLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7O3NEQU04QkosUSxFQUFVSSxJLEVBQU07QUFDMUMsbUJBQU9sQixjQUFjZSxHQUFkLENBQWtCLElBQWxCLEVBQXdCQyxNQUF4QixDQUErQjtBQUFBLHVCQUFlQyxZQUFZSCxRQUFaLElBQXdCQSxRQUF4QixJQUFvQ0csWUFBWUMsSUFBWixJQUFvQkEsSUFBdkU7QUFBQSxhQUEvQixDQUFQO0FBQ0g7O0FBRUQ7Ozs7OzsyQ0FHbUI7QUFDZixnQkFBSUMsYUFBYSxLQUFLQyxxQkFBdEI7QUFDQSxnQkFBSXRCLFlBQVlpQixHQUFaLENBQWdCLElBQWhCLEVBQXNCTSxVQUF0QixDQUFpQ0YsVUFBakMsQ0FBSixFQUFrRDtBQUM5QyxvQkFBSUcsT0FBT3hCLFlBQVlpQixHQUFaLENBQWdCLElBQWhCLEVBQXNCUSxZQUF0QixDQUFtQ0osVUFBbkMsQ0FBWDtBQUNBLG9CQUFJSyx3QkFBd0JDLEtBQUtDLEtBQUwsQ0FBV0osSUFBWCxDQUE1QjtBQUNBLG9CQUFJSyxlQUFlLEVBQW5CO0FBQ0FILHNDQUFzQkksT0FBdEIsQ0FBOEIsNkJBQXFCO0FBQy9DLHdCQUFJWCxjQUFjLElBQUlZLHdCQUFKLENBQ2RDLGtCQUFrQmhCLFFBREosRUFFZGdCLGtCQUFrQkMsSUFGSixFQUdkRCxrQkFBa0JFLFdBSEosRUFJZEYsa0JBQWtCWixJQUpKLEVBS2RZLGtCQUFrQkcsWUFMSixFQU1kSCxrQkFBa0JJLFFBTkosRUFPZEosa0JBQWtCSyxtQkFBbEIsSUFBeUMsRUFQM0IsRUFRZEwsa0JBQWtCTSxtQkFBbEIsSUFBeUMsRUFSM0IsQ0FBbEI7QUFVQVQsaUNBQWFVLElBQWIsQ0FBa0JwQixXQUFsQjtBQUNILGlCQVpEOztBQWNBakIsOEJBQWNRLEdBQWQsQ0FBa0IsSUFBbEIsRUFBd0JtQixZQUF4QjtBQUNILGFBbkJELE1BbUJPOztBQUVIM0IsOEJBQWNRLEdBQWQsQ0FBa0IsSUFBbEIsRUFBd0IsRUFBeEI7QUFDSDs7QUFFRFQsNkJBQWlCUyxHQUFqQixDQUFxQixJQUFyQixFQUEyQlIsY0FBY2UsR0FBZCxDQUFrQixJQUFsQixFQUF3QnVCLE1BQXhCLElBQWtDLENBQWxDLEdBQXNDLEtBQXRDLEdBQTZDLElBQXhFO0FBQ0g7QUFDRDs7Ozs7OzBDQUdrQjtBQUNkQyxpQ0FBV0MsY0FBWCxDQUEwQixZQUExQixFQUF3QyxZQUFNO0FBQzFDLHVCQUFPQyxXQUFLQyxNQUFMLEVBQVA7QUFDSCxhQUZEO0FBR0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7OztBQUlRQyxtQyxHQUFNLHlEO2lFQUNILElBQUlDLE9BQUosQ0FBWSxtQkFBVztBQUMxQmpELGlEQUFhb0IsR0FBYixDQUFpQixLQUFqQixFQUF1QjhCLE9BQXZCLENBQStCRixHQUEvQixFQUFvQ0csSUFBcEMsQ0FBeUMsZ0JBQVE7QUFDN0MsNENBQUlDLFNBQVN0QixLQUFLQyxLQUFMLENBQVdKLElBQVgsQ0FBYjtBQUNBLDRDQUFJMEIsT0FBTyxFQUFYO0FBQ0FELCtDQUFPbkIsT0FBUCxDQUFlO0FBQUEsbURBQVFvQixLQUFLWCxJQUFMLENBQVVZLEtBQUtsQixJQUFmLENBQVI7QUFBQSx5Q0FBZjtBQUNBbUIsZ0RBQVFGLElBQVI7QUFDSCxxQ0FMRDtBQU1ILGlDQVBNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVVg7Ozs7Ozs7Ozs7Ozs7OztrRUFLVyxJQUFJSixPQUFKO0FBQUEseUhBQVksa0JBQU1NLE9BQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1g3QywrREFEVyxHQUNEUixTQUFTa0IsR0FBVCxDQUFhLE1BQWIsRUFBbUJvQyxZQUFuQixDQUFnQyxPQUFLekMsbUJBQXJDLENBREM7QUFFWDBDLG1FQUZXLEdBRUcvQyxRQUFRaUMsTUFGWDs7O0FBSWYsNERBQUljLGdCQUFnQixDQUFwQixFQUF1QkYsUUFBUSxDQUFSO0FBQ3ZCN0MsZ0VBQVF1QixPQUFSLENBQWdCLGtCQUFVO0FBQ3RCLG1FQUFLakIsT0FBTCxDQUFhMEMsSUFBYiwrQkFBNkNDLE1BQTdDO0FBQ0ExRCxpRUFBS21CLEdBQUwsQ0FBUyxNQUFULEVBQWV3QyxTQUFmLENBQXlCRCxNQUF6QixFQUFpQ0UsSUFBakMsR0FBd0NDLElBQXhDLENBQTZDLFlBQU07QUFDL0Msb0VBQUksRUFBRUwsV0FBRixLQUFrQixDQUF0QixFQUF5QkYsUUFBUTdDLFFBQVFpQyxNQUFoQjtBQUM1Qiw2REFGRDtBQUdILHlEQUxEOztBQUxlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFDQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLG9DOzs7Ozs7Ozs7Ozs7Ozs7OztBQWNYOzs7Ozs7Ozs7Ozs7Ozs7O0FBS0kscUNBQUszQixPQUFMLENBQWEwQyxJQUFiLENBQWtCLDRCQUFsQjtBQUNJSyx1QyxHQUFVLElBQUlkLE9BQUo7QUFBQSx5SEFBWSxrQkFBTU0sT0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDbEJTLHNFQURrQixHQUNELEtBREM7QUFBQTtBQUFBLCtEQUVLLE9BQUtDLHdCQUFMLEVBRkw7O0FBQUE7QUFFaEJDLG9FQUZnQjtBQUFBO0FBQUEsK0RBR0osT0FBS0Msd0JBQUwsRUFISTs7QUFBQTtBQUdsQkMsNkRBSGtCO0FBS2xCQyxrRUFMa0IsR0FLTCxDQUxLOztBQU10QkQsOERBQU1uQyxPQUFOLENBQWMsZ0JBQVE7QUFDbEIsZ0VBQUlxQyxhQUFhQyxlQUFLQyxJQUFMLENBQVUsT0FBS3pELG1CQUFmLEVBQW9DcUIsSUFBcEMsQ0FBakI7O0FBRUEsZ0VBQUksQ0FBQ2pDLFlBQVlpQixHQUFaLENBQWdCLE1BQWhCLEVBQXNCTSxVQUF0QixDQUFpQzRDLFVBQWpDLENBQUwsRUFBbUQ7QUFDL0NOLGlGQUFpQixJQUFqQjtBQUNBLG9FQUFJUyxvREFBa0RyQyxJQUFsRCxTQUFKO0FBQ0EsdUVBQUtwQixPQUFMLENBQWEwQyxJQUFiLDZDQUEyRGUsR0FBM0Q7O0FBRUFKOztBQUdBcEUscUVBQUttQixHQUFMLENBQVMsTUFBVCxFQUNLc0QsTUFETCxDQUNZLEtBRFosRUFFS0MsS0FGTCxDQUVXRixHQUZYLEVBRWdCSCxVQUZoQixFQUU0QixFQUFFLGVBQWUsSUFBakIsRUFGNUIsRUFHS1IsSUFITCxDQUdVLFlBQU07O0FBRVIsd0VBQUksRUFBRU8sVUFBRixJQUFnQixDQUFwQixFQUF1QjtBQUNuQiwrRUFBS08sbUJBQUw7QUFDQXJCO0FBQ0g7QUFDSixpRUFUTDtBQVVIO0FBQ0oseURBdEJEO0FBdUJBLDREQUFJLENBQUNTLGNBQUQsSUFBbUJFLGVBQWUsQ0FBdEMsRUFBeUM7QUFDckMsbUVBQUtVLG1CQUFMO0FBQ0FyQjtBQUNIOztBQWhDcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUNBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsb0M7a0VBa0NQUSxPOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdYOzs7Ozs7Ozs7Ozs7Ozs7QUFJSSxxQ0FBSy9DLE9BQUwsQ0FBYTBDLElBQWIsbUJBQWtDLEtBQUtqQyxxQkFBdkM7QUFDSW9ELG9DLEdBQU8sSTtBQUNQbkUsdUMsR0FBVVIsU0FBU2tCLEdBQVQsQ0FBYSxJQUFiLEVBQW1Cb0MsWUFBbkIsQ0FBZ0MsS0FBS3pDLG1CQUFyQyxDO0FBQ1ZpQiw0QyxHQUFlLEU7O0FBQ25CdEIsd0NBQVF1QixPQUFSLENBQWdCLGtCQUFVO0FBQ3RCLHdDQUFJNkMsb0JBQW9CNUUsU0FBU2tCLEdBQVQsQ0FBYSxNQUFiLEVBQW1CMkQsZUFBbkIsQ0FBbUNwQixNQUFuQyxFQUEyQyxrQkFBM0MsQ0FBeEI7QUFDQSx3Q0FBSXFCLGdCQUFnQlQsZUFBS0MsSUFBTCxDQUFVYixNQUFWLEVBQWtCLFNBQWxCLENBQXBCOztBQUVBbUIsc0RBQWtCN0MsT0FBbEIsQ0FBMEIsMkJBQW1CO0FBQ3pDLDRDQUFJRSxvQkFBb0JMLEtBQUtDLEtBQUwsQ0FBVzVCLFlBQVlpQixHQUFaLENBQWdCLE1BQWhCLEVBQXNCUSxZQUF0QixDQUFtQ3FELGVBQW5DLEVBQW9ELE1BQXBELENBQVgsQ0FBeEI7QUFDQSw0Q0FBSTlDLGtCQUFrQlosSUFBbEIsSUFBMEIsV0FBOUIsRUFBMkM7QUFDdkMsZ0RBQUkyRCxRQUFRaEYsU0FBU2tCLEdBQVQsQ0FBYSxNQUFiLEVBQW1CK0QsK0JBQW5CLENBQW1ESCxhQUFuRCxDQUFaO0FBQ0FFLG9EQUFRQSxNQUFNN0QsTUFBTixDQUFhLGFBQUs7QUFDdEIsb0RBQUkrRCxVQUFVLElBQWQ7QUFDQXZGLDREQUFZb0MsT0FBWixDQUFvQixhQUFLO0FBQ3JCLHdEQUFJb0QsRUFBRUMsV0FBRixHQUFnQkMsT0FBaEIsQ0FBd0JDLENBQXhCLElBQTZCLENBQWpDLEVBQW9DSixVQUFVLEtBQVY7QUFDdkMsaURBRkQ7QUFHQSx1REFBT0EsT0FBUDtBQUNILDZDQU5PLENBQVI7QUFPQSxnREFBSTVDLHNCQUFzQjBDLE1BQU03RCxNQUFOLENBQWE7QUFBQSx1REFBS2dFLEVBQUVFLE9BQUYsQ0FBVSxJQUFWLElBQWtCLENBQXZCO0FBQUEsNkNBQWIsRUFBdUNFLEdBQXZDLENBQTJDO0FBQUEsdURBQUtKLEVBQUVLLE1BQUYsQ0FBU1YsY0FBY3JDLE1BQWQsR0FBdUIsQ0FBaEMsQ0FBTDtBQUFBLDZDQUEzQyxDQUExQjs7QUFFQSxnREFBSUYsc0JBQXNCLEVBQTFCO0FBQ0F5QyxrREFBTWpELE9BQU4sQ0FBYyxhQUFLO0FBQ2Ysb0RBQUkwRCxPQUFPeEYsWUFBWWlCLEdBQVosQ0FBZ0J5RCxJQUFoQixFQUFzQmUsUUFBdEIsQ0FBK0JQLENBQS9CLENBQVg7QUFDQSxvREFBSSxDQUFDTSxLQUFLRSxXQUFMLEVBQUwsRUFBeUI7QUFDckIsd0RBQUlDLE9BQU8zRixZQUFZaUIsR0FBWixDQUFnQnlELElBQWhCLEVBQXNCakQsWUFBdEIsQ0FBbUN5RCxDQUFuQyxDQUFYO0FBQ0Esd0RBQUlTLEtBQUtQLE9BQUwsQ0FBYSxJQUFiLEtBQXNCLENBQTFCLEVBQTZCO0FBQ3pCOUMsNEVBQW9CQyxJQUFwQixDQUF5QjJDLEVBQUVLLE1BQUYsQ0FBU1YsY0FBY3JDLE1BQWQsR0FBdUIsQ0FBaEMsQ0FBekI7QUFDSDtBQUNKO0FBQ0osNkNBUkQ7O0FBVUFSLDhEQUFrQkksUUFBbEIsR0FBNkJ5QyxhQUE3QjtBQUNBN0MsOERBQWtCSyxtQkFBbEIsR0FBd0NBLG1CQUF4QztBQUNBTCw4REFBa0JNLG1CQUFsQixHQUF3Q0EsbUJBQXhDO0FBQ0gseUNBekJELE1BMEJLO0FBQ0ROLDhEQUFrQkksUUFBbEIsR0FBNkJnQyxlQUFLd0IsT0FBTCxDQUFhZCxlQUFiLENBQTdCO0FBQ0E5Qyw4REFBa0JLLG1CQUFsQixHQUF3QyxFQUF4QztBQUNBTCw4REFBa0JNLG1CQUFsQixHQUF3QyxFQUF4QztBQUNIOztBQUVELDRDQUFJbkIsY0FBYyxJQUFJWSx3QkFBSixDQUNkQyxrQkFBa0JoQixRQUFsQixJQUE4QixLQURoQixFQUVkZ0Isa0JBQWtCQyxJQUZKLEVBR2RELGtCQUFrQkUsV0FISixFQUlkRixrQkFBa0JaLElBSkosRUFLZFksa0JBQWtCRyxZQUxKLEVBTWRILGtCQUFrQkksUUFOSixFQU9kSixrQkFBa0JLLG1CQVBKLEVBUWRMLGtCQUFrQk0sbUJBUkosQ0FBbEI7QUFVQVQscURBQWFVLElBQWIsQ0FBa0JwQixXQUFsQjtBQUNILHFDQTdDRDtBQThDSCxpQ0FsREQ7QUFtRElPLHFELEdBQXdCRyxhQUFheUQsR0FBYixDQUFpQjtBQUFBLDJDQUFLSixFQUFFVyxNQUFGLEVBQUw7QUFBQSxpQ0FBakIsQztBQUN4QkMsa0QsR0FBcUJuRSxLQUFLb0UsU0FBTCxDQUFlckUscUJBQWYsRUFBc0MsSUFBdEMsRUFBNEMsQ0FBNUMsQzs7QUFDekIxQiw0Q0FBWWlCLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0IrRSxhQUF0QixDQUFvQyxLQUFLMUUscUJBQXpDLEVBQWdFd0Usa0JBQWhFOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdKOzs7Ozs7Ozs7dUNBTWUzRSxXLEVBQWE4RSxXLEVBQWFDLE8sRUFBUztBQUFBOztBQUM5Q25HLHFCQUFTa0IsR0FBVCxDQUFhLElBQWIsRUFBbUJrRixJQUFuQixDQUF3QkYsV0FBeEIsRUFBcUM5RSxZQUFZaUIsUUFBakQ7QUFDQWpCLHdCQUFZa0IsbUJBQVosQ0FBZ0NQLE9BQWhDLENBQXdDLGFBQUs7QUFDekMsb0JBQUlzRSxlQUFlaEMsZUFBS0MsSUFBTCxDQUFVNEIsV0FBVixFQUF1QmYsQ0FBdkIsQ0FBbkI7QUFDQSxvQkFBSW1CLFdBQVcsRUFBZjtBQUNBRCw2QkFBYUUsS0FBYixDQUFtQixTQUFuQixFQUE4QnhFLE9BQTlCLENBQXNDO0FBQUEsMkJBQVd1RSxTQUFTOUQsSUFBVCxDQUFjRSxxQkFBVzhELE9BQVgsQ0FBbUJDLE9BQW5CLEVBQTRCTixPQUE1QixDQUFkLENBQVg7QUFBQSxpQkFBdEM7QUFDQSxvQkFBSWpELFNBQVNvRCxTQUFTaEMsSUFBVCxDQUFjLEVBQWQsQ0FBYjtBQUNBckUsNEJBQVlpQixHQUFaLENBQWdCLE1BQWhCLEVBQXNCd0YsVUFBdEIsQ0FBaUNMLFlBQWpDLEVBQStDbkQsTUFBL0M7QUFDSCxhQU5EOztBQVFBOUIsd0JBQVltQixtQkFBWixDQUFnQ1IsT0FBaEMsQ0FBd0MsYUFBSztBQUN6QyxvQkFBSTZELE9BQU92QixlQUFLQyxJQUFMLENBQVU0QixXQUFWLEVBQXVCZixDQUF2QixDQUFYO0FBQ0Esb0JBQUl3QixVQUFVMUcsWUFBWWlCLEdBQVosQ0FBZ0IsTUFBaEIsRUFBc0JRLFlBQXRCLENBQW1Da0UsSUFBbkMsRUFBeUMsTUFBekMsQ0FBZDtBQUNBLG9CQUFJZ0IsV0FBV2xFLHFCQUFXOEQsT0FBWCxDQUFtQkcsT0FBbkIsQ0FBZjtBQUNBLG9CQUFJekQsU0FBUzBELFNBQVNULE9BQVQsQ0FBYjtBQUNBbEcsNEJBQVlpQixHQUFaLENBQWdCLE1BQWhCLEVBQXNCK0UsYUFBdEIsQ0FBb0NMLElBQXBDLEVBQTBDMUMsTUFBMUM7QUFDSCxhQU5EO0FBT0g7QUFDRDs7Ozs7Ozs7OytDQU11QjJELGdCLEVBQWtCWCxXLEVBQWFDLE8sRUFBUztBQUFBOztBQUMzRCxnQkFBSVcsZ0JBQWdCOUcsU0FBU2tCLEdBQVQsQ0FBYSxJQUFiLEVBQW1CNkYscUNBQW5CLENBQXlERixpQkFBaUJ4RSxRQUExRSxFQUFvRndFLGlCQUFpQkQsUUFBakIsQ0FBMEJJLGFBQTlHLENBQXBCOztBQUVBRiwwQkFBYy9FLE9BQWQsQ0FBdUIsb0JBQVk7QUFDL0Isb0JBQU1rRixXQUFXLHNDQUF3QkMsUUFBeEIsQ0FBakI7QUFDQSxvQkFBTUMsYUFBYWxILFlBQVlpQixHQUFaLENBQWdCLE1BQWhCLEVBQXNCUSxZQUF0QixDQUFtQ3dGLFFBQW5DLEVBQTZDLE1BQTdDLENBQW5CO0FBQ0Esb0JBQUlaLFdBQVcsRUFBZjs7QUFFQWpDLCtCQUFLQyxJQUFMLENBQVU0QixXQUFWLEVBQXVCZSxRQUF2QixFQUFpQ1YsS0FBakMsQ0FBdUMsU0FBdkMsRUFBa0R4RSxPQUFsRCxDQUEwRDtBQUFBLDJCQUFXdUUsU0FBUzlELElBQVQsQ0FBY0UscUJBQVc4RCxPQUFYLENBQW1CQyxPQUFuQixFQUE0Qk4sT0FBNUIsQ0FBZCxDQUFYO0FBQUEsaUJBQTFEO0FBQ0Esb0JBQUlpQixjQUFjZCxTQUFTaEMsSUFBVCxDQUFjLEVBQWQsQ0FBbEI7O0FBRUEsb0JBQUlzQyxXQUFXbEUscUJBQVc4RCxPQUFYLENBQW1CVyxVQUFuQixDQUFmO0FBQ0Esb0JBQUlFLGFBQWFULFNBQVNULE9BQVQsQ0FBakI7QUFDQWxHLDRCQUFZaUIsR0FBWixDQUFnQixNQUFoQixFQUFzQitFLGFBQXRCLENBQW9DbUIsV0FBcEMsRUFBaURDLFVBQWpEO0FBQ0gsYUFYRDtBQVlIOztBQUVEOzs7Ozs7OzRCQXBSMEI7QUFDdEIsbUJBQU9oRCxlQUFLQyxJQUFMLENBQVUxRSxlQUFlc0IsR0FBZixDQUFtQixJQUFuQixFQUF5Qm9HLHFCQUFuQyxFQUEwRDVILGlCQUExRCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSTRCO0FBQ3hCLG1CQUFPMkUsZUFBS0MsSUFBTCxDQUFVMUUsZUFBZXNCLEdBQWYsQ0FBbUIsSUFBbkIsRUFBeUJvRyxxQkFBbkMsRUFBMEQsb0JBQTFELENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJbUI7QUFDZixtQkFBT25ILGNBQWNlLEdBQWQsQ0FBa0IsSUFBbEIsQ0FBUDtBQUNIOzs7NEJBc1FxQjtBQUNsQixtQkFBT2hCLGlCQUFpQmdCLEdBQWpCLENBQXFCLElBQXJCLENBQVA7QUFDSCIsImZpbGUiOiJCb2lsZXJQbGF0ZXNNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgQ29uZmlnTWFuYWdlciB9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XG5pbXBvcnQgeyBIdHRwV3JhcHBlciB9IGZyb20gJy4uL0h0dHBXcmFwcGVyJztcbmltcG9ydCB7IEdpdCB9IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBCb2lsZXJQbGF0ZSB9IGZyb20gJy4vQm9pbGVyUGxhdGUnO1xuaW1wb3J0IEhhbmRsZWJhcnMgZnJvbSAnaGFuZGxlYmFycyc7XG5pbXBvcnQgeyBHdWlkIH0gZnJvbSAnLi4vR3VpZCc7XG5pbXBvcnQgeyBnZXRGaWxlTmFtZUFuZEV4dGVuc2lvbiB9IGZyb20gJy4uL2hlbHBlcnMnO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG5jb25zdCBib2lsZXJQbGF0ZUZvbGRlciA9ICdib2lsZXItcGxhdGVzJztcblxuY29uc3QgYmluYXJ5RmlsZXMgPSBbXG4gICAgJy5qcGcnLFxuICAgICcucG5nJyxcbiAgICAnLm9iaicsXG4gICAgJy5kbGwnLFxuICAgICcuYmluJyxcbiAgICAnLmV4ZScsXG4gICAgJy50dGYnXG5dO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxCb2lsZXJQbGF0ZXNNYW5hZ2VyLCBDb25maWdNYW5hZ2VyPn1cbiAqL1xuY29uc3QgX2NvbmZpZ01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxCb2lsZXJQbGF0ZXNNYW5hZ2VyLCBIdHRwV3JhcHBlcj59XG4gKi9cbmNvbnN0IF9odHRwV3JhcHBlciA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIEdpdD59XG4gKi9cbmNvbnN0IF9naXQgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxCb2lsZXJQbGF0ZXNNYW5hZ2VyLCBGb2xkZXJzPn1cbiAqL1xuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxCb2lsZXJQbGF0ZXNNYW5hZ2VyLCBmcz59XG4gKi9cbmNvbnN0IF9maWxlU3lzdGVtID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Qm9pbGVyUGxhdGVzTWFuYWdlciwgYm9vbGVhbj59XG4gKi9cbmNvbnN0IF9oYXNCb2lsZXJQbGF0ZXMgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxCb2lsZXJQbGF0ZXNNYW5hZ2VyLCBCb2lsZXJQbGF0ZVtdPn1cbiAqL1xuY29uc3QgX2JvaWxlclBsYXRlcyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgbWFuYWdlciBvZiBib2lsZXIgcGxhdGVzXG4gKi9cbmV4cG9ydCBjbGFzcyBCb2lsZXJQbGF0ZXNNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7Q29uZmlnTWFuYWdlcn0gY29uZmlnTWFuYWdlciBcbiAgICAgKiBAcGFyYW0ge0h0dHBXcmFwcGVyfSBodHRwV3JhcHBlclxuICAgICAqIEBwYXJhbSB7R2l0fSBnaXRcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnNcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ01hbmFnZXIsIGh0dHBXcmFwcGVyLCBnaXQsIGZvbGRlcnMsIGZpbGVTeXN0ZW0sIGxvZ2dlcikge1xuICAgICAgICBfY29uZmlnTWFuYWdlci5zZXQodGhpcywgY29uZmlnTWFuYWdlcik7XG4gICAgICAgIF9odHRwV3JhcHBlci5zZXQodGhpcywgaHR0cFdyYXBwZXIpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgX2dpdC5zZXQodGhpcywgZ2l0KTtcblxuICAgICAgICBmb2xkZXJzLm1ha2VGb2xkZXJJZk5vdEV4aXN0cyh0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24pO1xuXG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgdGhpcy5yZWFkQm9pbGVyUGxhdGVzKCk7XG4gICAgICAgIHRoaXMuc2V0dXBIYW5kbGViYXJzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBiYXNlIHBhdGggZm9yIGJvaWxlciBwbGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBCYXNlIHBhdGggb2YgYm9pbGVyIHBsYXRlc1xuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZUxvY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKS5jZW50cmFsRm9sZGVyTG9jYXRpb24sIGJvaWxlclBsYXRlRm9sZGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHBhdGggdG8gdGhlIGJvaWxlciBwbGF0ZXMgY29uZmlnIGZpbGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBQYXRoIHRvIHRoZSBjb25maWcgZmlsZVxuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUoKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oX2NvbmZpZ01hbmFnZXIuZ2V0KHRoaXMpLmNlbnRyYWxGb2xkZXJMb2NhdGlvbiwgJ2JvaWxlci1wbGF0ZXMuanNvbicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlc1xuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2UobGFuZ3VhZ2UpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS5sYW5ndWFnZSA9PSBsYW5ndWFnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlcyBmb3IgdGhlIHR5cGVcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeVR5cGUodHlwZSkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcykuZmlsdGVyKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLnR5cGUgPT0gdHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKGxhbmd1YWdlLCB0eXBlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5maWx0ZXIoYm9pbGVyUGxhdGUgPT4gYm9pbGVyUGxhdGUubGFuZ3VhZ2UgPT0gbGFuZ3VhZ2UgJiYgYm9pbGVyUGxhdGUudHlwZSA9PSB0eXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGFsbCBib2lsZXIgcGxhdGVzIGZyb20gZGlza1xuICAgICAqL1xuICAgIHJlYWRCb2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIGxldCBjb25maWdGaWxlID0gdGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGU7XG4gICAgICAgIGlmIChfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhjb25maWdGaWxlKSkge1xuICAgICAgICAgICAgbGV0IGpzb24gPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGNvbmZpZ0ZpbGUpO1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlc0FzT2JqZWN0cyA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gW107XG4gICAgICAgICAgICBib2lsZXJQbGF0ZXNBc09iamVjdHMuZm9yRWFjaChib2lsZXJQbGF0ZU9iamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gbmV3IEJvaWxlclBsYXRlKFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmRlcGVuZGVuY2llcyxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnBhdGhzTmVlZGluZ0JpbmRpbmcgfHwgW10sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmZpbGVzTmVlZGluZ0JpbmRpbmcgfHwgW11cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlcy5wdXNoKGJvaWxlclBsYXRlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfYm9pbGVyUGxhdGVzLnNldCh0aGlzLCBib2lsZXJQbGF0ZXMpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBfYm9pbGVyUGxhdGVzLnNldCh0aGlzLCBbXSk7XG4gICAgICAgIH1cblxuICAgICAgICBfaGFzQm9pbGVyUGxhdGVzLnNldCh0aGlzLCBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5sZW5ndGggPT0gMCA/IGZhbHNlOiB0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB1cCB0aGUgaGFuZGxlYmFycyBzeXN0ZW0gd2l0aCBjdXN0b20gaGVscGVyc1xuICAgICAqL1xuICAgIHNldHVwSGFuZGxlYmFycygpIHtcbiAgICAgICAgSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignY3JlYXRlR3VpZCcsICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBHdWlkLmNyZWF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZnJvbSBHaXRIdWJcbiAgICAgKi9cbiAgICBhc3luYyBnZXRBdmFpbGFibGVCb2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIGxldCB1cmkgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9vcmdzL2RvbGl0dGxlLWJvaWxlcnBsYXRlcy9yZXBvcyc7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIF9odHRwV3JhcHBlci5nZXQodGhpcykuZ2V0SnNvbih1cmkpLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICAgICAgbGV0IHVybHMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaChpdGVtID0+IHVybHMucHVzaChpdGVtLm5hbWUpKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHVybHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhbnkgZXhpc3RpbmcgYm9pbGVyIHBsYXRlcyBvbiBkaXNrXG4gICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn0gbnVtYmVyIG9mIHVwZGF0ZWQgZm9sZGVyc1xuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgbGV0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG4gICAgICAgICAgICBsZXQgdXBkYXRlQ291bnQgPSBmb2xkZXJzLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKHVwZGF0ZUNvdW50ID09PSAwKSByZXNvbHZlKDApO1xuICAgICAgICAgICAgZm9sZGVycy5mb3JFYWNoKGZvbGRlciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYFVwZGF0ZSBib2lsZXIgcGxhdGUgaW4gJyR7Zm9sZGVyfSdgKTtcbiAgICAgICAgICAgICAgICBfZ2l0LmdldCh0aGlzKS5mb3JGb2xkZXIoZm9sZGVyKS5wdWxsKCkuZXhlYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgtLXVwZGF0ZUNvdW50ID09PSAwKSByZXNvbHZlKGZvbGRlcnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYm9pbGVyIHBsYXRlcy5cbiAgICAgKiBUaGlzIHdpbGwgdXBkYXRlIGFueSBleGlzdGluZyBhbmQgZG93bmxvYWQgYW55IG5ldyBvbmVzLlxuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oJ1VwZGF0aW5nIGFsbCBib2lsZXIgcGxhdGVzJyk7XG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBsZXQgY2xvbmVkTmV3UmVwb3MgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRDb3VudCA9IGF3YWl0IHRoaXMudXBkYXRlQm9pbGVyUGxhdGVzT25EaXNrKCk7XG4gICAgICAgICAgICBsZXQgbmFtZXMgPSBhd2FpdCB0aGlzLmdldEF2YWlsYWJsZUJvaWxlclBsYXRlcygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgY2xvbmVDb3VudCA9IDA7XG4gICAgICAgICAgICBuYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb2xkZXJOYW1lID0gcGF0aC5qb2luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbiwgbmFtZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCFfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhmb2xkZXJOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBjbG9uZWROZXdSZXBvcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSBgaHR0cHM6Ly9naXRodWIuY29tL2RvbGl0dGxlLWJvaWxlcnBsYXRlcy8ke25hbWV9LmdpdGA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBHZXR0aW5nIGJvaWxlcnBsYXRlIG5vdCBvbiBkaXNrIGZyb20gJyR7dXJsfSdgKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNsb25lQ291bnQrKztcblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgX2dpdC5nZXQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zaWxlbnQoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvbmUodXJsLCBmb2xkZXJOYW1lLCB7ICctLXJlY3Vyc2l2ZSc6IG51bGwgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5leGVjKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoLS1jbG9uZUNvdW50ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb25maWd1cmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghY2xvbmVkTmV3UmVwb3MgJiYgdXBkYXRlZENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29uZmlndXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBjb25maWd1cmF0aW9uIGZpbGUgb24gZGlza1xuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBVcGRhdGluZyB0aGUgJHt0aGlzLmJvaWxlclBsYXRlQ29uZmlnRmlsZX0gY29uZmlndXJhdGlvbmApO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBmb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNJbih0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24pO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gW107XG4gICAgICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlc1BhdGhzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLnNlYXJjaFJlY3Vyc2l2ZShmb2xkZXIsICdib2lsZXJwbGF0ZS5qc29uJyk7XG4gICAgICAgICAgICBsZXQgY29udGVudEZvbGRlciA9IHBhdGguam9pbihmb2xkZXIsICdDb250ZW50Jyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJvaWxlclBsYXRlc1BhdGhzLmZvckVhY2goYm9pbGVyUGxhdGVQYXRoID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVPYmplY3QgPSBKU09OLnBhcnNlKF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoYm9pbGVyUGxhdGVQYXRoLCAndXRmOCcpKTtcbiAgICAgICAgICAgICAgICBpZiAoYm9pbGVyUGxhdGVPYmplY3QudHlwZSAhPSAnYXJ0aWZhY3RzJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbihjb250ZW50Rm9sZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcGF0aHMgPSBwYXRocy5maWx0ZXIoXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5jbHVkZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5hcnlGaWxlcy5mb3JFYWNoKGIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihiKSA+IDApIGluY2x1ZGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluY2x1ZGU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHNOZWVkaW5nQmluZGluZyA9IHBhdGhzLmZpbHRlcihfID0+IF8uaW5kZXhPZigne3snKSA+IDApLm1hcChfID0+IF8uc3Vic3RyKGNvbnRlbnRGb2xkZXIubGVuZ3RoICsgMSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxlc05lZWRpbmdCaW5kaW5nID0gW107XG4gICAgICAgICAgICAgICAgICAgIHBhdGhzLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhfKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGUgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikucmVhZEZpbGVTeW5jKF8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLmluZGV4T2YoJ3t7JykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlc05lZWRpbmdCaW5kaW5nLnB1c2goXy5zdWJzdHIoY29udGVudEZvbGRlci5sZW5ndGggKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sb2NhdGlvbiA9IGNvbnRlbnRGb2xkZXI7XG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnBhdGhzTmVlZGluZ0JpbmRpbmcgPSBwYXRoc05lZWRpbmdCaW5kaW5nO1xuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5maWxlc05lZWRpbmdCaW5kaW5nID0gZmlsZXNOZWVkaW5nQmluZGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uID0gcGF0aC5kaXJuYW1lKGJvaWxlclBsYXRlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnBhdGhzTmVlZGluZ0JpbmRpbmcgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZmlsZXNOZWVkaW5nQmluZGluZyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IG5ldyBCb2lsZXJQbGF0ZShcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubGFuZ3VhZ2UgfHwgJ2FueScsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC50eXBlLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5kZXBlbmRlbmNpZXMsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5wYXRoc05lZWRpbmdCaW5kaW5nLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5maWxlc05lZWRpbmdCaW5kaW5nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZXMucHVzaChib2lsZXJQbGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc09iamVjdHMgPSBib2lsZXJQbGF0ZXMubWFwKF8gPT4gXy50b0pzb24oKSk7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc0pzb24gPSBKU09OLnN0cmluZ2lmeShib2lsZXJQbGF0ZXNBc09iamVjdHMsIG51bGwsIDQpO1xuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyh0aGlzLmJvaWxlclBsYXRlQ29uZmlnRmlsZSwgYm9pbGVyUGxhdGVzQXNKc29uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2Yge0JvaWxlclBsYXRlfSBpbnRvIGEgc3BlY2lmaWMgZGVzdGluYXRpb24gZm9sZGVyIHdpdGggYSBnaXZlbiBjb250ZXh0XG4gICAgICogQHBhcmFtIHtCb2lsZXJQbGF0ZX0gYm9pbGVyUGxhdGUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IFxuICAgICAqL1xuICAgIGNyZWF0ZUluc3RhbmNlKGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCkge1xuICAgICAgICBfZm9sZGVycy5nZXQodGhpcykuY29weShkZXN0aW5hdGlvbiwgYm9pbGVyUGxhdGUubG9jYXRpb24pO1xuICAgICAgICBib2lsZXJQbGF0ZS5wYXRoc05lZWRpbmdCaW5kaW5nLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICBsZXQgcGF0aFRvUmVuYW1lID0gcGF0aC5qb2luKGRlc3RpbmF0aW9uLCBfKTtcbiAgICAgICAgICAgIGxldCBzZWdtZW50cyA9IFtdO1xuICAgICAgICAgICAgcGF0aFRvUmVuYW1lLnNwbGl0KC8oXFxcXHxcXC8pLykuZm9yRWFjaChzZWdtZW50ID0+IHNlZ21lbnRzLnB1c2goSGFuZGxlYmFycy5jb21waWxlKHNlZ21lbnQpKGNvbnRleHQpKSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gc2VnbWVudHMuam9pbignJyk7XG4gICAgICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVuYW1lU3luYyhwYXRoVG9SZW5hbWUsIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgYm9pbGVyUGxhdGUuZmlsZXNOZWVkaW5nQmluZGluZy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgbGV0IGZpbGUgPSBwYXRoLmpvaW4oZGVzdGluYXRpb24sIF8pO1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGZpbGUsICd1dGY4Jyk7XG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUoY29udGVudCk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGVtcGxhdGUoY29udGV4dCk7XG4gICAgICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyhmaWxlLCByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZX0gb2YgYW4gYXJ0aWZhY3QgaW50byBhIHNwZWNpZmljIGRlc3RpbmF0aW9uIGZvbGRlciB3aXRoIGEgZ2l2ZW4gY29udGV4dFxuICAgICAqIEBwYXJhbSB7e3RlbXBsYXRlOiBhbnksIGxvY2F0aW9uOiBzdHJpbmd9fSBhcnRpZmFjdFRlbXBsYXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IFxuICAgICAqL1xuICAgIGNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoYXJ0aWZhY3RUZW1wbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgbGV0IGZpbGVzVG9DcmVhdGUgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0QXJ0aWZhY3RUZW1wbGF0ZUZpbGVzUmVjdXJzaXZlbHlJbihhcnRpZmFjdFRlbXBsYXRlLmxvY2F0aW9uLCBhcnRpZmFjdFRlbXBsYXRlLnRlbXBsYXRlLmluY2x1ZGVkRmlsZXMpO1xuICAgICAgICBcbiAgICAgICAgZmlsZXNUb0NyZWF0ZS5mb3JFYWNoKCBmaWxlUGF0aCA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWxlbmFtZSA9IGdldEZpbGVOYW1lQW5kRXh0ZW5zaW9uKGZpbGVQYXRoKTtcbiAgICAgICAgICAgIGNvbnN0IG9sZENvbnRlbnQgPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmOCcpO1xuICAgICAgICAgICAgbGV0IHNlZ21lbnRzID0gW107XG5cbiAgICAgICAgICAgIHBhdGguam9pbihkZXN0aW5hdGlvbiwgZmlsZW5hbWUpLnNwbGl0KC8oXFxcXHxcXC8pLykuZm9yRWFjaChzZWdtZW50ID0+IHNlZ21lbnRzLnB1c2goSGFuZGxlYmFycy5jb21waWxlKHNlZ21lbnQpKGNvbnRleHQpKSk7XG4gICAgICAgICAgICBsZXQgbmV3RmlsZVBhdGggPSBzZWdtZW50cy5qb2luKCcnKTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUob2xkQ29udGVudCk7XG4gICAgICAgICAgICBsZXQgbmV3Q29udGVudCA9IHRlbXBsYXRlKGNvbnRleHQpO1xuICAgICAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmMobmV3RmlsZVBhdGgsIG5ld0NvbnRlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIG9yIG5vdCB0aGVyZSBhcmUgYm9pbGVyIHBsYXRlcyBpbnN0YWxsZWRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGVyZSBhcmUsIGZhbHNlIGlmIG5vdFxuICAgICAqL1xuICAgIGdldCBoYXNCb2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIHJldHVybiBfaGFzQm9pbGVyUGxhdGVzLmdldCh0aGlzKTtcbiAgICB9XG59Il19