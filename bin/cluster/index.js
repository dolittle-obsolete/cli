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


var flags = _args2.default.parse(process.argv);

if (_args2.default.sub.length == 0) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jbHVzdGVyL2luZGV4LmpzIl0sIm5hbWVzIjpbImFyZ3MiLCJjb21tYW5kIiwiZmxhZ3MiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2Iiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7OztBQUVBQSxlQUNLQyxPQURMLENBQ2EsTUFEYixFQUNxQix3REFEckIsRUFFS0EsT0FGTCxDQUVhLEtBRmIsRUFFb0Isb0NBRnBCLEVBR0tBLE9BSEwsQ0FHYSxRQUhiLEVBR3VCLHlDQUh2QixFQUlLQSxPQUpMLENBSWEsS0FKYixFQUlvQixvQ0FKcEI7QUFOQTs7Ozs7O0FBYUEsSUFBTUMsUUFBUUYsZUFBS0csS0FBTCxDQUFXQyxRQUFRQyxJQUFuQixDQUFkOztBQUVBLElBQUlMLGVBQUtNLEdBQUwsQ0FBU0MsTUFBVCxJQUFtQixDQUF2QixFQUEyQlAsZUFBS1EsUUFBTCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5cbmFyZ3NcbiAgICAuY29tbWFuZCgnaW5mbycsICdTaG93IGluZm9ybWF0aW9uIGFib3V0IHRoZSBjdXJyZW50bHkgY29ubmVjdGVkIGNsdXN0ZXInKVxuICAgIC5jb21tYW5kKCdhZGQnLCAnQWRkIGEgY2x1c3RlciB0byB0aGUgY29uZmlndXJhdGlvbicpXG4gICAgLmNvbW1hbmQoJ3JlbW92ZScsICdSZW1vdmUgYSBjbHVzdGVyIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24nKVxuICAgIC5jb21tYW5kKCd1c2UnLCAnU2V0IHdoYXQgY2x1c3RlciB0byB1c2UgYXMgY3VycmVudCcpXG4gICAgO1xuICAgIFxuY29uc3QgZmxhZ3MgPSBhcmdzLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbmlmKCBhcmdzLnN1Yi5sZW5ndGggPT0gMCApIGFyZ3Muc2hvd0hlbHAoKTsiXX0=