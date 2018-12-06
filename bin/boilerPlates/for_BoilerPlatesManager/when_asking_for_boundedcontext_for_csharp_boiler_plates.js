'use strict';

var _all_supported_boiler_plates = require('./given/all_supported_boiler_plates');

describe('when asking for boundedcontext for csharp boiler plates', function () {
    var context = new _all_supported_boiler_plates.all_supported_boiler_plates();
    var result = null;
    var expected = [context.boilerPlates[1]];

    (function (beforeEach) {
        result = context.boilerPlatesManager.boilerPlatesByLanguageAndType('csharp', 'boundedContext');
    })();

    it('should return exact number of boiler plates', function () {
        return result.length.should.equal(1);
    });
    it('should return the expected boiler plates', function () {
        return result.forEach(function (_, index) {
            return _.should.deep.include(expected[index]);
        });
    });
}); /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Dolittle. All rights reserved.
     *  Licensed under the MIT License. See LICENSE in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvd2hlbl9hc2tpbmdfZm9yX2JvdW5kZWRjb250ZXh0X2Zvcl9jc2hhcnBfYm9pbGVyX3BsYXRlcy5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsImNvbnRleHQiLCJhbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMiLCJyZXN1bHQiLCJleHBlY3RlZCIsImJvaWxlclBsYXRlcyIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSIsIml0IiwibGVuZ3RoIiwic2hvdWxkIiwiZXF1YWwiLCJmb3JFYWNoIiwiXyIsImluZGV4IiwiZGVlcCIsImluY2x1ZGUiXSwibWFwcGluZ3MiOiI7O0FBS0E7O0FBRUFBLFNBQVMseURBQVQsRUFBb0UsWUFBTTtBQUN0RSxRQUFJQyxVQUFVLElBQUlDLHdEQUFKLEVBQWQ7QUFDQSxRQUFJQyxTQUFTLElBQWI7QUFDQSxRQUFJQyxXQUFXLENBQ1hILFFBQVFJLFlBQVIsQ0FBcUIsQ0FBckIsQ0FEVyxDQUFmOztBQUlBLEtBQUMsc0JBQWM7QUFDWEYsaUJBQVNGLFFBQVFLLG1CQUFSLENBQTRCQyw2QkFBNUIsQ0FBMEQsUUFBMUQsRUFBbUUsZ0JBQW5FLENBQVQ7QUFDSCxLQUZEOztBQUlBQyxPQUFHLDZDQUFILEVBQWtEO0FBQUEsZUFBTUwsT0FBT00sTUFBUCxDQUFjQyxNQUFkLENBQXFCQyxLQUFyQixDQUEyQixDQUEzQixDQUFOO0FBQUEsS0FBbEQ7QUFDQUgsT0FBRywwQ0FBSCxFQUErQztBQUFBLGVBQU1MLE9BQU9TLE9BQVAsQ0FBZSxVQUFDQyxDQUFELEVBQUlDLEtBQUo7QUFBQSxtQkFBY0QsRUFBRUgsTUFBRixDQUFTSyxJQUFULENBQWNDLE9BQWQsQ0FBc0JaLFNBQVNVLEtBQVQsQ0FBdEIsQ0FBZDtBQUFBLFNBQWYsQ0FBTjtBQUFBLEtBQS9DO0FBQ0gsQ0FiRCxFLENBUEEiLCJmaWxlIjoid2hlbl9hc2tpbmdfZm9yX2JvdW5kZWRjb250ZXh0X2Zvcl9jc2hhcnBfYm9pbGVyX3BsYXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaW1wb3J0IHvCoGFsbF9zdXBwb3J0ZWRfYm9pbGVyX3BsYXRlcyB9IGZyb20gJy4vZ2l2ZW4vYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzJztcblxuZGVzY3JpYmUoJ3doZW4gYXNraW5nIGZvciBib3VuZGVkY29udGV4dCBmb3IgY3NoYXJwIGJvaWxlciBwbGF0ZXMnLCAoKSA9PiB7XG4gICAgbGV0IGNvbnRleHQgPSBuZXcgYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzKCk7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgbGV0IGV4cGVjdGVkID0gW1xuICAgICAgICBjb250ZXh0LmJvaWxlclBsYXRlc1sxXVxuICAgIF07XG5cbiAgICAoYmVmb3JlRWFjaCA9PiB7XG4gICAgICAgIHJlc3VsdCA9IGNvbnRleHQuYm9pbGVyUGxhdGVzTWFuYWdlci5ib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSgnY3NoYXJwJywnYm91bmRlZENvbnRleHQnKTtcbiAgICB9KSgpO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZXhhY3QgbnVtYmVyIG9mIGJvaWxlciBwbGF0ZXMnLCAoKSA9PiByZXN1bHQubGVuZ3RoLnNob3VsZC5lcXVhbCgxKSk7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGV4cGVjdGVkIGJvaWxlciBwbGF0ZXMnLCAoKSA9PiByZXN1bHQuZm9yRWFjaCgoXywgaW5kZXgpID0+IF8uc2hvdWxkLmRlZXAuaW5jbHVkZShleHBlY3RlZFtpbmRleF0pKSk7XG59KTsiXX0=