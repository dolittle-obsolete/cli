'use strict';

var _a_system_that_returns_a_valid_bounded_context_configuration = require('./given/a_system_that_returns_a_valid_bounded_context_configuration');

var _BoundedContext = require('../../../boundedContexts/BoundedContext');

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
describe('when getting a valid bounded context configuration', function () {
    var context = new _a_system_that_returns_a_valid_bounded_context_configuration.a_system_that_returns_a_valid_bounded_context_configuration();
    var boundedContext = new _BoundedContext.BoundedContext();
    (function (beforeEach) {
        boundedContext = context.artifactsManager._getNearestBoundedContextConfig('somePath');
    })();
    it('should return a bounded context configuration', function () {
        return expect(boundedContext).to.not.be.null;
    });
    it('should get a bounded context with the correct application', function () {
        return boundedContext.application.should.equal(context.application);
    });
    it('should get a bounded context with the correct bounded context id', function () {
        return boundedContext.boundedContext.should.equal(context.boundedContext);
    });
    it('should get a bounded context with the correct bounded context name', function () {
        return boundedContext.boundedContextName.should.equal(context.boundedContextName);
    });
    it('should get a bounded context with the correct core', function () {
        return boundedContext.core.should.equal(context.boundedContextCore);
    });
    it('should get a bounded context with the correct interaction', function () {
        return expect(boundedContext.interaction).to.be.undefined;
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvZm9yX0FydGlmYWN0c01hbmFnZXIvZm9yX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZy93aGVuX2dldHRpbmdfYV92YWxpZF9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsImNvbnRleHQiLCJhX3N5c3RlbV90aGF0X3JldHVybnNfYV92YWxpZF9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbiIsImJvdW5kZWRDb250ZXh0IiwiQm91bmRlZENvbnRleHQiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyIsIml0IiwiZXhwZWN0IiwidG8iLCJub3QiLCJiZSIsIm51bGwiLCJhcHBsaWNhdGlvbiIsInNob3VsZCIsImVxdWFsIiwiYm91bmRlZENvbnRleHROYW1lIiwiY29yZSIsImJvdW5kZWRDb250ZXh0Q29yZSIsImludGVyYWN0aW9uIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOztBQUlBOztBQUNBOztBQUxBOzs7O0FBTUFBLFNBQVMsb0RBQVQsRUFBK0QsWUFBTTtBQUNqRSxRQUFJQyxVQUFVLElBQUlDLHdIQUFKLEVBQWQ7QUFDQSxRQUFJQyxpQkFBaUIsSUFBSUMsOEJBQUosRUFBckI7QUFDQSxLQUFDLHNCQUFjO0FBQ1hELHlCQUFpQkYsUUFBUUksZ0JBQVIsQ0FBeUJDLCtCQUF6QixDQUF5RCxVQUF6RCxDQUFqQjtBQUNILEtBRkQ7QUFHQUMsT0FBRywrQ0FBSCxFQUFvRDtBQUFBLGVBQU1DLE9BQU9MLGNBQVAsRUFBdUJNLEVBQXZCLENBQTBCQyxHQUExQixDQUE4QkMsRUFBOUIsQ0FBaUNDLElBQXZDO0FBQUEsS0FBcEQ7QUFDQUwsT0FBRywyREFBSCxFQUFnRTtBQUFBLGVBQU1KLGVBQWVVLFdBQWYsQ0FBMkJDLE1BQTNCLENBQWtDQyxLQUFsQyxDQUF3Q2QsUUFBUVksV0FBaEQsQ0FBTjtBQUFBLEtBQWhFO0FBQ0FOLE9BQUcsa0VBQUgsRUFBdUU7QUFBQSxlQUFNSixlQUFlQSxjQUFmLENBQThCVyxNQUE5QixDQUFxQ0MsS0FBckMsQ0FBMkNkLFFBQVFFLGNBQW5ELENBQU47QUFBQSxLQUF2RTtBQUNBSSxPQUFHLG9FQUFILEVBQXlFO0FBQUEsZUFBTUosZUFBZWEsa0JBQWYsQ0FBa0NGLE1BQWxDLENBQXlDQyxLQUF6QyxDQUErQ2QsUUFBUWUsa0JBQXZELENBQU47QUFBQSxLQUF6RTtBQUNBVCxPQUFHLG9EQUFILEVBQXlEO0FBQUEsZUFBTUosZUFBZWMsSUFBZixDQUFvQkgsTUFBcEIsQ0FBMkJDLEtBQTNCLENBQWlDZCxRQUFRaUIsa0JBQXpDLENBQU47QUFBQSxLQUF6RDtBQUNBWCxPQUFHLDJEQUFILEVBQWdFO0FBQUEsZUFBTUMsT0FBT0wsZUFBZWdCLFdBQXRCLEVBQW1DVixFQUFuQyxDQUFzQ0UsRUFBdEMsQ0FBeUNTLFNBQS9DO0FBQUEsS0FBaEU7QUFDSCxDQVpEIiwiZmlsZSI6IndoZW5fZ2V0dGluZ19hX3ZhbGlkX2JvdW5kZWRfY29udGV4dF9jb25maWd1cmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgYV9zeXN0ZW1fdGhhdF9yZXR1cm5zX2FfdmFsaWRfYm91bmRlZF9jb250ZXh0X2NvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2dpdmVuL2Ffc3lzdGVtX3RoYXRfcmV0dXJuc19hX3ZhbGlkX2JvdW5kZWRfY29udGV4dF9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IEJvdW5kZWRDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vYm91bmRlZENvbnRleHRzL0JvdW5kZWRDb250ZXh0JztcbmRlc2NyaWJlKCd3aGVuIGdldHRpbmcgYSB2YWxpZCBib3VuZGVkIGNvbnRleHQgY29uZmlndXJhdGlvbicsICgpID0+IHtcbiAgICBsZXQgY29udGV4dCA9IG5ldyBhX3N5c3RlbV90aGF0X3JldHVybnNfYV92YWxpZF9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbigpO1xuICAgIGxldCBib3VuZGVkQ29udGV4dCA9IG5ldyBCb3VuZGVkQ29udGV4dCgpO1xuICAgIChiZWZvcmVFYWNoID0+IHtcbiAgICAgICAgYm91bmRlZENvbnRleHQgPSBjb250ZXh0LmFydGlmYWN0c01hbmFnZXIuX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZygnc29tZVBhdGgnKTtcbiAgICB9KSgpO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGEgYm91bmRlZCBjb250ZXh0IGNvbmZpZ3VyYXRpb24nLCAoKSA9PiBleHBlY3QoYm91bmRlZENvbnRleHQpLnRvLm5vdC5iZS5udWxsKTtcbiAgICBpdCgnc2hvdWxkIGdldCBhIGJvdW5kZWQgY29udGV4dCB3aXRoIHRoZSBjb3JyZWN0IGFwcGxpY2F0aW9uJywgKCkgPT4gYm91bmRlZENvbnRleHQuYXBwbGljYXRpb24uc2hvdWxkLmVxdWFsKGNvbnRleHQuYXBwbGljYXRpb24pKTtcbiAgICBpdCgnc2hvdWxkIGdldCBhIGJvdW5kZWQgY29udGV4dCB3aXRoIHRoZSBjb3JyZWN0IGJvdW5kZWQgY29udGV4dCBpZCcsICgpID0+IGJvdW5kZWRDb250ZXh0LmJvdW5kZWRDb250ZXh0LnNob3VsZC5lcXVhbChjb250ZXh0LmJvdW5kZWRDb250ZXh0KSk7XG4gICAgaXQoJ3Nob3VsZCBnZXQgYSBib3VuZGVkIGNvbnRleHQgd2l0aCB0aGUgY29ycmVjdCBib3VuZGVkIGNvbnRleHQgbmFtZScsICgpID0+IGJvdW5kZWRDb250ZXh0LmJvdW5kZWRDb250ZXh0TmFtZS5zaG91bGQuZXF1YWwoY29udGV4dC5ib3VuZGVkQ29udGV4dE5hbWUpKTtcbiAgICBpdCgnc2hvdWxkIGdldCBhIGJvdW5kZWQgY29udGV4dCB3aXRoIHRoZSBjb3JyZWN0IGNvcmUnLCAoKSA9PiBib3VuZGVkQ29udGV4dC5jb3JlLnNob3VsZC5lcXVhbChjb250ZXh0LmJvdW5kZWRDb250ZXh0Q29yZSkpO1xuICAgIGl0KCdzaG91bGQgZ2V0IGEgYm91bmRlZCBjb250ZXh0IHdpdGggdGhlIGNvcnJlY3QgaW50ZXJhY3Rpb24nLCAoKSA9PiBleHBlY3QoYm91bmRlZENvbnRleHQuaW50ZXJhY3Rpb24pLnRvLmJlLnVuZGVmaW5lZCk7XG59KTsiXX0=