#!/usr/bin/env node
'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _global = require('./global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Dolittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var inquirer = require('inquirer');
var USAGE = 'dolittle add readmodel';
_args2.default.example(USAGE, "Creates a read model in the current folder");

inquirer.prompt(_global2.default.languageQuestion).then(function (answers) {
    _global2.default.artifactsManager.createReadModel(answers.language);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL1NvdXJjZS9kb2xpdHRsZS1hZGQtcmVhZG1vZGVsLmpzIl0sIm5hbWVzIjpbImlucXVpcmVyIiwicmVxdWlyZSIsIlVTQUdFIiwiYXJncyIsImV4YW1wbGUiLCJwcm9tcHQiLCJnbG9iYWwiLCJsYW5ndWFnZVF1ZXN0aW9uIiwidGhlbiIsImFydGlmYWN0c01hbmFnZXIiLCJjcmVhdGVSZWFkTW9kZWwiLCJhbnN3ZXJzIiwibGFuZ3VhZ2UiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7QUFDQTs7Ozs7O0FBTEE7Ozs7QUFPQSxJQUFJQSxXQUFXQyxRQUFRLFVBQVIsQ0FBZjtBQUNBLElBQU1DLFFBQVEsd0JBQWQ7QUFDQUMsZUFDS0MsT0FETCxDQUNhRixLQURiLEVBQ29CLDRDQURwQjs7QUFHQUYsU0FBU0ssTUFBVCxDQUFnQkMsaUJBQU9DLGdCQUF2QixFQUF5Q0MsSUFBekMsQ0FBOEMsbUJBQVc7QUFDckRGLHFCQUFPRyxnQkFBUCxDQUF3QkMsZUFBeEIsQ0FBd0NDLFFBQVFDLFFBQWhEO0FBQ0QsQ0FGSCIsImZpbGUiOiJkb2xpdHRsZS1hZGQtcmVhZG1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIENvcHlyaWdodCAoYykgRG9saXR0bGUuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgYXJncyBmcm9tICdhcmdzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuXG52YXIgaW5xdWlyZXIgPSByZXF1aXJlKCdpbnF1aXJlcicpO1xuY29uc3QgVVNBR0UgPSAnZG9saXR0bGUgYWRkIHJlYWRtb2RlbCc7XG5hcmdzXG4gICAgLmV4YW1wbGUoVVNBR0UsIFwiQ3JlYXRlcyBhIHJlYWQgbW9kZWwgaW4gdGhlIGN1cnJlbnQgZm9sZGVyXCIpO1xuXG5pbnF1aXJlci5wcm9tcHQoZ2xvYmFsLmxhbmd1YWdlUXVlc3Rpb24pLnRoZW4oYW5zd2VycyA9PiB7XG4gICAgZ2xvYmFsLmFydGlmYWN0c01hbmFnZXIuY3JlYXRlUmVhZE1vZGVsKGFuc3dlcnMubGFuZ3VhZ2UpO1xuICB9KTsiXX0=