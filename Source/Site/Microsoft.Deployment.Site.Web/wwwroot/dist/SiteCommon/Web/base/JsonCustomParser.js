"use strict";

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JsonCustomParser = function () {
    function JsonCustomParser() {
        (0, _classCallCheck3.default)(this, JsonCustomParser);
    }

    (0, _createClass3.default)(JsonCustomParser, null, [{
        key: 'isVariable',
        value: function isVariable(value) {
            value = value.toString();
            if (value.startsWith('$(') && value.endsWith(')')) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'extractVariable',
        value: function extractVariable(value) {
            var intermediate = value.replace('$(', '');
            var result = intermediate.slice(0, intermediate.length - 1);
            var resultSplit = result.split(',');
            return resultSplit[0].trim();
        }
    }, {
        key: 'isPermenantEntryIntoDataStore',
        value: function isPermenantEntryIntoDataStore(value) {
            var intermediate = value.replace('$(', '');
            var result = intermediate.slice(0, intermediate.length - 1);
            var resultSplit = result.split(',');
            for (var index = 0; index < resultSplit.length; index++) {
                if (index < 1) {
                    continue;
                }
                var param = resultSplit[index].trim().toLowerCase();
                var paramSplit = param.split('=');
                if (paramSplit[0] === 'issaved' && paramSplit[1] === 'true') {
                    return true;
                }
            }
            return false;
        }
    }]);
    return JsonCustomParser;
}();

exports.JsonCustomParser = JsonCustomParser;
//# sourceMappingURL=JsonCustomParser.js.map
