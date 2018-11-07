'use strict';

var _a_bounded_context_json_with_nothing = require('./given/a_bounded_context_json_with_nothing');

var _BoundedContext = require('../BoundedContext');

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
describe('when parsing a bounded context json with everything', function () {
  var context = new _a_bounded_context_json_with_nothing.a_bounded_context_json_with_nothing();
  /**
   * @type {BoundedContext}
   */
  var result = null;
  var boundedContextObj = JSON.parse(context.boundedContextJson);

  (function (beforeEach) {
    result = new _BoundedContext.BoundedContext(boundedContextObj.application, boundedContextObj.boundedContext, boundedContextObj.boundedContextName, boundedContextObj.core, boundedContextObj.interaction);
  })();
  it('should create a bounded context without an application id', function () {
    return expect(result.application).to.be.undefined;
  });
  it('should create a bounded context without a bounded context id', function () {
    return expect(result.boundedContext).to.be.undefined;
  });
  it('should create a bounded context without a bounded context name', function () {
    return expect(result.boundedContextName).to.be.undefined;
  });
  it('should create a bounded context without a core', function () {
    return expect(result.core).to.be.undefined;
  });
  it('should create a bounded context without an interaction layer array', function () {
    return expect(result.interaction).to.be.undefined;
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvZm9yX0JvdW5kZWRDb250ZXh0L3doZW5fcGFyc2luZ19ib3VuZGVkX2NvbnRleHRfanNvbl93aXRoX25vdGhpbmcuanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJjb250ZXh0IiwiYV9ib3VuZGVkX2NvbnRleHRfanNvbl93aXRoX25vdGhpbmciLCJyZXN1bHQiLCJib3VuZGVkQ29udGV4dE9iaiIsIkpTT04iLCJwYXJzZSIsImJvdW5kZWRDb250ZXh0SnNvbiIsIkJvdW5kZWRDb250ZXh0IiwiYXBwbGljYXRpb24iLCJib3VuZGVkQ29udGV4dCIsImJvdW5kZWRDb250ZXh0TmFtZSIsImNvcmUiLCJpbnRlcmFjdGlvbiIsIml0IiwiZXhwZWN0IiwidG8iLCJiZSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7QUFJQTs7QUFDQTs7QUFMQTs7OztBQU9BQSxTQUFTLHFEQUFULEVBQWdFLFlBQU07QUFDbEUsTUFBSUMsVUFBVSxJQUFJQyx3RUFBSixFQUFkO0FBQ0E7OztBQUdBLE1BQUlDLFNBQVMsSUFBYjtBQUNBLE1BQUlDLG9CQUFvQkMsS0FBS0MsS0FBTCxDQUFXTCxRQUFRTSxrQkFBbkIsQ0FBeEI7O0FBR0EsR0FBQyxzQkFBYztBQUNYSixhQUFTLElBQUlLLDhCQUFKLENBQW1CSixrQkFBa0JLLFdBQXJDLEVBQWtETCxrQkFBa0JNLGNBQXBFLEVBQW9GTixrQkFBa0JPLGtCQUF0RyxFQUEwSFAsa0JBQWtCUSxJQUE1SSxFQUFrSlIsa0JBQWtCUyxXQUFwSyxDQUFUO0FBQ0gsR0FGRDtBQUdBQyxLQUFHLDJEQUFILEVBQWdFO0FBQUEsV0FBTUMsT0FBT1osT0FBT00sV0FBZCxFQUEyQk8sRUFBM0IsQ0FBOEJDLEVBQTlCLENBQWlDQyxTQUF2QztBQUFBLEdBQWhFO0FBQ0FKLEtBQUcsOERBQUgsRUFBbUU7QUFBQSxXQUFNQyxPQUFPWixPQUFPTyxjQUFkLEVBQThCTSxFQUE5QixDQUFpQ0MsRUFBakMsQ0FBb0NDLFNBQTFDO0FBQUEsR0FBbkU7QUFDQUosS0FBRyxnRUFBSCxFQUFxRTtBQUFBLFdBQU1DLE9BQU9aLE9BQU9RLGtCQUFkLEVBQWtDSyxFQUFsQyxDQUFxQ0MsRUFBckMsQ0FBd0NDLFNBQTlDO0FBQUEsR0FBckU7QUFDQUosS0FBRyxnREFBSCxFQUFxRDtBQUFBLFdBQU1DLE9BQU9aLE9BQU9TLElBQWQsRUFBb0JJLEVBQXBCLENBQXVCQyxFQUF2QixDQUEwQkMsU0FBaEM7QUFBQSxHQUFyRDtBQUNBSixLQUFHLG9FQUFILEVBQXlFO0FBQUEsV0FBTUMsT0FBT1osT0FBT1UsV0FBZCxFQUEyQkcsRUFBM0IsQ0FBOEJDLEVBQTlCLENBQWlDQyxTQUF2QztBQUFBLEdBQXpFO0FBRUgsQ0FsQkQiLCJmaWxlIjoid2hlbl9wYXJzaW5nX2JvdW5kZWRfY29udGV4dF9qc29uX3dpdGhfbm90aGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IGFfYm91bmRlZF9jb250ZXh0X2pzb25fd2l0aF9ub3RoaW5nIH0gZnJvbSAnLi9naXZlbi9hX2JvdW5kZWRfY29udGV4dF9qc29uX3dpdGhfbm90aGluZyc7XG5pbXBvcnQgeyBCb3VuZGVkQ29udGV4dCB9IGZyb20gJy4uL0JvdW5kZWRDb250ZXh0JztcblxuZGVzY3JpYmUoJ3doZW4gcGFyc2luZyBhIGJvdW5kZWQgY29udGV4dCBqc29uIHdpdGggZXZlcnl0aGluZycsICgpID0+IHtcbiAgICBsZXQgY29udGV4dCA9IG5ldyBhX2JvdW5kZWRfY29udGV4dF9qc29uX3dpdGhfbm90aGluZygpO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtCb3VuZGVkQ29udGV4dH1cbiAgICAgKi9cbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICBsZXQgYm91bmRlZENvbnRleHRPYmogPSBKU09OLnBhcnNlKGNvbnRleHQuYm91bmRlZENvbnRleHRKc29uKTtcblxuXG4gICAgKGJlZm9yZUVhY2ggPT4ge1xuICAgICAgICByZXN1bHQgPSBuZXcgQm91bmRlZENvbnRleHQoYm91bmRlZENvbnRleHRPYmouYXBwbGljYXRpb24sIGJvdW5kZWRDb250ZXh0T2JqLmJvdW5kZWRDb250ZXh0LCBib3VuZGVkQ29udGV4dE9iai5ib3VuZGVkQ29udGV4dE5hbWUsIGJvdW5kZWRDb250ZXh0T2JqLmNvcmUsIGJvdW5kZWRDb250ZXh0T2JqLmludGVyYWN0aW9uKTtcbiAgICB9KSgpO1xuICAgIGl0KCdzaG91bGQgY3JlYXRlIGEgYm91bmRlZCBjb250ZXh0IHdpdGhvdXQgYW4gYXBwbGljYXRpb24gaWQnLCAoKSA9PiBleHBlY3QocmVzdWx0LmFwcGxpY2F0aW9uKS50by5iZS51bmRlZmluZWQpO1xuICAgIGl0KCdzaG91bGQgY3JlYXRlIGEgYm91bmRlZCBjb250ZXh0IHdpdGhvdXQgYSBib3VuZGVkIGNvbnRleHQgaWQnLCAoKSA9PiBleHBlY3QocmVzdWx0LmJvdW5kZWRDb250ZXh0KS50by5iZS51bmRlZmluZWQpO1xuICAgIGl0KCdzaG91bGQgY3JlYXRlIGEgYm91bmRlZCBjb250ZXh0IHdpdGhvdXQgYSBib3VuZGVkIGNvbnRleHQgbmFtZScsICgpID0+IGV4cGVjdChyZXN1bHQuYm91bmRlZENvbnRleHROYW1lKS50by5iZS51bmRlZmluZWQpO1xuICAgIGl0KCdzaG91bGQgY3JlYXRlIGEgYm91bmRlZCBjb250ZXh0IHdpdGhvdXQgYSBjb3JlJywgKCkgPT4gZXhwZWN0KHJlc3VsdC5jb3JlKS50by5iZS51bmRlZmluZWQpO1xuICAgIGl0KCdzaG91bGQgY3JlYXRlIGEgYm91bmRlZCBjb250ZXh0IHdpdGhvdXQgYW4gaW50ZXJhY3Rpb24gbGF5ZXIgYXJyYXknLCAoKSA9PiBleHBlY3QocmVzdWx0LmludGVyYWN0aW9uKS50by5iZS51bmRlZmluZWQpO1xuICAgIFxufSk7Il19