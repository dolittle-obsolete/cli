'use strict';

var _ConfigParser = require('../ConfigParser');

describe('when parsing undefined', function () {
    var reader = null;
    var result = null;

    (function (beforeEach) {
        reader = new _ConfigParser.ConfigParser();
        result = reader.parse();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL2Zvcl9Db25maWdQYXJzZXIvd2hlbl9wYXJzaW5nX3VuZGVmaW5lZC5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsInJlYWRlciIsInJlc3VsdCIsIkNvbmZpZ1BhcnNlciIsInBhcnNlIiwiaXQiLCJleHBlY3QiLCJ0byIsIm5vdCIsImJlIiwidW5kZWZpbmVkIiwiY2x1c3RlcnMiLCJsZW5ndGgiLCJzaG91bGQiLCJlcXVhbCJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7QUFFQUEsU0FBUyx3QkFBVCxFQUFtQyxZQUFNO0FBQ3JDLFFBQUlDLFNBQVMsSUFBYjtBQUNBLFFBQUlDLFNBQVMsSUFBYjs7QUFFQSxLQUFDLHNCQUFjO0FBQ1hELGlCQUFTLElBQUlFLDBCQUFKLEVBQVQ7QUFDQUQsaUJBQVNELE9BQU9HLEtBQVAsRUFBVDtBQUNILEtBSEQ7O0FBS0FDLE9BQUcsMkJBQUgsRUFBZ0M7QUFBQSxlQUFNQyxPQUFPSixNQUFQLEVBQWVLLEVBQWYsQ0FBa0JDLEdBQWxCLENBQXNCQyxFQUF0QixDQUF5QkMsU0FBL0I7QUFBQSxLQUFoQztBQUNBTCxPQUFHLDhCQUFILEVBQW1DO0FBQUEsZUFBTUgsT0FBT1MsUUFBUCxDQUFnQkMsTUFBaEIsQ0FBdUJDLE1BQXZCLENBQThCQyxLQUE5QixDQUFvQyxDQUFwQyxDQUFOO0FBQUEsS0FBbkM7QUFFSCxDQVpELEUsQ0FQQSIsImZpbGUiOiJ3aGVuX3BhcnNpbmdfdW5kZWZpbmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgeyBDb25maWdQYXJzZXIgfSBmcm9tICcuLi9Db25maWdQYXJzZXInO1xuXG5kZXNjcmliZSgnd2hlbiBwYXJzaW5nIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICBsZXQgcmVhZGVyID0gbnVsbDtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgIChiZWZvcmVFYWNoID0+IHtcbiAgICAgICAgcmVhZGVyID0gbmV3IENvbmZpZ1BhcnNlcigpO1xuICAgICAgICByZXN1bHQgPSByZWFkZXIucGFyc2UoKTtcbiAgICB9KSgpO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gaW5zdGFuY2UnLCAoKSA9PiBleHBlY3QocmVzdWx0KS50by5ub3QuYmUudW5kZWZpbmVkKTtcbiAgICBpdCgnc2hvdWxkIG5vdCBob2xkIGFueSBjbHVzdGVycycsICgpID0+IHJlc3VsdC5jbHVzdGVycy5sZW5ndGguc2hvdWxkLmVxdWFsKDApKTtcblxufSk7Il19