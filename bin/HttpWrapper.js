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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9IdHRwV3JhcHBlci5qcyJdLCJuYW1lcyI6WyJzdHJlYW1zIiwiSHR0cFdyYXBwZXIiLCJzb3VyY2UiLCJtaW1lVHlwZSIsInN0cmVhbSIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImhvc3QiLCJ1cmwiLCJwYXJzZSIsInBhdGgiLCJwYXRobmFtZSIsIm9wdGlvbnMiLCJoZWFkZXJzIiwiaHR0cHMiLCJnZXQiLCJyZXMiLCJvbiIsImNodW5rIiwid3JpdGUiLCJlbmQiLCJtaW1ldHlwZSIsIlBhc3NUaHJvdWdoIiwidGV4dCIsImdldFRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsTzs7Ozs7O0FBRVo7OztJQUdhQyxXLFdBQUFBLFc7Ozs7Ozs7OztBQUVUOzs7Ozs7OzRCQU9JQyxNLEVBQVFDLFEsRUFBVUMsTSxFQUFRO0FBQzFCLGdCQUFJQyxVQUFVLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDM0Msb0JBQUlDLE9BQU9DLGNBQUlDLEtBQUosQ0FBVVQsTUFBVixFQUFrQk8sSUFBN0I7QUFDQSxvQkFBSUcsT0FBT0YsY0FBSUMsS0FBSixDQUFVVCxNQUFWLEVBQWtCVyxRQUE3Qjs7QUFFQSxvQkFBSUMsVUFBVTtBQUNWTCwwQkFBTUEsSUFESTtBQUVWRywwQkFBTUEsSUFGSTtBQUdWRyw2QkFBUztBQUNMLHdDQUFnQlosUUFEWDtBQUVMLHNDQUFjO0FBRlQ7QUFIQyxpQkFBZDs7QUFTQWEsZ0NBQU1DLEdBQU4sQ0FBVUgsT0FBVixFQUFtQixVQUFVSSxHQUFWLEVBQWU7QUFDOUJBLHdCQUFJQyxFQUFKLENBQU8sTUFBUCxFQUFlLFVBQVVDLEtBQVYsRUFBaUI7QUFDNUIsNEJBQUloQixNQUFKLEVBQVk7QUFDUkEsbUNBQU9pQixLQUFQLENBQWFELEtBQWI7QUFDSDtBQUNKLHFCQUpELEVBSUdELEVBSkgsQ0FJTSxLQUpOLEVBSWEsWUFBWTtBQUNyQiw0QkFBSWYsTUFBSixFQUFZO0FBQ1JBLG1DQUFPa0IsR0FBUDtBQUNIO0FBQ0RmO0FBQ0gscUJBVEQ7QUFVSCxpQkFYRDtBQVlILGFBekJhLENBQWQ7QUEwQkEsbUJBQU9GLE9BQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7O2dDQU1RSCxNLEVBQVFxQixRLEVBQVU7QUFBQTs7QUFDdEIsZ0JBQUlsQixVQUFVLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDM0Msb0JBQUksQ0FBQ2UsUUFBTCxFQUFlQSxXQUFXLE1BQVg7O0FBRWYsb0JBQUluQixTQUFTLElBQUlKLFFBQVF3QixXQUFaLEVBQWI7QUFDQSxvQkFBSUMsT0FBTyxFQUFYO0FBQ0FyQix1QkFBT2UsRUFBUCxDQUFVLE1BQVYsRUFBa0IsVUFBQ0MsS0FBRDtBQUFBLDJCQUFXSyxRQUFRTCxLQUFuQjtBQUFBLGlCQUFsQjtBQUNBaEIsdUJBQU9lLEVBQVAsQ0FBVSxLQUFWLEVBQWlCO0FBQUEsMkJBQU1aLFFBQVFrQixJQUFSLENBQU47QUFBQSxpQkFBakI7O0FBRUEsc0JBQUtSLEdBQUwsQ0FBU2YsTUFBVCxFQUFpQnFCLFFBQWpCLEVBQTJCbkIsTUFBM0I7QUFDSCxhQVRhLENBQWQ7QUFVQSxtQkFBT0MsT0FBUDtBQUNIOztBQUVEOzs7Ozs7OztnQ0FLUUgsTSxFQUFRO0FBQ1osbUJBQU8sS0FBS3dCLE9BQUwsQ0FBYXhCLE1BQWIsRUFBcUIsV0FBckIsQ0FBUDtBQUNIOztBQUVEOzs7Ozs7OztnQ0FLUUEsTSxFQUFRO0FBQ1osbUJBQU8sS0FBS3dCLE9BQUwsQ0FBYXhCLE1BQWIsRUFBcUIsa0JBQXJCLENBQVA7QUFDSDs7O0tBdEZMIiwiZmlsZSI6Ikh0dHBXcmFwcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICBDb3B5cmlnaHQgKGMpIERvbGl0dGxlLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuaW1wb3J0IHVybCBmcm9tICd1cmwnO1xuaW1wb3J0IGh0dHBzIGZyb20gJ2h0dHBzJztcbmltcG9ydCAqIGFzIHN0cmVhbXMgZnJvbSAnc3RyZWFtJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgd3JhcHBlciBmb3Igd29ya2luZyB3aXRoIEhUVFAgY2FsbHNcbiAqL1xuZXhwb3J0IGNsYXNzIEh0dHBXcmFwcGVyIHtcblxuICAgIC8qKlxuICAgICAqIEdldCBmcm9tIGEgc3BlY2lmaWMgc291cmNlIHdpdGggYSBzcGVjaWZpYyBtaW1ldHlwZSBhbmQgb3V0cHV0IGludG8gYSBzdHJlYW1cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc291cmNlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtaW1lVHlwZSBcbiAgICAgKiBAcGFyYW0ge3N0cmVhbX0gc3RyZWFtIFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdGhhdCBjYW4gYmUgY29udGludWVkXG4gICAgICovXG4gICAgZ2V0KHNvdXJjZSwgbWltZVR5cGUsIHN0cmVhbSkge1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGxldCBob3N0ID0gdXJsLnBhcnNlKHNvdXJjZSkuaG9zdDtcbiAgICAgICAgICAgIGxldCBwYXRoID0gdXJsLnBhcnNlKHNvdXJjZSkucGF0aG5hbWU7XG5cbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGhvc3Q6IGhvc3QsXG4gICAgICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiBtaW1lVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgJ1VzZXItQWdlbnQnOiAncmVxdWVzdCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBodHRwcy5nZXQob3B0aW9ucywgZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgIHJlcy5vbignZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW0ud3JpdGUoY2h1bmspO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtLmVuZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRleHQgZnJvbSBhIHNwZWNpZmljIHNvdXJjZSB3aXRoIGEgc3BlY2lmaWMgbWltZXR5cGVcbiAgICAgKiBAcGFyYW0geyp9IHNvdXJjZSBcbiAgICAgKiBAcGFyYW0geyp9IG1pbWV0eXBlIFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdGhhdCBjYW4gYmUgY29udGludWVkIHdpdGggdGhlIHJlc3VsdFxuICAgICAqL1xuICAgIGdldFRleHQoc291cmNlLCBtaW1ldHlwZSkge1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICghbWltZXR5cGUpIG1pbWV0eXBlID0gJ3RleHQnO1xuXG4gICAgICAgICAgICBsZXQgc3RyZWFtID0gbmV3IHN0cmVhbXMuUGFzc1Rocm91Z2goKTtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gJyc7XG4gICAgICAgICAgICBzdHJlYW0ub24oJ2RhdGEnLCAoY2h1bmspID0+IHRleHQgKz0gY2h1bmspO1xuICAgICAgICAgICAgc3RyZWFtLm9uKCdlbmQnLCAoKSA9PiByZXNvbHZlKHRleHQpKTtcblxuICAgICAgICAgICAgdGhpcy5nZXQoc291cmNlLCBtaW1ldHlwZSwgc3RyZWFtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBIVE1MIGZyb20gYSBzcGVjaWZpYyBzb3VyY2Ugd2l0aCBhIHNwZWNpZmljIG1pbWV0eXBlXG4gICAgICogQHBhcmFtIHsqfSBzb3VyY2UgXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IEEgcHJvbWlzZSB0aGF0IGNhbiBiZSBjb250aW51ZWQgd2l0aCB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgZ2V0SHRtbChzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dChzb3VyY2UsICd0ZXh0L2h0bWwnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgSlNPTiBmcm9tIGEgc3BlY2lmaWMgc291cmNlIHdpdGggYSBzcGVjaWZpYyBtaW1ldHlwZVxuICAgICAqIEBwYXJhbSB7Kn0gc291cmNlIFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdGhhdCBjYW4gYmUgY29udGludWVkIHdpdGggdGhlIHJlc3VsdFxuICAgICAqL1xuICAgIGdldEpzb24oc291cmNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRleHQoc291cmNlLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIH1cbn1cbiJdfQ==