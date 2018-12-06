#!/usr/bin/env node
'use strict';

var _child_process = require('child_process');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var root = 'k8s';
if (!_fs2.default.existsSync(root)) {
    _globals2.default.logger.error('Artifacts for deployment is missing');
} else {
    _globals2.default.logger.info('Deploying Bounded Context');
    _fs2.default.readdir(root, function (err, files) {
        files.forEach(function (file) {
            file = file.toLowerCase();
            if (file.endsWith('.yml')) {

                var ps = (0, _child_process.spawn)('kubectl', ['apply', '-f', file], {
                    cwd: root
                });
                ps.stdout.on('data', function (data) {
                    return process.stdout.write(data.toString());
                });
                ps.stderr.on('data', function (data) {
                    return process.stderr.write(data.toString());
                });
            }
        });
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1kZXBsb3kuanMiXSwibmFtZXMiOlsicm9vdCIsImZzIiwiZXhpc3RzU3luYyIsImdsb2JhbHMiLCJsb2dnZXIiLCJlcnJvciIsImluZm8iLCJyZWFkZGlyIiwiZXJyIiwiZmlsZXMiLCJmb3JFYWNoIiwiZmlsZSIsInRvTG93ZXJDYXNlIiwiZW5kc1dpdGgiLCJwcyIsImN3ZCIsInN0ZG91dCIsIm9uIiwiZGF0YSIsInByb2Nlc3MiLCJ3cml0ZSIsInRvU3RyaW5nIiwic3RkZXJyIl0sIm1hcHBpbmdzIjoiOztBQU1BOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBUEE7Ozs7QUFTQSxJQUFJQSxPQUFPLEtBQVg7QUFDQSxJQUFJLENBQUNDLGFBQUdDLFVBQUgsQ0FBY0YsSUFBZCxDQUFMLEVBQTBCO0FBQ3RCRyxzQkFBUUMsTUFBUixDQUFlQyxLQUFmLENBQXFCLHFDQUFyQjtBQUNILENBRkQsTUFFTztBQUNIRixzQkFBUUMsTUFBUixDQUFlRSxJQUFmLENBQW9CLDJCQUFwQjtBQUNBTCxpQkFBR00sT0FBSCxDQUFXUCxJQUFYLEVBQWlCLFVBQUNRLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUM3QkEsY0FBTUMsT0FBTixDQUFjLGdCQUFRO0FBQ2xCQyxtQkFBT0EsS0FBS0MsV0FBTCxFQUFQO0FBQ0EsZ0JBQUlELEtBQUtFLFFBQUwsQ0FBYyxNQUFkLENBQUosRUFBMkI7O0FBRXZCLG9CQUFJQyxLQUFLLDBCQUFNLFNBQU4sRUFBaUIsQ0FDdEIsT0FEc0IsRUFFdEIsSUFGc0IsRUFHdEJILElBSHNCLENBQWpCLEVBSU47QUFDQ0kseUJBQUtmO0FBRE4saUJBSk0sQ0FBVDtBQU9BYyxtQkFBR0UsTUFBSCxDQUFVQyxFQUFWLENBQWEsTUFBYixFQUFxQixVQUFDQyxJQUFEO0FBQUEsMkJBQVVDLFFBQVFILE1BQVIsQ0FBZUksS0FBZixDQUFxQkYsS0FBS0csUUFBTCxFQUFyQixDQUFWO0FBQUEsaUJBQXJCO0FBQ0FQLG1CQUFHUSxNQUFILENBQVVMLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFVBQUNDLElBQUQ7QUFBQSwyQkFBVUMsUUFBUUcsTUFBUixDQUFlRixLQUFmLENBQXFCRixLQUFLRyxRQUFMLEVBQXJCLENBQVY7QUFBQSxpQkFBckI7QUFDSDtBQUNKLFNBZEQ7QUFnQkgsS0FqQkQ7QUFrQkgiLCJmaWxlIjoiZG9saXR0bGUtZGVwbG95LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbmltcG9ydCB7IHNwYXduLCBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgZ2xvYmFscyBmcm9tICcuL2dsb2JhbHMnO1xyXG5cclxubGV0IHJvb3QgPSAnazhzJztcclxuaWYoICFmcy5leGlzdHNTeW5jKHJvb3QpKSB7XHJcbiAgICBnbG9iYWxzLmxvZ2dlci5lcnJvcignQXJ0aWZhY3RzIGZvciBkZXBsb3ltZW50IGlzIG1pc3NpbmcnKTtcclxufSBlbHNlIHtcclxuICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJ0RlcGxveWluZyBCb3VuZGVkIENvbnRleHQnKTtcclxuICAgIGZzLnJlYWRkaXIocm9vdCwgKGVyciwgZmlsZXMpID0+IHtcclxuICAgICAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xyXG4gICAgICAgICAgICBmaWxlID0gZmlsZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBpZiggZmlsZS5lbmRzV2l0aCgnLnltbCcpKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBwcyA9IHNwYXduKCdrdWJlY3RsJywgW1xyXG4gICAgICAgICAgICAgICAgICAgICdhcHBseScsXHJcbiAgICAgICAgICAgICAgICAgICAgJy1mJyxcclxuICAgICAgICAgICAgICAgICAgICBmaWxlXHJcbiAgICAgICAgICAgICAgICBdLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3dkOiByb290XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHBzLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiBwcm9jZXNzLnN0ZG91dC53cml0ZShkYXRhLnRvU3RyaW5nKCkpKTtcclxuICAgICAgICAgICAgICAgIHBzLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiBwcm9jZXNzLnN0ZGVyci53cml0ZShkYXRhLnRvU3RyaW5nKCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICB9KTtcclxufSJdfQ==