'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_system_that_can_find_an_artifact_template_for_csharp = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ArtifactsManager = require('../../../ArtifactsManager');

var _a_system_providing_a_boiler_plate_for_csharp_language = require('./a_system_providing_a_boiler_plate_for_csharp_language');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/
var a_system_that_can_find_an_artifact_template_for_csharp = exports.a_system_that_can_find_an_artifact_template_for_csharp = function (_a_system_providing_a) {
    (0, _inherits3.default)(a_system_that_can_find_an_artifact_template_for_csharp, _a_system_providing_a);

    function a_system_that_can_find_an_artifact_template_for_csharp() {
        (0, _classCallCheck3.default)(this, a_system_that_can_find_an_artifact_template_for_csharp);

        var _this = (0, _possibleConstructorReturn3.default)(this, (a_system_that_can_find_an_artifact_template_for_csharp.__proto__ || Object.getPrototypeOf(a_system_that_can_find_an_artifact_template_for_csharp)).call(this));

        var path = require('path');
        _this.templateFileLocation = path.join('location', 'to');
        _this.templateFilePaths = [path.join(_this.templateFileLocation, 'template.json')];
        _this.artifactTemplateName = 'Artifact template name';
        _this.artifactTemplateType = 'artifactType';
        _this.artifactTemplateDescription = 'The description';
        _this.artifactTemplateIncludedFiles = ['{{name}}.cs'];

        _this.artifactTemplateJson = '\n        {\n            "name": "' + _this.artifactTemplateName + '",\n            "type": "' + _this.artifactTemplateType + '",\n            "description": "' + _this.artifactTemplateDescription + '",\n            "language": "' + _this.boilerPlateLanguage + '",\n            "includedFiles": ["' + _this.artifactTemplateIncludedFiles[0] + '"]\n         }\n         \n        ';
        _this.folders.searchRecursive = sinon.stub().returns(_this.templateFilePaths);
        _this.fileSystem.readFileSync = sinon.stub().returns(_this.artifactTemplateJson);

        _this.artifactsManager = new _ArtifactsManager.ArtifactsManager(_this.inquirerManager, _this.boilerPlatesManager, _this.boundedContextManager, _this.folders, _this.fileSystem, logger);

        _this.context = {
            artifactName: 'ArtifactName',
            destination: 'destination',
            artifactType: _this.artifactTemplateType
        };

        return _this;
    }

    return a_system_that_can_find_an_artifact_template_for_csharp;
}(_a_system_providing_a_boiler_plate_for_csharp_language.a_system_providing_a_boiler_plate_for_csharp_language);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvZm9yX0FydGlmYWN0c01hbmFnZXIvZm9yX2NyZWF0ZUFydGlmYWN0L2dpdmVuL2Ffc3lzdGVtX3RoYXRfY2FuX2ZpbmRfYW5fYXJ0aWZhY3RfdGVtcGxhdGVfZm9yX2NzaGFycC5qcyJdLCJuYW1lcyI6WyJhX3N5c3RlbV90aGF0X2Nhbl9maW5kX2FuX2FydGlmYWN0X3RlbXBsYXRlX2Zvcl9jc2hhcnAiLCJwYXRoIiwicmVxdWlyZSIsInRlbXBsYXRlRmlsZUxvY2F0aW9uIiwiam9pbiIsInRlbXBsYXRlRmlsZVBhdGhzIiwiYXJ0aWZhY3RUZW1wbGF0ZU5hbWUiLCJhcnRpZmFjdFRlbXBsYXRlVHlwZSIsImFydGlmYWN0VGVtcGxhdGVEZXNjcmlwdGlvbiIsImFydGlmYWN0VGVtcGxhdGVJbmNsdWRlZEZpbGVzIiwiYXJ0aWZhY3RUZW1wbGF0ZUpzb24iLCJib2lsZXJQbGF0ZUxhbmd1YWdlIiwiZm9sZGVycyIsInNlYXJjaFJlY3Vyc2l2ZSIsInNpbm9uIiwic3R1YiIsInJldHVybnMiLCJmaWxlU3lzdGVtIiwicmVhZEZpbGVTeW5jIiwiYXJ0aWZhY3RzTWFuYWdlciIsIkFydGlmYWN0c01hbmFnZXIiLCJpbnF1aXJlck1hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiYm91bmRlZENvbnRleHRNYW5hZ2VyIiwibG9nZ2VyIiwiY29udGV4dCIsImFydGlmYWN0TmFtZSIsImRlc3RpbmF0aW9uIiwiYXJ0aWZhY3RUeXBlIiwiYV9zeXN0ZW1fcHJvdmlkaW5nX2FfYm9pbGVyX3BsYXRlX2Zvcl9jc2hhcnBfbGFuZ3VhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7OztBQUxBOzs7O0lBT2FBLHNELFdBQUFBLHNEOzs7QUFDVCxzRUFBYztBQUFBOztBQUFBOztBQUVWLFlBQU1DLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQ0EsY0FBS0Msb0JBQUwsR0FBNEJGLEtBQUtHLElBQUwsQ0FBVSxVQUFWLEVBQXNCLElBQXRCLENBQTVCO0FBQ0EsY0FBS0MsaUJBQUwsR0FBeUIsQ0FDckJKLEtBQUtHLElBQUwsQ0FBVSxNQUFLRCxvQkFBZixFQUFxQyxlQUFyQyxDQURxQixDQUF6QjtBQUdBLGNBQUtHLG9CQUFMLEdBQTRCLHdCQUE1QjtBQUNBLGNBQUtDLG9CQUFMLEdBQTRCLGNBQTVCO0FBQ0EsY0FBS0MsMkJBQUwsR0FBbUMsaUJBQW5DO0FBQ0EsY0FBS0MsNkJBQUwsR0FBcUMsQ0FBQyxhQUFELENBQXJDOztBQUVBLGNBQUtDLG9CQUFMLDBDQUdlLE1BQUtKLG9CQUhwQixpQ0FJZSxNQUFLQyxvQkFKcEIsd0NBS3NCLE1BQUtDLDJCQUwzQixxQ0FNbUIsTUFBS0csbUJBTnhCLDJDQU95QixNQUFLRiw2QkFBTCxDQUFtQyxDQUFuQyxDQVB6QjtBQVdBLGNBQUtHLE9BQUwsQ0FBYUMsZUFBYixHQUErQkMsTUFBTUMsSUFBTixHQUFhQyxPQUFiLENBQXFCLE1BQUtYLGlCQUExQixDQUEvQjtBQUNBLGNBQUtZLFVBQUwsQ0FBZ0JDLFlBQWhCLEdBQStCSixNQUFNQyxJQUFOLEdBQWFDLE9BQWIsQ0FBcUIsTUFBS04sb0JBQTFCLENBQS9COztBQUVBLGNBQUtTLGdCQUFMLEdBQXdCLElBQUlDLGtDQUFKLENBQXFCLE1BQUtDLGVBQTFCLEVBQTJDLE1BQUtDLG1CQUFoRCxFQUFxRSxNQUFLQyxxQkFBMUUsRUFBaUcsTUFBS1gsT0FBdEcsRUFBK0csTUFBS0ssVUFBcEgsRUFBZ0lPLE1BQWhJLENBQXhCOztBQUVBLGNBQUtDLE9BQUwsR0FBZTtBQUNYQywwQkFBYyxjQURIO0FBRVhDLHlCQUFhLGFBRkY7QUFHWEMsMEJBQWMsTUFBS3JCO0FBSFIsU0FBZjs7QUE1QlU7QUFrQ2I7OztFQW5DdUVzQiw0RyIsImZpbGUiOiJhX3N5c3RlbV90aGF0X2Nhbl9maW5kX2FuX2FydGlmYWN0X3RlbXBsYXRlX2Zvcl9jc2hhcnAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBBcnRpZmFjdHNNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vLi4vQXJ0aWZhY3RzTWFuYWdlcic7XG5pbXBvcnQgeyBhX3N5c3RlbV9wcm92aWRpbmdfYV9ib2lsZXJfcGxhdGVfZm9yX2NzaGFycF9sYW5ndWFnZSB9IGZyb20gJy4vYV9zeXN0ZW1fcHJvdmlkaW5nX2FfYm9pbGVyX3BsYXRlX2Zvcl9jc2hhcnBfbGFuZ3VhZ2UnO1xuXG5leHBvcnQgY2xhc3MgYV9zeXN0ZW1fdGhhdF9jYW5fZmluZF9hbl9hcnRpZmFjdF90ZW1wbGF0ZV9mb3JfY3NoYXJwIGV4dGVuZHMgYV9zeXN0ZW1fcHJvdmlkaW5nX2FfYm9pbGVyX3BsYXRlX2Zvcl9jc2hhcnBfbGFuZ3VhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICAgICAgICB0aGlzLnRlbXBsYXRlRmlsZUxvY2F0aW9uID0gcGF0aC5qb2luKCdsb2NhdGlvbicsICd0bycpO1xuICAgICAgICB0aGlzLnRlbXBsYXRlRmlsZVBhdGhzID0gW1xuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMudGVtcGxhdGVGaWxlTG9jYXRpb24sICd0ZW1wbGF0ZS5qc29uJylcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5hcnRpZmFjdFRlbXBsYXRlTmFtZSA9ICdBcnRpZmFjdCB0ZW1wbGF0ZSBuYW1lJztcbiAgICAgICAgdGhpcy5hcnRpZmFjdFRlbXBsYXRlVHlwZSA9ICdhcnRpZmFjdFR5cGUnO1xuICAgICAgICB0aGlzLmFydGlmYWN0VGVtcGxhdGVEZXNjcmlwdGlvbiA9ICdUaGUgZGVzY3JpcHRpb24nO1xuICAgICAgICB0aGlzLmFydGlmYWN0VGVtcGxhdGVJbmNsdWRlZEZpbGVzID0gWyd7e25hbWV9fS5jcyddO1xuXG4gICAgICAgIHRoaXMuYXJ0aWZhY3RUZW1wbGF0ZUpzb24gPSBcbiAgICAgICAgYFxuICAgICAgICB7XG4gICAgICAgICAgICBcIm5hbWVcIjogXCIke3RoaXMuYXJ0aWZhY3RUZW1wbGF0ZU5hbWV9XCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCIke3RoaXMuYXJ0aWZhY3RUZW1wbGF0ZVR5cGV9XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiJHt0aGlzLmFydGlmYWN0VGVtcGxhdGVEZXNjcmlwdGlvbn1cIixcbiAgICAgICAgICAgIFwibGFuZ3VhZ2VcIjogXCIke3RoaXMuYm9pbGVyUGxhdGVMYW5ndWFnZX1cIixcbiAgICAgICAgICAgIFwiaW5jbHVkZWRGaWxlc1wiOiBbXCIke3RoaXMuYXJ0aWZhY3RUZW1wbGF0ZUluY2x1ZGVkRmlsZXNbMF19XCJdXG4gICAgICAgICB9XG4gICAgICAgICBcbiAgICAgICAgYDtcbiAgICAgICAgdGhpcy5mb2xkZXJzLnNlYXJjaFJlY3Vyc2l2ZSA9IHNpbm9uLnN0dWIoKS5yZXR1cm5zKHRoaXMudGVtcGxhdGVGaWxlUGF0aHMpO1xuICAgICAgICB0aGlzLmZpbGVTeXN0ZW0ucmVhZEZpbGVTeW5jID0gc2lub24uc3R1YigpLnJldHVybnModGhpcy5hcnRpZmFjdFRlbXBsYXRlSnNvbik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFydGlmYWN0c01hbmFnZXIgPSBuZXcgQXJ0aWZhY3RzTWFuYWdlcih0aGlzLmlucXVpcmVyTWFuYWdlciwgdGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmJvdW5kZWRDb250ZXh0TWFuYWdlciwgdGhpcy5mb2xkZXJzLCB0aGlzLmZpbGVTeXN0ZW0sIGxvZ2dlcik7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0ID0ge1xuICAgICAgICAgICAgYXJ0aWZhY3ROYW1lOiAnQXJ0aWZhY3ROYW1lJyxcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uOiAnZGVzdGluYXRpb24nLFxuICAgICAgICAgICAgYXJ0aWZhY3RUeXBlOiB0aGlzLmFydGlmYWN0VGVtcGxhdGVUeXBlXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgIH1cbn0iXX0=