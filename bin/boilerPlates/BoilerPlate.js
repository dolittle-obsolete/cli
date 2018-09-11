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
   * @param {string} location 
   * @param {string[]} [pathsNeedingBinding]
   * @param {string[]} [filesNeedingBinding]
   */
  function BoilerPlate(language, name, description, type, location, pathsNeedingBinding, filesNeedingBinding) {
    (0, _classCallCheck3.default)(this, BoilerPlate);

    _language.set(this, language);
    _name.set(this, name);
    _description.set(this, description);
    _type.set(this, type);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGUuanMiXSwibmFtZXMiOlsiX2xhbmd1YWdlIiwiV2Vha01hcCIsIl9uYW1lIiwiX2Rlc2NyaXB0aW9uIiwiX3R5cGUiLCJfbG9jYXRpb24iLCJfcGF0aHNOZWVkaW5nQmluZGluZyIsIl9maWxlc05lZWRpbmdCaW5kaW5nIiwiQm9pbGVyUGxhdGUiLCJsYW5ndWFnZSIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsInR5cGUiLCJsb2NhdGlvbiIsInBhdGhzTmVlZGluZ0JpbmRpbmciLCJmaWxlc05lZWRpbmdCaW5kaW5nIiwic2V0IiwiZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBSUEsSUFBTUEsWUFBWSxJQUFJQyxPQUFKLEVBQWxCO0FBQ0EsSUFBTUMsUUFBUSxJQUFJRCxPQUFKLEVBQWQ7QUFDQSxJQUFNRSxlQUFlLElBQUlGLE9BQUosRUFBckI7QUFDQSxJQUFNRyxRQUFRLElBQUlILE9BQUosRUFBZDtBQUNBLElBQU1JLFlBQVksSUFBSUosT0FBSixFQUFsQjtBQUNBLElBQU1LLHVCQUF1QixJQUFJTCxPQUFKLEVBQTdCO0FBQ0EsSUFBTU0sdUJBQXVCLElBQUlOLE9BQUosRUFBN0I7O0FBRUE7Ozs7SUFHYU8sVyxXQUFBQSxXOztBQUVUOzs7Ozs7Ozs7O0FBVUEsdUJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxXQUE1QixFQUF5Q0MsSUFBekMsRUFBK0NDLFFBQS9DLEVBQXlEQyxtQkFBekQsRUFBOEVDLG1CQUE5RSxFQUFtRztBQUFBOztBQUMvRmYsY0FBVWdCLEdBQVYsQ0FBYyxJQUFkLEVBQW9CUCxRQUFwQjtBQUNBUCxVQUFNYyxHQUFOLENBQVUsSUFBVixFQUFnQk4sSUFBaEI7QUFDQVAsaUJBQWFhLEdBQWIsQ0FBaUIsSUFBakIsRUFBdUJMLFdBQXZCO0FBQ0FQLFVBQU1ZLEdBQU4sQ0FBVSxJQUFWLEVBQWdCSixJQUFoQjtBQUNBUCxjQUFVVyxHQUFWLENBQWMsSUFBZCxFQUFvQkgsUUFBcEI7QUFDQVAseUJBQXFCVSxHQUFyQixDQUF5QixJQUF6QixFQUErQkYsdUJBQXVCLEVBQXREO0FBQ0FQLHlCQUFxQlMsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JELHVCQUF1QixFQUF0RDtBQUNIOztBQUVEOzs7Ozs7Ozs7O0FBMENBOzs7OzZCQUlTO0FBQ0wsYUFBTztBQUNITCxjQUFNLEtBQUtBLElBRFI7QUFFSEQsa0JBQVUsS0FBS0EsUUFGWjtBQUdIRSxxQkFBYSxLQUFLQSxXQUhmO0FBSUhDLGNBQU0sS0FBS0EsSUFKUjtBQUtIQyxrQkFBVSxLQUFLQSxRQUxaO0FBTUhDLDZCQUFxQixLQUFLQSxtQkFOdkI7QUFPSEMsNkJBQXFCLEtBQUtBO0FBUHZCLE9BQVA7QUFTSDs7O3dCQXBEVTtBQUFFLGFBQU9iLE1BQU1lLEdBQU4sQ0FBVSxJQUFWLENBQVA7QUFBeUI7O0FBRXRDOzs7Ozs7O3dCQUllO0FBQUUsYUFBT2pCLFVBQVVpQixHQUFWLENBQWMsSUFBZCxDQUFQO0FBQTZCOztBQUU5Qzs7Ozs7Ozt3QkFJa0I7QUFBRSxhQUFPZCxhQUFhYyxHQUFiLENBQWlCLElBQWpCLENBQVA7QUFBZ0M7O0FBRXBEOzs7Ozs7O3dCQUlXO0FBQUUsYUFBT2IsTUFBTWEsR0FBTixDQUFVLElBQVYsQ0FBUDtBQUF5Qjs7QUFFdEM7Ozs7Ozs7d0JBSWU7QUFBRSxhQUFPWixVQUFVWSxHQUFWLENBQWMsSUFBZCxDQUFQO0FBQTZCOztBQUU5Qzs7Ozs7Ozt3QkFJMEI7QUFBRSxhQUFPWCxxQkFBcUJXLEdBQXJCLENBQXlCLElBQXpCLENBQVA7QUFBd0M7O0FBRXBFOzs7Ozs7O3dCQUkwQjtBQUFFLGFBQU9WLHFCQUFxQlUsR0FBckIsQ0FBeUIsSUFBekIsQ0FBUDtBQUF3QyIsImZpbGUiOiJCb2lsZXJQbGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmNvbnN0IF9sYW5ndWFnZSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfbmFtZSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZGVzY3JpcHRpb24gPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX3R5cGUgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2xvY2F0aW9uID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9wYXRoc05lZWRpbmdCaW5kaW5nID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9maWxlc05lZWRpbmdCaW5kaW5nID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgYm9pbGVyIHBsYXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBCb2lsZXJQbGF0ZSB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB7Qm9pbGVyUGxhdGV9XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2dyYW1taW5nIGxhbmd1YWdlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXNjcmlwdGlvbiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBbcGF0aHNOZWVkaW5nQmluZGluZ11cbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBbZmlsZXNOZWVkaW5nQmluZGluZ11cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihsYW5ndWFnZSwgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGUsIGxvY2F0aW9uLCBwYXRoc05lZWRpbmdCaW5kaW5nLCBmaWxlc05lZWRpbmdCaW5kaW5nKSB7XG4gICAgICAgIF9sYW5ndWFnZS5zZXQodGhpcywgbGFuZ3VhZ2UpO1xuICAgICAgICBfbmFtZS5zZXQodGhpcywgbmFtZSk7XG4gICAgICAgIF9kZXNjcmlwdGlvbi5zZXQodGhpcywgZGVzY3JpcHRpb24pO1xuICAgICAgICBfdHlwZS5zZXQodGhpcywgdHlwZSk7XG4gICAgICAgIF9sb2NhdGlvbi5zZXQodGhpcywgbG9jYXRpb24pO1xuICAgICAgICBfcGF0aHNOZWVkaW5nQmluZGluZy5zZXQodGhpcywgcGF0aHNOZWVkaW5nQmluZGluZyB8fCBbXSk7XG4gICAgICAgIF9maWxlc05lZWRpbmdCaW5kaW5nLnNldCh0aGlzLCBmaWxlc05lZWRpbmdCaW5kaW5nIHx8IFtdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5hbWUgb2YgdGhlIHtCb2lsZXJQbGF0ZX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBOYW1lIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHsgcmV0dXJuIF9uYW1lLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsYW5ndWFnZSBvZiB0aGUge0JvaWxlclBsYXRlfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IExhbmd1YWdlIG9mIHRoZSB7Qm9pbGVyUGxhdGV9XG4gICAgICovXG4gICAgZ2V0IGxhbmd1YWdlKCkgeyByZXR1cm4gX2xhbmd1YWdlLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUge0JvaWxlclBsYXRlfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IERlc2NyaXB0aW9uIG9mIHRoZSB7Qm9pbGVyUGxhdGV9XG4gICAgICovXG4gICAgZ2V0IGRlc2NyaXB0aW9uKCkgeyByZXR1cm4gX2Rlc2NyaXB0aW9uLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0eXBlIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUeXBlIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKi9cbiAgICBnZXQgdHlwZSgpIHsgcmV0dXJuIF90eXBlLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsb2NhdGlvbiBvZiB0aGUge0JvaWxlclBsYXRlfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IExvY2F0aW9uIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKi9cbiAgICBnZXQgbG9jYXRpb24oKSB7IHJldHVybiBfbG9jYXRpb24uZ2V0KHRoaXMpOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHBhdGhzIHRoYXQgbmVlZCBiaW5kaW5nIC0gcmVsYXRpdmUgd2l0aGluIHRoZSBjb250ZW50IG9mIHRoZSBsb2NhdGlvbiBvZiB0aGUge0JvaWxlclBsYXRlfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gUGF0aHNcbiAgICAgKi9cbiAgICBnZXQgcGF0aHNOZWVkaW5nQmluZGluZygpIHvCoHJldHVybiBfcGF0aHNOZWVkaW5nQmluZGluZy5nZXQodGhpcyk7IH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGZpbGVzIHRoYXQgbmVlZCBiaW5kaW5nIC0gcmVsYXRpdmUgd2l0aGluIHRoZSBjb250ZW50IG9mIHRoZSBsb2NhdGlvbiBvZiB0aGUge0JvaWxlclBsYXRlfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gRmlsZXNcbiAgICAgKi9cbiAgICBnZXQgZmlsZXNOZWVkaW5nQmluZGluZygpIHvCoHJldHVybiBfZmlsZXNOZWVkaW5nQmluZGluZy5nZXQodGhpcyk7IH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgdG8gYSBKU09OIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHsqfSBPYmplY3QgbGl0ZXJhbFxuICAgICAqL1xuICAgIHRvSnNvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIGxhbmd1YWdlOiB0aGlzLmxhbmd1YWdlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgICAgICBsb2NhdGlvbjogdGhpcy5sb2NhdGlvbixcbiAgICAgICAgICAgIHBhdGhzTmVlZGluZ0JpbmRpbmc6IHRoaXMucGF0aHNOZWVkaW5nQmluZGluZyxcbiAgICAgICAgICAgIGZpbGVzTmVlZGluZ0JpbmRpbmc6IHRoaXMuZmlsZXNOZWVkaW5nQmluZGluZ1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==