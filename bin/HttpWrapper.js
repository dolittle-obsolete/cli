'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpWrapper = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _stream = require('stream');

var streams = _interopRequireWildcard(_stream);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Represents a wrapper for working with HTTP calls
 */
var HttpWrapper = exports.HttpWrapper = function () {
    function HttpWrapper() {
        (0, _classCallCheck3.default)(this, HttpWrapper);
    }

    (0, _createClass3.default)(HttpWrapper, [{
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
                        'Content-Type': mimeType,
                        'User-Agent': 'request'
                    }
                };

                _https2.default.get(options, function (res) {
                    res.on('data', function (chunk) {
                        if (stream) {
                            stream.write(chunk);
                        }
                    }).on('end', function () {
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
                if (!mimetype) mimetype = 'text';

                var stream = new streams.PassThrough();
                var text = '';
                stream.on('data', function (chunk) {
                    return text += chunk;
                });
                stream.on('end', function () {
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
            return this.getText(source, 'text/html');
        }

        /**
         * Get JSON from a specific source with a specific mimetype
         * @param {*} source 
         * @returns {Promise} A promise that can be continued with the result
         */

    }, {
        key: 'getJson',
        value: function getJson(source) {
            return this.getText(source, 'application/json');
        }
    }]);
    return HttpWrapper;
}(); /*---------------------------------------------------------------------------------------------
      *  Copyright (c) Dolittle. All rights reserved.
      *  Licensed under the MIT License. See LICENSE in the project root for license information.
      *--------------------------------------------------------------------------------------------*/
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9IdHRwV3JhcHBlci5qcyJdLCJuYW1lcyI6WyJzdHJlYW1zIiwiSHR0cFdyYXBwZXIiLCJzb3VyY2UiLCJtaW1lVHlwZSIsInN0cmVhbSIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImhvc3QiLCJ1cmwiLCJwYXJzZSIsInBhdGgiLCJwYXRobmFtZSIsIm9wdGlvbnMiLCJoZWFkZXJzIiwiaHR0cHMiLCJnZXQiLCJyZXMiLCJvbiIsImNodW5rIiwid3JpdGUiLCJlbmQiLCJtaW1ldHlwZSIsIlBhc3NUaHJvdWdoIiwidGV4dCIsImdldFRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsTzs7Ozs7O0FBRVo7OztJQUdhQyxXLFdBQUFBLFc7Ozs7Ozs7OztBQUVUOzs7Ozs7OzRCQU9JQyxNLEVBQVFDLFEsRUFBVUMsTSxFQUFRO0FBQzFCLGdCQUFJQyxVQUFVLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDM0Msb0JBQUlDLE9BQU9DLGNBQUlDLEtBQUosQ0FBVVQsTUFBVixFQUFrQk8sSUFBN0I7QUFDQSxvQkFBSUcsT0FBT0YsY0FBSUMsS0FBSixDQUFVVCxNQUFWLEVBQWtCVyxRQUE3Qjs7QUFFQSxvQkFBSUMsVUFBVTtBQUNWTCwwQkFBTUEsSUFESTtBQUVWRywwQkFBTUEsSUFGSTtBQUdWRyw2QkFBUztBQUNMLHdDQUFnQlosUUFEWDtBQUVMLHNDQUFjO0FBRlQ7QUFIQyxpQkFBZDs7QUFTQWEsZ0NBQU1DLEdBQU4sQ0FBVUgsT0FBVixFQUFtQixVQUFVSSxHQUFWLEVBQWU7QUFDOUJBLHdCQUFJQyxFQUFKLENBQU8sTUFBUCxFQUFlLFVBQVVDLEtBQVYsRUFBaUI7QUFDNUIsNEJBQUloQixNQUFKLEVBQVk7QUFDUkEsbUNBQU9pQixLQUFQLENBQWFELEtBQWI7QUFDSDtBQUNKLHFCQUpELEVBSUdELEVBSkgsQ0FJTSxLQUpOLEVBSWEsWUFBWTtBQUNyQiw0QkFBSWYsTUFBSixFQUFZO0FBQ1JBLG1DQUFPa0IsR0FBUDtBQUNIO0FBQ0RmO0FBQ0gscUJBVEQ7QUFVSCxpQkFYRDtBQVlILGFBekJhLENBQWQ7QUEwQkEsbUJBQU9GLE9BQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7O2dDQU1RSCxNLEVBQVFxQixRLEVBQVU7QUFBQTs7QUFDdEIsZ0JBQUlsQixVQUFVLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDM0Msb0JBQUksQ0FBQ2UsUUFBTCxFQUFlQSxXQUFXLE1BQVg7O0FBRWYsb0JBQUluQixTQUFTLElBQUlKLFFBQVF3QixXQUFaLEVBQWI7QUFDQSxvQkFBSUMsT0FBTyxFQUFYO0FBQ0FyQix1QkFBT2UsRUFBUCxDQUFVLE1BQVYsRUFBa0IsVUFBQ0MsS0FBRDtBQUFBLDJCQUFXSyxRQUFRTCxLQUFuQjtBQUFBLGlCQUFsQjtBQUNBaEIsdUJBQU9lLEVBQVAsQ0FBVSxLQUFWLEVBQWlCO0FBQUEsMkJBQU1aLFFBQVFrQixJQUFSLENBQU47QUFBQSxpQkFBakI7O0FBRUEsc0JBQUtSLEdBQUwsQ0FBU2YsTUFBVCxFQUFpQnFCLFFBQWpCLEVBQTJCbkIsTUFBM0I7QUFDSCxhQVRhLENBQWQ7QUFVQSxtQkFBT0MsT0FBUDtBQUNIOztBQUVEOzs7Ozs7OztnQ0FLUUgsTSxFQUFRO0FBQ1osbUJBQU8sS0FBS3dCLE9BQUwsQ0FBYXhCLE1BQWIsRUFBcUIsV0FBckIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OztnQ0FLUUEsTSxFQUFRO0FBQ1osbUJBQU8sS0FBS3dCLE9BQUwsQ0FBYXhCLE1BQWIsRUFBcUIsa0JBQXJCLENBQVA7QUFDSDs7O0tBdEZMIiwiZmlsZSI6Ikh0dHBXcmFwcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5pbXBvcnQgdXJsIGZyb20gJ3VybCc7XHJcbmltcG9ydCBodHRwcyBmcm9tICdodHRwcyc7XHJcbmltcG9ydCAqIGFzIHN0cmVhbXMgZnJvbSAnc3RyZWFtJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgd3JhcHBlciBmb3Igd29ya2luZyB3aXRoIEhUVFAgY2FsbHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBIdHRwV3JhcHBlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgZnJvbSBhIHNwZWNpZmljIHNvdXJjZSB3aXRoIGEgc3BlY2lmaWMgbWltZXR5cGUgYW5kIG91dHB1dCBpbnRvIGEgc3RyZWFtXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc291cmNlIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1pbWVUeXBlIFxyXG4gICAgICogQHBhcmFtIHtzdHJlYW19IHN0cmVhbSBcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdGhhdCBjYW4gYmUgY29udGludWVkXHJcbiAgICAgKi9cclxuICAgIGdldChzb3VyY2UsIG1pbWVUeXBlLCBzdHJlYW0pIHtcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IGhvc3QgPSB1cmwucGFyc2Uoc291cmNlKS5ob3N0O1xyXG4gICAgICAgICAgICBsZXQgcGF0aCA9IHVybC5wYXJzZShzb3VyY2UpLnBhdGhuYW1lO1xyXG5cclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBob3N0OiBob3N0LFxyXG4gICAgICAgICAgICAgICAgcGF0aDogcGF0aCxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogbWltZVR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ1VzZXItQWdlbnQnOiAncmVxdWVzdCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGh0dHBzLmdldChvcHRpb25zLCBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXMub24oJ2RhdGEnLCBmdW5jdGlvbiAoY2h1bmspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbS53cml0ZShjaHVuayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbS5lbmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRleHQgZnJvbSBhIHNwZWNpZmljIHNvdXJjZSB3aXRoIGEgc3BlY2lmaWMgbWltZXR5cGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc291cmNlIFxyXG4gICAgICogQHBhcmFtIHsqfSBtaW1ldHlwZSBcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdGhhdCBjYW4gYmUgY29udGludWVkIHdpdGggdGhlIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBnZXRUZXh0KHNvdXJjZSwgbWltZXR5cGUpIHtcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFtaW1ldHlwZSkgbWltZXR5cGUgPSAndGV4dCc7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3RyZWFtID0gbmV3IHN0cmVhbXMuUGFzc1Rocm91Z2goKTtcclxuICAgICAgICAgICAgbGV0IHRleHQgPSAnJztcclxuICAgICAgICAgICAgc3RyZWFtLm9uKCdkYXRhJywgKGNodW5rKSA9PiB0ZXh0ICs9IGNodW5rKTtcclxuICAgICAgICAgICAgc3RyZWFtLm9uKCdlbmQnLCAoKSA9PiByZXNvbHZlKHRleHQpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0KHNvdXJjZSwgbWltZXR5cGUsIHN0cmVhbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgSFRNTCBmcm9tIGEgc3BlY2lmaWMgc291cmNlIHdpdGggYSBzcGVjaWZpYyBtaW1ldHlwZVxyXG4gICAgICogQHBhcmFtIHsqfSBzb3VyY2UgXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBwcm9taXNlIHRoYXQgY2FuIGJlIGNvbnRpbnVlZCB3aXRoIHRoZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgZ2V0SHRtbChzb3VyY2UpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUZXh0KHNvdXJjZSwgJ3RleHQvaHRtbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IEpTT04gZnJvbSBhIHNwZWNpZmljIHNvdXJjZSB3aXRoIGEgc3BlY2lmaWMgbWltZXR5cGVcclxuICAgICAqIEBwYXJhbSB7Kn0gc291cmNlIFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IEEgcHJvbWlzZSB0aGF0IGNhbiBiZSBjb250aW51ZWQgd2l0aCB0aGUgcmVzdWx0XHJcbiAgICAgKi9cclxuICAgIGdldEpzb24oc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dChzb3VyY2UsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICB9XHJcbn1cclxuIl19