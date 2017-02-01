"use strict";

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorService = function () {
    function ErrorService(MainService) {
        (0, _classCallCheck3.default)(this, ErrorService);

        this.details = '';
        this.logLocation = '';
        this.message = '';
        this.showContactUs = false;
        this.MS = MainService;
    }

    (0, _createClass3.default)(ErrorService, [{
        key: 'Clear',
        value: function Clear() {
            this.details = '';
            this.logLocation = '';
            this.message = '';
            this.showContactUs = false;
        }
    }]);
    return ErrorService;
}();

exports.ErrorService = ErrorService;
//# sourceMappingURL=errorservice.js.map
