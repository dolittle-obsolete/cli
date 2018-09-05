'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoundedContextManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*---------------------------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) Dolittle. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *--------------------------------------------------------------------------------------------*/


var _BoilerPlatesManager = require('../boilerPlates/BoilerPlatesManager');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _boilerPlatesManager = new WeakMap();
var _folders = new WeakMap();

/**
 * Represents the manager for bounded contexts
 */

var BoundedContextManager = exports.BoundedContextManager = function () {

  /**
   * Initializes a new instance of {BoundedContextManager}
   * @param {BoilerPlatesManager} boilerPlatesManager 
   * @param {Folders} folders
   */
  function BoundedContextManager(boilerPlatesManager, folders) {
    _classCallCheck(this, BoundedContextManager);

    _boilerPlatesManager.set(this, boilerPlatesManager);
    _folders.set(this, folders);
  }

  /**
   * 
   * @param {*} name 
   */


  _createClass(BoundedContextManager, [{
    key: 'create',
    value: function create(name) {
      var boilerPlate = _boilerPlatesManager.get(this).boilerPlatesByLanguageAndType("csharp", "boundedContext")[0];
      var destination = _path2.default.join(process.cwd(), name);
      _folders.get(this).makeFolderIfNotExists(destination);
      var context = {
        name: name
      };
      _boilerPlatesManager.get(this).createInstance(boilerPlate, destination, context);
    }
  }]);

  return BoundedContextManager;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9ib3VuZGVkY29udGV4dHMvQm91bmRlZENvbnRleHRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIl9ib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiV2Vha01hcCIsIl9mb2xkZXJzIiwiQm91bmRlZENvbnRleHRNYW5hZ2VyIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImZvbGRlcnMiLCJzZXQiLCJuYW1lIiwiYm9pbGVyUGxhdGUiLCJnZXQiLCJib2lsZXJQbGF0ZXNCeUxhbmd1YWdlQW5kVHlwZSIsImRlc3RpbmF0aW9uIiwicGF0aCIsImpvaW4iLCJwcm9jZXNzIiwiY3dkIiwibWFrZUZvbGRlcklmTm90RXhpc3RzIiwiY29udGV4dCIsImNyZWF0ZUluc3RhbmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O3FqQkFBQTs7Ozs7O0FBSUE7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsdUJBQXVCLElBQUlDLE9BQUosRUFBN0I7QUFDQSxJQUFNQyxXQUFXLElBQUlELE9BQUosRUFBakI7O0FBR0E7Ozs7SUFHYUUscUIsV0FBQUEscUI7O0FBRVQ7Ozs7O0FBS0EsaUNBQVlDLG1CQUFaLEVBQWlDQyxPQUFqQyxFQUEwQztBQUFBOztBQUN0Q0wseUJBQXFCTSxHQUFyQixDQUF5QixJQUF6QixFQUErQkYsbUJBQS9CO0FBQ0FGLGFBQVNJLEdBQVQsQ0FBYSxJQUFiLEVBQW1CRCxPQUFuQjtBQUNIOztBQUVEOzs7Ozs7OzsyQkFJT0UsSSxFQUFNO0FBQ1QsVUFBSUMsY0FBY1IscUJBQXFCUyxHQUFyQixDQUF5QixJQUF6QixFQUErQkMsNkJBQS9CLENBQTZELFFBQTdELEVBQXVFLGdCQUF2RSxFQUF5RixDQUF6RixDQUFsQjtBQUNBLFVBQUlDLGNBQWNDLGVBQUtDLElBQUwsQ0FBVUMsUUFBUUMsR0FBUixFQUFWLEVBQXdCUixJQUF4QixDQUFsQjtBQUNBTCxlQUFTTyxHQUFULENBQWEsSUFBYixFQUFtQk8scUJBQW5CLENBQXlDTCxXQUF6QztBQUNBLFVBQUlNLFVBQVU7QUFDVlYsY0FBTUE7QUFESSxPQUFkO0FBR0FQLDJCQUFxQlMsR0FBckIsQ0FBeUIsSUFBekIsRUFBK0JTLGNBQS9CLENBQThDVixXQUE5QyxFQUEyREcsV0FBM0QsRUFBd0VNLE9BQXhFO0FBQ0giLCJmaWxlIjoiQm91bmRlZENvbnRleHRNYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgQm9pbGVyUGxhdGVzTWFuYWdlciB9IGZyb20gJy4uL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZXNNYW5hZ2VyJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCBfYm9pbGVyUGxhdGVzTWFuYWdlciA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBfZm9sZGVycyA9IG5ldyBXZWFrTWFwKCk7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBtYW5hZ2VyIGZvciBib3VuZGVkIGNvbnRleHRzXG4gKi9cbmV4cG9ydCBjbGFzcyBCb3VuZGVkQ29udGV4dE1hbmFnZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2Yge0JvdW5kZWRDb250ZXh0TWFuYWdlcn1cbiAgICAgKiBAcGFyYW0ge0JvaWxlclBsYXRlc01hbmFnZXJ9IGJvaWxlclBsYXRlc01hbmFnZXIgXG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYm9pbGVyUGxhdGVzTWFuYWdlciwgZm9sZGVycykge1xuICAgICAgICBfYm9pbGVyUGxhdGVzTWFuYWdlci5zZXQodGhpcywgYm9pbGVyUGxhdGVzTWFuYWdlcik7XG4gICAgICAgIF9mb2xkZXJzLnNldCh0aGlzLCBmb2xkZXJzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0geyp9IG5hbWUgXG4gICAgICovXG4gICAgY3JlYXRlKG5hbWUpIHtcbiAgICAgICAgbGV0IGJvaWxlclBsYXRlID0gX2JvaWxlclBsYXRlc01hbmFnZXIuZ2V0KHRoaXMpLmJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlKFwiY3NoYXJwXCIsIFwiYm91bmRlZENvbnRleHRcIilbMF07XG4gICAgICAgIGxldCBkZXN0aW5hdGlvbiA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLG5hbWUpO1xuICAgICAgICBfZm9sZGVycy5nZXQodGhpcykubWFrZUZvbGRlcklmTm90RXhpc3RzKGRlc3RpbmF0aW9uKTtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH07XG4gICAgICAgIF9ib2lsZXJQbGF0ZXNNYW5hZ2VyLmdldCh0aGlzKS5jcmVhdGVJbnN0YW5jZShib2lsZXJQbGF0ZSwgZGVzdGluYXRpb24sIGNvbnRleHQpO1xuICAgIH1cbn0iXX0=