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
            return console.log(data.toString());
        });
        dotnet.stderr.on('data', function (data) {
            return console.log(data.toString());
        });
    };

    var webpackWatch = function webpackWatch() {
        _globals2.default.logger.info('Starting webpack watcher');

        var webpackPath = isWindows ? _path2.default.join(process.env.APPDATA, 'npm', 'webpack.cmd') : 'webpack';

        var webpack = (0, _child_process.spawn)(webpackPath, ['--config', webpackFile, '--mode', 'development', '--watch', '--hot'], {
            cwd: './Web'
        });

        webpack.stdout.on('data', function (data) {
            return console.log(data.toString());
        });
        webpack.stderr.on('data', function (data) {
            return console.log(data.toString());
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
                    return console.log(data.toString());
                });
                dotnetRestore.stderr.on('data', function (data) {
                    return console.log(data.toString());
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
                return console.log(data.toString());
            });
            npmInstall.stderr.on('data', function (data) {
                return console.log(data.toString());
            });
            npmInstall.on('exit', function () {
                return webpackWatch();
            });
        } else {
            webpackWatch();
        }
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1ydW4uanMiXSwibmFtZXMiOlsiaXNXaW5kb3dzIiwicHJvY2VzcyIsInBsYXRmb3JtIiwiZnMiLCJleGlzdHNTeW5jIiwiZ2xvYmFscyIsImxvZ2dlciIsImVycm9yIiwiZG9saXR0bGVNb25nb0xhYmVsIiwic29ja2V0UGF0aCIsImRvY2tlciIsIkRvY2tlciIsImlzTW9uZ29SdW5uaW5nIiwibGlzdENvbnRhaW5lcnMiLCJlcnIiLCJjb250YWluZXJzIiwiZm9yRWFjaCIsImNvbnRhaW5lciIsIkxhYmVscyIsImhhc093blByb3BlcnR5IiwiaW5mbyIsInJ1biIsInN0ZG91dCIsInN0ZGVyciIsIlR0eSIsIkF0dGFjaHN0ZGluIiwiQXR0YWNoU3Rkb3V0IiwiQXR0YWNoU3RkZXJyIiwiRXhwb3NlZFBvcnRzIiwiZGF0YSIsImRvdG5ldFdhdGNoIiwiZG90bmV0IiwiY3dkIiwib24iLCJjb25zb2xlIiwibG9nIiwidG9TdHJpbmciLCJ3ZWJwYWNrV2F0Y2giLCJ3ZWJwYWNrUGF0aCIsInBhdGgiLCJqb2luIiwiZW52IiwiQVBQREFUQSIsIndlYnBhY2siLCJ3ZWJwYWNrRmlsZSIsIm1hdGNoZXMiLCJsZW5ndGgiLCJwcm9qZWN0SnNvbiIsImRvdG5ldFJlc3RvcmUiLCJub2RlTW9kdWxlcyIsIm5wbUluc3RhbGwiXSwibWFwcGluZ3MiOiI7O0FBTUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxZQUFZQyxRQUFRQyxRQUFSLElBQW9CLE9BQXBDOztBQVpBOzs7Ozs7QUFjQSxJQUFJLENBQUNDLGFBQUdDLFVBQUgsQ0FBYyx3QkFBZCxDQUFMLEVBQThDO0FBQzFDQyxzQkFBUUMsTUFBUixDQUFlQyxLQUFmLENBQXFCLDZGQUFyQjtBQUNILENBRkQsTUFFTztBQUNILFFBQU1DLHFCQUFxQixnQkFBM0I7O0FBRUEsUUFBSUMsYUFBYVQsWUFBVSxnQ0FBVixH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UixDQUFlYyxJQUFmLENBQW9CLG1CQUFwQjs7QUFFQSxZQUFJNkIsY0FBY1YsZUFBS0MsSUFBTCxDQUFVdkMsUUFBUStCLEdBQVIsRUFBVixFQUF3QixLQUF4QixFQUE4QixjQUE5QixDQUFsQjtBQUNBLFlBQUksQ0FBQzdCLGFBQUdDLFVBQUgsQ0FBYzZDLFdBQWQsQ0FBTCxFQUFpQztBQUM3QixnQkFBSUMsYUFBYSx5QkFBSyxhQUFMLEVBQW9CLEVBQUVsQixLQUFLLE9BQVAsRUFBcEIsQ0FBakI7QUFDQWtCLHVCQUFXNUIsTUFBWCxDQUFrQlcsRUFBbEIsQ0FBcUIsTUFBckIsRUFBNkIsVUFBQ0osSUFBRDtBQUFBLHVCQUFVSyxRQUFRQyxHQUFSLENBQVlOLEtBQUtPLFFBQUwsRUFBWixDQUFWO0FBQUEsYUFBN0I7QUFDQWMsdUJBQVczQixNQUFYLENBQWtCVSxFQUFsQixDQUFxQixNQUFyQixFQUE2QixVQUFDSixJQUFEO0FBQUEsdUJBQVVLLFFBQVFDLEdBQVIsQ0FBWU4sS0FBS08sUUFBTCxFQUFaLENBQVY7QUFBQSxhQUE3QjtBQUNBYyx1QkFBV2pCLEVBQVgsQ0FBYyxNQUFkLEVBQXNCO0FBQUEsdUJBQU1JLGNBQU47QUFBQSxhQUF0QjtBQUNILFNBTEQsTUFLTztBQUNIQTtBQUNIO0FBSUo7QUFDSiIsImZpbGUiOiJkb2xpdHRsZS1ydW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFscyBmcm9tICcuL2dsb2JhbHMnO1xuaW1wb3J0IHsgc3Bhd24sIGV4ZWMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCBEb2NrZXIgZnJvbSAnZG9ja2Vyb2RlJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InO1xuXG5sZXQgaXNXaW5kb3dzID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PSAnd2luMzInO1xuXG5pZiAoIWZzLmV4aXN0c1N5bmMoJy4vYm91bmRlZC1jb250ZXh0Lmpzb24nKSkge1xuICAgIGdsb2JhbHMubG9nZ2VyLmVycm9yKCdNaXNzaW5nIFwiYm91bmRlZC1jb250ZXh0Lmpzb25cIiBmaWxlIC0gcnVuIFwiZG9saXR0bGUgcnVuXCIgZnJvbSBhIGZvbGRlciB0aGF0IGhvbGRzIHRoaXMgZmlsZScpO1xufSBlbHNlIHtcbiAgICBjb25zdCBkb2xpdHRsZU1vbmdvTGFiZWwgPSAnZG9saXR0bGUtbW9uZ28nO1xuXG4gICAgbGV0IHNvY2tldFBhdGggPSBpc1dpbmRvd3M/J25waXBlOi8vLy8uL3BpcGUvZG9ja2VyX2VuZ2luZSc6ICcvdmFyL3J1bi9kb2NrZXIuc29jayc7XG5cbiAgICBsZXQgZG9ja2VyID0gbmV3IERvY2tlcih7IHNvY2tldFBhdGg6IHNvY2tldFBhdGggfSk7XG4gICAgbGV0IGlzTW9uZ29SdW5uaW5nID0gZmFsc2U7XG4gICAgZG9ja2VyLmxpc3RDb250YWluZXJzKChlcnIsIGNvbnRhaW5lcnMpID0+IHtcbiAgICAgICAgaWYoIGVyciApIHtcbiAgICAgICAgICAgIGdsb2JhbHMubG9nZ2VyLmVycm9yKGVycilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCBjb250YWluZXJzICE9IG51bGwgKSB7XG4gICAgICAgICAgICBjb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyLkxhYmVscy5oYXNPd25Qcm9wZXJ0eShkb2xpdHRsZU1vbmdvTGFiZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJ01vbmdvIGlzIGFscmVhZHkgcnVubmluZycpO1xuICAgICAgICAgICAgICAgICAgICBpc01vbmdvUnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzTW9uZ29SdW5uaW5nKSB7XG4gICAgICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCdTdGFydGluZyBhIE1vbmdvREIgRG9ja2VyIENvbnRhaW5lcicpO1xuXG4gICAgICAgICAgICBkb2NrZXIucnVuKCdtb25nbycsIFtdLCBbcHJvY2Vzcy5zdGRvdXQsIHByb2Nlc3Muc3RkZXJyXSwge1xuICAgICAgICAgICAgICAgIExhYmVsczoge1xuICAgICAgICAgICAgICAgICAgICAnZG9saXR0bGUtbW9uZ28nOiAndHJ1ZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFR0eTogZmFsc2UsXG4gICAgICAgICAgICAgICAgQXR0YWNoc3RkaW46IGZhbHNlLFxuICAgICAgICAgICAgICAgIEF0dGFjaFN0ZG91dDogZmFsc2UsXG4gICAgICAgICAgICAgICAgQXR0YWNoU3RkZXJyOiB0cnVlLFxuICAgICAgICAgICAgICAgIEV4cG9zZWRQb3J0czoge1xuICAgICAgICAgICAgICAgICAgICAnMjcwMTcvdGNwJzoge31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAoZXJyLCBkYXRhLCBjb250YWluZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvL2dsb2JhbHMubG9nZ2VyLmluZm8oZGF0YS5TdGF0dXNDb2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgZG90bmV0V2F0Y2ggPSAoKSA9PiB7XG4gICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJ1N0YXJ0aW5nIC5ORVQgd2F0Y2hlcicpO1xuICAgICAgICBsZXQgZG90bmV0ID0gc3Bhd24oJ2RvdG5ldCcsIFsnd2F0Y2gnLCdydW4nXSwge1xuICAgICAgICAgICAgY3dkOiAnQ29yZSdcbiAgICAgICAgfSk7XG4gICAgICAgIGRvdG5ldC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSk7XG4gICAgICAgIGRvdG5ldC5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSk7XG4gICAgfTtcblxuICAgIGxldCB3ZWJwYWNrV2F0Y2ggPSAoKSA9PiB7XG4gICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJ1N0YXJ0aW5nIHdlYnBhY2sgd2F0Y2hlcicpO1xuICAgICAgICBcbiAgICAgICAgbGV0IHdlYnBhY2tQYXRoID0gaXNXaW5kb3dzP3BhdGguam9pbihwcm9jZXNzLmVudi5BUFBEQVRBLCducG0nLCd3ZWJwYWNrLmNtZCcpOid3ZWJwYWNrJztcblxuICAgICAgICBsZXQgd2VicGFjayA9IHNwYXduKHdlYnBhY2tQYXRoLCBbXG4gICAgICAgICAgICAnLS1jb25maWcnLCB3ZWJwYWNrRmlsZSxcbiAgICAgICAgICAgICctLW1vZGUnLCAnZGV2ZWxvcG1lbnQnLFxuICAgICAgICAgICAgJy0td2F0Y2gnLFxuICAgICAgICAgICAgJy0taG90J10sIHtcbiAgICAgICAgICAgIGN3ZDogJy4vV2ViJ1xuICAgICAgICB9KTtcblxuICAgICAgICB3ZWJwYWNrLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgd2VicGFjay5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSk7XG4gICAgfTtcblxuICAgIGdsb2IoJy4vQ29yZS8qLmNzcHJvaicsIChlcnIsIG1hdGNoZXMpID0+IHtcbiAgICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCcuTkVUIENvcmUgcHJvamVjdCBmb3VuZCcpO1xuXG4gICAgICAgICAgICBsZXQgcHJvamVjdEpzb24gPSBwYXRoLmpvaW4oJ0NvcmUnLCdvYmonLCdwcm9qZWN0LmFzc2V0cy5qc29uJyk7XG5cbiAgICAgICAgICAgIGlmKCAhZnMuZXhpc3RzU3luYyhwcm9qZWN0SnNvbikpIHtcbiAgICAgICAgICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCcuTkVUIFJlc3RvcmUgaGFzIG5vdCByYW4geWV0IC0gcnVubmluZyBpdCcpO1xuICAgICAgICAgICAgICAgIGxldCBkb3RuZXRSZXN0b3JlID0gZXhlYygnZG90bmV0IHJlc3RvcmUnLCB7XG4gICAgICAgICAgICAgICAgICAgIGN3ZDogJ0NvcmUnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZG90bmV0UmVzdG9yZS5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSk7XG4gICAgICAgICAgICAgICAgZG90bmV0UmVzdG9yZS5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSk7XG4gICAgICAgICAgICAgICAgZG90bmV0UmVzdG9yZS5vbignZXhpdCcsICgpID0+IGRvdG5ldFdhdGNoKCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb3RuZXRXYXRjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgIH0pO1xuXG4gICAgbGV0IHdlYnBhY2tGaWxlID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksJ1dlYicsJ3dlYnBhY2suY29uZmlnLmpzJyk7XG4gICAgaWYoIGZzLmV4aXN0c1N5bmMod2VicGFja0ZpbGUpKSB7XG4gICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJ1dlYiBwcm9qZWN0IGZvdW5kJyk7XG5cbiAgICAgICAgbGV0IG5vZGVNb2R1bGVzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksJ1dlYicsJ25vZGVfbW9kdWxlcycpO1xuICAgICAgICBpZiggIWZzLmV4aXN0c1N5bmMobm9kZU1vZHVsZXMpKSB7XG4gICAgICAgICAgICBsZXQgbnBtSW5zdGFsbCA9IGV4ZWMoJ25wbSBpbnN0YWxsJywgeyBjd2Q6ICcuL1dlYicgfSk7XG4gICAgICAgICAgICBucG1JbnN0YWxsLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgICAgIG5wbUluc3RhbGwuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICAgICAgbnBtSW5zdGFsbC5vbignZXhpdCcsICgpID0+IHdlYnBhY2tXYXRjaCgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdlYnBhY2tXYXRjaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cbn1cbiJdfQ==