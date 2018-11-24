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
        containers.forEach(function (container) {
            if (container.Labels.hasOwnProperty(dolittleMongoLabel)) {
                _globals2.default.logger.info('Mongo is already running');
                isMongoRunning = true;
            }
        });

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
            var yarn = (0, _child_process.exec)('yarn', { cwd: './Web' });
            yarn.stdout.on('data', function (data) {
                return console.log(data.toString());
            });
            yarn.stderr.on('data', function (data) {
                return console.log(data.toString());
            });
            yarn.on('exit', function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1ydW4uanMiXSwibmFtZXMiOlsiZnMiLCJleGlzdHNTeW5jIiwiZ2xvYmFscyIsImxvZ2dlciIsImVycm9yIiwiZG9saXR0bGVNb25nb0xhYmVsIiwiZG9ja2VyIiwiRG9ja2VyIiwic29ja2V0UGF0aCIsImlzTW9uZ29SdW5uaW5nIiwibGlzdENvbnRhaW5lcnMiLCJlcnIiLCJjb250YWluZXJzIiwiZm9yRWFjaCIsImNvbnRhaW5lciIsIkxhYmVscyIsImhhc093blByb3BlcnR5IiwiaW5mbyIsInJ1biIsInByb2Nlc3MiLCJzdGRvdXQiLCJzdGRlcnIiLCJUdHkiLCJBdHRhY2hzdGRpbiIsIkF0dGFjaFN0ZG91dCIsIkF0dGFjaFN0ZGVyciIsIkV4cG9zZWRQb3J0cyIsImRhdGEiLCJkb3RuZXRXYXRjaCIsImRvdG5ldCIsImN3ZCIsIm9uIiwiY29uc29sZSIsImxvZyIsInRvU3RyaW5nIiwid2VicGFja1dhdGNoIiwid2VicGFjayIsIndlYnBhY2tGaWxlIiwibWF0Y2hlcyIsImxlbmd0aCIsInByb2plY3RKc29uIiwicGF0aCIsImpvaW4iLCJkb3RuZXRSZXN0b3JlIiwibm9kZU1vZHVsZXMiLCJ5YXJuIl0sIm1hcHBpbmdzIjoiOztBQU1BOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxDQUFDQSxhQUFHQyxVQUFILENBQWMsd0JBQWQsQ0FBTCxFQUE4QztBQUMxQ0Msc0JBQVFDLE1BQVIsQ0FBZUMsS0FBZixDQUFxQiw2RkFBckI7QUFDSCxDQUZELE1BRU87QUFDSCxRQUFNQyxxQkFBcUIsZ0JBQTNCOztBQUVBLFFBQUlDLFNBQVMsSUFBSUMsbUJBQUosQ0FBVyxFQUFFQyxZQUFZLHNCQUFkLEVBQVgsQ0FBYjtBQUNBLFFBQUlDLGlCQUFpQixLQUFyQjtBQUNBSCxXQUFPSSxjQUFQLENBQXNCLFVBQUNDLEdBQUQsRUFBTUMsVUFBTixFQUFxQjtBQUN2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dUIsVUFBQ0osSUFBRDtBQUFBLHVCQUFVSyxRQUFRQyxHQUFSLENBQVlOLEtBQUtPLFFBQUwsRUFBWixDQUFWO0FBQUEsYUFBdkI7QUFDQVcsaUJBQUtkLEVBQUwsQ0FBUSxNQUFSLEVBQWdCO0FBQUEsdUJBQU1JLGNBQU47QUFBQSxhQUFoQjtBQUNILFNBTEQsTUFLTztBQUNIQTtBQUNIO0FBSUo7QUFDSjs7QUEzR0QiLCJmaWxlIjoiZG9saXR0bGUtcnVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBhcmdzIGZyb20gJ2FyZ3MnO1xuaW1wb3J0IGdsb2JhbHMgZnJvbSAnLi9nbG9iYWxzJztcbmltcG9ydCB7IHNwYXduLCBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgRG9ja2VyIGZyb20gJ2RvY2tlcm9kZSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZ2xvYiBmcm9tICdnbG9iJztcblxuaWYgKCFmcy5leGlzdHNTeW5jKCcuL2JvdW5kZWQtY29udGV4dC5qc29uJykpIHtcbiAgICBnbG9iYWxzLmxvZ2dlci5lcnJvcignTWlzc2luZyBcImJvdW5kZWQtY29udGV4dC5qc29uXCIgZmlsZSAtIHJ1biBcImRvbGl0dGxlIHJ1blwiIGZyb20gYSBmb2xkZXIgdGhhdCBob2xkcyB0aGlzIGZpbGUnKTtcbn0gZWxzZSB7XG4gICAgY29uc3QgZG9saXR0bGVNb25nb0xhYmVsID0gJ2RvbGl0dGxlLW1vbmdvJztcblxuICAgIGxldCBkb2NrZXIgPSBuZXcgRG9ja2VyKHsgc29ja2V0UGF0aDogJy92YXIvcnVuL2RvY2tlci5zb2NrJyB9KTtcbiAgICBsZXQgaXNNb25nb1J1bm5pbmcgPSBmYWxzZTtcbiAgICBkb2NrZXIubGlzdENvbnRhaW5lcnMoKGVyciwgY29udGFpbmVycykgPT4ge1xuICAgICAgICBjb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIuTGFiZWxzLmhhc093blByb3BlcnR5KGRvbGl0dGxlTW9uZ29MYWJlbCkpIHtcbiAgICAgICAgICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCdNb25nbyBpcyBhbHJlYWR5IHJ1bm5pbmcnKTtcbiAgICAgICAgICAgICAgICBpc01vbmdvUnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaXNNb25nb1J1bm5pbmcpIHtcbiAgICAgICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJ1N0YXJ0aW5nIGEgTW9uZ29EQiBEb2NrZXIgQ29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIGRvY2tlci5ydW4oJ21vbmdvJywgW10sIFtwcm9jZXNzLnN0ZG91dCwgcHJvY2Vzcy5zdGRlcnJdLCB7XG4gICAgICAgICAgICAgICAgTGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgICAgICdkb2xpdHRsZS1tb25nbyc6ICd0cnVlJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgVHR5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hzdGRpbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgQXR0YWNoU3Rkb3V0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hTdGRlcnI6IHRydWUsXG4gICAgICAgICAgICAgICAgRXhwb3NlZFBvcnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICcyNzAxNy90Y3AnOiB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnIsIGRhdGEsIGNvbnRhaW5lcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vZ2xvYmFscy5sb2dnZXIuaW5mbyhkYXRhLlN0YXR1c0NvZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBkb3RuZXRXYXRjaCA9ICgpID0+IHtcbiAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnU3RhcnRpbmcgLk5FVCB3YXRjaGVyJyk7XG4gICAgICAgIGxldCBkb3RuZXQgPSBzcGF3bignZG90bmV0JywgWyd3YXRjaCcsJ3J1biddLCB7XG4gICAgICAgICAgICBjd2Q6ICdDb3JlJ1xuICAgICAgICB9KTtcbiAgICAgICAgZG90bmV0LnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgZG90bmV0LnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICB9O1xuXG4gICAgbGV0IHdlYnBhY2tXYXRjaCA9ICgpID0+IHtcbiAgICAgICAgZ2xvYmFscy5sb2dnZXIuaW5mbygnU3RhcnRpbmcgd2VicGFjayB3YXRjaGVyJyk7XG4gICAgICAgIGxldCB3ZWJwYWNrID0gc3Bhd24oJ3dlYnBhY2snLCBbXG4gICAgICAgICAgICAnLS1jb25maWcnLCB3ZWJwYWNrRmlsZSxcbiAgICAgICAgICAgICctLW1vZGUnLCAnZGV2ZWxvcG1lbnQnLFxuICAgICAgICAgICAgJy0td2F0Y2gnLFxuICAgICAgICAgICAgJy0taG90J10sIHtcbiAgICAgICAgICAgIGN3ZDogJy4vV2ViJ1xuICAgICAgICB9KTtcblxuICAgICAgICB3ZWJwYWNrLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgd2VicGFjay5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSk7XG4gICAgfTtcblxuICAgIGdsb2IoJy4vQ29yZS8qLmNzcHJvaicsIChlcnIsIG1hdGNoZXMpID0+IHtcbiAgICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCcuTkVUIENvcmUgcHJvamVjdCBmb3VuZCcpO1xuXG4gICAgICAgICAgICBsZXQgcHJvamVjdEpzb24gPSBwYXRoLmpvaW4oJ0NvcmUnLCdvYmonLCdwcm9qZWN0LmFzc2V0cy5qc29uJyk7XG5cbiAgICAgICAgICAgIGlmKCAhZnMuZXhpc3RzU3luYyhwcm9qZWN0SnNvbikpIHtcbiAgICAgICAgICAgICAgICBnbG9iYWxzLmxvZ2dlci5pbmZvKCcuTkVUIFJlc3RvcmUgaGFzIG5vdCByYW4geWV0IC0gcnVubmluZyBpdCcpO1xuICAgICAgICAgICAgICAgIGxldCBkb3RuZXRSZXN0b3JlID0gZXhlYygnZG90bmV0IHJlc3RvcmUnLCB7XG4gICAgICAgICAgICAgICAgICAgIGN3ZDogJ0NvcmUnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZG90bmV0UmVzdG9yZS5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSk7XG4gICAgICAgICAgICAgICAgZG90bmV0UmVzdG9yZS5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSk7XG4gICAgICAgICAgICAgICAgZG90bmV0UmVzdG9yZS5vbignZXhpdCcsICgpID0+IGRvdG5ldFdhdGNoKCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb3RuZXRXYXRjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgIH0pO1xuXG4gICAgbGV0IHdlYnBhY2tGaWxlID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksJ1dlYicsJ3dlYnBhY2suY29uZmlnLmpzJyk7XG4gICAgaWYoIGZzLmV4aXN0c1N5bmMod2VicGFja0ZpbGUpKSB7XG4gICAgICAgIGdsb2JhbHMubG9nZ2VyLmluZm8oJ1dlYiBwcm9qZWN0IGZvdW5kJyk7XG5cbiAgICAgICAgbGV0IG5vZGVNb2R1bGVzID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksJ1dlYicsJ25vZGVfbW9kdWxlcycpO1xuICAgICAgICBpZiggIWZzLmV4aXN0c1N5bmMobm9kZU1vZHVsZXMpKSB7XG4gICAgICAgICAgICBsZXQgeWFybiA9IGV4ZWMoJ3lhcm4nLCB7IGN3ZDogJy4vV2ViJyB9KTtcbiAgICAgICAgICAgIHlhcm4uc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEudG9TdHJpbmcoKSkpO1xuICAgICAgICAgICAgeWFybi5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS50b1N0cmluZygpKSk7XG4gICAgICAgICAgICB5YXJuLm9uKCdleGl0JywgKCkgPT4gd2VicGFja1dhdGNoKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VicGFja1dhdGNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxufVxuIl19