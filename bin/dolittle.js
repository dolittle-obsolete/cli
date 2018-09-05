#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_args2.default.command('cluster', 'Work with cluster hosting Dolittle');

var flags = _args2.default.parse(process.argv);

if (_args2.default.sub.length == 0) _args2.default.showHelp();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS5qcyJdLCJuYW1lcyI6WyJhcmdzIiwiY29tbWFuZCIsImZsYWdzIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIl0sIm1hcHBpbmdzIjoiOztBQUNBOzs7Ozs7QUFFQUEsZUFDS0MsT0FETCxDQUNhLFNBRGIsRUFDd0Isb0NBRHhCOztBQUtBLElBQU1DLFFBQVFGLGVBQUtHLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsQ0FBZDs7QUFFQSxJQUFJTCxlQUFLTSxHQUFMLENBQVNDLE1BQVQsSUFBbUIsQ0FBdkIsRUFBMkJQLGVBQUtRLFFBQUwiLCJmaWxlIjoiZG9saXR0bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuXG5hcmdzXG4gICAgLmNvbW1hbmQoJ2NsdXN0ZXInLCAnV29yayB3aXRoIGNsdXN0ZXIgaG9zdGluZyBEb2xpdHRsZScpXG4gICAgO1xuXG5cbmNvbnN0IGZsYWdzID0gYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuXG5pZiggYXJncy5zdWIubGVuZ3RoID09IDAgKSBhcmdzLnNob3dIZWxwKCk7XG4iXX0=