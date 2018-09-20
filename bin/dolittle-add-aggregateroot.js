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

if (!_args2.default.sub.length || _args2.default.sub.length < 2) _args2.default.showHelp();

var flags = { language: _args2.default.sub[0], name: _args2.default.sub[1] };
_global2.default.artifactsManager.createAggregateRoot(flags);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtYWdncmVnYXRlcm9vdC5qcyJdLCJuYW1lcyI6WyJVU0FHRSIsImFyZ3MiLCJleGFtcGxlIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInZhbHVlIiwiZ2xvYmFsIiwidXNhZ2VQcmVmaXgiLCJuYW1lIiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiLCJmbGFncyIsImxhbmd1YWdlIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZUFnZ3JlZ2F0ZVJvb3QiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7QUFDQTs7Ozs7O0FBTEE7Ozs7QUFPQSxJQUFNQSxRQUFRLG1DQUFkOztBQUVBQyxlQUNJQyxPQURKLENBQ1lGLEtBRFosRUFDbUIsaURBRG5COztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLGlCQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSw0QkFBMUMsRUFBekI7O0FBRUEsSUFBSSxDQUFFUixlQUFLUyxHQUFMLENBQVNDLE1BQVgsSUFBcUJWLGVBQUtTLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUEzQyxFQUE4Q1YsZUFBS1csUUFBTDs7QUFFOUMsSUFBSUMsUUFBUSxFQUFDQyxVQUFVYixlQUFLUyxHQUFMLENBQVMsQ0FBVCxDQUFYLEVBQXdCRCxNQUFNUixlQUFLUyxHQUFMLENBQVMsQ0FBVCxDQUE5QixFQUFaO0FBQ0FILGlCQUFPUSxnQkFBUCxDQUF3QkMsbUJBQXhCLENBQTRDSCxLQUE1QyIsImZpbGUiOiJkb2xpdHRsZS1hZGQtYWdncmVnYXRlcm9vdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIGFnZ3JlZ2F0ZXJvb3QgW25hbWVdJztcblxuYXJnc1xuICAgLmV4YW1wbGUoVVNBR0UsIFwiQ3JlYXRlcyBhbiBhZ2dyZWdhdGUgcm9vdCBpbiB0aGUgY3VycmVudCBmb2xkZXJcIik7XG5cbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IGdsb2JhbC51c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgYWRkIGFnZ3JlZ2F0ZXJvb3QnfSk7XG5cbmlmICghIGFyZ3Muc3ViLmxlbmd0aCB8fCBhcmdzLnN1Yi5sZW5ndGggPCAyKSBhcmdzLnNob3dIZWxwKCk7XG5cbmxldCBmbGFncyA9IHtsYW5ndWFnZTogYXJncy5zdWJbMF0sIG5hbWU6IGFyZ3Muc3ViWzFdfTsgXG5nbG9iYWwuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVBZ2dyZWdhdGVSb290KGZsYWdzKTsiXX0=