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


var binaryFiles = ['.jpg', '.png', '.obj', '.dll', '.bin', '.exe', '.ttf'];

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
                                    var boilerPlatesPaths = _folders.get(_this4).searchRecursive(folder, 'boilerplate.json');
                                    var contentFolder = _path2.default.join(folder, 'Content');

                                    boilerPlatesPaths.forEach(function (boilerPlatePath) {
                                        var boilerPlateObject = JSON.parse(_fileSystem.get(_this4).readFileSync(boilerPlatePath, 'utf8'));
                                        if (boilerPlateObject.type != 'artifacts') {
                                            var paths = _folders.get(_this4).getFoldersAndFilesRecursivelyIn(contentFolder);
                                            paths = paths.filter(function (_) {
                                                var isBinary = false;
                                                binaryFiles.forEach(function (b) {
                                                    if (_.toLowerCase().indexOf(b) > 0) isBinary = true;
                                                });
                                                return isBinary;
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

                                        var boilerPlate = new _BoilerPlate.BoilerPlate(boilerPlateObject.language || 'any', boilerPlateObject.name, boilerPlateObject.description, boilerPlateObject.type, boilerPlateObject.location, boilerPlateObject.pathsNeedingBinding, boilerPlateObject.filesNeedingBinding);
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
         * @param {string} artifactType 
         * @param {string} artifactLanguage 
         * @param {BoilerPlate} boilerPlate 
         * @param {string} destination 
         * @param {object} context 
         */

    }, {
        key: 'createArtifactInstance',
        value: function createArtifactInstance(artifactType, artifactLanguage, boilerPlate, destination, context) {
            var _this6 = this;

            var templateFiles = _folders.get(this).searchRecursive(boilerPlate.location, 'template.json');
            var templatesAndLocation = [];
            templateFiles.forEach(function (_) {
                var lastPathSeparatorMatch = _.match(/(\\|\/)/);
                var lastIndex = _.lastIndexOf(lastPathSeparatorMatch[lastPathSeparatorMatch.length - 1]);
                var template = {
                    'template': JSON.parse(_fileSystem.get(_this6).readFileSync(_, 'utf8')),
                    'location': _.substring(0, lastIndex + 1)
                };
                templatesAndLocation.push(template);
            });
            var template = templatesAndLocation.filter(function (template) {
                return template.template.type == artifactType && template.template.language == artifactLanguage;
            })[0];
            if (template === undefined || template === null) {
                this._logger.error('Could not find template.json for artifact with language \'' + artifactLanguage + '\' and type \'' + artifactType + '\'');
                process.exit(1);
            }
            var filesToCreate = _folders.get(this).getArtifactTemplateFilesRecursivelyIn(template.location, template.template.includedFiles);

            filesToCreate.forEach(function (filePath) {
                var lastPathSeparatorMatch = filePath.match(/(\\|\/)/);
                var lastIndex = filePath.lastIndexOf(lastPathSeparatorMatch[lastPathSeparatorMatch.length - 1]);
                var filename = filePath.substring(lastIndex + 1, filePath.length);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsImJpbmFyeUZpbGVzIiwiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2h0dHBXcmFwcGVyIiwiX2dpdCIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJfaGFzQm9pbGVyUGxhdGVzIiwiX2JvaWxlclBsYXRlcyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJfbG9nZ2VyIiwicmVhZEJvaWxlclBsYXRlcyIsImxhbmd1YWdlIiwiZ2V0IiwiZmlsdGVyIiwiYm9pbGVyUGxhdGUiLCJ0eXBlIiwiY29uZmlnRmlsZSIsImJvaWxlclBsYXRlQ29uZmlnRmlsZSIsImV4aXN0c1N5bmMiLCJqc29uIiwicmVhZEZpbGVTeW5jIiwiYm9pbGVyUGxhdGVzQXNPYmplY3RzIiwiSlNPTiIsInBhcnNlIiwiYm9pbGVyUGxhdGVzIiwiZm9yRWFjaCIsIkJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVPYmplY3QiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJsb2NhdGlvbiIsInBhdGhzTmVlZGluZ0JpbmRpbmciLCJmaWxlc05lZWRpbmdCaW5kaW5nIiwicHVzaCIsImxlbmd0aCIsInVyaSIsIlByb21pc2UiLCJnZXRKc29uIiwidGhlbiIsInJlc3VsdCIsInVybHMiLCJpdGVtIiwicmVzb2x2ZSIsImdldEZvbGRlcnNJbiIsInVwZGF0ZUNvdW50IiwiaW5mbyIsImZvbGRlciIsImZvckZvbGRlciIsInB1bGwiLCJleGVjIiwicHJvbWlzZSIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsIm5hbWVzIiwiY2xvbmVDb3VudCIsImZvbGRlck5hbWUiLCJwYXRoIiwiam9pbiIsInVybCIsInNpbGVudCIsImNsb25lIiwidXBkYXRlQ29uZmlndXJhdGlvbiIsInNlbGYiLCJib2lsZXJQbGF0ZXNQYXRocyIsInNlYXJjaFJlY3Vyc2l2ZSIsImNvbnRlbnRGb2xkZXIiLCJib2lsZXJQbGF0ZVBhdGgiLCJwYXRocyIsImdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4iLCJpc0JpbmFyeSIsIl8iLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJiIiwibWFwIiwic3Vic3RyIiwic3RhdCIsInN0YXRTeW5jIiwiaXNEaXJlY3RvcnkiLCJmaWxlIiwiZGlybmFtZSIsInRvSnNvbiIsImJvaWxlclBsYXRlc0FzSnNvbiIsInN0cmluZ2lmeSIsIndyaXRlRmlsZVN5bmMiLCJkZXN0aW5hdGlvbiIsImNvbnRleHQiLCJjb3B5IiwicGF0aFRvUmVuYW1lIiwic2VnbWVudHMiLCJzcGxpdCIsIkhhbmRsZWJhcnMiLCJjb21waWxlIiwic2VnbWVudCIsInJlbmFtZVN5bmMiLCJjb250ZW50IiwidGVtcGxhdGUiLCJhcnRpZmFjdFR5cGUiLCJhcnRpZmFjdExhbmd1YWdlIiwidGVtcGxhdGVGaWxlcyIsInRlbXBsYXRlc0FuZExvY2F0aW9uIiwibGFzdFBhdGhTZXBhcmF0b3JNYXRjaCIsIm1hdGNoIiwibGFzdEluZGV4IiwibGFzdEluZGV4T2YiLCJzdWJzdHJpbmciLCJ1bmRlZmluZWQiLCJlcnJvciIsInByb2Nlc3MiLCJleGl0IiwiZmlsZXNUb0NyZWF0ZSIsImdldEFydGlmYWN0VGVtcGxhdGVGaWxlc1JlY3Vyc2l2ZWx5SW4iLCJpbmNsdWRlZEZpbGVzIiwiZmlsZVBhdGgiLCJmaWxlbmFtZSIsIm9sZENvbnRlbnQiLCJuZXdGaWxlUGF0aCIsIm5ld0NvbnRlbnQiLCJjZW50cmFsRm9sZGVyTG9jYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7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QUFqQixDQUFxQixJQUFyQixDQUFQO0FBQ0giLCJmaWxlIjoiQm9pbGVyUGxhdGVzTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IENvbmZpZ01hbmFnZXIgfSBmcm9tICcuLi9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0IHsgSHR0cFdyYXBwZXIgfSBmcm9tICcuLi9IdHRwV3JhcHBlcic7XG5pbXBvcnQgeyBHaXQgfSBmcm9tICdzaW1wbGUtZ2l0JztcbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQm9pbGVyUGxhdGUgfSBmcm9tICcuL0JvaWxlclBsYXRlJztcbmltcG9ydCBIYW5kbGViYXJzIGZyb20gJ2hhbmRsZWJhcnMnO1xuXG5jb25zdCBib2lsZXJQbGF0ZUZvbGRlciA9ICdib2lsZXItcGxhdGVzJztcblxuY29uc3QgYmluYXJ5RmlsZXMgPSBbXG4gICAgJy5qcGcnLFxuICAgICcucG5nJyxcbiAgICAnLm9iaicsXG4gICAgJy5kbGwnLFxuICAgICcuYmluJyxcbiAgICAnLmV4ZScsXG4gICAgJy50dGYnXG5dO1xuXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaHR0cFdyYXBwZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaGFzQm9pbGVyUGxhdGVzID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgX2JvaWxlclBsYXRlcyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgbWFuYWdlciBvZiBib2lsZXIgcGxhdGVzXG4gKi9cbmV4cG9ydCBjbGFzcyBCb2lsZXJQbGF0ZXNNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7Q29uZmlnTWFuYWdlcn0gY29uZmlnTWFuYWdlciBcbiAgICAgKiBAcGFyYW0ge0h0dHBXcmFwcGVyfSBodHRwV3JhcHBlclxuICAgICAqIEBwYXJhbSB7R2l0fSBnaXRcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnNcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlcjtcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWdNYW5hZ2VyLCBodHRwV3JhcHBlciwgZ2l0LCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2NvbmZpZ01hbmFnZXIuc2V0KHRoaXMsIGNvbmZpZ01hbmFnZXIpO1xuICAgICAgICBfaHR0cFdyYXBwZXIuc2V0KHRoaXMsIGh0dHBXcmFwcGVyKTtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIF9naXQuc2V0KHRoaXMsIGdpdCk7XG5cbiAgICAgICAgZm9sZGVycy5tYWtlRm9sZGVySWZOb3RFeGlzdHModGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uKTtcblxuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIHRoaXMucmVhZEJvaWxlclBsYXRlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYmFzZSBwYXRoIGZvciBib2lsZXIgcGxhdGVzXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQmFzZSBwYXRoIG9mIGJvaWxlciBwbGF0ZXNcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVMb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihfY29uZmlnTWFuYWdlci5nZXQodGhpcykuY2VudHJhbEZvbGRlckxvY2F0aW9uLCBib2lsZXJQbGF0ZUZvbGRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBwYXRoIHRvIHRoZSBib2lsZXIgcGxhdGVzIGNvbmZpZyBmaWxlXG4gICAgICogQHJldHVybnMge3N0cmluZ30gUGF0aCB0byB0aGUgY29uZmlnIGZpbGVcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVDb25maWdGaWxlKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKS5jZW50cmFsRm9sZGVyTG9jYXRpb24sIFwiYm9pbGVyLXBsYXRlcy5qc29uXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlc1xuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2UobGFuZ3VhZ2UpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS5sYW5ndWFnZSA9PSBsYW5ndWFnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlcyBmb3IgdGhlIHR5cGVcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeVR5cGUodHlwZSkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcykuZmlsdGVyKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLnR5cGUgPT0gdHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKGxhbmd1YWdlLCB0eXBlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5maWx0ZXIoYm9pbGVyUGxhdGUgPT4gYm9pbGVyUGxhdGUubGFuZ3VhZ2UgPT0gbGFuZ3VhZ2UgJiYgYm9pbGVyUGxhdGUudHlwZSA9PSB0eXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGFsbCBib2lsZXIgcGxhdGVzIGZyb20gZGlza1xuICAgICAqL1xuICAgIHJlYWRCb2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIGxldCBjb25maWdGaWxlID0gdGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGU7XG4gICAgICAgIGlmIChfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhjb25maWdGaWxlKSkge1xuICAgICAgICAgICAgbGV0IGpzb24gPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGNvbmZpZ0ZpbGUpO1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlc0FzT2JqZWN0cyA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gW107XG5cblxuICAgICAgICAgICAgYm9pbGVyUGxhdGVzQXNPYmplY3RzLmZvckVhY2goYm9pbGVyUGxhdGVPYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IG5ldyBCb2lsZXJQbGF0ZShcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubGFuZ3VhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC50eXBlLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sb2NhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QucGF0aHNOZWVkaW5nQmluZGluZyB8fCBbXSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZmlsZXNOZWVkaW5nQmluZGluZyB8fCBbXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVzLnB1c2goYm9pbGVyUGxhdGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXMuc2V0KHRoaXMsIGJvaWxlclBsYXRlcyk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXMuc2V0KHRoaXMsIFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9oYXNCb2lsZXJQbGF0ZXMuc2V0KHRoaXMsIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmxlbmd0aCA9PSAwID8gZmFsc2U6IHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmcm9tIEdpdEh1YlxuICAgICAqL1xuICAgIGFzeW5jIGdldEF2YWlsYWJsZUJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgbGV0IHVyaSA9IFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9vcmdzL2RvbGl0dGxlLWJvaWxlcnBsYXRlcy9yZXBvc1wiO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBfaHR0cFdyYXBwZXIuZ2V0KHRoaXMpLmdldEpzb24odXJpKS50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgICAgIGxldCB1cmxzID0gW107XG4gICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goaXRlbSA9PiB1cmxzLnB1c2goaXRlbS5uYW1lKSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh1cmxzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW55IGV4aXN0aW5nIGJvaWxlciBwbGF0ZXMgb24gZGlza1xuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgbGV0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG4gICAgICAgICAgICBsZXQgdXBkYXRlQ291bnQgPSBmb2xkZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmKCB1cGRhdGVDb3VudCA9PSAwICkgcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBmb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgVXBkYXRlIGJvaWxlciBwbGF0ZSBpbiAnJHtmb2xkZXJ9J2ApO1xuICAgICAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpLmZvckZvbGRlcihmb2xkZXIpLnB1bGwoKS5leGVjKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC0tdXBkYXRlQ291bnQgPT0gMCkgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGJvaWxlciBwbGF0ZXMuXG4gICAgICogVGhpcyB3aWxsIHVwZGF0ZSBhbnkgZXhpc3RpbmcgYW5kIGRvd25sb2FkIGFueSBuZXcgb25lcy5cbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdVcGRhdGluZyBhbGwgYm9pbGVyIHBsYXRlcycpO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVCb2lsZXJQbGF0ZXNPbkRpc2soKTtcbiAgICAgICAgICAgIGxldCBuYW1lcyA9IGF3YWl0IHRoaXMuZ2V0QXZhaWxhYmxlQm9pbGVyUGxhdGVzKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBjbG9uZUNvdW50ID0gMDtcbiAgICAgICAgICAgIG5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvbGRlck5hbWUgPSBwYXRoLmpvaW4odGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uLCBuYW1lKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIV9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGZvbGRlck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gYGh0dHBzOi8vZ2l0aHViLmNvbS9kb2xpdHRsZS1ib2lsZXJwbGF0ZXMvJHtuYW1lfS5naXRgO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgR2V0dGluZyBib2lsZXJwbGF0ZSBub3Qgb24gZGlzayBmcm9tICcke3VybH0nYCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjbG9uZUNvdW50Kys7XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2lsZW50KGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb25lKHVybCwgZm9sZGVyTmFtZSwgeyAnLS1yZWN1cnNpdmUnOiBudWxsIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhlYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC0tY2xvbmVDb3VudCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29uZmlndXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBjb25maWd1cmF0aW9uIGZpbGUgb24gZGlza1xuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXMgPSBbXTtcbiAgICAgICAgZm9sZGVycy5mb3JFYWNoKGZvbGRlciA9PiB7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzUGF0aHMgPSBfZm9sZGVycy5nZXQodGhpcykuc2VhcmNoUmVjdXJzaXZlKGZvbGRlciwgJ2JvaWxlcnBsYXRlLmpzb24nKTtcbiAgICAgICAgICAgIGxldCBjb250ZW50Rm9sZGVyID0gcGF0aC5qb2luKGZvbGRlciwgJ0NvbnRlbnQnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYm9pbGVyUGxhdGVzUGF0aHMuZm9yRWFjaChib2lsZXJQbGF0ZVBhdGggPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZU9iamVjdCA9IEpTT04ucGFyc2UoX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhib2lsZXJQbGF0ZVBhdGgsICd1dGY4JykpO1xuICAgICAgICAgICAgICAgIGlmIChib2lsZXJQbGF0ZU9iamVjdC50eXBlICE9ICdhcnRpZmFjdHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluKGNvbnRlbnRGb2xkZXIpO1xuICAgICAgICAgICAgICAgICAgICBwYXRocyA9IHBhdGhzLmZpbHRlcihfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc0JpbmFyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmluYXJ5RmlsZXMuZm9yRWFjaChiID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoYikgPiAwKSBpc0JpbmFyeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc0JpbmFyeTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRoc05lZWRpbmdCaW5kaW5nID0gcGF0aHMuZmlsdGVyKF8gPT4gXy5pbmRleE9mKCd7eycpID4gMCkubWFwKF8gPT4gXy5zdWJzdHIoY29udGVudEZvbGRlci5sZW5ndGggKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxlc05lZWRpbmdCaW5kaW5nID0gW107XG4gICAgICAgICAgICAgICAgICAgIHBhdGhzLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhfKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGUgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikucmVhZEZpbGVTeW5jKF8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLmluZGV4T2YoJ3t7JykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlc05lZWRpbmdCaW5kaW5nLnB1c2goXy5zdWJzdHIoY29udGVudEZvbGRlci5sZW5ndGggKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubG9jYXRpb24gPSBjb250ZW50Rm9sZGVyO1xuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5wYXRoc05lZWRpbmdCaW5kaW5nID0gcGF0aHNOZWVkaW5nQmluZGluZztcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZmlsZXNOZWVkaW5nQmluZGluZyA9IGZpbGVzTmVlZGluZ0JpbmRpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sb2NhdGlvbiA9IHBhdGguZGlybmFtZShib2lsZXJQbGF0ZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5wYXRoc05lZWRpbmdCaW5kaW5nID0gW107XG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmZpbGVzTmVlZGluZ0JpbmRpbmcgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBuZXcgQm9pbGVyUGxhdGUoXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0Lmxhbmd1YWdlIHx8ICdhbnknLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnBhdGhzTmVlZGluZ0JpbmRpbmcsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmZpbGVzTmVlZGluZ0JpbmRpbmdcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlcy5wdXNoKGJvaWxlclBsYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlc0FzT2JqZWN0cyA9IGJvaWxlclBsYXRlcy5tYXAoXyA9PiBfLnRvSnNvbigpKTtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlc0FzSnNvbiA9IEpTT04uc3RyaW5naWZ5KGJvaWxlclBsYXRlc0FzT2JqZWN0cywgbnVsbCwgNCk7XG4gICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS53cml0ZUZpbGVTeW5jKHRoaXMuYm9pbGVyUGxhdGVDb25maWdGaWxlLCBib2lsZXJQbGF0ZXNBc0pzb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB7Qm9pbGVyUGxhdGV9IGludG8gYSBzcGVjaWZpYyBkZXN0aW5hdGlvbiBmb2xkZXIgd2l0aCBhIGdpdmVuIGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlfSBib2lsZXJQbGF0ZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb24gXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHQgXG4gICAgICovXG4gICAgY3JlYXRlSW5zdGFuY2UoYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIF9mb2xkZXJzLmdldCh0aGlzKS5jb3B5KGRlc3RpbmF0aW9uLCBib2lsZXJQbGF0ZS5sb2NhdGlvbik7XG4gICAgICAgIGJvaWxlclBsYXRlLnBhdGhzTmVlZGluZ0JpbmRpbmcuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgIGxldCBwYXRoVG9SZW5hbWUgPSBwYXRoLmpvaW4oZGVzdGluYXRpb24sIF8pO1xuICAgICAgICAgICAgbGV0IHNlZ21lbnRzID0gW107XG4gICAgICAgICAgICBwYXRoVG9SZW5hbWUuc3BsaXQoLyhcXFxcfFxcLykvKS5mb3JFYWNoKHNlZ21lbnQgPT4gc2VnbWVudHMucHVzaChIYW5kbGViYXJzLmNvbXBpbGUoc2VnbWVudCkoY29udGV4dCkpKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBzZWdtZW50cy5qb2luKCcnKTtcbiAgICAgICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZW5hbWVTeW5jKHBhdGhUb1JlbmFtZSwgcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBib2lsZXJQbGF0ZS5maWxlc05lZWRpbmdCaW5kaW5nLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICBsZXQgZmlsZSA9IHBhdGguam9pbihkZXN0aW5hdGlvbiwgXyk7XG5cbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhmaWxlLCAndXRmOCcpXG4gICAgICAgICAgICBsZXQgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUoY29udGVudCk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGVtcGxhdGUoY29udGV4dCk7XG4gICAgICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyhmaWxlLCByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZX0gb2YgYW4gYXJ0aWZhY3QgaW50byBhIHNwZWNpZmljIGRlc3RpbmF0aW9uIGZvbGRlciB3aXRoIGEgZ2l2ZW4gY29udGV4dFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhcnRpZmFjdFR5cGUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFydGlmYWN0TGFuZ3VhZ2UgXG4gICAgICogQHBhcmFtIHtCb2lsZXJQbGF0ZX0gYm9pbGVyUGxhdGUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IFxuICAgICAqL1xuICAgIGNyZWF0ZUFydGlmYWN0SW5zdGFuY2UoYXJ0aWZhY3RUeXBlLCBhcnRpZmFjdExhbmd1YWdlLCBib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgbGV0IHRlbXBsYXRlRmlsZXMgPSBfZm9sZGVycy5nZXQodGhpcykuc2VhcmNoUmVjdXJzaXZlKGJvaWxlclBsYXRlLmxvY2F0aW9uLCAndGVtcGxhdGUuanNvbicpO1xuICAgICAgICBsZXQgdGVtcGxhdGVzQW5kTG9jYXRpb24gPSBbXTtcbiAgICAgICAgdGVtcGxhdGVGaWxlcy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFzdFBhdGhTZXBhcmF0b3JNYXRjaCA9IF8ubWF0Y2goLyhcXFxcfFxcLykvKTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IF8ubGFzdEluZGV4T2YobGFzdFBhdGhTZXBhcmF0b3JNYXRjaFtsYXN0UGF0aFNlcGFyYXRvck1hdGNoLmxlbmd0aC0xXSk7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAndGVtcGxhdGUnOiBKU09OLnBhcnNlKF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoXywgJ3V0ZjgnKSksXG4gICAgICAgICAgICAgICAgJ2xvY2F0aW9uJzogXy5zdWJzdHJpbmcoMCwgbGFzdEluZGV4KzEpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGVtcGxhdGVzQW5kTG9jYXRpb24ucHVzaCh0ZW1wbGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRlbXBsYXRlc0FuZExvY2F0aW9uLmZpbHRlcih0ZW1wbGF0ZSA9PiB0ZW1wbGF0ZS50ZW1wbGF0ZS50eXBlID09IGFydGlmYWN0VHlwZSAmJiB0ZW1wbGF0ZS50ZW1wbGF0ZS5sYW5ndWFnZSA9PSBhcnRpZmFjdExhbmd1YWdlKVswXTtcbiAgICAgICAgaWYgKHRlbXBsYXRlID09PSB1bmRlZmluZWQgfHwgdGVtcGxhdGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvZ2dlci5lcnJvcihgQ291bGQgbm90IGZpbmQgdGVtcGxhdGUuanNvbiBmb3IgYXJ0aWZhY3Qgd2l0aCBsYW5ndWFnZSAnJHthcnRpZmFjdExhbmd1YWdlfScgYW5kIHR5cGUgJyR7YXJ0aWZhY3RUeXBlfSdgKTtcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmlsZXNUb0NyZWF0ZSA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRBcnRpZmFjdFRlbXBsYXRlRmlsZXNSZWN1cnNpdmVseUluKHRlbXBsYXRlLmxvY2F0aW9uLCB0ZW1wbGF0ZS50ZW1wbGF0ZS5pbmNsdWRlZEZpbGVzKTtcblxuICAgICAgICBmaWxlc1RvQ3JlYXRlLmZvckVhY2goIGZpbGVQYXRoID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2ggPSBmaWxlUGF0aC5tYXRjaCgvKFxcXFx8XFwvKS8pO1xuICAgICAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gZmlsZVBhdGgubGFzdEluZGV4T2YobGFzdFBhdGhTZXBhcmF0b3JNYXRjaFtsYXN0UGF0aFNlcGFyYXRvck1hdGNoLmxlbmd0aC0xXSlcbiAgICAgICAgICAgIGNvbnN0IGZpbGVuYW1lID0gZmlsZVBhdGguc3Vic3RyaW5nKGxhc3RJbmRleCsxLCBmaWxlUGF0aC5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3Qgb2xkQ29udGVudCA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4Jyk7XG4gICAgICAgICAgICBsZXQgc2VnbWVudHMgPSBbXTtcblxuICAgICAgICAgICAgcGF0aC5qb2luKGRlc3RpbmF0aW9uLCBmaWxlbmFtZSkuc3BsaXQoLyhcXFxcfFxcLykvKS5mb3JFYWNoKHNlZ21lbnQgPT4gc2VnbWVudHMucHVzaChIYW5kbGViYXJzLmNvbXBpbGUoc2VnbWVudCkoY29udGV4dCkpKTtcbiAgICAgICAgICAgIGxldCBuZXdGaWxlUGF0aCA9IHNlZ21lbnRzLmpvaW4oJycpO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShvbGRDb250ZW50KTtcbiAgICAgICAgICAgIGxldCBuZXdDb250ZW50ID0gdGVtcGxhdGUoY29udGV4dCk7XG4gICAgICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyhuZXdGaWxlUGF0aCwgbmV3Q29udGVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgb3Igbm90IHRoZXJlIGFyZSBib2lsZXIgcGxhdGVzIGluc3RhbGxlZFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZXJlIGFyZSwgZmFsc2UgaWYgbm90XG4gICAgICovXG4gICAgZ2V0IGhhc0JvaWxlclBsYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIF9oYXNCb2lsZXJQbGF0ZXMuZ2V0KHRoaXMpO1xuICAgIH1cbn0iXX0=