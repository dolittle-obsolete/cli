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
 * @type {Cluster[]}
 */


/**
 * Current cluster being used
 * @type {Cluster}
 */
; /*---------------------------------------------------------------------------------------------
   *  Copyright (c) Dolittle. All rights reserved.
   *  Licensed under the MIT License. See LICENSE in the project root for license information.
   *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL0NvbmZpZy5qcyJdLCJuYW1lcyI6WyJDb25maWciLCJjbHVzdGVycyIsImN1cnJlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBSUE7Ozs7SUFFYUEsTSxXQUFBQSxNOztPQU1UQyxRLEdBQVcsRTtPQU1YQyxPLEdBQVUsSTs7QUFWVjs7Ozs7O0FBTUE7Ozs7RUFkSiIsImZpbGUiOiJDb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmltcG9ydCB7IENsdXN0ZXIgfSBmcm9tICcuL0NsdXN0ZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbmZpZ1xyXG57XHJcbiAgICAvKipcclxuICAgICAqIEFycmF5IG9mIGFsbCB0aGUgY29uZmlndXJlZCBjbHVzdGVyc1xyXG4gICAgICogQHR5cGUge0NsdXN0ZXJbXX1cclxuICAgICAqL1xyXG4gICAgY2x1c3RlcnMgPSBbXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3VycmVudCBjbHVzdGVyIGJlaW5nIHVzZWRcclxuICAgICAqIEB0eXBlIHtDbHVzdGVyfVxyXG4gICAgICovXHJcbiAgICBjdXJyZW50ID0gbnVsbFxyXG59XHJcbiJdfQ==