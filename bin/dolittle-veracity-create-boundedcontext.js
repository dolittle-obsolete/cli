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

    (0, _glob2.default)('./Core/*.csproj', function (err, matches) {
        if (matches.length) {
            _globals2.default.logger.info('.NET Core project found - restoring packages');

            var dotnet = (0, _child_process.spawn)('dotnet', ['restore'], {
                cwd: 'Core'
            });
            dotnet.stdout.on('data', function (data) {
                return console.log(data.toString());
            });
            dotnet.stderr.on('data', function (data) {
                return console.log(data.toString());
            });
        }
    });

    process.chdir(context.name);

    var packageJsonFile = _path2.default.join(process.cwd(), 'Web', 'package.js');
    if (_fs2.default.existsSync(packageJsonFile)) {
        _globals2.default.logger.info('Web found - restoring packages');

        var webpack = (0, _child_process.spawn)('yarn', [], {
            cwd: './Web'
        });

        webpack.stdout.on('data', function (data) {
            return console.log(data.toString());
        });
        webpack.stderr.on('data', function (data) {
            return console.log(data.toString());
        });
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS12ZXJhY2l0eS1jcmVhdGUtYm91bmRlZGNvbnRleHQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiY29udGV4dCIsImRlc3RpbmF0aW9uIiwiY3dkIiwiYXBwbGljYXRpb24iLCJnbG9iYWxzIiwiYXBwbGljYXRpb25NYW5hZ2VyIiwiZ2V0QXBwbGljYXRpb25Gcm9tIiwibG9nZ2VyIiwiZXJyb3IiLCJib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJjcmVhdGUiLCJib2lsZXJQbGF0ZSIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSIsImJvdW5kZWRDb250ZXh0UGF0aCIsInBhdGgiLCJqb2luIiwiZm9sZGVycyIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsInRlbXBsYXRlQ29udGV4dCIsImlkIiwiR3VpZCIsImFwcGxpY2F0aW9uSWQiLCJjcmVhdGVJbnN0YW5jZSIsImVyciIsIm1hdGNoZXMiLCJpbmZvIiwiZG90bmV0Iiwic3Rkb3V0Iiwib24iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInRvU3RyaW5nIiwic3RkZXJyIiwiY2hkaXIiLCJwYWNrYWdlSnNvbkZpbGUiLCJmcyIsImV4aXN0c1N5bmMiLCJ3ZWJwYWNrIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQVhBOzs7O0FBYUEsSUFBTUEsUUFBUSxnREFBZDtBQUNBQyxlQUNLQyxPQURMLENBQ2FGLEtBRGIsRUFDb0IsNkNBRHBCOztBQUdBQyxlQUFLRSxLQUFMLENBQVdDLFFBQVFDLElBQW5CLEVBQXlCLEVBQUNDLE9BQU9DLHVCQUFjUCxLQUF0QixFQUE2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QUFDSiIsImZpbGUiOiJkb2xpdHRsZS12ZXJhY2l0eS1jcmVhdGUtYm91bmRlZGNvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFscyBmcm9tICcuL2dsb2JhbHMnO1xuaW1wb3J0IHsgdXNhZ2VQcmVmaXgsIHZhbGlkYXRlQXJnc05hbWVJbnB1dH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgR3VpZCB9ZnJvbSAnLi9HdWlkJztcbmltcG9ydCB7IHNwYXduIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgZ2xvYiBmcm9tICdnbG9iJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5cbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIHZlcmFjaXR5IGNyZWF0ZSBib3VuZGVkY29udGV4dCBbbmFtZV0nO1xuYXJnc1xuICAgIC5leGFtcGxlKFVTQUdFLCAnQ3JlYXRlcyBhIGJvdW5kZWQgY29udGV4dCB3aXRoIGEgZ2l2ZW4gbmFtZScpO1xuICAgIFxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHt2YWx1ZTogdXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIHZlcmFjaXR5IGNyZWF0ZSBib3VuZGVkY29udGV4dCd9KTtcblxuaWYoICFhcmdzLnN1Yi5sZW5ndGggKSBhcmdzLnNob3dIZWxwKCk7XG5cbnZhbGlkYXRlQXJnc05hbWVJbnB1dChhcmdzLnN1YlswXSk7XG5sZXQgY29udGV4dCA9IHtcbiAgICBuYW1lOiBhcmdzLnN1YlswXSxcbiAgICBkZXN0aW5hdGlvbjogcHJvY2Vzcy5jd2QoKVxufTtcblxubGV0IGFwcGxpY2F0aW9uID0gZ2xvYmFscy5hcHBsaWNhdGlvbk1hbmFnZXIuZ2V0QXBwbGljYXRpb25Gcm9tKGNvbnRleHQuZGVzdGluYXRpb24pO1xuXG5pZiggYXBwbGljYXRpb24gPT09IG51bGwgKSB7XG4gICAgZ2xvYmFscy5sb2dnZXIuZXJyb3IoJ01pc3NpbmcgYXBwbGljYXRpb24gLSB1c2UgXFwnZG9saXR0bGUgY3JlYXRlIGFwcGxpY2F0aW9uIFtuYW1lXVxcJyBmb3IgYSBuZXcgYXBwbGljYXRpb24nKTtcbn0gZWxzZSB7XG4gICAgZ2xvYmFscy5ib3VuZGVkQ29udGV4dE1hbmFnZXIuY3JlYXRlKGNvbnRleHQpO1xuICAgIGxldCBib2lsZXJQbGF0ZSA9IGdsb2JhbHMuYm9pbGVyUGxhdGVzTWFuYWdlci5ib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSgnY3NoYXJwJywgJ2JvdW5kZWRDb250ZXh0LWFkb3JubWVudCcpWzBdO1xuICAgIGxldCBib3VuZGVkQ29udGV4dFBhdGggPSBwYXRoLmpvaW4oY29udGV4dC5kZXN0aW5hdGlvbiwgY29udGV4dC5uYW1lKTtcbiAgICBnbG9iYWxzLmZvbGRlcnMubWFrZUZvbGRlcklmTm90RXhpc3RzKGJvdW5kZWRDb250ZXh0UGF0aCk7XG4gICAgbGV0IHRlbXBsYXRlQ29udGV4dCA9IHtcbiAgICAgICAgaWQ6IEd1aWQuY3JlYXRlKCksXG4gICAgICAgIG5hbWU6IGNvbnRleHQubmFtZSxcbiAgICAgICAgYXBwbGljYXRpb25JZDogYXBwbGljYXRpb24uaWRcbiAgICB9O1xuICAgIGdsb2JhbHMuYm9pbGVyUGxhdGVzTWFuYWdlci5jcmVhdGVJbnN0YW5jZShib2lsZXJQbGF0ZSwgYm91bmRlZENvbnRleHRQYXRoLCB0ZW1wbGF0ZUNvbnRleHQpO1xuXG4gICAgZ2xvYignLi9Db3JlLyouY3Nwcm9qJywgKGVyciwgbWF0Y2hlcykgPT4ge1xuICAgICAgICBpZiAobWF0Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJy5ORVQgQ29yZSBwcm9qZWN0IGZvdW5kIC0gcmVzdG9yaW5nIHBhY2thZ2VzJyk7XG5cbiAgICAgICAgICAgIGxldCBkb3RuZXQgPSBzcGF3bignZG90bmV0JywgWydyZXN0b3JlJ10sIHtcbiAgICAgICAgICAgICAgICBjd2Q6ICdDb3JlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb3RuZXQuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICAgICAgZG90bmV0LnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgfSBcbiAgICB9KTtcblxuICAgIHByb2Nlc3MuY2hkaXIoY29udGV4dC5uYW1lKTtcblxuICAgIGxldCBwYWNrYWdlSnNvbkZpbGUgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwnV2ViJywncGFja2FnZS5qcycpO1xuICAgIGlmKCBmcy5leGlzdHNTeW5jKHBhY2thZ2VKc29uRmlsZSkpIHtcbiAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnV2ViIGZvdW5kIC0gcmVzdG9yaW5nIHBhY2thZ2VzJyk7XG4gICAgICAgIFxuICAgICAgICBsZXQgd2VicGFjayA9IHNwYXduKCd5YXJuJywgW10sIHtcbiAgICAgICAgICAgIGN3ZDogJy4vV2ViJ1xuICAgICAgICB9KTtcblxuICAgICAgICB3ZWJwYWNrLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgd2VicGFjay5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSk7XG4gICAgfVxufVxuIl19