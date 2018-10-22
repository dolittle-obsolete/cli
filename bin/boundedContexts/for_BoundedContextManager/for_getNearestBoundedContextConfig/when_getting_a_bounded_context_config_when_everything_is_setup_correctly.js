'use strict';

var _all = require('./given/all');

var _assert = require('assert');

var _BoundedContext = require('../../BoundedContext');

describe('when getting a bounded context config when everything is setup correctly', function () {
    var context = new _all.all();
    /**
     * @type{BoundedContext}
     */
    var result = null;

    (function (beforeEach) {
        result = context.boundedContextManager.getNearestBoundedContextConfig(context.startPath);
    })();
    it('should get a bounded context', function () {
        return expect(result).to.not.be.null;
    });
    it('should ask the filesystem of the nearest file searching upwards with the correct arguments', function () {
        return context.folders.getNearestFileSearchingUpwards.should.be.calledWith(context.startPath);
    });
    it('should read file from the correct path: ', function () {
        return context.fileSystem.readFileSync.should.be.calledWith(context.boundedContextPath);
    });
    it('should get a bounded context configuration with the correct application', function () {
        return result.application.should.equal(context.application);
    });
    it('should get a bounded context configuration with the correct boundedContext', function () {
        return result.boundedContext.should.equal(context.boundedContext);
    });
    it('should get a bounded context configuration with the correct boundedContextName', function () {
        return result.boundedContextName.should.equal(context.boundedContextName);
    });
    it('should get a bounded context configuration with the correct backend language', function () {
        return result.backend.language.should.equal(context.boundedContextBackendLanguage);
    });
}); /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Dolittle. All rights reserved.
     *  Licensed under the MIT License. See LICENSE in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvZm9yX0JvdW5kZWRDb250ZXh0TWFuYWdlci9mb3JfZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnL3doZW5fZ2V0dGluZ19hX2JvdW5kZWRfY29udGV4dF9jb25maWdfd2hlbl9ldmVyeXRoaW5nX2lzX3NldHVwX2NvcnJlY3RseS5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsImNvbnRleHQiLCJhbGwiLCJyZXN1bHQiLCJib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJnZXROZWFyZXN0Qm91bmRlZENvbnRleHRDb25maWciLCJzdGFydFBhdGgiLCJpdCIsImV4cGVjdCIsInRvIiwibm90IiwiYmUiLCJudWxsIiwiZm9sZGVycyIsImdldE5lYXJlc3RGaWxlU2VhcmNoaW5nVXB3YXJkcyIsInNob3VsZCIsImNhbGxlZFdpdGgiLCJmaWxlU3lzdGVtIiwicmVhZEZpbGVTeW5jIiwiYm91bmRlZENvbnRleHRQYXRoIiwiYXBwbGljYXRpb24iLCJlcXVhbCIsImJvdW5kZWRDb250ZXh0IiwiYm91bmRlZENvbnRleHROYW1lIiwiYmFja2VuZCIsImxhbmd1YWdlIiwiYm91bmRlZENvbnRleHRCYWNrZW5kTGFuZ3VhZ2UiXSwibWFwcGluZ3MiOiI7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBRUFBLFNBQVMsMEVBQVQsRUFBcUYsWUFBTTtBQUN2RixRQUFJQyxVQUFVLElBQUlDLFFBQUosRUFBZDtBQUNBOzs7QUFHQSxRQUFJQyxTQUFTLElBQWI7O0FBRUEsS0FBQyxzQkFBYztBQUNYQSxpQkFBU0YsUUFBUUcscUJBQVIsQ0FBOEJDLDhCQUE5QixDQUE2REosUUFBUUssU0FBckUsQ0FBVDtBQUNILEtBRkQ7QUFHQUMsT0FBRyw4QkFBSCxFQUFtQztBQUFBLGVBQU1DLE9BQU9MLE1BQVAsRUFBZU0sRUFBZixDQUFrQkMsR0FBbEIsQ0FBc0JDLEVBQXRCLENBQXlCQyxJQUEvQjtBQUFBLEtBQW5DO0FBQ0FMLE9BQUcsNEZBQUgsRUFDSTtBQUFBLGVBQU1OLFFBQVFZLE9BQVIsQ0FBZ0JDLDhCQUFoQixDQUErQ0MsTUFBL0MsQ0FBc0RKLEVBQXRELENBQXlESyxVQUF6RCxDQUFvRWYsUUFBUUssU0FBNUUsQ0FBTjtBQUFBLEtBREo7QUFFQUMsT0FBRywwQ0FBSCxFQUErQztBQUFBLGVBQU1OLFFBQVFnQixVQUFSLENBQW1CQyxZQUFuQixDQUFnQ0gsTUFBaEMsQ0FBdUNKLEVBQXZDLENBQTBDSyxVQUExQyxDQUFxRGYsUUFBUWtCLGtCQUE3RCxDQUFOO0FBQUEsS0FBL0M7QUFDQVosT0FBRyx5RUFBSCxFQUE4RTtBQUFBLGVBQU1KLE9BQU9pQixXQUFQLENBQW1CTCxNQUFuQixDQUEwQk0sS0FBMUIsQ0FBZ0NwQixRQUFRbUIsV0FBeEMsQ0FBTjtBQUFBLEtBQTlFO0FBQ0FiLE9BQUcsNEVBQUgsRUFBaUY7QUFBQSxlQUFNSixPQUFPbUIsY0FBUCxDQUFzQlAsTUFBdEIsQ0FBNkJNLEtBQTdCLENBQW1DcEIsUUFBUXFCLGNBQTNDLENBQU47QUFBQSxLQUFqRjtBQUNBZixPQUFHLGdGQUFILEVBQXFGO0FBQUEsZUFBTUosT0FBT29CLGtCQUFQLENBQTBCUixNQUExQixDQUFpQ00sS0FBakMsQ0FBdUNwQixRQUFRc0Isa0JBQS9DLENBQU47QUFBQSxLQUFyRjtBQUNBaEIsT0FBRyw4RUFBSCxFQUFtRjtBQUFBLGVBQU1KLE9BQU9xQixPQUFQLENBQWVDLFFBQWYsQ0FBd0JWLE1BQXhCLENBQStCTSxLQUEvQixDQUFxQ3BCLFFBQVF5Qiw2QkFBN0MsQ0FBTjtBQUFBLEtBQW5GO0FBQ0gsQ0FsQkQsRSxDQVJBIiwiZmlsZSI6IndoZW5fZ2V0dGluZ19hX2JvdW5kZWRfY29udGV4dF9jb25maWdfd2hlbl9ldmVyeXRoaW5nX2lzX3NldHVwX2NvcnJlY3RseS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IGFsbCB9IGZyb20gJy4vZ2l2ZW4vYWxsJztcbmltcG9ydCB7IGVxdWFsIH0gZnJvbSBcImFzc2VydFwiO1xuaW1wb3J0IHsgQm91bmRlZENvbnRleHQgfSBmcm9tICcuLi8uLi9Cb3VuZGVkQ29udGV4dCc7XG5cbmRlc2NyaWJlKCd3aGVuIGdldHRpbmcgYSBib3VuZGVkIGNvbnRleHQgY29uZmlnIHdoZW4gZXZlcnl0aGluZyBpcyBzZXR1cCBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgbGV0IGNvbnRleHQgPSBuZXcgYWxsKCk7XG4gICAgLyoqXG4gICAgICogQHR5cGV7Qm91bmRlZENvbnRleHR9XG4gICAgICovXG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG5cbiAgICAoYmVmb3JlRWFjaCA9PiB7XG4gICAgICAgIHJlc3VsdCA9IGNvbnRleHQuYm91bmRlZENvbnRleHRNYW5hZ2VyLmdldE5lYXJlc3RCb3VuZGVkQ29udGV4dENvbmZpZyhjb250ZXh0LnN0YXJ0UGF0aCk7XG4gICAgfSkoKTtcbiAgICBpdCgnc2hvdWxkIGdldCBhIGJvdW5kZWQgY29udGV4dCcsICgpID0+IGV4cGVjdChyZXN1bHQpLnRvLm5vdC5iZS5udWxsKTtcbiAgICBpdCgnc2hvdWxkIGFzayB0aGUgZmlsZXN5c3RlbSBvZiB0aGUgbmVhcmVzdCBmaWxlIHNlYXJjaGluZyB1cHdhcmRzIHdpdGggdGhlIGNvcnJlY3QgYXJndW1lbnRzJywgXG4gICAgICAgICgpID0+IGNvbnRleHQuZm9sZGVycy5nZXROZWFyZXN0RmlsZVNlYXJjaGluZ1Vwd2FyZHMuc2hvdWxkLmJlLmNhbGxlZFdpdGgoY29udGV4dC5zdGFydFBhdGgpKTtcbiAgICBpdCgnc2hvdWxkIHJlYWQgZmlsZSBmcm9tIHRoZSBjb3JyZWN0IHBhdGg6ICcsICgpID0+IGNvbnRleHQuZmlsZVN5c3RlbS5yZWFkRmlsZVN5bmMuc2hvdWxkLmJlLmNhbGxlZFdpdGgoY29udGV4dC5ib3VuZGVkQ29udGV4dFBhdGgpKTtcbiAgICBpdCgnc2hvdWxkIGdldCBhIGJvdW5kZWQgY29udGV4dCBjb25maWd1cmF0aW9uIHdpdGggdGhlIGNvcnJlY3QgYXBwbGljYXRpb24nLCAoKSA9PiByZXN1bHQuYXBwbGljYXRpb24uc2hvdWxkLmVxdWFsKGNvbnRleHQuYXBwbGljYXRpb24pKTtcbiAgICBpdCgnc2hvdWxkIGdldCBhIGJvdW5kZWQgY29udGV4dCBjb25maWd1cmF0aW9uIHdpdGggdGhlIGNvcnJlY3QgYm91bmRlZENvbnRleHQnLCAoKSA9PiByZXN1bHQuYm91bmRlZENvbnRleHQuc2hvdWxkLmVxdWFsKGNvbnRleHQuYm91bmRlZENvbnRleHQpKTtcbiAgICBpdCgnc2hvdWxkIGdldCBhIGJvdW5kZWQgY29udGV4dCBjb25maWd1cmF0aW9uIHdpdGggdGhlIGNvcnJlY3QgYm91bmRlZENvbnRleHROYW1lJywgKCkgPT4gcmVzdWx0LmJvdW5kZWRDb250ZXh0TmFtZS5zaG91bGQuZXF1YWwoY29udGV4dC5ib3VuZGVkQ29udGV4dE5hbWUpKTtcbiAgICBpdCgnc2hvdWxkIGdldCBhIGJvdW5kZWQgY29udGV4dCBjb25maWd1cmF0aW9uIHdpdGggdGhlIGNvcnJlY3QgYmFja2VuZCBsYW5ndWFnZScsICgpID0+IHJlc3VsdC5iYWNrZW5kLmxhbmd1YWdlLnNob3VsZC5lcXVhbChjb250ZXh0LmJvdW5kZWRDb250ZXh0QmFja2VuZExhbmd1YWdlKSk7XG59KTtcbiJdfQ==