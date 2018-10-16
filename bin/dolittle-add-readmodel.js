#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USAGE = 'dolittle add readmodel [name]';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

_args2.default.example(USAGE, 'Creates a read model in the current folder');

_args2.default.parse(process.argv, { value: _helpers.usagePrefix + USAGE, name: 'dolittle add readmodel' });
if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

(0, _helpers.validateArgsNameInput)(_args2.default.sub[0]);
var context = {
    artifactName: _args2.default.sub[0],
    artifactType: 'readModel',
    destination: process.cwd()
};

_globals2.default.artifactsManager.createArtifact(context);

// let flags = {name: args.sub[0]}; 
// globals.artifactsManager.createReadModel(flags);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtcmVhZG1vZGVsLmpzIl0sIm5hbWVzIjpbIlVTQUdFIiwiYXJncyIsImV4YW1wbGUiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2IiwidmFsdWUiLCJ1c2FnZVByZWZpeCIsIm5hbWUiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCIsImNvbnRleHQiLCJhcnRpZmFjdE5hbWUiLCJhcnRpZmFjdFR5cGUiLCJkZXN0aW5hdGlvbiIsImN3ZCIsImdsb2JhbHMiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlQXJ0aWZhY3QiXSwibWFwcGluZ3MiOiI7O0FBTUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsSUFBTUEsUUFBUSwrQkFBZDs7QUFSQTs7Ozs7QUFTQUMsZUFDS0MsT0FETCxDQUNhRixLQURiLEVBQ29CLDRDQURwQjs7QUFHQUMsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQixFQUF5QixFQUFDQyxPQUFPQyx1QkFBY1AsS0FBdEIsRUFBNkJRLE1BQU0sd0JBQW5DLEVBQXpCO0FBQ0EsSUFBSSxDQUFFUCxlQUFLUSxHQUFMLENBQVNDLE1BQVgsSUFBcUJULGVBQUtRLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUEzQyxFQUE4Q1QsZUFBS1UsUUFBTDs7QUFFOUMsb0NBQXNCVixlQUFLUSxHQUFMLENBQVMsQ0FBVCxDQUF0QjtBQUNBLElBQUlHLFVBQVU7QUFDVkMsa0JBQWNaLGVBQUtRLEdBQUwsQ0FBUyxDQUFULENBREo7QUFFVkssa0JBQWMsV0FGSjtBQUdWQyxpQkFBYVgsUUFBUVksR0FBUjtBQUhILENBQWQ7O0FBTUFDLGtCQUFRQyxnQkFBUixDQUF5QkMsY0FBekIsQ0FBd0NQLE9BQXhDOztBQUVBO0FBQ0EiLCJmaWxlIjoiZG9saXR0bGUtYWRkLXJlYWRtb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vZ2xvYmFscyc7XG5pbXBvcnQgeyB1c2FnZVByZWZpeCwgdmFsaWRhdGVBcmdzTmFtZUlucHV0IH0gZnJvbSAnLi9oZWxwZXJzJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIHJlYWRtb2RlbCBbbmFtZV0nO1xuYXJnc1xuICAgIC5leGFtcGxlKFVTQUdFLCAnQ3JlYXRlcyBhIHJlYWQgbW9kZWwgaW4gdGhlIGN1cnJlbnQgZm9sZGVyJyk7XG5cbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IHVzYWdlUHJlZml4ICsgVVNBR0UsIG5hbWU6ICdkb2xpdHRsZSBhZGQgcmVhZG1vZGVsJ30pO1xuaWYgKCEgYXJncy5zdWIubGVuZ3RoIHx8IGFyZ3Muc3ViLmxlbmd0aCA8IDEpIGFyZ3Muc2hvd0hlbHAoKTtcblxudmFsaWRhdGVBcmdzTmFtZUlucHV0KGFyZ3Muc3ViWzBdKTtcbmxldCBjb250ZXh0ID0ge1xuICAgIGFydGlmYWN0TmFtZTogYXJncy5zdWJbMF0sIFxuICAgIGFydGlmYWN0VHlwZTogJ3JlYWRNb2RlbCcsXG4gICAgZGVzdGluYXRpb246IHByb2Nlc3MuY3dkKClcbn07XG5cbmdsb2JhbHMuYXJ0aWZhY3RzTWFuYWdlci5jcmVhdGVBcnRpZmFjdChjb250ZXh0KTtcblxuLy8gbGV0IGZsYWdzID0ge25hbWU6IGFyZ3Muc3ViWzBdfTsgXG4vLyBnbG9iYWxzLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlUmVhZE1vZGVsKGZsYWdzKTsiXX0=