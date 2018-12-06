'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Guid = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents a globalsly unique identifier
 */
var Guid = exports.Guid = function () {
    function Guid() {
        (0, _classCallCheck3.default)(this, Guid);
    }

    (0, _createClass3.default)(Guid, null, [{
        key: 'create',


        /**
         * Create a new {Guid} as {string}
         * @returns {string} String representation of {Guid}
         */
        value: function create() {
            var S4 = function S4() {
                return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
            };
            var guid = S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
            return guid;
        }
    }, {
        key: 'empty',


        /**
         * Get the empty representation
         */
        get: function get() {
            return '00000000-0000-0000-0000-000000000000';
        }
    }]);
    return Guid;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9HdWlkLmpzIl0sIm5hbWVzIjpbIkd1aWQiLCJTNCIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0cmluZyIsImd1aWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBS0E7OztJQUdhQSxJLFdBQUFBLEk7Ozs7Ozs7OztBQVNUOzs7O2lDQUlnQjtBQUNaLGdCQUFJQyxLQUFLLFNBQUxBLEVBQUssR0FBTTtBQUNYLHVCQUFPLENBQUUsQ0FBQyxJQUFJQyxLQUFLQyxNQUFMLEVBQUwsSUFBc0IsT0FBdkIsR0FBa0MsQ0FBbkMsRUFBc0NDLFFBQXRDLENBQStDLEVBQS9DLEVBQW1EQyxTQUFuRCxDQUE2RCxDQUE3RCxDQUFQO0FBQ0gsYUFGRDtBQUdBLGdCQUFJQyxPQUFRTCxPQUFPQSxJQUFQLEdBQWMsR0FBZCxHQUFvQkEsSUFBcEIsR0FBMkIsR0FBM0IsR0FBaUNBLElBQWpDLEdBQXdDLEdBQXhDLEdBQThDQSxJQUE5QyxHQUFxRCxHQUFyRCxHQUEyREEsSUFBM0QsR0FBa0VBLElBQWxFLEdBQXlFQSxJQUFyRjtBQUNBLG1CQUFPSyxJQUFQO0FBQ0g7Ozs7O0FBakJEOzs7NEJBR21CO0FBQ2YsbUJBQU8sc0NBQVA7QUFDSCIsImZpbGUiOiJHdWlkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBnbG9iYWxzbHkgdW5pcXVlIGlkZW50aWZpZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHdWlkIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgZW1wdHkgcmVwcmVzZW50YXRpb25cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldCBlbXB0eSgpIHtcclxuICAgICAgICByZXR1cm4gJzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcge0d1aWR9IGFzIHtzdHJpbmd9XHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBTdHJpbmcgcmVwcmVzZW50YXRpb24gb2Yge0d1aWR9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGUoKSB7XHJcbiAgICAgICAgbGV0IFM0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKCgoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCkgfCAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGd1aWQgPSAoUzQoKSArIFM0KCkgKyAnLScgKyBTNCgpICsgJy0nICsgUzQoKSArICctJyArIFM0KCkgKyAnLScgKyBTNCgpICsgUzQoKSArIFM0KCkpO1xyXG4gICAgICAgIHJldHVybiBndWlkO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==