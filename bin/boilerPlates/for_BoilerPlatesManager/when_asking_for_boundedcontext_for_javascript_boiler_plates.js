'use strict';

var _all_supported_boiler_plates = require('./given/all_supported_boiler_plates');

describe('when asking for boundedcontext for javascript boiler plates', function () {
    var context = new _all_supported_boiler_plates.all_supported_boiler_plates();
    var result = null;
    var expected = [context.boilerPlates[3]];

    (function (beforeEach) {
        result = context.boilerPlatesManager.boilerPlatesByLanguageAndType('javascript', 'boundedContext');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvd2hlbl9hc2tpbmdfZm9yX2JvdW5kZWRjb250ZXh0X2Zvcl9qYXZhc2NyaXB0X2JvaWxlcl9wbGF0ZXMuanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJjb250ZXh0IiwiYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzIiwicmVzdWx0IiwiZXhwZWN0ZWQiLCJib2lsZXJQbGF0ZXMiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUiLCJpdCIsImxlbmd0aCIsInNob3VsZCIsImVxdWFsIiwiZm9yRWFjaCIsIl8iLCJpbmRleCIsImRlZXAiLCJpbmNsdWRlIl0sIm1hcHBpbmdzIjoiOztBQUtBOztBQUVBQSxTQUFTLDZEQUFULEVBQXdFLFlBQU07QUFDMUUsUUFBSUMsVUFBVSxJQUFJQyx3REFBSixFQUFkO0FBQ0EsUUFBSUMsU0FBUyxJQUFiO0FBQ0EsUUFBSUMsV0FBVyxDQUNYSCxRQUFRSSxZQUFSLENBQXFCLENBQXJCLENBRFcsQ0FBZjs7QUFJQSxLQUFDLHNCQUFjO0FBQ1hGLGlCQUFTRixRQUFRSyxtQkFBUixDQUE0QkMsNkJBQTVCLENBQTBELFlBQTFELEVBQXVFLGdCQUF2RSxDQUFUO0FBQ0gsS0FGRDs7QUFJQUMsT0FBRyw2Q0FBSCxFQUFrRDtBQUFBLGVBQU1MLE9BQU9NLE1BQVAsQ0FBY0MsTUFBZCxDQUFxQkMsS0FBckIsQ0FBMkIsQ0FBM0IsQ0FBTjtBQUFBLEtBQWxEO0FBQ0FILE9BQUcsMENBQUgsRUFBK0M7QUFBQSxlQUFNTCxPQUFPUyxPQUFQLENBQWUsVUFBQ0MsQ0FBRCxFQUFJQyxLQUFKO0FBQUEsbUJBQWNELEVBQUVILE1BQUYsQ0FBU0ssSUFBVCxDQUFjQyxPQUFkLENBQXNCWixTQUFTVSxLQUFULENBQXRCLENBQWQ7QUFBQSxTQUFmLENBQU47QUFBQSxLQUEvQztBQUNILENBYkQsRSxDQVBBIiwiZmlsZSI6IndoZW5fYXNraW5nX2Zvcl9ib3VuZGVkY29udGV4dF9mb3JfamF2YXNjcmlwdF9ib2lsZXJfcGxhdGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQge8KgYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzIH0gZnJvbSAnLi9naXZlbi9hbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMnO1xuXG5kZXNjcmliZSgnd2hlbiBhc2tpbmcgZm9yIGJvdW5kZWRjb250ZXh0IGZvciBqYXZhc2NyaXB0IGJvaWxlciBwbGF0ZXMnLCAoKSA9PiB7XG4gICAgbGV0IGNvbnRleHQgPSBuZXcgYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzKCk7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgbGV0IGV4cGVjdGVkID0gW1xuICAgICAgICBjb250ZXh0LmJvaWxlclBsYXRlc1szXVxuICAgIF07XG5cbiAgICAoYmVmb3JlRWFjaCA9PiB7XG4gICAgICAgIHJlc3VsdCA9IGNvbnRleHQuYm9pbGVyUGxhdGVzTWFuYWdlci5ib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSgnamF2YXNjcmlwdCcsJ2JvdW5kZWRDb250ZXh0Jyk7XG4gICAgfSkoKTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGV4YWN0IG51bWJlciBvZiBib2lsZXIgcGxhdGVzJywgKCkgPT4gcmVzdWx0Lmxlbmd0aC5zaG91bGQuZXF1YWwoMSkpO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBleHBlY3RlZCBib2lsZXIgcGxhdGVzJywgKCkgPT4gcmVzdWx0LmZvckVhY2goKF8sIGluZGV4KSA9PiBfLnNob3VsZC5kZWVwLmluY2x1ZGUoZXhwZWN0ZWRbaW5kZXhdKSkpO1xufSk7Il19