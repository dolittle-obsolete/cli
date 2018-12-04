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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1ydW4uanMiXSwibmFtZXMiOlsiaXNXaW5kb3dzIiwicHJvY2VzcyIsInBsYXRmb3JtIiwiZnMiLCJleGlzdHNTeW5jIiwiZ2xvYmFscyIsImxvZ2dlciIsImVycm9yIiwiZG9saXR0bGVNb25nb0xhYmVsIiwic29ja2V0UGF0aCIsImRvY2tlciIsIkRvY2tlciIsImlzTW9uZ29SdW5uaW5nIiwibGlzdENvbnRhaW5lcnMiLCJlcnIiLCJjb250YWluZXJzIiwiZm9yRWFjaCIsImNvbnRhaW5lciIsIkxhYmVscyIsImhhc093blByb3BlcnR5IiwiaW5mbyIsInJ1biIsInN0ZG91dCIsInN0ZGVyciIsIlR0eSIsIkF0dGFjaHN0ZGluIiwiQXR0YWNoU3Rkb3V0IiwiQXR0YWNoU3RkZXJyIiwiRXhwb3NlZFBvcnRzIiwiZGF0YSIsImRvdG5ldFdhdGNoIiwiZG90bmV0IiwiY3dkIiwib24iLCJ3cml0ZSIsInRvU3RyaW5nIiwid2VicGFja1dhdGNoIiwid2VicGFja1BhdGgiLCJwYXRoIiwiam9pbiIsImVudiIsIkFQUERBVEEiLCJ3ZWJwYWNrIiwid2VicGFja0ZpbGUiLCJtYXRjaGVzIiwibGVuZ3RoIiwicHJvamVjdEpzb24iLCJkb3RuZXRSZXN0b3JlIiwibm9kZU1vZHVsZXMiLCJucG1JbnN0YWxsIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsWUFBWUMsUUFBUUMsUUFBUixJQUFvQixPQUFwQzs7QUFaQTs7Ozs7O0FBY0EsSUFBSSxDQUFDQyxhQUFHQyxVQUFILENBQWMsd0JBQWQsQ0FBTCxFQUE4QztBQUMxQ0Msc0JBQVFDLE1BQVIsQ0FBZUMsS0FBZixDQUFxQiw2RkFBckI7QUFDSCxDQUZELE1BRU87QUFDSCxRQUFNQyxxQkFBcUIsZ0JBQTNCOztBQUVBLFFBQUlDLGFBQWFULFlBQVUsZ0NBQVYsR0FBNEMsc0JB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OEIsbUJBQTlCLENBQWxCO0FBQ0EsUUFBSTdCLGFBQUdDLFVBQUgsQ0FBY3VDLFdBQWQsQ0FBSixFQUFnQztBQUM1QnRDLDBCQUFRQyxNQUFSLENBQWVjLElBQWYsQ0FBb0IsbUJBQXBCOztBQUVBLFlBQUk0QixjQUFjVixlQUFLQyxJQUFMLENBQVV0QyxRQUFRK0IsR0FBUixFQUFWLEVBQXdCLEtBQXhCLEVBQThCLGNBQTlCLENBQWxCO0FBQ0EsWUFBSSxDQUFDN0IsYUFBR0MsVUFBSCxDQUFjNEMsV0FBZCxDQUFMLEVBQWlDO0FBQzdCLGdCQUFJQyxhQUFhLHlCQUFLLGFBQUwsRUFBb0IsRUFBRWpCLEtBQUssT0FBUCxFQUFwQixDQUFqQjtBQUNBaUIsdUJBQVczQixNQUFYLENBQWtCVyxFQUFsQixDQUFxQixNQUFyQixFQUE2QixVQUFDSixJQUFEO0FBQUEsdUJBQVU1QixRQUFRcUIsTUFBUixDQUFlWSxLQUFmLENBQXFCTCxLQUFLTSxRQUFMLEVBQXJCLENBQVY7QUFBQSxhQUE3QjtBQUNBYyx1QkFBVzFCLE1BQVgsQ0FBa0JVLEVBQWxCLENBQXFCLE1BQXJCLEVBQTZCLFVBQUNKLElBQUQ7QUFBQSx1QkFBVTVCLFFBQVFzQixNQUFSLENBQWVXLEtBQWYsQ0FBcUJMLEtBQUtNLFFBQUwsRUFBckIsQ0FBVjtBQUFBLGFBQTdCO0FBQ0FjLHVCQUFXaEIsRUFBWCxDQUFjLE1BQWQsRUFBc0I7QUFBQSx1QkFBTUcsY0FBTjtBQUFBLGFBQXRCO0FBQ0gsU0FMRCxNQUtPO0FBQ0hBO0FBQ0g7QUFDSjtBQUNKIiwiZmlsZSI6ImRvbGl0dGxlLXJ1bi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4vZ2xvYmFscyc7XG5pbXBvcnQgeyBzcGF3biwgZXhlYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IERvY2tlciBmcm9tICdkb2NrZXJvZGUnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYic7XG5cbmxldCBpc1dpbmRvd3MgPSBwcm9jZXNzLnBsYXRmb3JtID09ICd3aW4zMic7XG5cbmlmICghZnMuZXhpc3RzU3luYygnLi9ib3VuZGVkLWNvbnRleHQuanNvbicpKSB7XG4gICAgZ2xvYmFscy5sb2dnZXIuZXJyb3IoJ01pc3NpbmcgXCJib3VuZGVkLWNvbnRleHQuanNvblwiIGZpbGUgLSBydW4gXCJkb2xpdHRsZSBydW5cIiBmcm9tIGEgZm9sZGVyIHRoYXQgaG9sZHMgdGhpcyBmaWxlJyk7XG59IGVsc2Uge1xuICAgIGNvbnN0IGRvbGl0dGxlTW9uZ29MYWJlbCA9ICdkb2xpdHRsZS1tb25nbyc7XG5cbiAgICBsZXQgc29ja2V0UGF0aCA9IGlzV2luZG93cz8nbnBpcGU6Ly8vLy4vcGlwZS9kb2NrZXJfZW5naW5lJzogJy92YXIvcnVuL2RvY2tlci5zb2NrJztcblxuICAgIGxldCBkb2NrZXIgPSBuZXcgRG9ja2VyKHsgc29ja2V0UGF0aDogc29ja2V0UGF0aCB9KTtcbiAgICBsZXQgaXNNb25nb1J1bm5pbmcgPSBmYWxzZTtcbiAgICBkb2NrZXIubGlzdENvbnRhaW5lcnMoKGVyciwgY29udGFpbmVycykgPT4ge1xuICAgICAgICBpZiggZXJyICkge1xuICAgICAgICAgICAgZ2xvYmFscy5sb2dnZXIuZXJyb3IoZXJyKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIGNvbnRhaW5lcnMgIT0gbnVsbCApIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXIuTGFiZWxzLmhhc093blByb3BlcnR5KGRvbGl0dGxlTW9uZ29MYWJlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnTW9uZ28gaXMgYWxyZWFkeSBydW5uaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIGlzTW9uZ29SdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNNb25nb1J1bm5pbmcpIHtcbiAgICAgICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJ1N0YXJ0aW5nIGEgTW9uZ29EQiBEb2NrZXIgQ29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIGRvY2tlci5ydW4oJ21vbmdvJywgW10sIFtwcm9jZXNzLnN0ZG91dCwgcHJvY2Vzcy5zdGRlcnJdLCB7XG4gICAgICAgICAgICAgICAgTGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgICAgICdkb2xpdHRsZS1tb25nbyc6ICd0cnVlJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgVHR5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hzdGRpbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgQXR0YWNoU3Rkb3V0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hTdGRlcnI6IHRydWUsXG4gICAgICAgICAgICAgICAgRXhwb3NlZFBvcnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICcyNzAxNy90Y3AnOiB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnIsIGRhdGEsIGNvbnRhaW5lcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vZ2xvYmFscy5sb2dnZXIuaW5mbyhkYXRhLlN0YXR1c0NvZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBkb3RuZXRXYXRjaCA9ICgpID0+IHtcbiAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnU3RhcnRpbmcgLk5FVCB3YXRjaGVyJyk7XG4gICAgICAgIGxldCBkb3RuZXQgPSBzcGF3bignZG90bmV0JywgWyd3YXRjaCcsJ3J1biddLCB7XG4gICAgICAgICAgICBjd2Q6ICdDb3JlJ1xuICAgICAgICB9KTtcbiAgICAgICAgZG90bmV0LnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiBwcm9jZXNzLnN0ZG91dC53cml0ZShkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgZG90bmV0LnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiBwcm9jZXNzLnN0ZGVyci53cml0ZShkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICB9O1xuXG4gICAgbGV0IHdlYnBhY2tXYXRjaCA9ICgpID0+IHtcbiAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnU3RhcnRpbmcgd2VicGFjayB3YXRjaGVyJyk7XG4gICAgICAgIFxuICAgICAgICBsZXQgd2VicGFja1BhdGggPSBpc1dpbmRvd3M/cGF0aC5qb2luKHByb2Nlc3MuZW52LkFQUERBVEEsJ25wbScsJ3dlYnBhY2suY21kJyk6J3dlYnBhY2snO1xuXG4gICAgICAgIGxldCB3ZWJwYWNrID0gc3Bhd24od2VicGFja1BhdGgsIFtcbiAgICAgICAgICAgICctLWNvbmZpZycsIHdlYnBhY2tGaWxlLFxuICAgICAgICAgICAgJy0tbW9kZScsICdkZXZlbG9wbWVudCcsXG4gICAgICAgICAgICAnLS13YXRjaCcsXG4gICAgICAgICAgICAnLS1ob3QnXSwge1xuICAgICAgICAgICAgY3dkOiAnLi9XZWInXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdlYnBhY2suc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICB3ZWJwYWNrLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiBwcm9jZXNzLnN0ZGVyci53cml0ZShkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICB9O1xuXG4gICAgZ2xvYignLi9Db3JlLyouY3Nwcm9qJywgKGVyciwgbWF0Y2hlcykgPT4ge1xuICAgICAgICBpZiAobWF0Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJy5ORVQgQ29yZSBwcm9qZWN0IGZvdW5kJyk7XG5cbiAgICAgICAgICAgIGxldCBwcm9qZWN0SnNvbiA9IHBhdGguam9pbignQ29yZScsJ29iaicsJ3Byb2plY3QuYXNzZXRzLmpzb24nKTtcblxuICAgICAgICAgICAgaWYoICFmcy5leGlzdHNTeW5jKHByb2plY3RKc29uKSkge1xuICAgICAgICAgICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJy5ORVQgUmVzdG9yZSBoYXMgbm90IHJhbiB5ZXQgLSBydW5uaW5nIGl0Jyk7XG4gICAgICAgICAgICAgICAgbGV0IGRvdG5ldFJlc3RvcmUgPSBleGVjKCdkb3RuZXQgcmVzdG9yZScsIHtcbiAgICAgICAgICAgICAgICAgICAgY3dkOiAnQ29yZSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkb3RuZXRSZXN0b3JlLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiBwcm9jZXNzLnN0ZG91dC53cml0ZShkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgICAgICAgICBkb3RuZXRSZXN0b3JlLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiBwcm9jZXNzLnN0ZGVyci53cml0ZShkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgICAgICAgICBkb3RuZXRSZXN0b3JlLm9uKCdleGl0JywgKCkgPT4gZG90bmV0V2F0Y2goKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvdG5ldFdhdGNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgfSk7XG5cbiAgICBsZXQgd2VicGFja0ZpbGUgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwnV2ViJywnd2VicGFjay5jb25maWcuanMnKTtcbiAgICBpZiggZnMuZXhpc3RzU3luYyh3ZWJwYWNrRmlsZSkpIHtcbiAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnV2ViIHByb2plY3QgZm91bmQnKTtcblxuICAgICAgICBsZXQgbm9kZU1vZHVsZXMgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwnV2ViJywnbm9kZV9tb2R1bGVzJyk7XG4gICAgICAgIGlmKCAhZnMuZXhpc3RzU3luYyhub2RlTW9kdWxlcykpIHtcbiAgICAgICAgICAgIGxldCBucG1JbnN0YWxsID0gZXhlYygnbnBtIGluc3RhbGwnLCB7IGN3ZDogJy4vV2ViJyB9KTtcbiAgICAgICAgICAgIG5wbUluc3RhbGwuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICAgICAgbnBtSW5zdGFsbC5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gcHJvY2Vzcy5zdGRlcnIud3JpdGUoZGF0YS50b1N0cmluZygpKSk7XG4gICAgICAgICAgICBucG1JbnN0YWxsLm9uKCdleGl0JywgKCkgPT4gd2VicGFja1dhdGNoKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VicGFja1dhdGNoKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=