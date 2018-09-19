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
var inquirer = require('inquirer');

var USAGE = 'dolittle add queryfor';
_args2.default.example(USAGE, "Creates a query for a read model in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add queryfor' });

inquirer.prompt(_global2.default.languageQuestion).then(function (answers) {
  _global2.default.artifactsManager.createQueryFor(answers.language);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtcXVlcnlmb3IuanMiXSwibmFtZXMiOlsiaW5xdWlyZXIiLCJyZXF1aXJlIiwiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInByb21wdCIsImxhbmd1YWdlUXVlc3Rpb24iLCJ0aGVuIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZVF1ZXJ5Rm9yIiwiYW5zd2VycyIsImxhbmd1YWdlIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0EsSUFBSUEsV0FBV0MsUUFBUSxVQUFSLENBQWY7O0FBRUEsSUFBTUMsUUFBUSx1QkFBZDtBQUNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0Isd0RBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLGlCQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSx1QkFBMUMsRUFBekI7O0FBRUFYLFNBQVNZLE1BQVQsQ0FBZ0JILGlCQUFPSSxnQkFBdkIsRUFBeUNDLElBQXpDLENBQThDLG1CQUFXO0FBQ3JETCxtQkFBT00sZ0JBQVAsQ0FBd0JDLGNBQXhCLENBQXVDQyxRQUFRQyxRQUEvQztBQUNELENBRkgiLCJmaWxlIjoiZG9saXR0bGUtYWRkLXF1ZXJ5Zm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuXG52YXIgaW5xdWlyZXIgPSByZXF1aXJlKCdpbnF1aXJlcicpO1xuXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBhZGQgcXVlcnlmb3InO1xuYXJnc1xuICAgIC5leGFtcGxlKFVTQUdFLCBcIkNyZWF0ZXMgYSBxdWVyeSBmb3IgYSByZWFkIG1vZGVsIGluIHRoZSBjdXJyZW50IGZvbGRlclwiKTtcbiBcbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IGdsb2JhbC51c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgYWRkIHF1ZXJ5Zm9yJ30pO1xuXG5pbnF1aXJlci5wcm9tcHQoZ2xvYmFsLmxhbmd1YWdlUXVlc3Rpb24pLnRoZW4oYW5zd2VycyA9PiB7XG4gICAgZ2xvYmFsLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlUXVlcnlGb3IoYW5zd2Vycy5sYW5ndWFnZSk7XG4gIH0pO1xuIl19