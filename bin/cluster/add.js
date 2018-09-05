#!/usr/bin/env node
"use strict";

var _args = require("args");

var _args2 = _interopRequireDefault(_args);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_args2.default.example("dolittle cluster add [name] [url]", "Adds a cluster to the configuration");
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var flags = _args2.default.parse(process.argv);
if (_args2.default.sub.length == 0) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jbHVzdGVyL2FkZC5qcyJdLCJuYW1lcyI6WyJhcmdzIiwiZXhhbXBsZSIsImZsYWdzIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7Ozs7QUFFQUEsZUFDS0MsT0FETCxDQUNhLG1DQURiLEVBQ2tELHFDQURsRDtBQU5BOzs7Ozs7QUFVQSxJQUFNQyxRQUFRRixlQUFLRyxLQUFMLENBQVdDLFFBQVFDLElBQW5CLENBQWQ7QUFDQSxJQUFJTCxlQUFLTSxHQUFMLENBQVNDLE1BQVQsSUFBbUIsQ0FBdkIsRUFBMEJQLGVBQUtRLFFBQUwiLCJmaWxlIjoiYWRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcblxuYXJnc1xuICAgIC5leGFtcGxlKFwiZG9saXR0bGUgY2x1c3RlciBhZGQgW25hbWVdIFt1cmxdXCIsIFwiQWRkcyBhIGNsdXN0ZXIgdG8gdGhlIGNvbmZpZ3VyYXRpb25cIilcbiAgICA7XG4gICAgXG5jb25zdCBmbGFncyA9IGFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2KTtcbmlmIChhcmdzLnN1Yi5sZW5ndGggPT0gMCkgYXJncy5zaG93SGVscCgpOyJdfQ==