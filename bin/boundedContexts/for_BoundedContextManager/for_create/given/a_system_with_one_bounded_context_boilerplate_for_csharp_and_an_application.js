'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_system_with_one_bounded_context_boilerplate_for_csharp_and_an_application = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BoundedContextManager = require('../../../BoundedContextManager');

var _all2 = require('./all');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var a_system_with_one_bounded_context_boilerplate_for_csharp_and_an_application = exports.a_system_with_one_bounded_context_boilerplate_for_csharp_and_an_application = function (_all) {
    (0, _inherits3.default)(a_system_with_one_bounded_context_boilerplate_for_csharp_and_an_application, _all);

    function a_system_with_one_bounded_context_boilerplate_for_csharp_and_an_application() {
        (0, _classCallCheck3.default)(this, a_system_with_one_bounded_context_boilerplate_for_csharp_and_an_application);

        var _this = (0, _possibleConstructorReturn3.default)(this, (a_system_with_one_bounded_context_boilerplate_for_csharp_and_an_application.__proto__ || Object.getPrototypeOf(a_system_with_one_bounded_context_boilerplate_for_csharp_and_an_application)).call(this));

        _this.boilerPlatesManager = {
            boilerPlatesByLanguageAndType: sinon.stub().returns(_this.boilerPlates),
            createInstance: sinon.stub()
        };
        _this.applicationManager = {
            getApplicationFrom: sinon.stub().returns(_this.application)

        };
        _this.folders = {
            makeFolderIfNotExists: sinon.stub()
        };
        _this.fileSystem = {};

        _this.boundedContextManager = new _BoundedContextManager.BoundedContextManager(_this.boilerPlatesManager, _this.applicationManager, _this.folders, _this.fileSystem, logger);
        return _this;
    }

    return a_system_with_one_bounded_context_boilerplate_for_csharp_and_an_application;
}(_all2.all);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvZm9yX0JvdW5kZWRDb250ZXh0TWFuYWdlci9mb3JfY3JlYXRlL2dpdmVuL2Ffc3lzdGVtX3dpdGhfb25lX2JvdW5kZWRfY29udGV4dF9ib2lsZXJwbGF0ZV9mb3JfY3NoYXJwX2FuZF9hbl9hcHBsaWNhdGlvbi5qcyJdLCJuYW1lcyI6WyJhX3N5c3RlbV93aXRoX29uZV9ib3VuZGVkX2NvbnRleHRfYm9pbGVycGxhdGVfZm9yX2NzaGFycF9hbmRfYW5fYXBwbGljYXRpb24iLCJib2lsZXJQbGF0ZXNNYW5hZ2VyIiwiYm9pbGVyUGxhdGVzQnlMYW5ndWFnZUFuZFR5cGUiLCJzaW5vbiIsInN0dWIiLCJyZXR1cm5zIiwiYm9pbGVyUGxhdGVzIiwiY3JlYXRlSW5zdGFuY2UiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJnZXRBcHBsaWNhdGlvbkZyb20iLCJhcHBsaWNhdGlvbiIsImZvbGRlcnMiLCJtYWtlRm9sZGVySWZOb3RFeGlzdHMiLCJmaWxlU3lzdGVtIiwiYm91bmRlZENvbnRleHRNYW5hZ2VyIiwiQm91bmRlZENvbnRleHRNYW5hZ2VyIiwibG9nZ2VyIiwiYWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0E7O0FBQ0E7Ozs7QUFOQTs7Ozs7SUFPYUEsMkUsV0FBQUEsMkU7OztBQUNULDJGQUFjO0FBQUE7O0FBQUE7O0FBRVYsY0FBS0MsbUJBQUwsR0FBMkI7QUFDdkJDLDJDQUErQkMsTUFBTUMsSUFBTixHQUFhQyxPQUFiLENBQXFCLE1BQUtDLFlBQTFCLENBRFI7QUFFdkJDLDRCQUFnQkosTUFBTUMsSUFBTjtBQUZPLFNBQTNCO0FBSUEsY0FBS0ksa0JBQUwsR0FBMEI7QUFDdEJDLGdDQUFvQk4sTUFBTUMsSUFBTixHQUFhQyxPQUFiLENBQXFCLE1BQUtLLFdBQTFCOztBQURFLFNBQTFCO0FBSUEsY0FBS0MsT0FBTCxHQUFlO0FBQ1hDLG1DQUF1QlQsTUFBTUMsSUFBTjtBQURaLFNBQWY7QUFHQSxjQUFLUyxVQUFMLEdBQWtCLEVBQWxCOztBQUVBLGNBQUtDLHFCQUFMLEdBQTZCLElBQUlDLDRDQUFKLENBQTBCLE1BQUtkLG1CQUEvQixFQUFvRCxNQUFLTyxrQkFBekQsRUFBNkUsTUFBS0csT0FBbEYsRUFBMkYsTUFBS0UsVUFBaEcsRUFBNEdHLE1BQTVHLENBQTdCO0FBZlU7QUFnQmI7OztFQWpCNEZDLFMiLCJmaWxlIjoiYV9zeXN0ZW1fd2l0aF9vbmVfYm91bmRlZF9jb250ZXh0X2JvaWxlcnBsYXRlX2Zvcl9jc2hhcnBfYW5kX2FuX2FwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5pbXBvcnQgeyBCb3VuZGVkQ29udGV4dE1hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9Cb3VuZGVkQ29udGV4dE1hbmFnZXInO1xuaW1wb3J0IHsgYWxsIH0gZnJvbSAnLi9hbGwnO1xuZXhwb3J0IGNsYXNzIGFfc3lzdGVtX3dpdGhfb25lX2JvdW5kZWRfY29udGV4dF9ib2lsZXJwbGF0ZV9mb3JfY3NoYXJwX2FuZF9hbl9hcHBsaWNhdGlvbiBleHRlbmRzIGFsbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciA9IHtcbiAgICAgICAgICAgIGJvaWxlclBsYXRlc0J5TGFuZ3VhZ2VBbmRUeXBlOiBzaW5vbi5zdHViKCkucmV0dXJucyh0aGlzLmJvaWxlclBsYXRlcyksXG4gICAgICAgICAgICBjcmVhdGVJbnN0YW5jZTogc2lub24uc3R1YigpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb25NYW5hZ2VyID0ge1xuICAgICAgICAgICAgZ2V0QXBwbGljYXRpb25Gcm9tOiBzaW5vbi5zdHViKCkucmV0dXJucyh0aGlzLmFwcGxpY2F0aW9uKVxuXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZm9sZGVycyA9IHtcbiAgICAgICAgICAgIG1ha2VGb2xkZXJJZk5vdEV4aXN0czogc2lub24uc3R1YigpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmlsZVN5c3RlbSA9IHt9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ib3VuZGVkQ29udGV4dE1hbmFnZXIgPSBuZXcgQm91bmRlZENvbnRleHRNYW5hZ2VyKHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5hcHBsaWNhdGlvbk1hbmFnZXIsIHRoaXMuZm9sZGVycywgdGhpcy5maWxlU3lzdGVtLCBsb2dnZXIpO1xuICAgIH1cbn0iXX0=