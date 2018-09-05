#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
_args2.default.example("dolittle create boundedcontext [name]", "Creates a bounded context with a given name");

var flags = _args2.default.parse(process.argv);

if (_args2.default.sub.length != 1) _args2.default.showHelp();

_global2.default.boundedContextManager.create(_args2.default.sub[0]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jcmVhdGUvYm91bmRlZENvbnRleHQuanMiXSwibmFtZXMiOlsiYXJncyIsImV4YW1wbGUiLCJmbGFncyIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCIsImdsb2JhbCIsImJvdW5kZWRDb250ZXh0TWFuYWdlciIsImNyZWF0ZSJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7OztBQUNBOzs7Ozs7QUFMQTs7OztBQU9BQSxlQUNLQyxPQURMLENBQ2EsdUNBRGIsRUFDc0QsNkNBRHREOztBQUlBLElBQU1DLFFBQVFGLGVBQUtHLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsQ0FBZDs7QUFFQSxJQUFJTCxlQUFLTSxHQUFMLENBQVNDLE1BQVQsSUFBbUIsQ0FBdkIsRUFBMkJQLGVBQUtRLFFBQUw7O0FBRTNCQyxpQkFBT0MscUJBQVAsQ0FBNkJDLE1BQTdCLENBQW9DWCxlQUFLTSxHQUFMLENBQVMsQ0FBVCxDQUFwQyIsImZpbGUiOiJib3VuZGVkQ29udGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCc7XG5cbmFyZ3NcbiAgICAuZXhhbXBsZShcImRvbGl0dGxlIGNyZWF0ZSBib3VuZGVkY29udGV4dCBbbmFtZV1cIiwgXCJDcmVhdGVzIGEgYm91bmRlZCBjb250ZXh0IHdpdGggYSBnaXZlbiBuYW1lXCIpXG4gICAgO1xuICAgIFxuY29uc3QgZmxhZ3MgPSBhcmdzLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbmlmKCBhcmdzLnN1Yi5sZW5ndGggIT0gMSApIGFyZ3Muc2hvd0hlbHAoKTtcblxuZ2xvYmFsLmJvdW5kZWRDb250ZXh0TWFuYWdlci5jcmVhdGUoYXJncy5zdWJbMF0pOyJdfQ==