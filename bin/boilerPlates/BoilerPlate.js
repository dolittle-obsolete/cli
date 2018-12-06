"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoilerPlate = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var _language = new WeakMap();
var _name = new WeakMap();
var _description = new WeakMap();
var _type = new WeakMap();
var _dependencies = new WeakMap();
var _location = new WeakMap();
var _pathsNeedingBinding = new WeakMap();
var _filesNeedingBinding = new WeakMap();

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
   * @param {any[]} dependencies
   * @param {string} location 
   * @param {string[]} [pathsNeedingBinding]
   * @param {string[]} [filesNeedingBinding]
   */
  function BoilerPlate(language, name, description, type, dependencies, location, pathsNeedingBinding, filesNeedingBinding) {
    (0, _classCallCheck3.default)(this, BoilerPlate);

    _language.set(this, language);
    _name.set(this, name);
    _description.set(this, description);
    _type.set(this, type);
    _dependencies.set(this, dependencies);
    _location.set(this, location);
    _pathsNeedingBinding.set(this, pathsNeedingBinding || []);
    _filesNeedingBinding.set(this, filesNeedingBinding || []);
  }

  /**
   * Get the name of the {BoilerPlate}
   * @returns {string} Name of {BoilerPlate}
   */


  (0, _createClass3.default)(BoilerPlate, [{
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
        dependencies: this.dependencies,
        location: this.location,
        pathsNeedingBinding: this.pathsNeedingBinding,
        filesNeedingBinding: this.filesNeedingBinding
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
     * Gets all the dependencies of the boilerplate
     * @returns {any[]} List of dependencies
     */

  }, {
    key: "dependencies",
    get: function get() {
      return _dependencies.get(this);
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

    /**
     * Get the paths that need binding - relative within the content of the location of the {BoilerPlate}
     * @returns {string[]} Paths
     */

  }, {
    key: "pathsNeedingBinding",
    get: function get() {
      return _pathsNeedingBinding.get(this);
    }

    /**
     * Gets the files that need binding - relative within the content of the location of the {BoilerPlate}
     * @returns {string[]} Files
     */

  }, {
    key: "filesNeedingBinding",
    get: function get() {
      return _filesNeedingBinding.get(this);
    }
  }]);
  return BoilerPlate;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGUuanMiXSwibmFtZXMiOlsiX2xhbmd1YWdlIiwiV2Vha01hcCIsIl9uYW1lIiwiX2Rlc2NyaXB0aW9uIiwiX3R5cGUiLCJfZGVwZW5kZW5jaWVzIiwiX2xvY2F0aW9uIiwiX3BhdGhzTmVlZGluZ0JpbmRpbmciLCJfZmlsZXNOZWVkaW5nQmluZGluZyIsIkJvaWxlclBsYXRlIiwibGFuZ3VhZ2UiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJ0eXBlIiwiZGVwZW5kZW5jaWVzIiwibG9jYXRpb24iLCJwYXRoc05lZWRpbmdCaW5kaW5nIiwiZmlsZXNOZWVkaW5nQmluZGluZyIsInNldCIsImdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFLQSxJQUFNQSxZQUFZLElBQUlDLE9BQUosRUFBbEI7QUFDQSxJQUFNQyxRQUFRLElBQUlELE9BQUosRUFBZDtBQUNBLElBQU1FLGVBQWUsSUFBSUYsT0FBSixFQUFyQjtBQUNBLElBQU1HLFFBQVEsSUFBSUgsT0FBSixFQUFkO0FBQ0EsSUFBTUksZ0JBQWdCLElBQUlKLE9BQUosRUFBdEI7QUFDQSxJQUFNSyxZQUFZLElBQUlMLE9BQUosRUFBbEI7QUFDQSxJQUFNTSx1QkFBdUIsSUFBSU4sT0FBSixFQUE3QjtBQUNBLElBQU1PLHVCQUF1QixJQUFJUCxPQUFKLEVBQTdCOztBQUVBOzs7O0lBR2FRLFcsV0FBQUEsVzs7QUFFVDs7Ozs7Ozs7Ozs7QUFXQSx1QkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFdBQTVCLEVBQXlDQyxJQUF6QyxFQUErQ0MsWUFBL0MsRUFBNkRDLFFBQTdELEVBQXVFQyxtQkFBdkUsRUFBNEZDLG1CQUE1RixFQUFpSDtBQUFBOztBQUM3R2pCLGNBQVVrQixHQUFWLENBQWMsSUFBZCxFQUFvQlIsUUFBcEI7QUFDQVIsVUFBTWdCLEdBQU4sQ0FBVSxJQUFWLEVBQWdCUCxJQUFoQjtBQUNBUixpQkFBYWUsR0FBYixDQUFpQixJQUFqQixFQUF1Qk4sV0FBdkI7QUFDQVIsVUFBTWMsR0FBTixDQUFVLElBQVYsRUFBZ0JMLElBQWhCO0FBQ0FSLGtCQUFjYSxHQUFkLENBQWtCLElBQWxCLEVBQXdCSixZQUF4QjtBQUNBUixjQUFVWSxHQUFWLENBQWMsSUFBZCxFQUFvQkgsUUFBcEI7QUFDQVIseUJBQXFCVyxHQUFyQixDQUF5QixJQUF6QixFQUErQkYsdUJBQXVCLEVBQXREO0FBQ0FSLHlCQUFxQlUsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JELHVCQUF1QixFQUF0RDtBQUNIOztBQUVEOzs7Ozs7Ozs7O0FBOENBOzs7OzZCQUlTO0FBQ0wsYUFBTztBQUNITixjQUFNLEtBQUtBLElBRFI7QUFFSEQsa0JBQVUsS0FBS0EsUUFGWjtBQUdIRSxxQkFBYSxLQUFLQSxXQUhmO0FBSUhDLGNBQU0sS0FBS0EsSUFKUjtBQUtIQyxzQkFBYyxLQUFLQSxZQUxoQjtBQU1IQyxrQkFBVSxLQUFLQSxRQU5aO0FBT0hDLDZCQUFxQixLQUFLQSxtQkFQdkI7QUFRSEMsNkJBQXFCLEtBQUtBO0FBUnZCLE9BQVA7QUFVSDs7O3dCQXpEVTtBQUFFLGFBQU9mLE1BQU1pQixHQUFOLENBQVUsSUFBVixDQUFQO0FBQXlCOztBQUV0Qzs7Ozs7Ozt3QkFJZTtBQUFFLGFBQU9uQixVQUFVbUIsR0FBVixDQUFjLElBQWQsQ0FBUDtBQUE2Qjs7QUFFOUM7Ozs7Ozs7d0JBSWtCO0FBQUUsYUFBT2hCLGFBQWFnQixHQUFiLENBQWlCLElBQWpCLENBQVA7QUFBZ0M7O0FBRXBEOzs7Ozs7O3dCQUlXO0FBQUUsYUFBT2YsTUFBTWUsR0FBTixDQUFVLElBQVYsQ0FBUDtBQUF5QjtBQUN0Qzs7Ozs7Ozt3QkFJbUI7QUFBRSxhQUFPZCxjQUFjYyxHQUFkLENBQWtCLElBQWxCLENBQVA7QUFBaUM7QUFDdEQ7Ozs7Ozs7d0JBSWU7QUFBRSxhQUFPYixVQUFVYSxHQUFWLENBQWMsSUFBZCxDQUFQO0FBQTZCOztBQUU5Qzs7Ozs7Ozt3QkFJMEI7QUFBQyxhQUFPWixxQkFBcUJZLEdBQXJCLENBQXlCLElBQXpCLENBQVA7QUFBd0M7O0FBRW5FOzs7Ozs7O3dCQUkwQjtBQUFDLGFBQU9YLHFCQUFxQlcsR0FBckIsQ0FBeUIsSUFBekIsQ0FBUDtBQUF3QyIsImZpbGUiOiJCb2lsZXJQbGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbmNvbnN0IF9sYW5ndWFnZSA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IF9uYW1lID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgX2Rlc2NyaXB0aW9uID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgX3R5cGUgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCBfZGVwZW5kZW5jaWVzID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgX2xvY2F0aW9uID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgX3BhdGhzTmVlZGluZ0JpbmRpbmcgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCBfZmlsZXNOZWVkaW5nQmluZGluZyA9IG5ldyBXZWFrTWFwKCk7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIGJvaWxlciBwbGF0ZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJvaWxlclBsYXRlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZX1cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9ncmFtbWluZyBsYW5ndWFnZSBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc2NyaXB0aW9uIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqIEBwYXJhbSB7YW55W119IGRlcGVuZGVuY2llc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gW3BhdGhzTmVlZGluZ0JpbmRpbmddXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBbZmlsZXNOZWVkaW5nQmluZGluZ11cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobGFuZ3VhZ2UsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlLCBkZXBlbmRlbmNpZXMsIGxvY2F0aW9uLCBwYXRoc05lZWRpbmdCaW5kaW5nLCBmaWxlc05lZWRpbmdCaW5kaW5nKSB7XHJcbiAgICAgICAgX2xhbmd1YWdlLnNldCh0aGlzLCBsYW5ndWFnZSk7XHJcbiAgICAgICAgX25hbWUuc2V0KHRoaXMsIG5hbWUpO1xyXG4gICAgICAgIF9kZXNjcmlwdGlvbi5zZXQodGhpcywgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIF90eXBlLnNldCh0aGlzLCB0eXBlKTtcclxuICAgICAgICBfZGVwZW5kZW5jaWVzLnNldCh0aGlzLCBkZXBlbmRlbmNpZXMpO1xyXG4gICAgICAgIF9sb2NhdGlvbi5zZXQodGhpcywgbG9jYXRpb24pO1xyXG4gICAgICAgIF9wYXRoc05lZWRpbmdCaW5kaW5nLnNldCh0aGlzLCBwYXRoc05lZWRpbmdCaW5kaW5nIHx8IFtdKTtcclxuICAgICAgICBfZmlsZXNOZWVkaW5nQmluZGluZy5zZXQodGhpcywgZmlsZXNOZWVkaW5nQmluZGluZyB8fCBbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIG5hbWUgb2YgdGhlIHtCb2lsZXJQbGF0ZX1cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IE5hbWUgb2Yge0JvaWxlclBsYXRlfVxyXG4gICAgICovXHJcbiAgICBnZXQgbmFtZSgpIHsgcmV0dXJuIF9uYW1lLmdldCh0aGlzKTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBsYW5ndWFnZSBvZiB0aGUge0JvaWxlclBsYXRlfVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gTGFuZ3VhZ2Ugb2YgdGhlIHtCb2lsZXJQbGF0ZX1cclxuICAgICAqL1xyXG4gICAgZ2V0IGxhbmd1YWdlKCkgeyByZXR1cm4gX2xhbmd1YWdlLmdldCh0aGlzKTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUge0JvaWxlclBsYXRlfVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gRGVzY3JpcHRpb24gb2YgdGhlIHtCb2lsZXJQbGF0ZX1cclxuICAgICAqL1xyXG4gICAgZ2V0IGRlc2NyaXB0aW9uKCkgeyByZXR1cm4gX2Rlc2NyaXB0aW9uLmdldCh0aGlzKTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSB0eXBlIG9mIHtCb2lsZXJQbGF0ZX1cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFR5cGUgb2Yge0JvaWxlclBsYXRlfVxyXG4gICAgICovXHJcbiAgICBnZXQgdHlwZSgpIHsgcmV0dXJuIF90eXBlLmdldCh0aGlzKTsgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGFsbCB0aGUgZGVwZW5kZW5jaWVzIG9mIHRoZSBib2lsZXJwbGF0ZVxyXG4gICAgICogQHJldHVybnMge2FueVtdfSBMaXN0IG9mIGRlcGVuZGVuY2llc1xyXG4gICAgICovXHJcbiAgICBnZXQgZGVwZW5kZW5jaWVzKCkgeyByZXR1cm4gX2RlcGVuZGVuY2llcy5nZXQodGhpcyk7IH1cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBsb2NhdGlvbiBvZiB0aGUge0JvaWxlclBsYXRlfVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gTG9jYXRpb24gb2Yge0JvaWxlclBsYXRlfVxyXG4gICAgICovXHJcbiAgICBnZXQgbG9jYXRpb24oKSB7IHJldHVybiBfbG9jYXRpb24uZ2V0KHRoaXMpOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHBhdGhzIHRoYXQgbmVlZCBiaW5kaW5nIC0gcmVsYXRpdmUgd2l0aGluIHRoZSBjb250ZW50IG9mIHRoZSBsb2NhdGlvbiBvZiB0aGUge0JvaWxlclBsYXRlfVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBQYXRoc1xyXG4gICAgICovXHJcbiAgICBnZXQgcGF0aHNOZWVkaW5nQmluZGluZygpIHtyZXR1cm4gX3BhdGhzTmVlZGluZ0JpbmRpbmcuZ2V0KHRoaXMpOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBmaWxlcyB0aGF0IG5lZWQgYmluZGluZyAtIHJlbGF0aXZlIHdpdGhpbiB0aGUgY29udGVudCBvZiB0aGUgbG9jYXRpb24gb2YgdGhlIHtCb2lsZXJQbGF0ZX1cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gRmlsZXNcclxuICAgICAqL1xyXG4gICAgZ2V0IGZpbGVzTmVlZGluZ0JpbmRpbmcoKSB7cmV0dXJuIF9maWxlc05lZWRpbmdCaW5kaW5nLmdldCh0aGlzKTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCB0byBhIEpTT04gb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7Kn0gT2JqZWN0IGxpdGVyYWxcclxuICAgICAqL1xyXG4gICAgdG9Kc29uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgbGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2UsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgICAgIGRlcGVuZGVuY2llczogdGhpcy5kZXBlbmRlbmNpZXMsXHJcbiAgICAgICAgICAgIGxvY2F0aW9uOiB0aGlzLmxvY2F0aW9uLFxyXG4gICAgICAgICAgICBwYXRoc05lZWRpbmdCaW5kaW5nOiB0aGlzLnBhdGhzTmVlZGluZ0JpbmRpbmcsXHJcbiAgICAgICAgICAgIGZpbGVzTmVlZGluZ0JpbmRpbmc6IHRoaXMuZmlsZXNOZWVkaW5nQmluZGluZ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0iXX0=