'use strict';

var _all_supported_boiler_plates = require('./given/all_supported_boiler_plates');

describe('when asking for all boiler plates', function () {
    var context = new _all_supported_boiler_plates.all_supported_boiler_plates();
    var result = null;

    (function (beforeEach) {
        result = context.boilerPlatesManager.boilerPlates;
    })();

    it('should return same number of boiler plates', function () {
        return result.length.should.equal(context.boilerPlates.length);
    });
    it('should return the expected boiler plates', function () {
        return result.forEach(function (_, index) {
            return _.should.deep.include(context.boilerPlates[index]);
        });
    });
}); /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Dolittle. All rights reserved.
     *  Licensed under the MIT License. See LICENSE in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvd2hlbl9hc2tpbmdfZm9yX2FsbF9ib2lsZXJfcGxhdGVzLmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiY29udGV4dCIsImFsbF9zdXBwb3J0ZWRfYm9pbGVyX3BsYXRlcyIsInJlc3VsdCIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJib2lsZXJQbGF0ZXMiLCJpdCIsImxlbmd0aCIsInNob3VsZCIsImVxdWFsIiwiZm9yRWFjaCIsIl8iLCJpbmRleCIsImRlZXAiLCJpbmNsdWRlIl0sIm1hcHBpbmdzIjoiOztBQUtBOztBQUVBQSxTQUFTLG1DQUFULEVBQThDLFlBQU07QUFDaEQsUUFBSUMsVUFBVSxJQUFJQyx3REFBSixFQUFkO0FBQ0EsUUFBSUMsU0FBUyxJQUFiOztBQUVBLEtBQUMsc0JBQWM7QUFDWEEsaUJBQVNGLFFBQVFHLG1CQUFSLENBQTRCQyxZQUFyQztBQUNILEtBRkQ7O0FBSUFDLE9BQUcsNENBQUgsRUFBaUQ7QUFBQSxlQUFNSCxPQUFPSSxNQUFQLENBQWNDLE1BQWQsQ0FBcUJDLEtBQXJCLENBQTJCUixRQUFRSSxZQUFSLENBQXFCRSxNQUFoRCxDQUFOO0FBQUEsS0FBakQ7QUFDQUQsT0FBRywwQ0FBSCxFQUErQztBQUFBLGVBQU1ILE9BQU9PLE9BQVAsQ0FBZSxVQUFDQyxDQUFELEVBQUlDLEtBQUo7QUFBQSxtQkFBY0QsRUFBRUgsTUFBRixDQUFTSyxJQUFULENBQWNDLE9BQWQsQ0FBc0JiLFFBQVFJLFlBQVIsQ0FBcUJPLEtBQXJCLENBQXRCLENBQWQ7QUFBQSxTQUFmLENBQU47QUFBQSxLQUEvQztBQUNILENBVkQsRSxDQVBBIiwiZmlsZSI6IndoZW5fYXNraW5nX2Zvcl9hbGxfYm9pbGVyX3BsYXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaW1wb3J0IHvCoGFsbF9zdXBwb3J0ZWRfYm9pbGVyX3BsYXRlcyB9IGZyb20gJy4vZ2l2ZW4vYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzJztcblxuZGVzY3JpYmUoJ3doZW4gYXNraW5nIGZvciBhbGwgYm9pbGVyIHBsYXRlcycsICgpID0+IHtcbiAgICBsZXQgY29udGV4dCA9IG5ldyBhbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMoKTtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgIChiZWZvcmVFYWNoID0+IHtcbiAgICAgICAgcmVzdWx0ID0gY29udGV4dC5ib2lsZXJQbGF0ZXNNYW5hZ2VyLmJvaWxlclBsYXRlcztcbiAgICB9KSgpO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gc2FtZSBudW1iZXIgb2YgYm9pbGVyIHBsYXRlcycsICgpID0+IHJlc3VsdC5sZW5ndGguc2hvdWxkLmVxdWFsKGNvbnRleHQuYm9pbGVyUGxhdGVzLmxlbmd0aCkpO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBleHBlY3RlZCBib2lsZXIgcGxhdGVzJywgKCkgPT4gcmVzdWx0LmZvckVhY2goKF8sIGluZGV4KSA9PiBfLnNob3VsZC5kZWVwLmluY2x1ZGUoY29udGV4dC5ib2lsZXJQbGF0ZXNbaW5kZXhdKSkpO1xufSk7Il19