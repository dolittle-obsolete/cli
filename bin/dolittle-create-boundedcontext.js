#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle create boundedcontext [name]';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.example(USAGE, 'Creates a bounded context with a given name');

_args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle create boundedcontext' });

if (!_args2.default.sub.length) _args2.default.showHelp();

(0, _helpers.validateArgsNameInput)(_args2.default.sub[0]);
var context = {
    name: _args2.default.sub[0],
    destination: process.cwd()
};

_globals2.default.boundedContextManager.create(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUtYm91bmRlZGNvbnRleHQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiY29udGV4dCIsImRlc3RpbmF0aW9uIiwiY3dkIiwiZ2xvYmFscyIsImJvdW5kZWRDb250ZXh0TWFuYWdlciIsImNyZWF0ZSJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxRQUFRLHVDQUFkOztBQVJBOzs7OztBQVNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0IsNkNBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLHVCQUFjUCxLQUF0QixFQUE2QlEsTUFBTSxnQ0FBbkMsRUFBekI7O0FBRUEsSUFBSSxDQUFDUCxlQUFLUSxHQUFMLENBQVNDLE1BQWQsRUFBdUJULGVBQUtVLFFBQUw7O0FBR3ZCLG9DQUFzQlYsZUFBS1EsR0FBTCxDQUFTLENBQVQsQ0FBdEI7QUFDQSxJQUFJRyxVQUFVO0FBQ1ZKLFVBQU1QLGVBQUtRLEdBQUwsQ0FBUyxDQUFULENBREk7QUFFVkksaUJBQWFULFFBQVFVLEdBQVI7QUFGSCxDQUFkOztBQUtBQyxrQkFBUUMscUJBQVIsQ0FBOEJDLE1BQTlCLENBQXFDTCxPQUFyQyIsImZpbGUiOiJkb2xpdHRsZS1jcmVhdGUtYm91bmRlZGNvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XHJcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vZ2xvYmFscyc7XHJcbmltcG9ydCB7IHVzYWdlUHJlZml4LCB2YWxpZGF0ZUFyZ3NOYW1lSW5wdXR9IGZyb20gJy4vaGVscGVycyc7XHJcblxyXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBjcmVhdGUgYm91bmRlZGNvbnRleHQgW25hbWVdJztcclxuYXJnc1xyXG4gICAgLmV4YW1wbGUoVVNBR0UsICdDcmVhdGVzIGEgYm91bmRlZCBjb250ZXh0IHdpdGggYSBnaXZlbiBuYW1lJyk7XHJcbiAgICBcclxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogdXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGNyZWF0ZSBib3VuZGVkY29udGV4dCd9KTtcclxuXHJcbmlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpO1xyXG5cclxuXHJcbnZhbGlkYXRlQXJnc05hbWVJbnB1dChhcmdzLnN1YlswXSk7XHJcbmxldCBjb250ZXh0ID0ge1xyXG4gICAgbmFtZTogYXJncy5zdWJbMF0sXHJcbiAgICBkZXN0aW5hdGlvbjogcHJvY2Vzcy5jd2QoKVxyXG59O1xyXG5cclxuZ2xvYmFscy5ib3VuZGVkQ29udGV4dE1hbmFnZXIuY3JlYXRlKGNvbnRleHQpOyJdfQ==