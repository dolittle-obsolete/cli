"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    _classCallCheck(this, Application);

    _id.set(this, id);
    _name.set(this, name);
  }

  /**
   * Gets the unique identifier for the application
   * @returns {string} Global unique identifier
   */


  _createClass(Application, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiX2lkIiwiV2Vha01hcCIsIl9uYW1lIiwiQXBwbGljYXRpb24iLCJpZCIsIm5hbWUiLCJzZXQiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFLQSxJQUFNQSxNQUFNLElBQUlDLE9BQUosRUFBWjtBQUNBLElBQU1DLFFBQVEsSUFBSUQsT0FBSixFQUFkOztBQUVBOzs7O0lBR2FFLFcsV0FBQUEsVzs7QUFFVDs7Ozs7QUFLQSx1QkFBWUMsRUFBWixFQUFnQkMsSUFBaEIsRUFBc0I7QUFBQTs7QUFDbEJMLFFBQUlNLEdBQUosQ0FBUSxJQUFSLEVBQWNGLEVBQWQ7QUFDQUYsVUFBTUksR0FBTixDQUFVLElBQVYsRUFBZ0JELElBQWhCO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3dCQUlTO0FBQ0wsYUFBT0wsSUFBSU8sR0FBSixDQUFRLElBQVIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7O3dCQUlXO0FBQ1AsYUFBT0wsTUFBTUssR0FBTixDQUFVLElBQVYsQ0FBUDtBQUNIIiwiZmlsZSI6IkFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5jb25zdCBfaWQgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX25hbWUgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGRlZmluaXRpb24gb2YgYW4gYXBwbGljYXRpb25cbiAqL1xuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtBcHBsaWNhdGlvbn1cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgVW5pcXVlIGlkZW50aWZpZXIgZm9yIGFwcGxpY2F0aW9uXG4gICAgICogQHBhcmFtIHtzdGlybmd9IG5hbWUgTmFtZSBvZiBhcHBsaWNhdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlkLCBuYW1lKSB7XG4gICAgICAgIF9pZC5zZXQodGhpcywgaWQpO1xuICAgICAgICBfbmFtZS5zZXQodGhpcywgbmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBhcHBsaWNhdGlvblxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEdsb2JhbCB1bmlxdWUgaWRlbnRpZmllclxuICAgICAqL1xuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIF9pZC5nZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbmFtZSBvZiB0aGUgYXBwbGljYXRpb25cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBOYW1lIG9mIHRoZSBhcHBsaWNhdGlvblxuICAgICAqL1xuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gX25hbWUuZ2V0KHRoaXMpO1xuICAgIH1cbn0iXX0=