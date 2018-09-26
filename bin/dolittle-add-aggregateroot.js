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
var USAGE = 'dolittle add aggregateroot [name]';

_args2.default.example(USAGE, "Creates an aggregate root in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add aggregateroot' });

if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

var context = {
  artifactName: _args2.default.sub[0],
  artifactType: 'aggregateRoot',
  destination: process.cwd()
};

_global2.default.artifactsManager.createArtifact(context);

// let context = {name: args.sub[0], destination: process.cwd()}; 
// global.artifactsManager.createAggregateRoot(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtYWdncmVnYXRlcm9vdC5qcyJdLCJuYW1lcyI6WyJVU0FHRSIsImFyZ3MiLCJleGFtcGxlIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInZhbHVlIiwiZ2xvYmFsIiwidXNhZ2VQcmVmaXgiLCJuYW1lIiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiLCJjb250ZXh0IiwiYXJ0aWZhY3ROYW1lIiwiYXJ0aWZhY3RUeXBlIiwiZGVzdGluYXRpb24iLCJjd2QiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlQXJ0aWZhY3QiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7QUFDQTs7Ozs7O0FBTEE7Ozs7QUFPQSxJQUFNQSxRQUFRLG1DQUFkOztBQUVBQyxlQUNJQyxPQURKLENBQ1lGLEtBRFosRUFDbUIsaURBRG5COztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLGlCQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSw0QkFBMUMsRUFBekI7O0FBRUEsSUFBSSxDQUFFUixlQUFLUyxHQUFMLENBQVNDLE1BQVgsSUFBcUJWLGVBQUtTLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUEzQyxFQUE4Q1YsZUFBS1csUUFBTDs7QUFFOUMsSUFBSUMsVUFBVTtBQUNWQyxnQkFBY2IsZUFBS1MsR0FBTCxDQUFTLENBQVQsQ0FESjtBQUVWSyxnQkFBYyxlQUZKO0FBR1ZDLGVBQWFaLFFBQVFhLEdBQVI7QUFISCxDQUFkOztBQU1BVixpQkFBT1csZ0JBQVAsQ0FBd0JDLGNBQXhCLENBQXVDTixPQUF2Qzs7QUFFQTtBQUNBIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC1hZ2dyZWdhdGVyb290LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBhZGQgYWdncmVnYXRlcm9vdCBbbmFtZV0nO1xuXG5hcmdzXG4gICAuZXhhbXBsZShVU0FHRSwgXCJDcmVhdGVzIGFuIGFnZ3JlZ2F0ZSByb290IGluIHRoZSBjdXJyZW50IGZvbGRlclwiKTtcblxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogZ2xvYmFsLnVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBhZGQgYWdncmVnYXRlcm9vdCd9KTtcblxuaWYgKCEgYXJncy5zdWIubGVuZ3RoIHx8IGFyZ3Muc3ViLmxlbmd0aCA8IDEpIGFyZ3Muc2hvd0hlbHAoKTtcblxubGV0IGNvbnRleHQgPSB7XG4gICAgYXJ0aWZhY3ROYW1lOiBhcmdzLnN1YlswXSwgXG4gICAgYXJ0aWZhY3RUeXBlOiAnYWdncmVnYXRlUm9vdCcsXG4gICAgZGVzdGluYXRpb246IHByb2Nlc3MuY3dkKClcbn07XG5cbmdsb2JhbC5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZUFydGlmYWN0KGNvbnRleHQpO1xuXG4vLyBsZXQgY29udGV4dCA9IHtuYW1lOiBhcmdzLnN1YlswXSwgZGVzdGluYXRpb246IHByb2Nlc3MuY3dkKCl9OyBcbi8vIGdsb2JhbC5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZUFnZ3JlZ2F0ZVJvb3QoY29udGV4dCk7Il19