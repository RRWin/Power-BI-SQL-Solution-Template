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

var SapSource = function (_viewmodelbase_1$View) {
    (0, _inherits3.default)(SapSource, _viewmodelbase_1$View);

    function SapSource() {
        (0, _classCallCheck3.default)(this, SapSource);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SapSource.__proto__ || (0, _getPrototypeOf2.default)(SapSource)).call(this));

        _this.applicationServer = '';
        _this.client = 800;
        _this.instanceNumber = '00';
        _this.language = 'EN';
        _this.languages = [];
        _this.password = '';
        _this.rowBatchSize = 250000;
        _this.sapRouterString = '';
        _this.showAdvanced = false;
        _this.systemId = 'ZZZ';
        _this.user = '';
        _this.languages = ['AF', 'AR', 'BG', 'CA', 'CS', 'DA', 'DE', 'EL', 'EN', 'ES', 'ET', 'FI', 'FR', 'HE', 'HR', 'HU', 'ID', 'IS', 'IT', 'JA', 'KO', 'LT', 'LV', 'MS', 'NL', 'NO', 'PL', 'PT', 'RO', 'RU', 'SH', 'SK', 'SL', 'SR', 'SV', 'TH', 'TR', 'UK', 'Z1', 'ZF', 'ZH'];
        _this.isValidated = false;
        return _this;
    }

    (0, _createClass3.default)(SapSource, [{
        key: 'OnValidate',
        value: function OnValidate() {
            var _this2 = this;

            var _super = function _super(name) {
                return (0, _get3.default)(SapSource.prototype.__proto__ || (0, _getPrototypeOf2.default)(SapSource.prototype), name, _this2);
            };
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
                var responseValidate;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _super("OnValidate").call(this);
                                this.isValidated = false;
                                this.showValidation = false;
                                this.storeCredentials();
                                _context.next = 6;
                                return this.MS.HttpService.executeAsync('Microsoft-CredentialManagerWrite');

                            case 6:
                                _context.next = 8;
                                return this.MS.HttpService.executeAsync('Microsoft-WriteSAPJson');

                            case 8:
                                _context.next = 10;
                                return this.MS.HttpService.executeAsync('Microsoft-ValidateSAP');

                            case 10:
                                responseValidate = _context.sent;

                                this.isValidated = responseValidate.IsSuccess;
                                if (this.isValidated) {
                                    this.showValidation = true;
                                }
                                return _context.abrupt('return', this.isValidated);

                            case 14:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: 'storeCredentials',
        value: function storeCredentials() {
            this.MS.DataStore.addToDataStore('CredentialTarget', 'Simplement.SolutionTemplate.AR.SAP', datastore_1.DataStoreType.Public);
            this.MS.DataStore.addToDataStore('CredentialUsername', this.user, datastore_1.DataStoreType.Private);
            this.MS.DataStore.addToDataStore('CredentialPassword', this.password, datastore_1.DataStoreType.Private);
            this.MS.DataStore.addToDataStore('RowBatchSize', this.rowBatchSize, datastore_1.DataStoreType.Public);
            this.MS.DataStore.addToDataStore('SapClient', this.client, datastore_1.DataStoreType.Public);
            this.MS.DataStore.addToDataStore('SapHost', this.applicationServer, datastore_1.DataStoreType.Public);
            this.MS.DataStore.addToDataStore('SapLanguage', this.language, datastore_1.DataStoreType.Public);
            this.MS.DataStore.addToDataStore('SAPPassword', this.password, datastore_1.DataStoreType.Private);
            this.MS.DataStore.addToDataStore('SapRouterString', this.sapRouterString, datastore_1.DataStoreType.Public);
            this.MS.DataStore.addToDataStore('SapSystemId', this.systemId, datastore_1.DataStoreType.Public);
            this.MS.DataStore.addToDataStore('SapSystemNumber', this.instanceNumber, datastore_1.DataStoreType.Public);
            this.MS.DataStore.addToDataStore('SapUser', this.user, datastore_1.DataStoreType.Public);
            this.MS.DataStore.addToDataStore('SqlConnectionString', '', datastore_1.DataStoreType.Public);
        }
    }]);
    return SapSource;
}(viewmodelbase_1.ViewModelBase);

exports.SapSource = SapSource;
//# sourceMappingURL=sap.js.map
