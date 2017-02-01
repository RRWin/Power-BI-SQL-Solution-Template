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
var query_parameter_1 = require('../base/query-parameter');
var actionresponse_1 = require('../services/actionresponse');
var datastore_1 = require('../services/datastore');
var viewmodelbase_1 = require('../services/viewmodelbase');

var Twitter = function (_viewmodelbase_1$View) {
    (0, _inherits3.default)(Twitter, _viewmodelbase_1$View);

    function Twitter() {
        (0, _classCallCheck3.default)(this, Twitter);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Twitter.__proto__ || (0, _getPrototypeOf2.default)(Twitter)).call(this));

        _this.authToken = {};
        _this.isAuthenticated = false;
        _this.isValidated = false;
        return _this;
    }

    (0, _createClass3.default)(Twitter, [{
        key: 'OnLoaded',
        value: function OnLoaded() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                var queryParam, code, response, _response, _response2;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.isAuthenticated = false;
                                this.isValidated = false;
                                this.showValidation = false;
                                queryParam = this.MS.UtilityService.GetItem('queryUrl');

                                if (!queryParam) {
                                    _context.next = 22;
                                    break;
                                }

                                code = this.MS.UtilityService.GetQueryParameterFromUrl(query_parameter_1.QueryParameter.CODE, queryParam);

                                if (!code) {
                                    _context.next = 14;
                                    break;
                                }

                                this.MS.DataStore.addToDataStore('TwitterCode', code, datastore_1.DataStoreType.Private);
                                _context.next = 10;
                                return this.MS.HttpService.executeAsync('Microsoft-ConsentTwitterConnectionToLogicApp', {});

                            case 10:
                                response = _context.sent;

                                if (response.IsSuccess) {
                                    this.isAuthenticated = true;
                                    this.isValidated = true;
                                    this.showValidation = true;
                                }
                                _context.next = 19;
                                break;

                            case 14:
                                _context.next = 16;
                                return this.MS.HttpService.executeAsync('Microsoft-VerifyTwitterConnection', {});

                            case 16:
                                _response = _context.sent;

                                if (_response.Status === actionresponse_1.ActionStatus.FailureExpected) {
                                    this.MS.ErrorService.details = '';
                                    this.MS.ErrorService.message = '';
                                }
                                if (_response.IsSuccess) {
                                    this.isAuthenticated = true;
                                    this.isValidated = true;
                                    this.showValidation = true;
                                }

                            case 19:
                                this.MS.UtilityService.RemoveItem('queryUrl');
                                _context.next = 28;
                                break;

                            case 22:
                                _context.next = 24;
                                return this.MS.HttpService.executeAsync('Microsoft-VerifyTwitterConnection', {});

                            case 24:
                                _response2 = _context.sent;

                                this.MS.ErrorService.details = '';
                                this.MS.ErrorService.message = '';
                                if (_response2.IsSuccess) {
                                    this.isAuthenticated = true;
                                    this.isValidated = true;
                                    this.showValidation = true;
                                }

                            case 28:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: 'connect',
        value: function connect() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
                var response;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (this.isAuthenticated) {
                                    _context2.next = 5;
                                    break;
                                }

                                _context2.next = 3;
                                return this.MS.HttpService.executeAsync('Microsoft-CreateTwitterConnectionToLogicApp', {});

                            case 3:
                                response = _context2.sent;

                                if (response.IsSuccess) {
                                    window.location.href = response.Body['Consent']['value'][0]['link'];
                                }

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }]);
    return Twitter;
}(viewmodelbase_1.ViewModelBase);

exports.Twitter = Twitter;
//# sourceMappingURL=twitter.js.map
