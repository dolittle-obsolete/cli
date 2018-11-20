'use strict';

var _a_system_that_returns_a_bounded_context_configuration_without_a_core_language = require('./given/a_system_that_returns_a_bounded_context_configuration_without_a_core_language');

describe('when getting a bounded context configuration that has a core without a language', function () {
    var context = new _a_system_that_returns_a_bounded_context_configuration_without_a_core_language.a_system_that_returns_a_bounded_context_configuration_without_a_core_language();

    it('should throw an exception', function () {
        return expect(function () {
            return context.artifactsManager._getNearestBoundedContextConfig('somePath');
        }).to.throw();
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvZm9yX0FydGlmYWN0c01hbmFnZXIvZm9yX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZy93aGVuX2dldHRpbmdfYV9ib3VuZGVkX2NvbnRleHRfY29uZmlndXJhdGlvbl90aGF0X2hhc19hX2NvcmVfd2l0aG91dF9hX2xhbmd1YWdlLmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiY29udGV4dCIsImFfc3lzdGVtX3RoYXRfcmV0dXJuc19hX2JvdW5kZWRfY29udGV4dF9jb25maWd1cmF0aW9uX3dpdGhvdXRfYV9jb3JlX2xhbmd1YWdlIiwiaXQiLCJleHBlY3QiLCJhcnRpZmFjdHNNYW5hZ2VyIiwiX2dldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyIsInRvIiwidGhyb3ciXSwibWFwcGluZ3MiOiI7O0FBQ0E7O0FBRUFBLFNBQVMsaUZBQVQsRUFBNEYsWUFBTTtBQUM5RixRQUFJQyxVQUFVLElBQUlDLDRKQUFKLEVBQWQ7O0FBRUFDLE9BQUcsMkJBQUgsRUFBZ0M7QUFBQSxlQUM1QkMsT0FBUTtBQUFBLG1CQUFNSCxRQUFRSSxnQkFBUixDQUF5QkMsK0JBQXpCLENBQXlELFVBQXpELENBQU47QUFBQSxTQUFSLEVBQW9GQyxFQUFwRixDQUF1RkMsS0FBdkYsRUFENEI7QUFBQSxLQUFoQztBQUdILENBTkQiLCJmaWxlIjoid2hlbl9nZXR0aW5nX2FfYm91bmRlZF9jb250ZXh0X2NvbmZpZ3VyYXRpb25fdGhhdF9oYXNfYV9jb3JlX3dpdGhvdXRfYV9sYW5ndWFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgYV9zeXN0ZW1fdGhhdF9yZXR1cm5zX2FfYm91bmRlZF9jb250ZXh0X2NvbmZpZ3VyYXRpb25fd2l0aG91dF9hX2NvcmVfbGFuZ3VhZ2UgfSBmcm9tICcuL2dpdmVuL2Ffc3lzdGVtX3RoYXRfcmV0dXJuc19hX2JvdW5kZWRfY29udGV4dF9jb25maWd1cmF0aW9uX3dpdGhvdXRfYV9jb3JlX2xhbmd1YWdlJztcblxuZGVzY3JpYmUoJ3doZW4gZ2V0dGluZyBhIGJvdW5kZWQgY29udGV4dCBjb25maWd1cmF0aW9uIHRoYXQgaGFzIGEgY29yZSB3aXRob3V0IGEgbGFuZ3VhZ2UnLCAoKSA9PiB7XG4gICAgbGV0IGNvbnRleHQgPSBuZXcgYV9zeXN0ZW1fdGhhdF9yZXR1cm5zX2FfYm91bmRlZF9jb250ZXh0X2NvbmZpZ3VyYXRpb25fd2l0aG91dF9hX2NvcmVfbGFuZ3VhZ2UoKTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXhjZXB0aW9uJywgKCkgPT4gXG4gICAgICAgIGV4cGVjdCggKCkgPT4gY29udGV4dC5hcnRpZmFjdHNNYW5hZ2VyLl9nZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWcoJ3NvbWVQYXRoJykpLnRvLnRocm93KCkpO1xuXG59KTsiXX0=