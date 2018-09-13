#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_args2.default.command('application', 'An application').command('boundedcontext', 'A bounded context').command('command', 'A command');
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


_args2.default.parse(process.argv);

if (!_args2.default.sub.length) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUuanMiXSwibmFtZXMiOlsiYXJncyIsImNvbW1hbmQiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2Iiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7OztBQUVBQSxlQUNLQyxPQURMLENBQ2EsYUFEYixFQUM0QixnQkFENUIsRUFFS0EsT0FGTCxDQUVhLGdCQUZiLEVBRStCLG1CQUYvQixFQUdLQSxPQUhMLENBR2EsU0FIYixFQUd3QixXQUh4QjtBQU5BOzs7Ozs7QUFXQUQsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQjs7QUFFQSxJQUFJLENBQUNKLGVBQUtLLEdBQUwsQ0FBU0MsTUFBZCxFQUF1Qk4sZUFBS08sUUFBTCIsImZpbGUiOiJkb2xpdHRsZS1jcmVhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuXG5hcmdzXG4gICAgLmNvbW1hbmQoJ2FwcGxpY2F0aW9uJywgJ0FuIGFwcGxpY2F0aW9uJylcbiAgICAuY29tbWFuZCgnYm91bmRlZGNvbnRleHQnLCAnQSBib3VuZGVkIGNvbnRleHQnKVxuICAgIC5jb21tYW5kKCdjb21tYW5kJywgJ0EgY29tbWFuZCcpXG4gICAgXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbmlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpOyJdfQ==