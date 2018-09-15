#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _global = require('./global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pkg = require('../package.json');
console.log('Dolittle CLI v' + pkg.version + '\n');

_args2.default.command('update', 'Update all artifacts', function () {
    _global2.default.boilerPlatesManager.update();
}).command('cluster', 'Work with cluster hosting Dolittle').command('create', 'Create something from one of the boilerplates').command('add', 'Adds an Artifact to the Bounded Context');

_args2.default.parse(process.argv);
var showHelpIfNeeded = function showHelpIfNeeded() {
    if (!_args2.default.sub.length) _args2.default.showHelp();
};

if (_global2.default.configManager.isFirstRun || !_global2.default.boilerPlatesManager.hasBoilerPlates) {
    if (_global2.default.configManager.isFirstRun) _global2.default.logger.info('This is the first time you run this tool, hang on tight while we get it ready');else _global2.default.logger.info('There are no boiler plates, hang on tight while we get it ready');
    _global2.default.boilerPlatesManager.update().then(function () {
        console.log('\n');
        showHelpIfNeeded();
    });
} else {
    showHelpIfNeeded();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS5qcyJdLCJuYW1lcyI6WyJwa2ciLCJyZXF1aXJlIiwiY29uc29sZSIsImxvZyIsInZlcnNpb24iLCJhcmdzIiwiY29tbWFuZCIsImdsb2JhbCIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJ1cGRhdGUiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2Iiwic2hvd0hlbHBJZk5lZWRlZCIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiY29uZmlnTWFuYWdlciIsImlzRmlyc3RSdW4iLCJoYXNCb2lsZXJQbGF0ZXMiLCJsb2dnZXIiLCJpbmZvIiwidGhlbiJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxNQUFNQyxRQUFRLGlCQUFSLENBQVY7QUFDQUMsUUFBUUMsR0FBUixvQkFBNkJILElBQUlJLE9BQWpDOztBQUVBQyxlQUNLQyxPQURMLENBQ2EsUUFEYixFQUN1QixzQkFEdkIsRUFDK0MsWUFBTTtBQUM3Q0MscUJBQU9DLG1CQUFQLENBQTJCQyxNQUEzQjtBQUNILENBSEwsRUFJS0gsT0FKTCxDQUlhLFNBSmIsRUFJd0Isb0NBSnhCLEVBS0tBLE9BTEwsQ0FLYSxRQUxiLEVBS3VCLCtDQUx2QixFQU1LQSxPQU5MLENBTWEsS0FOYixFQU1vQix5Q0FOcEI7O0FBUUFELGVBQUtLLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkI7QUFDQSxJQUFJQyxtQkFBbUIsU0FBbkJBLGdCQUFtQixHQUFNO0FBQ3pCLFFBQUksQ0FBQ1IsZUFBS1MsR0FBTCxDQUFTQyxNQUFkLEVBQXVCVixlQUFLVyxRQUFMO0FBQzFCLENBRkQ7O0FBSUEsSUFBSVQsaUJBQU9VLGFBQVAsQ0FBcUJDLFVBQXJCLElBQW1DLENBQUNYLGlCQUFPQyxtQkFBUCxDQUEyQlcsZUFBbkUsRUFBcUY7QUFDakYsUUFBSVosaUJBQU9VLGFBQVAsQ0FBcUJDLFVBQXpCLEVBQXNDWCxpQkFBT2EsTUFBUCxDQUFjQyxJQUFkLENBQW1CLCtFQUFuQixFQUF0QyxLQUNLZCxpQkFBT2EsTUFBUCxDQUFjQyxJQUFkLENBQW1CLGlFQUFuQjtBQUNMZCxxQkFBT0MsbUJBQVAsQ0FBMkJDLE1BQTNCLEdBQW9DYSxJQUFwQyxDQUF5QyxZQUFNO0FBQzNDcEIsZ0JBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0FVO0FBQ0gsS0FIRDtBQUlILENBUEQsTUFPTztBQUNIQTtBQUNIIiwiZmlsZSI6ImRvbGl0dGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuXG5sZXQgcGtnID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG5jb25zb2xlLmxvZyhgRG9saXR0bGUgQ0xJIHYke3BrZy52ZXJzaW9ufVxcbmApO1xuXG5hcmdzXG4gICAgLmNvbW1hbmQoJ3VwZGF0ZScsICdVcGRhdGUgYWxsIGFydGlmYWN0cycsICgpID0+IHtcbiAgICAgICAgZ2xvYmFsLmJvaWxlclBsYXRlc01hbmFnZXIudXBkYXRlKCk7XG4gICAgfSlcbiAgICAuY29tbWFuZCgnY2x1c3RlcicsICdXb3JrIHdpdGggY2x1c3RlciBob3N0aW5nIERvbGl0dGxlJylcbiAgICAuY29tbWFuZCgnY3JlYXRlJywgJ0NyZWF0ZSBzb21ldGhpbmcgZnJvbSBvbmUgb2YgdGhlIGJvaWxlcnBsYXRlcycpXG4gICAgLmNvbW1hbmQoJ2FkZCcsICdBZGRzIGFuIEFydGlmYWN0IHRvIHRoZSBCb3VuZGVkIENvbnRleHQnKTtcblxuYXJncy5wYXJzZShwcm9jZXNzLmFyZ3YpOyAgICBcbmxldCBzaG93SGVscElmTmVlZGVkID0gKCkgPT4ge1xuICAgIGlmKCAhYXJncy5zdWIubGVuZ3RoICkgYXJncy5zaG93SGVscCgpO1xufVxuXG5pZiggZ2xvYmFsLmNvbmZpZ01hbmFnZXIuaXNGaXJzdFJ1biB8fCAhZ2xvYmFsLmJvaWxlclBsYXRlc01hbmFnZXIuaGFzQm9pbGVyUGxhdGVzICkge1xuICAgIGlmKCBnbG9iYWwuY29uZmlnTWFuYWdlci5pc0ZpcnN0UnVuICkgZ2xvYmFsLmxvZ2dlci5pbmZvKCdUaGlzIGlzIHRoZSBmaXJzdCB0aW1lIHlvdSBydW4gdGhpcyB0b29sLCBoYW5nIG9uIHRpZ2h0IHdoaWxlIHdlIGdldCBpdCByZWFkeScpO1xuICAgIGVsc2UgZ2xvYmFsLmxvZ2dlci5pbmZvKCdUaGVyZSBhcmUgbm8gYm9pbGVyIHBsYXRlcywgaGFuZyBvbiB0aWdodCB3aGlsZSB3ZSBnZXQgaXQgcmVhZHknKTtcbiAgICBnbG9iYWwuYm9pbGVyUGxhdGVzTWFuYWdlci51cGRhdGUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1xcbicpO1xuICAgICAgICBzaG93SGVscElmTmVlZGVkKCk7XG4gICAgfSk7XG59IGVsc2Uge1xuICAgIHNob3dIZWxwSWZOZWVkZWQoKTtcbn0iXX0=