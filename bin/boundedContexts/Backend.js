"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Backend = undefined;

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
 * Represents a Bounded Context's backend configuration
 */
var Backend = exports.Backend = function () {
  /**
   * Instantiates an instance of Backend
   * @param {string} language 
   * @param {string} entryPoint 
   */
  function Backend(language, entryPoint) {
    (0, _classCallCheck3.default)(this, Backend);

    this._language = language;
    this._entryPoint = entryPoint;
  }
  /**
   * Gets the programming language
   * @returns {string} The string representing the programming language
   */


  (0, _createClass3.default)(Backend, [{
    key: "language",
    get: function get() {
      return this._language;
    }
    /**
     * Gets the entry point
     * @returns {string} The entry point
     */

  }, {
    key: "entryPoint",
    get: function get() {
      return this._entryPoint;
    }
  }]);
  return Backend;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvQmFja2VuZC5qcyJdLCJuYW1lcyI6WyJCYWNrZW5kIiwibGFuZ3VhZ2UiLCJlbnRyeVBvaW50IiwiX2xhbmd1YWdlIiwiX2VudHJ5UG9pbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBS0M7OztJQUdhQSxPLFdBQUFBLE87QUFFVDs7Ozs7QUFLQSxtQkFBYUMsUUFBYixFQUF1QkMsVUFBdkIsRUFBbUM7QUFBQTs7QUFDL0IsU0FBS0MsU0FBTCxHQUFpQkYsUUFBakI7QUFDQSxTQUFLRyxXQUFMLEdBQW1CRixVQUFuQjtBQUNIO0FBQ0Q7Ozs7Ozs7O3dCQUllO0FBQ1gsYUFBTyxLQUFLQyxTQUFaO0FBQ0g7QUFDRDs7Ozs7Ozt3QkFJaUI7QUFDYixhQUFPLEtBQUtDLFdBQVo7QUFDSCIsImZpbGUiOiJCYWNrZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gLyoqXG4gICogUmVwcmVzZW50cyBhIEJvdW5kZWQgQ29udGV4dCdzIGJhY2tlbmQgY29uZmlndXJhdGlvblxuICAqL1xuIGV4cG9ydCBjbGFzcyBCYWNrZW5kXG4ge1xuICAgICAvKipcbiAgICAgICogSW5zdGFudGlhdGVzIGFuIGluc3RhbmNlIG9mIEJhY2tlbmRcbiAgICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIFxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW50cnlQb2ludCBcbiAgICAgICovXG4gICAgIGNvbnN0cnVjdG9yIChsYW5ndWFnZSwgZW50cnlQb2ludCkge1xuICAgICAgICAgdGhpcy5fbGFuZ3VhZ2UgPSBsYW5ndWFnZTtcbiAgICAgICAgIHRoaXMuX2VudHJ5UG9pbnQgPSBlbnRyeVBvaW50O1xuICAgICB9XG4gICAgIC8qKlxuICAgICAgKiBHZXRzIHRoZSBwcm9ncmFtbWluZyBsYW5ndWFnZVxuICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcHJvZ3JhbW1pbmcgbGFuZ3VhZ2VcbiAgICAgICovXG4gICAgIGdldCBsYW5ndWFnZSgpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9sYW5ndWFnZTtcbiAgICAgfVxuICAgICAvKipcbiAgICAgICogR2V0cyB0aGUgZW50cnkgcG9pbnRcbiAgICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIGVudHJ5IHBvaW50XG4gICAgICAqL1xuICAgICBnZXQgZW50cnlQb2ludCgpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9lbnRyeVBvaW50O1xuICAgICB9XG4gICAgXG4gfSJdfQ==