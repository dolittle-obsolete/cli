'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtifactsManager = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Folders = require('../Folders');

var _winston = require('winston');

var _BoilerPlatesManager = require('../boilerPlates/BoilerPlatesManager');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applicationFilename = "application.json"; /*---------------------------------------------------------------------------------------------
                                               *  Copyright (c) Dolittle. All rights reserved.
                                               *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                               *--------------------------------------------------------------------------------------------*/


var _boilerPlatesManager = new WeakMap();
var _folders = new WeakMap();
var _fileSystem = new WeakMap();

/**
 * Represents a manager for artifacts
 */

var ArtifactsManager = exports.ArtifactsManager = function () {
  /**
   * Initializes a new instance of {ApplicationManager}
   * @param {BoilerPlatesManager} boilerPlatesManager
   * @param {Folders} folders 
   * @param {fs} fileSystem
   * @param {Logger} logger
   */
  function ArtifactsManager(boilerPlatesManager, folders, fileSystem, logger) {
    (0, _classCallCheck3.default)(this, ArtifactsManager);

    _boilerPlatesManager.set(this, boilerPlatesManager);
    _folders.set(this, folders);
    _fileSystem.set(this, fileSystem);
    this._logger = logger;
  }

  /**
   * Create a command
   * @param {string} name 
   * @param {string} namespace 
   */


  (0, _createClass3.default)(ArtifactsManager, [{
    key: 'createCommand',
    value: function createCommand(name, namespace) {
      this._logger.info('Creating command with name \'' + name + '\' and namespace \'' + namespace + '\'');

      var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
      var context = {
        name: name,
        namespace: namespace
      };
      var destination = process.cwd();

      _boilerPlatesManager.get(this).createArtifactInstance('command', 'csharp', boilerPlate, destination, context);
    }

    /**
     * Check if an application has been setup
     */

  }, {
    key: 'hasApplication',
    value: function hasApplication() {
      return _fileSystem.get(this).existsSync(_path2.default.join(process.cwd(), applicationFilename));
    }
  }]);
  return ArtifactsManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJhcHBsaWNhdGlvbkZpbGVuYW1lIiwiX2JvaWxlclBsYXRlc01hbmFnZXIiLCJXZWFrTWFwIiwiX2ZvbGRlcnMiLCJfZmlsZVN5c3RlbSIsIkFydGlmYWN0c01hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwibmFtZSIsIm5hbWVzcGFjZSIsImluZm8iLCJib2lsZXJQbGF0ZSIsImdldCIsImJvaWxlclBsYXRlc0J5VHlwZSIsImNvbnRleHQiLCJkZXN0aW5hdGlvbiIsInByb2Nlc3MiLCJjd2QiLCJjcmVhdGVBcnRpZmFjdEluc3RhbmNlIiwiZXhpc3RzU3luYyIsInBhdGgiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxzQkFBc0Isa0JBQTVCLEMsQ0FWQTs7Ozs7O0FBWUEsSUFBTUMsdUJBQXVCLElBQUlDLE9BQUosRUFBN0I7QUFDQSxJQUFNQyxXQUFXLElBQUlELE9BQUosRUFBakI7QUFDQSxJQUFNRSxjQUFjLElBQUlGLE9BQUosRUFBcEI7O0FBR0E7Ozs7SUFHYUcsZ0IsV0FBQUEsZ0I7QUFDVDs7Ozs7OztBQU9BLDRCQUFZQyxtQkFBWixFQUFpQ0MsT0FBakMsRUFBMENDLFVBQTFDLEVBQXNEQyxNQUF0RCxFQUE4RDtBQUFBOztBQUMxRFIseUJBQXFCUyxHQUFyQixDQUF5QixJQUF6QixFQUErQkosbUJBQS9CO0FBQ0FILGFBQVNPLEdBQVQsQ0FBYSxJQUFiLEVBQW1CSCxPQUFuQjtBQUNBSCxnQkFBWU0sR0FBWixDQUFnQixJQUFoQixFQUFzQkYsVUFBdEI7QUFDQSxTQUFLRyxPQUFMLEdBQWVGLE1BQWY7QUFDSDs7QUFFRDs7Ozs7Ozs7O2tDQUtjRyxJLEVBQU1DLFMsRUFBVztBQUMzQixXQUFLRixPQUFMLENBQWFHLElBQWIsbUNBQWlERixJQUFqRCwyQkFBeUVDLFNBQXpFOztBQUVBLFVBQUlFLGNBQWNkLHFCQUFxQmUsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JDLGtCQUEvQixDQUFrRCxXQUFsRCxFQUErRCxDQUEvRCxDQUFsQjtBQUNBLFVBQUlDLFVBQVU7QUFDVk4sY0FBTUEsSUFESTtBQUVWQyxtQkFBV0E7QUFGRCxPQUFkO0FBSUEsVUFBSU0sY0FBY0MsUUFBUUMsR0FBUixFQUFsQjs7QUFFQXBCLDJCQUFxQmUsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JNLHNCQUEvQixDQUFzRCxTQUF0RCxFQUFpRSxRQUFqRSxFQUEyRVAsV0FBM0UsRUFBd0ZJLFdBQXhGLEVBQXFHRCxPQUFyRztBQUNIOztBQUVEOzs7Ozs7cUNBR2lCO0FBQ2IsYUFBT2QsWUFBWVksR0FBWixDQUFnQixJQUFoQixFQUFzQk8sVUFBdEIsQ0FBaUNDLGVBQUtDLElBQUwsQ0FBVUwsUUFBUUMsR0FBUixFQUFWLEVBQXdCckIsbUJBQXhCLENBQWpDLENBQVA7QUFDSCIsImZpbGUiOiJBcnRpZmFjdHNNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgRm9sZGVycyB9IGZyb20gJy4uL0ZvbGRlcnMnO1xuaW1wb3J0IHvCoExvZ2dlciB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHvCoEJvaWxlclBsYXRlc01hbmFnZXJ9IGZyb20gJy4uL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuY29uc3QgYXBwbGljYXRpb25GaWxlbmFtZSA9IFwiYXBwbGljYXRpb24uanNvblwiO1xuXG5jb25zdCBfYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZVN5c3RlbSA9IG5ldyBXZWFrTWFwKCk7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbWFuYWdlciBmb3IgYXJ0aWZhY3RzXG4gKi9cbmV4cG9ydCBjbGFzcyBBcnRpZmFjdHNNYW5hZ2VyIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7QXBwbGljYXRpb25NYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7Qm9pbGVyUGxhdGVzTWFuYWdlcn0gYm9pbGVyUGxhdGVzTWFuYWdlclxuICAgICAqIEBwYXJhbSB7Rm9sZGVyc30gZm9sZGVycyBcbiAgICAgKiBAcGFyYW0ge2ZzfSBmaWxlU3lzdGVtXG4gICAgICogQHBhcmFtIHtMb2dnZXJ9IGxvZ2dlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGJvaWxlclBsYXRlc01hbmFnZXIsIGZvbGRlcnMsIGZpbGVTeXN0ZW0sIGxvZ2dlcikge1xuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5zZXQodGhpcywgYm9pbGVyUGxhdGVzTWFuYWdlcik7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY29tbWFuZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2UgXG4gICAgICovXG4gICAgY3JlYXRlQ29tbWFuZChuYW1lLCBuYW1lc3BhY2UpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGNvbW1hbmQgd2l0aCBuYW1lICcke25hbWV9JyBhbmQgbmFtZXNwYWNlICcke25hbWVzcGFjZX0nYCk7XG5cbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5VHlwZSgnYXJ0aWZhY3RzJylbMF07XG4gICAgICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlXG4gICAgICAgIH07XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICAgIFxuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSgnY29tbWFuZCcsICdjc2hhcnAnLCBib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGFuIGFwcGxpY2F0aW9uIGhhcyBiZWVuIHNldHVwXG4gICAgICovXG4gICAgaGFzQXBwbGljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBfZmlsZVN5c3RlbS5nZXQodGhpcykuZXhpc3RzU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSxhcHBsaWNhdGlvbkZpbGVuYW1lKSk7XG4gICAgfVxufSJdfQ==