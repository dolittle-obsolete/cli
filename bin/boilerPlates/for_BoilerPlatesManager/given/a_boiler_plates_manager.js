'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_boiler_plates_manager = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _BoilerPlatesManager = require('../../BoilerPlatesManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var a_boiler_plates_manager = exports.a_boiler_plates_manager = function a_boiler_plates_manager() {
    (0, _classCallCheck3.default)(this, a_boiler_plates_manager);

    this.configManager = {
        centralFolderLocation: ''

    };
    this.httpWrapper = {};
    this.git = {};
    this.folders = {
        makeFolderIfNotExists: sinon.stub()
    };
    this.fileSystem = {
        existsSync: sinon.stub().returns(false)
    };

    this.boilerPlatesManager = new _BoilerPlatesManager.BoilerPlatesManager(this.configManager, this.httpWrapper, this.git, this.folders, this.fileSystem, logger);
}; /*---------------------------------------------------------------------------------------------
    *  Copyright (c) Dolittle. All rights reserved.
    *  Licensed under the MIT License. See LICENSE in the project root for license information.
    *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvZ2l2ZW4vYV9ib2lsZXJfcGxhdGVzX21hbmFnZXIuanMiXSwibmFtZXMiOlsiYV9ib2lsZXJfcGxhdGVzX21hbmFnZXIiLCJjb25maWdNYW5hZ2VyIiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIiwiaHR0cFdyYXBwZXIiLCJnaXQiLCJmb2xkZXJzIiwibWFrZUZvbGRlcklmTm90RXhpc3RzIiwic2lub24iLCJzdHViIiwiZmlsZVN5c3RlbSIsImV4aXN0c1N5bmMiLCJyZXR1cm5zIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsIkJvaWxlclBsYXRlc01hbmFnZXIiLCJsb2dnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBS0E7Ozs7SUFFYUEsdUIsV0FBQUEsdUIsR0FHVCxtQ0FBYztBQUFBOztBQUNWLFNBQUtDLGFBQUwsR0FBcUI7QUFDakJDLCtCQUF1Qjs7QUFETixLQUFyQjtBQUlBLFNBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxTQUFLQyxHQUFMLEdBQVcsRUFBWDtBQUNBLFNBQUtDLE9BQUwsR0FBZTtBQUNYQywrQkFBdUJDLE1BQU1DLElBQU47QUFEWixLQUFmO0FBR0EsU0FBS0MsVUFBTCxHQUFrQjtBQUNkQyxvQkFBWUgsTUFBTUMsSUFBTixHQUFhRyxPQUFiLENBQXFCLEtBQXJCO0FBREUsS0FBbEI7O0FBSUEsU0FBS0MsbUJBQUwsR0FBMkIsSUFBSUMsd0NBQUosQ0FDdkIsS0FBS1osYUFEa0IsRUFFdkIsS0FBS0UsV0FGa0IsRUFHdkIsS0FBS0MsR0FIa0IsRUFJdkIsS0FBS0MsT0FKa0IsRUFLdkIsS0FBS0ksVUFMa0IsRUFNdkJLLE1BTnVCLENBQTNCO0FBUUgsQyxFQWhDTCIsImZpbGUiOiJhX2JvaWxlcl9wbGF0ZXNfbWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaW1wb3J0IHsgQm9pbGVyUGxhdGVzTWFuYWdlciB9IGZyb20gJy4uLy4uL0JvaWxlclBsYXRlc01hbmFnZXInO1xuXG5leHBvcnQgY2xhc3MgYV9ib2lsZXJfcGxhdGVzX21hbmFnZXIge1xuXG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29uZmlnTWFuYWdlciA9IHtcbiAgICAgICAgICAgIGNlbnRyYWxGb2xkZXJMb2NhdGlvbjogJydcblxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmh0dHBXcmFwcGVyID0ge307XG4gICAgICAgIHRoaXMuZ2l0ID0ge307XG4gICAgICAgIHRoaXMuZm9sZGVycyA9IHtcbiAgICAgICAgICAgIG1ha2VGb2xkZXJJZk5vdEV4aXN0czogc2lub24uc3R1YigpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmlsZVN5c3RlbSA9IHtcbiAgICAgICAgICAgIGV4aXN0c1N5bmM6IHNpbm9uLnN0dWIoKS5yZXR1cm5zKGZhbHNlKVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBCb2lsZXJQbGF0ZXNNYW5hZ2VyKFxuICAgICAgICAgICAgdGhpcy5jb25maWdNYW5hZ2VyLFxuICAgICAgICAgICAgdGhpcy5odHRwV3JhcHBlcixcbiAgICAgICAgICAgIHRoaXMuZ2l0LFxuICAgICAgICAgICAgdGhpcy5mb2xkZXJzLFxuICAgICAgICAgICAgdGhpcy5maWxlU3lzdGVtLFxuICAgICAgICAgICAgbG9nZ2VyXG4gICAgICAgICk7XG4gICAgfVxufSJdfQ==