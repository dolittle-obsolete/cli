'use strict';

var _all_supported_boiler_plates = require('./given/all_supported_boiler_plates');

describe('when asking for javascript boiler plates', function () {
    var context = new _all_supported_boiler_plates.all_supported_boiler_plates();
    var result = null;
    var expected = [context.boilerPlates[2], context.boilerPlates[3]];

    (function (beforeEach) {
        result = context.boilerPlatesManager.boilerPlatesByLanguage('javascript');
    })();

    it('should return exact number of boiler plates', function () {
        return result.length.should.equal(2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvd2hlbl9hc2tpbmdfZm9yX2phdmFzY3JpcHRfYm9pbGVyX3BsYXRlcy5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsImNvbnRleHQiLCJhbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMiLCJyZXN1bHQiLCJleHBlY3RlZCIsImJvaWxlclBsYXRlcyIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJib2lsZXJQbGF0ZXNCeUxhbmd1YWdlIiwiaXQiLCJsZW5ndGgiLCJzaG91bGQiLCJlcXVhbCIsImZvckVhY2giLCJfIiwiaW5kZXgiLCJkZWVwIiwiaW5jbHVkZSJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7QUFFQUEsU0FBUywwQ0FBVCxFQUFxRCxZQUFNO0FBQ3ZELFFBQUlDLFVBQVUsSUFBSUMsd0RBQUosRUFBZDtBQUNBLFFBQUlDLFNBQVMsSUFBYjtBQUNBLFFBQUlDLFdBQVcsQ0FDWEgsUUFBUUksWUFBUixDQUFxQixDQUFyQixDQURXLEVBRVhKLFFBQVFJLFlBQVIsQ0FBcUIsQ0FBckIsQ0FGVyxDQUFmOztBQUtBLEtBQUMsc0JBQWM7QUFDWEYsaUJBQVNGLFFBQVFLLG1CQUFSLENBQTRCQyxzQkFBNUIsQ0FBbUQsWUFBbkQsQ0FBVDtBQUNILEtBRkQ7O0FBSUFDLE9BQUcsNkNBQUgsRUFBa0Q7QUFBQSxlQUFNTCxPQUFPTSxNQUFQLENBQWNDLE1BQWQsQ0FBcUJDLEtBQXJCLENBQTJCLENBQTNCLENBQU47QUFBQSxLQUFsRDtBQUNBSCxPQUFHLDBDQUFILEVBQStDO0FBQUEsZUFBTUwsT0FBT1MsT0FBUCxDQUFlLFVBQUNDLENBQUQsRUFBSUMsS0FBSjtBQUFBLG1CQUFjRCxFQUFFSCxNQUFGLENBQVNLLElBQVQsQ0FBY0MsT0FBZCxDQUFzQlosU0FBU1UsS0FBVCxDQUF0QixDQUFkO0FBQUEsU0FBZixDQUFOO0FBQUEsS0FBL0M7QUFDSCxDQWRELEUsQ0FQQSIsImZpbGUiOiJ3aGVuX2Fza2luZ19mb3JfamF2YXNjcmlwdF9ib2lsZXJfcGxhdGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQge8KgYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzIH0gZnJvbSAnLi9naXZlbi9hbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMnO1xuXG5kZXNjcmliZSgnd2hlbiBhc2tpbmcgZm9yIGphdmFzY3JpcHQgYm9pbGVyIHBsYXRlcycsICgpID0+IHtcbiAgICBsZXQgY29udGV4dCA9IG5ldyBhbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMoKTtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICBsZXQgZXhwZWN0ZWQgPSBbXG4gICAgICAgIGNvbnRleHQuYm9pbGVyUGxhdGVzWzJdLFxuICAgICAgICBjb250ZXh0LmJvaWxlclBsYXRlc1szXVxuICAgIF07XG5cbiAgICAoYmVmb3JlRWFjaCA9PiB7XG4gICAgICAgIHJlc3VsdCA9IGNvbnRleHQuYm9pbGVyUGxhdGVzTWFuYWdlci5ib2lsZXJQbGF0ZXNCeUxhbmd1YWdlKCdqYXZhc2NyaXB0Jyk7XG4gICAgfSkoKTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGV4YWN0IG51bWJlciBvZiBib2lsZXIgcGxhdGVzJywgKCkgPT4gcmVzdWx0Lmxlbmd0aC5zaG91bGQuZXF1YWwoMikpO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBleHBlY3RlZCBib2lsZXIgcGxhdGVzJywgKCkgPT4gcmVzdWx0LmZvckVhY2goKF8sIGluZGV4KSA9PiBfLnNob3VsZC5kZWVwLmluY2x1ZGUoZXhwZWN0ZWRbaW5kZXhdKSkpO1xufSk7Il19