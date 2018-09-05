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
    _classCallCheck(this, BoilerPlate);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGUuanMiXSwibmFtZXMiOlsiX2xhbmd1YWdlIiwiV2Vha01hcCIsIl9uYW1lIiwiX2Rlc2NyaXB0aW9uIiwiX3R5cGUiLCJfbG9jYXRpb24iLCJfcGF0aHNOZWVkaW5nQmluZGluZyIsIl9maWxlc05lZWRpbmdCaW5kaW5nIiwiQm9pbGVyUGxhdGUiLCJsYW5ndWFnZSIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsInR5cGUiLCJsb2NhdGlvbiIsInBhdGhzTmVlZGluZ0JpbmRpbmciLCJmaWxlc05lZWRpbmdCaW5kaW5nIiwic2V0IiwiZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFJQSxJQUFNQSxZQUFZLElBQUlDLE9BQUosRUFBbEI7QUFDQSxJQUFNQyxRQUFRLElBQUlELE9BQUosRUFBZDtBQUNBLElBQU1FLGVBQWUsSUFBSUYsT0FBSixFQUFyQjtBQUNBLElBQU1HLFFBQVEsSUFBSUgsT0FBSixFQUFkO0FBQ0EsSUFBTUksWUFBWSxJQUFJSixPQUFKLEVBQWxCO0FBQ0EsSUFBTUssdUJBQXVCLElBQUlMLE9BQUosRUFBN0I7QUFDQSxJQUFNTSx1QkFBdUIsSUFBSU4sT0FBSixFQUE3Qjs7QUFFQTs7OztJQUdhTyxXLFdBQUFBLFc7O0FBRVQ7Ozs7Ozs7Ozs7QUFVQSx1QkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFdBQTVCLEVBQXlDQyxJQUF6QyxFQUErQ0MsUUFBL0MsRUFBeURDLG1CQUF6RCxFQUE4RUMsbUJBQTlFLEVBQW1HO0FBQUE7O0FBQy9GZixjQUFVZ0IsR0FBVixDQUFjLElBQWQsRUFBb0JQLFFBQXBCO0FBQ0FQLFVBQU1jLEdBQU4sQ0FBVSxJQUFWLEVBQWdCTixJQUFoQjtBQUNBUCxpQkFBYWEsR0FBYixDQUFpQixJQUFqQixFQUF1QkwsV0FBdkI7QUFDQVAsVUFBTVksR0FBTixDQUFVLElBQVYsRUFBZ0JKLElBQWhCO0FBQ0FQLGNBQVVXLEdBQVYsQ0FBYyxJQUFkLEVBQW9CSCxRQUFwQjtBQUNBUCx5QkFBcUJVLEdBQXJCLENBQXlCLElBQXpCLEVBQStCRix1QkFBdUIsRUFBdEQ7QUFDQVAseUJBQXFCUyxHQUFyQixDQUF5QixJQUF6QixFQUErQkQsdUJBQXVCLEVBQXREO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7QUEwQ0E7Ozs7NkJBSVM7QUFDTCxhQUFPO0FBQ0hMLGNBQU0sS0FBS0EsSUFEUjtBQUVIRCxrQkFBVSxLQUFLQSxRQUZaO0FBR0hFLHFCQUFhLEtBQUtBLFdBSGY7QUFJSEMsY0FBTSxLQUFLQSxJQUpSO0FBS0hDLGtCQUFVLEtBQUtBLFFBTFo7QUFNSEMsNkJBQXFCLEtBQUtBLG1CQU52QjtBQU9IQyw2QkFBcUIsS0FBS0E7QUFQdkIsT0FBUDtBQVNIOzs7d0JBcERVO0FBQUUsYUFBT2IsTUFBTWUsR0FBTixDQUFVLElBQVYsQ0FBUDtBQUF5Qjs7QUFFdEM7Ozs7Ozs7d0JBSWU7QUFBRSxhQUFPakIsVUFBVWlCLEdBQVYsQ0FBYyxJQUFkLENBQVA7QUFBNkI7O0FBRTlDOzs7Ozs7O3dCQUlrQjtBQUFFLGFBQU9kLGFBQWFjLEdBQWIsQ0FBaUIsSUFBakIsQ0FBUDtBQUFnQzs7QUFFcEQ7Ozs7Ozs7d0JBSVc7QUFBRSxhQUFPYixNQUFNYSxHQUFOLENBQVUsSUFBVixDQUFQO0FBQXlCOztBQUV0Qzs7Ozs7Ozt3QkFJZTtBQUFFLGFBQU9aLFVBQVVZLEdBQVYsQ0FBYyxJQUFkLENBQVA7QUFBNkI7O0FBRTlDOzs7Ozs7O3dCQUkwQjtBQUFFLGFBQU9YLHFCQUFxQlcsR0FBckIsQ0FBeUIsSUFBekIsQ0FBUDtBQUF3Qzs7QUFFcEU7Ozs7Ozs7d0JBSTBCO0FBQUUsYUFBT1YscUJBQXFCVSxHQUFyQixDQUF5QixJQUF6QixDQUFQO0FBQXdDIiwiZmlsZSI6IkJvaWxlclBsYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuY29uc3QgX2xhbmd1YWdlID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9uYW1lID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IF9kZXNjcmlwdGlvbiA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfdHlwZSA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfbG9jYXRpb24gPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX3BhdGhzTmVlZGluZ0JpbmRpbmcgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVzTmVlZGluZ0JpbmRpbmcgPSBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBib2lsZXIgcGxhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIEJvaWxlclBsYXRlIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHtCb2lsZXJQbGF0ZX1cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvZ3JhbW1pbmcgbGFuZ3VhZ2UgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc2NyaXB0aW9uIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IFtwYXRoc05lZWRpbmdCaW5kaW5nXVxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IFtmaWxlc05lZWRpbmdCaW5kaW5nXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGxhbmd1YWdlLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZSwgbG9jYXRpb24sIHBhdGhzTmVlZGluZ0JpbmRpbmcsIGZpbGVzTmVlZGluZ0JpbmRpbmcpIHtcbiAgICAgICAgX2xhbmd1YWdlLnNldCh0aGlzLCBsYW5ndWFnZSk7XG4gICAgICAgIF9uYW1lLnNldCh0aGlzLCBuYW1lKTtcbiAgICAgICAgX2Rlc2NyaXB0aW9uLnNldCh0aGlzLCBkZXNjcmlwdGlvbik7XG4gICAgICAgIF90eXBlLnNldCh0aGlzLCB0eXBlKTtcbiAgICAgICAgX2xvY2F0aW9uLnNldCh0aGlzLCBsb2NhdGlvbik7XG4gICAgICAgIF9wYXRoc05lZWRpbmdCaW5kaW5nLnNldCh0aGlzLCBwYXRoc05lZWRpbmdCaW5kaW5nIHx8IFtdKTtcbiAgICAgICAgX2ZpbGVzTmVlZGluZ0JpbmRpbmcuc2V0KHRoaXMsIGZpbGVzTmVlZGluZ0JpbmRpbmcgfHwgW10pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmFtZSBvZiB0aGUge0JvaWxlclBsYXRlfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IE5hbWUgb2Yge0JvaWxlclBsYXRlfVxuICAgICAqL1xuICAgIGdldCBuYW1lKCkgeyByZXR1cm4gX25hbWUuZ2V0KHRoaXMpOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGxhbmd1YWdlIG9mIHRoZSB7Qm9pbGVyUGxhdGV9XG4gICAgICogQHJldHVybnMge3N0cmluZ30gTGFuZ3VhZ2Ugb2YgdGhlIHtCb2lsZXJQbGF0ZX1cbiAgICAgKi9cbiAgICBnZXQgbGFuZ3VhZ2UoKSB7IHJldHVybiBfbGFuZ3VhZ2UuZ2V0KHRoaXMpOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSB7Qm9pbGVyUGxhdGV9XG4gICAgICogQHJldHVybnMge3N0cmluZ30gRGVzY3JpcHRpb24gb2YgdGhlIHtCb2lsZXJQbGF0ZX1cbiAgICAgKi9cbiAgICBnZXQgZGVzY3JpcHRpb24oKSB7IHJldHVybiBfZGVzY3JpcHRpb24uZ2V0KHRoaXMpOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHR5cGUgb2Yge0JvaWxlclBsYXRlfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFR5cGUgb2Yge0JvaWxlclBsYXRlfVxuICAgICAqL1xuICAgIGdldCB0eXBlKCkgeyByZXR1cm4gX3R5cGUuZ2V0KHRoaXMpOyB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGxvY2F0aW9uIG9mIHRoZSB7Qm9pbGVyUGxhdGV9XG4gICAgICogQHJldHVybnMge3N0cmluZ30gTG9jYXRpb24gb2Yge0JvaWxlclBsYXRlfVxuICAgICAqL1xuICAgIGdldCBsb2NhdGlvbigpIHsgcmV0dXJuIF9sb2NhdGlvbi5nZXQodGhpcyk7IH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcGF0aHMgdGhhdCBuZWVkIGJpbmRpbmcgLSByZWxhdGl2ZSB3aXRoaW4gdGhlIGNvbnRlbnQgb2YgdGhlIGxvY2F0aW9uIG9mIHRoZSB7Qm9pbGVyUGxhdGV9XG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBQYXRoc1xuICAgICAqL1xuICAgIGdldCBwYXRoc05lZWRpbmdCaW5kaW5nKCkge8KgcmV0dXJuIF9wYXRoc05lZWRpbmdCaW5kaW5nLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZmlsZXMgdGhhdCBuZWVkIGJpbmRpbmcgLSByZWxhdGl2ZSB3aXRoaW4gdGhlIGNvbnRlbnQgb2YgdGhlIGxvY2F0aW9uIG9mIHRoZSB7Qm9pbGVyUGxhdGV9XG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfSBGaWxlc1xuICAgICAqL1xuICAgIGdldCBmaWxlc05lZWRpbmdCaW5kaW5nKCkge8KgcmV0dXJuIF9maWxlc05lZWRpbmdCaW5kaW5nLmdldCh0aGlzKTsgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCB0byBhIEpTT04gb2JqZWN0XG4gICAgICogQHJldHVybnMgeyp9IE9iamVjdCBsaXRlcmFsXG4gICAgICovXG4gICAgdG9Kc29uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgbGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2UsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgICAgIGxvY2F0aW9uOiB0aGlzLmxvY2F0aW9uLFxuICAgICAgICAgICAgcGF0aHNOZWVkaW5nQmluZGluZzogdGhpcy5wYXRoc05lZWRpbmdCaW5kaW5nLFxuICAgICAgICAgICAgZmlsZXNOZWVkaW5nQmluZGluZzogdGhpcy5maWxlc05lZWRpbmdCaW5kaW5nXG4gICAgICAgIH1cbiAgICB9XG59Il19