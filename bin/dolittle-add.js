#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle add [command] [args]';
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.command('command', 'A command').command('event', 'An event').command('readmodel', 'A read model').command('aggregateroot', 'An aggregate root').command('query', "A query").command('queryfor', 'A query for a specific read model');

_args2.default.parse(process.argv, { value: global.usagePrefix + USAGE, name: 'dolittle add' });

if (!_args2.default.sub.length) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiY29tbWFuZCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7Ozs7QUFFQSxJQUFNQSxRQUFRLCtCQUFkO0FBTkE7Ozs7O0FBT0FDLGVBQ0tDLE9BREwsQ0FDYSxTQURiLEVBQ3dCLFdBRHhCLEVBRUtBLE9BRkwsQ0FFYSxPQUZiLEVBRXNCLFVBRnRCLEVBR0tBLE9BSEwsQ0FHYSxXQUhiLEVBRzBCLGNBSDFCLEVBSUtBLE9BSkwsQ0FJYSxlQUpiLEVBSThCLG1CQUo5QixFQUtLQSxPQUxMLENBS2EsT0FMYixFQUtzQixTQUx0QixFQU1LQSxPQU5MLENBTWEsVUFOYixFQU15QixtQ0FOekI7O0FBUUFELGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsT0FBT0MsV0FBUCxHQUFxQlIsS0FBN0IsRUFBb0NTLE1BQU0sY0FBMUMsRUFBekI7O0FBRUEsSUFBSSxDQUFDUixlQUFLUyxHQUFMLENBQVNDLE1BQWQsRUFBdUJWLGVBQUtXLFFBQUwiLCJmaWxlIjoiZG9saXR0bGUtYWRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIFtjb21tYW5kXSBbYXJnc10nXG5hcmdzXG4gICAgLmNvbW1hbmQoJ2NvbW1hbmQnLCAnQSBjb21tYW5kJylcbiAgICAuY29tbWFuZCgnZXZlbnQnLCAnQW4gZXZlbnQnKVxuICAgIC5jb21tYW5kKCdyZWFkbW9kZWwnLCAnQSByZWFkIG1vZGVsJylcbiAgICAuY29tbWFuZCgnYWdncmVnYXRlcm9vdCcsICdBbiBhZ2dyZWdhdGUgcm9vdCcpXG4gICAgLmNvbW1hbmQoJ3F1ZXJ5JywgXCJBIHF1ZXJ5XCIpXG4gICAgLmNvbW1hbmQoJ3F1ZXJ5Zm9yJywgJ0EgcXVlcnkgZm9yIGEgc3BlY2lmaWMgcmVhZCBtb2RlbCcpO1xuICAgIFxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogZ2xvYmFsLnVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBhZGQnfSk7XG5cbmlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpO1xuIl19