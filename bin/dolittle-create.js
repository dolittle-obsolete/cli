#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle create [command] [args]';
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.command('application', 'An application').command('boundedcontext', 'A bounded context').command('command', 'A command').command('event', 'An event').command('readmodel', 'A read model').command('aggregateroot', 'An aggregate root');

_args2.default.parse(process.argv, { value: global.usagePrefix + USAGE, name: 'dolittle create' });

if (!_args2.default.sub.length) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiY29tbWFuZCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7Ozs7QUFDQSxJQUFNQSxRQUFRLGtDQUFkO0FBTEE7Ozs7O0FBTUFDLGVBQ0tDLE9BREwsQ0FDYSxhQURiLEVBQzRCLGdCQUQ1QixFQUVLQSxPQUZMLENBRWEsZ0JBRmIsRUFFK0IsbUJBRi9CLEVBR0tBLE9BSEwsQ0FHYSxTQUhiLEVBR3dCLFdBSHhCLEVBSUtBLE9BSkwsQ0FJYSxPQUpiLEVBSXNCLFVBSnRCLEVBS0tBLE9BTEwsQ0FLYSxXQUxiLEVBSzBCLGNBTDFCLEVBTUtBLE9BTkwsQ0FNYSxlQU5iLEVBTThCLG1CQU45Qjs7QUFRSUQsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQixFQUF5QixFQUFDQyxPQUFPQyxPQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSxpQkFBMUMsRUFBekI7O0FBRUosSUFBSSxDQUFDUixlQUFLUyxHQUFMLENBQVNDLE1BQWQsRUFBdUJWLGVBQUtXLFFBQUwiLCJmaWxlIjoiZG9saXR0bGUtY3JlYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIGNyZWF0ZSBbY29tbWFuZF0gW2FyZ3NdJ1xuYXJnc1xuICAgIC5jb21tYW5kKCdhcHBsaWNhdGlvbicsICdBbiBhcHBsaWNhdGlvbicpXG4gICAgLmNvbW1hbmQoJ2JvdW5kZWRjb250ZXh0JywgJ0EgYm91bmRlZCBjb250ZXh0JylcbiAgICAuY29tbWFuZCgnY29tbWFuZCcsICdBIGNvbW1hbmQnKVxuICAgIC5jb21tYW5kKCdldmVudCcsICdBbiBldmVudCcpXG4gICAgLmNvbW1hbmQoJ3JlYWRtb2RlbCcsICdBIHJlYWQgbW9kZWwnKVxuICAgIC5jb21tYW5kKCdhZ2dyZWdhdGVyb290JywgJ0FuIGFnZ3JlZ2F0ZSByb290Jyk7XG4gICAgXG4gICAgYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogZ2xvYmFsLnVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBjcmVhdGUnfSk7XG5cbmlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpOyJdfQ==