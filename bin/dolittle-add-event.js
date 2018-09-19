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
var USAGE = 'dolittle add event';
_args2.default.example(USAGE, "Creates an event in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add event' });

inquirer.prompt(_global2.default.languageQuestion).then(function (answers) {
  _global2.default.artifactsManager.createEvent(answers.language);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtZXZlbnQuanMiXSwibmFtZXMiOlsiaW5xdWlyZXIiLCJyZXF1aXJlIiwiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInByb21wdCIsImxhbmd1YWdlUXVlc3Rpb24iLCJ0aGVuIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZUV2ZW50IiwiYW5zd2VycyIsImxhbmd1YWdlIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0EsSUFBSUEsV0FBV0MsUUFBUSxVQUFSLENBQWY7QUFDQSxJQUFNQyxRQUFRLG9CQUFkO0FBQ0FDLGVBQ0tDLE9BREwsQ0FDYUYsS0FEYixFQUNvQix3Q0FEcEI7O0FBR0FDLGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsaUJBQU9DLFdBQVAsR0FBcUJSLEtBQTdCLEVBQW9DUyxNQUFNLG9CQUExQyxFQUF6Qjs7QUFFQVgsU0FBU1ksTUFBVCxDQUFnQkgsaUJBQU9JLGdCQUF2QixFQUF5Q0MsSUFBekMsQ0FBOEMsbUJBQVc7QUFDckRMLG1CQUFPTSxnQkFBUCxDQUF3QkMsV0FBeEIsQ0FBb0NDLFFBQVFDLFFBQTVDO0FBQ0QsQ0FGSCIsImZpbGUiOiJkb2xpdHRsZS1hZGQtZXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5cbnZhciBpbnF1aXJlciA9IHJlcXVpcmUoJ2lucXVpcmVyJyk7XG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBhZGQgZXZlbnQnO1xuYXJnc1xuICAgIC5leGFtcGxlKFVTQUdFLCBcIkNyZWF0ZXMgYW4gZXZlbnQgaW4gdGhlIGN1cnJlbnQgZm9sZGVyXCIpO1xuIFxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogZ2xvYmFsLnVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBhZGQgZXZlbnQnfSk7XG5cbmlucXVpcmVyLnByb21wdChnbG9iYWwubGFuZ3VhZ2VRdWVzdGlvbikudGhlbihhbnN3ZXJzID0+IHtcbiAgICBnbG9iYWwuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVFdmVudChhbnN3ZXJzLmxhbmd1YWdlKTtcbiAgfSk7Il19