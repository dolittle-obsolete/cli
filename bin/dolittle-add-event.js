#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle add event [name]';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.example(USAGE, 'Creates an event in the current folder');

_args2.default.option('path', 'Override the destination path of the artifact');

var flags = _args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle add event' });

if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

(0, _helpers.validateArgsNameInput)(_args2.default.sub[0]);
var context = {
    artifactName: _args2.default.sub[0],
    artifactType: 'event',
    area: 'events',
    path: flags.path
};

_globals2.default.artifactsManager.createArtifact(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtZXZlbnQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsIm9wdGlvbiIsImZsYWdzIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInZhbHVlIiwidXNhZ2VQcmVmaXgiLCJuYW1lIiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiLCJjb250ZXh0IiwiYXJ0aWZhY3ROYW1lIiwiYXJ0aWZhY3RUeXBlIiwiYXJlYSIsInBhdGgiLCJnbG9iYWxzIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZUFydGlmYWN0Il0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQU1BLFFBQVEsMkJBQWQ7O0FBUkE7Ozs7O0FBU0FDLGVBQ0tDLE9BREwsQ0FDYUYsS0FEYixFQUNvQix3Q0FEcEI7O0FBR0FDLGVBQUtFLE1BQUwsQ0FBWSxNQUFaLEVBQW9CLCtDQUFwQjs7QUFFQSxJQUFJQyxRQUFRSCxlQUFLSSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLHVCQUFjVCxLQUF0QixFQUE2QlUsTUFBTSxvQkFBbkMsRUFBekIsQ0FBWjs7QUFFQSxJQUFJLENBQUVULGVBQUtVLEdBQUwsQ0FBU0MsTUFBWCxJQUFxQlgsZUFBS1UsR0FBTCxDQUFTQyxNQUFULEdBQWtCLENBQTNDLEVBQThDWCxlQUFLWSxRQUFMOztBQUU5QyxvQ0FBc0JaLGVBQUtVLEdBQUwsQ0FBUyxDQUFULENBQXRCO0FBQ0EsSUFBSUcsVUFBVTtBQUNWQyxrQkFBY2QsZUFBS1UsR0FBTCxDQUFTLENBQVQsQ0FESjtBQUVWSyxrQkFBYyxPQUZKO0FBR1ZDLFVBQU0sUUFISTtBQUlWQyxVQUFNZCxNQUFNYztBQUpGLENBQWQ7O0FBT0FDLGtCQUFRQyxnQkFBUixDQUF5QkMsY0FBekIsQ0FBd0NQLE9BQXhDIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC1ldmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcclxuaW1wb3J0IGdsb2JhbHMgZnJvbSAnLi9nbG9iYWxzJztcclxuaW1wb3J0IHsgdXNhZ2VQcmVmaXgsIHZhbGlkYXRlQXJnc05hbWVJbnB1dCB9IGZyb20gJy4vaGVscGVycyc7XHJcblxyXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBhZGQgZXZlbnQgW25hbWVdJztcclxuYXJnc1xyXG4gICAgLmV4YW1wbGUoVVNBR0UsICdDcmVhdGVzIGFuIGV2ZW50IGluIHRoZSBjdXJyZW50IGZvbGRlcicpO1xyXG4gXHJcbmFyZ3Mub3B0aW9uKCdwYXRoJywgJ092ZXJyaWRlIHRoZSBkZXN0aW5hdGlvbiBwYXRoIG9mIHRoZSBhcnRpZmFjdCcpO1xyXG5cclxubGV0IGZsYWdzID0gYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogdXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGFkZCBldmVudCd9KTtcclxuXHJcbmlmICghIGFyZ3Muc3ViLmxlbmd0aCB8fCBhcmdzLnN1Yi5sZW5ndGggPCAxKSBhcmdzLnNob3dIZWxwKCk7XHJcblxyXG52YWxpZGF0ZUFyZ3NOYW1lSW5wdXQoYXJncy5zdWJbMF0pO1xyXG5sZXQgY29udGV4dCA9IHtcclxuICAgIGFydGlmYWN0TmFtZTogYXJncy5zdWJbMF0sIFxyXG4gICAgYXJ0aWZhY3RUeXBlOiAnZXZlbnQnLFxyXG4gICAgYXJlYTogJ2V2ZW50cycsXHJcbiAgICBwYXRoOiBmbGFncy5wYXRoXHJcbn07XHJcblxyXG5nbG9iYWxzLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlQXJ0aWZhY3QoY29udGV4dCk7XHJcbiJdfQ==