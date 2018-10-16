#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle create application [name]';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.example(USAGE, 'Creates an application with a given name');

_args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle create application' });

if (!_args2.default.sub.length) _args2.default.showHelp();

(0, _helpers.validateArgsNameInput)(_args2.default.sub[0]);
_globals2.default.applicationManager.create(_args2.default.sub[0]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUtYXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiZ2xvYmFscyIsImFwcGxpY2F0aW9uTWFuYWdlciIsImNyZWF0ZSJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxRQUFRLG9DQUFkOztBQVJBOzs7OztBQVNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0IsMENBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLHVCQUFjUCxLQUF0QixFQUE2QlEsTUFBTSw2QkFBbkMsRUFBekI7O0FBRUEsSUFBSSxDQUFDUCxlQUFLUSxHQUFMLENBQVNDLE1BQWQsRUFBdUJULGVBQUtVLFFBQUw7O0FBRXZCLG9DQUFzQlYsZUFBS1EsR0FBTCxDQUFTLENBQVQsQ0FBdEI7QUFDQUcsa0JBQVFDLGtCQUFSLENBQTJCQyxNQUEzQixDQUFrQ2IsZUFBS1EsR0FBTCxDQUFTLENBQVQsQ0FBbEMiLCJmaWxlIjoiZG9saXR0bGUtY3JlYXRlLWFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuaW1wb3J0IGdsb2JhbHMgZnJvbSAnLi9nbG9iYWxzJztcbmltcG9ydCB7IHVzYWdlUHJlZml4LCB2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBjcmVhdGUgYXBwbGljYXRpb24gW25hbWVdJztcbmFyZ3NcbiAgICAuZXhhbXBsZShVU0FHRSwgJ0NyZWF0ZXMgYW4gYXBwbGljYXRpb24gd2l0aCBhIGdpdmVuIG5hbWUnKTtcbiAgICBcbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IHVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBjcmVhdGUgYXBwbGljYXRpb24nfSk7XG5cbmlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpO1xuXG52YWxpZGF0ZUFyZ3NOYW1lSW5wdXQoYXJncy5zdWJbMF0pO1xuZ2xvYmFscy5hcHBsaWNhdGlvbk1hbmFnZXIuY3JlYXRlKGFyZ3Muc3ViWzBdKTsiXX0=