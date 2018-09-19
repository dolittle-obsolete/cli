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

var USAGE = 'dolittle add query';
_args2.default.example(USAGE, "Creates a query in the current folder");

inquirer.prompt(_global2.default.languageQuestion).then(function (answers) {
    _global2.default.artifactsManager.createQuery(answers.language);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtcXVlcnkuanMiXSwibmFtZXMiOlsiaW5xdWlyZXIiLCJyZXF1aXJlIiwiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInByb21wdCIsImdsb2JhbCIsImxhbmd1YWdlUXVlc3Rpb24iLCJ0aGVuIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZVF1ZXJ5IiwiYW5zd2VycyIsImxhbmd1YWdlIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0EsSUFBSUEsV0FBV0MsUUFBUSxVQUFSLENBQWY7O0FBRUEsSUFBTUMsUUFBUSxvQkFBZDtBQUNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0IsdUNBRHBCOztBQUdBRixTQUFTSyxNQUFULENBQWdCQyxpQkFBT0MsZ0JBQXZCLEVBQXlDQyxJQUF6QyxDQUE4QyxtQkFBVztBQUNyREYscUJBQU9HLGdCQUFQLENBQXdCQyxXQUF4QixDQUFvQ0MsUUFBUUMsUUFBNUM7QUFDRCxDQUZIIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC1xdWVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcblxudmFyIGlucXVpcmVyID0gcmVxdWlyZSgnaW5xdWlyZXInKTtcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIHF1ZXJ5JztcbmFyZ3NcbiAgICAuZXhhbXBsZShVU0FHRSwgXCJDcmVhdGVzIGEgcXVlcnkgaW4gdGhlIGN1cnJlbnQgZm9sZGVyXCIpO1xuXG5pbnF1aXJlci5wcm9tcHQoZ2xvYmFsLmxhbmd1YWdlUXVlc3Rpb24pLnRoZW4oYW5zd2VycyA9PiB7XG4gICAgZ2xvYmFsLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlUXVlcnkoYW5zd2Vycy5sYW5ndWFnZSk7XG4gIH0pO1xuIl19