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
var USAGE = 'dolittle add query [name]';
_args2.default.example(USAGE, "Creates a query in the current folder");

_args2.default.parse(process.argv, { value: _global2.default.usagePrefix + USAGE, name: 'dolittle add query' });
if (!_args2.default.sub.length || _args2.default.sub.length < 1) _args2.default.showHelp();

var flags = { name: _args2.default.sub[0] };
_global2.default.artifactsManager.createQuery(flags);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtcXVlcnkuanMiXSwibmFtZXMiOlsiVVNBR0UiLCJhcmdzIiwiZXhhbXBsZSIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiLCJ2YWx1ZSIsImdsb2JhbCIsInVzYWdlUHJlZml4IiwibmFtZSIsInN1YiIsImxlbmd0aCIsInNob3dIZWxwIiwiZmxhZ3MiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiY3JlYXRlUXVlcnkiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7QUFDQTs7Ozs7O0FBTEE7Ozs7QUFPQSxJQUFNQSxRQUFRLDJCQUFkO0FBQ0FDLGVBQ0tDLE9BREwsQ0FDYUYsS0FEYixFQUNvQix1Q0FEcEI7O0FBSUFDLGVBQUtFLEtBQUwsQ0FBV0MsUUFBUUMsSUFBbkIsRUFBeUIsRUFBQ0MsT0FBT0MsaUJBQU9DLFdBQVAsR0FBcUJSLEtBQTdCLEVBQW9DUyxNQUFNLG9CQUExQyxFQUF6QjtBQUNBLElBQUksQ0FBRVIsZUFBS1MsR0FBTCxDQUFTQyxNQUFYLElBQXFCVixlQUFLUyxHQUFMLENBQVNDLE1BQVQsR0FBa0IsQ0FBM0MsRUFBOENWLGVBQUtXLFFBQUw7O0FBRTlDLElBQUlDLFFBQVEsRUFBQ0osTUFBTVIsZUFBS1MsR0FBTCxDQUFTLENBQVQsQ0FBUCxFQUFaO0FBQ0FILGlCQUFPTyxnQkFBUCxDQUF3QkMsV0FBeEIsQ0FBb0NGLEtBQXBDIiwiZmlsZSI6ImRvbGl0dGxlLWFkZC1xdWVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcblxuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIHF1ZXJ5IFtuYW1lXSc7XG5hcmdzXG4gICAgLmV4YW1wbGUoVVNBR0UsIFwiQ3JlYXRlcyBhIHF1ZXJ5IGluIHRoZSBjdXJyZW50IGZvbGRlclwiKTtcblxuXG5hcmdzLnBhcnNlKHByb2Nlc3MuYXJndiwge3ZhbHVlOiBnbG9iYWwudXNhZ2VQcmVmaXggKyBVU0FHRSwgbmFtZTogJ2RvbGl0dGxlIGFkZCBxdWVyeSd9KTtcbmlmICghIGFyZ3Muc3ViLmxlbmd0aCB8fCBhcmdzLnN1Yi5sZW5ndGggPCAxKSBhcmdzLnNob3dIZWxwKCk7XG5cbmxldCBmbGFncyA9IHtuYW1lOiBhcmdzLnN1YlswXX07IFxuZ2xvYmFsLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlUXVlcnkoZmxhZ3MpO1xuIl19