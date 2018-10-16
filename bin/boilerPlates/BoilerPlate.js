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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGUuanMiXSwibmFtZXMiOlsiX2xhbmd1YWdlIiwiV2Vha01hcCIsIl9uYW1lIiwiX2Rlc2NyaXB0aW9uIiwiX3R5cGUiLCJfZGVwZW5kZW5jaWVzIiwiX2xvY2F0aW9uIiwiX3BhdGhzTmVlZGluZ0JpbmRpbmciLCJfZmlsZXNOZWVkaW5nQmluZGluZyIsIkJvaWxlclBsYXRlIiwibGFuZ3VhZ2UiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJ0eXBlIiwiZGVwZW5kZW5jaWVzIiwibG9jYXRpb24iLCJwYXRoc05lZWRpbmdCaW5kaW5nIiwiZmlsZXNOZWVkaW5nQmluZGluZyIsInNldCIsImdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFLQSxJQUFNQSxZQUFZLElBQUlDLE9BQUosRUFBbEI7QUFDQSxJQUFNQyxRQUFRLElBQUlELE9BQUosRUFBZDtBQUNBLElBQU1FLGVBQWUsSUFBSUYsT0FBSixFQUFyQjtBQUNBLElBQU1HLFFBQVEsSUFBSUgsT0FBSixFQUFkO0FBQ0EsSUFBTUksZ0JBQWdCLElBQUlKLE9BQUosRUFBdEI7QUFDQSxJQUFNSyxZQUFZLElBQUlMLE9BQUosRUFBbEI7QUFDQSxJQUFNTSx1QkFBdUIsSUFBSU4sT0FBSixFQUE3QjtBQUNBLElBQU1PLHVCQUF1QixJQUFJUCxPQUFKLEVBQTdCOztBQUVBOzs7O0lBR2FRLFcsV0FBQUEsVzs7QUFFVDs7Ozs7Ozs7Ozs7QUFXQSx1QkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFdBQTVCLEVBQXlDQyxJQUF6QyxFQUErQ0MsWUFBL0MsRUFBNkRDLFFBQTdELEVBQXVFQyxtQkFBdkUsRUFBNEZDLG1CQUE1RixFQUFpSDtBQUFBOztBQUM3R2pCLGNBQVVrQixHQUFWLENBQWMsSUFBZCxFQUFvQlIsUUFBcEI7QUFDQVIsVUFBTWdCLEdBQU4sQ0FBVSxJQUFWLEVBQWdCUCxJQUFoQjtBQUNBUixpQkFBYWUsR0FBYixDQUFpQixJQUFqQixFQUF1Qk4sV0FBdkI7QUFDQVIsVUFBTWMsR0FBTixDQUFVLElBQVYsRUFBZ0JMLElBQWhCO0FBQ0FSLGtCQUFjYSxHQUFkLENBQWtCLElBQWxCLEVBQXdCSixZQUF4QjtBQUNBUixjQUFVWSxHQUFWLENBQWMsSUFBZCxFQUFvQkgsUUFBcEI7QUFDQVIseUJBQXFCVyxHQUFyQixDQUF5QixJQUF6QixFQUErQkYsdUJBQXVCLEVBQXREO0FBQ0FSLHlCQUFxQlUsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JELHVCQUF1QixFQUF0RDtBQUNIOztBQUVEOzs7Ozs7Ozs7O0FBOENBOzs7OzZCQUlTO0FBQ0wsYUFBTztBQUNITixjQUFNLEtBQUtBLElBRFI7QUFFSEQsa0JBQVUsS0FBS0EsUUFGWjtBQUdIRSxxQkFBYSxLQUFLQSxXQUhmO0FBSUhDLGNBQU0sS0FBS0EsSUFKUjtBQUtIQyxzQkFBYyxLQUFLQSxZQUxoQjtBQU1IQyxrQkFBVSxLQUFLQSxRQU5aO0FBT0hDLDZCQUFxQixLQUFLQSxtQkFQdkI7QUFRSEMsNkJBQXFCLEtBQUtBO0FBUnZCLE9BQVA7QUFVSDs7O3dCQXpEVTtBQUFFLGFBQU9mLE1BQU1pQixHQUFOLENBQVUsSUFBVixDQUFQO0FBQXlCOztBQUV0Qzs7Ozs7Ozt3QkFJZTtBQUFFLGFBQU9uQixVQUFVbUIsR0FBVixDQUFjLElBQWQsQ0FBUDtBQUE2Qjs7QUFFOUM7Ozs7Ozs7d0JBSWtCO0FBQUUsYUFBT2hCLGFBQWFnQixHQUFiLENBQWlCLElBQWpCLENBQVA7QUFBZ0M7O0FBRXBEOzs7Ozs7O3dCQUlXO0FBQUUsYUFBT2YsTUFBTWUsR0FBTixDQUFVLElBQVYsQ0FBUDtBQUF5QjtBQUN0Qzs7Ozs7Ozt3QkFJbUI7QUFBRSxhQUFPZCxjQUFjYyxHQUFkLENBQWtCLElBQWxCLENBQVA7QUFBaUM7QUFDdEQ7Ozs7Ozs7d0JBSWU7QUFBRSxhQUFPYixVQUFVYSxHQUFWLENBQWMsSUFBZCxDQUFQO0FBQTZCOztBQUU5Qzs7Ozs7Ozt3QkFJMEI7QUFBQyxhQUFPWixxQkFBcUJZLEdBQXJCLENBQXlCLElBQXpCLENBQVA7QUFBd0M7O0FBRW5FOzs7Ozs7O3dCQUkwQjtBQUFDLGFBQU9YLHFCQUFxQlcsR0FBckIsQ0FBeUIsSUFBekIsQ0FBUDtBQUF3QyIsImZpbGUiOiJCb2lsZXJQbGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuY29uc3QgX2xhbmd1YWdlID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9uYW1lID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9kZXNjcmlwdGlvbiA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfdHlwZSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZGVwZW5kZW5jaWVzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9sb2NhdGlvbiA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfcGF0aHNOZWVkaW5nQmluZGluZyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZXNOZWVkaW5nQmluZGluZyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGJvaWxlciBwbGF0ZVxuICovXG5leHBvcnQgY2xhc3MgQm9pbGVyUGxhdGUge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0JvaWxlclBsYXRlfVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9ncmFtbWluZyBsYW5ndWFnZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzY3JpcHRpb24gXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBkZXBlbmRlbmNpZXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gW3BhdGhzTmVlZGluZ0JpbmRpbmddXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gW2ZpbGVzTmVlZGluZ0JpbmRpbmddXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobGFuZ3VhZ2UsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlLCBkZXBlbmRlbmNpZXMsIGxvY2F0aW9uLCBwYXRoc05lZWRpbmdCaW5kaW5nLCBmaWxlc05lZWRpbmdCaW5kaW5nKSB7XG4gICAgICAgIF9sYW5ndWFnZS5zZXQodGhpcywgbGFuZ3VhZ2UpO1xuICAgICAgICBfbmFtZS5zZXQodGhpcywgbmFtZSk7XG4gICAgICAgIF9kZXNjcmlwdGlvbi5zZXQodGhpcywgZGVzY3JpcHRpb24pO1xuICAgICAgICBfdHlwZS5zZXQodGhpcywgdHlwZSk7XG4gICAgICAgIF9kZXBlbmRlbmNpZXMuc2V0KHRoaXMsIGRlcGVuZGVuY2llcyk7XG4gICAgICAgIF9sb2NhdGlvbi5zZXQodGhpcywgbG9jYXRpb24pO1xuICAgICAgICBfcGF0aHNOZWVkaW5nQmluZGluZy5zZXQodGhpcywgcGF0aHNOZWVkaW5nQmluZGluZyB8fCBbXSk7XG4gICAgICAgIF9maWxlc05lZWRpbmdCaW5kaW5nLnNldCh0aGlzLCBmaWxlc05lZWRpbmdCaW5kaW5nIHx8IFtdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5hbWUgb2YgdGhlIHtCb2lsZXJQbGF0ZX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBOYW1lIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHsgcmV0dXJuIF9uYW1lLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsYW5ndWFnZSBvZiB0aGUge0JvaWxlclBsYXRlfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IExhbmd1YWdlIG9mIHRoZSB7Qm9pbGVyUGxhdGV9XG4gICAgICovXG4gICAgZ2V0IGxhbmd1YWdlKCkgeyByZXR1cm4gX2xhbmd1YWdlLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUge0JvaWxlclBsYXRlfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IERlc2NyaXB0aW9uIG9mIHRoZSB7Qm9pbGVyUGxhdGV9XG4gICAgICovXG4gICAgZ2V0IGRlc2NyaXB0aW9uKCkgeyByZXR1cm4gX2Rlc2NyaXB0aW9uLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0eXBlIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUeXBlIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKi9cbiAgICBnZXQgdHlwZSgpIHsgcmV0dXJuIF90eXBlLmdldCh0aGlzKTsgfVxuICAgIC8qKlxuICAgICAqIEdldHMgYWxsIHRoZSBkZXBlbmRlbmNpZXMgb2YgdGhlIGJvaWxlcnBsYXRlXG4gICAgICogQHJldHVybnMge2FueVtdfSBMaXN0IG9mIGRlcGVuZGVuY2llc1xuICAgICAqL1xuICAgIGdldCBkZXBlbmRlbmNpZXMoKSB7IHJldHVybiBfZGVwZW5kZW5jaWVzLmdldCh0aGlzKTsgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbG9jYXRpb24gb2YgdGhlIHtCb2lsZXJQbGF0ZX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBMb2NhdGlvbiBvZiB7Qm9pbGVyUGxhdGV9XG4gICAgICovXG4gICAgZ2V0IGxvY2F0aW9uKCkgeyByZXR1cm4gX2xvY2F0aW9uLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBwYXRocyB0aGF0IG5lZWQgYmluZGluZyAtIHJlbGF0aXZlIHdpdGhpbiB0aGUgY29udGVudCBvZiB0aGUgbG9jYXRpb24gb2YgdGhlIHtCb2lsZXJQbGF0ZX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IFBhdGhzXG4gICAgICovXG4gICAgZ2V0IHBhdGhzTmVlZGluZ0JpbmRpbmcoKSB7cmV0dXJuIF9wYXRoc05lZWRpbmdCaW5kaW5nLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZmlsZXMgdGhhdCBuZWVkIGJpbmRpbmcgLSByZWxhdGl2ZSB3aXRoaW4gdGhlIGNvbnRlbnQgb2YgdGhlIGxvY2F0aW9uIG9mIHRoZSB7Qm9pbGVyUGxhdGV9XG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBGaWxlc1xuICAgICAqL1xuICAgIGdldCBmaWxlc05lZWRpbmdCaW5kaW5nKCkge3JldHVybiBfZmlsZXNOZWVkaW5nQmluZGluZy5nZXQodGhpcyk7IH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgdG8gYSBKU09OIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHsqfSBPYmplY3QgbGl0ZXJhbFxuICAgICAqL1xuICAgIHRvSnNvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIGxhbmd1YWdlOiB0aGlzLmxhbmd1YWdlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgICAgICBkZXBlbmRlbmNpZXM6IHRoaXMuZGVwZW5kZW5jaWVzLFxuICAgICAgICAgICAgbG9jYXRpb246IHRoaXMubG9jYXRpb24sXG4gICAgICAgICAgICBwYXRoc05lZWRpbmdCaW5kaW5nOiB0aGlzLnBhdGhzTmVlZGluZ0JpbmRpbmcsXG4gICAgICAgICAgICBmaWxlc05lZWRpbmdCaW5kaW5nOiB0aGlzLmZpbGVzTmVlZGluZ0JpbmRpbmdcbiAgICAgICAgfTtcbiAgICB9XG59Il19