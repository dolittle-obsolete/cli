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
_args2.default.example("dolittle create command [name] [namespace]", "Creates a command with a given name and namespace in the current folder");

_args2.default.parse(process.argv);

if (!_args2.default.sub.length || _args2.default.sub.length < 2) _args2.default.showHelp();

_global2.default.artifactsManager.createCommand(_args2.default.sub[0], _args2.default.sub[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUtY29tbWFuZC5qcyJdLCJuYW1lcyI6WyJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCIsImdsb2JhbCIsImFydGlmYWN0c01hbmFnZXIiLCJjcmVhdGVDb21tYW5kIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0FBLGVBQ0tDLE9BREwsQ0FDYSw0Q0FEYixFQUMyRCx5RUFEM0Q7O0FBR0FELGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkI7O0FBRUEsSUFBSSxDQUFDSixlQUFLSyxHQUFMLENBQVNDLE1BQVYsSUFBb0JOLGVBQUtLLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUExQyxFQUE4Q04sZUFBS08sUUFBTDs7QUFFOUNDLGlCQUFPQyxnQkFBUCxDQUF3QkMsYUFBeEIsQ0FBc0NWLGVBQUtLLEdBQUwsQ0FBUyxDQUFULENBQXRDLEVBQW1ETCxlQUFLSyxHQUFMLENBQVMsQ0FBVCxDQUFuRCIsImZpbGUiOiJkb2xpdHRsZS1jcmVhdGUtY29tbWFuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcblxuYXJnc1xuICAgIC5leGFtcGxlKFwiZG9saXR0bGUgY3JlYXRlIGNvbW1hbmQgW25hbWVdIFtuYW1lc3BhY2VdXCIsIFwiQ3JlYXRlcyBhIGNvbW1hbmQgd2l0aCBhIGdpdmVuIG5hbWUgYW5kIG5hbWVzcGFjZSBpbiB0aGUgY3VycmVudCBmb2xkZXJcIik7XG4gXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbmlmKCAhYXJncy5zdWIubGVuZ3RoIHx8wqBhcmdzLnN1Yi5sZW5ndGggPCAyICkgYXJncy5zaG93SGVscCgpO1xuXG5nbG9iYWwuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVDb21tYW5kKGFyZ3Muc3ViWzBdLCBhcmdzLnN1YlsxXSk7Il19