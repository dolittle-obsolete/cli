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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvQmFja2VuZC5qcyJdLCJuYW1lcyI6WyJCYWNrZW5kIiwibGFuZ3VhZ2UiLCJlbnRyeVBvaW50IiwiX2xhbmd1YWdlIiwiX2VudHJ5UG9pbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBS0E7OztJQUdhQSxPLFdBQUFBLE87QUFFVDs7Ozs7QUFLQSxtQkFBYUMsUUFBYixFQUF1QkMsVUFBdkIsRUFBbUM7QUFBQTs7QUFDL0IsU0FBS0MsU0FBTCxHQUFpQkYsUUFBakI7QUFDQSxTQUFLRyxXQUFMLEdBQW1CRixVQUFuQjtBQUNIO0FBQ0Q7Ozs7Ozs7O3dCQUllO0FBQ1gsYUFBTyxLQUFLQyxTQUFaO0FBQ0g7QUFDRDs7Ozs7Ozt3QkFJaUI7QUFDYixhQUFPLEtBQUtDLFdBQVo7QUFDSCIsImZpbGUiOiJCYWNrZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAgKiBSZXByZXNlbnRzIGEgQm91bmRlZCBDb250ZXh0J3MgYmFja2VuZCBjb25maWd1cmF0aW9uXG4gICovXG5leHBvcnQgY2xhc3MgQmFja2VuZFxue1xuICAgIC8qKlxuICAgICAgKiBJbnN0YW50aWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQmFja2VuZFxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgXG4gICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbnRyeVBvaW50IFxuICAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAobGFuZ3VhZ2UsIGVudHJ5UG9pbnQpIHtcbiAgICAgICAgdGhpcy5fbGFuZ3VhZ2UgPSBsYW5ndWFnZTtcbiAgICAgICAgdGhpcy5fZW50cnlQb2ludCA9IGVudHJ5UG9pbnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAgKiBHZXRzIHRoZSBwcm9ncmFtbWluZyBsYW5ndWFnZVxuICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgcHJvZ3JhbW1pbmcgbGFuZ3VhZ2VcbiAgICAgICovXG4gICAgZ2V0IGxhbmd1YWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFuZ3VhZ2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAgKiBHZXRzIHRoZSBlbnRyeSBwb2ludFxuICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW50cnkgcG9pbnRcbiAgICAgICovXG4gICAgZ2V0IGVudHJ5UG9pbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbnRyeVBvaW50O1xuICAgIH1cbiAgICBcbn0iXX0=