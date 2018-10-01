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
var USAGE = 'dolittle create boundedcontext [name]';
_args2.default.example(USAGE, "Creates a bounded context with a given name");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle create boundedcontext' });

if (!_args2.default.sub.length) _args2.default.showHelp();

_global2.default.validateArgsNameInput(_args2.default.sub[0]);
var context = {
    name: _args2.default.sub[0],
    destination: process.cwd()
};

_global2.default.boundedContextManager.create(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUtYm91bmRlZGNvbnRleHQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwidmFsaWRhdGVBcmdzTmFtZUlucHV0IiwiY29udGV4dCIsImRlc3RpbmF0aW9uIiwiY3dkIiwiYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiY3JlYXRlIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0EsSUFBTUEsUUFBUSx1Q0FBZDtBQUNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0IsNkNBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLGlCQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSxnQ0FBMUMsRUFBekI7O0FBRUEsSUFBSSxDQUFDUixlQUFLUyxHQUFMLENBQVNDLE1BQWQsRUFBdUJWLGVBQUtXLFFBQUw7O0FBR3ZCTCxpQkFBT00scUJBQVAsQ0FBNkJaLGVBQUtTLEdBQUwsQ0FBUyxDQUFULENBQTdCO0FBQ0EsSUFBSUksVUFBVTtBQUNWTCxVQUFNUixlQUFLUyxHQUFMLENBQVMsQ0FBVCxDQURJO0FBRVZLLGlCQUFhWCxRQUFRWSxHQUFSO0FBRkgsQ0FBZDs7QUFLQVQsaUJBQU9VLHFCQUFQLENBQTZCQyxNQUE3QixDQUFvQ0osT0FBcEMiLCJmaWxlIjoiZG9saXR0bGUtY3JlYXRlLWJvdW5kZWRjb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBjcmVhdGUgYm91bmRlZGNvbnRleHQgW25hbWVdJztcbmFyZ3NcbiAgICAuZXhhbXBsZShVU0FHRSwgXCJDcmVhdGVzIGEgYm91bmRlZCBjb250ZXh0IHdpdGggYSBnaXZlbiBuYW1lXCIpO1xuICAgIFxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogZ2xvYmFsLnVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBjcmVhdGUgYm91bmRlZGNvbnRleHQnfSk7XG5cbmlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpO1xuXG5cbmdsb2JhbC52YWxpZGF0ZUFyZ3NOYW1lSW5wdXQoYXJncy5zdWJbMF0pO1xubGV0IGNvbnRleHQgPSB7XG4gICAgbmFtZTogYXJncy5zdWJbMF0sXG4gICAgZGVzdGluYXRpb246IHByb2Nlc3MuY3dkKClcbn07XG5cbmdsb2JhbC5ib3VuZGVkQ29udGV4dE1hbmFnZXIuY3JlYXRlKGNvbnRleHQpOyJdfQ==