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

_global2.default.validateArgsNameInput(_args2.default.sub[0]);
var context = {
  artifactName: _args2.default.sub[0],
  artifactType: 'commandHandler',
  destination: process.cwd()
};

_global2.default.artifactsManager.createArtifact(context);
// let flags = {name: args.sub[0]}; 
// global.artifactsManager.createCommandHandler(flags);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtY29tbWFuZGhhbmRsZXIuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwidmFsaWRhdGVBcmdzTmFtZUlucHV0IiwiY29udGV4dCIsImFydGlmYWN0TmFtZSIsImFydGlmYWN0VHlwZSIsImRlc3RpbmF0aW9uIiwiY3dkIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZUFydGlmYWN0Il0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0EsSUFBTUEsUUFBUSxvQ0FBZDtBQUNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0IsaURBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLGlCQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSw2QkFBMUMsRUFBekI7O0FBRUEsSUFBSSxDQUFFUixlQUFLUyxHQUFMLENBQVNDLE1BQVgsSUFBcUJWLGVBQUtTLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUEzQyxFQUE4Q1YsZUFBS1csUUFBTDs7QUFFOUNMLGlCQUFPTSxxQkFBUCxDQUE2QlosZUFBS1MsR0FBTCxDQUFTLENBQVQsQ0FBN0I7QUFDQSxJQUFJSSxVQUFVO0FBQ1ZDLGdCQUFjZCxlQUFLUyxHQUFMLENBQVMsQ0FBVCxDQURKO0FBRVZNLGdCQUFjLGdCQUZKO0FBR1ZDLGVBQWFiLFFBQVFjLEdBQVI7QUFISCxDQUFkOztBQU1BWCxpQkFBT1ksZ0JBQVAsQ0FBd0JDLGNBQXhCLENBQXVDTixPQUF2QztBQUNBO0FBQ0EiLCJmaWxlIjoiZG9saXR0bGUtYWRkLWNvbW1hbmRoYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBhZGQgY29tbWFuZGhhbmRsZXIgW25hbWVdJztcbmFyZ3NcbiAgICAuZXhhbXBsZShVU0FHRSwgXCJDcmVhdGVzIGEgY29tbWFuZCBoYW5kbGVyIGluIHRoZSBjdXJyZW50IGZvbGRlclwiKTtcbiBcbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IGdsb2JhbC51c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgYWRkIGNvbW1hbmRoYW5kbGVyJ30pO1xuXG5pZiAoISBhcmdzLnN1Yi5sZW5ndGggfHwgYXJncy5zdWIubGVuZ3RoIDwgMSkgYXJncy5zaG93SGVscCgpO1xuXG5nbG9iYWwudmFsaWRhdGVBcmdzTmFtZUlucHV0KGFyZ3Muc3ViWzBdKTtcbmxldCBjb250ZXh0ID0ge1xuICAgIGFydGlmYWN0TmFtZTogYXJncy5zdWJbMF0sIFxuICAgIGFydGlmYWN0VHlwZTogJ2NvbW1hbmRIYW5kbGVyJyxcbiAgICBkZXN0aW5hdGlvbjogcHJvY2Vzcy5jd2QoKVxufTtcblxuZ2xvYmFsLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlQXJ0aWZhY3QoY29udGV4dCk7XG4vLyBsZXQgZmxhZ3MgPSB7bmFtZTogYXJncy5zdWJbMF19OyBcbi8vIGdsb2JhbC5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZUNvbW1hbmRIYW5kbGVyKGZsYWdzKTtcbiJdfQ==