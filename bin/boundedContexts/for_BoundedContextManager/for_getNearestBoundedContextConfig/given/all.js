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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _BoundedContextManager = require('../../../BoundedContextManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var all = exports.all = function (_a_bounded_context_ma) {
    (0, _inherits3.default)(all, _a_bounded_context_ma);

    function all() {
        (0, _classCallCheck3.default)(this, all);

        var _this = (0, _possibleConstructorReturn3.default)(this, (all.__proto__ || Object.getPrototypeOf(all)).call(this));

        _this.application = '9825572e-ea61-4ee4-86b8-dbc3f46919f6';
        _this.boundedContext = '61e6035e-2a63-465c-a149-4f2ac6824dac';
        _this.boundedContextName = 'BC';
        _this.boundedContextCoreLanguage = 'csharp';
        _this.boundedContextJson = '\n        {\n            "application": "' + _this.application + '",\n            "boundedContext": "' + _this.boundedContext + '",\n            "boundedContextName": "' + _this.boundedContextName + '",\n            "core": {\n              "language": "' + _this.boundedContextCoreLanguage + '"\n            }\n          }\n        ';
        _this.boundedContextPath = _path2.default.join('path', 'to', 'boundedcontext');
        _this.folders = {
            getNearestFileSearchingUpwards: sinon.stub().returns(_this.boundedContextPath)
        };
        _this.fileSystem = {
            readFileSync: sinon.stub().returns(_this.boundedContextJson)
        };
        _this.startPath = _path2.default.join('path', 'to', 'application');

        _this.boundedContextManager = new _BoundedContextManager.BoundedContextManager(_this.boilerPlatesManager, _this.applicationManager, _this.folders, _this.fileSystem, logger);

        return _this;
    }

    return all;
}(_a_bounded_context_manager.a_bounded_context_manager); /*---------------------------------------------------------------------------------------------
                                                          *  Copyright (c) Dolittle. All rights reserved.
                                                          *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                                          *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NvdXJjZS9ib3VuZGVkQ29udGV4dHMvZm9yX0JvdW5kZWRDb250ZXh0TWFuYWdlci9mb3JfZ2V0TmVhcmVzdEJvdW5kZWRDb250ZXh0Q29uZmlnL2dpdmVuL2FsbC5qcyJdLCJuYW1lcyI6WyJhbGwiLCJhcHBsaWNhdGlvbiIsImJvdW5kZWRDb250ZXh0IiwiYm91bmRlZENvbnRleHROYW1lIiwiYm91bmRlZENvbnRleHRDb3JlTGFuZ3VhZ2UiLCJib3VuZGVkQ29udGV4dEpzb24iLCJib3VuZGVkQ29udGV4dFBhdGgiLCJwYXRoIiwiam9pbiIsImZvbGRlcnMiLCJnZXROZWFyZXN0RmlsZVNlYXJjaGluZ1Vwd2FyZHMiLCJzaW5vbiIsInN0dWIiLCJyZXR1cm5zIiwiZmlsZVN5c3RlbSIsInJlYWRGaWxlU3luYyIsInN0YXJ0UGF0aCIsImJvdW5kZWRDb250ZXh0TWFuYWdlciIsIkJvdW5kZWRDb250ZXh0TWFuYWdlciIsImJvaWxlclBsYXRlc01hbmFnZXIiLCJhcHBsaWNhdGlvbk1hbmFnZXIiLCJsb2dnZXIiLCJhX2JvdW5kZWRfY29udGV4dF9tYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0E7O0FBQ0E7Ozs7QUFDQTs7OztJQUdhQSxHLFdBQUFBLEc7OztBQUNULG1CQUFjO0FBQUE7O0FBQUE7O0FBRVYsY0FBS0MsV0FBTCxHQUFtQixzQ0FBbkI7QUFDQSxjQUFLQyxjQUFMLEdBQXNCLHNDQUF0QjtBQUNBLGNBQUtDLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0EsY0FBS0MsMEJBQUwsR0FBa0MsUUFBbEM7QUFDQSxjQUFLQyxrQkFBTCxpREFHc0IsTUFBS0osV0FIM0IsMkNBSXlCLE1BQUtDLGNBSjlCLCtDQUs2QixNQUFLQyxrQkFMbEMsOERBT3FCLE1BQUtDLDBCQVAxQjtBQVdBLGNBQUtFLGtCQUFMLEdBQTBCQyxlQUFLQyxJQUFMLENBQVUsTUFBVixFQUFrQixJQUFsQixFQUF3QixnQkFBeEIsQ0FBMUI7QUFDQSxjQUFLQyxPQUFMLEdBQWU7QUFDWEMsNENBQWdDQyxNQUFNQyxJQUFOLEdBQWFDLE9BQWIsQ0FBcUIsTUFBS1Asa0JBQTFCO0FBRHJCLFNBQWY7QUFHQSxjQUFLUSxVQUFMLEdBQWtCO0FBQ2RDLDBCQUFjSixNQUFNQyxJQUFOLEdBQWFDLE9BQWIsQ0FBcUIsTUFBS1Isa0JBQTFCO0FBREEsU0FBbEI7QUFHQSxjQUFLVyxTQUFMLEdBQWlCVCxlQUFLQyxJQUFMLENBQVUsTUFBVixFQUFpQixJQUFqQixFQUFzQixhQUF0QixDQUFqQjs7QUFFQSxjQUFLUyxxQkFBTCxHQUE2QixJQUFJQyw0Q0FBSixDQUEwQixNQUFLQyxtQkFBL0IsRUFBb0QsTUFBS0Msa0JBQXpELEVBQTZFLE1BQUtYLE9BQWxGLEVBQTJGLE1BQUtLLFVBQWhHLEVBQTRHTyxNQUE1RyxDQUE3Qjs7QUExQlU7QUE2QmI7OztFQTlCb0JDLG9ELEdBVnpCIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuaW1wb3J0IHsgYV9ib3VuZGVkX2NvbnRleHRfbWFuYWdlciB9IGZyb20gJy4uLy4uL2dpdmVuL2FfYm91bmRlZF9jb250ZXh0X21hbmFnZXInO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBCb3VuZGVkQ29udGV4dE1hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9Cb3VuZGVkQ29udGV4dE1hbmFnZXInO1xuXG5cbmV4cG9ydCBjbGFzcyBhbGwgZXh0ZW5kcyBhX2JvdW5kZWRfY29udGV4dF9tYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbiA9ICc5ODI1NTcyZS1lYTYxLTRlZTQtODZiOC1kYmMzZjQ2OTE5ZjYnO1xuICAgICAgICB0aGlzLmJvdW5kZWRDb250ZXh0ID0gJzYxZTYwMzVlLTJhNjMtNDY1Yy1hMTQ5LTRmMmFjNjgyNGRhYyc7XG4gICAgICAgIHRoaXMuYm91bmRlZENvbnRleHROYW1lID0gJ0JDJztcbiAgICAgICAgdGhpcy5ib3VuZGVkQ29udGV4dENvcmVMYW5ndWFnZSA9ICdjc2hhcnAnO1xuICAgICAgICB0aGlzLmJvdW5kZWRDb250ZXh0SnNvbiA9IFxuICAgICAgICBgXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb25cIjogXCIke3RoaXMuYXBwbGljYXRpb259XCIsXG4gICAgICAgICAgICBcImJvdW5kZWRDb250ZXh0XCI6IFwiJHt0aGlzLmJvdW5kZWRDb250ZXh0fVwiLFxuICAgICAgICAgICAgXCJib3VuZGVkQ29udGV4dE5hbWVcIjogXCIke3RoaXMuYm91bmRlZENvbnRleHROYW1lfVwiLFxuICAgICAgICAgICAgXCJjb3JlXCI6IHtcbiAgICAgICAgICAgICAgXCJsYW5ndWFnZVwiOiBcIiR7dGhpcy5ib3VuZGVkQ29udGV4dENvcmVMYW5ndWFnZX1cIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgYDtcbiAgICAgICAgdGhpcy5ib3VuZGVkQ29udGV4dFBhdGggPSBwYXRoLmpvaW4oJ3BhdGgnLCAndG8nLCAnYm91bmRlZGNvbnRleHQnKTtcbiAgICAgICAgdGhpcy5mb2xkZXJzID0ge1xuICAgICAgICAgICAgZ2V0TmVhcmVzdEZpbGVTZWFyY2hpbmdVcHdhcmRzOiBzaW5vbi5zdHViKCkucmV0dXJucyh0aGlzLmJvdW5kZWRDb250ZXh0UGF0aClcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5maWxlU3lzdGVtID0ge1xuICAgICAgICAgICAgcmVhZEZpbGVTeW5jOiBzaW5vbi5zdHViKCkucmV0dXJucyh0aGlzLmJvdW5kZWRDb250ZXh0SnNvbilcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zdGFydFBhdGggPSBwYXRoLmpvaW4oJ3BhdGgnLCd0bycsJ2FwcGxpY2F0aW9uJyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJvdW5kZWRDb250ZXh0TWFuYWdlciA9IG5ldyBCb3VuZGVkQ29udGV4dE1hbmFnZXIodGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyLCB0aGlzLmFwcGxpY2F0aW9uTWFuYWdlciwgdGhpcy5mb2xkZXJzLCB0aGlzLmZpbGVTeXN0ZW0sIGxvZ2dlcik7XG5cblxuICAgIH1cbn0iXX0=