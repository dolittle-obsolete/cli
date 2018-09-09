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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jbHVzdGVyL2luZGV4LmpzIl0sIm5hbWVzIjpbImFyZ3MiLCJjb21tYW5kIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7Ozs7QUFFQUEsZUFDS0MsT0FETCxDQUNhLE1BRGIsRUFDcUIsd0RBRHJCLEVBRUtBLE9BRkwsQ0FFYSxLQUZiLEVBRW9CLG9DQUZwQixFQUdLQSxPQUhMLENBR2EsUUFIYixFQUd1Qix5Q0FIdkIsRUFJS0EsT0FKTCxDQUlhLEtBSmIsRUFJb0Isb0NBSnBCOztBQU5BOzs7Ozs7QUFZQUQsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQjs7QUFFQSxJQUFJLENBQUNKLGVBQUtLLEdBQUwsQ0FBU0MsTUFBZCxFQUF1Qk4sZUFBS08sUUFBTCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcblxuYXJnc1xuICAgIC5jb21tYW5kKCdpbmZvJywgJ1Nob3cgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGN1cnJlbnRseSBjb25uZWN0ZWQgY2x1c3RlcicpXG4gICAgLmNvbW1hbmQoJ2FkZCcsICdBZGQgYSBjbHVzdGVyIHRvIHRoZSBjb25maWd1cmF0aW9uJylcbiAgICAuY29tbWFuZCgncmVtb3ZlJywgJ1JlbW92ZSBhIGNsdXN0ZXIgZnJvbSB0aGUgY29uZmlndXJhdGlvbicpXG4gICAgLmNvbW1hbmQoJ3VzZScsICdTZXQgd2hhdCBjbHVzdGVyIHRvIHVzZSBhcyBjdXJyZW50Jyk7XG4gICAgXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbmlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpOyJdfQ==