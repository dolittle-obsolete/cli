#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle add [command] [args]';
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.command('command', 'A command').command('event', 'An event').command('readmodel', 'A read model').command('aggregateroot', 'An aggregate root');

_args2.default.parse(process.argv, { value: global.usagePrefix + USAGE, name: 'dolittle add' });

if (!_args2.default.sub.length) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiY29tbWFuZCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7Ozs7QUFFQSxJQUFNQSxRQUFRLCtCQUFkO0FBTkE7Ozs7O0FBT0FDLGVBQ0tDLE9BREwsQ0FDYSxTQURiLEVBQ3dCLFdBRHhCLEVBRUtBLE9BRkwsQ0FFYSxPQUZiLEVBRXNCLFVBRnRCLEVBR0tBLE9BSEwsQ0FHYSxXQUhiLEVBRzBCLGNBSDFCLEVBSUtBLE9BSkwsQ0FJYSxlQUpiLEVBSThCLG1CQUo5Qjs7QUFNSUQsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQixFQUF5QixFQUFDQyxPQUFPQyxPQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSxjQUExQyxFQUF6Qjs7QUFFSixJQUFJLENBQUNSLGVBQUtTLEdBQUwsQ0FBU0MsTUFBZCxFQUF1QlYsZUFBS1csUUFBTCIsImZpbGUiOiJkb2xpdHRsZS1hZGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBhZGQgW2NvbW1hbmRdIFthcmdzXSdcbmFyZ3NcbiAgICAuY29tbWFuZCgnY29tbWFuZCcsICdBIGNvbW1hbmQnKVxuICAgIC5jb21tYW5kKCdldmVudCcsICdBbiBldmVudCcpXG4gICAgLmNvbW1hbmQoJ3JlYWRtb2RlbCcsICdBIHJlYWQgbW9kZWwnKVxuICAgIC5jb21tYW5kKCdhZ2dyZWdhdGVyb290JywgJ0FuIGFnZ3JlZ2F0ZSByb290Jyk7XG4gICAgXG4gICAgYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogZ2xvYmFsLnVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBhZGQnfSk7XG5cbmlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpOyJdfQ==