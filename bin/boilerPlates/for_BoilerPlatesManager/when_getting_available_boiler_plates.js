'use strict';

var _all_supported_boiler_plates = require('./given/all_supported_boiler_plates');

describe('when getting available boiler plates', function () {
    var context = new _all_supported_boiler_plates.all_supported_boiler_plates();
    var result = null;
    var items = [{ name: 'first' }, { name: 'second' }, { name: 'third' }];

    (function (beforeEach) {
        context.httpWrapper.getJson = sinon.stub().returns({
            then: function then(callback) {
                callback(JSON.stringify(items));
            }
        });
        context.boilerPlatesManager.getAvailableBoilerPlates().then(function (r) {
            return result = r;
        });
    })();

    it('should return expected urls', function () {
        return result.should.have.all.members([items[0].name, items[1].name, items[2].name]);
    });
}); /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Dolittle. All rights reserved.
     *  Licensed under the MIT License. See LICENSE in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvd2hlbl9nZXR0aW5nX2F2YWlsYWJsZV9ib2lsZXJfcGxhdGVzLmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiY29udGV4dCIsImFsbF9zdXBwb3J0ZWRfYm9pbGVyX3BsYXRlcyIsInJlc3VsdCIsIml0ZW1zIiwibmFtZSIsImh0dHBXcmFwcGVyIiwiZ2V0SnNvbiIsInNpbm9uIiwic3R1YiIsInJldHVybnMiLCJ0aGVuIiwiY2FsbGJhY2siLCJKU09OIiwic3RyaW5naWZ5IiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsInIiLCJpdCIsInNob3VsZCIsImhhdmUiLCJhbGwiLCJtZW1iZXJzIl0sIm1hcHBpbmdzIjoiOztBQUtBOztBQUVBQSxTQUFTLHNDQUFULEVBQWlELFlBQU07QUFDbkQsUUFBSUMsVUFBVSxJQUFJQyx3REFBSixFQUFkO0FBQ0EsUUFBSUMsU0FBUyxJQUFiO0FBQ0EsUUFBSUMsUUFBUSxDQUFDLEVBQUVDLE1BQU0sT0FBUixFQUFELEVBQW9CLEVBQUVBLE1BQU0sUUFBUixFQUFwQixFQUF3QyxFQUFFQSxNQUFNLE9BQVIsRUFBeEMsQ0FBWjs7QUFFQSxLQUFDLHNCQUFjO0FBQ1hKLGdCQUFRSyxXQUFSLENBQW9CQyxPQUFwQixHQUE4QkMsTUFBTUMsSUFBTixHQUFhQyxPQUFiLENBQXFCO0FBQy9DQyxrQkFBTSxjQUFDQyxRQUFELEVBQWM7QUFDaEJBLHlCQUFTQyxLQUFLQyxTQUFMLENBQWVWLEtBQWYsQ0FBVDtBQUNIO0FBSDhDLFNBQXJCLENBQTlCO0FBS0FILGdCQUFRYyxtQkFBUixDQUE0QkMsd0JBQTVCLEdBQXVETCxJQUF2RCxDQUE0RDtBQUFBLG1CQUFLUixTQUFTYyxDQUFkO0FBQUEsU0FBNUQ7QUFDSCxLQVBEOztBQVNBQyxPQUFHLDZCQUFILEVBQWtDO0FBQUEsZUFBTWYsT0FBT2dCLE1BQVAsQ0FBY0MsSUFBZCxDQUFtQkMsR0FBbkIsQ0FBdUJDLE9BQXZCLENBQStCLENBQUNsQixNQUFNLENBQU4sRUFBU0MsSUFBVixFQUFnQkQsTUFBTSxDQUFOLEVBQVNDLElBQXpCLEVBQStCRCxNQUFNLENBQU4sRUFBU0MsSUFBeEMsQ0FBL0IsQ0FBTjtBQUFBLEtBQWxDO0FBQ0gsQ0FmRCxFLENBUEEiLCJmaWxlIjoid2hlbl9nZXR0aW5nX2F2YWlsYWJsZV9ib2lsZXJfcGxhdGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgeyBhbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMgfSBmcm9tICcuL2dpdmVuL2FsbF9zdXBwb3J0ZWRfYm9pbGVyX3BsYXRlcyc7XG5cbmRlc2NyaWJlKCd3aGVuIGdldHRpbmcgYXZhaWxhYmxlIGJvaWxlciBwbGF0ZXMnLCAoKSA9PiB7XG4gICAgbGV0IGNvbnRleHQgPSBuZXcgYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzKCk7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgbGV0IGl0ZW1zID0gW3sgbmFtZTogJ2ZpcnN0JyB9LCB7IG5hbWU6ICdzZWNvbmQnIH0sIHsgbmFtZTogJ3RoaXJkJyB9XTtcblxuICAgIChiZWZvcmVFYWNoID0+IHtcbiAgICAgICAgY29udGV4dC5odHRwV3JhcHBlci5nZXRKc29uID0gc2lub24uc3R1YigpLnJldHVybnMoe1xuICAgICAgICAgICAgdGhlbjogKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soSlNPTi5zdHJpbmdpZnkoaXRlbXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRleHQuYm9pbGVyUGxhdGVzTWFuYWdlci5nZXRBdmFpbGFibGVCb2lsZXJQbGF0ZXMoKS50aGVuKHIgPT4gcmVzdWx0ID0gcik7XG4gICAgfSkoKTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGV4cGVjdGVkIHVybHMnLCAoKSA9PiByZXN1bHQuc2hvdWxkLmhhdmUuYWxsLm1lbWJlcnMoW2l0ZW1zWzBdLm5hbWUsIGl0ZW1zWzFdLm5hbWUsIGl0ZW1zWzJdLm5hbWVdKSk7XG59KTsiXX0=