"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Core = undefined;

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
  * Represents a Bounded Context's core configuration
  */
var Core = exports.Core = function () {
  /**
    * Instantiates an instance of Core
    * @param {string} language 
    * @param {string} entryPoint 
    */
  function Core(language, entryPoint) {
    (0, _classCallCheck3.default)(this, Core);

    this._language = language;
    this._entryPoint = entryPoint;
  }
  /**
    * Gets the programming language
    * @returns {string} The string representing the programming language
    */


  (0, _createClass3.default)(Core, [{
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
  return Core;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvQ29yZS5qcyJdLCJuYW1lcyI6WyJDb3JlIiwibGFuZ3VhZ2UiLCJlbnRyeVBvaW50IiwiX2xhbmd1YWdlIiwiX2VudHJ5UG9pbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBS0E7OztJQUdhQSxJLFdBQUFBLEk7QUFFVDs7Ozs7QUFLQSxnQkFBYUMsUUFBYixFQUF1QkMsVUFBdkIsRUFBbUM7QUFBQTs7QUFDL0IsU0FBS0MsU0FBTCxHQUFpQkYsUUFBakI7QUFDQSxTQUFLRyxXQUFMLEdBQW1CRixVQUFuQjtBQUNIO0FBQ0Q7Ozs7Ozs7O3dCQUllO0FBQ1gsYUFBTyxLQUFLQyxTQUFaO0FBQ0g7QUFDRDs7Ozs7Ozt3QkFJaUI7QUFDYixhQUFPLEtBQUtDLFdBQVo7QUFDSCIsImZpbGUiOiJDb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLyoqXHJcbiAgKiBSZXByZXNlbnRzIGEgQm91bmRlZCBDb250ZXh0J3MgY29yZSBjb25maWd1cmF0aW9uXHJcbiAgKi9cclxuZXhwb3J0IGNsYXNzIENvcmVcclxue1xyXG4gICAgLyoqXHJcbiAgICAgICogSW5zdGFudGlhdGVzIGFuIGluc3RhbmNlIG9mIENvcmVcclxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgXHJcbiAgICAgICogQHBhcmFtIHtzdHJpbmd9IGVudHJ5UG9pbnQgXHJcbiAgICAgICovXHJcbiAgICBjb25zdHJ1Y3RvciAobGFuZ3VhZ2UsIGVudHJ5UG9pbnQpIHtcclxuICAgICAgICB0aGlzLl9sYW5ndWFnZSA9IGxhbmd1YWdlO1xyXG4gICAgICAgIHRoaXMuX2VudHJ5UG9pbnQgPSBlbnRyeVBvaW50O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgICogR2V0cyB0aGUgcHJvZ3JhbW1pbmcgbGFuZ3VhZ2VcclxuICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcHJvZ3JhbW1pbmcgbGFuZ3VhZ2VcclxuICAgICAgKi9cclxuICAgIGdldCBsYW5ndWFnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFuZ3VhZ2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAgKiBHZXRzIHRoZSBlbnRyeSBwb2ludFxyXG4gICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbnRyeSBwb2ludFxyXG4gICAgICAqL1xyXG4gICAgZ2V0IGVudHJ5UG9pbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudHJ5UG9pbnQ7XHJcbiAgICB9XHJcbiAgICBcclxufSJdfQ==