'use strict';

var _a_boiler_plates_manager = require('./given/a_boiler_plates_manager');

var first_boiler_plate = 'first_boiler_plate'; /*---------------------------------------------------------------------------------------------
                                                *  Copyright (c) Dolittle. All rights reserved.
                                                *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                                *--------------------------------------------------------------------------------------------*/

var second_boiler_plate = 'second_boiler_plate';

describe('when updating boiler plates', function () {
    var context = new _a_boiler_plates_manager.a_boiler_plates_manager();
    var updateBoilerPlatesOnDisk = null;
    var getAvailableBoilerPlates = null;
    var updateConfiguration = null;
    var resolve = null;

    (function (beforeEach) {
        updateBoilerPlatesOnDisk = sinon.stub(context.boilerPlatesManager, 'updateBoilerPlatesOnDisk');
        updateBoilerPlatesOnDisk.resolves();

        getAvailableBoilerPlates = sinon.stub(context.boilerPlatesManager, 'getAvailableBoilerPlates');
        getAvailableBoilerPlates.resolves([first_boiler_plate, second_boiler_plate]);

        updateConfiguration = sinon.stub(context.boilerPlatesManager, 'updateConfiguration');

        context.fileSystem.existsSync = sinon.stub().returns(false);
        context.git.silent = sinon.stub().returns(context.git);
        context.git.clone = sinon.stub().returns(context.git);
        context.git.exec = function (callback) {
            return callback();
        };

        resolve = sinon.spy();
        context.boilerPlatesManager.update().then(resolve);
    })();

    //it('should', context.git.clone.should.be.called);
    //it('should update configuration', updateConfiguration.should.be.called);
    //it('should resolve', resolve.should.be.called);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvd2hlbl91cGRhdGluZ19ib2lsZXJfcGxhdGVzLmpzIl0sIm5hbWVzIjpbImZpcnN0X2JvaWxlcl9wbGF0ZSIsInNlY29uZF9ib2lsZXJfcGxhdGUiLCJkZXNjcmliZSIsImNvbnRleHQiLCJhX2JvaWxlcl9wbGF0ZXNfbWFuYWdlciIsInVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayIsImdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyIsInVwZGF0ZUNvbmZpZ3VyYXRpb24iLCJyZXNvbHZlIiwic2lub24iLCJzdHViIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsInJlc29sdmVzIiwiZmlsZVN5c3RlbSIsImV4aXN0c1N5bmMiLCJyZXR1cm5zIiwiZ2l0Iiwic2lsZW50IiwiY2xvbmUiLCJleGVjIiwiY2FsbGJhY2siLCJzcHkiLCJ1cGRhdGUiLCJ0aGVuIl0sIm1hcHBpbmdzIjoiOztBQUtBOztBQUVBLElBQU1BLHFCQUFxQixvQkFBM0IsQyxDQVBBOzs7OztBQVFBLElBQU1DLHNCQUFzQixxQkFBNUI7O0FBRUFDLFNBQVMsNkJBQVQsRUFBd0MsWUFBTTtBQUMxQyxRQUFJQyxVQUFVLElBQUlDLGdEQUFKLEVBQWQ7QUFDQSxRQUFJQywyQkFBMkIsSUFBL0I7QUFDQSxRQUFJQywyQkFBMkIsSUFBL0I7QUFDQSxRQUFJQyxzQkFBc0IsSUFBMUI7QUFDQSxRQUFJQyxVQUFVLElBQWQ7O0FBRUEsS0FBQyxzQkFBYztBQUNYSCxtQ0FBMkJJLE1BQU1DLElBQU4sQ0FBV1AsUUFBUVEsbUJBQW5CLEVBQXVDLDBCQUF2QyxDQUEzQjtBQUNBTixpQ0FBeUJPLFFBQXpCOztBQUVBTixtQ0FBMkJHLE1BQU1DLElBQU4sQ0FBV1AsUUFBUVEsbUJBQW5CLEVBQXdDLDBCQUF4QyxDQUEzQjtBQUNBTCxpQ0FBeUJNLFFBQXpCLENBQWtDLENBQzlCWixrQkFEOEIsRUFFOUJDLG1CQUY4QixDQUFsQzs7QUFLQU0sOEJBQXNCRSxNQUFNQyxJQUFOLENBQVdQLFFBQVFRLG1CQUFuQixFQUF1QyxxQkFBdkMsQ0FBdEI7O0FBRUFSLGdCQUFRVSxVQUFSLENBQW1CQyxVQUFuQixHQUFnQ0wsTUFBTUMsSUFBTixHQUFhSyxPQUFiLENBQXFCLEtBQXJCLENBQWhDO0FBQ0FaLGdCQUFRYSxHQUFSLENBQVlDLE1BQVosR0FBcUJSLE1BQU1DLElBQU4sR0FBYUssT0FBYixDQUFxQlosUUFBUWEsR0FBN0IsQ0FBckI7QUFDQWIsZ0JBQVFhLEdBQVIsQ0FBWUUsS0FBWixHQUFvQlQsTUFBTUMsSUFBTixHQUFhSyxPQUFiLENBQXFCWixRQUFRYSxHQUE3QixDQUFwQjtBQUNBYixnQkFBUWEsR0FBUixDQUFZRyxJQUFaLEdBQW1CLFVBQUNDLFFBQUQ7QUFBQSxtQkFBY0EsVUFBZDtBQUFBLFNBQW5COztBQUVBWixrQkFBVUMsTUFBTVksR0FBTixFQUFWO0FBQ0FsQixnQkFBUVEsbUJBQVIsQ0FBNEJXLE1BQTVCLEdBQXFDQyxJQUFyQyxDQUEwQ2YsT0FBMUM7QUFDSCxLQW5CRDs7QUFxQkE7QUFDQTtBQUNBO0FBQ0gsQ0EvQkQiLCJmaWxlIjoid2hlbl91cGRhdGluZ19ib2lsZXJfcGxhdGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQge8KgYV9ib2lsZXJfcGxhdGVzX21hbmFnZXIgfSBmcm9tICcuL2dpdmVuL2FfYm9pbGVyX3BsYXRlc19tYW5hZ2VyJztcblxuY29uc3QgZmlyc3RfYm9pbGVyX3BsYXRlID0gJ2ZpcnN0X2JvaWxlcl9wbGF0ZSc7XG5jb25zdCBzZWNvbmRfYm9pbGVyX3BsYXRlID0gJ3NlY29uZF9ib2lsZXJfcGxhdGUnO1xuXG5kZXNjcmliZSgnd2hlbiB1cGRhdGluZyBib2lsZXIgcGxhdGVzJywgKCkgPT4ge1xuICAgIGxldCBjb250ZXh0ID0gbmV3IGFfYm9pbGVyX3BsYXRlc19tYW5hZ2VyKCk7XG4gICAgbGV0IHVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayA9IG51bGw7XG4gICAgbGV0IGdldEF2YWlsYWJsZUJvaWxlclBsYXRlcyA9IG51bGw7XG4gICAgbGV0IHVwZGF0ZUNvbmZpZ3VyYXRpb24gPSBudWxsO1xuICAgIGxldCByZXNvbHZlID0gbnVsbDtcbiAgICBcbiAgICAoYmVmb3JlRWFjaCA9PiB7XG4gICAgICAgIHVwZGF0ZUJvaWxlclBsYXRlc09uRGlzayA9IHNpbm9uLnN0dWIoY29udGV4dC5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCd1cGRhdGVCb2lsZXJQbGF0ZXNPbkRpc2snKTtcbiAgICAgICAgdXBkYXRlQm9pbGVyUGxhdGVzT25EaXNrLnJlc29sdmVzKCk7XG5cbiAgICAgICAgZ2V0QXZhaWxhYmxlQm9pbGVyUGxhdGVzID0gc2lub24uc3R1Yihjb250ZXh0LmJvaWxlclBsYXRlc01hbmFnZXIsICdnZXRBdmFpbGFibGVCb2lsZXJQbGF0ZXMnKTtcbiAgICAgICAgZ2V0QXZhaWxhYmxlQm9pbGVyUGxhdGVzLnJlc29sdmVzKFtcbiAgICAgICAgICAgIGZpcnN0X2JvaWxlcl9wbGF0ZSxcbiAgICAgICAgICAgIHNlY29uZF9ib2lsZXJfcGxhdGVcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdXBkYXRlQ29uZmlndXJhdGlvbiA9IHNpbm9uLnN0dWIoY29udGV4dC5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCd1cGRhdGVDb25maWd1cmF0aW9uJyk7XG5cbiAgICAgICAgY29udGV4dC5maWxlU3lzdGVtLmV4aXN0c1N5bmMgPSBzaW5vbi5zdHViKCkucmV0dXJucyhmYWxzZSk7XG4gICAgICAgIGNvbnRleHQuZ2l0LnNpbGVudCA9IHNpbm9uLnN0dWIoKS5yZXR1cm5zKGNvbnRleHQuZ2l0KTtcbiAgICAgICAgY29udGV4dC5naXQuY2xvbmUgPSBzaW5vbi5zdHViKCkucmV0dXJucyhjb250ZXh0LmdpdCk7XG4gICAgICAgIGNvbnRleHQuZ2l0LmV4ZWMgPSAoY2FsbGJhY2spID0+IGNhbGxiYWNrKCk7XG4gICAgICAgIFxuICAgICAgICByZXNvbHZlID0gc2lub24uc3B5KCk7XG4gICAgICAgIGNvbnRleHQuYm9pbGVyUGxhdGVzTWFuYWdlci51cGRhdGUoKS50aGVuKHJlc29sdmUpO1xuICAgIH0pKCk7XG5cbiAgICAvL2l0KCdzaG91bGQnLCBjb250ZXh0LmdpdC5jbG9uZS5zaG91bGQuYmUuY2FsbGVkKTtcbiAgICAvL2l0KCdzaG91bGQgdXBkYXRlIGNvbmZpZ3VyYXRpb24nLCB1cGRhdGVDb25maWd1cmF0aW9uLnNob3VsZC5iZS5jYWxsZWQpO1xuICAgIC8vaXQoJ3Nob3VsZCByZXNvbHZlJywgcmVzb2x2ZS5zaG91bGQuYmUuY2FsbGVkKTtcbn0pOyJdfQ==