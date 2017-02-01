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
var datastore_1 = require('../../../../../SiteCommon/Web/services/datastore');
var viewmodelbase_1 = require('../../../../../SiteCommon/Web/services/viewmodelbase');

var Customize = function (_viewmodelbase_1$View) {
    (0, _inherits3.default)(Customize, _viewmodelbase_1$View);

    function Customize() {
        (0, _classCallCheck3.default)(this, Customize);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Customize.__proto__ || (0, _getPrototypeOf2.default)(Customize)).call(this));

        _this.dailyTrigger = '2:00';
        _this.dailyTriggers = [];
        _this.dailyTriggers = _this.MS.UtilityService.GenerateDailyTriggers();
        _this.isValidated = false;
        _this.useDefaultValidateButton = true;
        return _this;
    }

    (0, _createClass3.default)(Customize, [{
        key: 'NavigatingNext',
        value: function NavigatingNext() {
            var _this2 = this;

            var _super = function _super(name) {
                return (0, _get3.default)(Customize.prototype.__proto__ || (0, _getPrototypeOf2.default)(Customize.prototype), name, _this2);
            };
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.MS.DataStore.addToDataStore('TaskDescription', 'Power BI Solution Template - Simplement SAP AR', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('TaskDirectory', 'Simplement, Inc\\Solution Template AR', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('TaskFile', 'Simplement.SolutionTemplate.AR.exe', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('TaskName', 'Power BI Solution Template - Simplement SAP AR', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('TaskParameters', '/u', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('TaskProgram', 'cmd', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('TaskStartTime', this.dailyTrigger, datastore_1.DataStoreType.Public);
                                return _context.abrupt('return', _super("NavigatingNext").call(this));

                            case 8:
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
            var _this3 = this;

            var _super = function _super(name) {
                return (0, _get3.default)(Customize.prototype.__proto__ || (0, _getPrototypeOf2.default)(Customize.prototype), name, _this3);
            };
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _super("OnValidate").call(this);
                                this.isValidated = true;
                                this.showValidation = true;
                                return _context2.abrupt('return', this.isValidated);

                            case 4:
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
