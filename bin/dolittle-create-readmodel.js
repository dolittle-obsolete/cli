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
_args2.default.example("dolittle create readmodel [name] [namespace]", "Creates a read model with a given name and namespace in the current folder");

_args2.default.parse(process.argv);

if (!_args2.default.sub.length || _args2.default.sub.length < 2) _args2.default.showHelp();

_global2.default.artifactsManager.createReadModel(_args2.default.sub[0], _args2.default.sub[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUtcmVhZG1vZGVsLmpzIl0sIm5hbWVzIjpbImFyZ3MiLCJleGFtcGxlIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiZ2xvYmFsIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZVJlYWRNb2RlbCJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7OztBQUNBOzs7Ozs7QUFMQTs7OztBQU9BQSxlQUNLQyxPQURMLENBQ2EsOENBRGIsRUFDNkQsNEVBRDdEOztBQUdBRCxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5COztBQUVBLElBQUksQ0FBQ0osZUFBS0ssR0FBTCxDQUFTQyxNQUFWLElBQW9CTixlQUFLSyxHQUFMLENBQVNDLE1BQVQsR0FBa0IsQ0FBMUMsRUFBOENOLGVBQUtPLFFBQUw7O0FBRTlDQyxpQkFBT0MsZ0JBQVAsQ0FBd0JDLGVBQXhCLENBQXdDVixlQUFLSyxHQUFMLENBQVMsQ0FBVCxDQUF4QyxFQUFxREwsZUFBS0ssR0FBTCxDQUFTLENBQVQsQ0FBckQiLCJmaWxlIjoiZG9saXR0bGUtY3JlYXRlLXJlYWRtb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcblxuYXJnc1xuICAgIC5leGFtcGxlKFwiZG9saXR0bGUgY3JlYXRlIHJlYWRtb2RlbCBbbmFtZV0gW25hbWVzcGFjZV1cIiwgXCJDcmVhdGVzIGEgcmVhZCBtb2RlbCB3aXRoIGEgZ2l2ZW4gbmFtZSBhbmQgbmFtZXNwYWNlIGluIHRoZSBjdXJyZW50IGZvbGRlclwiKTtcbiBcbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2KTtcblxuaWYoICFhcmdzLnN1Yi5sZW5ndGggfHzCoGFyZ3Muc3ViLmxlbmd0aCA8IDIgKSBhcmdzLnNob3dIZWxwKCk7XG5cbmdsb2JhbC5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZVJlYWRNb2RlbChhcmdzLnN1YlswXSwgYXJncy5zdWJbMV0pOyJdfQ==