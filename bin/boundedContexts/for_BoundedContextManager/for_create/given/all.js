'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.all = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _a_bounded_context_manager = require('../../given/a_bounded_context_manager');

var _Application = require('../../../../applications/Application');

var _BoilerPlate = require('../../../../boilerPlates/BoilerPlate');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var boilerPlates = [new _BoilerPlate.BoilerPlate('csharp', 'Bounded Context Boilerplate', 'The Description', 'boundedContext')];

var all = exports.all = function (_a_bounded_context_ma) {
    (0, _inherits3.default)(all, _a_bounded_context_ma);

    function all() {
        (0, _classCallCheck3.default)(this, all);

        var _this = (0, _possibleConstructorReturn3.default)(this, (all.__proto__ || Object.getPrototypeOf(all)).call(this));

        _this.applicationId = '4ae234f0-82ff-454d-aab1-db87edf4d8a9';
        _this.applicationName = 'App';
        _this.application = new _Application.Application(_this.applicationId, _this.applicationName);
        _this.boilerPlates = boilerPlates;

        _this.context = {
            name: 'TheBoundedContext',
            destination: _path2.default.join('path', 'to', 'application')
        };

        return _this;
    }

    return all;
}(_a_bounded_context_manager.a_bounded_context_manager);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvZm9yX0JvdW5kZWRDb250ZXh0TWFuYWdlci9mb3JfY3JlYXRlL2dpdmVuL2FsbC5qcyJdLCJuYW1lcyI6WyJib2lsZXJQbGF0ZXMiLCJCb2lsZXJQbGF0ZSIsImFsbCIsImFwcGxpY2F0aW9uSWQiLCJhcHBsaWNhdGlvbk5hbWUiLCJhcHBsaWNhdGlvbiIsIkFwcGxpY2F0aW9uIiwiY29udGV4dCIsIm5hbWUiLCJkZXN0aW5hdGlvbiIsInBhdGgiLCJqb2luIiwiYV9ib3VuZGVkX2NvbnRleHRfbWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFSQTs7Ozs7QUFVQSxJQUFNQSxlQUFlLENBQ2pCLElBQUlDLHdCQUFKLENBQWdCLFFBQWhCLEVBQTBCLDZCQUExQixFQUF5RCxpQkFBekQsRUFBNEUsZ0JBQTVFLENBRGlCLENBQXJCOztJQUdhQyxHLFdBQUFBLEc7OztBQUNULG1CQUFjO0FBQUE7O0FBQUE7O0FBRVYsY0FBS0MsYUFBTCxHQUFxQixzQ0FBckI7QUFDQSxjQUFLQyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0EsY0FBS0MsV0FBTCxHQUFtQixJQUFJQyx3QkFBSixDQUFnQixNQUFLSCxhQUFyQixFQUFvQyxNQUFLQyxlQUF6QyxDQUFuQjtBQUNBLGNBQUtKLFlBQUwsR0FBb0JBLFlBQXBCOztBQUVBLGNBQUtPLE9BQUwsR0FBZTtBQUNYQyxrQkFBTSxtQkFESztBQUVYQyx5QkFBYUMsZUFBS0MsSUFBTCxDQUFVLE1BQVYsRUFBaUIsSUFBakIsRUFBc0IsYUFBdEI7QUFGRixTQUFmOztBQVBVO0FBYWI7OztFQWRvQkMsb0QiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgeyBhX2JvdW5kZWRfY29udGV4dF9tYW5hZ2VyIH0gZnJvbSAnLi4vLi4vZ2l2ZW4vYV9ib3VuZGVkX2NvbnRleHRfbWFuYWdlcic7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL2FwcGxpY2F0aW9ucy9BcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBCb2lsZXJQbGF0ZSB9IGZyb20gJy4uLy4uLy4uLy4uL2JvaWxlclBsYXRlcy9Cb2lsZXJQbGF0ZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuY29uc3QgYm9pbGVyUGxhdGVzID0gW1xuICAgIG5ldyBCb2lsZXJQbGF0ZSgnY3NoYXJwJywgJ0JvdW5kZWQgQ29udGV4dCBCb2lsZXJwbGF0ZScsICdUaGUgRGVzY3JpcHRpb24nLCAnYm91bmRlZENvbnRleHQnKVxuXTtcbmV4cG9ydCBjbGFzcyBhbGwgZXh0ZW5kcyBhX2JvdW5kZWRfY29udGV4dF9tYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbklkID0gJzRhZTIzNGYwLTgyZmYtNDU0ZC1hYWIxLWRiODdlZGY0ZDhhOSc7XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb25OYW1lID0gJ0FwcCc7XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb24gPSBuZXcgQXBwbGljYXRpb24odGhpcy5hcHBsaWNhdGlvbklkLCB0aGlzLmFwcGxpY2F0aW9uTmFtZSk7XG4gICAgICAgIHRoaXMuYm9pbGVyUGxhdGVzID0gYm9pbGVyUGxhdGVzO1xuXG4gICAgICAgIHRoaXMuY29udGV4dCA9IHtcbiAgICAgICAgICAgIG5hbWU6ICdUaGVCb3VuZGVkQ29udGV4dCcsXG4gICAgICAgICAgICBkZXN0aW5hdGlvbjogcGF0aC5qb2luKCdwYXRoJywndG8nLCdhcHBsaWNhdGlvbicpXG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgfVxufSJdfQ==