'use strict';

var _all_supported_boiler_plates = require('./given/all_supported_boiler_plates');

describe('when asking for application boiler plates', function () {
    var context = new _all_supported_boiler_plates.all_supported_boiler_plates();
    var result = null;
    var expected = [context.boilerPlates[0], context.boilerPlates[2]];

    (function (beforeEach) {
        result = context.boilerPlatesManager.boilerPlatesByType('application');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvd2hlbl9hc2tpbmdfZm9yX2FwcGxpY2F0aW9uX2JvaWxlcl9wbGF0ZXMuanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJjb250ZXh0IiwiYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzIiwicmVzdWx0IiwiZXhwZWN0ZWQiLCJib2lsZXJQbGF0ZXMiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiYm9pbGVyUGxhdGVzQnlUeXBlIiwiaXQiLCJsZW5ndGgiLCJzaG91bGQiLCJlcXVhbCIsImZvckVhY2giLCJfIiwiaW5kZXgiLCJkZWVwIiwiaW5jbHVkZSJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7QUFFQUEsU0FBUywyQ0FBVCxFQUFzRCxZQUFNO0FBQ3hELFFBQUlDLFVBQVUsSUFBSUMsd0RBQUosRUFBZDtBQUNBLFFBQUlDLFNBQVMsSUFBYjtBQUNBLFFBQUlDLFdBQVcsQ0FDWEgsUUFBUUksWUFBUixDQUFxQixDQUFyQixDQURXLEVBRVhKLFFBQVFJLFlBQVIsQ0FBcUIsQ0FBckIsQ0FGVyxDQUFmOztBQUtBLEtBQUMsc0JBQWM7QUFDWEYsaUJBQVNGLFFBQVFLLG1CQUFSLENBQTRCQyxrQkFBNUIsQ0FBK0MsYUFBL0MsQ0FBVDtBQUNILEtBRkQ7O0FBSUFDLE9BQUcsNkNBQUgsRUFBa0Q7QUFBQSxlQUFNTCxPQUFPTSxNQUFQLENBQWNDLE1BQWQsQ0FBcUJDLEtBQXJCLENBQTJCLENBQTNCLENBQU47QUFBQSxLQUFsRDtBQUNBSCxPQUFHLDBDQUFILEVBQStDO0FBQUEsZUFBTUwsT0FBT1MsT0FBUCxDQUFlLFVBQUNDLENBQUQsRUFBSUMsS0FBSjtBQUFBLG1CQUFjRCxFQUFFSCxNQUFGLENBQVNLLElBQVQsQ0FBY0MsT0FBZCxDQUFzQlosU0FBU1UsS0FBVCxDQUF0QixDQUFkO0FBQUEsU0FBZixDQUFOO0FBQUEsS0FBL0M7QUFDSCxDQWRELEUsQ0FQQSIsImZpbGUiOiJ3aGVuX2Fza2luZ19mb3JfYXBwbGljYXRpb25fYm9pbGVyX3BsYXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaW1wb3J0IHvCoGFsbF9zdXBwb3J0ZWRfYm9pbGVyX3BsYXRlcyB9IGZyb20gJy4vZ2l2ZW4vYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzJztcblxuZGVzY3JpYmUoJ3doZW4gYXNraW5nIGZvciBhcHBsaWNhdGlvbiBib2lsZXIgcGxhdGVzJywgKCkgPT4ge1xuICAgIGxldCBjb250ZXh0ID0gbmV3IGFsbF9zdXBwb3J0ZWRfYm9pbGVyX3BsYXRlcygpO1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIGxldCBleHBlY3RlZCA9IFtcbiAgICAgICAgY29udGV4dC5ib2lsZXJQbGF0ZXNbMF0sXG4gICAgICAgIGNvbnRleHQuYm9pbGVyUGxhdGVzWzJdXG4gICAgXTtcblxuICAgIChiZWZvcmVFYWNoID0+IHtcbiAgICAgICAgcmVzdWx0ID0gY29udGV4dC5ib2lsZXJQbGF0ZXNNYW5hZ2VyLmJvaWxlclBsYXRlc0J5VHlwZSgnYXBwbGljYXRpb24nKTtcbiAgICB9KSgpO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZXhhY3QgbnVtYmVyIG9mIGJvaWxlciBwbGF0ZXMnLCAoKSA9PiByZXN1bHQubGVuZ3RoLnNob3VsZC5lcXVhbCgyKSk7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGV4cGVjdGVkIGJvaWxlciBwbGF0ZXMnLCAoKSA9PiByZXN1bHQuZm9yRWFjaCgoXywgaW5kZXgpID0+IF8uc2hvdWxkLmRlZXAuaW5jbHVkZShleHBlY3RlZFtpbmRleF0pKSk7XG59KTsiXX0=