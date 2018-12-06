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
var USAGE = 'dolittle veracity create [command] [args]';
_args2.default.command('boundedcontext', 'A bounded context');

_args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle veracity create' });

if (!_args2.default.sub.length) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS12ZXJhY2l0eS1jcmVhdGUuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiY29tbWFuZCIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFMQTs7OztBQU9BLElBQU1BLFFBQVEsMkNBQWQ7QUFDQUMsZUFDS0MsT0FETCxDQUNhLGdCQURiLEVBQytCLG1CQUQvQjs7QUFHQUQsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQixFQUF5QixFQUFDQyxPQUFPQyx1QkFBY1AsS0FBdEIsRUFBNkJRLE1BQU0sMEJBQW5DLEVBQXpCOztBQUVBLElBQUksQ0FBQ1AsZUFBS1EsR0FBTCxDQUFTQyxNQUFkLEVBQXVCVCxlQUFLVSxRQUFMIiwiZmlsZSI6ImRvbGl0dGxlLXZlcmFjaXR5LWNyZWF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcclxuaW1wb3J0IHsgdXNhZ2VQcmVmaXggfSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgdmVyYWNpdHkgY3JlYXRlIFtjb21tYW5kXSBbYXJnc10nO1xyXG5hcmdzXHJcbiAgICAuY29tbWFuZCgnYm91bmRlZGNvbnRleHQnLCAnQSBib3VuZGVkIGNvbnRleHQnKTtcclxuICAgIFxyXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwge3ZhbHVlOiB1c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgdmVyYWNpdHkgY3JlYXRlJ30pO1xyXG5cclxuaWYoICFhcmdzLnN1Yi5sZW5ndGggKSBhcmdzLnNob3dIZWxwKCk7Il19