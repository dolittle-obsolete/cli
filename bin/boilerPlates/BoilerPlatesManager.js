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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsImJpbmFyeUZpbGVzIiwiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2h0dHBXcmFwcGVyIiwiX2dpdCIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJfaGFzQm9pbGVyUGxhdGVzIiwiX2JvaWxlclBsYXRlcyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJfbG9nZ2VyIiwicmVhZEJvaWxlclBsYXRlcyIsInNldHVwSGFuZGxlYmFycyIsImxhbmd1YWdlIiwiZ2V0IiwiZmlsdGVyIiwiYm9pbGVyUGxhdGUiLCJ0eXBlIiwiY29uZmlnRmlsZSIsImJvaWxlclBsYXRlQ29uZmlnRmlsZSIsImV4aXN0c1N5bmMiLCJqc29uIiwicmVhZEZpbGVTeW5jIiwiYm9pbGVyUGxhdGVzQXNPYmplY3RzIiwiSlNPTiIsInBhcnNlIiwiYm9pbGVyUGxhdGVzIiwiZm9yRWFjaCIsIkJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVPYmplY3QiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJkZXBlbmRlbmNpZXMiLCJsb2NhdGlvbiIsInBhdGhzTmVlZGluZ0JpbmRpbmciLCJmaWxlc05lZWRpbmdCaW5kaW5nIiwicHVzaCIsImxlbmd0aCIsIkhhbmRsZWJhcnMiLCJyZWdpc3RlckhlbHBlciIsIkd1aWQiLCJjcmVhdGUiLCJ1cmkiLCJQcm9taXNlIiwiZ2V0SnNvbiIsInRoZW4iLCJyZXN1bHQiLCJ1cmxzIiwiaXRlbSIsInJlc29sdmUiLCJnZXRGb2xkZXJzSW4iLCJ1cGRhdGVDb3VudCIsImluZm8iLCJmb2xkZXIiLCJmb3JGb2xkZXIiLCJwdWxsIiwiZXhlYyIsInByb21pc2UiLCJjbG9uZWROZXdSZXBvcyIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsInVwZGF0ZWRDb3VudCIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsIm5hbWVzIiwiY2xvbmVDb3VudCIsImZvbGRlck5hbWUiLCJwYXRoIiwiam9pbiIsInVybCIsInNpbGVudCIsImNsb25lIiwidXBkYXRlQ29uZmlndXJhdGlvbiIsInNlbGYiLCJib2lsZXJQbGF0ZXNQYXRocyIsInNlYXJjaFJlY3Vyc2l2ZSIsImNvbnRlbnRGb2xkZXIiLCJib2lsZXJQbGF0ZVBhdGgiLCJwYXRocyIsImdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4iLCJpbmNsdWRlIiwiXyIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsImIiLCJtYXAiLCJzdWJzdHIiLCJzdGF0Iiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsImZpbGUiLCJkaXJuYW1lIiwidG9Kc29uIiwiYm9pbGVyUGxhdGVzQXNKc29uIiwic3RyaW5naWZ5Iiwid3JpdGVGaWxlU3luYyIsImRlc3RpbmF0aW9uIiwiY29udGV4dCIsImNvcHkiLCJwYXRoVG9SZW5hbWUiLCJzZWdtZW50cyIsInNwbGl0IiwiY29tcGlsZSIsInNlZ21lbnQiLCJyZW5hbWVTeW5jIiwiY29udGVudCIsInRlbXBsYXRlIiwiYXJ0aWZhY3RUZW1wbGF0ZSIsImZpbGVzVG9DcmVhdGUiLCJnZXRBcnRpZmFjdFRlbXBsYXRlRmlsZXNSZWN1cnNpdmVseUluIiwiaW5jbHVkZWRGaWxlcyIsImZpbGVuYW1lIiwiZmlsZVBhdGgiLCJvbGRDb250ZW50IiwibmV3RmlsZVBhdGgiLCJuZXdDb250ZW50IiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNB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RSxlQUFlc0IsR0FBZixDQUFtQixJQUFuQixFQUF5Qm9HLHFCQUFuQyxFQUEwRDVILGlCQUExRCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSTRCO0FBQ3hCLG1CQUFPMkUsZUFBS0MsSUFBTCxDQUFVMUUsZUFBZXNCLEdBQWYsQ0FBbUIsSUFBbkIsRUFBeUJvRyxxQkFBbkMsRUFBMEQsb0JBQTFELENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJbUI7QUFDZixtQkFBT25ILGNBQWNlLEdBQWQsQ0FBa0IsSUFBbEIsQ0FBUDtBQUNIOzs7NEJBc1FxQjtBQUNsQixtQkFBT2hCLGlCQUFpQmdCLEdBQWpCLENBQXFCLElBQXJCLENBQVA7QUFDSCIsImZpbGUiOiJCb2lsZXJQbGF0ZXNNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuaW1wb3J0IHsgQ29uZmlnTWFuYWdlciB9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XHJcbmltcG9ydCB7IEh0dHBXcmFwcGVyIH0gZnJvbSAnLi4vSHR0cFdyYXBwZXInO1xyXG5pbXBvcnQgeyBHaXQgfSBmcm9tICdzaW1wbGUtZ2l0JztcclxuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IEJvaWxlclBsYXRlIH0gZnJvbSAnLi9Cb2lsZXJQbGF0ZSc7XHJcbmltcG9ydCBIYW5kbGViYXJzIGZyb20gJ2hhbmRsZWJhcnMnO1xyXG5pbXBvcnQgeyBHdWlkIH0gZnJvbSAnLi4vR3VpZCc7XHJcbmltcG9ydCB7IGdldEZpbGVOYW1lQW5kRXh0ZW5zaW9uIH0gZnJvbSAnLi4vaGVscGVycyc7XHJcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbmNvbnN0IGJvaWxlclBsYXRlRm9sZGVyID0gJ2JvaWxlci1wbGF0ZXMnO1xyXG5cclxuY29uc3QgYmluYXJ5RmlsZXMgPSBbXHJcbiAgICAnLmpwZycsXHJcbiAgICAnLnBuZycsXHJcbiAgICAnLm9iaicsXHJcbiAgICAnLmRsbCcsXHJcbiAgICAnLmJpbicsXHJcbiAgICAnLmV4ZScsXHJcbiAgICAnLnR0ZidcclxuXTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIENvbmZpZ01hbmFnZXI+fVxyXG4gKi9cclxuY29uc3QgX2NvbmZpZ01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xyXG4vKipcclxuICogQHR5cGUge1dlYWtNYXA8Qm9pbGVyUGxhdGVzTWFuYWdlciwgSHR0cFdyYXBwZXI+fVxyXG4gKi9cclxuY29uc3QgX2h0dHBXcmFwcGVyID0gbmV3IFdlYWtNYXAoKTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIEdpdD59XHJcbiAqL1xyXG5jb25zdCBfZ2l0ID0gbmV3IFdlYWtNYXAoKTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIEZvbGRlcnM+fVxyXG4gKi9cclxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xyXG4vKipcclxuICogQHR5cGUge1dlYWtNYXA8Qm9pbGVyUGxhdGVzTWFuYWdlciwgZnM+fVxyXG4gKi9cclxuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xyXG4vKipcclxuICogQHR5cGUge1dlYWtNYXA8Qm9pbGVyUGxhdGVzTWFuYWdlciwgYm9vbGVhbj59XHJcbiAqL1xyXG5jb25zdCBfaGFzQm9pbGVyUGxhdGVzID0gbmV3IFdlYWtNYXAoKTtcclxuLyoqXHJcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIEJvaWxlclBsYXRlW10+fVxyXG4gKi9cclxuY29uc3QgX2JvaWxlclBsYXRlcyA9IG5ldyBXZWFrTWFwKCk7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgbWFuYWdlciBvZiBib2lsZXIgcGxhdGVzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQm9pbGVyUGxhdGVzTWFuYWdlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cclxuICAgICAqIEBwYXJhbSB7Q29uZmlnTWFuYWdlcn0gY29uZmlnTWFuYWdlciBcclxuICAgICAqIEBwYXJhbSB7SHR0cFdyYXBwZXJ9IGh0dHBXcmFwcGVyXHJcbiAgICAgKiBAcGFyYW0ge0dpdH0gZ2l0XHJcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnNcclxuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cclxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY29uZmlnTWFuYWdlciwgaHR0cFdyYXBwZXIsIGdpdCwgZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XHJcbiAgICAgICAgX2NvbmZpZ01hbmFnZXIuc2V0KHRoaXMsIGNvbmZpZ01hbmFnZXIpO1xyXG4gICAgICAgIF9odHRwV3JhcHBlci5zZXQodGhpcywgaHR0cFdyYXBwZXIpO1xyXG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcclxuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XHJcbiAgICAgICAgX2dpdC5zZXQodGhpcywgZ2l0KTtcclxuXHJcbiAgICAgICAgZm9sZGVycy5tYWtlRm9sZGVySWZOb3RFeGlzdHModGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xyXG4gICAgICAgIHRoaXMucmVhZEJvaWxlclBsYXRlcygpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBIYW5kbGViYXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGJhc2UgcGF0aCBmb3IgYm9pbGVyIHBsYXRlc1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQmFzZSBwYXRoIG9mIGJvaWxlciBwbGF0ZXNcclxuICAgICAqL1xyXG4gICAgZ2V0IGJvaWxlclBsYXRlTG9jYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihfY29uZmlnTWFuYWdlci5nZXQodGhpcykuY2VudHJhbEZvbGRlckxvY2F0aW9uLCBib2lsZXJQbGF0ZUZvbGRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHBhdGggdG8gdGhlIGJvaWxlciBwbGF0ZXMgY29uZmlnIGZpbGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFBhdGggdG8gdGhlIGNvbmZpZyBmaWxlXHJcbiAgICAgKi9cclxuICAgIGdldCBib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihfY29uZmlnTWFuYWdlci5nZXQodGhpcykuY2VudHJhbEZvbGRlckxvY2F0aW9uLCAnYm9pbGVyLXBsYXRlcy5qc29uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlc1xyXG4gICAgICovXHJcbiAgICBnZXQgYm9pbGVyUGxhdGVzKCkge1xyXG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIGEgc3BlY2lmaWMgbGFuZ3VhZ2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxyXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSBsYW5ndWFnZVxyXG4gICAgICovXHJcbiAgICBib2lsZXJQbGF0ZXNCeUxhbmd1YWdlKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS5sYW5ndWFnZSA9PSBsYW5ndWFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIHR5cGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlcyBmb3IgdGhlIHR5cGVcclxuICAgICAqL1xyXG4gICAgYm9pbGVyUGxhdGVzQnlUeXBlKHR5cGUpIHtcclxuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcykuZmlsdGVyKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLnR5cGUgPT0gdHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIGxhbmd1YWdlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlcyBmb3IgdGhlIGxhbmd1YWdlXHJcbiAgICAgKi9cclxuICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKGxhbmd1YWdlLCB0eXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS5sYW5ndWFnZSA9PSBsYW5ndWFnZSAmJiBib2lsZXJQbGF0ZS50eXBlID09IHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBhbGwgYm9pbGVyIHBsYXRlcyBmcm9tIGRpc2tcclxuICAgICAqL1xyXG4gICAgcmVhZEJvaWxlclBsYXRlcygpIHtcclxuICAgICAgICBsZXQgY29uZmlnRmlsZSA9IHRoaXMuYm9pbGVyUGxhdGVDb25maWdGaWxlO1xyXG4gICAgICAgIGlmIChfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhjb25maWdGaWxlKSkge1xyXG4gICAgICAgICAgICBsZXQganNvbiA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoY29uZmlnRmlsZSk7XHJcbiAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc09iamVjdHMgPSBKU09OLnBhcnNlKGpzb24pO1xyXG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gW107XHJcbiAgICAgICAgICAgIGJvaWxlclBsYXRlc0FzT2JqZWN0cy5mb3JFYWNoKGJvaWxlclBsYXRlT2JqZWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IG5ldyBCb2lsZXJQbGF0ZShcclxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sYW5ndWFnZSxcclxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZGVwZW5kZW5jaWVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnBhdGhzTmVlZGluZ0JpbmRpbmcgfHwgW10sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZmlsZXNOZWVkaW5nQmluZGluZyB8fCBbXVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlcy5wdXNoKGJvaWxlclBsYXRlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBfYm9pbGVyUGxhdGVzLnNldCh0aGlzLCBib2lsZXJQbGF0ZXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBfYm9pbGVyUGxhdGVzLnNldCh0aGlzLCBbXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfaGFzQm9pbGVyUGxhdGVzLnNldCh0aGlzLCBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5sZW5ndGggPT0gMCA/IGZhbHNlOiB0cnVlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB1cCB0aGUgaGFuZGxlYmFycyBzeXN0ZW0gd2l0aCBjdXN0b20gaGVscGVyc1xyXG4gICAgICovXHJcbiAgICBzZXR1cEhhbmRsZWJhcnMoKSB7XHJcbiAgICAgICAgSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignY3JlYXRlR3VpZCcsICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIEd1aWQuY3JlYXRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZnJvbSBHaXRIdWJcclxuICAgICAqL1xyXG4gICAgYXN5bmMgZ2V0QXZhaWxhYmxlQm9pbGVyUGxhdGVzKCkge1xyXG4gICAgICAgIGxldCB1cmkgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9vcmdzL2RvbGl0dGxlLWJvaWxlcnBsYXRlcy9yZXBvcyc7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBfaHR0cFdyYXBwZXIuZ2V0KHRoaXMpLmdldEpzb24odXJpKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoanNvbik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXJscyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goaXRlbSA9PiB1cmxzLnB1c2goaXRlbS5uYW1lKSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHVybHMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBhbnkgZXhpc3RpbmcgYm9pbGVyIHBsYXRlcyBvbiBkaXNrXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fSBudW1iZXIgb2YgdXBkYXRlZCBmb2xkZXJzXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBmb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNJbih0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgdXBkYXRlQ291bnQgPSBmb2xkZXJzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGlmICh1cGRhdGVDb3VudCA9PT0gMCkgcmVzb2x2ZSgwKTtcclxuICAgICAgICAgICAgZm9sZGVycy5mb3JFYWNoKGZvbGRlciA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgVXBkYXRlIGJvaWxlciBwbGF0ZSBpbiAnJHtmb2xkZXJ9J2ApO1xyXG4gICAgICAgICAgICAgICAgX2dpdC5nZXQodGhpcykuZm9yRm9sZGVyKGZvbGRlcikucHVsbCgpLmV4ZWMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgtLXVwZGF0ZUNvdW50ID09PSAwKSByZXNvbHZlKGZvbGRlcnMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSBib2lsZXIgcGxhdGVzLlxyXG4gICAgICogVGhpcyB3aWxsIHVwZGF0ZSBhbnkgZXhpc3RpbmcgYW5kIGRvd25sb2FkIGFueSBuZXcgb25lcy5cclxuICAgICAqL1xyXG4gICAgYXN5bmMgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdVcGRhdGluZyBhbGwgYm9pbGVyIHBsYXRlcycpO1xyXG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjbG9uZWROZXdSZXBvcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkQ291bnQgPSBhd2FpdCB0aGlzLnVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpO1xyXG4gICAgICAgICAgICBsZXQgbmFtZXMgPSBhd2FpdCB0aGlzLmdldEF2YWlsYWJsZUJvaWxlclBsYXRlcygpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGNsb25lQ291bnQgPSAwO1xyXG4gICAgICAgICAgICBuYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvbGRlck5hbWUgPSBwYXRoLmpvaW4odGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uLCBuYW1lKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKCFfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhmb2xkZXJOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lZE5ld1JlcG9zID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gYGh0dHBzOi8vZ2l0aHViLmNvbS9kb2xpdHRsZS1ib2lsZXJwbGF0ZXMvJHtuYW1lfS5naXRgO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBHZXR0aW5nIGJvaWxlcnBsYXRlIG5vdCBvbiBkaXNrIGZyb20gJyR7dXJsfSdgKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjbG9uZUNvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zaWxlbnQoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9uZSh1cmwsIGZvbGRlck5hbWUsIHsgJy0tcmVjdXJzaXZlJzogbnVsbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhlYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtLWNsb25lQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29uZmlndXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoIWNsb25lZE5ld1JlcG9zICYmIHVwZGF0ZWRDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29uZmlndXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgY29uZmlndXJhdGlvbiBmaWxlIG9uIGRpc2tcclxuICAgICAqL1xyXG4gICAgYXN5bmMgdXBkYXRlQ29uZmlndXJhdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgVXBkYXRpbmcgdGhlICR7dGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGV9IGNvbmZpZ3VyYXRpb25gKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XHJcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlcyA9IFtdO1xyXG4gICAgICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzUGF0aHMgPSBfZm9sZGVycy5nZXQodGhpcykuc2VhcmNoUmVjdXJzaXZlKGZvbGRlciwgJ2JvaWxlcnBsYXRlLmpzb24nKTtcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnRGb2xkZXIgPSBwYXRoLmpvaW4oZm9sZGVyLCAnQ29udGVudCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYm9pbGVyUGxhdGVzUGF0aHMuZm9yRWFjaChib2lsZXJQbGF0ZVBhdGggPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlT2JqZWN0ID0gSlNPTi5wYXJzZShfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGJvaWxlclBsYXRlUGF0aCwgJ3V0ZjgnKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9pbGVyUGxhdGVPYmplY3QudHlwZSAhPSAnYXJ0aWZhY3RzJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluKGNvbnRlbnRGb2xkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGhzID0gcGF0aHMuZmlsdGVyKF8gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5jbHVkZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeUZpbGVzLmZvckVhY2goYiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoYikgPiAwKSBpbmNsdWRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5jbHVkZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHNOZWVkaW5nQmluZGluZyA9IHBhdGhzLmZpbHRlcihfID0+IF8uaW5kZXhPZigne3snKSA+IDApLm1hcChfID0+IF8uc3Vic3RyKGNvbnRlbnRGb2xkZXIubGVuZ3RoICsgMSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZXNOZWVkaW5nQmluZGluZyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGhzLmZvckVhY2goXyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGF0ID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnN0YXRTeW5jKF8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXQuaXNEaXJlY3RvcnkoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGUgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikucmVhZEZpbGVTeW5jKF8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUuaW5kZXhPZigne3snKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXNOZWVkaW5nQmluZGluZy5wdXNoKF8uc3Vic3RyKGNvbnRlbnRGb2xkZXIubGVuZ3RoICsgMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uID0gY29udGVudEZvbGRlcjtcclxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5wYXRoc05lZWRpbmdCaW5kaW5nID0gcGF0aHNOZWVkaW5nQmluZGluZztcclxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5maWxlc05lZWRpbmdCaW5kaW5nID0gZmlsZXNOZWVkaW5nQmluZGluZztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uID0gcGF0aC5kaXJuYW1lKGJvaWxlclBsYXRlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QucGF0aHNOZWVkaW5nQmluZGluZyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmZpbGVzTmVlZGluZ0JpbmRpbmcgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBuZXcgQm9pbGVyUGxhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubGFuZ3VhZ2UgfHwgJ2FueScsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmRlcGVuZGVuY2llcyxcclxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sb2NhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5wYXRoc05lZWRpbmdCaW5kaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmZpbGVzTmVlZGluZ0JpbmRpbmdcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZXMucHVzaChib2lsZXJQbGF0ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc09iamVjdHMgPSBib2lsZXJQbGF0ZXMubWFwKF8gPT4gXy50b0pzb24oKSk7XHJcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlc0FzSnNvbiA9IEpTT04uc3RyaW5naWZ5KGJvaWxlclBsYXRlc0FzT2JqZWN0cywgbnVsbCwgNCk7XHJcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmModGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUsIGJvaWxlclBsYXRlc0FzSnNvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2Yge0JvaWxlclBsYXRlfSBpbnRvIGEgc3BlY2lmaWMgZGVzdGluYXRpb24gZm9sZGVyIHdpdGggYSBnaXZlbiBjb250ZXh0XHJcbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlfSBib2lsZXJQbGF0ZSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvbiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVJbnN0YW5jZShib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpIHtcclxuICAgICAgICBfZm9sZGVycy5nZXQodGhpcykuY29weShkZXN0aW5hdGlvbiwgYm9pbGVyUGxhdGUubG9jYXRpb24pO1xyXG4gICAgICAgIGJvaWxlclBsYXRlLnBhdGhzTmVlZGluZ0JpbmRpbmcuZm9yRWFjaChfID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhdGhUb1JlbmFtZSA9IHBhdGguam9pbihkZXN0aW5hdGlvbiwgXyk7XHJcbiAgICAgICAgICAgIGxldCBzZWdtZW50cyA9IFtdO1xyXG4gICAgICAgICAgICBwYXRoVG9SZW5hbWUuc3BsaXQoLyhcXFxcfFxcLykvKS5mb3JFYWNoKHNlZ21lbnQgPT4gc2VnbWVudHMucHVzaChIYW5kbGViYXJzLmNvbXBpbGUoc2VnbWVudCkoY29udGV4dCkpKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHNlZ21lbnRzLmpvaW4oJycpO1xyXG4gICAgICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVuYW1lU3luYyhwYXRoVG9SZW5hbWUsIHJlc3VsdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgYm9pbGVyUGxhdGUuZmlsZXNOZWVkaW5nQmluZGluZy5mb3JFYWNoKF8gPT4ge1xyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IHBhdGguam9pbihkZXN0aW5hdGlvbiwgXyk7XHJcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhmaWxlLCAndXRmOCcpO1xyXG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUoY29udGVudCk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0ZW1wbGF0ZShjb250ZXh0KTtcclxuICAgICAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmMoZmlsZSwgcmVzdWx0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZX0gb2YgYW4gYXJ0aWZhY3QgaW50byBhIHNwZWNpZmljIGRlc3RpbmF0aW9uIGZvbGRlciB3aXRoIGEgZ2l2ZW4gY29udGV4dFxyXG4gICAgICogQHBhcmFtIHt7dGVtcGxhdGU6IGFueSwgbG9jYXRpb246IHN0cmluZ319IGFydGlmYWN0VGVtcGxhdGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvbiBcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVBcnRpZmFjdEluc3RhbmNlKGFydGlmYWN0VGVtcGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KSB7XHJcbiAgICAgICAgbGV0IGZpbGVzVG9DcmVhdGUgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0QXJ0aWZhY3RUZW1wbGF0ZUZpbGVzUmVjdXJzaXZlbHlJbihhcnRpZmFjdFRlbXBsYXRlLmxvY2F0aW9uLCBhcnRpZmFjdFRlbXBsYXRlLnRlbXBsYXRlLmluY2x1ZGVkRmlsZXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZpbGVzVG9DcmVhdGUuZm9yRWFjaCggZmlsZVBhdGggPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlbmFtZSA9IGdldEZpbGVOYW1lQW5kRXh0ZW5zaW9uKGZpbGVQYXRoKTtcclxuICAgICAgICAgICAgY29uc3Qgb2xkQ29udGVudCA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4Jyk7XHJcbiAgICAgICAgICAgIGxldCBzZWdtZW50cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgcGF0aC5qb2luKGRlc3RpbmF0aW9uLCBmaWxlbmFtZSkuc3BsaXQoLyhcXFxcfFxcLykvKS5mb3JFYWNoKHNlZ21lbnQgPT4gc2VnbWVudHMucHVzaChIYW5kbGViYXJzLmNvbXBpbGUoc2VnbWVudCkoY29udGV4dCkpKTtcclxuICAgICAgICAgICAgbGV0IG5ld0ZpbGVQYXRoID0gc2VnbWVudHMuam9pbignJyk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShvbGRDb250ZW50KTtcclxuICAgICAgICAgICAgbGV0IG5ld0NvbnRlbnQgPSB0ZW1wbGF0ZShjb250ZXh0KTtcclxuICAgICAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmMobmV3RmlsZVBhdGgsIG5ld0NvbnRlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgd2hldGhlciBvciBub3QgdGhlcmUgYXJlIGJvaWxlciBwbGF0ZXMgaW5zdGFsbGVkXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGVyZSBhcmUsIGZhbHNlIGlmIG5vdFxyXG4gICAgICovXHJcbiAgICBnZXQgaGFzQm9pbGVyUGxhdGVzKCkge1xyXG4gICAgICAgIHJldHVybiBfaGFzQm9pbGVyUGxhdGVzLmdldCh0aGlzKTtcclxuICAgIH1cclxufSJdfQ==