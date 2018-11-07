'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_system_that_returns_a_bounded_context_configuration_without_a_backend_language = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BoundedContext = require('../../../../boundedContexts/BoundedContext');

var _an_artifacts_manager2 = require('../../given/an_artifacts_manager');

var _Backend = require('../../../../boundedContexts/Backend');

var _ArtifactsManager = require('../../../ArtifactsManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var a_system_that_returns_a_bounded_context_configuration_without_a_backend_language = exports.a_system_that_returns_a_bounded_context_configuration_without_a_backend_language = function (_an_artifacts_manager) {
    (0, _inherits3.default)(a_system_that_returns_a_bounded_context_configuration_without_a_backend_language, _an_artifacts_manager);

    function a_system_that_returns_a_bounded_context_configuration_without_a_backend_language() {
        (0, _classCallCheck3.default)(this, a_system_that_returns_a_bounded_context_configuration_without_a_backend_language);

        var _this = (0, _possibleConstructorReturn3.default)(this, (a_system_that_returns_a_bounded_context_configuration_without_a_backend_language.__proto__ || Object.getPrototypeOf(a_system_that_returns_a_bounded_context_configuration_without_a_backend_language)).call(this));

        _this.application = 'e29795b6-b501-4d6f-b93c-4c25bab6969d';
        _this.boundedContext = 'cde734bc-927f-4feb-a431-02abfc59de79';
        _this.boundedContextName = 'BC';
        _this.boundedContextBackend = new _Backend.Backend();
        _this.boundedContextManager = {
            getNearestBoundedContextConfig: sinon.stub().returns(new _BoundedContext.BoundedContext(_this.application, _this.boundedContext, _this.boundedContextName, _this.boundedContextBackend))
        };

        _this.artifactsManager = new _ArtifactsManager.ArtifactsManager(_this.inquirerManager, _this.boilerPlatesManager, _this.boundedContextManager, _this.folders, _this.fileSystem, logger);

        return _this;
    }

    return a_system_that_returns_a_bounded_context_configuration_without_a_backend_language;
}(_an_artifacts_manager2.an_artifacts_manager);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvZm9yX0FydGlmYWN0c01hbmFnZXIvZm9yX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZy9naXZlbi9hX3N5c3RlbV90aGF0X3JldHVybnNfYV9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbl93aXRob3V0X2FfYmFja2VuZF9sYW5ndWFnZS5qcyJdLCJuYW1lcyI6WyJhX3N5c3RlbV90aGF0X3JldHVybnNfYV9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbl93aXRob3V0X2FfYmFja2VuZF9sYW5ndWFnZSIsImFwcGxpY2F0aW9uIiwiYm91bmRlZENvbnRleHQiLCJib3VuZGVkQ29udGV4dE5hbWUiLCJib3VuZGVkQ29udGV4dEJhY2tlbmQiLCJCYWNrZW5kIiwiYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnIiwic2lub24iLCJzdHViIiwicmV0dXJucyIsIkJvdW5kZWRDb250ZXh0IiwiYXJ0aWZhY3RzTWFuYWdlciIsIkFydGlmYWN0c01hbmFnZXIiLCJpbnF1aXJlck1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJhbl9hcnRpZmFjdHNfbWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBUEE7Ozs7SUFTYUEsZ0YsV0FBQUEsZ0Y7OztBQUNULGdHQUFjO0FBQUE7O0FBQUE7O0FBRVYsY0FBS0MsV0FBTCxHQUFtQixzQ0FBbkI7QUFDQSxjQUFLQyxjQUFMLEdBQXNCLHNDQUF0QjtBQUNBLGNBQUtDLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0EsY0FBS0MscUJBQUwsR0FBNkIsSUFBSUMsZ0JBQUosRUFBN0I7QUFDQSxjQUFLQyxxQkFBTCxHQUE2QjtBQUN6QkMsNENBQWdDQyxNQUFNQyxJQUFOLEdBQWFDLE9BQWIsQ0FDNUIsSUFBSUMsOEJBQUosQ0FBbUIsTUFBS1YsV0FBeEIsRUFBcUMsTUFBS0MsY0FBMUMsRUFBMEQsTUFBS0Msa0JBQS9ELEVBQW1GLE1BQUtDLHFCQUF4RixDQUQ0QjtBQURQLFNBQTdCOztBQU1BLGNBQUtRLGdCQUFMLEdBQXdCLElBQUlDLGtDQUFKLENBQXFCLE1BQUtDLGVBQTFCLEVBQTJDLE1BQUtDLG1CQUFoRCxFQUFxRSxNQUFLVCxxQkFBMUUsRUFBaUcsTUFBS1UsT0FBdEcsRUFBK0csTUFBS0MsVUFBcEgsRUFBZ0lDLE1BQWhJLENBQXhCOztBQVpVO0FBY2I7OztFQWZpR0MsMkMiLCJmaWxlIjoiYV9zeXN0ZW1fdGhhdF9yZXR1cm5zX2FfYm91bmRlZF9jb250ZXh0X2NvbmZpZ3VyYXRpb25fd2l0aG91dF9hX2JhY2tlbmRfbGFuZ3VhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBCb3VuZGVkQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uLy4uL2JvdW5kZWRDb250ZXh0cy9Cb3VuZGVkQ29udGV4dCc7XG5pbXBvcnQgeyBhbl9hcnRpZmFjdHNfbWFuYWdlciB9IGZyb20gJy4uLy4uL2dpdmVuL2FuX2FydGlmYWN0c19tYW5hZ2VyJztcbmltcG9ydCB7IEJhY2tlbmQgfSBmcm9tICcuLi8uLi8uLi8uLi9ib3VuZGVkQ29udGV4dHMvQmFja2VuZCc7XG5pbXBvcnQgeyBBcnRpZmFjdHNNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vLi4vQXJ0aWZhY3RzTWFuYWdlcic7XG5cbmV4cG9ydCBjbGFzcyBhX3N5c3RlbV90aGF0X3JldHVybnNfYV9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbl93aXRob3V0X2FfYmFja2VuZF9sYW5ndWFnZSBleHRlbmRzIGFuX2FydGlmYWN0c19tYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbiA9ICdlMjk3OTViNi1iNTAxLTRkNmYtYjkzYy00YzI1YmFiNjk2OWQnO1xuICAgICAgICB0aGlzLmJvdW5kZWRDb250ZXh0ID0gJ2NkZTczNGJjLTkyN2YtNGZlYi1hNDMxLTAyYWJmYzU5ZGU3OSc7XG4gICAgICAgIHRoaXMuYm91bmRlZENvbnRleHROYW1lID0gJ0JDJztcbiAgICAgICAgdGhpcy5ib3VuZGVkQ29udGV4dEJhY2tlbmQgPSBuZXcgQmFja2VuZCgpO1xuICAgICAgICB0aGlzLmJvdW5kZWRDb250ZXh0TWFuYWdlciA9IHtcbiAgICAgICAgICAgIGdldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZzogc2lub24uc3R1YigpLnJldHVybnMoXG4gICAgICAgICAgICAgICAgbmV3IEJvdW5kZWRDb250ZXh0KHRoaXMuYXBwbGljYXRpb24sIHRoaXMuYm91bmRlZENvbnRleHQsIHRoaXMuYm91bmRlZENvbnRleHROYW1lLCB0aGlzLmJvdW5kZWRDb250ZXh0QmFja2VuZClcbiAgICAgICAgICAgIClcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYXJ0aWZhY3RzTWFuYWdlciA9IG5ldyBBcnRpZmFjdHNNYW5hZ2VyKHRoaXMuaW5xdWlyZXJNYW5hZ2VyLCB0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuYm91bmRlZENvbnRleHRNYW5hZ2VyLCB0aGlzLmZvbGRlcnMsIHRoaXMuZmlsZVN5c3RlbSwgbG9nZ2VyKTtcblxuICAgIH1cbn0iXX0=