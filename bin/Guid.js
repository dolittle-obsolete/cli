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

/**
 * Represents a globally unique identifier
 */
var Guid = exports.Guid = function () {
  function Guid() {
    _classCallCheck(this, Guid);
  }

  _createClass(Guid, null, [{
    key: "create",


    /**
     * Create a new {Guid} as {string}
     * @returns {string} String representation of {Guid}
     */
    value: function create() {
      var S4 = function S4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
      };
      var guid = S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
      return guid;
    }
  }, {
    key: "empty",


    /**
     * Get the empty representation
     */
    get: function get() {
      return "00000000-0000-0000-0000-000000000000";
    }
  }]);

  return Guid;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9HdWlkLmpzIl0sIm5hbWVzIjpbIkd1aWQiLCJTNCIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0cmluZyIsImd1aWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFLQTs7O0lBR2FBLEksV0FBQUEsSTs7Ozs7Ozs7O0FBU1Q7Ozs7NkJBSWdCO0FBQ1osVUFBSUMsS0FBSyxTQUFMQSxFQUFLLEdBQU07QUFDWCxlQUFPLENBQUUsQ0FBQyxJQUFJQyxLQUFLQyxNQUFMLEVBQUwsSUFBc0IsT0FBdkIsR0FBa0MsQ0FBbkMsRUFBc0NDLFFBQXRDLENBQStDLEVBQS9DLEVBQW1EQyxTQUFuRCxDQUE2RCxDQUE3RCxDQUFQO0FBQ0gsT0FGRDtBQUdBLFVBQUlDLE9BQVFMLE9BQU9BLElBQVAsR0FBYyxHQUFkLEdBQW9CQSxJQUFwQixHQUEyQixHQUEzQixHQUFpQ0EsSUFBakMsR0FBd0MsR0FBeEMsR0FBOENBLElBQTlDLEdBQXFELEdBQXJELEdBQTJEQSxJQUEzRCxHQUFrRUEsSUFBbEUsR0FBeUVBLElBQXJGO0FBQ0EsYUFBT0ssSUFBUDtBQUNIOzs7OztBQWpCRDs7O3dCQUdtQjtBQUNmLGFBQU8sc0NBQVA7QUFDSCIsImZpbGUiOiJHdWlkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBnbG9iYWxseSB1bmlxdWUgaWRlbnRpZmllclxuICovXG5leHBvcnQgY2xhc3MgR3VpZCB7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGVtcHR5IHJlcHJlc2VudGF0aW9uXG4gICAgICovXG4gICAgc3RhdGljIGdldCBlbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIFwiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHtHdWlkfSBhcyB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB7R3VpZH1cbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlKCkge1xuICAgICAgICBsZXQgUzQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKCgoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCkgfCAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpO1xuICAgICAgICB9O1xuICAgICAgICBsZXQgZ3VpZCA9IChTNCgpICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFM0KCkgKyBTNCgpKTtcbiAgICAgICAgcmV0dXJuIGd1aWQ7XG4gICAgfVxufVxuIl19