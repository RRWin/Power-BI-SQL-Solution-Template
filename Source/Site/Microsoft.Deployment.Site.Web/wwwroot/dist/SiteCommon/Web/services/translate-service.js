"use strict";

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var language_1 = require('../localization/language');
var en_us_1 = require('../localization/en-us');

var TranslateService = function TranslateService(MainService, language) {
    (0, _classCallCheck3.default)(this, TranslateService);

    this.language = null;
    this.MS = MainService;
    switch (language) {
        case language_1.Language.EN_US:
            this.language = en_us_1.EN_US;
            break;
        default:
            this.language = en_us_1.EN_US;
    }
};

exports.TranslateService = TranslateService;
//# sourceMappingURL=translate-service.js.map
