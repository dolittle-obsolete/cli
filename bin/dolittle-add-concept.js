#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle add concept [name]';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.example(USAGE, 'Creates a concept in the current folder');

_args2.default.option('path', 'Override the destination path of the artifact');

var flags = _args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle add concept' });

if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

(0, _helpers.validateArgsNameInput)(_args2.default.sub[0]);
var context = {
    artifactName: _args2.default.sub[0],
    artifactType: 'concept',
    area: 'concepts',
    path: flags.path
};

_globals2.default.artifactsManager.createArtifact(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtY29uY2VwdC5qcyJdLCJuYW1lcyI6WyJVU0FHRSIsImFyZ3MiLCJleGFtcGxlIiwib3B0aW9uIiwiZmxhZ3MiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2IiwidmFsdWUiLCJ1c2FnZVByZWZpeCIsIm5hbWUiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCIsImNvbnRleHQiLCJhcnRpZmFjdE5hbWUiLCJhcnRpZmFjdFR5cGUiLCJhcmVhIiwicGF0aCIsImdsb2JhbHMiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlQXJ0aWZhY3QiXSwibWFwcGluZ3MiOiI7O0FBTUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsSUFBTUEsUUFBUSw2QkFBZDs7QUFSQTs7Ozs7QUFTQUMsZUFDS0MsT0FETCxDQUNhRixLQURiLEVBQ29CLHlDQURwQjs7QUFHQUMsZUFBS0UsTUFBTCxDQUFZLE1BQVosRUFBb0IsK0NBQXBCOztBQUVBLElBQUlDLFFBQVFILGVBQUtJLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsdUJBQWNULEtBQXRCLEVBQTZCVSxNQUFNLHNCQUFuQyxFQUF6QixDQUFaOztBQUVBLElBQUksQ0FBRVQsZUFBS1UsR0FBTCxDQUFTQyxNQUFYLElBQXFCWCxlQUFLVSxHQUFMLENBQVNDLE1BQVQsR0FBa0IsQ0FBM0MsRUFBOENYLGVBQUtZLFFBQUw7O0FBRTlDLG9DQUFzQlosZUFBS1UsR0FBTCxDQUFTLENBQVQsQ0FBdEI7QUFDQSxJQUFJRyxVQUFVO0FBQ1ZDLGtCQUFjZCxlQUFLVSxHQUFMLENBQVMsQ0FBVCxDQURKO0FBRVZLLGtCQUFjLFNBRko7QUFHVkMsVUFBTSxVQUhJO0FBSVZDLFVBQU1kLE1BQU1jO0FBSkYsQ0FBZDs7QUFPQUMsa0JBQVFDLGdCQUFSLENBQXlCQyxjQUF6QixDQUF3Q1AsT0FBeEMiLCJmaWxlIjoiZG9saXR0bGUtYWRkLWNvbmNlcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XHJcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vZ2xvYmFscyc7XHJcbmltcG9ydCB7IHVzYWdlUHJlZml4LCB2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQgfSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIGNvbmNlcHQgW25hbWVdJztcclxuYXJnc1xyXG4gICAgLmV4YW1wbGUoVVNBR0UsICdDcmVhdGVzIGEgY29uY2VwdCBpbiB0aGUgY3VycmVudCBmb2xkZXInKTtcclxuIFxyXG5hcmdzLm9wdGlvbigncGF0aCcsICdPdmVycmlkZSB0aGUgZGVzdGluYXRpb24gcGF0aCBvZiB0aGUgYXJ0aWZhY3QnKTtcclxuXHJcbmxldCBmbGFncyA9IGFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IHVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBhZGQgY29uY2VwdCd9KTtcclxuXHJcbmlmICghIGFyZ3Muc3ViLmxlbmd0aCB8fCBhcmdzLnN1Yi5sZW5ndGggPCAxKSBhcmdzLnNob3dIZWxwKCk7XHJcblxyXG52YWxpZGF0ZUFyZ3NOYW1lSW5wdXQoYXJncy5zdWJbMF0pO1xyXG5sZXQgY29udGV4dCA9IHtcclxuICAgIGFydGlmYWN0TmFtZTogYXJncy5zdWJbMF0sIFxyXG4gICAgYXJ0aWZhY3RUeXBlOiAnY29uY2VwdCcsXHJcbiAgICBhcmVhOiAnY29uY2VwdHMnLFxyXG4gICAgcGF0aDogZmxhZ3MucGF0aFxyXG59O1xyXG5cclxuZ2xvYmFscy5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZUFydGlmYWN0KGNvbnRleHQpO1xyXG4iXX0=