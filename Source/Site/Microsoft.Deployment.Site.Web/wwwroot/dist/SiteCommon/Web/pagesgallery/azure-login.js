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
var query_parameter_1 = require('../base/query-parameter');
var datastore_1 = require('../services/datastore');
var viewmodelbase_1 = require('../services/viewmodelbase');

var AzureLogin = function (_viewmodelbase_1$View) {
    (0, _inherits3.default)(AzureLogin, _viewmodelbase_1$View);

    function AzureLogin() {
        (0, _classCallCheck3.default)(this, AzureLogin);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AzureLogin.__proto__ || (0, _getPrototypeOf2.default)(AzureLogin)).call(this));

        _this.authToken = {};
        _this.azureConnection = AzureConnection;
        _this.azureDirectory = '';
        _this.connectionType = AzureConnection.Organizational;
        _this.isPricingChecked = false;
        _this.oauthType = '';
        _this.selectedResourceGroup = 'SolutionTemplate-' + _this.MS.UtilityService.GetUniqueId(5);
        _this.selectedSubscriptionId = '';
        _this.showAdvanced = false;
        _this.showPricingConfirmation = false;
        _this.subscriptionsList = [];
        _this.pricingUrl = '';
        _this.pricingCost = '';
        return _this;
    }

    (0, _createClass3.default)(AzureLogin, [{
        key: 'OnLoaded',
        value: function OnLoaded() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                var queryParam, token, tokenObj, subscriptions;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.isValidated = false;
                                this.showValidation = false;

                                if (!(this.subscriptionsList.length > 0)) {
                                    _context.next = 7;
                                    break;
                                }

                                this.isValidated = true;
                                this.showValidation = true;
                                _context.next = 26;
                                break;

                            case 7:
                                queryParam = this.MS.UtilityService.GetItem('queryUrl');

                                if (!queryParam) {
                                    _context.next = 26;
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
                                tokenObj = { code: token };
                                _context.next = 18;
                                return this.MS.HttpService.executeAsync('Microsoft-GetAzureToken', tokenObj);

                            case 18:
                                this.authToken = _context.sent;

                                if (!this.authToken.IsSuccess) {
                                    _context.next = 25;
                                    break;
                                }

                                this.MS.DataStore.addToDataStore('AzureToken', this.authToken.Body.AzureToken, datastore_1.DataStoreType.Private);
                                _context.next = 23;
                                return this.MS.HttpService.executeAsync('Microsoft-GetAzureSubscriptions', {});

                            case 23:
                                subscriptions = _context.sent;

                                if (subscriptions.IsSuccess) {
                                    this.subscriptionsList = subscriptions.Body.value;
                                    if (!this.subscriptionsList || this.subscriptionsList && this.subscriptionsList.length === 0) {
                                        this.MS.ErrorService.message = this.MS.Translate.AZURE_LOGIN_SUBSCRIPTION_ERROR;
                                    } else {
                                        this.showPricingConfirmation = true;
                                    }
                                }

                            case 25:
                                this.MS.UtilityService.RemoveItem('queryUrl');

                            case 26:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: 'AzureTrialClicked',
        value: function AzureTrialClicked(event) {
            this.MS.LoggerService.TrackEvent('AzureTrialClicked');
            return event;
        }
    }, {
        key: 'AzurePricingClicked',
        value: function AzurePricingClicked() {
            this.MS.LoggerService.TrackEvent('AzurePricingClicked');
        }
    }, {
        key: 'verifyPricing',
        value: function verifyPricing() {
            this.isValidated = this.isPricingChecked;
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
                                this.MS.DataStore.addToDataStore('oauthType', this.oauthType, datastore_1.DataStoreType.Public);
                                if (this.connectionType.toString() === AzureConnection.Microsoft.toString()) {
                                    this.MS.DataStore.addToDataStore('AADTenant', this.azureDirectory, datastore_1.DataStoreType.Public);
                                } else {
                                    this.MS.DataStore.addToDataStore('AADTenant', 'common', datastore_1.DataStoreType.Public);
                                }
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
            var _this2 = this;

            var _super = function _super(name) {
                return (0, _get3.default)(AzureLogin.prototype.__proto__ || (0, _getPrototypeOf2.default)(AzureLogin.prototype), name, _this2);
            };
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee3() {
                var _this3 = this;

                var subscriptionObject, locationsResponse, response;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                subscriptionObject = this.subscriptionsList.find(function (x) {
                                    return x.SubscriptionId === _this3.selectedSubscriptionId;
                                });

                                this.MS.DataStore.addToDataStore('SelectedSubscription', subscriptionObject, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('SelectedResourceGroup', this.selectedResourceGroup, datastore_1.DataStoreType.Public);
                                _context3.next = 5;
                                return this.MS.HttpService.executeAsync('Microsoft-GetLocations', {});

                            case 5:
                                locationsResponse = _context3.sent;

                                if (locationsResponse.IsSuccess) {
                                    this.MS.DataStore.addToDataStore('SelectedLocation', locationsResponse.Body.value[5], datastore_1.DataStoreType.Public);
                                }
                                _context3.next = 9;
                                return this.MS.HttpService.executeAsync('Microsoft-CreateResourceGroup', {});

                            case 9:
                                response = _context3.sent;

                                if (response.IsSuccess) {
                                    _context3.next = 12;
                                    break;
                                }

                                return _context3.abrupt('return', false);

                            case 12:
                                _context3.next = 14;
                                return _super("NavigatingNext").call(this);

                            case 14:
                                return _context3.abrupt('return', _context3.sent);

                            case 15:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }]);
    return AzureLogin;
}(viewmodelbase_1.ViewModelBase);

exports.AzureLogin = AzureLogin;
var AzureConnection;
(function (AzureConnection) {
    AzureConnection[AzureConnection["Microsoft"] = 0] = "Microsoft";
    AzureConnection[AzureConnection["Organizational"] = 1] = "Organizational";
})(AzureConnection || (AzureConnection = {}));
//# sourceMappingURL=azure-login.js.map
