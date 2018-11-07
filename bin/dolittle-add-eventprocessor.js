#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle add eventprocessor [name]';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.example(USAGE, 'Creates an event processor in the current folder');

_args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle add eventprocessor' });

if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

(0, _helpers.validateArgsNameInput)(_args2.default.sub[0]);
var context = {
  artifactName: _args2.default.sub[0],
  artifactType: 'eventProcessor',
  destination: process.cwd()
};

_globals2.default.artifactsManager.createArtifact(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtZXZlbnRwcm9jZXNzb3IuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiY29udGV4dCIsImFydGlmYWN0TmFtZSIsImFydGlmYWN0VHlwZSIsImRlc3RpbmF0aW9uIiwiY3dkIiwiZ2xvYmFscyIsImFydGlmYWN0c01hbmFnZXIiLCJjcmVhdGVBcnRpZmFjdCJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxRQUFRLG9DQUFkOztBQVJBOzs7OztBQVNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0Isa0RBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLHVCQUFjUCxLQUF0QixFQUE2QlEsTUFBTSw2QkFBbkMsRUFBekI7O0FBRUEsSUFBSSxDQUFFUCxlQUFLUSxHQUFMLENBQVNDLE1BQVgsSUFBcUJULGVBQUtRLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUEzQyxFQUE4Q1QsZUFBS1UsUUFBTDs7QUFFOUMsb0NBQXNCVixlQUFLUSxHQUFMLENBQVMsQ0FBVCxDQUF0QjtBQUNBLElBQUlHLFVBQVU7QUFDVkMsZ0JBQWNaLGVBQUtRLEdBQUwsQ0FBUyxDQUFULENBREo7QUFFVkssZ0JBQWMsZ0JBRko7QUFHVkMsZUFBYVgsUUFBUVksR0FBUjtBQUhILENBQWQ7O0FBTUFDLGtCQUFRQyxnQkFBUixDQUF5QkMsY0FBekIsQ0FBd0NQLE9BQXhDIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC1ldmVudHByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vZ2xvYmFscyc7XG5pbXBvcnQgeyB1c2FnZVByZWZpeCwgdmFsaWRhdGVBcmdzTmFtZUlucHV0IH0gZnJvbSAnLi9oZWxwZXJzJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIGV2ZW50cHJvY2Vzc29yIFtuYW1lXSc7XG5hcmdzXG4gICAgLmV4YW1wbGUoVVNBR0UsICdDcmVhdGVzIGFuIGV2ZW50IHByb2Nlc3NvciBpbiB0aGUgY3VycmVudCBmb2xkZXInKTtcbiBcbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IHVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBhZGQgZXZlbnRwcm9jZXNzb3InfSk7XG5cbmlmICghIGFyZ3Muc3ViLmxlbmd0aCB8fCBhcmdzLnN1Yi5sZW5ndGggPCAxKSBhcmdzLnNob3dIZWxwKCk7XG5cbnZhbGlkYXRlQXJnc05hbWVJbnB1dChhcmdzLnN1YlswXSk7XG5sZXQgY29udGV4dCA9IHtcbiAgICBhcnRpZmFjdE5hbWU6IGFyZ3Muc3ViWzBdLCBcbiAgICBhcnRpZmFjdFR5cGU6ICdldmVudFByb2Nlc3NvcicsXG4gICAgZGVzdGluYXRpb246IHByb2Nlc3MuY3dkKClcbn07XG5cbmdsb2JhbHMuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVBcnRpZmFjdChjb250ZXh0KTtcbiJdfQ==