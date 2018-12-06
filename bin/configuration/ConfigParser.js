'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigParser = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Config = require('./Config');

var _Cluster = require('./Cluster');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Represents a parser for {config}
 */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var ConfigParser = exports.ConfigParser = function () {
  function ConfigParser() {
    (0, _classCallCheck3.default)(this, ConfigParser);
  }

  (0, _createClass3.default)(ConfigParser, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL0NvbmZpZ1BhcnNlci5qcyJdLCJuYW1lcyI6WyJDb25maWdQYXJzZXIiLCJjb25maWd1cmF0aW9uIiwiSlNPTiIsInBhcnNlIiwiY29uZmlnIiwiQ29uZmlnIiwiY2x1c3RlcnMiLCJmb3JFYWNoIiwicHVzaCIsIk9iamVjdCIsImFzc2lnbiIsIkNsdXN0ZXIiLCJjbCIsImN1cnJlbnQiLCJmaW5kIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7Ozs7QUFFQTs7O0FBUEE7Ozs7SUFVYUEsWSxXQUFBQSxZOzs7Ozs7OztBQUNUOzs7OzswQkFLTUMsYSxFQUFlO0FBQ2pCLFVBQUksT0FBT0EsYUFBUCxJQUF3QixXQUE1QixFQUF5Q0EsZ0JBQWdCLEVBQWhCO0FBQ3pDLFVBQUksT0FBT0EsYUFBUCxJQUF3QixRQUE1QixFQUFzQ0EsZ0JBQWdCQyxLQUFLQyxLQUFMLENBQVdGLGFBQVgsQ0FBaEI7O0FBRXRDLFVBQUlHLFNBQVMsSUFBSUMsY0FBSixFQUFiO0FBQ0EsVUFBSUosY0FBY0ssUUFBbEIsRUFBNEI7QUFDeEJMLHNCQUFjSyxRQUFkLENBQXVCQyxPQUF2QixDQUErQjtBQUFBLGlCQUFNSCxPQUFPRSxRQUFQLENBQWdCRSxJQUFoQixDQUFxQkMsT0FBT0MsTUFBUCxDQUFjLElBQUlDLGdCQUFKLEVBQWQsRUFBMkJDLEVBQTNCLENBQXJCLENBQU47QUFBQSxTQUEvQjtBQUNIOztBQUVEUixhQUFPUyxPQUFQLEdBQWlCVCxPQUFPRSxRQUFQLENBQWdCUSxJQUFoQixDQUFxQjtBQUFBLGVBQU1GLEdBQUdHLElBQUgsSUFBV2QsY0FBY1ksT0FBL0I7QUFBQSxPQUFyQixDQUFqQjs7QUFFQSxhQUFPVCxNQUFQO0FBQ0giLCJmaWxlIjoiQ29uZmlnUGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuL0NvbmZpZyc7XHJcbmltcG9ydCB7IENsdXN0ZXIgfSBmcm9tICcuL0NsdXN0ZXInO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBwYXJzZXIgZm9yIHtjb25maWd9XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlnUGFyc2VyIHtcclxuICAgIC8qKlxyXG4gICAgICogUGFyc2VzIGEgSlNPTiBmcm9tIHN0cmluZyBpbnRvIGEge2NvbmZpZ30gaW5zdGFuY2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgb2JqZWN0fSBjb25maWd1cmF0aW9uIFN0cmluZyBvciBvYmplY3QgaG9sZGluZyBjb25maWd1cmF0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7Q29uZmlnfVxyXG4gICAgICovXHJcbiAgICBwYXJzZShjb25maWd1cmF0aW9uKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWd1cmF0aW9uID09ICd1bmRlZmluZWQnKSBjb25maWd1cmF0aW9uID0ge307XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWd1cmF0aW9uID09ICdzdHJpbmcnKSBjb25maWd1cmF0aW9uID0gSlNPTi5wYXJzZShjb25maWd1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBDb25maWcoKTtcclxuICAgICAgICBpZiAoY29uZmlndXJhdGlvbi5jbHVzdGVycykge1xyXG4gICAgICAgICAgICBjb25maWd1cmF0aW9uLmNsdXN0ZXJzLmZvckVhY2goY2wgPT4gY29uZmlnLmNsdXN0ZXJzLnB1c2goT2JqZWN0LmFzc2lnbihuZXcgQ2x1c3RlciwgY2wpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25maWcuY3VycmVudCA9IGNvbmZpZy5jbHVzdGVycy5maW5kKGNsID0+IGNsLm5hbWUgPT0gY29uZmlndXJhdGlvbi5jdXJyZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH1cclxufVxyXG4iXX0=