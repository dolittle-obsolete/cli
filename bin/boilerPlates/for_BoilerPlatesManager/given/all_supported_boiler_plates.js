'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.all_supported_boiler_plates = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BoilerPlatesManager = require('../../BoilerPlatesManager');

var _a_boiler_plates_manager = require('./a_boiler_plates_manager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var boilerPlates = [{
    language: 'csharp',
    name: 'C# Application',
    description: 'some description',
    type: 'application',
    location: '/somewhere/on/the/disk',
    pathsNeedingBinding: [],
    filesNeedingBinding: []
}, {
    language: 'csharp',
    name: 'C# BoundedContext',
    description: 'some description',
    type: 'boundedContext',
    location: '/somewhere/on/the/disk',
    pathsNeedingBinding: [],
    filesNeedingBinding: []
}, {
    language: 'javascript',
    name: 'Javascript Application',
    description: 'some description',
    type: 'application',
    location: '/somewhere/on/the/disk',
    pathsNeedingBinding: [],
    filesNeedingBinding: []
}, {
    language: 'javascript',
    name: 'Javacript BoundedContext',
    description: 'some description',
    type: 'boundedContext',
    location: '/somewhere/on/the/disk',
    pathsNeedingBinding: [],
    filesNeedingBinding: []
}];

var all_supported_boiler_plates = exports.all_supported_boiler_plates = function (_a_boiler_plates_mana) {
    (0, _inherits3.default)(all_supported_boiler_plates, _a_boiler_plates_mana);

    function all_supported_boiler_plates() {
        (0, _classCallCheck3.default)(this, all_supported_boiler_plates);

        var _this = (0, _possibleConstructorReturn3.default)(this, (all_supported_boiler_plates.__proto__ || Object.getPrototypeOf(all_supported_boiler_plates)).call(this));

        _this.boilerPlates = boilerPlates;

        _this.fileSystem.existsSync = sinon.stub().returns(true);
        _this.fileSystem.readFileSync = sinon.stub().returns(JSON.stringify(boilerPlates));

        _this.boilerPlatesManager = new _BoilerPlatesManager.BoilerPlatesManager(_this.configManager, _this.httpWrapper, _this.git, _this.folders, _this.fileSystem, logger);
        return _this;
    }

    return all_supported_boiler_plates;
}(_a_boiler_plates_manager.a_boiler_plates_manager);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvZ2l2ZW4vYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzLmpzIl0sIm5hbWVzIjpbImJvaWxlclBsYXRlcyIsImxhbmd1YWdlIiwibmFtZSIsImRlc2NyaXB0aW9uIiwidHlwZSIsImxvY2F0aW9uIiwicGF0aHNOZWVkaW5nQmluZGluZyIsImZpbGVzTmVlZGluZ0JpbmRpbmciLCJhbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMiLCJmaWxlU3lzdGVtIiwiZXhpc3RzU3luYyIsInNpbm9uIiwic3R1YiIsInJldHVybnMiLCJyZWFkRmlsZVN5bmMiLCJKU09OIiwic3RyaW5naWZ5IiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJmb2xkZXJzIiwibG9nZ2VyIiwiYV9ib2lsZXJfcGxhdGVzX21hbmFnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQTs7QUFDQTs7OztBQU5BOzs7OztBQVFBLElBQU1BLGVBQWUsQ0FDakI7QUFDSUMsY0FBUyxRQURiO0FBRUlDLFVBQUssZ0JBRlQ7QUFHSUMsaUJBQVksa0JBSGhCO0FBSUlDLFVBQUssYUFKVDtBQUtJQyxjQUFTLHdCQUxiO0FBTUlDLHlCQUFvQixFQU54QjtBQU9JQyx5QkFBb0I7QUFQeEIsQ0FEaUIsRUFVakI7QUFDSU4sY0FBUyxRQURiO0FBRUlDLFVBQUssbUJBRlQ7QUFHSUMsaUJBQVksa0JBSGhCO0FBSUlDLFVBQUssZ0JBSlQ7QUFLSUMsY0FBUyx3QkFMYjtBQU1JQyx5QkFBb0IsRUFOeEI7QUFPSUMseUJBQW9CO0FBUHhCLENBVmlCLEVBbUJqQjtBQUNJTixjQUFTLFlBRGI7QUFFSUMsVUFBSyx3QkFGVDtBQUdJQyxpQkFBWSxrQkFIaEI7QUFJSUMsVUFBSyxhQUpUO0FBS0lDLGNBQVMsd0JBTGI7QUFNSUMseUJBQW9CLEVBTnhCO0FBT0lDLHlCQUFvQjtBQVB4QixDQW5CaUIsRUE0QmpCO0FBQ0lOLGNBQVMsWUFEYjtBQUVJQyxVQUFLLDBCQUZUO0FBR0lDLGlCQUFZLGtCQUhoQjtBQUlJQyxVQUFLLGdCQUpUO0FBS0lDLGNBQVMsd0JBTGI7QUFNSUMseUJBQW9CLEVBTnhCO0FBT0lDLHlCQUFvQjtBQVB4QixDQTVCaUIsQ0FBckI7O0lBdUNhQywyQixXQUFBQSwyQjs7O0FBQ1QsMkNBQWM7QUFBQTs7QUFBQTs7QUFFVixjQUFLUixZQUFMLEdBQW9CQSxZQUFwQjs7QUFFQSxjQUFLUyxVQUFMLENBQWdCQyxVQUFoQixHQUE2QkMsTUFBTUMsSUFBTixHQUFhQyxPQUFiLENBQXFCLElBQXJCLENBQTdCO0FBQ0EsY0FBS0osVUFBTCxDQUFnQkssWUFBaEIsR0FBK0JILE1BQU1DLElBQU4sR0FBYUMsT0FBYixDQUFxQkUsS0FBS0MsU0FBTCxDQUFlaEIsWUFBZixDQUFyQixDQUEvQjs7QUFFQSxjQUFLaUIsbUJBQUwsR0FBMkIsSUFBSUMsd0NBQUosQ0FDdkIsTUFBS0MsYUFEa0IsRUFFdkIsTUFBS0MsV0FGa0IsRUFHdkIsTUFBS0MsR0FIa0IsRUFJdkIsTUFBS0MsT0FKa0IsRUFLdkIsTUFBS2IsVUFMa0IsRUFNdkJjLE1BTnVCLENBQTNCO0FBUFU7QUFlYjs7O0VBaEI0Q0MsZ0QiLCJmaWxlIjoiYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgeyBCb2lsZXJQbGF0ZXNNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vQm9pbGVyUGxhdGVzTWFuYWdlcic7XG5pbXBvcnQgeyBhX2JvaWxlcl9wbGF0ZXNfbWFuYWdlciB9IGZyb20gJy4vYV9ib2lsZXJfcGxhdGVzX21hbmFnZXInO1xuXG5jb25zdCBib2lsZXJQbGF0ZXMgPSBbXG4gICAge1xuICAgICAgICBsYW5ndWFnZTonY3NoYXJwJyxcbiAgICAgICAgbmFtZTonQyMgQXBwbGljYXRpb24nLFxuICAgICAgICBkZXNjcmlwdGlvbjonc29tZSBkZXNjcmlwdGlvbicsXG4gICAgICAgIHR5cGU6J2FwcGxpY2F0aW9uJyxcbiAgICAgICAgbG9jYXRpb246Jy9zb21ld2hlcmUvb24vdGhlL2Rpc2snLFxuICAgICAgICBwYXRoc05lZWRpbmdCaW5kaW5nOltdLFxuICAgICAgICBmaWxlc05lZWRpbmdCaW5kaW5nOltdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGxhbmd1YWdlOidjc2hhcnAnLFxuICAgICAgICBuYW1lOidDIyBCb3VuZGVkQ29udGV4dCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOidzb21lIGRlc2NyaXB0aW9uJyxcbiAgICAgICAgdHlwZTonYm91bmRlZENvbnRleHQnLFxuICAgICAgICBsb2NhdGlvbjonL3NvbWV3aGVyZS9vbi90aGUvZGlzaycsXG4gICAgICAgIHBhdGhzTmVlZGluZ0JpbmRpbmc6W10sXG4gICAgICAgIGZpbGVzTmVlZGluZ0JpbmRpbmc6W11cbiAgICB9LFxuICAgIHtcbiAgICAgICAgbGFuZ3VhZ2U6J2phdmFzY3JpcHQnLFxuICAgICAgICBuYW1lOidKYXZhc2NyaXB0IEFwcGxpY2F0aW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb246J3NvbWUgZGVzY3JpcHRpb24nLFxuICAgICAgICB0eXBlOidhcHBsaWNhdGlvbicsXG4gICAgICAgIGxvY2F0aW9uOicvc29tZXdoZXJlL29uL3RoZS9kaXNrJyxcbiAgICAgICAgcGF0aHNOZWVkaW5nQmluZGluZzpbXSxcbiAgICAgICAgZmlsZXNOZWVkaW5nQmluZGluZzpbXVxuICAgIH0sXG4gICAge1xuICAgICAgICBsYW5ndWFnZTonamF2YXNjcmlwdCcsXG4gICAgICAgIG5hbWU6J0phdmFjcmlwdCBCb3VuZGVkQ29udGV4dCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOidzb21lIGRlc2NyaXB0aW9uJyxcbiAgICAgICAgdHlwZTonYm91bmRlZENvbnRleHQnLFxuICAgICAgICBsb2NhdGlvbjonL3NvbWV3aGVyZS9vbi90aGUvZGlzaycsXG4gICAgICAgIHBhdGhzTmVlZGluZ0JpbmRpbmc6W10sXG4gICAgICAgIGZpbGVzTmVlZGluZ0JpbmRpbmc6W11cbiAgICB9XG5dO1xuXG5leHBvcnQgY2xhc3MgYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzIGV4dGVuZHMgYV9ib2lsZXJfcGxhdGVzX21hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmJvaWxlclBsYXRlcyA9IGJvaWxlclBsYXRlcztcblxuICAgICAgICB0aGlzLmZpbGVTeXN0ZW0uZXhpc3RzU3luYyA9IHNpbm9uLnN0dWIoKS5yZXR1cm5zKHRydWUpO1xuICAgICAgICB0aGlzLmZpbGVTeXN0ZW0ucmVhZEZpbGVTeW5jID0gc2lub24uc3R1YigpLnJldHVybnMoSlNPTi5zdHJpbmdpZnkoYm9pbGVyUGxhdGVzKSk7XG5cbiAgICAgICAgdGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyID0gbmV3IEJvaWxlclBsYXRlc01hbmFnZXIoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ01hbmFnZXIsXG4gICAgICAgICAgICB0aGlzLmh0dHBXcmFwcGVyLFxuICAgICAgICAgICAgdGhpcy5naXQsXG4gICAgICAgICAgICB0aGlzLmZvbGRlcnMsXG4gICAgICAgICAgICB0aGlzLmZpbGVTeXN0ZW0sXG4gICAgICAgICAgICBsb2dnZXJcbiAgICAgICAgKTtcbiAgICB9XG59Il19