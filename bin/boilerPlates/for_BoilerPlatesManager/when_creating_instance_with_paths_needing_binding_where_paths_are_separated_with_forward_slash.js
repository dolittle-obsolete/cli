'use strict';

var _a_boiler_plates_manager = require('./given/a_boiler_plates_manager');

describe('when creating instance with paths needing binding where paths are separated with forward slash', function () {
    var fileNeedingBinding = '/Somwhere/On/{{the}}/Harddrive/{{file}}.txt';
    var context = null;
    var bindingContext = {
        the: 'the',
        file: 'somefile'
    };
    var expectedResult = '/Somwhere/On/' + bindingContext.the + '/Harddrive/' + bindingContext.file + '.txt';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9ib2lsZXJQbGF0ZXMvZm9yX0JvaWxlclBsYXRlc01hbmFnZXIvd2hlbl9jcmVhdGluZ19pbnN0YW5jZV93aXRoX3BhdGhzX25lZWRpbmdfYmluZGluZ193aGVyZV9wYXRoc19hcmVfc2VwYXJhdGVkX3dpdGhfZm9yd2FyZF9zbGFzaC5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsImZpbGVOZWVkaW5nQmluZGluZyIsImNvbnRleHQiLCJiaW5kaW5nQ29udGV4dCIsInRoZSIsImZpbGUiLCJleHBlY3RlZFJlc3VsdCIsImRlc3RpbmF0aW9uIiwiYm9pbGVyUGxhdGUiLCJwYXRoc05lZWRpbmdCaW5kaW5nIiwiZmlsZXNOZWVkaW5nQmluZGluZyIsImFfYm9pbGVyX3BsYXRlc19tYW5hZ2VyIiwiZm9sZGVycyIsImNvcHkiLCJzaW5vbiIsInN0dWIiLCJmaWxlU3lzdGVtIiwicmVuYW1lU3luYyIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJjcmVhdGVJbnN0YW5jZSIsIml0Iiwic2hvdWxkIiwiYmUiLCJjYWxsZWRXaXRoIl0sIm1hcHBpbmdzIjoiOztBQUtBOztBQUVBQSxTQUFTLGdHQUFULEVBQTJHLFlBQU07QUFDN0csUUFBTUMscUJBQXFCLDZDQUEzQjtBQUNBLFFBQUlDLFVBQVUsSUFBZDtBQUNBLFFBQUlDLGlCQUFpQjtBQUNqQkMsYUFBSyxLQURZO0FBRWpCQyxjQUFNO0FBRlcsS0FBckI7QUFJQSxRQUFJQyxtQ0FBaUNILGVBQWVDLEdBQWhELG1CQUFpRUQsZUFBZUUsSUFBaEYsU0FBSjtBQUNBLFFBQUlFLGNBQWMsRUFBbEI7QUFDQSxRQUFJQyxjQUFjO0FBQ2RDLDZCQUFxQixDQUNqQlIsa0JBRGlCLENBRFA7QUFJZFMsNkJBQXFCO0FBSlAsS0FBbEI7O0FBT0EsS0FBQyxzQkFBYztBQUNYUixrQkFBVSxJQUFJUyxnREFBSixFQUFWOztBQUVBVCxnQkFBUVUsT0FBUixDQUFnQkMsSUFBaEIsR0FBdUJDLE1BQU1DLElBQU4sRUFBdkI7QUFDQWIsZ0JBQVFjLFVBQVIsQ0FBbUJDLFVBQW5CLEdBQWdDSCxNQUFNQyxJQUFOLEVBQWhDOztBQUVBYixnQkFBUWdCLG1CQUFSLENBQTRCQyxjQUE1QixDQUEyQ1gsV0FBM0MsRUFBd0RELFdBQXhELEVBQXFFSixjQUFyRTtBQUNILEtBUEQ7O0FBU0FpQixPQUFHLHdFQUFILEVBQTZFO0FBQUEsZUFBTWxCLFFBQVFjLFVBQVIsQ0FBbUJDLFVBQW5CLENBQThCSSxNQUE5QixDQUFxQ0MsRUFBckMsQ0FBd0NDLFVBQXhDLENBQW1EZixZQUFZQyxtQkFBWixDQUFnQyxDQUFoQyxDQUFuRCxFQUFzRkgsY0FBdEYsQ0FBTjtBQUFBLEtBQTdFO0FBQ0gsQ0ExQkQsRSxDQVBBIiwiZmlsZSI6IndoZW5fY3JlYXRpbmdfaW5zdGFuY2Vfd2l0aF9wYXRoc19uZWVkaW5nX2JpbmRpbmdfd2hlcmVfcGF0aHNfYXJlX3NlcGFyYXRlZF93aXRoX2ZvcndhcmRfc2xhc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmltcG9ydCB7IGFfYm9pbGVyX3BsYXRlc19tYW5hZ2VyIH0gZnJvbSAnLi9naXZlbi9hX2JvaWxlcl9wbGF0ZXNfbWFuYWdlcic7XG5cbmRlc2NyaWJlKCd3aGVuIGNyZWF0aW5nIGluc3RhbmNlIHdpdGggcGF0aHMgbmVlZGluZyBiaW5kaW5nIHdoZXJlIHBhdGhzIGFyZSBzZXBhcmF0ZWQgd2l0aCBmb3J3YXJkIHNsYXNoJywgKCkgPT4ge1xuICAgIGNvbnN0IGZpbGVOZWVkaW5nQmluZGluZyA9ICcvU29td2hlcmUvT24ve3t0aGV9fS9IYXJkZHJpdmUve3tmaWxlfX0udHh0JztcbiAgICBsZXQgY29udGV4dCA9IG51bGw7XG4gICAgbGV0IGJpbmRpbmdDb250ZXh0ID0ge1xuICAgICAgICB0aGU6ICd0aGUnLFxuICAgICAgICBmaWxlOiAnc29tZWZpbGUnXG4gICAgfTtcbiAgICBsZXQgZXhwZWN0ZWRSZXN1bHQgPSBgL1NvbXdoZXJlL09uLyR7YmluZGluZ0NvbnRleHQudGhlfS9IYXJkZHJpdmUvJHtiaW5kaW5nQ29udGV4dC5maWxlfS50eHRgO1xuICAgIGxldCBkZXN0aW5hdGlvbiA9ICcnO1xuICAgIGxldCBib2lsZXJQbGF0ZSA9IHtcbiAgICAgICAgcGF0aHNOZWVkaW5nQmluZGluZzogW1xuICAgICAgICAgICAgZmlsZU5lZWRpbmdCaW5kaW5nXG4gICAgICAgIF0sXG4gICAgICAgIGZpbGVzTmVlZGluZ0JpbmRpbmc6IFtdXG4gICAgfTtcblxuICAgIChiZWZvcmVFYWNoID0+IHtcbiAgICAgICAgY29udGV4dCA9IG5ldyBhX2JvaWxlcl9wbGF0ZXNfbWFuYWdlcigpO1xuXG4gICAgICAgIGNvbnRleHQuZm9sZGVycy5jb3B5ID0gc2lub24uc3R1YigpO1xuICAgICAgICBjb250ZXh0LmZpbGVTeXN0ZW0ucmVuYW1lU3luYyA9IHNpbm9uLnN0dWIoKTtcblxuICAgICAgICBjb250ZXh0LmJvaWxlclBsYXRlc01hbmFnZXIuY3JlYXRlSW5zdGFuY2UoYm9pbGVyUGxhdGUsIGRlc3RpbmF0aW9uLCBiaW5kaW5nQ29udGV4dCk7XG4gICAgfSkoKTtcbiAgIFxuICAgIGl0KCdzaG91bGQgZXhwYW5kIGJpbmRpbmdzIHdpdGggY29ycmVjdCB2YWx1ZXMgYW5kIHJlbmFtZSBwYXRoIGFjY29yZGluZ2x5JywgKCkgPT4gY29udGV4dC5maWxlU3lzdGVtLnJlbmFtZVN5bmMuc2hvdWxkLmJlLmNhbGxlZFdpdGgoYm9pbGVyUGxhdGUucGF0aHNOZWVkaW5nQmluZGluZ1swXSxleHBlY3RlZFJlc3VsdCkpO1xufSk7Il19