'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoundedContext = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Backend = require('./Backend');

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
      * Gets the backend configuration 
      * @returns {Backend}
      */

  }, {
    key: 'backend',
    get: function get() {
      return this._backend;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvQm91bmRlZENvbnRleHQuanMiXSwibmFtZXMiOlsiQm91bmRlZENvbnRleHQiLCJhcHBsaWNhdGlvbiIsImJvdW5kZWRDb250ZXh0IiwiYm91bmRlZENvbnRleHROYW1lIiwiYmFja2VuZCIsImludGVyYWN0aW9uIiwiX2FwcGxpY2F0aW9uIiwiX2JvdW5kZWRDb250ZXh0IiwiX2JvdW5kZWRDb250ZXh0TmFtZSIsIl9iYWNrZW5kIiwiX2ludGVyYWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFNQTs7QUFDQTs7OztBQUNBOztBQUVBOzs7QUFWQTs7Ozs7QUFLQTtJQVFhQSxjLFdBQUFBLGM7QUFFVDs7Ozs7Ozs7QUFRQSwwQkFBYUMsV0FBYixFQUEwQkMsY0FBMUIsRUFBMENDLGtCQUExQyxFQUE4REMsT0FBOUQsRUFBdUVDLFdBQXZFLEVBQW9GO0FBQUE7O0FBQ2hGLFNBQUtDLFlBQUwsR0FBb0JMLFdBQXBCO0FBQ0EsU0FBS00sZUFBTCxHQUF1QkwsY0FBdkI7QUFDQSxTQUFLTSxtQkFBTCxHQUEyQkwsa0JBQTNCO0FBQ0EsU0FBS00sUUFBTCxHQUFnQkwsT0FBaEI7QUFDQSxTQUFLTSxZQUFMLEdBQW9CTCxXQUFwQjtBQUNIO0FBQ0Q7Ozs7Ozs7O3dCQUlrQjtBQUNkLGFBQU8sS0FBS0MsWUFBWjtBQUNIO0FBQ0Q7Ozs7Ozs7d0JBSXFCO0FBQ2pCLGFBQU8sS0FBS0MsZUFBWjtBQUNIO0FBQ0Q7Ozs7Ozs7d0JBSXlCO0FBQ3JCLGFBQU8sS0FBS0MsbUJBQVo7QUFDSDtBQUNEOzs7Ozs7O3dCQUljO0FBQ1YsYUFBTyxLQUFLQyxRQUFaO0FBQ0g7QUFDRDs7Ozs7Ozt3QkFJa0I7QUFDZCxhQUFPLEtBQUtDLFlBQVo7QUFDSCIsImZpbGUiOiJCb3VuZGVkQ29udGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IEJhY2tlbmQgfSBmcm9tICcuL0JhY2tlbmQnO1xuaW1wb3J0IHsgSW50ZXJhY3Rpb25MYXllciB9IGZyb20gJy4vSW50ZXJhY3Rpb25MYXllcic7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKlxuICAqIFJlcHJlc2VudHMgYSBCb3VuZGVkIENvbnRleHRcbiAgKi9cbmV4cG9ydCBjbGFzcyBCb3VuZGVkQ29udGV4dFxue1xuICAgIC8qKlxuICAgICAgKiBJbnN0YW50aWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQm91bmRlZENvbnRleHRcbiAgICAgICogQHBhcmFtIHtzdHJpbmd9IGFwcGxpY2F0aW9uIFxuICAgICAgKiBAcGFyYW0ge3N0cmluZ30gYm91bmRlZENvbnRleHQgXG4gICAgICAqIEBwYXJhbSB7c3RyaW5nfSBib3VuZGVkQ29udGV4dE5hbWUgXG4gICAgICAqIEBwYXJhbSB7QmFja2VuZH0gYmFja2VuZCBcbiAgICAgICogQHBhcmFtIHtJbnRlcmFjdGlvbkxheWVyW119IGludGVyYWN0aW9uIFxuICAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAoYXBwbGljYXRpb24sIGJvdW5kZWRDb250ZXh0LCBib3VuZGVkQ29udGV4dE5hbWUsIGJhY2tlbmQsIGludGVyYWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX2FwcGxpY2F0aW9uID0gYXBwbGljYXRpb247XG4gICAgICAgIHRoaXMuX2JvdW5kZWRDb250ZXh0ID0gYm91bmRlZENvbnRleHQ7XG4gICAgICAgIHRoaXMuX2JvdW5kZWRDb250ZXh0TmFtZSA9IGJvdW5kZWRDb250ZXh0TmFtZTtcbiAgICAgICAgdGhpcy5fYmFja2VuZCA9IGJhY2tlbmQ7XG4gICAgICAgIHRoaXMuX2ludGVyYWN0aW9uID0gaW50ZXJhY3Rpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAgKiBHZXRzIHRoZSBhcHBsaWNhdGlvbiBHVUlEXG4gICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBHVUlEIG9mIHRoZSBBcHBsaWNhdGlvblxuICAgICAgKi9cbiAgICBnZXQgYXBwbGljYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBsaWNhdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICAqIEdldHMgdGhlIGJvdW5kZWQgY29udGV4dCBHVUlEXG4gICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBHVUlEIG9mIHRoZSBib3VuZGVkIGNvbnRleHRcbiAgICAgICovXG4gICAgZ2V0IGJvdW5kZWRDb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm91bmRlZENvbnRleHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAgKiBHZXRzIHRoZSBuYW1lIG9mIHRoZSBib3VuZGVkIGNvbnRleHRcbiAgICAgICogQHJldHVybnMge3N0cmluZ30gQm91bmRlZCBDb250ZXh0IG5hbWVcbiAgICAgICovXG4gICAgZ2V0IGJvdW5kZWRDb250ZXh0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvdW5kZWRDb250ZXh0TmFtZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICAqIEdldHMgdGhlIGJhY2tlbmQgY29uZmlndXJhdGlvbiBcbiAgICAgICogQHJldHVybnMge0JhY2tlbmR9XG4gICAgICAqL1xuICAgIGdldCBiYWNrZW5kKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmFja2VuZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICAqIEdldHMgdGhlIGxpc3QgaW50ZXJhY3Rpb24gbGF5ZXJzXG4gICAgICAqIEByZXR1cm5zIHtJbnRlcmFjdGlvbkxheWVyW119XG4gICAgICAqL1xuICAgIGdldCBpbnRlcmFjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVyYWN0aW9uO1xuICAgIH1cbn0iXX0=