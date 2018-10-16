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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvQXJ0aWZhY3RUZW1wbGF0ZS5qcyJdLCJuYW1lcyI6WyJBcnRpZmFjdFRlbXBsYXRlIiwibmFtZSIsInR5cGUiLCJkZXNjcmlwdGlvbiIsImxhbmd1YWdlIiwiZGVwZW5kZW5jaWVzIiwiaW5jbHVkZWRGaWxlcyIsImxvY2F0aW9uIiwiX25hbWUiLCJfdHlwZSIsIl9kZXNjcmlwdGlvbiIsIl9sYW5ndWFnZSIsIl9kZXBlbmRlbmNpZXMiLCJfaW5jbHVkZWRGaWxlcyIsIl9sb2NhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFLQTs7O0lBR2FBLGdCLFdBQUFBLGdCO0FBRVQsOEJBQWFDLElBQWIsRUFBbUJDLElBQW5CLEVBQXlCQyxXQUF6QixFQUFzQ0MsUUFBdEMsRUFBZ0RDLFlBQWhELEVBQThEQyxhQUE5RCxFQUE2RUMsUUFBN0UsRUFBdUY7QUFBQTs7QUFDbkYsYUFBS0MsS0FBTCxHQUFhUCxJQUFiO0FBQ0EsYUFBS1EsS0FBTCxHQUFhUCxJQUFiO0FBQ0EsYUFBS1EsWUFBTCxHQUFvQlAsV0FBcEI7QUFDQSxhQUFLUSxTQUFMLEdBQWlCUCxRQUFqQjtBQUNBLGFBQUtRLGFBQUwsR0FBcUJQLFlBQXJCO0FBQ0EsYUFBS1EsY0FBTCxHQUFzQlAsYUFBdEI7QUFDQSxhQUFLUSxTQUFMLEdBQWlCUCxRQUFqQjtBQUNIO0FBQ0Q7Ozs7Ozs7NEJBR1c7QUFDUCxtQkFBTyxLQUFLQyxLQUFaO0FBQ0g7QUFDRDs7Ozs7OzRCQUdXO0FBQ1AsbUJBQU8sS0FBS0MsS0FBWjtBQUNIO0FBQ0Q7Ozs7Ozs0QkFHa0I7QUFDZCxtQkFBTyxLQUFLQyxZQUFaO0FBQ0g7QUFDRDs7Ozs7OzRCQUdlO0FBQ1gsbUJBQU8sS0FBS0MsU0FBWjtBQUNIO0FBQ0Q7Ozs7Ozs0QkFHbUI7QUFDZixtQkFBTyxLQUFLQyxhQUFaO0FBQ0g7QUFDRDs7Ozs7OzRCQUdvQjtBQUNoQixtQkFBTyxLQUFLQyxjQUFaO0FBQ0g7QUFDRDs7Ozs7OzRCQUdlO0FBQ1gsbUJBQU8sS0FBS0MsU0FBWjtBQUNIIiwiZmlsZSI6IkFydGlmYWN0VGVtcGxhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICAqIFJlcHJlc2VudHMgYW4gYXJ0aWZhY3QgdGVtcGxhdGVcbiAgKi9cbmV4cG9ydCBjbGFzcyBBcnRpZmFjdFRlbXBsYXRlXG57XG4gICAgY29uc3RydWN0b3IgKG5hbWUsIHR5cGUsIGRlc2NyaXB0aW9uLCBsYW5ndWFnZSwgZGVwZW5kZW5jaWVzLCBpbmNsdWRlZEZpbGVzLCBsb2NhdGlvbikge1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuX2xhbmd1YWdlID0gbGFuZ3VhZ2U7XG4gICAgICAgIHRoaXMuX2RlcGVuZGVuY2llcyA9IGRlcGVuZGVuY2llcztcbiAgICAgICAgdGhpcy5faW5jbHVkZWRGaWxlcyA9IGluY2x1ZGVkRmlsZXM7XG4gICAgICAgIHRoaXMuX2xvY2F0aW9uID0gbG9jYXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG5hbWUgb2YgdGhlIGFydGlmYWN0IHRlbXBsYXRlXG4gICAgICovXG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB0eXBlIG9mIHRoZSBhcnRpZmFjdCB0ZW1wbGF0ZVxuICAgICAqL1xuICAgIGdldCB0eXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIGFydGlmYWN0IHRlbXBsYXRlXG4gICAgICovXG4gICAgZ2V0IGRlc2NyaXB0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2dyYW1taW5nIGxhbmd1YWdlIG9mIHRoZSBhcnRpZmFjdCB0aGlzIGlzIGEgdGVtcGxhdGUgZm9yXG4gICAgICovXG4gICAgZ2V0IGxhbmd1YWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFuZ3VhZ2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRlcGVuZGVuY2llcyBvZiB0aGUgdGVtcGxhdGVcbiAgICAgKi9cbiAgICBnZXQgZGVwZW5kZW5jaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVwZW5kZW5jaWVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBsaXN0IG9mIGZpbGVzIHRoYXQgbmVlZHMgdG8gYmUgdGVtcGxhdGVkXG4gICAgICovXG4gICAgZ2V0IGluY2x1ZGVkRmlsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmNsdWRlZEZpbGVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBmaWxlIGxvY2F0aW9uIG9mIHRoZVxuICAgICAqL1xuICAgIGdldCBsb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uO1xuICAgIH1cbn0iXX0=