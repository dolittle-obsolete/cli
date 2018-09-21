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
var USAGE = 'dolittle add commandhandler [name]';
_args2.default.example(USAGE, "Creates a command handler in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add commandhandler' });

if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

var flags = { name: _args2.default.sub[0] };
_global2.default.artifactsManager.createCommandHandler(flags);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtY29tbWFuZGhhbmRsZXIuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiZmxhZ3MiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlQ29tbWFuZEhhbmRsZXIiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7QUFDQTs7Ozs7O0FBTEE7Ozs7QUFPQSxJQUFNQSxRQUFRLG9DQUFkO0FBQ0FDLGVBQ0tDLE9BREwsQ0FDYUYsS0FEYixFQUNvQixpREFEcEI7O0FBR0FDLGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsaUJBQU9DLFdBQVAsR0FBcUJSLEtBQTdCLEVBQW9DUyxNQUFNLDZCQUExQyxFQUF6Qjs7QUFFQSxJQUFJLENBQUVSLGVBQUtTLEdBQUwsQ0FBU0MsTUFBWCxJQUFxQlYsZUFBS1MsR0FBTCxDQUFTQyxNQUFULEdBQWtCLENBQTNDLEVBQThDVixlQUFLVyxRQUFMOztBQUU5QyxJQUFJQyxRQUFRLEVBQUNKLE1BQU1SLGVBQUtTLEdBQUwsQ0FBUyxDQUFULENBQVAsRUFBWjtBQUNBSCxpQkFBT08sZ0JBQVAsQ0FBd0JDLG9CQUF4QixDQUE2Q0YsS0FBN0MiLCJmaWxlIjoiZG9saXR0bGUtYWRkLWNvbW1hbmRoYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBhZGQgY29tbWFuZGhhbmRsZXIgW25hbWVdJztcbmFyZ3NcbiAgICAuZXhhbXBsZShVU0FHRSwgXCJDcmVhdGVzIGEgY29tbWFuZCBoYW5kbGVyIGluIHRoZSBjdXJyZW50IGZvbGRlclwiKTtcbiBcbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IGdsb2JhbC51c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgYWRkIGNvbW1hbmRoYW5kbGVyJ30pO1xuXG5pZiAoISBhcmdzLnN1Yi5sZW5ndGggfHwgYXJncy5zdWIubGVuZ3RoIDwgMSkgYXJncy5zaG93SGVscCgpO1xuXG5sZXQgZmxhZ3MgPSB7bmFtZTogYXJncy5zdWJbMF19OyBcbmdsb2JhbC5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZUNvbW1hbmRIYW5kbGVyKGZsYWdzKTtcbiJdfQ==