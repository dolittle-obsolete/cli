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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9HdWlkLmpzIl0sIm5hbWVzIjpbIkd1aWQiLCJTNCIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0cmluZyIsImd1aWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBS0E7OztJQUdhQSxJLFdBQUFBLEk7Ozs7Ozs7OztBQVNUOzs7OzZCQUlnQjtBQUNaLFVBQUlDLEtBQUssU0FBTEEsRUFBSyxHQUFNO0FBQ1gsZUFBTyxDQUFFLENBQUMsSUFBSUMsS0FBS0MsTUFBTCxFQUFMLElBQXNCLE9BQXZCLEdBQWtDLENBQW5DLEVBQXNDQyxRQUF0QyxDQUErQyxFQUEvQyxFQUFtREMsU0FBbkQsQ0FBNkQsQ0FBN0QsQ0FBUDtBQUNILE9BRkQ7QUFHQSxVQUFJQyxPQUFRTCxPQUFPQSxJQUFQLEdBQWMsR0FBZCxHQUFvQkEsSUFBcEIsR0FBMkIsR0FBM0IsR0FBaUNBLElBQWpDLEdBQXdDLEdBQXhDLEdBQThDQSxJQUE5QyxHQUFxRCxHQUFyRCxHQUEyREEsSUFBM0QsR0FBa0VBLElBQWxFLEdBQXlFQSxJQUFyRjtBQUNBLGFBQU9LLElBQVA7QUFDSDs7Ozs7QUFqQkQ7Ozt3QkFHbUI7QUFDZixhQUFPLHNDQUFQO0FBQ0giLCJmaWxlIjoiR3VpZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZ2xvYmFsc2x5IHVuaXF1ZSBpZGVudGlmaWVyXG4gKi9cbmV4cG9ydCBjbGFzcyBHdWlkIHtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZW1wdHkgcmVwcmVzZW50YXRpb25cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IGVtcHR5KCkge1xuICAgICAgICByZXR1cm4gJzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHtHdWlkfSBhcyB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB7R3VpZH1cbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlKCkge1xuICAgICAgICBsZXQgUzQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKCgoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCkgfCAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpO1xuICAgICAgICB9O1xuICAgICAgICBsZXQgZ3VpZCA9IChTNCgpICsgUzQoKSArICctJyArIFM0KCkgKyAnLScgKyBTNCgpICsgJy0nICsgUzQoKSArICctJyArIFM0KCkgKyBTNCgpICsgUzQoKSk7XG4gICAgICAgIHJldHVybiBndWlkO1xuICAgIH1cbn1cbiJdfQ==