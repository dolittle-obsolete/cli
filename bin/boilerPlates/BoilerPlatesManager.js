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
                                // TODO: 
                                // * Discover boilerplates recursively
                                // * 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsImJpbmFyeUZpbGVzIiwiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2h0dHBXcmFwcGVyIiwiX2dpdCIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJfaGFzQm9pbGVyUGxhdGVzIiwiX2JvaWxlclBsYXRlcyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJfbG9nZ2VyIiwicmVhZEJvaWxlclBsYXRlcyIsImxhbmd1YWdlIiwiZ2V0IiwiZmlsdGVyIiwiYm9pbGVyUGxhdGUiLCJ0eXBlIiwiY29uZmlnRmlsZSIsImJvaWxlclBsYXRlQ29uZmlnRmlsZSIsImV4aXN0c1N5bmMiLCJqc29uIiwicmVhZEZpbGVTeW5jIiwiYm9pbGVyUGxhdGVzQXNPYmplY3RzIiwiSlNPTiIsInBhcnNlIiwiYm9pbGVyUGxhdGVzIiwiZm9yRWFjaCIsIkJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVPYmplY3QiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJsb2NhdGlvbiIsInBhdGhzTmVlZGluZ0JpbmRpbmciLCJmaWxlc05lZWRpbmdCaW5kaW5nIiwicHVzaCIsImxlbmd0aCIsInVyaSIsIlByb21pc2UiLCJnZXRKc29uIiwidGhlbiIsInJlc3VsdCIsInVybHMiLCJpdGVtIiwicmVzb2x2ZSIsImdldEZvbGRlcnNJbiIsInVwZGF0ZUNvdW50IiwiaW5mbyIsImZvbGRlciIsImZvckZvbGRlciIsInB1bGwiLCJleGVjIiwicHJvbWlzZSIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsIm5hbWVzIiwiY2xvbmVDb3VudCIsImZvbGRlck5hbWUiLCJwYXRoIiwiam9pbiIsInVybCIsInNpbGVudCIsImNsb25lIiwidXBkYXRlQ29uZmlndXJhdGlvbiIsInNlbGYiLCJib2lsZXJQbGF0ZUZpbGUiLCJib2lsZXJQbGF0ZUZyb21GaWxlIiwicmVxdWlyZSIsImNvbnRlbnRGb2xkZXIiLCJwYXRocyIsImdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4iLCJpc0JpbmFyeSIsIl8iLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJiIiwibWFwIiwic3Vic3RyIiwic3RhdCIsInN0YXRTeW5jIiwiaXNEaXJlY3RvcnkiLCJmaWxlIiwidG9Kc29uIiwiYm9pbGVyUGxhdGVzQXNKc29uIiwic3RyaW5naWZ5Iiwid3JpdGVGaWxlU3luYyIsImRlc3RpbmF0aW9uIiwiY29udGV4dCIsImNvcHkiLCJwYXRoVG9SZW5hbWUiLCJzZWdtZW50cyIsInNwbGl0IiwiSGFuZGxlYmFycyIsImNvbXBpbGUiLCJzZWdtZW50IiwicmVuYW1lU3luYyIsImNvbnRlbnQiLCJ0ZW1wbGF0ZSIsImFydGlmYWN0VHlwZSIsImFydGlmYWN0TGFuZ3VhZ2UiLCJ0ZW1wbGF0ZUZpbGVzIiwic2VhcmNoUmVjdXJzaXZlIiwidGVtcGxhdGVzQW5kTG9jYXRpb24iLCJsYXN0UGF0aFNlcGFyYXRvck1hdGNoIiwibWF0Y2giLCJsYXN0SW5kZXgiLCJsYXN0SW5kZXhPZiIsInN1YnN0cmluZyIsImZpbGVzVG9DcmVhdGUiLCJnZXRBcnRpZmFjdFRlbXBsYXRlRmlsZXNSZWN1cnNpdmVseUluIiwiaW5jbHVkZWRGaWxlcyIsImZpbGVQYXRoIiwiZmlsZW5hbWUiLCJvbGRDb250ZW50IiwibmV3RmlsZVBhdGgiLCJuZXdDb250ZW50IiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FB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V0FBcEMsRUFBaURDLFVBQWpEO0FBQ0gsYUFiRDtBQWNIOztBQUVEOzs7Ozs7OzRCQWpSMEI7QUFDdEIsbUJBQU96RCxlQUFLQyxJQUFMLENBQVVsRSxlQUFlcUIsR0FBZixDQUFtQixJQUFuQixFQUF5QnNHLHFCQUFuQyxFQUEwRDdILGlCQUExRCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSTRCO0FBQ3hCLG1CQUFPbUUsZUFBS0MsSUFBTCxDQUFVbEUsZUFBZXFCLEdBQWYsQ0FBbUIsSUFBbkIsRUFBeUJzRyxxQkFBbkMsRUFBMEQsb0JBQTFELENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJbUI7QUFDZixtQkFBT3BILGNBQWNjLEdBQWQsQ0FBa0IsSUFBbEIsQ0FBUDtBQUNIOzs7NEJBbVFxQjtBQUNsQixtQkFBT2YsaUJBQWlCZSxHQUFqQixDQUFxQixJQUFyQixDQUFQO0FBQ0giLCJmaWxlIjoiQm9pbGVyUGxhdGVzTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IENvbmZpZ01hbmFnZXIgfSBmcm9tICcuLi9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0IHsgSHR0cFdyYXBwZXIgfSBmcm9tICcuLi9IdHRwV3JhcHBlcic7XG5pbXBvcnQgeyBHaXQgfSBmcm9tICdzaW1wbGUtZ2l0JztcbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQm9pbGVyUGxhdGUgfSBmcm9tICcuL0JvaWxlclBsYXRlJztcbmltcG9ydCBIYW5kbGViYXJzIGZyb20gJ2hhbmRsZWJhcnMnO1xuXG5jb25zdCBib2lsZXJQbGF0ZUZvbGRlciA9ICdib2lsZXItcGxhdGVzJztcblxuY29uc3QgYmluYXJ5RmlsZXMgPSBbXG4gICAgJy5qcGcnLFxuICAgICcucG5nJyxcbiAgICAnLm9iaicsXG4gICAgJy5kbGwnLFxuICAgICcuYmluJyxcbiAgICAnLmV4ZScsXG4gICAgJy50dGYnXG5dO1xuXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaHR0cFdyYXBwZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaGFzQm9pbGVyUGxhdGVzID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgX2JvaWxlclBsYXRlcyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgbWFuYWdlciBvZiBib2lsZXIgcGxhdGVzXG4gKi9cbmV4cG9ydCBjbGFzcyBCb2lsZXJQbGF0ZXNNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7Q29uZmlnTWFuYWdlcn0gY29uZmlnTWFuYWdlciBcbiAgICAgKiBAcGFyYW0ge0h0dHBXcmFwcGVyfSBodHRwV3JhcHBlclxuICAgICAqIEBwYXJhbSB7R2l0fSBnaXRcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnNcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlcjtcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWdNYW5hZ2VyLCBodHRwV3JhcHBlciwgZ2l0LCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2NvbmZpZ01hbmFnZXIuc2V0KHRoaXMsIGNvbmZpZ01hbmFnZXIpO1xuICAgICAgICBfaHR0cFdyYXBwZXIuc2V0KHRoaXMsIGh0dHBXcmFwcGVyKTtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIF9naXQuc2V0KHRoaXMsIGdpdCk7XG5cbiAgICAgICAgZm9sZGVycy5tYWtlRm9sZGVySWZOb3RFeGlzdHModGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uKTtcblxuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIHRoaXMucmVhZEJvaWxlclBsYXRlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYmFzZSBwYXRoIGZvciBib2lsZXIgcGxhdGVzXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQmFzZSBwYXRoIG9mIGJvaWxlciBwbGF0ZXNcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVMb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihfY29uZmlnTWFuYWdlci5nZXQodGhpcykuY2VudHJhbEZvbGRlckxvY2F0aW9uLCBib2lsZXJQbGF0ZUZvbGRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBwYXRoIHRvIHRoZSBib2lsZXIgcGxhdGVzIGNvbmZpZyBmaWxlXG4gICAgICogQHJldHVybnMge3N0cmluZ30gUGF0aCB0byB0aGUgY29uZmlnIGZpbGVcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVDb25maWdGaWxlKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKS5jZW50cmFsRm9sZGVyTG9jYXRpb24sIFwiYm9pbGVyLXBsYXRlcy5qc29uXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlc1xuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2UobGFuZ3VhZ2UpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS5sYW5ndWFnZSA9PSBsYW5ndWFnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlcyBmb3IgdGhlIHR5cGVcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeVR5cGUodHlwZSkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcykuZmlsdGVyKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLnR5cGUgPT0gdHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKGxhbmd1YWdlLCB0eXBlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5maWx0ZXIoYm9pbGVyUGxhdGUgPT4gYm9pbGVyUGxhdGUubGFuZ3VhZ2UgPT0gbGFuZ3VhZ2UgJiYgYm9pbGVyUGxhdGUudHlwZSA9PSB0eXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGFsbCBib2lsZXIgcGxhdGVzIGZyb20gZGlza1xuICAgICAqL1xuICAgIHJlYWRCb2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIGxldCBjb25maWdGaWxlID0gdGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGU7XG4gICAgICAgIGlmIChfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhjb25maWdGaWxlKSkge1xuICAgICAgICAgICAgbGV0IGpzb24gPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGNvbmZpZ0ZpbGUpO1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlc0FzT2JqZWN0cyA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gW107XG5cblxuICAgICAgICAgICAgYm9pbGVyUGxhdGVzQXNPYmplY3RzLmZvckVhY2goYm9pbGVyUGxhdGVPYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IG5ldyBCb2lsZXJQbGF0ZShcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubGFuZ3VhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC50eXBlLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sb2NhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QucGF0aHNOZWVkaW5nQmluZGluZyB8fCBbXSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZmlsZXNOZWVkaW5nQmluZGluZyB8fCBbXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVzLnB1c2goYm9pbGVyUGxhdGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXMuc2V0KHRoaXMsIGJvaWxlclBsYXRlcyk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXMuc2V0KHRoaXMsIFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9oYXNCb2lsZXJQbGF0ZXMuc2V0KHRoaXMsIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmxlbmd0aCA9PSAwID8gZmFsc2U6IHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmcm9tIEdpdEh1YlxuICAgICAqL1xuICAgIGFzeW5jIGdldEF2YWlsYWJsZUJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgbGV0IHVyaSA9IFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9vcmdzL2RvbGl0dGxlLWJvaWxlcnBsYXRlcy9yZXBvc1wiO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBfaHR0cFdyYXBwZXIuZ2V0KHRoaXMpLmdldEpzb24odXJpKS50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgICAgIGxldCB1cmxzID0gW107XG4gICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goaXRlbSA9PiB1cmxzLnB1c2goaXRlbS5uYW1lKSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh1cmxzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW55IGV4aXN0aW5nIGJvaWxlciBwbGF0ZXMgb24gZGlza1xuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgbGV0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG4gICAgICAgICAgICBsZXQgdXBkYXRlQ291bnQgPSBmb2xkZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmKCB1cGRhdGVDb3VudCA9PSAwICkgcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBmb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgVXBkYXRlIGJvaWxlciBwbGF0ZSBpbiAnJHtmb2xkZXJ9J2ApO1xuICAgICAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpLmZvckZvbGRlcihmb2xkZXIpLnB1bGwoKS5leGVjKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC0tdXBkYXRlQ291bnQgPT0gMCkgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGJvaWxlciBwbGF0ZXMuXG4gICAgICogVGhpcyB3aWxsIHVwZGF0ZSBhbnkgZXhpc3RpbmcgYW5kIGRvd25sb2FkIGFueSBuZXcgb25lcy5cbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdVcGRhdGluZyBhbGwgYm9pbGVyIHBsYXRlcycpO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVCb2lsZXJQbGF0ZXNPbkRpc2soKTtcbiAgICAgICAgICAgIGxldCBuYW1lcyA9IGF3YWl0IHRoaXMuZ2V0QXZhaWxhYmxlQm9pbGVyUGxhdGVzKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBjbG9uZUNvdW50ID0gMDtcbiAgICAgICAgICAgIG5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvbGRlck5hbWUgPSBwYXRoLmpvaW4odGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uLCBuYW1lKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIV9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGZvbGRlck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gYGh0dHBzOi8vZ2l0aHViLmNvbS9kb2xpdHRsZS1ib2lsZXJwbGF0ZXMvJHtuYW1lfS5naXRgO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgR2V0dGluZyBib2lsZXJwbGF0ZSBub3Qgb24gZGlzayBmcm9tICcke3VybH0nYCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjbG9uZUNvdW50Kys7XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2lsZW50KGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb25lKHVybCwgZm9sZGVyTmFtZSwgeyAnLS1yZWN1cnNpdmUnOiBudWxsIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXhlYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC0tY2xvbmVDb3VudCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29uZmlndXJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBjb25maWd1cmF0aW9uIGZpbGUgb24gZGlza1xuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIC8vIFRPRE86IFxuICAgICAgICAvLyAqIERpc2NvdmVyIGJvaWxlcnBsYXRlcyByZWN1cnNpdmVseVxuICAgICAgICAvLyAqIFxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBmb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNJbih0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24pO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gW107XG4gICAgICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlRmlsZSA9IHBhdGguam9pbihmb2xkZXIsICdib2lsZXJwbGF0ZS5qcycpO1xuXG4gICAgICAgICAgICBpZiAoX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmV4aXN0c1N5bmMoYm9pbGVyUGxhdGVGaWxlKSkge1xuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZUZyb21GaWxlID0gcmVxdWlyZShib2lsZXJQbGF0ZUZpbGUpO1xuICAgICAgICAgICAgICAgIGxldCBjb250ZW50Rm9sZGVyID0gcGF0aC5qb2luKGZvbGRlciwgXCJDb250ZW50XCIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4oY29udGVudEZvbGRlcik7XG4gICAgICAgICAgICAgICAgcGF0aHMgPSBwYXRocy5maWx0ZXIoXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpc0JpbmFyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBiaW5hcnlGaWxlcy5mb3JFYWNoKGIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8udG9Mb3dlckNhc2UoKS5pbmRleE9mKGIpID4gMCkgaXNCaW5hcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc0JpbmFyeTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsZXQgcGF0aHNOZWVkaW5nQmluZGluZyA9IHBhdGhzLmZpbHRlcihfID0+IF8uaW5kZXhPZigne3snKSA+IDApLm1hcChfID0+IF8uc3Vic3RyKGNvbnRlbnRGb2xkZXIubGVuZ3RoICsgMSkpO1xuICAgICAgICAgICAgICAgIGxldCBmaWxlc05lZWRpbmdCaW5kaW5nID0gW107XG5cbiAgICAgICAgICAgICAgICBwYXRocy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdCA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5zdGF0U3luYyhfKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnJlYWRGaWxlU3luYyhfKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLmluZGV4T2YoJ3t7JykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzTmVlZGluZ0JpbmRpbmcucHVzaChfLnN1YnN0cihjb250ZW50Rm9sZGVyLmxlbmd0aCArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gbmV3IEJvaWxlclBsYXRlKFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZUZyb21GaWxlLmxhbmd1YWdlIHx8ICdhbnknLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZUZyb21GaWxlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlRnJvbUZpbGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlRnJvbUZpbGUudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEZvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgcGF0aHNOZWVkaW5nQmluZGluZyxcbiAgICAgICAgICAgICAgICAgICAgZmlsZXNOZWVkaW5nQmluZGluZ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVzLnB1c2goYm9pbGVyUGxhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNPYmplY3RzID0gYm9pbGVyUGxhdGVzLm1hcChfID0+IF8udG9Kc29uKCkpO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzQXNKc29uID0gSlNPTi5zdHJpbmdpZnkoYm9pbGVyUGxhdGVzQXNPYmplY3RzLCBudWxsLCA0KTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmModGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGUsIGJvaWxlclBsYXRlc0FzSnNvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZX0gaW50byBhIHNwZWNpZmljIGRlc3RpbmF0aW9uIGZvbGRlciB3aXRoIGEgZ2l2ZW4gY29udGV4dFxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGV9IGJvaWxlclBsYXRlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dCBcbiAgICAgKi9cbiAgICBjcmVhdGVJbnN0YW5jZShib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgX2ZvbGRlcnMuZ2V0KHRoaXMpLmNvcHkoZGVzdGluYXRpb24sIGJvaWxlclBsYXRlLmxvY2F0aW9uKTtcbiAgICAgICAgYm9pbGVyUGxhdGUucGF0aHNOZWVkaW5nQmluZGluZy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgbGV0IHBhdGhUb1JlbmFtZSA9IHBhdGguam9pbihkZXN0aW5hdGlvbiwgXyk7XG4gICAgICAgICAgICBsZXQgc2VnbWVudHMgPSBbXTtcbiAgICAgICAgICAgIHBhdGhUb1JlbmFtZS5zcGxpdCgvKFxcXFx8XFwvKS8pLmZvckVhY2goc2VnbWVudCA9PiBzZWdtZW50cy5wdXNoKEhhbmRsZWJhcnMuY29tcGlsZShzZWdtZW50KShjb250ZXh0KSkpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHNlZ21lbnRzLmpvaW4oJycpO1xuICAgICAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlbmFtZVN5bmMocGF0aFRvUmVuYW1lLCByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGJvaWxlclBsYXRlLmZpbGVzTmVlZGluZ0JpbmRpbmcuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgIGxldCBmaWxlID0gcGF0aC5qb2luKGRlc3RpbmF0aW9uLCBfKTtcblxuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGZpbGUsICd1dGY4JylcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShjb250ZW50KTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0ZW1wbGF0ZShjb250ZXh0KTtcbiAgICAgICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS53cml0ZUZpbGVTeW5jKGZpbGUsIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2Yge0JvaWxlclBsYXRlfSBvZiBhbiBhcnRpZmFjdCBpbnRvIGEgc3BlY2lmaWMgZGVzdGluYXRpb24gZm9sZGVyIHdpdGggYSBnaXZlbiBjb250ZXh0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFydGlmYWN0VHlwZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXJ0aWZhY3RMYW5ndWFnZSBcbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlfSBib2lsZXJQbGF0ZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb24gXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHQgXG4gICAgICovXG4gICAgY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZShhcnRpZmFjdFR5cGUsIGFydGlmYWN0TGFuZ3VhZ2UsIGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCkge1xuICAgICAgICBsZXQgdGVtcGxhdGVGaWxlcyA9IF9mb2xkZXJzLmdldCh0aGlzKS5zZWFyY2hSZWN1cnNpdmUoYm9pbGVyUGxhdGUubG9jYXRpb24sICd0ZW1wbGF0ZS5qc29uJyk7XG4gICAgICAgIGxldCB0ZW1wbGF0ZXNBbmRMb2NhdGlvbiA9IFtdO1xuICAgICAgICB0ZW1wbGF0ZUZpbGVzLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYXN0UGF0aFNlcGFyYXRvck1hdGNoID0gXy5tYXRjaCgvKFxcXFx8XFwvKS8pO1xuICAgICAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gXy5sYXN0SW5kZXhPZihsYXN0UGF0aFNlcGFyYXRvck1hdGNoW2xhc3RQYXRoU2VwYXJhdG9yTWF0Y2gubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0ge1xuICAgICAgICAgICAgICAgICd0ZW1wbGF0ZSc6IEpTT04ucGFyc2UoX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhfLCAndXRmOCcpKSxcbiAgICAgICAgICAgICAgICAnbG9jYXRpb24nOiBfLnN1YnN0cmluZygwLCBsYXN0SW5kZXgrMSlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0ZW1wbGF0ZXNBbmRMb2NhdGlvbi5wdXNoKHRlbXBsYXRlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGVtcGxhdGVzQW5kTG9jYXRpb24uZmlsdGVyKHRlbXBsYXRlID0+IHRlbXBsYXRlLnRlbXBsYXRlLnR5cGUgPT0gYXJ0aWZhY3RUeXBlICYmIHRlbXBsYXRlLnRlbXBsYXRlLmxhbmd1YWdlID09IGFydGlmYWN0TGFuZ3VhZ2UpWzBdO1xuICAgICAgICBsZXQgZmlsZXNUb0NyZWF0ZSA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRBcnRpZmFjdFRlbXBsYXRlRmlsZXNSZWN1cnNpdmVseUluKHRlbXBsYXRlLmxvY2F0aW9uLCB0ZW1wbGF0ZS50ZW1wbGF0ZS5pbmNsdWRlZEZpbGVzKTtcblxuICAgICAgICBmaWxlc1RvQ3JlYXRlLmZvckVhY2goIGZpbGVQYXRoID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2ggPSBmaWxlUGF0aC5tYXRjaCgvKFxcXFx8XFwvKS8pO1xuICAgICAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gZmlsZVBhdGgubGFzdEluZGV4T2YobGFzdFBhdGhTZXBhcmF0b3JNYXRjaFtsYXN0UGF0aFNlcGFyYXRvck1hdGNoLmxlbmd0aC0xXSlcbiAgICAgICAgICAgIGNvbnN0IGZpbGVuYW1lID0gZmlsZVBhdGguc3Vic3RyaW5nKGxhc3RJbmRleCsxLCBmaWxlUGF0aC5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3Qgb2xkQ29udGVudCA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4Jyk7XG4gICAgICAgICAgICBsZXQgc2VnbWVudHMgPSBbXTtcblxuICAgICAgICAgICAgcGF0aC5qb2luKGRlc3RpbmF0aW9uLCBmaWxlbmFtZSkuc3BsaXQoLyhcXFxcfFxcLykvKS5mb3JFYWNoKHNlZ21lbnQgPT4gc2VnbWVudHMucHVzaChIYW5kbGViYXJzLmNvbXBpbGUoc2VnbWVudCkoY29udGV4dCkpKTtcbiAgICAgICAgICAgIGxldCBuZXdGaWxlUGF0aCA9IHNlZ21lbnRzLmpvaW4oJycpO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShvbGRDb250ZW50KTtcbiAgICAgICAgICAgIGxldCBuZXdDb250ZW50ID0gdGVtcGxhdGUoY29udGV4dCk7XG4gICAgICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyhuZXdGaWxlUGF0aCwgbmV3Q29udGVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgb3Igbm90IHRoZXJlIGFyZSBib2lsZXIgcGxhdGVzIGluc3RhbGxlZFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZXJlIGFyZSwgZmFsc2UgaWYgbm90XG4gICAgICovXG4gICAgZ2V0IGhhc0JvaWxlclBsYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIF9oYXNCb2lsZXJQbGF0ZXMuZ2V0KHRoaXMpO1xuICAgIH1cbn0iXX0=