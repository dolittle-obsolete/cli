#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// * First run - configure default bounded-context language. Store in config file in ~/.dolittle
// * 

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var pkg = require('../package.json');
console.log('Dolittle CLI v' + pkg.version + '\n');
var updating = false;
_args2.default.command('update', 'Update all artifacts', function () {
    updating = true;
    _globals2.default.boilerPlatesManager.update().then(function () {
        return;
    });
}).command('cluster', 'Work with cluster hosting Dolittle').command('create', 'Create something from one of the boilerplates').command('add', 'Adds an Artifact to the Bounded Context').command('run', 'Runs a Bounded Context').command('deploy', 'Deploy a Bounded Context').command('veracity', 'Veracity specific operations');

_args2.default.parse(process.argv);
var showHelpIfNeeded = function showHelpIfNeeded() {
    if (!_args2.default.sub.length) _args2.default.showHelp();
};

if (!updating && (_globals2.default.configManager.isFirstRun || !_globals2.default.boilerPlatesManager.hasBoilerPlates)) {
    if (_globals2.default.configManager.isFirstRun) _globals2.default.logger.info('This is the first time you run this tool, hang on tight while we get it ready');else _globals2.default.logger.info('There are no boiler plates, hang on tight while we get it ready');
    _globals2.default.boilerPlatesManager.update().then(function () {
        console.log('\n');
        showHelpIfNeeded();
    });
} else {
    showHelpIfNeeded();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS5qcyJdLCJuYW1lcyI6WyJwa2ciLCJyZXF1aXJlIiwiY29uc29sZSIsImxvZyIsInZlcnNpb24iLCJ1cGRhdGluZyIsImFyZ3MiLCJjb21tYW5kIiwiZ2xvYmFscyIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJ1cGRhdGUiLCJ0aGVuIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInNob3dIZWxwSWZOZWVkZWQiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCIsImNvbmZpZ01hbmFnZXIiLCJpc0ZpcnN0UnVuIiwiaGFzQm9pbGVyUGxhdGVzIiwibG9nZ2VyIiwiaW5mbyJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBOztBQVJBOzs7O0FBVUEsSUFBSUEsTUFBTUMsUUFBUSxpQkFBUixDQUFWO0FBQ0FDLFFBQVFDLEdBQVIsb0JBQTZCSCxJQUFJSSxPQUFqQztBQUNBLElBQUlDLFdBQVcsS0FBZjtBQUNBQyxlQUNLQyxPQURMLENBQ2EsUUFEYixFQUN1QixzQkFEdkIsRUFDK0MsWUFBTTtBQUM3Q0YsZUFBVyxJQUFYO0FBQ0FHLHNCQUFRQyxtQkFBUixDQUE0QkMsTUFBNUIsR0FBcUNDLElBQXJDLENBQTBDLFlBQU07QUFDNUM7QUFDSCxLQUZEO0FBR0gsQ0FOTCxFQU9LSixPQVBMLENBT2EsU0FQYixFQU93QixvQ0FQeEIsRUFRS0EsT0FSTCxDQVFhLFFBUmIsRUFRdUIsK0NBUnZCLEVBU0tBLE9BVEwsQ0FTYSxLQVRiLEVBU29CLHlDQVRwQixFQVVLQSxPQVZMLENBVWEsS0FWYixFQVVvQix3QkFWcEIsRUFXS0EsT0FYTCxDQVdhLFFBWGIsRUFXdUIsMEJBWHZCLEVBWUtBLE9BWkwsQ0FZYSxVQVpiLEVBWXlCLDhCQVp6Qjs7QUFjQUQsZUFBS00sS0FBTCxDQUFXQyxRQUFRQyxJQUFuQjtBQUNBLElBQUlDLG1CQUFtQixTQUFuQkEsZ0JBQW1CLEdBQU07QUFDekIsUUFBSSxDQUFDVCxlQUFLVSxHQUFMLENBQVNDLE1BQWQsRUFBdUJYLGVBQUtZLFFBQUw7QUFDMUIsQ0FGRDs7QUFJQSxJQUFLLENBQUNiLFFBQUQsS0FDQUcsa0JBQVFXLGFBQVIsQ0FBc0JDLFVBQXRCLElBQW9DLENBQUNaLGtCQUFRQyxtQkFBUixDQUE0QlksZUFEakUsQ0FBTCxFQUVFO0FBQ0UsUUFBSWIsa0JBQVFXLGFBQVIsQ0FBc0JDLFVBQTFCLEVBQXVDWixrQkFBUWMsTUFBUixDQUFlQyxJQUFmLENBQW9CLCtFQUFwQixFQUF2QyxLQUNLZixrQkFBUWMsTUFBUixDQUFlQyxJQUFmLENBQW9CLGlFQUFwQjtBQUNMZixzQkFBUUMsbUJBQVIsQ0FBNEJDLE1BQTVCLEdBQXFDQyxJQUFyQyxDQUEwQyxZQUFNO0FBQzVDVCxnQkFBUUMsR0FBUixDQUFZLElBQVo7QUFDQVk7QUFDSCxLQUhEO0FBSUgsQ0FURCxNQVNPO0FBQ0hBO0FBQ0giLCJmaWxlIjoiZG9saXR0bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XHJcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vZ2xvYmFscyc7XHJcblxyXG4vLyAqIEZpcnN0IHJ1biAtIGNvbmZpZ3VyZSBkZWZhdWx0IGJvdW5kZWQtY29udGV4dCBsYW5ndWFnZS4gU3RvcmUgaW4gY29uZmlnIGZpbGUgaW4gfi8uZG9saXR0bGVcclxuLy8gKiBcclxuXHJcbmxldCBwa2cgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcclxuY29uc29sZS5sb2coYERvbGl0dGxlIENMSSB2JHtwa2cudmVyc2lvbn1cXG5gKTtcclxubGV0IHVwZGF0aW5nID0gZmFsc2U7XHJcbmFyZ3NcclxuICAgIC5jb21tYW5kKCd1cGRhdGUnLCAnVXBkYXRlIGFsbCBhcnRpZmFjdHMnLCAoKSA9PiB7XHJcbiAgICAgICAgdXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIGdsb2JhbHMuYm9pbGVyUGxhdGVzTWFuYWdlci51cGRhdGUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuICAgIC5jb21tYW5kKCdjbHVzdGVyJywgJ1dvcmsgd2l0aCBjbHVzdGVyIGhvc3RpbmcgRG9saXR0bGUnKVxyXG4gICAgLmNvbW1hbmQoJ2NyZWF0ZScsICdDcmVhdGUgc29tZXRoaW5nIGZyb20gb25lIG9mIHRoZSBib2lsZXJwbGF0ZXMnKVxyXG4gICAgLmNvbW1hbmQoJ2FkZCcsICdBZGRzIGFuIEFydGlmYWN0IHRvIHRoZSBCb3VuZGVkIENvbnRleHQnKVxyXG4gICAgLmNvbW1hbmQoJ3J1bicsICdSdW5zIGEgQm91bmRlZCBDb250ZXh0JylcclxuICAgIC5jb21tYW5kKCdkZXBsb3knLCAnRGVwbG95IGEgQm91bmRlZCBDb250ZXh0JylcclxuICAgIC5jb21tYW5kKCd2ZXJhY2l0eScsICdWZXJhY2l0eSBzcGVjaWZpYyBvcGVyYXRpb25zJyk7XHJcblxyXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndik7ICAgIFxyXG5sZXQgc2hvd0hlbHBJZk5lZWRlZCA9ICgpID0+IHtcclxuICAgIGlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpO1xyXG59O1xyXG5cclxuaWYgKCAhdXBkYXRpbmcgJiYgXHJcbiAgICAoZ2xvYmFscy5jb25maWdNYW5hZ2VyLmlzRmlyc3RSdW4gfHwgIWdsb2JhbHMuYm9pbGVyUGxhdGVzTWFuYWdlci5oYXNCb2lsZXJQbGF0ZXMpXHJcbikge1xyXG4gICAgaWYoIGdsb2JhbHMuY29uZmlnTWFuYWdlci5pc0ZpcnN0UnVuICkgZ2xvYmFscy5sb2dnZXIuaW5mbygnVGhpcyBpcyB0aGUgZmlyc3QgdGltZSB5b3UgcnVuIHRoaXMgdG9vbCwgaGFuZyBvbiB0aWdodCB3aGlsZSB3ZSBnZXQgaXQgcmVhZHknKTtcclxuICAgIGVsc2UgZ2xvYmFscy5sb2dnZXIuaW5mbygnVGhlcmUgYXJlIG5vIGJvaWxlciBwbGF0ZXMsIGhhbmcgb24gdGlnaHQgd2hpbGUgd2UgZ2V0IGl0IHJlYWR5Jyk7XHJcbiAgICBnbG9iYWxzLmJvaWxlclBsYXRlc01hbmFnZXIudXBkYXRlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1xcbicpO1xyXG4gICAgICAgIHNob3dIZWxwSWZOZWVkZWQoKTtcclxuICAgIH0pO1xyXG59IGVsc2Uge1xyXG4gICAgc2hvd0hlbHBJZk5lZWRlZCgpO1xyXG59Il19