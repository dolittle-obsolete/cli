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
_args2.default.example("dolittle create aggregateroot [name] [namespace]", "Creates an aggregate root with a given name and namespace in the current folder");

_args2.default.parse(process.argv);

if (!_args2.default.sub.length || _args2.default.sub.length < 2) _args2.default.showHelp();

_global2.default.artifactsManager.createAggregateRoot(_args2.default.sub[0], _args2.default.sub[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUtYWdncmVnYXRlcm9vdC5qcyJdLCJuYW1lcyI6WyJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCIsImdsb2JhbCIsImFydGlmYWN0c01hbmFnZXIiLCJjcmVhdGVBZ2dyZWdhdGVSb290Il0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0FBLGVBQ0tDLE9BREwsQ0FDYSxrREFEYixFQUNpRSxpRkFEakU7O0FBR0FELGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkI7O0FBRUEsSUFBSSxDQUFDSixlQUFLSyxHQUFMLENBQVNDLE1BQVYsSUFBb0JOLGVBQUtLLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUExQyxFQUE4Q04sZUFBS08sUUFBTDs7QUFFOUNDLGlCQUFPQyxnQkFBUCxDQUF3QkMsbUJBQXhCLENBQTRDVixlQUFLSyxHQUFMLENBQVMsQ0FBVCxDQUE1QyxFQUF5REwsZUFBS0ssR0FBTCxDQUFTLENBQVQsQ0FBekQiLCJmaWxlIjoiZG9saXR0bGUtY3JlYXRlLWFnZ3JlZ2F0ZXJvb3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5cbmFyZ3NcbiAgICAuZXhhbXBsZShcImRvbGl0dGxlIGNyZWF0ZSBhZ2dyZWdhdGVyb290IFtuYW1lXSBbbmFtZXNwYWNlXVwiLCBcIkNyZWF0ZXMgYW4gYWdncmVnYXRlIHJvb3Qgd2l0aCBhIGdpdmVuIG5hbWUgYW5kIG5hbWVzcGFjZSBpbiB0aGUgY3VycmVudCBmb2xkZXJcIik7XG4gXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbmlmKCAhYXJncy5zdWIubGVuZ3RoIHx8wqBhcmdzLnN1Yi5sZW5ndGggPCAyICkgYXJncy5zaG93SGVscCgpO1xuXG5nbG9iYWwuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVBZ2dyZWdhdGVSb290KGFyZ3Muc3ViWzBdLCBhcmdzLnN1YlsxXSk7Il19