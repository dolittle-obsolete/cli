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
var context = {
    name: _args2.default.sub[0],
    destination: process.cwd()
};

_globals2.default.applicationManager.create(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUtYXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiY29udGV4dCIsImRlc3RpbmF0aW9uIiwiY3dkIiwiZ2xvYmFscyIsImFwcGxpY2F0aW9uTWFuYWdlciIsImNyZWF0ZSJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxRQUFRLG9DQUFkOztBQVJBOzs7OztBQVNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0IsMENBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLHVCQUFjUCxLQUF0QixFQUE2QlEsTUFBTSw2QkFBbkMsRUFBekI7O0FBRUEsSUFBSSxDQUFDUCxlQUFLUSxHQUFMLENBQVNDLE1BQWQsRUFBdUJULGVBQUtVLFFBQUw7O0FBRXZCLG9DQUFzQlYsZUFBS1EsR0FBTCxDQUFTLENBQVQsQ0FBdEI7QUFDQSxJQUFJRyxVQUFVO0FBQ1ZKLFVBQU1QLGVBQUtRLEdBQUwsQ0FBUyxDQUFULENBREk7QUFFVkksaUJBQWFULFFBQVFVLEdBQVI7QUFGSCxDQUFkOztBQUtBQyxrQkFBUUMsa0JBQVIsQ0FBMkJDLE1BQTNCLENBQWtDTCxPQUFsQyIsImZpbGUiOiJkb2xpdHRsZS1jcmVhdGUtYXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XHJcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vZ2xvYmFscyc7XHJcbmltcG9ydCB7IHVzYWdlUHJlZml4LCB2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQgfSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgY3JlYXRlIGFwcGxpY2F0aW9uIFtuYW1lXSc7XHJcbmFyZ3NcclxuICAgIC5leGFtcGxlKFVTQUdFLCAnQ3JlYXRlcyBhbiBhcHBsaWNhdGlvbiB3aXRoIGEgZ2l2ZW4gbmFtZScpO1xyXG4gICAgXHJcbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IHVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBjcmVhdGUgYXBwbGljYXRpb24nfSk7XHJcblxyXG5pZiggIWFyZ3Muc3ViLmxlbmd0aCApIGFyZ3Muc2hvd0hlbHAoKTtcclxuXHJcbnZhbGlkYXRlQXJnc05hbWVJbnB1dChhcmdzLnN1YlswXSk7XHJcbmxldCBjb250ZXh0ID0ge1xyXG4gICAgbmFtZTogYXJncy5zdWJbMF0sXHJcbiAgICBkZXN0aW5hdGlvbjogcHJvY2Vzcy5jd2QoKVxyXG59O1xyXG5cclxuZ2xvYmFscy5hcHBsaWNhdGlvbk1hbmFnZXIuY3JlYXRlKGNvbnRleHQpOyJdfQ==