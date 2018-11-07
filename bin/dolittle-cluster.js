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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jbHVzdGVyLmpzIl0sIm5hbWVzIjpbImFyZ3MiLCJjb21tYW5kIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7Ozs7QUFFQUEsZUFDS0MsT0FETCxDQUNhLE1BRGIsRUFDcUIsd0RBRHJCLEVBRUtBLE9BRkwsQ0FFYSxLQUZiLEVBRW9CLG9DQUZwQixFQUdLQSxPQUhMLENBR2EsUUFIYixFQUd1Qix5Q0FIdkIsRUFJS0EsT0FKTCxDQUlhLEtBSmIsRUFJb0Isb0NBSnBCOztBQU5BOzs7Ozs7QUFZQUQsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQjs7QUFFQSxJQUFJLENBQUNKLGVBQUtLLEdBQUwsQ0FBU0MsTUFBZCxFQUF1Qk4sZUFBS08sUUFBTCIsImZpbGUiOiJkb2xpdHRsZS1jbHVzdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuXG5hcmdzXG4gICAgLmNvbW1hbmQoJ2luZm8nLCAnU2hvdyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY3VycmVudGx5IGNvbm5lY3RlZCBjbHVzdGVyJylcbiAgICAuY29tbWFuZCgnYWRkJywgJ0FkZCBhIGNsdXN0ZXIgdG8gdGhlIGNvbmZpZ3VyYXRpb24nKVxuICAgIC5jb21tYW5kKCdyZW1vdmUnLCAnUmVtb3ZlIGEgY2x1c3RlciBmcm9tIHRoZSBjb25maWd1cmF0aW9uJylcbiAgICAuY29tbWFuZCgndXNlJywgJ1NldCB3aGF0IGNsdXN0ZXIgdG8gdXNlIGFzIGN1cnJlbnQnKTtcbiAgICBcbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2KTtcblxuaWYoICFhcmdzLnN1Yi5sZW5ndGggKSBhcmdzLnNob3dIZWxwKCk7Il19