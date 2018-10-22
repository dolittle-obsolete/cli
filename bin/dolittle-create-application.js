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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUtYXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiY29udGV4dCIsImRlc3RpbmF0aW9uIiwiY3dkIiwiZ2xvYmFscyIsImFwcGxpY2F0aW9uTWFuYWdlciIsImNyZWF0ZSJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxRQUFRLG9DQUFkOztBQVJBOzs7OztBQVNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0IsMENBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLHVCQUFjUCxLQUF0QixFQUE2QlEsTUFBTSw2QkFBbkMsRUFBekI7O0FBRUEsSUFBSSxDQUFDUCxlQUFLUSxHQUFMLENBQVNDLE1BQWQsRUFBdUJULGVBQUtVLFFBQUw7O0FBRXZCLG9DQUFzQlYsZUFBS1EsR0FBTCxDQUFTLENBQVQsQ0FBdEI7QUFDQSxJQUFJRyxVQUFVO0FBQ1ZKLFVBQU1QLGVBQUtRLEdBQUwsQ0FBUyxDQUFULENBREk7QUFFVkksaUJBQWFULFFBQVFVLEdBQVI7QUFGSCxDQUFkOztBQUtBQyxrQkFBUUMsa0JBQVIsQ0FBMkJDLE1BQTNCLENBQWtDTCxPQUFsQyIsImZpbGUiOiJkb2xpdHRsZS1jcmVhdGUtYXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFscyBmcm9tICcuL2dsb2JhbHMnO1xuaW1wb3J0IHsgdXNhZ2VQcmVmaXgsIHZhbGlkYXRlQXJnc05hbWVJbnB1dCB9IGZyb20gJy4vaGVscGVycyc7XG5cbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIGNyZWF0ZSBhcHBsaWNhdGlvbiBbbmFtZV0nO1xuYXJnc1xuICAgIC5leGFtcGxlKFVTQUdFLCAnQ3JlYXRlcyBhbiBhcHBsaWNhdGlvbiB3aXRoIGEgZ2l2ZW4gbmFtZScpO1xuICAgIFxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogdXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGNyZWF0ZSBhcHBsaWNhdGlvbid9KTtcblxuaWYoICFhcmdzLnN1Yi5sZW5ndGggKSBhcmdzLnNob3dIZWxwKCk7XG5cbnZhbGlkYXRlQXJnc05hbWVJbnB1dChhcmdzLnN1YlswXSk7XG5sZXQgY29udGV4dCA9IHtcbiAgICBuYW1lOiBhcmdzLnN1YlswXSxcbiAgICBkZXN0aW5hdGlvbjogcHJvY2Vzcy5jd2QoKVxufTtcblxuZ2xvYmFscy5hcHBsaWNhdGlvbk1hbmFnZXIuY3JlYXRlKGNvbnRleHQpOyJdfQ==