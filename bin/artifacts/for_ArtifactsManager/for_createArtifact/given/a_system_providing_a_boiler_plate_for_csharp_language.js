'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_system_providing_a_boiler_plate_for_csharp_language = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp = require('../../given/a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp');

var _ArtifactsManager = require('../../../ArtifactsManager');

var _BoilerPlate = require('../../../../boilerPlates/BoilerPlate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var a_system_providing_a_boiler_plate_for_csharp_language = exports.a_system_providing_a_boiler_plate_for_csharp_language = function (_a_system_that_finds_) {
    (0, _inherits3.default)(a_system_providing_a_boiler_plate_for_csharp_language, _a_system_that_finds_);

    function a_system_providing_a_boiler_plate_for_csharp_language() {
        (0, _classCallCheck3.default)(this, a_system_providing_a_boiler_plate_for_csharp_language);

        var _this = (0, _possibleConstructorReturn3.default)(this, (a_system_providing_a_boiler_plate_for_csharp_language.__proto__ || Object.getPrototypeOf(a_system_providing_a_boiler_plate_for_csharp_language)).call(this));

        _this.boilerPlateLanguage = 'csharp';
        _this.boilerPlateName = 'The boiler plate';
        _this.boilerPlateDescription = 'The boiler plate description';
        _this.boilerPlateType = 'artifacts';
        _this.boilerPlateDependencies = [];
        _this.boilerPlateLocation = 'location';

        _this.boilerPlate = new _BoilerPlate.BoilerPlate(_this.boilerPlateLanguage, _this.boilerPlateName, _this.boilerPlateDescription, _this.boilerPlateType, _this.boilerPlateDependencies, _this.boilerPlateLocation);
        _this.boilerPlatesManager.boilerPlatesByLanguageAndType = sinon.stub().returns([_this.boilerPlate]);
        _this.artifactsManager = new _ArtifactsManager.ArtifactsManager(_this.inquirerManager, _this.boilerPlatesManager, _this.boundedContextManager, _this.folders, _this.fileSystem, logger);

        return _this;
    }

    return a_system_providing_a_boiler_plate_for_csharp_language;
}(_a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp.a_system_that_finds_a_bounded_context_config_where_core_language_is_csharp); /*---------------------------------------------------------------------------------------------
                                                                                                                                                           *  Copyright (c) Dolittle. All rights reserved.
                                                                                                                                                           *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                                                                                                                                           *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvZm9yX0FydGlmYWN0c01hbmFnZXIvZm9yX2NyZWF0ZUFydGlmYWN0L2dpdmVuL2Ffc3lzdGVtX3Byb3ZpZGluZ19hX2JvaWxlcl9wbGF0ZV9mb3JfY3NoYXJwX2xhbmd1YWdlLmpzIl0sIm5hbWVzIjpbImFfc3lzdGVtX3Byb3ZpZGluZ19hX2JvaWxlcl9wbGF0ZV9mb3JfY3NoYXJwX2xhbmd1YWdlIiwiYm9pbGVyUGxhdGVMYW5ndWFnZSIsImJvaWxlclBsYXRlTmFtZSIsImJvaWxlclBsYXRlRGVzY3JpcHRpb24iLCJib2lsZXJQbGF0ZVR5cGUiLCJib2lsZXJQbGF0ZURlcGVuZGVuY2llcyIsImJvaWxlclBsYXRlTG9jYXRpb24iLCJib2lsZXJQbGF0ZSIsIkJvaWxlclBsYXRlIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlIiwic2lub24iLCJzdHViIiwicmV0dXJucyIsImFydGlmYWN0c01hbmFnZXIiLCJBcnRpZmFjdHNNYW5hZ2VyIiwiaW5xdWlyZXJNYW5hZ2VyIiwiYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJsb2dnZXIiLCJhX3N5c3RlbV90aGF0X2ZpbmRzX2FfYm91bmRlZF9jb250ZXh0X2NvbmZpZ193aGVyZV9jb3JlX2xhbmd1YWdlX2lzX2NzaGFycCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOzs7O0lBRWFBLHFELFdBQUFBLHFEOzs7QUFDVCxxRUFBYztBQUFBOztBQUFBOztBQUVWLGNBQUtDLG1CQUFMLEdBQTJCLFFBQTNCO0FBQ0EsY0FBS0MsZUFBTCxHQUF1QixrQkFBdkI7QUFDQSxjQUFLQyxzQkFBTCxHQUE4Qiw4QkFBOUI7QUFDQSxjQUFLQyxlQUFMLEdBQXVCLFdBQXZCO0FBQ0EsY0FBS0MsdUJBQUwsR0FBK0IsRUFBL0I7QUFDQSxjQUFLQyxtQkFBTCxHQUEyQixVQUEzQjs7QUFFQSxjQUFLQyxXQUFMLEdBQW1CLElBQUlDLHdCQUFKLENBQWdCLE1BQUtQLG1CQUFyQixFQUEwQyxNQUFLQyxlQUEvQyxFQUFnRSxNQUFLQyxzQkFBckUsRUFBNkYsTUFBS0MsZUFBbEcsRUFBbUgsTUFBS0MsdUJBQXhILEVBQ2YsTUFBS0MsbUJBRFUsQ0FBbkI7QUFFQSxjQUFLRyxtQkFBTCxDQUF5QkMsNkJBQXpCLEdBQXlEQyxNQUFNQyxJQUFOLEdBQ3BEQyxPQURvRCxDQUMzQyxDQUNOLE1BQUtOLFdBREMsQ0FEMkMsQ0FBekQ7QUFJQSxjQUFLTyxnQkFBTCxHQUF3QixJQUFJQyxrQ0FBSixDQUFxQixNQUFLQyxlQUExQixFQUEyQyxNQUFLUCxtQkFBaEQsRUFBcUUsTUFBS1EscUJBQTFFLEVBQWlHLE1BQUtDLE9BQXRHLEVBQStHLE1BQUtDLFVBQXBILEVBQWdJQyxNQUFoSSxDQUF4Qjs7QUFmVTtBQWlCYjs7O0VBbEJzRUMsc0osR0FSM0UiLCJmaWxlIjoiYV9zeXN0ZW1fcHJvdmlkaW5nX2FfYm9pbGVyX3BsYXRlX2Zvcl9jc2hhcnBfbGFuZ3VhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBhX3N5c3RlbV90aGF0X2ZpbmRzX2FfYm91bmRlZF9jb250ZXh0X2NvbmZpZ193aGVyZV9jb3JlX2xhbmd1YWdlX2lzX2NzaGFycCB9IGZyb20gJy4uLy4uL2dpdmVuL2Ffc3lzdGVtX3RoYXRfZmluZHNfYV9ib3VuZGVkX2NvbnRleHRfY29uZmlnX3doZXJlX2NvcmVfbGFuZ3VhZ2VfaXNfY3NoYXJwJztcbmltcG9ydCB7IEFydGlmYWN0c01hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9BcnRpZmFjdHNNYW5hZ2VyJztcbmltcG9ydCB7IEJvaWxlclBsYXRlIH0gZnJvbSAnLi4vLi4vLi4vLi4vYm9pbGVyUGxhdGVzL0JvaWxlclBsYXRlJztcblxuZXhwb3J0IGNsYXNzIGFfc3lzdGVtX3Byb3ZpZGluZ19hX2JvaWxlcl9wbGF0ZV9mb3JfY3NoYXJwX2xhbmd1YWdlIGV4dGVuZHMgYV9zeXN0ZW1fdGhhdF9maW5kc19hX2JvdW5kZWRfY29udGV4dF9jb25maWdfd2hlcmVfY29yZV9sYW5ndWFnZV9pc19jc2hhcnAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmJvaWxlclBsYXRlTGFuZ3VhZ2UgPSAnY3NoYXJwJztcbiAgICAgICAgdGhpcy5ib2lsZXJQbGF0ZU5hbWUgPSAnVGhlIGJvaWxlciBwbGF0ZSc7XG4gICAgICAgIHRoaXMuYm9pbGVyUGxhdGVEZXNjcmlwdGlvbiA9ICdUaGUgYm9pbGVyIHBsYXRlIGRlc2NyaXB0aW9uJztcbiAgICAgICAgdGhpcy5ib2lsZXJQbGF0ZVR5cGUgPSAnYXJ0aWZhY3RzJztcbiAgICAgICAgdGhpcy5ib2lsZXJQbGF0ZURlcGVuZGVuY2llcyA9IFtdO1xuICAgICAgICB0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24gPSAnbG9jYXRpb24nO1xuXG4gICAgICAgIHRoaXMuYm9pbGVyUGxhdGUgPSBuZXcgQm9pbGVyUGxhdGUodGhpcy5ib2lsZXJQbGF0ZUxhbmd1YWdlLCB0aGlzLmJvaWxlclBsYXRlTmFtZSwgdGhpcy5ib2lsZXJQbGF0ZURlc2NyaXB0aW9uLCB0aGlzLmJvaWxlclBsYXRlVHlwZSwgdGhpcy5ib2lsZXJQbGF0ZURlcGVuZGVuY2llcywgXG4gICAgICAgICAgICB0aGlzLmJvaWxlclBsYXRlTG9jYXRpb24pO1xuICAgICAgICB0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIuYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUgPSBzaW5vbi5zdHViKClcbiAgICAgICAgICAgIC5yZXR1cm5zKCBbXG4gICAgICAgICAgICAgICAgdGhpcy5ib2lsZXJQbGF0ZVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIHRoaXMuYXJ0aWZhY3RzTWFuYWdlciA9IG5ldyBBcnRpZmFjdHNNYW5hZ2VyKHRoaXMuaW5xdWlyZXJNYW5hZ2VyLCB0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuYm91bmRlZENvbnRleHRNYW5hZ2VyLCB0aGlzLmZvbGRlcnMsIHRoaXMuZmlsZVN5c3RlbSwgbG9nZ2VyKTtcblxuICAgIH1cbn0iXX0=