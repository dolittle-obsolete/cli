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
var USAGE = 'dolittle veracity [command] [args]';
_args2.default.command('create', 'Create something from one of the boilerplates');

_args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle veracity create' });

if (!_args2.default.sub.length) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS12ZXJhY2l0eS5qcyJdLCJuYW1lcyI6WyJVU0FHRSIsImFyZ3MiLCJjb21tYW5kIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInZhbHVlIiwidXNhZ2VQcmVmaXgiLCJuYW1lIiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiXSwibWFwcGluZ3MiOiI7O0FBTUE7Ozs7QUFDQTs7OztBQUxBOzs7O0FBT0EsSUFBTUEsUUFBUSxvQ0FBZDtBQUNBQyxlQUNLQyxPQURMLENBQ2EsUUFEYixFQUN1QiwrQ0FEdkI7O0FBR0FELGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsdUJBQWNQLEtBQXRCLEVBQTZCUSxNQUFNLDBCQUFuQyxFQUF6Qjs7QUFFQSxJQUFJLENBQUNQLGVBQUtRLEdBQUwsQ0FBU0MsTUFBZCxFQUF1QlQsZUFBS1UsUUFBTCIsImZpbGUiOiJkb2xpdHRsZS12ZXJhY2l0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcclxuaW1wb3J0IHsgdXNhZ2VQcmVmaXggfSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgdmVyYWNpdHkgW2NvbW1hbmRdIFthcmdzXSc7XHJcbmFyZ3NcclxuICAgIC5jb21tYW5kKCdjcmVhdGUnLCAnQ3JlYXRlIHNvbWV0aGluZyBmcm9tIG9uZSBvZiB0aGUgYm9pbGVycGxhdGVzJyk7XHJcbiAgICBcclxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogdXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIHZlcmFjaXR5IGNyZWF0ZSd9KTtcclxuXHJcbmlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpOyJdfQ==