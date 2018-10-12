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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsImJpbmFyeUZpbGVzIiwiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2h0dHBXcmFwcGVyIiwiX2dpdCIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJfaGFzQm9pbGVyUGxhdGVzIiwiX2JvaWxlclBsYXRlcyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJfbG9nZ2VyIiwicmVhZEJvaWxlclBsYXRlcyIsInNldHVwSGFuZGxlYmFycyIsImxhbmd1YWdlIiwiZ2V0IiwiZmlsdGVyIiwiYm9pbGVyUGxhdGUiLCJ0eXBlIiwiY29uZmlnRmlsZSIsImJvaWxlclBsYXRlQ29uZmlnRmlsZSIsImV4aXN0c1N5bmMiLCJqc29uIiwicmVhZEZpbGVTeW5jIiwiYm9pbGVyUGxhdGVzQXNPYmplY3RzIiwiSlNPTiIsInBhcnNlIiwiYm9pbGVyUGxhdGVzIiwiZm9yRWFjaCIsIkJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVPYmplY3QiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJkZXBlbmRlbmNpZXMiLCJsb2NhdGlvbiIsInBhdGhzTmVlZGluZ0JpbmRpbmciLCJmaWxlc05lZWRpbmdCaW5kaW5nIiwicHVzaCIsImxlbmd0aCIsIkhhbmRsZWJhcnMiLCJyZWdpc3RlckhlbHBlciIsIkd1aWQiLCJjcmVhdGUiLCJ1cmkiLCJQcm9taXNlIiwiZ2V0SnNvbiIsInRoZW4iLCJyZXN1bHQiLCJ1cmxzIiwiaXRlbSIsInJlc29sdmUiLCJnZXRGb2xkZXJzSW4iLCJ1cGRhdGVDb3VudCIsImluZm8iLCJmb2xkZXIiLCJmb3JGb2xkZXIiLCJwdWxsIiwiZXhlYyIsInByb21pc2UiLCJ1cGRhdGVCb2lsZXJQbGF0ZXNPbkRpc2siLCJnZXRBdmFpbGFibGVCb2lsZXJQbGF0ZXMiLCJuYW1lcyIsImNsb25lQ291bnQiLCJmb2xkZXJOYW1lIiwicGF0aCIsImpvaW4iLCJ1cmwiLCJzaWxlbnQiLCJjbG9uZSIsInVwZGF0ZUNvbmZpZ3VyYXRpb24iLCJzZWxmIiwiYm9pbGVyUGxhdGVzUGF0aHMiLCJzZWFyY2hSZWN1cnNpdmUiLCJjb250ZW50Rm9sZGVyIiwiYm9pbGVyUGxhdGVQYXRoIiwicGF0aHMiLCJnZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluIiwiaW5jbHVkZSIsIl8iLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJiIiwibWFwIiwic3Vic3RyIiwic3RhdCIsInN0YXRTeW5jIiwiaXNEaXJlY3RvcnkiLCJmaWxlIiwiZGlybmFtZSIsInRvSnNvbiIsImJvaWxlclBsYXRlc0FzSnNvbiIsInN0cmluZ2lmeSIsIndyaXRlRmlsZVN5bmMiLCJkZXN0aW5hdGlvbiIsImNvbnRleHQiLCJjb3B5IiwicGF0aFRvUmVuYW1lIiwic2VnbWVudHMiLCJzcGxpdCIsImNvbXBpbGUiLCJzZWdtZW50IiwicmVuYW1lU3luYyIsImNvbnRlbnQiLCJ0ZW1wbGF0ZSIsImFydGlmYWN0VGVtcGxhdGUiLCJmaWxlc1RvQ3JlYXRlIiwiZ2V0QXJ0aWZhY3RUZW1wbGF0ZUZpbGVzUmVjdXJzaXZlbHlJbiIsImluY2x1ZGVkRmlsZXMiLCJmaWxlbmFtZSIsImdsb2JhbCIsImdldEZpbGVOYW1lQW5kRXh0ZW5zaW9uIiwiZmlsZVBhdGgiLCJvbGRDb250ZW50IiwibmV3RmlsZVBhdGgiLCJuZXdDb250ZW50IiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7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Y0FBY2UsR0FBZCxDQUFrQixJQUFsQixDQUFQO0FBQ0g7Ozs0QkFnUXFCO0FBQ2xCLG1CQUFPaEIsaUJBQWlCZ0IsR0FBakIsQ0FBcUIsSUFBckIsQ0FBUDtBQUNIIiwiZmlsZSI6IkJvaWxlclBsYXRlc01hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbi9Db25maWdNYW5hZ2VyJztcbmltcG9ydCB7IEh0dHBXcmFwcGVyIH0gZnJvbSAnLi4vSHR0cFdyYXBwZXInO1xuaW1wb3J0IHsgR2l0IH0gZnJvbSAnc2ltcGxlLWdpdCc7XG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IEJvaWxlclBsYXRlIH0gZnJvbSAnLi9Cb2lsZXJQbGF0ZSc7XG5pbXBvcnQgSGFuZGxlYmFycyBmcm9tICdoYW5kbGViYXJzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCB7IEd1aWQgfSBmcm9tICcuLi9HdWlkJztcblxuY29uc3QgYm9pbGVyUGxhdGVGb2xkZXIgPSAnYm9pbGVyLXBsYXRlcyc7XG5cbmNvbnN0IGJpbmFyeUZpbGVzID0gW1xuICAgICcuanBnJyxcbiAgICAnLnBuZycsXG4gICAgJy5vYmonLFxuICAgICcuZGxsJyxcbiAgICAnLmJpbicsXG4gICAgJy5leGUnLFxuICAgICcudHRmJ1xuXTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Qm9pbGVyUGxhdGVzTWFuYWdlciwgQ29uZmlnTWFuYWdlcj59XG4gKi9cbmNvbnN0IF9jb25maWdNYW5hZ2VyID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Qm9pbGVyUGxhdGVzTWFuYWdlciwgSHR0cFdyYXBwZXI+fVxuICovXG5jb25zdCBfaHR0cFdyYXBwZXIgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxCb2lsZXJQbGF0ZXNNYW5hZ2VyLCBHaXQ+fVxuICovXG5jb25zdCBfZ2l0ID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Qm9pbGVyUGxhdGVzTWFuYWdlciwgRm9sZGVycz59XG4gKi9cbmNvbnN0IF9mb2xkZXJzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Qm9pbGVyUGxhdGVzTWFuYWdlciwgZnM+fVxuICovXG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIGJvb2xlYW4+fVxuICovXG5jb25zdCBfaGFzQm9pbGVyUGxhdGVzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Qm9pbGVyUGxhdGVzTWFuYWdlciwgQm9pbGVyUGxhdGVbXT59XG4gKi9cbmNvbnN0IF9ib2lsZXJQbGF0ZXMgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIG1hbmFnZXIgb2YgYm9pbGVyIHBsYXRlc1xuICovXG5leHBvcnQgY2xhc3MgQm9pbGVyUGxhdGVzTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0NvbmZpZ01hbmFnZXJ9IGNvbmZpZ01hbmFnZXIgXG4gICAgICogQHBhcmFtIHtIdHRwV3JhcHBlcn0gaHR0cFdyYXBwZXJcbiAgICAgKiBAcGFyYW0ge0dpdH0gZ2l0XG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXI7XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnTWFuYWdlciwgaHR0cFdyYXBwZXIsIGdpdCwgZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XG4gICAgICAgIF9jb25maWdNYW5hZ2VyLnNldCh0aGlzLCBjb25maWdNYW5hZ2VyKTtcbiAgICAgICAgX2h0dHBXcmFwcGVyLnNldCh0aGlzLCBodHRwV3JhcHBlcik7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICBfZ2l0LnNldCh0aGlzLCBnaXQpO1xuXG4gICAgICAgIGZvbGRlcnMubWFrZUZvbGRlcklmTm90RXhpc3RzKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG5cbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICB0aGlzLnJlYWRCb2lsZXJQbGF0ZXMoKTtcbiAgICAgICAgdGhpcy5zZXR1cEhhbmRsZWJhcnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGJhc2UgcGF0aCBmb3IgYm9pbGVyIHBsYXRlc1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEJhc2UgcGF0aCBvZiBib2lsZXIgcGxhdGVzXG4gICAgICovXG4gICAgZ2V0IGJvaWxlclBsYXRlTG9jYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oX2NvbmZpZ01hbmFnZXIuZ2V0KHRoaXMpLmNlbnRyYWxGb2xkZXJMb2NhdGlvbiwgYm9pbGVyUGxhdGVGb2xkZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgcGF0aCB0byB0aGUgYm9pbGVyIHBsYXRlcyBjb25maWcgZmlsZVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFBhdGggdG8gdGhlIGNvbmZpZyBmaWxlXG4gICAgICovXG4gICAgZ2V0IGJvaWxlclBsYXRlQ29uZmlnRmlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihfY29uZmlnTWFuYWdlci5nZXQodGhpcykuY2VudHJhbEZvbGRlckxvY2F0aW9uLCBcImJvaWxlci1wbGF0ZXMuanNvblwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXNcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVzKCkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzIGZvciB0aGUgbGFuZ3VhZ2VcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeUxhbmd1YWdlKGxhbmd1YWdlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5maWx0ZXIoYm9pbGVyUGxhdGUgPT4gYm9pbGVyUGxhdGUubGFuZ3VhZ2UgPT0gbGFuZ3VhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIGEgc3BlY2lmaWMgdHlwZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSB0eXBlXG4gICAgICovXG4gICAgYm9pbGVyUGxhdGVzQnlUeXBlKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS50eXBlID09IHR5cGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIGEgc3BlY2lmaWMgbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzIGZvciB0aGUgbGFuZ3VhZ2VcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZShsYW5ndWFnZSwgdHlwZSkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcykuZmlsdGVyKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLmxhbmd1YWdlID09IGxhbmd1YWdlICYmIGJvaWxlclBsYXRlLnR5cGUgPT0gdHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVhZCBhbGwgYm9pbGVyIHBsYXRlcyBmcm9tIGRpc2tcbiAgICAgKi9cbiAgICByZWFkQm9pbGVyUGxhdGVzKCkge1xuICAgICAgICBsZXQgY29uZmlnRmlsZSA9IHRoaXMuYm9pbGVyUGxhdGVDb25maWdGaWxlO1xuICAgICAgICBpZiAoX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmV4aXN0c1N5bmMoY29uZmlnRmlsZSkpIHtcbiAgICAgICAgICAgIGxldCBqc29uID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhjb25maWdGaWxlKTtcbiAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc09iamVjdHMgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlcyA9IFtdO1xuICAgICAgICAgICAgYm9pbGVyUGxhdGVzQXNPYmplY3RzLmZvckVhY2goYm9pbGVyUGxhdGVPYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IG5ldyBCb2lsZXJQbGF0ZShcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubGFuZ3VhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC50eXBlLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5kZXBlbmRlbmNpZXMsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5wYXRoc05lZWRpbmdCaW5kaW5nIHx8IFtdLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5maWxlc05lZWRpbmdCaW5kaW5nIHx8IFtdXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZXMucHVzaChib2lsZXJQbGF0ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgX2JvaWxlclBsYXRlcy5zZXQodGhpcywgYm9pbGVyUGxhdGVzKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgX2JvaWxlclBsYXRlcy5zZXQodGhpcywgW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgX2hhc0JvaWxlclBsYXRlcy5zZXQodGhpcywgX2JvaWxlclBsYXRlcy5nZXQodGhpcykubGVuZ3RoID09IDAgPyBmYWxzZTogdHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgdGhlIGhhbmRsZWJhcnMgc3lzdGVtIHdpdGggY3VzdG9tIGhlbHBlcnNcbiAgICAgKi9cbiAgICBzZXR1cEhhbmRsZWJhcnMoKSB7XG4gICAgICAgIEhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ2NyZWF0ZUd1aWQnLCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gR3VpZC5jcmVhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZyb20gR2l0SHViXG4gICAgICovXG4gICAgYXN5bmMgZ2V0QXZhaWxhYmxlQm9pbGVyUGxhdGVzKCkge1xuICAgICAgICBsZXQgdXJpID0gXCJodHRwczovL2FwaS5naXRodWIuY29tL29yZ3MvZG9saXR0bGUtYm9pbGVycGxhdGVzL3JlcG9zXCI7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIF9odHRwV3JhcHBlci5nZXQodGhpcykuZ2V0SnNvbih1cmkpLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICAgICAgbGV0IHVybHMgPSBbXTtcbiAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaChpdGVtID0+IHVybHMucHVzaChpdGVtLm5hbWUpKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHVybHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhbnkgZXhpc3RpbmcgYm9pbGVyIHBsYXRlcyBvbiBkaXNrXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlQm9pbGVyUGxhdGVzT25EaXNrKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBsZXQgZm9sZGVycyA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRGb2xkZXJzSW4odGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uKTtcbiAgICAgICAgICAgIGxldCB1cGRhdGVDb3VudCA9IGZvbGRlcnMubGVuZ3RoO1xuICAgICAgICAgICAgaWYoIHVwZGF0ZUNvdW50ID09IDAgKSByZXNvbHZlKCk7XG5cbiAgICAgICAgICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBVcGRhdGUgYm9pbGVyIHBsYXRlIGluICcke2ZvbGRlcn0nYCk7XG4gICAgICAgICAgICAgICAgX2dpdC5nZXQodGhpcykuZm9yRm9sZGVyKGZvbGRlcikucHVsbCgpLmV4ZWMoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoLS11cGRhdGVDb3VudCA9PSAwKSByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYm9pbGVyIHBsYXRlcy5cbiAgICAgKiBUaGlzIHdpbGwgdXBkYXRlIGFueSBleGlzdGluZyBhbmQgZG93bmxvYWQgYW55IG5ldyBvbmVzLlxuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oJ1VwZGF0aW5nIGFsbCBib2lsZXIgcGxhdGVzJyk7XG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpO1xuICAgICAgICAgICAgbGV0IG5hbWVzID0gYXdhaXQgdGhpcy5nZXRBdmFpbGFibGVCb2lsZXJQbGF0ZXMoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGNsb25lQ291bnQgPSAwO1xuICAgICAgICAgICAgbmFtZXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZm9sZGVyTmFtZSA9IHBhdGguam9pbih0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24sIG5hbWUpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmV4aXN0c1N5bmMoZm9sZGVyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSBgaHR0cHM6Ly9naXRodWIuY29tL2RvbGl0dGxlLWJvaWxlcnBsYXRlcy8ke25hbWV9LmdpdGA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKGBHZXR0aW5nIGJvaWxlcnBsYXRlIG5vdCBvbiBkaXNrIGZyb20gJyR7dXJsfSdgKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNsb25lQ291bnQrKztcblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgX2dpdC5nZXQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zaWxlbnQoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvbmUodXJsLCBmb2xkZXJOYW1lLCB7ICctLXJlY3Vyc2l2ZSc6IG51bGwgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5leGVjKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoLS1jbG9uZUNvdW50ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb25maWd1cmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGNvbmZpZ3VyYXRpb24gZmlsZSBvbiBkaXNrXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgZm9sZGVycyA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRGb2xkZXJzSW4odGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uKTtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlcyA9IFtdO1xuICAgICAgICBmb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IHtcbiAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZXNQYXRocyA9IF9mb2xkZXJzLmdldCh0aGlzKS5zZWFyY2hSZWN1cnNpdmUoZm9sZGVyLCAnYm9pbGVycGxhdGUuanNvbicpO1xuICAgICAgICAgICAgbGV0IGNvbnRlbnRGb2xkZXIgPSBwYXRoLmpvaW4oZm9sZGVyLCAnQ29udGVudCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBib2lsZXJQbGF0ZXNQYXRocy5mb3JFYWNoKGJvaWxlclBsYXRlUGF0aCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlT2JqZWN0ID0gSlNPTi5wYXJzZShfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGJvaWxlclBsYXRlUGF0aCwgJ3V0ZjgnKSk7XG4gICAgICAgICAgICAgICAgaWYgKGJvaWxlclBsYXRlT2JqZWN0LnR5cGUgIT0gJ2FydGlmYWN0cycpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oY29udGVudEZvbGRlcik7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhzID0gcGF0aHMuZmlsdGVyKF8gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluY2x1ZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmluYXJ5RmlsZXMuZm9yRWFjaChiID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoYikgPiAwKSBpbmNsdWRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmNsdWRlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGhzTmVlZGluZ0JpbmRpbmcgPSBwYXRocy5maWx0ZXIoXyA9PiBfLmluZGV4T2YoJ3t7JykgPiAwKS5tYXAoXyA9PiBfLnN1YnN0cihjb250ZW50Rm9sZGVyLmxlbmd0aCArIDEpKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZXNOZWVkaW5nQmluZGluZyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBwYXRocy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoXyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnJlYWRGaWxlU3luYyhfKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZS5pbmRleE9mKCd7eycpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXNOZWVkaW5nQmluZGluZy5wdXNoKF8uc3Vic3RyKGNvbnRlbnRGb2xkZXIubGVuZ3RoICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubG9jYXRpb24gPSBjb250ZW50Rm9sZGVyO1xuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5wYXRoc05lZWRpbmdCaW5kaW5nID0gcGF0aHNOZWVkaW5nQmluZGluZztcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZmlsZXNOZWVkaW5nQmluZGluZyA9IGZpbGVzTmVlZGluZ0JpbmRpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sb2NhdGlvbiA9IHBhdGguZGlybmFtZShib2lsZXJQbGF0ZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5wYXRoc05lZWRpbmdCaW5kaW5nID0gW107XG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmZpbGVzTmVlZGluZ0JpbmRpbmcgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBuZXcgQm9pbGVyUGxhdGUoXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0Lmxhbmd1YWdlIHx8ICdhbnknLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZGVwZW5kZW5jaWVzLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sb2NhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QucGF0aHNOZWVkaW5nQmluZGluZyxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZmlsZXNOZWVkaW5nQmluZGluZ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVzLnB1c2goYm9pbGVyUGxhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNPYmplY3RzID0gYm9pbGVyUGxhdGVzLm1hcChfID0+IF8udG9Kc29uKCkpO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNKc29uID0gSlNPTi5zdHJpbmdpZnkoYm9pbGVyUGxhdGVzQXNPYmplY3RzLCBudWxsLCA0KTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmModGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUsIGJvaWxlclBsYXRlc0FzSnNvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZX0gaW50byBhIHNwZWNpZmljIGRlc3RpbmF0aW9uIGZvbGRlciB3aXRoIGEgZ2l2ZW4gY29udGV4dFxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGV9IGJvaWxlclBsYXRlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dCBcbiAgICAgKi9cbiAgICBjcmVhdGVJbnN0YW5jZShib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgX2ZvbGRlcnMuZ2V0KHRoaXMpLmNvcHkoZGVzdGluYXRpb24sIGJvaWxlclBsYXRlLmxvY2F0aW9uKTtcbiAgICAgICAgYm9pbGVyUGxhdGUucGF0aHNOZWVkaW5nQmluZGluZy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgbGV0IHBhdGhUb1JlbmFtZSA9IHBhdGguam9pbihkZXN0aW5hdGlvbiwgXyk7XG4gICAgICAgICAgICBsZXQgc2VnbWVudHMgPSBbXTtcbiAgICAgICAgICAgIHBhdGhUb1JlbmFtZS5zcGxpdCgvKFxcXFx8XFwvKS8pLmZvckVhY2goc2VnbWVudCA9PiBzZWdtZW50cy5wdXNoKEhhbmRsZWJhcnMuY29tcGlsZShzZWdtZW50KShjb250ZXh0KSkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHNlZ21lbnRzLmpvaW4oJycpO1xuICAgICAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlbmFtZVN5bmMocGF0aFRvUmVuYW1lLCByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGJvaWxlclBsYXRlLmZpbGVzTmVlZGluZ0JpbmRpbmcuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgIGxldCBmaWxlID0gcGF0aC5qb2luKGRlc3RpbmF0aW9uLCBfKTtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhmaWxlLCAndXRmOCcpXG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUoY29udGVudCk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGVtcGxhdGUoY29udGV4dCk7XG4gICAgICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyhmaWxlLCByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZX0gb2YgYW4gYXJ0aWZhY3QgaW50byBhIHNwZWNpZmljIGRlc3RpbmF0aW9uIGZvbGRlciB3aXRoIGEgZ2l2ZW4gY29udGV4dFxuICAgICAqIEBwYXJhbSB7e3RlbXBsYXRlOiBhbnksIGxvY2F0aW9uOiBzdHJpbmd9fSBhcnRpZmFjdFRlbXBsYXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IFxuICAgICAqL1xuICAgIGNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoYXJ0aWZhY3RUZW1wbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgbGV0IGZpbGVzVG9DcmVhdGUgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0QXJ0aWZhY3RUZW1wbGF0ZUZpbGVzUmVjdXJzaXZlbHlJbihhcnRpZmFjdFRlbXBsYXRlLmxvY2F0aW9uLCBhcnRpZmFjdFRlbXBsYXRlLnRlbXBsYXRlLmluY2x1ZGVkRmlsZXMpO1xuXG4gICAgICAgIGZpbGVzVG9DcmVhdGUuZm9yRWFjaCggZmlsZVBhdGggPT4ge1xuICAgICAgICAgICAgY29uc3QgZmlsZW5hbWUgPSBnbG9iYWwuZ2V0RmlsZU5hbWVBbmRFeHRlbnNpb24oZmlsZVBhdGgpO1xuICAgICAgICAgICAgY29uc3Qgb2xkQ29udGVudCA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4Jyk7XG4gICAgICAgICAgICBsZXQgc2VnbWVudHMgPSBbXTtcblxuICAgICAgICAgICAgcGF0aC5qb2luKGRlc3RpbmF0aW9uLCBmaWxlbmFtZSkuc3BsaXQoLyhcXFxcfFxcLykvKS5mb3JFYWNoKHNlZ21lbnQgPT4gc2VnbWVudHMucHVzaChIYW5kbGViYXJzLmNvbXBpbGUoc2VnbWVudCkoY29udGV4dCkpKTtcbiAgICAgICAgICAgIGxldCBuZXdGaWxlUGF0aCA9IHNlZ21lbnRzLmpvaW4oJycpO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShvbGRDb250ZW50KTtcbiAgICAgICAgICAgIGxldCBuZXdDb250ZW50ID0gdGVtcGxhdGUoY29udGV4dCk7XG4gICAgICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyhuZXdGaWxlUGF0aCwgbmV3Q29udGVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgb3Igbm90IHRoZXJlIGFyZSBib2lsZXIgcGxhdGVzIGluc3RhbGxlZFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZXJlIGFyZSwgZmFsc2UgaWYgbm90XG4gICAgICovXG4gICAgZ2V0IGhhc0JvaWxlclBsYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIF9oYXNCb2lsZXJQbGF0ZXMuZ2V0KHRoaXMpO1xuICAgIH1cbn0iXX0=