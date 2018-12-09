#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle add queryfor [name]';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.example(USAGE, 'Creates a query for a read model in the current folder');

_args2.default.option('path', 'Override the destination path of the artifact');

var flags = _args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle add queryfor' });
if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

(0, _helpers.validateArgsNameInput)(_args2.default.sub[0]);
var context = {
    artifactName: _args2.default.sub[0],
    artifactType: 'queryFor',
    area: 'read',
    path: flags.path
};

_globals2.default.artifactsManager.createArtifact(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtcXVlcnlmb3IuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsIm9wdGlvbiIsImZsYWdzIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInZhbHVlIiwidXNhZ2VQcmVmaXgiLCJuYW1lIiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiLCJjb250ZXh0IiwiYXJ0aWZhY3ROYW1lIiwiYXJ0aWZhY3RUeXBlIiwiYXJlYSIsInBhdGgiLCJnbG9iYWxzIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZUFydGlmYWN0Il0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQU1BLFFBQVEsOEJBQWQ7O0FBUkE7Ozs7O0FBU0FDLGVBQ0tDLE9BREwsQ0FDYUYsS0FEYixFQUNvQix3REFEcEI7O0FBR0FDLGVBQUtFLE1BQUwsQ0FBWSxNQUFaLEVBQW9CLCtDQUFwQjs7QUFFQSxJQUFJQyxRQUFRSCxlQUFLSSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLHVCQUFjVCxLQUF0QixFQUE2QlUsTUFBTSx1QkFBbkMsRUFBekIsQ0FBWjtBQUNBLElBQUksQ0FBRVQsZUFBS1UsR0FBTCxDQUFTQyxNQUFYLElBQXFCWCxlQUFLVSxHQUFMLENBQVNDLE1BQVQsR0FBa0IsQ0FBM0MsRUFBOENYLGVBQUtZLFFBQUw7O0FBRTlDLG9DQUFzQlosZUFBS1UsR0FBTCxDQUFTLENBQVQsQ0FBdEI7QUFDQSxJQUFJRyxVQUFVO0FBQ1ZDLGtCQUFjZCxlQUFLVSxHQUFMLENBQVMsQ0FBVCxDQURKO0FBRVZLLGtCQUFjLFVBRko7QUFHVkMsVUFBTSxNQUhJO0FBSVZDLFVBQU1kLE1BQU1jO0FBSkYsQ0FBZDs7QUFPQUMsa0JBQVFDLGdCQUFSLENBQXlCQyxjQUF6QixDQUF3Q1AsT0FBeEMiLCJmaWxlIjoiZG9saXR0bGUtYWRkLXF1ZXJ5Zm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuaW1wb3J0IGdsb2JhbHMgZnJvbSAnLi9nbG9iYWxzJztcbmltcG9ydCB7IHVzYWdlUHJlZml4LCB2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBhZGQgcXVlcnlmb3IgW25hbWVdJztcbmFyZ3NcbiAgICAuZXhhbXBsZShVU0FHRSwgJ0NyZWF0ZXMgYSBxdWVyeSBmb3IgYSByZWFkIG1vZGVsIGluIHRoZSBjdXJyZW50IGZvbGRlcicpO1xuXG5hcmdzLm9wdGlvbigncGF0aCcsICdPdmVycmlkZSB0aGUgZGVzdGluYXRpb24gcGF0aCBvZiB0aGUgYXJ0aWZhY3QnKTtcblxubGV0IGZsYWdzID0gYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogdXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGFkZCBxdWVyeWZvcid9KTtcbmlmICghIGFyZ3Muc3ViLmxlbmd0aCB8fCBhcmdzLnN1Yi5sZW5ndGggPCAxKSBhcmdzLnNob3dIZWxwKCk7XG5cbnZhbGlkYXRlQXJnc05hbWVJbnB1dChhcmdzLnN1YlswXSk7XG5sZXQgY29udGV4dCA9IHtcbiAgICBhcnRpZmFjdE5hbWU6IGFyZ3Muc3ViWzBdLCBcbiAgICBhcnRpZmFjdFR5cGU6ICdxdWVyeUZvcicsXG4gICAgYXJlYTogJ3JlYWQnLFxuICAgIHBhdGg6IGZsYWdzLnBhdGhcbn07XG5cbmdsb2JhbHMuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVBcnRpZmFjdChjb250ZXh0KTtcbiJdfQ==