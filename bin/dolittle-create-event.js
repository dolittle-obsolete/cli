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
var USAGE = 'dolittle create event [name] [namespace]';
_args2.default.example(USAGE, "Creates an event with a given name and namespace in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle create event' });

if (!_args2.default.sub.length || _args2.default.sub.length < 2) _args2.default.showHelp();

_global2.default.artifactsManager.createEvent(_args2.default.sub[0], _args2.default.sub[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUtZXZlbnQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZUV2ZW50Il0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0EsSUFBTUEsUUFBUSwwQ0FBZDtBQUNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0Isd0VBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLGlCQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSx1QkFBMUMsRUFBekI7O0FBRUEsSUFBSSxDQUFDUixlQUFLUyxHQUFMLENBQVNDLE1BQVYsSUFBb0JWLGVBQUtTLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUExQyxFQUE4Q1YsZUFBS1csUUFBTDs7QUFFOUNMLGlCQUFPTSxnQkFBUCxDQUF3QkMsV0FBeEIsQ0FBb0NiLGVBQUtTLEdBQUwsQ0FBUyxDQUFULENBQXBDLEVBQWlEVCxlQUFLUyxHQUFMLENBQVMsQ0FBVCxDQUFqRCIsImZpbGUiOiJkb2xpdHRsZS1jcmVhdGUtZXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5cbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIGNyZWF0ZSBldmVudCBbbmFtZV0gW25hbWVzcGFjZV0nO1xuYXJnc1xuICAgIC5leGFtcGxlKFVTQUdFLCBcIkNyZWF0ZXMgYW4gZXZlbnQgd2l0aCBhIGdpdmVuIG5hbWUgYW5kIG5hbWVzcGFjZSBpbiB0aGUgY3VycmVudCBmb2xkZXJcIik7XG4gXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwge3ZhbHVlOiBnbG9iYWwudXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGNyZWF0ZSBldmVudCd9KTtcblxuaWYoICFhcmdzLnN1Yi5sZW5ndGggfHzCoGFyZ3Muc3ViLmxlbmd0aCA8IDIgKSBhcmdzLnNob3dIZWxwKCk7XG5cbmdsb2JhbC5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZUV2ZW50KGFyZ3Muc3ViWzBdLCBhcmdzLnN1YlsxXSk7Il19