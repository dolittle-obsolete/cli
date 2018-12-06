#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle add intconcept [name]';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.example(USAGE, 'Creates a concept as int in the current folder');

_args2.default.option('path', 'Override the destination path of the artifact');

var flags = _args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle add intconcept' });

if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

(0, _helpers.validateArgsNameInput)(_args2.default.sub[0]);
var context = {
    artifactName: _args2.default.sub[0],
    artifactType: 'conceptAsInt',
    area: 'concepts',
    path: flags.path
};

_globals2.default.artifactsManager.createArtifact(context);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtaW50Y29uY2VwdC5qcyJdLCJuYW1lcyI6WyJVU0FHRSIsImFyZ3MiLCJleGFtcGxlIiwib3B0aW9uIiwiZmxhZ3MiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2IiwidmFsdWUiLCJ1c2FnZVByZWZpeCIsIm5hbWUiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCIsImNvbnRleHQiLCJhcnRpZmFjdE5hbWUiLCJhcnRpZmFjdFR5cGUiLCJhcmVhIiwicGF0aCIsImdsb2JhbHMiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlQXJ0aWZhY3QiXSwibWFwcGluZ3MiOiI7O0FBTUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsSUFBTUEsUUFBUSxnQ0FBZDs7QUFSQTs7Ozs7QUFTQUMsZUFDS0MsT0FETCxDQUNhRixLQURiLEVBQ29CLGdEQURwQjs7QUFHQUMsZUFBS0UsTUFBTCxDQUFZLE1BQVosRUFBb0IsK0NBQXBCOztBQUVBLElBQUlDLFFBQVFILGVBQUtJLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsdUJBQWNULEtBQXRCLEVBQTZCVSxNQUFNLHlCQUFuQyxFQUF6QixDQUFaOztBQUVBLElBQUksQ0FBRVQsZUFBS1UsR0FBTCxDQUFTQyxNQUFYLElBQXFCWCxlQUFLVSxHQUFMLENBQVNDLE1BQVQsR0FBa0IsQ0FBM0MsRUFBOENYLGVBQUtZLFFBQUw7O0FBRTlDLG9DQUFzQlosZUFBS1UsR0FBTCxDQUFTLENBQVQsQ0FBdEI7QUFDQSxJQUFJRyxVQUFVO0FBQ1ZDLGtCQUFjZCxlQUFLVSxHQUFMLENBQVMsQ0FBVCxDQURKO0FBRVZLLGtCQUFjLGNBRko7QUFHVkMsVUFBTSxVQUhJO0FBSVZDLFVBQU1kLE1BQU1jO0FBSkYsQ0FBZDs7QUFPQUMsa0JBQVFDLGdCQUFSLENBQXlCQyxjQUF6QixDQUF3Q1AsT0FBeEMiLCJmaWxlIjoiZG9saXR0bGUtYWRkLWludGNvbmNlcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XHJcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vZ2xvYmFscyc7XHJcbmltcG9ydCB7IHVzYWdlUHJlZml4LCB2YWxpZGF0ZUFyZ3NOYW1lSW5wdXQgfSBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIGludGNvbmNlcHQgW25hbWVdJztcclxuYXJnc1xyXG4gICAgLmV4YW1wbGUoVVNBR0UsICdDcmVhdGVzIGEgY29uY2VwdCBhcyBpbnQgaW4gdGhlIGN1cnJlbnQgZm9sZGVyJyk7XHJcbiBcclxuYXJncy5vcHRpb24oJ3BhdGgnLCAnT3ZlcnJpZGUgdGhlIGRlc3RpbmF0aW9uIHBhdGggb2YgdGhlIGFydGlmYWN0Jyk7XHJcblxyXG5sZXQgZmxhZ3MgPSBhcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwge3ZhbHVlOiB1c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgYWRkIGludGNvbmNlcHQnfSk7XHJcblxyXG5pZiAoISBhcmdzLnN1Yi5sZW5ndGggfHwgYXJncy5zdWIubGVuZ3RoIDwgMSkgYXJncy5zaG93SGVscCgpO1xyXG5cclxudmFsaWRhdGVBcmdzTmFtZUlucHV0KGFyZ3Muc3ViWzBdKTtcclxubGV0IGNvbnRleHQgPSB7XHJcbiAgICBhcnRpZmFjdE5hbWU6IGFyZ3Muc3ViWzBdLCBcclxuICAgIGFydGlmYWN0VHlwZTogJ2NvbmNlcHRBc0ludCcsXHJcbiAgICBhcmVhOiAnY29uY2VwdHMnLFxyXG4gICAgcGF0aDogZmxhZ3MucGF0aFxyXG59O1xyXG5cclxuZ2xvYmFscy5hcnRpZmFjdHNNYW5hZ2VyLmNyZWF0ZUFydGlmYWN0KGNvbnRleHQpO1xyXG4iXX0=