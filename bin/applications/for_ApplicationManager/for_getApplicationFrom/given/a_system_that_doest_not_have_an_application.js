'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_system_that_doest_not_have_an_application = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ApplicationManager = require('../../../ApplicationManager');

var _an_application_manager = require('../../given/an_application_manager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var a_system_that_doest_not_have_an_application = exports.a_system_that_doest_not_have_an_application = function (_an_application_manag) {
    (0, _inherits3.default)(a_system_that_doest_not_have_an_application, _an_application_manag);

    function a_system_that_doest_not_have_an_application() {
        (0, _classCallCheck3.default)(this, a_system_that_doest_not_have_an_application);

        var _this = (0, _possibleConstructorReturn3.default)(this, (a_system_that_doest_not_have_an_application.__proto__ || Object.getPrototypeOf(a_system_that_doest_not_have_an_application)).call(this));

        _this.fileSystem = {
            existsSync: sinon.stub().returns(false)
        };
        _this.applicationManager = new _ApplicationManager.ApplicationManager(_this.boilerPlatesManager, _this.configManager, _this.folders, _this.fileSystem, logger);
        _this.folder = 'some folder';
        return _this;
    }

    return a_system_that_doest_not_have_an_application;
}(_an_application_manager.an_application_manager);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvZm9yX0FwcGxpY2F0aW9uTWFuYWdlci9mb3JfZ2V0QXBwbGljYXRpb25Gcm9tL2dpdmVuL2Ffc3lzdGVtX3RoYXRfZG9lc3Rfbm90X2hhdmVfYW5fYXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiYV9zeXN0ZW1fdGhhdF9kb2VzdF9ub3RfaGF2ZV9hbl9hcHBsaWNhdGlvbiIsImZpbGVTeXN0ZW0iLCJleGlzdHNTeW5jIiwic2lub24iLCJzdHViIiwicmV0dXJucyIsImFwcGxpY2F0aW9uTWFuYWdlciIsIkFwcGxpY2F0aW9uTWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiZm9sZGVycyIsImxvZ2dlciIsImZvbGRlciIsImFuX2FwcGxpY2F0aW9uX21hbmFnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7OztBQUxBOzs7O0lBT2FBLDJDLFdBQUFBLDJDOzs7QUFDVCwyREFBYztBQUFBOztBQUFBOztBQUVWLGNBQUtDLFVBQUwsR0FBa0I7QUFDZEMsd0JBQVlDLE1BQU1DLElBQU4sR0FBYUMsT0FBYixDQUFxQixLQUFyQjtBQURFLFNBQWxCO0FBR0EsY0FBS0Msa0JBQUwsR0FBMEIsSUFBSUMsc0NBQUosQ0FBdUIsTUFBS0MsbUJBQTVCLEVBQWlELE1BQUtDLGFBQXRELEVBQXFFLE1BQUtDLE9BQTFFLEVBQW1GLE1BQUtULFVBQXhGLEVBQW9HVSxNQUFwRyxDQUExQjtBQUNBLGNBQUtDLE1BQUwsR0FBYyxhQUFkO0FBTlU7QUFPYjs7O0VBUjREQyw4QyIsImZpbGUiOiJhX3N5c3RlbV90aGF0X2RvZXN0X25vdF9oYXZlX2FuX2FwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgQXBwbGljYXRpb25NYW5hZ2VyIH0gZnJvbSAnLi4vLi4vLi4vQXBwbGljYXRpb25NYW5hZ2VyJztcbmltcG9ydCB7IGFuX2FwcGxpY2F0aW9uX21hbmFnZXIgfSBmcm9tICcuLi8uLi9naXZlbi9hbl9hcHBsaWNhdGlvbl9tYW5hZ2VyJztcblxuZXhwb3J0IGNsYXNzIGFfc3lzdGVtX3RoYXRfZG9lc3Rfbm90X2hhdmVfYW5fYXBwbGljYXRpb24gZXh0ZW5kcyBhbl9hcHBsaWNhdGlvbl9tYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5maWxlU3lzdGVtID0ge1xuICAgICAgICAgICAgZXhpc3RzU3luYzogc2lub24uc3R1YigpLnJldHVybnMoZmFsc2UpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb25NYW5hZ2VyID0gbmV3IEFwcGxpY2F0aW9uTWFuYWdlcih0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuY29uZmlnTWFuYWdlciwgdGhpcy5mb2xkZXJzLCB0aGlzLmZpbGVTeXN0ZW0sIGxvZ2dlcik7XG4gICAgICAgIHRoaXMuZm9sZGVyID0gJ3NvbWUgZm9sZGVyJztcbiAgICB9XG59Il19