#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_args2.default.command('application', 'An application').command('boundedcontext', 'A bounded context').command('command', 'A command').command('event', 'An event').command('readmodel', 'A read model').command('aggregateroot', 'An aggregate root');
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


_args2.default.parse(process.argv);

if (!_args2.default.sub.length) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUuanMiXSwibmFtZXMiOlsiYXJncyIsImNvbW1hbmQiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2Iiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7OztBQUVBQSxlQUNLQyxPQURMLENBQ2EsYUFEYixFQUM0QixnQkFENUIsRUFFS0EsT0FGTCxDQUVhLGdCQUZiLEVBRStCLG1CQUYvQixFQUdLQSxPQUhMLENBR2EsU0FIYixFQUd3QixXQUh4QixFQUlLQSxPQUpMLENBSWEsT0FKYixFQUlzQixVQUp0QixFQUtLQSxPQUxMLENBS2EsV0FMYixFQUswQixjQUwxQixFQU1LQSxPQU5MLENBTWEsZUFOYixFQU04QixtQkFOOUI7QUFOQTs7Ozs7O0FBY0FELGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkI7O0FBRUEsSUFBSSxDQUFDSixlQUFLSyxHQUFMLENBQVNDLE1BQWQsRUFBdUJOLGVBQUtPLFFBQUwiLCJmaWxlIjoiZG9saXR0bGUtY3JlYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcblxuYXJnc1xuICAgIC5jb21tYW5kKCdhcHBsaWNhdGlvbicsICdBbiBhcHBsaWNhdGlvbicpXG4gICAgLmNvbW1hbmQoJ2JvdW5kZWRjb250ZXh0JywgJ0EgYm91bmRlZCBjb250ZXh0JylcbiAgICAuY29tbWFuZCgnY29tbWFuZCcsICdBIGNvbW1hbmQnKVxuICAgIC5jb21tYW5kKCdldmVudCcsICdBbiBldmVudCcpXG4gICAgLmNvbW1hbmQoJ3JlYWRtb2RlbCcsICdBIHJlYWQgbW9kZWwnKVxuICAgIC5jb21tYW5kKCdhZ2dyZWdhdGVyb290JywgJ0FuIGFnZ3JlZ2F0ZSByb290Jyk7XG4gICAgXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbmlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpOyJdfQ==