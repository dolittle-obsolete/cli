"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Application = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var _id = new WeakMap();
var _name = new WeakMap();

/**
 * Represents the definition of an application
 */

var Application = exports.Application = function () {

  /**
   * Initializes a new instance of {Application}
   * @param {string} id Unique identifier for application
   * @param {stirng} name Name of application
   */
  function Application(id, name) {
    (0, _classCallCheck3.default)(this, Application);

    _id.set(this, id);
    _name.set(this, name);
  }

  /**
   * Gets the unique identifier for the application
   * @returns {string} Global unique identifier
   */


  (0, _createClass3.default)(Application, [{
    key: "id",
    get: function get() {
      return _id.get(this);
    }

    /**
     * Gets the name of the application
     * @returns {string} Name of the application
     */

  }, {
    key: "name",
    get: function get() {
      return _name.get(this);
    }
  }]);
  return Application;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiX2lkIiwiV2Vha01hcCIsIl9uYW1lIiwiQXBwbGljYXRpb24iLCJpZCIsIm5hbWUiLCJzZXQiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBS0EsSUFBTUEsTUFBTSxJQUFJQyxPQUFKLEVBQVo7QUFDQSxJQUFNQyxRQUFRLElBQUlELE9BQUosRUFBZDs7QUFFQTs7OztJQUdhRSxXLFdBQUFBLFc7O0FBRVQ7Ozs7O0FBS0EsdUJBQVlDLEVBQVosRUFBZ0JDLElBQWhCLEVBQXNCO0FBQUE7O0FBQ2xCTCxRQUFJTSxHQUFKLENBQVEsSUFBUixFQUFjRixFQUFkO0FBQ0FGLFVBQU1JLEdBQU4sQ0FBVSxJQUFWLEVBQWdCRCxJQUFoQjtBQUNIOztBQUVEOzs7Ozs7Ozt3QkFJUztBQUNMLGFBQU9MLElBQUlPLEdBQUosQ0FBUSxJQUFSLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozt3QkFJVztBQUNQLGFBQU9MLE1BQU1LLEdBQU4sQ0FBVSxJQUFWLENBQVA7QUFDSCIsImZpbGUiOiJBcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuY29uc3QgX2lkID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9uYW1lID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBkZWZpbml0aW9uIG9mIGFuIGFwcGxpY2F0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbiB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7QXBwbGljYXRpb259XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFVuaXF1ZSBpZGVudGlmaWVyIGZvciBhcHBsaWNhdGlvblxuICAgICAqIEBwYXJhbSB7c3Rpcm5nfSBuYW1lIE5hbWUgb2YgYXBwbGljYXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpZCwgbmFtZSkge1xuICAgICAgICBfaWQuc2V0KHRoaXMsIGlkKTtcbiAgICAgICAgX25hbWUuc2V0KHRoaXMsIG5hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgYXBwbGljYXRpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBHbG9iYWwgdW5pcXVlIGlkZW50aWZpZXJcbiAgICAgKi9cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiBfaWQuZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG5hbWUgb2YgdGhlIGFwcGxpY2F0aW9uXG4gICAgICogQHJldHVybnMge3N0cmluZ30gTmFtZSBvZiB0aGUgYXBwbGljYXRpb25cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIF9uYW1lLmdldCh0aGlzKTtcbiAgICB9XG59Il19