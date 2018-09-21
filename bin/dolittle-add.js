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

_args2.default.command('command', 'A command').command('commandhandler', 'A command handler').command('event', 'An event').command('eventprocessor', 'An event processor').command('readmodel', 'A read model').command('aggregateroot', 'An aggregate root').command('query', "A query").command('queryfor', 'A query for a specific read model');

_args2.default.parse(process.argv, { value: global.usagePrefix + USAGE, name: 'dolittle add' });

if (!_args2.default.sub.length) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiY29tbWFuZCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7Ozs7QUFFQSxJQUFNQSxRQUFRLCtCQUFkO0FBTkE7Ozs7O0FBT0FDLGVBQ0tDLE9BREwsQ0FDYSxTQURiLEVBQ3dCLFdBRHhCLEVBRUtBLE9BRkwsQ0FFYSxnQkFGYixFQUUrQixtQkFGL0IsRUFHS0EsT0FITCxDQUdhLE9BSGIsRUFHc0IsVUFIdEIsRUFJS0EsT0FKTCxDQUlhLGdCQUpiLEVBSStCLG9CQUovQixFQUtLQSxPQUxMLENBS2EsV0FMYixFQUswQixjQUwxQixFQU1LQSxPQU5MLENBTWEsZUFOYixFQU04QixtQkFOOUIsRUFPS0EsT0FQTCxDQU9hLE9BUGIsRUFPc0IsU0FQdEIsRUFRS0EsT0FSTCxDQVFhLFVBUmIsRUFReUIsbUNBUnpCOztBQVVBRCxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLE9BQU9DLFdBQVAsR0FBcUJSLEtBQTdCLEVBQW9DUyxNQUFNLGNBQTFDLEVBQXpCOztBQUVBLElBQUksQ0FBQ1IsZUFBS1MsR0FBTCxDQUFTQyxNQUFkLEVBQXVCVixlQUFLVyxRQUFMIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5cbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIGFkZCBbY29tbWFuZF0gW2FyZ3NdJ1xuYXJnc1xuICAgIC5jb21tYW5kKCdjb21tYW5kJywgJ0EgY29tbWFuZCcpXG4gICAgLmNvbW1hbmQoJ2NvbW1hbmRoYW5kbGVyJywgJ0EgY29tbWFuZCBoYW5kbGVyJylcbiAgICAuY29tbWFuZCgnZXZlbnQnLCAnQW4gZXZlbnQnKVxuICAgIC5jb21tYW5kKCdldmVudHByb2Nlc3NvcicsICdBbiBldmVudCBwcm9jZXNzb3InKVxuICAgIC5jb21tYW5kKCdyZWFkbW9kZWwnLCAnQSByZWFkIG1vZGVsJylcbiAgICAuY29tbWFuZCgnYWdncmVnYXRlcm9vdCcsICdBbiBhZ2dyZWdhdGUgcm9vdCcpXG4gICAgLmNvbW1hbmQoJ3F1ZXJ5JywgXCJBIHF1ZXJ5XCIpXG4gICAgLmNvbW1hbmQoJ3F1ZXJ5Zm9yJywgJ0EgcXVlcnkgZm9yIGEgc3BlY2lmaWMgcmVhZCBtb2RlbCcpO1xuICAgIFxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogZ2xvYmFsLnVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBhZGQnfSk7XG5cbmlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpO1xuIl19