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
var USAGE = 'dolittle create boundedcontext [name]';
_args2.default.example(USAGE, "Creates a bounded context with a given name");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle create boundedcontext' });

if (!_args2.default.sub.length) _args2.default.showHelp();

_global2.default.boundedContextManager.create(_args2.default.sub[0]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUtYm91bmRlZGNvbnRleHQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiY3JlYXRlIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0EsSUFBTUEsUUFBUSx1Q0FBZDtBQUNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0IsNkNBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLGlCQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSxnQ0FBMUMsRUFBekI7O0FBRUEsSUFBSSxDQUFDUixlQUFLUyxHQUFMLENBQVNDLE1BQWQsRUFBdUJWLGVBQUtXLFFBQUw7O0FBRXZCTCxpQkFBT00scUJBQVAsQ0FBNkJDLE1BQTdCLENBQW9DYixlQUFLUyxHQUFMLENBQVMsQ0FBVCxDQUFwQyIsImZpbGUiOiJkb2xpdHRsZS1jcmVhdGUtYm91bmRlZGNvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5cbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIGNyZWF0ZSBib3VuZGVkY29udGV4dCBbbmFtZV0nO1xuYXJnc1xuICAgIC5leGFtcGxlKFVTQUdFLCBcIkNyZWF0ZXMgYSBib3VuZGVkIGNvbnRleHQgd2l0aCBhIGdpdmVuIG5hbWVcIik7XG4gICAgXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwge3ZhbHVlOiBnbG9iYWwudXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGNyZWF0ZSBib3VuZGVkY29udGV4dCd9KTtcblxuaWYoICFhcmdzLnN1Yi5sZW5ndGggKSBhcmdzLnNob3dIZWxwKCk7XG5cbmdsb2JhbC5ib3VuZGVkQ29udGV4dE1hbmFnZXIuY3JlYXRlKGFyZ3Muc3ViWzBdKTsiXX0=