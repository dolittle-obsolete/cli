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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsImJpbmFyeUZpbGVzIiwiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2h0dHBXcmFwcGVyIiwiX2dpdCIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJfaGFzQm9pbGVyUGxhdGVzIiwiX2JvaWxlclBsYXRlcyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJfbG9nZ2VyIiwicmVhZEJvaWxlclBsYXRlcyIsImxhbmd1YWdlIiwiZ2V0IiwiZmlsdGVyIiwiYm9pbGVyUGxhdGUiLCJ0eXBlIiwiY29uZmlnRmlsZSIsImJvaWxlclBsYXRlQ29uZmlnRmlsZSIsImV4aXN0c1N5bmMiLCJqc29uIiwicmVhZEZpbGVTeW5jIiwiYm9pbGVyUGxhdGVzQXNPYmplY3RzIiwiSlNPTiIsInBhcnNlIiwiYm9pbGVyUGxhdGVzIiwiZm9yRWFjaCIsIkJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVPYmplY3QiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJsb2NhdGlvbiIsInBhdGhzTmVlZGluZ0JpbmRpbmciLCJmaWxlc05lZWRpbmdCaW5kaW5nIiwicHVzaCIsImxlbmd0aCIsInVyaSIsIlByb21pc2UiLCJnZXRKc29uIiwidGhlbiIsInJlc3VsdCIsInVybHMiLCJpdGVtIiwicmVzb2x2ZSIsImdldEZvbGRlcnNJbiIsInVwZGF0ZUNvdW50IiwiaW5mbyIsImZvbGRlciIsImZvckZvbGRlciIsInB1bGwiLCJleGVjIiwicHJvbWlzZSIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsIm5hbWVzIiwiY2xvbmVDb3VudCIsImZvbGRlck5hbWUiLCJwYXRoIiwiam9pbiIsInVybCIsInNpbGVudCIsImNsb25lIiwidXBkYXRlQ29uZmlndXJhdGlvbiIsInNlbGYiLCJib2lsZXJQbGF0ZUZpbGUiLCJib2lsZXJQbGF0ZUZyb21GaWxlIiwicmVxdWlyZSIsImNvbnRlbnRGb2xkZXIiLCJwYXRocyIsImdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4iLCJpc0JpbmFyeSIsIl8iLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJiIiwibWFwIiwic3Vic3RyIiwic3RhdCIsInN0YXRTeW5jIiwiaXNEaXJlY3RvcnkiLCJmaWxlIiwidG9Kc29uIiwiYm9pbGVyUGxhdGVzQXNKc29uIiwic3RyaW5naWZ5Iiwid3JpdGVGaWxlU3luYyIsImRlc3RpbmF0aW9uIiwiY29udGV4dCIsImNvcHkiLCJwYXRoVG9SZW5hbWUiLCJzZWdtZW50cyIsInNwbGl0IiwiSGFuZGxlYmFycyIsImNvbXBpbGUiLCJzZWdtZW50IiwicmVuYW1lU3luYyIsImNvbnRlbnQiLCJ0ZW1wbGF0ZSIsImFydGlmYWN0VHlwZSIsImFydGlmYWN0TGFuZ3VhZ2UiLCJ0ZW1wbGF0ZUZpbGVzIiwic2VhcmNoUmVjdXJzaXZlIiwidGVtcGxhdGVzQW5kTG9jYXRpb24iLCJsYXN0UGF0aFNlcGFyYXRvck1hdGNoIiwibWF0Y2giLCJsYXN0SW5kZXgiLCJsYXN0SW5kZXhPZiIsInN1YnN0cmluZyIsImZpbGVzVG9DcmVhdGUiLCJnZXRBcnRpZmFjdFRlbXBsYXRlRmlsZXNSZWN1cnNpdmVseUluIiwiaW5jbHVkZWRGaWxlcyIsImZpbGVQYXRoIiwiZmlsZW5hbWUiLCJvbGRDb250ZW50IiwibmV3RmlsZVBhdGgiLCJuZXdDb250ZW50IiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FB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akQ7QUFDSCxhQWJEO0FBY0g7O0FBRUQ7Ozs7Ozs7NEJBelEwQjtBQUN0QixtQkFBT3pELGVBQUtDLElBQUwsQ0FBVWxFLGVBQWVxQixHQUFmLENBQW1CLElBQW5CLEVBQXlCc0cscUJBQW5DLEVBQTBEN0gsaUJBQTFELENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJNEI7QUFDeEIsbUJBQU9tRSxlQUFLQyxJQUFMLENBQVVsRSxlQUFlcUIsR0FBZixDQUFtQixJQUFuQixFQUF5QnNHLHFCQUFuQyxFQUEwRCxvQkFBMUQsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OzRCQUltQjtBQUNmLG1CQUFPcEgsY0FBY2MsR0FBZCxDQUFrQixJQUFsQixDQUFQO0FBQ0g7Ozs0QkEyUHFCO0FBQ2xCLG1CQUFPZixpQkFBaUJlLEdBQWpCLENBQXFCLElBQXJCLENBQVA7QUFDSCIsImZpbGUiOiJCb2lsZXJQbGF0ZXNNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgQ29uZmlnTWFuYWdlciB9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vQ29uZmlnTWFuYWdlcic7XG5pbXBvcnQgeyBIdHRwV3JhcHBlciB9IGZyb20gJy4uL0h0dHBXcmFwcGVyJztcbmltcG9ydCB7IEdpdCB9IGZyb20gJ3NpbXBsZS1naXQnO1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBCb2lsZXJQbGF0ZSB9IGZyb20gJy4vQm9pbGVyUGxhdGUnO1xuaW1wb3J0IEhhbmRsZWJhcnMgZnJvbSAnaGFuZGxlYmFycyc7XG5cbmNvbnN0IGJvaWxlclBsYXRlRm9sZGVyID0gJ2JvaWxlci1wbGF0ZXMnO1xuXG5jb25zdCBiaW5hcnlGaWxlcyA9IFtcbiAgICBcIi5qcGdcIixcbiAgICBcIi5wbmdcIixcbiAgICBcIi5vYmpcIixcbiAgICBcIi5kbGxcIixcbiAgICBcIi5iaW5cIixcbiAgICBcIi5leGVcIixcbiAgICBcIi50dGZcIlxuXTtcblxuY29uc3QgX2NvbmZpZ01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2h0dHBXcmFwcGVyID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9naXQgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2hhc0JvaWxlclBsYXRlcyA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IF9ib2lsZXJQbGF0ZXMgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIG1hbmFnZXIgb2YgYm9pbGVyIHBsYXRlc1xuICovXG5leHBvcnQgY2xhc3MgQm9pbGVyUGxhdGVzTWFuYWdlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Qm9pbGVyUGxhdGVzTWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0NvbmZpZ01hbmFnZXJ9IGNvbmZpZ01hbmFnZXIgXG4gICAgICogQHBhcmFtIHtIdHRwV3JhcHBlcn0gaHR0cFdyYXBwZXJcbiAgICAgKiBAcGFyYW0ge0dpdH0gZ2l0XG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXI7XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnTWFuYWdlciwgaHR0cFdyYXBwZXIsIGdpdCwgZm9sZGVycywgZmlsZVN5c3RlbSwgbG9nZ2VyKSB7XG4gICAgICAgIF9jb25maWdNYW5hZ2VyLnNldCh0aGlzLCBjb25maWdNYW5hZ2VyKTtcbiAgICAgICAgX2h0dHBXcmFwcGVyLnNldCh0aGlzLCBodHRwV3JhcHBlcik7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICBfZ2l0LnNldCh0aGlzLCBnaXQpO1xuXG4gICAgICAgIGZvbGRlcnMubWFrZUZvbGRlcklmTm90RXhpc3RzKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG5cbiAgICAgICAgdGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICB0aGlzLnJlYWRCb2lsZXJQbGF0ZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGJhc2UgcGF0aCBmb3IgYm9pbGVyIHBsYXRlc1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEJhc2UgcGF0aCBvZiBib2lsZXIgcGxhdGVzXG4gICAgICovXG4gICAgZ2V0IGJvaWxlclBsYXRlTG9jYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oX2NvbmZpZ01hbmFnZXIuZ2V0KHRoaXMpLmNlbnRyYWxGb2xkZXJMb2NhdGlvbiwgYm9pbGVyUGxhdGVGb2xkZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgcGF0aCB0byB0aGUgYm9pbGVyIHBsYXRlcyBjb25maWcgZmlsZVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFBhdGggdG8gdGhlIGNvbmZpZyBmaWxlXG4gICAgICovXG4gICAgZ2V0IGJvaWxlclBsYXRlQ29uZmlnRmlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihfY29uZmlnTWFuYWdlci5nZXQodGhpcykuY2VudHJhbEZvbGRlckxvY2F0aW9uLCBcImJvaWxlci1wbGF0ZXMuanNvblwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXNcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVzKCkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzIGZvciB0aGUgbGFuZ3VhZ2VcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeUxhbmd1YWdlKGxhbmd1YWdlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5maWx0ZXIoYm9pbGVyUGxhdGUgPT4gYm9pbGVyUGxhdGUubGFuZ3VhZ2UgPT0gbGFuZ3VhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIGEgc3BlY2lmaWMgdHlwZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSB0eXBlXG4gICAgICovXG4gICAgYm9pbGVyUGxhdGVzQnlUeXBlKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS50eXBlID09IHR5cGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIGEgc3BlY2lmaWMgbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEByZXR1cm5zIHtCb2lsZXJQbGF0ZVtdfSBBdmFpYWJsZSBib2lsZXIgcGxhdGVzIGZvciB0aGUgbGFuZ3VhZ2VcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZShsYW5ndWFnZSwgdHlwZSkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcykuZmlsdGVyKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLmxhbmd1YWdlID09IGxhbmd1YWdlICYmIGJvaWxlclBsYXRlLnR5cGUgPT0gdHlwZSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGFsbCBib2lsZXIgcGxhdGVzIGZyb20gZGlza1xuICAgICAqL1xuICAgIHJlYWRCb2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIGxldCBjb25maWdGaWxlID0gdGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGU7XG4gICAgICAgIGlmIChfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhjb25maWdGaWxlKSkge1xuICAgICAgICAgICAgbGV0IGpzb24gPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGNvbmZpZ0ZpbGUpO1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlc0FzT2JqZWN0cyA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gW107XG5cblxuICAgICAgICAgICAgYm9pbGVyUGxhdGVzQXNPYmplY3RzLmZvckVhY2goYm9pbGVyUGxhdGVPYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IG5ldyBCb2lsZXJQbGF0ZShcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubGFuZ3VhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC50eXBlLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sb2NhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QucGF0aHNOZWVkaW5nQmluZGluZyB8fCBbXSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZmlsZXNOZWVkaW5nQmluZGluZyB8fCBbXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVzLnB1c2goYm9pbGVyUGxhdGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXMuc2V0KHRoaXMsIGJvaWxlclBsYXRlcyk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIF9ib2lsZXJQbGF0ZXMuc2V0KHRoaXMsIFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9oYXNCb2lsZXJQbGF0ZXMuc2V0KHRoaXMsIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmxlbmd0aCA9PSAwID8gZmFsc2U6IHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmcm9tIEdpdEh1YlxuICAgICAqL1xuICAgIGFzeW5jIGdldEF2YWlsYWJsZUJvaWxlclBsYXRlcygpIHtcbiAgICAgICAgbGV0IHVyaSA9IFwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9vcmdzL2RvbGl0dGxlLWJvaWxlcnBsYXRlcy9yZXBvc1wiO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBfaHR0cFdyYXBwZXIuZ2V0KHRoaXMpLmdldEpzb24odXJpKS50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgICAgIGxldCB1cmxzID0gW107XG4gICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goaXRlbSA9PiB1cmxzLnB1c2goaXRlbS5uYW1lKSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh1cmxzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW55IGV4aXN0aW5nIGJvaWxlciBwbGF0ZXMgb24gZGlza1xuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgbGV0IGZvbGRlcnMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbik7XG4gICAgICAgICAgICBsZXQgdXBkYXRlQ291bnQgPSBmb2xkZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmKCB1cGRhdGVDb3VudCA9PSAwICkgcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICBmb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgVXBkYXRlIGJvaWxlciBwbGF0ZSBpbiAnJHtmb2xkZXJ9J2ApO1xuICAgICAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpLmZvckZvbGRlcihmb2xkZXIpLnB1bGwoKS5leGVjKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC0tdXBkYXRlQ291bnQgPT0gMCkgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGJvaWxlciBwbGF0ZXMuXG4gICAgICogVGhpcyB3aWxsIHVwZGF0ZSBhbnkgZXhpc3RpbmcgYW5kIGRvd25sb2FkIGFueSBuZXcgb25lcy5cbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuX2xvZ2dlci5pbmZvKCdVcGRhdGluZyBhbGwgYm9pbGVyIHBsYXRlcycpO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVCb2lsZXJQbGF0ZXNPbkRpc2soKTtcbiAgICAgICAgICAgIGxldCBuYW1lcyA9IGF3YWl0IHRoaXMuZ2V0QXZhaWxhYmxlQm9pbGVyUGxhdGVzKCk7XG5cbiAgICAgICAgICAgIGxldCBjbG9uZUNvdW50ID0gMDtcbiAgICAgICAgICAgIG5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgZm9sZGVyTmFtZSA9IHBhdGguam9pbih0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24sIG5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICghX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLmV4aXN0c1N5bmMoZm9sZGVyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVybCA9IGBodHRwczovL2dpdGh1Yi5jb20vZG9saXR0bGUtYm9pbGVycGxhdGVzLyR7bmFtZX0uZ2l0YDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYEdldHRpbmcgYm9pbGVycGxhdGUgbm90IG9uIGRpc2sgZnJvbSAnJHt1cmx9J2ApO1xuICAgICAgICAgICAgICAgICAgICBjbG9uZUNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIF9naXQuZ2V0KHRoaXMpLnNpbGVudChmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9uZSh1cmwsIGZvbGRlck5hbWUsIHsgJy0tcmVjdXJzaXZlJzogbnVsbCB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmV4ZWMoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtLWNsb25lQ291bnQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbmZpZ3VyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGNvbmZpZ3VyYXRpb24gZmlsZSBvbiBkaXNrXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgZm9sZGVycyA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRGb2xkZXJzSW4odGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uKTtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlcyA9IFtdO1xuICAgICAgICBmb2xkZXJzLmZvckVhY2goZm9sZGVyID0+IHtcbiAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZUZpbGUgPSBwYXRoLmpvaW4oZm9sZGVyLCAnYm9pbGVycGxhdGUuanMnKTtcblxuICAgICAgICAgICAgaWYgKF9maWxlU3lzdGVtLmdldCh0aGlzKS5leGlzdHNTeW5jKGJvaWxlclBsYXRlRmlsZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVGcm9tRmlsZSA9IHJlcXVpcmUoYm9pbGVyUGxhdGVGaWxlKTtcbiAgICAgICAgICAgICAgICBsZXQgY29udGVudEZvbGRlciA9IHBhdGguam9pbihmb2xkZXIsIFwiQ29udGVudFwiKTtcblxuICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRGb2xkZXJzQW5kRmlsZXNSZWN1cnNpdmVseUluKGNvbnRlbnRGb2xkZXIpO1xuICAgICAgICAgICAgICAgIHBhdGhzID0gcGF0aHMuZmlsdGVyKF8gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXNCaW5hcnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYmluYXJ5RmlsZXMuZm9yRWFjaChiID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihiKSA+IDApIGlzQmluYXJ5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNCaW5hcnk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbGV0IHBhdGhzTmVlZGluZ0JpbmRpbmcgPSBwYXRocy5maWx0ZXIoXyA9PiBfLmluZGV4T2YoJ3t7JykgPiAwKS5tYXAoXyA9PiBfLnN1YnN0cihjb250ZW50Rm9sZGVyLmxlbmd0aCArIDEpKTtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZXNOZWVkaW5nQmluZGluZyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgcGF0aHMuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoXyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IF9maWxlU3lzdGVtLmdldChzZWxmKS5yZWFkRmlsZVN5bmMoXyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZS5pbmRleE9mKCd7eycpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlc05lZWRpbmdCaW5kaW5nLnB1c2goXy5zdWJzdHIoY29udGVudEZvbGRlci5sZW5ndGggKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IG5ldyBCb2lsZXJQbGF0ZShcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVGcm9tRmlsZS5sYW5ndWFnZSB8fCAnYW55JyxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVGcm9tRmlsZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZUZyb21GaWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZUZyb21GaWxlLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRGb2xkZXIsXG4gICAgICAgICAgICAgICAgICAgIHBhdGhzTmVlZGluZ0JpbmRpbmcsXG4gICAgICAgICAgICAgICAgICAgIGZpbGVzTmVlZGluZ0JpbmRpbmdcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlcy5wdXNoKGJvaWxlclBsYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJvaWxlclBsYXRlc0FzT2JqZWN0cyA9IGJvaWxlclBsYXRlcy5tYXAoXyA9PiBfLnRvSnNvbigpKTtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlc0FzSnNvbiA9IEpTT04uc3RyaW5naWZ5KGJvaWxlclBsYXRlc0FzT2JqZWN0cywgbnVsbCwgNCk7XG4gICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS53cml0ZUZpbGVTeW5jKHRoaXMuYm9pbGVyUGxhdGVDb25maWdGaWxlLCBib2lsZXJQbGF0ZXNBc0pzb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB7Qm9pbGVyUGxhdGV9IGludG8gYSBzcGVjaWZpYyBkZXN0aW5hdGlvbiBmb2xkZXIgd2l0aCBhIGdpdmVuIGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlfSBib2lsZXJQbGF0ZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb24gXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHQgXG4gICAgICovXG4gICAgY3JlYXRlSW5zdGFuY2UoYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIF9mb2xkZXJzLmdldCh0aGlzKS5jb3B5KGRlc3RpbmF0aW9uLCBib2lsZXJQbGF0ZS5sb2NhdGlvbik7XG4gICAgICAgIGJvaWxlclBsYXRlLnBhdGhzTmVlZGluZ0JpbmRpbmcuZm9yRWFjaChfID0+IHtcbiAgICAgICAgICAgIGxldCBwYXRoVG9SZW5hbWUgPSBwYXRoLmpvaW4oZGVzdGluYXRpb24sIF8pO1xuICAgICAgICAgICAgbGV0IHNlZ21lbnRzID0gW107XG4gICAgICAgICAgICBwYXRoVG9SZW5hbWUuc3BsaXQoLyhcXFxcfFxcLykvKS5mb3JFYWNoKHNlZ21lbnQgPT4gc2VnbWVudHMucHVzaChIYW5kbGViYXJzLmNvbXBpbGUoc2VnbWVudCkoY29udGV4dCkpKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBzZWdtZW50cy5qb2luKCcnKTtcbiAgICAgICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZW5hbWVTeW5jKHBhdGhUb1JlbmFtZSwgcmVzdWx0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYm9pbGVyUGxhdGUuZmlsZXNOZWVkaW5nQmluZGluZy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgbGV0IGZpbGUgPSBwYXRoLmpvaW4oZGVzdGluYXRpb24sIF8pO1xuXG4gICAgICAgICAgICBsZXQgY29udGVudCA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoZmlsZSwgJ3V0ZjgnKVxuICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKGNvbnRlbnQpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRlbXBsYXRlKGNvbnRleHQpO1xuICAgICAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmMoZmlsZSwgcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB7Qm9pbGVyUGxhdGV9IG9mIGFuIGFydGlmYWN0IGludG8gYSBzcGVjaWZpYyBkZXN0aW5hdGlvbiBmb2xkZXIgd2l0aCBhIGdpdmVuIGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXJ0aWZhY3RUeXBlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhcnRpZmFjdExhbmd1YWdlIFxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGV9IGJvaWxlclBsYXRlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dCBcbiAgICAgKi9cbiAgICBjcmVhdGVBcnRpZmFjdEluc3RhbmNlKGFydGlmYWN0VHlwZSwgYXJ0aWZhY3RMYW5ndWFnZSwgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIGxldCB0ZW1wbGF0ZUZpbGVzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLnNlYXJjaFJlY3Vyc2l2ZShib2lsZXJQbGF0ZS5sb2NhdGlvbiwgJ3RlbXBsYXRlLmpzb24nKTtcbiAgICAgICAgbGV0IHRlbXBsYXRlc0FuZExvY2F0aW9uID0gW107XG4gICAgICAgIFxuICAgICAgICB0ZW1wbGF0ZUZpbGVzLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYXN0UGF0aFNlcGFyYXRvck1hdGNoID0gXy5tYXRjaCgvKFxcXFx8XFwvKS8pO1xuICAgICAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gXy5sYXN0SW5kZXhPZihsYXN0UGF0aFNlcGFyYXRvck1hdGNoW2xhc3RQYXRoU2VwYXJhdG9yTWF0Y2gubGVuZ3RoLTFdKVxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB7XG4gICAgICAgICAgICAgICAgJ3RlbXBsYXRlJzogSlNPTi5wYXJzZShfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKF8sICd1dGY4JykpLFxuICAgICAgICAgICAgICAgICdsb2NhdGlvbic6IF8uc3Vic3RyaW5nKDAsIGxhc3RJbmRleCsxKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRlbXBsYXRlc0FuZExvY2F0aW9uLnB1c2godGVtcGxhdGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0ZW1wbGF0ZXNBbmRMb2NhdGlvbi5maWx0ZXIodGVtcGxhdGUgPT4gdGVtcGxhdGUudGVtcGxhdGUudHlwZSA9PSBhcnRpZmFjdFR5cGUgJiYgdGVtcGxhdGUudGVtcGxhdGUubGFuZ3VhZ2UgPT0gYXJ0aWZhY3RMYW5ndWFnZSlbMF07XG4gICAgICAgIGxldCBmaWxlc1RvQ3JlYXRlID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEFydGlmYWN0VGVtcGxhdGVGaWxlc1JlY3Vyc2l2ZWx5SW4odGVtcGxhdGUubG9jYXRpb24sIHRlbXBsYXRlLnRlbXBsYXRlLmluY2x1ZGVkRmlsZXMpO1xuXG4gICAgICAgIGZpbGVzVG9DcmVhdGUuZm9yRWFjaCggZmlsZVBhdGggPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFzdFBhdGhTZXBhcmF0b3JNYXRjaCA9IGZpbGVQYXRoLm1hdGNoKC8oXFxcXHxcXC8pLyk7XG4gICAgICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBmaWxlUGF0aC5sYXN0SW5kZXhPZihsYXN0UGF0aFNlcGFyYXRvck1hdGNoW2xhc3RQYXRoU2VwYXJhdG9yTWF0Y2gubGVuZ3RoLTFdKVxuICAgICAgICAgICAgY29uc3QgZmlsZW5hbWUgPSBmaWxlUGF0aC5zdWJzdHJpbmcobGFzdEluZGV4KzEsIGZpbGVQYXRoLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBvbGRDb250ZW50ID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcbiAgICAgICAgICAgIGxldCBzZWdtZW50cyA9IFtdO1xuXG4gICAgICAgICAgICBwYXRoLmpvaW4oZGVzdGluYXRpb24sIGZpbGVuYW1lKS5zcGxpdCgvKFxcXFx8XFwvKS8pLmZvckVhY2goc2VnbWVudCA9PiBzZWdtZW50cy5wdXNoKEhhbmRsZWJhcnMuY29tcGlsZShzZWdtZW50KShjb250ZXh0KSkpO1xuICAgICAgICAgICAgbGV0IG5ld0ZpbGVQYXRoID0gc2VnbWVudHMuam9pbignJyk7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKG9sZENvbnRlbnQpO1xuICAgICAgICAgICAgbGV0IG5ld0NvbnRlbnQgPSB0ZW1wbGF0ZShjb250ZXh0KTtcbiAgICAgICAgICAgIF9maWxlU3lzdGVtLmdldCh0aGlzKS53cml0ZUZpbGVTeW5jKG5ld0ZpbGVQYXRoLCBuZXdDb250ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgd2hldGhlciBvciBub3QgdGhlcmUgYXJlIGJvaWxlciBwbGF0ZXMgaW5zdGFsbGVkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlcmUgYXJlLCBmYWxzZSBpZiBub3RcbiAgICAgKi9cbiAgICBnZXQgaGFzQm9pbGVyUGxhdGVzKCkge1xuICAgICAgICByZXR1cm4gX2hhc0JvaWxlclBsYXRlcy5nZXQodGhpcyk7XG4gICAgfVxufSJdfQ==