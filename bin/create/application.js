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
_args2.default.example("dolittle create application [name]", "Creates an application with a given name");

var flags = _args2.default.parse(process.argv);

if (_args2.default.sub.length != 1) _args2.default.showHelp();

_global2.default.applicationManager.create(_args2.default.sub[0]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jcmVhdGUvYXBwbGljYXRpb24uanMiXSwibmFtZXMiOlsiYXJncyIsImV4YW1wbGUiLCJmbGFncyIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCIsImdsb2JhbCIsImFwcGxpY2F0aW9uTWFuYWdlciIsImNyZWF0ZSJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7OztBQUNBOzs7Ozs7QUFMQTs7OztBQU9BQSxlQUNLQyxPQURMLENBQ2Esb0NBRGIsRUFDbUQsMENBRG5EOztBQUlBLElBQU1DLFFBQVFGLGVBQUtHLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsQ0FBZDs7QUFFQSxJQUFJTCxlQUFLTSxHQUFMLENBQVNDLE1BQVQsSUFBbUIsQ0FBdkIsRUFBMkJQLGVBQUtRLFFBQUw7O0FBRTNCQyxpQkFBT0Msa0JBQVAsQ0FBMEJDLE1BQTFCLENBQWlDWCxlQUFLTSxHQUFMLENBQVMsQ0FBVCxDQUFqQyIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCc7XG5cbmFyZ3NcbiAgICAuZXhhbXBsZShcImRvbGl0dGxlIGNyZWF0ZSBhcHBsaWNhdGlvbiBbbmFtZV1cIiwgXCJDcmVhdGVzIGFuIGFwcGxpY2F0aW9uIHdpdGggYSBnaXZlbiBuYW1lXCIpXG4gICAgO1xuICAgIFxuY29uc3QgZmxhZ3MgPSBhcmdzLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbmlmKCBhcmdzLnN1Yi5sZW5ndGggIT0gMSApIGFyZ3Muc2hvd0hlbHAoKTtcblxuZ2xvYmFsLmFwcGxpY2F0aW9uTWFuYWdlci5jcmVhdGUoYXJncy5zdWJbMF0pOyJdfQ==