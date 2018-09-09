#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_args2.default.command('application', 'A bounded context').command('boundedcontext', 'A bounded context');
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


_args2.default.parse(process.argv);

if (!_args2.default.sub.length) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jcmVhdGUvaW5kZXguanMiXSwibmFtZXMiOlsiYXJncyIsImNvbW1hbmQiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2Iiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7OztBQUVBQSxlQUNLQyxPQURMLENBQ2EsYUFEYixFQUM0QixtQkFENUIsRUFFS0EsT0FGTCxDQUVhLGdCQUZiLEVBRStCLG1CQUYvQjtBQU5BOzs7Ozs7QUFVQUQsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQjs7QUFFQSxJQUFJLENBQUNKLGVBQUtLLEdBQUwsQ0FBU0MsTUFBZCxFQUF1Qk4sZUFBS08sUUFBTCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5cbmFyZ3NcbiAgICAuY29tbWFuZCgnYXBwbGljYXRpb24nLCAnQSBib3VuZGVkIGNvbnRleHQnKVxuICAgIC5jb21tYW5kKCdib3VuZGVkY29udGV4dCcsICdBIGJvdW5kZWQgY29udGV4dCcpO1xuICAgIFxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuXG5pZiggIWFyZ3Muc3ViLmxlbmd0aCApIGFyZ3Muc2hvd0hlbHAoKTsiXX0=