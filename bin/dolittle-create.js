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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiY29tbWFuZCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFMQTs7OztBQU9BLElBQU1BLFFBQVEsa0NBQWQ7QUFDQUMsZUFDS0MsT0FETCxDQUNhLGFBRGIsRUFDNEIsZ0JBRDVCLEVBRUtBLE9BRkwsQ0FFYSxnQkFGYixFQUUrQixtQkFGL0I7O0FBSUFELGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsdUJBQWNQLEtBQXRCLEVBQTZCUSxNQUFNLGlCQUFuQyxFQUF6Qjs7QUFFQSxJQUFJLENBQUNQLGVBQUtRLEdBQUwsQ0FBU0MsTUFBZCxFQUF1QlQsZUFBS1UsUUFBTCIsImZpbGUiOiJkb2xpdHRsZS1jcmVhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XHJcbmltcG9ydCB7IHVzYWdlUHJlZml4IH0gZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIGNyZWF0ZSBbY29tbWFuZF0gW2FyZ3NdJztcclxuYXJnc1xyXG4gICAgLmNvbW1hbmQoJ2FwcGxpY2F0aW9uJywgJ0FuIGFwcGxpY2F0aW9uJylcclxuICAgIC5jb21tYW5kKCdib3VuZGVkY29udGV4dCcsICdBIGJvdW5kZWQgY29udGV4dCcpO1xyXG4gICAgXHJcbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IHVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBjcmVhdGUnfSk7XHJcblxyXG5pZiggIWFyZ3Muc3ViLmxlbmd0aCApIGFyZ3Muc2hvd0hlbHAoKTsiXX0=