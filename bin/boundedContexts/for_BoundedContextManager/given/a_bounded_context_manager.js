'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_bounded_context_manager = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _BoundedContextManager = require('../../BoundedContextManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var a_bounded_context_manager = exports.a_bounded_context_manager = function a_bounded_context_manager() {
    (0, _classCallCheck3.default)(this, a_bounded_context_manager);

    this.boilerPlatesManager = {};
    this.applicationManager = {};
    this.folders = {};
    this.fileSystem = {};

    this.boundedContextManager = new _BoundedContextManager.BoundedContextManager(this.boilerPlatesManager, this.applicationManager, this.folders, this.fileSystem, logger);
}; /*---------------------------------------------------------------------------------------------
    *  Copyright (c) Dolittle. All rights reserved.
    *  Licensed under the MIT License. See LICENSE in the project root for license information.
    *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvZm9yX0JvdW5kZWRDb250ZXh0TWFuYWdlci9naXZlbi9hX2JvdW5kZWRfY29udGV4dF9tYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImFfYm91bmRlZF9jb250ZXh0X21hbmFnZXIiLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiYXBwbGljYXRpb25NYW5hZ2VyIiwiZm9sZGVycyIsImZpbGVTeXN0ZW0iLCJib3VuZGVkQ29udGV4dE1hbmFnZXIiLCJCb3VuZGVkQ29udGV4dE1hbmFnZXIiLCJsb2dnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBS0E7Ozs7SUFDYUEseUIsV0FBQUEseUIsR0FDVCxxQ0FBYztBQUFBOztBQUNWLFNBQUtDLG1CQUFMLEdBQTJCLEVBQTNCO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEIsRUFBMUI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsRUFBbEI7O0FBRUEsU0FBS0MscUJBQUwsR0FBNkIsSUFBSUMsNENBQUosQ0FBMEIsS0FBS0wsbUJBQS9CLEVBQW9ELEtBQUtDLGtCQUF6RCxFQUE2RSxLQUFLQyxPQUFsRixFQUEyRixLQUFLQyxVQUFoRyxFQUE0R0csTUFBNUcsQ0FBN0I7QUFDSCxDLEVBZEwiLCJmaWxlIjoiYV9ib3VuZGVkX2NvbnRleHRfbWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaW1wb3J0IHsgQm91bmRlZENvbnRleHRNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vQm91bmRlZENvbnRleHRNYW5hZ2VyJztcbmV4cG9ydCBjbGFzcyBhX2JvdW5kZWRfY29udGV4dF9tYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyID0ge307XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb25NYW5hZ2VyID0ge307XG4gICAgICAgIHRoaXMuZm9sZGVycyA9IHt9O1xuICAgICAgICB0aGlzLmZpbGVTeXN0ZW0gPSB7fTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYm91bmRlZENvbnRleHRNYW5hZ2VyID0gbmV3IEJvdW5kZWRDb250ZXh0TWFuYWdlcih0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuYXBwbGljYXRpb25NYW5hZ2VyLCB0aGlzLmZvbGRlcnMsIHRoaXMuZmlsZVN5c3RlbSwgbG9nZ2VyKTtcbiAgICB9XG59Il19