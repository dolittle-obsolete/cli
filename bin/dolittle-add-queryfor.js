#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _global = require('./global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var USAGE = 'dolittle add queryfor [name]';
_args2.default.example(USAGE, "Creates a query for a read model in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add queryfor' });
if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

var flags = { name: _args2.default.sub[0] };
_global2.default.artifactsManager.createQueryFor(flags);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtcXVlcnlmb3IuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiZmxhZ3MiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlUXVlcnlGb3IiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7QUFDQTs7Ozs7O0FBTEE7Ozs7QUFPQSxJQUFNQSxRQUFRLDhCQUFkO0FBQ0FDLGVBQ0tDLE9BREwsQ0FDYUYsS0FEYixFQUNvQix3REFEcEI7O0FBSUFDLGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsaUJBQU9DLFdBQVAsR0FBcUJSLEtBQTdCLEVBQW9DUyxNQUFNLHVCQUExQyxFQUF6QjtBQUNBLElBQUksQ0FBRVIsZUFBS1MsR0FBTCxDQUFTQyxNQUFYLElBQXFCVixlQUFLUyxHQUFMLENBQVNDLE1BQVQsR0FBa0IsQ0FBM0MsRUFBOENWLGVBQUtXLFFBQUw7O0FBRTlDLElBQUlDLFFBQVEsRUFBQ0osTUFBTVIsZUFBS1MsR0FBTCxDQUFTLENBQVQsQ0FBUCxFQUFaO0FBQ0FILGlCQUFPTyxnQkFBUCxDQUF3QkMsY0FBeEIsQ0FBdUNGLEtBQXZDIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC1xdWVyeWZvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIHF1ZXJ5Zm9yIFtuYW1lXSc7XG5hcmdzXG4gICAgLmV4YW1wbGUoVVNBR0UsIFwiQ3JlYXRlcyBhIHF1ZXJ5IGZvciBhIHJlYWQgbW9kZWwgaW4gdGhlIGN1cnJlbnQgZm9sZGVyXCIpO1xuXG5cbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IGdsb2JhbC51c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgYWRkIHF1ZXJ5Zm9yJ30pO1xuaWYgKCEgYXJncy5zdWIubGVuZ3RoIHx8IGFyZ3Muc3ViLmxlbmd0aCA8IDEpIGFyZ3Muc2hvd0hlbHAoKTtcblxubGV0IGZsYWdzID0ge25hbWU6IGFyZ3Muc3ViWzBdfTsgXG5nbG9iYWwuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVRdWVyeUZvcihmbGFncyk7XG4iXX0=