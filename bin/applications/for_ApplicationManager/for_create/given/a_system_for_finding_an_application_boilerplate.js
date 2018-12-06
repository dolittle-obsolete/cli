'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.a_system_for_finding_for_an_application_boilerplate = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ApplicationManager = require('../../../ApplicationManager');

var _BoilerPlate = require('../../../../boilerPlates/BoilerPlate');

var _an_application_manager = require('../../given/an_application_manager');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var boilerPlates = [new _BoilerPlate.BoilerPlate('csharp', 'Application Boilerplate', 'The Description', 'application')];

var a_system_for_finding_for_an_application_boilerplate = exports.a_system_for_finding_for_an_application_boilerplate = function (_an_application_manag) {
    (0, _inherits3.default)(a_system_for_finding_for_an_application_boilerplate, _an_application_manag);

    function a_system_for_finding_for_an_application_boilerplate() {
        (0, _classCallCheck3.default)(this, a_system_for_finding_for_an_application_boilerplate);

        var _this = (0, _possibleConstructorReturn3.default)(this, (a_system_for_finding_for_an_application_boilerplate.__proto__ || Object.getPrototypeOf(a_system_for_finding_for_an_application_boilerplate)).call(this));

        _this.boilerPlatesManager = {
            boilerPlatesByType: sinon.stub().returns(boilerPlates),
            createInstance: sinon.stub()
        };
        _this.boilerPlates = boilerPlates;
        _this.applicationManager = new _ApplicationManager.ApplicationManager(_this.boilerPlatesManager, _this.configManager, _this.folders, _this.fileSystem, logger);
        _this.context = {
            name: 'TheApplication',
            destination: _path2.default.join('path', 'to', 'application')
        };
        return _this;
    }

    return a_system_for_finding_for_an_application_boilerplate;
}(_an_application_manager.an_application_manager);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvZm9yX0FwcGxpY2F0aW9uTWFuYWdlci9mb3JfY3JlYXRlL2dpdmVuL2Ffc3lzdGVtX2Zvcl9maW5kaW5nX2FuX2FwcGxpY2F0aW9uX2JvaWxlcnBsYXRlLmpzIl0sIm5hbWVzIjpbImJvaWxlclBsYXRlcyIsIkJvaWxlclBsYXRlIiwiYV9zeXN0ZW1fZm9yX2ZpbmRpbmdfZm9yX2FuX2FwcGxpY2F0aW9uX2JvaWxlcnBsYXRlIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImJvaWxlclBsYXRlc0J5VHlwZSIsInNpbm9uIiwic3R1YiIsInJldHVybnMiLCJjcmVhdGVJbnN0YW5jZSIsImFwcGxpY2F0aW9uTWFuYWdlciIsIkFwcGxpY2F0aW9uTWFuYWdlciIsImNvbmZpZ01hbmFnZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImxvZ2dlciIsImNvbnRleHQiLCJuYW1lIiwiZGVzdGluYXRpb24iLCJwYXRoIiwiam9pbiIsImFuX2FwcGxpY2F0aW9uX21hbmFnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBUEE7Ozs7QUFRQSxJQUFNQSxlQUFlLENBQ2pCLElBQUlDLHdCQUFKLENBQWdCLFFBQWhCLEVBQTBCLHlCQUExQixFQUFxRCxpQkFBckQsRUFBd0UsYUFBeEUsQ0FEaUIsQ0FBckI7O0lBR2FDLG1ELFdBQUFBLG1EOzs7QUFDVCxtRUFBYztBQUFBOztBQUFBOztBQUVWLGNBQUtDLG1CQUFMLEdBQTJCO0FBQ3ZCQyxnQ0FBb0JDLE1BQU1DLElBQU4sR0FBYUMsT0FBYixDQUFxQlAsWUFBckIsQ0FERztBQUV2QlEsNEJBQWdCSCxNQUFNQyxJQUFOO0FBRk8sU0FBM0I7QUFJQSxjQUFLTixZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLGNBQUtTLGtCQUFMLEdBQTBCLElBQUlDLHNDQUFKLENBQXVCLE1BQUtQLG1CQUE1QixFQUFpRCxNQUFLUSxhQUF0RCxFQUFxRSxNQUFLQyxPQUExRSxFQUFtRixNQUFLQyxVQUF4RixFQUFvR0MsTUFBcEcsQ0FBMUI7QUFDQSxjQUFLQyxPQUFMLEdBQWU7QUFDWEMsa0JBQU0sZ0JBREs7QUFFWEMseUJBQWFDLGVBQUtDLElBQUwsQ0FBVSxNQUFWLEVBQWlCLElBQWpCLEVBQXNCLGFBQXRCO0FBRkYsU0FBZjtBQVJVO0FBWWI7OztFQWJvRUMsOEMiLCJmaWxlIjoiYV9zeXN0ZW1fZm9yX2ZpbmRpbmdfYW5fYXBwbGljYXRpb25fYm9pbGVycGxhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBBcHBsaWNhdGlvbk1hbmFnZXIgfSBmcm9tICcuLi8uLi8uLi9BcHBsaWNhdGlvbk1hbmFnZXInO1xuaW1wb3J0IHsgQm9pbGVyUGxhdGUgfSBmcm9tICcuLi8uLi8uLi8uLi9ib2lsZXJQbGF0ZXMvQm9pbGVyUGxhdGUnO1xuaW1wb3J0IHsgYW5fYXBwbGljYXRpb25fbWFuYWdlciB9IGZyb20gJy4uLy4uL2dpdmVuL2FuX2FwcGxpY2F0aW9uX21hbmFnZXInO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5jb25zdCBib2lsZXJQbGF0ZXMgPSBbXG4gICAgbmV3IEJvaWxlclBsYXRlKCdjc2hhcnAnLCAnQXBwbGljYXRpb24gQm9pbGVycGxhdGUnLCAnVGhlIERlc2NyaXB0aW9uJywgJ2FwcGxpY2F0aW9uJylcbl07XG5leHBvcnQgY2xhc3MgYV9zeXN0ZW1fZm9yX2ZpbmRpbmdfZm9yX2FuX2FwcGxpY2F0aW9uX2JvaWxlcnBsYXRlIGV4dGVuZHMgYW5fYXBwbGljYXRpb25fbWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciA9IHtcbiAgICAgICAgICAgIGJvaWxlclBsYXRlc0J5VHlwZTogc2lub24uc3R1YigpLnJldHVybnMoYm9pbGVyUGxhdGVzKSxcbiAgICAgICAgICAgIGNyZWF0ZUluc3RhbmNlOiBzaW5vbi5zdHViKClcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ib2lsZXJQbGF0ZXMgPSBib2lsZXJQbGF0ZXM7XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb25NYW5hZ2VyID0gbmV3IEFwcGxpY2F0aW9uTWFuYWdlcih0aGlzLmJvaWxlclBsYXRlc01hbmFnZXIsIHRoaXMuY29uZmlnTWFuYWdlciwgdGhpcy5mb2xkZXJzLCB0aGlzLmZpbGVTeXN0ZW0sIGxvZ2dlcik7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IHtcbiAgICAgICAgICAgIG5hbWU6ICdUaGVBcHBsaWNhdGlvbicsXG4gICAgICAgICAgICBkZXN0aW5hdGlvbjogcGF0aC5qb2luKCdwYXRoJywndG8nLCdhcHBsaWNhdGlvbicpXG4gICAgICAgIH07XG4gICAgfVxufSJdfQ==