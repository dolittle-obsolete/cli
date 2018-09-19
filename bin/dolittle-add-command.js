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
var USAGE = 'dolittle add command';
_args2.default.example(USAGE, "Creates a command in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add command' });

inquirer.prompt(_global2.default.languageQuestion).then(function (answers) {
  _global2.default.artifactsManager.createCommand(answers.language);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtY29tbWFuZC5qcyJdLCJuYW1lcyI6WyJpbnF1aXJlciIsInJlcXVpcmUiLCJVU0FHRSIsImFyZ3MiLCJleGFtcGxlIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInZhbHVlIiwiZ2xvYmFsIiwidXNhZ2VQcmVmaXgiLCJuYW1lIiwicHJvbXB0IiwibGFuZ3VhZ2VRdWVzdGlvbiIsInRoZW4iLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlQ29tbWFuZCIsImFuc3dlcnMiLCJsYW5ndWFnZSJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7OztBQUNBOzs7Ozs7QUFMQTs7OztBQU9BLElBQUlBLFdBQVdDLFFBQVEsVUFBUixDQUFmO0FBQ0EsSUFBTUMsUUFBUSxzQkFBZDtBQUNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0IseUNBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLGlCQUFPQyxXQUFQLEdBQXFCUixLQUE3QixFQUFvQ1MsTUFBTSxzQkFBMUMsRUFBekI7O0FBRUFYLFNBQVNZLE1BQVQsQ0FBZ0JILGlCQUFPSSxnQkFBdkIsRUFBeUNDLElBQXpDLENBQThDLG1CQUFXO0FBQ3JETCxtQkFBT00sZ0JBQVAsQ0FBd0JDLGFBQXhCLENBQXNDQyxRQUFRQyxRQUE5QztBQUNELENBRkgiLCJmaWxlIjoiZG9saXR0bGUtYWRkLWNvbW1hbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5cbnZhciBpbnF1aXJlciA9IHJlcXVpcmUoJ2lucXVpcmVyJyk7XG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBhZGQgY29tbWFuZCc7XG5hcmdzXG4gICAgLmV4YW1wbGUoVVNBR0UsIFwiQ3JlYXRlcyBhIGNvbW1hbmQgaW4gdGhlIGN1cnJlbnQgZm9sZGVyXCIpO1xuIFxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogZ2xvYmFsLnVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBhZGQgY29tbWFuZCd9KTtcblxuaW5xdWlyZXIucHJvbXB0KGdsb2JhbC5sYW5ndWFnZVF1ZXN0aW9uKS50aGVuKGFuc3dlcnMgPT4ge1xuICAgIGdsb2JhbC5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZUNvbW1hbmQoYW5zd2Vycy5sYW5ndWFnZSk7XG4gIH0pOyJdfQ==