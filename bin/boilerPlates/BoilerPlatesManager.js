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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var boilerPlateFolder = 'boiler-plates';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsImJpbmFyeUZpbGVzIiwiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2h0dHBXcmFwcGVyIiwiX2dpdCIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJfaGFzQm9pbGVyUGxhdGVzIiwiX2JvaWxlclBsYXRlcyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJfbG9nZ2VyIiwicmVhZEJvaWxlclBsYXRlcyIsImxhbmd1YWdlIiwiZ2V0IiwiZmlsdGVyIiwiYm9pbGVyUGxhdGUiLCJ0eXBlIiwiY29uZmlnRmlsZSIsImJvaWxlclBsYXRlQ29uZmlnRmlsZSIsImV4aXN0c1N5bmMiLCJqc29uIiwicmVhZEZpbGVTeW5jIiwiYm9pbGVyUGxhdGVzQXNPYmplY3RzIiwiSlNPTiIsInBhcnNlIiwiYm9pbGVyUGxhdGVzIiwiZm9yRWFjaCIsIkJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVPYmplY3QiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJkZXBlbmRlbmNpZXMiLCJsb2NhdGlvbiIsInBhdGhzTmVlZGluZ0JpbmRpbmciLCJmaWxlc05lZWRpbmdCaW5kaW5nIiwicHVzaCIsImxlbmd0aCIsInVyaSIsIlByb21pc2UiLCJnZXRKc29uIiwidGhlbiIsInJlc3VsdCIsInVybHMiLCJpdGVtIiwicmVzb2x2ZSIsImdldEZvbGRlcnNJbiIsInVwZGF0ZUNvdW50IiwiaW5mbyIsImZvbGRlciIsImZvckZvbGRlciIsInB1bGwiLCJleGVjIiwicHJvbWlzZSIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsIm5hbWVzIiwiY2xvbmVDb3VudCIsImZvbGRlck5hbWUiLCJwYXRoIiwiam9pbiIsInVybCIsInNpbGVudCIsImNsb25lIiwidXBkYXRlQ29uZmlndXJhdGlvbiIsInNlbGYiLCJib2lsZXJQbGF0ZXNQYXRocyIsInNlYXJjaFJlY3Vyc2l2ZSIsImNvbnRlbnRGb2xkZXIiLCJib2lsZXJQbGF0ZVBhdGgiLCJwYXRocyIsImdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4iLCJpbmNsdWRlIiwiXyIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsImIiLCJtYXAiLCJzdWJzdHIiLCJzdGF0Iiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsImZpbGUiLCJkaXJuYW1lIiwidG9Kc29uIiwiYm9pbGVyUGxhdGVzQXNKc29uIiwic3RyaW5naWZ5Iiwid3JpdGVGaWxlU3luYyIsImRlc3RpbmF0aW9uIiwiY29udGV4dCIsImNvcHkiLCJwYXRoVG9SZW5hbWUiLCJzZWdtZW50cyIsInNwbGl0IiwiSGFuZGxlYmFycyIsImNvbXBpbGUiLCJzZWdtZW50IiwicmVuYW1lU3luYyIsImNvbnRlbnQiLCJ0ZW1wbGF0ZSIsImFydGlmYWN0VGVtcGxhdGUiLCJmaWxlc1RvQ3JlYXRlIiwiZ2V0QXJ0aWZhY3RUZW1wbGF0ZUZpbGVzUmVjdXJzaXZlbHlJbiIsImluY2x1ZGVkRmlsZXMiLCJmaWxlbmFtZSIsImdsb2JhbCIsImdldEZpbGVOYW1lQW5kRXh0ZW5zaW9uIiwiZmlsZVBhdGgiLCJvbGRDb250ZW50IiwibmV3RmlsZVBhdGgiLCJuZXdDb250ZW50IiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFiQTs7OztBQWVBLElBQU1BLG9CQUFvQixlQUExQjs7QUFFQSxJQUFNQyxjQUFj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cUYsUUFBbkMsRUFBNkMsTUFBN0MsQ0FBbkI7QUFDQSxvQkFBSWYsV0FBVyxFQUFmOztBQUVBakMsK0JBQUtDLElBQUwsQ0FBVTRCLFdBQVYsRUFBdUJnQixRQUF2QixFQUFpQ1gsS0FBakMsQ0FBdUMsU0FBdkMsRUFBa0RsRSxPQUFsRCxDQUEwRDtBQUFBLDJCQUFXaUUsU0FBU3hELElBQVQsQ0FBYzBELHFCQUFXQyxPQUFYLENBQW1CQyxPQUFuQixFQUE0QlAsT0FBNUIsQ0FBZCxDQUFYO0FBQUEsaUJBQTFEO0FBQ0Esb0JBQUlvQixjQUFjakIsU0FBU2hDLElBQVQsQ0FBYyxFQUFkLENBQWxCOztBQUVBLG9CQUFJdUMsV0FBV0wscUJBQVdDLE9BQVgsQ0FBbUJhLFVBQW5CLENBQWY7QUFDQSxvQkFBSUUsYUFBYVgsU0FBU1YsT0FBVCxDQUFqQjtBQUNBM0YsNEJBQVlnQixHQUFaLENBQWdCLE1BQWhCLEVBQXNCeUUsYUFBdEIsQ0FBb0NzQixXQUFwQyxFQUFpREMsVUFBakQ7QUFDSCxhQVhEO0FBWUg7O0FBRUQ7Ozs7Ozs7NEJBdFEwQjtBQUN0QixtQkFBT25ELGVBQUtDLElBQUwsQ0FBVW5FLGVBQWVxQixHQUFmLENBQW1CLElBQW5CLEVBQXlCaUcscUJBQW5DLEVBQTBEeEgsaUJBQTFELENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJNEI7QUFDeEIsbUJBQU9vRSxlQUFLQyxJQUFMLENBQVVuRSxlQUFlcUIsR0FBZixDQUFtQixJQUFuQixFQUF5QmlHLHFCQUFuQyxFQUEwRCxvQkFBMUQsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OzRCQUltQjtBQUNmLG1CQUFPL0csY0FBY2MsR0FBZCxDQUFrQixJQUFsQixDQUFQO0FBQ0g7Ozs0QkF3UHFCO0FBQ2xCLG1CQUFPZixpQkFBaUJlLEdBQWpCLENBQXFCLElBQXJCLENBQVA7QUFDSCIsImZpbGUiOiJCb2lsZXJQbGF0ZXNNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgQ29uZmlnTWFuYWdlciB9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XG5pbXBvcnQgeyBIdHRwV3JhcHBlciB9IGZyb20gJy4uL0h0dHBXcmFwcGVyJztcbmltcG9ydCB7IEdpdCB9IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBCb2lsZXJQbGF0ZSB9IGZyb20gJy4vQm9pbGVyUGxhdGUnO1xuaW1wb3J0IEhhbmRsZWJhcnMgZnJvbSAnaGFuZGxlYmFycyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCc7XG5cbmNvbnN0IGJvaWxlclBsYXRlRm9sZGVyID0gJ2JvaWxlci1wbGF0ZXMnO1xuXG5jb25zdCBiaW5hcnlGaWxlcyA9IFtcbiAgICAnLmpwZycsXG4gICAgJy5wbmcnLFxuICAgICcub2JqJyxcbiAgICAnLmRsbCcsXG4gICAgJy5iaW4nLFxuICAgICcuZXhlJyxcbiAgICAnLnR0Zidcbl07XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIENvbmZpZ01hbmFnZXI+fVxuICovXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIEh0dHBXcmFwcGVyPn1cbiAqL1xuY29uc3QgX2h0dHBXcmFwcGVyID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQHR5cGUge1dlYWtNYXA8Qm9pbGVyUGxhdGVzTWFuYWdlciwgR2l0Pn1cbiAqL1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIEZvbGRlcnM+fVxuICovXG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIGZzPn1cbiAqL1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBAdHlwZSB7V2Vha01hcDxCb2lsZXJQbGF0ZXNNYW5hZ2VyLCBib29sZWFuPn1cbiAqL1xuY29uc3QgX2hhc0JvaWxlclBsYXRlcyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJvaWxlclBsYXRlc01hbmFnZXIsIEJvaWxlclBsYXRlW10+fVxuICovXG5jb25zdCBfYm9pbGVyUGxhdGVzID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBtYW5hZ2VyIG9mIGJvaWxlciBwbGF0ZXNcbiAqL1xuZXhwb3J0IGNsYXNzIEJvaWxlclBsYXRlc01hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0JvaWxlclBsYXRlc01hbmFnZXJ9XG4gICAgICogQHBhcmFtIHtDb25maWdNYW5hZ2VyfSBjb25maWdNYW5hZ2VyIFxuICAgICAqIEBwYXJhbSB7SHR0cFdyYXBwZXJ9IGh0dHBXcmFwcGVyXG4gICAgICogQHBhcmFtIHtHaXR9IGdpdFxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7ZnN9IGZpbGVTeXN0ZW1cbiAgICAgKiBAcGFyYW0ge0xvZ2dlcn0gbG9nZ2VyO1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ01hbmFnZXIsIGh0dHBXcmFwcGVyLCBnaXQsIGZvbGRlcnMsIGZpbGVTeXN0ZW0sIGxvZ2dlcikge1xuICAgICAgICBfY29uZmlnTWFuYWdlci5zZXQodGhpcywgY29uZmlnTWFuYWdlcik7XG4gICAgICAgIF9odHRwV3JhcHBlci5zZXQodGhpcywgaHR0cFdyYXBwZXIpO1xuICAgICAgICBfZm9sZGVycy5zZXQodGhpcywgZm9sZGVycyk7XG4gICAgICAgIF9maWxlU3lzdGVtLnNldCh0aGlzLCBmaWxlU3lzdGVtKTtcbiAgICAgICAgX2dpdC5zZXQodGhpcywgZ2l0KTtcblxuICAgICAgICBmb2xkZXJzLm1ha2VGb2xkZXJJZk5vdEV4aXN0cyh0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24pO1xuXG4gICAgICAgIHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgdGhpcy5yZWFkQm9pbGVyUGxhdGVzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBiYXNlIHBhdGggZm9yIGJvaWxlciBwbGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBCYXNlIHBhdGggb2YgYm9pbGVyIHBsYXRlc1xuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZUxvY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKS5jZW50cmFsRm9sZGVyTG9jYXRpb24sIGJvaWxlclBsYXRlRm9sZGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHBhdGggdG8gdGhlIGJvaWxlciBwbGF0ZXMgY29uZmlnIGZpbGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBQYXRoIHRvIHRoZSBjb25maWcgZmlsZVxuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUoKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oX2NvbmZpZ01hbmFnZXIuZ2V0KHRoaXMpLmNlbnRyYWxGb2xkZXJMb2NhdGlvbiwgXCJib2lsZXItcGxhdGVzLmpzb25cIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlc1xuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzXG4gICAgICovXG4gICAgZ2V0IGJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIGEgc3BlY2lmaWMgbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlcyBmb3IgdGhlIGxhbmd1YWdlXG4gICAgICovXG4gICAgYm9pbGVyUGxhdGVzQnlMYW5ndWFnZShsYW5ndWFnZSkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcykuZmlsdGVyKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLmxhbmd1YWdlID09IGxhbmd1YWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIHR5cGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzIGZvciB0aGUgdHlwZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5VHlwZSh0eXBlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5maWx0ZXIoYm9pbGVyUGxhdGUgPT4gYm9pbGVyUGxhdGUudHlwZSA9PSB0eXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlcyBmb3IgdGhlIGxhbmd1YWdlXG4gICAgICovXG4gICAgYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUobGFuZ3VhZ2UsIHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS5sYW5ndWFnZSA9PSBsYW5ndWFnZSAmJiBib2lsZXJQbGF0ZS50eXBlID09IHR5cGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWQgYWxsIGJvaWxlciBwbGF0ZXMgZnJvbSBkaXNrXG4gICAgICovXG4gICAgcmVhZEJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgbGV0IGNvbmZpZ0ZpbGUgPSB0aGlzLmJvaWxlclBsYXRlQ29uZmlnRmlsZTtcbiAgICAgICAgaWYgKF9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGNvbmZpZ0ZpbGUpKSB7XG4gICAgICAgICAgICBsZXQganNvbiA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoY29uZmlnRmlsZSk7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNPYmplY3RzID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZXMgPSBbXTtcbiAgICAgICAgICAgIGJvaWxlclBsYXRlc0FzT2JqZWN0cy5mb3JFYWNoKGJvaWxlclBsYXRlT2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBuZXcgQm9pbGVyUGxhdGUoXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0Lmxhbmd1YWdlLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZGVwZW5kZW5jaWVzLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sb2NhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QucGF0aHNOZWVkaW5nQmluZGluZyB8fCBbXSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZmlsZXNOZWVkaW5nQmluZGluZyB8fCBbXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVzLnB1c2goYm9pbGVyUGxhdGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXMuc2V0KHRoaXMsIGJvaWxlclBsYXRlcyk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXMuc2V0KHRoaXMsIFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9oYXNCb2lsZXJQbGF0ZXMuc2V0KHRoaXMsIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmxlbmd0aCA9PSAwID8gZmFsc2U6IHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmcm9tIEdpdEh1YlxuICAgICAqL1xuICAgIGFzeW5jIGdldEF2YWlsYWJsZUJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgbGV0IHVyaSA9IFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9vcmdzL2RvbGl0dGxlLWJvaWxlcnBsYXRlcy9yZXBvc1wiO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBfaHR0cFdyYXBwZXIuZ2V0KHRoaXMpLmdldEpzb24odXJpKS50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgICAgIGxldCB1cmxzID0gW107XG4gICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goaXRlbSA9PiB1cmxzLnB1c2goaXRlbS5uYW1lKSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh1cmxzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW55IGV4aXN0aW5nIGJvaWxlciBwbGF0ZXMgb24gZGlza1xuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgbGV0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG4gICAgICAgICAgICBsZXQgdXBkYXRlQ291bnQgPSBmb2xkZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmKCB1cGRhdGVDb3VudCA9PSAwICkgcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBmb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgVXBkYXRlIGJvaWxlciBwbGF0ZSBpbiAnJHtmb2xkZXJ9J2ApO1xuICAgICAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpLmZvckZvbGRlcihmb2xkZXIpLnB1bGwoKS5leGVjKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC0tdXBkYXRlQ291bnQgPT0gMCkgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGJvaWxlciBwbGF0ZXMuXG4gICAgICogVGhpcyB3aWxsIHVwZGF0ZSBhbnkgZXhpc3RpbmcgYW5kIGRvd25sb2FkIGFueSBuZXcgb25lcy5cbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdVcGRhdGluZyBhbGwgYm9pbGVyIHBsYXRlcycpO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVCb2lsZXJQbGF0ZXNPbkRpc2soKTtcbiAgICAgICAgICAgIGxldCBuYW1lcyA9IGF3YWl0IHRoaXMuZ2V0QXZhaWxhYmxlQm9pbGVyUGxhdGVzKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBjbG9uZUNvdW50ID0gMDtcbiAgICAgICAgICAgIG5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvbGRlck5hbWUgPSBwYXRoLmpvaW4odGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uLCBuYW1lKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIV9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGZvbGRlck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gYGh0dHBzOi8vZ2l0aHViLmNvbS9kb2xpdHRsZS1ib2lsZXJwbGF0ZXMvJHtuYW1lfS5naXRgO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgR2V0dGluZyBib2lsZXJwbGF0ZSBub3Qgb24gZGlzayBmcm9tICcke3VybH0nYCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjbG9uZUNvdW50Kys7XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2lsZW50KGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb25lKHVybCwgZm9sZGVyTmFtZSwgeyAnLS1yZWN1cnNpdmUnOiBudWxsIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhlYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC0tY2xvbmVDb3VudCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29uZmlndXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBjb25maWd1cmF0aW9uIGZpbGUgb24gZGlza1xuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXMgPSBbXTtcbiAgICAgICAgZm9sZGVycy5mb3JFYWNoKGZvbGRlciA9PiB7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzUGF0aHMgPSBfZm9sZGVycy5nZXQodGhpcykuc2VhcmNoUmVjdXJzaXZlKGZvbGRlciwgJ2JvaWxlcnBsYXRlLmpzb24nKTtcbiAgICAgICAgICAgIGxldCBjb250ZW50Rm9sZGVyID0gcGF0aC5qb2luKGZvbGRlciwgJ0NvbnRlbnQnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYm9pbGVyUGxhdGVzUGF0aHMuZm9yRWFjaChib2lsZXJQbGF0ZVBhdGggPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZU9iamVjdCA9IEpTT04ucGFyc2UoX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhib2lsZXJQbGF0ZVBhdGgsICd1dGY4JykpO1xuICAgICAgICAgICAgICAgIGlmIChib2lsZXJQbGF0ZU9iamVjdC50eXBlICE9ICdhcnRpZmFjdHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluKGNvbnRlbnRGb2xkZXIpO1xuICAgICAgICAgICAgICAgICAgICBwYXRocyA9IHBhdGhzLmZpbHRlcihfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeUZpbGVzLmZvckVhY2goYiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8udG9Mb3dlckNhc2UoKS5pbmRleE9mKGIpID4gMCkgaW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5jbHVkZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRoc05lZWRpbmdCaW5kaW5nID0gcGF0aHMuZmlsdGVyKF8gPT4gXy5pbmRleE9mKCd7eycpID4gMCkubWFwKF8gPT4gXy5zdWJzdHIoY29udGVudEZvbGRlci5sZW5ndGggKyAxKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVzTmVlZGluZ0JpbmRpbmcgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgcGF0aHMuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGF0ID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnN0YXRTeW5jKF8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5yZWFkRmlsZVN5bmMoXyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUuaW5kZXhPZigne3snKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzTmVlZGluZ0JpbmRpbmcucHVzaChfLnN1YnN0cihjb250ZW50Rm9sZGVyLmxlbmd0aCArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uID0gY29udGVudEZvbGRlcjtcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QucGF0aHNOZWVkaW5nQmluZGluZyA9IHBhdGhzTmVlZGluZ0JpbmRpbmc7XG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmZpbGVzTmVlZGluZ0JpbmRpbmcgPSBmaWxlc05lZWRpbmdCaW5kaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubG9jYXRpb24gPSBwYXRoLmRpcm5hbWUoYm9pbGVyUGxhdGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QucGF0aHNOZWVkaW5nQmluZGluZyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5maWxlc05lZWRpbmdCaW5kaW5nID0gW107XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gbmV3IEJvaWxlclBsYXRlKFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sYW5ndWFnZSB8fCAnYW55JyxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmRlcGVuZGVuY2llcyxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnBhdGhzTmVlZGluZ0JpbmRpbmcsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmZpbGVzTmVlZGluZ0JpbmRpbmdcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlcy5wdXNoKGJvaWxlclBsYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlc0FzT2JqZWN0cyA9IGJvaWxlclBsYXRlcy5tYXAoXyA9PiBfLnRvSnNvbigpKTtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlc0FzSnNvbiA9IEpTT04uc3RyaW5naWZ5KGJvaWxlclBsYXRlc0FzT2JqZWN0cywgbnVsbCwgNCk7XG4gICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS53cml0ZUZpbGVTeW5jKHRoaXMuYm9pbGVyUGxhdGVDb25maWdGaWxlLCBib2lsZXJQbGF0ZXNBc0pzb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB7Qm9pbGVyUGxhdGV9IGludG8gYSBzcGVjaWZpYyBkZXN0aW5hdGlvbiBmb2xkZXIgd2l0aCBhIGdpdmVuIGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlfSBib2lsZXJQbGF0ZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb24gXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHQgXG4gICAgICovXG4gICAgY3JlYXRlSW5zdGFuY2UoYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIF9mb2xkZXJzLmdldCh0aGlzKS5jb3B5KGRlc3RpbmF0aW9uLCBib2lsZXJQbGF0ZS5sb2NhdGlvbik7XG4gICAgICAgIGJvaWxlclBsYXRlLnBhdGhzTmVlZGluZ0JpbmRpbmcuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgIGxldCBwYXRoVG9SZW5hbWUgPSBwYXRoLmpvaW4oZGVzdGluYXRpb24sIF8pO1xuICAgICAgICAgICAgbGV0IHNlZ21lbnRzID0gW107XG4gICAgICAgICAgICBwYXRoVG9SZW5hbWUuc3BsaXQoLyhcXFxcfFxcLykvKS5mb3JFYWNoKHNlZ21lbnQgPT4gc2VnbWVudHMucHVzaChIYW5kbGViYXJzLmNvbXBpbGUoc2VnbWVudCkoY29udGV4dCkpKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBzZWdtZW50cy5qb2luKCcnKTtcbiAgICAgICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZW5hbWVTeW5jKHBhdGhUb1JlbmFtZSwgcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBib2lsZXJQbGF0ZS5maWxlc05lZWRpbmdCaW5kaW5nLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICBsZXQgZmlsZSA9IHBhdGguam9pbihkZXN0aW5hdGlvbiwgXyk7XG4gICAgICAgICAgICBsZXQgY29udGVudCA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoZmlsZSwgJ3V0ZjgnKVxuICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKGNvbnRlbnQpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRlbXBsYXRlKGNvbnRleHQpO1xuICAgICAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmMoZmlsZSwgcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB7Qm9pbGVyUGxhdGV9IG9mIGFuIGFydGlmYWN0IGludG8gYSBzcGVjaWZpYyBkZXN0aW5hdGlvbiBmb2xkZXIgd2l0aCBhIGdpdmVuIGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge3t0ZW1wbGF0ZTogYW55LCBsb2NhdGlvbjogc3RyaW5nfX0gYXJ0aWZhY3RUZW1wbGF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dCBcbiAgICAgKi9cbiAgICBjcmVhdGVBcnRpZmFjdEluc3RhbmNlKGFydGlmYWN0VGVtcGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIGxldCBmaWxlc1RvQ3JlYXRlID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEFydGlmYWN0VGVtcGxhdGVGaWxlc1JlY3Vyc2l2ZWx5SW4oYXJ0aWZhY3RUZW1wbGF0ZS5sb2NhdGlvbiwgYXJ0aWZhY3RUZW1wbGF0ZS50ZW1wbGF0ZS5pbmNsdWRlZEZpbGVzKTtcblxuICAgICAgICBmaWxlc1RvQ3JlYXRlLmZvckVhY2goIGZpbGVQYXRoID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVuYW1lID0gZ2xvYmFsLmdldEZpbGVOYW1lQW5kRXh0ZW5zaW9uKGZpbGVQYXRoKTtcbiAgICAgICAgICAgIGNvbnN0IG9sZENvbnRlbnQgPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmOCcpO1xuICAgICAgICAgICAgbGV0IHNlZ21lbnRzID0gW107XG5cbiAgICAgICAgICAgIHBhdGguam9pbihkZXN0aW5hdGlvbiwgZmlsZW5hbWUpLnNwbGl0KC8oXFxcXHxcXC8pLykuZm9yRWFjaChzZWdtZW50ID0+IHNlZ21lbnRzLnB1c2goSGFuZGxlYmFycy5jb21waWxlKHNlZ21lbnQpKGNvbnRleHQpKSk7XG4gICAgICAgICAgICBsZXQgbmV3RmlsZVBhdGggPSBzZWdtZW50cy5qb2luKCcnKTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUob2xkQ29udGVudCk7XG4gICAgICAgICAgICBsZXQgbmV3Q29udGVudCA9IHRlbXBsYXRlKGNvbnRleHQpO1xuICAgICAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmMobmV3RmlsZVBhdGgsIG5ld0NvbnRlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogR2V0cyB3aGV0aGVyIG9yIG5vdCB0aGVyZSBhcmUgYm9pbGVyIHBsYXRlcyBpbnN0YWxsZWRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGVyZSBhcmUsIGZhbHNlIGlmIG5vdFxuICAgICAqL1xuICAgIGdldCBoYXNCb2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIHJldHVybiBfaGFzQm9pbGVyUGxhdGVzLmdldCh0aGlzKTtcbiAgICB9XG59Il19