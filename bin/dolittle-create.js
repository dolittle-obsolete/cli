#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var USAGE = 'dolittle create [command] [args]';
_args2.default.command('application', 'An application').command('boundedcontext', 'A bounded context');

_args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle create' });

if (!_args2.default.sub.length) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiY29tbWFuZCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFMQTs7OztBQU9BLElBQU1BLFFBQVEsa0NBQWQ7QUFDQUMsZUFDS0MsT0FETCxDQUNhLGFBRGIsRUFDNEIsZ0JBRDVCLEVBRUtBLE9BRkwsQ0FFYSxnQkFGYixFQUUrQixtQkFGL0I7O0FBSUFELGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsdUJBQWNQLEtBQXRCLEVBQTZCUSxNQUFNLGlCQUFuQyxFQUF6Qjs7QUFFQSxJQUFJLENBQUNQLGVBQUtRLEdBQUwsQ0FBU0MsTUFBZCxFQUF1QlQsZUFBS1UsUUFBTCIsImZpbGUiOiJkb2xpdHRsZS1jcmVhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgeyB1c2FnZVByZWZpeCB9IGZyb20gJy4vaGVscGVycyc7XG5cbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIGNyZWF0ZSBbY29tbWFuZF0gW2FyZ3NdJztcbmFyZ3NcbiAgICAuY29tbWFuZCgnYXBwbGljYXRpb24nLCAnQW4gYXBwbGljYXRpb24nKVxuICAgIC5jb21tYW5kKCdib3VuZGVkY29udGV4dCcsICdBIGJvdW5kZWQgY29udGV4dCcpO1xuICAgIFxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogdXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGNyZWF0ZSd9KTtcblxuaWYoICFhcmdzLnN1Yi5sZW5ndGggKSBhcmdzLnNob3dIZWxwKCk7Il19