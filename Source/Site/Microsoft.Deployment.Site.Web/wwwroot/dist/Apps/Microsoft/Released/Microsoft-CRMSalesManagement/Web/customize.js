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
var datastore_1 = require('../../../../../SiteCommon/Web/services/datastore');
var viewmodelbase_1 = require('../../../../../SiteCommon/Web/services/viewmodelbase');

var Customize = function (_viewmodelbase_1$View) {
    (0, _inherits3.default)(Customize, _viewmodelbase_1$View);

    function Customize() {
        var _ref;

        (0, _classCallCheck3.default)(this, Customize);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Customize.__proto__ || (0, _getPrototypeOf2.default)(Customize)).call.apply(_ref, [this].concat(args)));

        _this.actuals = 'Closed opportunities';
        _this.baseUrl = '';
        _this.fiscalMonth = 'January';
        return _this;
    }

    (0, _createClass3.default)(Customize, [{
        key: 'NavigatingNext',
        value: function NavigatingNext() {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.MS.DataStore.addToDataStoreWithCustomRoute('CustomizeActuals', 'SqlGroup', 'data', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('CustomizeActuals', 'SqlSubGroup', 'actual_sales', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('CustomizeActuals', 'SqlEntryName', 'enabled', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('CustomizeActuals', 'SqlEntryValue', this.actuals ? 1 : 0, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('CustomizeBaseUrl', 'SqlGroup', 'SolutionTemplate', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('CustomizeBaseUrl', 'SqlSubGroup', 'SalesManagement', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('CustomizeBaseUrl', 'SqlEntryName', 'BaseURL', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('CustomizeBaseUrl', 'SqlEntryValue', this.baseUrl, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('CustomizeFiscalMonth', 'SqlGroup', 'SolutionTemplate', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('CustomizeFiscalMonth', 'SqlSubGroup', 'SalesManagement', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('CustomizeFiscalMonth', 'SqlEntryName', 'FiscalMonthStart', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('CustomizeFiscalMonth', 'SqlEntryValue', this.fiscalMonth, datastore_1.DataStoreType.Public);
                                return _context.abrupt('return', true);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }]);
    return Customize;
}(viewmodelbase_1.ViewModelBase);

exports.Customize = Customize;
//# sourceMappingURL=customize.js.map
