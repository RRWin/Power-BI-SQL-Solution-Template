"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var viewmodelbase_1 = require('../services/viewmodelbase');

var SummaryViewModel = function (_viewmodelbase_1$View) {
    (0, _inherits3.default)(SummaryViewModel, _viewmodelbase_1$View);

    function SummaryViewModel() {
        (0, _classCallCheck3.default)(this, SummaryViewModel);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SummaryViewModel.__proto__ || (0, _getPrototypeOf2.default)(SummaryViewModel)).call(this));

        _this.values = {};
        return _this;
    }

    (0, _createClass3.default)(SummaryViewModel, [{
        key: "loadSummaryObjectIntoRows",
        value: function loadSummaryObjectIntoRows() {
            this.textNext = this.MS.Translate.COMMON_RUN;
            this.summaryRows = new Array();
            var entryRow = new EntryRow();
            for (var text in this.values) {
                if (this.values.hasOwnProperty(text) && this.values[text]) {
                    entryRow.entries.push(new Entry(text, this.values[text]));
                    if (entryRow.entries.length > 2) {
                        this.summaryRows.push(entryRow);
                        entryRow = new EntryRow();
                    }
                }
            }
            if (entryRow.entries.length > 0) {
                this.summaryRows.push(entryRow);
            }
        }
    }, {
        key: "OnLoaded",
        value: function OnLoaded() {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.loadSummaryObjectIntoRows();

                            case 1:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }]);
    return SummaryViewModel;
}(viewmodelbase_1.ViewModelBase);

exports.SummaryViewModel = SummaryViewModel;

var Entry = function Entry(text, value) {
    (0, _classCallCheck3.default)(this, Entry);

    this.text = text;
    this.value = value;
};

var EntryRow = function EntryRow() {
    (0, _classCallCheck3.default)(this, EntryRow);

    this.entries = [];
};
//# sourceMappingURL=summary.js.map
