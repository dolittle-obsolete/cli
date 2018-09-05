'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigParser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*---------------------------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) Dolittle. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *--------------------------------------------------------------------------------------------*/


var _Config = require('./Config');

var _Cluster = require('./Cluster');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a parser for {config}
 */
var ConfigParser = exports.ConfigParser = function () {
  function ConfigParser() {
    _classCallCheck(this, ConfigParser);
  }

  _createClass(ConfigParser, [{
    key: 'parse',

    /**
     * Parses a JSON from string into a {config} instance
     * @param {string | object} configuration String or object holding configuration
     * @returns {Config}
     */
    value: function parse(configuration) {
      if (typeof configuration == 'undefined') configuration = {};
      if (typeof configuration == 'string') configuration = JSON.parse(configuration);

      var config = new _Config.Config();
      if (configuration.clusters) {
        configuration.clusters.forEach(function (cl) {
          return config.clusters.push(Object.assign(new _Cluster.Cluster(), cl));
        });
      }

      config.current = config.clusters.find(function (cl) {
        return cl.name == configuration.current;
      });

      return config;
    }
  }]);

  return ConfigParser;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL0NvbmZpZ1BhcnNlci5qcyJdLCJuYW1lcyI6WyJDb25maWdQYXJzZXIiLCJjb25maWd1cmF0aW9uIiwiSlNPTiIsInBhcnNlIiwiY29uZmlnIiwiQ29uZmlnIiwiY2x1c3RlcnMiLCJmb3JFYWNoIiwicHVzaCIsIk9iamVjdCIsImFzc2lnbiIsIkNsdXN0ZXIiLCJjbCIsImN1cnJlbnQiLCJmaW5kIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztxakJBQUE7Ozs7OztBQUlBOztBQUNBOzs7O0FBRUE7OztJQUdhQSxZLFdBQUFBLFk7Ozs7Ozs7O0FBQ1Q7Ozs7OzBCQUtNQyxhLEVBQWU7QUFDakIsVUFBSSxPQUFPQSxhQUFQLElBQXdCLFdBQTVCLEVBQXlDQSxnQkFBZ0IsRUFBaEI7QUFDekMsVUFBSSxPQUFPQSxhQUFQLElBQXdCLFFBQTVCLEVBQXNDQSxnQkFBZ0JDLEtBQUtDLEtBQUwsQ0FBV0YsYUFBWCxDQUFoQjs7QUFFdEMsVUFBSUcsU0FBUyxJQUFJQyxjQUFKLEVBQWI7QUFDQSxVQUFJSixjQUFjSyxRQUFsQixFQUE0QjtBQUN4Qkwsc0JBQWNLLFFBQWQsQ0FBdUJDLE9BQXZCLENBQStCO0FBQUEsaUJBQU1ILE9BQU9FLFFBQVAsQ0FBZ0JFLElBQWhCLENBQXFCQyxPQUFPQyxNQUFQLENBQWMsSUFBSUMsZ0JBQUosRUFBZCxFQUEyQkMsRUFBM0IsQ0FBckIsQ0FBTjtBQUFBLFNBQS9CO0FBQ0g7O0FBRURSLGFBQU9TLE9BQVAsR0FBaUJULE9BQU9FLFFBQVAsQ0FBZ0JRLElBQWhCLENBQXFCO0FBQUEsZUFBTUYsR0FBR0csSUFBSCxJQUFXZCxjQUFjWSxPQUEvQjtBQUFBLE9BQXJCLENBQWpCOztBQUVBLGFBQU9ULE1BQVA7QUFDSCIsImZpbGUiOiJDb25maWdQYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuL0NvbmZpZyc7XG5pbXBvcnQgeyBDbHVzdGVyIH0gZnJvbSAnLi9DbHVzdGVyJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcGFyc2VyIGZvciB7Y29uZmlnfVxuICovXG5leHBvcnQgY2xhc3MgQ29uZmlnUGFyc2VyIHtcbiAgICAvKipcbiAgICAgKiBQYXJzZXMgYSBKU09OIGZyb20gc3RyaW5nIGludG8gYSB7Y29uZmlnfSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgb2JqZWN0fSBjb25maWd1cmF0aW9uIFN0cmluZyBvciBvYmplY3QgaG9sZGluZyBjb25maWd1cmF0aW9uXG4gICAgICogQHJldHVybnMge0NvbmZpZ31cbiAgICAgKi9cbiAgICBwYXJzZShjb25maWd1cmF0aW9uKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlndXJhdGlvbiA9PSAndW5kZWZpbmVkJykgY29uZmlndXJhdGlvbiA9IHt9O1xuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZ3VyYXRpb24gPT0gJ3N0cmluZycpIGNvbmZpZ3VyYXRpb24gPSBKU09OLnBhcnNlKGNvbmZpZ3VyYXRpb24pO1xuXG4gICAgICAgIGxldCBjb25maWcgPSBuZXcgQ29uZmlnKCk7XG4gICAgICAgIGlmIChjb25maWd1cmF0aW9uLmNsdXN0ZXJzKSB7XG4gICAgICAgICAgICBjb25maWd1cmF0aW9uLmNsdXN0ZXJzLmZvckVhY2goY2wgPT4gY29uZmlnLmNsdXN0ZXJzLnB1c2goT2JqZWN0LmFzc2lnbihuZXcgQ2x1c3RlciwgY2wpKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcuY3VycmVudCA9IGNvbmZpZy5jbHVzdGVycy5maW5kKGNsID0+IGNsLm5hbWUgPT0gY29uZmlndXJhdGlvbi5jdXJyZW50KTtcblxuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cbn1cbiJdfQ==