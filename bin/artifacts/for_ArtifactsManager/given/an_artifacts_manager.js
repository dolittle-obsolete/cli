'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.an_artifacts_manager = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _ArtifactsManager = require('../../ArtifactsManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var an_artifacts_manager = exports.an_artifacts_manager = function an_artifacts_manager() {
    (0, _classCallCheck3.default)(this, an_artifacts_manager);

    this.inquirerManager = {
        promptUser: sinon.stub().returns({
            then: sinon.stub()
        })
    };
    this.boilerPlatesManager = {
        createArtifactInstance: sinon.stub()
    };
    this.boundedContextManager = {};
    this.folders = {};
    this.fileSystem = {};

    this.artifactsManager = new _ArtifactsManager.ArtifactsManager(this.inquirerManager, this.boilerPlatesManager, this.boundedContextManager, this.folders, this.fileSystem, logger);
}; /*---------------------------------------------------------------------------------------------
    *  Copyright (c) Dolittle. All rights reserved.
    *  Licensed under the MIT License. See LICENSE in the project root for license information.
    *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvZm9yX0FydGlmYWN0c01hbmFnZXIvZ2l2ZW4vYW5fYXJ0aWZhY3RzX21hbmFnZXIuanMiXSwibmFtZXMiOlsiYW5fYXJ0aWZhY3RzX21hbmFnZXIiLCJpbnF1aXJlck1hbmFnZXIiLCJwcm9tcHRVc2VyIiwic2lub24iLCJzdHViIiwicmV0dXJucyIsInRoZW4iLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZSIsImJvdW5kZWRDb250ZXh0TWFuYWdlciIsImZvbGRlcnMiLCJmaWxlU3lzdGVtIiwiYXJ0aWZhY3RzTWFuYWdlciIsIkFydGlmYWN0c01hbmFnZXIiLCJsb2dnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBSUE7Ozs7SUFFYUEsb0IsV0FBQUEsb0IsR0FDVCxnQ0FBYztBQUFBOztBQUNWLFNBQUtDLGVBQUwsR0FBdUI7QUFDbkJDLG9CQUFZQyxNQUFNQyxJQUFOLEdBQWFDLE9BQWIsQ0FBcUI7QUFDN0JDLGtCQUFNSCxNQUFNQyxJQUFOO0FBRHVCLFNBQXJCO0FBRE8sS0FBdkI7QUFLQSxTQUFLRyxtQkFBTCxHQUEyQjtBQUN2QkMsZ0NBQXdCTCxNQUFNQyxJQUFOO0FBREQsS0FBM0I7QUFHQSxTQUFLSyxxQkFBTCxHQUE2QixFQUE3QjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixFQUFsQjs7QUFFQSxTQUFLQyxnQkFBTCxHQUF3QixJQUFJQyxrQ0FBSixDQUFxQixLQUFLWixlQUExQixFQUEyQyxLQUFLTSxtQkFBaEQsRUFBcUUsS0FBS0UscUJBQTFFLEVBQWlHLEtBQUtDLE9BQXRHLEVBQStHLEtBQUtDLFVBQXBILEVBQWdJRyxNQUFoSSxDQUF4QjtBQUVILEMsRUF0QkwiLCJmaWxlIjoiYW5fYXJ0aWZhY3RzX21hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBBcnRpZmFjdHNNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vQXJ0aWZhY3RzTWFuYWdlcic7XG5cbmV4cG9ydCBjbGFzcyBhbl9hcnRpZmFjdHNfbWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5xdWlyZXJNYW5hZ2VyID0ge1xuICAgICAgICAgICAgcHJvbXB0VXNlcjogc2lub24uc3R1YigpLnJldHVybnMoe1xuICAgICAgICAgICAgICAgIHRoZW46IHNpbm9uLnN0dWIoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyID0ge1xuICAgICAgICAgICAgY3JlYXRlQXJ0aWZhY3RJbnN0YW5jZTogc2lub24uc3R1YigpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYm91bmRlZENvbnRleHRNYW5hZ2VyID0ge307XG4gICAgICAgIHRoaXMuZm9sZGVycyA9IHt9O1xuICAgICAgICB0aGlzLmZpbGVTeXN0ZW0gPSB7fTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYXJ0aWZhY3RzTWFuYWdlciA9IG5ldyBBcnRpZmFjdHNNYW5hZ2VyKHRoaXMuaW5xdWlyZXJNYW5hZ2VyLCB0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuYm91bmRlZENvbnRleHRNYW5hZ2VyLCB0aGlzLmZvbGRlcnMsIHRoaXMuZmlsZVN5c3RlbSwgbG9nZ2VyKTtcblxuICAgIH1cbn0iXX0=