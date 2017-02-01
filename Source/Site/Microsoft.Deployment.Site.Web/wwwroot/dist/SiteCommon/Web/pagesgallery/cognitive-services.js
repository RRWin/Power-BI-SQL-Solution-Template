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

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

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
var datastore_1 = require("../services/datastore");
var viewmodelbase_1 = require("../services/viewmodelbase");

var CognitiveService = function (_viewmodelbase_1$View) {
    (0, _inherits3.default)(CognitiveService, _viewmodelbase_1$View);

    function CognitiveService() {
        (0, _classCallCheck3.default)(this, CognitiveService);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CognitiveService.__proto__ || (0, _getPrototypeOf2.default)(CognitiveService)).call(this));

        _this.cognitiveServiceKey = '';
        _this.cognitiveSelectedType = 'NewKey';
        _this.cognitiveServiceName = 'SolutionTemplateCognitiveService';
        _this.isValidated = true;
        return _this;
    }

    (0, _createClass3.default)(CognitiveService, [{
        key: "onKeyTypeChange",
        value: function onKeyTypeChange() {
            this.Invalidate();
            if (this.cognitiveSelectedType === 'ExistingKey') {
                this.isValidated = false;
            } else if (this.cognitiveSelectedType === 'NewKey') {
                this.cognitiveServiceKey = '';
                this.isValidated = true;
            }
        }
    }, {
        key: "Invalidate",
        value: function Invalidate() {
            (0, _get3.default)(CognitiveService.prototype.__proto__ || (0, _getPrototypeOf2.default)(CognitiveService.prototype), "Invalidate", this).call(this);
        }
    }, {
        key: "OnValidate",
        value: function OnValidate() {
            var _this2 = this;

            var _super = function _super(name) {
                return (0, _get3.default)(CognitiveService.prototype.__proto__ || (0, _getPrototypeOf2.default)(CognitiveService.prototype), name, _this2);
            };
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
                var body, response;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (_super("OnValidate").call(this)) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt("return", false);

                            case 2:
                                if (!(this.cognitiveSelectedType === 'ExistingKey')) {
                                    _context.next = 11;
                                    break;
                                }

                                body = {};

                                body.CognitiveServiceKey = this.cognitiveServiceKey;
                                _context.next = 7;
                                return this.MS.HttpService.executeAsync('Microsoft-ValidateCognitiveKey', body);

                            case 7:
                                response = _context.sent;

                                if (response.IsSuccess) {
                                    this.isValidated = true;
                                    this.showValidation = true;
                                }
                                _context.next = 12;
                                break;

                            case 11:
                                if (this.cognitiveSelectedType === 'NewKey') {
                                    this.isValidated = true;
                                }

                            case 12:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "NavigatingNext",
        value: function NavigatingNext() {
            var _this3 = this;

            var _super = function _super(name) {
                return (0, _get3.default)(CognitiveService.prototype.__proto__ || (0, _getPrototypeOf2.default)(CognitiveService.prototype), name, _this3);
            };
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (_super("NavigatingNext").call(this)) {
                                    _context2.next = 2;
                                    break;
                                }

                                return _context2.abrupt("return", false);

                            case 2:
                                this.MS.DataStore.addToDataStore('CognitiveServiceKey', this.cognitiveServiceKey, datastore_1.DataStoreType.Private);
                                this.MS.DataStore.addToDataStore('CognitiveServiceName', this.cognitiveServiceName, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('CognitiveSkuName', "S1", datastore_1.DataStoreType.Public);
                                return _context2.abrupt("return", true);

                            case 6:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }]);
    return CognitiveService;
}(viewmodelbase_1.ViewModelBase);

exports.CognitiveService = CognitiveService;
//# sourceMappingURL=cognitive-services.js.map
