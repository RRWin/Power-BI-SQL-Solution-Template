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

var TwitterHandles = function (_viewmodelbase_1$View) {
    (0, _inherits3.default)(TwitterHandles, _viewmodelbase_1$View);

    function TwitterHandles() {
        (0, _classCallCheck3.default)(this, TwitterHandles);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TwitterHandles.__proto__ || (0, _getPrototypeOf2.default)(TwitterHandles)).call(this));

        _this.accounts = '';
        _this.twitterHandleId = '';
        _this.twitterHandleName = '';
        _this.isValidated = true;
        return _this;
    }

    (0, _createClass3.default)(TwitterHandles, [{
        key: 'OnValidate',
        value: function OnValidate() {
            var _this2 = this;

            var _super = function _super(name) {
                return (0, _get3.default)(TwitterHandles.prototype.__proto__ || (0, _getPrototypeOf2.default)(TwitterHandles.prototype), name, _this2);
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

                                return _context.abrupt('return', false);

                            case 2:
                                body = {};

                                body.Accounts = this.accounts;
                                _context.next = 6;
                                return this.MS.HttpService.executeAsync('Microsoft-ValidateTwitterAccount', body);

                            case 6:
                                response = _context.sent;

                                if (response.IsSuccess) {
                                    this.isValidated = true;
                                    this.showValidation = true;
                                    this.twitterHandleName = response.Body.twitterHandle;
                                    this.twitterHandleId = response.Body.twitterHandleId;
                                }
                                this.MS.DataStore.addToDataStore('TwitterHandles', this.accounts, datastore_1.DataStoreType.Public);

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: 'Invalidate',
        value: function Invalidate() {
            var _this3 = this;

            var _super = function _super(name) {
                return (0, _get3.default)(TwitterHandles.prototype.__proto__ || (0, _getPrototypeOf2.default)(TwitterHandles.prototype), name, _this3);
            };
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _super("Invalidate").call(this);
                                if (!this.accounts) {
                                    this.isValidated = true;
                                }

                            case 2:
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
            var _this4 = this;

            var _super = function _super(name) {
                return (0, _get3.default)(TwitterHandles.prototype.__proto__ || (0, _getPrototypeOf2.default)(TwitterHandles.prototype), name, _this4);
            };
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee3() {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                this.MS.DataStore.addToDataStoreWithCustomRoute('c1', 'SqlGroup', 'SolutionTemplate', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('c1', 'SqlSubGroup', 'Twitter', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('c1', 'SqlEntryName', 'twitterHandle', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('c1', 'SqlEntryValue', this.twitterHandleName, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('c2', 'SqlGroup', 'SolutionTemplate', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('c2', 'SqlSubGroup', 'Twitter', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('c2', 'SqlEntryName', 'twitterHandleId', datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStoreWithCustomRoute('c2', 'SqlEntryValue', this.twitterHandleId, datastore_1.DataStoreType.Public);
                                return _context3.abrupt('return', _super("NavigatingNext").call(this));

                            case 9:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }]);
    return TwitterHandles;
}(viewmodelbase_1.ViewModelBase);

exports.TwitterHandles = TwitterHandles;
//# sourceMappingURL=twitter-handles.js.map
