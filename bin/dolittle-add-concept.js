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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtY29uY2VwdC5qcyJdLCJuYW1lcyI6WyJVU0FHRSIsImFyZ3MiLCJleGFtcGxlIiwib3B0aW9uIiwiZmxhZ3MiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2IiwidmFsdWUiLCJ1c2FnZVByZWZpeCIsIm5hbWUiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCIsImNvbnRleHQiLCJhcnRpZmFjdE5hbWUiLCJhcnRpZmFjdFR5cGUiLCJhcmVhIiwicGF0aCIsImdsb2JhbHMiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlQXJ0aWZhY3QiXSwibWFwcGluZ3MiOiI7O0FBTUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsSUFBTUEsUUFBUSw2QkFBZDs7QUFSQTs7Ozs7QUFTQUMsZUFDS0MsT0FETCxDQUNhRixLQURiLEVBQ29CLHlDQURwQjs7QUFHQUMsZUFBS0UsTUFBTCxDQUFZLE1BQVosRUFBb0IsK0NBQXBCOztBQUVBLElBQUlDLFFBQVFILGVBQUtJLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsdUJBQWNULEtBQXRCLEVBQTZCVSxNQUFNLHNCQUFuQyxFQUF6QixDQUFaOztBQUVBLElBQUksQ0FBRVQsZUFBS1UsR0FBTCxDQUFTQyxNQUFYLElBQXFCWCxlQUFLVSxHQUFMLENBQVNDLE1BQVQsR0FBa0IsQ0FBM0MsRUFBOENYLGVBQUtZLFFBQUw7O0FBRTlDLG9DQUFzQlosZUFBS1UsR0FBTCxDQUFTLENBQVQsQ0FBdEI7QUFDQSxJQUFJRyxVQUFVO0FBQ1ZDLGtCQUFjZCxlQUFLVSxHQUFMLENBQVMsQ0FBVCxDQURKO0FBRVZLLGtCQUFjLFNBRko7QUFHVkMsVUFBTSxVQUhJO0FBSVZDLFVBQU1kLE1BQU1jO0FBSkYsQ0FBZDs7QUFPQUMsa0JBQVFDLGdCQUFSLENBQXlCQyxjQUF6QixDQUF3Q1AsT0FBeEMiLCJmaWxlIjoiZG9saXR0bGUtYWRkLWNvbmNlcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFscyBmcm9tICcuL2dsb2JhbHMnO1xuaW1wb3J0IHsgdXNhZ2VQcmVmaXgsIHZhbGlkYXRlQXJnc05hbWVJbnB1dCB9IGZyb20gJy4vaGVscGVycyc7XG5cbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIGFkZCBjb25jZXB0IFtuYW1lXSc7XG5hcmdzXG4gICAgLmV4YW1wbGUoVVNBR0UsICdDcmVhdGVzIGEgY29uY2VwdCBpbiB0aGUgY3VycmVudCBmb2xkZXInKTtcbiBcbmFyZ3Mub3B0aW9uKCdwYXRoJywgJ092ZXJyaWRlIHRoZSBkZXN0aW5hdGlvbiBwYXRoIG9mIHRoZSBhcnRpZmFjdCcpO1xuXG5sZXQgZmxhZ3MgPSBhcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwge3ZhbHVlOiB1c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgYWRkIGNvbmNlcHQnfSk7XG5cbmlmICghIGFyZ3Muc3ViLmxlbmd0aCB8fCBhcmdzLnN1Yi5sZW5ndGggPCAxKSBhcmdzLnNob3dIZWxwKCk7XG5cbnZhbGlkYXRlQXJnc05hbWVJbnB1dChhcmdzLnN1YlswXSk7XG5sZXQgY29udGV4dCA9IHtcbiAgICBhcnRpZmFjdE5hbWU6IGFyZ3Muc3ViWzBdLCBcbiAgICBhcnRpZmFjdFR5cGU6ICdjb25jZXB0JyxcbiAgICBhcmVhOiAnY29uY2VwdHMnLFxuICAgIHBhdGg6IGZsYWdzLnBhdGhcbn07XG5cbmdsb2JhbHMuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVBcnRpZmFjdChjb250ZXh0KTtcbiJdfQ==