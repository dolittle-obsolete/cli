'use strict';

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _simpleGit = require('simple-git');

var _simpleGit2 = _interopRequireDefault(_simpleGit);

var _ConfigManager = require('./configuration/ConfigManager');

var _ConfigParser = require('./configuration/ConfigParser');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Folders = require('./Folders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { simpleGit } from 'simple-git';
var logger = _winston2.default.createLogger({
    level: 'info',
    format: _winston2.default.format.combine(_winston2.default.format.colorize(), _winston2.default.format.simple()),
    transports: [new _winston2.default.transports.Console()]
});

var configParser = new _ConfigParser.ConfigParser();
var configManager = new _ConfigManager.ConfigManager(_fs2.default, configParser, logger);
var folders = new _Folders.Folders(_fs2.default);

var boilerPlatesRoot = _path2.default.join(configManager.centralFolderLocation, 'boiler-plates');
folders.makeFolderIfNotExists(boilerPlatesRoot);

// If new - clone all boiler plates

// Use GitHub API to get all repositories
// Clone the ones we don't have - the ones we have, update 


var git = (0, _simpleGit2.default)(_path2.default.join(boilerPlatesRoot, 'FileTemplates'));
git.pull();

/*
git.silent(false)
    .clone(
        'https://github.com/dolittle-boilerplates/FileTemplates', 
        'boiler-plates/FileTemplates', 
        {'--recursive':null}, 
        (err, result) => {
            if( err ) console.error('Error', err);
            console.log('finished : ', result);
        });
*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS90LmpzIl0sIm5hbWVzIjpbImxvZ2dlciIsIndpbnN0b24iLCJjcmVhdGVMb2dnZXIiLCJsZXZlbCIsImZvcm1hdCIsImNvbWJpbmUiLCJjb2xvcml6ZSIsInNpbXBsZSIsInRyYW5zcG9ydHMiLCJDb25zb2xlIiwiY29uZmlnUGFyc2VyIiwiQ29uZmlnUGFyc2VyIiwiY29uZmlnTWFuYWdlciIsIkNvbmZpZ01hbmFnZXIiLCJmcyIsImZvbGRlcnMiLCJGb2xkZXJzIiwiYm9pbGVyUGxhdGVzUm9vdCIsInBhdGgiLCJqb2luIiwiY2VudHJhbEZvbGRlckxvY2F0aW9uIiwibWFrZUZvbGRlcklmTm90RXhpc3RzIiwiZ2l0IiwicHVsbCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7QUFDQSxJQUFNQSxTQUFTQyxrQkFBUUMsWUFBUixDQUFxQjtBQUNoQ0MsV0FBTyxNQUR5QjtBQUVoQ0MsWUFBUUgsa0JBQVFHLE1BQVIsQ0FBZUMsT0FBZixDQUNKSixrQkFBUUcsTUFBUixDQUFlRSxRQUFmLEVBREksRUFFSkwsa0JBQVFHLE1BQVIsQ0FBZUcsTUFBZixFQUZJLENBRndCO0FBTWhDQyxnQkFBWSxDQUNSLElBQUlQLGtCQUFRTyxVQUFSLENBQW1CQyxPQUF2QixFQURRO0FBTm9CLENBQXJCLENBQWY7O0FBV0EsSUFBSUMsZUFBZSxJQUFJQywwQkFBSixFQUFuQjtBQUNBLElBQUlDLGdCQUFnQixJQUFJQyw0QkFBSixDQUFrQkMsWUFBbEIsRUFBc0JKLFlBQXRCLEVBQW9DVixNQUFwQyxDQUFwQjtBQUNBLElBQUllLFVBQVUsSUFBSUMsZ0JBQUosQ0FBWUYsWUFBWixDQUFkOztBQUVBLElBQUlHLG1CQUFtQkMsZUFBS0MsSUFBTCxDQUFVUCxjQUFjUSxxQkFBeEIsRUFBK0MsZUFBL0MsQ0FBdkI7QUFDQUwsUUFBUU0scUJBQVIsQ0FBOEJKLGdCQUE5Qjs7QUFFQTs7QUFFQTtBQUNBOzs7QUFJQSxJQUFJSyxNQUFNLHlCQUFVSixlQUFLQyxJQUFMLENBQVVGLGdCQUFWLEVBQTJCLGVBQTNCLENBQVYsQ0FBVjtBQUNBSyxJQUFJQyxJQUFKOztBQUVBIiwiZmlsZSI6InQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2luc3RvbiBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBzaW1wbGVHaXQgZnJvbSAnc2ltcGxlLWdpdCc7XG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uL0NvbmZpZ01hbmFnZXInO1xuaW1wb3J0IHsgQ29uZmlnUGFyc2VyIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uL0NvbmZpZ1BhcnNlcic7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi9Gb2xkZXJzJztcblxuLy9pbXBvcnQgeyBzaW1wbGVHaXQgfSBmcm9tICdzaW1wbGUtZ2l0JztcbmNvbnN0IGxvZ2dlciA9IHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcbiAgICBsZXZlbDogJ2luZm8nLFxuICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcbiAgICAgICAgd2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSxcbiAgICAgICAgd2luc3Rvbi5mb3JtYXQuc2ltcGxlKClcbiAgICApLFxuICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKClcbiAgICBdXG59KTtcblxubGV0IGNvbmZpZ1BhcnNlciA9IG5ldyBDb25maWdQYXJzZXIoKTtcbmxldCBjb25maWdNYW5hZ2VyID0gbmV3IENvbmZpZ01hbmFnZXIoZnMsIGNvbmZpZ1BhcnNlciwgbG9nZ2VyKTtcbmxldCBmb2xkZXJzID0gbmV3IEZvbGRlcnMoZnMpO1xuXG5sZXQgYm9pbGVyUGxhdGVzUm9vdCA9IHBhdGguam9pbihjb25maWdNYW5hZ2VyLmNlbnRyYWxGb2xkZXJMb2NhdGlvbiwgJ2JvaWxlci1wbGF0ZXMnKTtcbmZvbGRlcnMubWFrZUZvbGRlcklmTm90RXhpc3RzKGJvaWxlclBsYXRlc1Jvb3QpO1xuXG4vLyBJZiBuZXcgLSBjbG9uZSBhbGwgYm9pbGVyIHBsYXRlc1xuXG4vLyBVc2UgR2l0SHViIEFQSSB0byBnZXQgYWxsIHJlcG9zaXRvcmllc1xuLy8gQ2xvbmUgdGhlIG9uZXMgd2UgZG9uJ3QgaGF2ZSAtIHRoZSBvbmVzIHdlIGhhdmUsIHVwZGF0ZSBcblxuXG5cbmxldCBnaXQgPSBzaW1wbGVHaXQocGF0aC5qb2luKGJvaWxlclBsYXRlc1Jvb3QsJ0ZpbGVUZW1wbGF0ZXMnKSk7XG5naXQucHVsbCgpO1xuXG4vKlxuZ2l0LnNpbGVudChmYWxzZSlcbiAgICAuY2xvbmUoXG4gICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vZG9saXR0bGUtYm9pbGVycGxhdGVzL0ZpbGVUZW1wbGF0ZXMnLCBcbiAgICAgICAgJ2JvaWxlci1wbGF0ZXMvRmlsZVRlbXBsYXRlcycsIFxuICAgICAgICB7Jy0tcmVjdXJzaXZlJzpudWxsfSwgXG4gICAgICAgIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYoIGVyciApIGNvbnNvbGUuZXJyb3IoJ0Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmaW5pc2hlZCA6ICcsIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuKi9cbiJdfQ==