#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dynamically get all boilerplates by language


_args2.default.command('application', 'A bounded context').command('boundedcontext', 'A bounded context');
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var flags = _args2.default.parse(process.argv);

if (_args2.default.sub.length == 0) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9jcmVhdGUvaW5kZXguanMiXSwibmFtZXMiOlsiYXJncyIsImNvbW1hbmQiLCJmbGFncyIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7Ozs7O0FBRUE7OztBQUdBQSxlQUNLQyxPQURMLENBQ2EsYUFEYixFQUM0QixtQkFENUIsRUFFS0EsT0FGTCxDQUVhLGdCQUZiLEVBRStCLG1CQUYvQjtBQVRBOzs7Ozs7QUFjQSxJQUFNQyxRQUFRRixlQUFLRyxLQUFMLENBQVdDLFFBQVFDLElBQW5CLENBQWQ7O0FBRUEsSUFBSUwsZUFBS00sR0FBTCxDQUFTQyxNQUFULElBQW1CLENBQXZCLEVBQTJCUCxlQUFLUSxRQUFMIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcblxuLy8gRHluYW1pY2FsbHkgZ2V0IGFsbCBib2lsZXJwbGF0ZXMgYnkgbGFuZ3VhZ2VcblxuXG5hcmdzXG4gICAgLmNvbW1hbmQoJ2FwcGxpY2F0aW9uJywgJ0EgYm91bmRlZCBjb250ZXh0JylcbiAgICAuY29tbWFuZCgnYm91bmRlZGNvbnRleHQnLCAnQSBib3VuZGVkIGNvbnRleHQnKVxuICAgIDtcbiAgICBcbmNvbnN0IGZsYWdzID0gYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuXG5pZiggYXJncy5zdWIubGVuZ3RoID09IDAgKSBhcmdzLnNob3dIZWxwKCk7Il19