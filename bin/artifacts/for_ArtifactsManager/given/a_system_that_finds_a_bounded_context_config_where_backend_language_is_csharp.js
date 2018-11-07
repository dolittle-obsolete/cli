'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_system_that_finds_a_bounded_context_config_where_backend_language_is_csharp = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _an_artifacts_manager2 = require('./an_artifacts_manager');

var _ArtifactsManager = require('../../ArtifactsManager');

var _BoundedContext = require('../../../boundedContexts/BoundedContext');

var _Backend = require('../../../boundedContexts/Backend');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var a_system_that_finds_a_bounded_context_config_where_backend_language_is_csharp = exports.a_system_that_finds_a_bounded_context_config_where_backend_language_is_csharp = function (_an_artifacts_manager) {
    (0, _inherits3.default)(a_system_that_finds_a_bounded_context_config_where_backend_language_is_csharp, _an_artifacts_manager);

    function a_system_that_finds_a_bounded_context_config_where_backend_language_is_csharp() {
        (0, _classCallCheck3.default)(this, a_system_that_finds_a_bounded_context_config_where_backend_language_is_csharp);

        var _this = (0, _possibleConstructorReturn3.default)(this, (a_system_that_finds_a_bounded_context_config_where_backend_language_is_csharp.__proto__ || Object.getPrototypeOf(a_system_that_finds_a_bounded_context_config_where_backend_language_is_csharp)).call(this));

        _this.application = 'e29795b6-b501-4d6f-b93c-4c25bab6969d';
        _this.boundedContext = 'cde734bc-927f-4feb-a431-02abfc59de79';
        _this.boundedContextName = 'BC';
        _this.boundedContextBackendLanguage = 'csharp';
        _this.boundedContextBackend = new _Backend.Backend(_this.boundedContextBackendLanguage);
        _this.boundedContextManager.getNearestBoundedContextConfig = sinon.stub().returns(new _BoundedContext.BoundedContext(_this.application, _this.boundedContext, _this.boundedContextName, _this.boundedContextBackend));

        _this.artifactsManager = new _ArtifactsManager.ArtifactsManager(_this.inquirerManager, _this.boilerPlatesManager, _this.boundedContextManager, _this.folders, _this.fileSystem, logger);

        return _this;
    }

    return a_system_that_finds_a_bounded_context_config_where_backend_language_is_csharp;
}(_an_artifacts_manager2.an_artifacts_manager);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvZm9yX0FydGlmYWN0c01hbmFnZXIvZ2l2ZW4vYV9zeXN0ZW1fdGhhdF9maW5kc19hX2JvdW5kZWRfY29udGV4dF9jb25maWdfd2hlcmVfYmFja2VuZF9sYW5ndWFnZV9pc19jc2hhcnAuanMiXSwibmFtZXMiOlsiYV9zeXN0ZW1fdGhhdF9maW5kc19hX2JvdW5kZWRfY29udGV4dF9jb25maWdfd2hlcmVfYmFja2VuZF9sYW5ndWFnZV9pc19jc2hhcnAiLCJhcHBsaWNhdGlvbiIsImJvdW5kZWRDb250ZXh0IiwiYm91bmRlZENvbnRleHROYW1lIiwiYm91bmRlZENvbnRleHRCYWNrZW5kTGFuZ3VhZ2UiLCJib3VuZGVkQ29udGV4dEJhY2tlbmQiLCJCYWNrZW5kIiwiYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnIiwic2lub24iLCJzdHViIiwicmV0dXJucyIsIkJvdW5kZWRDb250ZXh0IiwiYXJ0aWZhY3RzTWFuYWdlciIsIkFydGlmYWN0c01hbmFnZXIiLCJpbnF1aXJlck1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJhbl9hcnRpZmFjdHNfbWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBUEE7Ozs7SUFTYUEsNkUsV0FBQUEsNkU7OztBQUNULDZGQUFjO0FBQUE7O0FBQUE7O0FBRVYsY0FBS0MsV0FBTCxHQUFtQixzQ0FBbkI7QUFDQSxjQUFLQyxjQUFMLEdBQXNCLHNDQUF0QjtBQUNBLGNBQUtDLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0EsY0FBS0MsNkJBQUwsR0FBcUMsUUFBckM7QUFDQSxjQUFLQyxxQkFBTCxHQUE2QixJQUFJQyxnQkFBSixDQUFZLE1BQUtGLDZCQUFqQixDQUE3QjtBQUNBLGNBQUtHLHFCQUFMLENBQTJCQyw4QkFBM0IsR0FBNERDLE1BQU1DLElBQU4sR0FDdkRDLE9BRHVELENBRXBELElBQUlDLDhCQUFKLENBQW1CLE1BQUtYLFdBQXhCLEVBQXFDLE1BQUtDLGNBQTFDLEVBQTBELE1BQUtDLGtCQUEvRCxFQUFtRixNQUFLRSxxQkFBeEYsQ0FGb0QsQ0FBNUQ7O0FBS0EsY0FBS1EsZ0JBQUwsR0FBd0IsSUFBSUMsa0NBQUosQ0FBcUIsTUFBS0MsZUFBMUIsRUFBMkMsTUFBS0MsbUJBQWhELEVBQXFFLE1BQUtULHFCQUExRSxFQUFpRyxNQUFLVSxPQUF0RyxFQUErRyxNQUFLQyxVQUFwSCxFQUFnSUMsTUFBaEksQ0FBeEI7O0FBWlU7QUFjYjs7O0VBZjhGQywyQyIsImZpbGUiOiJhX3N5c3RlbV90aGF0X2ZpbmRzX2FfYm91bmRlZF9jb250ZXh0X2NvbmZpZ193aGVyZV9iYWNrZW5kX2xhbmd1YWdlX2lzX2NzaGFycC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IGFuX2FydGlmYWN0c19tYW5hZ2VyIH0gZnJvbSAnLi9hbl9hcnRpZmFjdHNfbWFuYWdlcic7XG5pbXBvcnQgeyBBcnRpZmFjdHNNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vQXJ0aWZhY3RzTWFuYWdlcic7XG5pbXBvcnQgeyBCb3VuZGVkQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uL2JvdW5kZWRDb250ZXh0cy9Cb3VuZGVkQ29udGV4dCc7XG5pbXBvcnQgeyBCYWNrZW5kIH0gZnJvbSAnLi4vLi4vLi4vYm91bmRlZENvbnRleHRzL0JhY2tlbmQnO1xuXG5leHBvcnQgY2xhc3MgYV9zeXN0ZW1fdGhhdF9maW5kc19hX2JvdW5kZWRfY29udGV4dF9jb25maWdfd2hlcmVfYmFja2VuZF9sYW5ndWFnZV9pc19jc2hhcnAgZXh0ZW5kcyBhbl9hcnRpZmFjdHNfbWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb24gPSAnZTI5Nzk1YjYtYjUwMS00ZDZmLWI5M2MtNGMyNWJhYjY5NjlkJztcbiAgICAgICAgdGhpcy5ib3VuZGVkQ29udGV4dCA9ICdjZGU3MzRiYy05MjdmLTRmZWItYTQzMS0wMmFiZmM1OWRlNzknO1xuICAgICAgICB0aGlzLmJvdW5kZWRDb250ZXh0TmFtZSA9ICdCQyc7XG4gICAgICAgIHRoaXMuYm91bmRlZENvbnRleHRCYWNrZW5kTGFuZ3VhZ2UgPSAnY3NoYXJwJ1xuICAgICAgICB0aGlzLmJvdW5kZWRDb250ZXh0QmFja2VuZCA9IG5ldyBCYWNrZW5kKHRoaXMuYm91bmRlZENvbnRleHRCYWNrZW5kTGFuZ3VhZ2UpO1xuICAgICAgICB0aGlzLmJvdW5kZWRDb250ZXh0TWFuYWdlci5nZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWcgPSBzaW5vbi5zdHViKClcbiAgICAgICAgICAgIC5yZXR1cm5zKFxuICAgICAgICAgICAgICAgIG5ldyBCb3VuZGVkQ29udGV4dCh0aGlzLmFwcGxpY2F0aW9uLCB0aGlzLmJvdW5kZWRDb250ZXh0LCB0aGlzLmJvdW5kZWRDb250ZXh0TmFtZSwgdGhpcy5ib3VuZGVkQ29udGV4dEJhY2tlbmQpXG4gICAgICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5hcnRpZmFjdHNNYW5hZ2VyID0gbmV3IEFydGlmYWN0c01hbmFnZXIodGhpcy5pbnF1aXJlck1hbmFnZXIsIHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5ib3VuZGVkQ29udGV4dE1hbmFnZXIsIHRoaXMuZm9sZGVycywgdGhpcy5maWxlU3lzdGVtLCBsb2dnZXIpO1xuICAgICAgICBcbiAgICB9XG59Il19