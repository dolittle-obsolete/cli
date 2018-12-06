#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle add guidconcept [name]';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.example(USAGE, 'Creates a concept as Guid in the current folder');

_args2.default.option('path', 'Override the destination path of the artifact');

var flags = _args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle add guidconcept' });

if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

(0, _helpers.validateArgsNameInput)(_args2.default.sub[0]);
var context = {
    artifactName: _args2.default.sub[0],
    artifactType: 'conceptAsGuid',
    area: 'concepts',
    path: flags.path
};

_globals2.default.artifactsManager.createArtifact(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtZ3VpZGNvbmNlcHQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsIm9wdGlvbiIsImZsYWdzIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInZhbHVlIiwidXNhZ2VQcmVmaXgiLCJuYW1lIiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiLCJjb250ZXh0IiwiYXJ0aWZhY3ROYW1lIiwiYXJ0aWZhY3RUeXBlIiwiYXJlYSIsInBhdGgiLCJnbG9iYWxzIiwiYXJ0aWZhY3RzTWFuYWdlciIsImNyZWF0ZUFydGlmYWN0Il0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQU1BLFFBQVEsaUNBQWQ7O0FBUkE7Ozs7O0FBU0FDLGVBQ0tDLE9BREwsQ0FDYUYsS0FEYixFQUNvQixpREFEcEI7O0FBR0FDLGVBQUtFLE1BQUwsQ0FBWSxNQUFaLEVBQW9CLCtDQUFwQjs7QUFFQSxJQUFJQyxRQUFRSCxlQUFLSSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLHVCQUFjVCxLQUF0QixFQUE2QlUsTUFBTSwwQkFBbkMsRUFBekIsQ0FBWjs7QUFFQSxJQUFJLENBQUVULGVBQUtVLEdBQUwsQ0FBU0MsTUFBWCxJQUFxQlgsZUFBS1UsR0FBTCxDQUFTQyxNQUFULEdBQWtCLENBQTNDLEVBQThDWCxlQUFLWSxRQUFMOztBQUU5QyxvQ0FBc0JaLGVBQUtVLEdBQUwsQ0FBUyxDQUFULENBQXRCO0FBQ0EsSUFBSUcsVUFBVTtBQUNWQyxrQkFBY2QsZUFBS1UsR0FBTCxDQUFTLENBQVQsQ0FESjtBQUVWSyxrQkFBYyxlQUZKO0FBR1ZDLFVBQU0sVUFISTtBQUlWQyxVQUFNZCxNQUFNYztBQUpGLENBQWQ7O0FBT0FDLGtCQUFRQyxnQkFBUixDQUF5QkMsY0FBekIsQ0FBd0NQLE9BQXhDIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC1ndWlkY29uY2VwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcclxuaW1wb3J0IGdsb2JhbHMgZnJvbSAnLi9nbG9iYWxzJztcclxuaW1wb3J0IHsgdXNhZ2VQcmVmaXgsIHZhbGlkYXRlQXJnc05hbWVJbnB1dCB9IGZyb20gJy4vaGVscGVycyc7XHJcblxyXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBhZGQgZ3VpZGNvbmNlcHQgW25hbWVdJztcclxuYXJnc1xyXG4gICAgLmV4YW1wbGUoVVNBR0UsICdDcmVhdGVzIGEgY29uY2VwdCBhcyBHdWlkIGluIHRoZSBjdXJyZW50IGZvbGRlcicpO1xyXG4gXHJcbmFyZ3Mub3B0aW9uKCdwYXRoJywgJ092ZXJyaWRlIHRoZSBkZXN0aW5hdGlvbiBwYXRoIG9mIHRoZSBhcnRpZmFjdCcpO1xyXG5cclxubGV0IGZsYWdzID0gYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogdXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGFkZCBndWlkY29uY2VwdCd9KTtcclxuXHJcbmlmICghIGFyZ3Muc3ViLmxlbmd0aCB8fCBhcmdzLnN1Yi5sZW5ndGggPCAxKSBhcmdzLnNob3dIZWxwKCk7XHJcblxyXG52YWxpZGF0ZUFyZ3NOYW1lSW5wdXQoYXJncy5zdWJbMF0pO1xyXG5sZXQgY29udGV4dCA9IHtcclxuICAgIGFydGlmYWN0TmFtZTogYXJncy5zdWJbMF0sIFxyXG4gICAgYXJ0aWZhY3RUeXBlOiAnY29uY2VwdEFzR3VpZCcsXHJcbiAgICBhcmVhOiAnY29uY2VwdHMnLFxyXG4gICAgcGF0aDogZmxhZ3MucGF0aFxyXG59O1xyXG5cclxuZ2xvYmFscy5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZUFydGlmYWN0KGNvbnRleHQpO1xyXG4iXX0=