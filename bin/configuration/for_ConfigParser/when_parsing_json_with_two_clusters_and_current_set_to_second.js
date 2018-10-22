'use strict';

var _ConfigParser = require('../ConfigParser');

describe('when parsing json with two clusters and current set to second', function () {
    var reader = null;
    var result = null;
    var configuration = {
        clusters: [{ name: 'first', url: 'http://first', token: 'first token' }, { name: 'second', url: 'http://second', token: 'second token' }],
        current: 'second'
    };
    var configurationAsJson = JSON.stringify(configuration);

    (function (beforeEach) {
        reader = new _ConfigParser.ConfigParser();
        result = reader.parse(configurationAsJson);
    })();

    it('should return an instance', function () {
        return expect(result).to.not.be.undefined;
    });
    it('should not hold two clusters', function () {
        return result.clusters.length.should.equal(2);
    });
    it('should parse first clusters name', function () {
        return result.clusters[0].name.should.equal(configuration.clusters[0].name);
    });
    it('should parse first clusters url', function () {
        return result.clusters[0].url.should.equal(configuration.clusters[0].url);
    });
    it('should parse first clusters token', function () {
        return result.clusters[0].token.should.equal(configuration.clusters[0].token);
    });
    it('should parse second clusters name', function () {
        return result.clusters[1].name.should.equal(configuration.clusters[1].name);
    });
    it('should parse second clusters url', function () {
        return result.clusters[1].url.should.equal(configuration.clusters[1].url);
    });
    it('should parse second clusters token', function () {
        return result.clusters[1].token.should.equal(configuration.clusters[1].token);
    });
    it('should set current cluster instance to second', function () {
        return result.current.should.equal(result.clusters[1]);
    });
}); /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Dolittle. All rights reserved.
     *  Licensed under the MIT License. See LICENSE in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL2Zvcl9Db25maWdQYXJzZXIvd2hlbl9wYXJzaW5nX2pzb25fd2l0aF90d29fY2x1c3RlcnNfYW5kX2N1cnJlbnRfc2V0X3RvX3NlY29uZC5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsInJlYWRlciIsInJlc3VsdCIsImNvbmZpZ3VyYXRpb24iLCJjbHVzdGVycyIsIm5hbWUiLCJ1cmwiLCJ0b2tlbiIsImN1cnJlbnQiLCJjb25maWd1cmF0aW9uQXNKc29uIiwiSlNPTiIsInN0cmluZ2lmeSIsIkNvbmZpZ1BhcnNlciIsInBhcnNlIiwiaXQiLCJleHBlY3QiLCJ0byIsIm5vdCIsImJlIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwic2hvdWxkIiwiZXF1YWwiXSwibWFwcGluZ3MiOiI7O0FBS0E7O0FBRUFBLFNBQVMsK0RBQVQsRUFBMEUsWUFBTTtBQUM1RSxRQUFJQyxTQUFTLElBQWI7QUFDQSxRQUFJQyxTQUFTLElBQWI7QUFDQSxRQUFJQyxnQkFBZ0I7QUFDaEJDLGtCQUFVLENBQ04sRUFBRUMsTUFBTSxPQUFSLEVBQWlCQyxLQUFJLGNBQXJCLEVBQXFDQyxPQUFNLGFBQTNDLEVBRE0sRUFFTixFQUFFRixNQUFNLFFBQVIsRUFBa0JDLEtBQUksZUFBdEIsRUFBdUNDLE9BQU0sY0FBN0MsRUFGTSxDQURNO0FBS2hCQyxpQkFBUztBQUxPLEtBQXBCO0FBT0EsUUFBSUMsc0JBQXNCQyxLQUFLQyxTQUFMLENBQWVSLGFBQWYsQ0FBMUI7O0FBRUEsS0FBQyxzQkFBYztBQUNYRixpQkFBUyxJQUFJVywwQkFBSixFQUFUO0FBQ0FWLGlCQUFTRCxPQUFPWSxLQUFQLENBQWFKLG1CQUFiLENBQVQ7QUFDSCxLQUhEOztBQUtBSyxPQUFHLDJCQUFILEVBQWdDO0FBQUEsZUFBTUMsT0FBT2IsTUFBUCxFQUFlYyxFQUFmLENBQWtCQyxHQUFsQixDQUFzQkMsRUFBdEIsQ0FBeUJDLFNBQS9CO0FBQUEsS0FBaEM7QUFDQUwsT0FBRyw4QkFBSCxFQUFtQztBQUFBLGVBQU1aLE9BQU9FLFFBQVAsQ0FBZ0JnQixNQUFoQixDQUF1QkMsTUFBdkIsQ0FBOEJDLEtBQTlCLENBQW9DLENBQXBDLENBQU47QUFBQSxLQUFuQztBQUNBUixPQUFHLGtDQUFILEVBQXVDO0FBQUEsZUFBTVosT0FBT0UsUUFBUCxDQUFnQixDQUFoQixFQUFtQkMsSUFBbkIsQ0FBd0JnQixNQUF4QixDQUErQkMsS0FBL0IsQ0FBcUNuQixjQUFjQyxRQUFkLENBQXVCLENBQXZCLEVBQTBCQyxJQUEvRCxDQUFOO0FBQUEsS0FBdkM7QUFDQVMsT0FBRyxpQ0FBSCxFQUFzQztBQUFBLGVBQU1aLE9BQU9FLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUJFLEdBQW5CLENBQXVCZSxNQUF2QixDQUE4QkMsS0FBOUIsQ0FBb0NuQixjQUFjQyxRQUFkLENBQXVCLENBQXZCLEVBQTBCRSxHQUE5RCxDQUFOO0FBQUEsS0FBdEM7QUFDQVEsT0FBRyxtQ0FBSCxFQUF3QztBQUFBLGVBQU1aLE9BQU9FLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUJHLEtBQW5CLENBQXlCYyxNQUF6QixDQUFnQ0MsS0FBaEMsQ0FBc0NuQixjQUFjQyxRQUFkLENBQXVCLENBQXZCLEVBQTBCRyxLQUFoRSxDQUFOO0FBQUEsS0FBeEM7QUFDQU8sT0FBRyxtQ0FBSCxFQUF3QztBQUFBLGVBQU1aLE9BQU9FLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUJDLElBQW5CLENBQXdCZ0IsTUFBeEIsQ0FBK0JDLEtBQS9CLENBQXFDbkIsY0FBY0MsUUFBZCxDQUF1QixDQUF2QixFQUEwQkMsSUFBL0QsQ0FBTjtBQUFBLEtBQXhDO0FBQ0FTLE9BQUcsa0NBQUgsRUFBdUM7QUFBQSxlQUFNWixPQUFPRSxRQUFQLENBQWdCLENBQWhCLEVBQW1CRSxHQUFuQixDQUF1QmUsTUFBdkIsQ0FBOEJDLEtBQTlCLENBQW9DbkIsY0FBY0MsUUFBZCxDQUF1QixDQUF2QixFQUEwQkUsR0FBOUQsQ0FBTjtBQUFBLEtBQXZDO0FBQ0FRLE9BQUcsb0NBQUgsRUFBeUM7QUFBQSxlQUFNWixPQUFPRSxRQUFQLENBQWdCLENBQWhCLEVBQW1CRyxLQUFuQixDQUF5QmMsTUFBekIsQ0FBZ0NDLEtBQWhDLENBQXNDbkIsY0FBY0MsUUFBZCxDQUF1QixDQUF2QixFQUEwQkcsS0FBaEUsQ0FBTjtBQUFBLEtBQXpDO0FBQ0FPLE9BQUcsK0NBQUgsRUFBb0Q7QUFBQSxlQUFNWixPQUFPTSxPQUFQLENBQWVhLE1BQWYsQ0FBc0JDLEtBQXRCLENBQTRCcEIsT0FBT0UsUUFBUCxDQUFnQixDQUFoQixDQUE1QixDQUFOO0FBQUEsS0FBcEQ7QUFDSCxDQTFCRCxFLENBUEEiLCJmaWxlIjoid2hlbl9wYXJzaW5nX2pzb25fd2l0aF90d29fY2x1c3RlcnNfYW5kX2N1cnJlbnRfc2V0X3RvX3NlY29uZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaW1wb3J0IHsgQ29uZmlnUGFyc2VyIH0gZnJvbSAnLi4vQ29uZmlnUGFyc2VyJztcblxuZGVzY3JpYmUoJ3doZW4gcGFyc2luZyBqc29uIHdpdGggdHdvIGNsdXN0ZXJzIGFuZCBjdXJyZW50IHNldCB0byBzZWNvbmQnLCAoKSA9PiB7XG4gICAgbGV0IHJlYWRlciA9IG51bGw7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgbGV0IGNvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAgIGNsdXN0ZXJzOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdmaXJzdCcsIHVybDonaHR0cDovL2ZpcnN0JywgdG9rZW46J2ZpcnN0IHRva2VuJyB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnc2Vjb25kJywgdXJsOidodHRwOi8vc2Vjb25kJywgdG9rZW46J3NlY29uZCB0b2tlbicgfVxuICAgICAgICBdLFxuICAgICAgICBjdXJyZW50OiAnc2Vjb25kJ1xuICAgIH07XG4gICAgbGV0IGNvbmZpZ3VyYXRpb25Bc0pzb24gPSBKU09OLnN0cmluZ2lmeShjb25maWd1cmF0aW9uKTtcblxuICAgIChiZWZvcmVFYWNoID0+IHtcbiAgICAgICAgcmVhZGVyID0gbmV3IENvbmZpZ1BhcnNlcigpO1xuICAgICAgICByZXN1bHQgPSByZWFkZXIucGFyc2UoY29uZmlndXJhdGlvbkFzSnNvbik7XG4gICAgfSkoKTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGFuIGluc3RhbmNlJywgKCkgPT4gZXhwZWN0KHJlc3VsdCkudG8ubm90LmJlLnVuZGVmaW5lZCk7XG4gICAgaXQoJ3Nob3VsZCBub3QgaG9sZCB0d28gY2x1c3RlcnMnLCAoKSA9PiByZXN1bHQuY2x1c3RlcnMubGVuZ3RoLnNob3VsZC5lcXVhbCgyKSk7XG4gICAgaXQoJ3Nob3VsZCBwYXJzZSBmaXJzdCBjbHVzdGVycyBuYW1lJywgKCkgPT4gcmVzdWx0LmNsdXN0ZXJzWzBdLm5hbWUuc2hvdWxkLmVxdWFsKGNvbmZpZ3VyYXRpb24uY2x1c3RlcnNbMF0ubmFtZSkpO1xuICAgIGl0KCdzaG91bGQgcGFyc2UgZmlyc3QgY2x1c3RlcnMgdXJsJywgKCkgPT4gcmVzdWx0LmNsdXN0ZXJzWzBdLnVybC5zaG91bGQuZXF1YWwoY29uZmlndXJhdGlvbi5jbHVzdGVyc1swXS51cmwpKTtcbiAgICBpdCgnc2hvdWxkIHBhcnNlIGZpcnN0IGNsdXN0ZXJzIHRva2VuJywgKCkgPT4gcmVzdWx0LmNsdXN0ZXJzWzBdLnRva2VuLnNob3VsZC5lcXVhbChjb25maWd1cmF0aW9uLmNsdXN0ZXJzWzBdLnRva2VuKSk7XG4gICAgaXQoJ3Nob3VsZCBwYXJzZSBzZWNvbmQgY2x1c3RlcnMgbmFtZScsICgpID0+IHJlc3VsdC5jbHVzdGVyc1sxXS5uYW1lLnNob3VsZC5lcXVhbChjb25maWd1cmF0aW9uLmNsdXN0ZXJzWzFdLm5hbWUpKTtcbiAgICBpdCgnc2hvdWxkIHBhcnNlIHNlY29uZCBjbHVzdGVycyB1cmwnLCAoKSA9PiByZXN1bHQuY2x1c3RlcnNbMV0udXJsLnNob3VsZC5lcXVhbChjb25maWd1cmF0aW9uLmNsdXN0ZXJzWzFdLnVybCkpO1xuICAgIGl0KCdzaG91bGQgcGFyc2Ugc2Vjb25kIGNsdXN0ZXJzIHRva2VuJywgKCkgPT4gcmVzdWx0LmNsdXN0ZXJzWzFdLnRva2VuLnNob3VsZC5lcXVhbChjb25maWd1cmF0aW9uLmNsdXN0ZXJzWzFdLnRva2VuKSk7XG4gICAgaXQoJ3Nob3VsZCBzZXQgY3VycmVudCBjbHVzdGVyIGluc3RhbmNlIHRvIHNlY29uZCcsICgpID0+IHJlc3VsdC5jdXJyZW50LnNob3VsZC5lcXVhbChyZXN1bHQuY2x1c3RlcnNbMV0pKTtcbn0pOyJdfQ==