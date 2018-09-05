'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpWrapper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*---------------------------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Copyright (c) Dolittle. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Licensed under the MIT License. See LICENSE in the project root for license information.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *--------------------------------------------------------------------------------------------*/


var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _stream = require('stream');

var streams = _interopRequireWildcard(_stream);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a wrapper for working with HTTP calls
 */
var HttpWrapper = exports.HttpWrapper = function () {
    function HttpWrapper() {
        _classCallCheck(this, HttpWrapper);
    }

    _createClass(HttpWrapper, [{
        key: 'get',


        /**
         * Get from a specific source with a specific mimetype and output into a stream
         * @param {string} source 
         * @param {string} mimeType 
         * @param {stream} stream 
         * @returns {Promise} A promise that can be continued
         */
        value: function get(source, mimeType, stream) {
            var promise = new Promise(function (resolve, reject) {
                var host = _url2.default.parse(source).host;
                var path = _url2.default.parse(source).pathname;

                var options = {
                    host: host,
                    path: path,
                    headers: {
                        "Content-Type": mimeType,
                        "User-Agent": "request"
                    }
                };

                _https2.default.get(options, function (res) {
                    res.on("data", function (chunk) {
                        if (stream) {
                            stream.write(chunk);
                        }
                    }).on("end", function () {
                        if (stream) {
                            stream.end();
                        }
                        resolve();
                    });
                });
            });
            return promise;
        }

        /**
         * Get text from a specific source with a specific mimetype
         * @param {*} source 
         * @param {*} mimetype 
         * @returns {Promise} A promise that can be continued with the result
         */

    }, {
        key: 'getText',
        value: function getText(source, mimetype) {
            var _this = this;

            var promise = new Promise(function (resolve, reject) {
                if (!mimetype) mimetype = "text";

                var stream = new streams.PassThrough();
                var text = "";
                stream.on("data", function (chunk) {
                    return text += chunk;
                });
                stream.on("end", function () {
                    return resolve(text);
                });

                _this.get(source, mimetype, stream);
            });
            return promise;
        }

        /**
         * Get HTML from a specific source with a specific mimetype
         * @param {*} source 
         * @returns {Promise} A promise that can be continued with the result
         */

    }, {
        key: 'getHtml',
        value: function getHtml(source) {
            return this.getText(source, "text/html");
        }

        /**
         * Get JSON from a specific source with a specific mimetype
         * @param {*} source 
         * @returns {Promise} A promise that can be continued with the result
         */

    }, {
        key: 'getJson',
        value: function getJson(source) {
            return this.getText(source, "application/json");
        }
    }]);

    return HttpWrapper;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9IdHRwV3JhcHBlci5qcyJdLCJuYW1lcyI6WyJzdHJlYW1zIiwiSHR0cFdyYXBwZXIiLCJzb3VyY2UiLCJtaW1lVHlwZSIsInN0cmVhbSIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImhvc3QiLCJ1cmwiLCJwYXJzZSIsInBhdGgiLCJwYXRobmFtZSIsIm9wdGlvbnMiLCJoZWFkZXJzIiwiaHR0cHMiLCJnZXQiLCJyZXMiLCJvbiIsImNodW5rIiwid3JpdGUiLCJlbmQiLCJtaW1ldHlwZSIsIlBhc3NUaHJvdWdoIiwidGV4dCIsImdldFRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7cWpCQUFBOzs7Ozs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlBLE87Ozs7Ozs7O0FBRVo7OztJQUdhQyxXLFdBQUFBLFc7Ozs7Ozs7OztBQUVUOzs7Ozs7OzRCQU9JQyxNLEVBQVFDLFEsRUFBVUMsTSxFQUFRO0FBQzFCLGdCQUFJQyxVQUFVLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDM0Msb0JBQUlDLE9BQU9DLGNBQUlDLEtBQUosQ0FBVVQsTUFBVixFQUFrQk8sSUFBN0I7QUFDQSxvQkFBSUcsT0FBT0YsY0FBSUMsS0FBSixDQUFVVCxNQUFWLEVBQWtCVyxRQUE3Qjs7QUFFQSxvQkFBSUMsVUFBVTtBQUNWTCwwQkFBTUEsSUFESTtBQUVWRywwQkFBTUEsSUFGSTtBQUdWRyw2QkFBUztBQUNMLHdDQUFnQlosUUFEWDtBQUVMLHNDQUFjO0FBRlQ7QUFIQyxpQkFBZDs7QUFTQWEsZ0NBQU1DLEdBQU4sQ0FBVUgsT0FBVixFQUFtQixVQUFVSSxHQUFWLEVBQWU7QUFDOUJBLHdCQUFJQyxFQUFKLENBQU8sTUFBUCxFQUFlLFVBQVVDLEtBQVYsRUFBaUI7QUFDNUIsNEJBQUloQixNQUFKLEVBQVk7QUFDUkEsbUNBQU9pQixLQUFQLENBQWFELEtBQWI7QUFDSDtBQUNKLHFCQUpELEVBSUdELEVBSkgsQ0FJTSxLQUpOLEVBSWEsWUFBWTtBQUNyQiw0QkFBSWYsTUFBSixFQUFZO0FBQ1JBLG1DQUFPa0IsR0FBUDtBQUNIO0FBQ0RmO0FBQ0gscUJBVEQ7QUFVSCxpQkFYRDtBQVlILGFBekJhLENBQWQ7QUEwQkEsbUJBQU9GLE9BQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7O2dDQU1RSCxNLEVBQVFxQixRLEVBQVU7QUFBQTs7QUFDdEIsZ0JBQUlsQixVQUFVLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDM0Msb0JBQUksQ0FBQ2UsUUFBTCxFQUFlQSxXQUFXLE1BQVg7O0FBRWYsb0JBQUluQixTQUFTLElBQUlKLFFBQVF3QixXQUFaLEVBQWI7QUFDQSxvQkFBSUMsT0FBTyxFQUFYO0FBQ0FyQix1QkFBT2UsRUFBUCxDQUFVLE1BQVYsRUFBa0IsVUFBQ0MsS0FBRDtBQUFBLDJCQUFXSyxRQUFRTCxLQUFuQjtBQUFBLGlCQUFsQjtBQUNBaEIsdUJBQU9lLEVBQVAsQ0FBVSxLQUFWLEVBQWlCO0FBQUEsMkJBQU1aLFFBQVFrQixJQUFSLENBQU47QUFBQSxpQkFBakI7O0FBRUEsc0JBQUtSLEdBQUwsQ0FBU2YsTUFBVCxFQUFpQnFCLFFBQWpCLEVBQTJCbkIsTUFBM0I7QUFDSCxhQVRhLENBQWQ7QUFVQSxtQkFBT0MsT0FBUDtBQUNIOztBQUVEOzs7Ozs7OztnQ0FLUUgsTSxFQUFRO0FBQ1osbUJBQU8sS0FBS3dCLE9BQUwsQ0FBYXhCLE1BQWIsRUFBcUIsV0FBckIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OztnQ0FLUUEsTSxFQUFRO0FBQ1osbUJBQU8sS0FBS3dCLE9BQUwsQ0FBYXhCLE1BQWIsRUFBcUIsa0JBQXJCLENBQVA7QUFDSCIsImZpbGUiOiJIdHRwV3JhcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgQ29weXJpZ2h0IChjKSBEb2xpdHRsZS4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB1cmwgZnJvbSAndXJsJztcbmltcG9ydCBodHRwcyBmcm9tICdodHRwcyc7XG5pbXBvcnQgKiBhcyBzdHJlYW1zIGZyb20gJ3N0cmVhbSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHdyYXBwZXIgZm9yIHdvcmtpbmcgd2l0aCBIVFRQIGNhbGxzXG4gKi9cbmV4cG9ydCBjbGFzcyBIdHRwV3JhcHBlciB7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgZnJvbSBhIHNwZWNpZmljIHNvdXJjZSB3aXRoIGEgc3BlY2lmaWMgbWltZXR5cGUgYW5kIG91dHB1dCBpbnRvIGEgc3RyZWFtXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWltZVR5cGUgXG4gICAgICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSBcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBwcm9taXNlIHRoYXQgY2FuIGJlIGNvbnRpbnVlZFxuICAgICAqL1xuICAgIGdldChzb3VyY2UsIG1pbWVUeXBlLCBzdHJlYW0pIHtcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgaG9zdCA9IHVybC5wYXJzZShzb3VyY2UpLmhvc3Q7XG4gICAgICAgICAgICBsZXQgcGF0aCA9IHVybC5wYXJzZShzb3VyY2UpLnBhdGhuYW1lO1xuXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBob3N0OiBob3N0LFxuICAgICAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBtaW1lVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgXCJVc2VyLUFnZW50XCI6IFwicmVxdWVzdFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaHR0cHMuZ2V0KG9wdGlvbnMsIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICByZXMub24oXCJkYXRhXCIsIGZ1bmN0aW9uIChjaHVuaykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW0ud3JpdGUoY2h1bmspO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkub24oXCJlbmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW0uZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGV4dCBmcm9tIGEgc3BlY2lmaWMgc291cmNlIHdpdGggYSBzcGVjaWZpYyBtaW1ldHlwZVxuICAgICAqIEBwYXJhbSB7Kn0gc291cmNlIFxuICAgICAqIEBwYXJhbSB7Kn0gbWltZXR5cGUgXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IEEgcHJvbWlzZSB0aGF0IGNhbiBiZSBjb250aW51ZWQgd2l0aCB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgZ2V0VGV4dChzb3VyY2UsIG1pbWV0eXBlKSB7XG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFtaW1ldHlwZSkgbWltZXR5cGUgPSBcInRleHRcIjtcblxuICAgICAgICAgICAgbGV0IHN0cmVhbSA9IG5ldyBzdHJlYW1zLlBhc3NUaHJvdWdoKCk7XG4gICAgICAgICAgICBsZXQgdGV4dCA9IFwiXCI7XG4gICAgICAgICAgICBzdHJlYW0ub24oXCJkYXRhXCIsIChjaHVuaykgPT4gdGV4dCArPSBjaHVuayk7XG4gICAgICAgICAgICBzdHJlYW0ub24oXCJlbmRcIiwgKCkgPT4gcmVzb2x2ZSh0ZXh0KSk7XG5cbiAgICAgICAgICAgIHRoaXMuZ2V0KHNvdXJjZSwgbWltZXR5cGUsIHN0cmVhbSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgSFRNTCBmcm9tIGEgc3BlY2lmaWMgc291cmNlIHdpdGggYSBzcGVjaWZpYyBtaW1ldHlwZVxuICAgICAqIEBwYXJhbSB7Kn0gc291cmNlIFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdGhhdCBjYW4gYmUgY29udGludWVkIHdpdGggdGhlIHJlc3VsdFxuICAgICAqL1xuICAgIGdldEh0bWwoc291cmNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRleHQoc291cmNlLCBcInRleHQvaHRtbFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgSlNPTiBmcm9tIGEgc3BlY2lmaWMgc291cmNlIHdpdGggYSBzcGVjaWZpYyBtaW1ldHlwZVxuICAgICAqIEBwYXJhbSB7Kn0gc291cmNlIFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdGhhdCBjYW4gYmUgY29udGludWVkIHdpdGggdGhlIHJlc3VsdFxuICAgICAqL1xuICAgIGdldEpzb24oc291cmNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRleHQoc291cmNlLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgfVxufVxuIl19