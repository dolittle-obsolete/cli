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

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

var _Guid = require('../Guid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boilerPlateFolder = 'boiler-plates'; /*---------------------------------------------------------------------------------------------
                                          *  Copyright (c) Dolittle. All rights reserved.
                                          *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                          *--------------------------------------------------------------------------------------------*/


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
                var filename = _global2.default.getFileNameAndExtension(filePath);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsImJpbmFyeUZpbGVzIiwiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2h0dHBXcmFwcGVyIiwiX2dpdCIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJfaGFzQm9pbGVyUGxhdGVzIiwiX2JvaWxlclBsYXRlcyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJfbG9nZ2VyIiwicmVhZEJvaWxlclBsYXRlcyIsInNldHVwSGFuZGxlYmFycyIsImxhbmd1YWdlIiwiZ2V0IiwiZmlsdGVyIiwiYm9pbGVyUGxhdGUiLCJ0eXBlIiwiY29uZmlnRmlsZSIsImJvaWxlclBsYXRlQ29uZmlnRmlsZSIsImV4aXN0c1N5bmMiLCJqc29uIiwicmVhZEZpbGVTeW5jIiwiYm9pbGVyUGxhdGVzQXNPYmplY3RzIiwiSlNPTiIsInBhcnNlIiwiYm9pbGVyUGxhdGVzIiwiZm9yRWFjaCIsIkJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVPYmplY3QiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJkZXBlbmRlbmNpZXMiLCJsb2NhdGlvbiIsInBhdGhzTmVlZGluZ0JpbmRpbmciLCJmaWxlc05lZWRpbmdCaW5kaW5nIiwicHVzaCIsImxlbmd0aCIsIkhhbmRsZWJhcnMiLCJyZWdpc3RlckhlbHBlciIsIkd1aWQiLCJjcmVhdGUiLCJ1cmkiLCJQcm9taXNlIiwiZ2V0SnNvbiIsInRoZW4iLCJyZXN1bHQiLCJ1cmxzIiwiaXRlbSIsInJlc29sdmUiLCJnZXRGb2xkZXJzSW4iLCJ1cGRhdGVDb3VudCIsImluZm8iLCJmb2xkZXIiLCJmb3JGb2xkZXIiLCJwdWxsIiwiZXhlYyIsInByb21pc2UiLCJjbG9uZWROZXdSZXBvcyIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsInVwZGF0ZWRDb3VudCIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsIm5hbWVzIiwiY2xvbmVDb3VudCIsImZvbGRlck5hbWUiLCJwYXRoIiwiam9pbiIsInVybCIsInNpbGVudCIsImNsb25lIiwidXBkYXRlQ29uZmlndXJhdGlvbiIsInNlbGYiLCJib2lsZXJQbGF0ZXNQYXRocyIsInNlYXJjaFJlY3Vyc2l2ZSIsImNvbnRlbnRGb2xkZXIiLCJib2lsZXJQbGF0ZVBhdGgiLCJwYXRocyIsImdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4iLCJpbmNsdWRlIiwiXyIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsImIiLCJtYXAiLCJzdWJzdHIiLCJzdGF0Iiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsImZpbGUiLCJkaXJuYW1lIiwidG9Kc29uIiwiYm9pbGVyUGxhdGVzQXNKc29uIiwic3RyaW5naWZ5Iiwid3JpdGVGaWxlU3luYyIsImRlc3RpbmF0aW9uIiwiY29udGV4dCIsImNvcHkiLCJwYXRoVG9SZW5hbWUiLCJzZWdtZW50cyIsInNwbGl0IiwiY29tcGlsZSIsInNlZ21lbnQiLCJyZW5hbWVTeW5jIiwiY29udGVudCIsInRlbXBsYXRlIiwiYXJ0aWZhY3RUZW1wbGF0ZSIsImZpbGVzVG9DcmVhdGUiLCJnZXRBcnRpZmFjdFRlbXBsYXRlRmlsZXNSZWN1cnNpdmVseUluIiwiaW5jbHVkZWRGaWxlcyIsImZpbGVuYW1lIiwiZ2xvYmFsIiwiZ2V0RmlsZU5hbWVBbmRFeHRlbnNpb24iLCJmaWxlUGF0aCIsIm9sZENvbnRlbnQiLCJuZXdGaWxlUGF0aCIsIm5ld0NvbnRlbnQiLCJjZW50cmFsRm9sZGVyTG9jYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQU1BLG9CQUFvQixlQUExQixDLENBaEJBOzs7Ozs7QUFrQkEsSUFBTUMsY0FBYyxDQUNoQixNQURnQixFQUVoQixNQUZnQixFQUdoQixNQUhnQixFQUloQixNQUpnQixFQUtoQixNQUxnQixFQU1oQixNQU5nQixFQU9oQixNQVBnQixDQUFwQjtBQVNBOzs7QUFHQSxJQUFNQyxpQkFBaUIsSUFBSUMsT0FBSixFQUF2QjtBQUNBOzs7QUFHQSxJQUFNQyxlQUFlLElBQUlELE9BQUosRUFBckI7QUFDQTs7O0FBR0EsSUFBTUUsT0FBTyxJQUFJRixPQUFKLEVBQWI7QUFDQTs7O0FBR0EsSUFBTUcsV0FBVyxJQUFJSCxPQUFKLEVBQWpCO0FBQ0E7OztBQUdBLElBQU1JLGNBQWMsSUFBSUosT0FBSixFQUFwQjtBQUNBOzs7QUFHQSxJQUFNSyxtQkFBbUIsSUFBSUwsT0FBSixFQUF6QjtBQUNBOzs7QUFHQSxJQUFNTSxnQkFBZ0IsSUFBSU4sT0FBSixFQUF0Qjs7QUFFQTs7OztJQUdhTyxtQixXQUFBQSxtQjs7QUFFVDs7Ozs7Ozs7O0FBU0EsaUNBQVlDLGFBQVosRUFBMkJDLFdBQTNCLEVBQXdDQyxHQUF4QyxFQUE2Q0MsT0FBN0MsRUFBc0RDLFVBQXRELEVBQWtFQyxNQUFsRSxFQUEwRTtBQUFBOztBQUN0RWQsdUJBQWVlLEdBQWYsQ0FBbUIsSUFBbkIsRUFBeUJOLGFBQXpCO0FBQ0FQLHFCQUFhYSxHQUFiLENBQWlCLElBQWpCLEVBQXVCTCxXQUF2QjtBQUNBTixpQkFBU1csR0FBVCxDQUFhLElBQWIsRUFBbUJILE9BQW5CO0FBQ0FQLG9CQUFZVSxHQUFaLENBQWdCLElBQWhCLEVBQXNCRixVQUF0QjtBQUNBVixhQUFLWSxHQUFMLENBQVMsSUFBVCxFQUFlSixHQUFmOztBQUVBQyxnQkFBUUkscUJBQVIsQ0FBOEIsS0FBS0MsbUJBQW5DOztBQUVBLGFBQUtDLE9BQUwsR0FBZUosTUFBZjtBQUNBLGFBQUtLLGdCQUFMO0FBQ0EsYUFBS0MsZUFBTDtBQUNIOztBQUVEOzs7Ozs7Ozs7O0FBd0JBOzs7OzsrQ0FLdUJDLFEsRUFBVTtBQUM3QixtQkFBT2QsY0FBY2UsR0FBZCxDQUFrQixJQUFsQixFQUF3QkMsTUFBeEIsQ0FBK0I7QUFBQSx1QkFBZUMsWUFBWUgsUUFBWixJQUF3QkEsUUFBdkM7QUFBQSxhQUEvQixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7OzJDQUttQkksSSxFQUFNO0FBQ3JCLG1CQUFPbEIsY0FBY2UsR0FBZCxDQUFrQixJQUFsQixFQUF3QkMsTUFBeEIsQ0FBK0I7QUFBQSx1QkFBZUMsWUFBWUMsSUFBWixJQUFvQkEsSUFBbkM7QUFBQSxhQUEvQixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztzREFNOEJKLFEsRUFBVUksSSxFQUFNO0FBQzFDLG1CQUFPbEIsY0FBY2UsR0FBZCxDQUFrQixJQUFsQixFQUF3QkMsTUFBeEIsQ0FBK0I7QUFBQSx1QkFBZUMsWUFBWUgsUUFBWixJQUF3QkEsUUFBeEIsSUFBb0NHLFlBQVlDLElBQVosSUFBb0JBLElBQXZFO0FBQUEsYUFBL0IsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7MkNBR21CO0FBQ2YsZ0JBQUlDLGFBQWEsS0FBS0MscUJBQXRCO0FBQ0EsZ0JBQUl0QixZQUFZaUIsR0FBWixDQUFnQixJQUFoQixFQUFzQk0sVUFBdEIsQ0FBaUNGLFVBQWpDLENBQUosRUFBa0Q7QUFDOUMsb0JBQUlHLE9BQU94QixZQUFZaUIsR0FBWixDQUFnQixJQUFoQixFQUFzQlEsWUFBdEIsQ0FBbUNKLFVBQW5DLENBQVg7QUFDQSxvQkFBSUssd0JBQXdCQyxLQUFLQyxLQUFMLENBQVdKLElBQVgsQ0FBNUI7QUFDQSxvQkFBSUssZUFBZSxFQUFuQjtBQUNBSCxzQ0FBc0JJLE9BQXRCLENBQThCLDZCQUFxQjtBQUMvQyx3QkFBSVgsY0FBYyxJQUFJWSx3QkFBSixDQUNkQyxrQkFBa0JoQixRQURKLEVBRWRnQixrQkFBa0JDLElBRkosRUFHZEQsa0JBQWtCRSxXQUhKLEVBSWRGLGtCQUFrQlosSUFKSixFQUtkWSxrQkFBa0JHLFlBTEosRUFNZEgsa0JBQWtCSSxRQU5KLEVBT2RKLGtCQUFrQkssbUJBQWxCLElBQXlDLEVBUDNCLEVBUWRMLGtCQUFrQk0sbUJBQWxCLElBQXlDLEVBUjNCLENBQWxCO0FBVUFULGlDQUFhVSxJQUFiLENBQWtCcEIsV0FBbEI7QUFDSCxpQkFaRDs7QUFjQWpCLDhCQUFjUSxHQUFkLENBQWtCLElBQWxCLEVBQXdCbUIsWUFBeEI7QUFDSCxhQW5CRCxNQW1CTzs7QUFFSDNCLDhCQUFjUSxHQUFkLENBQWtCLElBQWxCLEVBQXdCLEVBQXhCO0FBQ0g7O0FBRURULDZCQUFpQlMsR0FBakIsQ0FBcUIsSUFBckIsRUFBMkJSLGNBQWNlLEdBQWQsQ0FBa0IsSUFBbEIsRUFBd0J1QixNQUF4QixJQUFrQyxDQUFsQyxHQUFzQyxLQUF0QyxHQUE2QyxJQUF4RTtBQUNIO0FBQ0Q7Ozs7OzswQ0FHa0I7QUFDZEMsaUNBQVdDLGNBQVgsQ0FBMEIsWUFBMUIsRUFBd0MsWUFBTTtBQUMxQyx1QkFBT0MsV0FBS0MsTUFBTCxFQUFQO0FBQ0gsYUFGRDtBQUdIOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7QUFJUUMsbUMsR0FBTSx5RDtpRUFDSCxJQUFJQyxPQUFKLENBQVksbUJBQVc7QUFDMUJqRCxpREFBYW9CLEdBQWIsQ0FBaUIsS0FBakIsRUFBdUI4QixPQUF2QixDQUErQkYsR0FBL0IsRUFBb0NHLElBQXBDLENBQXlDLGdCQUFRO0FBQzdDLDRDQUFJQyxTQUFTdEIsS0FBS0MsS0FBTCxDQUFXSixJQUFYLENBQWI7QUFDQSw0Q0FBSTBCLE9BQU8sRUFBWDtBQUNBRCwrQ0FBT25CLE9BQVAsQ0FBZTtBQUFBLG1EQUFRb0IsS0FBS1gsSUFBTCxDQUFVWSxLQUFLbEIsSUFBZixDQUFSO0FBQUEseUNBQWY7QUFDQW1CLGdEQUFRRixJQUFSO0FBQ0gscUNBTEQ7QUFNSCxpQ0FQTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQVVYOzs7Ozs7Ozs7Ozs7Ozs7a0VBS1csSUFBSUosT0FBSjtBQUFBLHlIQUFZLGtCQUFNTSxPQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNYN0MsK0RBRFcsR0FDRFIsU0FBU2tCLEdBQVQsQ0FBYSxNQUFiLEVBQW1Cb0MsWUFBbkIsQ0FBZ0MsT0FBS3pDLG1CQUFyQyxDQURDO0FBRVgwQyxtRUFGVyxHQUVHL0MsUUFBUWlDLE1BRlg7OztBQUlmLDREQUFJYyxnQkFBZ0IsQ0FBcEIsRUFBdUJGLFFBQVEsQ0FBUjtBQUN2QjdDLGdFQUFRdUIsT0FBUixDQUFnQixrQkFBVTtBQUN0QixtRUFBS2pCLE9BQUwsQ0FBYTBDLElBQWIsK0JBQTZDQyxNQUE3QztBQUNBMUQsaUVBQUttQixHQUFMLENBQVMsTUFBVCxFQUFld0MsU0FBZixDQUF5QkQsTUFBekIsRUFBaUNFLElBQWpDLEdBQXdDQyxJQUF4QyxDQUE2QyxZQUFNO0FBQy9DLG9FQUFJLEVBQUVMLFdBQUYsS0FBa0IsQ0FBdEIsRUFBeUJGLFFBQVE3QyxRQUFRaUMsTUFBaEI7QUFDNUIsNkRBRkQ7QUFHSCx5REFMRDs7QUFMZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQ0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjWDs7Ozs7Ozs7Ozs7Ozs7OztBQUtJLHFDQUFLM0IsT0FBTCxDQUFhMEMsSUFBYixDQUFrQiw0QkFBbEI7QUFDSUssdUMsR0FBVSxJQUFJZCxPQUFKO0FBQUEseUhBQVksa0JBQU1NLE9BQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2xCUyxzRUFEa0IsR0FDRCxLQURDO0FBQUE7QUFBQSwrREFFSyxPQUFLQyx3QkFBTCxFQUZMOztBQUFBO0FBRWhCQyxvRUFGZ0I7QUFBQTtBQUFBLCtEQUdKLE9BQUtDLHdCQUFMLEVBSEk7O0FBQUE7QUFHbEJDLDZEQUhrQjtBQUtsQkMsa0VBTGtCLEdBS0wsQ0FMSzs7QUFNdEJELDhEQUFNbkMsT0FBTixDQUFjLGdCQUFRO0FBQ2xCLGdFQUFJcUMsYUFBYUMsZUFBS0MsSUFBTCxDQUFVLE9BQUt6RCxtQkFBZixFQUFvQ3FCLElBQXBDLENBQWpCOztBQUVBLGdFQUFJLENBQUNqQyxZQUFZaUIsR0FBWixDQUFnQixNQUFoQixFQUFzQk0sVUFBdEIsQ0FBaUM0QyxVQUFqQyxDQUFMLEVBQW1EO0FBQy9DTixpRkFBaUIsSUFBakI7QUFDQSxvRUFBSVMsb0RBQWtEckMsSUFBbEQsU0FBSjtBQUNBLHVFQUFLcEIsT0FBTCxDQUFhMEMsSUFBYiw2Q0FBMkRlLEdBQTNEOztBQUVBSjs7QUFHQXBFLHFFQUFLbUIsR0FBTCxDQUFTLE1BQVQsRUFDS3NELE1BREwsQ0FDWSxLQURaLEVBRUtDLEtBRkwsQ0FFV0YsR0FGWCxFQUVnQkgsVUFGaEIsRUFFNEIsRUFBRSxlQUFlLElBQWpCLEVBRjVCLEVBR0tSLElBSEwsQ0FHVSxZQUFNOztBQUVSLHdFQUFJLEVBQUVPLFVBQUYsSUFBZ0IsQ0FBcEIsRUFBdUI7QUFDbkIsK0VBQUtPLG1CQUFMO0FBQ0FyQjtBQUNIO0FBQ0osaUVBVEw7QUFVSDtBQUNKLHlEQXRCRDtBQXVCQSw0REFBSSxDQUFDUyxjQUFELElBQW1CRSxlQUFlLENBQXRDLEVBQXlDO0FBQ3JDLG1FQUFLVSxtQkFBTDtBQUNBckI7QUFDSDs7QUFoQ3FCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFDQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLG9DO2tFQWtDUFEsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHWDs7Ozs7Ozs7Ozs7Ozs7O0FBSUkscUNBQUsvQyxPQUFMLENBQWEwQyxJQUFiLG1CQUFrQyxLQUFLakMscUJBQXZDO0FBQ0lvRCxvQyxHQUFPLEk7QUFDUG5FLHVDLEdBQVVSLFNBQVNrQixHQUFULENBQWEsSUFBYixFQUFtQm9DLFlBQW5CLENBQWdDLEtBQUt6QyxtQkFBckMsQztBQUNWaUIsNEMsR0FBZSxFOztBQUNuQnRCLHdDQUFRdUIsT0FBUixDQUFnQixrQkFBVTtBQUN0Qix3Q0FBSTZDLG9CQUFvQjVFLFNBQVNrQixHQUFULENBQWEsTUFBYixFQUFtQjJELGVBQW5CLENBQW1DcEIsTUFBbkMsRUFBMkMsa0JBQTNDLENBQXhCO0FBQ0Esd0NBQUlxQixnQkFBZ0JULGVBQUtDLElBQUwsQ0FBVWIsTUFBVixFQUFrQixTQUFsQixDQUFwQjs7QUFFQW1CLHNEQUFrQjdDLE9BQWxCLENBQTBCLDJCQUFtQjtBQUN6Qyw0Q0FBSUUsb0JBQW9CTCxLQUFLQyxLQUFMLENBQVc1QixZQUFZaUIsR0FBWixDQUFnQixNQUFoQixFQUFzQlEsWUFBdEIsQ0FBbUNxRCxlQUFuQyxFQUFvRCxNQUFwRCxDQUFYLENBQXhCO0FBQ0EsNENBQUk5QyxrQkFBa0JaLElBQWxCLElBQTBCLFdBQTlCLEVBQTJDO0FBQ3ZDLGdEQUFJMkQsUUFBUWhGLFNBQVNrQixHQUFULENBQWEsTUFBYixFQUFtQitELCtCQUFuQixDQUFtREgsYUFBbkQsQ0FBWjtBQUNBRSxvREFBUUEsTUFBTTdELE1BQU4sQ0FBYSxhQUFLO0FBQ3RCLG9EQUFJK0QsVUFBVSxJQUFkO0FBQ0F2Riw0REFBWW9DLE9BQVosQ0FBb0IsYUFBSztBQUNyQix3REFBSW9ELEVBQUVDLFdBQUYsR0FBZ0JDLE9BQWhCLENBQXdCQyxDQUF4QixJQUE2QixDQUFqQyxFQUFvQ0osVUFBVSxLQUFWO0FBQ3ZDLGlEQUZEO0FBR0EsdURBQU9BLE9BQVA7QUFDSCw2Q0FOTyxDQUFSO0FBT0EsZ0RBQUk1QyxzQkFBc0IwQyxNQUFNN0QsTUFBTixDQUFhO0FBQUEsdURBQUtnRSxFQUFFRSxPQUFGLENBQVUsSUFBVixJQUFrQixDQUF2QjtBQUFBLDZDQUFiLEVBQXVDRSxHQUF2QyxDQUEyQztBQUFBLHVEQUFLSixFQUFFSyxNQUFGLENBQVNWLGNBQWNyQyxNQUFkLEdBQXVCLENBQWhDLENBQUw7QUFBQSw2Q0FBM0MsQ0FBMUI7O0FBRUEsZ0RBQUlGLHNCQUFzQixFQUExQjtBQUNBeUMsa0RBQU1qRCxPQUFOLENBQWMsYUFBSztBQUNmLG9EQUFJMEQsT0FBT3hGLFlBQVlpQixHQUFaLENBQWdCeUQsSUFBaEIsRUFBc0JlLFFBQXRCLENBQStCUCxDQUEvQixDQUFYO0FBQ0Esb0RBQUksQ0FBQ00sS0FBS0UsV0FBTCxFQUFMLEVBQXlCO0FBQ3JCLHdEQUFJQyxPQUFPM0YsWUFBWWlCLEdBQVosQ0FBZ0J5RCxJQUFoQixFQUFzQmpELFlBQXRCLENBQW1DeUQsQ0FBbkMsQ0FBWDtBQUNBLHdEQUFJUyxLQUFLUCxPQUFMLENBQWEsSUFBYixLQUFzQixDQUExQixFQUE2QjtBQUN6QjlDLDRFQUFvQkMsSUFBcEIsQ0FBeUIyQyxFQUFFSyxNQUFGLENBQVNWLGNBQWNyQyxNQUFkLEdBQXVCLENBQWhDLENBQXpCO0FBQ0g7QUFDSjtBQUNKLDZDQVJEOztBQVVBUiw4REFBa0JJLFFBQWxCLEdBQTZCeUMsYUFBN0I7QUFDQTdDLDhEQUFrQkssbUJBQWxCLEdBQXdDQSxtQkFBeEM7QUFDQUwsOERBQWtCTSxtQkFBbEIsR0FBd0NBLG1CQUF4QztBQUNILHlDQXpCRCxNQTBCSztBQUNETiw4REFBa0JJLFFBQWxCLEdBQTZCZ0MsZUFBS3dCLE9BQUwsQ0FBYWQsZUFBYixDQUE3QjtBQUNBOUMsOERBQWtCSyxtQkFBbEIsR0FBd0MsRUFBeEM7QUFDQUwsOERBQWtCTSxtQkFBbEIsR0FBd0MsRUFBeEM7QUFDSDs7QUFFRCw0Q0FBSW5CLGNBQWMsSUFBSVksd0JBQUosQ0FDZEMsa0JBQWtCaEIsUUFBbEIsSUFBOEIsS0FEaEIsRUFFZGdCLGtCQUFrQkMsSUFGSixFQUdkRCxrQkFBa0JFLFdBSEosRUFJZEYsa0JBQWtCWixJQUpKLEVBS2RZLGtCQUFrQkcsWUFMSixFQU1kSCxrQkFBa0JJLFFBTkosRUFPZEosa0JBQWtCSyxtQkFQSixFQVFkTCxrQkFBa0JNLG1CQVJKLENBQWxCO0FBVUFULHFEQUFhVSxJQUFiLENBQWtCcEIsV0FBbEI7QUFDSCxxQ0E3Q0Q7QUE4Q0gsaUNBbEREO0FBbURJTyxxRCxHQUF3QkcsYUFBYXlELEdBQWIsQ0FBaUI7QUFBQSwyQ0FBS0osRUFBRVcsTUFBRixFQUFMO0FBQUEsaUNBQWpCLEM7QUFDeEJDLGtELEdBQXFCbkUsS0FBS29FLFNBQUwsQ0FBZXJFLHFCQUFmLEVBQXNDLElBQXRDLEVBQTRDLENBQTVDLEM7O0FBQ3pCMUIsNENBQVlpQixHQUFaLENBQWdCLElBQWhCLEVBQXNCK0UsYUFBdEIsQ0FBb0MsS0FBSzFFLHFCQUF6QyxFQUFnRXdFLGtCQUFoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHSjs7Ozs7Ozs7O3VDQU1lM0UsVyxFQUFhOEUsVyxFQUFhQyxPLEVBQVM7QUFBQTs7QUFDOUNuRyxxQkFBU2tCLEdBQVQsQ0FBYSxJQUFiLEVBQW1Ca0YsSUFBbkIsQ0FBd0JGLFdBQXhCLEVBQXFDOUUsWUFBWWlCLFFBQWpEO0FBQ0FqQix3QkFBWWtCLG1CQUFaLENBQWdDUCxPQUFoQyxDQUF3QyxhQUFLO0FBQ3pDLG9CQUFJc0UsZUFBZWhDLGVBQUtDLElBQUwsQ0FBVTRCLFdBQVYsRUFBdUJmLENBQXZCLENBQW5CO0FBQ0Esb0JBQUltQixXQUFXLEVBQWY7QUFDQUQsNkJBQWFFLEtBQWIsQ0FBbUIsU0FBbkIsRUFBOEJ4RSxPQUE5QixDQUFzQztBQUFBLDJCQUFXdUUsU0FBUzlELElBQVQsQ0FBY0UscUJBQVc4RCxPQUFYLENBQW1CQyxPQUFuQixFQUE0Qk4sT0FBNUIsQ0FBZCxDQUFYO0FBQUEsaUJBQXRDO0FBQ0Esb0JBQUlqRCxTQUFTb0QsU0FBU2hDLElBQVQsQ0FBYyxFQUFkLENBQWI7QUFDQXJFLDRCQUFZaUIsR0FBWixDQUFnQixNQUFoQixFQUFzQndGLFVBQXRCLENBQWlDTCxZQUFqQyxFQUErQ25ELE1BQS9DO0FBQ0gsYUFORDs7QUFRQTlCLHdCQUFZbUIsbUJBQVosQ0FBZ0NSLE9BQWhDLENBQXdDLGFBQUs7QUFDekMsb0JBQUk2RCxPQUFPdkIsZUFBS0MsSUFBTCxDQUFVNEIsV0FBVixFQUF1QmYsQ0FBdkIsQ0FBWDtBQUNBLG9CQUFJd0IsVUFBVTFHLFlBQVlpQixHQUFaLENBQWdCLE1BQWhCLEVBQXNCUSxZQUF0QixDQUFtQ2tFLElBQW5DLEVBQXlDLE1BQXpDLENBQWQ7QUFDQSxvQkFBSWdCLFdBQVdsRSxxQkFBVzhELE9BQVgsQ0FBbUJHLE9BQW5CLENBQWY7QUFDQSxvQkFBSXpELFNBQVMwRCxTQUFTVCxPQUFULENBQWI7QUFDQWxHLDRCQUFZaUIsR0FBWixDQUFnQixNQUFoQixFQUFzQitFLGFBQXRCLENBQW9DTCxJQUFwQyxFQUEwQzFDLE1BQTFDO0FBQ0gsYUFORDtBQU9IO0FBQ0Q7Ozs7Ozs7OzsrQ0FNdUIyRCxnQixFQUFrQlgsVyxFQUFhQyxPLEVBQVM7QUFBQTs7QUFDM0QsZ0JBQUlXLGdCQUFnQjlHLFNBQVNrQixHQUFULENBQWEsSUFBYixFQUFtQjZGLHFDQUFuQixDQUF5REYsaUJBQWlCeEUsUUFBMUUsRUFBb0Z3RSxpQkFBaUJELFFBQWpCLENBQTBCSSxhQUE5RyxDQUFwQjs7QUFFQUYsMEJBQWMvRSxPQUFkLENBQXVCLG9CQUFZO0FBQy9CLG9CQUFNa0YsV0FBV0MsaUJBQU9DLHVCQUFQLENBQStCQyxRQUEvQixDQUFqQjtBQUNBLG9CQUFNQyxhQUFhcEgsWUFBWWlCLEdBQVosQ0FBZ0IsTUFBaEIsRUFBc0JRLFlBQXRCLENBQW1DMEYsUUFBbkMsRUFBNkMsTUFBN0MsQ0FBbkI7QUFDQSxvQkFBSWQsV0FBVyxFQUFmOztBQUVBakMsK0JBQUtDLElBQUwsQ0FBVTRCLFdBQVYsRUFBdUJlLFFBQXZCLEVBQWlDVixLQUFqQyxDQUF1QyxTQUF2QyxFQUFrRHhFLE9BQWxELENBQTBEO0FBQUEsMkJBQVd1RSxTQUFTOUQsSUFBVCxDQUFjRSxxQkFBVzhELE9BQVgsQ0FBbUJDLE9BQW5CLEVBQTRCTixPQUE1QixDQUFkLENBQVg7QUFBQSxpQkFBMUQ7QUFDQSxvQkFBSW1CLGNBQWNoQixTQUFTaEMsSUFBVCxDQUFjLEVBQWQsQ0FBbEI7O0FBRUEsb0JBQUlzQyxXQUFXbEUscUJBQVc4RCxPQUFYLENBQW1CYSxVQUFuQixDQUFmO0FBQ0Esb0JBQUlFLGFBQWFYLFNBQVNULE9BQVQsQ0FBakI7QUFDQWxHLDRCQUFZaUIsR0FBWixDQUFnQixNQUFoQixFQUFzQitFLGFBQXRCLENBQW9DcUIsV0FBcEMsRUFBaURDLFVBQWpEO0FBQ0gsYUFYRDtBQVlIOztBQUVEOzs7Ozs7OzRCQXBSMEI7QUFDdEIsbUJBQU9sRCxlQUFLQyxJQUFMLENBQVUxRSxlQUFlc0IsR0FBZixDQUFtQixJQUFuQixFQUF5QnNHLHFCQUFuQyxFQUEwRDlILGlCQUExRCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSTRCO0FBQ3hCLG1CQUFPMkUsZUFBS0MsSUFBTCxDQUFVMUUsZUFBZXNCLEdBQWYsQ0FBbUIsSUFBbkIsRUFBeUJzRyxxQkFBbkMsRUFBMEQsb0JBQTFELENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJbUI7QUFDZixtQkFBT3JILGNBQWNlLEdBQWQsQ0FBa0IsSUFBbEIsQ0FBUDtBQUNIOzs7NEJBc1FxQjtBQUNsQixtQkFBT2hCLGlCQUFpQmdCLEdBQWpCLENBQXFCLElBQXJCLENBQVA7QUFDSCIsImZpbGUiOiJCb2lsZXJQbGF0ZXNNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgQ29uZmlnTWFuYWdlciB9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XG5pbXBvcnQgeyBIdHRwV3JhcHBlciB9IGZyb20gJy4uL0h0dHBXcmFwcGVyJztcbmltcG9ydCB7IEdpdCB9IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBCb2lsZXJQbGF0ZSB9IGZyb20gJy4vQm9pbGVyUGxhdGUnO1xuaW1wb3J0IEhhbmRsZWJhcnMgZnJvbSAnaGFuZGxlYmFycyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgeyBHdWlkIH0gZnJvbSAnLi4vR3VpZCc7XG5cbmNvbnN0IGJvaWxlclBsYXRlRm9sZGVyID0gJ2JvaWxlci1wbGF0ZXMnO1xuXG5jb25zdCBiaW5hcnlGaWxlcyA9IFtcbiAgICAnLmpwZycsXG4gICAgJy5wbmcnLFxuICAgICcub2JqJyxcbiAgICAnLmRsbCcsXG4gICAgJy5iaW4nLFxuICAgICcuZXhlJyxcbiAgICAnLnR0Zidcbl07XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIENvbmZpZ01hbmFnZXI+fVxuICovXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIEh0dHBXcmFwcGVyPn1cbiAqL1xuY29uc3QgX2h0dHBXcmFwcGVyID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Qm9pbGVyUGxhdGVzTWFuYWdlciwgR2l0Pn1cbiAqL1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIEZvbGRlcnM+fVxuICovXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIGZzPn1cbiAqL1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxCb2lsZXJQbGF0ZXNNYW5hZ2VyLCBib29sZWFuPn1cbiAqL1xuY29uc3QgX2hhc0JvaWxlclBsYXRlcyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIEJvaWxlclBsYXRlW10+fVxuICovXG5jb25zdCBfYm9pbGVyUGxhdGVzID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBtYW5hZ2VyIG9mIGJvaWxlciBwbGF0ZXNcbiAqL1xuZXhwb3J0IGNsYXNzIEJvaWxlclBsYXRlc01hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0JvaWxlclBsYXRlc01hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtDb25maWdNYW5hZ2VyfSBjb25maWdNYW5hZ2VyIFxuICAgICAqIEBwYXJhbSB7SHR0cFdyYXBwZXJ9IGh0dHBXcmFwcGVyXG4gICAgICogQHBhcmFtIHtHaXR9IGdpdFxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyO1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ01hbmFnZXIsIGh0dHBXcmFwcGVyLCBnaXQsIGZvbGRlcnMsIGZpbGVTeXN0ZW0sIGxvZ2dlcikge1xuICAgICAgICBfY29uZmlnTWFuYWdlci5zZXQodGhpcywgY29uZmlnTWFuYWdlcik7XG4gICAgICAgIF9odHRwV3JhcHBlci5zZXQodGhpcywgaHR0cFdyYXBwZXIpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgX2dpdC5zZXQodGhpcywgZ2l0KTtcblxuICAgICAgICBmb2xkZXJzLm1ha2VGb2xkZXJJZk5vdEV4aXN0cyh0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24pO1xuXG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgdGhpcy5yZWFkQm9pbGVyUGxhdGVzKCk7XG4gICAgICAgIHRoaXMuc2V0dXBIYW5kbGViYXJzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBiYXNlIHBhdGggZm9yIGJvaWxlciBwbGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBCYXNlIHBhdGggb2YgYm9pbGVyIHBsYXRlc1xuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZUxvY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKS5jZW50cmFsRm9sZGVyTG9jYXRpb24sIGJvaWxlclBsYXRlRm9sZGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHBhdGggdG8gdGhlIGJvaWxlciBwbGF0ZXMgY29uZmlnIGZpbGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBQYXRoIHRvIHRoZSBjb25maWcgZmlsZVxuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUoKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oX2NvbmZpZ01hbmFnZXIuZ2V0KHRoaXMpLmNlbnRyYWxGb2xkZXJMb2NhdGlvbiwgXCJib2lsZXItcGxhdGVzLmpzb25cIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlc1xuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzXG4gICAgICovXG4gICAgZ2V0IGJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIGEgc3BlY2lmaWMgbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlcyBmb3IgdGhlIGxhbmd1YWdlXG4gICAgICovXG4gICAgYm9pbGVyUGxhdGVzQnlMYW5ndWFnZShsYW5ndWFnZSkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcykuZmlsdGVyKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLmxhbmd1YWdlID09IGxhbmd1YWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIHR5cGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzIGZvciB0aGUgdHlwZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5VHlwZSh0eXBlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5maWx0ZXIoYm9pbGVyUGxhdGUgPT4gYm9pbGVyUGxhdGUudHlwZSA9PSB0eXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlcyBmb3IgdGhlIGxhbmd1YWdlXG4gICAgICovXG4gICAgYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUobGFuZ3VhZ2UsIHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS5sYW5ndWFnZSA9PSBsYW5ndWFnZSAmJiBib2lsZXJQbGF0ZS50eXBlID09IHR5cGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWQgYWxsIGJvaWxlciBwbGF0ZXMgZnJvbSBkaXNrXG4gICAgICovXG4gICAgcmVhZEJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgbGV0IGNvbmZpZ0ZpbGUgPSB0aGlzLmJvaWxlclBsYXRlQ29uZmlnRmlsZTtcbiAgICAgICAgaWYgKF9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGNvbmZpZ0ZpbGUpKSB7XG4gICAgICAgICAgICBsZXQganNvbiA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoY29uZmlnRmlsZSk7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNPYmplY3RzID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZXMgPSBbXTtcbiAgICAgICAgICAgIGJvaWxlclBsYXRlc0FzT2JqZWN0cy5mb3JFYWNoKGJvaWxlclBsYXRlT2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBuZXcgQm9pbGVyUGxhdGUoXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0Lmxhbmd1YWdlLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZGVwZW5kZW5jaWVzLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sb2NhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QucGF0aHNOZWVkaW5nQmluZGluZyB8fCBbXSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZmlsZXNOZWVkaW5nQmluZGluZyB8fCBbXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVzLnB1c2goYm9pbGVyUGxhdGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXMuc2V0KHRoaXMsIGJvaWxlclBsYXRlcyk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXMuc2V0KHRoaXMsIFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9oYXNCb2lsZXJQbGF0ZXMuc2V0KHRoaXMsIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmxlbmd0aCA9PSAwID8gZmFsc2U6IHRydWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIHRoZSBoYW5kbGViYXJzIHN5c3RlbSB3aXRoIGN1c3RvbSBoZWxwZXJzXG4gICAgICovXG4gICAgc2V0dXBIYW5kbGViYXJzKCkge1xuICAgICAgICBIYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdjcmVhdGVHdWlkJywgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEd1aWQuY3JlYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmcm9tIEdpdEh1YlxuICAgICAqL1xuICAgIGFzeW5jIGdldEF2YWlsYWJsZUJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgbGV0IHVyaSA9IFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9vcmdzL2RvbGl0dGxlLWJvaWxlcnBsYXRlcy9yZXBvc1wiO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBfaHR0cFdyYXBwZXIuZ2V0KHRoaXMpLmdldEpzb24odXJpKS50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgICAgIGxldCB1cmxzID0gW107XG4gICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goaXRlbSA9PiB1cmxzLnB1c2goaXRlbS5uYW1lKSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh1cmxzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW55IGV4aXN0aW5nIGJvaWxlciBwbGF0ZXMgb24gZGlza1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59IG51bWJlciBvZiB1cGRhdGVkIGZvbGRlcnNcbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVCb2lsZXJQbGF0ZXNPbkRpc2soKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGxldCBmb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNJbih0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24pO1xuICAgICAgICAgICAgbGV0IHVwZGF0ZUNvdW50ID0gZm9sZGVycy5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmICh1cGRhdGVDb3VudCA9PT0gMCkgcmVzb2x2ZSgwKTtcbiAgICAgICAgICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBVcGRhdGUgYm9pbGVyIHBsYXRlIGluICcke2ZvbGRlcn0nYCk7XG4gICAgICAgICAgICAgICAgX2dpdC5nZXQodGhpcykuZm9yRm9sZGVyKGZvbGRlcikucHVsbCgpLmV4ZWMoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoLS11cGRhdGVDb3VudCA9PT0gMCkgcmVzb2x2ZShmb2xkZXJzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGJvaWxlciBwbGF0ZXMuXG4gICAgICogVGhpcyB3aWxsIHVwZGF0ZSBhbnkgZXhpc3RpbmcgYW5kIGRvd25sb2FkIGFueSBuZXcgb25lcy5cbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdVcGRhdGluZyBhbGwgYm9pbGVyIHBsYXRlcycpO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgbGV0IGNsb25lZE5ld1JlcG9zID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkQ291bnQgPSBhd2FpdCB0aGlzLnVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpO1xuICAgICAgICAgICAgbGV0IG5hbWVzID0gYXdhaXQgdGhpcy5nZXRBdmFpbGFibGVCb2lsZXJQbGF0ZXMoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGNsb25lQ291bnQgPSAwO1xuICAgICAgICAgICAgbmFtZXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZm9sZGVyTmFtZSA9IHBhdGguam9pbih0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24sIG5hbWUpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmV4aXN0c1N5bmMoZm9sZGVyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvbmVkTmV3UmVwb3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gYGh0dHBzOi8vZ2l0aHViLmNvbS9kb2xpdHRsZS1ib2lsZXJwbGF0ZXMvJHtuYW1lfS5naXRgO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgR2V0dGluZyBib2lsZXJwbGF0ZSBub3Qgb24gZGlzayBmcm9tICcke3VybH0nYCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjbG9uZUNvdW50Kys7XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2lsZW50KGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb25lKHVybCwgZm9sZGVyTmFtZSwgeyAnLS1yZWN1cnNpdmUnOiBudWxsIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhlYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC0tY2xvbmVDb3VudCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29uZmlndXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNsb25lZE5ld1JlcG9zICYmIHVwZGF0ZWRDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbmZpZ3VyYXRpb24oKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgY29uZmlndXJhdGlvbiBmaWxlIG9uIGRpc2tcbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgVXBkYXRpbmcgdGhlICR7dGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGV9IGNvbmZpZ3VyYXRpb25gKVxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBmb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNJbih0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24pO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gW107XG4gICAgICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlc1BhdGhzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLnNlYXJjaFJlY3Vyc2l2ZShmb2xkZXIsICdib2lsZXJwbGF0ZS5qc29uJyk7XG4gICAgICAgICAgICBsZXQgY29udGVudEZvbGRlciA9IHBhdGguam9pbihmb2xkZXIsICdDb250ZW50Jyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJvaWxlclBsYXRlc1BhdGhzLmZvckVhY2goYm9pbGVyUGxhdGVQYXRoID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVPYmplY3QgPSBKU09OLnBhcnNlKF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoYm9pbGVyUGxhdGVQYXRoLCAndXRmOCcpKTtcbiAgICAgICAgICAgICAgICBpZiAoYm9pbGVyUGxhdGVPYmplY3QudHlwZSAhPSAnYXJ0aWZhY3RzJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbihjb250ZW50Rm9sZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcGF0aHMgPSBwYXRocy5maWx0ZXIoXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5jbHVkZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5hcnlGaWxlcy5mb3JFYWNoKGIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihiKSA+IDApIGluY2x1ZGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluY2x1ZGU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHNOZWVkaW5nQmluZGluZyA9IHBhdGhzLmZpbHRlcihfID0+IF8uaW5kZXhPZigne3snKSA+IDApLm1hcChfID0+IF8uc3Vic3RyKGNvbnRlbnRGb2xkZXIubGVuZ3RoICsgMSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxlc05lZWRpbmdCaW5kaW5nID0gW107XG4gICAgICAgICAgICAgICAgICAgIHBhdGhzLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhfKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGUgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikucmVhZEZpbGVTeW5jKF8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLmluZGV4T2YoJ3t7JykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlc05lZWRpbmdCaW5kaW5nLnB1c2goXy5zdWJzdHIoY29udGVudEZvbGRlci5sZW5ndGggKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sb2NhdGlvbiA9IGNvbnRlbnRGb2xkZXI7XG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnBhdGhzTmVlZGluZ0JpbmRpbmcgPSBwYXRoc05lZWRpbmdCaW5kaW5nO1xuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5maWxlc05lZWRpbmdCaW5kaW5nID0gZmlsZXNOZWVkaW5nQmluZGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uID0gcGF0aC5kaXJuYW1lKGJvaWxlclBsYXRlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnBhdGhzTmVlZGluZ0JpbmRpbmcgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZmlsZXNOZWVkaW5nQmluZGluZyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IG5ldyBCb2lsZXJQbGF0ZShcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubGFuZ3VhZ2UgfHwgJ2FueScsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC50eXBlLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5kZXBlbmRlbmNpZXMsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5wYXRoc05lZWRpbmdCaW5kaW5nLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5maWxlc05lZWRpbmdCaW5kaW5nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZXMucHVzaChib2lsZXJQbGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc09iamVjdHMgPSBib2lsZXJQbGF0ZXMubWFwKF8gPT4gXy50b0pzb24oKSk7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc0pzb24gPSBKU09OLnN0cmluZ2lmeShib2lsZXJQbGF0ZXNBc09iamVjdHMsIG51bGwsIDQpO1xuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyh0aGlzLmJvaWxlclBsYXRlQ29uZmlnRmlsZSwgYm9pbGVyUGxhdGVzQXNKc29uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2Yge0JvaWxlclBsYXRlfSBpbnRvIGEgc3BlY2lmaWMgZGVzdGluYXRpb24gZm9sZGVyIHdpdGggYSBnaXZlbiBjb250ZXh0XG4gICAgICogQHBhcmFtIHtCb2lsZXJQbGF0ZX0gYm9pbGVyUGxhdGUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IFxuICAgICAqL1xuICAgIGNyZWF0ZUluc3RhbmNlKGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCkge1xuICAgICAgICBfZm9sZGVycy5nZXQodGhpcykuY29weShkZXN0aW5hdGlvbiwgYm9pbGVyUGxhdGUubG9jYXRpb24pO1xuICAgICAgICBib2lsZXJQbGF0ZS5wYXRoc05lZWRpbmdCaW5kaW5nLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICBsZXQgcGF0aFRvUmVuYW1lID0gcGF0aC5qb2luKGRlc3RpbmF0aW9uLCBfKTtcbiAgICAgICAgICAgIGxldCBzZWdtZW50cyA9IFtdO1xuICAgICAgICAgICAgcGF0aFRvUmVuYW1lLnNwbGl0KC8oXFxcXHxcXC8pLykuZm9yRWFjaChzZWdtZW50ID0+IHNlZ21lbnRzLnB1c2goSGFuZGxlYmFycy5jb21waWxlKHNlZ21lbnQpKGNvbnRleHQpKSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gc2VnbWVudHMuam9pbignJyk7XG4gICAgICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVuYW1lU3luYyhwYXRoVG9SZW5hbWUsIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgYm9pbGVyUGxhdGUuZmlsZXNOZWVkaW5nQmluZGluZy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgbGV0IGZpbGUgPSBwYXRoLmpvaW4oZGVzdGluYXRpb24sIF8pO1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGZpbGUsICd1dGY4JylcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShjb250ZW50KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0ZW1wbGF0ZShjb250ZXh0KTtcbiAgICAgICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS53cml0ZUZpbGVTeW5jKGZpbGUsIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2Yge0JvaWxlclBsYXRlfSBvZiBhbiBhcnRpZmFjdCBpbnRvIGEgc3BlY2lmaWMgZGVzdGluYXRpb24gZm9sZGVyIHdpdGggYSBnaXZlbiBjb250ZXh0XG4gICAgICogQHBhcmFtIHt7dGVtcGxhdGU6IGFueSwgbG9jYXRpb246IHN0cmluZ319IGFydGlmYWN0VGVtcGxhdGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb24gXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHQgXG4gICAgICovXG4gICAgY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZShhcnRpZmFjdFRlbXBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCkge1xuICAgICAgICBsZXQgZmlsZXNUb0NyZWF0ZSA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRBcnRpZmFjdFRlbXBsYXRlRmlsZXNSZWN1cnNpdmVseUluKGFydGlmYWN0VGVtcGxhdGUubG9jYXRpb24sIGFydGlmYWN0VGVtcGxhdGUudGVtcGxhdGUuaW5jbHVkZWRGaWxlcyk7XG5cbiAgICAgICAgZmlsZXNUb0NyZWF0ZS5mb3JFYWNoKCBmaWxlUGF0aCA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWxlbmFtZSA9IGdsb2JhbC5nZXRGaWxlTmFtZUFuZEV4dGVuc2lvbihmaWxlUGF0aCk7XG4gICAgICAgICAgICBjb25zdCBvbGRDb250ZW50ID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcbiAgICAgICAgICAgIGxldCBzZWdtZW50cyA9IFtdO1xuXG4gICAgICAgICAgICBwYXRoLmpvaW4oZGVzdGluYXRpb24sIGZpbGVuYW1lKS5zcGxpdCgvKFxcXFx8XFwvKS8pLmZvckVhY2goc2VnbWVudCA9PiBzZWdtZW50cy5wdXNoKEhhbmRsZWJhcnMuY29tcGlsZShzZWdtZW50KShjb250ZXh0KSkpO1xuICAgICAgICAgICAgbGV0IG5ld0ZpbGVQYXRoID0gc2VnbWVudHMuam9pbignJyk7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKG9sZENvbnRlbnQpO1xuICAgICAgICAgICAgbGV0IG5ld0NvbnRlbnQgPSB0ZW1wbGF0ZShjb250ZXh0KTtcbiAgICAgICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS53cml0ZUZpbGVTeW5jKG5ld0ZpbGVQYXRoLCBuZXdDb250ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciBvciBub3QgdGhlcmUgYXJlIGJvaWxlciBwbGF0ZXMgaW5zdGFsbGVkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlcmUgYXJlLCBmYWxzZSBpZiBub3RcbiAgICAgKi9cbiAgICBnZXQgaGFzQm9pbGVyUGxhdGVzKCkge1xuICAgICAgICByZXR1cm4gX2hhc0JvaWxlclBsYXRlcy5nZXQodGhpcyk7XG4gICAgfVxufSJdfQ==