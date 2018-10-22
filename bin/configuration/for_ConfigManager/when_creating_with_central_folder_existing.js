'use strict';

var _all_dependencies = require('./given/all_dependencies');

var _ConfigManager = require('../ConfigManager');

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

describe('when creating with central folder existing', function () {
    var context = null;

    (function (beforeEach) {
        context = new _all_dependencies.all_dependencies();
        context.fs.existsSync = sinon.stub().returns(true);
        context.configManager = new _ConfigManager.ConfigManager(context.fs, context.configParser, logger);
    })();

    it('should not be considered a first run', function () {
        return context.configManager.isFirstRun.should.be.false;
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1NvdXJjZS9jb25maWd1cmF0aW9uL2Zvcl9Db25maWdNYW5hZ2VyL3doZW5fY3JlYXRpbmdfd2l0aF9jZW50cmFsX2ZvbGRlcl9leGlzdGluZy5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsImNvbnRleHQiLCJhbGxfZGVwZW5kZW5jaWVzIiwiZnMiLCJleGlzdHNTeW5jIiwic2lub24iLCJzdHViIiwicmV0dXJucyIsImNvbmZpZ01hbmFnZXIiLCJDb25maWdNYW5hZ2VyIiwiY29uZmlnUGFyc2VyIiwibG9nZ2VyIiwiaXQiLCJpc0ZpcnN0UnVuIiwic2hvdWxkIiwiYmUiLCJmYWxzZSJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7QUFDQTs7QUFOQTs7Ozs7QUFTQUEsU0FBUyw0Q0FBVCxFQUF1RCxZQUFNO0FBQ3pELFFBQUlDLFVBQVUsSUFBZDs7QUFFQSxLQUFDLHNCQUFjO0FBQ1hBLGtCQUFVLElBQUlDLGtDQUFKLEVBQVY7QUFDQUQsZ0JBQVFFLEVBQVIsQ0FBV0MsVUFBWCxHQUF3QkMsTUFBTUMsSUFBTixHQUFhQyxPQUFiLENBQXFCLElBQXJCLENBQXhCO0FBQ0FOLGdCQUFRTyxhQUFSLEdBQXdCLElBQUlDLDRCQUFKLENBQWtCUixRQUFRRSxFQUExQixFQUE4QkYsUUFBUVMsWUFBdEMsRUFBb0RDLE1BQXBELENBQXhCO0FBQ0gsS0FKRDs7QUFNQUMsT0FBRyxzQ0FBSCxFQUEyQztBQUFBLGVBQU1YLFFBQVFPLGFBQVIsQ0FBc0JLLFVBQXRCLENBQWlDQyxNQUFqQyxDQUF3Q0MsRUFBeEMsQ0FBMkNDLEtBQWpEO0FBQUEsS0FBM0M7QUFDSCxDQVZEIiwiZmlsZSI6IndoZW5fY3JlYXRpbmdfd2l0aF9jZW50cmFsX2ZvbGRlcl9leGlzdGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaW1wb3J0IHsgYWxsX2RlcGVuZGVuY2llcyB9IGZyb20gJy4vZ2l2ZW4vYWxsX2RlcGVuZGVuY2llcyc7XG5pbXBvcnQgeyBDb25maWdNYW5hZ2VyIH0gZnJvbSAnLi4vQ29uZmlnTWFuYWdlcic7XG5cblxuZGVzY3JpYmUoJ3doZW4gY3JlYXRpbmcgd2l0aCBjZW50cmFsIGZvbGRlciBleGlzdGluZycsICgpID0+IHtcbiAgICB2YXIgY29udGV4dCA9IG51bGw7XG5cbiAgICAoYmVmb3JlRWFjaCA9PiB7XG4gICAgICAgIGNvbnRleHQgPSBuZXcgYWxsX2RlcGVuZGVuY2llcygpO1xuICAgICAgICBjb250ZXh0LmZzLmV4aXN0c1N5bmMgPSBzaW5vbi5zdHViKCkucmV0dXJucyh0cnVlKTtcbiAgICAgICAgY29udGV4dC5jb25maWdNYW5hZ2VyID0gbmV3IENvbmZpZ01hbmFnZXIoY29udGV4dC5mcywgY29udGV4dC5jb25maWdQYXJzZXIsIGxvZ2dlcik7XG4gICAgfSkoKTtcblxuICAgIGl0KCdzaG91bGQgbm90IGJlIGNvbnNpZGVyZWQgYSBmaXJzdCBydW4nLCAoKSA9PiBjb250ZXh0LmNvbmZpZ01hbmFnZXIuaXNGaXJzdFJ1bi5zaG91bGQuYmUuZmFsc2UpO1xufSk7Il19