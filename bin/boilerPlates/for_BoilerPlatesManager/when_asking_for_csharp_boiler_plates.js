'use strict';

var _all_supported_boiler_plates = require('./given/all_supported_boiler_plates');

describe('when asking for csharp boiler plates', function () {
    var context = new _all_supported_boiler_plates.all_supported_boiler_plates();
    var result = null;
    var expected = [context.boilerPlates[0], context.boilerPlates[1]];

    (function (beforeEach) {
        result = context.boilerPlatesManager.boilerPlatesByLanguage('csharp');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvd2hlbl9hc2tpbmdfZm9yX2NzaGFycF9ib2lsZXJfcGxhdGVzLmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiY29udGV4dCIsImFsbF9zdXBwb3J0ZWRfYm9pbGVyX3BsYXRlcyIsInJlc3VsdCIsImV4cGVjdGVkIiwiYm9pbGVyUGxhdGVzIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImJvaWxlclBsYXRlc0J5TGFuZ3VhZ2UiLCJpdCIsImxlbmd0aCIsInNob3VsZCIsImVxdWFsIiwiZm9yRWFjaCIsIl8iLCJpbmRleCIsImRlZXAiLCJpbmNsdWRlIl0sIm1hcHBpbmdzIjoiOztBQUtBOztBQUVBQSxTQUFTLHNDQUFULEVBQWlELFlBQU07QUFDbkQsUUFBSUMsVUFBVSxJQUFJQyx3REFBSixFQUFkO0FBQ0EsUUFBSUMsU0FBUyxJQUFiO0FBQ0EsUUFBSUMsV0FBVyxDQUNYSCxRQUFRSSxZQUFSLENBQXFCLENBQXJCLENBRFcsRUFFWEosUUFBUUksWUFBUixDQUFxQixDQUFyQixDQUZXLENBQWY7O0FBS0EsS0FBQyxzQkFBYztBQUNYRixpQkFBU0YsUUFBUUssbUJBQVIsQ0FBNEJDLHNCQUE1QixDQUFtRCxRQUFuRCxDQUFUO0FBQ0gsS0FGRDs7QUFLQUMsT0FBRyw2Q0FBSCxFQUFrRDtBQUFBLGVBQU1MLE9BQU9NLE1BQVAsQ0FBY0MsTUFBZCxDQUFxQkMsS0FBckIsQ0FBMkIsQ0FBM0IsQ0FBTjtBQUFBLEtBQWxEO0FBQ0FILE9BQUcsMENBQUgsRUFBK0M7QUFBQSxlQUFNTCxPQUFPUyxPQUFQLENBQWUsVUFBQ0MsQ0FBRCxFQUFJQyxLQUFKO0FBQUEsbUJBQWNELEVBQUVILE1BQUYsQ0FBU0ssSUFBVCxDQUFjQyxPQUFkLENBQXNCWixTQUFTVSxLQUFULENBQXRCLENBQWQ7QUFBQSxTQUFmLENBQU47QUFBQSxLQUEvQztBQUNILENBZkQsRSxDQVBBIiwiZmlsZSI6IndoZW5fYXNraW5nX2Zvcl9jc2hhcnBfYm9pbGVyX3BsYXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaW1wb3J0IHvCoGFsbF9zdXBwb3J0ZWRfYm9pbGVyX3BsYXRlcyB9IGZyb20gJy4vZ2l2ZW4vYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzJztcblxuZGVzY3JpYmUoJ3doZW4gYXNraW5nIGZvciBjc2hhcnAgYm9pbGVyIHBsYXRlcycsICgpID0+IHtcbiAgICBsZXQgY29udGV4dCA9IG5ldyBhbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMoKTtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICBsZXQgZXhwZWN0ZWQgPSBbXG4gICAgICAgIGNvbnRleHQuYm9pbGVyUGxhdGVzWzBdLFxuICAgICAgICBjb250ZXh0LmJvaWxlclBsYXRlc1sxXVxuICAgIF07XG5cbiAgICAoYmVmb3JlRWFjaCA9PiB7XG4gICAgICAgIHJlc3VsdCA9IGNvbnRleHQuYm9pbGVyUGxhdGVzTWFuYWdlci5ib2lsZXJQbGF0ZXNCeUxhbmd1YWdlKCdjc2hhcnAnKTtcbiAgICB9KSgpO1xuXG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBleGFjdCBudW1iZXIgb2YgYm9pbGVyIHBsYXRlcycsICgpID0+IHJlc3VsdC5sZW5ndGguc2hvdWxkLmVxdWFsKDIpKTtcbiAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgZXhwZWN0ZWQgYm9pbGVyIHBsYXRlcycsICgpID0+IHJlc3VsdC5mb3JFYWNoKChfLCBpbmRleCkgPT4gXy5zaG91bGQuZGVlcC5pbmNsdWRlKGV4cGVjdGVkW2luZGV4XSkpKTtcbn0pOyJdfQ==