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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiY29tbWFuZCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFMQTs7OztBQU9BLElBQU1BLFFBQVEsK0JBQWQ7QUFDQUMsZUFDS0MsT0FETCxDQUNhLFNBRGIsRUFDd0IsV0FEeEIsRUFFS0EsT0FGTCxDQUVhLGdCQUZiLEVBRStCLG1CQUYvQixFQUdLQSxPQUhMLENBR2EsU0FIYixFQUd3QixXQUh4QixFQUlLQSxPQUpMLENBSWEsWUFKYixFQUkyQixrQkFKM0IsRUFLS0EsT0FMTCxDQUthLGFBTGIsRUFLNEIsbUJBTDVCLEVBTUtBLE9BTkwsQ0FNYSxlQU5iLEVBTThCLHFCQU45QixFQU9LQSxPQVBMLENBT2EsT0FQYixFQU9zQixVQVB0QixFQVFLQSxPQVJMLENBUWEsZ0JBUmIsRUFRK0Isb0JBUi9CLEVBU0tBLE9BVEwsQ0FTYSxXQVRiLEVBUzBCLGNBVDFCLEVBVUtBLE9BVkwsQ0FVYSxlQVZiLEVBVThCLG1CQVY5QixFQVdLQSxPQVhMLENBV2EsT0FYYixFQVdzQixTQVh0QixFQVlLQSxPQVpMLENBWWEsVUFaYixFQVl5QixtQ0FaekI7O0FBZUFELGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsdUJBQWNQLEtBQXRCLEVBQTZCUSxNQUFNLGNBQW5DLEVBQXpCOztBQUVBLElBQUksQ0FBQ1AsZUFBS1EsR0FBTCxDQUFTQyxNQUFkLEVBQXVCVCxlQUFLVSxRQUFMIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcclxuaW1wb3J0IHsgdXNhZ2VQcmVmaXggfSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIFtjb21tYW5kXSBbYXJnc10nO1xyXG5hcmdzXHJcbiAgICAuY29tbWFuZCgnY29tbWFuZCcsICdBIGNvbW1hbmQnKVxyXG4gICAgLmNvbW1hbmQoJ2NvbW1hbmRoYW5kbGVyJywgJ0EgY29tbWFuZCBoYW5kbGVyJylcclxuICAgIC5jb21tYW5kKCdjb25jZXB0JywgJ0EgY29uY2VwdCcpXHJcbiAgICAuY29tbWFuZCgnaW50Y29uY2VwdCcsICdBIGNvbmNlcHQgYXMgaW50JylcclxuICAgIC5jb21tYW5kKCdndWlkY29uY2VwdCcsICdBIGNvbmNlcHQgYXMgR3VpZCcpXHJcbiAgICAuY29tbWFuZCgnc3RyaW5nY29uY2VwdCcsICdBIGNvbmNlcHQgYXMgc3RyaW5nJylcclxuICAgIC5jb21tYW5kKCdldmVudCcsICdBbiBldmVudCcpXHJcbiAgICAuY29tbWFuZCgnZXZlbnRwcm9jZXNzb3InLCAnQW4gZXZlbnQgcHJvY2Vzc29yJylcclxuICAgIC5jb21tYW5kKCdyZWFkbW9kZWwnLCAnQSByZWFkIG1vZGVsJylcclxuICAgIC5jb21tYW5kKCdhZ2dyZWdhdGVyb290JywgJ0FuIGFnZ3JlZ2F0ZSByb290JylcclxuICAgIC5jb21tYW5kKCdxdWVyeScsICdBIHF1ZXJ5JylcclxuICAgIC5jb21tYW5kKCdxdWVyeWZvcicsICdBIHF1ZXJ5IGZvciBhIHNwZWNpZmljIHJlYWQgbW9kZWwnKTtcclxuXHJcbiAgICBcclxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogdXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGFkZCd9KTtcclxuXHJcbmlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpO1xyXG4iXX0=