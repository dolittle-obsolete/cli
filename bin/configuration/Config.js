'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _Cluster = require('./Cluster');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Config = exports.Config = function Config() {
  (0, _classCallCheck3.default)(this, Config);
  this.clusters = [];
  this.current = null;
}
/**
 * Array of all the configured clusters
 * @type cluster[]
 */


/**
 * Current cluster being used
 */
; /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Dolittle. All rights reserved.
   *  Licensed under the MIT License. See LICENSE in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL0NvbmZpZy5qcyJdLCJuYW1lcyI6WyJDb25maWciLCJjbHVzdGVycyIsImN1cnJlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBSUE7Ozs7SUFFYUEsTSxXQUFBQSxNOztPQU1UQyxRLEdBQVcsRTtPQUtYQyxPLEdBQVUsSTs7QUFUVjs7Ozs7O0FBTUE7OztFQWRKIiwiZmlsZSI6IkNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IENsdXN0ZXIgfSBmcm9tICcuL0NsdXN0ZXInO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnXG57XG4gICAgLyoqXG4gICAgICogQXJyYXkgb2YgYWxsIHRoZSBjb25maWd1cmVkIGNsdXN0ZXJzXG4gICAgICogQHR5cGUgY2x1c3RlcltdXG4gICAgICovXG4gICAgY2x1c3RlcnMgPSBbXVxuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBjbHVzdGVyIGJlaW5nIHVzZWRcbiAgICAgKi9cbiAgICBjdXJyZW50ID0gbnVsbFxufVxuIl19