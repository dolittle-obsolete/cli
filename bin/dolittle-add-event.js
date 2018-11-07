#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle add event [name]';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.example(USAGE, 'Creates an event in the current folder');

_args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle add event' });

if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

(0, _helpers.validateArgsNameInput)(_args2.default.sub[0]);
var context = {
  artifactName: _args2.default.sub[0],
  artifactType: 'event',
  destination: process.cwd()
};

_globals2.default.artifactsManager.createArtifact(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtZXZlbnQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiY29udGV4dCIsImFydGlmYWN0TmFtZSIsImFydGlmYWN0VHlwZSIsImRlc3RpbmF0aW9uIiwiY3dkIiwiZ2xvYmFscyIsImFydGlmYWN0c01hbmFnZXIiLCJjcmVhdGVBcnRpZmFjdCJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxRQUFRLDJCQUFkOztBQVJBOzs7OztBQVNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0Isd0NBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLHVCQUFjUCxLQUF0QixFQUE2QlEsTUFBTSxvQkFBbkMsRUFBekI7O0FBRUEsSUFBSSxDQUFFUCxlQUFLUSxHQUFMLENBQVNDLE1BQVgsSUFBcUJULGVBQUtRLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUEzQyxFQUE4Q1QsZUFBS1UsUUFBTDs7QUFFOUMsb0NBQXNCVixlQUFLUSxHQUFMLENBQVMsQ0FBVCxDQUF0QjtBQUNBLElBQUlHLFVBQVU7QUFDVkMsZ0JBQWNaLGVBQUtRLEdBQUwsQ0FBUyxDQUFULENBREo7QUFFVkssZ0JBQWMsT0FGSjtBQUdWQyxlQUFhWCxRQUFRWSxHQUFSO0FBSEgsQ0FBZDs7QUFNQUMsa0JBQVFDLGdCQUFSLENBQXlCQyxjQUF6QixDQUF3Q1AsT0FBeEMiLCJmaWxlIjoiZG9saXR0bGUtYWRkLWV2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuaW1wb3J0IGdsb2JhbHMgZnJvbSAnLi9nbG9iYWxzJztcbmltcG9ydCB7IHVzYWdlUHJlZml4LCB2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBhZGQgZXZlbnQgW25hbWVdJztcbmFyZ3NcbiAgICAuZXhhbXBsZShVU0FHRSwgJ0NyZWF0ZXMgYW4gZXZlbnQgaW4gdGhlIGN1cnJlbnQgZm9sZGVyJyk7XG4gXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwge3ZhbHVlOiB1c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgYWRkIGV2ZW50J30pO1xuXG5pZiAoISBhcmdzLnN1Yi5sZW5ndGggfHwgYXJncy5zdWIubGVuZ3RoIDwgMSkgYXJncy5zaG93SGVscCgpO1xuXG52YWxpZGF0ZUFyZ3NOYW1lSW5wdXQoYXJncy5zdWJbMF0pO1xubGV0IGNvbnRleHQgPSB7XG4gICAgYXJ0aWZhY3ROYW1lOiBhcmdzLnN1YlswXSwgXG4gICAgYXJ0aWZhY3RUeXBlOiAnZXZlbnQnLFxuICAgIGRlc3RpbmF0aW9uOiBwcm9jZXNzLmN3ZCgpXG59O1xuXG5nbG9iYWxzLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlQXJ0aWZhY3QoY29udGV4dCk7XG4iXX0=