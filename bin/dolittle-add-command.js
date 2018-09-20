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
var USAGE = 'dolittle add command [name]';
_args2.default.example(USAGE, "Creates a command in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add command' });

if (!_args2.default.sub.length || _args2.default.sub.length < 2) _args2.default.showHelp();

var flags = { language: _args2.default.sub[0], name: _args2.default.sub[1] };
_global2.default.artifactsManager.createCommand(flags);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtY29tbWFuZC5qcyJdLCJuYW1lcyI6WyJVU0FHRSIsImFyZ3MiLCJleGFtcGxlIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInZhbHVlIiwiZ2xvYmFsIiwidXNhZ2VQcmVmaXgiLCJuYW1lIiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiLCJmbGFncyIsImxhbmd1YWdlIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZUNvbW1hbmQiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7QUFDQTs7Ozs7O0FBTEE7Ozs7QUFPQSxJQUFNQSxRQUFRLDZCQUFkO0FBQ0FDLGVBQ0tDLE9BREwsQ0FDYUYsS0FEYixFQUNvQix5Q0FEcEI7O0FBR0FDLGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsaUJBQU9DLFdBQVAsR0FBcUJSLEtBQTdCLEVBQW9DUyxNQUFNLHNCQUExQyxFQUF6Qjs7QUFFQSxJQUFJLENBQUVSLGVBQUtTLEdBQUwsQ0FBU0MsTUFBWCxJQUFxQlYsZUFBS1MsR0FBTCxDQUFTQyxNQUFULEdBQWtCLENBQTNDLEVBQThDVixlQUFLVyxRQUFMOztBQUU5QyxJQUFJQyxRQUFRLEVBQUNDLFVBQVViLGVBQUtTLEdBQUwsQ0FBUyxDQUFULENBQVgsRUFBd0JELE1BQU1SLGVBQUtTLEdBQUwsQ0FBUyxDQUFULENBQTlCLEVBQVo7QUFDQUgsaUJBQU9RLGdCQUFQLENBQXdCQyxhQUF4QixDQUFzQ0gsS0FBdEMiLCJmaWxlIjoiZG9saXR0bGUtYWRkLWNvbW1hbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5cbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIGFkZCBjb21tYW5kIFtuYW1lXSc7XG5hcmdzXG4gICAgLmV4YW1wbGUoVVNBR0UsIFwiQ3JlYXRlcyBhIGNvbW1hbmQgaW4gdGhlIGN1cnJlbnQgZm9sZGVyXCIpO1xuIFxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogZ2xvYmFsLnVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBhZGQgY29tbWFuZCd9KTtcblxuaWYgKCEgYXJncy5zdWIubGVuZ3RoIHx8IGFyZ3Muc3ViLmxlbmd0aCA8IDIpIGFyZ3Muc2hvd0hlbHAoKTtcblxubGV0IGZsYWdzID0ge2xhbmd1YWdlOiBhcmdzLnN1YlswXSwgbmFtZTogYXJncy5zdWJbMV19OyBcbmdsb2JhbC5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZUNvbW1hbmQoZmxhZ3MpOyJdfQ==