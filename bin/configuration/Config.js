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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL0NvbmZpZy5qcyJdLCJuYW1lcyI6WyJDb25maWciLCJjbHVzdGVycyIsImN1cnJlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBSUE7Ozs7SUFFYUEsTSxXQUFBQSxNOztPQU1UQyxRLEdBQVcsRTtPQU1YQyxPLEdBQVUsSTs7QUFWVjs7Ozs7O0FBTUE7Ozs7RUFkSiIsImZpbGUiOiJDb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBDbHVzdGVyIH0gZnJvbSAnLi9DbHVzdGVyJztcblxuZXhwb3J0IGNsYXNzIENvbmZpZ1xue1xuICAgIC8qKlxuICAgICAqIEFycmF5IG9mIGFsbCB0aGUgY29uZmlndXJlZCBjbHVzdGVyc1xuICAgICAqIEB0eXBlIHtDbHVzdGVyW119XG4gICAgICovXG4gICAgY2x1c3RlcnMgPSBbXVxuXG4gICAgLyoqXG4gICAgICogQ3VycmVudCBjbHVzdGVyIGJlaW5nIHVzZWRcbiAgICAgKiBAdHlwZSB7Q2x1c3Rlcn1cbiAgICAgKi9cbiAgICBjdXJyZW50ID0gbnVsbFxufVxuIl19