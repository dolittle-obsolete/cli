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
    name: 'something', //args.sub[0],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS12ZXJhY2l0eS1jcmVhdGUtYm91bmRlZGNvbnRleHQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiY29udGV4dCIsImRlc3RpbmF0aW9uIiwiY3dkIiwiYXBwbGljYXRpb24iLCJnbG9iYWxzIiwiYXBwbGljYXRpb25NYW5hZ2VyIiwiZ2V0QXBwbGljYXRpb25Gcm9tIiwibG9nZ2VyIiwiZXJyb3IiLCJib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJjcmVhdGUiLCJib2lsZXJQbGF0ZSIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSIsImJvdW5kZWRDb250ZXh0UGF0aCIsInBhdGgiLCJqb2luIiwiZm9sZGVycyIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsInRlbXBsYXRlQ29udGV4dCIsImlkIiwiR3VpZCIsImFwcGxpY2F0aW9uSWQiLCJjcmVhdGVJbnN0YW5jZSIsImVyciIsIm1hdGNoZXMiLCJpbmZvIiwiZG90bmV0Iiwic3Rkb3V0Iiwib24iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInRvU3RyaW5nIiwic3RkZXJyIiwicGFja2FnZUpzb25GaWxlIiwiZnMiLCJleGlzdHNTeW5jIiwid2VicGFjayJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFYQTs7OztBQWFBLElBQU1BLFFBQVEsZ0RBQWQ7QUFDQUMsZUFDS0MsT0FETCxDQUNhRixLQURiLEVBQ29CLDZDQURwQjs7QUFHQUMsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQixFQUF5QixFQUFDQyxPQUFPQyx1QkFBY1AsS0FBdEIsRUFBNkJRLE1BQU0s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ZXNDb250ZW50IjpbIlxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vZ2xvYmFscyc7XG5pbXBvcnQgeyB1c2FnZVByZWZpeCwgdmFsaWRhdGVBcmdzTmFtZUlucHV0fSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBHdWlkIH1mcm9tICcuL0d1aWQnO1xuaW1wb3J0IHsgc3Bhd24gfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgdmVyYWNpdHkgY3JlYXRlIGJvdW5kZWRjb250ZXh0IFtuYW1lXSc7XG5hcmdzXG4gICAgLmV4YW1wbGUoVVNBR0UsICdDcmVhdGVzIGEgYm91bmRlZCBjb250ZXh0IHdpdGggYSBnaXZlbiBuYW1lJyk7XG4gICAgXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwge3ZhbHVlOiB1c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgdmVyYWNpdHkgY3JlYXRlIGJvdW5kZWRjb250ZXh0J30pO1xuXG5pZiggIWFyZ3Muc3ViLmxlbmd0aCApIGFyZ3Muc2hvd0hlbHAoKTtcblxudmFsaWRhdGVBcmdzTmFtZUlucHV0KGFyZ3Muc3ViWzBdKTtcbmxldCBjb250ZXh0ID0ge1xuICAgIG5hbWU6ICdzb21ldGhpbmcnLCAvL2FyZ3Muc3ViWzBdLFxuICAgIGRlc3RpbmF0aW9uOiBwcm9jZXNzLmN3ZCgpXG59O1xuXG5sZXQgYXBwbGljYXRpb24gPSBnbG9iYWxzLmFwcGxpY2F0aW9uTWFuYWdlci5nZXRBcHBsaWNhdGlvbkZyb20oY29udGV4dC5kZXN0aW5hdGlvbik7XG5cbmlmKCBhcHBsaWNhdGlvbiA9PT0gbnVsbCApIHtcbiAgICBnbG9iYWxzLmxvZ2dlci5lcnJvcignTWlzc2luZyBhcHBsaWNhdGlvbiAtIHVzZSBcXCdkb2xpdHRsZSBjcmVhdGUgYXBwbGljYXRpb24gW25hbWVdXFwnIGZvciBhIG5ldyBhcHBsaWNhdGlvbicpO1xufSBlbHNlIHtcbiAgICBnbG9iYWxzLmJvdW5kZWRDb250ZXh0TWFuYWdlci5jcmVhdGUoY29udGV4dCk7XG4gICAgbGV0IGJvaWxlclBsYXRlID0gZ2xvYmFscy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLmJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKCdjc2hhcnAnLCAnYm91bmRlZENvbnRleHQtYWRvcm5tZW50JylbMF07XG4gICAgbGV0IGJvdW5kZWRDb250ZXh0UGF0aCA9IHBhdGguam9pbihjb250ZXh0LmRlc3RpbmF0aW9uLCBjb250ZXh0Lm5hbWUpO1xuICAgIGdsb2JhbHMuZm9sZGVycy5tYWtlRm9sZGVySWZOb3RFeGlzdHMoYm91bmRlZENvbnRleHRQYXRoKTtcbiAgICBsZXQgdGVtcGxhdGVDb250ZXh0ID0ge1xuICAgICAgICBpZDogR3VpZC5jcmVhdGUoKSxcbiAgICAgICAgbmFtZTogY29udGV4dC5uYW1lLFxuICAgICAgICBhcHBsaWNhdGlvbklkOiBhcHBsaWNhdGlvbi5pZFxuICAgIH07XG4gICAgZ2xvYmFscy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLmNyZWF0ZUluc3RhbmNlKGJvaWxlclBsYXRlLCBib3VuZGVkQ29udGV4dFBhdGgsIHRlbXBsYXRlQ29udGV4dCk7XG5cbiAgICBnbG9iKCcuL0NvcmUvKi5jc3Byb2onLCAoZXJyLCBtYXRjaGVzKSA9PiB7XG4gICAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnLk5FVCBDb3JlIHByb2plY3QgZm91bmQgLSByZXN0b3JpbmcgcGFja2FnZXMnKTtcblxuICAgICAgICAgICAgbGV0IGRvdG5ldCA9IHNwYXduKCdkb3RuZXQnLCBbJ3Jlc3RvcmUnXSwge1xuICAgICAgICAgICAgICAgIGN3ZDogJ0NvcmUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRvdG5ldC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSk7XG4gICAgICAgICAgICBkb3RuZXQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICB9IFxuICAgIH0pO1xuXG4gICAgbGV0IHBhY2thZ2VKc29uRmlsZSA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCdXZWInLCdwYWNrYWdlLmpzJyk7XG4gICAgaWYoIGZzLmV4aXN0c1N5bmMocGFja2FnZUpzb25GaWxlKSkge1xuICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCdXZWIgZm91bmQgLSByZXN0b3JpbmcgcGFja2FnZXMnKTtcbiAgICAgICAgXG4gICAgICAgIGxldCB3ZWJwYWNrID0gc3Bhd24oJ3lhcm4nLCBbXSwge1xuICAgICAgICAgICAgY3dkOiAnLi9XZWInXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdlYnBhY2suc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICB3ZWJwYWNrLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICB9XG59XG4iXX0=