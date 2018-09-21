'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customNamespaceChoice = 'Write custom namespace';

function generatedNamespaceQuestion(namespace) {
    return {
        type: 'list',
        name: 'namespace',
        message: 'Choose or create namespace:',
        choices: [{
            name: '(default) ' + namespace,
            value: namespace
        }, {
            name: customNamespaceChoice,
            value: customNamespaceChoice
        }]
    };
};

var inputNamespaceQuestion = {
    type: 'input',
    name: 'namespace',
    message: 'Enter the Aggregate Root\'s namespace',
    when: function when(answers) {
        return answers.namespace === customNamespaceChoice;
    }
};

var cSharpInquirerQuestions = function () {
    function cSharpInquirerQuestions() {
        (0, _classCallCheck3.default)(this, cSharpInquirerQuestions);
    }

    (0, _createClass3.default)(cSharpInquirerQuestions, [{
        key: 'getCSharpQuestions',
        value: function getCSharpQuestions() {
            var questions = [];

            var namespace = _global2.default.createCSharpNamespace(process.cwd(), _global2.default.getNearestCsprojFile(process.cwd()));

            questions.push(generatedNamespaceQuestion(namespace));
            questions.push(inputNamespaceQuestion);

            return questions;
        }
    }]);
    return cSharpInquirerQuestions;
}();

exports.default = new cSharpInquirerQuestions();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvY1NoYXJwSW5xdWlyZXJRdWVzdGlvbnMuanMiXSwibmFtZXMiOlsiY3VzdG9tTmFtZXNwYWNlQ2hvaWNlIiwiZ2VuZXJhdGVkTmFtZXNwYWNlUXVlc3Rpb24iLCJuYW1lc3BhY2UiLCJ0eXBlIiwibmFtZSIsIm1lc3NhZ2UiLCJjaG9pY2VzIiwidmFsdWUiLCJpbnB1dE5hbWVzcGFjZVF1ZXN0aW9uIiwid2hlbiIsImFuc3dlcnMiLCJjU2hhcnBJbnF1aXJlclF1ZXN0aW9ucyIsInF1ZXN0aW9ucyIsImdsb2JhbCIsImNyZWF0ZUNTaGFycE5hbWVzcGFjZSIsInByb2Nlc3MiLCJjd2QiLCJnZXROZWFyZXN0Q3Nwcm9qRmlsZSIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLHdCQUF3Qix3QkFBOUI7O0FBRUEsU0FBU0MsMEJBQVQsQ0FBb0NDLFNBQXBDLEVBQStDO0FBQzNDLFdBQU87QUFDSEMsY0FBTSxNQURIO0FBRUhDLGNBQU0sV0FGSDtBQUdIQyw4Q0FIRztBQUlIQyxpQkFBUyxDQUNMO0FBQ0lGLGlDQUFtQkYsU0FEdkI7QUFFSUssbUJBQU9MO0FBRlgsU0FESyxFQUtMO0FBQ0lFLGtCQUFNSixxQkFEVjtBQUVJTyxtQkFBT1A7QUFGWCxTQUxLO0FBSk4sS0FBUDtBQWVIOztBQUVELElBQU1RLHlCQUNOO0FBQ0lMLFVBQU0sT0FEVjtBQUVJQyxVQUFNLFdBRlY7QUFHSUMsb0RBSEo7QUFJSUksVUFBTSxjQUFTQyxPQUFULEVBQWtCO0FBQ3BCLGVBQU9BLFFBQVFSLFNBQVIsS0FBc0JGLHFCQUE3QjtBQUNIO0FBTkwsQ0FEQTs7SUFXTVcsdUI7Ozs7Ozs7NkNBQ21CO0FBQ2pCLGdCQUFJQyxZQUFZLEVBQWhCOztBQUVBLGdCQUFNVixZQUFZVyxpQkFBT0MscUJBQVAsQ0FBNkJDLFFBQVFDLEdBQVIsRUFBN0IsRUFBNENILGlCQUFPSSxvQkFBUCxDQUE0QkYsUUFBUUMsR0FBUixFQUE1QixDQUE1QyxDQUFsQjs7QUFFQUosc0JBQVVNLElBQVYsQ0FBZWpCLDJCQUEyQkMsU0FBM0IsQ0FBZjtBQUNBVSxzQkFBVU0sSUFBVixDQUFlVixzQkFBZjs7QUFFQSxtQkFBT0ksU0FBUDtBQUNIOzs7OztrQkFHVSxJQUFJRCx1QkFBSixFIiwiZmlsZSI6ImNTaGFycElucXVpcmVyUXVlc3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdsb2JhbCBmcm9tICcuLi9nbG9iYWwnXG5cbmNvbnN0IGN1c3RvbU5hbWVzcGFjZUNob2ljZSA9ICdXcml0ZSBjdXN0b20gbmFtZXNwYWNlJztcblxuZnVuY3Rpb24gZ2VuZXJhdGVkTmFtZXNwYWNlUXVlc3Rpb24obmFtZXNwYWNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2xpc3QnLFxuICAgICAgICBuYW1lOiAnbmFtZXNwYWNlJyxcbiAgICAgICAgbWVzc2FnZTogYENob29zZSBvciBjcmVhdGUgbmFtZXNwYWNlOmAsXG4gICAgICAgIGNob2ljZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBgKGRlZmF1bHQpICR7bmFtZXNwYWNlfWAsXG4gICAgICAgICAgICAgICAgdmFsdWU6IG5hbWVzcGFjZSAgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IGN1c3RvbU5hbWVzcGFjZUNob2ljZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogY3VzdG9tTmFtZXNwYWNlQ2hvaWNlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5jb25zdCBpbnB1dE5hbWVzcGFjZVF1ZXN0aW9uID1cbntcbiAgICB0eXBlOiAnaW5wdXQnLFxuICAgIG5hbWU6ICduYW1lc3BhY2UnLFxuICAgIG1lc3NhZ2U6IGBFbnRlciB0aGUgQWdncmVnYXRlIFJvb3QncyBuYW1lc3BhY2VgLFxuICAgIHdoZW46IGZ1bmN0aW9uKGFuc3dlcnMpIHtcbiAgICAgICAgcmV0dXJuIGFuc3dlcnMubmFtZXNwYWNlID09PSBjdXN0b21OYW1lc3BhY2VDaG9pY2U7XG4gICAgfVxufTtcblxuXG5jbGFzcyBjU2hhcnBJbnF1aXJlclF1ZXN0aW9ucyB7XG4gICAgZ2V0Q1NoYXJwUXVlc3Rpb25zKCkge1xuICAgICAgICBsZXQgcXVlc3Rpb25zID0gW107XG4gICAgICAgIFxuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSBnbG9iYWwuY3JlYXRlQ1NoYXJwTmFtZXNwYWNlKHByb2Nlc3MuY3dkKCksIGdsb2JhbC5nZXROZWFyZXN0Q3Nwcm9qRmlsZShwcm9jZXNzLmN3ZCgpKSk7XG4gICAgXG4gICAgICAgIHF1ZXN0aW9ucy5wdXNoKGdlbmVyYXRlZE5hbWVzcGFjZVF1ZXN0aW9uKG5hbWVzcGFjZSkpO1xuICAgICAgICBxdWVzdGlvbnMucHVzaChpbnB1dE5hbWVzcGFjZVF1ZXN0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBxdWVzdGlvbnM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgY1NoYXJwSW5xdWlyZXJRdWVzdGlvbnMoKTsiXX0=