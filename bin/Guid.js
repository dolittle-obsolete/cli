"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Guid = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents a globally unique identifier
 */
var Guid = exports.Guid = function () {
  function Guid() {
    (0, _classCallCheck3.default)(this, Guid);
  }

  (0, _createClass3.default)(Guid, null, [{
    key: "create",


    /**
     * Create a new {Guid} as {string}
     * @returns {string} String representation of {Guid}
     */
    value: function create() {
      var S4 = function S4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
      };
      var guid = S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
      return guid;
    }
  }, {
    key: "empty",


    /**
     * Get the empty representation
     */
    get: function get() {
      return "00000000-0000-0000-0000-000000000000";
    }
  }]);
  return Guid;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9HdWlkLmpzIl0sIm5hbWVzIjpbIkd1aWQiLCJTNCIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0cmluZyIsImd1aWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBS0E7OztJQUdhQSxJLFdBQUFBLEk7Ozs7Ozs7OztBQVNUOzs7OzZCQUlnQjtBQUNaLFVBQUlDLEtBQUssU0FBTEEsRUFBSyxHQUFNO0FBQ1gsZUFBTyxDQUFFLENBQUMsSUFBSUMsS0FBS0MsTUFBTCxFQUFMLElBQXNCLE9BQXZCLEdBQWtDLENBQW5DLEVBQXNDQyxRQUF0QyxDQUErQyxFQUEvQyxFQUFtREMsU0FBbkQsQ0FBNkQsQ0FBN0QsQ0FBUDtBQUNILE9BRkQ7QUFHQSxVQUFJQyxPQUFRTCxPQUFPQSxJQUFQLEdBQWMsR0FBZCxHQUFvQkEsSUFBcEIsR0FBMkIsR0FBM0IsR0FBaUNBLElBQWpDLEdBQXdDLEdBQXhDLEdBQThDQSxJQUE5QyxHQUFxRCxHQUFyRCxHQUEyREEsSUFBM0QsR0FBa0VBLElBQWxFLEdBQXlFQSxJQUFyRjtBQUNBLGFBQU9LLElBQVA7QUFDSDs7Ozs7QUFqQkQ7Ozt3QkFHbUI7QUFDZixhQUFPLHNDQUFQO0FBQ0giLCJmaWxlIjoiR3VpZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZ2xvYmFsbHkgdW5pcXVlIGlkZW50aWZpZXJcbiAqL1xuZXhwb3J0IGNsYXNzIEd1aWQge1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBlbXB0eSByZXByZXNlbnRhdGlvblxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgZW1wdHkoKSB7XG4gICAgICAgIHJldHVybiBcIjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMFwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyB7R3VpZH0gYXMge3N0cmluZ31cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBTdHJpbmcgcmVwcmVzZW50YXRpb24gb2Yge0d1aWR9XG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICAgICAgbGV0IFM0ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICgoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApIHwgMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKTtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGd1aWQgPSAoUzQoKSArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBTNCgpICsgUzQoKSk7XG4gICAgICAgIHJldHVybiBndWlkO1xuICAgIH1cbn1cbiJdfQ==