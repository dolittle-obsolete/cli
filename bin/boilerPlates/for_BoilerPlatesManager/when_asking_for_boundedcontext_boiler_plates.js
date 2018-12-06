'use strict';

var _all_supported_boiler_plates = require('./given/all_supported_boiler_plates');

describe('when asking for boundedcontext boiler plates', function () {
    var context = new _all_supported_boiler_plates.all_supported_boiler_plates();
    var result = null;
    var expected = [context.boilerPlates[1], context.boilerPlates[3]];

    (function (beforeEach) {
        result = context.boilerPlatesManager.boilerPlatesByType('boundedContext');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvd2hlbl9hc2tpbmdfZm9yX2JvdW5kZWRjb250ZXh0X2JvaWxlcl9wbGF0ZXMuanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJjb250ZXh0IiwiYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzIiwicmVzdWx0IiwiZXhwZWN0ZWQiLCJib2lsZXJQbGF0ZXMiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiYm9pbGVyUGxhdGVzQnlUeXBlIiwiaXQiLCJsZW5ndGgiLCJzaG91bGQiLCJlcXVhbCIsImZvckVhY2giLCJfIiwiaW5kZXgiLCJkZWVwIiwiaW5jbHVkZSJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7QUFFQUEsU0FBUyw4Q0FBVCxFQUF5RCxZQUFNO0FBQzNELFFBQUlDLFVBQVUsSUFBSUMsd0RBQUosRUFBZDtBQUNBLFFBQUlDLFNBQVMsSUFBYjtBQUNBLFFBQUlDLFdBQVcsQ0FDWEgsUUFBUUksWUFBUixDQUFxQixDQUFyQixDQURXLEVBRVhKLFFBQVFJLFlBQVIsQ0FBcUIsQ0FBckIsQ0FGVyxDQUFmOztBQUtBLEtBQUMsc0JBQWM7QUFDWEYsaUJBQVNGLFFBQVFLLG1CQUFSLENBQTRCQyxrQkFBNUIsQ0FBK0MsZ0JBQS9DLENBQVQ7QUFDSCxLQUZEOztBQUlBQyxPQUFHLDZDQUFILEVBQWtEO0FBQUEsZUFBTUwsT0FBT00sTUFBUCxDQUFjQyxNQUFkLENBQXFCQyxLQUFyQixDQUEyQixDQUEzQixDQUFOO0FBQUEsS0FBbEQ7QUFDQUgsT0FBRywwQ0FBSCxFQUErQztBQUFBLGVBQU1MLE9BQU9TLE9BQVAsQ0FBZSxVQUFDQyxDQUFELEVBQUlDLEtBQUo7QUFBQSxtQkFBY0QsRUFBRUgsTUFBRixDQUFTSyxJQUFULENBQWNDLE9BQWQsQ0FBc0JaLFNBQVNVLEtBQVQsQ0FBdEIsQ0FBZDtBQUFBLFNBQWYsQ0FBTjtBQUFBLEtBQS9DO0FBQ0gsQ0FkRCxFLENBUEEiLCJmaWxlIjoid2hlbl9hc2tpbmdfZm9yX2JvdW5kZWRjb250ZXh0X2JvaWxlcl9wbGF0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmltcG9ydCB7wqBhbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMgfSBmcm9tICcuL2dpdmVuL2FsbF9zdXBwb3J0ZWRfYm9pbGVyX3BsYXRlcyc7XG5cbmRlc2NyaWJlKCd3aGVuIGFza2luZyBmb3IgYm91bmRlZGNvbnRleHQgYm9pbGVyIHBsYXRlcycsICgpID0+IHtcbiAgICBsZXQgY29udGV4dCA9IG5ldyBhbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMoKTtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICBsZXQgZXhwZWN0ZWQgPSBbXG4gICAgICAgIGNvbnRleHQuYm9pbGVyUGxhdGVzWzFdLFxuICAgICAgICBjb250ZXh0LmJvaWxlclBsYXRlc1szXVxuICAgIF07XG5cbiAgICAoYmVmb3JlRWFjaCA9PiB7XG4gICAgICAgIHJlc3VsdCA9IGNvbnRleHQuYm9pbGVyUGxhdGVzTWFuYWdlci5ib2lsZXJQbGF0ZXNCeVR5cGUoJ2JvdW5kZWRDb250ZXh0Jyk7XG4gICAgfSkoKTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGV4YWN0IG51bWJlciBvZiBib2lsZXIgcGxhdGVzJywgKCkgPT4gcmVzdWx0Lmxlbmd0aC5zaG91bGQuZXF1YWwoMikpO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBleHBlY3RlZCBib2lsZXIgcGxhdGVzJywgKCkgPT4gcmVzdWx0LmZvckVhY2goKF8sIGluZGV4KSA9PiBfLnNob3VsZC5kZWVwLmluY2x1ZGUoZXhwZWN0ZWRbaW5kZXhdKSkpO1xufSk7Il19