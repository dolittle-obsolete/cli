#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _helpers = require('./helpers');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Guid = require('./Guid');

var _child_process = require('child_process');

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var USAGE = 'dolittle veracity create boundedcontext [name]';
_args2.default.example(USAGE, 'Creates a bounded context with a given name');

_args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle veracity create boundedcontext' });

if (!_args2.default.sub.length) _args2.default.showHelp();

(0, _helpers.validateArgsNameInput)(_args2.default.sub[0]);
var context = {
    name: _args2.default.sub[0],
    destination: process.cwd()
};

var application = _globals2.default.applicationManager.getApplicationFrom(context.destination);

if (application === null) {
    _globals2.default.logger.error('Missing application - use \'dolittle create application [name]\' for a new application');
} else {
    _globals2.default.boundedContextManager.create(context);
    var boilerPlate = _globals2.default.boilerPlatesManager.boilerPlatesByLanguageAndType('csharp', 'boundedContext-adornment')[0];
    var boundedContextPath = _path2.default.join(context.destination, context.name);
    _globals2.default.folders.makeFolderIfNotExists(boundedContextPath);
    var templateContext = {
        id: _Guid.Guid.create(),
        name: context.name,
        applicationId: application.id
    };
    _globals2.default.boilerPlatesManager.createInstance(boilerPlate, boundedContextPath, templateContext);

    process.chdir(context.name);

    var addPackage = function addPackage(reference, version, done) {
        var dotnetAddPackage = (0, _child_process.exec)('dotnet add package ' + reference + ' -v ' + version, {
            cwd: 'Core'
        });
        dotnetAddPackage.stdout.on('data', function (data) {
            return process.stdout.write(data.toString());
        });
        dotnetAddPackage.stderr.on('data', function (data) {
            return process.stderr.write(data.toString());
        });
        dotnetAddPackage.on('exit', function () {
            done();
        });
    };

    (0, _glob2.default)('./Core/*.csproj', function (err, matches) {
        if (matches.length) {
            _globals2.default.logger.info('.NET Core project found - restoring packages');

            addPackage('Veracity.Authentication.OpenIDConnect.Core', '1.0.0', function () {
                addPackage('Microsoft.AspNetCore.All', '2.1.4', function () {
                    var dotnet = (0, _child_process.spawn)('dotnet', ['restore'], {
                        cwd: 'Core'
                    });
                    dotnet.stdout.on('data', function (data) {
                        return process.stdout.write(data.toString());
                    });
                    dotnet.stderr.on('data', function (data) {
                        return process.stderr.write(data.toString());
                    });
                });
            });
        }
    });

    var packageJsonFile = _path2.default.join(process.cwd(), 'Web', 'package.js');
    if (_fs2.default.existsSync(packageJsonFile)) {
        _globals2.default.logger.info('Web found - restoring packages');

        var npmInstall = (0, _child_process.spawn)('npm', ['install'], {
            cwd: './Web'
        });

        npmInstall.stdout.on('data', function (data) {
            return process.stdout.write(data.toString());
        });
        npmInstall.stderr.on('data', function (data) {
            return process.stderr.write(data.toString());
        });
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS12ZXJhY2l0eS1jcmVhdGUtYm91bmRlZGNvbnRleHQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiY29udGV4dCIsImRlc3RpbmF0aW9uIiwiY3dkIiwiYXBwbGljYXRpb24iLCJnbG9iYWxzIiwiYXBwbGljYXRpb25NYW5hZ2VyIiwiZ2V0QXBwbGljYXRpb25Gcm9tIiwibG9nZ2VyIiwiZXJyb3IiLCJib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJjcmVhdGUiLCJib2lsZXJQbGF0ZSIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSIsImJvdW5kZWRDb250ZXh0UGF0aCIsInBhdGgiLCJqb2luIiwiZm9sZGVycyIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsInRlbXBsYXRlQ29udGV4dCIsImlkIiwiR3VpZCIsImFwcGxpY2F0aW9uSWQiLCJjcmVhdGVJbnN0YW5jZSIsImNoZGlyIiwiYWRkUGFja2FnZSIsInJlZmVyZW5jZSIsInZlcnNpb24iLCJkb25lIiwiZG90bmV0QWRkUGFja2FnZSIsInN0ZG91dCIsIm9uIiwiZGF0YSIsIndyaXRlIiwidG9TdHJpbmciLCJzdGRlcnIiLCJlcnIiLCJtYXRjaGVzIiwiaW5mbyIsImRvdG5ldCIsInBhY2thZ2VKc29uRmlsZSIsImZzIiwiZXhpc3RzU3luYyIsIm5wbUluc3RhbGwiXSwibWFwcGluZ3MiOiI7O0FBTUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBWEE7Ozs7QUFhQSxJQUFNQSxRQUFRLGdEQUFkO0FBQ0FDLGVBQ0tDLE9BREwsQ0FDYUYsS0FEYixFQUNvQiw2Q0FEcEI7O0FBR0FDLGVBQUtFLEtB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UUFBTCxFQUFyQixDQUFWO0FBQUEscUJBQXpCO0FBQ0FLLDJCQUFPSixNQUFQLENBQWNKLEVBQWQsQ0FBaUIsTUFBakIsRUFBeUIsVUFBQ0MsSUFBRDtBQUFBLCtCQUFVeEMsUUFBUTJDLE1BQVIsQ0FBZUYsS0FBZixDQUFxQkQsS0FBS0UsUUFBTCxFQUFyQixDQUFWO0FBQUEscUJBQXpCO0FBQ0gsaUJBTkQ7QUFPSCxhQVJEO0FBU0g7QUFDSixLQWREOztBQWdCQSxRQUFJTSxrQkFBa0J6QixlQUFLQyxJQUFMLENBQVV4QixRQUFRVSxHQUFSLEVBQVYsRUFBeUIsS0FBekIsRUFBZ0MsWUFBaEMsQ0FBdEI7QUFDQSxRQUFJdUMsYUFBR0MsVUFBSCxDQUFjRixlQUFkLENBQUosRUFBb0M7QUFDaENwQywwQkFBUUcsTUFBUixDQUFlK0IsSUFBZixDQUFvQixnQ0FBcEI7O0FBRUEsWUFBSUssYUFBYSwwQkFBTSxLQUFOLEVBQWEsQ0FBQyxTQUFELENBQWIsRUFBMEI7QUFDdkN6QyxpQkFBSztBQURrQyxTQUExQixDQUFqQjs7QUFJQXlDLG1CQUFXYixNQUFYLENBQWtCQyxFQUFsQixDQUFxQixNQUFyQixFQUE2QixVQUFDQyxJQUFEO0FBQUEsbUJBQVV4QyxRQUFRc0MsTUFBUixDQUFlRyxLQUFmLENBQXFCRCxLQUFLRSxRQUFMLEVBQXJCLENBQVY7QUFBQSxTQUE3QjtBQUNBUyxtQkFBV1IsTUFBWCxDQUFrQkosRUFBbEIsQ0FBcUIsTUFBckIsRUFBNkIsVUFBQ0MsSUFBRDtBQUFBLG1CQUFVeEMsUUFBUTJDLE1BQVIsQ0FBZUYsS0FBZixDQUFxQkQsS0FBS0UsUUFBTCxFQUFyQixDQUFWO0FBQUEsU0FBN0I7QUFDSDtBQUNKIiwiZmlsZSI6ImRvbGl0dGxlLXZlcmFjaXR5LWNyZWF0ZS1ib3VuZGVkY29udGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcclxuaW1wb3J0IGdsb2JhbHMgZnJvbSAnLi9nbG9iYWxzJztcclxuaW1wb3J0IHsgdXNhZ2VQcmVmaXgsIHZhbGlkYXRlQXJnc05hbWVJbnB1dCB9IGZyb20gJy4vaGVscGVycyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBHdWlkIH0gZnJvbSAnLi9HdWlkJztcclxuaW1wb3J0IHsgc3Bhd24sIGV4ZWMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcclxuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYic7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcblxyXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSB2ZXJhY2l0eSBjcmVhdGUgYm91bmRlZGNvbnRleHQgW25hbWVdJztcclxuYXJnc1xyXG4gICAgLmV4YW1wbGUoVVNBR0UsICdDcmVhdGVzIGEgYm91bmRlZCBjb250ZXh0IHdpdGggYSBnaXZlbiBuYW1lJyk7XHJcblxyXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwgeyB2YWx1ZTogdXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIHZlcmFjaXR5IGNyZWF0ZSBib3VuZGVkY29udGV4dCcgfSk7XHJcblxyXG5pZiAoIWFyZ3Muc3ViLmxlbmd0aCkgYXJncy5zaG93SGVscCgpO1xyXG5cclxudmFsaWRhdGVBcmdzTmFtZUlucHV0KGFyZ3Muc3ViWzBdKTtcclxubGV0IGNvbnRleHQgPSB7XHJcbiAgICBuYW1lOiBhcmdzLnN1YlswXSxcclxuICAgIGRlc3RpbmF0aW9uOiBwcm9jZXNzLmN3ZCgpXHJcbn07XHJcblxyXG5sZXQgYXBwbGljYXRpb24gPSBnbG9iYWxzLmFwcGxpY2F0aW9uTWFuYWdlci5nZXRBcHBsaWNhdGlvbkZyb20oY29udGV4dC5kZXN0aW5hdGlvbik7XHJcblxyXG5pZiAoYXBwbGljYXRpb24gPT09IG51bGwpIHtcclxuICAgIGdsb2JhbHMubG9nZ2VyLmVycm9yKCdNaXNzaW5nIGFwcGxpY2F0aW9uIC0gdXNlIFxcJ2RvbGl0dGxlIGNyZWF0ZSBhcHBsaWNhdGlvbiBbbmFtZV1cXCcgZm9yIGEgbmV3IGFwcGxpY2F0aW9uJyk7XHJcbn0gZWxzZSB7XHJcbiAgICBnbG9iYWxzLmJvdW5kZWRDb250ZXh0TWFuYWdlci5jcmVhdGUoY29udGV4dCk7XHJcbiAgICBsZXQgYm9pbGVyUGxhdGUgPSBnbG9iYWxzLmJvaWxlclBsYXRlc01hbmFnZXIuYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUoJ2NzaGFycCcsICdib3VuZGVkQ29udGV4dC1hZG9ybm1lbnQnKVswXTtcclxuICAgIGxldCBib3VuZGVkQ29udGV4dFBhdGggPSBwYXRoLmpvaW4oY29udGV4dC5kZXN0aW5hdGlvbiwgY29udGV4dC5uYW1lKTtcclxuICAgIGdsb2JhbHMuZm9sZGVycy5tYWtlRm9sZGVySWZOb3RFeGlzdHMoYm91bmRlZENvbnRleHRQYXRoKTtcclxuICAgIGxldCB0ZW1wbGF0ZUNvbnRleHQgPSB7XHJcbiAgICAgICAgaWQ6IEd1aWQuY3JlYXRlKCksXHJcbiAgICAgICAgbmFtZTogY29udGV4dC5uYW1lLFxyXG4gICAgICAgIGFwcGxpY2F0aW9uSWQ6IGFwcGxpY2F0aW9uLmlkXHJcbiAgICB9O1xyXG4gICAgZ2xvYmFscy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLmNyZWF0ZUluc3RhbmNlKGJvaWxlclBsYXRlLCBib3VuZGVkQ29udGV4dFBhdGgsIHRlbXBsYXRlQ29udGV4dCk7XHJcblxyXG4gICAgcHJvY2Vzcy5jaGRpcihjb250ZXh0Lm5hbWUpO1xyXG4gICAgXHJcbiAgICBsZXQgYWRkUGFja2FnZSA9IChyZWZlcmVuY2UsIHZlcnNpb24sIGRvbmUpID0+IHtcclxuICAgICAgICBsZXQgZG90bmV0QWRkUGFja2FnZSA9IGV4ZWMoYGRvdG5ldCBhZGQgcGFja2FnZSAke3JlZmVyZW5jZX0gLXYgJHt2ZXJzaW9ufWAsIHtcclxuICAgICAgICAgICAgY3dkOiAnQ29yZSdcclxuICAgICAgICB9KTtcclxuICAgICAgICBkb3RuZXRBZGRQYWNrYWdlLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiBwcm9jZXNzLnN0ZG91dC53cml0ZShkYXRhLnRvU3RyaW5nKCkpKTtcclxuICAgICAgICBkb3RuZXRBZGRQYWNrYWdlLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiBwcm9jZXNzLnN0ZGVyci53cml0ZShkYXRhLnRvU3RyaW5nKCkpKTtcclxuICAgICAgICBkb3RuZXRBZGRQYWNrYWdlLm9uKCdleGl0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdsb2IoJy4vQ29yZS8qLmNzcHJvaicsIChlcnIsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBpZiAobWF0Y2hlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnLk5FVCBDb3JlIHByb2plY3QgZm91bmQgLSByZXN0b3JpbmcgcGFja2FnZXMnKTtcclxuXHJcbiAgICAgICAgICAgIGFkZFBhY2thZ2UoJ1ZlcmFjaXR5LkF1dGhlbnRpY2F0aW9uLk9wZW5JRENvbm5lY3QuQ29yZScsJzEuMC4wJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkUGFja2FnZSgnTWljcm9zb2Z0LkFzcE5ldENvcmUuQWxsJywnMi4xLjQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRvdG5ldCA9IHNwYXduKCdkb3RuZXQnLCBbJ3Jlc3RvcmUnXSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjd2Q6ICdDb3JlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdG5ldC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4gcHJvY2Vzcy5zdGRvdXQud3JpdGUoZGF0YS50b1N0cmluZygpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG90bmV0LnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiBwcm9jZXNzLnN0ZGVyci53cml0ZShkYXRhLnRvU3RyaW5nKCkpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgcGFja2FnZUpzb25GaWxlID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdXZWInLCAncGFja2FnZS5qcycpO1xyXG4gICAgaWYgKGZzLmV4aXN0c1N5bmMocGFja2FnZUpzb25GaWxlKSkge1xyXG4gICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJ1dlYiBmb3VuZCAtIHJlc3RvcmluZyBwYWNrYWdlcycpO1xyXG5cclxuICAgICAgICBsZXQgbnBtSW5zdGFsbCA9IHNwYXduKCducG0nLCBbJ2luc3RhbGwnXSwge1xyXG4gICAgICAgICAgICBjd2Q6ICcuL1dlYidcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbnBtSW5zdGFsbC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4gcHJvY2Vzcy5zdGRvdXQud3JpdGUoZGF0YS50b1N0cmluZygpKSk7XHJcbiAgICAgICAgbnBtSW5zdGFsbC5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gcHJvY2Vzcy5zdGRlcnIud3JpdGUoZGF0YS50b1N0cmluZygpKSk7XHJcbiAgICB9XHJcbn1cclxuIl19