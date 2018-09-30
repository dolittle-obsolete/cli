#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _global = require('./global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var USAGE = 'dolittle add readmodel [name]';
_args2.default.example(USAGE, "Creates a read model in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add readmodel' });
if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

_global2.default.validateArgsNameInput(_args2.default.sub[0]);
var context = {
    artifactName: _args2.default.sub[0],
    artifactType: 'readModel',
    destination: process.cwd()
};

_global2.default.artifactsManager.createArtifact(context);

// let flags = {name: args.sub[0]}; 
// global.artifactsManager.createReadModel(flags);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtcmVhZG1vZGVsLmpzIl0sIm5hbWVzIjpbIlVTQUdFIiwiYXJncyIsImV4YW1wbGUiLCJwYXJzZSIsInByb2Nlc3MiLCJhcmd2IiwidmFsdWUiLCJnbG9iYWwiLCJ1c2FnZVByZWZpeCIsIm5hbWUiLCJzdWIiLCJsZW5ndGgiLCJzaG93SGVscCIsInZhbGlkYXRlQXJnc05hbWVJbnB1dCIsImNvbnRleHQiLCJhcnRpZmFjdE5hbWUiLCJhcnRpZmFjdFR5cGUiLCJkZXN0aW5hdGlvbiIsImN3ZCIsImFydGlmYWN0c01hbmFnZXIiLCJjcmVhdGVBcnRpZmFjdCJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7OztBQUNBOzs7Ozs7QUFMQTs7OztBQU9BLElBQU1BLFFBQVEsK0JBQWQ7QUFDQUMsZUFDS0MsT0FETCxDQUNhRixLQURiLEVBQ29CLDRDQURwQjs7QUFHQUMsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQixFQUF5QixFQUFDQyxPQUFPQyxpQkFBT0MsV0FBUCxHQUFxQlIsS0FBN0IsRUFBb0NTLE1BQU0sd0JBQTFDLEVBQXpCO0FBQ0EsSUFBSSxDQUFFUixlQUFLUyxHQUFMLENBQVNDLE1BQVgsSUFBcUJWLGVBQUtTLEdBQUwsQ0FBU0MsTUFBVCxHQUFrQixDQUEzQyxFQUE4Q1YsZUFBS1csUUFBTDs7QUFFOUNMLGlCQUFPTSxxQkFBUCxDQUE2QlosZUFBS1MsR0FBTCxDQUFTLENBQVQsQ0FBN0I7QUFDQSxJQUFJSSxVQUFVO0FBQ1ZDLGtCQUFjZCxlQUFLUyxHQUFMLENBQVMsQ0FBVCxDQURKO0FBRVZNLGtCQUFjLFdBRko7QUFHVkMsaUJBQWFiLFFBQVFjLEdBQVI7QUFISCxDQUFkOztBQU1BWCxpQkFBT1ksZ0JBQVAsQ0FBd0JDLGNBQXhCLENBQXVDTixPQUF2Qzs7QUFFQTtBQUNBIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC1yZWFkbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5cbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIGFkZCByZWFkbW9kZWwgW25hbWVdJztcbmFyZ3NcbiAgICAuZXhhbXBsZShVU0FHRSwgXCJDcmVhdGVzIGEgcmVhZCBtb2RlbCBpbiB0aGUgY3VycmVudCBmb2xkZXJcIik7XG5cbmFyZ3MucGFyc2UocHJvY2Vzcy5hcmd2LCB7dmFsdWU6IGdsb2JhbC51c2FnZVByZWZpeCArIFVTQUdFLCBuYW1lOiAnZG9saXR0bGUgYWRkIHJlYWRtb2RlbCd9KTtcbmlmICghIGFyZ3Muc3ViLmxlbmd0aCB8fCBhcmdzLnN1Yi5sZW5ndGggPCAxKSBhcmdzLnNob3dIZWxwKCk7XG5cbmdsb2JhbC52YWxpZGF0ZUFyZ3NOYW1lSW5wdXQoYXJncy5zdWJbMF0pO1xubGV0IGNvbnRleHQgPSB7XG4gICAgYXJ0aWZhY3ROYW1lOiBhcmdzLnN1YlswXSwgXG4gICAgYXJ0aWZhY3RUeXBlOiAncmVhZE1vZGVsJyxcbiAgICBkZXN0aW5hdGlvbjogcHJvY2Vzcy5jd2QoKVxufTtcblxuZ2xvYmFsLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlQXJ0aWZhY3QoY29udGV4dCk7XG5cbi8vIGxldCBmbGFncyA9IHtuYW1lOiBhcmdzLnN1YlswXX07IFxuLy8gZ2xvYmFsLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlUmVhZE1vZGVsKGZsYWdzKTsiXX0=