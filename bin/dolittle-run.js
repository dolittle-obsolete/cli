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

if (!_fs2.default.existsSync('./bounded-context.json')) {
    _globals2.default.logger.error('Missing "bounded-context.json" file - run "dolittle run" from a folder that holds this file');
} else {
    var dolittleMongoLabel = 'dolittle-mongo';

    var docker = new _dockerode2.default({ socketPath: '/var/run/docker.sock' });
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
        var webpack = (0, _child_process.spawn)('webpack', ['--config', webpackFile, '--mode', 'development', '--watch', '--hot'], {
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

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1ydW4uanMiXSwibmFtZXMiOlsiZnMiLCJleGlzdHNTeW5jIiwiZ2xvYmFscyIsImxvZ2dlciIsImVycm9yIiwiZG9saXR0bGVNb25nb0xhYmVsIiwiZG9ja2VyIiwiRG9ja2VyIiwic29ja2V0UGF0aCIsImlzTW9uZ29SdW5uaW5nIiwibGlzdENvbnRhaW5lcnMiLCJlcnIiLCJjb250YWluZXJzIiwiZm9yRWFjaCIsImNvbnRhaW5lciIsIkxhYmVscyIsImhhc093blByb3BlcnR5IiwiaW5mbyIsInJ1biIsInByb2Nlc3MiLCJzdGRvdXQiLCJzdGRlcnIiLCJUdHkiLCJBdHRhY2hzdGRpbiIsIkF0dGFjaFN0ZG91dCIsIkF0dGFjaFN0ZGVyciIsIkV4cG9zZWRQb3J0cyIsImRhdGEiLCJkb3RuZXRXYXRjaCIsImRvdG5ldCIsImN3ZCIsIm9uIiwiY29uc29sZSIsImxvZyIsInRvU3RyaW5nIiwid2VicGFja1dhdGNoIiwid2VicGFjayIsIndlYnBhY2tGaWxlIiwibWF0Y2hlcyIsImxlbmd0aCIsInByb2plY3RKc29uIiwicGF0aCIsImpvaW4iLCJkb3RuZXRSZXN0b3JlIiwibm9kZU1vZHVsZXMiLCJucG1JbnN0YWxsIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxDQUFDQSxhQUFHQyxVQUFILENBQWMsd0JBQWQsQ0FBTCxFQUE4QztBQUMxQ0Msc0JBQVFDLE1BQVIsQ0FBZUMsS0FBZixDQUFxQiw2RkFBckI7QUFDSCxDQUZELE1BRU87QUFDSCxRQUFNQyxxQkFBcUIsZ0JBQTNCOztBQUVBLFFBQUlDLFNBQVMsSUFBSUMsbUJBQUosQ0FBVyxFQUFFQyxZQUFZLHNCQUFkLEVBQVgsQ0FBYjtBQUNBLFFBQUlDLGlCQUFpQixLQUFyQjtBQUNBSCxXQUFPSSxjQUFQLENBQXNCLFVBQUNDLEdBQUQsRUFBTUMsVUFBTixFQUFx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RUFBNkIsVUFBQ0osSUFBRDtBQUFBLHVCQUFVSyxRQUFRQyxHQUFSLENBQVlOLEtBQUtPLFFBQUwsRUFBWixDQUFWO0FBQUEsYUFBN0I7QUFDQVcsdUJBQVd4QixNQUFYLENBQWtCVSxFQUFsQixDQUFxQixNQUFyQixFQUE2QixVQUFDSixJQUFEO0FBQUEsdUJBQVVLLFFBQVFDLEdBQVIsQ0FBWU4sS0FBS08sUUFBTCxFQUFaLENBQVY7QUFBQSxhQUE3QjtBQUNBVyx1QkFBV2QsRUFBWCxDQUFjLE1BQWQsRUFBc0I7QUFBQSx1QkFBTUksY0FBTjtBQUFBLGFBQXRCO0FBQ0gsU0FMRCxNQUtPO0FBQ0hBO0FBQ0g7QUFJSjtBQUNKOztBQWxIRCIsImZpbGUiOiJkb2xpdHRsZS1ydW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IGFyZ3MgZnJvbSAnYXJncyc7XG5pbXBvcnQgZ2xvYmFscyBmcm9tICcuL2dsb2JhbHMnO1xuaW1wb3J0IHsgc3Bhd24sIGV4ZWMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCBEb2NrZXIgZnJvbSAnZG9ja2Vyb2RlJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InO1xuXG5pZiAoIWZzLmV4aXN0c1N5bmMoJy4vYm91bmRlZC1jb250ZXh0Lmpzb24nKSkge1xuICAgIGdsb2JhbHMubG9nZ2VyLmVycm9yKCdNaXNzaW5nIFwiYm91bmRlZC1jb250ZXh0Lmpzb25cIiBmaWxlIC0gcnVuIFwiZG9saXR0bGUgcnVuXCIgZnJvbSBhIGZvbGRlciB0aGF0IGhvbGRzIHRoaXMgZmlsZScpO1xufSBlbHNlIHtcbiAgICBjb25zdCBkb2xpdHRsZU1vbmdvTGFiZWwgPSAnZG9saXR0bGUtbW9uZ28nO1xuXG4gICAgbGV0IGRvY2tlciA9IG5ldyBEb2NrZXIoeyBzb2NrZXRQYXRoOiAnL3Zhci9ydW4vZG9ja2VyLnNvY2snIH0pO1xuICAgIGxldCBpc01vbmdvUnVubmluZyA9IGZhbHNlO1xuICAgIGRvY2tlci5saXN0Q29udGFpbmVycygoZXJyLCBjb250YWluZXJzKSA9PiB7XG4gICAgICAgIGlmKCBlcnIgKSB7XG4gICAgICAgICAgICBnbG9iYWxzLmxvZ2dlci5lcnJvcihlcnIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiggY29udGFpbmVycyAhPSBudWxsICkge1xuICAgICAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5MYWJlbHMuaGFzT3duUHJvcGVydHkoZG9saXR0bGVNb25nb0xhYmVsKSkge1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCdNb25nbyBpcyBhbHJlYWR5IHJ1bm5pbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgaXNNb25nb1J1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc01vbmdvUnVubmluZykge1xuICAgICAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnU3RhcnRpbmcgYSBNb25nb0RCIERvY2tlciBDb250YWluZXInKTtcblxuICAgICAgICAgICAgZG9ja2VyLnJ1bignbW9uZ28nLCBbXSwgW3Byb2Nlc3Muc3Rkb3V0LCBwcm9jZXNzLnN0ZGVycl0sIHtcbiAgICAgICAgICAgICAgICBMYWJlbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2RvbGl0dGxlLW1vbmdvJzogJ3RydWUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBUdHk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIEF0dGFjaHN0ZGluOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hTdGRvdXQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIEF0dGFjaFN0ZGVycjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBFeHBvc2VkUG9ydHM6IHtcbiAgICAgICAgICAgICAgICAgICAgJzI3MDE3L3RjcCc6IHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgKGVyciwgZGF0YSwgY29udGFpbmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy9nbG9iYWxzLmxvZ2dlci5pbmZvKGRhdGEuU3RhdHVzQ29kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IGRvdG5ldFdhdGNoID0gKCkgPT4ge1xuICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCdTdGFydGluZyAuTkVUIHdhdGNoZXInKTtcbiAgICAgICAgbGV0IGRvdG5ldCA9IHNwYXduKCdkb3RuZXQnLCBbJ3dhdGNoJywncnVuJ10sIHtcbiAgICAgICAgICAgIGN3ZDogJ0NvcmUnXG4gICAgICAgIH0pO1xuICAgICAgICBkb3RuZXQuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICBkb3RuZXQuc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgIH07XG5cbiAgICBsZXQgd2VicGFja1dhdGNoID0gKCkgPT4ge1xuICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCdTdGFydGluZyB3ZWJwYWNrIHdhdGNoZXInKTtcbiAgICAgICAgbGV0IHdlYnBhY2sgPSBzcGF3bignd2VicGFjaycsIFtcbiAgICAgICAgICAgICctLWNvbmZpZycsIHdlYnBhY2tGaWxlLFxuICAgICAgICAgICAgJy0tbW9kZScsICdkZXZlbG9wbWVudCcsXG4gICAgICAgICAgICAnLS13YXRjaCcsXG4gICAgICAgICAgICAnLS1ob3QnXSwge1xuICAgICAgICAgICAgY3dkOiAnLi9XZWInXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdlYnBhY2suc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICB3ZWJwYWNrLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICB9O1xuXG4gICAgZ2xvYignLi9Db3JlLyouY3Nwcm9qJywgKGVyciwgbWF0Y2hlcykgPT4ge1xuICAgICAgICBpZiAobWF0Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJy5ORVQgQ29yZSBwcm9qZWN0IGZvdW5kJyk7XG5cbiAgICAgICAgICAgIGxldCBwcm9qZWN0SnNvbiA9IHBhdGguam9pbignQ29yZScsJ29iaicsJ3Byb2plY3QuYXNzZXRzLmpzb24nKTtcblxuICAgICAgICAgICAgaWYoICFmcy5leGlzdHNTeW5jKHByb2plY3RKc29uKSkge1xuICAgICAgICAgICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJy5ORVQgUmVzdG9yZSBoYXMgbm90IHJhbiB5ZXQgLSBydW5uaW5nIGl0Jyk7XG4gICAgICAgICAgICAgICAgbGV0IGRvdG5ldFJlc3RvcmUgPSBleGVjKCdkb3RuZXQgcmVzdG9yZScsIHtcbiAgICAgICAgICAgICAgICAgICAgY3dkOiAnQ29yZSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkb3RuZXRSZXN0b3JlLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgICAgICAgICBkb3RuZXRSZXN0b3JlLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgICAgICAgICBkb3RuZXRSZXN0b3JlLm9uKCdleGl0JywgKCkgPT4gZG90bmV0V2F0Y2goKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvdG5ldFdhdGNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgfSk7XG5cbiAgICBsZXQgd2VicGFja0ZpbGUgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwnV2ViJywnd2VicGFjay5jb25maWcuanMnKTtcbiAgICBpZiggZnMuZXhpc3RzU3luYyh3ZWJwYWNrRmlsZSkpIHtcbiAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnV2ViIHByb2plY3QgZm91bmQnKTtcblxuICAgICAgICBsZXQgbm9kZU1vZHVsZXMgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwnV2ViJywnbm9kZV9tb2R1bGVzJyk7XG4gICAgICAgIGlmKCAhZnMuZXhpc3RzU3luYyhub2RlTW9kdWxlcykpIHtcbiAgICAgICAgICAgIGxldCBucG1JbnN0YWxsID0gZXhlYygnbnBtIGluc3RhbGwnLCB7IGN3ZDogJy4vV2ViJyB9KTtcbiAgICAgICAgICAgIG5wbUluc3RhbGwuc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICAgICAgbnBtSW5zdGFsbC5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSk7XG4gICAgICAgICAgICBucG1JbnN0YWxsLm9uKCdleGl0JywgKCkgPT4gd2VicGFja1dhdGNoKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VicGFja1dhdGNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxufVxuIl19