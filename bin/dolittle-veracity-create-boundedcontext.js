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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle veracity create boundedcontext [name]';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS12ZXJhY2l0eS1jcmVhdGUtYm91bmRlZGNvbnRleHQuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiY29udGV4dCIsImRlc3RpbmF0aW9uIiwiY3dkIiwiYXBwbGljYXRpb24iLCJnbG9iYWxzIiwiYXBwbGljYXRpb25NYW5hZ2VyIiwiZ2V0QXBwbGljYXRpb25Gcm9tIiwibG9nZ2VyIiwiZXJyb3IiLCJib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJjcmVhdGUiLCJib2lsZXJQbGF0ZSIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSIsImJvdW5kZWRDb250ZXh0UGF0aCIsInBhdGgiLCJqb2luIiwiZm9sZGVycyIsIm1ha2VGb2xkZXJJZk5vdEV4aXN0cyIsInRlbXBsYXRlQ29udGV4dCIsImlkIiwiR3VpZCIsImFwcGxpY2F0aW9uSWQiLCJjcmVhdGVJbnN0YW5jZSJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQU1BLFFBQVEsZ0RBQWQ7O0FBVkE7Ozs7O0FBV0FDLGVBQ0tDLE9BREwsQ0FDYUYsS0FEYixFQUNvQiw2Q0FEcEI7O0FBR0FDLGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsdUJBQWNQLEtBQXRCLEVBQTZCUSxNQUFNLHlDQUFuQyxFQUF6Qjs7QUFFQSxJQUFJLENBQUNQLGVBQUtRLEdBQUwsQ0FBU0MsTUFBZCxFQUF1QlQsZUFBS1UsUUFBTDs7QUFFdkIsb0NBQXNCVixlQUFLUSxHQUFMLENBQVMsQ0FBVCxDQUF0QjtBQUNBLElBQUlHLFVBQVU7QUFDVkosVUFBTSxXQURJLEVBQ1M7QUFDbkJLLGlCQUFhVCxRQUFRVSxHQUFSO0FBRkgsQ0FBZDs7QUFLQSxJQUFJQyxjQUFjQyxrQkFBUUMsa0JBQVIsQ0FBMkJDLGtCQUEzQixDQUE4Q04sUUFBUUMsV0FBdEQsQ0FBbEI7O0FBRUEsSUFBSUUsZ0JBQWdCLElBQXBCLEVBQTJCO0FBQ3ZCQyxzQkFBUUcsTUFBUixDQUFlQyxLQUFmLENBQXFCLHdGQUFyQjtBQUNILENBRkQsTUFFTztBQUNISixzQkFBUUsscUJBQVIsQ0FBOEJDLE1BQTlCLENBQXFDVixPQUFyQztBQUNBLFFBQUlXLGNBQWNQLGtCQUFRUSxtQkFBUixDQUE0QkMsNkJBQTVCLENBQTBELFFBQTFELEVBQW9FLDBCQUFwRSxFQUFnRyxDQUFoRyxDQUFsQjtBQUNBLFFBQUlDLHFCQUFxQkMsZUFBS0MsSUFBTCxDQUFVaEIsUUFBUUMsV0FBbEIsRUFBK0JELFFBQVFKLElBQXZDLENBQXpCO0FBQ0FRLHNCQUFRYSxPQUFSLENBQWdCQyxxQkFBaEIsQ0FBc0NKLGtCQUF0QztBQUNBLFFBQUlLLGtCQUFrQjtBQUNsQkMsWUFBSUMsV0FBS1gsTUFBTCxFQURjO0FBRWxCZCxjQUFNSSxRQUFRSixJQUZJO0FBR2xCMEIsdUJBQWVuQixZQUFZaUI7QUFIVCxLQUF0QjtBQUtBaEIsc0JBQVFRLG1CQUFSLENBQTRCVyxjQUE1QixDQUEyQ1osV0FBM0MsRUFBd0RHLGtCQUF4RCxFQUE0RUssZUFBNUU7QUFDSCIsImZpbGUiOiJkb2xpdHRsZS12ZXJhY2l0eS1jcmVhdGUtYm91bmRlZGNvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFscyBmcm9tICcuL2dsb2JhbHMnO1xuaW1wb3J0IHsgdXNhZ2VQcmVmaXgsIHZhbGlkYXRlQXJnc05hbWVJbnB1dH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgR3VpZCB9ZnJvbSAnLi9HdWlkJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgdmVyYWNpdHkgY3JlYXRlIGJvdW5kZWRjb250ZXh0IFtuYW1lXSc7XG5hcmdzXG4gICAgLmV4YW1wbGUoVVNBR0UsICdDcmVhdGVzIGEgYm91bmRlZCBjb250ZXh0IHdpdGggYSBnaXZlbiBuYW1lJyk7XG4gICAgXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwge3ZhbHVlOiB1c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgdmVyYWNpdHkgY3JlYXRlIGJvdW5kZWRjb250ZXh0J30pO1xuXG5pZiggIWFyZ3Muc3ViLmxlbmd0aCApIGFyZ3Muc2hvd0hlbHAoKTtcblxudmFsaWRhdGVBcmdzTmFtZUlucHV0KGFyZ3Muc3ViWzBdKTtcbmxldCBjb250ZXh0ID0ge1xuICAgIG5hbWU6ICdzb21ldGhpbmcnLCAvL2FyZ3Muc3ViWzBdLFxuICAgIGRlc3RpbmF0aW9uOiBwcm9jZXNzLmN3ZCgpXG59O1xuXG5sZXQgYXBwbGljYXRpb24gPSBnbG9iYWxzLmFwcGxpY2F0aW9uTWFuYWdlci5nZXRBcHBsaWNhdGlvbkZyb20oY29udGV4dC5kZXN0aW5hdGlvbik7XG5cbmlmKCBhcHBsaWNhdGlvbiA9PT0gbnVsbCApIHtcbiAgICBnbG9iYWxzLmxvZ2dlci5lcnJvcignTWlzc2luZyBhcHBsaWNhdGlvbiAtIHVzZSBcXCdkb2xpdHRsZSBjcmVhdGUgYXBwbGljYXRpb24gW25hbWVdXFwnIGZvciBhIG5ldyBhcHBsaWNhdGlvbicpO1xufSBlbHNlIHtcbiAgICBnbG9iYWxzLmJvdW5kZWRDb250ZXh0TWFuYWdlci5jcmVhdGUoY29udGV4dCk7XG4gICAgbGV0IGJvaWxlclBsYXRlID0gZ2xvYmFscy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLmJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKCdjc2hhcnAnLCAnYm91bmRlZENvbnRleHQtYWRvcm5tZW50JylbMF07XG4gICAgbGV0IGJvdW5kZWRDb250ZXh0UGF0aCA9IHBhdGguam9pbihjb250ZXh0LmRlc3RpbmF0aW9uLCBjb250ZXh0Lm5hbWUpO1xuICAgIGdsb2JhbHMuZm9sZGVycy5tYWtlRm9sZGVySWZOb3RFeGlzdHMoYm91bmRlZENvbnRleHRQYXRoKTtcbiAgICBsZXQgdGVtcGxhdGVDb250ZXh0ID0ge1xuICAgICAgICBpZDogR3VpZC5jcmVhdGUoKSxcbiAgICAgICAgbmFtZTogY29udGV4dC5uYW1lLFxuICAgICAgICBhcHBsaWNhdGlvbklkOiBhcHBsaWNhdGlvbi5pZFxuICAgIH07XG4gICAgZ2xvYmFscy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLmNyZWF0ZUluc3RhbmNlKGJvaWxlclBsYXRlLCBib3VuZGVkQ29udGV4dFBhdGgsIHRlbXBsYXRlQ29udGV4dCk7XG59XG4iXX0=