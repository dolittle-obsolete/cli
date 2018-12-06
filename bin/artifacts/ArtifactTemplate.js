"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ArtifactTemplate = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
  * Represents an artifact template
  */
var ArtifactTemplate = exports.ArtifactTemplate = function () {
    function ArtifactTemplate(name, type, description, language, dependencies, includedFiles, location) {
        (0, _classCallCheck3.default)(this, ArtifactTemplate);

        this._name = name;
        this._type = type;
        this._description = description;
        this._language = language;
        this._dependencies = dependencies;
        this._includedFiles = includedFiles;
        this._location = location;
    }
    /**
     * Gets the name of the artifact template
     */


    (0, _createClass3.default)(ArtifactTemplate, [{
        key: "name",
        get: function get() {
            return this._name;
        }
        /**
         * Gets the type of the artifact template
         */

    }, {
        key: "type",
        get: function get() {
            return this._type;
        }
        /**
         * Gets the description of the artifact template
         */

    }, {
        key: "description",
        get: function get() {
            return this._description;
        }
        /**
         * Gets the programming language of the artifact this is a template for
         */

    }, {
        key: "language",
        get: function get() {
            return this._language;
        }
        /**
         * Gets the dependencies of the template
         */

    }, {
        key: "dependencies",
        get: function get() {
            return this._dependencies;
        }
        /**
         * Gets the list of files that needs to be templated
         */

    }, {
        key: "includedFiles",
        get: function get() {
            return this._includedFiles;
        }
        /**
         * Gets the file location of the
         */

    }, {
        key: "location",
        get: function get() {
            return this._location;
        }
    }]);
    return ArtifactTemplate;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQXJ0aWZhY3RUZW1wbGF0ZS5qcyJdLCJuYW1lcyI6WyJBcnRpZmFjdFRlbXBsYXRlIiwibmFtZSIsInR5cGUiLCJkZXNjcmlwdGlvbiIsImxhbmd1YWdlIiwiZGVwZW5kZW5jaWVzIiwiaW5jbHVkZWRGaWxlcyIsImxvY2F0aW9uIiwiX25hbWUiLCJfdHlwZSIsIl9kZXNjcmlwdGlvbiIsIl9sYW5ndWFnZSIsIl9kZXBlbmRlbmNpZXMiLCJfaW5jbHVkZWRGaWxlcyIsIl9sb2NhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFLQTs7O0lBR2FBLGdCLFdBQUFBLGdCO0FBRVQsOEJBQWFDLElBQWIsRUFBbUJDLElBQW5CLEVBQXlCQyxXQUF6QixFQUFzQ0MsUUFBdEMsRUFBZ0RDLFlBQWhELEVBQThEQyxhQUE5RCxFQUE2RUMsUUFBN0UsRUFBdUY7QUFBQTs7QUFDbkYsYUFBS0MsS0FBTCxHQUFhUCxJQUFiO0FBQ0EsYUFBS1EsS0FBTCxHQUFhUCxJQUFiO0FBQ0EsYUFBS1EsWUFBTCxHQUFvQlAsV0FBcEI7QUFDQSxhQUFLUSxTQUFMLEdBQWlCUCxRQUFqQjtBQUNBLGFBQUtRLGFBQUwsR0FBcUJQLFlBQXJCO0FBQ0EsYUFBS1EsY0FBTCxHQUFzQlAsYUFBdEI7QUFDQSxhQUFLUSxTQUFMLEdBQWlCUCxRQUFqQjtBQUNIO0FBQ0Q7Ozs7Ozs7NEJBR1c7QUFDUCxtQkFBTyxLQUFLQyxLQUFaO0FBQ0g7QUFDRDs7Ozs7OzRCQUdXO0FBQ1AsbUJBQU8sS0FBS0MsS0FBWjtBQUNIO0FBQ0Q7Ozs7Ozs0QkFHa0I7QUFDZCxtQkFBTyxLQUFLQyxZQUFaO0FBQ0g7QUFDRDs7Ozs7OzRCQUdlO0FBQ1gsbUJBQU8sS0FBS0MsU0FBWjtBQUNIO0FBQ0Q7Ozs7Ozs0QkFHbUI7QUFDZixtQkFBTyxLQUFLQyxhQUFaO0FBQ0g7QUFDRDs7Ozs7OzRCQUdvQjtBQUNoQixtQkFBTyxLQUFLQyxjQUFaO0FBQ0g7QUFDRDs7Ozs7OzRCQUdlO0FBQ1gsbUJBQU8sS0FBS0MsU0FBWjtBQUNIIiwiZmlsZSI6IkFydGlmYWN0VGVtcGxhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4vKipcclxuICAqIFJlcHJlc2VudHMgYW4gYXJ0aWZhY3QgdGVtcGxhdGVcclxuICAqL1xyXG5leHBvcnQgY2xhc3MgQXJ0aWZhY3RUZW1wbGF0ZVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZSwgdHlwZSwgZGVzY3JpcHRpb24sIGxhbmd1YWdlLCBkZXBlbmRlbmNpZXMsIGluY2x1ZGVkRmlsZXMsIGxvY2F0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5fZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLl9sYW5ndWFnZSA9IGxhbmd1YWdlO1xyXG4gICAgICAgIHRoaXMuX2RlcGVuZGVuY2llcyA9IGRlcGVuZGVuY2llcztcclxuICAgICAgICB0aGlzLl9pbmNsdWRlZEZpbGVzID0gaW5jbHVkZWRGaWxlcztcclxuICAgICAgICB0aGlzLl9sb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBuYW1lIG9mIHRoZSBhcnRpZmFjdCB0ZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICBnZXQgbmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdHlwZSBvZiB0aGUgYXJ0aWZhY3QgdGVtcGxhdGVcclxuICAgICAqL1xyXG4gICAgZ2V0IHR5cGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBhcnRpZmFjdCB0ZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICBnZXQgZGVzY3JpcHRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBwcm9ncmFtbWluZyBsYW5ndWFnZSBvZiB0aGUgYXJ0aWZhY3QgdGhpcyBpcyBhIHRlbXBsYXRlIGZvclxyXG4gICAgICovXHJcbiAgICBnZXQgbGFuZ3VhZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhbmd1YWdlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBkZXBlbmRlbmNpZXMgb2YgdGhlIHRlbXBsYXRlXHJcbiAgICAgKi9cclxuICAgIGdldCBkZXBlbmRlbmNpZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlcGVuZGVuY2llcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbGlzdCBvZiBmaWxlcyB0aGF0IG5lZWRzIHRvIGJlIHRlbXBsYXRlZFxyXG4gICAgICovXHJcbiAgICBnZXQgaW5jbHVkZWRGaWxlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5jbHVkZWRGaWxlcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZmlsZSBsb2NhdGlvbiBvZiB0aGVcclxuICAgICAqL1xyXG4gICAgZ2V0IGxvY2F0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbjtcclxuICAgIH1cclxufSJdfQ==