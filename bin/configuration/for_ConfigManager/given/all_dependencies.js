"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.all_dependencies = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var all_dependencies = exports.all_dependencies = function all_dependencies() {
    (0, _classCallCheck3.default)(this, all_dependencies);

    this.configParser = {
        parse: sinon.stub()
    };
    this.fs = {
        existsSync: sinon.stub().returns(false),
        ensureDirSync: sinon.stub(),
        writeFile: sinon.stub()
    };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL2Zvcl9Db25maWdNYW5hZ2VyL2dpdmVuL2FsbF9kZXBlbmRlbmNpZXMuanMiXSwibmFtZXMiOlsiYWxsX2RlcGVuZGVuY2llcyIsImNvbmZpZ1BhcnNlciIsInBhcnNlIiwic2lub24iLCJzdHViIiwiZnMiLCJleGlzdHNTeW5jIiwicmV0dXJucyIsImVuc3VyZURpclN5bmMiLCJ3cml0ZUZpbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQUlhQSxnQixXQUFBQSxnQixHQUNULDRCQUFjO0FBQUE7O0FBQ1YsU0FBS0MsWUFBTCxHQUFvQjtBQUNoQkMsZUFBT0MsTUFBTUMsSUFBTjtBQURTLEtBQXBCO0FBR0EsU0FBS0MsRUFBTCxHQUFVO0FBQ05DLG9CQUFZSCxNQUFNQyxJQUFOLEdBQWFHLE9BQWIsQ0FBcUIsS0FBckIsQ0FETjtBQUVOQyx1QkFBZUwsTUFBTUMsSUFBTixFQUZUO0FBR05LLG1CQUFXTixNQUFNQyxJQUFOO0FBSEwsS0FBVjtBQUtILEMiLCJmaWxlIjoiYWxsX2RlcGVuZGVuY2llcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmV4cG9ydCBjbGFzcyBhbGxfZGVwZW5kZW5jaWVzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb25maWdQYXJzZXIgPSB7XG4gICAgICAgICAgICBwYXJzZTogc2lub24uc3R1YigpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZnMgPSB7XG4gICAgICAgICAgICBleGlzdHNTeW5jOiBzaW5vbi5zdHViKCkucmV0dXJucyhmYWxzZSksXG4gICAgICAgICAgICBlbnN1cmVEaXJTeW5jOiBzaW5vbi5zdHViKCksXG4gICAgICAgICAgICB3cml0ZUZpbGU6IHNpbm9uLnN0dWIoKVxuICAgICAgICB9O1xuICAgIH1cbn0iXX0=