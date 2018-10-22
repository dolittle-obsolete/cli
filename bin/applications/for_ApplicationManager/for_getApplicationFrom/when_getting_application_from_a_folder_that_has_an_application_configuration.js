'use strict';

var _a_system_that_reads_an_application_json = require('./given/a_system_that_reads_an_application_json');

describe('when_getting_application_from_a_folder_that_has_an_application_configuration', function () {
    var context = new _a_system_that_reads_an_application_json.a_system_that_reads_an_application_json();
    var path = require('path');
    var resultApplication = null;
    (function (beforeEach) {
        resultApplication = context.applicationManager.getApplicationFrom(context.folder);
    })();
    it('should check if the correct file exists', function () {
        return context.fileSystem.existsSync.should.be.calledWith(path.join(context.folder, context.applicationFileName));
    });
    it('should read application file from the correct path', function () {
        return context.fileSystem.readFileSync.should.be.calledWith(path.join(context.folder, context.applicationFileName));
    });
    it('should get an application', function () {
        return expect(resultApplication).to.not.be.null;
    });
    it('should get application with correct application id', function () {
        return resultApplication.id.should.equal(context.applicationId);
    });
    it('should get application with correct application name', function () {
        return resultApplication.name.should.equal(context.applicationName);
    });
}); /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Dolittle. All rights reserved.
     *  Licensed under the MIT License. See LICENSE in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvZm9yX0FwcGxpY2F0aW9uTWFuYWdlci9mb3JfZ2V0QXBwbGljYXRpb25Gcm9tL3doZW5fZ2V0dGluZ19hcHBsaWNhdGlvbl9mcm9tX2FfZm9sZGVyX3RoYXRfaGFzX2FuX2FwcGxpY2F0aW9uX2NvbmZpZ3VyYXRpb24uanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJjb250ZXh0IiwiYV9zeXN0ZW1fdGhhdF9yZWFkc19hbl9hcHBsaWNhdGlvbl9qc29uIiwicGF0aCIsInJlcXVpcmUiLCJyZXN1bHRBcHBsaWNhdGlvbiIsImFwcGxpY2F0aW9uTWFuYWdlciIsImdldEFwcGxpY2F0aW9uRnJvbSIsImZvbGRlciIsIml0IiwiZmlsZVN5c3RlbSIsImV4aXN0c1N5bmMiLCJzaG91bGQiLCJiZSIsImNhbGxlZFdpdGgiLCJqb2luIiwiYXBwbGljYXRpb25GaWxlTmFtZSIsInJlYWRGaWxlU3luYyIsImV4cGVjdCIsInRvIiwibm90IiwibnVsbCIsImlkIiwiZXF1YWwiLCJhcHBsaWNhdGlvbklkIiwibmFtZSIsImFwcGxpY2F0aW9uTmFtZSJdLCJtYXBwaW5ncyI6Ijs7QUFJQTs7QUFFQUEsU0FBUyw4RUFBVCxFQUF5RixZQUFNO0FBQzNGLFFBQUlDLFVBQVUsSUFBSUMsZ0ZBQUosRUFBZDtBQUNBLFFBQU1DLE9BQU9DLFFBQVEsTUFBUixDQUFiO0FBQ0EsUUFBSUMsb0JBQW9CLElBQXhCO0FBQ0EsS0FBQyxzQkFBYztBQUNYQSw0QkFBb0JKLFFBQVFLLGtCQUFSLENBQTJCQyxrQkFBM0IsQ0FBOENOLFFBQVFPLE1BQXRELENBQXBCO0FBQ0gsS0FGRDtBQUdBQyxPQUFHLHlDQUFILEVBQThDO0FBQUEsZUFBTVIsUUFBUVMsVUFBUixDQUFtQkMsVUFBbkIsQ0FBOEJDLE1BQTlCLENBQXFDQyxFQUFyQyxDQUF3Q0MsVUFBeEMsQ0FBbURYLEtBQUtZLElBQUwsQ0FBVWQsUUFBUU8sTUFBbEIsRUFBMEJQLFFBQVFlLG1CQUFsQyxDQUFuRCxDQUFOO0FBQUEsS0FBOUM7QUFDQVAsT0FBRyxvREFBSCxFQUF5RDtBQUFBLGVBQU1SLFFBQVFTLFVBQVIsQ0FBbUJPLFlBQW5CLENBQWdDTCxNQUFoQyxDQUF1Q0MsRUFBdkMsQ0FBMENDLFVBQTFDLENBQXFEWCxLQUFLWSxJQUFMLENBQVVkLFFBQVFPLE1BQWxCLEVBQTBCUCxRQUFRZSxtQkFBbEMsQ0FBckQsQ0FBTjtBQUFBLEtBQXpEO0FBQ0FQLE9BQUcsMkJBQUgsRUFBZ0M7QUFBQSxlQUFNUyxPQUFPYixpQkFBUCxFQUEwQmMsRUFBMUIsQ0FBNkJDLEdBQTdCLENBQWlDUCxFQUFqQyxDQUFvQ1EsSUFBMUM7QUFBQSxLQUFoQztBQUNBWixPQUFHLG9EQUFILEVBQXlEO0FBQUEsZUFBTUosa0JBQWtCaUIsRUFBbEIsQ0FBcUJWLE1BQXJCLENBQTRCVyxLQUE1QixDQUFrQ3RCLFFBQVF1QixhQUExQyxDQUFOO0FBQUEsS0FBekQ7QUFDQWYsT0FBRyxzREFBSCxFQUEyRDtBQUFBLGVBQU1KLGtCQUFrQm9CLElBQWxCLENBQXVCYixNQUF2QixDQUE4QlcsS0FBOUIsQ0FBb0N0QixRQUFReUIsZUFBNUMsQ0FBTjtBQUFBLEtBQTNEO0FBR0gsQ0FkRCxFLENBTkEiLCJmaWxlIjoid2hlbl9nZXR0aW5nX2FwcGxpY2F0aW9uX2Zyb21fYV9mb2xkZXJfdGhhdF9oYXNfYW5fYXBwbGljYXRpb25fY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IGFfc3lzdGVtX3RoYXRfcmVhZHNfYW5fYXBwbGljYXRpb25fanNvbiB9IGZyb20gJy4vZ2l2ZW4vYV9zeXN0ZW1fdGhhdF9yZWFkc19hbl9hcHBsaWNhdGlvbl9qc29uJztcblxuZGVzY3JpYmUoJ3doZW5fZ2V0dGluZ19hcHBsaWNhdGlvbl9mcm9tX2FfZm9sZGVyX3RoYXRfaGFzX2FuX2FwcGxpY2F0aW9uX2NvbmZpZ3VyYXRpb24nLCAoKSA9PiB7XG4gICAgbGV0IGNvbnRleHQgPSBuZXcgYV9zeXN0ZW1fdGhhdF9yZWFkc19hbl9hcHBsaWNhdGlvbl9qc29uKCk7XG4gICAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgICBsZXQgcmVzdWx0QXBwbGljYXRpb24gPSBudWxsO1xuICAgIChiZWZvcmVFYWNoID0+IHtcbiAgICAgICAgcmVzdWx0QXBwbGljYXRpb24gPSBjb250ZXh0LmFwcGxpY2F0aW9uTWFuYWdlci5nZXRBcHBsaWNhdGlvbkZyb20oY29udGV4dC5mb2xkZXIpO1xuICAgIH0pKCk7XG4gICAgaXQoJ3Nob3VsZCBjaGVjayBpZiB0aGUgY29ycmVjdCBmaWxlIGV4aXN0cycsICgpID0+IGNvbnRleHQuZmlsZVN5c3RlbS5leGlzdHNTeW5jLnNob3VsZC5iZS5jYWxsZWRXaXRoKHBhdGguam9pbihjb250ZXh0LmZvbGRlciwgY29udGV4dC5hcHBsaWNhdGlvbkZpbGVOYW1lKSkpO1xuICAgIGl0KCdzaG91bGQgcmVhZCBhcHBsaWNhdGlvbiBmaWxlIGZyb20gdGhlIGNvcnJlY3QgcGF0aCcsICgpID0+IGNvbnRleHQuZmlsZVN5c3RlbS5yZWFkRmlsZVN5bmMuc2hvdWxkLmJlLmNhbGxlZFdpdGgocGF0aC5qb2luKGNvbnRleHQuZm9sZGVyLCBjb250ZXh0LmFwcGxpY2F0aW9uRmlsZU5hbWUpKSk7XG4gICAgaXQoJ3Nob3VsZCBnZXQgYW4gYXBwbGljYXRpb24nLCAoKSA9PiBleHBlY3QocmVzdWx0QXBwbGljYXRpb24pLnRvLm5vdC5iZS5udWxsKTtcbiAgICBpdCgnc2hvdWxkIGdldCBhcHBsaWNhdGlvbiB3aXRoIGNvcnJlY3QgYXBwbGljYXRpb24gaWQnLCAoKSA9PiByZXN1bHRBcHBsaWNhdGlvbi5pZC5zaG91bGQuZXF1YWwoY29udGV4dC5hcHBsaWNhdGlvbklkKSk7XG4gICAgaXQoJ3Nob3VsZCBnZXQgYXBwbGljYXRpb24gd2l0aCBjb3JyZWN0IGFwcGxpY2F0aW9uIG5hbWUnLCAoKSA9PiByZXN1bHRBcHBsaWNhdGlvbi5uYW1lLnNob3VsZC5lcXVhbChjb250ZXh0LmFwcGxpY2F0aW9uTmFtZSkpO1xuICAgIFxuICAgIFxufSk7Il19