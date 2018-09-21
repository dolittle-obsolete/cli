#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _global = require('./global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var USAGE = 'dolittle add readmodel [name]';
_args2.default.example(USAGE, "Creates a read model in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add readmodel' });
if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

var flags = { name: _args2.default.sub[0] };
_global2.default.artifactsManager.createReadModel(flags);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtcmVhZG1vZGVsLmpzIl0sIm5hbWVzIjpbIlVTQUdFIiwiYXJncyIsImV4YW1wbGUiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2IiwidmFsdWUiLCJnbG9iYWwiLCJ1c2FnZVByZWZpeCIsIm5hbWUiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCIsImZsYWdzIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZVJlYWRNb2RlbCJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7OztBQUNBOzs7Ozs7QUFMQTs7OztBQU9BLElBQU1BLFFBQVEsK0JBQWQ7QUFDQUMsZUFDS0MsT0FETCxDQUNhRixLQURiLEVBQ29CLDRDQURwQjs7QUFHQUMsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQixFQUF5QixFQUFDQyxPQUFPQyxpQkFBT0MsV0FBUCxHQUFxQlIsS0FBN0IsRUFBb0NTLE1BQU0sd0JBQTFDLEVBQXpCO0FBQ0EsSUFBSSxDQUFFUixlQUFLUyxHQUFMLENBQVNDLE1BQVgsSUFBcUJWLGVBQUtTLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUEzQyxFQUE4Q1YsZUFBS1csUUFBTDs7QUFFOUMsSUFBSUMsUUFBUSxFQUFDSixNQUFNUixlQUFLUyxHQUFMLENBQVMsQ0FBVCxDQUFQLEVBQVo7QUFDQUgsaUJBQU9PLGdCQUFQLENBQXdCQyxlQUF4QixDQUF3Q0YsS0FBeEMiLCJmaWxlIjoiZG9saXR0bGUtYWRkLXJlYWRtb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIHJlYWRtb2RlbCBbbmFtZV0nO1xuYXJnc1xuICAgIC5leGFtcGxlKFVTQUdFLCBcIkNyZWF0ZXMgYSByZWFkIG1vZGVsIGluIHRoZSBjdXJyZW50IGZvbGRlclwiKTtcblxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogZ2xvYmFsLnVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBhZGQgcmVhZG1vZGVsJ30pO1xuaWYgKCEgYXJncy5zdWIubGVuZ3RoIHx8IGFyZ3Muc3ViLmxlbmd0aCA8IDEpIGFyZ3Muc2hvd0hlbHAoKTtcblxubGV0IGZsYWdzID0ge25hbWU6IGFyZ3Muc3ViWzBdfTsgXG5nbG9iYWwuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVSZWFkTW9kZWwoZmxhZ3MpOyJdfQ==