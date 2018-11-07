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
_args2.default.command('command', 'A command').command('commandhandler', 'A command handler').command('event', 'An event').command('eventprocessor', 'An event processor').command('readmodel', 'A read model').command('aggregateroot', 'An aggregate root').command('query', 'A query').command('queryfor', 'A query for a specific read model');

_args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle add' });

if (!_args2.default.sub.length) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiY29tbWFuZCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFMQTs7OztBQU9BLElBQU1BLFFBQVEsK0JBQWQ7QUFDQUMsZUFDS0MsT0FETCxDQUNhLFNBRGIsRUFDd0IsV0FEeEIsRUFFS0EsT0FGTCxDQUVhLGdCQUZiLEVBRStCLG1CQUYvQixFQUdLQSxPQUhMLENBR2EsT0FIYixFQUdzQixVQUh0QixFQUlLQSxPQUpMLENBSWEsZ0JBSmIsRUFJK0Isb0JBSi9CLEVBS0tBLE9BTEwsQ0FLYSxXQUxiLEVBSzBCLGNBTDFCLEVBTUtBLE9BTkwsQ0FNYSxlQU5iLEVBTThCLG1CQU45QixFQU9LQSxPQVBMLENBT2EsT0FQYixFQU9zQixTQVB0QixFQVFLQSxPQVJMLENBUWEsVUFSYixFQVF5QixtQ0FSekI7O0FBV0FELGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsdUJBQWNQLEtBQXRCLEVBQTZCUSxNQUFNLGNBQW5DLEVBQXpCOztBQUVBLElBQUksQ0FBQ1AsZUFBS1EsR0FBTCxDQUFTQyxNQUFkLEVBQXVCVCxlQUFLVSxRQUFMIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCB7IHVzYWdlUHJlZml4IH0gZnJvbSAnLi9oZWxwZXJzJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIFtjb21tYW5kXSBbYXJnc10nO1xuYXJnc1xuICAgIC5jb21tYW5kKCdjb21tYW5kJywgJ0EgY29tbWFuZCcpXG4gICAgLmNvbW1hbmQoJ2NvbW1hbmRoYW5kbGVyJywgJ0EgY29tbWFuZCBoYW5kbGVyJylcbiAgICAuY29tbWFuZCgnZXZlbnQnLCAnQW4gZXZlbnQnKVxuICAgIC5jb21tYW5kKCdldmVudHByb2Nlc3NvcicsICdBbiBldmVudCBwcm9jZXNzb3InKVxuICAgIC5jb21tYW5kKCdyZWFkbW9kZWwnLCAnQSByZWFkIG1vZGVsJylcbiAgICAuY29tbWFuZCgnYWdncmVnYXRlcm9vdCcsICdBbiBhZ2dyZWdhdGUgcm9vdCcpXG4gICAgLmNvbW1hbmQoJ3F1ZXJ5JywgJ0EgcXVlcnknKVxuICAgIC5jb21tYW5kKCdxdWVyeWZvcicsICdBIHF1ZXJ5IGZvciBhIHNwZWNpZmljIHJlYWQgbW9kZWwnKTtcblxuICAgIFxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogdXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGFkZCd9KTtcblxuaWYoICFhcmdzLnN1Yi5sZW5ndGggKSBhcmdzLnNob3dIZWxwKCk7XG4iXX0=