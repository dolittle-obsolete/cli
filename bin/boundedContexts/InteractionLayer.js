"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionLayer = undefined;

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
  * Represents an interaction layer
  */
var InteractionLayer = exports.InteractionLayer = function () {
  /**
    * Instantiates an instance of InteractionLater
    * @param {string} type 
    * @param {string} language 
    * @param {string} framework 
    * @param {string} entryPoint 
    */
  function InteractionLayer(type, language, framework, entryPoint) {
    (0, _classCallCheck3.default)(this, InteractionLayer);

    this._type = type;
    this._language = language;
    this._framework = framework;
    this._entryPoint = entryPoint;
  }
  /**
    * Gets the type of the interaction layer
    * @returns {string} the type
    */


  (0, _createClass3.default)(InteractionLayer, [{
    key: "type",
    get: function get() {
      return this._type;
    }
    /**
      * Gets the programming language string
      * @returns {string} programming language
      */

  }, {
    key: "language",
    get: function get() {
      return this._language;
    }
    /**
      * Gets the framework
      * @returns {string} framework
      */

  }, {
    key: "framework",
    get: function get() {
      return this._framework;
    }
    /**
      * Gets the entry point
      * @returns {string} the entrypoint of the interaction layer
      */

  }, {
    key: "entryPoint",
    get: function get() {
      return this._entryPoint;
    }
  }]);
  return InteractionLayer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvSW50ZXJhY3Rpb25MYXllci5qcyJdLCJuYW1lcyI6WyJJbnRlcmFjdGlvbkxheWVyIiwidHlwZSIsImxhbmd1YWdlIiwiZnJhbWV3b3JrIiwiZW50cnlQb2ludCIsIl90eXBlIiwiX2xhbmd1YWdlIiwiX2ZyYW1ld29yayIsIl9lbnRyeVBvaW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7OztBQUtBOzs7SUFHYUEsZ0IsV0FBQUEsZ0I7QUFFVDs7Ozs7OztBQU9BLDRCQUFhQyxJQUFiLEVBQW1CQyxRQUFuQixFQUE2QkMsU0FBN0IsRUFBd0NDLFVBQXhDLEVBQW9EO0FBQUE7O0FBQ2hELFNBQUtDLEtBQUwsR0FBYUosSUFBYjtBQUNBLFNBQUtLLFNBQUwsR0FBaUJKLFFBQWpCO0FBQ0EsU0FBS0ssVUFBTCxHQUFrQkosU0FBbEI7QUFDQSxTQUFLSyxXQUFMLEdBQW1CSixVQUFuQjtBQUNIO0FBQ0Q7Ozs7Ozs7O3dCQUlXO0FBQ1AsYUFBTyxLQUFLQyxLQUFaO0FBQ0g7QUFDRDs7Ozs7Ozt3QkFJZTtBQUNYLGFBQU8sS0FBS0MsU0FBWjtBQUNIO0FBQ0Q7Ozs7Ozs7d0JBSWdCO0FBQ1osYUFBTyxLQUFLQyxVQUFaO0FBQ0g7QUFDRDs7Ozs7Ozt3QkFJaUI7QUFDYixhQUFPLEtBQUtDLFdBQVo7QUFDSCIsImZpbGUiOiJJbnRlcmFjdGlvbkxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuLyoqXHJcbiAgKiBSZXByZXNlbnRzIGFuIGludGVyYWN0aW9uIGxheWVyXHJcbiAgKi9cclxuZXhwb3J0IGNsYXNzIEludGVyYWN0aW9uTGF5ZXJcclxue1xyXG4gICAgLyoqXHJcbiAgICAgICogSW5zdGFudGlhdGVzIGFuIGluc3RhbmNlIG9mIEludGVyYWN0aW9uTGF0ZXJcclxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBcclxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgXHJcbiAgICAgICogQHBhcmFtIHtzdHJpbmd9IGZyYW1ld29yayBcclxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW50cnlQb2ludCBcclxuICAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yICh0eXBlLCBsYW5ndWFnZSwgZnJhbWV3b3JrLCBlbnRyeVBvaW50KSB7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5fbGFuZ3VhZ2UgPSBsYW5ndWFnZTtcclxuICAgICAgICB0aGlzLl9mcmFtZXdvcmsgPSBmcmFtZXdvcms7XHJcbiAgICAgICAgdGhpcy5fZW50cnlQb2ludCA9IGVudHJ5UG9pbnQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAgKiBHZXRzIHRoZSB0eXBlIG9mIHRoZSBpbnRlcmFjdGlvbiBsYXllclxyXG4gICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSB0eXBlXHJcbiAgICAgICovXHJcbiAgICBnZXQgdHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICAqIEdldHMgdGhlIHByb2dyYW1taW5nIGxhbmd1YWdlIHN0cmluZ1xyXG4gICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHByb2dyYW1taW5nIGxhbmd1YWdlXHJcbiAgICAgICovXHJcbiAgICBnZXQgbGFuZ3VhZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhbmd1YWdlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgICogR2V0cyB0aGUgZnJhbWV3b3JrXHJcbiAgICAgICogQHJldHVybnMge3N0cmluZ30gZnJhbWV3b3JrXHJcbiAgICAgICovXHJcbiAgICBnZXQgZnJhbWV3b3JrKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mcmFtZXdvcms7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAgKiBHZXRzIHRoZSBlbnRyeSBwb2ludFxyXG4gICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBlbnRyeXBvaW50IG9mIHRoZSBpbnRlcmFjdGlvbiBsYXllclxyXG4gICAgICAqL1xyXG4gICAgZ2V0IGVudHJ5UG9pbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudHJ5UG9pbnQ7XHJcbiAgICB9XHJcbn0iXX0=