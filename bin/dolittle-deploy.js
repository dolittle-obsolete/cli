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
    _fs2.default.readdir(root, function (err, files) {
        _globals2.default.logger.info(files);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1kZXBsb3kuanMiXSwibmFtZXMiOlsicm9vdCIsImZzIiwiZXhpc3RzU3luYyIsImdsb2JhbHMiLCJsb2dnZXIiLCJlcnJvciIsInJlYWRkaXIiLCJlcnIiLCJmaWxlcyIsImluZm8iLCJmb3JFYWNoIiwiZmlsZSIsInRvTG93ZXJDYXNlIiwiZW5kc1dpdGgiLCJwcyIsImN3ZCIsInN0ZG91dCIsIm9uIiwiZGF0YSIsInByb2Nlc3MiLCJ3cml0ZSIsInRvU3RyaW5nIiwic3RkZXJyIl0sIm1hcHBpbmdzIjoiOztBQU1BOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBUEE7Ozs7QUFTQSxJQUFJQSxPQUFPLEtBQVg7QUFDQSxJQUFJLENBQUNDLGFBQUdDLFVBQUgsQ0FBY0YsSUFBZCxDQUFMLEVBQTBCO0FBQ3RCRyxzQkFBUUMsTUFBUixDQUFlQyxLQUFmLENBQXFCLHFDQUFyQjtBQUNILENBRkQsTUFFTztBQUNISixpQkFBR0ssT0FBSCxDQUFXTixJQUFYLEVBQWlCLFVBQUNPLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUM3QkwsMEJBQVFDLE1BQVIsQ0FBZUssSUFBZixDQUFvQkQsS0FBcEI7QUFDQUEsY0FBTUUsT0FBTixDQUFjLGdCQUFRO0FBQ2xCQyxtQkFBT0EsS0FBS0MsV0FBTCxFQUFQO0FBQ0EsZ0JBQUlELEtBQUtFLFFBQUwsQ0FBYyxNQUFkLENBQUosRUFBMkI7O0FBRXZCLG9CQUFJQyxLQUFLLDBCQUFNLFNBQU4sRUFBaUIsQ0FDdEIsT0FEc0IsRUFFdEIsSUFGc0IsRUFHdEJILElBSHNCLENBQWpCLEVBSU47QUFDQ0kseUJBQUtmO0FBRE4saUJBSk0sQ0FBVDtBQU9BYyxtQkFBR0UsTUFBSCxDQUFVQyxFQUFWLENBQWEsTUFBYixFQUFxQixVQUFDQyxJQUFEO0FBQUEsMkJBQVVDLFFBQVFILE1BQVIsQ0FBZUksS0FBZixDQUFxQkYsS0FBS0csUUFBTCxFQUFyQixDQUFWO0FBQUEsaUJBQXJCO0FBQ0FQLG1CQUFHUSxNQUFILENBQVVMLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFVBQUNDLElBQUQ7QUFBQSwyQkFBVUMsUUFBUUcsTUFBUixDQUFlRixLQUFmLENBQXFCRixLQUFLRyxRQUFMLEVBQXJCLENBQVY7QUFBQSxpQkFBckI7QUFDSDtBQUNKLFNBZEQ7QUFnQkgsS0FsQkQ7QUFtQkgiLCJmaWxlIjoiZG9saXR0bGUtZGVwbG95LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IHNwYXduLCBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZ2xvYmFscyBmcm9tICcuL2dsb2JhbHMnO1xuXG5sZXQgcm9vdCA9ICdrOHMnO1xuaWYoICFmcy5leGlzdHNTeW5jKHJvb3QpKSB7XG4gICAgZ2xvYmFscy5sb2dnZXIuZXJyb3IoJ0FydGlmYWN0cyBmb3IgZGVwbG95bWVudCBpcyBtaXNzaW5nJyk7XG59IGVsc2Uge1xuICAgIGZzLnJlYWRkaXIocm9vdCwgKGVyciwgZmlsZXMpID0+IHtcbiAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbyhmaWxlcyk7XG4gICAgICAgIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICAgICAgICBmaWxlID0gZmlsZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYoIGZpbGUuZW5kc1dpdGgoJy55bWwnKSkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBwcyA9IHNwYXduKCdrdWJlY3RsJywgW1xuICAgICAgICAgICAgICAgICAgICAnYXBwbHknLFxuICAgICAgICAgICAgICAgICAgICAnLWYnLFxuICAgICAgICAgICAgICAgICAgICBmaWxlXG4gICAgICAgICAgICAgICAgXSwge1xuICAgICAgICAgICAgICAgICAgICBjd2Q6IHJvb3RcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwcy5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4gcHJvY2Vzcy5zdGRvdXQud3JpdGUoZGF0YS50b1N0cmluZygpKSk7XG4gICAgICAgICAgICAgICAgcHMuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHByb2Nlc3Muc3RkZXJyLndyaXRlKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICB9KTtcbn0iXX0=