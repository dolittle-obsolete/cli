'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventProcessorInquirer = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Folders = require('../Folders');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _cSharpInquirerQuestions = require('./cSharpInquirerQuestions');

var _cSharpInquirerQuestions2 = _interopRequireDefault(_cSharpInquirerQuestions);

var _Guid = require('../Guid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var inquirer = require('inquirer');

var _folders = new WeakMap();
var _fileSystem = new WeakMap();

var EventProcessorInquirer = exports.EventProcessorInquirer = function () {

    /**
     * Constructor
     * @param {Folders} folders
     * @param {fs} fileSystem
     */
    function EventProcessorInquirer(folders, fileSystem) {
        (0, _classCallCheck3.default)(this, EventProcessorInquirer);

        _folders.set(this, folders);
        _fileSystem.set(this, fileSystem);
    }
    /**
     * Gets the inquirer.js prompt answers based on the language
     * @param {any} flags
     * @returns {Promise<any>} The answers
     */


    (0, _createClass3.default)(EventProcessorInquirer, [{
        key: 'promptUser',
        value: function promptUser(flags) {
            if (flags.language === 'csharp') {
                return this._getCSharpPrompt(flags.name);
            }
        }
        /**
         * Gets the C# prompt
         * @param {string} name
         */

    }, {
        key: '_getCSharpPrompt',
        value: function _getCSharpPrompt(name) {

            var choices = this._findCSharpEvents().map(function (item) {
                return { name: item };
            });
            console.log('choices: ', choices);
            var questions = [{
                type: 'checkbox',
                message: 'Select events',
                name: 'eventNames',
                choices: choices
            }];

            _cSharpInquirerQuestions2.default.getCSharpQuestions().forEach(function (question) {
                return questions.push(question);
            });

            return inquirer.prompt(questions).then(function (answers) {
                answers.name = name;
                answers.events = [];
                answers.eventNames.forEach(function (eventName) {
                    return answers.events.push({
                        eventName: eventName,
                        eventProcessor: _Guid.Guid.create()
                    });
                });
                return answers;
            });
        }
        /**
         * Finds and returns the names of the public IEvent classes
         * @returns [string[]]
         */

    }, {
        key: '_findCSharpEvents',
        value: function _findCSharpEvents() {
            var _this = this;

            //TODO: Need to find events in a separate folder. Discuss strategies
            /**
             * Thoughts: Go by convention, folders named Events[.something] are where events are made.
             * Find all events and group them by events folder / Module / Feature, give user a checkbox thing where they can pick events.
             */
            var filePaths = _folders.get(this).searchRecursive(process.cwd(), '.cs');
            var events = [];
            filePaths.forEach(function (filePath) {
                var content = _fileSystem.get(_this).readFileSync(filePath, 'utf8');
                var eventNameMatch = content.match(/.*public\s*class\s*(\w*)\s*:\s*IEvent/);
                if (eventNameMatch !== null && eventNameMatch.length > 0) {
                    events.push(eventNameMatch[1]);
                }
            });
            return events;
        }
    }]);
    return EventProcessorInquirer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvRXZlbnRQcm9jZXNzb3JJbnF1aXJlci5qcyJdLCJuYW1lcyI6WyJpbnF1aXJlciIsInJlcXVpcmUiLCJfZm9sZGVycyIsIldlYWtNYXAiLCJfZmlsZVN5c3RlbSIsIkV2ZW50UHJvY2Vzc29ySW5xdWlyZXIiLCJmb2xkZXJzIiwiZmlsZVN5c3RlbSIsInNldCIsImZsYWdzIiwibGFuZ3VhZ2UiLCJfZ2V0Q1NoYXJwUHJvbXB0IiwibmFtZSIsImNob2ljZXMiLCJfZmluZENTaGFycEV2ZW50cyIsIm1hcCIsIml0ZW0iLCJjb25zb2xlIiwibG9nIiwicXVlc3Rpb25zIiwidHlwZSIsIm1lc3NhZ2UiLCJjU2hhcnBJbnF1aXJlciIsImdldENTaGFycFF1ZXN0aW9ucyIsImZvckVhY2giLCJwdXNoIiwicXVlc3Rpb24iLCJwcm9tcHQiLCJ0aGVuIiwiYW5zd2VycyIsImV2ZW50cyIsImV2ZW50TmFtZXMiLCJldmVudE5hbWUiLCJldmVudFByb2Nlc3NvciIsIkd1aWQiLCJjcmVhdGUiLCJmaWxlUGF0aHMiLCJnZXQiLCJzZWFyY2hSZWN1cnNpdmUiLCJwcm9jZXNzIiwiY3dkIiwiY29udGVudCIsInJlYWRGaWxlU3luYyIsImZpbGVQYXRoIiwiZXZlbnROYW1lTWF0Y2giLCJtYXRjaCIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBUEE7Ozs7QUFTQSxJQUFNQSxXQUFXQyxRQUFRLFVBQVIsQ0FBakI7O0FBRUEsSUFBTUMsV0FBVyxJQUFJQyxPQUFKLEVBQWpCO0FBQ0EsSUFBTUMsY0FBYyxJQUFJRCxPQUFKLEVBQXBCOztJQUdhRSxzQixXQUFBQSxzQjs7QUFFVDs7Ozs7QUFLQSxvQ0FBWUMsT0FBWixFQUFxQkMsVUFBckIsRUFBaUM7QUFBQTs7QUFDN0JMLGlCQUFTTSxHQUFULENBQWEsSUFBYixFQUFtQkYsT0FBbkI7QUFDQUYsb0JBQVlJLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0JELFVBQXRCO0FBQ0g7QUFDRDs7Ozs7Ozs7O21DQUtXRSxLLEVBQU07QUFDYixnQkFBSUEsTUFBTUMsUUFBTixLQUFtQixRQUF2QixFQUFpQztBQUM3Qix1QkFBTyxLQUFLQyxnQkFBTCxDQUFzQkYsTUFBTUcsSUFBNUIsQ0FBUDtBQUNIO0FBQ0o7QUFDRDs7Ozs7Ozt5Q0FJaUJBLEksRUFBTTs7QUFFbkIsZ0JBQUlDLFVBQVUsS0FBS0MsaUJBQUwsR0FBeUJDLEdBQXpCLENBQTZCLGdCQUFRO0FBQUMsdUJBQU8sRUFBQ0gsTUFBTUksSUFBUCxFQUFQO0FBQW9CLGFBQTFELENBQWQ7QUFDQUMsb0JBQVFDLEdBQVIsQ0FBWSxXQUFaLEVBQXlCTCxPQUF6QjtBQUNBLGdCQUFJTSxZQUFZLENBQUM7QUFDVEMsc0JBQU0sVUFERztBQUVUQyx5QkFBUyxlQUZBO0FBR1RULHNCQUFNLFlBSEc7QUFJVEMseUJBQVNBO0FBSkEsYUFBRCxDQUFoQjs7QUFRQVMsOENBQWVDLGtCQUFmLEdBQW9DQyxPQUFwQyxDQUE0QztBQUFBLHVCQUFZTCxVQUFVTSxJQUFWLENBQWVDLFFBQWYsQ0FBWjtBQUFBLGFBQTVDOztBQUVBLG1CQUFPMUIsU0FBUzJCLE1BQVQsQ0FBZ0JSLFNBQWhCLEVBQ0ZTLElBREUsQ0FDRyxtQkFBVztBQUNiQyx3QkFBUWpCLElBQVIsR0FBZUEsSUFBZjtBQUNBaUIsd0JBQVFDLE1BQVIsR0FBaUIsRUFBakI7QUFDQUQsd0JBQVFFLFVBQVIsQ0FBbUJQLE9BQW5CLENBQTJCO0FBQUEsMkJBQ3ZCSyxRQUFRQyxNQUFSLENBQWVMLElBQWYsQ0FBb0I7QUFDaEJPLG1DQUFXQSxTQURLO0FBRWhCQyx3Q0FBZ0JDLFdBQUtDLE1BQUw7QUFGQSxxQkFBcEIsQ0FEdUI7QUFBQSxpQkFBM0I7QUFLQSx1QkFBT04sT0FBUDtBQUNILGFBVkUsQ0FBUDtBQVdIO0FBQ0Q7Ozs7Ozs7NENBSW9CO0FBQUE7O0FBQ2hCO0FBQ0E7Ozs7QUFJQSxnQkFBSU8sWUFBWWxDLFNBQVNtQyxHQUFULENBQWEsSUFBYixFQUFtQkMsZUFBbkIsQ0FBbUNDLFFBQVFDLEdBQVIsRUFBbkMsRUFBa0QsS0FBbEQsQ0FBaEI7QUFDQSxnQkFBSVYsU0FBUyxFQUFiO0FBQ0FNLHNCQUFVWixPQUFWLENBQWtCLG9CQUFZO0FBQzFCLG9CQUFJaUIsVUFBVXJDLFlBQVlpQyxHQUFaLENBQWdCLEtBQWhCLEVBQXNCSyxZQUF0QixDQUFtQ0MsUUFBbkMsRUFBNkMsTUFBN0MsQ0FBZDtBQUNBLG9CQUFNQyxpQkFBaUJILFFBQVFJLEtBQVIsQ0FBYyx1Q0FBZCxDQUF2QjtBQUNBLG9CQUFJRCxtQkFBbUIsSUFBbkIsSUFBMkJBLGVBQWVFLE1BQWYsR0FBd0IsQ0FBdkQsRUFBeUQ7QUFDckRoQiwyQkFBT0wsSUFBUCxDQUFZbUIsZUFBZSxDQUFmLENBQVo7QUFDSDtBQUNKLGFBTkQ7QUFPQSxtQkFBT2QsTUFBUDtBQUNIIiwiZmlsZSI6IkV2ZW50UHJvY2Vzc29ySW5xdWlyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBGb2xkZXJzIH0gZnJvbSAnLi4vRm9sZGVycyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IGNTaGFycElucXVpcmVyIGZyb20gJy4vY1NoYXJwSW5xdWlyZXJRdWVzdGlvbnMnXG5pbXBvcnQgeyBHdWlkIH0gZnJvbSAnLi4vR3VpZCc7XG5cbmNvbnN0IGlucXVpcmVyID0gcmVxdWlyZSgnaW5xdWlyZXInKTtcblxuY29uc3QgX2ZvbGRlcnMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgX2ZpbGVTeXN0ZW0gPSBuZXcgV2Vha01hcCgpO1xuXG5cbmV4cG9ydCBjbGFzcyBFdmVudFByb2Nlc3NvcklucXVpcmVyIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtGb2xkZXJzfSBmb2xkZXJzXG4gICAgICogQHBhcmFtIHtmc30gZmlsZVN5c3RlbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZvbGRlcnMsIGZpbGVTeXN0ZW0pIHtcbiAgICAgICAgX2ZvbGRlcnMuc2V0KHRoaXMsIGZvbGRlcnMpO1xuICAgICAgICBfZmlsZVN5c3RlbS5zZXQodGhpcywgZmlsZVN5c3RlbSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGlucXVpcmVyLmpzIHByb21wdCBhbnN3ZXJzIGJhc2VkIG9uIHRoZSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSB7YW55fSBmbGFnc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFRoZSBhbnN3ZXJzXG4gICAgICovXG4gICAgcHJvbXB0VXNlcihmbGFncyl7XG4gICAgICAgIGlmIChmbGFncy5sYW5ndWFnZSA9PT0gJ2NzaGFycCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRDU2hhcnBQcm9tcHQoZmxhZ3MubmFtZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBDIyBwcm9tcHRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqL1xuICAgIF9nZXRDU2hhcnBQcm9tcHQobmFtZSkge1xuICAgICAgICBcbiAgICAgICAgbGV0IGNob2ljZXMgPSB0aGlzLl9maW5kQ1NoYXJwRXZlbnRzKCkubWFwKGl0ZW0gPT4ge3JldHVybiB7bmFtZTogaXRlbX19KTtcbiAgICAgICAgY29uc29sZS5sb2coJ2Nob2ljZXM6ICcsIGNob2ljZXMpO1xuICAgICAgICBsZXQgcXVlc3Rpb25zID0gW3tcbiAgICAgICAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdTZWxlY3QgZXZlbnRzJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnZXZlbnROYW1lcycsXG4gICAgICAgICAgICAgICAgY2hvaWNlczogY2hvaWNlc1xuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgICAgICBcbiAgICAgICAgY1NoYXJwSW5xdWlyZXIuZ2V0Q1NoYXJwUXVlc3Rpb25zKCkuZm9yRWFjaChxdWVzdGlvbiA9PiBxdWVzdGlvbnMucHVzaChxdWVzdGlvbikpO1xuXG4gICAgICAgIHJldHVybiBpbnF1aXJlci5wcm9tcHQocXVlc3Rpb25zKVxuICAgICAgICAgICAgLnRoZW4oYW5zd2VycyA9PiB7XG4gICAgICAgICAgICAgICAgYW5zd2Vycy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgICBhbnN3ZXJzLmV2ZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgIGFuc3dlcnMuZXZlbnROYW1lcy5mb3JFYWNoKGV2ZW50TmFtZSA9PiBcbiAgICAgICAgICAgICAgICAgICAgYW5zd2Vycy5ldmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6IGV2ZW50TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50UHJvY2Vzc29yOiBHdWlkLmNyZWF0ZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5zd2VycztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhbmQgcmV0dXJucyB0aGUgbmFtZXMgb2YgdGhlIHB1YmxpYyBJRXZlbnQgY2xhc3Nlc1xuICAgICAqIEByZXR1cm5zIFtzdHJpbmdbXV1cbiAgICAgKi9cbiAgICBfZmluZENTaGFycEV2ZW50cygpIHtcbiAgICAgICAgLy9UT0RPOiBOZWVkIHRvIGZpbmQgZXZlbnRzIGluIGEgc2VwYXJhdGUgZm9sZGVyLiBEaXNjdXNzIHN0cmF0ZWdpZXNcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRob3VnaHRzOiBHbyBieSBjb252ZW50aW9uLCBmb2xkZXJzIG5hbWVkIEV2ZW50c1suc29tZXRoaW5nXSBhcmUgd2hlcmUgZXZlbnRzIGFyZSBtYWRlLlxuICAgICAgICAgKiBGaW5kIGFsbCBldmVudHMgYW5kIGdyb3VwIHRoZW0gYnkgZXZlbnRzIGZvbGRlciAvIE1vZHVsZSAvIEZlYXR1cmUsIGdpdmUgdXNlciBhIGNoZWNrYm94IHRoaW5nIHdoZXJlIHRoZXkgY2FuIHBpY2sgZXZlbnRzLlxuICAgICAgICAgKi9cbiAgICAgICAgbGV0IGZpbGVQYXRocyA9IF9mb2xkZXJzLmdldCh0aGlzKS5zZWFyY2hSZWN1cnNpdmUocHJvY2Vzcy5jd2QoKSwgJy5jcycpO1xuICAgICAgICBsZXQgZXZlbnRzID0gW107XG4gICAgICAgIGZpbGVQYXRocy5mb3JFYWNoKGZpbGVQYXRoID0+IHtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gX2ZpbGVTeXN0ZW0uZ2V0KHRoaXMpLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0ZjgnKTtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50TmFtZU1hdGNoID0gY29udGVudC5tYXRjaCgvLipwdWJsaWNcXHMqY2xhc3NcXHMqKFxcdyopXFxzKjpcXHMqSUV2ZW50Lyk7XG4gICAgICAgICAgICBpZiAoZXZlbnROYW1lTWF0Y2ggIT09IG51bGwgJiYgZXZlbnROYW1lTWF0Y2gubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgZXZlbnRzLnB1c2goZXZlbnROYW1lTWF0Y2hbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGV2ZW50cztcbiAgICB9XG59Il19