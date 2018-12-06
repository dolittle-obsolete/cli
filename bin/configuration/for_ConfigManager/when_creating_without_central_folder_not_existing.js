'use strict';

var _a_config_manager = require('./given/a_config_manager');

describe('when creating without central folder not existing', function () {
    var context = null;

    (function (beforeEach) {
        context = new _a_config_manager.a_config_manager();
    })();

    it('should create the folder for the central location', function () {
        return context.fs.ensureDirSync.should.be.calledWith(context.configManager.centralFolderLocation);
    });
    it('should write initial config file', function () {
        return context.fs.writeFile.should.be.calledWith(context.configManager.configFileLocation);
    });
    it('should be considered a first run', function () {
        return context.configManager.isFirstRun.should.be.true;
    });
}); /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Dolittle. All rights reserved.
     *  Licensed under the MIT License. See LICENSE in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL2Zvcl9Db25maWdNYW5hZ2VyL3doZW5fY3JlYXRpbmdfd2l0aG91dF9jZW50cmFsX2ZvbGRlcl9ub3RfZXhpc3RpbmcuanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJjb250ZXh0IiwiYV9jb25maWdfbWFuYWdlciIsIml0IiwiZnMiLCJlbnN1cmVEaXJTeW5jIiwic2hvdWxkIiwiYmUiLCJjYWxsZWRXaXRoIiwiY29uZmlnTWFuYWdlciIsImNlbnRyYWxGb2xkZXJMb2NhdGlvbiIsIndyaXRlRmlsZSIsImNvbmZpZ0ZpbGVMb2NhdGlvbiIsImlzRmlyc3RSdW4iLCJ0cnVlIl0sIm1hcHBpbmdzIjoiOztBQUtBOztBQUVBQSxTQUFTLG1EQUFULEVBQThELFlBQU07QUFDaEUsUUFBSUMsVUFBVSxJQUFkOztBQUVBLEtBQUMsc0JBQWM7QUFDWEEsa0JBQVUsSUFBSUMsa0NBQUosRUFBVjtBQUNILEtBRkQ7O0FBSUFDLE9BQUcsbURBQUgsRUFBd0Q7QUFBQSxlQUFNRixRQUFRRyxFQUFSLENBQVdDLGFBQVgsQ0FBeUJDLE1BQXpCLENBQWdDQyxFQUFoQyxDQUFtQ0MsVUFBbkMsQ0FBOENQLFFBQVFRLGFBQVIsQ0FBc0JDLHFCQUFwRSxDQUFOO0FBQUEsS0FBeEQ7QUFDQVAsT0FBRyxrQ0FBSCxFQUF1QztBQUFBLGVBQU1GLFFBQVFHLEVBQVIsQ0FBV08sU0FBWCxDQUFxQkwsTUFBckIsQ0FBNEJDLEVBQTVCLENBQStCQyxVQUEvQixDQUEwQ1AsUUFBUVEsYUFBUixDQUFzQkcsa0JBQWhFLENBQU47QUFBQSxLQUF2QztBQUNBVCxPQUFHLGtDQUFILEVBQXVDO0FBQUEsZUFBTUYsUUFBUVEsYUFBUixDQUFzQkksVUFBdEIsQ0FBaUNQLE1BQWpDLENBQXdDQyxFQUF4QyxDQUEyQ08sSUFBakQ7QUFBQSxLQUF2QztBQUNILENBVkQsRSxDQVBBIiwiZmlsZSI6IndoZW5fY3JlYXRpbmdfd2l0aG91dF9jZW50cmFsX2ZvbGRlcl9ub3RfZXhpc3RpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmltcG9ydCB7IGFfY29uZmlnX21hbmFnZXIgfSBmcm9tICcuL2dpdmVuL2FfY29uZmlnX21hbmFnZXInO1xuXG5kZXNjcmliZSgnd2hlbiBjcmVhdGluZyB3aXRob3V0IGNlbnRyYWwgZm9sZGVyIG5vdCBleGlzdGluZycsICgpID0+IHtcbiAgICB2YXIgY29udGV4dCA9IG51bGw7XG5cbiAgICAoYmVmb3JlRWFjaCA9PiB7XG4gICAgICAgIGNvbnRleHQgPSBuZXcgYV9jb25maWdfbWFuYWdlcigpO1xuICAgIH0pKCk7XG5cbiAgICBpdCgnc2hvdWxkIGNyZWF0ZSB0aGUgZm9sZGVyIGZvciB0aGUgY2VudHJhbCBsb2NhdGlvbicsICgpID0+IGNvbnRleHQuZnMuZW5zdXJlRGlyU3luYy5zaG91bGQuYmUuY2FsbGVkV2l0aChjb250ZXh0LmNvbmZpZ01hbmFnZXIuY2VudHJhbEZvbGRlckxvY2F0aW9uKSk7ICAgIFxuICAgIGl0KCdzaG91bGQgd3JpdGUgaW5pdGlhbCBjb25maWcgZmlsZScsICgpID0+IGNvbnRleHQuZnMud3JpdGVGaWxlLnNob3VsZC5iZS5jYWxsZWRXaXRoKGNvbnRleHQuY29uZmlnTWFuYWdlci5jb25maWdGaWxlTG9jYXRpb24pKTtcbiAgICBpdCgnc2hvdWxkIGJlIGNvbnNpZGVyZWQgYSBmaXJzdCBydW4nLCAoKSA9PiBjb250ZXh0LmNvbmZpZ01hbmFnZXIuaXNGaXJzdFJ1bi5zaG91bGQuYmUudHJ1ZSk7XG59KTsiXX0=