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
var USAGE = 'dolittle add query [name]';
_args2.default.example(USAGE, "Creates a query in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add query' });
if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

_global2.default.validateArgsNameInput(_args2.default.sub[0]);
var context = {
    artifactName: _args2.default.sub[0],
    artifactType: 'query',
    destination: process.cwd()
};

_global2.default.artifactsManager.createArtifact(context);

// let flags = {name: args.sub[0]}; 
// global.artifactsManager.createQuery(flags);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtcXVlcnkuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwidmFsaWRhdGVBcmdzTmFtZUlucHV0IiwiY29udGV4dCIsImFydGlmYWN0TmFtZSIsImFydGlmYWN0VHlwZSIsImRlc3RpbmF0aW9uIiwiY3dkIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZUFydGlmYWN0Il0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0EsSUFBTUEsUUFBUSwyQkFBZDtBQUNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0IsdUNBRHBCOztBQUlBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLGlCQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSxvQkFBMUMsRUFBekI7QUFDQSxJQUFJLENBQUVSLGVBQUtTLEdBQUwsQ0FBU0MsTUFBWCxJQUFxQlYsZUFBS1MsR0FBTCxDQUFTQyxNQUFULEdBQWtCLENBQTNDLEVBQThDVixlQUFLVyxRQUFMOztBQUU5Q0wsaUJBQU9NLHFCQUFQLENBQTZCWixlQUFLUyxHQUFMLENBQVMsQ0FBVCxDQUE3QjtBQUNBLElBQUlJLFVBQVU7QUFDVkMsa0JBQWNkLGVBQUtTLEdBQUwsQ0FBUyxDQUFULENBREo7QUFFVk0sa0JBQWMsT0FGSjtBQUdWQyxpQkFBYWIsUUFBUWMsR0FBUjtBQUhILENBQWQ7O0FBTUFYLGlCQUFPWSxnQkFBUCxDQUF3QkMsY0FBeEIsQ0FBdUNOLE9BQXZDOztBQUVBO0FBQ0EiLCJmaWxlIjoiZG9saXR0bGUtYWRkLXF1ZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBhZGQgcXVlcnkgW25hbWVdJztcbmFyZ3NcbiAgICAuZXhhbXBsZShVU0FHRSwgXCJDcmVhdGVzIGEgcXVlcnkgaW4gdGhlIGN1cnJlbnQgZm9sZGVyXCIpO1xuXG5cbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IGdsb2JhbC51c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgYWRkIHF1ZXJ5J30pO1xuaWYgKCEgYXJncy5zdWIubGVuZ3RoIHx8IGFyZ3Muc3ViLmxlbmd0aCA8IDEpIGFyZ3Muc2hvd0hlbHAoKTtcblxuZ2xvYmFsLnZhbGlkYXRlQXJnc05hbWVJbnB1dChhcmdzLnN1YlswXSk7XG5sZXQgY29udGV4dCA9IHtcbiAgICBhcnRpZmFjdE5hbWU6IGFyZ3Muc3ViWzBdLCBcbiAgICBhcnRpZmFjdFR5cGU6ICdxdWVyeScsXG4gICAgZGVzdGluYXRpb246IHByb2Nlc3MuY3dkKClcbn07XG5cbmdsb2JhbC5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZUFydGlmYWN0KGNvbnRleHQpO1xuXG4vLyBsZXQgZmxhZ3MgPSB7bmFtZTogYXJncy5zdWJbMF19OyBcbi8vIGdsb2JhbC5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZVF1ZXJ5KGZsYWdzKTtcbiJdfQ==