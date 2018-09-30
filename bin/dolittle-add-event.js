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
var USAGE = 'dolittle add event [name]';
_args2.default.example(USAGE, "Creates an event in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add event' });

if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

_global2.default.validateArgsNameInput(_args2.default.sub[0]);
var context = {
  artifactName: _args2.default.sub[0],
  artifactType: 'event',
  destination: process.cwd()
};

_global2.default.artifactsManager.createArtifact(context);

// let flags = {name: args.sub[0]}; 
// global.artifactsManager.createEvent(flags);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtZXZlbnQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwidmFsaWRhdGVBcmdzTmFtZUlucHV0IiwiY29udGV4dCIsImFydGlmYWN0TmFtZSIsImFydGlmYWN0VHlwZSIsImRlc3RpbmF0aW9uIiwiY3dkIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZUFydGlmYWN0Il0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0EsSUFBTUEsUUFBUSwyQkFBZDtBQUNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0Isd0NBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLGlCQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSxvQkFBMUMsRUFBekI7O0FBRUEsSUFBSSxDQUFFUixlQUFLUyxHQUFMLENBQVNDLE1BQVgsSUFBcUJWLGVBQUtTLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUEzQyxFQUE4Q1YsZUFBS1csUUFBTDs7QUFFOUNMLGlCQUFPTSxxQkFBUCxDQUE2QlosZUFBS1MsR0FBTCxDQUFTLENBQVQsQ0FBN0I7QUFDQSxJQUFJSSxVQUFVO0FBQ1ZDLGdCQUFjZCxlQUFLUyxHQUFMLENBQVMsQ0FBVCxDQURKO0FBRVZNLGdCQUFjLE9BRko7QUFHVkMsZUFBYWIsUUFBUWMsR0FBUjtBQUhILENBQWQ7O0FBTUFYLGlCQUFPWSxnQkFBUCxDQUF3QkMsY0FBeEIsQ0FBdUNOLE9BQXZDOztBQUVBO0FBQ0EiLCJmaWxlIjoiZG9saXR0bGUtYWRkLWV2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBhZGQgZXZlbnQgW25hbWVdJztcbmFyZ3NcbiAgICAuZXhhbXBsZShVU0FHRSwgXCJDcmVhdGVzIGFuIGV2ZW50IGluIHRoZSBjdXJyZW50IGZvbGRlclwiKTtcbiBcbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IGdsb2JhbC51c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgYWRkIGV2ZW50J30pO1xuXG5pZiAoISBhcmdzLnN1Yi5sZW5ndGggfHwgYXJncy5zdWIubGVuZ3RoIDwgMSkgYXJncy5zaG93SGVscCgpO1xuXG5nbG9iYWwudmFsaWRhdGVBcmdzTmFtZUlucHV0KGFyZ3Muc3ViWzBdKTtcbmxldCBjb250ZXh0ID0ge1xuICAgIGFydGlmYWN0TmFtZTogYXJncy5zdWJbMF0sIFxuICAgIGFydGlmYWN0VHlwZTogJ2V2ZW50JyxcbiAgICBkZXN0aW5hdGlvbjogcHJvY2Vzcy5jd2QoKVxufTtcblxuZ2xvYmFsLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlQXJ0aWZhY3QoY29udGV4dCk7XG5cbi8vIGxldCBmbGFncyA9IHtuYW1lOiBhcmdzLnN1YlswXX07IFxuLy8gZ2xvYmFsLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlRXZlbnQoZmxhZ3MpOyJdfQ==