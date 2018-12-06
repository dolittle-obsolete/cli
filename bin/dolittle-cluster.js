#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_args2.default.command('info', 'Show information about the currently connected cluster').command('add', 'Add a cluster to the configuration').command('remove', 'Remove a cluster from the configuration').command('use', 'Set what cluster to use as current');

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


_args2.default.parse(process.argv);

if (!_args2.default.sub.length) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jbHVzdGVyLmpzIl0sIm5hbWVzIjpbImFyZ3MiLCJjb21tYW5kIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7Ozs7QUFFQUEsZUFDS0MsT0FETCxDQUNhLE1BRGIsRUFDcUIsd0RBRHJCLEVBRUtBLE9BRkwsQ0FFYSxLQUZiLEVBRW9CLG9DQUZwQixFQUdLQSxPQUhMLENBR2EsUUFIYixFQUd1Qix5Q0FIdkIsRUFJS0EsT0FKTCxDQUlhLEtBSmIsRUFJb0Isb0NBSnBCOztBQU5BOzs7Ozs7QUFZQUQsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQjs7QUFFQSxJQUFJLENBQUNKLGVBQUtLLEdBQUwsQ0FBU0MsTUFBZCxFQUF1Qk4sZUFBS08sUUFBTCIsImZpbGUiOiJkb2xpdHRsZS1jbHVzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xyXG5cclxuYXJnc1xyXG4gICAgLmNvbW1hbmQoJ2luZm8nLCAnU2hvdyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY3VycmVudGx5IGNvbm5lY3RlZCBjbHVzdGVyJylcclxuICAgIC5jb21tYW5kKCdhZGQnLCAnQWRkIGEgY2x1c3RlciB0byB0aGUgY29uZmlndXJhdGlvbicpXHJcbiAgICAuY29tbWFuZCgncmVtb3ZlJywgJ1JlbW92ZSBhIGNsdXN0ZXIgZnJvbSB0aGUgY29uZmlndXJhdGlvbicpXHJcbiAgICAuY29tbWFuZCgndXNlJywgJ1NldCB3aGF0IGNsdXN0ZXIgdG8gdXNlIGFzIGN1cnJlbnQnKTtcclxuICAgIFxyXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndik7XHJcblxyXG5pZiggIWFyZ3Muc3ViLmxlbmd0aCApIGFyZ3Muc2hvd0hlbHAoKTsiXX0=