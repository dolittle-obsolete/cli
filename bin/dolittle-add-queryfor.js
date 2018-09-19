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

inquirer.prompt(_global2.default.languageQuestion).then(function (answers) {
    _global2.default.artifactsManager.createQueryFor(answers.language);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtcXVlcnlmb3IuanMiXSwibmFtZXMiOlsiaW5xdWlyZXIiLCJyZXF1aXJlIiwiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInByb21wdCIsImdsb2JhbCIsImxhbmd1YWdlUXVlc3Rpb24iLCJ0aGVuIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZVF1ZXJ5Rm9yIiwiYW5zd2VycyIsImxhbmd1YWdlIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0EsSUFBSUEsV0FBV0MsUUFBUSxVQUFSLENBQWY7O0FBRUEsSUFBTUMsUUFBUSx1QkFBZDtBQUNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0Isd0RBRHBCOztBQUdBRixTQUFTSyxNQUFULENBQWdCQyxpQkFBT0MsZ0JBQXZCLEVBQXlDQyxJQUF6QyxDQUE4QyxtQkFBVztBQUNyREYscUJBQU9HLGdCQUFQLENBQXdCQyxjQUF4QixDQUF1Q0MsUUFBUUMsUUFBL0M7QUFDRCxDQUZIIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC1xdWVyeWZvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcblxudmFyIGlucXVpcmVyID0gcmVxdWlyZSgnaW5xdWlyZXInKTtcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIHF1ZXJ5Zm9yJztcbmFyZ3NcbiAgICAuZXhhbXBsZShVU0FHRSwgXCJDcmVhdGVzIGEgcXVlcnkgZm9yIGEgcmVhZCBtb2RlbCBpbiB0aGUgY3VycmVudCBmb2xkZXJcIik7XG5cbmlucXVpcmVyLnByb21wdChnbG9iYWwubGFuZ3VhZ2VRdWVzdGlvbikudGhlbihhbnN3ZXJzID0+IHtcbiAgICBnbG9iYWwuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVRdWVyeUZvcihhbnN3ZXJzLmxhbmd1YWdlKTtcbiAgfSk7XG4iXX0=