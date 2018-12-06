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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL0NvbmZpZ1BhcnNlci5qcyJdLCJuYW1lcyI6WyJDb25maWdQYXJzZXIiLCJjb25maWd1cmF0aW9uIiwiSlNPTiIsInBhcnNlIiwiY29uZmlnIiwiQ29uZmlnIiwiY2x1c3RlcnMiLCJmb3JFYWNoIiwicHVzaCIsIk9iamVjdCIsImFzc2lnbiIsIkNsdXN0ZXIiLCJjbCIsImN1cnJlbnQiLCJmaW5kIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7Ozs7QUFFQTs7O0FBUEE7Ozs7SUFVYUEsWSxXQUFBQSxZOzs7Ozs7OztBQUNUOzs7OzswQkFLTUMsYSxFQUFlO0FBQ2pCLFVBQUksT0FBT0EsYUFBUCxJQUF3QixXQUE1QixFQUF5Q0EsZ0JBQWdCLEVBQWhCO0FBQ3pDLFVBQUksT0FBT0EsYUFBUCxJQUF3QixRQUE1QixFQUFzQ0EsZ0JBQWdCQyxLQUFLQyxLQUFMLENBQVdGLGFBQVgsQ0FBaEI7O0FBRXRDLFVBQUlHLFNBQVMsSUFBSUMsY0FBSixFQUFiO0FBQ0EsVUFBSUosY0FBY0ssUUFBbEIsRUFBNEI7QUFDeEJMLHNCQUFjSyxRQUFkLENBQXVCQyxPQUF2QixDQUErQjtBQUFBLGlCQUFNSCxPQUFPRSxRQUFQLENBQWdCRSxJQUFoQixDQUFxQkMsT0FBT0MsTUFBUCxDQUFjLElBQUlDLGdCQUFKLEVBQWQsRUFBMkJDLEVBQTNCLENBQXJCLENBQU47QUFBQSxTQUEvQjtBQUNIOztBQUVEUixhQUFPUyxPQUFQLEdBQWlCVCxPQUFPRSxRQUFQLENBQWdCUSxJQUFoQixDQUFxQjtBQUFBLGVBQU1GLEdBQUdHLElBQUgsSUFBV2QsY0FBY1ksT0FBL0I7QUFBQSxPQUFyQixDQUFqQjs7QUFFQSxhQUFPVCxNQUFQO0FBQ0giLCJmaWxlIjoiQ29uZmlnUGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9Db25maWcnO1xuaW1wb3J0IHsgQ2x1c3RlciB9IGZyb20gJy4vQ2x1c3Rlcic7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHBhcnNlciBmb3Ige2NvbmZpZ31cbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZ1BhcnNlciB7XG4gICAgLyoqXG4gICAgICogUGFyc2VzIGEgSlNPTiBmcm9tIHN0cmluZyBpbnRvIGEge2NvbmZpZ30gaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG9iamVjdH0gY29uZmlndXJhdGlvbiBTdHJpbmcgb3Igb2JqZWN0IGhvbGRpbmcgY29uZmlndXJhdGlvblxuICAgICAqIEByZXR1cm5zIHtDb25maWd9XG4gICAgICovXG4gICAgcGFyc2UoY29uZmlndXJhdGlvbikge1xuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZ3VyYXRpb24gPT0gJ3VuZGVmaW5lZCcpIGNvbmZpZ3VyYXRpb24gPSB7fTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWd1cmF0aW9uID09ICdzdHJpbmcnKSBjb25maWd1cmF0aW9uID0gSlNPTi5wYXJzZShjb25maWd1cmF0aW9uKTtcblxuICAgICAgICBsZXQgY29uZmlnID0gbmV3IENvbmZpZygpO1xuICAgICAgICBpZiAoY29uZmlndXJhdGlvbi5jbHVzdGVycykge1xuICAgICAgICAgICAgY29uZmlndXJhdGlvbi5jbHVzdGVycy5mb3JFYWNoKGNsID0+IGNvbmZpZy5jbHVzdGVycy5wdXNoKE9iamVjdC5hc3NpZ24obmV3IENsdXN0ZXIsIGNsKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnLmN1cnJlbnQgPSBjb25maWcuY2x1c3RlcnMuZmluZChjbCA9PiBjbC5uYW1lID09IGNvbmZpZ3VyYXRpb24uY3VycmVudCk7XG5cbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG59XG4iXX0=