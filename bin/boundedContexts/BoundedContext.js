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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHQuanMiXSwibmFtZXMiOlsiQm91bmRlZENvbnRleHQiLCJhcHBsaWNhdGlvbiIsImJvdW5kZWRDb250ZXh0IiwiYm91bmRlZENvbnRleHROYW1lIiwiY29yZSIsImludGVyYWN0aW9uIiwiX2FwcGxpY2F0aW9uIiwiX2JvdW5kZWRDb250ZXh0IiwiX2JvdW5kZWRDb250ZXh0TmFtZSIsIl9jb3JlIiwiX2ludGVyYWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFNQTs7QUFDQTs7OztBQUNBOztBQUVBOzs7QUFWQTs7Ozs7QUFLQTtJQVFhQSxjLFdBQUFBLGM7QUFFVDs7Ozs7Ozs7QUFRQSwwQkFBYUMsV0FBYixFQUEwQkMsY0FBMUIsRUFBMENDLGtCQUExQyxFQUE4REMsSUFBOUQsRUFBb0VDLFdBQXBFLEVBQWlGO0FBQUE7O0FBQzdFLFNBQUtDLFlBQUwsR0FBb0JMLFdBQXBCO0FBQ0EsU0FBS00sZUFBTCxHQUF1QkwsY0FBdkI7QUFDQSxTQUFLTSxtQkFBTCxHQUEyQkwsa0JBQTNCO0FBQ0EsU0FBS00sS0FBTCxHQUFhTCxJQUFiO0FBQ0EsU0FBS00sWUFBTCxHQUFvQkwsV0FBcEI7QUFDSDtBQUNEOzs7Ozs7Ozt3QkFJa0I7QUFDZCxhQUFPLEtBQUtDLFlBQVo7QUFDSDtBQUNEOzs7Ozs7O3dCQUlxQjtBQUNqQixhQUFPLEtBQUtDLGVBQVo7QUFDSDtBQUNEOzs7Ozs7O3dCQUl5QjtBQUNyQixhQUFPLEtBQUtDLG1CQUFaO0FBQ0g7QUFDRDs7Ozs7Ozt3QkFJVztBQUNQLGFBQU8sS0FBS0MsS0FBWjtBQUNIO0FBQ0Q7Ozs7Ozs7d0JBSWtCO0FBQ2QsYUFBTyxLQUFLQyxZQUFaO0FBQ0giLCJmaWxlIjoiQm91bmRlZENvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4qICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4qICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5pbXBvcnQgeyBDb3JlIH0gZnJvbSAnLi9Db3JlJztcclxuaW1wb3J0IHsgSW50ZXJhY3Rpb25MYXllciB9IGZyb20gJy4vSW50ZXJhY3Rpb25MYXllcic7XHJcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbi8qKlxyXG4gICogUmVwcmVzZW50cyBhIEJvdW5kZWQgQ29udGV4dFxyXG4gICovXHJcbmV4cG9ydCBjbGFzcyBCb3VuZGVkQ29udGV4dFxyXG57XHJcbiAgICAvKipcclxuICAgICAgKiBJbnN0YW50aWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQm91bmRlZENvbnRleHRcclxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXBwbGljYXRpb24gXHJcbiAgICAgICogQHBhcmFtIHtzdHJpbmd9IGJvdW5kZWRDb250ZXh0IFxyXG4gICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib3VuZGVkQ29udGV4dE5hbWUgXHJcbiAgICAgICogQHBhcmFtIHtDb3JlfSBjb3JlIFxyXG4gICAgICAqIEBwYXJhbSB7SW50ZXJhY3Rpb25MYXllcltdfSBpbnRlcmFjdGlvbiBcclxuICAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yIChhcHBsaWNhdGlvbiwgYm91bmRlZENvbnRleHQsIGJvdW5kZWRDb250ZXh0TmFtZSwgY29yZSwgaW50ZXJhY3Rpb24pIHtcclxuICAgICAgICB0aGlzLl9hcHBsaWNhdGlvbiA9IGFwcGxpY2F0aW9uO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kZWRDb250ZXh0ID0gYm91bmRlZENvbnRleHQ7XHJcbiAgICAgICAgdGhpcy5fYm91bmRlZENvbnRleHROYW1lID0gYm91bmRlZENvbnRleHROYW1lO1xyXG4gICAgICAgIHRoaXMuX2NvcmUgPSBjb3JlO1xyXG4gICAgICAgIHRoaXMuX2ludGVyYWN0aW9uID0gaW50ZXJhY3Rpb247XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAgKiBHZXRzIHRoZSBhcHBsaWNhdGlvbiBHVUlEXHJcbiAgICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIEdVSUQgb2YgdGhlIEFwcGxpY2F0aW9uXHJcbiAgICAgICovXHJcbiAgICBnZXQgYXBwbGljYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGxpY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgICogR2V0cyB0aGUgYm91bmRlZCBjb250ZXh0IEdVSURcclxuICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgR1VJRCBvZiB0aGUgYm91bmRlZCBjb250ZXh0XHJcbiAgICAgICovXHJcbiAgICBnZXQgYm91bmRlZENvbnRleHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvdW5kZWRDb250ZXh0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgICogR2V0cyB0aGUgbmFtZSBvZiB0aGUgYm91bmRlZCBjb250ZXh0XHJcbiAgICAgICogQHJldHVybnMge3N0cmluZ30gQm91bmRlZCBDb250ZXh0IG5hbWVcclxuICAgICAgKi9cclxuICAgIGdldCBib3VuZGVkQ29udGV4dE5hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvdW5kZWRDb250ZXh0TmFtZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICAqIEdldHMgdGhlIGNvcmUgY29uZmlndXJhdGlvbiBcclxuICAgICAgKiBAcmV0dXJucyB7Q29yZX1cclxuICAgICAgKi9cclxuICAgIGdldCBjb3JlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb3JlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgICogR2V0cyB0aGUgbGlzdCBpbnRlcmFjdGlvbiBsYXllcnNcclxuICAgICAgKiBAcmV0dXJucyB7SW50ZXJhY3Rpb25MYXllcltdfVxyXG4gICAgICAqL1xyXG4gICAgZ2V0IGludGVyYWN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRlcmFjdGlvbjtcclxuICAgIH1cclxufSJdfQ==