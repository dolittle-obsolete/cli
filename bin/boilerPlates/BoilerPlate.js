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
var _language = new WeakMap();
var _name = new WeakMap();
var _description = new WeakMap();
var _type = new WeakMap();
var _location = new WeakMap();

/**
 * Represents a boiler plate
 */

var BoilerPlate = exports.BoilerPlate = function () {

  /**
   * Initializes a new instance of {BoilerPlate}
   * @param {string} programming language 
   * @param {string} name 
   * @param {string} description 
   * @param {string} type
   * @param {string} location 
   */
  function BoilerPlate(language, name, description, type, location) {
    _classCallCheck(this, BoilerPlate);

    _language.set(this, language);
    _name.set(this, name);
    _description.set(this, description);
    _type.set(this, type);
    _location.set(this, location);
  }

  /**
   * Get the name of the {BoilerPlate}
   * @returns {string} Name of {BoilerPlate}
   */


  _createClass(BoilerPlate, [{
    key: "toJson",


    /**
     * Convert to a JSON object
     * @returns {*} Object literal
     */
    value: function toJson() {
      return {
        name: this.name,
        language: this.language,
        description: this.description,
        type: this.type,
        location: this.location
      };
    }
  }, {
    key: "name",
    get: function get() {
      return _name.get(this);
    }

    /**
     * Get the language of the {BoilerPlate}
     * @returns {string} Language of the {BoilerPlate}
     */

  }, {
    key: "language",
    get: function get() {
      return _language.get(this);
    }

    /**
     * Get the description of the {BoilerPlate}
     * @returns {string} Description of the {BoilerPlate}
     */

  }, {
    key: "description",
    get: function get() {
      return _description.get(this);
    }

    /**
     * Get the type of {BoilerPlate}
     * @returns {string} Type of {BoilerPlate}
     */

  }, {
    key: "type",
    get: function get() {
      return _type.get(this);
    }

    /**
     * Get the location of the {BoilerPlate}
     * @returns {string} Location of {BoilerPlate}
     */

  }, {
    key: "location",
    get: function get() {
      return _location.get(this);
    }
  }]);

  return BoilerPlate;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGUuanMiXSwibmFtZXMiOlsiX2xhbmd1YWdlIiwiV2Vha01hcCIsIl9uYW1lIiwiX2Rlc2NyaXB0aW9uIiwiX3R5cGUiLCJfbG9jYXRpb24iLCJCb2lsZXJQbGF0ZSIsImxhbmd1YWdlIiwibmFtZSIsImRlc2NyaXB0aW9uIiwidHlwZSIsImxvY2F0aW9uIiwic2V0IiwiZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFJQSxJQUFNQSxZQUFZLElBQUlDLE9BQUosRUFBbEI7QUFDQSxJQUFNQyxRQUFRLElBQUlELE9BQUosRUFBZDtBQUNBLElBQU1FLGVBQWUsSUFBSUYsT0FBSixFQUFyQjtBQUNBLElBQU1HLFFBQVEsSUFBSUgsT0FBSixFQUFkO0FBQ0EsSUFBTUksWUFBWSxJQUFJSixPQUFKLEVBQWxCOztBQUVBOzs7O0lBR2FLLFcsV0FBQUEsVzs7QUFFVDs7Ozs7Ozs7QUFRQSx1QkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFdBQTVCLEVBQXlDQyxJQUF6QyxFQUErQ0MsUUFBL0MsRUFBeUQ7QUFBQTs7QUFDckRYLGNBQVVZLEdBQVYsQ0FBYyxJQUFkLEVBQW9CTCxRQUFwQjtBQUNBTCxVQUFNVSxHQUFOLENBQVUsSUFBVixFQUFnQkosSUFBaEI7QUFDQUwsaUJBQWFTLEdBQWIsQ0FBaUIsSUFBakIsRUFBdUJILFdBQXZCO0FBQ0FMLFVBQU1RLEdBQU4sQ0FBVSxJQUFWLEVBQWdCRixJQUFoQjtBQUNBTCxjQUFVTyxHQUFWLENBQWMsSUFBZCxFQUFvQkQsUUFBcEI7QUFDSDs7QUFFRDs7Ozs7Ozs7OztBQThCQTs7Ozs2QkFJUztBQUNMLGFBQU87QUFDSEgsY0FBTSxLQUFLQSxJQURSO0FBRUhELGtCQUFVLEtBQUtBLFFBRlo7QUFHSEUscUJBQWEsS0FBS0EsV0FIZjtBQUlIQyxjQUFNLEtBQUtBLElBSlI7QUFLSEMsa0JBQVUsS0FBS0E7QUFMWixPQUFQO0FBT0g7Ozt3QkF0Q1U7QUFBRSxhQUFPVCxNQUFNVyxHQUFOLENBQVUsSUFBVixDQUFQO0FBQXlCOztBQUV0Qzs7Ozs7Ozt3QkFJZTtBQUFFLGFBQU9iLFVBQVVhLEdBQVYsQ0FBYyxJQUFkLENBQVA7QUFBNkI7O0FBRTlDOzs7Ozs7O3dCQUlrQjtBQUFFLGFBQU9WLGFBQWFVLEdBQWIsQ0FBaUIsSUFBakIsQ0FBUDtBQUFnQzs7QUFFcEQ7Ozs7Ozs7d0JBSVc7QUFBRSxhQUFPVCxNQUFNUyxHQUFOLENBQVUsSUFBVixDQUFQO0FBQXlCOztBQUV0Qzs7Ozs7Ozt3QkFJZTtBQUFFLGFBQU9SLFVBQVVRLEdBQVYsQ0FBYyxJQUFkLENBQVA7QUFBNkIiLCJmaWxlIjoiQm9pbGVyUGxhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5jb25zdCBfbGFuZ3VhZ2UgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX25hbWUgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2Rlc2NyaXB0aW9uID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF90eXBlID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9sb2NhdGlvbiA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGJvaWxlciBwbGF0ZVxuICovXG5leHBvcnQgY2xhc3MgQm9pbGVyUGxhdGUge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0JvaWxlclBsYXRlfVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9ncmFtbWluZyBsYW5ndWFnZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzY3JpcHRpb24gXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobGFuZ3VhZ2UsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlLCBsb2NhdGlvbikge1xuICAgICAgICBfbGFuZ3VhZ2Uuc2V0KHRoaXMsIGxhbmd1YWdlKTtcbiAgICAgICAgX25hbWUuc2V0KHRoaXMsIG5hbWUpO1xuICAgICAgICBfZGVzY3JpcHRpb24uc2V0KHRoaXMsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgX3R5cGUuc2V0KHRoaXMsIHR5cGUpO1xuICAgICAgICBfbG9jYXRpb24uc2V0KHRoaXMsIGxvY2F0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5hbWUgb2YgdGhlIHtCb2lsZXJQbGF0ZX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBOYW1lIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHsgcmV0dXJuIF9uYW1lLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsYW5ndWFnZSBvZiB0aGUge0JvaWxlclBsYXRlfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IExhbmd1YWdlIG9mIHRoZSB7Qm9pbGVyUGxhdGV9XG4gICAgICovXG4gICAgZ2V0IGxhbmd1YWdlKCkgeyByZXR1cm4gX2xhbmd1YWdlLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUge0JvaWxlclBsYXRlfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IERlc2NyaXB0aW9uIG9mIHRoZSB7Qm9pbGVyUGxhdGV9XG4gICAgICovXG4gICAgZ2V0IGRlc2NyaXB0aW9uKCkgeyByZXR1cm4gX2Rlc2NyaXB0aW9uLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0eXBlIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUeXBlIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKi9cbiAgICBnZXQgdHlwZSgpIHsgcmV0dXJuIF90eXBlLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsb2NhdGlvbiBvZiB0aGUge0JvaWxlclBsYXRlfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IExvY2F0aW9uIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKi9cbiAgICBnZXQgbG9jYXRpb24oKSB7IHJldHVybiBfbG9jYXRpb24uZ2V0KHRoaXMpOyB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IHRvIGEgSlNPTiBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7Kn0gT2JqZWN0IGxpdGVyYWxcbiAgICAgKi9cbiAgICB0b0pzb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICBsYW5ndWFnZTogdGhpcy5sYW5ndWFnZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICAgICAgbG9jYXRpb246IHRoaXMubG9jYXRpb25cbiAgICAgICAgfVxuICAgIH1cbn0iXX0=