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
var USAGE = 'dolittle add aggregateroot';
_args2.default.example(USAGE, "Creates an aggregate root in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add aggregateroot' });

inquirer.prompt(_global2.default.languageQuestion).then(function (answers) {
  _global2.default.artifactsManager.createAggregateRoot(answers.language);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtYWdncmVnYXRlcm9vdC5qcyJdLCJuYW1lcyI6WyJpbnF1aXJlciIsInJlcXVpcmUiLCJVU0FHRSIsImFyZ3MiLCJleGFtcGxlIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInZhbHVlIiwiZ2xvYmFsIiwidXNhZ2VQcmVmaXgiLCJuYW1lIiwicHJvbXB0IiwibGFuZ3VhZ2VRdWVzdGlvbiIsInRoZW4iLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlQWdncmVnYXRlUm9vdCIsImFuc3dlcnMiLCJsYW5ndWFnZSJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7OztBQUNBOzs7Ozs7QUFMQTs7OztBQU9BLElBQUlBLFdBQVdDLFFBQVEsVUFBUixDQUFmO0FBQ0EsSUFBTUMsUUFBUSw0QkFBZDtBQUNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0IsaURBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLGlCQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSw0QkFBMUMsRUFBekI7O0FBRUFYLFNBQVNZLE1BQVQsQ0FBZ0JILGlCQUFPSSxnQkFBdkIsRUFBeUNDLElBQXpDLENBQThDLG1CQUFXO0FBQ3JETCxtQkFBT00sZ0JBQVAsQ0FBd0JDLG1CQUF4QixDQUE0Q0MsUUFBUUMsUUFBcEQ7QUFDRCxDQUZIIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC1hZ2dyZWdhdGVyb290LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuXG52YXIgaW5xdWlyZXIgPSByZXF1aXJlKCdpbnF1aXJlcicpO1xuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIGFnZ3JlZ2F0ZXJvb3QnO1xuYXJnc1xuICAgIC5leGFtcGxlKFVTQUdFLCBcIkNyZWF0ZXMgYW4gYWdncmVnYXRlIHJvb3QgaW4gdGhlIGN1cnJlbnQgZm9sZGVyXCIpO1xuIFxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogZ2xvYmFsLnVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBhZGQgYWdncmVnYXRlcm9vdCd9KTtcblxuaW5xdWlyZXIucHJvbXB0KGdsb2JhbC5sYW5ndWFnZVF1ZXN0aW9uKS50aGVuKGFuc3dlcnMgPT4ge1xuICAgIGdsb2JhbC5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZUFnZ3JlZ2F0ZVJvb3QoYW5zd2Vycy5sYW5ndWFnZSk7XG4gIH0pOyJdfQ==