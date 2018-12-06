'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_system_that_returns_a_valid_bounded_context_configuration = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BoundedContext = require('../../../../boundedContexts/BoundedContext');

var _an_artifacts_manager2 = require('../../given/an_artifacts_manager');

var _Core = require('../../../../boundedContexts/Core');

var _ArtifactsManager = require('../../../ArtifactsManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var a_system_that_returns_a_valid_bounded_context_configuration = exports.a_system_that_returns_a_valid_bounded_context_configuration = function (_an_artifacts_manager) {
    (0, _inherits3.default)(a_system_that_returns_a_valid_bounded_context_configuration, _an_artifacts_manager);

    function a_system_that_returns_a_valid_bounded_context_configuration() {
        (0, _classCallCheck3.default)(this, a_system_that_returns_a_valid_bounded_context_configuration);

        var _this = (0, _possibleConstructorReturn3.default)(this, (a_system_that_returns_a_valid_bounded_context_configuration.__proto__ || Object.getPrototypeOf(a_system_that_returns_a_valid_bounded_context_configuration)).call(this));

        _this.application = 'e29795b6-b501-4d6f-b93c-4c25bab6969d';
        _this.boundedContext = 'cde734bc-927f-4feb-a431-02abfc59de79';
        _this.boundedContextName = 'BC';
        _this.boundedContextCoreLanguage = 'csharp';
        _this.boundedContextCore = new _Core.Core(_this.boundedContextCoreLanguage);
        _this.boundedContextManager = {
            getNearestBoundedContextConfig: sinon.stub().returns(new _BoundedContext.BoundedContext(_this.application, _this.boundedContext, _this.boundedContextName, _this.boundedContextCore))
        };

        _this.artifactsManager = new _ArtifactsManager.ArtifactsManager(_this.inquirerManager, _this.boilerPlatesManager, _this.boundedContextManager, _this.folders, _this.fileSystem, logger);

        return _this;
    }

    return a_system_that_returns_a_valid_bounded_context_configuration;
}(_an_artifacts_manager2.an_artifacts_manager);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvZm9yX0FydGlmYWN0c01hbmFnZXIvZm9yX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZy9naXZlbi9hX3N5c3RlbV90aGF0X3JldHVybnNfYV92YWxpZF9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJhX3N5c3RlbV90aGF0X3JldHVybnNfYV92YWxpZF9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbiIsImFwcGxpY2F0aW9uIiwiYm91bmRlZENvbnRleHQiLCJib3VuZGVkQ29udGV4dE5hbWUiLCJib3VuZGVkQ29udGV4dENvcmVMYW5ndWFnZSIsImJvdW5kZWRDb250ZXh0Q29yZSIsIkNvcmUiLCJib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJnZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWciLCJzaW5vbiIsInN0dWIiLCJyZXR1cm5zIiwiQm91bmRlZENvbnRleHQiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiQXJ0aWZhY3RzTWFuYWdlciIsImlucXVpcmVyTWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsImFuX2FydGlmYWN0c19tYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFQQTs7OztJQVNhQSwyRCxXQUFBQSwyRDs7O0FBQ1QsMkVBQWM7QUFBQTs7QUFBQTs7QUFFVixjQUFLQyxXQUFMLEdBQW1CLHNDQUFuQjtBQUNBLGNBQUtDLGNBQUwsR0FBc0Isc0NBQXRCO0FBQ0EsY0FBS0Msa0JBQUwsR0FBMEIsSUFBMUI7QUFDQSxjQUFLQywwQkFBTCxHQUFrQyxRQUFsQztBQUNBLGNBQUtDLGtCQUFMLEdBQTBCLElBQUlDLFVBQUosQ0FBUyxNQUFLRiwwQkFBZCxDQUExQjtBQUNBLGNBQUtHLHFCQUFMLEdBQTZCO0FBQ3pCQyw0Q0FBZ0NDLE1BQU1DLElBQU4sR0FBYUMsT0FBYixDQUM1QixJQUFJQyw4QkFBSixDQUFtQixNQUFLWCxXQUF4QixFQUFxQyxNQUFLQyxjQUExQyxFQUEwRCxNQUFLQyxrQkFBL0QsRUFBbUYsTUFBS0Usa0JBQXhGLENBRDRCO0FBRFAsU0FBN0I7O0FBTUEsY0FBS1EsZ0JBQUwsR0FBd0IsSUFBSUMsa0NBQUosQ0FBcUIsTUFBS0MsZUFBMUIsRUFBMkMsTUFBS0MsbUJBQWhELEVBQXFFLE1BQUtULHFCQUExRSxFQUFpRyxNQUFLVSxPQUF0RyxFQUErRyxNQUFLQyxVQUFwSCxFQUFnSUMsTUFBaEksQ0FBeEI7O0FBYlU7QUFlYjs7O0VBaEI0RUMsMkMiLCJmaWxlIjoiYV9zeXN0ZW1fdGhhdF9yZXR1cm5zX2FfdmFsaWRfYm91bmRlZF9jb250ZXh0X2NvbmZpZ3VyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBCb3VuZGVkQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uLy4uL2JvdW5kZWRDb250ZXh0cy9Cb3VuZGVkQ29udGV4dCc7XG5pbXBvcnQgeyBhbl9hcnRpZmFjdHNfbWFuYWdlciB9IGZyb20gJy4uLy4uL2dpdmVuL2FuX2FydGlmYWN0c19tYW5hZ2VyJztcbmltcG9ydCB7IENvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi9ib3VuZGVkQ29udGV4dHMvQ29yZSc7XG5pbXBvcnQgeyBBcnRpZmFjdHNNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vLi4vQXJ0aWZhY3RzTWFuYWdlcic7XG5cbmV4cG9ydCBjbGFzcyBhX3N5c3RlbV90aGF0X3JldHVybnNfYV92YWxpZF9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbiBleHRlbmRzIGFuX2FydGlmYWN0c19tYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbiA9ICdlMjk3OTViNi1iNTAxLTRkNmYtYjkzYy00YzI1YmFiNjk2OWQnO1xuICAgICAgICB0aGlzLmJvdW5kZWRDb250ZXh0ID0gJ2NkZTczNGJjLTkyN2YtNGZlYi1hNDMxLTAyYWJmYzU5ZGU3OSc7XG4gICAgICAgIHRoaXMuYm91bmRlZENvbnRleHROYW1lID0gJ0JDJztcbiAgICAgICAgdGhpcy5ib3VuZGVkQ29udGV4dENvcmVMYW5ndWFnZSA9ICdjc2hhcnAnXG4gICAgICAgIHRoaXMuYm91bmRlZENvbnRleHRDb3JlID0gbmV3IENvcmUodGhpcy5ib3VuZGVkQ29udGV4dENvcmVMYW5ndWFnZSk7XG4gICAgICAgIHRoaXMuYm91bmRlZENvbnRleHRNYW5hZ2VyID0ge1xuICAgICAgICAgICAgZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnOiBzaW5vbi5zdHViKCkucmV0dXJucyhcbiAgICAgICAgICAgICAgICBuZXcgQm91bmRlZENvbnRleHQodGhpcy5hcHBsaWNhdGlvbiwgdGhpcy5ib3VuZGVkQ29udGV4dCwgdGhpcy5ib3VuZGVkQ29udGV4dE5hbWUsIHRoaXMuYm91bmRlZENvbnRleHRDb3JlKVxuICAgICAgICAgICAgKVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5hcnRpZmFjdHNNYW5hZ2VyID0gbmV3IEFydGlmYWN0c01hbmFnZXIodGhpcy5pbnF1aXJlck1hbmFnZXIsIHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5ib3VuZGVkQ29udGV4dE1hbmFnZXIsIHRoaXMuZm9sZGVycywgdGhpcy5maWxlU3lzdGVtLCBsb2dnZXIpO1xuXG4gICAgfVxufSJdfQ==