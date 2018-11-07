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

var _Backend = require('../../../../boundedContexts/Backend');

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
        _this.boundedContextBackendLanguage = 'csharp';
        _this.boundedContextBackend = new _Backend.Backend(_this.boundedContextBackendLanguage);
        _this.boundedContextManager = {
            getNearestBoundedContextConfig: sinon.stub().returns(new _BoundedContext.BoundedContext(_this.application, _this.boundedContext, _this.boundedContextName, _this.boundedContextBackend))
        };

        _this.artifactsManager = new _ArtifactsManager.ArtifactsManager(_this.inquirerManager, _this.boilerPlatesManager, _this.boundedContextManager, _this.folders, _this.fileSystem, logger);

        return _this;
    }

    return a_system_that_returns_a_valid_bounded_context_configuration;
}(_an_artifacts_manager2.an_artifacts_manager);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvZm9yX0FydGlmYWN0c01hbmFnZXIvZm9yX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZy9naXZlbi9hX3N5c3RlbV90aGF0X3JldHVybnNfYV92YWxpZF9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJhX3N5c3RlbV90aGF0X3JldHVybnNfYV92YWxpZF9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbiIsImFwcGxpY2F0aW9uIiwiYm91bmRlZENvbnRleHQiLCJib3VuZGVkQ29udGV4dE5hbWUiLCJib3VuZGVkQ29udGV4dEJhY2tlbmRMYW5ndWFnZSIsImJvdW5kZWRDb250ZXh0QmFja2VuZCIsIkJhY2tlbmQiLCJib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJnZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWciLCJzaW5vbiIsInN0dWIiLCJyZXR1cm5zIiwiQm91bmRlZENvbnRleHQiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiQXJ0aWZhY3RzTWFuYWdlciIsImlucXVpcmVyTWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsImFuX2FydGlmYWN0c19tYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFQQTs7OztJQVNhQSwyRCxXQUFBQSwyRDs7O0FBQ1QsMkVBQWM7QUFBQTs7QUFBQTs7QUFFVixjQUFLQyxXQUFMLEdBQW1CLHNDQUFuQjtBQUNBLGNBQUtDLGNBQUwsR0FBc0Isc0NBQXRCO0FBQ0EsY0FBS0Msa0JBQUwsR0FBMEIsSUFBMUI7QUFDQSxjQUFLQyw2QkFBTCxHQUFxQyxRQUFyQztBQUNBLGNBQUtDLHFCQUFMLEdBQTZCLElBQUlDLGdCQUFKLENBQVksTUFBS0YsNkJBQWpCLENBQTdCO0FBQ0EsY0FBS0cscUJBQUwsR0FBNkI7QUFDekJDLDRDQUFnQ0MsTUFBTUMsSUFBTixHQUFhQyxPQUFiLENBQzVCLElBQUlDLDhCQUFKLENBQW1CLE1BQUtYLFdBQXhCLEVBQXFDLE1BQUtDLGNBQTFDLEVBQTBELE1BQUtDLGtCQUEvRCxFQUFtRixNQUFLRSxxQkFBeEYsQ0FENEI7QUFEUCxTQUE3Qjs7QUFNQSxjQUFLUSxnQkFBTCxHQUF3QixJQUFJQyxrQ0FBSixDQUFxQixNQUFLQyxlQUExQixFQUEyQyxNQUFLQyxtQkFBaEQsRUFBcUUsTUFBS1QscUJBQTFFLEVBQWlHLE1BQUtVLE9BQXRHLEVBQStHLE1BQUtDLFVBQXBILEVBQWdJQyxNQUFoSSxDQUF4Qjs7QUFiVTtBQWViOzs7RUFoQjRFQywyQyIsImZpbGUiOiJhX3N5c3RlbV90aGF0X3JldHVybnNfYV92YWxpZF9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEJvdW5kZWRDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vLi4vYm91bmRlZENvbnRleHRzL0JvdW5kZWRDb250ZXh0JztcbmltcG9ydCB7IGFuX2FydGlmYWN0c19tYW5hZ2VyIH0gZnJvbSAnLi4vLi4vZ2l2ZW4vYW5fYXJ0aWZhY3RzX21hbmFnZXInO1xuaW1wb3J0IHsgQmFja2VuZCB9IGZyb20gJy4uLy4uLy4uLy4uL2JvdW5kZWRDb250ZXh0cy9CYWNrZW5kJztcbmltcG9ydCB7IEFydGlmYWN0c01hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9BcnRpZmFjdHNNYW5hZ2VyJztcblxuZXhwb3J0IGNsYXNzIGFfc3lzdGVtX3RoYXRfcmV0dXJuc19hX3ZhbGlkX2JvdW5kZWRfY29udGV4dF9jb25maWd1cmF0aW9uIGV4dGVuZHMgYW5fYXJ0aWZhY3RzX21hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gJ2UyOTc5NWI2LWI1MDEtNGQ2Zi1iOTNjLTRjMjViYWI2OTY5ZCc7XG4gICAgICAgIHRoaXMuYm91bmRlZENvbnRleHQgPSAnY2RlNzM0YmMtOTI3Zi00ZmViLWE0MzEtMDJhYmZjNTlkZTc5JztcbiAgICAgICAgdGhpcy5ib3VuZGVkQ29udGV4dE5hbWUgPSAnQkMnO1xuICAgICAgICB0aGlzLmJvdW5kZWRDb250ZXh0QmFja2VuZExhbmd1YWdlID0gJ2NzaGFycCdcbiAgICAgICAgdGhpcy5ib3VuZGVkQ29udGV4dEJhY2tlbmQgPSBuZXcgQmFja2VuZCh0aGlzLmJvdW5kZWRDb250ZXh0QmFja2VuZExhbmd1YWdlKTtcbiAgICAgICAgdGhpcy5ib3VuZGVkQ29udGV4dE1hbmFnZXIgPSB7XG4gICAgICAgICAgICBnZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWc6IHNpbm9uLnN0dWIoKS5yZXR1cm5zKFxuICAgICAgICAgICAgICAgIG5ldyBCb3VuZGVkQ29udGV4dCh0aGlzLmFwcGxpY2F0aW9uLCB0aGlzLmJvdW5kZWRDb250ZXh0LCB0aGlzLmJvdW5kZWRDb250ZXh0TmFtZSwgdGhpcy5ib3VuZGVkQ29udGV4dEJhY2tlbmQpXG4gICAgICAgICAgICApXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFydGlmYWN0c01hbmFnZXIgPSBuZXcgQXJ0aWZhY3RzTWFuYWdlcih0aGlzLmlucXVpcmVyTWFuYWdlciwgdGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmJvdW5kZWRDb250ZXh0TWFuYWdlciwgdGhpcy5mb2xkZXJzLCB0aGlzLmZpbGVTeXN0ZW0sIGxvZ2dlcik7XG5cbiAgICB9XG59Il19