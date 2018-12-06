#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle add query [name]';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.example(USAGE, 'Creates a query in the current folder');

_args2.default.option('path', 'Override the destination path of the artifact');

var flags = _args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle add query' });
if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

(0, _helpers.validateArgsNameInput)(_args2.default.sub[0]);
var context = {
    artifactName: _args2.default.sub[0],
    artifactType: 'query',
    area: 'read',
    path: flags.path
};

_globals2.default.artifactsManager.createArtifact(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtcXVlcnkuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsIm9wdGlvbiIsImZsYWdzIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInZhbHVlIiwidXNhZ2VQcmVmaXgiLCJuYW1lIiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiLCJjb250ZXh0IiwiYXJ0aWZhY3ROYW1lIiwiYXJ0aWZhY3RUeXBlIiwiYXJlYSIsInBhdGgiLCJnbG9iYWxzIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZUFydGlmYWN0Il0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQU1BLFFBQVEsMkJBQWQ7O0FBUkE7Ozs7O0FBU0FDLGVBQ0tDLE9BREwsQ0FDYUYsS0FEYixFQUNvQix1Q0FEcEI7O0FBR0FDLGVBQUtFLE1BQUwsQ0FBWSxNQUFaLEVBQW9CLCtDQUFwQjs7QUFFQSxJQUFJQyxRQUFRSCxlQUFLSSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLHVCQUFjVCxLQUF0QixFQUE2QlUsTUFBTSxvQkFBbkMsRUFBekIsQ0FBWjtBQUNBLElBQUksQ0FBRVQsZUFBS1UsR0FBTCxDQUFTQyxNQUFYLElBQXFCWCxlQUFLVSxHQUFMLENBQVNDLE1BQVQsR0FBa0IsQ0FBM0MsRUFBOENYLGVBQUtZLFFBQUw7O0FBRTlDLG9DQUFzQlosZUFBS1UsR0FBTCxDQUFTLENBQVQsQ0FBdEI7QUFDQSxJQUFJRyxVQUFVO0FBQ1ZDLGtCQUFjZCxlQUFLVSxHQUFMLENBQVMsQ0FBVCxDQURKO0FBRVZLLGtCQUFjLE9BRko7QUFHVkMsVUFBTSxNQUhJO0FBSVZDLFVBQU1kLE1BQU1jO0FBSkYsQ0FBZDs7QUFPQUMsa0JBQVFDLGdCQUFSLENBQXlCQyxjQUF6QixDQUF3Q1AsT0FBeEMiLCJmaWxlIjoiZG9saXR0bGUtYWRkLXF1ZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xyXG5pbXBvcnQgZ2xvYmFscyBmcm9tICcuL2dsb2JhbHMnO1xyXG5pbXBvcnQgeyB1c2FnZVByZWZpeCwgdmFsaWRhdGVBcmdzTmFtZUlucHV0IH0gZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIGFkZCBxdWVyeSBbbmFtZV0nO1xyXG5hcmdzXHJcbiAgICAuZXhhbXBsZShVU0FHRSwgJ0NyZWF0ZXMgYSBxdWVyeSBpbiB0aGUgY3VycmVudCBmb2xkZXInKTtcclxuXHJcbmFyZ3Mub3B0aW9uKCdwYXRoJywgJ092ZXJyaWRlIHRoZSBkZXN0aW5hdGlvbiBwYXRoIG9mIHRoZSBhcnRpZmFjdCcpO1xyXG5cclxubGV0IGZsYWdzID0gYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogdXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGFkZCBxdWVyeSd9KTtcclxuaWYgKCEgYXJncy5zdWIubGVuZ3RoIHx8IGFyZ3Muc3ViLmxlbmd0aCA8IDEpIGFyZ3Muc2hvd0hlbHAoKTtcclxuXHJcbnZhbGlkYXRlQXJnc05hbWVJbnB1dChhcmdzLnN1YlswXSk7XHJcbmxldCBjb250ZXh0ID0ge1xyXG4gICAgYXJ0aWZhY3ROYW1lOiBhcmdzLnN1YlswXSwgXHJcbiAgICBhcnRpZmFjdFR5cGU6ICdxdWVyeScsXHJcbiAgICBhcmVhOiAncmVhZCcsXHJcbiAgICBwYXRoOiBmbGFncy5wYXRoXHJcbn07XHJcblxyXG5nbG9iYWxzLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlQXJ0aWZhY3QoY29udGV4dCk7XHJcblxyXG4iXX0=