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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvSW50ZXJhY3Rpb25MYXllci5qcyJdLCJuYW1lcyI6WyJJbnRlcmFjdGlvbkxheWVyIiwidHlwZSIsImxhbmd1YWdlIiwiZnJhbWV3b3JrIiwiZW50cnlQb2ludCIsIl90eXBlIiwiX2xhbmd1YWdlIiwiX2ZyYW1ld29yayIsIl9lbnRyeVBvaW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7OztBQUtBOzs7SUFHYUEsZ0IsV0FBQUEsZ0I7QUFFVDs7Ozs7OztBQU9BLDRCQUFhQyxJQUFiLEVBQW1CQyxRQUFuQixFQUE2QkMsU0FBN0IsRUFBd0NDLFVBQXhDLEVBQW9EO0FBQUE7O0FBQ2hELFNBQUtDLEtBQUwsR0FBYUosSUFBYjtBQUNBLFNBQUtLLFNBQUwsR0FBaUJKLFFBQWpCO0FBQ0EsU0FBS0ssVUFBTCxHQUFrQkosU0FBbEI7QUFDQSxTQUFLSyxXQUFMLEdBQW1CSixVQUFuQjtBQUNIO0FBQ0Q7Ozs7Ozs7O3dCQUlXO0FBQ1AsYUFBTyxLQUFLQyxLQUFaO0FBQ0g7QUFDRDs7Ozs7Ozt3QkFJZTtBQUNYLGFBQU8sS0FBS0MsU0FBWjtBQUNIO0FBQ0Q7Ozs7Ozs7d0JBSWdCO0FBQ1osYUFBTyxLQUFLQyxVQUFaO0FBQ0g7QUFDRDs7Ozs7Ozt3QkFJaUI7QUFDYixhQUFPLEtBQUtDLFdBQVo7QUFDSCIsImZpbGUiOiJJbnRlcmFjdGlvbkxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAgKiBSZXByZXNlbnRzIGFuIGludGVyYWN0aW9uIGxheWVyXG4gICovXG5leHBvcnQgY2xhc3MgSW50ZXJhY3Rpb25MYXllclxue1xuICAgIC8qKlxuICAgICAgKiBJbnN0YW50aWF0ZXMgYW4gaW5zdGFuY2Ugb2YgSW50ZXJhY3Rpb25MYXRlclxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBcbiAgICAgICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIFxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJhbWV3b3JrIFxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW50cnlQb2ludCBcbiAgICAgICovXG4gICAgY29uc3RydWN0b3IgKHR5cGUsIGxhbmd1YWdlLCBmcmFtZXdvcmssIGVudHJ5UG9pbnQpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX2xhbmd1YWdlID0gbGFuZ3VhZ2U7XG4gICAgICAgIHRoaXMuX2ZyYW1ld29yayA9IGZyYW1ld29yaztcbiAgICAgICAgdGhpcy5fZW50cnlQb2ludCA9IGVudHJ5UG9pbnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAgKiBHZXRzIHRoZSB0eXBlIG9mIHRoZSBpbnRlcmFjdGlvbiBsYXllclxuICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgdHlwZVxuICAgICAgKi9cbiAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAgKiBHZXRzIHRoZSBwcm9ncmFtbWluZyBsYW5ndWFnZSBzdHJpbmdcbiAgICAgICogQHJldHVybnMge3N0cmluZ30gcHJvZ3JhbW1pbmcgbGFuZ3VhZ2VcbiAgICAgICovXG4gICAgZ2V0IGxhbmd1YWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFuZ3VhZ2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAgKiBHZXRzIHRoZSBmcmFtZXdvcmtcbiAgICAgICogQHJldHVybnMge3N0cmluZ30gZnJhbWV3b3JrXG4gICAgICAqL1xuICAgIGdldCBmcmFtZXdvcmsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mcmFtZXdvcms7XG4gICAgfVxuICAgIC8qKlxuICAgICAgKiBHZXRzIHRoZSBlbnRyeSBwb2ludFxuICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgZW50cnlwb2ludCBvZiB0aGUgaW50ZXJhY3Rpb24gbGF5ZXJcbiAgICAgICovXG4gICAgZ2V0IGVudHJ5UG9pbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbnRyeVBvaW50O1xuICAgIH1cbn0iXX0=