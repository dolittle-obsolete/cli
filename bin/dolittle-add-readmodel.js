#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle add readmodel [name]';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.example(USAGE, 'Creates a read model in the current folder');

_args2.default.option('path', 'Override the destination path of the artifact');

var flags = _args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle add readmodel' });
if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

(0, _helpers.validateArgsNameInput)(_args2.default.sub[0]);
var context = {
    artifactName: _args2.default.sub[0],
    artifactType: 'readModel',
    area: 'read',
    path: flags.path
};

_globals2.default.artifactsManager.createArtifact(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtcmVhZG1vZGVsLmpzIl0sIm5hbWVzIjpbIlVTQUdFIiwiYXJncyIsImV4YW1wbGUiLCJvcHRpb24iLCJmbGFncyIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiY29udGV4dCIsImFydGlmYWN0TmFtZSIsImFydGlmYWN0VHlwZSIsImFyZWEiLCJwYXRoIiwiZ2xvYmFscyIsImFydGlmYWN0c01hbmFnZXIiLCJjcmVhdGVBcnRpZmFjdCJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxRQUFRLCtCQUFkOztBQVJBOzs7OztBQVNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0IsNENBRHBCOztBQUdBQyxlQUFLRSxNQUFMLENBQVksTUFBWixFQUFvQiwrQ0FBcEI7O0FBRUEsSUFBSUMsUUFBUUgsZUFBS0ksS0FBTCxDQUFXQyxRQUFRQyxJQUFuQixFQUF5QixFQUFDQyxPQUFPQyx1QkFBY1QsS0FBdEIsRUFBNkJVLE1BQU0sd0JBQW5DLEVBQXpCLENBQVo7QUFDQSxJQUFJLENBQUVULGVBQUtVLEdBQUwsQ0FBU0MsTUFBWCxJQUFxQlgsZUFBS1UsR0FBTCxDQUFTQyxNQUFULEdBQWtCLENBQTNDLEVBQThDWCxlQUFLWSxRQUFMOztBQUU5QyxvQ0FBc0JaLGVBQUtVLEdBQUwsQ0FBUyxDQUFULENBQXRCO0FBQ0EsSUFBSUcsVUFBVTtBQUNWQyxrQkFBY2QsZUFBS1UsR0FBTCxDQUFTLENBQVQsQ0FESjtBQUVWSyxrQkFBYyxXQUZKO0FBR1ZDLFVBQU0sTUFISTtBQUlWQyxVQUFNZCxNQUFNYztBQUpGLENBQWQ7O0FBT0FDLGtCQUFRQyxnQkFBUixDQUF5QkMsY0FBekIsQ0FBd0NQLE9BQXhDIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC1yZWFkbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XHJcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vZ2xvYmFscyc7XHJcbmltcG9ydCB7IHVzYWdlUHJlZml4LCB2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQgfSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIHJlYWRtb2RlbCBbbmFtZV0nO1xyXG5hcmdzXHJcbiAgICAuZXhhbXBsZShVU0FHRSwgJ0NyZWF0ZXMgYSByZWFkIG1vZGVsIGluIHRoZSBjdXJyZW50IGZvbGRlcicpO1xyXG5cclxuYXJncy5vcHRpb24oJ3BhdGgnLCAnT3ZlcnJpZGUgdGhlIGRlc3RpbmF0aW9uIHBhdGggb2YgdGhlIGFydGlmYWN0Jyk7XHJcblxyXG5sZXQgZmxhZ3MgPSBhcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwge3ZhbHVlOiB1c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgYWRkIHJlYWRtb2RlbCd9KTtcclxuaWYgKCEgYXJncy5zdWIubGVuZ3RoIHx8IGFyZ3Muc3ViLmxlbmd0aCA8IDEpIGFyZ3Muc2hvd0hlbHAoKTtcclxuXHJcbnZhbGlkYXRlQXJnc05hbWVJbnB1dChhcmdzLnN1YlswXSk7XHJcbmxldCBjb250ZXh0ID0ge1xyXG4gICAgYXJ0aWZhY3ROYW1lOiBhcmdzLnN1YlswXSwgXHJcbiAgICBhcnRpZmFjdFR5cGU6ICdyZWFkTW9kZWwnLFxyXG4gICAgYXJlYTogJ3JlYWQnLFxyXG4gICAgcGF0aDogZmxhZ3MucGF0aFxyXG59O1xyXG5cclxuZ2xvYmFscy5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZUFydGlmYWN0KGNvbnRleHQpO1xyXG4iXX0=