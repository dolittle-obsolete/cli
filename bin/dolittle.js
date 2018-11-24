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
}).command('cluster', 'Work with cluster hosting Dolittle').command('create', 'Create something from one of the boilerplates').command('add', 'Adds an Artifact to the Bounded Context').command('run', 'Runs a bounded context').command('veracity', 'Veracity specific operations');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS5qcyJdLCJuYW1lcyI6WyJwa2ciLCJyZXF1aXJlIiwiY29uc29sZSIsImxvZyIsInZlcnNpb24iLCJ1cGRhdGluZyIsImFyZ3MiLCJjb21tYW5kIiwiZ2xvYmFscyIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJ1cGRhdGUiLCJ0aGVuIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInNob3dIZWxwSWZOZWVkZWQiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCIsImNvbmZpZ01hbmFnZXIiLCJpc0ZpcnN0UnVuIiwiaGFzQm9pbGVyUGxhdGVzIiwibG9nZ2VyIiwiaW5mbyJdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBOztBQVJBOzs7O0FBVUEsSUFBSUEsTUFBTUMsUUFBUSxpQkFBUixDQUFWO0FBQ0FDLFFBQVFDLEdBQVIsb0JBQTZCSCxJQUFJSSxPQUFqQztBQUNBLElBQUlDLFdBQVcsS0FBZjtBQUNBQyxlQUNLQyxPQURMLENBQ2EsUUFEYixFQUN1QixzQkFEdkIsRUFDK0MsWUFBTTtBQUM3Q0YsZUFBVyxJQUFYO0FBQ0FHLHNCQUFRQyxtQkFBUixDQUE0QkMsTUFBNUIsR0FBcUNDLElBQXJDLENBQTBDLFlBQU07QUFDNUM7QUFDSCxLQUZEO0FBR0gsQ0FOTCxFQU9LSixPQVBMLENBT2EsU0FQYixFQU93QixvQ0FQeEIsRUFRS0EsT0FSTCxDQVFhLFFBUmIsRUFRdUIsK0NBUnZCLEVBU0tBLE9BVEwsQ0FTYSxLQVRiLEVBU29CLHlDQVRwQixFQVVLQSxPQVZMLENBVWEsS0FWYixFQVVvQix3QkFWcEIsRUFXS0EsT0FYTCxDQVdhLFVBWGIsRUFXeUIsOEJBWHpCOztBQWFBRCxlQUFLTSxLQUFMLENBQVdDLFFBQVFDLElBQW5CO0FBQ0EsSUFBSUMsbUJBQW1CLFNBQW5CQSxnQkFBbUIsR0FBTTtBQUN6QixRQUFJLENBQUNULGVBQUtVLEdBQUwsQ0FBU0MsTUFBZCxFQUF1QlgsZUFBS1ksUUFBTDtBQUMxQixDQUZEOztBQUlBLElBQUssQ0FBQ2IsUUFBRCxLQUNBRyxrQkFBUVcsYUFBUixDQUFzQkMsVUFBdEIsSUFBb0MsQ0FBQ1osa0JBQVFDLG1CQUFSLENBQTRCWSxlQURqRSxDQUFMLEVBRUU7QUFDRSxRQUFJYixrQkFBUVcsYUFBUixDQUFzQkMsVUFBMUIsRUFBdUNaLGtCQUFRYyxNQUFSLENBQWVDLElBQWYsQ0FBb0IsK0VBQXBCLEVBQXZDLEtBQ0tmLGtCQUFRYyxNQUFSLENBQWVDLElBQWYsQ0FBb0IsaUVBQXBCO0FBQ0xmLHNCQUFRQyxtQkFBUixDQUE0QkMsTUFBNUIsR0FBcUNDLElBQXJDLENBQTBDLFlBQU07QUFDNUNULGdCQUFRQyxHQUFSLENBQVksSUFBWjtBQUNBWTtBQUNILEtBSEQ7QUFJSCxDQVRELE1BU087QUFDSEE7QUFDSCIsImZpbGUiOiJkb2xpdHRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vZ2xvYmFscyc7XG5cbi8vICogRmlyc3QgcnVuIC0gY29uZmlndXJlIGRlZmF1bHQgYm91bmRlZC1jb250ZXh0IGxhbmd1YWdlLiBTdG9yZSBpbiBjb25maWcgZmlsZSBpbiB+Ly5kb2xpdHRsZVxuLy8gKiBcblxubGV0IHBrZyA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xuY29uc29sZS5sb2coYERvbGl0dGxlIENMSSB2JHtwa2cudmVyc2lvbn1cXG5gKTtcbmxldCB1cGRhdGluZyA9IGZhbHNlO1xuYXJnc1xuICAgIC5jb21tYW5kKCd1cGRhdGUnLCAnVXBkYXRlIGFsbCBhcnRpZmFjdHMnLCAoKSA9PiB7XG4gICAgICAgIHVwZGF0aW5nID0gdHJ1ZTtcbiAgICAgICAgZ2xvYmFscy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLnVwZGF0ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9KTtcbiAgICB9KVxuICAgIC5jb21tYW5kKCdjbHVzdGVyJywgJ1dvcmsgd2l0aCBjbHVzdGVyIGhvc3RpbmcgRG9saXR0bGUnKVxuICAgIC5jb21tYW5kKCdjcmVhdGUnLCAnQ3JlYXRlIHNvbWV0aGluZyBmcm9tIG9uZSBvZiB0aGUgYm9pbGVycGxhdGVzJylcbiAgICAuY29tbWFuZCgnYWRkJywgJ0FkZHMgYW4gQXJ0aWZhY3QgdG8gdGhlIEJvdW5kZWQgQ29udGV4dCcpXG4gICAgLmNvbW1hbmQoJ3J1bicsICdSdW5zIGEgYm91bmRlZCBjb250ZXh0JylcbiAgICAuY29tbWFuZCgndmVyYWNpdHknLCAnVmVyYWNpdHkgc3BlY2lmaWMgb3BlcmF0aW9ucycpO1xuXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndik7ICAgIFxubGV0IHNob3dIZWxwSWZOZWVkZWQgPSAoKSA9PiB7XG4gICAgaWYoICFhcmdzLnN1Yi5sZW5ndGggKSBhcmdzLnNob3dIZWxwKCk7XG59O1xuXG5pZiAoICF1cGRhdGluZyAmJiBcbiAgICAoZ2xvYmFscy5jb25maWdNYW5hZ2VyLmlzRmlyc3RSdW4gfHwgIWdsb2JhbHMuYm9pbGVyUGxhdGVzTWFuYWdlci5oYXNCb2lsZXJQbGF0ZXMpXG4pIHtcbiAgICBpZiggZ2xvYmFscy5jb25maWdNYW5hZ2VyLmlzRmlyc3RSdW4gKSBnbG9iYWxzLmxvZ2dlci5pbmZvKCdUaGlzIGlzIHRoZSBmaXJzdCB0aW1lIHlvdSBydW4gdGhpcyB0b29sLCBoYW5nIG9uIHRpZ2h0IHdoaWxlIHdlIGdldCBpdCByZWFkeScpO1xuICAgIGVsc2UgZ2xvYmFscy5sb2dnZXIuaW5mbygnVGhlcmUgYXJlIG5vIGJvaWxlciBwbGF0ZXMsIGhhbmcgb24gdGlnaHQgd2hpbGUgd2UgZ2V0IGl0IHJlYWR5Jyk7XG4gICAgZ2xvYmFscy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLnVwZGF0ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnXFxuJyk7XG4gICAgICAgIHNob3dIZWxwSWZOZWVkZWQoKTtcbiAgICB9KTtcbn0gZWxzZSB7XG4gICAgc2hvd0hlbHBJZk5lZWRlZCgpO1xufSJdfQ==