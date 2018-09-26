"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoundedContext = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _Backend = require("./Backend");

var _InteractionLayer = require("./InteractionLayer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents a Bounded Context
 */
var BoundedContext = exports.BoundedContext = function () {
  /**
   * Instantiates an instance of BoundedContext
   * @param {string} application 
   * @param {string} boundedContext 
   * @param {string} boundedContextName 
   * @param {Backend} backend 
   * @param {InteractionLayer[]} interaction 
   */
  function BoundedContext(application, boundedContext, boundedContextName, backend, interaction) {
    (0, _classCallCheck3.default)(this, BoundedContext);

    this._application = application;
    this._boundedContext = boundedContext;
    this._boundedContextName = boundedContextName;
    this._backend = backend;
    this._interaction = interaction;
  }
  /**
   * Gets the application GUID
   * @returns {string} The GUID of the Application
   */


  (0, _createClass3.default)(BoundedContext, [{
    key: "application",
    get: function get() {
      return this._application;
    }
    /**
     * Gets the bounded context GUID
     * @returns {string} The GUID of the bounded context
     */

  }, {
    key: "boundedContext",
    get: function get() {
      return this._boundedContext;
    }
    /**
     * Gets the name of the bounded context
     * @returns {string} Bounded Context name
     */

  }, {
    key: "boundedContextName",
    get: function get() {
      return this._boundedContextName;
    }
    /**
     * Gets the backend configuration 
     * @returns {Backend}
     */

  }, {
    key: "backend",
    get: function get() {
      return this._backend;
    }
    /**
     * Gets the list interaction layers
     * @returns {InteractionLayer[]}
     */

  }, {
    key: "interaction",
    get: function get() {
      return this._interaction;
    }
  }]);
  return BoundedContext;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHQuanMiXSwibmFtZXMiOlsiQm91bmRlZENvbnRleHQiLCJhcHBsaWNhdGlvbiIsImJvdW5kZWRDb250ZXh0IiwiYm91bmRlZENvbnRleHROYW1lIiwiYmFja2VuZCIsImludGVyYWN0aW9uIiwiX2FwcGxpY2F0aW9uIiwiX2JvdW5kZWRDb250ZXh0IiwiX2JvdW5kZWRDb250ZXh0TmFtZSIsIl9iYWNrZW5kIiwiX2ludGVyYWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBOzs7OztBQUtDOzs7SUFHYUEsYyxXQUFBQSxjO0FBRVQ7Ozs7Ozs7O0FBUUEsMEJBQWFDLFdBQWIsRUFBMEJDLGNBQTFCLEVBQTBDQyxrQkFBMUMsRUFBOERDLE9BQTlELEVBQXVFQyxXQUF2RSxFQUFvRjtBQUFBOztBQUNoRixTQUFLQyxZQUFMLEdBQW9CTCxXQUFwQjtBQUNBLFNBQUtNLGVBQUwsR0FBdUJMLGNBQXZCO0FBQ0EsU0FBS00sbUJBQUwsR0FBMkJMLGtCQUEzQjtBQUNBLFNBQUtNLFFBQUwsR0FBZ0JMLE9BQWhCO0FBQ0EsU0FBS00sWUFBTCxHQUFvQkwsV0FBcEI7QUFDSDtBQUNEOzs7Ozs7Ozt3QkFJa0I7QUFDZCxhQUFPLEtBQUtDLFlBQVo7QUFDSDtBQUNEOzs7Ozs7O3dCQUlxQjtBQUNqQixhQUFPLEtBQUtDLGVBQVo7QUFDSDtBQUNEOzs7Ozs7O3dCQUl5QjtBQUNyQixhQUFPLEtBQUtDLG1CQUFaO0FBQ0g7QUFDRDs7Ozs7Ozt3QkFJYztBQUNWLGFBQU8sS0FBS0MsUUFBWjtBQUNIO0FBQ0Q7Ozs7Ozs7d0JBSWtCO0FBQ2QsYUFBTyxLQUFLQyxZQUFaO0FBQ0giLCJmaWxlIjoiQm91bmRlZENvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYWNrZW5kIH0gZnJvbSBcIi4vQmFja2VuZFwiO1xuaW1wb3J0IHsgSW50ZXJhY3Rpb25MYXllciB9IGZyb20gXCIuL0ludGVyYWN0aW9uTGF5ZXJcIjtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gLyoqXG4gICogUmVwcmVzZW50cyBhIEJvdW5kZWQgQ29udGV4dFxuICAqL1xuIGV4cG9ydCBjbGFzcyBCb3VuZGVkQ29udGV4dFxuIHtcbiAgICAgLyoqXG4gICAgICAqIEluc3RhbnRpYXRlcyBhbiBpbnN0YW5jZSBvZiBCb3VuZGVkQ29udGV4dFxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXBwbGljYXRpb24gXG4gICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib3VuZGVkQ29udGV4dCBcbiAgICAgICogQHBhcmFtIHtzdHJpbmd9IGJvdW5kZWRDb250ZXh0TmFtZSBcbiAgICAgICogQHBhcmFtIHtCYWNrZW5kfSBiYWNrZW5kIFxuICAgICAgKiBAcGFyYW0ge0ludGVyYWN0aW9uTGF5ZXJbXX0gaW50ZXJhY3Rpb24gXG4gICAgICAqL1xuICAgICBjb25zdHJ1Y3RvciAoYXBwbGljYXRpb24sIGJvdW5kZWRDb250ZXh0LCBib3VuZGVkQ29udGV4dE5hbWUsIGJhY2tlbmQsIGludGVyYWN0aW9uKSB7XG4gICAgICAgICB0aGlzLl9hcHBsaWNhdGlvbiA9IGFwcGxpY2F0aW9uO1xuICAgICAgICAgdGhpcy5fYm91bmRlZENvbnRleHQgPSBib3VuZGVkQ29udGV4dDtcbiAgICAgICAgIHRoaXMuX2JvdW5kZWRDb250ZXh0TmFtZSA9IGJvdW5kZWRDb250ZXh0TmFtZTtcbiAgICAgICAgIHRoaXMuX2JhY2tlbmQgPSBiYWNrZW5kO1xuICAgICAgICAgdGhpcy5faW50ZXJhY3Rpb24gPSBpbnRlcmFjdGlvbjtcbiAgICAgfVxuICAgICAvKipcbiAgICAgICogR2V0cyB0aGUgYXBwbGljYXRpb24gR1VJRFxuICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgR1VJRCBvZiB0aGUgQXBwbGljYXRpb25cbiAgICAgICovXG4gICAgIGdldCBhcHBsaWNhdGlvbigpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9hcHBsaWNhdGlvbjtcbiAgICAgfVxuICAgICAvKipcbiAgICAgICogR2V0cyB0aGUgYm91bmRlZCBjb250ZXh0IEdVSURcbiAgICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIEdVSUQgb2YgdGhlIGJvdW5kZWQgY29udGV4dFxuICAgICAgKi9cbiAgICAgZ2V0IGJvdW5kZWRDb250ZXh0KCkge1xuICAgICAgICAgcmV0dXJuIHRoaXMuX2JvdW5kZWRDb250ZXh0O1xuICAgICB9XG4gICAgIC8qKlxuICAgICAgKiBHZXRzIHRoZSBuYW1lIG9mIHRoZSBib3VuZGVkIGNvbnRleHRcbiAgICAgICogQHJldHVybnMge3N0cmluZ30gQm91bmRlZCBDb250ZXh0IG5hbWVcbiAgICAgICovXG4gICAgIGdldCBib3VuZGVkQ29udGV4dE5hbWUoKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fYm91bmRlZENvbnRleHROYW1lO1xuICAgICB9XG4gICAgIC8qKlxuICAgICAgKiBHZXRzIHRoZSBiYWNrZW5kIGNvbmZpZ3VyYXRpb24gXG4gICAgICAqIEByZXR1cm5zIHtCYWNrZW5kfVxuICAgICAgKi9cbiAgICAgZ2V0IGJhY2tlbmQoKSB7XG4gICAgICAgICByZXR1cm4gdGhpcy5fYmFja2VuZDtcbiAgICAgfVxuICAgICAvKipcbiAgICAgICogR2V0cyB0aGUgbGlzdCBpbnRlcmFjdGlvbiBsYXllcnNcbiAgICAgICogQHJldHVybnMge0ludGVyYWN0aW9uTGF5ZXJbXX1cbiAgICAgICovXG4gICAgIGdldCBpbnRlcmFjdGlvbigpIHtcbiAgICAgICAgIHJldHVybiB0aGlzLl9pbnRlcmFjdGlvbjtcbiAgICAgfVxuIH0iXX0=