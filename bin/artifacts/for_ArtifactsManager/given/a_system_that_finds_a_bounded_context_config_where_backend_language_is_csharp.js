'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _an_artifacts_manager2 = require('./an_artifacts_manager');

var _ArtifactsManager = require('../../ArtifactsManager');

var _BoundedContext = require('../../../boundedContexts/BoundedContext');

var _Core = require('../../../boundedContexts/Core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp = exports.a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp = function (_an_artifacts_manager) {
    (0, _inherits3.default)(a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp, _an_artifacts_manager);

    function a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp() {
        (0, _classCallCheck3.default)(this, a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp);

        var _this = (0, _possibleConstructorReturn3.default)(this, (a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp.__proto__ || Object.getPrototypeOf(a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp)).call(this));

        _this.application = 'e29795b6-b501-4d6f-b93c-4c25bab6969d';
        _this.boundedContext = 'cde734bc-927f-4feb-a431-02abfc59de79';
        _this.boundedContextName = 'BC';
        _this.boundedContextCoreLanguage = 'csharp';
        _this.boundedContextCore = new _Core.Core(_this.boundedContextCoreLanguage);
        _this.boundedContextManager.getNearestBoundedContextConfig = sinon.stub().returns(new _BoundedContext.BoundedContext(_this.application, _this.boundedContext, _this.boundedContextName, _this.boundedContextCore));

        _this.artifactsManager = new _ArtifactsManager.ArtifactsManager(_this.inquirerManager, _this.boilerPlatesManager, _this.boundedContextManager, _this.folders, _this.fileSystem, logger);

        return _this;
    }

    return a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp;
}(_an_artifacts_manager2.an_artifacts_manager);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvZm9yX0FydGlmYWN0c01hbmFnZXIvZ2l2ZW4vYV9zeXN0ZW1fdGhhdF9maW5kc19hX2JvdW5kZWRfY29udGV4dF9jb25maWdfd2hlcmVfYmFja2VuZF9sYW5ndWFnZV9pc19jc2hhcnAuanMiXSwibmFtZXMiOlsiYV9zeXN0ZW1fdGhhdF9maW5kc19hX2JvdW5kZWRfY29udGV4dF9jb25maWdfd2hlcmVfY29yZV9sYW5ndWFnZV9pc19jc2hhcnAiLCJhcHBsaWNhdGlvbiIsImJvdW5kZWRDb250ZXh0IiwiYm91bmRlZENvbnRleHROYW1lIiwiYm91bmRlZENvbnRleHRDb3JlTGFuZ3VhZ2UiLCJib3VuZGVkQ29udGV4dENvcmUiLCJDb3JlIiwiYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnIiwic2lub24iLCJzdHViIiwicmV0dXJucyIsIkJvdW5kZWRDb250ZXh0IiwiYXJ0aWZhY3RzTWFuYWdlciIsIkFydGlmYWN0c01hbmFnZXIiLCJpbnF1aXJlck1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJhbl9hcnRpZmFjdHNfbWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBUEE7Ozs7SUFTYUEsMEUsV0FBQUEsMEU7OztBQUNULDBGQUFjO0FBQUE7O0FBQUE7O0FBRVYsY0FBS0MsV0FBTCxHQUFtQixzQ0FBbkI7QUFDQSxjQUFLQyxjQUFMLEdBQXNCLHNDQUF0QjtBQUNBLGNBQUtDLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0EsY0FBS0MsMEJBQUwsR0FBa0MsUUFBbEM7QUFDQSxjQUFLQyxrQkFBTCxHQUEwQixJQUFJQyxVQUFKLENBQVMsTUFBS0YsMEJBQWQsQ0FBMUI7QUFDQSxjQUFLRyxxQkFBTCxDQUEyQkMsOEJBQTNCLEdBQTREQyxNQUFNQyxJQUFOLEdBQ3ZEQyxPQUR1RCxDQUVwRCxJQUFJQyw4QkFBSixDQUFtQixNQUFLWCxXQUF4QixFQUFxQyxNQUFLQyxjQUExQyxFQUEwRCxNQUFLQyxrQkFBL0QsRUFBbUYsTUFBS0Usa0JBQXhGLENBRm9ELENBQTVEOztBQUtBLGNBQUtRLGdCQUFMLEdBQXdCLElBQUlDLGtDQUFKLENBQXFCLE1BQUtDLGVBQTFCLEVBQTJDLE1BQUtDLG1CQUFoRCxFQUFxRSxNQUFLVCxxQkFBMUUsRUFBaUcsTUFBS1UsT0FBdEcsRUFBK0csTUFBS0MsVUFBcEgsRUFBZ0lDLE1BQWhJLENBQXhCOztBQVpVO0FBY2I7OztFQWYyRkMsMkMiLCJmaWxlIjoiYV9zeXN0ZW1fdGhhdF9maW5kc19hX2JvdW5kZWRfY29udGV4dF9jb25maWdfd2hlcmVfYmFja2VuZF9sYW5ndWFnZV9pc19jc2hhcnAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBhbl9hcnRpZmFjdHNfbWFuYWdlciB9IGZyb20gJy4vYW5fYXJ0aWZhY3RzX21hbmFnZXInO1xuaW1wb3J0IHsgQXJ0aWZhY3RzTWFuYWdlciB9IGZyb20gJy4uLy4uL0FydGlmYWN0c01hbmFnZXInO1xuaW1wb3J0IHsgQm91bmRlZENvbnRleHQgfSBmcm9tICcuLi8uLi8uLi9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHQnO1xuaW1wb3J0IHsgQ29yZSB9IGZyb20gJy4uLy4uLy4uL2JvdW5kZWRDb250ZXh0cy9Db3JlJztcblxuZXhwb3J0IGNsYXNzIGFfc3lzdGVtX3RoYXRfZmluZHNfYV9ib3VuZGVkX2NvbnRleHRfY29uZmlnX3doZXJlX2NvcmVfbGFuZ3VhZ2VfaXNfY3NoYXJwIGV4dGVuZHMgYW5fYXJ0aWZhY3RzX21hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gJ2UyOTc5NWI2LWI1MDEtNGQ2Zi1iOTNjLTRjMjViYWI2OTY5ZCc7XG4gICAgICAgIHRoaXMuYm91bmRlZENvbnRleHQgPSAnY2RlNzM0YmMtOTI3Zi00ZmViLWE0MzEtMDJhYmZjNTlkZTc5JztcbiAgICAgICAgdGhpcy5ib3VuZGVkQ29udGV4dE5hbWUgPSAnQkMnO1xuICAgICAgICB0aGlzLmJvdW5kZWRDb250ZXh0Q29yZUxhbmd1YWdlID0gJ2NzaGFycCdcbiAgICAgICAgdGhpcy5ib3VuZGVkQ29udGV4dENvcmUgPSBuZXcgQ29yZSh0aGlzLmJvdW5kZWRDb250ZXh0Q29yZUxhbmd1YWdlKTtcbiAgICAgICAgdGhpcy5ib3VuZGVkQ29udGV4dE1hbmFnZXIuZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnID0gc2lub24uc3R1YigpXG4gICAgICAgICAgICAucmV0dXJucyhcbiAgICAgICAgICAgICAgICBuZXcgQm91bmRlZENvbnRleHQodGhpcy5hcHBsaWNhdGlvbiwgdGhpcy5ib3VuZGVkQ29udGV4dCwgdGhpcy5ib3VuZGVkQ29udGV4dE5hbWUsIHRoaXMuYm91bmRlZENvbnRleHRDb3JlKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYXJ0aWZhY3RzTWFuYWdlciA9IG5ldyBBcnRpZmFjdHNNYW5hZ2VyKHRoaXMuaW5xdWlyZXJNYW5hZ2VyLCB0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuYm91bmRlZENvbnRleHRNYW5hZ2VyLCB0aGlzLmZvbGRlcnMsIHRoaXMuZmlsZVN5c3RlbSwgbG9nZ2VyKTtcbiAgICAgICAgXG4gICAgfVxufSJdfQ==