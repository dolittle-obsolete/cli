#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
_args2.default.example("dolittle create boundedcontext [name]", "Creates a bounded context with a given name");

_args2.default.parse(process.argv);

if (!_args2.default.sub.length) _args2.default.showHelp();

_global2.default.boundedContextManager.create(_args2.default.sub[0]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jcmVhdGUvYm91bmRlZENvbnRleHQuanMiXSwibmFtZXMiOlsiYXJncyIsImV4YW1wbGUiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2Iiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiLCJnbG9iYWwiLCJib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJjcmVhdGUiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7QUFDQTs7Ozs7O0FBTEE7Ozs7QUFPQUEsZUFDS0MsT0FETCxDQUNhLHVDQURiLEVBQ3NELDZDQUR0RDs7QUFHQUQsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQjs7QUFFQSxJQUFJLENBQUNKLGVBQUtLLEdBQUwsQ0FBU0MsTUFBZCxFQUF1Qk4sZUFBS08sUUFBTDs7QUFFdkJDLGlCQUFPQyxxQkFBUCxDQUE2QkMsTUFBN0IsQ0FBb0NWLGVBQUtLLEdBQUwsQ0FBUyxDQUFULENBQXBDIiwiZmlsZSI6ImJvdW5kZWRDb250ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi4vZ2xvYmFsJztcblxuYXJnc1xuICAgIC5leGFtcGxlKFwiZG9saXR0bGUgY3JlYXRlIGJvdW5kZWRjb250ZXh0IFtuYW1lXVwiLCBcIkNyZWF0ZXMgYSBib3VuZGVkIGNvbnRleHQgd2l0aCBhIGdpdmVuIG5hbWVcIik7XG4gICAgXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbmlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpO1xuXG5nbG9iYWwuYm91bmRlZENvbnRleHRNYW5hZ2VyLmNyZWF0ZShhcmdzLnN1YlswXSk7Il19