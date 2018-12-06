#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_args2.default.example('dolittle cluster add [name] [url]', 'Adds a cluster to the configuration');

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


if (_args2.default.sub.length == 0) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jbHVzdGVyLWFkZC5qcyJdLCJuYW1lcyI6WyJhcmdzIiwiZXhhbXBsZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7Ozs7QUFFQUEsZUFDS0MsT0FETCxDQUNhLG1DQURiLEVBQ2tELHFDQURsRDs7QUFOQTs7Ozs7O0FBU0EsSUFBSUQsZUFBS0UsR0FBTCxDQUFTQyxNQUFULElBQW1CLENBQXZCLEVBQTBCSCxlQUFLSSxRQUFMIiwiZmlsZSI6ImRvbGl0dGxlLWNsdXN0ZXItYWRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xyXG5cclxuYXJnc1xyXG4gICAgLmV4YW1wbGUoJ2RvbGl0dGxlIGNsdXN0ZXIgYWRkIFtuYW1lXSBbdXJsXScsICdBZGRzIGEgY2x1c3RlciB0byB0aGUgY29uZmlndXJhdGlvbicpO1xyXG4gICAgXHJcbmlmIChhcmdzLnN1Yi5sZW5ndGggPT0gMCkgYXJncy5zaG93SGVscCgpOyJdfQ==