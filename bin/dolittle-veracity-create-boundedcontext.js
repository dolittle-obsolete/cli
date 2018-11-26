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
    console.log('Current dir : ' + process.cwd());

    var addPackage = function addPackage(reference, version, done) {
        var dotnetAddPackage = (0, _child_process.exec)('dotnet add package ' + reference + ' -v ' + version, {
            cwd: 'Core'
        });
        dotnetAddPackage.stdout.on('data', function (data) {
            return console.log(data.toString());
        });
        dotnetAddPackage.stderr.on('data', function (data) {
            return console.log(data.toString());
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
                        return console.log(data.toString());
                    });
                    dotnet.stderr.on('data', function (data) {
                        return console.log(data.toString());
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
            return console.log(data.toString());
        });
        npmInstall.stderr.on('data', function (data) {
            return console.log(data.toString());
        });
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS12ZXJhY2l0eS1jcmVhdGUtYm91bmRlZGNvbnRleHQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiY29udGV4dCIsImRlc3RpbmF0aW9uIiwiY3dkIiwiYXBwbGljYXRpb24iLCJnbG9iYWxzIiwiYXBwbGljYXRpb25NYW5hZ2VyIiwiZ2V0QXBwbGljYXRpb25Gcm9tIiwibG9nZ2VyIiwiZXJyb3IiLCJib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJjcmVhdGUiLCJib2lsZXJQbGF0ZSIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSIsImJvdW5kZWRDb250ZXh0UGF0aCIsInBhdGgiLCJqb2luIiwiZm9sZGVycyIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsInRlbXBsYXRlQ29udGV4dCIsImlkIiwiR3VpZCIsImFwcGxpY2F0aW9uSWQiLCJjcmVhdGVJbnN0YW5jZSIsImNoZGlyIiwiY29uc29sZSIsImxvZyIsImFkZFBhY2thZ2UiLCJyZWZlcmVuY2UiLCJ2ZXJzaW9uIiwiZG9uZSIsImRvdG5ldEFkZFBhY2thZ2UiLCJzdGRvdXQiLCJvbiIsImRhdGEiLCJ0b1N0cmluZyIsInN0ZGVyciIsImVyciIsIm1hdGNoZXMiLCJpbmZvIiwiZG90bmV0IiwicGFja2FnZUpzb25GaWxlIiwiZnMiLCJleGlzdHNTeW5jIiwibnBtSW5zdGFsbCJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFYQTs7OztBQWFBLElBQU1BLFFBQVEsZ0RBQWQ7QUFDQUMsZUFDS0MsT0FETCxDQUNhRixLQURiLEVBQ29CLDZDQURwQjs7QUFHQUMs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USxLQUFLQyxRQUFMLEVBQVosQ0FBVjtBQUFBLHFCQUF6QjtBQUNBSywyQkFBT0osTUFBUCxDQUFjSCxFQUFkLENBQWlCLE1BQWpCLEVBQXlCLFVBQUNDLElBQUQ7QUFBQSwrQkFBVVQsUUFBUUMsR0FBUixDQUFZUSxLQUFLQyxRQUFMLEVBQVosQ0FBVjtBQUFBLHFCQUF6QjtBQUNILGlCQU5EO0FBT0gsYUFSRDtBQVNIO0FBQ0osS0FkRDs7QUFnQkEsUUFBSU0sa0JBQWtCMUIsZUFBS0MsSUFBTCxDQUFVeEIsUUFBUVUsR0FBUixFQUFWLEVBQXlCLEtBQXpCLEVBQWdDLFlBQWhDLENBQXRCO0FBQ0EsUUFBSXdDLGFBQUdDLFVBQUgsQ0FBY0YsZUFBZCxDQUFKLEVBQW9DO0FBQ2hDckMsMEJBQVFHLE1BQVIsQ0FBZWdDLElBQWYsQ0FBb0IsZ0NBQXBCOztBQUVBLFlBQUlLLGFBQWEsMEJBQU0sS0FBTixFQUFhLENBQUMsU0FBRCxDQUFiLEVBQTBCO0FBQ3ZDMUMsaUJBQUs7QUFEa0MsU0FBMUIsQ0FBakI7O0FBSUEwQyxtQkFBV1osTUFBWCxDQUFrQkMsRUFBbEIsQ0FBcUIsTUFBckIsRUFBNkIsVUFBQ0MsSUFBRDtBQUFBLG1CQUFVVCxRQUFRQyxHQUFSLENBQVlRLEtBQUtDLFFBQUwsRUFBWixDQUFWO0FBQUEsU0FBN0I7QUFDQVMsbUJBQVdSLE1BQVgsQ0FBa0JILEVBQWxCLENBQXFCLE1BQXJCLEVBQTZCLFVBQUNDLElBQUQ7QUFBQSxtQkFBVVQsUUFBUUMsR0FBUixDQUFZUSxLQUFLQyxRQUFMLEVBQVosQ0FBVjtBQUFBLFNBQTdCO0FBQ0g7QUFDSiIsImZpbGUiOiJkb2xpdHRsZS12ZXJhY2l0eS1jcmVhdGUtYm91bmRlZGNvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFscyBmcm9tICcuL2dsb2JhbHMnO1xuaW1wb3J0IHsgdXNhZ2VQcmVmaXgsIHZhbGlkYXRlQXJnc05hbWVJbnB1dCB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IEd1aWQgfSBmcm9tICcuL0d1aWQnO1xuaW1wb3J0IHsgc3Bhd24sIGV4ZWMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgdmVyYWNpdHkgY3JlYXRlIGJvdW5kZWRjb250ZXh0IFtuYW1lXSc7XG5hcmdzXG4gICAgLmV4YW1wbGUoVVNBR0UsICdDcmVhdGVzIGEgYm91bmRlZCBjb250ZXh0IHdpdGggYSBnaXZlbiBuYW1lJyk7XG5cbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7IHZhbHVlOiB1c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgdmVyYWNpdHkgY3JlYXRlIGJvdW5kZWRjb250ZXh0JyB9KTtcblxuaWYgKCFhcmdzLnN1Yi5sZW5ndGgpIGFyZ3Muc2hvd0hlbHAoKTtcblxudmFsaWRhdGVBcmdzTmFtZUlucHV0KGFyZ3Muc3ViWzBdKTtcbmxldCBjb250ZXh0ID0ge1xuICAgIG5hbWU6IGFyZ3Muc3ViWzBdLFxuICAgIGRlc3RpbmF0aW9uOiBwcm9jZXNzLmN3ZCgpXG59O1xuXG5sZXQgYXBwbGljYXRpb24gPSBnbG9iYWxzLmFwcGxpY2F0aW9uTWFuYWdlci5nZXRBcHBsaWNhdGlvbkZyb20oY29udGV4dC5kZXN0aW5hdGlvbik7XG5cbmlmIChhcHBsaWNhdGlvbiA9PT0gbnVsbCkge1xuICAgIGdsb2JhbHMubG9nZ2VyLmVycm9yKCdNaXNzaW5nIGFwcGxpY2F0aW9uIC0gdXNlIFxcJ2RvbGl0dGxlIGNyZWF0ZSBhcHBsaWNhdGlvbiBbbmFtZV1cXCcgZm9yIGEgbmV3IGFwcGxpY2F0aW9uJyk7XG59IGVsc2Uge1xuICAgIGdsb2JhbHMuYm91bmRlZENvbnRleHRNYW5hZ2VyLmNyZWF0ZShjb250ZXh0KTtcbiAgICBsZXQgYm9pbGVyUGxhdGUgPSBnbG9iYWxzLmJvaWxlclBsYXRlc01hbmFnZXIuYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUoJ2NzaGFycCcsICdib3VuZGVkQ29udGV4dC1hZG9ybm1lbnQnKVswXTtcbiAgICBsZXQgYm91bmRlZENvbnRleHRQYXRoID0gcGF0aC5qb2luKGNvbnRleHQuZGVzdGluYXRpb24sIGNvbnRleHQubmFtZSk7XG4gICAgZ2xvYmFscy5mb2xkZXJzLm1ha2VGb2xkZXJJZk5vdEV4aXN0cyhib3VuZGVkQ29udGV4dFBhdGgpO1xuICAgIGxldCB0ZW1wbGF0ZUNvbnRleHQgPSB7XG4gICAgICAgIGlkOiBHdWlkLmNyZWF0ZSgpLFxuICAgICAgICBuYW1lOiBjb250ZXh0Lm5hbWUsXG4gICAgICAgIGFwcGxpY2F0aW9uSWQ6IGFwcGxpY2F0aW9uLmlkXG4gICAgfTtcbiAgICBnbG9iYWxzLmJvaWxlclBsYXRlc01hbmFnZXIuY3JlYXRlSW5zdGFuY2UoYm9pbGVyUGxhdGUsIGJvdW5kZWRDb250ZXh0UGF0aCwgdGVtcGxhdGVDb250ZXh0KTtcblxuICAgIHByb2Nlc3MuY2hkaXIoY29udGV4dC5uYW1lKTtcbiAgICBjb25zb2xlLmxvZyhgQ3VycmVudCBkaXIgOiAke3Byb2Nlc3MuY3dkKCl9YCk7XG5cbiAgICBsZXQgYWRkUGFja2FnZSA9IChyZWZlcmVuY2UsIHZlcnNpb24sIGRvbmUpID0+IHtcbiAgICAgICAgbGV0IGRvdG5ldEFkZFBhY2thZ2UgPSBleGVjKGBkb3RuZXQgYWRkIHBhY2thZ2UgJHtyZWZlcmVuY2V9IC12ICR7dmVyc2lvbn1gLCB7XG4gICAgICAgICAgICBjd2Q6ICdDb3JlJ1xuICAgICAgICB9KTtcbiAgICAgICAgZG90bmV0QWRkUGFja2FnZS5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSk7XG4gICAgICAgIGRvdG5ldEFkZFBhY2thZ2Uuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICBkb3RuZXRBZGRQYWNrYWdlLm9uKCdleGl0JywgKCkgPT4ge1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZ2xvYignLi9Db3JlLyouY3Nwcm9qJywgKGVyciwgbWF0Y2hlcykgPT4ge1xuICAgICAgICBpZiAobWF0Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJy5ORVQgQ29yZSBwcm9qZWN0IGZvdW5kIC0gcmVzdG9yaW5nIHBhY2thZ2VzJyk7XG5cbiAgICAgICAgICAgIGFkZFBhY2thZ2UoJ1ZlcmFjaXR5LkF1dGhlbnRpY2F0aW9uLk9wZW5JRENvbm5lY3QuQ29yZScsJzEuMC4wJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFkZFBhY2thZ2UoJ01pY3Jvc29mdC5Bc3BOZXRDb3JlLkFsbCcsJzIuMS40JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZG90bmV0ID0gc3Bhd24oJ2RvdG5ldCcsIFsncmVzdG9yZSddLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjd2Q6ICdDb3JlJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgZG90bmV0LnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgZG90bmV0LnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgcGFja2FnZUpzb25GaWxlID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdXZWInLCAncGFja2FnZS5qcycpO1xuICAgIGlmIChmcy5leGlzdHNTeW5jKHBhY2thZ2VKc29uRmlsZSkpIHtcbiAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnV2ViIGZvdW5kIC0gcmVzdG9yaW5nIHBhY2thZ2VzJyk7XG5cbiAgICAgICAgbGV0IG5wbUluc3RhbGwgPSBzcGF3bignbnBtJywgWydpbnN0YWxsJ10sIHtcbiAgICAgICAgICAgIGN3ZDogJy4vV2ViJ1xuICAgICAgICB9KTtcblxuICAgICAgICBucG1JbnN0YWxsLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgbnBtSW5zdGFsbC5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSk7XG4gICAgfVxufVxuIl19