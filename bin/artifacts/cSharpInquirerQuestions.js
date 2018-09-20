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
        choices: ['' + namespace, customNamespaceChoice]
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

            var namespace = _global2.default.createCSharpNamespace(process.cwd(), _global2.default.getNearestCsprojFile());

            questions.push(generatedNamespaceQuestion(namespace));
            questions.push(inputNamespaceQuestion);

            return questions;
        }
    }]);
    return cSharpInquirerQuestions;
}();

exports.default = new cSharpInquirerQuestions();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1NvdXJjZS9hcnRpZmFjdHMvY1NoYXJwSW5xdWlyZXJRdWVzdGlvbnMuanMiXSwibmFtZXMiOlsiY3VzdG9tTmFtZXNwYWNlQ2hvaWNlIiwiZ2VuZXJhdGVkTmFtZXNwYWNlUXVlc3Rpb24iLCJuYW1lc3BhY2UiLCJ0eXBlIiwibmFtZSIsIm1lc3NhZ2UiLCJjaG9pY2VzIiwiaW5wdXROYW1lc3BhY2VRdWVzdGlvbiIsIndoZW4iLCJhbnN3ZXJzIiwiY1NoYXJwSW5xdWlyZXJRdWVzdGlvbnMiLCJxdWVzdGlvbnMiLCJnbG9iYWwiLCJjcmVhdGVDU2hhcnBOYW1lc3BhY2UiLCJwcm9jZXNzIiwiY3dkIiwiZ2V0TmVhcmVzdENzcHJvakZpbGUiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSx3QkFBd0Isd0JBQTlCOztBQUVBLFNBQVNDLDBCQUFULENBQW9DQyxTQUFwQyxFQUErQztBQUMzQyxXQUFPO0FBQ0hDLGNBQU0sTUFESDtBQUVIQyxjQUFNLFdBRkg7QUFHSEMsOENBSEc7QUFJSEMsaUJBQVMsTUFDRkosU0FERSxFQUVMRixxQkFGSztBQUpOLEtBQVA7QUFTSDs7QUFFRCxJQUFNTyx5QkFDTjtBQUNJSixVQUFNLE9BRFY7QUFFSUMsVUFBTSxXQUZWO0FBR0lDLG9EQUhKO0FBSUlHLFVBQU0sY0FBU0MsT0FBVCxFQUFrQjtBQUNwQixlQUFPQSxRQUFRUCxTQUFSLEtBQXNCRixxQkFBN0I7QUFDSDtBQU5MLENBREE7O0lBV01VLHVCOzs7Ozs7OzZDQUNtQjtBQUNqQixnQkFBSUMsWUFBWSxFQUFoQjs7QUFFQSxnQkFBTVQsWUFBWVUsaUJBQU9DLHFCQUFQLENBQTZCQyxRQUFRQyxHQUFSLEVBQTdCLEVBQTRDSCxpQkFBT0ksb0JBQVAsRUFBNUMsQ0FBbEI7O0FBRUFMLHNCQUFVTSxJQUFWLENBQWVoQiwyQkFBMkJDLFNBQTNCLENBQWY7QUFDQVMsc0JBQVVNLElBQVYsQ0FBZVYsc0JBQWY7O0FBRUEsbUJBQU9JLFNBQVA7QUFDSDs7Ozs7a0JBR1UsSUFBSUQsdUJBQUosRSIsImZpbGUiOiJjU2hhcnBJbnF1aXJlclF1ZXN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnbG9iYWwgZnJvbSAnLi4vZ2xvYmFsJ1xuXG5jb25zdCBjdXN0b21OYW1lc3BhY2VDaG9pY2UgPSAnV3JpdGUgY3VzdG9tIG5hbWVzcGFjZSc7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlZE5hbWVzcGFjZVF1ZXN0aW9uKG5hbWVzcGFjZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdsaXN0JyxcbiAgICAgICAgbmFtZTogJ25hbWVzcGFjZScsXG4gICAgICAgIG1lc3NhZ2U6IGBDaG9vc2Ugb3IgY3JlYXRlIG5hbWVzcGFjZTpgLFxuICAgICAgICBjaG9pY2VzOiBbXG4gICAgICAgICAgICBgJHtuYW1lc3BhY2V9YCxcbiAgICAgICAgICAgIGN1c3RvbU5hbWVzcGFjZUNob2ljZVxuICAgICAgICBdXG4gICAgfVxufTtcblxuY29uc3QgaW5wdXROYW1lc3BhY2VRdWVzdGlvbiA9XG57XG4gICAgdHlwZTogJ2lucHV0JyxcbiAgICBuYW1lOiAnbmFtZXNwYWNlJyxcbiAgICBtZXNzYWdlOiBgRW50ZXIgdGhlIEFnZ3JlZ2F0ZSBSb290J3MgbmFtZXNwYWNlYCxcbiAgICB3aGVuOiBmdW5jdGlvbihhbnN3ZXJzKSB7XG4gICAgICAgIHJldHVybiBhbnN3ZXJzLm5hbWVzcGFjZSA9PT0gY3VzdG9tTmFtZXNwYWNlQ2hvaWNlO1xuICAgIH1cbn07XG5cblxuY2xhc3MgY1NoYXJwSW5xdWlyZXJRdWVzdGlvbnMge1xuICAgIGdldENTaGFycFF1ZXN0aW9ucygpIHtcbiAgICAgICAgbGV0IHF1ZXN0aW9ucyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gZ2xvYmFsLmNyZWF0ZUNTaGFycE5hbWVzcGFjZShwcm9jZXNzLmN3ZCgpLCBnbG9iYWwuZ2V0TmVhcmVzdENzcHJvakZpbGUoKSk7XG4gICAgXG4gICAgICAgIHF1ZXN0aW9ucy5wdXNoKGdlbmVyYXRlZE5hbWVzcGFjZVF1ZXN0aW9uKG5hbWVzcGFjZSkpO1xuICAgICAgICBxdWVzdGlvbnMucHVzaChpbnB1dE5hbWVzcGFjZVF1ZXN0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBxdWVzdGlvbnM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgY1NoYXJwSW5xdWlyZXJRdWVzdGlvbnMoKTsiXX0=