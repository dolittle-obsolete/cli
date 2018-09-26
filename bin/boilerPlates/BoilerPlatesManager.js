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

        // /**
        //  * Create an instance of {BoilerPlate} of an artifact into a specific destination folder with a given context
        //  * @param {string} artifactType 
        //  * @param {string} artifactLanguage 
        //  * @param {BoilerPlate} boilerPlate 
        //  * @param {string} destination 
        //  * @param {object} context 
        //  */
        // createArtifactInstance(artifactType, artifactLanguage, boilerPlate, destination, context) {
        //     let templateFiles = _folders.get(this).searchRecursive(boilerPlate.location, 'template.json');
        //     let templatesAndLocation = [];
        //     templateFiles.forEach(_ => {
        //         const lastPathSeparatorMatch = _.match(/(\\|\/)/);
        //         const lastIndex = _.lastIndexOf(lastPathSeparatorMatch[lastPathSeparatorMatch.length-1]);
        //         const template = {
        //             'template': JSON.parse(_fileSystem.get(this).readFileSync(_, 'utf8')),
        //             'location': _.substring(0, lastIndex+1)
        //         };
        //         templatesAndLocation.push(template);
        //     });
        //     const template = templatesAndLocation.filter(template => template.template.type == artifactType && template.template.language == artifactLanguage)[0];
        //     if (template === undefined || template === null) {
        //         this._logger.error(`Could not find template.json for artifact with language '${artifactLanguage}' and type '${artifactType}'`);
        //         throw 'Artifact template not found';
        //     }
        //     let filesToCreate = _folders.get(this).getArtifactTemplateFilesRecursivelyIn(template.location, template.template.includedFiles);

        //     filesToCreate.forEach( filePath => {
        //         const lastPathSeparatorMatch = filePath.match(/(\\|\/)/);
        //         const lastIndex = filePath.lastIndexOf(lastPathSeparatorMatch[lastPathSeparatorMatch.length-1])
        //         const filename = filePath.substring(lastIndex+1, filePath.length);
        //         const oldContent = _fileSystem.get(this).readFileSync(filePath, 'utf8');
        //         let segments = [];

        //         path.join(destination, filename).split(/(\\|\/)/).forEach(segment => segments.push(Handlebars.compile(segment)(context)));
        //         let newFilePath = segments.join('');

        //         let template = Handlebars.compile(oldContent);
        //         let newContent = template(context);
        //         _fileSystem.get(this).writeFileSync(newFilePath, newContent);
        //     });
        // }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGVzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZUZvbGRlciIsImJpbmFyeUZpbGVzIiwiX2NvbmZpZ01hbmFnZXIiLCJXZWFrTWFwIiwiX2h0dHBXcmFwcGVyIiwiX2dpdCIsIl9mb2xkZXJzIiwiX2ZpbGVTeXN0ZW0iLCJfaGFzQm9pbGVyUGxhdGVzIiwiX2JvaWxlclBsYXRlcyIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsInNldCIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJfbG9nZ2VyIiwicmVhZEJvaWxlclBsYXRlcyIsImxhbmd1YWdlIiwiZ2V0IiwiZmlsdGVyIiwiYm9pbGVyUGxhdGUiLCJ0eXBlIiwiY29uZmlnRmlsZSIsImJvaWxlclBsYXRlQ29uZmlnRmlsZSIsImV4aXN0c1N5bmMiLCJqc29uIiwicmVhZEZpbGVTeW5jIiwiYm9pbGVyUGxhdGVzQXNPYmplY3RzIiwiSlNPTiIsInBhcnNlIiwiYm9pbGVyUGxhdGVzIiwiZm9yRWFjaCIsIkJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVPYmplY3QiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJkZXBlbmRlbmNpZXMiLCJsb2NhdGlvbiIsInBhdGhzTmVlZGluZ0JpbmRpbmciLCJmaWxlc05lZWRpbmdCaW5kaW5nIiwicHVzaCIsImxlbmd0aCIsInVyaSIsIlByb21pc2UiLCJnZXRKc29uIiwidGhlbiIsInJlc3VsdCIsInVybHMiLCJpdGVtIiwicmVzb2x2ZSIsImdldEZvbGRlcnNJbiIsInVwZGF0ZUNvdW50IiwiaW5mbyIsImZvbGRlciIsImZvckZvbGRlciIsInB1bGwiLCJleGVjIiwicHJvbWlzZSIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsIm5hbWVzIiwiY2xvbmVDb3VudCIsImZvbGRlck5hbWUiLCJwYXRoIiwiam9pbiIsInVybCIsInNpbGVudCIsImNsb25lIiwidXBkYXRlQ29uZmlndXJhdGlvbiIsInNlbGYiLCJib2lsZXJQbGF0ZXNQYXRocyIsInNlYXJjaFJlY3Vyc2l2ZSIsImNvbnRlbnRGb2xkZXIiLCJib2lsZXJQbGF0ZVBhdGgiLCJwYXRocyIsImdldEZvbGRlcnNBbmRGaWxlc1JlY3Vyc2l2ZWx5SW4iLCJpc0JpbmFyeSIsIl8iLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJiIiwibWFwIiwic3Vic3RyIiwic3RhdCIsInN0YXRTeW5jIiwiaXNEaXJlY3RvcnkiLCJmaWxlIiwiZGlybmFtZSIsInRvSnNvbiIsImJvaWxlclBsYXRlc0FzSnNvbiIsInN0cmluZ2lmeSIsIndyaXRlRmlsZVN5bmMiLCJkZXN0aW5hdGlvbiIsImNvbnRleHQiLCJjb3B5IiwicGF0aFRvUmVuYW1lIiwic2VnbWVudHMiLCJzcGxpdCIsIkhhbmRsZWJhcnMiLCJjb21waWxlIiwic2VnbWVudCIsInJlbmFtZVN5bmMiLCJjb250ZW50IiwidGVtcGxhdGUiLCJhcnRpZmFjdFRlbXBsYXRlIiwiZmlsZXNUb0NyZWF0ZSIsImdldEFydGlmYWN0VGVtcGxhdGVGaWxlc1JlY3Vyc2l2ZWx5SW4iLCJpbmNsdWRlZEZpbGVzIiwibGFzdFBhdGhTZXBhcmF0b3JNYXRjaCIsImZpbGVQYXRoIiwibWF0Y2giLCJsYXN0SW5kZXgiLCJsYXN0SW5kZXhPZiIsImZpbGVuYW1lIiwic3Vic3RyaW5nIiwib2xkQ29udGVudCIsIm5ld0ZpbGVQYXRoIiwibmV3Q29udGVudCIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLG9CQUFvQixlQUExQixDLENBZEE7Ozs7OztBQWdCQSxJQUFNQyxjQUFjLENBQ2hCLE1BRGdCLEVBRWhCLE1BRmdCLEVBR2hCLE1BSGdCLEVBSWhCLE1BSmdCLEVBS2hCLE1BTGdCLEVBTWhCLE1BTmdCLEVBT2hCLE1BUGdCLENBQXBCOztBQVVBLElBQU1DLGlCQUFpQixJQUFJQyxPQUFKLEVBQXZCO0FBQ0EsSUFBTUMsZUFBZSxJQUFJRCxPQUFKLEVBQXJCO0FBQ0EsSUFBTUUsT0FBTyxJQUFJRixPQUFKLEVBQWI7QUFDQSxJQUFNRyxXQUFXLElBQUlILE9BQUosRUFBakI7QUFDQSxJQUFNSSxjQUFjLElBQUlKLE9BQUosRUFBcEI7QUFDQSxJQUFNSyxtQkFBbUIsSUFBSUwsT0FBSixFQUF6Qjs7QUFFQSxJQUFNTSxnQkFBZ0IsSUFBSU4sT0FBSixFQUF0Qjs7QUFFQTs7OztJQUdhTyxtQixXQUFBQSxtQjs7QUFFVDs7Ozs7Ozs7O0FBU0EsaUNBQVlDLGFBQVosRUFBMkJDLFdBQTNCLEVBQXdDQyxHQUF4QyxFQUE2Q0MsT0FBN0MsRUFBc0RDLFVBQXRELEVBQWtFQyxNQUFsRSxFQUEwRTtBQUFBOztBQUN0RWQsdUJBQWVlLEdBQWYsQ0FBbUIsSUFBbkIsRUFBeUJOLGFBQXpCO0FBQ0FQLHFCQUFhYSxHQUFiLENBQWlCLElBQWpCLEVBQXVCTCxXQUF2QjtBQUNBTixpQkFBU1csR0FBVCxDQUFhLElBQWIsRUFBbUJILE9BQW5CO0FBQ0FQLG9CQUFZVSxHQUFaLENBQWdCLElBQWhCLEVBQXNCRixVQUF0QjtBQUNBVixhQUFLWSxHQUFMLENBQVMsSUFBVCxFQUFlSixHQUFmOztBQUVBQyxnQkFBUUkscUJBQVIsQ0FBOEIsS0FBS0MsbUJBQW5DOztBQUVBLGFBQUtDLE9BQUwsR0FBZUosTUFBZjtBQUNBLGFBQUtLLGdCQUFMO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7QUF3QkE7Ozs7OytDQUt1QkMsUSxFQUFVO0FBQzdCLG1CQUFPYixjQUFjYyxHQUFkLENBQWtCLElBQWxCLEVBQXdCQyxNQUF4QixDQUErQjtBQUFBLHVCQUFlQyxZQUFZSCxRQUFaLElBQXdCQSxRQUF2QztBQUFBLGFBQS9CLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7MkNBS21CSSxJLEVBQU07QUFDckIsbUJBQU9qQixjQUFjYyxHQUFkLENBQWtCLElBQWxCLEVBQXdCQyxNQUF4QixDQUErQjtBQUFBLHVCQUFlQyxZQUFZQyxJQUFaLElBQW9CQSxJQUFuQztBQUFBLGFBQS9CLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7O3NEQU04QkosUSxFQUFVSSxJLEVBQU07QUFDMUMsbUJBQU9qQixjQUFjYyxHQUFkLENBQWtCLElBQWxCLEVBQXdCQyxNQUF4QixDQUErQjtBQUFBLHVCQUFlQyxZQUFZSCxRQUFaLElBQXdCQSxRQUF4QixJQUFvQ0csWUFBWUMsSUFBWixJQUFvQkEsSUFBdkU7QUFBQSxhQUEvQixDQUFQO0FBQ0g7O0FBRUQ7Ozs7OzsyQ0FHbUI7QUFDZixnQkFBSUMsYUFBYSxLQUFLQyxxQkFBdEI7QUFDQSxnQkFBSXJCLFlBQVlnQixHQUFaLENBQWdCLElBQWhCLEVBQXNCTSxVQUF0QixDQUFpQ0YsVUFBakMsQ0FBSixFQUFrRDtBQUM5QyxvQkFBSUcsT0FBT3ZCLFlBQVlnQixHQUFaLENBQWdCLElBQWhCLEVBQXNCUSxZQUF0QixDQUFtQ0osVUFBbkMsQ0FBWDtBQUNBLG9CQUFJSyx3QkFBd0JDLEtBQUtDLEtBQUwsQ0FBV0osSUFBWCxDQUE1QjtBQUNBLG9CQUFJSyxlQUFlLEVBQW5CO0FBQ0FILHNDQUFzQkksT0FBdEIsQ0FBOEIsNkJBQXFCO0FBQy9DLHdCQUFJWCxjQUFjLElBQUlZLHdCQUFKLENBQ2RDLGtCQUFrQmhCLFFBREosRUFFZGdCLGtCQUFrQkMsSUFGSixFQUdkRCxrQkFBa0JFLFdBSEosRUFJZEYsa0JBQWtCWixJQUpKLEVBS2RZLGtCQUFrQkcsWUFMSixFQU1kSCxrQkFBa0JJLFFBTkosRUFPZEosa0JBQWtCSyxtQkFBbEIsSUFBeUMsRUFQM0IsRUFRZEwsa0JBQWtCTSxtQkFBbEIsSUFBeUMsRUFSM0IsQ0FBbEI7QUFVQVQsaUNBQWFVLElBQWIsQ0FBa0JwQixXQUFsQjtBQUNILGlCQVpEOztBQWNBaEIsOEJBQWNRLEdBQWQsQ0FBa0IsSUFBbEIsRUFBd0JrQixZQUF4QjtBQUNILGFBbkJELE1BbUJPOztBQUVIMUIsOEJBQWNRLEdBQWQsQ0FBa0IsSUFBbEIsRUFBd0IsRUFBeEI7QUFDSDs7QUFFRFQsNkJBQWlCUyxHQUFqQixDQUFxQixJQUFyQixFQUEyQlIsY0FBY2MsR0FBZCxDQUFrQixJQUFsQixFQUF3QnVCLE1BQXhCLElBQWtDLENBQWxDLEdBQXNDLEtBQXRDLEdBQTZDLElBQXhFO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7OztBQUlRQyxtQyxHQUFNLHlEO2lFQUNILElBQUlDLE9BQUosQ0FBWSxtQkFBVztBQUMxQjVDLGlEQUFhbUIsR0FBYixDQUFpQixLQUFqQixFQUF1QjBCLE9BQXZCLENBQStCRixHQUEvQixFQUFvQ0csSUFBcEMsQ0FBeUMsZ0JBQVE7QUFDN0MsNENBQUlDLFNBQVNsQixLQUFLQyxLQUFMLENBQVdKLElBQVgsQ0FBYjtBQUNBLDRDQUFJc0IsT0FBTyxFQUFYO0FBQ0FELCtDQUFPZixPQUFQLENBQWU7QUFBQSxtREFBUWdCLEtBQUtQLElBQUwsQ0FBVVEsS0FBS2QsSUFBZixDQUFSO0FBQUEseUNBQWY7QUFDQWUsZ0RBQVFGLElBQVI7QUFDSCxxQ0FMRDtBQU1ILGlDQVBNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVVg7Ozs7Ozs7Ozs7Ozs7O2tFQUlXLElBQUlKLE9BQUo7QUFBQSx5SEFBWSxrQkFBTU0sT0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDWHhDLCtEQURXLEdBQ0RSLFNBQVNpQixHQUFULENBQWEsTUFBYixFQUFtQmdDLFlBQW5CLENBQWdDLE9BQUtwQyxtQkFBckMsQ0FEQztBQUVYcUMsbUVBRlcsR0FFRzFDLFFBQVFnQyxNQUZYOztBQUdmLDREQUFJVSxlQUFlLENBQW5CLEVBQXVCRjs7QUFFdkJ4QyxnRUFBUXNCLE9BQVIsQ0FBZ0Isa0JBQVU7QUFDdEIsbUVBQUtoQixPQUFMLENBQWFxQyxJQUFiLCtCQUE2Q0MsTUFBN0M7QUFDQXJELGlFQUFLa0IsR0FBTCxDQUFTLE1BQVQsRUFBZW9DLFNBQWYsQ0FBeUJELE1BQXpCLEVBQWlDRSxJQUFqQyxHQUF3Q0MsSUFBeEMsQ0FBNkMsWUFBTTtBQUMvQyxvRUFBSSxFQUFFTCxXQUFGLElBQWlCLENBQXJCLEVBQXdCRjtBQUMzQiw2REFGRDtBQUdILHlEQUxEOztBQUxlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFDQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLG9DOzs7Ozs7Ozs7Ozs7Ozs7OztBQWNYOzs7Ozs7Ozs7Ozs7Ozs7O0FBS0kscUNBQUtsQyxPQUFMLENBQWFxQyxJQUFiLENBQWtCLDRCQUFsQjtBQUNJSyx1QyxHQUFVLElBQUlkLE9BQUo7QUFBQSx5SEFBWSxrQkFBTU0sT0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLCtEQUNoQixPQUFLUyx3QkFBTCxFQURnQjs7QUFBQTtBQUFBO0FBQUEsK0RBRUosT0FBS0Msd0JBQUwsRUFGSTs7QUFBQTtBQUVsQkMsNkRBRmtCO0FBSWxCQyxrRUFKa0IsR0FJTCxDQUpLOztBQUt0QkQsOERBQU03QixPQUFOLENBQWMsZ0JBQVE7QUFDbEIsZ0VBQUkrQixhQUFhQyxlQUFLQyxJQUFMLENBQVUsT0FBS2xELG1CQUFmLEVBQW9Db0IsSUFBcEMsQ0FBakI7O0FBRUEsZ0VBQUksQ0FBQ2hDLFlBQVlnQixHQUFaLENBQWdCLE1BQWhCLEVBQXNCTSxVQUF0QixDQUFpQ3NDLFVBQWpDLENBQUwsRUFBbUQ7O0FBRS9DLG9FQUFJRyxvREFBa0QvQixJQUFsRCxTQUFKO0FBQ0EsdUVBQUtuQixPQUFMLENBQWFxQyxJQUFiLDZDQUEyRGEsR0FBM0Q7O0FBRUFKOztBQUdBN0QscUVBQUtrQixHQUFMLENBQVMsTUFBVCxFQUNLZ0QsTUFETCxDQUNZLEtBRFosRUFFS0MsS0FGTCxDQUVXRixHQUZYLEVBRWdCSCxVQUZoQixFQUU0QixFQUFFLGVBQWUsSUFBakIsRUFGNUIsRUFHS04sSUFITCxDQUdVLFlBQU07O0FBRVIsd0VBQUksRUFBRUssVUFBRixJQUFnQixDQUFwQixFQUF1QjtBQUNuQiwrRUFBS08sbUJBQUw7QUFDQW5CO0FBQ0g7QUFDSixpRUFUTDtBQVdIO0FBQ0oseURBdkJEOztBQUxzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQ0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQztrRUE4QlBRLE87Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR1g7Ozs7Ozs7Ozs7Ozs7OztBQUlRWSxvQyxHQUFPLEk7QUFDUDVELHVDLEdBQVVSLFNBQVNpQixHQUFULENBQWEsSUFBYixFQUFtQmdDLFlBQW5CLENBQWdDLEtBQUtwQyxtQkFBckMsQztBQUNWZ0IsNEMsR0FBZSxFOztBQUNuQnJCLHdDQUFRc0IsT0FBUixDQUFnQixrQkFBVTtBQUN0Qix3Q0FBSXVDLG9CQUFvQnJFLFNBQVNpQixHQUFULENBQWEsTUFBYixFQUFtQnFELGVBQW5CLENBQW1DbEIsTUFBbkMsRUFBMkMsa0JBQTNDLENBQXhCO0FBQ0Esd0NBQUltQixnQkFBZ0JULGVBQUtDLElBQUwsQ0FBVVgsTUFBVixFQUFrQixTQUFsQixDQUFwQjs7QUFFQWlCLHNEQUFrQnZDLE9BQWxCLENBQTBCLDJCQUFtQjtBQUN6Qyw0Q0FBSUUsb0JBQW9CTCxLQUFLQyxLQUFMLENBQVczQixZQUFZZ0IsR0FBWixDQUFnQixNQUFoQixFQUFzQlEsWUFBdEIsQ0FBbUMrQyxlQUFuQyxFQUFvRCxNQUFwRCxDQUFYLENBQXhCO0FBQ0EsNENBQUl4QyxrQkFBa0JaLElBQWxCLElBQTBCLFdBQTlCLEVBQTJDO0FBQ3ZDLGdEQUFJcUQsUUFBUXpFLFNBQVNpQixHQUFULENBQWEsTUFBYixFQUFtQnlELCtCQUFuQixDQUFtREgsYUFBbkQsQ0FBWjtBQUNBRSxvREFBUUEsTUFBTXZELE1BQU4sQ0FBYSxhQUFLO0FBQ3RCLG9EQUFJeUQsV0FBVyxLQUFmO0FBQ0FoRiw0REFBWW1DLE9BQVosQ0FBb0IsYUFBSztBQUNyQix3REFBSThDLEVBQUVDLFdBQUYsR0FBZ0JDLE9BQWhCLENBQXdCQyxDQUF4QixJQUE2QixDQUFqQyxFQUFvQ0osV0FBVyxJQUFYO0FBQ3ZDLGlEQUZEO0FBR0EsdURBQU9BLFFBQVA7QUFDSCw2Q0FOTyxDQUFSO0FBT0EsZ0RBQUl0QyxzQkFBc0JvQyxNQUFNdkQsTUFBTixDQUFhO0FBQUEsdURBQUswRCxFQUFFRSxPQUFGLENBQVUsSUFBVixJQUFrQixDQUF2QjtBQUFBLDZDQUFiLEVBQXVDRSxHQUF2QyxDQUEyQztBQUFBLHVEQUFLSixFQUFFSyxNQUFGLENBQVNWLGNBQWMvQixNQUFkLEdBQXVCLENBQWhDLENBQUw7QUFBQSw2Q0FBM0MsQ0FBMUI7QUFDQSxnREFBSUYsc0JBQXNCLEVBQTFCO0FBQ0FtQyxrREFBTTNDLE9BQU4sQ0FBYyxhQUFLO0FBQ2Ysb0RBQUlvRCxPQUFPakYsWUFBWWdCLEdBQVosQ0FBZ0JtRCxJQUFoQixFQUFzQmUsUUFBdEIsQ0FBK0JQLENBQS9CLENBQVg7QUFDQSxvREFBSSxDQUFDTSxLQUFLRSxXQUFMLEVBQUwsRUFBeUI7QUFDckIsd0RBQUlDLE9BQU9wRixZQUFZZ0IsR0FBWixDQUFnQm1ELElBQWhCLEVBQXNCM0MsWUFBdEIsQ0FBbUNtRCxDQUFuQyxDQUFYO0FBQ0Esd0RBQUlTLEtBQUtQLE9BQUwsQ0FBYSxJQUFiLEtBQXNCLENBQTFCLEVBQTZCO0FBQ3pCeEMsNEVBQW9CQyxJQUFwQixDQUF5QnFDLEVBQUVLLE1BQUYsQ0FBU1YsY0FBYy9CLE1BQWQsR0FBdUIsQ0FBaEMsQ0FBekI7QUFDSDtBQUNKO0FBQ0osNkNBUkQ7QUFTQVIsOERBQWtCSSxRQUFsQixHQUE2Qm1DLGFBQTdCO0FBQ0F2Qyw4REFBa0JLLG1CQUFsQixHQUF3Q0EsbUJBQXhDO0FBQ0FMLDhEQUFrQk0sbUJBQWxCLEdBQXdDQSxtQkFBeEM7QUFDSCx5Q0F2QkQsTUF3Qks7QUFDRE4sOERBQWtCSSxRQUFsQixHQUE2QjBCLGVBQUt3QixPQUFMLENBQWFkLGVBQWIsQ0FBN0I7QUFDQXhDLDhEQUFrQkssbUJBQWxCLEdBQXdDLEVBQXhDO0FBQ0FMLDhEQUFrQk0sbUJBQWxCLEdBQXdDLEVBQXhDO0FBQ0g7O0FBRUQsNENBQUluQixjQUFjLElBQUlZLHdCQUFKLENBQ2RDLGtCQUFrQmhCLFFBQWxCLElBQThCLEtBRGhCLEVBRWRnQixrQkFBa0JDLElBRkosRUFHZEQsa0JBQWtCRSxXQUhKLEVBSWRGLGtCQUFrQlosSUFKSixFQUtkWSxrQkFBa0JJLFFBTEosRUFNZEosa0JBQWtCSyxtQkFOSixFQU9kTCxrQkFBa0JNLG1CQVBKLENBQWxCO0FBU0FULHFEQUFhVSxJQUFiLENBQWtCcEIsV0FBbEI7QUFDSCxxQ0ExQ0Q7QUEyQ0gsaUNBL0NEO0FBZ0RJTyxxRCxHQUF3QkcsYUFBYW1ELEdBQWIsQ0FBaUI7QUFBQSwyQ0FBS0osRUFBRVcsTUFBRixFQUFMO0FBQUEsaUNBQWpCLEM7QUFDeEJDLGtELEdBQXFCN0QsS0FBSzhELFNBQUwsQ0FBZS9ELHFCQUFmLEVBQXNDLElBQXRDLEVBQTRDLENBQTVDLEM7O0FBQ3pCekIsNENBQVlnQixHQUFaLENBQWdCLElBQWhCLEVBQXNCeUUsYUFBdEIsQ0FBb0MsS0FBS3BFLHFCQUF6QyxFQUFnRWtFLGtCQUFoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHSjs7Ozs7Ozs7O3VDQU1lckUsVyxFQUFhd0UsVyxFQUFhQyxPLEVBQVM7QUFBQTs7QUFDOUM1RixxQkFBU2lCLEdBQVQsQ0FBYSxJQUFiLEVBQW1CNEUsSUFBbkIsQ0FBd0JGLFdBQXhCLEVBQXFDeEUsWUFBWWlCLFFBQWpEO0FBQ0FqQix3QkFBWWtCLG1CQUFaLENBQWdDUCxPQUFoQyxDQUF3QyxhQUFLO0FBQ3pDLG9CQUFJZ0UsZUFBZWhDLGVBQUtDLElBQUwsQ0FBVTRCLFdBQVYsRUFBdUJmLENBQXZCLENBQW5CO0FBQ0Esb0JBQUltQixXQUFXLEVBQWY7QUFDQUQsNkJBQWFFLEtBQWIsQ0FBbUIsU0FBbkIsRUFBOEJsRSxPQUE5QixDQUFzQztBQUFBLDJCQUFXaUUsU0FBU3hELElBQVQsQ0FBYzBELHFCQUFXQyxPQUFYLENBQW1CQyxPQUFuQixFQUE0QlAsT0FBNUIsQ0FBZCxDQUFYO0FBQUEsaUJBQXRDO0FBQ0Esb0JBQUkvQyxTQUFTa0QsU0FBU2hDLElBQVQsQ0FBYyxFQUFkLENBQWI7QUFDQTlELDRCQUFZZ0IsR0FBWixDQUFnQixNQUFoQixFQUFzQm1GLFVBQXRCLENBQWlDTixZQUFqQyxFQUErQ2pELE1BQS9DO0FBQ0gsYUFORDs7QUFRQTFCLHdCQUFZbUIsbUJBQVosQ0FBZ0NSLE9BQWhDLENBQXdDLGFBQUs7QUFDekMsb0JBQUl1RCxPQUFPdkIsZUFBS0MsSUFBTCxDQUFVNEIsV0FBVixFQUF1QmYsQ0FBdkIsQ0FBWDs7QUFFQSxvQkFBSXlCLFVBQVVwRyxZQUFZZ0IsR0FBWixDQUFnQixNQUFoQixFQUFzQlEsWUFBdEIsQ0FBbUM0RCxJQUFuQyxFQUF5QyxNQUF6QyxDQUFkO0FBQ0Esb0JBQUlpQixXQUFXTCxxQkFBV0MsT0FBWCxDQUFtQkcsT0FBbkIsQ0FBZjtBQUNBLG9CQUFJeEQsU0FBU3lELFNBQVNWLE9BQVQsQ0FBYjtBQUNBM0YsNEJBQVlnQixHQUFaLENBQWdCLE1BQWhCLEVBQXNCeUUsYUFBdEIsQ0FBb0NMLElBQXBDLEVBQTBDeEMsTUFBMUM7QUFDSCxhQVBEO0FBUUg7QUFDRDs7Ozs7Ozs7OytDQU11QjBELGdCLEVBQWtCWixXLEVBQWFDLE8sRUFBUztBQUFBOztBQUMzRCxnQkFBSVksZ0JBQWdCeEcsU0FBU2lCLEdBQVQsQ0FBYSxJQUFiLEVBQW1Cd0YscUNBQW5CLENBQXlERixpQkFBaUJuRSxRQUExRSxFQUFvRm1FLGlCQUFpQkQsUUFBakIsQ0FBMEJJLGFBQTlHLENBQXBCOztBQUVBRiwwQkFBYzFFLE9BQWQsQ0FBdUIsb0JBQVk7QUFDL0Isb0JBQU02RSx5QkFBeUJDLFNBQVNDLEtBQVQsQ0FBZSxTQUFmLENBQS9CO0FBQ0Esb0JBQU1DLFlBQVlGLFNBQVNHLFdBQVQsQ0FBcUJKLHVCQUF1QkEsdUJBQXVCbkUsTUFBdkIsR0FBOEIsQ0FBckQsQ0FBckIsQ0FBbEI7QUFDQSxvQkFBTXdFLFdBQVdKLFNBQVNLLFNBQVQsQ0FBbUJILFlBQVUsQ0FBN0IsRUFBZ0NGLFNBQVNwRSxNQUF6QyxDQUFqQjtBQUNBLG9CQUFNMEUsYUFBYWpILFlBQVlnQixHQUFaLENBQWdCLE1BQWhCLEVBQXNCUSxZQUF0QixDQUFtQ21GLFFBQW5DLEVBQTZDLE1BQTdDLENBQW5CO0FBQ0Esb0JBQUliLFdBQVcsRUFBZjs7QUFFQWpDLCtCQUFLQyxJQUFMLENBQVU0QixXQUFWLEVBQXVCcUIsUUFBdkIsRUFBaUNoQixLQUFqQyxDQUF1QyxTQUF2QyxFQUFrRGxFLE9BQWxELENBQTBEO0FBQUEsMkJBQVdpRSxTQUFTeEQsSUFBVCxDQUFjMEQscUJBQVdDLE9BQVgsQ0FBbUJDLE9BQW5CLEVBQTRCUCxPQUE1QixDQUFkLENBQVg7QUFBQSxpQkFBMUQ7QUFDQSxvQkFBSXVCLGNBQWNwQixTQUFTaEMsSUFBVCxDQUFjLEVBQWQsQ0FBbEI7O0FBRUEsb0JBQUl1QyxXQUFXTCxxQkFBV0MsT0FBWCxDQUFtQmdCLFVBQW5CLENBQWY7QUFDQSxvQkFBSUUsYUFBYWQsU0FBU1YsT0FBVCxDQUFqQjtBQUNBM0YsNEJBQVlnQixHQUFaLENBQWdCLE1BQWhCLEVBQXNCeUUsYUFBdEIsQ0FBb0N5QixXQUFwQyxFQUFpREMsVUFBakQ7QUFDSCxhQWJEO0FBY0g7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OzRCQWpUMEI7QUFDdEIsbUJBQU90RCxlQUFLQyxJQUFMLENBQVVuRSxlQUFlcUIsR0FBZixDQUFtQixJQUFuQixFQUF5Qm9HLHFCQUFuQyxFQUEwRDNILGlCQUExRCxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSTRCO0FBQ3hCLG1CQUFPb0UsZUFBS0MsSUFBTCxDQUFVbkUsZUFBZXFCLEdBQWYsQ0FBbUIsSUFBbkIsRUFBeUJvRyxxQkFBbkMsRUFBMEQsb0JBQTFELENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs0QkFJbUI7QUFDZixtQkFBT2xILGNBQWNjLEdBQWQsQ0FBa0IsSUFBbEIsQ0FBUDtBQUNIOzs7NEJBbVNxQjtBQUNsQixtQkFBT2YsaUJBQWlCZSxHQUFqQixDQUFxQixJQUFyQixDQUFQO0FBQ0giLCJmaWxlIjoiQm9pbGVyUGxhdGVzTWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IENvbmZpZ01hbmFnZXIgfSBmcm9tICcuLi9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0IHsgSHR0cFdyYXBwZXIgfSBmcm9tICcuLi9IdHRwV3JhcHBlcic7XG5pbXBvcnQgeyBHaXQgfSBmcm9tICdzaW1wbGUtZ2l0JztcbmltcG9ydCB7IEZvbGRlcnMgfSBmcm9tICcuLi9Gb2xkZXJzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQm9pbGVyUGxhdGUgfSBmcm9tICcuL0JvaWxlclBsYXRlJztcbmltcG9ydCBIYW5kbGViYXJzIGZyb20gJ2hhbmRsZWJhcnMnO1xuXG5jb25zdCBib2lsZXJQbGF0ZUZvbGRlciA9ICdib2lsZXItcGxhdGVzJztcblxuY29uc3QgYmluYXJ5RmlsZXMgPSBbXG4gICAgJy5qcGcnLFxuICAgICcucG5nJyxcbiAgICAnLm9iaicsXG4gICAgJy5kbGwnLFxuICAgICcuYmluJyxcbiAgICAnLmV4ZScsXG4gICAgJy50dGYnXG5dO1xuXG5jb25zdCBfY29uZmlnTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaHR0cFdyYXBwZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2dpdCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfaGFzQm9pbGVyUGxhdGVzID0gbmV3IFdlYWtNYXAoKTtcblxuY29uc3QgX2JvaWxlclBsYXRlcyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgbWFuYWdlciBvZiBib2lsZXIgcGxhdGVzXG4gKi9cbmV4cG9ydCBjbGFzcyBCb2lsZXJQbGF0ZXNNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZXNNYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7Q29uZmlnTWFuYWdlcn0gY29uZmlnTWFuYWdlciBcbiAgICAgKiBAcGFyYW0ge0h0dHBXcmFwcGVyfSBodHRwV3JhcHBlclxuICAgICAqIEBwYXJhbSB7R2l0fSBnaXRcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnNcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlcjtcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWdNYW5hZ2VyLCBodHRwV3JhcHBlciwgZ2l0LCBmb2xkZXJzLCBmaWxlU3lzdGVtLCBsb2dnZXIpIHtcbiAgICAgICAgX2NvbmZpZ01hbmFnZXIuc2V0KHRoaXMsIGNvbmZpZ01hbmFnZXIpO1xuICAgICAgICBfaHR0cFdyYXBwZXIuc2V0KHRoaXMsIGh0dHBXcmFwcGVyKTtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgICAgIF9naXQuc2V0KHRoaXMsIGdpdCk7XG5cbiAgICAgICAgZm9sZGVycy5tYWtlRm9sZGVySWZOb3RFeGlzdHModGhpcy5ib2lsZXJQbGF0ZUxvY2F0aW9uKTtcblxuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIHRoaXMucmVhZEJvaWxlclBsYXRlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYmFzZSBwYXRoIGZvciBib2lsZXIgcGxhdGVzXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQmFzZSBwYXRoIG9mIGJvaWxlciBwbGF0ZXNcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVMb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihfY29uZmlnTWFuYWdlci5nZXQodGhpcykuY2VudHJhbEZvbGRlckxvY2F0aW9uLCBib2lsZXJQbGF0ZUZvbGRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBwYXRoIHRvIHRoZSBib2lsZXIgcGxhdGVzIGNvbmZpZyBmaWxlXG4gICAgICogQHJldHVybnMge3N0cmluZ30gUGF0aCB0byB0aGUgY29uZmlnIGZpbGVcbiAgICAgKi9cbiAgICBnZXQgYm9pbGVyUGxhdGVDb25maWdGaWxlKCkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKF9jb25maWdNYW5hZ2VyLmdldCh0aGlzKS5jZW50cmFsRm9sZGVyTG9jYXRpb24sIFwiYm9pbGVyLXBsYXRlcy5qc29uXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXNcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlc1xuICAgICAqL1xuICAgIGdldCBib2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGF2YWlsYWJsZSBib2lsZXIgcGxhdGVzIGZvciBhIHNwZWNpZmljIGxhbmd1YWdlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2UobGFuZ3VhZ2UpIHtcbiAgICAgICAgcmV0dXJuIF9ib2lsZXJQbGF0ZXMuZ2V0KHRoaXMpLmZpbHRlcihib2lsZXJQbGF0ZSA9PiBib2lsZXJQbGF0ZS5sYW5ndWFnZSA9PSBsYW5ndWFnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcmV0dXJucyB7Qm9pbGVyUGxhdGVbXX0gQXZhaWFibGUgYm9pbGVyIHBsYXRlcyBmb3IgdGhlIHR5cGVcbiAgICAgKi9cbiAgICBib2lsZXJQbGF0ZXNCeVR5cGUodHlwZSkge1xuICAgICAgICByZXR1cm4gX2JvaWxlclBsYXRlcy5nZXQodGhpcykuZmlsdGVyKGJvaWxlclBsYXRlID0+IGJvaWxlclBsYXRlLnR5cGUgPT0gdHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBhdmFpbGFibGUgYm9pbGVyIHBsYXRlcyBmb3IgYSBzcGVjaWZpYyBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHJldHVybnMge0JvaWxlclBsYXRlW119IEF2YWlhYmxlIGJvaWxlciBwbGF0ZXMgZm9yIHRoZSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKGxhbmd1YWdlLCB0eXBlKSB7XG4gICAgICAgIHJldHVybiBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5maWx0ZXIoYm9pbGVyUGxhdGUgPT4gYm9pbGVyUGxhdGUubGFuZ3VhZ2UgPT0gbGFuZ3VhZ2UgJiYgYm9pbGVyUGxhdGUudHlwZSA9PSB0eXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGFsbCBib2lsZXIgcGxhdGVzIGZyb20gZGlza1xuICAgICAqL1xuICAgIHJlYWRCb2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIGxldCBjb25maWdGaWxlID0gdGhpcy5ib2lsZXJQbGF0ZUNvbmZpZ0ZpbGU7XG4gICAgICAgIGlmIChfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhjb25maWdGaWxlKSkge1xuICAgICAgICAgICAgbGV0IGpzb24gPSBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKGNvbmZpZ0ZpbGUpO1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlc0FzT2JqZWN0cyA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gW107XG4gICAgICAgICAgICBib2lsZXJQbGF0ZXNBc09iamVjdHMuZm9yRWFjaChib2lsZXJQbGF0ZU9iamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gbmV3IEJvaWxlclBsYXRlKFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmRlcGVuZGVuY2llcyxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnBhdGhzTmVlZGluZ0JpbmRpbmcgfHwgW10sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmZpbGVzTmVlZGluZ0JpbmRpbmcgfHwgW11cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlcy5wdXNoKGJvaWxlclBsYXRlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfYm9pbGVyUGxhdGVzLnNldCh0aGlzLCBib2lsZXJQbGF0ZXMpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBfYm9pbGVyUGxhdGVzLnNldCh0aGlzLCBbXSk7XG4gICAgICAgIH1cblxuICAgICAgICBfaGFzQm9pbGVyUGxhdGVzLnNldCh0aGlzLCBfYm9pbGVyUGxhdGVzLmdldCh0aGlzKS5sZW5ndGggPT0gMCA/IGZhbHNlOiB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMgZnJvbSBHaXRIdWJcbiAgICAgKi9cbiAgICBhc3luYyBnZXRBdmFpbGFibGVCb2lsZXJQbGF0ZXMoKSB7XG4gICAgICAgIGxldCB1cmkgPSBcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vb3Jncy9kb2xpdHRsZS1ib2lsZXJwbGF0ZXMvcmVwb3NcIjtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgX2h0dHBXcmFwcGVyLmdldCh0aGlzKS5nZXRKc29uKHVyaSkudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgICAgICAgICBsZXQgdXJscyA9IFtdO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKGl0ZW0gPT4gdXJscy5wdXNoKGl0ZW0ubmFtZSkpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUodXJscyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGFueSBleGlzdGluZyBib2lsZXIgcGxhdGVzIG9uIGRpc2tcbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVCb2lsZXJQbGF0ZXNPbkRpc2soKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGxldCBmb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNJbih0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24pO1xuICAgICAgICAgICAgbGV0IHVwZGF0ZUNvdW50ID0gZm9sZGVycy5sZW5ndGg7XG4gICAgICAgICAgICBpZiggdXBkYXRlQ291bnQgPT0gMCApIHJlc29sdmUoKTtcblxuICAgICAgICAgICAgZm9sZGVycy5mb3JFYWNoKGZvbGRlciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYFVwZGF0ZSBib2lsZXIgcGxhdGUgaW4gJyR7Zm9sZGVyfSdgKTtcbiAgICAgICAgICAgICAgICBfZ2l0LmdldCh0aGlzKS5mb3JGb2xkZXIoZm9sZGVyKS5wdWxsKCkuZXhlYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgtLXVwZGF0ZUNvdW50ID09IDApIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBib2lsZXIgcGxhdGVzLlxuICAgICAqIFRoaXMgd2lsbCB1cGRhdGUgYW55IGV4aXN0aW5nIGFuZCBkb3dubG9hZCBhbnkgbmV3IG9uZXMuXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbygnVXBkYXRpbmcgYWxsIGJvaWxlciBwbGF0ZXMnKTtcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudXBkYXRlQm9pbGVyUGxhdGVzT25EaXNrKCk7XG4gICAgICAgICAgICBsZXQgbmFtZXMgPSBhd2FpdCB0aGlzLmdldEF2YWlsYWJsZUJvaWxlclBsYXRlcygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgY2xvbmVDb3VudCA9IDA7XG4gICAgICAgICAgICBuYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb2xkZXJOYW1lID0gcGF0aC5qb2luKHRoaXMuYm9pbGVyUGxhdGVMb2NhdGlvbiwgbmFtZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCFfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhmb2xkZXJOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVybCA9IGBodHRwczovL2dpdGh1Yi5jb20vZG9saXR0bGUtYm9pbGVycGxhdGVzLyR7bmFtZX0uZ2l0YDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYEdldHRpbmcgYm9pbGVycGxhdGUgbm90IG9uIGRpc2sgZnJvbSAnJHt1cmx9J2ApO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY2xvbmVDb3VudCsrO1xuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBfZ2l0LmdldCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNpbGVudChmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9uZSh1cmwsIGZvbGRlck5hbWUsIHsgJy0tcmVjdXJzaXZlJzogbnVsbCB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmV4ZWMoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtLWNsb25lQ291bnQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbmZpZ3VyYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgY29uZmlndXJhdGlvbiBmaWxlIG9uIGRpc2tcbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBmb2xkZXJzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEZvbGRlcnNJbih0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24pO1xuICAgICAgICBsZXQgYm9pbGVyUGxhdGVzID0gW107XG4gICAgICAgIGZvbGRlcnMuZm9yRWFjaChmb2xkZXIgPT4ge1xuICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlc1BhdGhzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLnNlYXJjaFJlY3Vyc2l2ZShmb2xkZXIsICdib2lsZXJwbGF0ZS5qc29uJyk7XG4gICAgICAgICAgICBsZXQgY29udGVudEZvbGRlciA9IHBhdGguam9pbihmb2xkZXIsICdDb250ZW50Jyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJvaWxlclBsYXRlc1BhdGhzLmZvckVhY2goYm9pbGVyUGxhdGVQYXRoID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9pbGVyUGxhdGVPYmplY3QgPSBKU09OLnBhcnNlKF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoYm9pbGVyUGxhdGVQYXRoLCAndXRmOCcpKTtcbiAgICAgICAgICAgICAgICBpZiAoYm9pbGVyUGxhdGVPYmplY3QudHlwZSAhPSAnYXJ0aWZhY3RzJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSBfZm9sZGVycy5nZXQodGhpcykuZ2V0Rm9sZGVyc0FuZEZpbGVzUmVjdXJzaXZlbHlJbihjb250ZW50Rm9sZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcGF0aHMgPSBwYXRocy5maWx0ZXIoXyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNCaW5hcnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeUZpbGVzLmZvckVhY2goYiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8udG9Mb3dlckNhc2UoKS5pbmRleE9mKGIpID4gMCkgaXNCaW5hcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNCaW5hcnk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHNOZWVkaW5nQmluZGluZyA9IHBhdGhzLmZpbHRlcihfID0+IF8uaW5kZXhPZigne3snKSA+IDApLm1hcChfID0+IF8uc3Vic3RyKGNvbnRlbnRGb2xkZXIubGVuZ3RoICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZXNOZWVkaW5nQmluZGluZyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBwYXRocy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXQgPSBfZmlsZVN5c3RlbS5nZXQoc2VsZikuc3RhdFN5bmMoXyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlID0gX2ZpbGVTeXN0ZW0uZ2V0KHNlbGYpLnJlYWRGaWxlU3luYyhfKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZS5pbmRleE9mKCd7eycpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXNOZWVkaW5nQmluZGluZy5wdXNoKF8uc3Vic3RyKGNvbnRlbnRGb2xkZXIubGVuZ3RoICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uID0gY29udGVudEZvbGRlcjtcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QucGF0aHNOZWVkaW5nQmluZGluZyA9IHBhdGhzTmVlZGluZ0JpbmRpbmc7XG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmZpbGVzTmVlZGluZ0JpbmRpbmcgPSBmaWxlc05lZWRpbmdCaW5kaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubG9jYXRpb24gPSBwYXRoLmRpcm5hbWUoYm9pbGVyUGxhdGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QucGF0aHNOZWVkaW5nQmluZGluZyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5maWxlc05lZWRpbmdCaW5kaW5nID0gW107XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gbmV3IEJvaWxlclBsYXRlKFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5sYW5ndWFnZSB8fCAnYW55JyxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYm9pbGVyUGxhdGVPYmplY3QuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGJvaWxlclBsYXRlT2JqZWN0LmxvY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5wYXRoc05lZWRpbmdCaW5kaW5nLFxuICAgICAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZU9iamVjdC5maWxlc05lZWRpbmdCaW5kaW5nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBib2lsZXJQbGF0ZXMucHVzaChib2lsZXJQbGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc09iamVjdHMgPSBib2lsZXJQbGF0ZXMubWFwKF8gPT4gXy50b0pzb24oKSk7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZXNBc0pzb24gPSBKU09OLnN0cmluZ2lmeShib2lsZXJQbGF0ZXNBc09iamVjdHMsIG51bGwsIDQpO1xuICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyh0aGlzLmJvaWxlclBsYXRlQ29uZmlnRmlsZSwgYm9pbGVyUGxhdGVzQXNKc29uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2Yge0JvaWxlclBsYXRlfSBpbnRvIGEgc3BlY2lmaWMgZGVzdGluYXRpb24gZm9sZGVyIHdpdGggYSBnaXZlbiBjb250ZXh0XG4gICAgICogQHBhcmFtIHtCb2lsZXJQbGF0ZX0gYm9pbGVyUGxhdGUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IFxuICAgICAqL1xuICAgIGNyZWF0ZUluc3RhbmNlKGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgY29udGV4dCkge1xuICAgICAgICBfZm9sZGVycy5nZXQodGhpcykuY29weShkZXN0aW5hdGlvbiwgYm9pbGVyUGxhdGUubG9jYXRpb24pO1xuICAgICAgICBib2lsZXJQbGF0ZS5wYXRoc05lZWRpbmdCaW5kaW5nLmZvckVhY2goXyA9PiB7XG4gICAgICAgICAgICBsZXQgcGF0aFRvUmVuYW1lID0gcGF0aC5qb2luKGRlc3RpbmF0aW9uLCBfKTtcbiAgICAgICAgICAgIGxldCBzZWdtZW50cyA9IFtdO1xuICAgICAgICAgICAgcGF0aFRvUmVuYW1lLnNwbGl0KC8oXFxcXHxcXC8pLykuZm9yRWFjaChzZWdtZW50ID0+IHNlZ21lbnRzLnB1c2goSGFuZGxlYmFycy5jb21waWxlKHNlZ21lbnQpKGNvbnRleHQpKSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gc2VnbWVudHMuam9pbignJyk7XG4gICAgICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykucmVuYW1lU3luYyhwYXRoVG9SZW5hbWUsIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgYm9pbGVyUGxhdGUuZmlsZXNOZWVkaW5nQmluZGluZy5mb3JFYWNoKF8gPT4ge1xuICAgICAgICAgICAgbGV0IGZpbGUgPSBwYXRoLmpvaW4oZGVzdGluYXRpb24sIF8pO1xuXG4gICAgICAgICAgICBsZXQgY29udGVudCA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoZmlsZSwgJ3V0ZjgnKVxuICAgICAgICAgICAgbGV0IHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKGNvbnRlbnQpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRlbXBsYXRlKGNvbnRleHQpO1xuICAgICAgICAgICAgX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLndyaXRlRmlsZVN5bmMoZmlsZSwgcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB7Qm9pbGVyUGxhdGV9IG9mIGFuIGFydGlmYWN0IGludG8gYSBzcGVjaWZpYyBkZXN0aW5hdGlvbiBmb2xkZXIgd2l0aCBhIGdpdmVuIGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge3t0ZW1wbGF0ZTogYW55LCBsb2NhdGlvbjogc3RyaW5nfX0gYXJ0aWZhY3RUZW1wbGF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvbiBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dCBcbiAgICAgKi9cbiAgICBjcmVhdGVBcnRpZmFjdEluc3RhbmNlKGFydGlmYWN0VGVtcGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIGxldCBmaWxlc1RvQ3JlYXRlID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLmdldEFydGlmYWN0VGVtcGxhdGVGaWxlc1JlY3Vyc2l2ZWx5SW4oYXJ0aWZhY3RUZW1wbGF0ZS5sb2NhdGlvbiwgYXJ0aWZhY3RUZW1wbGF0ZS50ZW1wbGF0ZS5pbmNsdWRlZEZpbGVzKTtcblxuICAgICAgICBmaWxlc1RvQ3JlYXRlLmZvckVhY2goIGZpbGVQYXRoID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2ggPSBmaWxlUGF0aC5tYXRjaCgvKFxcXFx8XFwvKS8pO1xuICAgICAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gZmlsZVBhdGgubGFzdEluZGV4T2YobGFzdFBhdGhTZXBhcmF0b3JNYXRjaFtsYXN0UGF0aFNlcGFyYXRvck1hdGNoLmxlbmd0aC0xXSlcbiAgICAgICAgICAgIGNvbnN0IGZpbGVuYW1lID0gZmlsZVBhdGguc3Vic3RyaW5nKGxhc3RJbmRleCsxLCBmaWxlUGF0aC5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3Qgb2xkQ29udGVudCA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4Jyk7XG4gICAgICAgICAgICBsZXQgc2VnbWVudHMgPSBbXTtcblxuICAgICAgICAgICAgcGF0aC5qb2luKGRlc3RpbmF0aW9uLCBmaWxlbmFtZSkuc3BsaXQoLyhcXFxcfFxcLykvKS5mb3JFYWNoKHNlZ21lbnQgPT4gc2VnbWVudHMucHVzaChIYW5kbGViYXJzLmNvbXBpbGUoc2VnbWVudCkoY29udGV4dCkpKTtcbiAgICAgICAgICAgIGxldCBuZXdGaWxlUGF0aCA9IHNlZ21lbnRzLmpvaW4oJycpO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShvbGRDb250ZW50KTtcbiAgICAgICAgICAgIGxldCBuZXdDb250ZW50ID0gdGVtcGxhdGUoY29udGV4dCk7XG4gICAgICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyhuZXdGaWxlUGF0aCwgbmV3Q29udGVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB7Qm9pbGVyUGxhdGV9IG9mIGFuIGFydGlmYWN0IGludG8gYSBzcGVjaWZpYyBkZXN0aW5hdGlvbiBmb2xkZXIgd2l0aCBhIGdpdmVuIGNvbnRleHRcbiAgICAvLyAgKiBAcGFyYW0ge3N0cmluZ30gYXJ0aWZhY3RUeXBlIFxuICAgIC8vICAqIEBwYXJhbSB7c3RyaW5nfSBhcnRpZmFjdExhbmd1YWdlIFxuICAgIC8vICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGV9IGJvaWxlclBsYXRlIFxuICAgIC8vICAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvbiBcbiAgICAvLyAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dCBcbiAgICAvLyAgKi9cbiAgICAvLyBjcmVhdGVBcnRpZmFjdEluc3RhbmNlKGFydGlmYWN0VHlwZSwgYXJ0aWZhY3RMYW5ndWFnZSwgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KSB7XG4gICAgLy8gICAgIGxldCB0ZW1wbGF0ZUZpbGVzID0gX2ZvbGRlcnMuZ2V0KHRoaXMpLnNlYXJjaFJlY3Vyc2l2ZShib2lsZXJQbGF0ZS5sb2NhdGlvbiwgJ3RlbXBsYXRlLmpzb24nKTtcbiAgICAvLyAgICAgbGV0IHRlbXBsYXRlc0FuZExvY2F0aW9uID0gW107XG4gICAgLy8gICAgIHRlbXBsYXRlRmlsZXMuZm9yRWFjaChfID0+IHtcbiAgICAvLyAgICAgICAgIGNvbnN0IGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2ggPSBfLm1hdGNoKC8oXFxcXHxcXC8pLyk7XG4gICAgLy8gICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBfLmxhc3RJbmRleE9mKGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2hbbGFzdFBhdGhTZXBhcmF0b3JNYXRjaC5sZW5ndGgtMV0pO1xuICAgIC8vICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB7XG4gICAgLy8gICAgICAgICAgICAgJ3RlbXBsYXRlJzogSlNPTi5wYXJzZShfZmlsZVN5c3RlbS5nZXQodGhpcykucmVhZEZpbGVTeW5jKF8sICd1dGY4JykpLFxuICAgIC8vICAgICAgICAgICAgICdsb2NhdGlvbic6IF8uc3Vic3RyaW5nKDAsIGxhc3RJbmRleCsxKVxuICAgIC8vICAgICAgICAgfTtcbiAgICAvLyAgICAgICAgIHRlbXBsYXRlc0FuZExvY2F0aW9uLnB1c2godGVtcGxhdGUpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgICAgY29uc3QgdGVtcGxhdGUgPSB0ZW1wbGF0ZXNBbmRMb2NhdGlvbi5maWx0ZXIodGVtcGxhdGUgPT4gdGVtcGxhdGUudGVtcGxhdGUudHlwZSA9PSBhcnRpZmFjdFR5cGUgJiYgdGVtcGxhdGUudGVtcGxhdGUubGFuZ3VhZ2UgPT0gYXJ0aWZhY3RMYW5ndWFnZSlbMF07XG4gICAgLy8gICAgIGlmICh0ZW1wbGF0ZSA9PT0gdW5kZWZpbmVkIHx8IHRlbXBsYXRlID09PSBudWxsKSB7XG4gICAgLy8gICAgICAgICB0aGlzLl9sb2dnZXIuZXJyb3IoYENvdWxkIG5vdCBmaW5kIHRlbXBsYXRlLmpzb24gZm9yIGFydGlmYWN0IHdpdGggbGFuZ3VhZ2UgJyR7YXJ0aWZhY3RMYW5ndWFnZX0nIGFuZCB0eXBlICcke2FydGlmYWN0VHlwZX0nYCk7XG4gICAgLy8gICAgICAgICB0aHJvdyAnQXJ0aWZhY3QgdGVtcGxhdGUgbm90IGZvdW5kJztcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBsZXQgZmlsZXNUb0NyZWF0ZSA9IF9mb2xkZXJzLmdldCh0aGlzKS5nZXRBcnRpZmFjdFRlbXBsYXRlRmlsZXNSZWN1cnNpdmVseUluKHRlbXBsYXRlLmxvY2F0aW9uLCB0ZW1wbGF0ZS50ZW1wbGF0ZS5pbmNsdWRlZEZpbGVzKTtcblxuICAgIC8vICAgICBmaWxlc1RvQ3JlYXRlLmZvckVhY2goIGZpbGVQYXRoID0+IHtcbiAgICAvLyAgICAgICAgIGNvbnN0IGxhc3RQYXRoU2VwYXJhdG9yTWF0Y2ggPSBmaWxlUGF0aC5tYXRjaCgvKFxcXFx8XFwvKS8pO1xuICAgIC8vICAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gZmlsZVBhdGgubGFzdEluZGV4T2YobGFzdFBhdGhTZXBhcmF0b3JNYXRjaFtsYXN0UGF0aFNlcGFyYXRvck1hdGNoLmxlbmd0aC0xXSlcbiAgICAvLyAgICAgICAgIGNvbnN0IGZpbGVuYW1lID0gZmlsZVBhdGguc3Vic3RyaW5nKGxhc3RJbmRleCsxLCBmaWxlUGF0aC5sZW5ndGgpO1xuICAgIC8vICAgICAgICAgY29uc3Qgb2xkQ29udGVudCA9IF9maWxlU3lzdGVtLmdldCh0aGlzKS5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGY4Jyk7XG4gICAgLy8gICAgICAgICBsZXQgc2VnbWVudHMgPSBbXTtcblxuICAgIC8vICAgICAgICAgcGF0aC5qb2luKGRlc3RpbmF0aW9uLCBmaWxlbmFtZSkuc3BsaXQoLyhcXFxcfFxcLykvKS5mb3JFYWNoKHNlZ21lbnQgPT4gc2VnbWVudHMucHVzaChIYW5kbGViYXJzLmNvbXBpbGUoc2VnbWVudCkoY29udGV4dCkpKTtcbiAgICAvLyAgICAgICAgIGxldCBuZXdGaWxlUGF0aCA9IHNlZ21lbnRzLmpvaW4oJycpO1xuICAgICAgICAgICBcbiAgICAvLyAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShvbGRDb250ZW50KTtcbiAgICAvLyAgICAgICAgIGxldCBuZXdDb250ZW50ID0gdGVtcGxhdGUoY29udGV4dCk7XG4gICAgLy8gICAgICAgICBfZmlsZVN5c3RlbS5nZXQodGhpcykud3JpdGVGaWxlU3luYyhuZXdGaWxlUGF0aCwgbmV3Q29udGVudCk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIHdoZXRoZXIgb3Igbm90IHRoZXJlIGFyZSBib2lsZXIgcGxhdGVzIGluc3RhbGxlZFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZXJlIGFyZSwgZmFsc2UgaWYgbm90XG4gICAgICovXG4gICAgZ2V0IGhhc0JvaWxlclBsYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIF9oYXNCb2lsZXJQbGF0ZXMuZ2V0KHRoaXMpO1xuICAgIH1cbn0iXX0=