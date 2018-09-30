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

_global2.default.validateArgsNameInput(_args2.default.sub[0]);
var context = {
  artifactName: _args2.default.sub[0],
  artifactType: 'aggregateRoot',
  destination: process.cwd()
};

_global2.default.artifactsManager.createArtifact(context);

// let context = {name: args.sub[0], destination: process.cwd()}; 
// global.artifactsManager.createAggregateRoot(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtYWdncmVnYXRlcm9vdC5qcyJdLCJuYW1lcyI6WyJVU0FHRSIsImFyZ3MiLCJleGFtcGxlIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInZhbHVlIiwiZ2xvYmFsIiwidXNhZ2VQcmVmaXgiLCJuYW1lIiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiLCJ2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQiLCJjb250ZXh0IiwiYXJ0aWZhY3ROYW1lIiwiYXJ0aWZhY3RUeXBlIiwiZGVzdGluYXRpb24iLCJjd2QiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlQXJ0aWZhY3QiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7QUFDQTs7Ozs7O0FBTEE7Ozs7QUFPQSxJQUFNQSxRQUFRLG1DQUFkOztBQUVBQyxlQUNJQyxPQURKLENBQ1lGLEtBRFosRUFDbUIsaURBRG5COztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLGlCQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSw0QkFBMUMsRUFBekI7O0FBRUEsSUFBSSxDQUFFUixlQUFLUyxHQUFMLENBQVNDLE1BQVgsSUFBcUJWLGVBQUtTLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUEzQyxFQUE4Q1YsZUFBS1csUUFBTDs7QUFFOUNMLGlCQUFPTSxxQkFBUCxDQUE2QlosZUFBS1MsR0FBTCxDQUFTLENBQVQsQ0FBN0I7QUFDQSxJQUFJSSxVQUFVO0FBQ1ZDLGdCQUFjZCxlQUFLUyxHQUFMLENBQVMsQ0FBVCxDQURKO0FBRVZNLGdCQUFjLGVBRko7QUFHVkMsZUFBYWIsUUFBUWMsR0FBUjtBQUhILENBQWQ7O0FBTUFYLGlCQUFPWSxnQkFBUCxDQUF3QkMsY0FBeEIsQ0FBdUNOLE9BQXZDOztBQUVBO0FBQ0EiLCJmaWxlIjoiZG9saXR0bGUtYWRkLWFnZ3JlZ2F0ZXJvb3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5cbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIGFkZCBhZ2dyZWdhdGVyb290IFtuYW1lXSc7XG5cbmFyZ3NcbiAgIC5leGFtcGxlKFVTQUdFLCBcIkNyZWF0ZXMgYW4gYWdncmVnYXRlIHJvb3QgaW4gdGhlIGN1cnJlbnQgZm9sZGVyXCIpO1xuXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwge3ZhbHVlOiBnbG9iYWwudXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGFkZCBhZ2dyZWdhdGVyb290J30pO1xuXG5pZiAoISBhcmdzLnN1Yi5sZW5ndGggfHwgYXJncy5zdWIubGVuZ3RoIDwgMSkgYXJncy5zaG93SGVscCgpO1xuXG5nbG9iYWwudmFsaWRhdGVBcmdzTmFtZUlucHV0KGFyZ3Muc3ViWzBdKTtcbmxldCBjb250ZXh0ID0ge1xuICAgIGFydGlmYWN0TmFtZTogYXJncy5zdWJbMF0sIFxuICAgIGFydGlmYWN0VHlwZTogJ2FnZ3JlZ2F0ZVJvb3QnLFxuICAgIGRlc3RpbmF0aW9uOiBwcm9jZXNzLmN3ZCgpXG59O1xuXG5nbG9iYWwuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVBcnRpZmFjdChjb250ZXh0KTtcblxuLy8gbGV0IGNvbnRleHQgPSB7bmFtZTogYXJncy5zdWJbMF0sIGRlc3RpbmF0aW9uOiBwcm9jZXNzLmN3ZCgpfTsgXG4vLyBnbG9iYWwuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVBZ2dyZWdhdGVSb290KGNvbnRleHQpOyJdfQ==