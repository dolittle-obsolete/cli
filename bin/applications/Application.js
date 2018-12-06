"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Application = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
     * @param {string} name Name of application
     */
    function Application(id, name) {
        (0, _classCallCheck3.default)(this, Application);

        _id.set(this, id);
        _name.set(this, name);
    }

    /**
     * Gets the unique identifier for the application
     * @returns {string} Global unique identifier
     */


    (0, _createClass3.default)(Application, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvQXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiX2lkIiwiV2Vha01hcCIsIl9uYW1lIiwiQXBwbGljYXRpb24iLCJpZCIsIm5hbWUiLCJzZXQiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBS0EsSUFBTUEsTUFBTSxJQUFJQyxPQUFKLEVBQVo7QUFDQSxJQUFNQyxRQUFRLElBQUlELE9BQUosRUFBZDs7QUFFQTs7OztJQUdhRSxXLFdBQUFBLFc7O0FBRVQ7Ozs7O0FBS0EseUJBQVlDLEVBQVosRUFBZ0JDLElBQWhCLEVBQXNCO0FBQUE7O0FBQ2xCTCxZQUFJTSxHQUFKLENBQVEsSUFBUixFQUFjRixFQUFkO0FBQ0FGLGNBQU1JLEdBQU4sQ0FBVSxJQUFWLEVBQWdCRCxJQUFoQjtBQUNIOztBQUVEOzs7Ozs7Ozs0QkFJUztBQUNMLG1CQUFPTCxJQUFJTyxHQUFKLENBQVEsSUFBUixDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7NEJBSVc7QUFDUCxtQkFBT0wsTUFBTUssR0FBTixDQUFVLElBQVYsQ0FBUDtBQUNIIiwiZmlsZSI6IkFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuY29uc3QgX2lkID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgX25hbWUgPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIGRlZmluaXRpb24gb2YgYW4gYXBwbGljYXRpb25cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7QXBwbGljYXRpb259XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgVW5pcXVlIGlkZW50aWZpZXIgZm9yIGFwcGxpY2F0aW9uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBOYW1lIG9mIGFwcGxpY2F0aW9uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlkLCBuYW1lKSB7XHJcbiAgICAgICAgX2lkLnNldCh0aGlzLCBpZCk7XHJcbiAgICAgICAgX25hbWUuc2V0KHRoaXMsIG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBhcHBsaWNhdGlvblxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gR2xvYmFsIHVuaXF1ZSBpZGVudGlmaWVyXHJcbiAgICAgKi9cclxuICAgIGdldCBpZCgpIHtcclxuICAgICAgICByZXR1cm4gX2lkLmdldCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG5hbWUgb2YgdGhlIGFwcGxpY2F0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBOYW1lIG9mIHRoZSBhcHBsaWNhdGlvblxyXG4gICAgICovXHJcbiAgICBnZXQgbmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gX25hbWUuZ2V0KHRoaXMpO1xyXG4gICAgfVxyXG59Il19