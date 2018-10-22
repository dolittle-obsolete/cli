'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_system_for_event_artifact = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _a_boiler_plates_manager = require('../../given/a_boiler_plates_manager');

var _BoilerPlatesManager = require('../../../BoilerPlatesManager');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oldFileContent = 'some content'; /*---------------------------------------------------------------------------------------------
                                      *  Copyright (c) Dolittle. All rights reserved.
                                      *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                      *--------------------------------------------------------------------------------------------*/

var a_system_for_event_artifact = exports.a_system_for_event_artifact = function (_a_boiler_plates_mana) {
    (0, _inherits3.default)(a_system_for_event_artifact, _a_boiler_plates_mana);

    function a_system_for_event_artifact() {
        (0, _classCallCheck3.default)(this, a_system_for_event_artifact);

        var _this = (0, _possibleConstructorReturn3.default)(this, (a_system_for_event_artifact.__proto__ || Object.getPrototypeOf(a_system_for_event_artifact)).call(this));

        _this.templateLocation = 'somelocation';
        _this.includedFiles = ['{{name}}.cs'];
        _this.eventArtifactTemplate = {
            template: {
                name: 'Event template',
                type: 'event',
                description: 'Creates an Event',
                language: 'csharp',
                includedFiles: _this.includedFiles
            },
            location: _this.templateLocation
        };
        _this.folders.getArtifactTemplateFilesRecursivelyIn = sinon.stub().returns(_this.includedFiles.map(function (file, _) {
            return _path2.default.join(_this.templateLocation, file);
        }));

        _this.fileSystem.readFileSync = sinon.stub().returns(oldFileContent);
        _this.fileSystem.writeFileSync = sinon.stub();

        _this.boilerPlatesManager = new _BoilerPlatesManager.BoilerPlatesManager(_this.configManager, _this.httpWrapper, _this.git, _this.folders, _this.fileSystem, logger);
        _this.destination = 'some destination';
        _this.context = {
            name: 'TheEvent'
        };
        return _this;
    }

    return a_system_for_event_artifact;
}(_a_boiler_plates_manager.a_boiler_plates_manager);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvZm9yX2NyZWF0ZUFydGlmYWN0SW5zdGFuY2UvZ2l2ZW4vYV9zeXN0ZW1fZm9yX2V2ZW50X2FydGlmYWN0LmpzIl0sIm5hbWVzIjpbIm9sZEZpbGVDb250ZW50IiwiYV9zeXN0ZW1fZm9yX2V2ZW50X2FydGlmYWN0IiwidGVtcGxhdGVMb2NhdGlvbiIsImluY2x1ZGVkRmlsZXMiLCJldmVudEFydGlmYWN0VGVtcGxhdGUiLCJ0ZW1wbGF0ZSIsIm5hbWUiLCJ0eXBlIiwiZGVzY3JpcHRpb24iLCJsYW5ndWFnZSIsImxvY2F0aW9uIiwiZm9sZGVycyIsImdldEFydGlmYWN0VGVtcGxhdGVGaWxlc1JlY3Vyc2l2ZWx5SW4iLCJzaW5vbiIsInN0dWIiLCJyZXR1cm5zIiwibWFwIiwiZmlsZSIsIl8iLCJwYXRoIiwiam9pbiIsImZpbGVTeXN0ZW0iLCJyZWFkRmlsZVN5bmMiLCJ3cml0ZUZpbGVTeW5jIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJsb2dnZXIiLCJkZXN0aW5hdGlvbiIsImNvbnRleHQiLCJhX2JvaWxlcl9wbGF0ZXNfbWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsY0FBdkIsQyxDQVRBOzs7OztJQVdhQywyQixXQUFBQSwyQjs7O0FBQ1QsMkNBQWM7QUFBQTs7QUFBQTs7QUFFVixjQUFLQyxnQkFBTCxHQUF3QixjQUF4QjtBQUNBLGNBQUtDLGFBQUwsR0FBcUIsQ0FDakIsYUFEaUIsQ0FBckI7QUFHQSxjQUFLQyxxQkFBTCxHQUE2QjtBQUN6QkMsc0JBQVU7QUFDTkMsc0JBQU0sZ0JBREE7QUFFTkMsc0JBQU0sT0FGQTtBQUdOQyw2QkFBYSxrQkFIUDtBQUlOQywwQkFBVSxRQUpKO0FBS05OLCtCQUFlLE1BQUtBO0FBTGQsYUFEZTtBQVF6Qk8sc0JBQVUsTUFBS1I7QUFSVSxTQUE3QjtBQVVBLGNBQUtTLE9BQUwsQ0FBYUMscUNBQWIsR0FBcURDLE1BQU1DLElBQU4sR0FBYUMsT0FBYixDQUFxQixNQUFLWixhQUFMLENBQW1CYSxHQUFuQixDQUF1QixVQUFDQyxJQUFELEVBQU9DLENBQVA7QUFBQSxtQkFBYUMsZUFBS0MsSUFBTCxDQUFVLE1BQUtsQixnQkFBZixFQUFpQ2UsSUFBakMsQ0FBYjtBQUFBLFNBQXZCLENBQXJCLENBQXJEOztBQUVBLGNBQUtJLFVBQUwsQ0FBZ0JDLFlBQWhCLEdBQStCVCxNQUFNQyxJQUFOLEdBQWFDLE9BQWIsQ0FBcUJmLGNBQXJCLENBQS9CO0FBQ0EsY0FBS3FCLFVBQUwsQ0FBZ0JFLGFBQWhCLEdBQWdDVixNQUFNQyxJQUFOLEVBQWhDOztBQUVBLGNBQUtVLG1CQUFMLEdBQTJCLElBQUlDLHdDQUFKLENBQ3ZCLE1BQUtDLGFBRGtCLEVBRXZCLE1BQUtDLFdBRmtCLEVBR3ZCLE1BQUtDLEdBSGtCLEVBSXZCLE1BQUtqQixPQUprQixFQUt2QixNQUFLVSxVQUxrQixFQU12QlEsTUFOdUIsQ0FBM0I7QUFRQSxjQUFLQyxXQUFMLEdBQW1CLGtCQUFuQjtBQUNBLGNBQUtDLE9BQUwsR0FBZTtBQUNYekIsa0JBQU07QUFESyxTQUFmO0FBOUJVO0FBaUNiOzs7RUFsQzRDMEIsZ0QiLCJmaWxlIjoiYV9zeXN0ZW1fZm9yX2V2ZW50X2FydGlmYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgeyBhX2JvaWxlcl9wbGF0ZXNfbWFuYWdlciB9IGZyb20gJy4uLy4uL2dpdmVuL2FfYm9pbGVyX3BsYXRlc19tYW5hZ2VyJztcbmltcG9ydCB7IEJvaWxlclBsYXRlc01hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBvbGRGaWxlQ29udGVudCA9ICdzb21lIGNvbnRlbnQnO1xuXG5leHBvcnQgY2xhc3MgYV9zeXN0ZW1fZm9yX2V2ZW50X2FydGlmYWN0IGV4dGVuZHMgYV9ib2lsZXJfcGxhdGVzX21hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnRlbXBsYXRlTG9jYXRpb24gPSAnc29tZWxvY2F0aW9uJztcbiAgICAgICAgdGhpcy5pbmNsdWRlZEZpbGVzID0gW1xuICAgICAgICAgICAgJ3t7bmFtZX19LmNzJ1xuICAgICAgICBdO1xuICAgICAgICB0aGlzLmV2ZW50QXJ0aWZhY3RUZW1wbGF0ZSA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0V2ZW50IHRlbXBsYXRlJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXZlbnQnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ3JlYXRlcyBhbiBFdmVudCcsXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6ICdjc2hhcnAnLFxuICAgICAgICAgICAgICAgIGluY2x1ZGVkRmlsZXM6IHRoaXMuaW5jbHVkZWRGaWxlc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxvY2F0aW9uOiB0aGlzLnRlbXBsYXRlTG9jYXRpb25cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mb2xkZXJzLmdldEFydGlmYWN0VGVtcGxhdGVGaWxlc1JlY3Vyc2l2ZWx5SW4gPSBzaW5vbi5zdHViKCkucmV0dXJucyh0aGlzLmluY2x1ZGVkRmlsZXMubWFwKChmaWxlLCBfKSA9PiBwYXRoLmpvaW4odGhpcy50ZW1wbGF0ZUxvY2F0aW9uLCBmaWxlKSkpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5maWxlU3lzdGVtLnJlYWRGaWxlU3luYyA9IHNpbm9uLnN0dWIoKS5yZXR1cm5zKG9sZEZpbGVDb250ZW50KTtcbiAgICAgICAgdGhpcy5maWxlU3lzdGVtLndyaXRlRmlsZVN5bmMgPSBzaW5vbi5zdHViKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIgPSBuZXcgQm9pbGVyUGxhdGVzTWFuYWdlcihcbiAgICAgICAgICAgIHRoaXMuY29uZmlnTWFuYWdlcixcbiAgICAgICAgICAgIHRoaXMuaHR0cFdyYXBwZXIsXG4gICAgICAgICAgICB0aGlzLmdpdCxcbiAgICAgICAgICAgIHRoaXMuZm9sZGVycyxcbiAgICAgICAgICAgIHRoaXMuZmlsZVN5c3RlbSxcbiAgICAgICAgICAgIGxvZ2dlclxuICAgICAgICApO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gJ3NvbWUgZGVzdGluYXRpb24nO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSB7XG4gICAgICAgICAgICBuYW1lOiAnVGhlRXZlbnQnXG4gICAgICAgIH07XG4gICAgfVxufSJdfQ==