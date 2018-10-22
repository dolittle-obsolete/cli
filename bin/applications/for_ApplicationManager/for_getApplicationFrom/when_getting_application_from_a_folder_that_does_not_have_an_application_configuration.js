'use strict';

var _a_system_that_doest_not_have_an_application = require('./given/a_system_that_doest_not_have_an_application');

describe('when creating an application', function () {
    var context = new _a_system_that_doest_not_have_an_application.a_system_that_doest_not_have_an_application();
    var path = require('path');
    var resultApplication = null;
    (function (beforeEach) {
        resultApplication = context.applicationManager.getApplicationFrom(context.folder);
    })();
    it('should check if the correct file exists', function () {
        return context.fileSystem.existsSync.should.be.calledWith(path.join(context.folder, context.applicationFileName));
    });
    it('should not get an application', function () {
        return expect(resultApplication).to.be.null;
    });
}); /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Dolittle. All rights reserved.
     *  Licensed under the MIT License. See LICENSE in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvZm9yX0FwcGxpY2F0aW9uTWFuYWdlci9mb3JfZ2V0QXBwbGljYXRpb25Gcm9tL3doZW5fZ2V0dGluZ19hcHBsaWNhdGlvbl9mcm9tX2FfZm9sZGVyX3RoYXRfZG9lc19ub3RfaGF2ZV9hbl9hcHBsaWNhdGlvbl9jb25maWd1cmF0aW9uLmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiY29udGV4dCIsImFfc3lzdGVtX3RoYXRfZG9lc3Rfbm90X2hhdmVfYW5fYXBwbGljYXRpb24iLCJwYXRoIiwicmVxdWlyZSIsInJlc3VsdEFwcGxpY2F0aW9uIiwiYXBwbGljYXRpb25NYW5hZ2VyIiwiZ2V0QXBwbGljYXRpb25Gcm9tIiwiZm9sZGVyIiwiaXQiLCJmaWxlU3lzdGVtIiwiZXhpc3RzU3luYyIsInNob3VsZCIsImJlIiwiY2FsbGVkV2l0aCIsImpvaW4iLCJhcHBsaWNhdGlvbkZpbGVOYW1lIiwiZXhwZWN0IiwidG8iLCJudWxsIl0sIm1hcHBpbmdzIjoiOztBQUlBOztBQUVBQSxTQUFTLDhCQUFULEVBQXlDLFlBQU07QUFDM0MsUUFBSUMsVUFBVSxJQUFJQyx3RkFBSixFQUFkO0FBQ0EsUUFBTUMsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFDQSxRQUFJQyxvQkFBb0IsSUFBeEI7QUFDQSxLQUFDLHNCQUFjO0FBQ1hBLDRCQUFvQkosUUFBUUssa0JBQVIsQ0FBMkJDLGtCQUEzQixDQUE4Q04sUUFBUU8sTUFBdEQsQ0FBcEI7QUFDSCxLQUZEO0FBR0FDLE9BQUcseUNBQUgsRUFBOEM7QUFBQSxlQUFNUixRQUFRUyxVQUFSLENBQW1CQyxVQUFuQixDQUE4QkMsTUFBOUIsQ0FBcUNDLEVBQXJDLENBQXdDQyxVQUF4QyxDQUFtRFgsS0FBS1ksSUFBTCxDQUFVZCxRQUFRTyxNQUFsQixFQUEwQlAsUUFBUWUsbUJBQWxDLENBQW5ELENBQU47QUFBQSxLQUE5QztBQUNBUCxPQUFHLCtCQUFILEVBQW9DO0FBQUEsZUFBTVEsT0FBT1osaUJBQVAsRUFBMEJhLEVBQTFCLENBQTZCTCxFQUE3QixDQUFnQ00sSUFBdEM7QUFBQSxLQUFwQztBQUdILENBWEQsRSxDQU5BIiwiZmlsZSI6IndoZW5fZ2V0dGluZ19hcHBsaWNhdGlvbl9mcm9tX2FfZm9sZGVyX3RoYXRfZG9lc19ub3RfaGF2ZV9hbl9hcHBsaWNhdGlvbl9jb25maWd1cmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgYV9zeXN0ZW1fdGhhdF9kb2VzdF9ub3RfaGF2ZV9hbl9hcHBsaWNhdGlvbn0gZnJvbSAnLi9naXZlbi9hX3N5c3RlbV90aGF0X2RvZXN0X25vdF9oYXZlX2FuX2FwcGxpY2F0aW9uJztcblxuZGVzY3JpYmUoJ3doZW4gY3JlYXRpbmcgYW4gYXBwbGljYXRpb24nLCAoKSA9PiB7XG4gICAgbGV0IGNvbnRleHQgPSBuZXcgYV9zeXN0ZW1fdGhhdF9kb2VzdF9ub3RfaGF2ZV9hbl9hcHBsaWNhdGlvbigpO1xuICAgIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gICAgbGV0IHJlc3VsdEFwcGxpY2F0aW9uID0gbnVsbDtcbiAgICAoYmVmb3JlRWFjaCA9PiB7XG4gICAgICAgIHJlc3VsdEFwcGxpY2F0aW9uID0gY29udGV4dC5hcHBsaWNhdGlvbk1hbmFnZXIuZ2V0QXBwbGljYXRpb25Gcm9tKGNvbnRleHQuZm9sZGVyKTtcbiAgICB9KSgpO1xuICAgIGl0KCdzaG91bGQgY2hlY2sgaWYgdGhlIGNvcnJlY3QgZmlsZSBleGlzdHMnLCAoKSA9PiBjb250ZXh0LmZpbGVTeXN0ZW0uZXhpc3RzU3luYy5zaG91bGQuYmUuY2FsbGVkV2l0aChwYXRoLmpvaW4oY29udGV4dC5mb2xkZXIsIGNvbnRleHQuYXBwbGljYXRpb25GaWxlTmFtZSkpKTtcbiAgICBpdCgnc2hvdWxkIG5vdCBnZXQgYW4gYXBwbGljYXRpb24nLCAoKSA9PiBleHBlY3QocmVzdWx0QXBwbGljYXRpb24pLnRvLmJlLm51bGwpO1xuICAgXG4gICAgXG59KTsiXX0=