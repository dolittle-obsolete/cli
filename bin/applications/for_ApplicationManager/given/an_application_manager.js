'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.an_application_manager = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _ApplicationManager = require('../../ApplicationManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var an_application_manager = exports.an_application_manager = function an_application_manager() {
    (0, _classCallCheck3.default)(this, an_application_manager);


    this.applicationFileName = 'application.json';
    this.boilerPlatesManager = {};
    this.configManager = {};
    this.folders = {};
    this.fileSystem = {};

    this.applicationManager = new _ApplicationManager.ApplicationManager(this.boilerPlatesManager, this.configManager, this.folders, this.fileSystem, logger);
}; /*---------------------------------------------------------------------------------------------
    *  Copyright (c) Dolittle. All rights reserved.
    *  Licensed under the MIT License. See LICENSE in the project root for license information.
    *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1NvdXJjZS9hcHBsaWNhdGlvbnMvZm9yX0FwcGxpY2F0aW9uTWFuYWdlci9naXZlbi9hbl9hcHBsaWNhdGlvbl9tYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImFuX2FwcGxpY2F0aW9uX21hbmFnZXIiLCJhcHBsaWNhdGlvbkZpbGVOYW1lIiwiYm9pbGVyUGxhdGVzTWFuYWdlciIsImNvbmZpZ01hbmFnZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsImFwcGxpY2F0aW9uTWFuYWdlciIsIkFwcGxpY2F0aW9uTWFuYWdlciIsImxvZ2dlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFJQTs7OztJQUVhQSxzQixXQUFBQSxzQixHQUNULGtDQUFjO0FBQUE7OztBQUVWLFNBQUtDLG1CQUFMLEdBQTJCLGtCQUEzQjtBQUNBLFNBQUtDLG1CQUFMLEdBQTJCLEVBQTNCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixFQUFyQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixFQUFsQjs7QUFFQSxTQUFLQyxrQkFBTCxHQUEwQixJQUFJQyxzQ0FBSixDQUF1QixLQUFLTCxtQkFBNUIsRUFBaUQsS0FBS0MsYUFBdEQsRUFBcUUsS0FBS0MsT0FBMUUsRUFBbUYsS0FBS0MsVUFBeEYsRUFBb0dHLE1BQXBHLENBQTFCO0FBQ0gsQyxFQWhCTCIsImZpbGUiOiJhbl9hcHBsaWNhdGlvbl9tYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHsgQXBwbGljYXRpb25NYW5hZ2VyIH0gZnJvbSAnLi4vLi4vQXBwbGljYXRpb25NYW5hZ2VyJztcblxuZXhwb3J0IGNsYXNzIGFuX2FwcGxpY2F0aW9uX21hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMuYXBwbGljYXRpb25GaWxlTmFtZSA9ICdhcHBsaWNhdGlvbi5qc29uJztcbiAgICAgICAgdGhpcy5ib2lsZXJQbGF0ZXNNYW5hZ2VyID0ge307XG4gICAgICAgIHRoaXMuY29uZmlnTWFuYWdlciA9IHt9O1xuICAgICAgICB0aGlzLmZvbGRlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5maWxlU3lzdGVtID0ge307XG5cbiAgICAgICAgdGhpcy5hcHBsaWNhdGlvbk1hbmFnZXIgPSBuZXcgQXBwbGljYXRpb25NYW5hZ2VyKHRoaXMuYm9pbGVyUGxhdGVzTWFuYWdlciwgdGhpcy5jb25maWdNYW5hZ2VyLCB0aGlzLmZvbGRlcnMsIHRoaXMuZmlsZVN5c3RlbSwgbG9nZ2VyKTtcbiAgICB9XG59Il19