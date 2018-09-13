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
var USAGE = 'dolittle create aggregateroot [name] [namespace]';
_args2.default.example(USAGE, "Creates an aggregate root with a given name and namespace in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle create aggregateroot' });

if (!_args2.default.sub.length || _args2.default.sub.length < 2) _args2.default.showHelp();

_global2.default.artifactsManager.createAggregateRoot(_args2.default.sub[0], _args2.default.sub[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1jcmVhdGUtYWdncmVnYXRlcm9vdC5qcyJdLCJuYW1lcyI6WyJVU0FHRSIsImFyZ3MiLCJleGFtcGxlIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInZhbHVlIiwiZ2xvYmFsIiwidXNhZ2VQcmVmaXgiLCJuYW1lIiwic3ViIiwibGVuZ3RoIiwic2hvd0hlbHAiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlQWdncmVnYXRlUm9vdCJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7OztBQUNBOzs7Ozs7QUFMQTs7OztBQU9BLElBQU1BLFFBQVEsa0RBQWQ7QUFDQUMsZUFDS0MsT0FETCxDQUNhRixLQURiLEVBQ29CLGlGQURwQjs7QUFHQUMsZUFBS0UsS0FBTCxDQUFXQyxRQUFRQyxJQUFuQixFQUF5QixFQUFDQyxPQUFPQyxpQkFBT0MsV0FBUCxHQUFxQlIsS0FBN0IsRUFBb0NTLE1BQU0sK0JBQTFDLEVBQXpCOztBQUVBLElBQUksQ0FBQ1IsZUFBS1MsR0FBTCxDQUFTQyxNQUFWLElBQW9CVixlQUFLUyxHQUFMLENBQVNDLE1BQVQsR0FBa0IsQ0FBMUMsRUFBOENWLGVBQUtXLFFBQUw7O0FBRTlDTCxpQkFBT00sZ0JBQVAsQ0FBd0JDLG1CQUF4QixDQUE0Q2IsZUFBS1MsR0FBTCxDQUFTLENBQVQsQ0FBNUMsRUFBeURULGVBQUtTLEdBQUwsQ0FBUyxDQUFULENBQXpEIiwiZmlsZSI6ImRvbGl0dGxlLWNyZWF0ZS1hZ2dyZWdhdGVyb290LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuXG5jb25zdCBVU0FHRSA9ICdkb2xpdHRsZSBjcmVhdGUgYWdncmVnYXRlcm9vdCBbbmFtZV0gW25hbWVzcGFjZV0nO1xuYXJnc1xuICAgIC5leGFtcGxlKFVTQUdFLCBcIkNyZWF0ZXMgYW4gYWdncmVnYXRlIHJvb3Qgd2l0aCBhIGdpdmVuIG5hbWUgYW5kIG5hbWVzcGFjZSBpbiB0aGUgY3VycmVudCBmb2xkZXJcIik7XG4gXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwge3ZhbHVlOiBnbG9iYWwudXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGNyZWF0ZSBhZ2dyZWdhdGVyb290J30pO1xuXG5pZiggIWFyZ3Muc3ViLmxlbmd0aCB8fMKgYXJncy5zdWIubGVuZ3RoIDwgMiApIGFyZ3Muc2hvd0hlbHAoKTtcblxuZ2xvYmFsLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlQWdncmVnYXRlUm9vdChhcmdzLnN1YlswXSwgYXJncy5zdWJbMV0pOyJdfQ==