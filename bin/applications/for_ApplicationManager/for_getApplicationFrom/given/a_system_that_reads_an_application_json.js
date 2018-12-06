'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_system_that_reads_an_application_json = undefined;

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
var a_system_that_reads_an_application_json = exports.a_system_that_reads_an_application_json = function (_an_application_manag) {
    (0, _inherits3.default)(a_system_that_reads_an_application_json, _an_application_manag);

    function a_system_that_reads_an_application_json() {
        (0, _classCallCheck3.default)(this, a_system_that_reads_an_application_json);

        var _this = (0, _possibleConstructorReturn3.default)(this, (a_system_that_reads_an_application_json.__proto__ || Object.getPrototypeOf(a_system_that_reads_an_application_json)).call(this));

        _this.applicationId = 'eb6edb77-0dbc-4f1e-91d9-3edaef4fc2f2';
        _this.applicationName = 'TheApplicationName';
        _this.applicationJson = '\n            {\n                "id": "' + _this.applicationId + '",\n                "name": "' + _this.applicationName + '"\n            }\n        ';
        _this.fileSystem = {
            readFileSync: sinon.stub().returns(_this.applicationJson),
            existsSync: sinon.stub().returns(true)
        };
        _this.applicationManager = new _ApplicationManager.ApplicationManager(_this.boilerPlatesManager, _this.configManager, _this.folders, _this.fileSystem, logger);
        _this.folder = 'some folder';
        return _this;
    }

    return a_system_that_reads_an_application_json;
}(_an_application_manager.an_application_manager);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvZm9yX0FwcGxpY2F0aW9uTWFuYWdlci9mb3JfZ2V0QXBwbGljYXRpb25Gcm9tL2dpdmVuL2Ffc3lzdGVtX3RoYXRfcmVhZHNfYW5fYXBwbGljYXRpb25fanNvbi5qcyJdLCJuYW1lcyI6WyJhX3N5c3RlbV90aGF0X3JlYWRzX2FuX2FwcGxpY2F0aW9uX2pzb24iLCJhcHBsaWNhdGlvbklkIiwiYXBwbGljYXRpb25OYW1lIiwiYXBwbGljYXRpb25Kc29uIiwiZmlsZVN5c3RlbSIsInJlYWRGaWxlU3luYyIsInNpbm9uIiwic3R1YiIsInJldHVybnMiLCJleGlzdHNTeW5jIiwiYXBwbGljYXRpb25NYW5hZ2VyIiwiQXBwbGljYXRpb25NYW5hZ2VyIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImNvbmZpZ01hbmFnZXIiLCJmb2xkZXJzIiwibG9nZ2VyIiwiZm9sZGVyIiwiYW5fYXBwbGljYXRpb25fbWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOzs7O0FBTEE7Ozs7SUFPYUEsdUMsV0FBQUEsdUM7OztBQUNULHVEQUFjO0FBQUE7O0FBQUE7O0FBRVYsY0FBS0MsYUFBTCxHQUFxQixzQ0FBckI7QUFDQSxjQUFLQyxlQUFMLEdBQXVCLG9CQUF2QjtBQUNBLGNBQUtDLGVBQUwsZ0RBR2lCLE1BQUtGLGFBSHRCLHFDQUltQixNQUFLQyxlQUp4QjtBQU9BLGNBQUtFLFVBQUwsR0FBa0I7QUFDZEMsMEJBQWNDLE1BQU1DLElBQU4sR0FBYUMsT0FBYixDQUFxQixNQUFLTCxlQUExQixDQURBO0FBRWRNLHdCQUFZSCxNQUFNQyxJQUFOLEdBQWFDLE9BQWIsQ0FBcUIsSUFBckI7QUFGRSxTQUFsQjtBQUlBLGNBQUtFLGtCQUFMLEdBQTBCLElBQUlDLHNDQUFKLENBQXVCLE1BQUtDLG1CQUE1QixFQUFpRCxNQUFLQyxhQUF0RCxFQUFxRSxNQUFLQyxPQUExRSxFQUFtRixNQUFLVixVQUF4RixFQUFvR1csTUFBcEcsQ0FBMUI7QUFDQSxjQUFLQyxNQUFMLEdBQWMsYUFBZDtBQWhCVTtBQWlCYjs7O0VBbEJ3REMsOEMiLCJmaWxlIjoiYV9zeXN0ZW1fdGhhdF9yZWFkc19hbl9hcHBsaWNhdGlvbl9qc29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgQXBwbGljYXRpb25NYW5hZ2VyIH0gZnJvbSAnLi4vLi4vLi4vQXBwbGljYXRpb25NYW5hZ2VyJztcbmltcG9ydCB7IGFuX2FwcGxpY2F0aW9uX21hbmFnZXIgfSBmcm9tICcuLi8uLi9naXZlbi9hbl9hcHBsaWNhdGlvbl9tYW5hZ2VyJztcblxuZXhwb3J0IGNsYXNzIGFfc3lzdGVtX3RoYXRfcmVhZHNfYW5fYXBwbGljYXRpb25fanNvbiBleHRlbmRzIGFuX2FwcGxpY2F0aW9uX21hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uSWQgPSAnZWI2ZWRiNzctMGRiYy00ZjFlLTkxZDktM2VkYWVmNGZjMmYyJztcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbk5hbWUgPSAnVGhlQXBwbGljYXRpb25OYW1lJztcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbkpzb24gPSBcbiAgICAgICAgYFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogXCIke3RoaXMuYXBwbGljYXRpb25JZH1cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCIke3RoaXMuYXBwbGljYXRpb25OYW1lfVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgICAgIHRoaXMuZmlsZVN5c3RlbSA9IHtcbiAgICAgICAgICAgIHJlYWRGaWxlU3luYzogc2lub24uc3R1YigpLnJldHVybnModGhpcy5hcHBsaWNhdGlvbkpzb24pLFxuICAgICAgICAgICAgZXhpc3RzU3luYzogc2lub24uc3R1YigpLnJldHVybnModHJ1ZSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbk1hbmFnZXIgPSBuZXcgQXBwbGljYXRpb25NYW5hZ2VyKHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5jb25maWdNYW5hZ2VyLCB0aGlzLmZvbGRlcnMsIHRoaXMuZmlsZVN5c3RlbSwgbG9nZ2VyKTtcbiAgICAgICAgdGhpcy5mb2xkZXIgPSAnc29tZSBmb2xkZXInO1xuICAgIH1cbn0iXX0=