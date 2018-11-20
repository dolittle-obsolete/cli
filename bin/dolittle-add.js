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
var USAGE = 'dolittle add [command] [args]';
_args2.default.command('command', 'A command').command('commandhandler', 'A command handler').command('concept', 'A concept').command('intconcept', 'A concept as int').command('guidconcept', 'A concept as Guid').command('stringconcept', 'A concept as string').command('event', 'An event').command('eventprocessor', 'An event processor').command('readmodel', 'A read model').command('aggregateroot', 'An aggregate root').command('query', 'A query').command('queryfor', 'A query for a specific read model');

_args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle add' });

if (!_args2.default.sub.length) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiY29tbWFuZCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFMQTs7OztBQU9BLElBQU1BLFFBQVEsK0JBQWQ7QUFDQUMsZUFDS0MsT0FETCxDQUNhLFNBRGIsRUFDd0IsV0FEeEIsRUFFS0EsT0FGTCxDQUVhLGdCQUZiLEVBRStCLG1CQUYvQixFQUdLQSxPQUhMLENBR2EsU0FIYixFQUd3QixXQUh4QixFQUlLQSxPQUpMLENBSWEsWUFKYixFQUkyQixrQkFKM0IsRUFLS0EsT0FMTCxDQUthLGFBTGIsRUFLNEIsbUJBTDVCLEVBTUtBLE9BTkwsQ0FNYSxlQU5iLEVBTThCLHFCQU45QixFQU9LQSxPQVBMLENBT2EsT0FQYixFQU9zQixVQVB0QixFQVFLQSxPQVJMLENBUWEsZ0JBUmIsRUFRK0Isb0JBUi9CLEVBU0tBLE9BVEwsQ0FTYSxXQVRiLEVBUzBCLGNBVDFCLEVBVUtBLE9BVkwsQ0FVYSxlQVZiLEVBVThCLG1CQVY5QixFQVdLQSxPQVhMLENBV2EsT0FYYixFQVdzQixTQVh0QixFQVlLQSxPQVpMLENBWWEsVUFaYixFQVl5QixtQ0FaekI7O0FBZUFELGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsdUJBQWNQLEtBQXRCLEVBQTZCUSxNQUFNLGNBQW5DLEVBQXpCOztBQUVBLElBQUksQ0FBQ1AsZUFBS1EsR0FBTCxDQUFTQyxNQUFkLEVBQXVCVCxlQUFLVSxRQUFMIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCB7IHVzYWdlUHJlZml4IH0gZnJvbSAnLi9oZWxwZXJzJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIFtjb21tYW5kXSBbYXJnc10nO1xuYXJnc1xuICAgIC5jb21tYW5kKCdjb21tYW5kJywgJ0EgY29tbWFuZCcpXG4gICAgLmNvbW1hbmQoJ2NvbW1hbmRoYW5kbGVyJywgJ0EgY29tbWFuZCBoYW5kbGVyJylcbiAgICAuY29tbWFuZCgnY29uY2VwdCcsICdBIGNvbmNlcHQnKVxuICAgIC5jb21tYW5kKCdpbnRjb25jZXB0JywgJ0EgY29uY2VwdCBhcyBpbnQnKVxuICAgIC5jb21tYW5kKCdndWlkY29uY2VwdCcsICdBIGNvbmNlcHQgYXMgR3VpZCcpXG4gICAgLmNvbW1hbmQoJ3N0cmluZ2NvbmNlcHQnLCAnQSBjb25jZXB0IGFzIHN0cmluZycpXG4gICAgLmNvbW1hbmQoJ2V2ZW50JywgJ0FuIGV2ZW50JylcbiAgICAuY29tbWFuZCgnZXZlbnRwcm9jZXNzb3InLCAnQW4gZXZlbnQgcHJvY2Vzc29yJylcbiAgICAuY29tbWFuZCgncmVhZG1vZGVsJywgJ0EgcmVhZCBtb2RlbCcpXG4gICAgLmNvbW1hbmQoJ2FnZ3JlZ2F0ZXJvb3QnLCAnQW4gYWdncmVnYXRlIHJvb3QnKVxuICAgIC5jb21tYW5kKCdxdWVyeScsICdBIHF1ZXJ5JylcbiAgICAuY29tbWFuZCgncXVlcnlmb3InLCAnQSBxdWVyeSBmb3IgYSBzcGVjaWZpYyByZWFkIG1vZGVsJyk7XG5cbiAgICBcbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IHVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBhZGQnfSk7XG5cbmlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpO1xuIl19