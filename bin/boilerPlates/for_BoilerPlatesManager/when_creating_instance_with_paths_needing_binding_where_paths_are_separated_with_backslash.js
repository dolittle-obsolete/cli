'use strict';

var _a_boiler_plates_manager = require('./given/a_boiler_plates_manager');

describe('when creating instance with paths needing binding where paths are separated with backslash', function () {
    var fileNeedingBinding = 'c:\\Somwhere\\On\\{{the}}\\Harddrive\\{{file}}.txt';
    var context = null;
    var bindingContext = {
        the: 'the',
        file: 'somefile'
    };
    var expectedResult = 'c:\\Somwhere\\On\\' + bindingContext.the + '\\Harddrive\\' + bindingContext.file + '.txt';
    var destination = '';
    var boilerPlate = {
        pathsNeedingBinding: [fileNeedingBinding],
        filesNeedingBinding: []
    };

    (function (beforeEach) {
        context = new _a_boiler_plates_manager.a_boiler_plates_manager();

        context.folders.copy = sinon.stub();
        context.fileSystem.renameSync = sinon.stub();

        context.boilerPlatesManager.createInstance(boilerPlate, destination, bindingContext);
    })();

    it('should expand bindings with correct values and rename path accordingly', function () {
        return context.fileSystem.renameSync.should.be.calledWith(boilerPlate.pathsNeedingBinding[0], expectedResult);
    });
}); /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Dolittle. All rights reserved.
     *  Licensed under the MIT License. See LICENSE in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvd2hlbl9jcmVhdGluZ19pbnN0YW5jZV93aXRoX3BhdGhzX25lZWRpbmdfYmluZGluZ193aGVyZV9wYXRoc19hcmVfc2VwYXJhdGVkX3dpdGhfYmFja3NsYXNoLmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiZmlsZU5lZWRpbmdCaW5kaW5nIiwiY29udGV4dCIsImJpbmRpbmdDb250ZXh0IiwidGhlIiwiZmlsZSIsImV4cGVjdGVkUmVzdWx0IiwiZGVzdGluYXRpb24iLCJib2lsZXJQbGF0ZSIsInBhdGhzTmVlZGluZ0JpbmRpbmciLCJmaWxlc05lZWRpbmdCaW5kaW5nIiwiYV9ib2lsZXJfcGxhdGVzX21hbmFnZXIiLCJmb2xkZXJzIiwiY29weSIsInNpbm9uIiwic3R1YiIsImZpbGVTeXN0ZW0iLCJyZW5hbWVTeW5jIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImNyZWF0ZUluc3RhbmNlIiwiaXQiLCJzaG91bGQiLCJiZSIsImNhbGxlZFdpdGgiXSwibWFwcGluZ3MiOiI7O0FBS0E7O0FBRUFBLFNBQVMsNEZBQVQsRUFBdUcsWUFBTTtBQUN6RyxRQUFNQyxxQkFBcUIsb0RBQTNCO0FBQ0EsUUFBSUMsVUFBVSxJQUFkO0FBQ0EsUUFBSUMsaUJBQWlCO0FBQ2pCQyxhQUFLLEtBRFk7QUFFakJDLGNBQU07QUFGVyxLQUFyQjtBQUlBLFFBQUlDLHdDQUFzQ0gsZUFBZUMsR0FBckQscUJBQXdFRCxlQUFlRSxJQUF2RixTQUFKO0FBQ0EsUUFBSUUsY0FBYyxFQUFsQjtBQUNBLFFBQUlDLGNBQWM7QUFDZEMsNkJBQXFCLENBQ2pCUixrQkFEaUIsQ0FEUDtBQUlkUyw2QkFBcUI7QUFKUCxLQUFsQjs7QUFPQSxLQUFDLHNCQUFjO0FBQ1hSLGtCQUFVLElBQUlTLGdEQUFKLEVBQVY7O0FBRUFULGdCQUFRVSxPQUFSLENBQWdCQyxJQUFoQixHQUF1QkMsTUFBTUMsSUFBTixFQUF2QjtBQUNBYixnQkFBUWMsVUFBUixDQUFtQkMsVUFBbkIsR0FBZ0NILE1BQU1DLElBQU4sRUFBaEM7O0FBRUFiLGdCQUFRZ0IsbUJBQVIsQ0FBNEJDLGNBQTVCLENBQTJDWCxXQUEzQyxFQUF3REQsV0FBeEQsRUFBcUVKLGNBQXJFO0FBQ0gsS0FQRDs7QUFTQWlCLE9BQUcsd0VBQUgsRUFBNkU7QUFBQSxlQUFNbEIsUUFBUWMsVUFBUixDQUFtQkMsVUFBbkIsQ0FBOEJJLE1BQTlCLENBQXFDQyxFQUFyQyxDQUF3Q0MsVUFBeEMsQ0FBbURmLFlBQVlDLG1CQUFaLENBQWdDLENBQWhDLENBQW5ELEVBQXNGSCxjQUF0RixDQUFOO0FBQUEsS0FBN0U7QUFDSCxDQTFCRCxFLENBUEEiLCJmaWxlIjoid2hlbl9jcmVhdGluZ19pbnN0YW5jZV93aXRoX3BhdGhzX25lZWRpbmdfYmluZGluZ193aGVyZV9wYXRoc19hcmVfc2VwYXJhdGVkX3dpdGhfYmFja3NsYXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgeyBhX2JvaWxlcl9wbGF0ZXNfbWFuYWdlciB9IGZyb20gJy4vZ2l2ZW4vYV9ib2lsZXJfcGxhdGVzX21hbmFnZXInO1xuXG5kZXNjcmliZSgnd2hlbiBjcmVhdGluZyBpbnN0YW5jZSB3aXRoIHBhdGhzIG5lZWRpbmcgYmluZGluZyB3aGVyZSBwYXRocyBhcmUgc2VwYXJhdGVkIHdpdGggYmFja3NsYXNoJywgKCkgPT4ge1xuICAgIGNvbnN0IGZpbGVOZWVkaW5nQmluZGluZyA9ICdjOlxcXFxTb213aGVyZVxcXFxPblxcXFx7e3RoZX19XFxcXEhhcmRkcml2ZVxcXFx7e2ZpbGV9fS50eHQnO1xuICAgIGxldCBjb250ZXh0ID0gbnVsbDtcbiAgICBsZXQgYmluZGluZ0NvbnRleHQgPSB7XG4gICAgICAgIHRoZTogJ3RoZScsXG4gICAgICAgIGZpbGU6ICdzb21lZmlsZSdcbiAgICB9O1xuICAgIGxldCBleHBlY3RlZFJlc3VsdCA9IGBjOlxcXFxTb213aGVyZVxcXFxPblxcXFwke2JpbmRpbmdDb250ZXh0LnRoZX1cXFxcSGFyZGRyaXZlXFxcXCR7YmluZGluZ0NvbnRleHQuZmlsZX0udHh0YDtcbiAgICBsZXQgZGVzdGluYXRpb24gPSAnJztcbiAgICBsZXQgYm9pbGVyUGxhdGUgPSB7XG4gICAgICAgIHBhdGhzTmVlZGluZ0JpbmRpbmc6IFtcbiAgICAgICAgICAgIGZpbGVOZWVkaW5nQmluZGluZ1xuICAgICAgICBdLFxuICAgICAgICBmaWxlc05lZWRpbmdCaW5kaW5nOiBbXVxuICAgIH07XG5cbiAgICAoYmVmb3JlRWFjaCA9PiB7XG4gICAgICAgIGNvbnRleHQgPSBuZXcgYV9ib2lsZXJfcGxhdGVzX21hbmFnZXIoKTtcblxuICAgICAgICBjb250ZXh0LmZvbGRlcnMuY29weSA9IHNpbm9uLnN0dWIoKTtcbiAgICAgICAgY29udGV4dC5maWxlU3lzdGVtLnJlbmFtZVN5bmMgPSBzaW5vbi5zdHViKCk7XG5cbiAgICAgICAgY29udGV4dC5ib2lsZXJQbGF0ZXNNYW5hZ2VyLmNyZWF0ZUluc3RhbmNlKGJvaWxlclBsYXRlLCBkZXN0aW5hdGlvbiwgYmluZGluZ0NvbnRleHQpO1xuICAgIH0pKCk7XG4gICBcbiAgICBpdCgnc2hvdWxkIGV4cGFuZCBiaW5kaW5ncyB3aXRoIGNvcnJlY3QgdmFsdWVzIGFuZCByZW5hbWUgcGF0aCBhY2NvcmRpbmdseScsICgpID0+IGNvbnRleHQuZmlsZVN5c3RlbS5yZW5hbWVTeW5jLnNob3VsZC5iZS5jYWxsZWRXaXRoKGJvaWxlclBsYXRlLnBhdGhzTmVlZGluZ0JpbmRpbmdbMF0sZXhwZWN0ZWRSZXN1bHQpKTtcbn0pOyJdfQ==