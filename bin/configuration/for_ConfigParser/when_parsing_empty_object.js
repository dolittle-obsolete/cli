'use strict';

var _ConfigParser = require('../ConfigParser');

describe('when parsing empty object', function () {
    var reader = null;
    var result = null;

    (function (beforeEach) {
        reader = new _ConfigParser.ConfigParser();
        result = reader.parse({});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL2Zvcl9Db25maWdQYXJzZXIvd2hlbl9wYXJzaW5nX2VtcHR5X29iamVjdC5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsInJlYWRlciIsInJlc3VsdCIsIkNvbmZpZ1BhcnNlciIsInBhcnNlIiwiaXQiLCJleHBlY3QiLCJ0byIsIm5vdCIsImJlIiwidW5kZWZpbmVkIiwiY2x1c3RlcnMiLCJsZW5ndGgiLCJzaG91bGQiLCJlcXVhbCJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7QUFFQUEsU0FBUywyQkFBVCxFQUFzQyxZQUFNO0FBQ3hDLFFBQUlDLFNBQVMsSUFBYjtBQUNBLFFBQUlDLFNBQVMsSUFBYjs7QUFFQSxLQUFDLHNCQUFjO0FBQ1hELGlCQUFTLElBQUlFLDBCQUFKLEVBQVQ7QUFDQUQsaUJBQVNELE9BQU9HLEtBQVAsQ0FBYSxFQUFiLENBQVQ7QUFDSCxLQUhEOztBQUtBQyxPQUFHLDJCQUFILEVBQWdDO0FBQUEsZUFBTUMsT0FBT0osTUFBUCxFQUFlSyxFQUFmLENBQWtCQyxHQUFsQixDQUFzQkMsRUFBdEIsQ0FBeUJDLFNBQS9CO0FBQUEsS0FBaEM7QUFDQUwsT0FBRyw4QkFBSCxFQUFtQztBQUFBLGVBQU1ILE9BQU9TLFFBQVAsQ0FBZ0JDLE1BQWhCLENBQXVCQyxNQUF2QixDQUE4QkMsS0FBOUIsQ0FBb0MsQ0FBcEMsQ0FBTjtBQUFBLEtBQW5DO0FBQ0gsQ0FYRCxFLENBUEEiLCJmaWxlIjoid2hlbl9wYXJzaW5nX2VtcHR5X29iamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaW1wb3J0IHsgQ29uZmlnUGFyc2VyIH0gZnJvbSAnLi4vQ29uZmlnUGFyc2VyJztcblxuZGVzY3JpYmUoJ3doZW4gcGFyc2luZyBlbXB0eSBvYmplY3QnLCAoKSA9PiB7XG4gICAgbGV0IHJlYWRlciA9IG51bGw7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG5cbiAgICAoYmVmb3JlRWFjaCA9PiB7XG4gICAgICAgIHJlYWRlciA9IG5ldyBDb25maWdQYXJzZXIoKTtcbiAgICAgICAgcmVzdWx0ID0gcmVhZGVyLnBhcnNlKHt9KTtcbiAgICB9KSgpO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gaW5zdGFuY2UnLCAoKSA9PiBleHBlY3QocmVzdWx0KS50by5ub3QuYmUudW5kZWZpbmVkKTtcbiAgICBpdCgnc2hvdWxkIG5vdCBob2xkIGFueSBjbHVzdGVycycsICgpID0+IHJlc3VsdC5jbHVzdGVycy5sZW5ndGguc2hvdWxkLmVxdWFsKDApKTtcbn0pOyJdfQ==