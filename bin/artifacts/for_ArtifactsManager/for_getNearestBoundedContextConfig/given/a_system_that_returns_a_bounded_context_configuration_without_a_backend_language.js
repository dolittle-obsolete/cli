'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_system_that_returns_a_bounded_context_configuration_without_a_core_language = undefined;

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
var a_system_that_returns_a_bounded_context_configuration_without_a_core_language = exports.a_system_that_returns_a_bounded_context_configuration_without_a_core_language = function (_an_artifacts_manager) {
    (0, _inherits3.default)(a_system_that_returns_a_bounded_context_configuration_without_a_core_language, _an_artifacts_manager);

    function a_system_that_returns_a_bounded_context_configuration_without_a_core_language() {
        (0, _classCallCheck3.default)(this, a_system_that_returns_a_bounded_context_configuration_without_a_core_language);

        var _this = (0, _possibleConstructorReturn3.default)(this, (a_system_that_returns_a_bounded_context_configuration_without_a_core_language.__proto__ || Object.getPrototypeOf(a_system_that_returns_a_bounded_context_configuration_without_a_core_language)).call(this));

        _this.application = 'e29795b6-b501-4d6f-b93c-4c25bab6969d';
        _this.boundedContext = 'cde734bc-927f-4feb-a431-02abfc59de79';
        _this.boundedContextName = 'BC';
        _this.boundedContextCore = new _Core.Core();
        _this.boundedContextManager = {
            getNearestBoundedContextConfig: sinon.stub().returns(new _BoundedContext.BoundedContext(_this.application, _this.boundedContext, _this.boundedContextName, _this.boundedContextCore))
        };

        _this.artifactsManager = new _ArtifactsManager.ArtifactsManager(_this.inquirerManager, _this.boilerPlatesManager, _this.boundedContextManager, _this.folders, _this.fileSystem, logger);

        return _this;
    }

    return a_system_that_returns_a_bounded_context_configuration_without_a_core_language;
}(_an_artifacts_manager2.an_artifacts_manager);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvZm9yX0FydGlmYWN0c01hbmFnZXIvZm9yX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZy9naXZlbi9hX3N5c3RlbV90aGF0X3JldHVybnNfYV9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbl93aXRob3V0X2FfYmFja2VuZF9sYW5ndWFnZS5qcyJdLCJuYW1lcyI6WyJhX3N5c3RlbV90aGF0X3JldHVybnNfYV9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbl93aXRob3V0X2FfY29yZV9sYW5ndWFnZSIsImFwcGxpY2F0aW9uIiwiYm91bmRlZENvbnRleHQiLCJib3VuZGVkQ29udGV4dE5hbWUiLCJib3VuZGVkQ29udGV4dENvcmUiLCJDb3JlIiwiYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnIiwic2lub24iLCJzdHViIiwicmV0dXJucyIsIkJvdW5kZWRDb250ZXh0IiwiYXJ0aWZhY3RzTWFuYWdlciIsIkFydGlmYWN0c01hbmFnZXIiLCJpbnF1aXJlck1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJhbl9hcnRpZmFjdHNfbWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBUEE7Ozs7SUFTYUEsNkUsV0FBQUEsNkU7OztBQUNULDZGQUFjO0FBQUE7O0FBQUE7O0FBRVYsY0FBS0MsV0FBTCxHQUFtQixzQ0FBbkI7QUFDQSxjQUFLQyxjQUFMLEdBQXNCLHNDQUF0QjtBQUNBLGNBQUtDLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0EsY0FBS0Msa0JBQUwsR0FBMEIsSUFBSUMsVUFBSixFQUExQjtBQUNBLGNBQUtDLHFCQUFMLEdBQTZCO0FBQ3pCQyw0Q0FBZ0NDLE1BQU1DLElBQU4sR0FBYUMsT0FBYixDQUM1QixJQUFJQyw4QkFBSixDQUFtQixNQUFLVixXQUF4QixFQUFxQyxNQUFLQyxjQUExQyxFQUEwRCxNQUFLQyxrQkFBL0QsRUFBbUYsTUFBS0Msa0JBQXhGLENBRDRCO0FBRFAsU0FBN0I7O0FBTUEsY0FBS1EsZ0JBQUwsR0FBd0IsSUFBSUMsa0NBQUosQ0FBcUIsTUFBS0MsZUFBMUIsRUFBMkMsTUFBS0MsbUJBQWhELEVBQXFFLE1BQUtULHFCQUExRSxFQUFpRyxNQUFLVSxPQUF0RyxFQUErRyxNQUFLQyxVQUFwSCxFQUFnSUMsTUFBaEksQ0FBeEI7O0FBWlU7QUFjYjs7O0VBZjhGQywyQyIsImZpbGUiOiJhX3N5c3RlbV90aGF0X3JldHVybnNfYV9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbl93aXRob3V0X2FfYmFja2VuZF9sYW5ndWFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEJvdW5kZWRDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vLi4vYm91bmRlZENvbnRleHRzL0JvdW5kZWRDb250ZXh0JztcbmltcG9ydCB7IGFuX2FydGlmYWN0c19tYW5hZ2VyIH0gZnJvbSAnLi4vLi4vZ2l2ZW4vYW5fYXJ0aWZhY3RzX21hbmFnZXInO1xuaW1wb3J0IHsgQ29yZSB9IGZyb20gJy4uLy4uLy4uLy4uL2JvdW5kZWRDb250ZXh0cy9Db3JlJztcbmltcG9ydCB7IEFydGlmYWN0c01hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9BcnRpZmFjdHNNYW5hZ2VyJztcblxuZXhwb3J0IGNsYXNzIGFfc3lzdGVtX3RoYXRfcmV0dXJuc19hX2JvdW5kZWRfY29udGV4dF9jb25maWd1cmF0aW9uX3dpdGhvdXRfYV9jb3JlX2xhbmd1YWdlIGV4dGVuZHMgYW5fYXJ0aWZhY3RzX21hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gJ2UyOTc5NWI2LWI1MDEtNGQ2Zi1iOTNjLTRjMjViYWI2OTY5ZCc7XG4gICAgICAgIHRoaXMuYm91bmRlZENvbnRleHQgPSAnY2RlNzM0YmMtOTI3Zi00ZmViLWE0MzEtMDJhYmZjNTlkZTc5JztcbiAgICAgICAgdGhpcy5ib3VuZGVkQ29udGV4dE5hbWUgPSAnQkMnO1xuICAgICAgICB0aGlzLmJvdW5kZWRDb250ZXh0Q29yZSA9IG5ldyBDb3JlKCk7XG4gICAgICAgIHRoaXMuYm91bmRlZENvbnRleHRNYW5hZ2VyID0ge1xuICAgICAgICAgICAgZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnOiBzaW5vbi5zdHViKCkucmV0dXJucyhcbiAgICAgICAgICAgICAgICBuZXcgQm91bmRlZENvbnRleHQodGhpcy5hcHBsaWNhdGlvbiwgdGhpcy5ib3VuZGVkQ29udGV4dCwgdGhpcy5ib3VuZGVkQ29udGV4dE5hbWUsIHRoaXMuYm91bmRlZENvbnRleHRDb3JlKVxuICAgICAgICAgICAgKVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5hcnRpZmFjdHNNYW5hZ2VyID0gbmV3IEFydGlmYWN0c01hbmFnZXIodGhpcy5pbnF1aXJlck1hbmFnZXIsIHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5ib3VuZGVkQ29udGV4dE1hbmFnZXIsIHRoaXMuZm9sZGVycywgdGhpcy5maWxlU3lzdGVtLCBsb2dnZXIpO1xuXG4gICAgfVxufSJdfQ==