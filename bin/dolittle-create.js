#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle create [command] [args]';
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.command('application', 'An application').command('boundedcontext', 'A bounded context');

_args2.default.parse(process.argv, { value: global.usagePrefix + USAGE, name: 'dolittle create' });

if (!_args2.default.sub.length) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiY29tbWFuZCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7Ozs7QUFDQSxJQUFNQSxRQUFRLGtDQUFkO0FBTEE7Ozs7O0FBTUFDLGVBQ0tDLE9BREwsQ0FDYSxhQURiLEVBQzRCLGdCQUQ1QixFQUVLQSxPQUZMLENBRWEsZ0JBRmIsRUFFK0IsbUJBRi9COztBQUlJRCxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLE9BQU9DLFdBQVAsR0FBcUJSLEtBQTdCLEVBQW9DUyxNQUFNLGlCQUExQyxFQUF6Qjs7QUFFSixJQUFJLENBQUNSLGVBQUtTLEdBQUwsQ0FBU0MsTUFBZCxFQUF1QlYsZUFBS1csUUFBTCIsImZpbGUiOiJkb2xpdHRsZS1jcmVhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgY3JlYXRlIFtjb21tYW5kXSBbYXJnc10nXG5hcmdzXG4gICAgLmNvbW1hbmQoJ2FwcGxpY2F0aW9uJywgJ0FuIGFwcGxpY2F0aW9uJylcbiAgICAuY29tbWFuZCgnYm91bmRlZGNvbnRleHQnLCAnQSBib3VuZGVkIGNvbnRleHQnKVxuICAgIFxuICAgIGFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IGdsb2JhbC51c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgY3JlYXRlJ30pO1xuXG5pZiggIWFyZ3Muc3ViLmxlbmd0aCApIGFyZ3Muc2hvd0hlbHAoKTsiXX0=