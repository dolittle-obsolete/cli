'use strict';

var _all_supported_boiler_plates = require('./given/all_supported_boiler_plates');

describe('when asking for application for javascript boiler plates', function () {
    var context = new _all_supported_boiler_plates.all_supported_boiler_plates();
    var result = null;
    var expected = [context.boilerPlates[2]];

    (function (beforeEach) {
        result = context.boilerPlatesManager.boilerPlatesByLanguageAndType('javascript', 'application');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvd2hlbl9hc2tpbmdfZm9yX2FwcGxpY2F0aW9uX2Zvcl9qYXZhc2NyaXB0X2JvaWxlcl9wbGF0ZXMuanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJjb250ZXh0IiwiYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzIiwicmVzdWx0IiwiZXhwZWN0ZWQiLCJib2lsZXJQbGF0ZXMiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUiLCJpdCIsImxlbmd0aCIsInNob3VsZCIsImVxdWFsIiwiZm9yRWFjaCIsIl8iLCJpbmRleCIsImRlZXAiLCJpbmNsdWRlIl0sIm1hcHBpbmdzIjoiOztBQUtBOztBQUVBQSxTQUFTLDBEQUFULEVBQXFFLFlBQU07QUFDdkUsUUFBSUMsVUFBVSxJQUFJQyx3REFBSixFQUFkO0FBQ0EsUUFBSUMsU0FBUyxJQUFiO0FBQ0EsUUFBSUMsV0FBVyxDQUNYSCxRQUFRSSxZQUFSLENBQXFCLENBQXJCLENBRFcsQ0FBZjs7QUFJQSxLQUFDLHNCQUFjO0FBQ1hGLGlCQUFTRixRQUFRSyxtQkFBUixDQUE0QkMsNkJBQTVCLENBQTBELFlBQTFELEVBQXVFLGFBQXZFLENBQVQ7QUFDSCxLQUZEOztBQUlBQyxPQUFHLDZDQUFILEVBQWtEO0FBQUEsZUFBTUwsT0FBT00sTUFBUCxDQUFjQyxNQUFkLENBQXFCQyxLQUFyQixDQUEyQixDQUEzQixDQUFOO0FBQUEsS0FBbEQ7QUFDQUgsT0FBRywwQ0FBSCxFQUErQztBQUFBLGVBQU1MLE9BQU9TLE9BQVAsQ0FBZSxVQUFDQyxDQUFELEVBQUlDLEtBQUo7QUFBQSxtQkFBY0QsRUFBRUgsTUFBRixDQUFTSyxJQUFULENBQWNDLE9BQWQsQ0FBc0JaLFNBQVNVLEtBQVQsQ0FBdEIsQ0FBZDtBQUFBLFNBQWYsQ0FBTjtBQUFBLEtBQS9DO0FBQ0gsQ0FiRCxFLENBUEEiLCJmaWxlIjoid2hlbl9hc2tpbmdfZm9yX2FwcGxpY2F0aW9uX2Zvcl9qYXZhc2NyaXB0X2JvaWxlcl9wbGF0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmltcG9ydCB7wqBhbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMgfSBmcm9tICcuL2dpdmVuL2FsbF9zdXBwb3J0ZWRfYm9pbGVyX3BsYXRlcyc7XG5cbmRlc2NyaWJlKCd3aGVuIGFza2luZyBmb3IgYXBwbGljYXRpb24gZm9yIGphdmFzY3JpcHQgYm9pbGVyIHBsYXRlcycsICgpID0+IHtcbiAgICBsZXQgY29udGV4dCA9IG5ldyBhbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMoKTtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICBsZXQgZXhwZWN0ZWQgPSBbXG4gICAgICAgIGNvbnRleHQuYm9pbGVyUGxhdGVzWzJdXG4gICAgXTtcblxuICAgIChiZWZvcmVFYWNoID0+IHtcbiAgICAgICAgcmVzdWx0ID0gY29udGV4dC5ib2lsZXJQbGF0ZXNNYW5hZ2VyLmJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKCdqYXZhc2NyaXB0JywnYXBwbGljYXRpb24nKTtcbiAgICB9KSgpO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZXhhY3QgbnVtYmVyIG9mIGJvaWxlciBwbGF0ZXMnLCAoKSA9PiByZXN1bHQubGVuZ3RoLnNob3VsZC5lcXVhbCgxKSk7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdGhlIGV4cGVjdGVkIGJvaWxlciBwbGF0ZXMnLCAoKSA9PiByZXN1bHQuZm9yRWFjaCgoXywgaW5kZXgpID0+IF8uc2hvdWxkLmRlZXAuaW5jbHVkZShleHBlY3RlZFtpbmRleF0pKSk7XG59KTsiXX0=