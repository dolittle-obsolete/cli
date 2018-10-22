'use strict';

var _ConfigParser = require('../ConfigParser');

describe('when parsing object with two clusters and current set to second', function () {
    var reader = null;
    var result = null;
    var configuration = {
        clusters: [{ name: 'first', url: 'http://first', token: 'first token' }, { name: 'second', url: 'http://second', token: 'second token' }],
        current: 'second'
    };

    (function (beforeEach) {
        reader = new _ConfigParser.ConfigParser();
        result = reader.parse(configuration);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL2Zvcl9Db25maWdQYXJzZXIvd2hlbl9wYXJzaW5nX29iamVjdF93aXRoX3R3b19jbHVzdGVyc19hbmRfY3VycmVudF9zZXRfdG9fc2Vjb25kLmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwicmVhZGVyIiwicmVzdWx0IiwiY29uZmlndXJhdGlvbiIsImNsdXN0ZXJzIiwibmFtZSIsInVybCIsInRva2VuIiwiY3VycmVudCIsIkNvbmZpZ1BhcnNlciIsInBhcnNlIiwiaXQiLCJleHBlY3QiLCJ0byIsIm5vdCIsImJlIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwic2hvdWxkIiwiZXF1YWwiXSwibWFwcGluZ3MiOiI7O0FBS0E7O0FBRUFBLFNBQVMsaUVBQVQsRUFBNEUsWUFBTTtBQUM5RSxRQUFJQyxTQUFTLElBQWI7QUFDQSxRQUFJQyxTQUFTLElBQWI7QUFDQSxRQUFJQyxnQkFBZ0I7QUFDaEJDLGtCQUFVLENBQ04sRUFBRUMsTUFBTSxPQUFSLEVBQWlCQyxLQUFJLGNBQXJCLEVBQXFDQyxPQUFNLGFBQTNDLEVBRE0sRUFFTixFQUFFRixNQUFNLFFBQVIsRUFBa0JDLEtBQUksZUFBdEIsRUFBdUNDLE9BQU0sY0FBN0MsRUFGTSxDQURNO0FBS2hCQyxpQkFBUztBQUxPLEtBQXBCOztBQVFBLEtBQUMsc0JBQWM7QUFDWFAsaUJBQVMsSUFBSVEsMEJBQUosRUFBVDtBQUNBUCxpQkFBU0QsT0FBT1MsS0FBUCxDQUFhUCxhQUFiLENBQVQ7QUFDSCxLQUhEOztBQUtBUSxPQUFHLDJCQUFILEVBQWdDO0FBQUEsZUFBTUMsT0FBT1YsTUFBUCxFQUFlVyxFQUFmLENBQWtCQyxHQUFsQixDQUFzQkMsRUFBdEIsQ0FBeUJDLFNBQS9CO0FBQUEsS0FBaEM7QUFDQUwsT0FBRyw4QkFBSCxFQUFtQztBQUFBLGVBQU1ULE9BQU9FLFFBQVAsQ0FBZ0JhLE1BQWhCLENBQXVCQyxNQUF2QixDQUE4QkMsS0FBOUIsQ0FBb0MsQ0FBcEMsQ0FBTjtBQUFBLEtBQW5DO0FBQ0FSLE9BQUcsa0NBQUgsRUFBdUM7QUFBQSxlQUFNVCxPQUFPRSxRQUFQLENBQWdCLENBQWhCLEVBQW1CQyxJQUFuQixDQUF3QmEsTUFBeEIsQ0FBK0JDLEtBQS9CLENBQXFDaEIsY0FBY0MsUUFBZCxDQUF1QixDQUF2QixFQUEwQkMsSUFBL0QsQ0FBTjtBQUFBLEtBQXZDO0FBQ0FNLE9BQUcsaUNBQUgsRUFBc0M7QUFBQSxlQUFNVCxPQUFPRSxRQUFQLENBQWdCLENBQWhCLEVBQW1CRSxHQUFuQixDQUF1QlksTUFBdkIsQ0FBOEJDLEtBQTlCLENBQW9DaEIsY0FBY0MsUUFBZCxDQUF1QixDQUF2QixFQUEwQkUsR0FBOUQsQ0FBTjtBQUFBLEtBQXRDO0FBQ0FLLE9BQUcsbUNBQUgsRUFBd0M7QUFBQSxlQUFNVCxPQUFPRSxRQUFQLENBQWdCLENBQWhCLEVBQW1CRyxLQUFuQixDQUF5QlcsTUFBekIsQ0FBZ0NDLEtBQWhDLENBQXNDaEIsY0FBY0MsUUFBZCxDQUF1QixDQUF2QixFQUEwQkcsS0FBaEUsQ0FBTjtBQUFBLEtBQXhDO0FBQ0FJLE9BQUcsbUNBQUgsRUFBd0M7QUFBQSxlQUFNVCxPQUFPRSxRQUFQLENBQWdCLENBQWhCLEVBQW1CQyxJQUFuQixDQUF3QmEsTUFBeEIsQ0FBK0JDLEtBQS9CLENBQXFDaEIsY0FBY0MsUUFBZCxDQUF1QixDQUF2QixFQUEwQkMsSUFBL0QsQ0FBTjtBQUFBLEtBQXhDO0FBQ0FNLE9BQUcsa0NBQUgsRUFBdUM7QUFBQSxlQUFNVCxPQUFPRSxRQUFQLENBQWdCLENBQWhCLEVBQW1CRSxHQUFuQixDQUF1QlksTUFBdkIsQ0FBOEJDLEtBQTlCLENBQW9DaEIsY0FBY0MsUUFBZCxDQUF1QixDQUF2QixFQUEwQkUsR0FBOUQsQ0FBTjtBQUFBLEtBQXZDO0FBQ0FLLE9BQUcsb0NBQUgsRUFBeUM7QUFBQSxlQUFNVCxPQUFPRSxRQUFQLENBQWdCLENBQWhCLEVBQW1CRyxLQUFuQixDQUF5QlcsTUFBekIsQ0FBZ0NDLEtBQWhDLENBQXNDaEIsY0FBY0MsUUFBZCxDQUF1QixDQUF2QixFQUEwQkcsS0FBaEUsQ0FBTjtBQUFBLEtBQXpDO0FBQ0FJLE9BQUcsK0NBQUgsRUFBb0Q7QUFBQSxlQUFNVCxPQUFPTSxPQUFQLENBQWVVLE1BQWYsQ0FBc0JDLEtBQXRCLENBQTRCakIsT0FBT0UsUUFBUCxDQUFnQixDQUFoQixDQUE1QixDQUFOO0FBQUEsS0FBcEQ7QUFDSCxDQXpCRCxFLENBUEEiLCJmaWxlIjoid2hlbl9wYXJzaW5nX29iamVjdF93aXRoX3R3b19jbHVzdGVyc19hbmRfY3VycmVudF9zZXRfdG9fc2Vjb25kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgeyBDb25maWdQYXJzZXIgfSBmcm9tICcuLi9Db25maWdQYXJzZXInO1xuXG5kZXNjcmliZSgnd2hlbiBwYXJzaW5nIG9iamVjdCB3aXRoIHR3byBjbHVzdGVycyBhbmQgY3VycmVudCBzZXQgdG8gc2Vjb25kJywgKCkgPT4ge1xuICAgIGxldCByZWFkZXIgPSBudWxsO1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIGxldCBjb25maWd1cmF0aW9uID0ge1xuICAgICAgICBjbHVzdGVyczogW1xuICAgICAgICAgICAgeyBuYW1lOiAnZmlyc3QnLCB1cmw6J2h0dHA6Ly9maXJzdCcsIHRva2VuOidmaXJzdCB0b2tlbicgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3NlY29uZCcsIHVybDonaHR0cDovL3NlY29uZCcsIHRva2VuOidzZWNvbmQgdG9rZW4nIH1cbiAgICAgICAgXSxcbiAgICAgICAgY3VycmVudDogJ3NlY29uZCdcbiAgICB9O1xuXG4gICAgKGJlZm9yZUVhY2ggPT4ge1xuICAgICAgICByZWFkZXIgPSBuZXcgQ29uZmlnUGFyc2VyKCk7XG4gICAgICAgIHJlc3VsdCA9IHJlYWRlci5wYXJzZShjb25maWd1cmF0aW9uKTtcbiAgICB9KSgpO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gaW5zdGFuY2UnLCAoKSA9PiBleHBlY3QocmVzdWx0KS50by5ub3QuYmUudW5kZWZpbmVkKTtcbiAgICBpdCgnc2hvdWxkIG5vdCBob2xkIHR3byBjbHVzdGVycycsICgpID0+IHJlc3VsdC5jbHVzdGVycy5sZW5ndGguc2hvdWxkLmVxdWFsKDIpKTtcbiAgICBpdCgnc2hvdWxkIHBhcnNlIGZpcnN0IGNsdXN0ZXJzIG5hbWUnLCAoKSA9PiByZXN1bHQuY2x1c3RlcnNbMF0ubmFtZS5zaG91bGQuZXF1YWwoY29uZmlndXJhdGlvbi5jbHVzdGVyc1swXS5uYW1lKSk7XG4gICAgaXQoJ3Nob3VsZCBwYXJzZSBmaXJzdCBjbHVzdGVycyB1cmwnLCAoKSA9PiByZXN1bHQuY2x1c3RlcnNbMF0udXJsLnNob3VsZC5lcXVhbChjb25maWd1cmF0aW9uLmNsdXN0ZXJzWzBdLnVybCkpO1xuICAgIGl0KCdzaG91bGQgcGFyc2UgZmlyc3QgY2x1c3RlcnMgdG9rZW4nLCAoKSA9PiByZXN1bHQuY2x1c3RlcnNbMF0udG9rZW4uc2hvdWxkLmVxdWFsKGNvbmZpZ3VyYXRpb24uY2x1c3RlcnNbMF0udG9rZW4pKTtcbiAgICBpdCgnc2hvdWxkIHBhcnNlIHNlY29uZCBjbHVzdGVycyBuYW1lJywgKCkgPT4gcmVzdWx0LmNsdXN0ZXJzWzFdLm5hbWUuc2hvdWxkLmVxdWFsKGNvbmZpZ3VyYXRpb24uY2x1c3RlcnNbMV0ubmFtZSkpO1xuICAgIGl0KCdzaG91bGQgcGFyc2Ugc2Vjb25kIGNsdXN0ZXJzIHVybCcsICgpID0+IHJlc3VsdC5jbHVzdGVyc1sxXS51cmwuc2hvdWxkLmVxdWFsKGNvbmZpZ3VyYXRpb24uY2x1c3RlcnNbMV0udXJsKSk7XG4gICAgaXQoJ3Nob3VsZCBwYXJzZSBzZWNvbmQgY2x1c3RlcnMgdG9rZW4nLCAoKSA9PiByZXN1bHQuY2x1c3RlcnNbMV0udG9rZW4uc2hvdWxkLmVxdWFsKGNvbmZpZ3VyYXRpb24uY2x1c3RlcnNbMV0udG9rZW4pKTtcbiAgICBpdCgnc2hvdWxkIHNldCBjdXJyZW50IGNsdXN0ZXIgaW5zdGFuY2UgdG8gc2Vjb25kJywgKCkgPT4gcmVzdWx0LmN1cnJlbnQuc2hvdWxkLmVxdWFsKHJlc3VsdC5jbHVzdGVyc1sxXSkpO1xufSk7Il19