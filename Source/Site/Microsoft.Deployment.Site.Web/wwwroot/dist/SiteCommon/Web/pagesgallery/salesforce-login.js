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
var datastore_1 = require('../services/datastore');
var viewmodelbase_1 = require('../services/viewmodelbase');

var Salesforce = function (_viewmodelbase_1$View) {
    (0, _inherits3.default)(Salesforce, _viewmodelbase_1$View);

    function Salesforce() {
        (0, _classCallCheck3.default)(this, Salesforce);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Salesforce.__proto__ || (0, _getPrototypeOf2.default)(Salesforce)).call(this));

        _this.salesforceUsername = '';
        _this.salesforcePassword = '';
        _this.salesforceToken = '';
        _this.salesforceUrl = '';
        _this.salesforceObjects = '';
        _this.isValidated = false;
        _this.showValidation = false;
        _this.salesforceUrl = 'login.salesforce.com';
        return _this;
    }

    (0, _createClass3.default)(Salesforce, [{
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
                return (0, _get3.default)(Salesforce.prototype.__proto__ || (0, _getPrototypeOf2.default)(Salesforce.prototype), name, _this2);
            };
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
                var salesforceLoginResponse;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.MS.DataStore.addToDataStore('SalesforceUser', this.salesforceUsername, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('SalesforcePassword', this.salesforcePassword, datastore_1.DataStoreType.Private);
                                this.MS.DataStore.addToDataStore('SalesforceToken', this.salesforceToken, datastore_1.DataStoreType.Private);
                                this.MS.DataStore.addToDataStore('SalesforceUrl', this.salesforceUrl, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('ObjectTables', this.salesforceObjects, datastore_1.DataStoreType.Public);
                                _context2.next = 7;
                                return this.MS.HttpService.executeAsync('Microsoft-ValidateSalesforceCredentials', {});

                            case 7:
                                salesforceLoginResponse = _context2.sent;

                                if (salesforceLoginResponse.IsSuccess) {
                                    _context2.next = 10;
                                    break;
                                }

                                return _context2.abrupt('return', false);

                            case 10:
                                if (_super("OnValidate").call(this)) {
                                    _context2.next = 12;
                                    break;
                                }

                                return _context2.abrupt('return', false);

                            case 12:
                                this.isValidated = true;
                                this.showValidation = true;
                                this.MS.DataStore.addToDataStore('SalesforceBaseUrl', salesforceLoginResponse.Body.serverUrl, datastore_1.DataStoreType.Public);
                                return _context2.abrupt('return', true);

                            case 16:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }]);
    return Salesforce;
}(viewmodelbase_1.ViewModelBase);

exports.Salesforce = Salesforce;
//# sourceMappingURL=salesforce-login.js.map
