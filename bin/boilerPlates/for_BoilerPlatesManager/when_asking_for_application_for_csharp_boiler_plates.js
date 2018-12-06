'use strict';

var _all_supported_boiler_plates = require('./given/all_supported_boiler_plates');

describe('when asking for application for csharp boiler plates', function () {
    var context = new _all_supported_boiler_plates.all_supported_boiler_plates();
    var result = null;
    var expected = [context.boilerPlates[0]];

    (function (beforeEach) {
        result = context.boilerPlatesManager.boilerPlatesByLanguageAndType('csharp', 'application');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvd2hlbl9hc2tpbmdfZm9yX2FwcGxpY2F0aW9uX2Zvcl9jc2hhcnBfYm9pbGVyX3BsYXRlcy5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsImNvbnRleHQiLCJhbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMiLCJyZXN1bHQiLCJleHBlY3RlZCIsImJvaWxlclBsYXRlcyIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSIsIml0IiwibGVuZ3RoIiwic2hvdWxkIiwiZXF1YWwiLCJmb3JFYWNoIiwiXyIsImluZGV4IiwiZGVlcCIsImluY2x1ZGUiXSwibWFwcGluZ3MiOiI7O0FBS0E7O0FBRUFBLFNBQVMsc0RBQVQsRUFBaUUsWUFBTTtBQUNuRSxRQUFJQyxVQUFVLElBQUlDLHdEQUFKLEVBQWQ7QUFDQSxRQUFJQyxTQUFTLElBQWI7QUFDQSxRQUFJQyxXQUFXLENBQ1hILFFBQVFJLFlBQVIsQ0FBcUIsQ0FBckIsQ0FEVyxDQUFmOztBQUlBLEtBQUMsc0JBQWM7QUFDWEYsaUJBQVNGLFFBQVFLLG1CQUFSLENBQTRCQyw2QkFBNUIsQ0FBMEQsUUFBMUQsRUFBbUUsYUFBbkUsQ0FBVDtBQUNILEtBRkQ7O0FBSUFDLE9BQUcsNkNBQUgsRUFBa0Q7QUFBQSxlQUFNTCxPQUFPTSxNQUFQLENBQWNDLE1BQWQsQ0FBcUJDLEtBQXJCLENBQTJCLENBQTNCLENBQU47QUFBQSxLQUFsRDtBQUNBSCxPQUFHLDBDQUFILEVBQStDO0FBQUEsZUFBTUwsT0FBT1MsT0FBUCxDQUFlLFVBQUNDLENBQUQsRUFBSUMsS0FBSjtBQUFBLG1CQUFjRCxFQUFFSCxNQUFGLENBQVNLLElBQVQsQ0FBY0MsT0FBZCxDQUFzQlosU0FBU1UsS0FBVCxDQUF0QixDQUFkO0FBQUEsU0FBZixDQUFOO0FBQUEsS0FBL0M7QUFDSCxDQWJELEUsQ0FQQSIsImZpbGUiOiJ3aGVuX2Fza2luZ19mb3JfYXBwbGljYXRpb25fZm9yX2NzaGFycF9ib2lsZXJfcGxhdGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQge8KgYWxsX3N1cHBvcnRlZF9ib2lsZXJfcGxhdGVzIH0gZnJvbSAnLi9naXZlbi9hbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMnO1xuXG5kZXNjcmliZSgnd2hlbiBhc2tpbmcgZm9yIGFwcGxpY2F0aW9uIGZvciBjc2hhcnAgYm9pbGVyIHBsYXRlcycsICgpID0+IHtcbiAgICBsZXQgY29udGV4dCA9IG5ldyBhbGxfc3VwcG9ydGVkX2JvaWxlcl9wbGF0ZXMoKTtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICBsZXQgZXhwZWN0ZWQgPSBbXG4gICAgICAgIGNvbnRleHQuYm9pbGVyUGxhdGVzWzBdXG4gICAgXTtcblxuICAgIChiZWZvcmVFYWNoID0+IHtcbiAgICAgICAgcmVzdWx0ID0gY29udGV4dC5ib2lsZXJQbGF0ZXNNYW5hZ2VyLmJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKCdjc2hhcnAnLCdhcHBsaWNhdGlvbicpO1xuICAgIH0pKCk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBleGFjdCBudW1iZXIgb2YgYm9pbGVyIHBsYXRlcycsICgpID0+IHJlc3VsdC5sZW5ndGguc2hvdWxkLmVxdWFsKDEpKTtcbiAgICBpdCgnc2hvdWxkIHJldHVybiB0aGUgZXhwZWN0ZWQgYm9pbGVyIHBsYXRlcycsICgpID0+IHJlc3VsdC5mb3JFYWNoKChfLCBpbmRleCkgPT4gXy5zaG91bGQuZGVlcC5pbmNsdWRlKGV4cGVjdGVkW2luZGV4XSkpKTtcbn0pOyJdfQ==