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
var USAGE = 'dolittle create readmodel [name] [namespace]';
_args2.default.example(USAGE, "Creates a read model with a given name and namespace in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle create readmodel' });

if (!_args2.default.sub.length || _args2.default.sub.length < 2) _args2.default.showHelp();

_global2.default.artifactsManager.createReadModel(_args2.default.sub[0], _args2.default.sub[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUtcmVhZG1vZGVsLmpzIl0sIm5hbWVzIjpbIlVTQUdFIiwiYXJncyIsImV4YW1wbGUiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2IiwidmFsdWUiLCJnbG9iYWwiLCJ1c2FnZVByZWZpeCIsIm5hbWUiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCIsImFydGlmYWN0c01hbmFnZXIiLCJjcmVhdGVSZWFkTW9kZWwiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7QUFDQTs7Ozs7O0FBTEE7Ozs7QUFPQSxJQUFNQSxRQUFRLDhDQUFkO0FBQ0FDLGVBQ0tDLE9BREwsQ0FDYUYsS0FEYixFQUNvQiw0RUFEcEI7O0FBR0FDLGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsaUJBQU9DLFdBQVAsR0FBcUJSLEtBQTdCLEVBQW9DUyxNQUFNLDJCQUExQyxFQUF6Qjs7QUFFQSxJQUFJLENBQUNSLGVBQUtTLEdBQUwsQ0FBU0MsTUFBVixJQUFvQlYsZUFBS1MsR0FBTCxDQUFTQyxNQUFULEdBQWtCLENBQTFDLEVBQThDVixlQUFLVyxRQUFMOztBQUU5Q0wsaUJBQU9NLGdCQUFQLENBQXdCQyxlQUF4QixDQUF3Q2IsZUFBS1MsR0FBTCxDQUFTLENBQVQsQ0FBeEMsRUFBcURULGVBQUtTLEdBQUwsQ0FBUyxDQUFULENBQXJEIiwiZmlsZSI6ImRvbGl0dGxlLWNyZWF0ZS1yZWFkbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5cbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIGNyZWF0ZSByZWFkbW9kZWwgW25hbWVdIFtuYW1lc3BhY2VdJztcbmFyZ3NcbiAgICAuZXhhbXBsZShVU0FHRSwgXCJDcmVhdGVzIGEgcmVhZCBtb2RlbCB3aXRoIGEgZ2l2ZW4gbmFtZSBhbmQgbmFtZXNwYWNlIGluIHRoZSBjdXJyZW50IGZvbGRlclwiKTtcbiBcbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IGdsb2JhbC51c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgY3JlYXRlIHJlYWRtb2RlbCd9KTtcblxuaWYoICFhcmdzLnN1Yi5sZW5ndGggfHzCoGFyZ3Muc3ViLmxlbmd0aCA8IDIgKSBhcmdzLnNob3dIZWxwKCk7XG5cbmdsb2JhbC5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZVJlYWRNb2RlbChhcmdzLnN1YlswXSwgYXJncy5zdWJbMV0pOyJdfQ==