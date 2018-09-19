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

var _InquirerManager = require('./InquirerManager');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _boilerPlatesManager = new WeakMap(); /*---------------------------------------------------------------------------------------------
                                           *  Copyright (c) Dolittle. All rights reserved.
                                           *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                           *--------------------------------------------------------------------------------------------*/

var _folders = new WeakMap();
var _fileSystem = new WeakMap();
var _inquirerManager = new WeakMap();

/**
 * Represents a manager for artifacts
 */

var ArtifactsManager = exports.ArtifactsManager = function () {
    /**
     * Initializes a new instance of {ApplicationManager}
     * @param {InquirerManager} inquirerManager
     * @param {BoilerPlatesManager} boilerPlatesManager
     * @param {Folders} folders 
     * @param {fs} fileSystem
     * @param {Logger} logger
     */
    function ArtifactsManager(inquirerManager, boilerPlatesManager, folders, fileSystem, logger) {
        (0, _classCallCheck3.default)(this, ArtifactsManager);

        _inquirerManager.set(this, inquirerManager);
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
         * Create an event
         * @param {string} name 
         * @param {string} namespace 
         */

    }, {
        key: 'createEvent',
        value: function createEvent(name, namespace) {
            this._logger.info('Creating event with name \'' + name + '\' and namespace \'' + namespace + '\'');

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var context = {
                name: name,
                namespace: namespace
            };
            var destination = process.cwd();

            _boilerPlatesManager.get(this).createArtifactInstance('event', 'csharp', boilerPlate, destination, context);
        }
        /**
         * Create a read model
         * @param {string} name 
         * @param {string} namespace 
         */

    }, {
        key: 'createReadModel',
        value: function createReadModel(name, namespace) {
            this._logger.info('Creating read model with name \'' + name + '\' and namespace \'' + namespace + '\'');

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var context = {
                name: name,
                namespace: namespace
            };
            var destination = process.cwd();

            _boilerPlatesManager.get(this).createArtifactInstance('readModel', 'csharp', boilerPlate, destination, context);
        }
        /**
         * Create an aggregate root
         * @param {string} name 
         * @param {string} namespace 
         */

    }, {
        key: 'createAggregateRoot',
        value: function createAggregateRoot(name, namespace) {
            this._logger.info('Creating aggregate root with name \'' + name + '\' and namespace \'' + namespace + '\'');

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var context = {
                name: name,
                namespace: namespace
            };
            var destination = process.cwd();

            _boilerPlatesManager.get(this).createArtifactInstance('aggregateRoot', 'csharp', boilerPlate, destination, context);
        }
        /**
         * Create a query
         * @param {string} language
         */

    }, {
        key: 'createQuery',
        value: function createQuery(language) {
            var _this = this;

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];

            _inquirerManager.get(this).promptForQuery(language).then(function (context) {

                console.log("context: ", context);
                var destination = process.cwd();

                _boilerPlatesManager.get(_this).createArtifactInstance('query', 'csharp', boilerPlate, destination, context);
            });
        }
        /**
         * Create a query for a specific read model
         * @param {string} name 
         * @param {string} namespace 
         */

    }, {
        key: 'createQueryFor',
        value: function createQueryFor(name, namespace) {
            this._logger.info('Creating queryfor with name \'' + name + '\' and namespace \'' + namespace + '\'');

            var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByType('artifacts')[0];
            var context = {
                name: name,
                namespace: namespace
            };
            var destination = process.cwd();

            _boilerPlatesManager.get(this).createArtifactInstance('queryFor', 'csharp', boilerPlate, destination, context);
        }
    }]);
    return ArtifactsManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQXJ0aWZhY3RzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfYm9pbGVyUGxhdGVzTWFuYWdlciIsIldlYWtNYXAiLCJfZm9sZGVycyIsIl9maWxlU3lzdGVtIiwiX2lucXVpcmVyTWFuYWdlciIsIkFydGlmYWN0c01hbmFnZXIiLCJpbnF1aXJlck1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJzZXQiLCJfbG9nZ2VyIiwibmFtZSIsIm5hbWVzcGFjZSIsImluZm8iLCJib2lsZXJQbGF0ZSIsImdldCIsImJvaWxlclBsYXRlc0J5VHlwZSIsImNvbnRleHQiLCJkZXN0aW5hdGlvbiIsInByb2Nlc3MiLCJjd2QiLCJjcmVhdGVBcnRpZmFjdEluc3RhbmNlIiwibGFuZ3VhZ2UiLCJwcm9tcHRGb3JRdWVyeSIsInRoZW4iLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsdUJBQXVCLElBQUlDLE9BQUosRUFBN0IsQyxDQVZBOzs7OztBQVdBLElBQU1DLFdBQVcsSUFBSUQsT0FBSixFQUFqQjtBQUNBLElBQU1FLGNBQWMsSUFBSUYsT0FBSixFQUFwQjtBQUNBLElBQU1HLG1CQUFtQixJQUFJSCxPQUFKLEVBQXpCOztBQUdBOzs7O0lBR2FJLGdCLFdBQUFBLGdCO0FBQ1Q7Ozs7Ozs7O0FBUUEsOEJBQVlDLGVBQVosRUFBNkJDLG1CQUE3QixFQUFrREMsT0FBbEQsRUFBMkRDLFVBQTNELEVBQXVFQyxNQUF2RSxFQUErRTtBQUFBOztBQUMzRU4seUJBQWlCTyxHQUFqQixDQUFxQixJQUFyQixFQUEyQkwsZUFBM0I7QUFDQU4sNkJBQXFCVyxHQUFyQixDQUF5QixJQUF6QixFQUErQkosbUJBQS9CO0FBQ0FMLGlCQUFTUyxHQUFULENBQWEsSUFBYixFQUFt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QUFxQixJQUFyQixFQUEyQlEsY0FBM0IsQ0FBMENELFFBQTFDLEVBQ0tFLElBREwsQ0FDVSxtQkFBVzs7QUFFYkMsd0JBQVFDLEdBQVIsQ0FBWSxXQUFaLEVBQXlCVCxPQUF6QjtBQUNBLG9CQUFJQyxjQUFjQyxRQUFRQyxHQUFSLEVBQWxCOztBQUVBdEIscUNBQXFCaUIsR0FBckIsQ0FBeUIsS0FBekIsRUFBK0JNLHNCQUEvQixDQUFzRCxPQUF0RCxFQUErRCxRQUEvRCxFQUF5RVAsV0FBekUsRUFBc0ZJLFdBQXRGLEVBQW1HRCxPQUFuRztBQUNILGFBUEw7QUFRSDtBQUNEOzs7Ozs7Ozt1Q0FLZU4sSSxFQUFNQyxTLEVBQVc7QUFDNUIsaUJBQUtGLE9BQUwsQ0FBYUcsSUFBYixvQ0FBa0RGLElBQWxELDJCQUEwRUMsU0FBMUU7O0FBRUEsZ0JBQUlFLGNBQWNoQixxQkFBcUJpQixHQUFyQixDQUF5QixJQUF6QixFQUErQkMsa0JBQS9CLENBQWtELFdBQWxELEVBQStELENBQS9ELENBQWxCO0FBQ0EsZ0JBQUlDLFVBQVU7QUFDVk4sc0JBQU1BLElBREk7QUFFVkMsMkJBQVdBO0FBRkQsYUFBZDtBQUlBLGdCQUFJTSxjQUFjQyxRQUFRQyxHQUFSLEVBQWxCOztBQUVBdEIsaUNBQXFCaUIsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JNLHNCQUEvQixDQUFzRCxVQUF0RCxFQUFrRSxRQUFsRSxFQUE0RVAsV0FBNUUsRUFBeUZJLFdBQXpGLEVBQXNHRCxPQUF0RztBQUNIIiwiZmlsZSI6IkFydGlmYWN0c01hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG5pbXBvcnQge8KgTG9nZ2VyIH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQge8KgQm9pbGVyUGxhdGVzTWFuYWdlcn0gZnJvbSAnLi4vYm9pbGVyUGxhdGVzL0JvaWxlclBsYXRlc01hbmFnZXInO1xuaW1wb3J0IHsgSW5xdWlyZXJNYW5hZ2VyIH0gZnJvbSAnLi9JbnF1aXJlck1hbmFnZXInO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuY29uc3QgX2JvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2lucXVpcmVyTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbWFuYWdlciBmb3IgYXJ0aWZhY3RzXG4gKi9cbmV4cG9ydCBjbGFzcyBBcnRpZmFjdHNNYW5hZ2VyIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7QXBwbGljYXRpb25NYW5hZ2VyfVxuICAgICAqIEBwYXJhbSB7SW5xdWlyZXJNYW5hZ2VyfSBpbnF1aXJlck1hbmFnZXJcbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlc01hbmFnZXJ9IGJvaWxlclBsYXRlc01hbmFnZXJcbiAgICAgKiBAcGFyYW0ge0ZvbGRlcnN9IGZvbGRlcnMgXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqIEBwYXJhbSB7TG9nZ2VyfSBsb2dnZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpbnF1aXJlck1hbmFnZXIsIGJvaWxlclBsYXRlc01hbmFnZXIsIGZvbGRlcnMsIGZpbGVTeXN0ZW0sIGxvZ2dlcikge1xuICAgICAgICBfaW5xdWlyZXJNYW5hZ2VyLnNldCh0aGlzLCBpbnF1aXJlck1hbmFnZXIpO1xuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5zZXQodGhpcywgYm9pbGVyUGxhdGVzTWFuYWdlcik7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICAgICAgX2ZpbGVTeXN0ZW0uc2V0KHRoaXMsIGZpbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLl9sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY29tbWFuZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2UgXG4gICAgICovXG4gICAgY3JlYXRlQ29tbWFuZChuYW1lLCBuYW1lc3BhY2UpIHtcbiAgICAgICAgdGhpcy5fbG9nZ2VyLmluZm8oYENyZWF0aW5nIGNvbW1hbmQgd2l0aCBuYW1lICcke25hbWV9JyBhbmQgbmFtZXNwYWNlICcke25hbWVzcGFjZX0nYCk7XG5cbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5VHlwZSgnYXJ0aWZhY3RzJylbMF07XG4gICAgICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlXG4gICAgICAgIH07XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICAgIFxuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSgnY29tbWFuZCcsICdjc2hhcnAnLCBib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gZXZlbnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlIFxuICAgICAqL1xuICAgIGNyZWF0ZUV2ZW50KG5hbWUsIG5hbWVzcGFjZSkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgZXZlbnQgd2l0aCBuYW1lICcke25hbWV9JyBhbmQgbmFtZXNwYWNlICcke25hbWVzcGFjZX0nYCk7XG5cbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5VHlwZSgnYXJ0aWZhY3RzJylbMF07XG4gICAgICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlXG4gICAgICAgIH07XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICAgIFxuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSgnZXZlbnQnLCAnY3NoYXJwJywgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcmVhZCBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2UgXG4gICAgICovXG4gICAgY3JlYXRlUmVhZE1vZGVsKG5hbWUsIG5hbWVzcGFjZSkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgcmVhZCBtb2RlbCB3aXRoIG5hbWUgJyR7bmFtZX0nIGFuZCBuYW1lc3BhY2UgJyR7bmFtZXNwYWNlfSdgKTtcblxuICAgICAgICBsZXQgYm9pbGVyUGxhdGUgPSBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuYm9pbGVyUGxhdGVzQnlUeXBlKCdhcnRpZmFjdHMnKVswXTtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgbmFtZXNwYWNlOiBuYW1lc3BhY2VcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGRlc3RpbmF0aW9uID0gcHJvY2Vzcy5jd2QoKTtcbiAgICAgICAgXG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVBcnRpZmFjdEluc3RhbmNlKCdyZWFkTW9kZWwnLCAnY3NoYXJwJywgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGFnZ3JlZ2F0ZSByb290XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZSBcbiAgICAgKi9cbiAgICBjcmVhdGVBZ2dyZWdhdGVSb290KG5hbWUsIG5hbWVzcGFjZSkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgYWdncmVnYXRlIHJvb3Qgd2l0aCBuYW1lICcke25hbWV9JyBhbmQgbmFtZXNwYWNlICcke25hbWVzcGFjZX0nYCk7XG5cbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5VHlwZSgnYXJ0aWZhY3RzJylbMF07XG4gICAgICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlXG4gICAgICAgIH07XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICAgIFxuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSgnYWdncmVnYXRlUm9vdCcsICdjc2hhcnAnLCBib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBxdWVyeVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGNyZWF0ZVF1ZXJ5KGxhbmd1YWdlKSB7XG4gICAgICAgIGxldCBib2lsZXJQbGF0ZSA9IF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5ib2lsZXJQbGF0ZXNCeVR5cGUoJ2FydGlmYWN0cycpWzBdO1xuXG4gICAgICAgIF9pbnF1aXJlck1hbmFnZXIuZ2V0KHRoaXMpLnByb21wdEZvclF1ZXJ5KGxhbmd1YWdlKVxuICAgICAgICAgICAgLnRoZW4oY29udGV4dCA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbnRleHQ6IFwiLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICBsZXQgZGVzdGluYXRpb24gPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSgncXVlcnknLCAnY3NoYXJwJywgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTsgIFxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHF1ZXJ5IGZvciBhIHNwZWNpZmljIHJlYWQgbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZXNwYWNlIFxuICAgICAqL1xuICAgIGNyZWF0ZVF1ZXJ5Rm9yKG5hbWUsIG5hbWVzcGFjZSkge1xuICAgICAgICB0aGlzLl9sb2dnZXIuaW5mbyhgQ3JlYXRpbmcgcXVlcnlmb3Igd2l0aCBuYW1lICcke25hbWV9JyBhbmQgbmFtZXNwYWNlICcke25hbWVzcGFjZX0nYCk7XG5cbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5VHlwZSgnYXJ0aWZhY3RzJylbMF07XG4gICAgICAgIGxldCBjb250ZXh0ID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlXG4gICAgICAgIH07XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICAgIFxuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5nZXQodGhpcykuY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSgncXVlcnlGb3InLCAnY3NoYXJwJywgYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBjb250ZXh0KTtcbiAgICB9XG59Il19