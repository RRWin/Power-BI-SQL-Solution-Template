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

var MsCrmLogin = function (_azure_login_1$AzureL) {
    (0, _inherits3.default)(MsCrmLogin, _azure_login_1$AzureL);

    function MsCrmLogin() {
        (0, _classCallCheck3.default)(this, MsCrmLogin);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MsCrmLogin.__proto__ || (0, _getPrototypeOf2.default)(MsCrmLogin)).call(this));

        _this.entities = '';
        _this.msCrmOrganizationId = '';
        _this.msCrmOrganizations = [];
        _this.showAzureTrial = false;
        return _this;
    }

    (0, _createClass3.default)(MsCrmLogin, [{
        key: 'OnLoaded',
        value: function OnLoaded() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                var queryParam, token, tokenObj, response, subscriptions;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.MS.ErrorService.Clear();
                                this.isValidated = false;
                                this.showAzureTrial = false;
                                this.showValidation = false;

                                if (!(this.subscriptionsList.length > 0 && this.msCrmOrganizations.length > 0)) {
                                    _context.next = 9;
                                    break;
                                }

                                this.isValidated = true;
                                this.showValidation = true;
                                _context.next = 37;
                                break;

                            case 9:
                                queryParam = this.MS.UtilityService.GetItem('queryUrl');

                                if (!queryParam) {
                                    _context.next = 37;
                                    break;
                                }

                                token = this.MS.UtilityService.GetQueryParameterFromUrl(query_parameter_1.QueryParameter.CODE, queryParam);

                                if (!(token === '')) {
                                    _context.next = 17;
                                    break;
                                }

                                this.MS.ErrorService.message = this.MS.Translate.MSCRM_LOGIN_ERROR;
                                this.MS.ErrorService.details = this.MS.UtilityService.GetQueryParameterFromUrl(query_parameter_1.QueryParameter.ERRORDESCRIPTION, queryParam);
                                this.MS.ErrorService.showContactUs = true;
                                return _context.abrupt('return');

                            case 17:
                                tokenObj = {
                                    code: token
                                };
                                _context.next = 20;
                                return this.MS.HttpService.executeAsync('Microsoft-GetAzureToken', tokenObj);

                            case 20:
                                this.authToken = _context.sent;

                                if (!this.authToken.IsSuccess) {
                                    _context.next = 36;
                                    break;
                                }

                                _context.next = 24;
                                return this.MS.HttpService.executeAsync('Microsoft-CrmGetOrgs', {});

                            case 24:
                                response = _context.sent;

                                if (!response.IsSuccess) {
                                    _context.next = 36;
                                    break;
                                }

                                this.msCrmOrganizations = JSON.parse(response.Body.value);

                                if (!(this.msCrmOrganizations && this.msCrmOrganizations.length > 0)) {
                                    _context.next = 35;
                                    break;
                                }

                                this.msCrmOrganizationId = this.msCrmOrganizations[0].OrganizationId;
                                _context.next = 31;
                                return this.MS.HttpService.executeAsync('Microsoft-GetAzureSubscriptions', {});

                            case 31:
                                subscriptions = _context.sent;

                                if (subscriptions.IsSuccess) {
                                    this.subscriptionsList = subscriptions.Body.value;
                                    if (!this.subscriptionsList || this.subscriptionsList && this.subscriptionsList.length === 0) {
                                        this.MS.ErrorService.message = this.MS.Translate.AZURE_LOGIN_SUBSCRIPTION_ERROR;
                                        this.showAzureTrial = true;
                                    } else {
                                        this.showPricingConfirmation = true;
                                    }
                                }
                                _context.next = 36;
                                break;

                            case 35:
                                this.MS.ErrorService.message = this.MS.Translate.MSCRM_LOGIN_NO_ORGANIZATIONS;

                            case 36:
                                this.MS.UtilityService.RemoveItem('queryUrl');

                            case 37:
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
                                this.MS.DataStore.addToDataStore('oauthType', this.oauthType, datastore_1.DataStoreType.Public);
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
                var _this2 = this;

                var msCrmOrganization, i, subscriptionObject, locationsResponse, response;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                msCrmOrganization = null;

                                for (i = 0; i < this.msCrmOrganizations.length && msCrmOrganization === null; i++) {
                                    if (this.msCrmOrganizations[i].OrganizationId === this.msCrmOrganizationId) {
                                        msCrmOrganization = this.msCrmOrganizations[i];
                                    }
                                }

                                if (!msCrmOrganization) {
                                    _context3.next = 22;
                                    break;
                                }

                                this.MS.DataStore.addToDataStore('ConnectorUrl', msCrmOrganization.ConnectorUrl, datastore_1.DataStoreType.Private);
                                this.MS.DataStore.addToDataStore('Entities', this.entities, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('OrganizationId', msCrmOrganization.OrganizationId, datastore_1.DataStoreType.Private);
                                this.MS.DataStore.addToDataStore('OrganizationUrl', msCrmOrganization.OrganizationUrl, datastore_1.DataStoreType.Private);
                                subscriptionObject = this.subscriptionsList.find(function (x) {
                                    return x.SubscriptionId === _this2.selectedSubscriptionId;
                                });

                                this.MS.DataStore.addToDataStore('SelectedSubscription', subscriptionObject, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('SelectedResourceGroup', this.selectedResourceGroup, datastore_1.DataStoreType.Public);
                                _context3.next = 12;
                                return this.MS.HttpService.executeAsync('Microsoft-GetLocations', {});

                            case 12:
                                locationsResponse = _context3.sent;

                                if (locationsResponse.IsSuccess) {
                                    this.MS.DataStore.addToDataStore('SelectedLocation', locationsResponse.Body.value[5], datastore_1.DataStoreType.Public);
                                }
                                _context3.next = 16;
                                return this.MS.HttpService.executeAsync('Microsoft-CreateResourceGroup', {});

                            case 16:
                                response = _context3.sent;

                                if (response.IsSuccess) {
                                    _context3.next = 19;
                                    break;
                                }

                                return _context3.abrupt('return', false);

                            case 19:
                                return _context3.abrupt('return', true);

                            case 22:
                                return _context3.abrupt('return', false);

                            case 23:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }]);
    return MsCrmLogin;
}(azure_login_1.AzureLogin);

exports.MsCrmLogin = MsCrmLogin;

var MsCrmOrganization = function MsCrmOrganization() {
    (0, _classCallCheck3.default)(this, MsCrmOrganization);
};
//# sourceMappingURL=mscrm-login.js.map
