#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle add commandhandler [name]';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.example(USAGE, 'Creates a command handler in the current folder');

_args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle add commandhandler' });

if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

(0, _helpers.validateArgsNameInput)(_args2.default.sub[0]);
var context = {
  artifactName: _args2.default.sub[0],
  artifactType: 'commandHandler',
  destination: process.cwd()
};

_globals2.default.artifactsManager.createArtifact(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtY29tbWFuZGhhbmRsZXIuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiY29udGV4dCIsImFydGlmYWN0TmFtZSIsImFydGlmYWN0VHlwZSIsImRlc3RpbmF0aW9uIiwiY3dkIiwiZ2xvYmFscyIsImFydGlmYWN0c01hbmFnZXIiLCJjcmVhdGVBcnRpZmFjdCJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxRQUFRLG9DQUFkOztBQVJBOzs7OztBQVNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0IsaURBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLHVCQUFjUCxLQUF0QixFQUE2QlEsTUFBTSw2QkFBbkMsRUFBekI7O0FBRUEsSUFBSSxDQUFFUCxlQUFLUSxHQUFMLENBQVNDLE1BQVgsSUFBcUJULGVBQUtRLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUEzQyxFQUE4Q1QsZUFBS1UsUUFBTDs7QUFFOUMsb0NBQXNCVixlQUFLUSxHQUFMLENBQVMsQ0FBVCxDQUF0QjtBQUNBLElBQUlHLFVBQVU7QUFDVkMsZ0JBQWNaLGVBQUtRLEdBQUwsQ0FBUyxDQUFULENBREo7QUFFVkssZ0JBQWMsZ0JBRko7QUFHVkMsZUFBYVgsUUFBUVksR0FBUjtBQUhILENBQWQ7O0FBTUFDLGtCQUFRQyxnQkFBUixDQUF5QkMsY0FBekIsQ0FBd0NQLE9BQXhDIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC1jb21tYW5kaGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vZ2xvYmFscyc7XG5pbXBvcnQgeyB1c2FnZVByZWZpeCwgdmFsaWRhdGVBcmdzTmFtZUlucHV0IH0gZnJvbSAnLi9oZWxwZXJzJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIGNvbW1hbmRoYW5kbGVyIFtuYW1lXSc7XG5hcmdzXG4gICAgLmV4YW1wbGUoVVNBR0UsICdDcmVhdGVzIGEgY29tbWFuZCBoYW5kbGVyIGluIHRoZSBjdXJyZW50IGZvbGRlcicpO1xuIFxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogdXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGFkZCBjb21tYW5kaGFuZGxlcid9KTtcblxuaWYgKCEgYXJncy5zdWIubGVuZ3RoIHx8IGFyZ3Muc3ViLmxlbmd0aCA8IDEpIGFyZ3Muc2hvd0hlbHAoKTtcblxudmFsaWRhdGVBcmdzTmFtZUlucHV0KGFyZ3Muc3ViWzBdKTtcbmxldCBjb250ZXh0ID0ge1xuICAgIGFydGlmYWN0TmFtZTogYXJncy5zdWJbMF0sIFxuICAgIGFydGlmYWN0VHlwZTogJ2NvbW1hbmRIYW5kbGVyJyxcbiAgICBkZXN0aW5hdGlvbjogcHJvY2Vzcy5jd2QoKVxufTtcblxuZ2xvYmFscy5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZUFydGlmYWN0KGNvbnRleHQpO1xuIl19