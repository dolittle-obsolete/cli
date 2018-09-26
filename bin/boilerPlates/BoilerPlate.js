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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGUuanMiXSwibmFtZXMiOlsiX2xhbmd1YWdlIiwiV2Vha01hcCIsIl9uYW1lIiwiX2Rlc2NyaXB0aW9uIiwiX3R5cGUiLCJfZGVwZW5kZW5jaWVzIiwiX2xvY2F0aW9uIiwiX3BhdGhzTmVlZGluZ0JpbmRpbmciLCJfZmlsZXNOZWVkaW5nQmluZGluZyIsIkJvaWxlclBsYXRlIiwibGFuZ3VhZ2UiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJ0eXBlIiwiZGVwZW5kZW5jaWVzIiwibG9jYXRpb24iLCJwYXRoc05lZWRpbmdCaW5kaW5nIiwiZmlsZXNOZWVkaW5nQmluZGluZyIsInNldCIsImdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUlBLElBQU1BLFlBQVksSUFBSUMsT0FBSixFQUFsQjtBQUNBLElBQU1DLFFBQVEsSUFBSUQsT0FBSixFQUFkO0FBQ0EsSUFBTUUsZUFBZSxJQUFJRixPQUFKLEVBQXJCO0FBQ0EsSUFBTUcsUUFBUSxJQUFJSCxPQUFKLEVBQWQ7QUFDQSxJQUFNSSxnQkFBZ0IsSUFBSUosT0FBSixFQUF0QjtBQUNBLElBQU1LLFlBQVksSUFBSUwsT0FBSixFQUFsQjtBQUNBLElBQU1NLHVCQUF1QixJQUFJTixPQUFKLEVBQTdCO0FBQ0EsSUFBTU8sdUJBQXVCLElBQUlQLE9BQUosRUFBN0I7O0FBRUE7Ozs7SUFHYVEsVyxXQUFBQSxXOztBQUVUOzs7Ozs7Ozs7OztBQVdBLHVCQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsV0FBNUIsRUFBeUNDLElBQXpDLEVBQStDQyxZQUEvQyxFQUE2REMsUUFBN0QsRUFBdUVDLG1CQUF2RSxFQUE0RkMsbUJBQTVGLEVBQWlIO0FBQUE7O0FBQzdHakIsY0FBVWtCLEdBQVYsQ0FBYyxJQUFkLEVBQW9CUixRQUFwQjtBQUNBUixVQUFNZ0IsR0FBTixDQUFVLElBQVYsRUFBZ0JQLElBQWhCO0FBQ0FSLGlCQUFhZSxHQUFiLENBQWlCLElBQWpCLEVBQXVCTixXQUF2QjtBQUNBUixVQUFNYyxHQUFOLENBQVUsSUFBVixFQUFnQkwsSUFBaEI7QUFDQVIsa0JBQWNhLEdBQWQsQ0FBa0IsSUFBbEIsRUFBd0JKLFlBQXhCO0FBQ0FSLGNBQVVZLEdBQVYsQ0FBYyxJQUFkLEVBQW9CSCxRQUFwQjtBQUNBUix5QkFBcUJXLEdBQXJCLENBQXlCLElBQXpCLEVBQStCRix1QkFBdUIsRUFBdEQ7QUFDQVIseUJBQXFCVSxHQUFyQixDQUF5QixJQUF6QixFQUErQkQsdUJBQXVCLEVBQXREO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7QUE4Q0E7Ozs7NkJBSVM7QUFDTCxhQUFPO0FBQ0hOLGNBQU0sS0FBS0EsSUFEUjtBQUVIRCxrQkFBVSxLQUFLQSxRQUZaO0FBR0hFLHFCQUFhLEtBQUtBLFdBSGY7QUFJSEMsY0FBTSxLQUFLQSxJQUpSO0FBS0hDLHNCQUFjLEtBQUtBLFlBTGhCO0FBTUhDLGtCQUFVLEtBQUtBLFFBTlo7QUFPSEMsNkJBQXFCLEtBQUtBLG1CQVB2QjtBQVFIQyw2QkFBcUIsS0FBS0E7QUFSdkIsT0FBUDtBQVVIOzs7d0JBekRVO0FBQUUsYUFBT2YsTUFBTWlCLEdBQU4sQ0FBVSxJQUFWLENBQVA7QUFBeUI7O0FBRXRDOzs7Ozs7O3dCQUllO0FBQUUsYUFBT25CLFVBQVVtQixHQUFWLENBQWMsSUFBZCxDQUFQO0FBQTZCOztBQUU5Qzs7Ozs7Ozt3QkFJa0I7QUFBRSxhQUFPaEIsYUFBYWdCLEdBQWIsQ0FBaUIsSUFBakIsQ0FBUDtBQUFnQzs7QUFFcEQ7Ozs7Ozs7d0JBSVc7QUFBRSxhQUFPZixNQUFNZSxHQUFOLENBQVUsSUFBVixDQUFQO0FBQXlCO0FBQ3RDOzs7Ozs7O3dCQUltQjtBQUFFLGFBQU9kLGNBQWNjLEdBQWQsQ0FBa0IsSUFBbEIsQ0FBUDtBQUFpQztBQUN0RDs7Ozs7Ozt3QkFJZTtBQUFFLGFBQU9iLFVBQVVhLEdBQVYsQ0FBYyxJQUFkLENBQVA7QUFBNkI7O0FBRTlDOzs7Ozs7O3dCQUkwQjtBQUFFLGFBQU9aLHFCQUFxQlksR0FBckIsQ0FBeUIsSUFBekIsQ0FBUDtBQUF3Qzs7QUFFcEU7Ozs7Ozs7d0JBSTBCO0FBQUUsYUFBT1gscUJBQXFCVyxHQUFyQixDQUF5QixJQUF6QixDQUFQO0FBQXdDIiwiZmlsZSI6IkJvaWxlclBsYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuY29uc3QgX2xhbmd1YWdlID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9uYW1lID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9kZXNjcmlwdGlvbiA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfdHlwZSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZGVwZW5kZW5jaWVzID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9sb2NhdGlvbiA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfcGF0aHNOZWVkaW5nQmluZGluZyA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZmlsZXNOZWVkaW5nQmluZGluZyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGJvaWxlciBwbGF0ZVxuICovXG5leHBvcnQgY2xhc3MgQm9pbGVyUGxhdGUge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0JvaWxlclBsYXRlfVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9ncmFtbWluZyBsYW5ndWFnZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzY3JpcHRpb24gXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBkZXBlbmRlbmNpZXNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gW3BhdGhzTmVlZGluZ0JpbmRpbmddXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gW2ZpbGVzTmVlZGluZ0JpbmRpbmddXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobGFuZ3VhZ2UsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlLCBkZXBlbmRlbmNpZXMsIGxvY2F0aW9uLCBwYXRoc05lZWRpbmdCaW5kaW5nLCBmaWxlc05lZWRpbmdCaW5kaW5nKSB7XG4gICAgICAgIF9sYW5ndWFnZS5zZXQodGhpcywgbGFuZ3VhZ2UpO1xuICAgICAgICBfbmFtZS5zZXQodGhpcywgbmFtZSk7XG4gICAgICAgIF9kZXNjcmlwdGlvbi5zZXQodGhpcywgZGVzY3JpcHRpb24pO1xuICAgICAgICBfdHlwZS5zZXQodGhpcywgdHlwZSk7XG4gICAgICAgIF9kZXBlbmRlbmNpZXMuc2V0KHRoaXMsIGRlcGVuZGVuY2llcyk7XG4gICAgICAgIF9sb2NhdGlvbi5zZXQodGhpcywgbG9jYXRpb24pO1xuICAgICAgICBfcGF0aHNOZWVkaW5nQmluZGluZy5zZXQodGhpcywgcGF0aHNOZWVkaW5nQmluZGluZyB8fCBbXSk7XG4gICAgICAgIF9maWxlc05lZWRpbmdCaW5kaW5nLnNldCh0aGlzLCBmaWxlc05lZWRpbmdCaW5kaW5nIHx8IFtdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5hbWUgb2YgdGhlIHtCb2lsZXJQbGF0ZX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBOYW1lIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHsgcmV0dXJuIF9uYW1lLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsYW5ndWFnZSBvZiB0aGUge0JvaWxlclBsYXRlfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IExhbmd1YWdlIG9mIHRoZSB7Qm9pbGVyUGxhdGV9XG4gICAgICovXG4gICAgZ2V0IGxhbmd1YWdlKCkgeyByZXR1cm4gX2xhbmd1YWdlLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUge0JvaWxlclBsYXRlfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IERlc2NyaXB0aW9uIG9mIHRoZSB7Qm9pbGVyUGxhdGV9XG4gICAgICovXG4gICAgZ2V0IGRlc2NyaXB0aW9uKCkgeyByZXR1cm4gX2Rlc2NyaXB0aW9uLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0eXBlIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUeXBlIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKi9cbiAgICBnZXQgdHlwZSgpIHsgcmV0dXJuIF90eXBlLmdldCh0aGlzKTsgfVxuICAgIC8qKlxuICAgICAqIEdldHMgYWxsIHRoZSBkZXBlbmRlbmNpZXMgb2YgdGhlIGJvaWxlcnBsYXRlXG4gICAgICogQHJldHVybnMge2FueVtdfSBMaXN0IG9mIGRlcGVuZGVuY2llc1xuICAgICAqL1xuICAgIGdldCBkZXBlbmRlbmNpZXMoKSB7IHJldHVybiBfZGVwZW5kZW5jaWVzLmdldCh0aGlzKTsgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbG9jYXRpb24gb2YgdGhlIHtCb2lsZXJQbGF0ZX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBMb2NhdGlvbiBvZiB7Qm9pbGVyUGxhdGV9XG4gICAgICovXG4gICAgZ2V0IGxvY2F0aW9uKCkgeyByZXR1cm4gX2xvY2F0aW9uLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBwYXRocyB0aGF0IG5lZWQgYmluZGluZyAtIHJlbGF0aXZlIHdpdGhpbiB0aGUgY29udGVudCBvZiB0aGUgbG9jYXRpb24gb2YgdGhlIHtCb2lsZXJQbGF0ZX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IFBhdGhzXG4gICAgICovXG4gICAgZ2V0IHBhdGhzTmVlZGluZ0JpbmRpbmcoKSB7wqByZXR1cm4gX3BhdGhzTmVlZGluZ0JpbmRpbmcuZ2V0KHRoaXMpOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBmaWxlcyB0aGF0IG5lZWQgYmluZGluZyAtIHJlbGF0aXZlIHdpdGhpbiB0aGUgY29udGVudCBvZiB0aGUgbG9jYXRpb24gb2YgdGhlIHtCb2lsZXJQbGF0ZX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IEZpbGVzXG4gICAgICovXG4gICAgZ2V0IGZpbGVzTmVlZGluZ0JpbmRpbmcoKSB7wqByZXR1cm4gX2ZpbGVzTmVlZGluZ0JpbmRpbmcuZ2V0KHRoaXMpOyB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IHRvIGEgSlNPTiBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7Kn0gT2JqZWN0IGxpdGVyYWxcbiAgICAgKi9cbiAgICB0b0pzb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICBsYW5ndWFnZTogdGhpcy5sYW5ndWFnZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiB0aGlzLmRlcGVuZGVuY2llcyxcbiAgICAgICAgICAgIGxvY2F0aW9uOiB0aGlzLmxvY2F0aW9uLFxuICAgICAgICAgICAgcGF0aHNOZWVkaW5nQmluZGluZzogdGhpcy5wYXRoc05lZWRpbmdCaW5kaW5nLFxuICAgICAgICAgICAgZmlsZXNOZWVkaW5nQmluZGluZzogdGhpcy5maWxlc05lZWRpbmdCaW5kaW5nXG4gICAgICAgIH1cbiAgICB9XG59Il19