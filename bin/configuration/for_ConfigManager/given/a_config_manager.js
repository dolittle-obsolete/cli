'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_config_manager = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _all_dependencies2 = require('./all_dependencies');

var _ConfigManager = require('../../ConfigManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var a_config_manager = exports.a_config_manager = function (_all_dependencies) {
    (0, _inherits3.default)(a_config_manager, _all_dependencies);

    function a_config_manager() {
        (0, _classCallCheck3.default)(this, a_config_manager);

        var _this = (0, _possibleConstructorReturn3.default)(this, (a_config_manager.__proto__ || Object.getPrototypeOf(a_config_manager)).call(this));

        _this.configManager = new _ConfigManager.ConfigManager(_this.fs, _this.configParser, logger);
        return _this;
    }

    return a_config_manager;
}(_all_dependencies2.all_dependencies);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL2Zvcl9Db25maWdNYW5hZ2VyL2dpdmVuL2FfY29uZmlnX21hbmFnZXIuanMiXSwibmFtZXMiOlsiYV9jb25maWdfbWFuYWdlciIsImNvbmZpZ01hbmFnZXIiLCJDb25maWdNYW5hZ2VyIiwiZnMiLCJjb25maWdQYXJzZXIiLCJsb2dnZXIiLCJhbGxfZGVwZW5kZW5jaWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7Ozs7QUFMQTs7OztJQU9hQSxnQixXQUFBQSxnQjs7O0FBQ1QsZ0NBQWM7QUFBQTs7QUFBQTs7QUFHVixjQUFLQyxhQUFMLEdBQXFCLElBQUlDLDRCQUFKLENBQWtCLE1BQUtDLEVBQXZCLEVBQTJCLE1BQUtDLFlBQWhDLEVBQThDQyxNQUE5QyxDQUFyQjtBQUhVO0FBSWI7OztFQUxpQ0MsbUMiLCJmaWxlIjoiYV9jb25maWdfbWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IGFsbF9kZXBlbmRlbmNpZXMgfSBmcm9tICcuL2FsbF9kZXBlbmRlbmNpZXMnO1xuaW1wb3J0IHvCoENvbmZpZ01hbmFnZXIgfSBmcm9tICcuLi8uLi9Db25maWdNYW5hZ2VyJztcblxuZXhwb3J0IGNsYXNzIGFfY29uZmlnX21hbmFnZXIgZXh0ZW5kcyBhbGxfZGVwZW5kZW5jaWVzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29uZmlnTWFuYWdlciA9IG5ldyBDb25maWdNYW5hZ2VyKHRoaXMuZnMsIHRoaXMuY29uZmlnUGFyc2VyLCBsb2dnZXIpO1xuICAgIH1cbn0iXX0=