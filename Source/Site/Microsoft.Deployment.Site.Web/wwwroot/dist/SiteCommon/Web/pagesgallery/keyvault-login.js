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
var azure_login_1 = require('./azure-login');
var datastore_1 = require('../services/datastore');

var KeyVaultLogin = function (_azure_login_1$AzureL) {
    (0, _inherits3.default)(KeyVaultLogin, _azure_login_1$AzureL);

    function KeyVaultLogin() {
        (0, _classCallCheck3.default)(this, KeyVaultLogin);

        var _this = (0, _possibleConstructorReturn3.default)(this, (KeyVaultLogin.__proto__ || (0, _getPrototypeOf2.default)(KeyVaultLogin)).call(this));

        _this.hasToken = false;
        return _this;
    }

    (0, _createClass3.default)(KeyVaultLogin, [{
        key: 'OnLoaded',
        value: function OnLoaded() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                var queryParam, token, tokenObj;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.isValidated = false;
                                this.showValidation = false;

                                if (!this.hasToken) {
                                    _context.next = 7;
                                    break;
                                }

                                this.isValidated = true;
                                this.showValidation = true;
                                _context.next = 21;
                                break;

                            case 7:
                                queryParam = this.MS.UtilityService.GetItem('queryUrl');

                                if (!queryParam) {
                                    _context.next = 21;
                                    break;
                                }

                                token = this.MS.UtilityService.GetQueryParameterFromUrl(query_parameter_1.QueryParameter.CODE, queryParam);

                                if (!(token === '')) {
                                    _context.next = 15;
                                    break;
                                }

                                this.MS.ErrorService.message = this.MS.Translate.AZURE_LOGIN_UNKNOWN_ERROR;
                                this.MS.ErrorService.details = this.MS.UtilityService.GetQueryParameterFromUrl(query_parameter_1.QueryParameter.ERRORDESCRIPTION, queryParam);
                                this.MS.ErrorService.showContactUs = true;
                                return _context.abrupt('return');

                            case 15:
                                tokenObj = {
                                    code: token
                                };
                                _context.next = 18;
                                return this.MS.HttpService.executeAsync('Microsoft-GetAzureToken', tokenObj);

                            case 18:
                                this.authToken = _context.sent;

                                if (this.authToken.IsSuccess) {
                                    this.MS.DataStore.addToDataStore('AzureTokenKV', this.authToken.Body.AzureToken, datastore_1.DataStoreType.Private);
                                    this.hasToken = true;
                                    this.isValidated = true;
                                    this.showValidation = true;
                                }
                                this.MS.UtilityService.RemoveItem('queryUrl');

                            case 21:
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
                                this.MS.DataStore.addToDataStoreWithCustomRoute('dynamics365login-', 'oauthType', this.oauthType, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('AADTenant', 'common', datastore_1.DataStoreType.Public);
                                _context2.next = 4;
                                return this.MS.HttpService.executeAsync('Microsoft-GetAzureAuthUri', {});

                            case 4:
                                response = _context2.sent;

                                window.location.href = response.Body.value;

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: 'NavigatingNext',
        value: function NavigatingNext() {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee3() {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                return _context3.abrupt('return', true);

                            case 1:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }]);
    return KeyVaultLogin;
}(azure_login_1.AzureLogin);

exports.KeyVaultLogin = KeyVaultLogin;
//# sourceMappingURL=keyvault-login.js.map
