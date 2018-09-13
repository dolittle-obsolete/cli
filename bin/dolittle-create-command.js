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
var USAGE = 'dolittle create command [name] [namespace]';
_args2.default.example(USAGE, "Creates a command with a given name and namespace in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle create command' });

if (!_args2.default.sub.length || _args2.default.sub.length < 2) _args2.default.showHelp();

_global2.default.artifactsManager.createCommand(_args2.default.sub[0], _args2.default.sub[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUtY29tbWFuZC5qcyJdLCJuYW1lcyI6WyJVU0FHRSIsImFyZ3MiLCJleGFtcGxlIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInZhbHVlIiwiZ2xvYmFsIiwidXNhZ2VQcmVmaXgiLCJuYW1lIiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlQ29tbWFuZCJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7OztBQUNBOzs7Ozs7QUFMQTs7OztBQU9BLElBQU1BLFFBQVEsNENBQWQ7QUFDQUMsZUFDS0MsT0FETCxDQUNhRixLQURiLEVBQ29CLHlFQURwQjs7QUFHQUMsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQixFQUF5QixFQUFDQyxPQUFPQyxpQkFBT0MsV0FBUCxHQUFxQlIsS0FBN0IsRUFBb0NTLE1BQU0seUJBQTFDLEVBQXpCOztBQUVBLElBQUksQ0FBQ1IsZUFBS1MsR0FBTCxDQUFTQyxNQUFWLElBQW9CVixlQUFLUyxHQUFMLENBQVNDLE1BQVQsR0FBa0IsQ0FBMUMsRUFBOENWLGVBQUtXLFFBQUw7O0FBRTlDTCxpQkFBT00sZ0JBQVAsQ0FBd0JDLGFBQXhCLENBQXNDYixlQUFLUyxHQUFMLENBQVMsQ0FBVCxDQUF0QyxFQUFtRFQsZUFBS1MsR0FBTCxDQUFTLENBQVQsQ0FBbkQiLCJmaWxlIjoiZG9saXR0bGUtY3JlYXRlLWNvbW1hbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5cbmNvbnN0IFVTQUdFID0gJ2RvbGl0dGxlIGNyZWF0ZSBjb21tYW5kIFtuYW1lXSBbbmFtZXNwYWNlXSc7XG5hcmdzXG4gICAgLmV4YW1wbGUoVVNBR0UsIFwiQ3JlYXRlcyBhIGNvbW1hbmQgd2l0aCBhIGdpdmVuIG5hbWUgYW5kIG5hbWVzcGFjZSBpbiB0aGUgY3VycmVudCBmb2xkZXJcIik7XG4gXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwge3ZhbHVlOiBnbG9iYWwudXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGNyZWF0ZSBjb21tYW5kJ30pO1xuXG5pZiggIWFyZ3Muc3ViLmxlbmd0aCB8fMKgYXJncy5zdWIubGVuZ3RoIDwgMiApIGFyZ3Muc2hvd0hlbHAoKTtcblxuZ2xvYmFsLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlQ29tbWFuZChhcmdzLnN1YlswXSwgYXJncy5zdWJbMV0pOyJdfQ==