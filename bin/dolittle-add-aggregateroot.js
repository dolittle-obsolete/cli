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
var USAGE = 'dolittle add aggregateroot [name]';

_args2.default.example(USAGE, "Creates an aggregate root in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add aggregateroot' });

if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

var flags = { name: _args2.default.sub[0] };
_global2.default.artifactsManager.createAggregateRoot(flags);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtYWdncmVnYXRlcm9vdC5qcyJdLCJuYW1lcyI6WyJVU0FHRSIsImFyZ3MiLCJleGFtcGxlIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInZhbHVlIiwiZ2xvYmFsIiwidXNhZ2VQcmVmaXgiLCJuYW1lIiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiLCJmbGFncyIsImFydGlmYWN0c01hbmFnZXIiLCJjcmVhdGVBZ2dyZWdhdGVSb290Il0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0EsSUFBTUEsUUFBUSxtQ0FBZDs7QUFFQUMsZUFDSUMsT0FESixDQUNZRixLQURaLEVBQ21CLGlEQURuQjs7QUFHQUMsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQixFQUF5QixFQUFDQyxPQUFPQyxpQkFBT0MsV0FBUCxHQUFxQlIsS0FBN0IsRUFBb0NTLE1BQU0sNEJBQTFDLEVBQXpCOztBQUVBLElBQUksQ0FBRVIsZUFBS1MsR0FBTCxDQUFTQyxNQUFYLElBQXFCVixlQUFLUyxHQUFMLENBQVNDLE1BQVQsR0FBa0IsQ0FBM0MsRUFBOENWLGVBQUtXLFFBQUw7O0FBRTlDLElBQUlDLFFBQVEsRUFBQ0osTUFBTVIsZUFBS1MsR0FBTCxDQUFTLENBQVQsQ0FBUCxFQUFaO0FBQ0FILGlCQUFPTyxnQkFBUCxDQUF3QkMsbUJBQXhCLENBQTRDRixLQUE1QyIsImZpbGUiOiJkb2xpdHRsZS1hZGQtYWdncmVnYXRlcm9vdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIGFnZ3JlZ2F0ZXJvb3QgW25hbWVdJztcblxuYXJnc1xuICAgLmV4YW1wbGUoVVNBR0UsIFwiQ3JlYXRlcyBhbiBhZ2dyZWdhdGUgcm9vdCBpbiB0aGUgY3VycmVudCBmb2xkZXJcIik7XG5cbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IGdsb2JhbC51c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgYWRkIGFnZ3JlZ2F0ZXJvb3QnfSk7XG5cbmlmICghIGFyZ3Muc3ViLmxlbmd0aCB8fCBhcmdzLnN1Yi5sZW5ndGggPCAxKSBhcmdzLnNob3dIZWxwKCk7XG5cbmxldCBmbGFncyA9IHtuYW1lOiBhcmdzLnN1YlswXX07IFxuZ2xvYmFsLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlQWdncmVnYXRlUm9vdChmbGFncyk7Il19