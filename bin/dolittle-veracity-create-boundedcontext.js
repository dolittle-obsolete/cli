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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS12ZXJhY2l0eS1jcmVhdGUtYm91bmRlZGNvbnRleHQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiY29udGV4dCIsImRlc3RpbmF0aW9uIiwiY3dkIiwiYXBwbGljYXRpb24iLCJnbG9iYWxzIiwiYXBwbGljYXRpb25NYW5hZ2VyIiwiZ2V0QXBwbGljYXRpb25Gcm9tIiwibG9nZ2VyIiwiZXJyb3IiLCJib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJjcmVhdGUiLCJib2lsZXJQbGF0ZSIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSIsImJvdW5kZWRDb250ZXh0UGF0aCIsInBhdGgiLCJqb2luIiwiZm9sZGVycyIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsInRlbXBsYXRlQ29udGV4dCIsImlkIiwiR3VpZCIsImFwcGxpY2F0aW9uSWQiLCJjcmVhdGVJbnN0YW5jZSIsImNoZGlyIiwiYWRkUGFja2FnZSIsInJlZmVyZW5jZSIsInZlcnNpb24iLCJkb25lIiwiZG90bmV0QWRkUGFja2FnZSIsInN0ZG91dCIsIm9uIiwiZGF0YSIsIndyaXRlIiwidG9TdHJpbmciLCJzdGRlcnIiLCJlcnIiLCJtYXRjaGVzIiwiaW5mbyIsImRvdG5ldCIsInBhY2thZ2VKc29uRmlsZSIsImZzIiwiZXhpc3RzU3luYyIsIm5wbUluc3RhbGwiXSwibWFwcGluZ3MiOiI7O0FBTUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBWEE7Ozs7QUFhQSxJQUFNQSxRQUFRLGdEQUFkO0FBQ0FDLGVBQ0tDLE9BREwsQ0FDYUYsS0FEYixFQUNvQiw2Q0FEcEI7O0FBR0FDLGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBRUMsT0FBT0MsdUJBQWNQLEtBQXZCLEVBQThCUSxNQUFNLHlDQUFwQyxFQUF6Qjs7QUFFQSxJQUFJLENBQUNQLGVBQUtRLEdBQUwsQ0FBU0MsTUFBZCxFQUFzQlQsZUFBS1UsUUFBTDs7QUFFdEIsb0NBQXNCVixlQUFLUSxHQUFMLENBQVMsQ0FBVCxDQUF0QjtBQUNBLElBQUlHLFVBQVU7QUFDVkosVUFBTVAsZUFBS1EsR0FBTCxDQUFTLENBQVQsQ0FESTtBQUVWSSxpQkFBYVQsUUFBUVUsR0FBUjtBQUZILENBQWQ7O0FBS0EsSUFBSUMsY0FBY0Msa0JBQVFDLGtCQUFSLENBQTJCQyxrQkFBM0IsQ0FBOENOLFFBQVFDLFdBQXRELENBQWxCOztBQUVBLElBQUlFLGdCQUFnQixJQUFwQixFQUEwQjtBQUN0QkMsc0JBQVFHLE1BQVIsQ0FBZUMsS0FBZixDQUFxQix3RkFBckI7QUFDSCxDQUZELE1BRU87QUFDSEosc0JBQVFLLHFCQUFSLENBQThCQyxNQUE5QixDQUFxQ1YsT0FBckM7QUFDQSxRQUFJVyxjQUFjUCxrQkFBUVEsbUJBQVIsQ0FBNEJDLDZCQUE1QixDQUEwRCxRQUExRCxFQUFvRSwwQkFBcEUsRUFBZ0csQ0FBaEcsQ0FBbEI7QUFDQSxRQUFJQyxxQkFBcUJDLGVBQUtDLElBQUwsQ0FBVWhCLFFBQVFDLFdBQWxCLEVBQStCRCxRQUFRSixJQUF2QyxDQUF6QjtBQUNBUSxzQkFBUWEsT0FBUixDQUFnQkMscUJBQWhCLENBQXNDSixrQkFBdEM7QUFDQSxRQUFJSyxrQkFBa0I7QUFDbEJDLFlBQUlDLFdBQUtYLE1BQUwsRUFEYztBQUVsQmQsY0FBTUksUUFBUUosSUFGSTtBQUdsQjBCLHVCQUFlbkIsWUFBWWlCO0FBSFQsS0FBdEI7QUFLQWhCLHNCQUFRUSxtQkFBUixDQUE0QlcsY0FBNUIsQ0FBMkNaLFdBQTNDLEVBQXdERyxrQkFBeEQsRUFBNEVLLGVBQTVFOztBQUVBM0IsWUFBUWdDLEtBQVIsQ0FBY3hCLFFBQVFKLElBQXRCOztBQUVBLFFBQUk2QixhQUFhLFNBQWJBLFVBQWEsQ0FBQ0MsU0FBRCxFQUFZQyxPQUFaLEVBQXFCQyxJQUFyQixFQUE4QjtBQUMzQyxZQUFJQyxtQkFBbUIsaURBQTJCSCxTQUEzQixZQUEyQ0MsT0FBM0MsRUFBc0Q7QUFDekV6QixpQkFBSztBQURvRSxTQUF0RCxDQUF2QjtBQUdBMkIseUJBQWlCQyxNQUFqQixDQUF3QkMsRUFBeEIsQ0FBMkIsTUFBM0IsRUFBbUMsVUFBQ0MsSUFBRDtBQUFBLG1CQUFVeEMsUUFBUXNDLE1BQVIsQ0FBZUcsS0FBZixDQUFxQkQsS0FBS0UsUUFBTCxFQUFyQixDQUFWO0FBQUEsU0FBbkM7QUFDQUwseUJBQWlCTSxNQUFqQixDQUF3QkosRUFBeEIsQ0FBMkIsTUFBM0IsRUFBbUMsVUFBQ0MsSUFBRDtBQUFBLG1CQUFVeEMsUUFBUTJDLE1BQVIsQ0FBZUYsS0FBZixDQUFxQkQsS0FBS0UsUUFBTCxFQUFyQixDQUFWO0FBQUEsU0FBbkM7QUFDQUwseUJBQWlCRSxFQUFqQixDQUFvQixNQUFwQixFQUE0QixZQUFNO0FBQzlCSDtBQUNILFNBRkQ7QUFHSCxLQVREOztBQVdBLHdCQUFLLGlCQUFMLEVBQXdCLFVBQUNRLEdBQUQsRUFBTUMsT0FBTixFQUFrQjtBQUN0QyxZQUFJQSxRQUFRdkMsTUFBWixFQUFvQjtBQUNoQk0sOEJBQVFHLE1BQVIsQ0FBZStCLElBQWYsQ0FBb0IsOENBQXBCOztBQUVBYix1QkFBVyw0Q0FBWCxFQUF3RCxPQUF4RCxFQUFpRSxZQUFNO0FBQ25FQSwyQkFBVywwQkFBWCxFQUFzQyxPQUF0QyxFQUErQyxZQUFNO0FBQ2pELHdCQUFJYyxTQUFTLDBCQUFNLFFBQU4sRUFBZ0IsQ0FBQyxTQUFELENBQWhCLEVBQTZCO0FBQ3RDckMsNkJBQUs7QUFEaUMscUJBQTdCLENBQWI7QUFHQXFDLDJCQUFPVCxNQUFQLENBQWNDLEVBQWQsQ0FBaUIsTUFBakIsRUFBeUIsVUFBQ0MsSUFBRDtBQUFBLCtCQUFVeEMsUUFBUXNDLE1BQVIsQ0FBZUcsS0FBZixDQUFxQkQsS0FBS0UsUUFBTCxFQUFyQixDQUFWO0FBQUEscUJBQXpCO0FBQ0FLLDJCQUFPSixNQUFQLENBQWNKLEVBQWQsQ0FBaUIsTUFBakIsRUFBeUIsVUFBQ0MsSUFBRDtBQUFBLCtCQUFVeEMsUUFBUTJDLE1BQVIsQ0FBZUYsS0FBZixDQUFxQkQsS0FBS0UsUUFBTCxFQUFyQixDQUFWO0FBQUEscUJBQXpCO0FBQ0gsaUJBTkQ7QUFPSCxhQVJEO0FBU0g7QUFDSixLQWREOztBQWdCQSxRQUFJTSxrQkFBa0J6QixlQUFLQyxJQUFMLENBQVV4QixRQUFRVSxHQUFSLEVBQVYsRUFBeUIsS0FBekIsRUFBZ0MsWUFBaEMsQ0FBdEI7QUFDQSxRQUFJdUMsYUFBR0MsVUFBSCxDQUFjRixlQUFkLENBQUosRUFBb0M7QUFDaENwQywwQkFBUUcsTUFBUixDQUFlK0IsSUFBZixDQUFvQixnQ0FBcEI7O0FBRUEsWUFBSUssYUFBYSwwQkFBTSxLQUFOLEVBQWEsQ0FBQyxTQUFELENBQWIsRUFBMEI7QUFDdkN6QyxpQkFBSztBQURrQyxTQUExQixDQUFqQjs7QUFJQXlDLG1CQUFXYixNQUFYLENBQWtCQyxFQUFsQixDQUFxQixNQUFyQixFQUE2QixVQUFDQyxJQUFEO0FBQUEsbUJBQVV4QyxRQUFRc0MsTUFBUixDQUFlRyxLQUFmLENBQXFCRCxLQUFLRSxRQUFMLEVBQXJCLENBQVY7QUFBQSxTQUE3QjtBQUNBUyxtQkFBV1IsTUFBWCxDQUFrQkosRUFBbEIsQ0FBcUIsTUFBckIsRUFBNkIsVUFBQ0MsSUFBRDtBQUFBLG1CQUFVeEMsUUFBUTJDLE1BQVIsQ0FBZUYsS0FBZixDQUFxQkQsS0FBS0UsUUFBTCxFQUFyQixDQUFWO0FBQUEsU0FBN0I7QUFDSDtBQUNKIiwiZmlsZSI6ImRvbGl0dGxlLXZlcmFjaXR5LWNyZWF0ZS1ib3VuZGVkY29udGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vZ2xvYmFscyc7XG5pbXBvcnQgeyB1c2FnZVByZWZpeCwgdmFsaWRhdGVBcmdzTmFtZUlucHV0IH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgR3VpZCB9IGZyb20gJy4vR3VpZCc7XG5pbXBvcnQgeyBzcGF3biwgZXhlYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYic7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSB2ZXJhY2l0eSBjcmVhdGUgYm91bmRlZGNvbnRleHQgW25hbWVdJztcbmFyZ3NcbiAgICAuZXhhbXBsZShVU0FHRSwgJ0NyZWF0ZXMgYSBib3VuZGVkIGNvbnRleHQgd2l0aCBhIGdpdmVuIG5hbWUnKTtcblxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YsIHsgdmFsdWU6IHVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSB2ZXJhY2l0eSBjcmVhdGUgYm91bmRlZGNvbnRleHQnIH0pO1xuXG5pZiAoIWFyZ3Muc3ViLmxlbmd0aCkgYXJncy5zaG93SGVscCgpO1xuXG52YWxpZGF0ZUFyZ3NOYW1lSW5wdXQoYXJncy5zdWJbMF0pO1xubGV0IGNvbnRleHQgPSB7XG4gICAgbmFtZTogYXJncy5zdWJbMF0sXG4gICAgZGVzdGluYXRpb246IHByb2Nlc3MuY3dkKClcbn07XG5cbmxldCBhcHBsaWNhdGlvbiA9IGdsb2JhbHMuYXBwbGljYXRpb25NYW5hZ2VyLmdldEFwcGxpY2F0aW9uRnJvbShjb250ZXh0LmRlc3RpbmF0aW9uKTtcblxuaWYgKGFwcGxpY2F0aW9uID09PSBudWxsKSB7XG4gICAgZ2xvYmFscy5sb2dnZXIuZXJyb3IoJ01pc3NpbmcgYXBwbGljYXRpb24gLSB1c2UgXFwnZG9saXR0bGUgY3JlYXRlIGFwcGxpY2F0aW9uIFtuYW1lXVxcJyBmb3IgYSBuZXcgYXBwbGljYXRpb24nKTtcbn0gZWxzZSB7XG4gICAgZ2xvYmFscy5ib3VuZGVkQ29udGV4dE1hbmFnZXIuY3JlYXRlKGNvbnRleHQpO1xuICAgIGxldCBib2lsZXJQbGF0ZSA9IGdsb2JhbHMuYm9pbGVyUGxhdGVzTWFuYWdlci5ib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSgnY3NoYXJwJywgJ2JvdW5kZWRDb250ZXh0LWFkb3JubWVudCcpWzBdO1xuICAgIGxldCBib3VuZGVkQ29udGV4dFBhdGggPSBwYXRoLmpvaW4oY29udGV4dC5kZXN0aW5hdGlvbiwgY29udGV4dC5uYW1lKTtcbiAgICBnbG9iYWxzLmZvbGRlcnMubWFrZUZvbGRlcklmTm90RXhpc3RzKGJvdW5kZWRDb250ZXh0UGF0aCk7XG4gICAgbGV0IHRlbXBsYXRlQ29udGV4dCA9IHtcbiAgICAgICAgaWQ6IEd1aWQuY3JlYXRlKCksXG4gICAgICAgIG5hbWU6IGNvbnRleHQubmFtZSxcbiAgICAgICAgYXBwbGljYXRpb25JZDogYXBwbGljYXRpb24uaWRcbiAgICB9O1xuICAgIGdsb2JhbHMuYm9pbGVyUGxhdGVzTWFuYWdlci5jcmVhdGVJbnN0YW5jZShib2lsZXJQbGF0ZSwgYm91bmRlZENvbnRleHRQYXRoLCB0ZW1wbGF0ZUNvbnRleHQpO1xuXG4gICAgcHJvY2Vzcy5jaGRpcihjb250ZXh0Lm5hbWUpO1xuICAgIFxuICAgIGxldCBhZGRQYWNrYWdlID0gKHJlZmVyZW5jZSwgdmVyc2lvbiwgZG9uZSkgPT4ge1xuICAgICAgICBsZXQgZG90bmV0QWRkUGFja2FnZSA9IGV4ZWMoYGRvdG5ldCBhZGQgcGFja2FnZSAke3JlZmVyZW5jZX0gLXYgJHt2ZXJzaW9ufWAsIHtcbiAgICAgICAgICAgIGN3ZDogJ0NvcmUnXG4gICAgICAgIH0pO1xuICAgICAgICBkb3RuZXRBZGRQYWNrYWdlLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiBwcm9jZXNzLnN0ZG91dC53cml0ZShkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgZG90bmV0QWRkUGFja2FnZS5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gcHJvY2Vzcy5zdGRlcnIud3JpdGUoZGF0YS50b1N0cmluZygpKSk7XG4gICAgICAgIGRvdG5ldEFkZFBhY2thZ2Uub24oJ2V4aXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBnbG9iKCcuL0NvcmUvKi5jc3Byb2onLCAoZXJyLCBtYXRjaGVzKSA9PiB7XG4gICAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnLk5FVCBDb3JlIHByb2plY3QgZm91bmQgLSByZXN0b3JpbmcgcGFja2FnZXMnKTtcblxuICAgICAgICAgICAgYWRkUGFja2FnZSgnVmVyYWNpdHkuQXV0aGVudGljYXRpb24uT3BlbklEQ29ubmVjdC5Db3JlJywnMS4wLjAnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYWRkUGFja2FnZSgnTWljcm9zb2Z0LkFzcE5ldENvcmUuQWxsJywnMi4xLjQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkb3RuZXQgPSBzcGF3bignZG90bmV0JywgWydyZXN0b3JlJ10sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN3ZDogJ0NvcmUnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBkb3RuZXQuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICAgICAgICAgICAgICBkb3RuZXQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHByb2Nlc3Muc3RkZXJyLndyaXRlKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBwYWNrYWdlSnNvbkZpbGUgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ1dlYicsICdwYWNrYWdlLmpzJyk7XG4gICAgaWYgKGZzLmV4aXN0c1N5bmMocGFja2FnZUpzb25GaWxlKSkge1xuICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCdXZWIgZm91bmQgLSByZXN0b3JpbmcgcGFja2FnZXMnKTtcblxuICAgICAgICBsZXQgbnBtSW5zdGFsbCA9IHNwYXduKCducG0nLCBbJ2luc3RhbGwnXSwge1xuICAgICAgICAgICAgY3dkOiAnLi9XZWInXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5wbUluc3RhbGwuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICBucG1JbnN0YWxsLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiBwcm9jZXNzLnN0ZGVyci53cml0ZShkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICB9XG59XG4iXX0=