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
var USAGE = 'dolittle add eventprocessor [name]';
_args2.default.example(USAGE, "Creates an event processor in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add eventprocessor' });

if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

_global2.default.validateArgsNameInput(_args2.default.sub[0]);
var context = {
  artifactName: _args2.default.sub[0],
  artifactType: 'eventProcessor',
  destination: process.cwd()
};

_global2.default.artifactsManager.createArtifact(context);

// let flags = {name: args.sub[0]}; 
// global.artifactsManager.createEventProcessor(flags);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtZXZlbnRwcm9jZXNzb3IuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwidmFsaWRhdGVBcmdzTmFtZUlucHV0IiwiY29udGV4dCIsImFydGlmYWN0TmFtZSIsImFydGlmYWN0VHlwZSIsImRlc3RpbmF0aW9uIiwiY3dkIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZUFydGlmYWN0Il0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0EsSUFBTUEsUUFBUSxvQ0FBZDtBQUNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0Isa0RBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLGlCQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSw2QkFBMUMsRUFBekI7O0FBRUEsSUFBSSxDQUFFUixlQUFLUyxHQUFMLENBQVNDLE1BQVgsSUFBcUJWLGVBQUtTLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUEzQyxFQUE4Q1YsZUFBS1csUUFBTDs7QUFFOUNMLGlCQUFPTSxxQkFBUCxDQUE2QlosZUFBS1MsR0FBTCxDQUFTLENBQVQsQ0FBN0I7QUFDQSxJQUFJSSxVQUFVO0FBQ1ZDLGdCQUFjZCxlQUFLUyxHQUFMLENBQVMsQ0FBVCxDQURKO0FBRVZNLGdCQUFjLGdCQUZKO0FBR1ZDLGVBQWFiLFFBQVFjLEdBQVI7QUFISCxDQUFkOztBQU1BWCxpQkFBT1ksZ0JBQVAsQ0FBd0JDLGNBQXhCLENBQXVDTixPQUF2Qzs7QUFFQTtBQUNBIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC1ldmVudHByb2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIGV2ZW50cHJvY2Vzc29yIFtuYW1lXSc7XG5hcmdzXG4gICAgLmV4YW1wbGUoVVNBR0UsIFwiQ3JlYXRlcyBhbiBldmVudCBwcm9jZXNzb3IgaW4gdGhlIGN1cnJlbnQgZm9sZGVyXCIpO1xuIFxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogZ2xvYmFsLnVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBhZGQgZXZlbnRwcm9jZXNzb3InfSk7XG5cbmlmICghIGFyZ3Muc3ViLmxlbmd0aCB8fCBhcmdzLnN1Yi5sZW5ndGggPCAxKSBhcmdzLnNob3dIZWxwKCk7XG5cbmdsb2JhbC52YWxpZGF0ZUFyZ3NOYW1lSW5wdXQoYXJncy5zdWJbMF0pO1xubGV0IGNvbnRleHQgPSB7XG4gICAgYXJ0aWZhY3ROYW1lOiBhcmdzLnN1YlswXSwgXG4gICAgYXJ0aWZhY3RUeXBlOiAnZXZlbnRQcm9jZXNzb3InLFxuICAgIGRlc3RpbmF0aW9uOiBwcm9jZXNzLmN3ZCgpXG59O1xuXG5nbG9iYWwuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVBcnRpZmFjdChjb250ZXh0KTtcblxuLy8gbGV0IGZsYWdzID0ge25hbWU6IGFyZ3Muc3ViWzBdfTsgXG4vLyBnbG9iYWwuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVFdmVudFByb2Nlc3NvcihmbGFncyk7Il19