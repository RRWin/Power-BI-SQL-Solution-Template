"use strict";

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _promise = require('babel-runtime/core-js/promise');

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
var viewmodelbase_1 = require('../../../../../SiteCommon/Web/services/viewmodelbase');
var datastore_1 = require('../../../../../SiteCommon/Web/services/datastore');

var Customize = function (_viewmodelbase_1$View) {
    (0, _inherits3.default)(Customize, _viewmodelbase_1$View);

    function Customize() {
        (0, _classCallCheck3.default)(this, Customize);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Customize.__proto__ || (0, _getPrototypeOf2.default)(Customize)).call(this));

        _this.actuals = '';
        _this.emails = '';
        _this.fiscalMonth = '';
        _this.pipelineFrequency = '';
        _this.recurrent = '';
        _this.isValidated = false;
        _this.showValidation = false;
        _this.fiscalMonth = "January";
        _this.recurrent = "None";
        _this.actuals = "Closed opportunities";
        _this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return _this;
    }

    (0, _createClass3.default)(Customize, [{
        key: 'OnLoaded',
        value: function OnLoaded() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.isValidated = false;
                                this.showValidation = false;

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: 'OnValidate',
        value: function OnValidate() {
            var _this2 = this;

            var _super = function _super(name) {
                return (0, _get3.default)(Customize.prototype.__proto__ || (0, _getPrototypeOf2.default)(Customize.prototype), name, _this2);
            };
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
                var mails, mail;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.isValidated = false;
                                this.showValidation = true;

                                if (!(this.emails != null && this.emails != '')) {
                                    _context2.next = 14;
                                    break;
                                }

                                mails = this.emails.split(',');
                                _context2.t0 = _regenerator2.default.keys(mails);

                            case 5:
                                if ((_context2.t1 = _context2.t0()).done) {
                                    _context2.next = 14;
                                    break;
                                }

                                mail = _context2.t1.value;

                                if (this.emailRegex.test(mails[mail])) {
                                    _context2.next = 12;
                                    break;
                                }

                                this.isValidated = false;
                                this.showValidation = false;
                                this.MS.ErrorService.message = "Validation failed. The email address " + mails[mail] + " is not valid.";
                                return _context2.abrupt('return', false);

                            case 12:
                                _context2.next = 5;
                                break;

                            case 14:
                                if (_super("OnValidate").call(this)) {
                                    _context2.next = 16;
                                    break;
                                }

                                return _context2.abrupt('return', false);

                            case 16:
                                _context2.t2 = this.recurrent;
                                _context2.next = _context2.t2 === "Every 15 minutes" ? 19 : _context2.t2 === "Every 30 minutes" ? 22 : _context2.t2 === "Hourly" ? 25 : _context2.t2 === "Daily" ? 28 : _context2.t2 === "None" ? 31 : 34;
                                break;

                            case 19:
                                this.pipelineFrequency = "Minute";
                                this.pipelineInterval = 15;
                                return _context2.abrupt('break', 35);

                            case 22:
                                this.pipelineFrequency = "Minute";
                                this.pipelineInterval = 30;
                                return _context2.abrupt('break', 35);

                            case 25:
                                this.pipelineFrequency = "Hour";
                                this.pipelineInterval = 1;
                                return _context2.abrupt('break', 35);

                            case 28:
                                this.pipelineFrequency = "Day";
                                this.pipelineInterval = 1;
                                return _context2.abrupt('break', 35);

                            case 31:
                                this.pipelineFrequency = "Week";
                                this.pipelineInterval = 1;
                                return _context2.abrupt('break', 35);

                            case 34:
                                return _context2.abrupt('break', 35);

                            case 35:
                                this.MS.DataStore.addToDataStore("fiscalMonth", this.fiscalMonth, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore("actuals", this.actuals, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('EmailAddresses', this.emails, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('pipelineStart', null, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('pipelineEnd', null, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('pipelineType', null, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('postDeploymentPipelineFrequency', this.pipelineFrequency, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('postDeploymentPipelineInterval', this.pipelineInterval.toString(), datastore_1.DataStoreType.Public);
                                if (this.recurrent == "None") {
                                    this.MS.DataStore.addToDataStore("historicalOnly", "true", datastore_1.DataStoreType.Public);
                                } else {
                                    this.MS.DataStore.addToDataStore("historicalOnly", "false", datastore_1.DataStoreType.Public);
                                }
                                this.MS.DataStore.addToDataStore('pipelineFrequency', 'Month', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('pipelineInterval', 1, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('pipelineStart', '', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('pipelineEnd', '', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('pipelineType', "PreDeployment", datastore_1.DataStoreType.Public);
                                this.isValidated = true;
                                this.showValidation = true;
                                return _context2.abrupt('return', true);

                            case 52:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }]);
    return Customize;
}(viewmodelbase_1.ViewModelBase);

exports.Customize = Customize;
//# sourceMappingURL=customize.js.map
