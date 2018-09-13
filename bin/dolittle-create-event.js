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
_args2.default.example("dolittle create event [name] [namespace]", "Creates an event with a given name and namespace in the current folder");

_args2.default.parse(process.argv);

if (!_args2.default.sub.length || _args2.default.sub.length < 2) _args2.default.showHelp();

_global2.default.artifactsManager.createEvent(_args2.default.sub[0], _args2.default.sub[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUtZXZlbnQuanMiXSwibmFtZXMiOlsiYXJncyIsImV4YW1wbGUiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2Iiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiLCJnbG9iYWwiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlRXZlbnQiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7QUFDQTs7Ozs7O0FBTEE7Ozs7QUFPQUEsZUFDS0MsT0FETCxDQUNhLDBDQURiLEVBQ3lELHdFQUR6RDs7QUFHQUQsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQjs7QUFFQSxJQUFJLENBQUNKLGVBQUtLLEdBQUwsQ0FBU0MsTUFBVixJQUFvQk4sZUFBS0ssR0FBTCxDQUFTQyxNQUFULEdBQWtCLENBQTFDLEVBQThDTixlQUFLTyxRQUFMOztBQUU5Q0MsaUJBQU9DLGdCQUFQLENBQXdCQyxXQUF4QixDQUFvQ1YsZUFBS0ssR0FBTCxDQUFTLENBQVQsQ0FBcEMsRUFBaURMLGVBQUtLLEdBQUwsQ0FBUyxDQUFULENBQWpEIiwiZmlsZSI6ImRvbGl0dGxlLWNyZWF0ZS1ldmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcblxuYXJnc1xuICAgIC5leGFtcGxlKFwiZG9saXR0bGUgY3JlYXRlIGV2ZW50IFtuYW1lXSBbbmFtZXNwYWNlXVwiLCBcIkNyZWF0ZXMgYW4gZXZlbnQgd2l0aCBhIGdpdmVuIG5hbWUgYW5kIG5hbWVzcGFjZSBpbiB0aGUgY3VycmVudCBmb2xkZXJcIik7XG4gXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbmlmKCAhYXJncy5zdWIubGVuZ3RoIHx8wqBhcmdzLnN1Yi5sZW5ndGggPCAyICkgYXJncy5zaG93SGVscCgpO1xuXG5nbG9iYWwuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVFdmVudChhcmdzLnN1YlswXSwgYXJncy5zdWJbMV0pOyJdfQ==