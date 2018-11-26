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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS5qcyJdLCJuYW1lcyI6WyJwa2ciLCJyZXF1aXJlIiwiY29uc29sZSIsImxvZyIsInZlcnNpb24iLCJ1cGRhdGluZyIsImFyZ3MiLCJjb21tYW5kIiwiZ2xvYmFscyIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJ1cGRhdGUiLCJ0aGVuIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInNob3dIZWxwSWZOZWVkZWQiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCIsImNvbmZpZ01hbmFnZXIiLCJpc0ZpcnN0UnVuIiwiaGFzQm9pbGVyUGxhdGVzIiwibG9nZ2VyIiwiaW5mbyJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBOztBQVJBOzs7O0FBVUEsSUFBSUEsTUFBTUMsUUFBUSxpQkFBUixDQUFWO0FBQ0FDLFFBQVFDLEdBQVIsb0JBQTZCSCxJQUFJSSxPQUFqQztBQUNBLElBQUlDLFdBQVcsS0FBZjtBQUNBQyxlQUNLQyxPQURMLENBQ2EsUUFEYixFQUN1QixzQkFEdkIsRUFDK0MsWUFBTTtBQUM3Q0YsZUFBVyxJQUFYO0FBQ0FHLHNCQUFRQyxtQkFBUixDQUE0QkMsTUFBNUIsR0FBcUNDLElBQXJDLENBQTBDLFlBQU07QUFDNUM7QUFDSCxLQUZEO0FBR0gsQ0FOTCxFQU9LSixPQVBMLENBT2EsU0FQYixFQU93QixvQ0FQeEIsRUFRS0EsT0FSTCxDQVFhLFFBUmIsRUFRdUIsK0NBUnZCLEVBU0tBLE9BVEwsQ0FTYSxLQVRiLEVBU29CLHlDQVRwQixFQVVLQSxPQVZMLENBVWEsS0FWYixFQVVvQix3QkFWcEIsRUFXS0EsT0FYTCxDQVdhLFFBWGIsRUFXdUIsMEJBWHZCLEVBWUtBLE9BWkwsQ0FZYSxVQVpiLEVBWXlCLDhCQVp6Qjs7QUFjQUQsZUFBS00sS0FBTCxDQUFXQyxRQUFRQyxJQUFuQjtBQUNBLElBQUlDLG1CQUFtQixTQUFuQkEsZ0JBQW1CLEdBQU07QUFDekIsUUFBSSxDQUFDVCxlQUFLVSxHQUFMLENBQVNDLE1BQWQsRUFBdUJYLGVBQUtZLFFBQUw7QUFDMUIsQ0FGRDs7QUFJQSxJQUFLLENBQUNiLFFBQUQsS0FDQUcsa0JBQVFXLGFBQVIsQ0FBc0JDLFVBQXRCLElBQW9DLENBQUNaLGtCQUFRQyxtQkFBUixDQUE0QlksZUFEakUsQ0FBTCxFQUVFO0FBQ0UsUUFBSWIsa0JBQVFXLGFBQVIsQ0FBc0JDLFVBQTFCLEVBQXVDWixrQkFBUWMsTUFBUixDQUFlQyxJQUFmLENBQW9CLCtFQUFwQixFQUF2QyxLQUNLZixrQkFBUWMsTUFBUixDQUFlQyxJQUFmLENBQW9CLGlFQUFwQjtBQUNMZixzQkFBUUMsbUJBQVIsQ0FBNEJDLE1BQTVCLEdBQXFDQyxJQUFyQyxDQUEwQyxZQUFNO0FBQzVDVCxnQkFBUUMsR0FBUixDQUFZLElBQVo7QUFDQVk7QUFDSCxLQUhEO0FBSUgsQ0FURCxNQVNPO0FBQ0hBO0FBQ0giLCJmaWxlIjoiZG9saXR0bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFscyBmcm9tICcuL2dsb2JhbHMnO1xuXG4vLyAqIEZpcnN0IHJ1biAtIGNvbmZpZ3VyZSBkZWZhdWx0IGJvdW5kZWQtY29udGV4dCBsYW5ndWFnZS4gU3RvcmUgaW4gY29uZmlnIGZpbGUgaW4gfi8uZG9saXR0bGVcbi8vICogXG5cbmxldCBwa2cgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcbmNvbnNvbGUubG9nKGBEb2xpdHRsZSBDTEkgdiR7cGtnLnZlcnNpb259XFxuYCk7XG5sZXQgdXBkYXRpbmcgPSBmYWxzZTtcbmFyZ3NcbiAgICAuY29tbWFuZCgndXBkYXRlJywgJ1VwZGF0ZSBhbGwgYXJ0aWZhY3RzJywgKCkgPT4ge1xuICAgICAgICB1cGRhdGluZyA9IHRydWU7XG4gICAgICAgIGdsb2JhbHMuYm9pbGVyUGxhdGVzTWFuYWdlci51cGRhdGUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSk7XG4gICAgfSlcbiAgICAuY29tbWFuZCgnY2x1c3RlcicsICdXb3JrIHdpdGggY2x1c3RlciBob3N0aW5nIERvbGl0dGxlJylcbiAgICAuY29tbWFuZCgnY3JlYXRlJywgJ0NyZWF0ZSBzb21ldGhpbmcgZnJvbSBvbmUgb2YgdGhlIGJvaWxlcnBsYXRlcycpXG4gICAgLmNvbW1hbmQoJ2FkZCcsICdBZGRzIGFuIEFydGlmYWN0IHRvIHRoZSBCb3VuZGVkIENvbnRleHQnKVxuICAgIC5jb21tYW5kKCdydW4nLCAnUnVucyBhIEJvdW5kZWQgQ29udGV4dCcpXG4gICAgLmNvbW1hbmQoJ2RlcGxveScsICdEZXBsb3kgYSBCb3VuZGVkIENvbnRleHQnKVxuICAgIC5jb21tYW5kKCd2ZXJhY2l0eScsICdWZXJhY2l0eSBzcGVjaWZpYyBvcGVyYXRpb25zJyk7XG5cbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2KTsgICAgXG5sZXQgc2hvd0hlbHBJZk5lZWRlZCA9ICgpID0+IHtcbiAgICBpZiggIWFyZ3Muc3ViLmxlbmd0aCApIGFyZ3Muc2hvd0hlbHAoKTtcbn07XG5cbmlmICggIXVwZGF0aW5nICYmIFxuICAgIChnbG9iYWxzLmNvbmZpZ01hbmFnZXIuaXNGaXJzdFJ1biB8fCAhZ2xvYmFscy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLmhhc0JvaWxlclBsYXRlcylcbikge1xuICAgIGlmKCBnbG9iYWxzLmNvbmZpZ01hbmFnZXIuaXNGaXJzdFJ1biApIGdsb2JhbHMubG9nZ2VyLmluZm8oJ1RoaXMgaXMgdGhlIGZpcnN0IHRpbWUgeW91IHJ1biB0aGlzIHRvb2wsIGhhbmcgb24gdGlnaHQgd2hpbGUgd2UgZ2V0IGl0IHJlYWR5Jyk7XG4gICAgZWxzZSBnbG9iYWxzLmxvZ2dlci5pbmZvKCdUaGVyZSBhcmUgbm8gYm9pbGVyIHBsYXRlcywgaGFuZyBvbiB0aWdodCB3aGlsZSB3ZSBnZXQgaXQgcmVhZHknKTtcbiAgICBnbG9iYWxzLmJvaWxlclBsYXRlc01hbmFnZXIudXBkYXRlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdcXG4nKTtcbiAgICAgICAgc2hvd0hlbHBJZk5lZWRlZCgpO1xuICAgIH0pO1xufSBlbHNlIHtcbiAgICBzaG93SGVscElmTmVlZGVkKCk7XG59Il19