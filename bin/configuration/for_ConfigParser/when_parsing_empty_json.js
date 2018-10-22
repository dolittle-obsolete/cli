'use strict';

var _ConfigParser = require('../ConfigParser');

describe('when parsing empty object', function () {
    var reader = null;
    var result = null;

    (function (beforeEach) {
        reader = new _ConfigParser.ConfigParser();
        result = reader.parse('{}');
    })();

    it('should return an instance', function () {
        return expect(result).to.not.be.undefined;
    });
    it('should not hold any clusters', function () {
        return result.clusters.length.should.equal(0);
    });
}); /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Dolittle. All rights reserved.
     *  Licensed under the MIT License. See LICENSE in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL2Zvcl9Db25maWdQYXJzZXIvd2hlbl9wYXJzaW5nX2VtcHR5X2pzb24uanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJyZWFkZXIiLCJyZXN1bHQiLCJDb25maWdQYXJzZXIiLCJwYXJzZSIsIml0IiwiZXhwZWN0IiwidG8iLCJub3QiLCJiZSIsInVuZGVmaW5lZCIsImNsdXN0ZXJzIiwibGVuZ3RoIiwic2hvdWxkIiwiZXF1YWwiXSwibWFwcGluZ3MiOiI7O0FBS0E7O0FBRUFBLFNBQVMsMkJBQVQsRUFBc0MsWUFBTTtBQUN4QyxRQUFJQyxTQUFTLElBQWI7QUFDQSxRQUFJQyxTQUFTLElBQWI7O0FBRUEsS0FBQyxzQkFBYztBQUNYRCxpQkFBUyxJQUFJRSwwQkFBSixFQUFUO0FBQ0FELGlCQUFTRCxPQUFPRyxLQUFQLENBQWEsSUFBYixDQUFUO0FBQ0gsS0FIRDs7QUFLQUMsT0FBRywyQkFBSCxFQUFnQztBQUFBLGVBQU1DLE9BQU9KLE1BQVAsRUFBZUssRUFBZixDQUFrQkMsR0FBbEIsQ0FBc0JDLEVBQXRCLENBQXlCQyxTQUEvQjtBQUFBLEtBQWhDO0FBQ0FMLE9BQUcsOEJBQUgsRUFBbUM7QUFBQSxlQUFNSCxPQUFPUyxRQUFQLENBQWdCQyxNQUFoQixDQUF1QkMsTUFBdkIsQ0FBOEJDLEtBQTlCLENBQW9DLENBQXBDLENBQU47QUFBQSxLQUFuQztBQUNILENBWEQsRSxDQVBBIiwiZmlsZSI6IndoZW5fcGFyc2luZ19lbXB0eV9qc29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgeyBDb25maWdQYXJzZXIgfSBmcm9tICcuLi9Db25maWdQYXJzZXInO1xuXG5kZXNjcmliZSgnd2hlbiBwYXJzaW5nIGVtcHR5IG9iamVjdCcsICgpID0+IHtcbiAgICBsZXQgcmVhZGVyID0gbnVsbDtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgIChiZWZvcmVFYWNoID0+IHtcbiAgICAgICAgcmVhZGVyID0gbmV3IENvbmZpZ1BhcnNlcigpO1xuICAgICAgICByZXN1bHQgPSByZWFkZXIucGFyc2UoJ3t9Jyk7XG4gICAgfSkoKTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGluc3RhbmNlJywgKCkgPT4gZXhwZWN0KHJlc3VsdCkudG8ubm90LmJlLnVuZGVmaW5lZCk7XG4gICAgaXQoJ3Nob3VsZCBub3QgaG9sZCBhbnkgY2x1c3RlcnMnLCAoKSA9PiByZXN1bHQuY2x1c3RlcnMubGVuZ3RoLnNob3VsZC5lcXVhbCgwKSk7XG59KTsiXX0=