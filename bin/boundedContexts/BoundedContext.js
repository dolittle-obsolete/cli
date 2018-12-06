'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoundedContext = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Core = require('./Core');

var _InteractionLayer = require('./InteractionLayer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable no-unused-vars */

/**
  * Represents a Bounded Context
  */
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Dolittle. All rights reserved.
*  Licensed under the MIT License. See LICENSE in the project root for license information.
*--------------------------------------------------------------------------------------------*/

/* eslint-disable no-unused-vars */
var BoundedContext = exports.BoundedContext = function () {
  /**
    * Instantiates an instance of BoundedContext
    * @param {string} application 
    * @param {string} boundedContext 
    * @param {string} boundedContextName 
    * @param {Core} core 
    * @param {InteractionLayer[]} interaction 
    */
  function BoundedContext(application, boundedContext, boundedContextName, core, interaction) {
    (0, _classCallCheck3.default)(this, BoundedContext);

    this._application = application;
    this._boundedContext = boundedContext;
    this._boundedContextName = boundedContextName;
    this._core = core;
    this._interaction = interaction;
  }
  /**
    * Gets the application GUID
    * @returns {string} The GUID of the Application
    */


  (0, _createClass3.default)(BoundedContext, [{
    key: 'application',
    get: function get() {
      return this._application;
    }
    /**
      * Gets the bounded context GUID
      * @returns {string} The GUID of the bounded context
      */

  }, {
    key: 'boundedContext',
    get: function get() {
      return this._boundedContext;
    }
    /**
      * Gets the name of the bounded context
      * @returns {string} Bounded Context name
      */

  }, {
    key: 'boundedContextName',
    get: function get() {
      return this._boundedContextName;
    }
    /**
      * Gets the core configuration 
      * @returns {Core}
      */

  }, {
    key: 'core',
    get: function get() {
      return this._core;
    }
    /**
      * Gets the list interaction layers
      * @returns {InteractionLayer[]}
      */

  }, {
    key: 'interaction',
    get: function get() {
      return this._interaction;
    }
  }]);
  return BoundedContext;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHQuanMiXSwibmFtZXMiOlsiQm91bmRlZENvbnRleHQiLCJhcHBsaWNhdGlvbiIsImJvdW5kZWRDb250ZXh0IiwiYm91bmRlZENvbnRleHROYW1lIiwiY29yZSIsImludGVyYWN0aW9uIiwiX2FwcGxpY2F0aW9uIiwiX2JvdW5kZWRDb250ZXh0IiwiX2JvdW5kZWRDb250ZXh0TmFtZSIsIl9jb3JlIiwiX2ludGVyYWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFNQTs7QUFDQTs7OztBQUNBOztBQUVBOzs7QUFWQTs7Ozs7QUFLQTtJQVFhQSxjLFdBQUFBLGM7QUFFVDs7Ozs7Ozs7QUFRQSwwQkFBYUMsV0FBYixFQUEwQkMsY0FBMUIsRUFBMENDLGtCQUExQyxFQUE4REMsSUFBOUQsRUFBb0VDLFdBQXBFLEVBQWlGO0FBQUE7O0FBQzdFLFNBQUtDLFlBQUwsR0FBb0JMLFdBQXBCO0FBQ0EsU0FBS00sZUFBTCxHQUF1QkwsY0FBdkI7QUFDQSxTQUFLTSxtQkFBTCxHQUEyQkwsa0JBQTNCO0FBQ0EsU0FBS00sS0FBTCxHQUFhTCxJQUFiO0FBQ0EsU0FBS00sWUFBTCxHQUFvQkwsV0FBcEI7QUFDSDtBQUNEOzs7Ozs7Ozt3QkFJa0I7QUFDZCxhQUFPLEtBQUtDLFlBQVo7QUFDSDtBQUNEOzs7Ozs7O3dCQUlxQjtBQUNqQixhQUFPLEtBQUtDLGVBQVo7QUFDSDtBQUNEOzs7Ozs7O3dCQUl5QjtBQUNyQixhQUFPLEtBQUtDLG1CQUFaO0FBQ0g7QUFDRDs7Ozs7Ozt3QkFJVztBQUNQLGFBQU8sS0FBS0MsS0FBWjtBQUNIO0FBQ0Q7Ozs7Ozs7d0JBSWtCO0FBQ2QsYUFBTyxLQUFLQyxZQUFaO0FBQ0giLCJmaWxlIjoiQm91bmRlZENvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBDb3JlIH0gZnJvbSAnLi9Db3JlJztcbmltcG9ydCB7IEludGVyYWN0aW9uTGF5ZXIgfSBmcm9tICcuL0ludGVyYWN0aW9uTGF5ZXInO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4vKipcbiAgKiBSZXByZXNlbnRzIGEgQm91bmRlZCBDb250ZXh0XG4gICovXG5leHBvcnQgY2xhc3MgQm91bmRlZENvbnRleHRcbntcbiAgICAvKipcbiAgICAgICogSW5zdGFudGlhdGVzIGFuIGluc3RhbmNlIG9mIEJvdW5kZWRDb250ZXh0XG4gICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhcHBsaWNhdGlvbiBcbiAgICAgICogQHBhcmFtIHtzdHJpbmd9IGJvdW5kZWRDb250ZXh0IFxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm91bmRlZENvbnRleHROYW1lIFxuICAgICAgKiBAcGFyYW0ge0NvcmV9IGNvcmUgXG4gICAgICAqIEBwYXJhbSB7SW50ZXJhY3Rpb25MYXllcltdfSBpbnRlcmFjdGlvbiBcbiAgICAgICovXG4gICAgY29uc3RydWN0b3IgKGFwcGxpY2F0aW9uLCBib3VuZGVkQ29udGV4dCwgYm91bmRlZENvbnRleHROYW1lLCBjb3JlLCBpbnRlcmFjdGlvbikge1xuICAgICAgICB0aGlzLl9hcHBsaWNhdGlvbiA9IGFwcGxpY2F0aW9uO1xuICAgICAgICB0aGlzLl9ib3VuZGVkQ29udGV4dCA9IGJvdW5kZWRDb250ZXh0O1xuICAgICAgICB0aGlzLl9ib3VuZGVkQ29udGV4dE5hbWUgPSBib3VuZGVkQ29udGV4dE5hbWU7XG4gICAgICAgIHRoaXMuX2NvcmUgPSBjb3JlO1xuICAgICAgICB0aGlzLl9pbnRlcmFjdGlvbiA9IGludGVyYWN0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgICogR2V0cyB0aGUgYXBwbGljYXRpb24gR1VJRFxuICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgR1VJRCBvZiB0aGUgQXBwbGljYXRpb25cbiAgICAgICovXG4gICAgZ2V0IGFwcGxpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXBwbGljYXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAgKiBHZXRzIHRoZSBib3VuZGVkIGNvbnRleHQgR1VJRFxuICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgR1VJRCBvZiB0aGUgYm91bmRlZCBjb250ZXh0XG4gICAgICAqL1xuICAgIGdldCBib3VuZGVkQ29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvdW5kZWRDb250ZXh0O1xuICAgIH1cbiAgICAvKipcbiAgICAgICogR2V0cyB0aGUgbmFtZSBvZiB0aGUgYm91bmRlZCBjb250ZXh0XG4gICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEJvdW5kZWQgQ29udGV4dCBuYW1lXG4gICAgICAqL1xuICAgIGdldCBib3VuZGVkQ29udGV4dE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib3VuZGVkQ29udGV4dE5hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAgKiBHZXRzIHRoZSBjb3JlIGNvbmZpZ3VyYXRpb24gXG4gICAgICAqIEByZXR1cm5zIHtDb3JlfVxuICAgICAgKi9cbiAgICBnZXQgY29yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvcmU7XG4gICAgfVxuICAgIC8qKlxuICAgICAgKiBHZXRzIHRoZSBsaXN0IGludGVyYWN0aW9uIGxheWVyc1xuICAgICAgKiBAcmV0dXJucyB7SW50ZXJhY3Rpb25MYXllcltdfVxuICAgICAgKi9cbiAgICBnZXQgaW50ZXJhY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRlcmFjdGlvbjtcbiAgICB9XG59Il19