'use strict';

var _a_boiler_plates_manager = require('./given/a_boiler_plates_manager');

var first_location = '/first/location'; /*---------------------------------------------------------------------------------------------
                                         *  Copyright (c) Dolittle. All rights reserved.
                                         *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                         *--------------------------------------------------------------------------------------------*/

var second_location = '/second/location';

describe('when updating boiler plates on disk', function () {
    var context = new _a_boiler_plates_manager.a_boiler_plates_manager();
    var resolved = null;
    var locations_pulled = {
        first_location: false,
        second_location: false
    };

    (function (beforeEach) {
        resolved = sinon.spy();
        context.folders.getFoldersIn = sinon.stub().returns([first_location, second_location]);

        context.git.forFolder = function (folder) {
            return {
                pull: function pull() {
                    locations_pulled[folder] = true;

                    return {
                        exec: function exec(callback) {
                            callback();
                        }
                    };
                }
            };
        };

        context.boilerPlatesManager.updateBoilerPlatesOnDisk().then(resolved);
    })();

    it('should git pull the first location', function () {
        return locations_pulled[first_location].should.be.true;
    });
    it('should git pull the second location', function () {
        return locations_pulled[second_location].should.be.true;
    });
    it('should resolve when all is pulled', function () {
        return resolved.should.be.called;
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvd2hlbl91cGRhdGluZ19ib2lsZXJfcGxhdGVzX29uX2Rpc2suanMiXSwibmFtZXMiOlsiZmlyc3RfbG9jYXRpb24iLCJzZWNvbmRfbG9jYXRpb24iLCJkZXNjcmliZSIsImNvbnRleHQiLCJhX2JvaWxlcl9wbGF0ZXNfbWFuYWdlciIsInJlc29sdmVkIiwibG9jYXRpb25zX3B1bGxlZCIsInNpbm9uIiwic3B5IiwiZm9sZGVycyIsImdldEZvbGRlcnNJbiIsInN0dWIiLCJyZXR1cm5zIiwiZ2l0IiwiZm9yRm9sZGVyIiwiZm9sZGVyIiwicHVsbCIsImV4ZWMiLCJjYWxsYmFjayIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJ1cGRhdGVCb2lsZXJQbGF0ZXNPbkRpc2siLCJ0aGVuIiwiaXQiLCJzaG91bGQiLCJiZSIsInRydWUiLCJjYWxsZWQiXSwibWFwcGluZ3MiOiI7O0FBS0E7O0FBRUEsSUFBTUEsaUJBQWlCLGlCQUF2QixDLENBUEE7Ozs7O0FBUUEsSUFBTUMsa0JBQWtCLGtCQUF4Qjs7QUFJQUMsU0FBUyxxQ0FBVCxFQUFnRCxZQUFNO0FBQ2xELFFBQUlDLFVBQVUsSUFBSUMsZ0RBQUosRUFBZDtBQUNBLFFBQUlDLFdBQVcsSUFBZjtBQUNBLFFBQUlDLG1CQUFtQjtBQUNuQk4sd0JBQWdCLEtBREc7QUFFbkJDLHlCQUFpQjtBQUZFLEtBQXZCOztBQUtBLEtBQUMsc0JBQWM7QUFDWEksbUJBQVdFLE1BQU1DLEdBQU4sRUFBWDtBQUNBTCxnQkFBUU0sT0FBUixDQUFnQkMsWUFBaEIsR0FBK0JILE1BQU1JLElBQU4sR0FBYUMsT0FBYixDQUFxQixDQUNoRFosY0FEZ0QsRUFFaERDLGVBRmdELENBQXJCLENBQS9COztBQUtBRSxnQkFBUVUsR0FBUixDQUFZQyxTQUFaLEdBQXdCLFVBQVVDLE1BQVYsRUFBa0I7QUFDdEMsbUJBQU87QUFDSEMsc0JBQU0sZ0JBQU07QUFDUlYscUNBQWlCUyxNQUFqQixJQUEyQixJQUEzQjs7QUFFQSwyQkFBTztBQUNIRSw4QkFBTSxjQUFVQyxRQUFWLEVBQW9CO0FBQ3RCQTtBQUNIO0FBSEUscUJBQVA7QUFLSDtBQVRFLGFBQVA7QUFXSCxTQVpEOztBQWNBZixnQkFBUWdCLG1CQUFSLENBQTRCQyx3QkFBNUIsR0FBdURDLElBQXZELENBQTREaEIsUUFBNUQ7QUFDSCxLQXRCRDs7QUF3QkFpQixPQUFHLG9DQUFILEVBQXlDO0FBQUEsZUFBTWhCLGlCQUFpQk4sY0FBakIsRUFBaUN1QixNQUFqQyxDQUF3Q0MsRUFBeEMsQ0FBMkNDLElBQWpEO0FBQUEsS0FBekM7QUFDQUgsT0FBRyxxQ0FBSCxFQUEwQztBQUFBLGVBQU1oQixpQkFBaUJMLGVBQWpCLEVBQWtDc0IsTUFBbEMsQ0FBeUNDLEVBQXpDLENBQTRDQyxJQUFsRDtBQUFBLEtBQTFDO0FBQ0FILE9BQUcsbUNBQUgsRUFBd0M7QUFBQSxlQUFNakIsU0FBU2tCLE1BQVQsQ0FBZ0JDLEVBQWhCLENBQW1CRSxNQUF6QjtBQUFBLEtBQXhDO0FBQ0gsQ0FuQ0QiLCJmaWxlIjoid2hlbl91cGRhdGluZ19ib2lsZXJfcGxhdGVzX29uX2Rpc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmltcG9ydCB7IGFfYm9pbGVyX3BsYXRlc19tYW5hZ2VyIH0gZnJvbSAnLi9naXZlbi9hX2JvaWxlcl9wbGF0ZXNfbWFuYWdlcic7XG5cbmNvbnN0IGZpcnN0X2xvY2F0aW9uID0gJy9maXJzdC9sb2NhdGlvbic7XG5jb25zdCBzZWNvbmRfbG9jYXRpb24gPSAnL3NlY29uZC9sb2NhdGlvbic7XG5cblxuXG5kZXNjcmliZSgnd2hlbiB1cGRhdGluZyBib2lsZXIgcGxhdGVzIG9uIGRpc2snLCAoKSA9PiB7XG4gICAgbGV0IGNvbnRleHQgPSBuZXcgYV9ib2lsZXJfcGxhdGVzX21hbmFnZXIoKTtcbiAgICBsZXQgcmVzb2x2ZWQgPSBudWxsO1xuICAgIGxldCBsb2NhdGlvbnNfcHVsbGVkID0ge1xuICAgICAgICBmaXJzdF9sb2NhdGlvbjogZmFsc2UsXG4gICAgICAgIHNlY29uZF9sb2NhdGlvbjogZmFsc2VcbiAgICB9O1xuXG4gICAgKGJlZm9yZUVhY2ggPT4ge1xuICAgICAgICByZXNvbHZlZCA9IHNpbm9uLnNweSgpO1xuICAgICAgICBjb250ZXh0LmZvbGRlcnMuZ2V0Rm9sZGVyc0luID0gc2lub24uc3R1YigpLnJldHVybnMoW1xuICAgICAgICAgICAgZmlyc3RfbG9jYXRpb24sXG4gICAgICAgICAgICBzZWNvbmRfbG9jYXRpb25cbiAgICAgICAgXSk7XG5cbiAgICAgICAgY29udGV4dC5naXQuZm9yRm9sZGVyID0gZnVuY3Rpb24gKGZvbGRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwdWxsOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uc19wdWxsZWRbZm9sZGVyXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhlYzogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgY29udGV4dC5ib2lsZXJQbGF0ZXNNYW5hZ2VyLnVwZGF0ZUJvaWxlclBsYXRlc09uRGlzaygpLnRoZW4ocmVzb2x2ZWQpO1xuICAgIH0pKCk7XG5cbiAgICBpdCgnc2hvdWxkIGdpdCBwdWxsIHRoZSBmaXJzdCBsb2NhdGlvbicsICgpID0+IGxvY2F0aW9uc19wdWxsZWRbZmlyc3RfbG9jYXRpb25dLnNob3VsZC5iZS50cnVlKTtcbiAgICBpdCgnc2hvdWxkIGdpdCBwdWxsIHRoZSBzZWNvbmQgbG9jYXRpb24nLCAoKSA9PiBsb2NhdGlvbnNfcHVsbGVkW3NlY29uZF9sb2NhdGlvbl0uc2hvdWxkLmJlLnRydWUpO1xuICAgIGl0KCdzaG91bGQgcmVzb2x2ZSB3aGVuIGFsbCBpcyBwdWxsZWQnLCAoKSA9PiByZXNvbHZlZC5zaG91bGQuYmUuY2FsbGVkKTtcbn0pOyJdfQ==