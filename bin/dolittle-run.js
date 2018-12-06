#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _globals = require('./globals');

var _globals2 = _interopRequireDefault(_globals);

var _child_process = require('child_process');

var _dockerode = require('dockerode');

var _dockerode2 = _interopRequireDefault(_dockerode);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isWindows = process.platform == 'win32';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


if (!_fs2.default.existsSync('./bounded-context.json')) {
    _globals2.default.logger.error('Missing "bounded-context.json" file - run "dolittle run" from a folder that holds this file');
} else {
    var dolittleMongoLabel = 'dolittle-mongo';

    var socketPath = isWindows ? 'npipe:////./pipe/docker_engine' : '/var/run/docker.sock';

    var docker = new _dockerode2.default({ socketPath: socketPath });
    var isMongoRunning = false;
    docker.listContainers(function (err, containers) {
        if (err) {
            _globals2.default.logger.error(err);
            return;
        }

        if (containers != null) {
            containers.forEach(function (container) {
                if (container.Labels.hasOwnProperty(dolittleMongoLabel)) {
                    _globals2.default.logger.info('Mongo is already running');
                    isMongoRunning = true;
                }
            });
        }

        if (!isMongoRunning) {
            _globals2.default.logger.info('Starting a MongoDB Docker Container');

            docker.run('mongo', [], [process.stdout, process.stderr], {
                Labels: {
                    'dolittle-mongo': 'true'
                },
                Tty: false,
                Attachstdin: false,
                AttachStdout: false,
                AttachStderr: true,
                ExposedPorts: {
                    '27017/tcp': {}
                }
            }, function (err, data, container) {
                //globals.logger.info(data.StatusCode);
            });
        }
    });

    var dotnetWatch = function dotnetWatch() {
        _globals2.default.logger.info('Starting .NET watcher');
        var dotnet = (0, _child_process.spawn)('dotnet', ['watch', 'run'], {
            cwd: 'Core'
        });
        dotnet.stdout.on('data', function (data) {
            return process.stdout.write(data.toString());
        });
        dotnet.stderr.on('data', function (data) {
            return process.stderr.write(data.toString());
        });
    };

    var webpackWatch = function webpackWatch() {
        _globals2.default.logger.info('Starting webpack watcher');

        var webpackPath = isWindows ? _path2.default.join(process.env.APPDATA, 'npm', 'webpack.cmd') : 'webpack';

        var webpack = (0, _child_process.spawn)(webpackPath, ['--config', webpackFile, '--mode', 'development', '--watch', '--hot'], {
            cwd: './Web'
        });

        webpack.stdout.on('data', function (data) {
            return process.stdout.write(data.toString());
        });
        webpack.stderr.on('data', function (data) {
            return process.stderr.write(data.toString());
        });
    };

    (0, _glob2.default)('./Core/*.csproj', function (err, matches) {
        if (matches.length) {
            _globals2.default.logger.info('.NET Core project found');

            var projectJson = _path2.default.join('Core', 'obj', 'project.assets.json');

            if (!_fs2.default.existsSync(projectJson)) {
                _globals2.default.logger.info('.NET Restore has not ran yet - running it');
                var dotnetRestore = (0, _child_process.exec)('dotnet restore', {
                    cwd: 'Core'
                });
                dotnetRestore.stdout.on('data', function (data) {
                    return process.stdout.write(data.toString());
                });
                dotnetRestore.stderr.on('data', function (data) {
                    return process.stderr.write(data.toString());
                });
                dotnetRestore.on('exit', function () {
                    return dotnetWatch();
                });
            } else {
                dotnetWatch();
            }
        }
    });

    var webpackFile = _path2.default.join(process.cwd(), 'Web', 'webpack.config.js');
    if (_fs2.default.existsSync(webpackFile)) {
        _globals2.default.logger.info('Web project found');

        var nodeModules = _path2.default.join(process.cwd(), 'Web', 'node_modules');
        if (!_fs2.default.existsSync(nodeModules)) {
            var npmInstall = (0, _child_process.exec)('npm install', { cwd: './Web' });
            npmInstall.stdout.on('data', function (data) {
                return process.stdout.write(data.toString());
            });
            npmInstall.stderr.on('data', function (data) {
                return process.stderr.write(data.toString());
            });
            npmInstall.on('exit', function () {
                return webpackWatch();
            });
        } else {
            webpackWatch();
        }
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1ydW4uanMiXSwibmFtZXMiOlsiaXNXaW5kb3dzIiwicHJvY2VzcyIsInBsYXRmb3JtIiwiZnMiLCJleGlzdHNTeW5jIiwiZ2xvYmFscyIsImxvZ2dlciIsImVycm9yIiwiZG9saXR0bGVNb25nb0xhYmVsIiwic29ja2V0UGF0aCIsImRvY2tlciIsIkRvY2tlciIsImlzTW9uZ29SdW5uaW5nIiwibGlzdENvbnRhaW5lcnMiLCJlcnIiLCJjb250YWluZXJzIiwiZm9yRWFjaCIsImNvbnRhaW5lciIsIkxhYmVscyIsImhhc093blByb3BlcnR5IiwiaW5mbyIsInJ1biIsInN0ZG91dCIsInN0ZGVyciIsIlR0eSIsIkF0dGFjaHN0ZGluIiwiQXR0YWNoU3Rkb3V0IiwiQXR0YWNoU3RkZXJyIiwiRXhwb3NlZFBvcnRzIiwiZGF0YSIsImRvdG5ldFdhdGNoIiwiZG90bmV0IiwiY3dkIiwib24iLCJ3cml0ZSIsInRvU3RyaW5nIiwid2VicGFja1dhdGNoIiwid2VicGFja1BhdGgiLCJwYXRoIiwiam9pbiIsImVudiIsIkFQUERBVEEiLCJ3ZWJwYWNrIiwid2VicGFja0ZpbGUiLCJtYXRjaGVzIiwibGVuZ3RoIiwicHJvamVjdEpzb24iLCJkb3RuZXRSZXN0b3JlIiwibm9kZU1vZHVsZXMiLCJucG1JbnN0YWxsIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsWUFBWUMsUUFBUUMsUUFBUixJQUFvQixPQUFwQzs7QUFaQTs7Ozs7O0FBY0EsSUFBSSxDQUFDQyxhQUFHQyxVQUFILENBQWMsd0JBQWQsQ0FBTCxFQUE4QztBQUMxQ0Msc0JBQVFDLE1BQVIsQ0FBZUMsS0FBZixDQUFxQiw2RkFBckI7QUFDSCxDQUZELE1BRU87QUFDSCxRQUFNQyxxQkFBcUIsZ0JBQTNCOztBQUVBLFFBQUlDLGFBQWFULFlBQVUsZ0NBQVYsR0FBNEMsc0JB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OEIsbUJBQTlCLENBQWxCO0FBQ0EsUUFBSTdCLGFBQUdDLFVBQUgsQ0FBY3VDLFdBQWQsQ0FBSixFQUFnQztBQUM1QnRDLDBCQUFRQyxNQUFSLENBQWVjLElBQWYsQ0FBb0IsbUJBQXBCOztBQUVBLFlBQUk0QixjQUFjVixlQUFLQyxJQUFMLENBQVV0QyxRQUFRK0IsR0FBUixFQUFWLEVBQXdCLEtBQXhCLEVBQThCLGNBQTlCLENBQWxCO0FBQ0EsWUFBSSxDQUFDN0IsYUFBR0MsVUFBSCxDQUFjNEMsV0FBZCxDQUFMLEVBQWlDO0FBQzdCLGdCQUFJQyxhQUFhLHlCQUFLLGFBQUwsRUFBb0IsRUFBRWpCLEtBQUssT0FBUCxFQUFwQixDQUFqQjtBQUNBaUIsdUJBQVczQixNQUFYLENBQWtCVyxFQUFsQixDQUFxQixNQUFyQixFQUE2QixVQUFDSixJQUFEO0FBQUEsdUJBQVU1QixRQUFRcUIsTUFBUixDQUFlWSxLQUFmLENBQXFCTCxLQUFLTSxRQUFMLEVBQXJCLENBQVY7QUFBQSxhQUE3QjtBQUNBYyx1QkFBVzFCLE1BQVgsQ0FBa0JVLEVBQWxCLENBQXFCLE1BQXJCLEVBQTZCLFVBQUNKLElBQUQ7QUFBQSx1QkFBVTVCLFFBQVFzQixNQUFSLENBQWVXLEtBQWYsQ0FBcUJMLEtBQUtNLFFBQUwsRUFBckIsQ0FBVjtBQUFBLGFBQTdCO0FBQ0FjLHVCQUFXaEIsRUFBWCxDQUFjLE1BQWQsRUFBc0I7QUFBQSx1QkFBTUcsY0FBTjtBQUFBLGFBQXRCO0FBQ0gsU0FMRCxNQUtPO0FBQ0hBO0FBQ0g7QUFDSjtBQUNKIiwiZmlsZSI6ImRvbGl0dGxlLXJ1bi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcclxuaW1wb3J0IGdsb2JhbHMgZnJvbSAnLi9nbG9iYWxzJztcclxuaW1wb3J0IHsgc3Bhd24sIGV4ZWMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcclxuaW1wb3J0IERvY2tlciBmcm9tICdkb2NrZXJvZGUnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYic7XHJcblxyXG5sZXQgaXNXaW5kb3dzID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PSAnd2luMzInO1xyXG5cclxuaWYgKCFmcy5leGlzdHNTeW5jKCcuL2JvdW5kZWQtY29udGV4dC5qc29uJykpIHtcclxuICAgIGdsb2JhbHMubG9nZ2VyLmVycm9yKCdNaXNzaW5nIFwiYm91bmRlZC1jb250ZXh0Lmpzb25cIiBmaWxlIC0gcnVuIFwiZG9saXR0bGUgcnVuXCIgZnJvbSBhIGZvbGRlciB0aGF0IGhvbGRzIHRoaXMgZmlsZScpO1xyXG59IGVsc2Uge1xyXG4gICAgY29uc3QgZG9saXR0bGVNb25nb0xhYmVsID0gJ2RvbGl0dGxlLW1vbmdvJztcclxuXHJcbiAgICBsZXQgc29ja2V0UGF0aCA9IGlzV2luZG93cz8nbnBpcGU6Ly8vLy4vcGlwZS9kb2NrZXJfZW5naW5lJzogJy92YXIvcnVuL2RvY2tlci5zb2NrJztcclxuXHJcbiAgICBsZXQgZG9ja2VyID0gbmV3IERvY2tlcih7IHNvY2tldFBhdGg6IHNvY2tldFBhdGggfSk7XHJcbiAgICBsZXQgaXNNb25nb1J1bm5pbmcgPSBmYWxzZTtcclxuICAgIGRvY2tlci5saXN0Q29udGFpbmVycygoZXJyLCBjb250YWluZXJzKSA9PiB7XHJcbiAgICAgICAgaWYoIGVyciApIHtcclxuICAgICAgICAgICAgZ2xvYmFscy5sb2dnZXIuZXJyb3IoZXJyKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiggY29udGFpbmVycyAhPSBudWxsICkge1xyXG4gICAgICAgICAgICBjb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXIuTGFiZWxzLmhhc093blByb3BlcnR5KGRvbGl0dGxlTW9uZ29MYWJlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCdNb25nbyBpcyBhbHJlYWR5IHJ1bm5pbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICBpc01vbmdvUnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc01vbmdvUnVubmluZykge1xyXG4gICAgICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCdTdGFydGluZyBhIE1vbmdvREIgRG9ja2VyIENvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICAgICAgZG9ja2VyLnJ1bignbW9uZ28nLCBbXSwgW3Byb2Nlc3Muc3Rkb3V0LCBwcm9jZXNzLnN0ZGVycl0sIHtcclxuICAgICAgICAgICAgICAgIExhYmVsczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdkb2xpdHRsZS1tb25nbyc6ICd0cnVlJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFR0eTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBBdHRhY2hzdGRpbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBBdHRhY2hTdGRvdXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgQXR0YWNoU3RkZXJyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgRXhwb3NlZFBvcnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJzI3MDE3L3RjcCc6IHt9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIChlcnIsIGRhdGEsIGNvbnRhaW5lcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9nbG9iYWxzLmxvZ2dlci5pbmZvKGRhdGEuU3RhdHVzQ29kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBkb3RuZXRXYXRjaCA9ICgpID0+IHtcclxuICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCdTdGFydGluZyAuTkVUIHdhdGNoZXInKTtcclxuICAgICAgICBsZXQgZG90bmV0ID0gc3Bhd24oJ2RvdG5ldCcsIFsnd2F0Y2gnLCdydW4nXSwge1xyXG4gICAgICAgICAgICBjd2Q6ICdDb3JlJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRvdG5ldC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4gcHJvY2Vzcy5zdGRvdXQud3JpdGUoZGF0YS50b1N0cmluZygpKSk7XHJcbiAgICAgICAgZG90bmV0LnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiBwcm9jZXNzLnN0ZGVyci53cml0ZShkYXRhLnRvU3RyaW5nKCkpKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHdlYnBhY2tXYXRjaCA9ICgpID0+IHtcclxuICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCdTdGFydGluZyB3ZWJwYWNrIHdhdGNoZXInKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgd2VicGFja1BhdGggPSBpc1dpbmRvd3M/cGF0aC5qb2luKHByb2Nlc3MuZW52LkFQUERBVEEsJ25wbScsJ3dlYnBhY2suY21kJyk6J3dlYnBhY2snO1xyXG5cclxuICAgICAgICBsZXQgd2VicGFjayA9IHNwYXduKHdlYnBhY2tQYXRoLCBbXHJcbiAgICAgICAgICAgICctLWNvbmZpZycsIHdlYnBhY2tGaWxlLFxyXG4gICAgICAgICAgICAnLS1tb2RlJywgJ2RldmVsb3BtZW50JyxcclxuICAgICAgICAgICAgJy0td2F0Y2gnLFxyXG4gICAgICAgICAgICAnLS1ob3QnXSwge1xyXG4gICAgICAgICAgICBjd2Q6ICcuL1dlYidcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd2VicGFjay5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4gcHJvY2Vzcy5zdGRvdXQud3JpdGUoZGF0YS50b1N0cmluZygpKSk7XHJcbiAgICAgICAgd2VicGFjay5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gcHJvY2Vzcy5zdGRlcnIud3JpdGUoZGF0YS50b1N0cmluZygpKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdsb2IoJy4vQ29yZS8qLmNzcHJvaicsIChlcnIsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBpZiAobWF0Y2hlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnLk5FVCBDb3JlIHByb2plY3QgZm91bmQnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcm9qZWN0SnNvbiA9IHBhdGguam9pbignQ29yZScsJ29iaicsJ3Byb2plY3QuYXNzZXRzLmpzb24nKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCAhZnMuZXhpc3RzU3luYyhwcm9qZWN0SnNvbikpIHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJy5ORVQgUmVzdG9yZSBoYXMgbm90IHJhbiB5ZXQgLSBydW5uaW5nIGl0Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG90bmV0UmVzdG9yZSA9IGV4ZWMoJ2RvdG5ldCByZXN0b3JlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGN3ZDogJ0NvcmUnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRvdG5ldFJlc3RvcmUuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEudG9TdHJpbmcoKSkpO1xyXG4gICAgICAgICAgICAgICAgZG90bmV0UmVzdG9yZS5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gcHJvY2Vzcy5zdGRlcnIud3JpdGUoZGF0YS50b1N0cmluZygpKSk7XHJcbiAgICAgICAgICAgICAgICBkb3RuZXRSZXN0b3JlLm9uKCdleGl0JywgKCkgPT4gZG90bmV0V2F0Y2goKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkb3RuZXRXYXRjaCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCB3ZWJwYWNrRmlsZSA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCdXZWInLCd3ZWJwYWNrLmNvbmZpZy5qcycpO1xyXG4gICAgaWYoIGZzLmV4aXN0c1N5bmMod2VicGFja0ZpbGUpKSB7XHJcbiAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnV2ViIHByb2plY3QgZm91bmQnKTtcclxuXHJcbiAgICAgICAgbGV0IG5vZGVNb2R1bGVzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksJ1dlYicsJ25vZGVfbW9kdWxlcycpO1xyXG4gICAgICAgIGlmKCAhZnMuZXhpc3RzU3luYyhub2RlTW9kdWxlcykpIHtcclxuICAgICAgICAgICAgbGV0IG5wbUluc3RhbGwgPSBleGVjKCducG0gaW5zdGFsbCcsIHsgY3dkOiAnLi9XZWInIH0pO1xyXG4gICAgICAgICAgICBucG1JbnN0YWxsLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiBwcm9jZXNzLnN0ZG91dC53cml0ZShkYXRhLnRvU3RyaW5nKCkpKTtcclxuICAgICAgICAgICAgbnBtSW5zdGFsbC5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gcHJvY2Vzcy5zdGRlcnIud3JpdGUoZGF0YS50b1N0cmluZygpKSk7XHJcbiAgICAgICAgICAgIG5wbUluc3RhbGwub24oJ2V4aXQnLCAoKSA9PiB3ZWJwYWNrV2F0Y2goKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2VicGFja1dhdGNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==