#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _global = require('./global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var USAGE = 'dolittle add eventprocessor [name]';
_args2.default.example(USAGE, "Creates an event processor in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add eventprocessor' });

if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

var flags = { name: _args2.default.sub[0] };
_global2.default.artifactsManager.createEventProcessor(flags);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtZXZlbnRwcm9jZXNzb3IuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiZmxhZ3MiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlRXZlbnRQcm9jZXNzb3IiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7QUFDQTs7Ozs7O0FBTEE7Ozs7QUFPQSxJQUFNQSxRQUFRLG9DQUFkO0FBQ0FDLGVBQ0tDLE9BREwsQ0FDYUYsS0FEYixFQUNvQixrREFEcEI7O0FBR0FDLGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsaUJBQU9DLFdBQVAsR0FBcUJSLEtBQTdCLEVBQW9DUyxNQUFNLDZCQUExQyxFQUF6Qjs7QUFFQSxJQUFJLENBQUVSLGVBQUtTLEdBQUwsQ0FBU0MsTUFBWCxJQUFxQlYsZUFBS1MsR0FBTCxDQUFTQyxNQUFULEdBQWtCLENBQTNDLEVBQThDVixlQUFLVyxRQUFMOztBQUU5QyxJQUFJQyxRQUFRLEVBQUNKLE1BQU1SLGVBQUtTLEdBQUwsQ0FBUyxDQUFULENBQVAsRUFBWjtBQUNBSCxpQkFBT08sZ0JBQVAsQ0FBd0JDLG9CQUF4QixDQUE2Q0YsS0FBN0MiLCJmaWxlIjoiZG9saXR0bGUtYWRkLWV2ZW50cHJvY2Vzc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBhZGQgZXZlbnRwcm9jZXNzb3IgW25hbWVdJztcbmFyZ3NcbiAgICAuZXhhbXBsZShVU0FHRSwgXCJDcmVhdGVzIGFuIGV2ZW50IHByb2Nlc3NvciBpbiB0aGUgY3VycmVudCBmb2xkZXJcIik7XG4gXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwge3ZhbHVlOiBnbG9iYWwudXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGFkZCBldmVudHByb2Nlc3Nvcid9KTtcblxuaWYgKCEgYXJncy5zdWIubGVuZ3RoIHx8IGFyZ3Muc3ViLmxlbmd0aCA8IDEpIGFyZ3Muc2hvd0hlbHAoKTtcblxubGV0IGZsYWdzID0ge25hbWU6IGFyZ3Muc3ViWzBdfTsgXG5nbG9iYWwuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVFdmVudFByb2Nlc3NvcihmbGFncyk7Il19